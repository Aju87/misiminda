"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Question, QuestionOption } from "@/types";

interface QuizCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (correct: boolean, selected: QuestionOption) => void;
}

type AnswerState = "idle" | "correct" | "wrong";

export function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: QuizCardProps) {
  const [selected, setSelected] = useState<QuestionOption | null>(null);
  const [state, setState] = useState<AnswerState>("idle");

  function handleSelect(option: QuestionOption) {
    if (state !== "idle") return;

    const isCorrect = String(option) === String(question.correct_answer);
    setSelected(option);
    setState(isCorrect ? "correct" : "wrong");

    setTimeout(() => onAnswer(isCorrect, option), 1200);
  }

  function getOptionStyle(option: QuestionOption) {
    if (state === "idle") {
      return "bg-white border-black hover:bg-[#FFB800] hover:translate-x-[2px] hover:translate-y-[2px]";
    }
    const isThis = String(option) === String(selected);
    const isCorrectOpt = String(option) === String(question.correct_answer);

    if (isCorrectOpt) return "bg-[#4ECDC4] border-black translate-x-[4px] translate-y-[4px]";
    if (isThis && !isCorrectOpt) return "bg-[#FF6B6B] border-black translate-x-[4px] translate-y-[4px]";
    return "bg-white border-black opacity-40";
  }

  const optionColors = ["#FFB800", "#FF6B6B", "#4ECDC4", "#45B7D1"];

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 60 }}
      animate={
        state === "wrong"
          ? { opacity: 1, x: [0, -12, 12, -8, 8, -4, 4, 0] }
          : { opacity: 1, x: 0 }
      }
      transition={
        state === "wrong"
          ? { duration: 0.5, times: [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1] }
          : { duration: 0.3 }
      }
      className="flex flex-col gap-6 w-full max-w-xl mx-auto"
    >
      {/* Progress bar */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm font-black">
          <span>Soalan {questionNumber} / {totalQuestions}</span>
          <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
        </div>
        <div className="h-4 bg-white border-3 border-black rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
            className="h-full bg-[#FFB800] rounded-full"
          />
        </div>
      </div>

      {/* Story + question card */}
      <div
        style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
        className="border-4 border-black rounded-2xl bg-white overflow-hidden"
      >
        {/* Story */}
        <div className="bg-[#45B7D1] border-b-4 border-black px-5 py-4">
          <p className="text-xs font-black uppercase tracking-widest mb-1 opacity-70">Cerita</p>
          <p className="font-bold text-sm leading-relaxed">{question.story_text}</p>
        </div>

        {/* Question */}
        <div className="px-5 py-5">
          <p className="font-black text-xl leading-snug">{question.question_text}</p>
        </div>
      </div>

      {/* Options grid */}
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, i) => (
          <motion.button
            key={i}
            onClick={() => handleSelect(option)}
            disabled={state !== "idle"}
            whileHover={state === "idle" ? { scale: 1.02 } : {}}
            whileTap={state === "idle" ? { scale: 0.96 } : {}}
            style={{
              boxShadow:
                state === "idle"
                  ? "5px 5px 0px 0px rgba(0,0,0,1)"
                  : String(option) === String(question.correct_answer)
                  ? "2px 2px 0px 0px rgba(0,0,0,1)"
                  : String(option) === String(selected)
                  ? "2px 2px 0px 0px rgba(0,0,0,1)"
                  : "none",
              borderColor:
                state !== "idle" && String(option) === String(selected) && String(option) !== String(question.correct_answer)
                  ? "#FF6B6B"
                  : "#000",
            }}
            className={`
              border-4 rounded-2xl px-4 py-5 font-black text-lg text-center
              transition-all duration-100 cursor-pointer
              ${getOptionStyle(option)}
            `}
          >
            <span
              style={{ backgroundColor: optionColors[i] }}
              className="inline-block w-7 h-7 border-2 border-black rounded-lg text-xs font-black mr-2 align-middle leading-6"
            >
              {["A", "B", "C", "D"][i]}
            </span>
            {String(option)}
          </motion.button>
        ))}
      </div>

      {/* Feedback banner */}
      <AnimatePresence>
        {state !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              backgroundColor: state === "correct" ? "#4ECDC4" : "#FF6B6B",
              boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
            }}
            className="border-4 border-black rounded-2xl px-5 py-4 text-center"
          >
            <p className="font-black text-xl">
              {state === "correct" ? `🌟 ${question.success_message}` : "❌ Cuba lagi! Jawapan betul ialah: " + String(question.correct_answer)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
