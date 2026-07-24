import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { serviceClient } from "@/lib/ad-settings";
import { getBalances, WITHDRAW_COOLDOWN_DAYS, MIN_WITHDRAW_SEN } from "@/lib/affiliate";

/**
 * Mohon pengeluaran komisen.
 * Syarat: ada butiran bank, baki tersedia >= minimum, dan tiada permohonan
 * dalam 3 hari lepas / tiada permohonan tertunggak.
 */
export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Tidak dibenarkan." }, { status: 401 });

  const admin = serviceClient();

  const { data: aff } = await admin
    .from("affiliates")
    .select("bank_name, bank_account, account_holder")
    .eq("parent_id", user.id)
    .maybeSingle();
  if (!aff) return NextResponse.json({ error: "Bukan affiliate." }, { status: 403 });
  if (!aff.bank_account || !aff.bank_name || !aff.account_holder) {
    return NextResponse.json({ error: "Sila isi butiran bank dahulu." }, { status: 400 });
  }

  // tiada permohonan tertunggak?
  const { data: pending } = await admin
    .from("withdrawals")
    .select("id, requested_at, status")
    .eq("affiliate_id", user.id)
    .order("requested_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (pending?.status === "pending") {
    return NextResponse.json({ error: "Anda sudah ada permohonan yang sedang diproses." }, { status: 400 });
  }
  if (pending) {
    const next = new Date(new Date(pending.requested_at).getTime() + WITHDRAW_COOLDOWN_DAYS * 86400000);
    if (next > new Date()) {
      return NextResponse.json({ error: `Withdraw hanya boleh sekali setiap ${WITHDRAW_COOLDOWN_DAYS} hari.` }, { status: 400 });
    }
  }

  const balances = await getBalances(user.id);
  if (balances.availableSen < MIN_WITHDRAW_SEN) {
    return NextResponse.json({ error: `Baki tidak mencukupi (minimum RM${MIN_WITHDRAW_SEN / 100}).` }, { status: 400 });
  }

  const nowIso = new Date().toISOString();

  // cipta permohonan
  const { data: wd, error: wdErr } = await admin
    .from("withdrawals")
    .insert({
      affiliate_id: user.id,
      amount_sen: balances.availableSen,
      status: "pending",
      bank_snapshot: aff,
      requested_at: nowIso,
    })
    .select("id")
    .single();
  if (wdErr || !wd) return NextResponse.json({ error: "Gagal buat permohonan." }, { status: 500 });

  // kunci komisen yang tersedia ke dalam permohonan ini
  await admin
    .from("commissions")
    .update({ status: "requested", withdrawal_id: wd.id })
    .eq("affiliate_id", user.id)
    .eq("status", "pending")
    .lte("available_at", nowIso);

  return NextResponse.json({ requested: true, amountSen: balances.availableSen });
}
