import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAdSettings, serviceClient, clientMetaFromRequest } from "@/lib/ad-settings";
import { sendMetaEvent } from "@/lib/meta-capi";
import { sendTikTokEvent } from "@/lib/tiktok-events";

/**
 * Dipanggil bila pengguna tekan "Beli Sekarang", SEBELUM redirect ke CHIP.
 * Tujuan:
 *  1) Simpan data atribusi iklan (_fbp/_fbc/ttclid) — kerana selepas ini
 *     pengguna keluar ke CHIP dan cookie tak dapat dibaca lagi.
 *  2) Hantar event InitiateCheckout ke Meta & TikTok.
 */
export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Tidak dibenarkan." }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const fbp: string | undefined = body.fbp || undefined;
    const fbc: string | undefined = body.fbc || undefined;
    const ttclid: string | undefined = body.ttclid || undefined;
    const ttp: string | undefined = body.ttp || undefined;
    const eventId: string = body.eventId || `ic-${user.id}-${Date.now()}`;
    const sourceUrl: string | undefined = body.sourceUrl || undefined;

    const { ip, userAgent } = clientMetaFromRequest(req);

    // 1) Simpan atribusi supaya webhook CHIP boleh guna nanti
    const admin = serviceClient();
    await admin
      .from("parents")
      .update({
        ad_attribution: {
          fbp, fbc, ttclid, ttp,
          ip, user_agent: userAgent,
          saved_at: new Date().toISOString(),
        },
      })
      .eq("id", user.id);

    // 2) Hantar InitiateCheckout
    const cfg = await getAdSettings();
    const email = user.email ?? undefined;

    await Promise.allSettled([
      sendMetaEvent(
        { pixelId: cfg.metaPixelId, accessToken: cfg.metaAccessToken, testEventCode: cfg.metaTestEventCode },
        {
          eventName: "InitiateCheckout",
          eventId,
          eventSourceUrl: sourceUrl,
          actionSource: "website",
          user: { email, externalId: user.id, fbp, fbc, clientIp: ip, clientUserAgent: userAgent },
          customData: { currency: "MYR", value: 35, content_name: "MisiMinda Seumur Hidup", content_ids: ["lifetime"], content_type: "product" },
        }
      ),
      sendTikTokEvent(
        { pixelId: cfg.tiktokPixelId, accessToken: cfg.tiktokAccessToken },
        {
          eventName: "InitiateCheckout",
          eventId,
          pageUrl: sourceUrl,
          user: { email, externalId: user.id, ttclid, ttp, ip, userAgent },
          properties: { currency: "MYR", value: 35, contents: [{ content_id: "lifetime", content_name: "MisiMinda Seumur Hidup" }] },
        }
      ),
    ]);

    return NextResponse.json({ ok: true, eventId });
  } catch (err) {
    console.error("track/checkout error:", err);
    // Jangan halang pembelian walaupun tracking gagal
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
