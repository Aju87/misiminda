"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";

interface NavbarProps {
  userName?: string;
  onSignOut?: () => void;
}

export function Navbar({ userName, onSignOut }: NavbarProps) {
  const pathname = usePathname();
  const isPlayPage = pathname?.startsWith("/play");

  if (isPlayPage) return null;

  return (
    <nav className="border-b-4 border-black bg-[#FFB800] sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <span className="font-black text-xl uppercase tracking-tight">
            MisiMinda
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {userName ? (
            <>
              <span className="font-bold text-sm hidden sm:block">
                Hai, {userName}!
              </span>
              <Button variant="secondary" size="sm" onClick={onSignOut}>
                Keluar
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth">
                <Button variant="secondary" size="sm">
                  Log Masuk
                </Button>
              </Link>
              <Link href="/auth?tab=signup">
                <Button variant="danger" size="sm">
                  Daftar
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
