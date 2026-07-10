"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Button, Card, Badge, Input } from "@/components/ui";

export function AdsSettings() {
  const [metaPixel, setMetaPixel] = useState("");
  const [tiktokPixel, setTiktokPixel] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("site_settings")
          .select("key, value")
          .in("key", ["meta_pixel_id", "tiktok_pixel_id"]);
        if (data) {
          const map = Object.fromEntries(data.map((r) => [r.key, r.value]));
          setMetaPixel(map.meta_pixel_id ?? "");
          setTiktokPixel(map.tiktok_pixel_id ?? "");
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "err", text: data.error ?? "Gagal simpan." });
      } else {
        setMessage({ type: "ok", text: "✅ Pixel berjaya disimpan! Ia kini aktif di semua halaman." });
      }
    } catch {
      setMessage({ type: "err", text: "Ralat sambungan. Cuba lagi." });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="text-center py-12 font-bold text-gray-500">Memuatkan...</div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
      <div>
        <h2 className="font-black text-2xl uppercase">Tetapan Ads & Tracking</h2>
        <p className="font-semibold text-sm text-gray-600 mt-1">
          Tanam tracking pixel untuk kempen iklan. Pixel akan dimuatkan pada semua halaman
          termasuk landing page — tiada redeploy diperlukan.
        </p>
      </div>

      {/* Meta Pixel */}
      <Card color="white" className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📘</span>
          <h3 className="font-black text-lg uppercase">Meta Pixel (Facebook & Instagram)</h3>
        </div>
        <p className="text-sm font-semibold text-gray-600">
          Masukkan Pixel ID sahaja (nombor), contoh: <code className="bg-gray-100 px-1 rounded">1234567890123456</code>.
          Dapatkan dari Meta Events Manager → Data Sources.
        </p>
        <Input
          label="Meta Pixel ID"
          value={metaPixel}
          onChange={(e) => setMetaPixel(e.target.value.replace(/\D/g, ""))}
          placeholder="cth: 1234567890123456"
        />
      </Card>

      {/* TikTok Pixel */}
      <Card color="white" className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎵</span>
          <h3 className="font-black text-lg uppercase">TikTok Pixel</h3>
        </div>
        <p className="text-sm font-semibold text-gray-600">
          Masukkan Pixel ID sahaja, contoh: <code className="bg-gray-100 px-1 rounded">CABC123DEF456</code>.
          Dapatkan dari TikTok Ads Manager → Assets → Events.
        </p>
        <Input
          label="TikTok Pixel ID"
          value={tiktokPixel}
          onChange={(e) => setTiktokPixel(e.target.value.replace(/[^A-Za-z0-9]/g, ""))}
          placeholder="cth: CABC123DEF456"
        />
      </Card>

      {message && (
        <Card color={message.type === "ok" ? "mint" : "red"} className="py-3">
          <p className="font-bold text-sm">{message.text}</p>
        </Card>
      )}

      <div className="flex items-center gap-4">
        <Button onClick={handleSave} loading={saving} size="lg">
          💾 Simpan Pixel
        </Button>
        <Badge variant="black" className="text-xs">
          Kosongkan & simpan untuk padam pixel
        </Badge>
      </div>

      <Card color="yellow" className="flex flex-col gap-2">
        <h3 className="font-black text-sm uppercase">💡 Cara Sahkan Pixel Berfungsi</h3>
        <ol className="text-sm font-semibold flex flex-col gap-1 list-decimal list-inside">
          <li>Simpan Pixel ID di atas</li>
          <li>Buka misiminda.my dalam tab baru</li>
          <li>Guna extension <strong>Meta Pixel Helper</strong> (Chrome) — ia akan tunjuk pixel aktif</li>
          <li>Untuk TikTok, semak di TikTok Events Manager → Test Events</li>
        </ol>
      </Card>
    </motion.div>
  );
}
