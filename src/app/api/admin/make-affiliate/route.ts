import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { serviceClient } from "@/lib/ad-settings";
import { generateUniqueCode } from "@/lib/affiliate";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "hnrichhq@gmail.com";

/**
 * Aktifkan seseorang sebagai affiliate secara MANUAL (ikut email).
 * Jaring keselamatan jika webhook tidak dapat mengesan bayaran RM50.
 * Juga mengaktifkan langganan app mereka (kerana affiliate = app penuh).
 */
export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return NextResponse.json({ error: "Tidak dibenarkan." }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const email = String(body.email ?? "").trim().toLowerCase();
  if (!email) return NextResponse.json({ error: "Sila masukkan email." }, { status: 400 });

  const admin = serviceClient();

  // cari parent ikut email
  const { data: parent } = await admin
    .from("parents").select("id, email").ilike("email", email).maybeSingle();
  if (!parent) {
    return NextResponse.json({ error: `Tiada akaun dengan email "${email}". Pengguna perlu daftar dahulu.` }, { status: 404 });
  }

  // sudah affiliate?
  const { data: existing } = await admin
    .from("affiliates").select("code").eq("parent_id", parent.id).maybeSingle();
  if (existing) {
    return NextResponse.json({ ok: true, alreadyAffiliate: true, code: existing.code, email: parent.email });
  }

  // cipta affiliate + aktifkan langganan app
  const code = await generateUniqueCode();
  const { error } = await admin.from("affiliates").insert({ parent_id: parent.id, code, status: "active" });
  if (error) {
    console.error("make-affiliate error:", error);
    return NextResponse.json({ error: "Gagal cipta affiliate. Pastikan jadual affiliates wujud." }, { status: 500 });
  }
  await admin.from("parents").update({ subscription_status: "active" }).eq("id", parent.id);

  return NextResponse.json({ ok: true, created: true, code, email: parent.email });
}
