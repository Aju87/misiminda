import Link from "next/link";
import { Button, Card, Badge, Logo } from "@/components/ui";
import { AppScreens } from "@/components/landing/AppScreens";
import { DemoWidget } from "@/components/landing/DemoWidget";

/** 4 peringkat — selaras dengan AGE_GROUPS dalam lib/constants.ts */
const TAHAP = [
  {
    emoji: "🐣",
    label: "2 - 5 Tahun",
    grade: "Prasekolah · Si Kecil",
    desc: "Kenal huruf & mengeja, plus Sains PERMATA: haiwan, warna, cuaca & deria.",
    color: "red" as const,
  },
  {
    emoji: "🌱",
    label: "5 - 6 Tahun",
    grade: "KSPK",
    desc: "Matematik misi superhero + Sains KSPK: benda hidup, timbul-tenggelam, kitaran hidup.",
    color: "yellow" as const,
  },
  {
    emoji: "🌿",
    label: "7 - 9 Tahun",
    grade: "KSSR Tahap 1",
    desc: "Sifir & wang, plus Sains KSSR: gigi, rantai makanan, litar elektrik & magnet.",
    color: "mint" as const,
  },
  {
    emoji: "🌳",
    label: "10 - 12 Tahun",
    grade: "KSSR Tahap 2",
    desc: "Pecahan & geometri, plus Sains: sistem suria, fotosintesis, tenaga & mesin ringkas.",
    color: "blue" as const,
  },
];

