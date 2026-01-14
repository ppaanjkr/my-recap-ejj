"use client";

import { useEffect, useState } from "react";
import { WorkItem } from "@/types/work";
import { fetchWorksFromSheetTSV } from "@/lib/sheetClient";

export function useSheetWorks(name: string) {
  const [work, setWorks] = useState<WorkItem[]>([]);
  const [workLoading, setWorkLoading] = useState(true);
  const [workError, setWorkError] = useState<string>("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const data = await fetchWorksFromSheetTSV(name);
        if (!alive) return;
        setWorks(data);
      } catch (e: any) {
        if (!alive) return;
        setWorkError(e?.message ?? "Unknown error");
      } finally {
        if (!alive) return;
        setWorkLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return { work, workLoading, workError };
}
