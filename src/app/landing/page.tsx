"use client";

import Link from "next/link";
import { Baloo_2 } from "next/font/google";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui";
import { DemoWidget } from "@/components/landing/DemoWidget";
import { AppScreens } from "@/components/landing/AppScreens";

const baloo = Baloo_2({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const APP_URL = "https://misiminda.my/dashboard";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

/* ============ DATA ============ */

const PAIN_POINTS = [
  {
    emoji: "😟",
    title: "Anak takut Matematik?",
    desc: "Buku latihan tebal, soalan kering — kanak-kanak rasa math macam hukuman, bukan keseronokan.",
  },
  {
    emoji: "⏰",
    title: "Sibuk, tiada masa mengajar?",
    desc: "Balik kerja dah penat. Nak drill sifir dengan anak setiap malam memang susah nak konsisten.",
  },
  {
    emoji: "📱",
    title: "Screen time tiada faedah?",
    desc: "Anak melekat pada TikTok & YouTube berjam-jam — masa berlalu tanpa belajar apa-apa.",
  },
  {
    emoji: "💸",
    title: "Yuran tuisyen mahal?",
    desc: "Kelas tuisyen math RM80+/jam setiap bulan, tapi hasil belum tentu nampak.",
  },
];

const DEMO_BULLETS = [
  {
    emoji: "🎯",
    title: "Pembelajaran fokus",
    desc: "Setiap sesi 5–10 minit sahaja. Cukup untuk otak kecil, tiada overload.",
  },
  {
    emoji: "🗺️",
    title: "Misi superhero bercerita",
    desc: "RAGA, Agen Nur & Kembar Ria — anak teruja nak tahu sambungan cerita sambil jawab soalan.",
  },
  {
    emoji: "⭐",
    title: "Ganjaran bintang & hadiah sebenar",
    desc: "Anak kumpul bintang, ibu bapa tetapkan hadiah. Motivasi yang betul-betul menjadi.",
  },
  {
    emoji: "📊",
    title: "Progres nampak jelas",
    desc: "Dashboard ibu bapa tunjuk topik mana anak dah kuasai, mana perlu ulang.",
  },
];

const VALUE_STACK = [
  {
    emoji: "🗺️",
    title: "Misi Matematik Superhero",
    desc: "270 soalan bercerita bersama RAGA, Agen Nur & Kembar Ria. 9 misi merentas 3 peringkat sekolah rendah — sistem unlock buat anak nak terus maju.",
    value: "RM150",
    bg: "from-[#fff4d6] to-[#ffe9b3]",
  },
  {
    emoji: "🔬",
    title: "Subjek Sains Penuh — 511 Soalan",
    desc: "40 topik ikut PERMATA, KSPK & KSSR: haiwan, deria, litar elektrik, fotosintesis, sistem suria, tenaga & mesin ringkas.",
    value: "RM150",
    bg: "from-[#dcf9e9] to-[#b8f0d4]",
  },
  {
    emoji: "⚡",
    title: "Latihan Pantas 8 Kategori",
    desc: "Tambah-tolak, sifir, bahagi, pecahan, wang, masa & ukuran, geometri, statistik — semua ikut silibus KSPK + KSSR.",
    value: "RM120",
    bg: "from-[#d8f6ff] to-[#bfeeff]",
  },
  {
    emoji: "⭐",
    title: "Sistem Bintang & Hadiah",
    desc: "Anak kumpul bintang setiap misi. Ibu bapa tetapkan hadiah sebenar untuk ditebus — anak ketagih nak belajar lagi.",
    value: "RM80",
    bg: "from-[#ffe4ec] to-[#ffd1e0]",
  },
  {
    emoji: "📊",
    title: "Dashboard Ibu Bapa",
    desc: "Pantau kemajuan setiap anak, urus hadiah, akses selamat dengan PIN peribadi.",
    value: "RM90",
    bg: "from-[#e6e0ff] to-[#d5ccff]",
  },
  {
    emoji: "👨‍👩‍👧‍👦",
    title: "Sehingga 4 Profil Anak",
    desc: "Satu bayaran, semua adik-beradik boleh guna. Setiap anak ada profil, progres & bintang sendiri.",
    value: "RM100",
    bg: "from-[#dcf9e9] to-[#c3f2d9]",
  },
  {
    emoji: "♾️",
    title: "Kemaskini Selamanya",
    desc: "Semua misi baharu, topik baharu dan penambahbaikan akan datang — percuma, tanpa bayaran tambahan.",
    value: "RM99",
    bg: "from-[#fff0d9] to-[#ffe1b8]",
  },
];

const TESTIMONIALS = [
  {
    quote: "Anak saya 6 tahun sekarang minta sendiri nak main MisiMinda lepas balik sekolah. Dulu nampak buku latihan terus buat hal.",
    name: "Puan Siti Aishah",
    role: "Ibu 2 anak · Shah Alam",
    bg: "from-[#fff1e0] to-[#ffe3c9]",
  },
  {
    quote: "Anak 8 tahun dah hafal sifir 2 sampai 5 dalam sebulan — tanpa paksa. Dashboard progres paling saya suka. Berbaloi setiap sen.",
    name: "Encik Ahmad Zulkifli",
    role: "Ayah · Bangi",
    bg: "from-[#dff8ee] to-[#c8f2df]",
  },
  {
    quote: "Bayar sekali je, 3 orang anak saya umur berbeza semua boleh guna. Jauh lebih jimat dari tuisyen.",
    name: "Puan Lim Mei Ling",
    role: "Ibu 3 anak · Petaling Jaya",
    bg: "from-[#efe6ff] to-[#e0d1ff]",
  },
];

const FAQS = [
  {
    q: "Berapa lama akses ini?",
    a: "Seumur hidup. Bayar RM29 sekali sahaja — tiada langganan bulanan, tiada bayaran tersembunyi, termasuk semua kemaskini akan datang.",
  },
  {
    q: "Sesuai untuk umur berapa?",
    a: "2 hingga 12 tahun. Empat peringkat: Prasekolah Si Kecil (2–5, kenal huruf & mengeja), KSPK (5–6), KSSR Tahap 1 (7–9) dan KSSR Tahap 2 (10–12).",
  },
  {
    q: "Subjek apa yang ada?",
    a: "Dua subjek penuh: Matematik (misi superhero, sifir, wang, geometri) dan Sains (haiwan, deria, litar elektrik, fotosintesis, sistem suria). Anak pilih subjek selepas pilih profil.",
  },
  {
    q: "Berapa ramai anak boleh guna?",
    a: "Sehingga 4 profil anak dalam satu akaun. Setiap anak ada progres dan bintang masing-masing.",
  },
  {
    q: "Perlu download app tak?",
    a: "Tidak perlu. MisiMinda web app — buka terus dari browser di phone, tablet atau PC. Boleh guna di mana-mana peranti.",
  },
  {
    q: "Selamat untuk kanak-kanak?",
    a: "100% selamat. Tiada iklan, tiada pop-up luar, tiada chat dengan orang asing. Dashboard ibu bapa dilindungi PIN.",
  },
  {
    q: "Macam mana nak bayar? Boleh refund?",
    a: "FPX (semua bank Malaysia), kad kredit/debit melalui gateway CHIP yang selamat. Ada jaminan wang dikembalikan dalam 7 hari jika tidak berpuas hati.",
  },
];

/* ============ SMALL PARTS ============ */

function Eyebrow({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <p className="font-extrabold text-sm uppercase tracking-[0.18em] mb-3" style={{ color }}>
      {children}
    </p>
  );
}

function CTAButton({ children, href, big = false }: { children: React.ReactNode; href: string; big?: boolean }) {
  const inner = (
    <span
      className={`inline-block bg-gradient-to-r from-[#ff2f7d] to-[#ff8a5c] text-white font-extrabold rounded-full shadow-[0_16px_36px_rgba(255,47,125,0.35)] hover:scale-[1.04] active:scale-95 transition-transform ${
        big ? "text-xl px-12 py-5" : "text-lg px-9 py-4"
      }`}
    >
      {children}
    </span>
  );
  return href.startsWith("#") ? <a href={href}>{inner}</a> : <Link href={href}>{inner}</Link>;
}

/* ============ PAGE ============ */

export default function LandingPage() {
  return (
    <div className={`${baloo.className} min-h-screen bg-[#fffaf5] text-[#2b2140]`}>

      {/* ===== ANNOUNCEMENT BAR ===== */}
      <div className="bg-[#ffd43b] text-[#4a3200] text-center px-4 py-2.5 font-bold text-sm">
        👨‍👩‍👧 Khas untuk ibu bapa yang mahu anak 2–12 tahun kuasai Matematik &amp; Sains sambil seronok
      </div>

      {/* ===== NAV ===== */}
      <nav className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-[#ffe3ee]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo size={44} />
          </Link>
          <div className="hidden md:flex items-center gap-7 font-bold text-[15px] text-[#6b5b7a]">
            <a href="#demo" className="hover:text-[#ff2f7d]">Demo</a>
            <a href="#dapat" className="hover:text-[#ff2f7d]">Apa Anda Dapat</a>
            <a href="#testimoni" className="hover:text-[#ff2f7d]">Testimoni</a>
            <a href="#harga" className="hover:text-[#ff2f7d]">Harga</a>
            <a href="#faq" className="hover:text-[#ff2f7d]">FAQ</a>
          </div>
          <Link
            href={APP_URL}
            className="bg-[#2b2140] text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-[#3d2f5c] transition-colors"
          >
            Log Masuk
          </Link>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <header
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 12% 8%, rgba(255,214,90,0.35), transparent 34%), radial-gradient(circle at 88% 82%, rgba(255,120,170,0.30), transparent 38%), linear-gradient(180deg, #fffdf7 0%, #fff3f8 60%, #ffe9f3 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 pt-14 pb-20 grid lg:grid-cols-2 gap-14 items-center">

          {/* Left: copy */}
          <motion.div {...fadeUp} className="max-w-xl">
            <span className="inline-block bg-[#ffe3ec] border border-[#ffb3cd] text-[#d6336c] font-extrabold text-[13px] tracking-wide px-5 py-2.5 rounded-full mb-7">
              🔥 PROMO TERHAD — AKSES SEUMUR HIDUP
            </span>

            <h1 className="text-[2.6rem] md:text-[3.6rem] font-extrabold leading-[1.06] tracking-tight">
              Anak Pandai{" "}
              <span className="relative inline-block">
                Math &amp; Sains
                <span className="absolute left-0 right-0 bottom-1.5 h-3.5 bg-[#ffd43b] rounded-full -z-10" />
              </span>{" "}
              — Sambil Main, <span className="text-[#ff2f7d]">Tanpa Paksa!</span>
            </h1>

            <p className="mt-6 text-lg font-semibold text-[#5f5470] leading-relaxed">
              1,000+ soalan Matematik &amp; Sains · Misi bercerita · 4 peringkat umur (2–12 tahun) ·
              selaras <strong className="text-[#2b2140]">KSPK + KSSR</strong>. Sistem ganjaran bintang
              buat anak <em className="text-[#ff2f7d] not-italic font-extrabold">minta sendiri</em> nak belajar.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CTAButton href="#demo">🎮 Cuba Demo Percuma</CTAButton>
              <a href="#harga" className="font-extrabold text-[#2b2140] underline decoration-[#ffd43b] decoration-4 underline-offset-4 hover:text-[#ff2f7d]">
                ↓ Lihat pakej & harga
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-bold text-[#5f5470]">
              <span>✅ Akses seumur hidup</span>
              <span>👨‍👩‍👧 Semua adik boleh guna</span>
              <span>📱 PC · Tablet · Phone</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {["🗺️ 9 Misi Superhero", "⚡ 8 Kategori Latihan", "🏫 Selaras KSPK + KSSR", "⭐ Sistem Ganjaran", "♾️ Akses Seumur Hidup"].map((chip) => (
                <span key={chip} className="bg-white border border-[#f0e6ee] shadow-sm font-bold text-[13px] px-4 py-2 rounded-full">
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="relative mx-auto w-full max-w-[340px]"
          >
            <span className="absolute -left-8 top-10 text-4xl animate-bounce">⭐</span>
            <span className="absolute -right-6 bottom-24 text-3xl animate-pulse">✨</span>

            <div className="bg-[#2b2140] rounded-[3rem] p-3 shadow-[0_40px_90px_rgba(43,33,64,0.35)]">
              <div className="bg-[#fffdf7] rounded-[2.4rem] overflow-hidden">
                <div className="h-7 flex items-center justify-center">
                  <div className="w-24 h-4 bg-[#2b2140] rounded-b-2xl" />
                </div>
                <div className="px-5 pb-6 pt-2 text-center">
                  <p className="text-xs font-bold text-[#9c8aa5]">Selamat pagi, Adam!</p>
                  <p className="font-extrabold text-lg">Jom mula misi 🚀</p>
                  <div className="flex justify-center gap-2 mt-2">
                    <span className="bg-[#ffe9d6] text-[#c2410c] text-xs font-extrabold px-2.5 py-1 rounded-full">🔥 7</span>
                    <span className="bg-[#fff1c2] text-[#a16207] text-xs font-extrabold px-2.5 py-1 rounded-full">⭐ 42</span>
                    <span className="bg-[#ffe0eb] text-[#be185d] text-xs font-extrabold px-2.5 py-1 rounded-full">❤️ L4</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 mt-4">
                    {[
                      { label: "Misi RAGA", icon: "⚡", bg: "#fff4cf", border: "#ffd43b" },
                      { label: "Agen Nur", icon: "🕵️", bg: "#ffe4ec", border: "#ff8fb5" },
                      { label: "Kembar Ria", icon: "🌙", bg: "#dcf9e9", border: "#63e2a7" },
                      { label: "Latihan", icon: "➗", bg: "#e0f1ff", border: "#7cc7ff" },
                    ].map((t) => (
                      <div
                        key={t.label}
                        className="rounded-2xl border-2 px-2 py-3.5 flex flex-col items-center gap-1"
                        style={{ backgroundColor: t.bg, borderColor: t.border }}
                      >
                        <span className="text-2xl">{t.icon}</span>
                        <span className="text-xs font-extrabold">{t.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 border-2 border-[#ffd43b] bg-white rounded-2xl py-4">
                    <p className="font-extrabold text-2xl">45 − 23 = ?</p>
                    <p className="text-xs font-bold text-[#9c8aa5] mt-1">Jawapan: 22 ✓</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ===== PROBLEM ===== */}
      <section className="bg-gradient-to-b from-[#f4fbff] to-[#eef7ff] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <Eyebrow color="#e03131">Masalah Biasa</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Kalau ini bunyi macam keluarga anda...
            </h2>
            <p className="mt-3 text-lg font-semibold text-[#5f5470]">
              Anda tak keseorangan. Ribuan ibu bapa di Malaysia hadapi cabaran yang sama.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PAIN_POINTS.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeUp}
                transition={{ delay: i * 0.07 }}
                className="bg-gradient-to-b from-[#fff5f7] to-[#ffeef3] border border-[#ffdbe6] rounded-3xl p-6 shadow-[0_14px_34px_rgba(255,120,160,0.10)]"
              >
                <span className="text-4xl">{p.emoji}</span>
                <h3 className="font-extrabold text-lg mt-3 leading-snug">{p.title}</h3>
                <p className="mt-2 text-[15px] font-medium text-[#6b5b7a] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.p {...fadeUp} className="text-center font-extrabold text-xl md:text-2xl mt-12">
            Bayangkan kalau screen time anak bertukar jadi masa belajar yang dia{" "}
            <span className="text-[#ff2f7d]">SUKA</span>... 👇
          </motion.p>
        </div>
      </section>

      {/* ===== DEMO ===== */}
      <section
        id="demo"
        className="py-20 px-4"
        style={{
          background: "linear-gradient(180deg, #fffbef 0%, #fff6f9 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <Eyebrow color="#1971c2">Cuba Sekarang</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Main demo 30 saat — percuma
            </h2>
            <p className="mt-3 text-lg font-semibold text-[#5f5470] max-w-2xl mx-auto">
              Pilih jawapan yang betul. Macam ini rasanya bila anak anda belajar math —
              bukan iklan, ini soalan sebenar dari app.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div {...fadeUp}>
              <DemoWidget />
            </motion.div>

            <div className="flex flex-col gap-4">
              {DEMO_BULLETS.map((b, i) => (
                <motion.div
                  key={b.title}
                  {...fadeUp}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-[#f3ebf2] rounded-3xl p-5 flex gap-4 shadow-[0_10px_28px_rgba(180,140,200,0.08)]"
                >
                  <span className="w-[52px] h-[52px] shrink-0 flex items-center justify-center text-2xl bg-[#fff1c2] rounded-2xl">
                    {b.emoji}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-lg">{b.title}</h3>
                    <p className="text-[15px] font-medium text-[#6b5b7a] leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== VALUE STACK ===== */}
      {/* ===== BUKTI VISUAL — rupa sebenar app ===== */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <Eyebrow color="#0ca678">👀 Tengok Sendiri</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Inilah rupa MisiMinda
            </h2>
            <p className="mt-3 text-lg font-semibold text-[#5f5470] max-w-2xl mx-auto">
              Bukan gambar iklan — ini skrin sebenar yang anak anda akan guna setiap hari.
            </p>
          </motion.div>
          <AppScreens />
          <p className="text-center text-xs font-bold text-[#9c8aa5] mt-2">
            ← Leret ke tepi untuk lihat lagi →
          </p>
        </div>
      </section>

      <section id="dapat" className="py-20 px-4 bg-gradient-to-b from-[#fdf6ff] to-[#f7efff]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <Eyebrow color="#9333ea">Apa Anda Dapat</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Semua ini, dalam satu pakej
            </h2>
            <p className="mt-3 text-lg font-semibold text-[#5f5470]">
              Tiada tambahan tersembunyi. Tiada upsell. Semua dibuka hari pertama.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUE_STACK.map((v, i) => (
              <motion.div
                key={v.title}
                {...fadeUp}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-3xl overflow-hidden border border-[#efe4f5] shadow-[0_16px_40px_rgba(150,100,200,0.10)] flex flex-col"
              >
                <div className={`bg-gradient-to-br ${v.bg} h-28 flex items-center justify-center`}>
                  <span className="text-6xl drop-shadow-sm">{v.emoji}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-extrabold text-xl leading-snug">{v.title}</h3>
                  <p className="mt-2 text-[15px] font-medium text-[#6b5b7a] leading-relaxed flex-1">{v.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-extrabold tracking-widest text-[#9c8aa5] uppercase">Bernilai</span>
                    <span className="bg-gradient-to-r from-[#ff2f7d] to-[#ff8a5c] text-white font-extrabold text-sm px-4 py-1.5 rounded-full">
                      {v.value}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-12 text-center">
            <p className="font-bold text-lg text-[#6b5b7a]">
              Jumlah nilai sebenar semua ini:{" "}
              <span className="line-through decoration-[#ff2f7d] decoration-4 text-[#2b2140] font-extrabold text-2xl">RM639</span>
            </p>
            <p className="mt-2 font-extrabold text-2xl md:text-3xl">
              Hari ini anda hanya bayar <span className="text-[#ff2f7d]">RM29 sahaja</span> — sekali, untuk selamanya. 🤯
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimoni" className="py-20 px-4 bg-gradient-to-b from-[#fffbef] to-[#fff4e6]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <Eyebrow color="#e8590c">⭐⭐⭐⭐⭐ Ulasan Ibu Bapa</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Ibu bapa dah nampak perubahan
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                {...fadeUp}
                transition={{ delay: i * 0.08 }}
                className={`bg-gradient-to-b ${t.bg} rounded-3xl p-7 shadow-[0_14px_36px_rgba(230,150,80,0.12)] flex flex-col`}
              >
                <span className="text-[#f59f00] text-xl tracking-wider">★★★★★</span>
                <p className="mt-4 font-semibold text-[16px] leading-relaxed flex-1">“{t.quote}”</p>
                <div className="mt-6 pt-4 border-t border-black/10 flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-xl shadow-sm">🧑</span>
                  <div>
                    <p className="font-extrabold">{t.name}</p>
                    <p className="text-sm font-semibold text-[#7a6a52]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 px-4 bg-[#fffaf5]">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <Eyebrow color="#0ca678">Mudah Untuk Mula</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Anak boleh mula dalam 2 minit
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: "1", emoji: "💳", title: "Bayar RM29 — sekali sahaja", desc: "FPX atau kad. Akaun terus aktif, tiada langganan bulanan." },
              { step: "2", emoji: "👧", title: "Tetapkan profil anak", desc: "Pilih umur anak — app terus susun misi & latihan ikut tahap dia." },
              { step: "3", emoji: "🏆", title: "Anak main, anda pantau", desc: "Anak kumpul bintang, anda tengok markah naik minggu demi minggu." },
            ].map((s, i) => (
              <motion.div key={s.step} {...fadeUp} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#ffd43b] to-[#ffb84d] flex items-center justify-center font-extrabold text-2xl text-[#4a3200] shadow-[0_12px_28px_rgba(255,180,60,0.35)]">
                  {s.step}
                </div>
                <div className="text-4xl mt-4">{s.emoji}</div>
                <h3 className="font-extrabold text-xl mt-2">{s.title}</h3>
                <p className="mt-2 font-medium text-[#6b5b7a] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section
        id="harga"
        className="py-20 px-4"
        style={{
          background:
            "radial-gradient(circle at 85% 15%, rgba(255,120,170,0.22), transparent 40%), linear-gradient(180deg, #fff2f7 0%, #ffe4ef 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <Eyebrow color="#d6336c">Pakej Promosi</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Satu harga. Seumur hidup.
            </h2>
            <p className="mt-3 text-lg font-semibold text-[#5f5470]">
              Kurang dari harga satu jam tuisyen — tapi anak boleh guna bertahun-tahun.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="relative bg-white rounded-[2.5rem] shadow-[0_36px_90px_rgba(214,51,108,0.22)] border-[3px] border-[#ff2f7d] p-8 md:p-12"
          >
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ff2f7d] to-[#ff8a5c] text-white font-extrabold text-sm px-6 py-2.5 rounded-full whitespace-nowrap shadow-lg">
              🔥 PALING POPULAR — AKSES SEUMUR HIDUP
            </span>

            <div className="text-center mt-4">
              <p className="font-bold text-[#9c8aa5]">
                Nilai sebenar: <span className="line-through decoration-[#ff2f7d] decoration-[3px]">RM639</span>
              </p>
              <p className="text-7xl md:text-8xl font-extrabold text-[#ff2f7d] leading-none mt-2">RM29</p>
              <p className="font-extrabold text-lg mt-2">Bayar sekali · Guna selamanya · Tiada yuran bulanan</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mt-9">
              {[
                "1,000+ soalan Matematik & Sains",
                "Semua 4 peringkat umur (2–12 tahun)",
                "Sehingga 4 profil anak",
                "Sistem bintang & hadiah sebenar",
                "Dashboard ibu bapa + PIN",
                "Semua kemaskini akan datang — percuma",
              ].map((f) => (
                <div key={f} className="flex items-start gap-2.5">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-[#d3f9e8] text-[#0f7a5c] flex items-center justify-center text-xs font-extrabold mt-0.5">✔</span>
                  <span className="font-bold text-[15px]">{f}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <CTAButton href={APP_URL} big>
                DAPATKAN AKSES SEKARANG →
              </CTAButton>
              <p className="mt-4 text-sm font-bold text-[#9c8aa5]">
                🔒 Pembayaran selamat via CHIP · FPX & Kad Kredit/Debit · 🇲🇾 MYR
              </p>
            </div>

            <div className="mt-8 bg-[#f0fbf5] border border-[#bfe8d2] rounded-2xl p-5 flex items-start gap-4">
              <span className="text-3xl">🛡️</span>
              <div>
                <p className="font-extrabold">Jaminan 7 Hari Wang Dikembalikan</p>
                <p className="text-sm font-medium text-[#5c7a6a] leading-relaxed">
                  Cuba dulu. Kalau anak tak suka atau anda tak puas hati atas apa jua sebab,
                  kami pulangkan 100% wang anda. Tiada soalan ditanya.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-20 px-4 bg-[#fffaf5]">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <Eyebrow color="#1971c2">Soalan Lazim</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Sebelum anda mula
            </h2>
          </motion.div>

          <div className="flex flex-col gap-4">
            {FAQS.map((f, i) => (
              <motion.div
                key={f.q}
                {...fadeUp}
                transition={{ delay: i * 0.04 }}
                className="bg-white border border-[#f0e6ee] rounded-3xl p-6 shadow-[0_8px_24px_rgba(180,140,200,0.07)]"
              >
                <h3 className="font-extrabold text-lg flex items-start gap-2">
                  <span className="text-[#ff2f7d]">❓</span> {f.q}
                </h3>
                <p className="mt-2 font-medium text-[#6b5b7a] leading-relaxed">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section
        className="py-20 px-4 text-center"
        style={{
          background: "linear-gradient(135deg, #ff2f7d 0%, #ff6b9d 55%, #ff8a5c 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto text-white">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Setiap hari anak tunggu, makin jauh dia tertinggal.
            </h2>
            <p className="mt-4 text-xl font-bold text-white/90">
              RM29 hari ini boleh ubah cara anak anda tengok matematik — selamanya.
            </p>
            <div className="mt-9">
              <Link
                href={APP_URL}
                className="inline-block bg-white text-[#ff2f7d] font-extrabold text-xl px-12 py-5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.25)] hover:scale-[1.04] active:scale-95 transition-transform"
              >
                🚀 Mulakan Misi Pertama Anak Anda
              </Link>
            </div>
            <p className="mt-5 font-bold text-white/80 text-sm">
              🛡️ Dilindungi jaminan 7 hari wang dikembalikan
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#2b2140] text-white py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 text-center">
          <Logo size={44} />
          <p className="text-sm font-medium text-white/60 max-w-md leading-relaxed">
            Platform pembelajaran matematik interaktif untuk kanak-kanak Malaysia,
            berasaskan silibus KSPK &amp; KSSR.
          </p>
          <p className="text-xs font-medium text-white/40">© 2026 MisiMinda. Hak cipta terpelihara.</p>
        </div>
      </footer>
    </div>
  );
}
