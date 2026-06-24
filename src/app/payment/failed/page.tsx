"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button, Card } from "@/components/ui";

function FailedContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  return (
    <div className="min-h-screen bg-[#FFFDF2] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card color="red" className="flex flex-col items-center gap-6 py-12 text-center">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: [-10, 10, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
            className="text-7xl"
          >
            😢
          </motion.div>
          <div>
            <h1 className="font-black text-3xl uppercase">Pembayaran Gagal</h1>
            <p className="font-semibold mt-2">
              Pembayaran tidak berjaya. Tiada caj dibuat ke kad/akaun anda.
            </p>
            {ref && <p className="text-xs text-gray-600 mt-1 font-mono">Ref: {ref}</p>}
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Link href="/pricing">
              <Button fullWidth size="lg">Cuba Semula 🔄</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" fullWidth>Kembali ke Dashboard</Button>
            </Link>
          </div>
          <p className="text-xs font-semibold text-gray-600">
            Ada masalah? Hubungi kami di{" "}
            <a href="mailto:support@misiminda.com" className="underline font-bold">
              support@misiminda.com
            </a>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FFFDF2] flex items-center justify-center">
        <div className="text-2xl font-black animate-pulse">Memuatkan...</div>
      </div>
    }>
      <FailedContent />
    </Suspense>
  );
}
