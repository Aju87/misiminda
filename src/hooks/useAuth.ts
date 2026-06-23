"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Parent } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [parent, setParent] = useState<Parent | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) fetchParent(data.user.id);
      else setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchParent(session.user.id);
      else { setParent(null); setLoading(false); }
    });

    return () => listener.subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchParent(id: string) {
    const { data } = await supabase.from("parents").select("*").eq("id", id).single();
    setParent(data);
    setLoading(false);
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return { user, parent, loading, signOut, refetchParent: () => user && fetchParent(user.id) };
}
