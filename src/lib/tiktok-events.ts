import crypto from "crypto";

const TIKTOK_ENDPOINT = "https://business-api.tiktok.com/open_api/v1.3/event/track/";

function hash(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function hashPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  return crypto.createHash("sha256").update(digits).digest("hex");
}

export interface TikTokUserData {
  email?: string;
  phone?: string;
  externalId?: string;
  /** klik ID dari parameter URL ttclid */
  ttclid?: string;
  /** cookie _ttp */
  ttp?: string;
  ip?: string;
  userAgent?: string;
}

export interface TikTokEventInput {
  /** Nama event TikTok: CompletePayment, InitiateCheckout, ViewContent, Registration */
  eventName: "CompletePayment" | "InitiateCheckout" | "ViewContent" | "Registration";
  eventId: string;
  eventTime?: number;
  pageUrl?: string;
  user: TikTokUserData;
  properties?: Record<string, unknown>;
}

export interface TikTokConfig {
  pixelId: string;
  accessToken: string;
  testEventCode?: string;
}

export async function sendTikTokEvent(
  cfg: TikTokConfig,
  input: TikTokEventInput
): Promise<{ ok: boolean; status: number; body: unknown }> {
  if (!cfg.pixelId || !cfg.accessToken) {
    return { ok: false, status: 0, body: "TikTok pixel ID atau access token tiada." };
  }

  const user: Record<string, unknown> = {};
  if (input.user.email) user.email = hash(input.user.email);
  if (input.user.phone) user.phone = hashPhone(input.user.phone);
  if (input.user.externalId) user.external_id = hash(input.user.externalId);
  if (input.user.ttclid) user.ttclid = input.user.ttclid;
  if (input.user.ttp) user.ttp = input.user.ttp;
  if (input.user.ip) user.ip = input.user.ip;
  if (input.user.userAgent) user.user_agent = input.user.userAgent;

  const payload: Record<string, unknown> = {
    event_source: "web",
    event_source_id: cfg.pixelId,
    data: [
      {
        event: input.eventName,
        event_time: input.eventTime ?? Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        user,
        ...(input.properties ? { properties: input.properties } : {}),
        ...(input.pageUrl ? { page: { url: input.pageUrl } } : {}),
      },
    ],
  };
  if (cfg.testEventCode) payload.test_event_code = cfg.testEventCode;

  try {
    const res = await fetch(TIKTOK_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": cfg.accessToken,
      },
      body: JSON.stringify(payload),
    });
    const body = await res.json().catch(() => null);
    // TikTok pulangkan 200 walaupun ada ralat — semak field `code`
    const okCode = (body as { code?: number } | null)?.code === 0;
    if (!res.ok || !okCode) console.error("TikTok Events API gagal:", res.status, body);
    return { ok: res.ok && okCode, status: res.status, body };
  } catch (err) {
    console.error("TikTok Events API ralat rangkaian:", err);
    return { ok: false, status: 0, body: String(err) };
  }
}
