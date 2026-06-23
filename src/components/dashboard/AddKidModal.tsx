"use client";

import { useState } from "react";
import { Modal, Input, Button } from "@/components/ui";
import { AvatarPicker } from "@/components/ui/Avatar";
import { AGE_GROUPS, AVATARS } from "@/lib/constants";
import type { Kid } from "@/types";

interface AddKidModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, age_group: Kid["age_group"], avatar_url: string) => Promise<{ error: unknown }>;
}

export function AddKidModal({ open, onClose, onAdd }: AddKidModalProps) {
  const [name, setName] = useState("");
  const [ageGroup, setAgeGroup] = useState<Kid["age_group"]>("5-6");
  const [avatar, setAvatar] = useState<string>(AVATARS[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError("Nama diperlukan."); return; }
    setLoading(true);
    setError("");
    const { error: err } = await onAdd(name.trim(), ageGroup, avatar);
    if (err) {
      setError("Ralat semasa menambah profil. Cuba lagi.");
      setLoading(false);
    } else {
      setName(""); setAgeGroup("5-6"); setAvatar(AVATARS[0].id);
      onClose();
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Tambah Kanak-Kanak" className="max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Nama Kanak-Kanak"
          placeholder="Contoh: Aisyah"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={error}
          required
        />

        <div className="flex flex-col gap-2">
          <label className="font-black uppercase text-sm tracking-wide">Kumpulan Umur</label>
          <div className="grid grid-cols-3 gap-2">
            {AGE_GROUPS.map((g) => (
              <button
                key={g.value}
                type="button"
                onClick={() => setAgeGroup(g.value)}
                style={ageGroup === g.value ? { boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)" } : {}}
                className={`border-3 border-black rounded-xl p-3 font-bold text-sm text-center transition-all ${
                  ageGroup === g.value ? "bg-[#FFB800] translate-x-[1px] translate-y-[1px]" : "bg-white hover:bg-gray-50"
                }`}
              >
                <div className="text-2xl mb-1">{g.emoji}</div>
                <div>{g.label}</div>
                <div className="text-xs text-gray-600">{g.grade}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-black uppercase text-sm tracking-wide">Pilih Avatar</label>
          <AvatarPicker selected={avatar} onSelect={setAvatar} />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="secondary" fullWidth onClick={onClose}>Batal</Button>
          <Button type="submit" fullWidth loading={loading}>Tambah ✅</Button>
        </div>
      </form>
    </Modal>
  );
}
