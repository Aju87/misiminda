"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AvatarDisplay } from "@/components/ui/Avatar";
import { StarCounter } from "@/components/ui";
import { AGE_GROUPS } from "@/lib/constants";
import type { Kid } from "@/types";

interface KidSelectorProps {
  kids: Kid[];
  onSelect: (kid: Kid) => void;
}

export function KidSelector({ kids, onSelect }: KidSelectorProps) {
  return (
    <div className="min-h-screen bg-[#FFFDF2] flex flex-col items-center justify-center px-4 py-12">
      <Link
        href="/dashboard"
        className="fixed top-4 left-4 border-3 border-black rounded-xl px-4 py-2 font-black text-sm bg-white hover:bg-gray-100 transition-colors z-10"
        style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
      >
        ← Dashboard
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="text-6xl mb-4">🧠</div>
        <h1 className="text-4xl font-black uppercase">Siapa yang nak main?</h1>
        <p className="font-semibold text-gray-600 mt-2">Pilih profil kamu!</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl w-full">
        {kids.map((kid, i) => {
          const ageLabel = AGE_GROUPS.find((g) => g.value === kid.age_group);
          return (
            <motion.button
              key={kid.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(kid)}
              style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
              className="border-4 border-black rounded-2xl bg-white p-5 flex flex-col items-center gap-3 cursor-pointer"
            >
              <AvatarDisplay avatarId={kid.avatar_url} size="xl" />
              <div className="text-center">
                <p className="font-black text-lg">{kid.name}</p>
                <p className="text-xs font-bold text-gray-500">{ageLabel?.label}</p>
              </div>
              <StarCounter stars={kid.total_stars} size="sm" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
