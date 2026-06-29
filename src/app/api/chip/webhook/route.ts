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

    if (event.event !== "purchase.paid") {
      return NextResponse.json({ received: true });
    }

    const purchaseId: string = event.data?.id ?? "";
    const reference: string = event.data?.reference ?? "";
    const clientEmail: string = event.data?.client?.email ?? "";

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

    // 2. Fallback: cari user ikut email (payment link statik CHIP)
    if (clientEmail) {
      const { data: authUser } = await supabase.auth.admin.getUserByEmail(clientEmail);
      if (authUser?.user?.id) {
        await activateSubscription(supabase, authUser.user.id, purchaseId);
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
  await supabase
    .from("parents")
    .update({ subscription_status: "active" })
    .eq("id", parentId);

  // Rekod payment jika belum ada
  await supabase.from("payments").upsert({
    parent_id: parentId,
    chip_purchase_id: chipPurchaseId,
    plan_id: "lifetime",
    amount: 2900,
    currency: "MYR",
    status: "paid",
    paid_at: new Date().toISOString(),
  }, { onConflict: "chip_purchase_id", ignoreDuplicates: false });
}
