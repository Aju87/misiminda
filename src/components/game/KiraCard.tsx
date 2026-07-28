"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Question, ColumnData } from "@/types";

interface Props {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (correct: boolean) => void;
}

/**
 * Soalan "kira" — pengiraan menegak.
 * Nombor disusun mengikut nilai tempat, anak isi jawapan digit demi digit
 * (mula dari sa/kanan — cara mengira sebenar). Gaya neubrutalist MisiMinda.
 */
export function KiraCard({ question, questionNumber, totalQuestions, onAnswer }: Props) {
  const data = question.options as ColumnData;
  const operands = data?.operands ?? [];
  const operator = data?.operator ?? "+";
  const answer = String(question.correct_answer);
  const n = answer.length;

  // lebar kolum = digit terpanjang antara operand & jawapan
  const width = Math.max(n, ...operands.map((o) => o.length));

  // slot jawapan (null = kosong), diisi dari KANAN
  const [slots, setSlots] = useState<(string | null)[]>(Array(n).fill(null));
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");

  const filledCount = slots.filter((s) => s !== null).length;
  const activePos = state === "idle" && filledCount < n ? n - 1 - filledCount : -1;

  function tapDigit(d: string) {
    if (state !== "idle" || filledCount >= n) return;
    const pos = n - 1 - filledCount;
    const next = [...slots];
    next[pos] = d;
    setSlots(next);
  }

  function backspace() {
    if (state !== "idle" || filledCount === 0) return;
    const pos = n - filledCount; // slot terakhir diisi
    const next = [...slots];
    next[pos] = null;
    setSlots(next);
  }

  function clearAll() {
    if (state !== "idle") return;
    setSlots(Array(n).fill(null));
  }

  function submit() {
    if (state !== "idle" || filledCount < n) return;
    const got = slots.join("");
    if (got === answer) {
      setState("correct");
      setTimeout(() => onAnswer(true), 1300);
    } else {
      setState("wrong");
      setTimeout(() => onAnswer(false), 1600);
    }
  }

  // sel digit sejajar kanan
  function DigitRow({ value, extra }: { value: string; extra?: React.ReactNode }) {
    const pad = width - value.length;
    return (
      <div className="flex items-center justify-end gap-1">
        {extra}
        {Array.from({ length: width }).map((_, i) => {
          const idx = i - pad;
          const ch = idx >= 0 ? value[idx] : "";
          return (
            <div key={i} className="w-11 text-center font-black text-4xl text-[#1a2b4a]">
              {ch}
            </div>
          );
        })}
      </div>
    );
  }

  const padColors = ["#FFB800", "#FF6B6B", "#4ECDC4", "#45B7D1"];

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 60 }}
      animate={state === "wrong" ? { x: [0, -12, 12, -8, 8, -4, 4, 0] } : { opacity: 1, x: 0 }}
      transition={{ duration: state === "wrong" ? 0.5 : 0.3 }}
      className="flex flex-col gap-5 w-full max-w-md mx-auto"
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

      {/* Papan kira */}
      <div
        style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
        className="border-4 border-black rounded-2xl bg-[#FFF8E1] px-5 py-6"
      >
        {question.question_text && (
          <p className="font-black text-center text-sm uppercase mb-3 text-gray-600">
            {question.question_text}
          </p>
        )}

        {/* operand pertama */}
        <DigitRow value={operands[0] ?? ""} extra={<div className="w-8" />} />

        {/* operand seterusnya (operator di kiri baris terakhir) */}
        {operands.slice(1).map((op, i) => (
          <DigitRow
            key={i}
            value={op}
            extra={
              <div className="w-8 text-center font-black text-4xl text-[#1a2b4a]">
                {i === operands.length - 2 ? operator : ""}
              </div>
            }
          />
        ))}

        {/* garisan */}
        <div className="border-t-4 border-black my-3" />

        {/* slot jawapan */}
        <div className="flex items-center justify-end gap-1">
          <div className="w-8" />
          {Array.from({ length: width }).map((_, i) => {
            const pad = width - n;
            const idx = i - pad;
            if (idx < 0) return <div key={i} className="w-11" />;
            const ch = slots[idx];
            const isActive = idx === activePos;
            const bg = state === "correct" ? "#26D182" : isActive ? "#B6F5D8" : "#fff";
            return (
              <div
                key={i}
                style={{ backgroundColor: bg, borderColor: isActive ? "#0f7a5c" : "#9ca3af" }}
                className="w-11 h-14 border-3 rounded-xl flex items-center justify-center font-black text-3xl text-[#1a2b4a]"
              >
                {ch ?? ""}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pad nombor */}
      <div className="grid grid-cols-3 gap-2.5">
        {["1","2","3","4","5","6","7","8","9"].map((d, i) => (
          <motion.button
            key={d}
            onClick={() => tapDigit(d)}
            disabled={state !== "idle"}
            whileTap={{ scale: 0.92 }}
            style={{ backgroundColor: padColors[i % padColors.length], boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)" }}
            className="border-3 border-black rounded-xl py-4 font-black text-2xl text-white"
          >
            {d}
          </motion.button>
        ))}
        {/* baris akhir: C, 0, backspace */}
        <motion.button
          onClick={clearAll} disabled={state !== "idle"} whileTap={{ scale: 0.92 }}
          style={{ backgroundColor: "#FF6B6B", boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)" }}
          className="border-3 border-black rounded-xl py-4 font-black text-xl text-white"
        >
          C
        </motion.button>
        <motion.button
          onClick={() => tapDigit("0")} disabled={state !== "idle"} whileTap={{ scale: 0.92 }}
          style={{ backgroundColor: "#45B7D1", boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)" }}
          className="border-3 border-black rounded-xl py-4 font-black text-2xl text-white"
        >
          0
        </motion.button>
        <motion.button
          onClick={backspace} disabled={state !== "idle"} whileTap={{ scale: 0.92 }}
          style={{ backgroundColor: "#F9A826", boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)" }}
          className="border-3 border-black rounded-xl py-4 font-black text-2xl text-white"
        >
          ←
        </motion.button>
      </div>

      {/* Hantar / maklum balas */}
      {state === "idle" ? (
        <button
          onClick={submit}
          disabled={filledCount < n}
          style={{ boxShadow: filledCount < n ? "none" : "4px 4px 0px 0px rgba(0,0,0,1)" }}
          className={`border-4 border-black rounded-2xl py-4 font-black text-lg uppercase transition-colors ${
            filledCount < n ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-[#26D182] text-white"
          }`}
        >
          Hantar Jawapan →
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          style={{ backgroundColor: state === "correct" ? "#26D182" : "#FF6B6B", boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
          className="border-4 border-black rounded-2xl px-5 py-4 text-center text-white"
        >
          <p className="font-black text-lg">
            {state === "correct" ? `🌟 ${question.success_message}` : `❌ Cuba lagi! Jawapan: ${answer}`}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
