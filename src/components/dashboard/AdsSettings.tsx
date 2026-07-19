"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Card, Badge, Input } from "@/components/ui";

interface MaskedStatus { set: boolean; hint: string }

interface TestResult {
  meta: { ok: boolean; status: number; response: unknown };
  tiktok: { ok: boolean; status: number; response: unknown };
}

export function AdsSettings() {
  const [metaPixel, setMetaPixel] = useState("");
  const [tiktokPixel, setTiktokPixel] = useState("");
  const [metaToken, setMetaToken] = useState("");
  const [metaTestCode, setMetaTestCode] = useState("");
  const [tiktokToken, setTiktokToken] = useState("");

  const [status, setStatus] = useState<Record<string, MaskedStatus>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  async function load() {
    try {
      const res = await fetch("/api/admin/settings");
      if (!res.ok) return;
      const d = await res.json();
      setMetaPixel(d.meta_pixel_id ?? "");
      setTiktokPixel(d.tiktok_pixel_id ?? "");
      setStatus({
        meta_access_token: d.meta_access_token,
        meta_test_event_code: d.meta_test_event_code,
        tiktok_access_token: d.tiktok_access_token,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meta_pixel_id: metaPixel,
          tiktok_pixel_id: tiktokPixel,
          // kosong = kekalkan token sedia ada
          meta_access_token: metaToken,
          meta_test_event_code: metaTestCode,
          tiktok_access_token: tiktokToken,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "err", text: data.error ?? "Gagal simpan." });
      } else {
        setMessage({ type: "ok", text: "✅ Tetapan disimpan! Tracking kini aktif." });
        setMetaToken(""); setMetaTestCode(""); setTiktokToken("");
        await load();
      }
    } catch {
      setMessage({ type: "err", text: "Ralat sambungan. Cuba lagi." });
    } finally {
      setSaving(false);
    }
  }

  async function handleTest() {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/admin/test-capi", { method: "POST" });
      setTestResult(await res.json());
    } catch {
      setMessage({ type: "err", text: "Ralat semasa ujian." });
    } finally {
      setTesting(false);
    }
  }

  if (loading) {
    return <div className="text-center py-12 font-bold text-gray-500">Memuatkan...</div>;
  }

  const tokenHint = (key: string) =>
    status[key]?.set ? `Tersimpan (${status[key].hint}) — biar kosong untuk kekalkan` : "Belum diisi";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
      <div>
        <h2 className="font-black text-2xl uppercase">Tetapan Ads & Tracking</h2>
        <p className="font-semibold text-sm text-gray-600 mt-1">
          Pixel browser sahaja tidak cukup — Purchase berlaku di CHIP (luar website).
          Isi <strong>Access Token</strong> supaya server hantar event terus ke Meta/TikTok.
        </p>
      </div>

      {/* ===== META ===== */}
      <Card color="white" className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📘</span>
          <h3 className="font-black text-lg uppercase">Meta (Facebook & Instagram)</h3>
        </div>

        <Input
          label="Pixel ID"
          value={metaPixel}
          onChange={(e) => setMetaPixel(e.target.value.replace(/\D/g, ""))}
          placeholder="cth: 1234567890123456"
          hint="Events Manager → Data Sources → pilih pixel"
        />

        <Input
          label="Conversions API Access Token"
          type="password"
          value={metaToken}
          onChange={(e) => setMetaToken(e.target.value)}
          placeholder={status.meta_access_token?.set ? "••••••••" : "EAAxxxxx..."}
          hint={tokenHint("meta_access_token")}
        />

        <Input
          label="Test Event Code (pilihan)"
          value={metaTestCode}
          onChange={(e) => setMetaTestCode(e.target.value)}
          placeholder="cth: TEST12345"
          hint="Isi semasa ujian sahaja. KOSONGKAN semasa iklan sebenar berjalan!"
        />
      </Card>

      {/* ===== TIKTOK ===== */}
      <Card color="white" className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎵</span>
          <h3 className="font-black text-lg uppercase">TikTok</h3>
        </div>

        <Input
          label="Pixel ID"
          value={tiktokPixel}
          onChange={(e) => setTiktokPixel(e.target.value.replace(/[^A-Za-z0-9]/g, ""))}
          placeholder="cth: CABC123DEF456"
        />

        <Input
          label="Events API Access Token"
          type="password"
          value={tiktokToken}
          onChange={(e) => setTiktokToken(e.target.value)}
          placeholder={status.tiktok_access_token?.set ? "••••••••" : "Access token TikTok"}
          hint={tokenHint("tiktok_access_token")}
        />
      </Card>

      {message && (
        <Card color={message.type === "ok" ? "mint" : "red"} className="py-3">
          <p className="font-bold text-sm">{message.text}</p>
        </Card>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleSave} loading={saving} size="lg">💾 Simpan Tetapan</Button>
        <Button onClick={handleTest} loading={testing} variant="mint" size="lg">🧪 Hantar Event Ujian</Button>
      </div>

      {/* Keputusan ujian */}
      {testResult && (
        <Card color="white" className="flex flex-col gap-3">
          <h3 className="font-black text-sm uppercase">Keputusan Ujian</h3>
          {(["meta", "tiktok"] as const).map((k) => {
            const r = testResult[k];
            return (
              <div key={k} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Badge variant={r.ok ? "mint" : "red"}>{r.ok ? "BERJAYA" : "GAGAL"}</Badge>
                  <span className="font-black text-sm uppercase">{k}</span>
                  <span className="text-xs font-bold text-gray-500">HTTP {r.status}</span>
                </div>
                <pre className="text-[11px] bg-gray-100 rounded-lg p-2 overflow-x-auto font-mono">
                  {JSON.stringify(r.response, null, 2)}
                </pre>
              </div>
            );
          })}
          <p className="text-xs font-semibold text-gray-600">
            Semak juga di Meta Events Manager → <strong>Test Events</strong> untuk lihat event masuk secara langsung.
          </p>
        </Card>
      )}

      <Card color="yellow" className="flex flex-col gap-2">
        <h3 className="font-black text-sm uppercase">🔐 Nota Keselamatan</h3>
        <p className="text-sm font-semibold">
          Access token disimpan dalam jadual berasingan yang <strong>tidak boleh dibaca</strong> dari
          browser (hanya server). Token tidak pernah dihantar balik ke halaman ini — hanya 4 aksara
          terakhir dipaparkan sebagai pengesahan.
        </p>
      </Card>

      <Card color="mint" className="flex flex-col gap-2">
        <h3 className="font-black text-sm uppercase">📋 Event Yang Dihantar</h3>
        <ul className="text-sm font-semibold flex flex-col gap-1">
          <li>• <strong>PageView</strong> — pixel browser, setiap halaman</li>
          <li>• <strong>InitiateCheckout</strong> — bila tekan &quot;Beli Sekarang&quot; (browser + server)</li>
          <li>• <strong>Purchase</strong> — dari webhook CHIP selepas bayaran berjaya (server sahaja) ⭐</li>
        </ul>
      </Card>
    </motion.div>
  );
}
