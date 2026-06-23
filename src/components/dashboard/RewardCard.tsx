"use client";

import { Badge, Button } from "@/components/ui";
import type { Reward, Kid } from "@/types";

interface RewardCardProps {
  reward: Reward;
  kid?: Kid;
  onRedeem: (id: string) => Promise<{ error: unknown }>;
  onDelete: (id: string) => Promise<{ error: unknown }>;
}

export function RewardCard({ reward, kid, onRedeem, onDelete }: RewardCardProps) {
  const canRedeem = kid && kid.total_stars >= reward.stars_required && !reward.is_redeemed;
  const progress = kid
    ? Math.min((kid.total_stars / reward.stars_required) * 100, 100)
    : 0;

  return (
    <div
      style={{
        boxShadow: reward.is_redeemed
          ? "none"
          : "4px 4px 0px 0px rgba(0,0,0,1)",
        opacity: reward.is_redeemed ? 0.7 : 1,
      }}
      className="border-4 border-black rounded-2xl bg-white overflow-hidden"
    >
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase">{kid?.name}</p>
            <h3 className="font-black text-lg leading-tight">{reward.reward_name}</h3>
          </div>
          {reward.is_redeemed ? (
            <Badge variant="mint">✅ Ditebus</Badge>
          ) : (
            <Badge variant="yellow">⭐ {reward.stars_required}</Badge>
          )}
        </div>

        {/* Progress bar */}
        {!reward.is_redeemed && (
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>{kid?.total_stars ?? 0} bintang</span>
              <span>{reward.stars_required} diperlukan</span>
            </div>
            <div className="h-3 bg-gray-100 border-2 border-black rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FFB800] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {canRedeem && (
            <Button variant="mint" size="sm" fullWidth onClick={() => onRedeem(reward.id)}>
              Tebus Hadiah 🎁
            </Button>
          )}
          {!reward.is_redeemed && (
            <button
              onClick={() => onDelete(reward.id)}
              className="border-2 border-black rounded-lg px-3 py-1.5 text-sm font-black hover:bg-[#FF6B6B] transition-colors"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
