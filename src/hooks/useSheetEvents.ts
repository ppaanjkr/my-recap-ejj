"use client";

import { useEffect, useState } from "react";
import type { CalendarItem } from "@/types/calendar";
import { fetchEventsFromSheetTSV } from "@/lib/sheetClient";

export function useSheetEvents() {
  const [items, setItems] = useState<CalendarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const data = await fetchEventsFromSheetTSV();
        if (!alive) return;
        setItems(data);
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

  return { items, loading, error };
}
