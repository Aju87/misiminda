"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Question, QuestionOption } from "@/types";

interface PreschoolCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (correct: boolean) => void;
}

const TILE_COLORS = ["#FFB800", "#FF6B6B", "#4ECDC4", "#45B7D1", "#9B59B6", "#26D182"];

export function PreschoolCard(props: PreschoolCardProps) {
  const isSusun = props.question.question_type === "susun";
  return isSusun ? <SusunGame {...props} /> : <PilihanGame {...props} />;
}

/* ============ Header (dikongsi) ============ */
function CardHeader({ number, total }: { number: number; total: number }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-sm font-black">
        <span>Soalan {number} / {total}</span>
        <span>{Math.round((number / total) * 100)}%</span>
      </div>
      <div className="h-4 bg-white border-3 border-black rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((number - 1) / total) * 100}%` }}
          className="h-full bg-[#FFB800] rounded-full"
        />
      </div>
    </div>
  );
}

/* ============ PILIHAN — tekan jawapan betul ============ */
function PilihanGame({ question, questionNumber, totalQuestions, onAnswer }: PreschoolCardProps) {
  const options = question.options as QuestionOption[];
  const [selected, setSelected] = useState<QuestionOption | null>(null);
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");

  function handleSelect(opt: QuestionOption) {
    if (state !== "idle") return;
    const correct = String(opt) === String(question.correct_answer);
    setSelected(opt);
    setState(correct ? "correct" : "wrong");
    setTimeout(() => onAnswer(correct), 1300);
  }

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-6 w-full max-w-xl mx-auto"
    >
      <CardHeader number={questionNumber} total={totalQuestions} />

      {/* Cue besar */}
      <div
        style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
        className="border-4 border-black rounded-3xl bg-white px-6 py-8 text-center"
      >
        {question.story_text && (
          <div className="text-6xl mb-3 leading-none">{question.story_text}</div>
        )}
        <p className="font-black text-2xl leading-snug">{question.question_text}</p>
      </div>

      {/* Pilihan huruf/perkataan — butang besar */}
      <div className={`grid ${options.length > 4 ? "grid-cols-3" : "grid-cols-2"} gap-4`}>
        {options.map((opt, i) => {
          const isThis = String(opt) === String(selected);
          const isCorrectOpt = String(opt) === String(question.correct_answer);
          let bg = TILE_COLORS[i % TILE_COLORS.length];
          if (state !== "idle") {
            if (isCorrectOpt) bg = "#26D182";
            else if (isThis) bg = "#FF6B6B";
            else bg = "#E5E5E5";
          }
          return (
            <motion.button
              key={i}
              onClick={() => handleSelect(opt)}
              disabled={state !== "idle"}
              whileTap={state === "idle" ? { scale: 0.92 } : {}}
              style={{ backgroundColor: bg, boxShadow: "5px 5px 0px 0px rgba(0,0,0,1)" }}
              className="border-4 border-black rounded-3xl py-8 font-black text-4xl uppercase text-white cursor-pointer disabled:cursor-default"
            >
              {String(opt)}
            </motion.button>
          );
        })}
      </div>

      <Feedback state={state} message={question.success_message} correct={String(question.correct_answer)} />
    </motion.div>
  );
}

/* ============ SUSUN — susun huruf jadi perkataan ============ */
function SusunGame({ question, questionNumber, totalQuestions, onAnswer }: PreschoolCardProps) {
  const target = String(question.correct_answer);
  const letters = useMemo(
    () => (question.options as QuestionOption[]).map((o, i) => ({ id: i, char: String(o) })),
    [question.options]
  );

  // urutan tile yang telah dipilih (id tile)
  const [placed, setPlaced] = useState<number[]>([]);
  const [state, setState] = useState<"idle" | "correct" | "wrong">("idle");

  const placedWord = placed.map((id) => letters[id].char).join("");

  function tapTile(id: number) {
    if (state !== "idle") return;
    if (placed.includes(id)) return;
    if (placed.length >= target.length) return;
    const next = [...placed, id];
    setPlaced(next);

    if (next.length === target.length) {
      const word = next.map((tid) => letters[tid].char).join("");
      if (word === target) {
        setState("correct");
        setTimeout(() => onAnswer(true), 1300);
      } else {
        setState("wrong");
        // kosongkan semula selepas seketika — biar anak cuba lagi
        setTimeout(() => {
          setPlaced([]);
          setState("idle");
        }, 1100);
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
      transition={state === "wrong" ? { duration: 0.4 } : { duration: 0.3 }}
      className="flex flex-col gap-6 w-full max-w-xl mx-auto"
    >
      <CardHeader number={questionNumber} total={totalQuestions} />

      {/* Gambar + slot ejaan */}
      <div
        style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
        className="border-4 border-black rounded-3xl bg-white px-6 py-6 text-center"
      >
        <div className="text-6xl mb-2 leading-none">{question.story_text}</div>
        <p className="font-black text-lg mb-4">{question.question_text}</p>

        <div className="flex justify-center gap-2 flex-wrap">
          {Array.from({ length: target.length }).map((_, i) => {
            const filledId = placed[i];
            const char = filledId != null ? letters[filledId].char : "";
            const isCorrect = state === "correct";
            return (
              <div
                key={i}
                style={{ backgroundColor: char ? (isCorrect ? "#26D182" : "#FFB800") : "#F5F5F5" }}
                className="w-12 h-14 border-3 border-black rounded-xl flex items-center justify-center font-black text-2xl text-white"
              >
                {char}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tile huruf */}
      <div className="flex justify-center gap-3 flex-wrap">
        {letters.map((tile, i) => {
          const used = placed.includes(tile.id);
          return (
            <motion.button
              key={tile.id}
              onClick={() => tapTile(tile.id)}
              disabled={used || state !== "idle"}
              whileTap={{ scale: 0.9 }}
              style={{
                backgroundColor: used ? "#E5E5E5" : TILE_COLORS[i % TILE_COLORS.length],
                boxShadow: used ? "none" : "4px 4px 0px 0px rgba(0,0,0,1)",
                opacity: used ? 0.4 : 1,
              }}
              className="w-16 h-16 border-4 border-black rounded-2xl font-black text-3xl uppercase text-white cursor-pointer disabled:cursor-default"
            >
              {tile.char}
            </motion.button>
          );
        })}
      </div>

      {/* Butang padam */}
      {placed.length > 0 && state === "idle" && (
        <button
          onClick={undo}
          className="mx-auto border-3 border-black rounded-xl px-5 py-2 font-black text-sm bg-white hover:bg-gray-100"
        >
          ⬅️ Padam Satu
        </button>
      )}

      <Feedback state={state} message={question.success_message} word={placedWord} />
    </motion.div>
  );
}

/* ============ Feedback banner ============ */
function Feedback({
  state,
  message,
  correct,
  word,
}: {
  state: "idle" | "correct" | "wrong";
  message: string;
  correct?: string;
  word?: string;
}) {
  return (
    <AnimatePresence>
      {state !== "idle" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            backgroundColor: state === "correct" ? "#26D182" : "#FF6B6B",
            boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
          }}
          className="border-4 border-black rounded-2xl px-5 py-4 text-center text-white"
        >
          <p className="font-black text-xl">
            {state === "correct"
              ? `🌟 ${message}`
              : correct
              ? `❌ Cuba lagi! Betulnya: ${correct}`
              : "❌ Belum betul, cuba lagi ya! 💪"}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
