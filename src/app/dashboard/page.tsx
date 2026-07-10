"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useKids } from "@/hooks/useKids";
import { useRewards } from "@/hooks/useRewards";
import { PinGate } from "@/components/dashboard/PinGate";
import { KidCard } from "@/components/dashboard/KidCard";
import { AddKidModal } from "@/components/dashboard/AddKidModal";
import { RewardCard } from "@/components/dashboard/RewardCard";
import { AddRewardModal } from "@/components/dashboard/AddRewardModal";
import { AdsSettings } from "@/components/dashboard/AdsSettings";
import { Button, Card, Badge, Logo } from "@/components/ui";
import { ADMIN_EMAIL } from "@/lib/constants";
import type { Kid } from "@/types";

type Tab = "kids" | "rewards" | "subscription" | "ads";

export default function DashboardPage() {
  const router = useRouter();
  const { user, parent, loading: authLoading, signOut } = useAuth();
  const { kids, loading: kidsLoading, addKid, updateKid, deleteKid } = useKids(parent?.id);
  const { rewards, addReward, redeemReward, deleteReward } = useRewards(parent?.id);
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState<Tab>("kids");
  const [addKidOpen, setAddKidOpen] = useState(false);
  const [addRewardOpen, setAddRewardOpen] = useState(false);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FFFDF2] flex items-center justify-center">
        <div className="text-2xl font-black animate-pulse">Memuatkan... 🧠</div>
      </div>
    );
  }

  if (!user || !parent) {
    router.replace("/auth");
    return null;
  }

  if (!unlocked) {
    return (
      <PinGate
        parentId={parent.id}
        hasPin={!!parent.pin}
        onUnlocked={() => setUnlocked(true)}
      />
    );
  }

  const totalStars = kids.reduce((s, k) => s + k.total_stars, 0);
  const isSubscribed = parent.subscription_status === "active";
  const isAdmin = parent.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  const tabs: Tab[] = isAdmin
    ? ["kids", "rewards", "subscription", "ads"]
    : ["kids", "rewards", "subscription"];

  async function handleSignOut() {
    await signOut();
    router.replace("/");
  }

  return (
    <div className="min-h-screen bg-[#FFFDF2]">
      {/* Navbar */}
      <nav className="border-b-4 border-black bg-[#FFB800] sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo size={48} />
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-bold text-sm hidden sm:block">Hai, {parent.name}!</span>
            <Button variant="secondary" size="sm" onClick={handleSignOut}>Keluar</Button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { label: "Kanak-kanak", value: kids.length, max: "/ 4", icon: "👧" },
            { label: "Jumlah Bintang", value: totalStars.toLocaleString(), icon: "⭐" },
            { label: "Hadiah Aktif", value: rewards.filter((r) => !r.is_redeemed).length, icon: "🎁" },
            {
              label: "Langganan",
              value: isSubscribed ? "Aktif" : "Tidak Aktif",
              icon: isSubscribed ? "✅" : "❌",
            },
          ].map((stat) => (
            <Card key={stat.label} color="white" className="flex flex-col gap-1 py-4">
              <span className="text-2xl">{stat.icon}</span>
              <span className="font-black text-2xl leading-none">
                {stat.value}
                {stat.max && <span className="text-sm font-bold text-gray-500">{stat.max}</span>}
              </span>
              <span className="text-xs font-bold text-gray-500 uppercase">{stat.label}</span>
            </Card>
          ))}
        </motion.div>

        {/* Subscription warning */}
        {!isSubscribed && (
          <Card color="red" className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="font-black text-lg">⚠️ Langganan Tidak Aktif</p>
              <p className="font-semibold text-sm">Langgan sekarang untuk akses penuh ke semua misi!</p>
            </div>
            <Link href="/pricing">
              <Button variant="secondary" size="sm">Langgan Sekarang</Button>
            </Link>
          </Card>
        )}

        {/* Tab navigation */}
        <div
          className="flex border-4 border-black rounded-2xl overflow-hidden"
          style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
        >
          {tabs.map((t) => {
            const labels = { kids: "👧 Kanak-Kanak", rewards: "🎁 Hadiah", subscription: "💳 Langganan", ads: "📢 Ads" };
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-3 font-black text-sm uppercase tracking-wide transition-colors ${
                  tab === t ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {labels[t]}
              </button>
            );
          })}
        </div>

        {/* Kids tab */}
        {tab === "kids" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-black text-2xl uppercase">Profil Kanak-Kanak</h2>
              {kids.length < 4 && (
                <Button variant="mint" size="sm" onClick={() => setAddKidOpen(true)}>
                  + Tambah
                </Button>
              )}
            </div>

            {kidsLoading ? (
              <div className="text-center py-12 font-bold text-gray-500">Memuatkan...</div>
            ) : kids.length === 0 ? (
              <Card color="yellow" className="flex flex-col items-center gap-4 py-12 text-center">
                <span className="text-6xl">👶</span>
                <h3 className="font-black text-xl uppercase">Belum Ada Profil</h3>
                <p className="font-semibold">Tambah profil kanak-kanak untuk mula bermain!</p>
                <Button onClick={() => setAddKidOpen(true)}>+ Tambah Kanak-Kanak</Button>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {kids.map((kid) => (
                  <KidCard
                    key={kid.id}
                    kid={kid}
                    onUpdate={updateKid}
                    onDelete={deleteKid}
                    onPlay={(k: Kid) => router.push(`/play?kid=${k.id}`)}
                  />
                ))}
                {kids.length < 4 && (
                  <button
                    onClick={() => setAddKidOpen(true)}
                    className="border-4 border-dashed border-black rounded-2xl flex flex-col items-center justify-center gap-3 p-8 hover:bg-gray-50 transition-colors min-h-[200px]"
                  >
                    <span className="text-4xl">➕</span>
                    <span className="font-black uppercase text-sm">Tambah Profil</span>
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* Rewards tab */}
        {tab === "rewards" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-black text-2xl uppercase">Sistem Ganjaran</h2>
              {kids.length > 0 && (
                <Button variant="primary" size="sm" onClick={() => setAddRewardOpen(true)}>
                  + Tambah Hadiah
                </Button>
              )}
            </div>

            {kids.length === 0 ? (
              <Card color="yellow" className="text-center py-8">
                <p className="font-black">Tambah profil kanak-kanak dahulu untuk tetapkan hadiah.</p>
              </Card>
            ) : rewards.length === 0 ? (
              <Card color="mint" className="flex flex-col items-center gap-4 py-12 text-center">
                <span className="text-6xl">🎁</span>
                <h3 className="font-black text-xl uppercase">Belum Ada Hadiah</h3>
                <p className="font-semibold">Tetapkan hadiah untuk motivasi kanak-kanak belajar lebih!</p>
                <Button onClick={() => setAddRewardOpen(true)}>+ Tambah Hadiah</Button>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {rewards.map((reward) => (
                  <RewardCard
                    key={reward.id}
                    reward={reward}
                    kid={kids.find((k) => k.id === reward.kid_id)}
                    onRedeem={redeemReward}
                    onDelete={deleteReward}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Subscription tab */}
        {tab === "subscription" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-6"
          >
            <h2 className="font-black text-2xl uppercase">Status Langganan</h2>
            <Card color={isSubscribed ? "mint" : "white"} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-xl uppercase">
                    {isSubscribed ? "✅ Langganan Aktif" : "❌ Tidak Berlangganan"}
                  </h3>
                  <p className="font-semibold text-sm text-gray-700 mt-1">
                    {isSubscribed
                      ? "Anda mempunyai akses penuh ke semua misi dan peringkat."
                      : "Langgan untuk buka semua misi dan peringkat pembelajaran."}
                  </p>
                </div>
                <Badge variant={isSubscribed ? "black" : "red"}>
                  {isSubscribed ? "AKTIF" : "TIDAK AKTIF"}
                </Badge>
              </div>
              {!isSubscribed && (
                <Link href="/pricing">
                  <Button fullWidth size="lg">Lihat Pelan Harga 💳</Button>
                </Link>
              )}
            </Card>
          </motion.div>
        )}
        {/* Ads tab (admin sahaja) */}
        {tab === "ads" && isAdmin && <AdsSettings />}
      </main>

      <AddKidModal open={addKidOpen} onClose={() => setAddKidOpen(false)} onAdd={addKid} />
      <AddRewardModal
        open={addRewardOpen}
        onClose={() => setAddRewardOpen(false)}
        kids={kids}
        onAdd={addReward}
      />
    </div>
  );
}
