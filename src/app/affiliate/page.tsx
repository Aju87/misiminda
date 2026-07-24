"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button, Card, Badge, Input, Logo } from "@/components/ui";

interface Balances {
  pendingSen: number; availableSen: number; requestedSen: number; paidSen: number; totalReferred: number;
}
interface Withdrawal {
  id: string; amount_sen: number; status: string; requested_at: string; paid_at: string | null; admin_note: string | null;
}
interface MeData {
  isAffiliate: boolean;
  joinUrl?: string;
  code?: string;
  bank?: { bank_name: string | null; bank_account: string | null; account_holder: string | null };
  balances?: Balances;
  canWithdraw?: boolean;
  hasPendingWithdrawal?: boolean;
  nextWithdrawAt?: string | null;
  minWithdrawSen?: number;
  withdrawals?: Withdrawal[];
}

const rm = (sen: number) => `RM${(sen / 100).toFixed(2)}`;

export default function AffiliatePage() {
  const router = useRouter();
  const [data, setData] = useState<MeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [msg, setMsg] = useState<{ t: "ok" | "err"; m: string } | null>(null);
  const [savingBank, setSavingBank] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);

  const [bankName, setBankName] = useState("");
  const [bankAcc, setBankAcc] = useState("");
  const [holder, setHolder] = useState("");

  async function load() {
    try {
      // kaitkan rujukan (jika ada cookie) — idempoten
      await fetch("/api/affiliate/attribute", { method: "POST" }).catch(() => {});
      const res = await fetch("/api/affiliate/me");
      if (res.status === 401) { router.replace("/auth"); return; }
      const d: MeData = await res.json();
      setData(d);
      if (d.bank) {
        setBankName(d.bank.bank_name ?? "");
        setBankAcc(d.bank.bank_account ?? "");
        setHolder(d.bank.account_holder ?? "");
      }
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const referralLink =
    typeof window !== "undefined" && data?.code
      ? `${window.location.origin}/?ref=${data.code}`
      : "";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* ignore */ }
  }

  async function saveBank() {
    setSavingBank(true); setMsg(null);
    try {
      const res = await fetch("/api/affiliate/bank", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bank_name: bankName, bank_account: bankAcc, account_holder: holder }),
      });
      const d = await res.json();
      if (!res.ok) setMsg({ t: "err", m: d.error ?? "Gagal simpan." });
      else { setMsg({ t: "ok", m: "✅ Butiran bank disimpan." }); load(); }
    } finally { setSavingBank(false); }
  }

  async function requestWithdraw() {
    setWithdrawing(true); setMsg(null);
    try {
      const res = await fetch("/api/affiliate/withdraw", { method: "POST" });
      const d = await res.json();
      if (!res.ok) setMsg({ t: "err", m: d.error ?? "Gagal mohon." });
      else { setMsg({ t: "ok", m: `✅ Permohonan ${rm(d.amountSen)} dihantar! Kami akan bayar dalam 1-3 hari bekerja.` }); load(); }
    } finally { setWithdrawing(false); }
  }

  if (loading) {
    return <div className="min-h-screen bg-[#FFFDF2] flex items-center justify-center">
      <div className="text-2xl font-black animate-pulse">Memuatkan... 🤝</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-[#FFFDF2]">
      <nav className="border-b-4 border-black bg-[#26D182] sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center"><Logo size={44} /></Link>
          <div className="flex items-center gap-3">
            <span className="font-black text-white text-sm hidden sm:block">🤝 Program Affiliate</span>
            <Link href="/dashboard"><Button variant="secondary" size="sm">Dashboard</Button></Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">
        {/* ===== BELUM JADI AFFILIATE ===== */}
        {!data?.isAffiliate && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card color="mint" className="flex flex-col items-center text-center gap-4 py-12">
              <span className="text-6xl">🤝</span>
              <h1 className="font-black text-3xl uppercase">Jadi Affiliate MisiMinda</h1>
              <p className="font-semibold text-lg max-w-lg">
                Bayar sekali <strong>RM50</strong> — dapat akses penuh app untuk anak anda,
                <strong> dan</strong> jana komisen <strong>RM15</strong> setiap jualan melalui link anda!
              </p>
              <div className="grid sm:grid-cols-3 gap-3 w-full max-w-lg my-2">
                {[
                  { i: "🔗", t: "Link Sendiri", d: "Jana link unik untuk promosi" },
                  { i: "💰", t: "RM15 / Jualan", d: "Komisen setiap pelanggan" },
                  { i: "🏦", t: "Withdraw Mudah", d: "Keluarkan setiap 3 hari" },
                ].map((x) => (
                  <div key={x.t} className="bg-white border-3 border-black rounded-xl p-3">
                    <div className="text-2xl">{x.i}</div>
                    <p className="font-black text-sm mt-1">{x.t}</p>
                    <p className="text-xs font-semibold text-gray-600">{x.d}</p>
                  </div>
                ))}
              </div>
              {data?.joinUrl ? (
                <a href={data.joinUrl}>
                  <Button size="xl">Sertai Sekarang — RM50 🚀</Button>
                </a>
              ) : (
                <div className="text-center">
                  <Button size="xl" disabled>Sertai Sekarang — RM50</Button>
                  <p className="text-xs font-bold text-red-600 mt-2">
                    ⚠️ Link pembayaran affiliate belum disediakan admin.
                  </p>
                </div>
              )}
              <p className="text-xs font-bold text-gray-600">
                Selepas bayar, log masuk semula dengan email yang sama — status affiliate akan aktif automatik.
              </p>
            </Card>
          </motion.div>
        )}

        {/* ===== SUDAH JADI AFFILIATE ===== */}
        {data?.isAffiliate && data.balances && (
          <>
            {/* Link rujukan */}
            <Card color="yellow" className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔗</span>
                <h2 className="font-black text-lg uppercase">Link Promosi Anda</h2>
                <Badge variant="black" className="ml-auto">Kod: {data.code}</Badge>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  readOnly value={referralLink}
                  className="flex-1 border-3 border-black rounded-xl px-4 py-3 font-bold text-sm bg-white"
                  onFocus={(e) => e.target.select()}
                />
                <Button onClick={copyLink} variant="secondary">
                  {copied ? "✅ Disalin!" : "📋 Salin"}
                </Button>
              </div>
              <p className="text-xs font-semibold text-gray-700">
                Kongsi link ini di WhatsApp, Facebook, TikTok. Setiap orang yang beli app melalui link
                anda = <strong>RM15</strong> komisen.
              </p>
            </Card>

            {/* Statistik */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { i: "👥", v: data.balances.totalReferred, l: "Jumlah Jualan" },
                { i: "⏳", v: rm(data.balances.pendingSen), l: "Ditahan (7 hari)" },
                { i: "💵", v: rm(data.balances.availableSen), l: "Boleh Withdraw" },
                { i: "✅", v: rm(data.balances.paidSen), l: "Sudah Dibayar" },
              ].map((s) => (
                <Card key={s.l} color="white" className="flex flex-col gap-1 py-4 text-center">
                  <span className="text-2xl">{s.i}</span>
                  <span className="font-black text-xl leading-none">{s.v}</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase">{s.l}</span>
                </Card>
              ))}
            </div>

            {msg && (
              <Card color={msg.t === "ok" ? "mint" : "red"} className="py-3">
                <p className="font-bold text-sm">{msg.m}</p>
              </Card>
            )}

            {/* Withdraw */}
            <Card color="white" className="flex flex-col gap-3">
              <h2 className="font-black text-lg uppercase">💸 Keluarkan Komisen</h2>
              <p className="text-sm font-semibold text-gray-700">
                Komisen boleh dikeluarkan selepas <strong>7 hari</strong> (tempoh jaminan refund pelanggan).
                Withdraw dibenarkan sekali setiap 3 hari. Bayaran dibuat ke akaun bank anda dalam 1-3 hari bekerja.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <Button
                  onClick={requestWithdraw}
                  loading={withdrawing}
                  disabled={!data.canWithdraw}
                  size="lg"
                >
                  Mohon Withdraw ({rm(data.balances.availableSen)})
                </Button>
                {!data.canWithdraw && (
                  <span className="text-xs font-bold text-gray-500">
                    {data.hasPendingWithdrawal
                      ? "Ada permohonan sedang diproses"
                      : data.nextWithdrawAt
                      ? `Boleh withdraw lagi selepas ${new Date(data.nextWithdrawAt).toLocaleDateString("ms-MY")}`
                      : `Minimum ${rm(data.minWithdrawSen ?? 1500)} untuk withdraw`}
                  </span>
                )}
              </div>
            </Card>

            {/* Butiran bank */}
            <Card color="white" className="flex flex-col gap-3">
              <h2 className="font-black text-lg uppercase">🏦 Butiran Bank</h2>
              <p className="text-sm font-semibold text-gray-600">
                Komisen akan dibayar ke akaun ini. Sila pastikan tepat.
              </p>
              <Input label="Nama Bank" value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="cth: Maybank" />
              <Input label="No. Akaun" value={bankAcc} onChange={(e) => setBankAcc(e.target.value.replace(/\s/g, ""))} placeholder="cth: 1234567890" />
              <Input label="Nama Pemegang Akaun" value={holder} onChange={(e) => setHolder(e.target.value)} placeholder="Nama penuh seperti dalam bank" />
              <Button onClick={saveBank} loading={savingBank} variant="mint" size="sm" className="w-fit">
                💾 Simpan Butiran Bank
              </Button>
            </Card>

            {/* Sejarah withdraw */}
            {data.withdrawals && data.withdrawals.length > 0 && (
              <Card color="white" className="flex flex-col gap-3">
                <h2 className="font-black text-lg uppercase">📜 Sejarah Withdraw</h2>
                <div className="flex flex-col gap-2">
                  {data.withdrawals.map((w) => (
                    <div key={w.id} className="flex items-center justify-between border-2 border-black rounded-xl px-3 py-2">
                      <div>
                        <p className="font-black text-sm">{rm(w.amount_sen)}</p>
                        <p className="text-xs font-semibold text-gray-500">
                          {new Date(w.requested_at).toLocaleDateString("ms-MY")}
                        </p>
                      </div>
                      <Badge variant={w.status === "paid" ? "mint" : w.status === "rejected" ? "red" : "black"}>
                        {w.status === "paid" ? "DIBAYAR" : w.status === "rejected" ? "DITOLAK" : "DIPROSES"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </>
        )}
      </main>
    </div>
  );
}
