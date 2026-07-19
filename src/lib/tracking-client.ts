"use client";

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[2]) : undefined;
}

/**
 * Kumpul pengenalan iklan dari browser.
 * _fbp / _fbc ditetapkan oleh pixel Meta. Jika _fbc tiada tetapi URL ada
 * `fbclid` (pelawat baru dari iklan), kita bina sendiri mengikut format Meta.
 */
export function getAdIdentifiers() {
  const fbp = getCookie("_fbp");
  let fbc = getCookie("_fbc");

  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get("fbclid");
    if (!fbc && fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  }

  const ttp = getCookie("_ttp");
  let ttclid: string | undefined;
  if (typeof window !== "undefined") {
    ttclid = new URLSearchParams(window.location.search).get("ttclid") ?? undefined;
  }

  return { fbp, fbc, ttp, ttclid };
}

/** ID unik untuk nyah-duplikasi event browser vs server. */
export function newEventId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Rekod InitiateCheckout: hantar dari browser DAN server (guna event_id sama
 * supaya Meta/TikTok kira sekali sahaja), serta simpan data atribusi sebelum
 * pengguna keluar ke laman pembayaran CHIP.
 */
export async function trackInitiateCheckout() {
  const ids = getAdIdentifiers();
  const eventId = newEventId("ic");

  // 1) Event browser (dedup guna eventID yang sama)
  try {
    window.fbq?.("track", "InitiateCheckout", { currency: "MYR", value: 29 }, { eventID: eventId });
    window.ttq?.track("InitiateCheckout", { currency: "MYR", value: 29 }, { event_id: eventId });
  } catch { /* abaikan */ }

  // 2) Event server + simpan atribusi (penting untuk Purchase nanti)
  try {
    await fetch("/api/track/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...ids, eventId, sourceUrl: window.location.href }),
    });
  } catch { /* jangan halang pembelian */ }

  return eventId;
}
