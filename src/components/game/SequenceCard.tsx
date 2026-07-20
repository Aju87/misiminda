"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Question, SequenceData } from "@/types";

interface Props {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (correct: boolean) => void;
}

const COLORS = ["#FFB800", "#FF6B6B", "#4ECDC4", "#45B7D1", "#9B59B6", "#26D182"];

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

/** Soalan "urutan" — susun kad mengikut turutan yang betul. */
export function SequenceCard({ question, questionNumber, totalQuestions, onAnswer }: Props) {
  const steps = useMemo(
    () => (question.options as SequenceData)?.steps ?? [],
    [question.options]
  );

  // kocok SELEPAS mount (elak hydration mismatch)
  const [pool, setPool] = useState<string[]>(steps);
  useEffect(() => { setPool(shuffle(steps)); }, [steps]);

  const [placed, setPlaced] = useState<string[]>([]);
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");

  function tap(item: string) {
    if (state !== "idle" || placed.includes(item)) return;
    const next = [...placed, item];
    setPlaced(next);

    if (next.length === steps.length) {
      const ok = next.every((v, i) => v === steps[i]);
      if (ok) {
        setState("correct");
        setTimeout(() => onAnswer(true), 1300);
      } else {
        setState("wrong");
        setTimeout(() => { setPlaced([]); setState("idle"); }, 1200);
      }
    }
  }

  function undo() {
    if (state !== "idle") return;
    setPlaced((p) => p.slice(0, -1));
  }

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 60 }}
      animate={state === "wrong" ? { x: [0, -10, 10, -6, 6, 0] } : { opacity: 1, x: 0 }}
      transition={{ duration: state === "wrong" ? 0.4 : 0.3 }}
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
           className="border-4 border-black rounded-2xl bg-[#26D182] px-5 py-4 text-center">
        {question.story_text && <div className="text-4xl mb-1">{question.story_text}</div>}
        <p className="font-black text-lg text-white">{question.question_text}</p>
        <p className="text-xs font-bold text-white/80 mt-1">Tekan kad mengikut urutan yang betul</p>
      </div>

      {/* Slot urutan */}
      <div className="flex flex-col gap-2">
        {Array.from({ length: steps.length }).map((_, i) => {
          const val = placed[i];
          return (
            <div key={i} className="flex items-center gap-2">
              <span className="w-7 h-7 shrink-0 rounded-full bg-black text-white font-black text-xs flex items-center justify-center">
                {i + 1}
              </span>
              <div
                style={{
                  backgroundColor: val ? (state === "correct" ? "#26D182" : "#FFB800") : "#F3F3F3",
                  boxShadow: val ? "3px 3px 0px 0px rgba(0,0,0,1)" : "none",
                }}
                className="flex-1 border-3 border-black rounded-xl h-12 flex items-center justify-center font-black text-sm px-2 text-center"
              >
                {val ?? ""}
              </div>
            </div>
          );
        })}
      </div>

      {/* Kad pilihan */}
      <div className="flex flex-wrap justify-center gap-2.5">
        {pool.map((item, i) => {
          const used = placed.includes(item);
          return (
            <motion.button
              key={item}
              onClick={() => tap(item)}
              disabled={used || state !== "idle"}
              whileTap={{ scale: 0.92 }}
              style={{
                backgroundColor: used ? "#E5E5E5" : COLORS[i % COLORS.length],
                boxShadow: used ? "none" : "4px 4px 0px 0px rgba(0,0,0,1)",
                opacity: used ? 0.4 : 1,
              }}
              className="border-4 border-black rounded-2xl px-4 py-3 font-black text-sm text-white"
            >
              {item}
            </motion.button>
          );
        })}
      </div>

      {placed.length > 0 && state === "idle" && (
        <button onClick={undo}
                className="mx-auto border-3 border-black rounded-xl px-5 py-2 font-black text-sm bg-white hover:bg-gray-100">
          ⬅️ Padam Satu
        </button>
      )}

      {state !== "idle" && (
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          style={{ backgroundColor: state === "correct" ? "#26D182" : "#FF6B6B", boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
          className="border-4 border-black rounded-2xl px-5 py-4 text-center text-white"
        >
          <p className="font-black text-lg">
            {state === "correct" ? `🌟 ${question.success_message}` : "❌ Urutan belum betul — cuba lagi! 💪"}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
