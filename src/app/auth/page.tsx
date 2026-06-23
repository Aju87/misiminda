"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Button, Card, Input, Badge } from "@/components/ui";

type Tab = "login" | "signup";

function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<Tab>(
    searchParams.get("tab") === "signup" ? "signup" : "login"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) router.replace("/dashboard");
    });
  }, [router, supabase]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("E-mel atau kata laluan tidak betul.");
      setLoading(false);
    } else {
      router.replace("/dashboard");
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess("Akaun berjaya dibuat! Sila semak e-mel untuk pengesahan.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFDF2] flex flex-col">
      {/* Navbar */}
      <nav className="border-b-4 border-black bg-[#FFB800]">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <span className="font-black text-xl uppercase">MisiMinda</span>
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Tab switcher */}
          <div
            className="flex border-4 border-black rounded-2xl overflow-hidden mb-6"
            style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
          >
            {(["login", "signup"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); setSuccess(""); }}
                className={`flex-1 py-3 font-black uppercase text-sm tracking-wide transition-colors ${
                  tab === t ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {t === "login" ? "Log Masuk" : "Daftar"}
              </button>
            ))}
          </div>

          <Card color="white">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-4 py-6 text-center"
                >
                  <span className="text-6xl">🎉</span>
                  <h2 className="font-black text-xl uppercase">Berjaya!</h2>
                  <p className="font-semibold text-gray-700">{success}</p>
                  <Button onClick={() => { setTab("login"); setSuccess(""); }} fullWidth>
                    Log Masuk Sekarang
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key={tab}
                  initial={{ opacity: 0, x: tab === "login" ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  onSubmit={tab === "login" ? handleLogin : handleSignup}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-1 mb-2">
                    <h1 className="font-black text-2xl uppercase">
                      {tab === "login" ? "Selamat Kembali! 👋" : "Sertai MisiMinda! 🚀"}
                    </h1>
                    <p className="text-sm font-semibold text-gray-600">
                      {tab === "login"
                        ? "Masukkan maklumat akaun anda"
                        : "Cipta akaun ibu bapa percuma"}
                    </p>
                  </div>

                  {tab === "signup" && (
                    <Input
                      label="Nama Penuh"
                      type="text"
                      placeholder="Contoh: Ahmad bin Ali"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  )}

                  <Input
                    label="E-mel"
                    type="email"
                    placeholder="contoh@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <Input
                    label="Kata Laluan"
                    type="password"
                    placeholder={tab === "signup" ? "Minimum 6 aksara" : "••••••••"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                    error={error}
                  />

                  {tab === "signup" && (
                    <div className="flex flex-wrap gap-2 p-3 bg-[#FFFDF2] border-2 border-black rounded-xl">
                      {["✅ Sehingga 4 kanak-kanak", "✅ Sistem ganjaran", "✅ Penjejak kemajuan"].map((f) => (
                        <Badge key={f} variant="mint">{f}</Badge>
                      ))}
                    </div>
                  )}

                  <Button type="submit" fullWidth size="lg" loading={loading}>
                    {tab === "login" ? "Log Masuk" : "Daftar Percuma"}
                  </Button>

                  {tab === "login" && (
                    <p className="text-center text-sm font-semibold text-gray-600">
                      Belum ada akaun?{" "}
                      <button
                        type="button"
                        onClick={() => setTab("signup")}
                        className="font-black underline"
                      >
                        Daftar sekarang
                      </button>
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FFFDF2] flex items-center justify-center">
        <div className="text-2xl font-black animate-pulse">Memuatkan... 🧠</div>
      </div>
    }>
      <AuthForm />
    </Suspense>
  );
}
