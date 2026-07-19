import { createClient } from "@supabase/supabase-js";

export interface AdSettings {
  metaPixelId: string;
  metaAccessToken: string;
  metaTestEventCode: string;
  tiktokPixelId: string;
  tiktokAccessToken: string;
}

/** Klien service-role — satu-satunya cara baca `secure_settings`. */
export function serviceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "placeholder",
    { auth: { persistSession: false } }
  );
}

/**
 * Baca semua tetapan iklan.
 * Pixel ID dari `site_settings` (public read), access token dari
 * `secure_settings` (service-role sahaja — tidak terdedah ke browser).
 */
export async function getAdSettings(): Promise<AdSettings> {
  const admin = serviceClient();

  const [pub, sec] = await Promise.all([
    admin.from("site_settings").select("key, value"),
    admin.from("secure_settings").select("key, value"),
  ]);

  const map = (rows: { key: string; value: string }[] | null) =>
    Object.fromEntries((rows ?? []).map((r) => [r.key, r.value ?? ""]));

  const p = map(pub.data);
  const s = map(sec.data);

  return {
    metaPixelId: (p.meta_pixel_id ?? "").trim(),
    metaAccessToken: (s.meta_access_token ?? "").trim(),
    metaTestEventCode: (s.meta_test_event_code ?? "").trim(),
    tiktokPixelId: (p.tiktok_pixel_id ?? "").trim(),
    tiktokAccessToken: (s.tiktok_access_token ?? "").trim(),
  };
}

/** Ambil IP & user-agent sebenar pelawat dari header request. */
export function clientMetaFromRequest(req: Request) {
  const h = req.headers;
  const fwd = h.get("x-forwarded-for") ?? "";
  const ip = fwd.split(",")[0]?.trim() || h.get("x-real-ip") || undefined;
  const userAgent = h.get("user-agent") ?? undefined;
  return { ip, userAgent };
}
