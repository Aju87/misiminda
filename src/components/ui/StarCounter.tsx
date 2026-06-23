"use client";

import { motion } from "framer-motion";

interface StarCounterProps {
  stars: number;
  required?: number;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { text: "text-sm", star: "text-base", gap: "gap-1" },
  md: { text: "text-base", star: "text-xl", gap: "gap-1.5" },
  lg: { text: "text-xl", star: "text-2xl", gap: "gap-2" },
};

export function StarCounter({ stars, required, size = "md" }: StarCounterProps) {
  const s = sizes[size];
  const progress = required ? Math.min((stars / required) * 100, 100) : null;

  return (
    <div className="flex flex-col gap-2">
      <div className={`flex items-center ${s.gap}`}>
        <motion.span
          key={stars}
          initial={{ scale: 1.4 }}
          animate={{ scale: 1 }}
          className={s.star}
        >
          ⭐
        </motion.span>
        <span className={`font-black ${s.text}`}>
          {stars.toLocaleString()}
          {required && (
            <span className="text-gray-500 font-bold"> / {required}</span>
          )}
        </span>
      </div>

      {progress !== null && (
        <div className="h-3 bg-white border-2 border-black rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full bg-[#FFB800] rounded-full"
          />
        </div>
      )}
    </div>
  );
}
