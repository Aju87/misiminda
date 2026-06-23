"use client";

import { useState } from "react";
import { Modal, Input, Button } from "@/components/ui";
import type { Kid } from "@/types";

interface AddRewardModalProps {
  open: boolean;
  onClose: () => void;
  kids: Kid[];
  onAdd: (kid_id: string, reward_name: string, stars_required: number) => Promise<{ error: unknown }>;
}

const REWARD_SUGGESTIONS = [
  "Mainan LEGO 🧱",
  "Masa skrin tambahan 📱",
  "Makan aiskrim 🍦",
  "Pergi taman tema 🎡",
  "Beli buku baru 📚",
  "Pilih menu makan malam 🍜",
];

export function AddRewardModal({ open, onClose, kids, onAdd }: AddRewardModalProps) {
  const [kidId, setKidId] = useState(kids[0]?.id ?? "");
  const [rewardName, setRewardName] = useState("");
  const [starsRequired, setStarsRequired] = useState("50");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rewardName.trim()) { setError("Nama hadiah diperlukan."); return; }
    const stars = parseInt(starsRequired);
    if (isNaN(stars) || stars < 1) { setError("Jumlah bintang tidak sah."); return; }

    setLoading(true);
    setError("");
    const { error: err } = await onAdd(kidId, rewardName.trim(), stars);
    if (err) {
      setError("Ralat semasa menambah hadiah.");
      setLoading(false);
    } else {
      setRewardName(""); setStarsRequired("50");
      onClose();
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Tambah Hadiah 🎁">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Kid selector */}
        <div className="flex flex-col gap-1.5">
          <label className="font-black uppercase text-sm tracking-wide">Untuk Siapa?</label>
          <div className="flex flex-wrap gap-2">
            {kids.map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => setKidId(k.id)}
                className={`border-3 border-black rounded-xl px-4 py-2 font-bold text-sm transition-all ${
                  kidId === k.id ? "bg-[#FFB800]" : "bg-white hover:bg-gray-50"
                }`}
              >
                {k.name}
              </button>
            ))}
          </div>
        </div>

        {/* Suggestions */}
        <div className="flex flex-col gap-1.5">
          <label className="font-black uppercase text-sm tracking-wide">Nama Hadiah</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {REWARD_SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setRewardName(s)}
                className={`border-2 border-black rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                  rewardName === s ? "bg-[#4ECDC4]" : "bg-white hover:bg-gray-50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <Input
            placeholder="Atau taip sendiri..."
            value={rewardName}
            onChange={(e) => setRewardName(e.target.value)}
            error={error}
          />
        </div>

        <Input
          label="Bintang Diperlukan"
          type="number"
          min="1"
          max="9999"
          value={starsRequired}
          onChange={(e) => setStarsRequired(e.target.value)}
          hint="Contoh: 50 bintang = 1 hadiah"
        />

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="secondary" fullWidth onClick={onClose}>Batal</Button>
          <Button type="submit" fullWidth loading={loading}>Simpan Hadiah</Button>
        </div>
      </form>
    </Modal>
  );
}
