import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}

export function PageWrapper({ children, className, narrow = false }: PageWrapperProps) {
  return (
    <main
      className={cn(
        "min-h-screen bg-[#FFFDF2] px-4 py-8",
        narrow ? "max-w-lg mx-auto" : "max-w-5xl mx-auto",
        className
      )}
    >
      {children}
    </main>
  );
}
