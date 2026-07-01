"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button, Card, Badge, Logo } from "@/components/ui";
import { DemoWidget } from "@/components/landing/DemoWidget";

const APP_URL = "https://misiminda.netlify.app/dashboard";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const PAIN_POINTS = [
  {
    emoji: "😤",
    quote: "“Anak asyik main game je, tak nak buka buku latihan”",
    desc: "Setiap kali sebut matematik, anak terus cari alasan nak lari.",
  },
  {
    emoji: "💸",
    quote: "“Dah hantar tuisyen, tapi markah still sama”",
    desc: "Duit habis setiap bulan, tapi hasil yang diharapkan tak nampak.",
  },
  {
    emoji: "😰",
    quote: "“Exam makin dekat, sifir pun belum hafal”",
    desc: "Tekanan naik setiap hari mendekati peperiksaan sekolah.",
  },
  {
    emoji: "😪",
    quote: "“Kerja penat, tak sempat nak teman anak belajar”",
    desc: "Ibu bapa letih lepas kerja, anak pula perlukan bimbingan.",
  },
];

const FEATURES = [
  {
    emoji: "🗺️",
    tag: "3 DUNIA SUPERHERO",
    title: "Misi Matematik",
    desc: "Soalan matematik dibungkus dalam cerita superhero yang seru — RAGA, Agen Nur dan Kembar Ria. 90 soalan setiap kumpulan umur, tersusun ikut peringkat kesukaran.",
    points: ["3 misi bercerita setiap umur", "Sistem unlock — kuasai dulu baru maju", "Watak & cerita asli Malaysia"],
    color: "yellow" as const,
  },
  {
    emoji: "⚡",
    tag: "8 KATEGORI KEMAHIRAN",
    title: "Latihan Pantas",
    desc: "Drill fokus kemahiran tanpa cerita — sesuai untuk anak yang nak latih pantas sebelum peperiksaan atau ulang kaji topik tertentu.",
    points: ["Tambah, tolak, sifir & bahagi", "Wang, masa, ukuran & geometri", "Statistik & data (min, mod, median)"],
    color: "blue" as const,
  },
  {
    emoji: "⭐",
    tag: "GANJARAN SEBENAR",
    title: "Sistem Bintang",
    desc: "Setiap misi yang diselesaikan bagi bintang. Ibu bapa boleh tetapkan hadiah sebenar yang boleh ditebus anak dengan bintang yang dikumpul.",
    points: ["Bintang ikut prestasi sebenar", "Hadiah ditetapkan ibu bapa", "Motivasi berterusan untuk belajar"],
    color: "mint" as const,
  },
  {
    emoji: "📊",
    tag: "PANTAU DARI MANA-MANA",
    title: "Dashboard Ibu Bapa",
    desc: "Semua anak dalam satu tempat. Tengok kemajuan, bintang terkumpul dan topik yang perlukan lebih latihan.",
    points: ["Sehingga 4 profil kanak-kanak", "PIN peribadi untuk akses selamat", "Pantau bila-bila masa, di mana saja"],
    color: "orange" as const,
  },
];

const STEPS = [
  {
    emoji: "📲",
    title: "Daftar & Langgan",
    desc: "Buka app, isi maklumat ringkas, dan bayar RM29 sekali sahaja — tiada bayaran bulanan.",
  },
  {
    emoji: "🎯",
    title: "Pilih Profil Anak",
    desc: "Tetapkan umur anak. App terus cadangkan misi dan latihan yang sesuai dengan tahap mereka.",
  },
  {
    emoji: "🏆",
    title: "Anak Terus Main & Belajar",
    desc: "Pantau bintang dan markah dari dashboard. Lihat keyakinan anak terhadap matematik berkembang minggu demi minggu.",
  },
];

