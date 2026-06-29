"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Level, Question, KidProgress, QuizMode } from "@/types";

export function useGameData(kidId: string | undefined, ageGroup: string | undefined, quizMode: QuizMode = "misi") {
  const [levels, setLevels] = useState<Level[]>([]);
  const [progress, setProgress] = useState<KidProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchData = useCallback(async () => {
    if (!kidId || !ageGroup) { setLoading(false); return; }

    const [{ data: lvls }, { data: prog }] = await Promise.all([
      supabase.from("levels").select("*").eq("age_group", ageGroup).eq("quiz_mode", quizMode).order("level_number"),
      supabase.from("kid_progress").select("*").eq("kid_id", kidId),
    ]);

    setLevels(lvls ?? []);
    setProgress(prog ?? []);
    setLoading(false);
  }, [kidId, ageGroup, quizMode, supabase]);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function fetchQuestions(levelId: string): Promise<Question[]> {
    const { data } = await supabase
      .from("questions")
      .select("*")
      .eq("level_id", levelId)
      .order("order_index");
    return data ?? [];
  }

  async function saveProgress(levelId: string, starsEarned: number, completed: boolean) {
    if (!kidId) return;
    const existing = progress.find((p) => p.level_id === levelId);

    if (existing) {
      await supabase
        .from("kid_progress")
        .update({
          stars_earned: Math.max(existing.stars_earned, starsEarned),
          completed: existing.completed || completed,
          completed_at: completed ? new Date().toISOString() : existing.completed_at,
        })
        .eq("kid_id", kidId)
        .eq("level_id", levelId);
    } else {
      await supabase.from("kid_progress").insert({
        kid_id: kidId,
        level_id: levelId,
        questions_answered: 0,
        stars_earned: starsEarned,
        completed,
        completed_at: completed ? new Date().toISOString() : null,
      });
    }
    await fetchData();
  }

  function getProgress(levelId: string) {
    return progress.find((p) => p.level_id === levelId);
  }

  return { levels, progress, loading, fetchQuestions, saveProgress, getProgress };
}
