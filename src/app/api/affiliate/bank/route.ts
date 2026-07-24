import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { serviceClient } from "@/lib/ad-settings";

/** Simpan butiran bank affiliate (untuk terima bayaran komisen). */
export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Tidak dibenarkan." }, { status: 401 });

  const admin = serviceClient();
  const { data: aff } = await admin.from("affiliates").select("parent_id").eq("parent_id", user.id).maybeSingle();
  if (!aff) return NextResponse.json({ error: "Bukan affiliate." }, { status: 403 });

  const body = await req.json();
  const bank_name = String(body.bank_name ?? "").trim().slice(0, 60);
  const bank_account = String(body.bank_account ?? "").replace(/\s/g, "").slice(0, 30);
  const account_holder = String(body.account_holder ?? "").trim().slice(0, 80);

  if (!bank_name || !bank_account || !account_holder) {
    return NextResponse.json({ error: "Sila lengkapkan semua butiran bank." }, { status: 400 });
  }

  const { error } = await admin
    .from("affiliates")
    .update({ bank_name, bank_account, account_holder })
    .eq("parent_id", user.id);
  if (error) return NextResponse.json({ error: "Gagal simpan." }, { status: 500 });

  return NextResponse.json({ saved: true });
}
