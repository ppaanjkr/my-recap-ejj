"use client";

import { useEffect, useState } from "react";
import { ProfileImageFromSheet } from './../types/profile';
import { fetchProfileImagesFromSheetTSV } from "@/lib/sheetClient";

export function useSheetProfile(name: string) {
  const [profileImages, setProfileImages] = useState<ProfileImageFromSheet[]>([]);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string>("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const data = await fetchProfileImagesFromSheetTSV(name);
        if (!alive) return;
        setProfileImages(data);
      } catch (e: any) {
        if (!alive) return;
        setProfileError(e?.message ?? "Unknown error");
      } finally {
        if (!alive) return;
        setProfileLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return { profileImages, profileLoading, profileError };
}
