"use client";

import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, className, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="font-black uppercase text-sm tracking-wide">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "border-3 border-black rounded-xl px-4 py-3 font-semibold text-black bg-white",
          "outline-none transition-shadow duration-100",
          "focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          "placeholder:text-gray-400",
          error && "border-[#FF6B6B] bg-[#FFE8E8]",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-[#FF6B6B] font-bold text-sm">{error}</p>
      )}
      {hint && !error && (
        <p className="text-gray-500 text-sm font-medium">{hint}</p>
      )}
    </div>
  );
}
