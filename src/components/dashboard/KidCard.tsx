"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AvatarDisplay, Badge, Button, Modal, Input, StarCounter } from "@/components/ui";
import { AvatarPicker } from "@/components/ui/Avatar";
import { AGE_GROUPS } from "@/lib/constants";
import type { Kid } from "@/types";

interface KidCardProps {
  kid: Kid;
  onUpdate: (id: string, updates: Partial<Pick<Kid, "name" | "age_group" | "avatar_url">>) => Promise<{ error: unknown }>;
  onDelete: (id: string) => Promise<{ error: unknown }>;
  onPlay: (kid: Kid) => void;
}

export function KidCard({ kid, onUpdate, onDelete, onPlay }: KidCardProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [name, setName] = useState(kid.name);
  const [ageGroup, setAgeGroup] = useState(kid.age_group);
  const [avatar, setAvatar] = useState(kid.avatar_url);
  const [saving, setSaving] = useState(false);

  const ageLabel = AGE_GROUPS.find((g) => g.value === kid.age_group);

  async function handleSave() {
    setSaving(true);
    await onUpdate(kid.id, { name, age_group: ageGroup, avatar_url: avatar });
    setSaving(false);
    setEditOpen(false);
  }

  async function handleDelete() {
    await onDelete(kid.id);
    setDeleteConfirm(false);
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -2 }}
        style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
        className="border-4 border-black rounded-2xl bg-white overflow-hidden"
      >
        {/* Header strip */}
        <div className="bg-[#FFB800] border-b-4 border-black px-4 py-3 flex items-center justify-between">
          <Badge variant="black">{ageLabel?.grade}</Badge>
          <div className="flex gap-2">
            <button
              onClick={() => setEditOpen(true)}
              className="text-sm font-black border-2 border-black rounded-lg px-2 py-0.5 bg-white hover:bg-gray-100"
            >
              ✏️
            </button>
            <button
              onClick={() => setDeleteConfirm(true)}
              className="text-sm font-black border-2 border-black rounded-lg px-2 py-0.5 bg-white hover:bg-[#FF6B6B]"
            >
              🗑️
            </button>
          </div>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <AvatarDisplay avatarId={kid.avatar_url} size="lg" />
            <div>
              <h3 className="font-black text-xl">{kid.name}</h3>
              <p className="text-sm font-semibold text-gray-600">{ageLabel?.label}</p>
            </div>
          </div>

          <StarCounter stars={kid.total_stars} size="md" />

          <Button variant="mint" fullWidth onClick={() => onPlay(kid)}>
            Main Sekarang 🎮
          </Button>
        </div>
      </motion.div>

      {/* Edit Modal */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Profil">
        <div className="flex flex-col gap-4">
          <Input
            label="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex flex-col gap-1.5">
            <label className="font-black uppercase text-sm tracking-wide">Kumpulan Umur</label>
            <div className="flex gap-2 flex-wrap">
              {AGE_GROUPS.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setAgeGroup(g.value)}
                  className={`border-3 border-black rounded-xl px-3 py-2 font-bold text-sm transition-all ${
                    ageGroup === g.value ? "bg-[#FFB800]" : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {g.emoji} {g.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-black uppercase text-sm tracking-wide">Avatar</label>
            <AvatarPicker selected={avatar} onSelect={setAvatar} />
          </div>
          <Button onClick={handleSave} loading={saving} fullWidth>Simpan</Button>
        </div>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal open={deleteConfirm} onClose={() => setDeleteConfirm(false)} title="Padam Profil?">
        <div className="flex flex-col gap-4">
          <p className="font-semibold">
            Adakah anda pasti mahu padam profil <strong>{kid.name}</strong>? Semua kemajuan akan hilang.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" fullWidth onClick={() => setDeleteConfirm(false)}>Batal</Button>
            <Button variant="danger" fullWidth onClick={handleDelete}>Ya, Padam</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
