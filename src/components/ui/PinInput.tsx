"use client";

import { useRef, useState, KeyboardEvent, ClipboardEvent } from "react";
import { cn } from "@/lib/utils";

interface PinInputProps {
  length?: number;
  onComplete: (pin: string) => void;
  error?: string;
  disabled?: boolean;
}

export function PinInput({
  length = 4,
  onComplete,
  error,
  disabled = false,
}: PinInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(index: number, val: string) {
    if (!/^\d*$/.test(val)) return;
    const next = [...values];
    next[index] = val.slice(-1);
    setValues(next);

    if (val && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    const pin = next.join("");
    if (pin.length === length) onComplete(pin);
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const next = Array(length).fill("");
    pasted.split("").forEach((ch, i) => (next[i] = ch));
    setValues(next);
    inputs.current[Math.min(pasted.length, length - 1)]?.focus();
    if (pasted.length === length) onComplete(pasted);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-3">
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => { inputs.current[i] = el; }}
            type="password"
            inputMode="numeric"
            maxLength={1}
            value={values[i]}
            disabled={disabled}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className={cn(
              "w-14 h-14 text-center text-2xl font-black border-4 border-black rounded-xl",
              "outline-none transition-shadow duration-100",
              "focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:bg-[#FFB800]",
              "bg-white",
              error && "border-[#FF6B6B] bg-[#FFE8E8]",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          />
        ))}
      </div>
      {error && <p className="text-[#FF6B6B] font-bold text-sm">{error}</p>}
    </div>
  );
}
