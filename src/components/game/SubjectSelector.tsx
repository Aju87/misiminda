"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui";
import { SUBJECTS, SCIENCE_THEMES } from "@/lib/constants";
import type { Kid, Subject } from "@/types";

interface Props {
  kid: Kid;
  onSelect: (subject: Subject) => void;
  onBack: () => void;
}

export function SubjectSelector({ kid, onSelect, onBack }: Props) {
  const sci = SCIENCE_THEMES[kid.age_group];

  return (
    <div className="min-h-screen bg-[#FFFDF2] flex flex-col">
      <div className="border-b-4 border-black bg-[#FFB800] px-4 py-4">
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <button onClick={onBack}
                  className="border-3 border-black rounded-xl px-3 py-1.5 font-black text-sm bg-white">
            ←
          </button>
          <div>
            <p className="font-black text-lg uppercase">{kid.name}</p>
            <p className="text-xs font-bold opacity-70">Pilih subjek</p>
          </div>
          <Link href="/" className="ml-auto"><Logo size={40} /></Link>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-6 px-4 py-8 max-w-xl mx-auto w-full">
        <div className="text-center">
          <h1 className="font-black text-3xl uppercase">Nak Belajar Apa?</h1>
          <p className="font-semibold text-gray-600 mt-1">Pilih subjek untuk mulakan</p>
        </div>

        <div className="flex flex-col gap-4">
          {SUBJECTS.map((s, i) => (
            <motion.button
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onSelect(s.id as Subject)}
              style={{ backgroundColor: s.bg, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
              className="border-4 border-black rounded-2xl p-6 text-left hover:translate-x-[3px] hover:translate-y-[3px] transition-transform"
              whileTap={{ scale: 0.97 }}
            >
              <div className="flex items-center gap-4">
                <span className="text-5xl">{s.emoji}</span>
                <div className="flex-1">
                  <p className="font-black text-xl uppercase">{s.title}</p>
                  <p className="font-semibold text-sm text-gray-700 mt-1">
                    {s.id === "sains" && sci ? `${sci.emoji} ${sci.title}` : s.desc}
                  </p>
                  {s.id === "sains" && sci && (
                    <span className="inline-block mt-1.5 bg-black text-white text-[10px] font-black px-2 py-0.5 rounded">
                      {sci.grade}
                    </span>
                  )}
                </div>
                <span className="font-black text-2xl">→</span>
              </div>
            </motion.button>
          ))}
        </div>

        <div style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
             className="border-4 border-black rounded-2xl bg-white p-4 flex items-center gap-3">
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
