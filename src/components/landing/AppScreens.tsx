"use client";

import { motion } from "framer-motion";

/**
 * Replika skrin sebenar MisiMinda dalam bingkai telefon.
 * Warna & susun atur identik dengan komponen app sebenar
 * (LevelMap, QuizCard, PreschoolCard, MatchingCard, Dashboard).
 */

function Phone({ children, label, sub }: { children: React.ReactNode; label: string; sub: string }) {
  return (
    <div className="flex flex-col items-center gap-3 shrink-0">
      <div className="bg-[#2b2140] rounded-[2rem] p-2.5 shadow-[0_20px_50px_rgba(43,33,64,0.25)] w-[260px]">
        <div className="bg-[#FFFDF2] rounded-[1.6rem] overflow-hidden">
          <div className="h-5 flex items-center justify-center bg-[#FFFDF2]">
            <div className="w-16 h-3 bg-[#2b2140] rounded-b-xl" />
          </div>
          <div className="h-[380px] overflow-hidden">{children}</div>
        </div>
      </div>
      <div className="text-center max-w-[240px]">
        <p className="font-black text-sm uppercase">{label}</p>
        <p className="text-xs font-semibold text-gray-500 leading-snug mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

/* ---------- 1. Peta Misi ---------- */
function ScreenLevelMap() {
  const levels = [
    { icon: "⚡", badge: "Misi 1", title: "RAGA: Selamatkan OBI!", color: "#FFB800", bg: "#FFF8E1", done: true },
    { icon: "🕵️", badge: "Misi 2", title: "Agen Nur: Tangkap Pencuri!", color: "#FF4757", bg: "#FFE8EA", done: false },
    { icon: "🔒", badge: "Misi 3", title: "Kembar Ria: Hari Raya!", color: "#27AE60", bg: "#E0F5E9", locked: true },
  ];
  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#FFB800] border-b-[3px] border-black px-3 py-2 flex items-center justify-between">
        <span className="text-[10px] font-black border-2 border-black rounded-md px-1.5 py-0.5 bg-white">← Balik</span>
        <span className="font-black text-xs">Adam</span>
        <span className="text-[10px] font-black bg-white border-2 border-black rounded-md px-1.5 py-0.5">⭐ 42</span>
      </div>
      <div className="p-3 flex flex-col gap-2.5">
        <p className="font-black text-center text-sm uppercase">Pilih Misi</p>
        {levels.map((l) => (
          <div
            key={l.badge}
            style={{
              backgroundColor: l.bg,
              borderColor: l.locked ? "#ccc" : l.color,
              boxShadow: l.locked ? "none" : "3px 3px 0px 0px rgba(0,0,0,1)",
              opacity: l.locked ? 0.55 : 1,
            }}
            className="border-[3px] rounded-xl p-2 flex items-center gap-2"
          >
            <div
              style={{ backgroundColor: l.color }}
              className="w-9 h-9 border-2 border-black rounded-lg flex items-center justify-center text-lg shrink-0"
            >
              {l.done ? "✅" : l.icon}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[8px] font-black bg-black text-white rounded px-1 py-0.5">{l.badge}</span>
              <p className="font-black text-[10px] leading-tight mt-0.5 truncate">{l.title}</p>
            </div>
            <div className="text-[9px] shrink-0">{l.done ? "⭐⭐⭐" : "⭐"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 2. Soalan Misi (bercerita) ---------- */
function ScreenQuiz() {
  return (
    <div className="h-full flex flex-col p-3 gap-2.5">
      <div className="flex justify-between text-[9px] font-black">
        <span>Soalan 4 / 30</span><span>13%</span>
      </div>
      <div className="h-2 bg-white border-2 border-black rounded-full overflow-hidden">
        <div className="h-full bg-[#FFB800] w-[13%]" />
      </div>
      <div className="border-[3px] border-black rounded-xl bg-white overflow-hidden shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        <div className="bg-[#45B7D1] border-b-[3px] border-black px-2.5 py-1.5">
          <p className="text-[7px] font-black uppercase tracking-widest opacity-70">Cerita</p>
          <p className="font-bold text-[9px] leading-snug">
            RAGA Kilat melancarkan serangan pada kapal musuh!
          </p>
        </div>
        <div className="px-2.5 py-2.5">
          <p className="font-black text-[12px] leading-snug text-center">
            Ada 70 musuh. RAGA kalahkan 29. Berapa yang tinggal?
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { l: "A", v: "39", c: "#FFB800" },
          { l: "B", v: "40", c: "#FF6B6B" },
          { l: "C", v: "41", c: "#4ECDC4", correct: true },
          { l: "D", v: "42", c: "#45B7D1" },
        ].map((o) => (
          <div
            key={o.l}
            style={{
              backgroundColor: o.correct ? "#4ECDC4" : "#fff",
              boxShadow: o.correct ? "1px 1px 0px 0px rgba(0,0,0,1)" : "3px 3px 0px 0px rgba(0,0,0,1)",
            }}
            className="border-[3px] border-black rounded-xl py-2.5 font-black text-[13px] text-center"
          >
            <span
              style={{ backgroundColor: o.c }}
              className="inline-block w-4 h-4 border border-black rounded text-[7px] leading-4 mr-1 align-middle"
            >
              {o.l}
            </span>
            {o.v}
          </div>
        ))}
      </div>
      <div className="border-[3px] border-black rounded-xl bg-[#4ECDC4] px-2 py-1.5 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        <p className="font-black text-[10px]">🌟 Betul! Musuh berundur!</p>
      </div>
    </div>
  );
}

/* ---------- 3. Kuiz Si Kecil (2-5 tahun) ---------- */
function ScreenPreschool() {
  return (
    <div className="h-full flex flex-col p-3 gap-3">
      <div className="flex justify-between text-[9px] font-black">
        <span>Soalan 1 / 5</span><span>20%</span>
      </div>
      <div className="h-2 bg-white border-2 border-black rounded-full overflow-hidden">
        <div className="h-full bg-[#FFB800] w-[20%]" />
      </div>
      <div className="border-[3px] border-black rounded-2xl bg-white px-3 py-4 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        <div className="text-3xl mb-1">🐔 Ayam</div>
        <p className="font-black text-[12px]">Ayam mula dengan huruf apa?</p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {[
          { v: "A", c: "#FFB800" }, { v: "S", c: "#FF6B6B" },
          { v: "M", c: "#4ECDC4" }, { v: "I", c: "#45B7D1" },
        ].map((o) => (
          <div
            key={o.v}
            style={{ backgroundColor: o.c, boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)" }}
            className="border-[3px] border-black rounded-2xl py-4 font-black text-2xl text-white text-center"
          >
            {o.v}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 4. Padanan A ke B ---------- */
function ScreenMatching() {
  const left = ["🐝", "🍎", "🐱", "🐟"];
  const right = ["I", "L", "K", "E"];
  // garisan hijau: 🐝→L(1), 🍎→E(3)
  return (
    <div className="h-full flex flex-col p-3 gap-3">
      <div className="border-[3px] border-black rounded-2xl bg-[#9B59B6] px-2 py-2 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        <p className="font-black text-[11px] text-white">Padan gambar dengan huruf pertama</p>
      </div>
      <div className="relative grid grid-cols-2 gap-x-10 gap-y-2.5">
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <line x1="88" y1="18" x2="140" y2="60" stroke="#26D182" strokeWidth={4} strokeLinecap="round" />
          <line x1="88" y1="60" x2="140" y2="145" stroke="#26D182" strokeWidth={4} strokeLinecap="round" />
        </svg>
        <div className="flex flex-col gap-2.5">
          {left.map((it, i) => (
            <div
              key={it}
              style={{
                backgroundColor: i < 2 ? "#26D182" : "#fff",
                boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)",
              }}
              className="border-[3px] border-black rounded-xl h-9 flex items-center justify-center text-lg"
            >
              {it}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          {right.map((it, i) => (
            <div
              key={it}
              style={{
                backgroundColor: i === 1 || i === 3 ? "#26D182" : "#fff",
                boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)",
              }}
              className="border-[3px] border-black rounded-xl h-9 flex items-center justify-center font-black text-base"
            >
              {it}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- 5. Dashboard Ibu Bapa ---------- */
function ScreenDashboard() {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#FFB800] border-b-[3px] border-black px-3 py-2 flex items-center justify-between">
        <span className="font-black text-[11px]">Dashboard Ibu Bapa</span>
        <span className="text-[9px] font-bold">Hai, Aida!</span>
      </div>
      <div className="p-2.5 flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          {[
            { i: "👧", v: "3/4", l: "Kanak-kanak" },
            { i: "⭐", v: "127", l: "Jumlah Bintang" },
            { i: "🎁", v: "2", l: "Hadiah Aktif" },
            { i: "✅", v: "Aktif", l: "Langganan" },
          ].map((s) => (
            <div key={s.l} className="border-[3px] border-black rounded-lg bg-white p-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-sm">{s.i}</div>
              <div className="font-black text-[13px] leading-none">{s.v}</div>
              <div className="text-[7px] font-bold text-gray-500 uppercase">{s.l}</div>
            </div>
          ))}
        </div>
        <p className="font-black text-[10px] uppercase mt-1">Kemajuan Anak</p>
        {[
          { n: "Adam", a: "7-9 tahun", p: 72, c: "#4ECDC4" },
          { n: "Aisyah", a: "2-5 tahun", p: 45, c: "#FF6B6B" },
        ].map((k) => (
          <div key={k.n} className="border-[3px] border-black rounded-lg bg-white p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex justify-between items-center mb-1">
              <span className="font-black text-[10px]">{k.n}</span>
              <span className="text-[8px] font-bold text-gray-500">{k.a}</span>
            </div>
            <div className="h-2 bg-gray-200 border-2 border-black rounded-full overflow-hidden">
              <div style={{ width: `${k.p}%`, backgroundColor: k.c }} className="h-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const SCREENS = [
  { key: "map", label: "Peta Misi", sub: "Anak buka misi satu per satu — kena kuasai dulu baru maju", el: <ScreenLevelMap /> },
  { key: "quiz", label: "Misi Bercerita", sub: "Setiap soalan ada cerita superhero yang buat anak nak sambung", el: <ScreenQuiz /> },
  { key: "kecil", label: "Kuiz Si Kecil", sub: "Kenal huruf untuk umur 2-5 — butang besar, mudah ditekan", el: <ScreenPreschool /> },
  { key: "match", label: "Padanan Garisan", sub: "Padan gambar dengan huruf — sambung garisan dengan jari", el: <ScreenMatching /> },
  { key: "dash", label: "Dashboard Ibu Bapa", sub: "Pantau kemajuan setiap anak, urus hadiah & bintang", el: <ScreenDashboard /> },
];

export function AppScreens() {
  return (
    <div className="-mx-4 px-4 overflow-x-auto pb-4">
      <div className="flex gap-6 w-max mx-auto">
        {SCREENS.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Phone label={s.label} sub={s.sub}>{s.el}</Phone>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
