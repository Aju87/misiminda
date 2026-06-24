"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Button, Card, Badge } from "@/components/ui";
import { SUBSCRIPTION_PLANS } from "@/lib/constants";

export default function PricingPage() {
  const router = useRouter();
  const { user, parent } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleSubscribe(planId: string) {
    if (!user) {
      router.push("/auth?tab=signup");
      return;
    }

    setLoading(planId);
    setError("");

    try {
      const res = await fetch("/api/chip/create-purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Ralat berlaku. Cuba lagi.");
        setLoading(null);
        return;
      }

      // Redirect to CHIP checkout
      window.location.href = data.checkout_url;
    } catch {
      setError("Ralat sambungan. Sila cuba lagi.");
      setLoading(null);
    }
  }

  const isSubscribed = parent?.subscription_status === "active";

  return (
    <div className="min-h-screen bg-[#FFFDF2]">
      {/* Navbar */}
      <nav className="border-b-4 border-black bg-[#FFB800] sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <span className="font-black text-xl uppercase">MisiMinda</span>
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

      <main className="max-w-5xl mx-auto px-4 py-16 flex flex-col items-center gap-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center flex flex-col gap-4"
        >
          <Badge variant="mint">💳 Pelan Harga</Badge>
          <h1 className="text-5xl font-black uppercase leading-none">
            Pilih Pelan Anda
          </h1>
          <p className="text-lg font-semibold text-gray-700 max-w-lg">
            Akses penuh ke semua misi, peringkat, dan sistem ganjaran.
            Tiada kontrak. Batalkan bila-bila masa.
          </p>
        </motion.div>

        {/* Already subscribed banner */}
        {isSubscribed && (
          <Card color="mint" className="w-full max-w-lg text-center">
            <p className="font-black text-lg">✅ Anda sudah berlangganan!</p>
            <p className="font-semibold text-sm mt-1">Langganan anda masih aktif.</p>
            <Link href="/dashboard" className="mt-3 inline-block">
              <Button variant="secondary" size="sm">Pergi Dashboard</Button>
            </Link>
          </Card>
        )}

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-3xl">
          {/* Monthly */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card color="white" className="flex flex-col gap-5 h-full">
              <div>
                <p className="font-black text-sm uppercase tracking-widest text-gray-500">
                  {SUBSCRIPTION_PLANS.monthly.name}
                </p>
                <div className="flex items-end gap-1 mt-1">
                  <span className="text-5xl font-black">
                    {SUBSCRIPTION_PLANS.monthly.displayPrice}
                  </span>
                  <span className="text-gray-500 font-bold mb-2">
                    /{SUBSCRIPTION_PLANS.monthly.period}
                  </span>
                </div>
              </div>

              <ul className="flex flex-col gap-2 flex-1">
                {SUBSCRIPTION_PLANS.monthly.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 font-semibold text-sm">
                    <span className="text-[#4ECDC4] font-black mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                fullWidth
                size="lg"
                variant="secondary"
                loading={loading === "monthly"}
                disabled={isSubscribed || loading !== null}
                onClick={() => handleSubscribe("monthly")}
              >
                {isSubscribed ? "Sudah Aktif" : "Langgan Bulanan"}
              </Button>
            </Card>
          </motion.div>

          {/* Yearly — highlighted */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div
              style={{ boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
              className="border-4 border-black rounded-2xl bg-[#FFB800] flex flex-col gap-5 p-5 h-full relative"
            >
              {/* Best value badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge variant="black" className="text-sm px-4 py-1">
                  ⭐ {SUBSCRIPTION_PLANS.yearly.badge}
                </Badge>
              </div>

              <div className="pt-2">
                <p className="font-black text-sm uppercase tracking-widest">
                  {SUBSCRIPTION_PLANS.yearly.name}
                </p>
                <div className="flex items-end gap-1 mt-1">
                  <span className="text-5xl font-black">
                    {SUBSCRIPTION_PLANS.yearly.displayPrice}
                  </span>
                  <span className="font-bold mb-2">/{SUBSCRIPTION_PLANS.yearly.period}</span>
                </div>
                <p className="text-sm font-bold text-black/70 mt-1">
                  Bersamaan RM12.42/bulan
                </p>
              </div>

              <ul className="flex flex-col gap-2 flex-1">
                {SUBSCRIPTION_PLANS.yearly.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 font-semibold text-sm">
                    <span className="font-black mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                fullWidth
                size="lg"
                variant="danger"
                loading={loading === "yearly"}
                disabled={isSubscribed || loading !== null}
                onClick={() => handleSubscribe("yearly")}
              >
                {isSubscribed ? "Sudah Aktif" : "Langgan Tahunan 🚀"}
              </Button>
            </div>
          </motion.div>
        </div>

        {error && (
          <Card color="red" className="w-full max-w-lg text-center">
            <p className="font-bold">{error}</p>
          </Card>
        )}

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "🔒 Pembayaran Selamat via CHIP",
            "💳 FPX & Kad Kredit/Debit",
            "❌ Tiada Kontrak",
            "🇲🇾 Ringgit Malaysia (MYR)",
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
        <div className="w-full max-w-2xl flex flex-col gap-4">
          <h2 className="text-2xl font-black uppercase text-center">Soalan Lazim</h2>
          {[
            {
              q: "Boleh batalkan langganan bila-bila masa?",
              a: "Ya. Tiada kontrak atau penalti. Batalkan dari dashboard anda.",
            },
            {
              q: "Berapa ramai kanak-kanak boleh guna satu akaun?",
              a: "Sehingga 4 profil kanak-kanak dalam satu akaun ibu bapa.",
            },
            {
              q: "Adakah ada percubaan percuma?",
              a: "Kami menawarkan 7 hari percubaan percuma untuk pengguna baru.",
            },
            {
              q: "Kaedah pembayaran apa yang diterima?",
              a: "FPX (semua bank Malaysia), Kad Kredit, dan Kad Debit melalui CHIP.",
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
