import { NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { verifyChipWebhook } from "@/lib/chip";

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

    console.log("Purchase ID:", purchaseId, "Email:", clientEmail);

    // 1. Cuba cari dari jadual payments (flow API)
    const { data: payment } = await supabase
      .from("payments")
      .select("parent_id")
      .or(`chip_purchase_id.eq.${purchaseId},chip_purchase_id.eq.${reference}`)
      .maybeSingle();

    if (payment?.parent_id) {
      await activateSubscription(supabase, payment.parent_id, purchaseId);
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
    amount: 2900,
    status: "paid",
    paid_at: new Date().toISOString(),
  }, { onConflict: "chip_purchase_id" });

  console.log("Upsert payments result - error:", upsertErr);
}
