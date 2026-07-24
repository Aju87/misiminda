import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { serviceClient } from "@/lib/ad-settings";

/**
 * Kaitkan pengguna log masuk dengan affiliate yang merujuknya.
 * Dipanggil selepas daftar/log masuk. Idempoten — hanya set jika belum ada.
 * Kod rujukan dibaca dari cookie mm_ref.
 */
export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Tidak dibenarkan." }, { status: 401 });

    // baca cookie mm_ref
    const cookie = req.headers.get("cookie") ?? "";
    const m = cookie.match(/(?:^|;\s*)mm_ref=([^;]+)/);
    const ref = m ? decodeURIComponent(m[1]).toUpperCase() : "";
    if (!ref) return NextResponse.json({ attributed: false, reason: "no-ref" });

    const admin = serviceClient();

    // sudah ada rujukan? jangan tulis semula
    const { data: parent } = await admin
      .from("parents").select("referred_by").eq("id", user.id).maybeSingle();
    if (parent?.referred_by) return NextResponse.json({ attributed: false, reason: "already-set" });

    // kod mesti wujud & bukan diri sendiri
    const { data: aff } = await admin
      .from("affiliates").select("parent_id").eq("code", ref).eq("status", "active").maybeSingle();
    if (!aff) return NextResponse.json({ attributed: false, reason: "invalid-code" });
    if (aff.parent_id === user.id) return NextResponse.json({ attributed: false, reason: "self" });

    await admin.from("parents").update({ referred_by: ref }).eq("id", user.id);
    return NextResponse.json({ attributed: true });
  } catch (err) {
    console.error("attribute error:", err);
    return NextResponse.json({ attributed: false }, { status: 200 });
  }
}