const TESTIMONIALS = [
  {
    quote: "Anak saya umur 6 tahun sekarang minta sendiri nak main MisiMinda lepas balik sekolah. Dulu susah nak duduk buat latihan.",
    name: "Puan Siti Aishah",
    loc: "Shah Alam, Selangor",
    tag: "anak suka belajar",
  },
  {
    quote: "Dashboard ibu bapa sangat membantu. Saya boleh nampak topik mana anak perlu lebih latihan dan fokus terus situ.",
    name: "Encik Faizal Rahman",
    loc: "Johor Bahru, Johor",
    tag: "pantau progress",
  },
  {
    quote: "Cerita superhero dalam setiap misi memang menarik minat anak saya. Dia excited nak tahu sambungan cerita sambil buat soalan.",
    name: "Puan Nurul Huda",
    loc: "Cheras, Kuala Lumpur",
    tag: "anak teruja",
  },
  {
    quote: "Anak darjah 2, dulu takut sifir. Sekarang dia dah hafal sifir 2 hingga 5 sebab asyik ulang dalam Latihan Pantas.",
    name: "Encik Ahmad Zulkifli",
    loc: "Bangi, Selangor",
    tag: "sifir dikuasai",
  },
  {
    quote: "Bayar sekali je, boleh guna untuk 3 orang anak saya yang umur berbeza. Sangat berbaloi berbanding tuisyen.",
    name: "Puan Lim Mei Ling",
    loc: "Petaling Jaya, Selangor",
    tag: "berbaloi untuk keluarga",
  },
  {
    quote: "Soalan disusun ikut KSSR jadi saya yakin apa yang anak belajar memang selari dengan sekolah.",
    name: "Puan Roslina Hassan",
    loc: "Kota Bharu, Kelantan",
    tag: "ikut silibus KSSR",
  },
];

