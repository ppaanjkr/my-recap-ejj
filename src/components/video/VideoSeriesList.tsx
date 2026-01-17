"use client";

import { VideoSeries } from "@/types/video";
import { platformIcon } from "@/utils/videoUtils";
import { getYouTubeVideoId, youtubeThumb } from "@/lib/youtube";
import { ChevronRight, ExternalLink } from "lucide-react";

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

export default function VideoSeriesList({
  data,
  onSelect,
}: {
  data: { platform: string; series: VideoSeries[] }[];
  onSelect: (series: VideoSeries) => void;
}) {

  const allSeries = data.flatMap((g) => g.series);
  // sort ตามวันที่ตอนล่าสุดของแต่ละรายการ
  const sorted = [...allSeries].sort((a, b) => {
    const aLast = a.episodes?.[0]?.date ?? "";
    const bLast = b.episodes?.[0]?.date ?? "";
    return bLast.localeCompare(aLast);
  });

  return (
    <div className="grid grid-cols-12 gap-3">
      {sorted.map((s) => {
        const epCount = s.episodes.length;
        const latest = s.episodes[0];

        const videoId = getYouTubeVideoId(latest?.link ?? "");
        const thumb =
          (latest?.thumbnail && latest.thumbnail.trim()) ||
          (videoId ? youtubeThumb(videoId) : "");

        return (
          <button
            key={s.parentTitle}
            onClick={() => onSelect(s)}
            className="col-span-12 md:col-span-6 w-full text-left rounded-lg border border-pinkLight bg-white hover:bg-pinkSoft/15 transition p-3 flex gap-3"
          >
            {/* thumb */}
            <div className="w-24 h-14 rounded-lg overflow-hidden bg-pinkSoft/30 flex items-center justify-center shrink-0">
              {thumb ? (
                <img
                  src={thumb}
                  alt={s.parentTitle}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span className="text-lg">
                  {platformIcon(latest?.platform ?? "")}
                </span>
              )}
            </div>

            {/* info */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-extrabold text-blackSoft line-clamp-2">
                {epCount === 1 ? latest?.title : s.parentTitle}
              </div>

              {epCount === 1 ? (
                <div className="mt-1 text-xs text-graySoft flex items-center gap-2">
                  <span>{formatThaiDate(latest?.date)}</span>
                </div>
              ) : (
                <div className="mt-1 text-xs text-graySoft flex items-center gap-2">
                  <span>{formatThaiDate(latest?.date)}</span>
                  <span>•</span>
                  <span>
                    {epCount} EP{epCount > 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>

            <div className="self-center text-xs text-graySoft">
              {epCount > 1 ? <ChevronRight width={16} /> : <ExternalLink width={12}/>}
            </div>
          </button>
        );
      })}
    </div>
  );
}
