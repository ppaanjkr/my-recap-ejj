"use client";

import { useEffect, useState } from "react";
import { Supporter } from './../types/supporter';
import { fetchSupportersFromSheetTSV } from "@/lib/sheetClient";

export function useSheetSupporters(name: string) {
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [supportersLoading, setSupportersLoading] = useState(true);
  const [supportersError, setSupportersError] = useState<string>("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const data = await fetchSupportersFromSheetTSV(name);
        if (!alive) return;
        setSupporters(data);
      } catch (e: any) {
        if (!alive) return;
        setSupportersError(e?.message ?? "Unknown error");
      } finally {
        if (!alive) return;
        setSupportersLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return { supporters, supportersLoading, supportersError };
}
