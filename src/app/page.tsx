import Link from "next/link";
import { Button, Card, Badge, Logo } from "@/components/ui";
import { AGE_GROUPS } from "@/lib/constants";

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
            <Link href="/auth?tab=signup">
              <Button variant="danger" size="sm">Daftar Percuma</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 py-16 flex flex-col items-center text-center gap-6">
        <Badge variant="mint" className="text-sm">🇲🇾 Silibus KSPK & KSSR</Badge>
        <h1 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tight">
          Matematik<br />
          <span className="text-[#FF6B6B]">Seronok</span> untuk<br />
          Kanak-Kanak!
        </h1>
        <p className="text-lg font-semibold text-gray-700 max-w-xl">
          MisiMinda mengajar matematik melalui cerita yang seru dan misi yang mencabar.
          Sesuai untuk umur 5–12 tahun.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/auth?tab=signup">
            <Button variant="primary" size="xl">Mula Percuma 🚀</Button>
          </Link>
          <Link href="/auth">
            <Button variant="secondary" size="xl">Log Masuk</Button>
          </Link>
        </div>

        {/* Hero visual */}
        <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-lg">
          {["🎂", "🦁", "🤖"].map((emoji, i) => (
            <Card
              key={i}
              color={i === 0 ? "red" : i === 1 ? "yellow" : "mint"}
              className="flex flex-col items-center gap-2 py-8"
            >
              <span className="text-5xl">{emoji}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* Age groups */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-black uppercase mb-8 text-center">
          3 Peringkat Pembelajaran
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {AGE_GROUPS.map((group, i) => {
            const colors = ["yellow", "mint", "blue"] as const;
            const themes = [
              "Misi Kedai Kek Cef Cilik 🎂",
              "Pasukan Penyelamat Haiwan Hutan 🦁",
              "Detektif Bandaraya Futuristik 🤖",
            ];
            return (
              <Card key={group.value} color={colors[i]} hoverable>
                <div className="text-4xl mb-3">{group.emoji}</div>
                <Badge variant="black" className="mb-2">{group.grade}</Badge>
                <h3 className="text-xl font-black uppercase mb-1">{group.label}</h3>
                <p className="font-semibold text-sm">{themes[i]}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-black uppercase mb-8 text-center">
          Kenapa MisiMinda?
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: "⭐", title: "Sistem Bintang", desc: "Kanak-kanak kumpul bintang dan dapatkan hadiah nyata dari ibu bapa." },
            { icon: "📖", title: "Pembelajaran Berasaskan Cerita", desc: "Setiap soalan ada cerita yang menarik — bukan hafal, tapi faham!" },
            { icon: "👨‍👩‍👧", title: "Dashboard Ibu Bapa", desc: "Pantau kemajuan, tetapkan hadiah, dan uruskan hingga 4 profil kanak-kanak." },
            { icon: "🇲🇾", title: "Silibus Malaysia", desc: "100% mengikut sukatan pelajaran KSPK dan KSSR semasa." },
          ].map((feat) => (
            <Card key={feat.title} color="white" hoverable className="flex gap-4">
              <span className="text-4xl">{feat.icon}</span>
              <div>
                <h3 className="font-black text-lg uppercase">{feat.title}</h3>
                <p className="font-medium text-gray-700 text-sm mt-1">{feat.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <Card color="yellow" className="flex flex-col items-center text-center gap-4 py-12">
          <h2 className="text-4xl font-black uppercase">Mulakan Hari Ini!</h2>
          <p className="font-semibold text-lg">Hanya RM29 — bayar sekali, akses seumur hidup! 🎉</p>
          <Link href="/auth?tab=signup">
            <Button variant="secondary" size="xl">Cuba Sekarang 🎉</Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-black text-white py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo size={40} />
          </div>
          <p className="text-sm font-medium text-gray-400">
            © 2025 MisiMinda. Hak cipta terpelihara.
          </p>
        </div>
      </footer>
    </div>
  );
}
