"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { PinInput, Button, Card } from "@/components/ui";

interface PinGateProps {
  parentId: string;
  hasPin: boolean;
  onUnlocked: () => void;
}

export function PinGate({ parentId, hasPin, onUnlocked }: PinGateProps) {
  const [step, setStep] = useState<"enter" | "create" | "confirm">(
    hasPin ? "enter" : "create"
  );
  const [pinDraft, setPinDraft] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function verifyPin(pin: string) {
    setLoading(true);
    setError("");
    const { data } = await supabase
      .from("parents")
      .select("pin")
      .eq("id", parentId)
      .single();

    if (data?.pin === pin) {
      onUnlocked();
    } else {
      setError("PIN tidak betul. Cuba lagi.");
      setLoading(false);
    }
  }

  async function savePin(pin: string) {
    if (step === "create") {
      setPinDraft(pin);
      setStep("confirm");
      return;
    }
    if (pin !== pinDraft) {
      setError("PIN tidak sepadan. Cuba lagi.");
      return;
    }
    setLoading(true);
    await supabase.from("parents").update({ pin }).eq("id", parentId);
    onUnlocked();
  }

  return (
    <div className="min-h-screen bg-[#FFFDF2] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <Card color="white" className="flex flex-col items-center gap-6 py-10">
          <span className="text-6xl">🔐</span>

          <div className="text-center">
            <h1 className="font-black text-2xl uppercase">
              {step === "enter" && "Masukkan PIN"}
              {step === "create" && "Cipta PIN Baru"}
              {step === "confirm" && "Sahkan PIN"}
            </h1>
            <p className="text-sm font-semibold text-gray-600 mt-1">
              {step === "enter" && "PIN 4-digit untuk akses dashboard"}
              {step === "create" && "Tetapkan PIN untuk lindungi dashboard anda"}
              {step === "confirm" && "Masukkan semula PIN untuk pengesahan"}
            </p>
          </div>

          <PinInput
            key={step}
            onComplete={step === "enter" ? verifyPin : savePin}
            error={error}
            disabled={loading}
          />

          {step === "enter" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setStep("create"); setError(""); }}
            >
              Terlupa PIN?
            </Button>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
