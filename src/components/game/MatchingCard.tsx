"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { MatchPair, Question } from "@/types";

interface MatchingCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (correct: boolean) => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function MatchingCard({ question, questionNumber, totalQuestions, onAnswer }: MatchingCardProps) {
  const pairs = useMemo<MatchPair[]>(() => {
    const opts = question.options as { pairs?: MatchPair[] };
    return opts?.pairs ?? [];
  }, [question.options]);

  // sisi kiri ikut urutan asal; sisi kanan dikocok SELEPAS mount
  // (elak hydration mismatch — SSR & first render guna urutan asal)
  const leftItems = useMemo(() => pairs.map((p) => p.left), [pairs]);
  const [rightItems, setRightItems] = useState<string[]>(() => pairs.map((p) => p.right));
  useEffect(() => {
    setRightItems(shuffle(pairs.map((p) => p.right)));
  }, [pairs]);
  const correctFor = useMemo(() => {
    const m: Record<string, string> = {};
    pairs.forEach((p) => (m[p.left] = p.right));
    return m;
  }, [pairs]);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rightRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  // hanya pasangan BETUL yang dikunci: leftIdx -> rightIdx
  const [connections, setConnections] = useState<Record<number, number>>({});
  const [wrongFlash, setWrongFlash] = useState<{ left: number; right: number } | null>(null);
  const [done, setDone] = useState(false);

  const [greenLines, setGreenLines] = useState<Line[]>([]);
  const [redLine, setRedLine] = useState<Line | null>(null);

  const usedRights = Object.values(connections);
  const allMatched = Object.keys(connections).length === pairs.length && pairs.length > 0;

  // Kira koordinat garisan selepas setiap perubahan
  useLayoutEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const crect = c.getBoundingClientRect();

    function edge(el: HTMLElement | null, side: "right" | "left") {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: (side === "right" ? r.right : r.left) - crect.left,
        y: r.top + r.height / 2 - crect.top,
      };
    }

    const gl: Line[] = [];
    for (const [l, rIdx] of Object.entries(connections)) {
      const a = edge(leftRefs.current[+l], "right");
      const b = edge(rightRefs.current[rIdx], "left");
      if (a && b) gl.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
    }
    setGreenLines(gl);

    if (wrongFlash) {
      const a = edge(leftRefs.current[wrongFlash.left], "right");
      const b = edge(rightRefs.current[wrongFlash.right], "left");
      setRedLine(a && b ? { x1: a.x, y1: a.y, x2: b.x, y2: b.y } : null);
    } else {
      setRedLine(null);
    }
  }, [connections, wrongFlash]);

  function tapLeft(i: number) {
    if (done) return;
    if (i in connections) return; // sudah dikunci
    setSelectedLeft(i);
  }

  function tapRight(j: number) {
    if (done || selectedLeft === null) return;
    if (usedRights.includes(j)) return; // kanan sudah dipakai

    const isCorrect = correctFor[leftItems[selectedLeft]] === rightItems[j];
    if (isCorrect) {
      const next = { ...connections, [selectedLeft]: j };
      setConnections(next);
      setSelectedLeft(null);
      if (Object.keys(next).length === pairs.length) {
        setDone(true);
        setTimeout(() => onAnswer(true), 1200);
      }
    } else {
      setWrongFlash({ left: selectedLeft, right: j });
      setSelectedLeft(null);
      setTimeout(() => setWrongFlash(null), 700);
    }
  }

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-6 w-full max-w-xl mx-auto"
    >
      {/* Progress */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm font-black">
          <span>Soalan {questionNumber} / {totalQuestions}</span>
          <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
        </div>
        <div className="h-4 bg-white border-3 border-black rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FFB800] rounded-full transition-all"
            style={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Arahan */}
      <div
        style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
        className="border-4 border-black rounded-3xl bg-[#9B59B6] px-6 py-4 text-center"
      >
        <p className="font-black text-lg text-white">{question.question_text}</p>
        <p className="text-xs font-bold text-white/80 mt-1">
          Tekan sebelah kiri, kemudian tekan pasangannya di sebelah kanan.
        </p>
      </div>

      {/* Papan padanan */}
      <div ref={containerRef} className="relative grid grid-cols-2 gap-x-16 gap-y-4">
        {/* Garisan SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {greenLines.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#26D182" strokeWidth={5} strokeLinecap="round" />
          ))}
          {redLine && (
            <line x1={redLine.x1} y1={redLine.y1} x2={redLine.x2} y2={redLine.y2} stroke="#FF6B6B" strokeWidth={5} strokeLinecap="round" strokeDasharray="6 6" />
          )}
        </svg>

        {/* Kiri */}
        <div className="flex flex-col gap-4">
          {leftItems.map((item, i) => {
            const locked = i in connections;
            const active = selectedLeft === i;
            return (
              <button
                key={i}
                ref={(el) => { leftRefs.current[i] = el; }}
                onClick={() => tapLeft(i)}
                disabled={locked}
                style={{
                  backgroundColor: locked ? "#26D182" : active ? "#FFB800" : "#fff",
                  boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
                }}
                className="border-4 border-black rounded-2xl h-16 flex items-center justify-center font-black text-3xl cursor-pointer disabled:cursor-default"
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Kanan */}
        <div className="flex flex-col gap-4">
          {rightItems.map((item, j) => {
            const used = usedRights.includes(j);
            return (
              <button
                key={j}
                ref={(el) => { rightRefs.current[j] = el; }}
                onClick={() => tapRight(j)}
                disabled={used}
                style={{
                  backgroundColor: used ? "#26D182" : "#fff",
                  boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
                }}
                className="border-4 border-black rounded-2xl h-16 flex items-center justify-center font-black text-2xl uppercase cursor-pointer disabled:cursor-default"
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      {done && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
          className="border-4 border-black rounded-2xl px-5 py-4 text-center bg-[#26D182] text-white"
        >
          <p className="font-black text-xl">🌟 {question.success_message}</p>
        </motion.div>
      )}
      {!done && allMatched && null}
    </motion.div>
  );
}
