"use client";

import { motion } from "framer-motion";
import { SCIENCE_THEMES } from "@/lib/constants";
import type { Kid, Level, KidProgress } from "@/types";

interface Props {
  kid: Kid;
  levels: Level[];
  getProgress: (levelId: string) => KidProgress | undefined;
  onSelectLevel: (level: Level) => void;
  onBack: () => void;
}

export function ScienceLevelList({ kid, levels, getProgress, onSelectLevel, onBack }: Props) {
  const meta = SCIENCE_THEMES[kid.age_group] ?? {
    title: "Sains", emoji: "🔬", grade: "", color: "#26D182", bg: "#E0FFF0",
  };

  return (
    <div className="min-h-screen bg-[#FFFDF2] flex flex-col">
      <div className="border-b-4 border-black px-4 py-4" style={{ backgroundColor: meta.color }}>
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <button onClick={onBack}
                  className="border-3 border-black rounded-xl px-3 py-1.5 font-black text-sm bg-white">
            ←
          </button>
          <div className="min-w-0">
            <p className="font-black text-lg uppercase text-white truncate">
              {meta.emoji} {meta.title}
            </p>
            <p className="text-xs font-bold text-white/80">{kid.name} • {meta.grade}</p>
          </div>
          <div className="ml-auto flex items-center gap-1 bg-white border-2 border-black rounded-xl px-3 py-1 shrink-0">
            <span>⭐</span><span className="font-black">{kid.total_stars}</span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-xl mx-auto w-full px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black uppercase">Pilih Topik Sains</h1>
          <p className="font-semibold text-gray-600 text-sm mt-1">
            {levels.length} topik mengikut silibus
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {levels.map((level, i) => {
            const prog = getProgress(level.id);
            const done = prog?.completed ?? false;
            const stars = prog?.stars_earned ?? 0;
            const prev = i > 0 ? levels[i - 1] : null;
            const prevProg = prev ? getProgress(prev.id) : null;
            const locked = i > 0 && !prevProg?.completed;

            return (
              <motion.button
                key={level.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileTap={locked ? {} : { scale: 0.98 }}
                onClick={() => !locked && onSelectLevel(level)}
                disabled={locked}
                style={{
                  backgroundColor: done ? meta.bg : "#fff",
                  borderColor: locked ? "#ccc" : "#000",
                  boxShadow: locked ? "none" : "5px 5px 0px 0px rgba(0,0,0,1)",
                  opacity: locked ? 0.55 : 1,
                }}
                className="border-4 rounded-2xl p-4 text-left flex items-center gap-4 disabled:cursor-not-allowed"
              >
                <div style={{ backgroundColor: meta.color }}
                     className="w-14 h-14 border-3 border-black rounded-2xl flex items-center justify-center text-2xl shrink-0">
                  {done ? "✅" : locked ? "🔒" : (level.icon ?? "🔬")}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-black bg-black text-white rounded px-1.5 py-0.5">
                    Topik {level.level_number}
                  </span>
                  <p className="font-black text-lg leading-tight mt-1">{level.theme}</p>
                  {level.description && (
                    <p className="text-sm font-semibold text-gray-600 mt-0.5">{level.description}</p>
                  )}
                </div>
                <div className="flex gap-0.5 shrink-0">
                  {[1, 2, 3].map((s) => (
                    <span key={s} className={`text-lg ${stars >= s * 3 ? "" : "opacity-25"}`}>⭐</span>
                  ))}
                </div>
              </motion.button>
            );
          })}

          {levels.length === 0 && (
            <div className="text-center py-16 text-gray-500 font-bold">
              <p className="text-5xl mb-4">🔬</p>
              <p>Topik Sains untuk umur ini akan datang segera!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
