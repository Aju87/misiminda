import { NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "hnrichhq@gmail.com";

const ALLOWED_KEYS = ["meta_pixel_id", "tiktok_pixel_id"];

export async function POST(req: Request) {
  try {
    // Sahkan pengguna yang log masuk ialah admin
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.json({ error: "Tidak dibenarkan." }, { status: 403 });
    }

    const body = await req.json();
    const updates: { key: string; value: string }[] = [];

    for (const key of ALLOWED_KEYS) {
      if (typeof body[key] === "string") {
        updates.push({ key, value: body[key].trim() });
      }
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: "Tiada tetapan untuk disimpan." }, { status: 400 });
    }

    // Tulis guna service role (RLS tiada policy tulis untuk pengguna biasa)
    const admin = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    for (const u of updates) {
      const { error } = await admin
        .from("site_settings")
        .upsert({ ...u, updated_at: new Date().toISOString() }, { onConflict: "key" });
      if (error) {
        console.error("Gagal simpan setting:", u.key, error);
        return NextResponse.json({ error: "Gagal simpan tetapan." }, { status: 500 });
      }
    }

    return NextResponse.json({ saved: true });
  } catch (err) {
    console.error("Admin settings error:", err);
    return NextResponse.json({ error: "Ralat dalaman." }, { status: 500 });
  }
}
