"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CardColor = "white" | "yellow" | "red" | "mint" | "blue" | "orange";

const colorStyles: Record<CardColor, string> = {
  white: "bg-white",
  yellow: "bg-[#FFB800]",
  red: "bg-[#FF6B6B]",
  mint: "bg-[#4ECDC4]",
  blue: "bg-[#45B7D1]",
  orange: "bg-[#F9A826]",
};

interface CardProps {
  children: ReactNode;
  color?: CardColor;
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Card({
  children,
  color = "white",
  hoverable = false,
  className,
  onClick,
}: CardProps) {
  const base = cn(
    "border-4 border-black rounded-2xl p-5",
    colorStyles[color],
    onClick && "cursor-pointer",
    className
  );

  if (hoverable || onClick) {
    return (
      <motion.div
        onClick={onClick}
        whileHover={{ x: 2, y: 2 }}
        whileTap={{ x: 6, y: 6 }}
        transition={{ duration: 0.08 }}
        style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
        className={base}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
      className={base}
    >
      {children}
    </div>
  );
}
