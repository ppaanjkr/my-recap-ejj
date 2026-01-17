"use client";

import { useState } from "react";
import { VideoSeries } from "@/types/video";
import { platformIcon } from "@/utils/videoUtils";
import { getYouTubeVideoId, youtubeThumb } from "@/lib/youtube";
import { ArrowLeft, ChevronLeft } from "lucide-react";

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

export default function VideoSeriesDetail({
  series,
  onBack,
}: {
  series: VideoSeries;
  onBack: () => void;
}) {
  const [current] = useState(series.episodes[0]);

  return (
    <div className="space-y-3">
      <button
        onClick={() => {
          onBack();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="inline-flex items-center gap-1 text-xs font-semibold text-pinkMain hover:underline"
      >
        <ChevronLeft width={14} />
        กลับไปหน้ารายการ
      </button>

      <div className="">
        <div className="text-sm flex gap-x-3">
          <span className="font-extrabold text-blackSoft">{series.parentTitle}</span>
          <span className="text-graySoft">({series.episodes.length} EP{series.episodes.length > 1 ? "s" : ""})</span>
        </div>
      </div>

      {/* ep list */}
      <div className="grid grid-cols-12 gap-3">
        {series.episodes.map((ep, idx) => {
          const videoId = getYouTubeVideoId(ep?.link ?? "");
          const thumb =
            (ep?.thumbnail && ep.thumbnail.trim()) ||
            (videoId ? youtubeThumb(videoId) : "");

          return (
            <button
              key={ep.id}
              onClick={() =>
                window.open(ep.link, "_blank", "noopener,noreferrer")
              }
              className="col-span-12 md:col-span-6 lg:col-span-4 w-full text-left rounded-lg border border-pinkLight bg-white hover:bg-pinkSoft/15 transition p-3 flex gap-3"
            >
              {/* thumb */}
              <div className="w-24 h-14 rounded-lg overflow-hidden bg-pinkSoft/30 flex items-center justify-center shrink-0">
                {thumb ? (
                  <img
                    src={thumb}
                    alt={ep.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-lg">{platformIcon(ep.platform)}</span>
                )}
              </div>

              {/* info */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-extrabold text-blackSoft line-clamp-2">
                  {ep.title}
                </div>
                <div className="mt-1 text-xs text-graySoft">
                  {formatThaiDate(ep.date)}
                </div>
              </div>

              <div className="self-center text-xs text-graySoft">{idx + 1}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
