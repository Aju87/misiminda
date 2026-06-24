"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import type { Level, Kid } from "@/types";

interface ResultScreenProps {
  kid: Kid;
  level: Level;
  correct: number;
  total: number;
  starsEarned: number;
  nextLevel?: Level;
  onPlayAgain: () => void;
  onNextLevel?: () => void;
  onBackToMap: () => void;
}

function Confetti() {
  const colors = ["#FFB800", "#FF6B6B", "#4ECDC4", "#45B7D1", "#F9A826"];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: -20,
            x: Math.random() * window.innerWidth,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: window.innerHeight + 20,
            rotate: Math.random() * 720 - 360,
            opacity: 0,
          }}
          transition={{
            duration: Math.random() * 2 + 1.5,
            delay: Math.random() * 0.8,
            ease: "easeIn",
          }}
          style={{
            position: "absolute",
            width: Math.random() * 12 + 8,
            height: Math.random() * 12 + 8,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            border: "2px solid #000",
          }}
        />
      ))}
    </div>
  );
}

export function ResultScreen({
  kid,
  level,
  correct,
  total,
  starsEarned,
  nextLevel,
  onPlayAgain,
  onNextLevel,
  onBackToMap,
}: ResultScreenProps) {
  const isPerfect = correct === total;
  const percentage = Math.round((correct / total) * 100);
  const confettiShown = useRef(false);

  useEffect(() => {
    confettiShown.current = true;
  }, []);

  return (
    <>
      {isPerfect && <Confetti />}

      <div className="min-h-screen bg-[#FFFDF2] flex items-center justify-center px-4">
        <div className="w-full max-w-md flex flex-col gap-6">
          {/* Main result card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
            className={`border-4 border-black rounded-2xl p-8 text-center ${
              isPerfect ? "bg-[#FFB800]" : percentage >= 70 ? "bg-[#4ECDC4]" : "bg-white"
            }`}
          >
            {/* Emoji result */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.4, 1] }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-8xl mb-4"
            >
              {isPerfect ? "🏆" : percentage >= 70 ? "🌟" : "💪"}
            </motion.div>

            <h1 className="font-black text-3xl uppercase mb-1">
              {isPerfect ? "Sempurna!" : percentage >= 70 ? "Hebat!" : "Cuba Lagi!"}
            </h1>
            <p className="font-semibold text-gray-700 mb-6">{level.theme}</p>

            {/* Score */}
            <div
              style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
              className="border-4 border-black rounded-xl bg-white px-6 py-4 mb-6"
            >
              <p className="font-black text-5xl">{correct}/{total}</p>
              <p className="font-bold text-gray-600 text-sm mt-1">Jawapan Betul</p>
            </div>

            {/* Stars earned */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2">
                {Array.from({ length: starsEarned }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5 + i * 0.15, type: "spring" }}
                    className="text-4xl"
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="font-black text-lg"
              >
                +{starsEarned} Bintang untuk {kid.name}!
              </motion.p>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-3"
          >
            {percentage >= 70 && nextLevel && onNextLevel && (
              <Button fullWidth size="lg" variant="mint" onClick={onNextLevel}>
                Level {nextLevel.level_number} Seterusnya ➡️
              </Button>
            )}
            {percentage < 70 && (
              <Button fullWidth size="lg" variant="primary" onClick={onPlayAgain}>
                Cuba Semula 🔄
              </Button>
            )}
            <Button fullWidth size="lg" variant="secondary" onClick={onBackToMap}>
              Kembali ke Peta Misi 🗺️
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