const TESTIMONI = [
  {
    quote: "Anak saya 6 tahun sekarang minta sendiri nak main lepas balik sekolah. Dulu nampak buku latihan terus buat hal.",
    name: "Puan Siti Aishah",
    role: "Ibu 2 anak · Shah Alam",
  },
  {
    quote: "Dashboard ibu bapa sangat membantu. Saya nampak topik mana anak lemah, terus fokus situ.",
    name: "Encik Faizal Rahman",
    role: "Ayah · Johor Bahru",
  },
  {
    quote: "Bayar sekali je, 3 orang anak saya umur berbeza semua boleh guna. Jauh lebih jimat dari tuisyen.",
    name: "Puan Lim Mei Ling",
    role: "Ibu 3 anak · Petaling Jaya",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FFFDF2]">
      {/* Navbar */}
      <nav className="border-b-4 border-black bg-[#FFB800] sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size={44} />
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth">
              <Button variant="secondary" size="sm">Log Masuk</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="danger" size="sm">Dapatkan Akses</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-14 pb-10 flex flex-col items-center text-center gap-6">
        <Badge variant="mint" className="text-sm">🇲🇾 Silibus KSPK &amp; KSSR</Badge>
        <h1 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tight">
          Matematik &amp; Sains<br />
          <span className="text-[#FF6B6B]">Seronok</span> untuk<br />
          Kanak-Kanak!
        </h1>
        <p className="text-lg font-semibold text-gray-700 max-w-xl">
          Dua subjek dalam satu app — anak belajar melalui misi bercerita, bukan hafal.
          Untuk umur <strong className="text-black">2 hingga 12 tahun</strong>, ikut silibus KSPK, KSSR &amp; PERMATA.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#demo">
            <Button variant="primary" size="xl">🎮 Cuba Demo Percuma</Button>
          </a>
          <Link href="/pricing">
            <Button variant="secondary" size="xl">Lihat Harga →</Button>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-2">
          {["✅ Tanpa iklan", "👨‍👩‍👧 Sehingga 4 anak", "📱 Phone · Tablet · PC", "🛡️ Jaminan 7 hari"].map((t) => (
            <div key={t} className="border-2 border-black rounded-xl px-3 py-1.5 bg-white font-bold text-xs">
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* ===== BUKTI VISUAL — rupa sebenar app ===== */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <Badge variant="black" className="mb-3">👀 TENGOK SENDIRI</Badge>
          <h2 className="text-3xl md:text-4xl font-black uppercase">Inilah Rupa MisiMinda</h2>
          <p className="font-semibold text-gray-600 mt-2 max-w-xl mx-auto">
            Bukan gambar iklan — ini skrin sebenar yang anak anda akan guna.
          </p>
        </div>
        <AppScreens />
        <p className="text-center text-xs font-bold text-gray-400 mt-2">← Leret ke tepi untuk lihat lagi →</p>
      </section>

      {/* ===== DEMO INTERAKTIF ===== */}
      <section id="demo" className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <Badge variant="mint" className="mb-3">🎮 CUBA SEKARANG — PERCUMA</Badge>
          <h2 className="text-3xl md:text-4xl font-black uppercase">Main 3 Soalan Sebenar</h2>
          <p className="font-semibold text-gray-600 mt-2 max-w-xl mx-auto">
            Tak perlu daftar. Cuba sendiri rasa permainan yang anak anda akan alami.
          </p>
        </div>
        <DemoWidget />
      </section>

      {/* ===== 4 PERINGKAT ===== */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-black uppercase mb-8 text-center">
          4 Peringkat Pembelajaran
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TAHAP.map((t) => (
            <Card key={t.label} color={t.color} hoverable className="flex flex-col">
              <div className="text-4xl mb-3">{t.emoji}</div>
              <Badge variant="black" className="mb-2 w-fit text-xs">{t.grade}</Badge>
              <h3 className="text-lg font-black uppercase mb-1">{t.label}</h3>
              <p className="font-semibold text-sm">{t.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== CIRI ===== */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-black uppercase mb-8 text-center">Kenapa MisiMinda?</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: "⭐", title: "Sistem Bintang", desc: "Anak kumpul bintang dan tebus hadiah sebenar yang ibu bapa tetapkan." },
            { icon: "📖", title: "Belajar Melalui Cerita", desc: "Setiap soalan ada cerita superhero — anak faham, bukan sekadar hafal." },
            { icon: "👨‍👩‍👧", title: "Dashboard Ibu Bapa", desc: "Pantau kemajuan, urus hadiah, sehingga 4 profil anak dalam satu akaun." },
            { icon: "🔬", title: "Matematik & Sains", desc: "Dua subjek penuh: misi matematik, dan sains dari haiwan hingga sistem suria." },
            { icon: "🇲🇾", title: "Silibus Malaysia", desc: "Disusun ikut PERMATA, KSPK dan KSSR — selari dengan sekolah." },
          ].map((f) => (
            <Card key={f.title} color="white" hoverable className="flex gap-4">
              <span className="text-4xl">{f.icon}</span>
              <div>
                <h3 className="font-black text-lg uppercase">{f.title}</h3>
                <p className="font-medium text-gray-700 text-sm mt-1">{f.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONI ===== */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-black uppercase mb-8 text-center">Apa Kata Ibu Bapa</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONI.map((t) => (
            <Card key={t.name} color="white" className="flex flex-col gap-3">
              <span className="text-[#FFB800] text-lg">★★★★★</span>
              <p className="font-semibold text-sm text-gray-800 leading-snug flex-1">“{t.quote}”</p>
              <div className="pt-3 border-t-2 border-dashed border-gray-300">
                <p className="font-black text-sm">{t.name}</p>
                <p className="text-xs font-semibold text-gray-500">{t.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== HARGA ===== */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <Card color="yellow" className="flex flex-col items-center text-center gap-3 py-12">
          <Badge variant="black">BAYAR SEKALI · GUNA SELAMANYA</Badge>
          <h2 className="text-4xl font-black uppercase">Mulakan Hari Ini</h2>
          <p className="text-6xl font-black leading-none">RM35</p>
          <p className="font-bold">
            Sekali bayar sahaja — tiada yuran bulanan, tiada bayaran tersembunyi.
          </p>
          <div className="grid sm:grid-cols-2 gap-2 text-left mt-3 mb-2">
            {[
              "Semua 4 peringkat umur (2–12)",
              "Sehingga 4 profil anak",
              "1,000+ soalan Matematik & Sains",
              "Kemaskini akan datang percuma",
            ].map((f) => (
              <div key={f} className="flex items-center gap-2">
                <span className="w-5 h-5 bg-black text-white rounded-md flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                <span className="font-bold text-sm">{f}</span>
              </div>
            ))}
          </div>
          <Link href="/pricing">
            <Button variant="secondary" size="xl">Dapatkan Akses Sekarang 🚀</Button>
          </Link>
          <p className="text-xs font-bold text-gray-700 mt-1">
            🛡️ Jaminan 7 hari wang dikembalikan · 🔒 Pembayaran selamat via CHIP
          </p>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-black text-white py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size={40} />
          <p className="text-sm font-medium text-gray-400">
            © 2026 MisiMinda. Hak cipta terpelihara.
          </p>
        </div>
      </footer>
    </div>
  );
}
