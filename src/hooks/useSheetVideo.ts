"use client";

import { useEffect, useState } from "react";
import { VideoItem } from "@/types/video";
import { fetchVideosFromSheetTSV } from "@/lib/sheetClient";

export function useSheetVideo(name: string) {
  const [video, setVideo] = useState<VideoItem[]>([]);
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState<string>("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const data = await fetchVideosFromSheetTSV(name);
        if (!alive) return;
        setVideo(data);
      } catch (e: any) {
        if (!alive) return;
        setVideoError(e?.message ?? "Unknown error");
      } finally {
        if (!alive) return;
        setVideoLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return { video, videoLoading, videoError };
}
