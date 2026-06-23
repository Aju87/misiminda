"use client";

import { motion } from "framer-motion";
import { AVATARS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface AvatarDisplayProps {
  avatarId: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: "w-10 h-10 text-xl",
  md: "w-14 h-14 text-3xl",
  lg: "w-20 h-20 text-4xl",
  xl: "w-28 h-28 text-5xl",
};

export function AvatarDisplay({ avatarId, size = "md", className }: AvatarDisplayProps) {
  const avatar = AVATARS.find((a) => a.id === avatarId) ?? AVATARS[0];

  return (
    <div
      style={{ backgroundColor: avatar.color }}
      className={cn(
        "border-4 border-black rounded-2xl flex items-center justify-center",
        sizes[size],
        className
      )}
    >
      {avatar.emoji}
    </div>
  );
}

interface AvatarPickerProps {
  selected: string;
  onSelect: (id: string) => void;
}

export function AvatarPicker({ selected, onSelect }: AvatarPickerProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {AVATARS.map((avatar) => (
        <motion.button
          key={avatar.id}
          type="button"
          onClick={() => onSelect(avatar.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            backgroundColor: avatar.color,
            boxShadow:
              selected === avatar.id
                ? "4px 4px 0px 0px rgba(0,0,0,1)"
                : "6px 6px 0px 0px rgba(0,0,0,1)",
            transform: selected === avatar.id ? "translate(2px, 2px)" : undefined,
          }}
          className={cn(
            "w-full aspect-square text-3xl border-4 border-black rounded-2xl",
            "flex items-center justify-center transition-all duration-100",
            selected === avatar.id && "ring-4 ring-black ring-offset-2"
          )}
        >
          {avatar.emoji}
        </motion.button>
      ))}
    </div>
  );
}
