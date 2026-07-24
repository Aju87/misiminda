"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Card, Badge, Input } from "@/components/ui";

interface Withdrawal {
  id: string; affiliate_id: string; email: string; amount_sen: number;
  status: string; requested_at: string; paid_at: string | null;
  bank_snapshot: { bank_name?: string; bank_account?: string; account_holder?: string } | null;
  admin_note: string | null;
}

const rm = (sen: number) => `RM${(sen / 100).toFixed(2)}`;

export function AdminAffiliate() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [appUrl, setAppUrl] = useState("");
  const [affUrl, setAffUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function load() {
    try {
      const [wRes, sRes] = await Promise.all([
        fetch("/api/admin/withdrawals"),
        fetch("/api/admin/settings"),
      ]);
      if (wRes.ok) setWithdrawals((await wRes.json()).withdrawals ?? []);
      if (sRes.ok) {
        const s = await sRes.json();
        setAppUrl(s.chip_app_url ?? "");
        setAffUrl(s.chip_affiliate_url ?? "");
      }
    } finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  async function saveUrls() {
    setMsg(null);
    const res = await fetch("/api/admin/settings", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chip_app_url: appUrl, chip_affiliate_url: affUrl }),
    });
    setMsg(res.ok ? "✅ Link pembayaran disimpan." : "❌ Gagal simpan link.");
  }

  async function act(id: string, action: "paid" | "rejected") {
    setBusy(id);
    try {
      await fetch("/api/admin/withdrawals", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      await load();
    } finally { setBusy(null); }
  }

  if (loading) return <div className="text-center py-12 font-bold text-gray-500">Memuatkan...</div>;

  const pending = withdrawals.filter((w) => w.status === "pending");
  const history = withdrawals.filter((w) => w.status !== "pending");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
      <div>
        <h2 className="font-black text-2xl uppercase">Pengurusan Affiliate</h2>
        <p className="font-semibold text-sm text-gray-600 mt-1">
          Bayar komisen secara manual (DuitNow/bank), kemudian tandakan &quot;Dah Bayar&quot;.
        </p>
      </div>

      {/* Link pembayaran CHIP */}
      <Card color="white" className="flex flex-col gap-3">
        <h3 className="font-black text-lg uppercase">🔗 Link Pembayaran CHIP</h3>
        <Input label="Link App (RM35)" value={appUrl} onChange={(e) => setAppUrl(e.target.value)}
               placeholder="https://pay.chip-in.asia/..." hint="Untuk pelanggan biasa beli app" />
        <Input label="Link Join Affiliate (RM50)" value={affUrl} onChange={(e) => setAffUrl(e.target.value)}
               placeholder="https://pay.chip-in.asia/..." hint="Cipta link CHIP berasingan berharga RM50" />
        <div className="flex items-center gap-3">
          <Button onClick={saveUrls} variant="mint" size="sm">💾 Simpan Link</Button>
          {msg && <span className="font-bold text-sm">{msg}</span>}
        </div>
      </Card>

      {/* Permohonan withdraw tertunggak */}
      <Card color={pending.length ? "yellow" : "white"} className="flex flex-col gap-3">
        <h3 className="font-black text-lg uppercase">
          💸 Permohonan Withdraw {pending.length > 0 && <Badge variant="red">{pending.length} baharu</Badge>}
        </h3>
        {pending.length === 0 && <p className="font-semibold text-sm text-gray-600">Tiada permohonan tertunggak.</p>}
        {pending.map((w) => (
          <div key={w.id} className="border-3 border-black rounded-xl p-3 bg-white flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-lg">{rm(w.amount_sen)}</span>
              <span className="text-xs font-bold text-gray-500">
                {new Date(w.requested_at).toLocaleString("ms-MY")}
              </span>
            </div>
            <p className="text-sm font-semibold">{w.email}</p>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2 text-sm font-mono">
              <div>🏦 {w.bank_snapshot?.bank_name}</div>
              <div>#️⃣ {w.bank_snapshot?.bank_account}</div>
              <div>👤 {w.bank_snapshot?.account_holder}</div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => act(w.id, "paid")} loading={busy === w.id} variant="primary" size="sm">
                ✅ Dah Bayar
              </Button>
              <Button onClick={() => act(w.id, "rejected")} variant="danger" size="sm">
                ✕ Tolak
              </Button>
            </div>
          </div>
        ))}
      </Card>

      {/* Sejarah */}
      {history.length > 0 && (
        <Card color="white" className="flex flex-col gap-2">
          <h3 className="font-black text-lg uppercase">📜 Sejarah Bayaran</h3>
          {history.map((w) => (
            <div key={w.id} className="flex items-center justify-between border-2 border-black rounded-xl px-3 py-2">
              <div>
                <p className="font-black text-sm">{rm(w.amount_sen)} · {w.email}</p>
                <p className="text-xs font-semibold text-gray-500">
                  {new Date(w.requested_at).toLocaleDateString("ms-MY")}
                </p>
              </div>
              <Badge variant={w.status === "paid" ? "mint" : "red"}>
                {w.status === "paid" ? "DIBAYAR" : "DITOLAK"}
              </Badge>
            </div>
          ))}
        </Card>
      )}
    </motion.div>
  );
}
