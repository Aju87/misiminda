"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui";
import { PRESCHOOL_MODULES } from "@/lib/constants";
import type { Kid, QuizMode, PreschoolModule } from "@/types";

interface ModeSelectorProps {
  kid: Kid;
  onSelect: (mode: QuizMode, category?: PreschoolModule) => void;
  onBack: () => void;
}

const MATH_MODES = [
  {
    id: "misi" as QuizMode,
    emoji: "🗺️",
    title: "Misi Matematik",
    desc: "Selesaikan misi menarik dengan cerita seru. Kumpul bintang!",
    color: "#FFB800",
    bg: "#FFF8E1",
  },
  {
    id: "latihan" as QuizMode,
    emoji: "⚡",
    title: "Latihan Pantas",
    desc: "Latih kemahiran: sifir darab, bahagi, tambah & tolak.",
    color: "#4ECDC4",
    bg: "#E8FAF9",
  },
];

export function ModeSelector({ kid, onSelect, onBack }: ModeSelectorProps) {
  const isPreschool = kid.age_group === "2-5";

  return (
    <div className="min-h-screen bg-[#FFFDF2] flex flex-col">
      {/* Header */}
      <div className="border-b-4 border-black bg-[#FFB800] px-4 py-4">
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <button
            onClick={onBack}
            className="border-3 border-black rounded-xl px-3 py-1.5 font-black text-sm bg-white"
          >
            ←
          </button>
          <div>
            <p className="font-black text-lg uppercase">{kid.name}</p>
            <p className="text-xs font-bold opacity-70">Pilih mod pembelajaran</p>
          </div>
          <Link href="/" className="ml-auto">
            <Logo size={40} />
          </Link>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-6 px-4 py-8 max-w-xl mx-auto w-full">
        <div className="text-center">
          <h1 className="font-black text-3xl uppercase">
            {isPreschool ? "Nak Belajar Apa? 🐣" : "Nak Buat Apa?"}
          </h1>
          <p className="font-semibold text-gray-600 mt-1">
            {isPreschool ? "Pilih aktiviti untuk si kecil" : "Pilih mod untuk mulakan"}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {isPreschool
            ? PRESCHOOL_MODULES.map((mode, i) => (
                <motion.button
                  key={mode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => onSelect("prasekolah", mode.id as PreschoolModule)}
                  style={{ backgroundColor: mode.bg, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
                  className="border-4 border-black rounded-2xl p-6 text-left hover:translate-x-[3px] hover:translate-y-[3px] transition-transform"
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{mode.emoji}</span>
                    <div className="flex-1">
                      <p className="font-black text-xl uppercase">{mode.title}</p>
                      <p className="font-semibold text-sm text-gray-700 mt-1">{mode.desc}</p>
                    </div>
                    <span className="font-black text-2xl">→</span>
                  </div>
                </motion.button>
              ))
            : MATH_MODES.map((mode, i) => (
                <motion.button
                  key={mode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => onSelect(mode.id)}
                  style={{ backgroundColor: mode.bg, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
                  className="border-4 border-black rounded-2xl p-6 text-left hover:translate-x-[3px] hover:translate-y-[3px] transition-transform"
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{mode.emoji}</span>
                    <div className="flex-1">
                      <p className="font-black text-xl uppercase">{mode.title}</p>
                      <p className="font-semibold text-sm text-gray-700 mt-1">{mode.desc}</p>
                    </div>
                    <span className="font-black text-2xl">→</span>
                  </div>
                </motion.button>
              ))}
        </div>

        {/* Stars display */}
        <div
          style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
          className="border-4 border-black rounded-2xl bg-white p-4 flex items-center gap-3"
        >
          <span className="text-3xl">⭐</span>
          <div>
            <p className="font-black text-lg">{kid.total_stars} Bintang</p>
            <p className="font-semibold text-xs text-gray-600">Bintang terkumpul {kid.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
