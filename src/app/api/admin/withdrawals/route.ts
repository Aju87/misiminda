import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { serviceClient } from "@/lib/ad-settings";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "hnrichhq@gmail.com";

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) return null;
  return user;
}

/** Senarai permohonan pengeluaran + email affiliate. */
export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Tidak dibenarkan." }, { status: 403 });
  const admin = serviceClient();

  const { data: wds } = await admin
    .from("withdrawals")
    .select("id, affiliate_id, amount_sen, status, bank_snapshot, admin_note, requested_at, paid_at")
    .order("requested_at", { ascending: false })
    .limit(100);

  // dapatkan email affiliate
  const ids = [...new Set((wds ?? []).map((w) => w.affiliate_id))];
  const emailMap: Record<string, string> = {};
  if (ids.length) {
    const { data: parents } = await admin.from("parents").select("id, email").in("id", ids);
    for (const p of parents ?? []) emailMap[p.id] = p.email;
  }

  return NextResponse.json({
    withdrawals: (wds ?? []).map((w) => ({ ...w, email: emailMap[w.affiliate_id] ?? "" })),
  });
}

/** Tanda permohonan sebagai 'paid' atau 'rejected'. */
export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Tidak dibenarkan." }, { status: 403 });
  const admin = serviceClient();
  const { id, action, note } = await req.json();

  if (!id || !["paid", "rejected"].includes(action)) {
    return NextResponse.json({ error: "Permintaan tidak sah." }, { status: 400 });
  }

  const { data: wd } = await admin
    .from("withdrawals").select("id, status").eq("id", id).maybeSingle();
  if (!wd) return NextResponse.json({ error: "Permohonan tidak dijumpai." }, { status: 404 });
  if (wd.status !== "pending") return NextResponse.json({ error: "Permohonan sudah diproses." }, { status: 400 });

  if (action === "paid") {
    await admin.from("withdrawals")
      .update({ status: "paid", paid_at: new Date().toISOString(), admin_note: note ?? null })
      .eq("id", id);
    // komisen yang dikunci → paid
    await admin.from("commissions").update({ status: "paid" }).eq("withdrawal_id", id);
  } else {
    await admin.from("withdrawals")
      .update({ status: "rejected", admin_note: note ?? null })
      .eq("id", id);
    // lepaskan komisen semula (boleh dikeluarkan lagi)
    await admin.from("commissions")
      .update({ status: "pending", withdrawal_id: null })
      .eq("withdrawal_id", id);
  }

  return NextResponse.json({ ok: true });
}
