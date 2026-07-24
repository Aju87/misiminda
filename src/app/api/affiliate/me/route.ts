import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { serviceClient } from "@/lib/ad-settings";
import { getBalances, WITHDRAW_COOLDOWN_DAYS, MIN_WITHDRAW_SEN } from "@/lib/affiliate";

/** Data papan pemuka affiliate untuk pengguna semasa. */
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Tidak dibenarkan." }, { status: 401 });

  const admin = serviceClient();

  const { data: aff } = await admin
    .from("affiliates")
    .select("code, status, bank_name, bank_account, account_holder, created_at")
    .eq("parent_id", user.id)
    .maybeSingle();

  if (!aff) {
    // ambil URL join dari tetapan
    const { data: settings } = await admin
      .from("site_settings").select("key, value").eq("key", "chip_affiliate_url").maybeSingle();
    return NextResponse.json({ isAffiliate: false, joinUrl: settings?.value ?? "" });
  }

  const balances = await getBalances(user.id);

  // withdraw seterusnya dibenarkan bila?
  const { data: lastWd } = await admin
    .from("withdrawals")
    .select("requested_at, status")
    .eq("affiliate_id", user.id)
    .order("requested_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  let canWithdraw = balances.availableSen >= MIN_WITHDRAW_SEN;
  let nextWithdrawAt: string | null = null;
  const hasPending = lastWd?.status === "pending";
  if (hasPending) {
    canWithdraw = false;
  } else if (lastWd) {
    const next = new Date(new Date(lastWd.requested_at).getTime() + WITHDRAW_COOLDOWN_DAYS * 86400000);
    if (next > new Date()) { canWithdraw = false; nextWithdrawAt = next.toISOString(); }
  }

  const { data: withdrawals } = await admin
    .from("withdrawals")
    .select("id, amount_sen, status, requested_at, paid_at, admin_note")
    .eq("affiliate_id", user.id)
    .order("requested_at", { ascending: false })
    .limit(20);

  return NextResponse.json({
    isAffiliate: true,
    code: aff.code,
    status: aff.status,
    bank: { bank_name: aff.bank_name, bank_account: aff.bank_account, account_holder: aff.account_holder },
    balances,
    canWithdraw,
    hasPendingWithdrawal: hasPending,
    nextWithdrawAt,
    minWithdrawSen: MIN_WITHDRAW_SEN,
    withdrawals: withdrawals ?? [],
  });
}
