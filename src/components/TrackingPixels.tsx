"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function injectMetaPixel(pixelId: string) {
  if (window.fbq) return;
  const script = document.createElement("script");
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);
}

function injectTikTokPixel(pixelId: string) {
  if (window.ttq) return;
  const script = document.createElement("script");
  script.innerHTML = `
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)}(window, document, 'ttq');
      ttq.load('${pixelId}');
      ttq.page();
    }(window, document, 'ttq');
  `;
  document.head.appendChild(script);
}

export function TrackingPixels() {
  const pathname = usePathname();
  const [loaded, setLoaded] = useState(false);

  // Muat pixel ID dari site_settings sekali sahaja
  useEffect(() => {
    async function loadPixels() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("site_settings")
          .select("key, value")
          .in("key", ["meta_pixel_id", "tiktok_pixel_id"]);

        if (!data) return;
        const settings = Object.fromEntries(data.map((r) => [r.key, r.value]));

        const metaId = settings.meta_pixel_id?.trim();
        const tiktokId = settings.tiktok_pixel_id?.trim();

        if (metaId && /^\d+$/.test(metaId)) injectMetaPixel(metaId);
        if (tiktokId && /^[A-Za-z0-9]+$/.test(tiktokId)) injectTikTokPixel(tiktokId);
        setLoaded(true);
      } catch {
        // Supabase belum dikonfigurasi (contoh: dev tempatan) — abaikan
      }
    }
    loadPixels();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track page view pada setiap tukar halaman (SPA navigation)
  useEffect(() => {
    if (!loaded) return;
    window.fbq?.("track", "PageView");
    window.ttq?.page();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, loaded]);

  return null;
}
