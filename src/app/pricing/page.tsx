"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";
import { Button, Card, Badge, Logo } from "@/components/ui";
import { SUBSCRIPTION_PLANS } from "@/lib/constants";
import { trackInitiateCheckout } from "@/lib/tracking-client";

const FALLBACK_CHIP_URL = "https://pay.chip-in.asia/misiminda";

export default function PricingPage() {
  const router = useRouter();
  const { user, parent } = useAuth();

  const plan = SUBSCRIPTION_PLANS.lifetime;
  const isSubscribed = parent?.subscription_status === "active";

  // URL pembayaran app boleh diubah dari dashboard admin (site_settings.chip_app_url)
  const [chipUrl, setChipUrl] = useState(FALLBACK_CHIP_URL);
  useEffect(() => {
    (async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("site_settings").select("value").eq("key", "chip_app_url").maybeSingle();
        if (data?.value) setChipUrl(data.value);
      } catch { /* guna fallback */ }
    })();
    // kaitkan rujukan affiliate sebelum pembelian (jika log masuk)
    fetch("/api/affiliate/attribute", { method: "POST" }).catch(() => {});
  }, []);

  async function handleSubscribe() {
    if (!user) {
      router.push("/auth?tab=signup");
      return;
    }

    // Rekod InitiateCheckout + simpan data atribusi iklan SEBELUM keluar ke CHIP.
    // Ada had masa supaya pembelian tidak tersekat jika rangkaian perlahan.
    try {
      await Promise.race([
        trackInitiateCheckout(),
        new Promise((r) => setTimeout(r, 1200)),
      ]);
    } catch { /* jangan halang pembelian */ }

    window.location.href = chipUrl;
  }

  return (
    <div className="min-h-screen bg-[#FFFDF2]">
      {/* Navbar */}
      <nav className="border-b-4 border-black bg-[#FFB800] sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo size={48} />
          </Link>
          {user ? (
            <Link href="/dashboard">
              <Button variant="secondary" size="sm">Dashboard</Button>
            </Link>
          ) : (
            <Link href="/auth">
              <Button variant="secondary" size="sm">Log Masuk</Button>
            </Link>
          )}
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-16 flex flex-col items-center gap-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center flex flex-col gap-4"
        >
          <Badge variant="mint">🤝 Program Affiliate + 💳 Harga</Badge>
          <h1 className="text-5xl font-black uppercase leading-none">
            Guna App.<br />Atau <span className="text-[#0f8a2b]">Jana Pendapatan.</span>
          </h1>
          <p className="text-lg font-semibold text-gray-700 max-w-lg">
            Sertai sebagai affiliate dan buat duit hanya dengan kongsi link — atau
            beli app terus untuk anak anda. Pilihan di tangan anda.
          </p>
        </motion.div>

        {/* Already subscribed */}
        {isSubscribed && (
          <Card color="mint" className="w-full text-center">
            <p className="font-black text-lg">✅ Anda sudah mempunyai akses penuh!</p>
            <p className="font-semibold text-sm mt-1">Akaun anda telah diaktifkan.</p>
            <Link href="/dashboard" className="mt-3 inline-block">
              <Button variant="secondary" size="sm">Pergi Dashboard</Button>
            </Link>
          </Card>
        )}

        {/* ===== PROGRAM AFFILIATE (DI ATAS) ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full"
        >
          <div
            style={{ boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
            className="border-4 border-black rounded-2xl bg-[#26D182] p-8 relative"
          >
            <div className="absolute -top-4 left-8">
              <Badge variant="black" className="text-sm px-4 py-1.5">🤝 PALING BERBALOI</Badge>
            </div>

            <div className="pt-2 flex flex-col items-center gap-4 text-center">
              <p className="font-black text-sm uppercase tracking-widest">Pakej Affiliate</p>
              <div className="flex items-end justify-center gap-2">
                <span className="text-7xl font-black leading-none">RM50</span>
              </div>
              <p className="font-bold text-lg max-w-xl">
                Jana pendapatan <strong>hanya dengan kongsi link</strong> —
                tiada modal stok, tiada hantar barang, tiada risiko.
                Setiap orang yang beli app melalui link anda ={" "}
                <span className="bg-black text-white px-2 rounded">RM15</span> masuk poket anda.
              </p>

              {/* Kelebihan */}
              <div className="grid sm:grid-cols-2 gap-3 w-full max-w-xl text-left my-1">
                {[
                  "✅ Akses penuh app untuk anak anda (nilai RM35)",
                  "🔗 Link promosi unik anda sendiri",
                  "💰 Komisen RM15 setiap jualan — tiada had",
                  "📊 Dashboard jejak jualan masa nyata",
                  "🏦 Withdraw terus ke akaun bank, setiap 3 hari",
                  "♾️ Komisen berulang selagi orang beli",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2 bg-white/95 border-2 border-black rounded-lg px-3 py-2">
                    <span className="font-bold text-sm">{f}</span>
                  </div>
                ))}
              </div>

              {/* Contoh pendapatan */}
              <div className="bg-white border-3 border-black rounded-xl px-5 py-3 font-black text-sm">
                Kongsi & jual 10 app = <span className="text-[#0f7a5c] text-lg">RM150</span> ·
                50 app = <span className="text-[#0f7a5c] text-lg">RM750</span> ·
                100 app = <span className="text-[#0f7a5c] text-lg">RM1,500</span> 🚀
              </div>

              {/* 3 langkah */}
              <div className="grid sm:grid-cols-3 gap-3 w-full max-w-xl my-1">
                {[
                  { i: "1️⃣", t: "Sertai RM50", d: "Bayar sekali, aktif serta-merta" },
                  { i: "2️⃣", t: "Kongsi Link", d: "WhatsApp, FB, TikTok, IG" },
                  { i: "3️⃣", t: "Dapat RM15", d: "Setiap jualan, terus ke bank" },
                ].map((x) => (
                  <div key={x.t} className="bg-white/95 border-3 border-black rounded-xl p-3">
                    <div className="text-2xl">{x.i}</div>
                    <p className="font-black text-sm mt-1">{x.t}</p>
                    <p className="text-xs font-semibold text-gray-700">{x.d}</p>
                  </div>
                ))}
              </div>

              <Link href="/affiliate">
                <Button variant="secondary" size="xl">Sertai Program Affiliate — RM50 →</Button>
              </Link>
              <p className="text-xs font-bold text-white/90">
                🛡️ Withdraw ke akaun bank anda · Komisen dijamin selepas tempoh refund 7 hari
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pemisah */}
        <div className="flex items-center gap-4 w-full max-w-md">
          <div className="flex-1 h-1 bg-black rounded-full" />
          <span className="font-black text-sm text-gray-600 uppercase">Atau</span>
          <div className="flex-1 h-1 bg-black rounded-full" />
        </div>

        {/* ===== HARGA APP RM35 (DI BAWAH) ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="w-full"
        >
          <p className="text-center font-bold text-gray-600 mb-3">
            Cuma nak guna app untuk anak anda? Beli terus:
          </p>
          <div
            style={{ boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
            className="border-4 border-black rounded-2xl bg-[#FFB800] p-8 relative"
          >
            {/* Badge */}
            <div className="absolute -top-4 left-8">
              <Badge variant="black" className="text-sm px-4 py-1.5">
                🔥 {plan.badge}
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2">
              {/* Price */}
              <div>
                <p className="font-black text-sm uppercase tracking-widest mb-1">
                  {plan.name}
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-7xl font-black leading-none">
                    {plan.displayPrice}
                  </span>
                </div>
                <p className="font-bold text-sm mt-1">Bayaran sekali sahaja</p>
              </div>

              {/* CTA */}
              <div className="w-full sm:w-auto">
                <Button
                  size="xl"
                  variant="secondary"
                  fullWidth
                  disabled={isSubscribed}
                  onClick={handleSubscribe}
                >
                  {isSubscribed ? "✅ Dah Aktif" : "Beli Sekarang 🚀"}
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-3 mt-8 pt-6 border-t-4 border-black">
              {plan.features.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-black text-white rounded-md flex items-center justify-center text-xs font-black shrink-0">✓</span>
                  <span className="font-bold text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "🔒 Pembayaran Selamat via CHIP",
            "💳 FPX & Kad Kredit/Debit",
            "🇲🇾 Ringgit Malaysia (MYR)",
            "♾️ Akses Seumur Hidup",
          ].map((item) => (
            <div
              key={item}
              className="border-2 border-black rounded-xl px-4 py-2 bg-white font-bold text-sm"
            >
              {item}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-2xl font-black uppercase text-center">Soalan Lazim</h2>
          {[
            {
              q: "Berapa lama akses ini?",
              a: "Seumur hidup — bayar sekali, guna selama-lamanya termasuk semua kemaskini akan datang.",
            },
            {
              q: "Berapa ramai kanak-kanak boleh guna?",
              a: "Sehingga 4 profil kanak-kanak dalam satu akaun ibu bapa.",
            },
            {
              q: "Kaedah pembayaran apa diterima?",
              a: "FPX (semua bank Malaysia), Kad Kredit, dan Kad Debit melalui CHIP.",
            },
            {
              q: "Boleh dapat refund?",
              a: "Kami menawarkan jaminan wang kembali dalam tempoh 7 hari jika tidak berpuas hati.",
            },
          ].map((faq) => (
            <Card key={faq.q} color="white" className="flex flex-col gap-2">
              <h3 className="font-black">{faq.q}</h3>
              <p className="font-semibold text-sm text-gray-700">{faq.a}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
