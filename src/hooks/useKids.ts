"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Kid } from "@/types";

export function useKids(parentId: string | undefined) {
  const [kids, setKids] = useState<Kid[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchKids = useCallback(async () => {
    if (!parentId) { setLoading(false); return; }
    const { data } = await supabase
      .from("kids")
      .select("*")
      .eq("parent_id", parentId)
      .order("created_at");
    setKids(data ?? []);
    setLoading(false);
  }, [parentId, supabase]);

  useEffect(() => { fetchKids(); }, [fetchKids]);

  async function addKid(name: string, age_group: Kid["age_group"], avatar_url: string) {
    const { error } = await supabase.from("kids").insert({
      parent_id: parentId,
      name,
      age_group,
      avatar_url,
      total_stars: 0,
    });
    if (!error) await fetchKids();
    return { error };
  }

  async function updateKid(id: string, updates: Partial<Pick<Kid, "name" | "age_group" | "avatar_url">>) {
    const { error } = await supabase.from("kids").update(updates).eq("id", id);
    if (!error) await fetchKids();
    return { error };
  }

  async function deleteKid(id: string) {
    const { error } = await supabase.from("kids").delete().eq("id", id);
    if (!error) await fetchKids();
    return { error };
  }

  return { kids, loading, addKid, updateKid, deleteKid, refetch: fetchKids };
}
