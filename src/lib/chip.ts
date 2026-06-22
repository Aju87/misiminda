import type { CHIPPaymentPayload, CHIPPurchase } from "@/types";

const CHIP_API_BASE = "https://gate.chip-in.asia/api/v1";
const CHIP_BRAND_ID = process.env.CHIP_BRAND_ID!;
const CHIP_SECRET_KEY = process.env.CHIP_SECRET_KEY!;

export async function createChipPurchase(
  payload: CHIPPaymentPayload
): Promise<CHIPPurchase> {
  const response = await fetch(`${CHIP_API_BASE}/purchases/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CHIP_SECRET_KEY}`,
    },
    body: JSON.stringify({
      brand_id: CHIP_BRAND_ID,
      ...payload,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "CHIP payment creation failed");
  }

  const data = await response.json();
  return {
    id: data.id,
    status: data.status,
    checkout_url: data.checkout_url,
    amount: data.purchase.total,
    reference: data.reference,
  };
}

export async function verifyChipWebhook(
  body: string,
  signature: string
): Promise<boolean> {
  const crypto = await import("crypto");
  const expectedSig = crypto
    .createHmac("sha256", CHIP_SECRET_KEY)
    .update(body)
    .digest("hex");
  return expectedSig === signature;
}
