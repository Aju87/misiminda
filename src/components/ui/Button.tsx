"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost" | "mint" | "blue";
type Size = "sm" | "md" | "lg" | "xl";

const variantStyles: Record<Variant, string> = {
  primary: "bg-[#FFB800] text-black",
  secondary: "bg-white text-black",
  danger: "bg-[#FF6B6B] text-black",
  ghost: "bg-transparent text-black border-dashed",
  mint: "bg-[#4ECDC4] text-black",
  blue: "bg-[#45B7D1] text-black",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
  xl: "px-8 py-4 text-xl",
};

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  className,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={disabled || loading ? {} : { x: 2, y: 2 }}
      whileTap={disabled || loading ? {} : { x: 6, y: 6 }}
      transition={{ duration: 0.08 }}
      style={{
        boxShadow:
          disabled || loading ? "none" : "6px 6px 0px 0px rgba(0,0,0,1)",
      }}
      className={cn(
        "border-4 border-black rounded-xl font-black uppercase tracking-wide cursor-pointer",
        "transition-shadow duration-75",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        (disabled || loading) && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="inline-block w-4 h-4 border-3 border-black border-t-transparent rounded-full animate-spin" />
          Tunggu...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
