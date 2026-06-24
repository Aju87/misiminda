"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui";
import { LEVEL_THEMES } from "@/lib/constants";
import type { Level, KidProgress, Kid } from "@/types";

interface LevelMapProps {
  kid: Kid;
  levels: Level[];
  getProgress: (levelId: string) => KidProgress | undefined;
  onSelectLevel: (level: Level) => void;
  onBack: () => void;
}

export function LevelMap({ kid, levels, getProgress, onSelectLevel, onBack }: LevelMapProps) {
  return (
    <div className="min-h-screen bg-[#FFFDF2] flex flex-col">
      {/* Header */}
      <div className="border-b-4 border-black bg-[#FFB800] px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="border-3 border-black rounded-xl px-4 py-2 font-black bg-white hover:bg-gray-100 transition-colors"
          >
            ← Balik
          </button>
          <div className="flex items-center gap-3">
            <span className="font-black text-lg">{kid.name}</span>
            <div className="flex items-center gap-1 bg-white border-2 border-black rounded-xl px-3 py-1">
              <span>⭐</span>
              <span className="font-black">{kid.total_stars}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-black uppercase">Pilih Misi</h1>
          <p className="font-semibold text-gray-600 mt-1">
            Kumpulan Umur {kid.age_group} Tahun
          </p>
        </motion.div>

        {/* Vertical level path */}
        <div className="relative flex flex-col gap-6">
          {levels.map((level, i) => {
            const prog = getProgress(level.id);
            const isCompleted = prog?.completed ?? false;
            const starsEarned = prog?.stars_earned ?? 0;
            const theme = LEVEL_THEMES[level.theme] ?? { color: "#FFB800", bg: "#FFF8E1" };
            // Lock level if previous level not completed
            const prevLevel = i > 0 ? levels[i - 1] : null;
            const prevProgress = prevLevel ? getProgress(prevLevel.id) : null;
            const isLocked = i > 0 && !prevProgress?.completed;

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                {/* Connector line */}
                {i < levels.length - 1 && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-1 h-6 bg-black z-0" />
                )}

                <motion.button
                  whileHover={isLocked ? {} : { scale: 1.02, y: -2 }}
                  whileTap={isLocked ? {} : { scale: 0.98 }}
                  onClick={() => !isLocked && onSelectLevel(level)}
                  style={{
                    backgroundColor: theme.bg,
                    boxShadow: isLocked
                      ? "none"
                      : "6px 6px 0px 0px rgba(0,0,0,1)",
                    borderColor: theme.color,
                    opacity: isLocked ? 0.5 : 1,
                  }}
                  className="w-full border-4 rounded-2xl p-5 text-left cursor-pointer disabled:cursor-not-allowed"
                  disabled={isLocked}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Level number bubble */}
                      <div
                        style={{ backgroundColor: theme.color }}
                        className="w-14 h-14 border-3 border-black rounded-2xl flex items-center justify-center font-black text-2xl shrink-0"
                      >
                        {isCompleted ? "✅" : isLocked ? "🔒" : `${level.level_number}`}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="black" className="text-xs">
                            Tahap {level.level_number}
                          </Badge>
                          {isCompleted && <Badge variant="mint">Selesai!</Badge>}
                        </div>
                        <h3 className="font-black text-lg leading-tight">{level.theme}</h3>
                        {level.description && (
                          <p className="text-sm font-semibold text-gray-600 mt-1">
                            {level.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Stars earned */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map((s) => (
                          <span
                            key={s}
                            className={`text-xl ${starsEarned >= s * 3 ? "" : "opacity-30"}`}
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-gray-500 mt-1">
                        {starsEarned} bintang
                      </span>
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            );
          })}

          {levels.length === 0 && (
            <div className="text-center py-16 text-gray-500 font-bold">
              <p className="text-5xl mb-4">🚧</p>
              <p>Misi untuk kumpulan umur ini akan datang segera!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
