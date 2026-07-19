import crypto from "crypto";

const GRAPH_VERSION = "v21.0";

/** Meta mahu semua PII di-hash SHA-256 (lowercase & trim dulu). */
function hash(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

/** Nombor telefon: buang semua bukan-digit sebelum hash. */
function hashPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  return crypto.createHash("sha256").update(digits).digest("hex");
}

export interface MetaUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  externalId?: string;
  /** cookie _fbp dari browser */
  fbp?: string;
  /** cookie _fbc dari browser (atau dibina dari fbclid) */
  fbc?: string;
  clientIp?: string;
  clientUserAgent?: string;
}

export interface MetaEventInput {
  eventName: "Purchase" | "InitiateCheckout" | "Lead" | "CompleteRegistration" | "ViewContent" | "PageView";
  /** WAJIB untuk deduplication dengan pixel browser */
  eventId: string;
  eventTime?: number;
  eventSourceUrl?: string;
  actionSource?: "website" | "system_generated";
  user: MetaUserData;
  customData?: Record<string, unknown>;
}

export interface MetaConfig {
  pixelId: string;
  accessToken: string;
  testEventCode?: string;
}

function buildUserData(u: MetaUserData) {
  const ud: Record<string, unknown> = {};
  if (u.email) ud.em = [hash(u.email)];
  if (u.phone) ud.ph = [hashPhone(u.phone)];
  if (u.firstName) ud.fn = [hash(u.firstName)];
  if (u.externalId) ud.external_id = [hash(u.externalId)];
  // fbp/fbc TIDAK di-hash — hantar mentah
  if (u.fbp) ud.fbp = u.fbp;
  if (u.fbc) ud.fbc = u.fbc;
  if (u.clientIp) ud.client_ip_address = u.clientIp;
  if (u.clientUserAgent) ud.client_user_agent = u.clientUserAgent;
  return ud;
}

/**
 * Hantar event ke Meta Conversions API (server-side).
 * Guna untuk event yang pixel browser tak dapat tangkap — terutamanya
 * Purchase yang berlaku selepas pembayaran di CHIP.
 */
export async function sendMetaEvent(
  cfg: MetaConfig,
  input: MetaEventInput
): Promise<{ ok: boolean; status: number; body: unknown }> {
  if (!cfg.pixelId || !cfg.accessToken) {
    return { ok: false, status: 0, body: "Meta pixel ID atau access token tiada." };
  }

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: input.eventName,
        event_time: input.eventTime ?? Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: input.actionSource ?? "website",
        ...(input.eventSourceUrl ? { event_source_url: input.eventSourceUrl } : {}),
        user_data: buildUserData(input.user),
        ...(input.customData ? { custom_data: input.customData } : {}),
      },
    ],
  };
  if (cfg.testEventCode) payload.test_event_code = cfg.testEventCode;

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${cfg.pixelId}/events?access_token=${encodeURIComponent(cfg.accessToken)}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await res.json().catch(() => null);
    if (!res.ok) console.error("Meta CAPI gagal:", res.status, body);
    return { ok: res.ok, status: res.status, body };
  } catch (err) {
    console.error("Meta CAPI ralat rangkaian:", err);
    return { ok: false, status: 0, body: String(err) };
  }
}
