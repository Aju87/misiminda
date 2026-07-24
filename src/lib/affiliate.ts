import { serviceClient } from "@/lib/ad-settings";

export const COMMISSION_SEN = 1500;       // RM15 per jualan
export const APP_PRICE_SEN = 3500;        // RM35
export const AFFILIATE_PRICE_SEN = 5000;  // RM50
export const HOLD_DAYS = 7;               // tempoh tahan = tempoh refund
export const WITHDRAW_COOLDOWN_DAYS = 3;  // withdraw sekali setiap 3 hari
export const MIN_WITHDRAW_SEN = 1500;     // minimum 1 komisen

/** Jana kod rujukan unik 6 aksara (huruf besar + nombor, tanpa yang mengelirukan). */
export async function generateUniqueCode(): Promise<string> {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // tanpa I,O,0,1
  const admin = serviceClient();
  for (let attempt = 0; attempt < 12; attempt++) {
    let code = "";
    for (let i = 0; i < 6; i++) code += alphabet[Math.floor(Math.random() * alphabet.length)];
    const { data } = await admin.from("affiliates").select("code").eq("code", code).maybeSingle();
    if (!data) return code;
  }
  // fallback berasaskan masa
  return "MM" + Date.now().toString(36).toUpperCase().slice(-4);
}

export interface AffiliateBalances {
  pendingSen: number;    // dalam tempoh tahan 7 hari
  availableSen: number;  // boleh dikeluarkan sekarang
  requestedSen: number;  // sedang menunggu bayaran admin
  paidSen: number;       // sudah dibayar
  totalReferred: number; // jumlah pelanggan dirujuk (converted)
}

export async function getBalances(affiliateId: string): Promise<AffiliateBalances> {
  const admin = serviceClient();
  const nowIso = new Date().toISOString();

  const { data: comms } = await admin
    .from("commissions")
    .select("amount_sen, status, available_at")
    .eq("affiliate_id", affiliateId);

  let pending = 0, available = 0, requested = 0, paid = 0, count = 0;
  for (const c of comms ?? []) {
    count++;
    if (c.status === "paid") paid += c.amount_sen;
    else if (c.status === "requested") requested += c.amount_sen;
    else if (c.status === "pending") {
      if (c.available_at <= nowIso) available += c.amount_sen;
      else pending += c.amount_sen;
    }
  }

  return {
    pendingSen: pending,
    availableSen: available,
    requestedSen: requested,
    paidSen: paid,
    totalReferred: count,
  };
}

export function rm(sen: number): string {
  return `RM${(sen / 100).toFixed(2)}`;
}
