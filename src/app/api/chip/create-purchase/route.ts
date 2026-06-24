import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createChipPurchase } from "@/lib/chip";
import { SUBSCRIPTION_PLANS } from "@/lib/constants";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Tidak dibenarkan." }, { status: 401 });
    }

    const { planId } = await req.json();
    const plan = SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS];

    if (!plan) {
      return NextResponse.json({ error: "Pelan tidak sah." }, { status: 400 });
    }

    // Get parent details
    const { data: parent } = await supabase
      .from("parents")
      .select("name, email")
      .eq("id", user.id)
      .single();

    if (!parent) {
      return NextResponse.json({ error: "Profil tidak dijumpai." }, { status: 404 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const reference = `MM-${user.id.slice(0, 8)}-${Date.now()}`;

    // Save pending payment record first
    await supabase.from("payments").insert({
      parent_id: user.id,
      chip_purchase_id: reference,
      plan: planId,
      amount: plan.price,
      status: "pending",
    });

    const purchase = await createChipPurchase({
      amount: plan.price,
      currency: "MYR",
      due_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiry
      client: {
        email: parent.email,
        name: parent.name,
      },
      products: [
        {
          name: `MisiMinda — Pelan ${plan.name}`,
          quantity: 1,
          price: plan.price,
        },
      ],
      send_email: true,
      callback_url: `${appUrl}/api/chip/webhook`,
      success_redirect: `${appUrl}/payment/success?ref=${reference}`,
      failure_redirect: `${appUrl}/payment/failed?ref=${reference}`,
      reference,
    });

    // Update payment record with real CHIP purchase ID
    await supabase
      .from("payments")
      .update({ chip_purchase_id: purchase.id })
      .eq("chip_purchase_id", reference);

    return NextResponse.json({ checkout_url: purchase.checkout_url });
  } catch (err) {
    console.error("CHIP create-purchase error:", err);
    return NextResponse.json(
      { error: "Ralat pembayaran. Sila cuba lagi." },
      { status: 500 }
    );
  }
}