const FAQS = [
  {
    q: "Berapa lama akses ini?",
    a: "Seumur hidup — bayar sekali, guna selama-lamanya termasuk semua kemaskini akan datang.",
  },
  {
    q: "Berapa ramai anak boleh guna satu akaun?",
    a: "Sehingga 4 profil kanak-kanak dalam satu akaun ibu bapa, sesuai untuk keluarga yang ada beberapa orang anak.",
  },
  {
    q: "Adakah ikut silibus sekolah Malaysia?",
    a: "Ya — kandungan disusun ikut KSPK (prasekolah) dan KSSR Tahap 1 & 2, merangkumi umur 5 hingga 12 tahun.",
  },
  {
    q: "Kaedah pembayaran apa diterima?",
    a: "FPX (semua bank Malaysia), kad kredit dan kad debit melalui gateway CHIP yang selamat.",
  },
  {
    q: "Adakah selamat untuk anak-anak?",
    a: "Ya. Tiada iklan, tiada pop-up luar dan tiada elemen bersembang dengan orang asing — direka khas untuk kanak-kanak.",
  },
  {
    q: "Boleh dapat refund tak?",
    a: "Kami menawarkan jaminan wang dikembalikan dalam tempoh 7 hari jika tidak berpuas hati.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF2]">
      {/* ===== NAV ===== */}
      <nav className="border-b-4 border-black bg-white/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo size={44} />
          </Link>
          <div className="hidden md:flex items-center gap-6 font-bold text-sm">
            <a href="#ciri-ciri" className="hover:text-[#FF6B6B]">Ciri-ciri</a>
            <a href="#demo" className="hover:text-[#FF6B6B]">Demo</a>
            <a href="#testimoni" className="hover:text-[#FF6B6B]">Testimoni</a>
            <a href="#harga" className="hover:text-[#FF6B6B]">Harga</a>
            <a href="#faq" className="hover:text-[#FF6B6B]">FAQ</a>
          </div>
          <Link href={APP_URL}>
            <Button variant="primary" size="sm">Log Masuk</Button>
          </Link>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="max-w-5xl mx-auto px-4 pt-14 pb-10 flex flex-col items-center text-center gap-6">
        <Badge variant="mint" className="text-sm">🇲🇾 Untuk Anak Malaysia</Badge>
        <h1 className="text-4xl md:text-6xl font-black uppercase leading-[1.05] tracking-tight max-w-3xl">
          Anak Anda Boleh <span className="text-[#FF6B6B]">Jatuh Cinta</span> Dengan Matematik
        </h1>
        <p className="text-lg font-semibold text-gray-700 max-w-xl">
          MisiMinda ubah matematik jadi misi superhero yang seru — anak belajar sambil main, ibu bapa nampak markah naik setiap minggu.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#demo">
            <Button variant="primary" size="xl">🎮 Cuba Demo Percuma</Button>
          </a>
          <a href="#harga">
            <Button variant="secondary" size="xl">Lihat Harga →</Button>
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          {["✅ Tanpa Iklan", "📊 Dashboard Ibu Bapa", "🎓 KSPK + KSSR", "🔒 Selamat Untuk Anak"].map((t) => (
            <div key={t} className="border-2 border-black rounded-xl px-3 py-1.5 bg-white font-bold text-xs">
              {t}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-[#FFB800] text-lg">★★★★★</span>
          <span className="font-bold text-sm text-gray-600">Dipercayai ibu bapa seluruh Malaysia</span>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="border-y-4 border-black bg-black text-white py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { emoji: "🎮", value: "550+", label: "Soalan Interaktif" },
            { emoji: "👨‍👩‍👧", value: "3", label: "Kumpulan Umur (5–12)" },
            { emoji: "🇲🇾", value: "KSPK+KSSR", label: "Standard KPM" },
            { emoji: "⭐", value: "1x Bayar", label: "Guna Selamanya" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl">{s.emoji}</span>
              <span className="font-black text-2xl">{s.value}</span>
              <span className="text-xs font-semibold text-gray-300 uppercase">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PROBLEM ===== */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <motion.div {...fadeUp} className="text-center mb-10">
          <Badge variant="red" className="mb-4">😮‍💨 MASALAH BIASA IBU BAPA</Badge>
          <h2 className="text-3xl md:text-4xl font-black uppercase">
            Anak Anda Rasa Matematik Membosankan?
          </h2>
          <p className="font-semibold text-gray-600 mt-2">
            Kalau salah satu ni rasa biasa — anda bukan seorang...
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {PAIN_POINTS.map((p, i) => (
            <motion.div key={p.quote} {...fadeUp} transition={{ delay: i * 0.08 }}>
              <Card color="white" className="h-full flex gap-4">
                <span className="text-4xl shrink-0">{p.emoji}</span>
                <div>
                  <p className="font-black text-base leading-snug">{p.quote}</p>
                  <p className="text-sm font-semibold text-gray-600 mt-1">{p.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p {...fadeUp} className="text-center font-black text-xl mt-10">
          Mesti ada cara belajar yang anak SUKA, bukan terpaksa... <br className="hidden sm:block" />
          <span className="text-[#FF6B6B]">ADA. Jom tengok 👇</span>
        </motion.p>
      </section>

      {/* ===== SOLUTION ===== */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <motion.div {...fadeUp} className="text-center mb-10">
          <Badge variant="mint" className="mb-4">✅ SOLUSI BELAJAR YANG ANAK SUKA</Badge>
          <h2 className="text-3xl md:text-4xl font-black uppercase max-w-2xl mx-auto">
            Perkenalkan MisiMinda — Matematik Jadi Misi, Bukan Beban
          </h2>
          <p className="font-semibold text-gray-600 mt-3 max-w-xl mx-auto">
            Soalan matematik dibungkus dalam cerita superhero yang seru. Anak rasa macam main game, ibu bapa nampak kemajuan sebenar.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { emoji: "🗺️", title: "Belajar Rasa Macam Bermain", desc: "Setiap soalan ada dalam misi bercerita yang buat anak teruja nak sambung." },
            { emoji: "📊", title: "Ibu Bapa Boleh Pantau", desc: "Tengok bintang, markah dan topik yang anak perlukan lebih latihan." },
            { emoji: "⏱️", title: "Sesuai Rutin Harian", desc: "5–10 minit sehari, di rumah, dalam kereta atau bila anak ada masa lapang." },
          ].map((b, i) => (
            <motion.div key={b.title} {...fadeUp} transition={{ delay: i * 0.1 }}>
              <Card color="yellow" hoverable className="h-full text-center flex flex-col items-center gap-2 py-8">
                <span className="text-4xl">{b.emoji}</span>
                <h3 className="font-black text-lg uppercase">{b.title}</h3>
                <p className="text-sm font-semibold">{b.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== DEMO ===== */}
      <section id="demo" className="max-w-5xl mx-auto px-4 py-16">
        <motion.div {...fadeUp} className="text-center mb-10">
          <Badge variant="blue" className="mb-4">👀 TENGOK SENDIRI DULU</Badge>
          <h2 className="text-3xl md:text-4xl font-black uppercase">Cuba Main Sebelum Langgan!</h2>
          <p className="font-semibold text-gray-600 mt-2 max-w-lg mx-auto">
            Inilah soalan sebenar dalam MisiMinda. Cuba jawab dan rasa keseronokan yang anak anda akan alami!
          </p>
        </motion.div>

        <motion.div {...fadeUp}>
          <DemoWidget />
        </motion.div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="ciri-ciri" className="max-w-5xl mx-auto px-4 py-16">
        <motion.div {...fadeUp} className="text-center mb-10">
          <Badge variant="mint" className="mb-4">✨ SEMUA DALAM SATU APP</Badge>
          <h2 className="text-3xl md:text-4xl font-black uppercase max-w-2xl mx-auto">
            Bukan Sekadar Soalan — Sistem Pembelajaran Lengkap
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} {...fadeUp} transition={{ delay: i * 0.06 }}>
              <Card color={f.color} className="flex flex-col sm:flex-row gap-6 items-start">
                <span className="text-5xl shrink-0">{f.emoji}</span>
                <div className="flex-1">
                  <Badge variant="black" className="mb-2 text-xs">{f.tag}</Badge>
                  <h3 className="font-black text-2xl uppercase mb-1">{f.title}</h3>
                  <p className="font-semibold text-sm text-gray-700 mb-3">{f.desc}</p>
                  <div className="flex flex-col gap-1.5">
                    {f.points.map((pt) => (
                      <div key={pt} className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-black text-white rounded-md flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                        <span className="font-bold text-sm">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <motion.div {...fadeUp} className="text-center mb-10">
          <Badge variant="red" className="mb-4">🚀 MUDAH UNTUK MULA</Badge>
          <h2 className="text-3xl md:text-4xl font-black uppercase">Mulakan Dalam 3 Langkah Sahaja</h2>
          <p className="font-semibold text-gray-600 mt-2">Setup dalam 2 minit. Anak terus boleh mula belajar.</p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <motion.div key={s.title} {...fadeUp} transition={{ delay: i * 0.1 }} className="text-center flex flex-col items-center gap-3">
              <div
                style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
                className="w-16 h-16 rounded-2xl border-4 border-black bg-[#FFB800] flex items-center justify-center text-3xl font-black"
              >
                {i + 1}
              </div>
              <span className="text-3xl">{s.emoji}</span>
              <h3 className="font-black text-lg uppercase">{s.title}</h3>
              <p className="font-semibold text-sm text-gray-600">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimoni" className="max-w-5xl mx-auto px-4 py-16">
        <motion.div {...fadeUp} className="text-center mb-10">
          <Badge variant="mint" className="mb-4">💬 ULASAN IBU BAPA</Badge>
          <h2 className="text-3xl md:text-4xl font-black uppercase">Apa Kata Ibu Bapa Kami</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name} {...fadeUp} transition={{ delay: i * 0.06 }}>
              <Card color="white" hoverable className="h-full flex flex-col gap-3">
                <span className="text-[#FFB800] text-lg">★★★★★</span>
                <p className="font-semibold text-sm text-gray-800 leading-snug">{t.quote}</p>
                <Badge variant="mint" className="text-[10px] w-fit">✅ {t.tag}</Badge>
                <div className="mt-auto pt-2 border-t-2 border-dashed border-gray-300">
                  <p className="font-black text-sm">{t.name}</p>
                  <p className="text-xs font-semibold text-gray-500">{t.loc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="harga" className="max-w-3xl mx-auto px-4 py-16">
        <motion.div {...fadeUp} className="text-center mb-10">
          <Badge variant="blue" className="mb-4">🔒 SATU HARGA, SEUMUR HIDUP</Badge>
          <h2 className="text-3xl md:text-4xl font-black uppercase">Pilih & Aktifkan Akaun Anak Anda</h2>
          <p className="font-semibold text-gray-600 mt-2">Bayar sekali, akses selamanya. Tiada bayaran bulanan. Tiada kejutan.</p>
        </motion.div>

        <motion.div {...fadeUp}>
          <div
            style={{ boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
            className="border-4 border-black rounded-2xl bg-[#FFB800] p-8 relative"
          >
            <div className="absolute -top-4 left-8">
              <Badge variant="black" className="text-sm px-4 py-1.5">🔥 Bayar Sekali, Guna Selamanya</Badge>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2">
              <div>
                <p className="font-black text-sm uppercase tracking-widest mb-1">Seumur Hidup</p>
                <div className="flex items-end gap-2">
                  <span className="text-7xl font-black leading-none">RM29.00</span>
                </div>
                <p className="font-bold text-sm mt-1">Bayaran sekali sahaja</p>
              </div>
              <div className="w-full sm:w-auto">
                <Link href={APP_URL}>
                  <Button size="xl" variant="secondary" fullWidth>Mula Sekarang 🚀</Button>
                </Link>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mt-8 pt-6 border-t-4 border-black">
              {[
                "Akses semua 3 peringkat umur",
                "Sehingga 4 profil kanak-kanak",
                "Sistem ganjaran bintang & hadiah",
                "Penjejak kemajuan terperinci",
                "550+ soalan misi & latihan",
                "Tiada bayaran bulanan",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-black text-white rounded-md flex items-center justify-center text-xs font-black shrink-0">✓</span>
                  <span className="font-bold text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-3 mt-6">
          {["🔒 Pembayaran Selamat via CHIP", "💳 FPX & Kad Kredit/Debit", "🇲🇾 Ringgit Malaysia (MYR)", "♾️ Jaminan 7 Hari"].map((item) => (
            <div key={item} className="border-2 border-black rounded-xl px-4 py-2 bg-white font-bold text-sm">
              {item}
            </div>
          ))}
        </motion.div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="max-w-3xl mx-auto px-4 py-16">
        <motion.div {...fadeUp} className="text-center mb-10">
          <Badge variant="red" className="mb-4">🤔 SOALAN LAZIM</Badge>
          <h2 className="text-3xl md:text-4xl font-black uppercase">Sebelum Anda Mula</h2>
          <p className="font-semibold text-gray-600 mt-2">Jawapan ringkas untuk soalan yang biasa ditanya ibu bapa.</p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {FAQS.map((f, i) => (
            <motion.div key={f.q} {...fadeUp} transition={{ delay: i * 0.04 }}>
              <Card color="white" className="flex flex-col gap-2">
                <h3 className="font-black flex items-center gap-2">
                  <span>❓</span> {f.q}
                </h3>
                <p className="font-semibold text-sm text-gray-700">{f.a}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <motion.div {...fadeUp}>
          <Card color="mint" className="flex flex-col items-center text-center gap-4 py-12">
            <h2 className="text-4xl font-black uppercase">Jom Mula Hari Ini!</h2>
            <p className="font-semibold text-lg">Anak anda satu klik sahaja dari misi matematik pertama mereka 🎉</p>
            <Link href={APP_URL}>
              <Button variant="secondary" size="xl">Daftar & Mula Belajar 🚀</Button>
            </Link>
          </Card>
        </motion.div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t-4 border-black bg-black text-white py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-4 text-center">
          <Logo size={40} />
          <p className="text-sm font-medium text-gray-400 max-w-md">
            Platform pembelajaran matematik interaktif untuk kanak-kanak Malaysia, berasaskan silibus KSPK &amp; KSSR.
          </p>
          <p className="text-xs font-medium text-gray-500">
            © 2026 MisiMinda. Hak cipta terpelihara.
          </p>
        </div>
      </footer>
    </div>
  );
}
