"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Button, Card } from "@/components/ui";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ref = searchParams.get("ref");
  const [checking, setChecking] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    // Poll for subscription activation (webhook may take a few seconds)
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { clearInterval(interval); router.push("/auth"); return; }

      const { data: parent } = await supabase
        .from("parents")
        .select("subscription_status")
        .eq("id", user.id)
        .single();

      if (parent?.subscription_status === "active") {
        setConfirmed(true);
        setChecking(false);
        clearInterval(interval);
      } else if (attempts >= 10) {
        // After 10 attempts (~10s), assume webhook is delayed but payment went through
        setChecking(false);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF2] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card color={confirmed ? "mint" : "yellow"} className="flex flex-col items-center gap-6 py-12 text-center">
          {checking ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="text-5xl"
              >
                ⏳
              </motion.div>
              <div>
                <h1 className="font-black text-2xl uppercase">Mengesahkan Pembayaran...</h1>
                <p className="font-semibold text-sm mt-2">Sila tunggu sebentar.</p>
              </div>
            </>
          ) : confirmed ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ duration: 0.5 }}
                className="text-7xl"
              >
                🎉
              </motion.div>
              <div>
                <h1 className="font-black text-3xl uppercase">Pembayaran Berjaya!</h1>
                <p className="font-semibold mt-2">
                  Langganan MisiMinda anda kini aktif. Selamat belajar!
                </p>
                {ref && <p className="text-xs text-gray-600 mt-1 font-mono">Ref: {ref}</p>}
              </div>
              <Link href="/dashboard">
                <Button size="lg">Pergi Dashboard 🚀</Button>
              </Link>
            </>
          ) : (
            <>
              <span className="text-6xl">✅</span>
              <div>
                <h1 className="font-black text-2xl uppercase">Pembayaran Diterima!</h1>
                <p className="font-semibold mt-2 text-sm">
                  Langganan anda sedang diproses. Ia akan aktif dalam beberapa minit.
                </p>
                {ref && <p className="text-xs text-gray-600 mt-1 font-mono">Ref: {ref}</p>}
              </div>
              <Link href="/dashboard">
                <Button size="lg">Pergi Dashboard</Button>
              </Link>
            </>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FFFDF2] flex items-center justify-center">
        <div className="text-2xl font-black animate-pulse">Memuatkan... ⏳</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
