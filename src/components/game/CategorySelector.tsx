"use client";

import { motion } from "framer-motion";
import type { Kid, Level, KidProgress } from "@/types";

interface CategorySelectorProps {
  kid: Kid;
  levels: Level[];
  getProgress: (levelId: string) => KidProgress | undefined;
  onSelectLevel: (level: Level) => void;
  onBack: () => void;
}

const CATEGORY_META: Record<string, { emoji: string; color: string; bg: string; label: string }> = {
  "tambah-tolak": { emoji: "➕", color: "#FF6B6B", bg: "#FFE8E8", label: "Tambah & Tolak" },
  sifir:          { emoji: "✖️", color: "#FFB800", bg: "#FFF8E1", label: "Sifir Darab" },
  bahagi:         { emoji: "➗", color: "#4ECDC4", bg: "#E8FAF9", label: "Bahagi" },
  pecahan:        { emoji: "½",  color: "#9B59B6", bg: "#F3E8FF", label: "Pecahan" },
  wang:           { emoji: "💰", color: "#27AE60", bg: "#E0F5E9", label: "Wang & Harga" },
  "masa-ukuran":  { emoji: "⏰", color: "#3498DB", bg: "#E8F2FF", label: "Masa & Ukuran" },
  geometri:       { emoji: "📐", color: "#E67E22", bg: "#FFF0E0", label: "Geometri" },
  data:           { emoji: "📊", color: "#8E44AD", bg: "#F5E8FF", label: "Statistik & Data" },
};

export function CategorySelector({ kid, levels, getProgress, onSelectLevel, onBack }: CategorySelectorProps) {
  // Group levels by category
  const byCategory: Record<string, Level[]> = {};
  for (const lvl of levels) {
    const cat = lvl.category ?? "lain";
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(lvl);
  }

  return (
    <div className="min-h-screen bg-[#FFFDF2] flex flex-col">
      {/* Header */}
      <div className="border-b-4 border-black bg-[#4ECDC4] px-4 py-4">
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <button
            onClick={onBack}
            className="border-3 border-black rounded-xl px-3 py-1.5 font-black text-sm bg-white"
          >
            ←
          </button>
          <div>
            <p className="font-black text-lg uppercase">⚡ Latihan Pantas</p>
            <p className="text-xs font-bold opacity-70">{kid.name} • {kid.age_group} tahun</p>
          </div>
          <div className="ml-auto text-3xl">{kid.avatar_url}</div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 max-w-xl mx-auto w-full flex flex-col gap-6">
        <div className="text-center">
          <h1 className="font-black text-2xl uppercase">Pilih Kategori</h1>
          <p className="font-semibold text-gray-600 text-sm mt-1">Setiap level ada 10 soalan</p>
        </div>

        {Object.entries(byCategory).map(([cat, catLevels], gi) => {
          const meta = CATEGORY_META[cat] ?? { emoji: "📚", color: "#888", bg: "#f5f5f5", label: cat };
          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.08 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{meta.emoji}</span>
                <h2 className="font-black text-lg uppercase">{meta.label}</h2>
              </div>

              {/* Levels in this category */}
              <div className="flex flex-col gap-3">
                {catLevels.map((level, i) => {
                  const prog = getProgress(level.id);
                  const stars = prog?.stars_earned ?? 0;
                  const done = prog?.completed ?? false;

                  return (
                    <motion.button
                      key={level.id}
                      onClick={() => onSelectLevel(level)}
                      style={{
                        backgroundColor: done ? meta.bg : "#fff",
                        boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
                        borderColor: done ? meta.color : "#000",
                      }}
                      className="border-4 rounded-xl p-4 text-left hover:translate-x-[2px] hover:translate-y-[2px] transition-transform w-full"
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          style={{ backgroundColor: meta.color }}
                          className="w-10 h-10 rounded-xl border-2 border-black flex items-center justify-center font-black text-white text-sm shrink-0"
                        >
                          L{level.level_number}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-sm uppercase truncate">{level.theme}</p>
                          <p className="text-xs font-semibold text-gray-600 mt-0.5">{level.description}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          {done ? (
                            <span className="text-xs font-black text-green-700 bg-green-100 border border-green-400 rounded-lg px-2 py-0.5">Selesai ✓</span>
                          ) : (
                            <span className="text-xs font-black text-gray-500 bg-gray-100 border border-gray-300 rounded-lg px-2 py-0.5">Belum Cuba</span>
                          )}
                          {stars > 0 && (
                            <span className="text-xs font-bold">⭐ {stars}</span>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}

        {levels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-5xl mb-4">🚧</p>
            <p className="font-black text-xl">Latihan belum tersedia</p>
            <p className="font-semibold text-gray-600 text-sm mt-2">Sila semak semula kemudian</p>
          </div>
        )}
      </div>
    </div>
  );
}
