"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui";

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

  function handleAnswer(opt: number) {
    if (selected !== null) return;
    setSelected(opt);
    const isCorrect = opt === q.correct;
    if (isCorrect) setCorrectCount((c) => c + 1);

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
    <div className="max-w-sm mx-auto">
      {/* Phone frame */}
      <div
        style={{ boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)" }}
        className="border-4 border-black rounded-[2.5rem] bg-white p-3 relative"
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-3 py-1 text-xs font-black text-gray-500">
          <span>MisiMinda</span>
          <span>9:41 🔋</span>
        </div>

        <div className="border-3 border-black rounded-[1.75rem] overflow-hidden bg-[#FFFDF2] min-h-[420px] flex flex-col">
          {/* Header */}
          <div className="bg-[#FFB800] border-b-3 border-black px-4 py-3 flex items-center justify-between">
            <span className="font-black text-sm uppercase">🗺️ Misi RAGA</span>
            <div className="flex items-center gap-1 bg-white border-2 border-black rounded-lg px-2 py-0.5">
              <span className="text-xs">⭐</span>
              <span className="font-black text-xs">{correctCount}</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col p-4">
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 flex flex-col gap-4"
                >
                  <p className="text-xs font-bold text-gray-500 uppercase">
                    Soalan {index + 1} / {DEMO_QUESTIONS.length}
                  </p>

                  <div className="bg-white border-3 border-black rounded-xl p-3">
                    <p className="text-xs font-semibold text-gray-700 leading-snug">{q.story}</p>
                  </div>

                  <p className="font-black text-lg text-center leading-tight">{q.question}</p>

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
                          style={{
                            boxShadow: showState ? "none" : "3px 3px 0px 0px rgba(0,0,0,1)",
                          }}
                          className={`border-3 rounded-xl py-3 font-black text-lg transition-colors ${
                            showState && isCorrectOpt
                              ? "bg-[#4ECDC4] border-black"
                              : showState && isSelected && !isCorrectOpt
                              ? "bg-[#FF6B6B] border-black"
                              : "bg-white border-black hover:bg-gray-50"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {selected !== null && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center font-black text-sm"
                    >
                      {selected === q.correct ? q.success : "Cuba lagi lain kali! 💪"}
                    </motion.p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center gap-3"
                >
                  <span className="text-5xl">{correctCount === 3 ? "🏆" : "⭐"}</span>
                  <p className="font-black text-xl uppercase">Demo Selesai!</p>
                  <p className="font-bold text-gray-700">
                    Anda jawab <span className="text-black">{correctCount}/3</span> betul!
                  </p>
                  <p className="text-sm font-semibold text-gray-600 max-w-[220px]">
                    Ini baru sedikit contoh. MisiMinda ada 550+ soalan menanti anak anda!
                  </p>
                  <div className="flex flex-col gap-2 w-full mt-2">
                    <Button variant="primary" size="sm" fullWidth onClick={reset}>
                      🔁 Main Semula
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
