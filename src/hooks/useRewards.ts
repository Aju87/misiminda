"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Reward } from "@/types";

export function useRewards(parentId: string | undefined) {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchRewards = useCallback(async () => {
    if (!parentId) { setLoading(false); return; }
    const { data } = await supabase
      .from("rewards")
      .select("*")
      .eq("parent_id", parentId)
      .order("created_at", { ascending: false });
    setRewards(data ?? []);
    setLoading(false);
  }, [parentId, supabase]);

  useEffect(() => { fetchRewards(); }, [fetchRewards]);

  async function addReward(kid_id: string, reward_name: string, stars_required: number) {
    const { error } = await supabase.from("rewards").insert({
      parent_id: parentId,
      kid_id,
      reward_name,
      stars_required,
      is_redeemed: false,
    });
    if (!error) await fetchRewards();
    return { error };
  }

  async function redeemReward(id: string) {
    const { error } = await supabase
      .from("rewards")
      .update({ is_redeemed: true, redeemed_at: new Date().toISOString() })
      .eq("id", id);
    if (!error) await fetchRewards();
    return { error };
  }

  async function deleteReward(id: string) {
    const { error } = await supabase.from("rewards").delete().eq("id", id);
    if (!error) await fetchRewards();
    return { error };
  }

  return { rewards, loading, addReward, redeemReward, deleteReward, refetch: fetchRewards };
}
