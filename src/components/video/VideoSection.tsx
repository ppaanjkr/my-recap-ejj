"use client";

import { useEffect, useMemo, useState } from "react";
import { VideoItem, VideoSeries } from "@/types/video";
import { groupVideos } from "@/utils/videoMapper";
import VideoSeriesList from "./VideoSeriesList";
import VideoSeriesDetail from "./VideoSeriesDetail";

function formatThaiDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T00:00:00`);
  if (isNaN(d.getTime())) return dateStr;

  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
}

function getYouTubeVideoId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:.*v=|v\/|embed\/)|youtu\.be\/)([^"&?\/\s]{11})/;
  const m = url.match(regex);
  return m ? m[1] : null;
}

function youtubeThumb(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

// ดึง title จาก oembed
async function fetchYouTubeTitle(url: string) {
  try {
    const oembed = `https://www.youtube.com/oembed?url=${encodeURIComponent(
      url
    )}&format=json`;
    const res = await fetch(oembed);
    if (!res.ok) return "";
    const data = await res.json();
    return (data?.title ?? "") as string;
  } catch {
    return "";
  }
}

export default function VideoSection({ videos }: { videos: VideoItem[] }) {
    
    const [activeSeries, setActiveSeries] = useState<VideoSeries | null>(null);
    const [enriched, setEnriched] = useState<VideoItem[]>(videos);
    const grouped = useMemo(() => groupVideos(enriched), [enriched]);

  useEffect(() => {
    let alive = true;

    async function run() {
      const next = await Promise.all(
        videos.map(async (it) => {
          if (it.platform !== "youtube") { // เดี๋ยวกลับมาทำพวก social อันอื่น
            return it;
          }

          const vid = getYouTubeVideoId(it.link);
          const thumb = it.thumbnail?.trim()
            ? it.thumbnail
            : vid
            ? youtubeThumb(vid)
            : "";

          // ถ้ามี title อยู่แล้ว ไม่ fetch
          if (it.title?.trim()) {
            return { ...it, thumbnail: thumb || it.thumbnail };
          }

          // fetch title from oEmbed
          const title = await fetchYouTubeTitle(it.link);
          return {
            ...it,
            title: title || it.title,
            thumbnail: thumb || it.thumbnail,
          };
        })
      );

      if (alive) setEnriched(next);
    }

    run();
    return () => {
      alive = false;
    };
  }, [videos]);

  return (
    <section id="videos" className="px-4 md:px-12 pb-6 text-blackSoft">
      <h2 className="flex items-center gap-2 text-sm font-semibold mb-2">
        <span className="text-sm">🎬</span> Videos
      </h2>

      {!activeSeries ? (

          <VideoSeriesList
            data={grouped}
            onSelect={(series) => {
              if (series.episodes.length === 1) {
                window.open(series.episodes[0].link, "_blank");
              } else {
                setActiveSeries(series);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          />

      ) : (
        <VideoSeriesDetail
          series={activeSeries}
          onBack={() => setActiveSeries(null)}
        />
      )}
    </section>
  );
}
