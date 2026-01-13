"use client";

import { useEffect, useState } from "react";
import { MusicItem } from "@/types/music";
import { fetchMusicsFromSheetTSV } from "@/lib/sheetClient";

export function useSheetMusics(name: string) {
  const [music, setMusics] = useState<MusicItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const data = await fetchMusicsFromSheetTSV(name);
        if (!alive) return;
        setMusics(data);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message ?? "Unknown error");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return { music, loading, error };
}
