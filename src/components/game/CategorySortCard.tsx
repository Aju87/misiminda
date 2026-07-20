"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { CategoryData, Question } from "@/types";

interface Props {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (correct: boolean) => void;
}

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

/**
 * Soalan "kategori" — asingkan item kepada 2 bakul.
 * Interaksi mesra kanak-kanak: tekan item dahulu, kemudian tekan bakul.
 */
export function CategorySortCard({ question, questionNumber, totalQuestions, onAnswer }: Props) {
  const data = question.options as CategoryData;
  const buckets = data?.buckets ?? ["A", "B"];
  const items = useMemo(() => data?.items ?? [], [data]);

  const [pool, setPool] = useState(items);
  useEffect(() => { setPool(shuffle(items)); }, [items]);

  // label item -> bakul yang DIKUNCI (hanya yang betul)
  const [placed, setPlaced] = useState<Record<string, 0 | 1>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const remaining = pool.filter((it) => !(it.label in placed));

  function tapBucket(b: 0 | 1) {
    if (done || !selected) return;
    const item = pool.find((i) => i.label === selected);
    if (!item) return;

    if (item.bucket === b) {
      const next = { ...placed, [item.label]: b };
      setPlaced(next);
      setSelected(null);
      if (Object.keys(next).length === pool.length) {
        setDone(true);
        setTimeout(() => onAnswer(true), 1300);
      }
    } else {
      setWrong(item.label);
      setSelected(null);
      setTimeout(() => setWrong(null), 700);
    }
  }

  const bucketColors = ["#4ECDC4", "#FFB800"];

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-5 w-full max-w-xl mx-auto"
    >
      {/* Progress */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm font-black">
          <span>Soalan {questionNumber} / {totalQuestions}</span>
          <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
        </div>
        <div className="h-4 bg-white border-3 border-black rounded-full overflow-hidden">
          <div className="h-full bg-[#FFB800] rounded-full transition-all"
               style={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }} />
        </div>
      </div>

      {/* Arahan */}
      <div style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
           className="border-4 border-black rounded-2xl bg-[#45B7D1] px-5 py-4 text-center">
        <p className="font-black text-lg text-white">{question.question_text}</p>
        <p className="text-xs font-bold text-white/80 mt-1">
          Tekan item di bawah, kemudian tekan bakul yang betul
        </p>
      </div>

      {/* Dua bakul */}
      <div className="grid grid-cols-2 gap-3">
        {buckets.map((b, bi) => {
          const inside = Object.entries(placed).filter(([, v]) => v === bi).map(([k]) => k);
          return (
            <button
              key={b}
              onClick={() => tapBucket(bi as 0 | 1)}
              disabled={done || !selected}
              style={{
                backgroundColor: bucketColors[bi],
                boxShadow: "5px 5px 0px 0px rgba(0,0,0,1)",
                opacity: selected || done ? 1 : 0.85,
              }}
              className="border-4 border-black rounded-2xl p-3 min-h-[130px] flex flex-col gap-2 text-left"
            >
              <span className="font-black text-sm uppercase text-center">{b}</span>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {inside.map((label) => (
                  <span key={label}
                        className="bg-white border-2 border-black rounded-lg px-2 py-1 font-bold text-[11px]">
                    ✓ {label}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Item belum diasingkan */}
      <div className="flex flex-wrap justify-center gap-2.5 min-h-[52px]">
        {remaining.map((it) => {
          const isSel = selected === it.label;
          const isWrong = wrong === it.label;
          return (
            <motion.button
              key={it.label}
              onClick={() => !done && setSelected(isSel ? null : it.label)}
              whileTap={{ scale: 0.92 }}
              animate={isWrong ? { x: [0, -6, 6, -4, 4, 0] } : {}}
              style={{
                backgroundColor: isWrong ? "#FF6B6B" : isSel ? "#FFB800" : "#fff",
                boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
              }}
              className="border-4 border-black rounded-2xl px-4 py-2.5 font-black text-sm"
            >
              {it.label}
            </motion.button>
          );
        })}
      </div>

      {done && (
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
          className="border-4 border-black rounded-2xl px-5 py-4 text-center bg-[#26D182] text-white"
        >
          <p className="font-black text-lg">🌟 {question.success_message}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
