import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAdSettings, clientMetaFromRequest } from "@/lib/ad-settings";
import { sendMetaEvent } from "@/lib/meta-capi";
import { sendTikTokEvent } from "@/lib/tiktok-events";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "hnrichhq@gmail.com";

/** Hantar event Purchase ujian untuk sahkan sambungan CAPI berfungsi. */
export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return NextResponse.json({ error: "Tidak dibenarkan." }, { status: 403 });
  }

  const cfg = await getAdSettings();
  const { ip, userAgent } = clientMetaFromRequest(req);
  const eventId = `test-${Date.now()}`;

  const meta = cfg.metaPixelId && cfg.metaAccessToken
    ? await sendMetaEvent(
        { pixelId: cfg.metaPixelId, accessToken: cfg.metaAccessToken, testEventCode: cfg.metaTestEventCode },
        {
          eventName: "Purchase",
          eventId,
          actionSource: "website",
          eventSourceUrl: "https://misiminda.my/pricing",
          user: { email: user.email ?? undefined, externalId: user.id, clientIp: ip, clientUserAgent: userAgent },
          customData: { currency: "MYR", value: 35, content_name: "UJIAN — MisiMinda", content_ids: ["lifetime"], content_type: "product" },
        }
      )
    : { ok: false, status: 0, body: "Pixel ID atau access token Meta belum diisi." };

  const tiktok = cfg.tiktokPixelId && cfg.tiktokAccessToken
    ? await sendTikTokEvent(
        { pixelId: cfg.tiktokPixelId, accessToken: cfg.tiktokAccessToken },
        {
          eventName: "CompletePayment",
          eventId,
          pageUrl: "https://misiminda.my/pricing",
          user: { email: user.email ?? undefined, externalId: user.id, ip, userAgent },
          properties: { currency: "MYR", value: 35, contents: [{ content_id: "lifetime", content_name: "UJIAN" }] },
        }
      )
    : { ok: false, status: 0, body: "Pixel ID atau access token TikTok belum diisi." };

  return NextResponse.json({
    eventId,
    meta: { ok: meta.ok, status: meta.status, response: meta.body },
    tiktok: { ok: tiktok.ok, status: tiktok.status, response: tiktok.body },
  });
}
