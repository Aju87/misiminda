"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Button, Card, Badge, Logo } from "@/components/ui";
import { SUBSCRIPTION_PLANS } from "@/lib/constants";

export default function PricingPage() {
  const router = useRouter();
  const { user, parent } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const plan = SUBSCRIPTION_PLANS.lifetime;
  const isSubscribed = parent?.subscription_status === "active";

  async function handleSubscribe() {
    if (!user) {
      router.push("/auth?tab=signup");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/chip/create-purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: "lifetime" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Ralat berlaku. Cuba lagi.");
        setLoading(false);
        return;
      }

      window.location.href = data.checkout_url;
    } catch {
      setError("Ralat sambungan. Sila cuba lagi.");
      setLoading(false);
    }
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
          <Badge variant="mint">💳 Harga</Badge>
          <h1 className="text-5xl font-black uppercase leading-none">
            Satu Harga.<br />Seumur Hidup.
          </h1>
          <p className="text-lg font-semibold text-gray-700 max-w-lg">
            Bayar sekali, akses selamanya. Tiada bayaran bulanan. Tiada kejutan.
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

        {/* Main pricing card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full"
        >
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
                  loading={loading}
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

        {error && (
          <Card color="red" className="w-full text-center">
            <p className="font-bold">{error}</p>
          </Card>
        )}

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
