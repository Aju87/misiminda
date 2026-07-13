"use client";

import { motion } from "framer-motion";
import { PRESCHOOL_MODULES } from "@/lib/constants";
import type { Kid, Level, KidProgress, PreschoolModule } from "@/types";

interface PreschoolLevelListProps {
  kid: Kid;
  module: PreschoolModule;
  levels: Level[]; // sudah ditapis kepada modul ini
  getProgress: (levelId: string) => KidProgress | undefined;
  onSelectLevel: (level: Level) => void;
  onBack: () => void;
}

export function PreschoolLevelList({
  kid,
  module,
  levels,
  getProgress,
  onSelectLevel,
  onBack,
}: PreschoolLevelListProps) {
  const meta = PRESCHOOL_MODULES.find((m) => m.id === module) ?? PRESCHOOL_MODULES[0];

  return (
    <div className="min-h-screen bg-[#FFFDF2] flex flex-col">
      {/* Header */}
      <div className="border-b-4 border-black px-4 py-4" style={{ backgroundColor: meta.color }}>
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <button
            onClick={onBack}
            className="border-3 border-black rounded-xl px-3 py-1.5 font-black text-sm bg-white"
          >
            ←
          </button>
          <div>
            <p className="font-black text-lg uppercase text-white">{meta.emoji} {meta.title}</p>
            <p className="text-xs font-bold text-white/80">{kid.name} • Si Kecil</p>
          </div>
          <div className="ml-auto flex items-center gap-1 bg-white border-2 border-black rounded-xl px-3 py-1">
            <span>⭐</span>
            <span className="font-black">{kid.total_stars}</span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-xl mx-auto w-full px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black uppercase">Pilih Level</h1>
          <p className="font-semibold text-gray-600 text-sm mt-1">{meta.desc}</p>
        </div>

        <div className="flex flex-col gap-4">
          {levels.map((level, i) => {
            const prog = getProgress(level.id);
            const isCompleted = prog?.completed ?? false;
            const starsEarned = prog?.stars_earned ?? 0;
            const prevLevel = i > 0 ? levels[i - 1] : null;
            const prevProg = prevLevel ? getProgress(prevLevel.id) : null;
            const isLocked = i > 0 && !prevProg?.completed;

            return (
              <motion.button
                key={level.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileTap={isLocked ? {} : { scale: 0.98 }}
                onClick={() => !isLocked && onSelectLevel(level)}
                disabled={isLocked}
                style={{
                  backgroundColor: isCompleted ? meta.bg : "#fff",
                  borderColor: isLocked ? "#ccc" : "#000",
                  boxShadow: isLocked ? "none" : "5px 5px 0px 0px rgba(0,0,0,1)",
                  opacity: isLocked ? 0.55 : 1,
                }}
                className="border-4 rounded-2xl p-4 text-left flex items-center gap-4 disabled:cursor-not-allowed"
              >
                <div
                  style={{ backgroundColor: meta.color }}
                  className="w-14 h-14 border-3 border-black rounded-2xl flex items-center justify-center text-2xl shrink-0"
                >
                  {isCompleted ? "✅" : isLocked ? "🔒" : (level.icon ?? "🐣")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-lg leading-tight">{level.theme}</p>
                  {level.description && (
                    <p className="text-sm font-semibold text-gray-600 mt-0.5">{level.description}</p>
                  )}
                </div>
                <div className="flex gap-0.5 shrink-0">
                  {[1, 2, 3].map((s) => (
                    <span key={s} className={`text-lg ${starsEarned >= s * 3 ? "" : "opacity-25"}`}>⭐</span>
                  ))}
                </div>
              </motion.button>
            );
          })}

          {levels.length === 0 && (
            <div className="text-center py-16 text-gray-500 font-bold">
              <p className="text-5xl mb-4">🚧</p>
              <p>Aktiviti untuk modul ini akan datang segera!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
