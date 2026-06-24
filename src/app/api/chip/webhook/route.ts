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

    const purchaseId: string = event.data?.id;
    const reference: string = event.data?.reference ?? "";

    if (!purchaseId) {
      return NextResponse.json({ error: "Purchase ID tidak ada." }, { status: 400 });
    }

    const { data: payment } = await supabase
      .from("payments")
      .select("parent_id")
      .eq("chip_purchase_id", purchaseId)
      .single();

    if (!payment) {
      const { data: paymentByRef } = await supabase
        .from("payments")
        .select("parent_id")
        .eq("chip_purchase_id", reference)
        .single();

      if (!paymentByRef) {
        console.error("Payment record not found:", purchaseId, reference);
        return NextResponse.json({ received: true });
      }

      await activateSubscription(supabase, paymentByRef.parent_id, purchaseId, reference);
    } else {
      await activateSubscription(supabase, payment.parent_id, purchaseId, reference);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

async function activateSubscription(
  supabase: SupabaseClient,
  parentId: string,
  chipPurchaseId: string,
  reference: string
) {
  await supabase
    .from("payments")
    .update({ status: "paid", paid_at: new Date().toISOString() })
    .or(`chip_purchase_id.eq.${chipPurchaseId},chip_purchase_id.eq.${reference}`);

  await supabase
    .from("parents")
    .update({ subscription_status: "active" })
    .eq("id", parentId);
}
