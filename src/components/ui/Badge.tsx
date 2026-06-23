import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeVariant = "yellow" | "red" | "mint" | "blue" | "orange" | "black";

const variants: Record<BadgeVariant, string> = {
  yellow: "bg-[#FFB800] text-black",
  red: "bg-[#FF6B6B] text-black",
  mint: "bg-[#4ECDC4] text-black",
  blue: "bg-[#45B7D1] text-black",
  orange: "bg-[#F9A826] text-black",
  black: "bg-black text-white",
};

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = "yellow", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block border-2 border-black rounded-lg px-2.5 py-0.5",
        "font-black text-xs uppercase tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
