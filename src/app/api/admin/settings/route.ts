import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { serviceClient } from "@/lib/ad-settings";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "hnrichhq@gmail.com";

/** Boleh dibaca umum (pixel ID bukan rahsia — ia terdedah dalam kod browser). */
const PUBLIC_KEYS = ["meta_pixel_id", "tiktok_pixel_id", "chip_app_url", "chip_affiliate_url"];
/** RAHSIA — disimpan dalam secure_settings, tidak pernah dihantar balik ke browser. */
const SECRET_KEYS = ["meta_access_token", "meta_test_event_code", "tiktok_access_token"];

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) return null;
  return user;
}

/** Tunjuk status token tanpa dedahkan nilainya. */
function mask(value: string) {
  if (!value) return { set: false, hint: "" };
  return { set: true, hint: `••••••••${value.slice(-4)}` };
}

export async function GET() {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Tidak dibenarkan." }, { status: 403 });

  const admin = serviceClient();
  const [pub, sec] = await Promise.all([
    admin.from("site_settings").select("key, value"),
    admin.from("secure_settings").select("key, value"),
  ]);

  const pubMap = Object.fromEntries((pub.data ?? []).map((r) => [r.key, r.value ?? ""]));
  const secMap = Object.fromEntries((sec.data ?? []).map((r) => [r.key, r.value ?? ""]));

  return NextResponse.json({
    meta_pixel_id: pubMap.meta_pixel_id ?? "",
    tiktok_pixel_id: pubMap.tiktok_pixel_id ?? "",
    chip_app_url: pubMap.chip_app_url ?? "",
    chip_affiliate_url: pubMap.chip_affiliate_url ?? "",
    // hanya status, bukan nilai sebenar
    meta_access_token: mask(secMap.meta_access_token ?? ""),
    meta_test_event_code: mask(secMap.meta_test_event_code ?? ""),
    tiktok_access_token: mask(secMap.tiktok_access_token ?? ""),
  });
}

export async function POST(req: Request) {
  try {
    const user = await requireAdmin();
    if (!user) return NextResponse.json({ error: "Tidak dibenarkan." }, { status: 403 });

    const body = await req.json();
    const admin = serviceClient();
    const now = new Date().toISOString();

    // --- Pixel ID (public) ---
    for (const key of PUBLIC_KEYS) {
      if (typeof body[key] !== "string") continue;
      const { error } = await admin
        .from("site_settings")
        .upsert({ key, value: body[key].trim(), updated_at: now }, { onConflict: "key" });
      if (error) {
        console.error("Gagal simpan site_settings:", key, error);
        return NextResponse.json({ error: "Gagal simpan tetapan." }, { status: 500 });
      }
    }

    // --- Token (rahsia) ---
    // Kosong = biarkan nilai sedia ada (elak terpadam tanpa sengaja).
    // Hantar "__CLEAR__" untuk padam betul-betul.
    for (const key of SECRET_KEYS) {
      if (typeof body[key] !== "string") continue;
      const raw = body[key].trim();
      if (raw === "") continue;
      const value = raw === "__CLEAR__" ? "" : raw;
      const { error } = await admin
        .from("secure_settings")
        .upsert({ key, value, updated_at: now }, { onConflict: "key" });
      if (error) {
        console.error("Gagal simpan secure_settings:", key, error);
        return NextResponse.json({ error: "Gagal simpan token." }, { status: 500 });
      }
    }

    return NextResponse.json({ saved: true });
  } catch (err) {
    console.error("Admin settings error:", err);
    return NextResponse.json({ error: "Ralat dalaman." }, { status: 500 });
  }
}
