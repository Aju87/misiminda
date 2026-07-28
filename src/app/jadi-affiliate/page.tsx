"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Button, Card, Badge, Logo } from "@/components/ui";

type State = "loading" | "guest" | "member" | "affiliate";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function JadiAffiliatePage() {
  const [state, setState] = useState<State>("loading");
  const [joinUrl, setJoinUrl] = useState("");

  useEffect(() => {
    (async () => {
      const supabase = createClient();

      // link pembayaran RM50 (public read)
      try {
        const { data } = await supabase
          .from("site_settings").select("value").eq("key", "chip_affiliate_url").maybeSingle();
        if (data?.value) setJoinUrl(data.value);
      } catch { /* ignore */ }

      // status pengguna
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setState("guest"); return; }
      try {
        const res = await fetch("/api/affiliate/me");
        const d = await res.json();
        setState(d.isAffiliate ? "affiliate" : "member");
      } catch {
        setState("member");
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF2]">
      {/* Nav */}
      <nav className="border-b-4 border-black bg-[#26D182] sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center"><Logo size={44} /></Link>
          <Link href="/pricing"><Button variant="secondary" size="sm">Beli App</Button></Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-14 pb-8 text-center flex flex-col items-center gap-5">
        <Badge variant="black" className="text-sm">🤝 PROGRAM AFFILIATE MISIMINDA</Badge>
        <h1 className="text-4xl md:text-6xl font-black uppercase leading-[1.05]">
          Jana Pendapatan<br />
          <span className="text-[#0f8a2b]">Hanya Kongsi Link.</span>
        </h1>
        <p className="text-lg font-semibold text-gray-700 max-w-xl">
          Sertai sekali dengan <strong>RM50</strong>, dapat akses penuh app untuk anak anda,
          dan raih <strong>RM15 komisen</strong> setiap kali orang beli app melalui link anda.
          Tiada modal stok. Tiada hantar barang. Tiada risiko.
        </p>

        {/* Contoh pendapatan */}
        <div className="bg-[#FFB800] border-4 border-black rounded-2xl px-6 py-4 font-black"
             style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}>
          <p className="text-sm uppercase mb-1">Potensi Pendapatan</p>
          <p className="text-lg">
            10 jualan = <span className="text-[#0f7a5c]">RM150</span> ·
            50 = <span className="text-[#0f7a5c]">RM750</span> ·
            100 = <span className="text-[#0f7a5c]">RM1,500</span>
          </p>
        </div>

        <CtaButton state={state} joinUrl={joinUrl} />
      </section>

      {/* Bagaimana ia berfungsi */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-black uppercase text-center mb-8">Bagaimana Ia Berfungsi</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { n: "1", e: "💳", t: "Sertai RM50", d: "Bayar sekali sahaja. Akaun affiliate anda aktif serta-merta selepas bayaran." },
            { n: "2", e: "🔗", t: "Kongsi Link Anda", d: "Dapat link unik. Kongsi di WhatsApp, Facebook, TikTok, Instagram — di mana sahaja." },
            { n: "3", e: "💰", t: "Dapat Komisen RM15", d: "Setiap orang yang beli app melalui link anda = RM15 masuk. Withdraw ke bank setiap 3 hari." },
          ].map((s, i) => (
            <motion.div key={s.n} {...fadeUp} transition={{ delay: i * 0.1 }}>
              <Card color="white" className="h-full text-center flex flex-col items-center gap-2 py-8">
                <div className="w-12 h-12 rounded-2xl bg-[#26D182] border-3 border-black flex items-center justify-center font-black text-xl"
                     style={{ boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)" }}>
                  {s.n}
                </div>
                <span className="text-4xl mt-2">{s.e}</span>
                <h3 className="font-black text-lg uppercase">{s.t}</h3>
                <p className="font-semibold text-sm text-gray-700">{s.d}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Kelebihan */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-black uppercase text-center mb-8">Kenapa Sertai?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { e: "✅", t: "Dapat App Penuh", d: "Nilai RM35 — guna untuk anak anda sendiri, sambil jana pendapatan." },
            { e: "💰", t: "Komisen Tanpa Had", d: "RM15 setiap jualan. Makin ramai anda rujuk, makin banyak pendapatan." },
            { e: "📊", t: "Dashboard Sendiri", d: "Jejak jualan, komisen dan withdraw — semua masa nyata." },
            { e: "🏦", t: "Withdraw ke Bank", d: "Keluarkan komisen terus ke akaun bank anda, setiap 3 hari." },
            { e: "🛡️", t: "Komisen Dijamin", d: "Selepas tempoh refund 7 hari, komisen anda selamat dan boleh dikeluarkan." },
            { e: "🚀", t: "Produk Mudah Jual", d: "Setiap ibu bapa nak anak pandai — Matematik & Sains ikut silibus KSSR." },
          ].map((f, i) => (
            <motion.div key={f.t} {...fadeUp} transition={{ delay: i * 0.05 }}>
              <Card color="mint" className="flex gap-3 h-full">
                <span className="text-3xl">{f.e}</span>
                <div>
                  <h3 className="font-black uppercase">{f.t}</h3>
                  <p className="font-semibold text-sm text-gray-700 mt-0.5">{f.d}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ ringkas */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-black uppercase text-center mb-8">Soalan Lazim</h2>
        <div className="flex flex-col gap-3">
          {[
            { q: "Berapa saya kena bayar untuk sertai?", a: "RM50 sekali sahaja. Anda terus dapat akses penuh app + hak affiliate. Tiada yuran bulanan." },
            { q: "Berapa komisen setiap jualan?", a: "RM15 untuk setiap orang yang beli app (RM35) melalui link rujukan anda." },
            { q: "Bila boleh withdraw?", a: "Komisen boleh dikeluarkan selepas 7 hari (tempoh jaminan refund pelanggan). Withdraw dibenarkan sekali setiap 3 hari, terus ke akaun bank anda." },
            { q: "Perlu ada anak untuk sertai?", a: "Tidak. Sesiapa boleh jadi affiliate. Tapi anda tetap dapat akses app penuh — boleh guna untuk anak, adik, atau anak saudara." },
            { q: "Macam mana saya dibayar?", a: "Anda mohon withdraw dari dashboard, kami semak, dan bayar terus ke akaun bank yang anda daftar." },
          ].map((f, i) => (
            <motion.div key={f.q} {...fadeUp} transition={{ delay: i * 0.04 }}>
              <Card color="white" className="flex flex-col gap-2">
                <h3 className="font-black flex items-start gap-2"><span>❓</span>{f.q}</h3>
                <p className="font-semibold text-sm text-gray-700">{f.a}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA akhir */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <Card color="yellow" className="flex flex-col items-center text-center gap-4 py-12">
          <h2 className="text-3xl md:text-4xl font-black uppercase">Sedia Untuk Mula?</h2>
          <p className="font-bold text-lg">Sertai hari ini — link anda boleh mula jana komisen serta-merta.</p>
          <CtaButton state={state} joinUrl={joinUrl} />
        </Card>
      </section>

      <footer className="border-t-4 border-black bg-black text-white py-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-3 text-center">
          <Logo size={40} />
          <p className="text-xs font-medium text-white/50">© 2026 MisiMinda. Program Affiliate.</p>
        </div>
      </footer>
    </div>
  );
}

/** Butang CTA yang berubah ikut status pengguna. */
function CtaButton({ state, joinUrl }: { state: State; joinUrl: string }) {
  if (state === "loading") {
    return <div className="h-14 flex items-center font-black text-gray-400 animate-pulse">Memuatkan...</div>;
  }
  if (state === "affiliate") {
    return (
      <Link href="/affiliate">
        <Button size="xl">✅ Buka Dashboard Affiliate →</Button>
      </Link>
    );
  }
  if (state === "member") {
    if (!joinUrl) {
      return (
        <div className="text-center">
          <Button size="xl" disabled>Sertai — RM50</Button>
          <p className="text-xs font-bold text-red-600 mt-2">⚠️ Link pembayaran belum disediakan.</p>
        </div>
      );
    }
    return (
      <a href={joinUrl}>
        <Button size="xl">Sertai Sekarang — RM50 🚀</Button>
      </a>
    );
  }
  // guest
  return (
    <div className="flex flex-col items-center gap-2">
      <Link href="/auth?tab=signup&next=/jadi-affiliate">
        <Button size="xl">Daftar &amp; Sertai — RM50 🚀</Button>
      </Link>
      <p className="text-xs font-bold text-gray-600">
        Daftar akaun percuma dahulu, kemudian teruskan bayaran RM50
      </p>
    </div>
  );
}
