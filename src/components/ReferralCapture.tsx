"use client";

import { useEffect } from "react";

/**
 * Tangkap kod rujukan dari URL (?ref=CODE) dan simpan dalam cookie 30 hari.
 * Diletak dalam root layout supaya berfungsi pada mana-mana halaman pendaratan.
 * Cookie bukan httpOnly supaya dihantar semula ke API semasa daftar.
 */
export function ReferralCapture() {
  useEffect(() => {
    try {
      const ref = new URLSearchParams(window.location.search).get("ref");
      if (ref && /^[A-Z0-9]{4,10}$/i.test(ref)) {
        const days = 30;
        document.cookie = `mm_ref=${encodeURIComponent(ref.toUpperCase())}; path=/; max-age=${days * 86400}; SameSite=Lax`;
      }
    } catch { /* abaikan */ }
  }, []);
  return null;
}
