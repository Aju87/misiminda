"use client";

import { useState } from "react";

interface DemoQuestion {
  story: string;
  question: string;
  options: number[];
  correct: number;
  success: string;
}

const DEMO_QUESTIONS: DemoQuestion[] = [
  {
    story: "RAGA sedang berlawan dengan Dr. Kosmo! Bantu dia selesaikan misi ini.",
    question: "Kapal ada 45 peluru. Mereka tembak 23. Berapa yang tinggal?",
    options: [20, 22, 24, 26],
    correct: 22,
    success: "Tepat! Krew selamat! 🎉",
  },
  {
    story: "RAGA Kilat lancarkan serangan pantas pada kapal musuh!",
    question: "Ada 70 musuh. RAGA Kilat kalahkan 29. Berapa yang tinggal?",
    options: [39, 40, 41, 42],
    correct: 41,
    success: "Betul! Musuh berundur! ⚡",
  },
  {
    story: "RAGA ada 7 elemen berbeza — setiap satu ada kuasa tersendiri.",
    question: "Setiap elemen ada 8 kuasa. Ada 7 elemen. Berapa jumlah kuasa?",
    options: [54, 55, 56, 57],
    correct: 56,
    success: "Hebat! 7 × 8 = 56! 🔥",
  },
];

export function DemoWidget() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  const q = DEMO_QUESTIONS[index];
  const progress = ((index + (selected !== null ? 1 : 0)) / DEMO_QUESTIONS.length) * 100;

  function handleAnswer(opt: number) {
    if (selected !== null) return;
    setSelected(opt);
    if (opt === q.correct) setCorrectCount((c) => c + 1);

    setTimeout(() => {
      if (index + 1 >= DEMO_QUESTIONS.length) {
        setDone(true);
      } else {
        setIndex((i) => i + 1);
        setSelected(null);
      }
    }, 1200);
  }

  function reset() {
    setIndex(0);
    setSelected(null);
    setCorrectCount(0);
    setDone(false);
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-[2rem] shadow-[0_24px_60px_rgba(255,90,150,0.18)] border border-[#ffe3ee] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <span className="font-bold text-[#e8590c] text-sm">🗺️ Misi RAGA · Tahap 1</span>
          <span className="bg-[#fff1d6] text-[#b45309] font-extrabold text-sm px-3 py-1 rounded-full">
            ⭐ {correctCount}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mx-6 h-2 rounded-full bg-[#ffe9f1] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#ff5e8a] to-[#ffa94d] transition-all duration-500"
            style={{ width: `${done ? 100 : progress}%` }}
          />
        </div>

        <div className="p-6 min-h-[380px] flex flex-col">
          {!done ? (
              <div key={index} className="flex-1 flex flex-col gap-4">
                <p className="text-xs font-bold text-[#9c8aa5] uppercase tracking-wider">
                  Soalan {index + 1} / {DEMO_QUESTIONS.length}
                </p>

                <div className="bg-[#fff8f0] border border-[#ffe4c4] rounded-2xl p-4">
                  <p className="text-sm font-semibold text-[#7a5c3e] leading-relaxed">{q.story}</p>
                </div>

                <p className="font-extrabold text-xl text-[#2b2140] text-center leading-snug">
                  {q.question}
                </p>

                <div className="grid grid-cols-2 gap-3 mt-auto">
                  {q.options.map((opt) => {
                    const isSelected = selected === opt;
                    const isCorrectOpt = opt === q.correct;
                    const showState = selected !== null;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        disabled={selected !== null}
                        className={`rounded-2xl py-4 font-extrabold text-2xl border-2 transition-all ${
                          showState && isCorrectOpt
                            ? "bg-[#d3f9e8] border-[#2dd4a8] text-[#0f7a5c] scale-105"
                            : showState && isSelected && !isCorrectOpt
                            ? "bg-[#ffe3e8] border-[#ff5e8a] text-[#c9184a]"
                            : "bg-white border-[#e9e2f0] text-[#2b2140] hover:border-[#ff5e8a] hover:shadow-[0_8px_20px_rgba(255,94,138,0.15)] active:scale-95"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {selected !== null && (
                  <p className="text-center font-extrabold text-[#e8590c]">
                    {selected === q.correct ? q.success : "Tak mengapa — cuba soalan seterusnya! 💪"}
                  </p>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
                <span className="text-6xl">{correctCount === 3 ? "🏆" : "⭐"}</span>
                <p className="font-extrabold text-2xl text-[#2b2140]">
                  {correctCount === 3 ? "Sempurna!" : "Demo Selesai!"}
                </p>
                <p className="font-bold text-[#6b5b7a]">
                  Anda jawab <span className="text-[#e8590c]">{correctCount}/3</span> dengan betul
                </p>
                <p className="text-sm font-medium text-[#9c8aa5] max-w-[260px] leading-relaxed">
                  Ini baru 3 soalan. Anak anda akan dapat <strong className="text-[#2b2140]">550+ soalan</strong> macam ini — semuanya dalam misi superhero yang seru!
                </p>
                <button
                  onClick={reset}
                  className="mt-2 bg-gradient-to-r from-[#ff5e8a] to-[#ff8a5c] text-white font-extrabold px-8 py-3 rounded-full shadow-[0_12px_28px_rgba(255,94,138,0.35)] hover:scale-105 active:scale-95 transition-transform"
                >
                  🔁 Main Semula
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
