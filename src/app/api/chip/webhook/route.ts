import { NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { verifyChipWebhook } from "@/lib/chip";
import { getAdSettings } from "@/lib/ad-settings";
import { sendMetaEvent } from "@/lib/meta-capi";
import { sendTikTokEvent } from "@/lib/tiktok-events";
import { COMMISSION_SEN, HOLD_DAYS } from "@/lib/affiliate";

// Pemisah harga: app = RM35 (3500 sen), join affiliate = RM50 (5000 sen)
const AFFILIATE_JOIN_MIN_SEN = 4500;

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "placeholder"
  );

  try {
    const body = await req.text();
    const signature = req.headers.get("x-signature") ?? "";

    if (process.env.CHIP_WEBHOOK_SECRET) {
      const valid = await verifyChipWebhook(body, signature);
      if (!valid) {
        return NextResponse.json({ error: "Signature tidak sah." }, { status: 401 });
      }
    }

    const event = JSON.parse(body);

    // CHIP hantar type: "purchase" — mana-mana webhook dari CHIP = paid
    const eventType: string = event.type ?? event.event ?? "";
    console.log("CHIP event type:", eventType);

    if (!eventType.includes("purchase")) {
      console.log("Bukan purchase event, skip:", eventType);
      return NextResponse.json({ received: true });
    }

    // Email & ID terus dalam root payload (bukan dalam data{})
    const purchaseId: string = event.id ?? event.data?.id ?? "";
    const reference: string = event.reference ?? event.data?.reference ?? "";
    const clientEmail: string =
      event.client?.email ??
      event.data?.client?.email ??
      "";

    // Jumlah dibayar (sen) — untuk bezakan jualan app vs join affiliate
    const amountSen: number =
      Number(event.purchase?.total ?? event.payment?.amount ?? event.data?.purchase?.total ?? event.amount ?? 0) || 0;

    console.log("Purchase ID:", purchaseId, "Email:", clientEmail, "Amount(sen):", amountSen);

    // 1. Cuba cari dari jadual payments (flow API)
    const { data: payment } = await supabase
      .from("payments")
      .select("parent_id")
      .or(`chip_purchase_id.eq.${purchaseId},chip_purchase_id.eq.${reference}`)
      .maybeSingle();

    if (payment?.parent_id) {
      await activateSubscription(supabase, payment.parent_id, purchaseId);
      await handleAffiliate(supabase, payment.parent_id, amountSen);
      await trackPurchase(supabase, payment.parent_id, purchaseId, clientEmail);
      return NextResponse.json({ received: true });
    }

    // 2. Fallback: cari parent terus ikut email dalam jadual parents
    if (clientEmail) {
      const { data: parentByEmail, error: emailErr } = await supabase
        .from("parents")
        .select("id")
        .eq("email", clientEmail)
        .maybeSingle();

      console.log("Parent by email result:", parentByEmail, "error:", emailErr);

      if (parentByEmail?.id) {
        await activateSubscription(supabase, parentByEmail.id, purchaseId);
        console.log("Subscription activated for:", parentByEmail.id);
        await handleAffiliate(supabase, parentByEmail.id, amountSen);
        await trackPurchase(supabase, parentByEmail.id, purchaseId, clientEmail);
        return NextResponse.json({ received: true });
      }
    }

    console.error("Tidak dapat kenal pasti pembeli:", { purchaseId, reference, clientEmail });
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

/**
 * Hantar event Purchase ke Meta CAPI & TikTok Events API.
 *
 * Ini event PALING PENTING untuk iklan — pixel browser tak dapat tangkap
 * kerana pembayaran berlaku di laman CHIP (luar website kita).
 *
 * event_id = chipPurchaseId supaya jika CHIP retry webhook, Meta/TikTok
 * akan nyah-duplikasi dan tidak kira conversion dua kali.
 */
async function trackPurchase(
  supabase: SupabaseClient,
  parentId: string,
  chipPurchaseId: string,
  fallbackEmail: string
) {
  try {
    const cfg = await getAdSettings();
    if (!cfg.metaPixelId && !cfg.tiktokPixelId) return;

    // Ambil email + data atribusi yang disimpan semasa checkout
    const { data: parent } = await supabase
      .from("parents")
      .select("email, ad_attribution")
      .eq("id", parentId)
      .maybeSingle();

    const attr = (parent?.ad_attribution ?? {}) as {
      fbp?: string; fbc?: string; ttclid?: string; ttp?: string;
      ip?: string; user_agent?: string;
    };
    const email = parent?.email || fallbackEmail || undefined;
    const eventId = `purchase-${chipPurchaseId}`;

    const results = await Promise.allSettled([
      sendMetaEvent(
        { pixelId: cfg.metaPixelId, accessToken: cfg.metaAccessToken, testEventCode: cfg.metaTestEventCode },
        {
          eventName: "Purchase",
          eventId,
          actionSource: "website",
          eventSourceUrl: "https://misiminda.my/pricing",
          user: {
            email,
            externalId: parentId,
            fbp: attr.fbp,
            fbc: attr.fbc,
            clientIp: attr.ip,
            clientUserAgent: attr.user_agent,
          },
          customData: {
            currency: "MYR",
            value: 35,
            content_name: "MisiMinda Seumur Hidup",
            content_ids: ["lifetime"],
            content_type: "product",
            order_id: chipPurchaseId,
          },
        }
      ),
      sendTikTokEvent(
        { pixelId: cfg.tiktokPixelId, accessToken: cfg.tiktokAccessToken },
        {
          eventName: "CompletePayment",
          eventId,
          pageUrl: "https://misiminda.my/pricing",
          user: {
            email,
            externalId: parentId,
            ttclid: attr.ttclid,
            ttp: attr.ttp,
            ip: attr.ip,
            userAgent: attr.user_agent,
          },
          properties: {
            currency: "MYR",
            value: 35,
            order_id: chipPurchaseId,
            contents: [{ content_id: "lifetime", content_name: "MisiMinda Seumur Hidup", quantity: 1, price: 35 }],
          },
        }
      ),
    ]);

    console.log("Purchase tracking:", JSON.stringify(results.map((r) =>
      r.status === "fulfilled" ? { ok: r.value.ok, status: r.value.status } : { error: String(r.reason) }
    )));
  } catch (err) {
    // Tracking gagal TIDAK boleh menjejaskan pengaktifan langganan
    console.error("trackPurchase error:", err);
  }
}

/**
 * Logik affiliate selepas pembayaran berjaya.
 *  - Bayaran RM50 (>= RM45) → daftar pembeli sebagai affiliate (jana kod).
 *  - Bayaran app RM35       → kredit komisen RM15 kepada perujuk (jika ada),
 *                             ditahan 7 hari (tempoh refund) sebelum boleh dikeluarkan.
 */
async function handleAffiliate(supabase: SupabaseClient, parentId: string, amountSen: number) {
  try {
    if (amountSen >= AFFILIATE_JOIN_MIN_SEN) {
      const { data: existing } = await supabase
        .from("affiliates").select("code").eq("parent_id", parentId).maybeSingle();
      if (!existing) {
        const code = await genAffiliateCode(supabase);
        await supabase.from("affiliates").insert({ parent_id: parentId, code, status: "active" });
        console.log("Affiliate dicipta:", parentId, code);
      }
      return; // join affiliate tidak menjana komisen kepada perujuk lain
    }

    // Jualan app biasa — kredit komisen kepada perujuk
    const { data: parent } = await supabase
      .from("parents").select("referred_by").eq("id", parentId).maybeSingle();
    const ref = parent?.referred_by;
    if (!ref) return;

    const { data: aff } = await supabase
      .from("affiliates").select("parent_id").eq("code", ref).eq("status", "active").maybeSingle();
    if (!aff || aff.parent_id === parentId) return; // tiada perujuk sah / rujuk diri sendiri

    const availableAt = new Date(Date.now() + HOLD_DAYS * 86400000).toISOString();
    const { error } = await supabase.from("commissions").insert({
      affiliate_id: aff.parent_id,
      referred_parent_id: parentId,
      amount_sen: COMMISSION_SEN,
      status: "pending",
      available_at: availableAt,
    });
    // unique(referred_parent_id) — jika sudah dikredit, insert gagal senyap
    if (error && !/(duplicate|unique)/i.test(error.message)) {
      console.error("Gagal kredit komisen:", error);
    } else if (!error) {
      console.log("Komisen RM15 dikreditkan kepada", aff.parent_id, "untuk pelanggan", parentId);
    }
  } catch (e) {
    console.error("handleAffiliate error:", e);
  }
}

async function genAffiliateCode(supabase: SupabaseClient): Promise<string> {
  const abc = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  for (let a = 0; a < 12; a++) {
    let c = "";
    for (let i = 0; i < 6; i++) c += abc[Math.floor(Math.random() * abc.length)];
    const { data } = await supabase.from("affiliates").select("code").eq("code", c).maybeSingle();
    if (!data) return c;
  }
  return "MM" + Date.now().toString(36).toUpperCase().slice(-4);
}

async function activateSubscription(
  supabase: SupabaseClient,
  parentId: string,
  chipPurchaseId: string
) {
  const { error: updateErr } = await supabase
    .from("parents")
    .update({ subscription_status: "active" })
    .eq("id", parentId);

  console.log("Update parents result - error:", updateErr);

  const { error: upsertErr } = await supabase.from("payments").upsert({
    parent_id: parentId,
    chip_purchase_id: chipPurchaseId,
    plan: "lifetime",
    amount: 3500,
    status: "paid",
    paid_at: new Date().toISOString(),
  }, { onConflict: "chip_purchase_id" });

  console.log("Upsert payments result - error:", upsertErr);
}
