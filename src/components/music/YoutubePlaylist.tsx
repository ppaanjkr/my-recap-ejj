"use client";

import { MusicItem } from "@/types/music";
import { getYouTubeVideoId, youtubeThumb } from "@/lib/youtube";

export default function YoutubePlaylist({
  youtubeMusic,
  selectedIndex,
  onSelect,
}: {
  youtubeMusic: MusicItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  const safeSelectedIndex =
    youtubeMusic.length === 0
      ? 0
      : Math.min(selectedIndex, youtubeMusic.length - 1);

  return (
    <div className="w-full lg:w-1/3 lg:border-l border-pinkLight/60 flex flex-col">
      <div className="px-4 py-3 bg-pinkSoft/20 border-b border-pinkLight/60 flex items-center justify-between">
        <span className="text-xs font-extrabold text-blackSoft">Playlist</span>
        <span className="text-xs text-graySoft">{youtubeMusic.length} videos</span>
      </div>

      {/* ✅ scroll */}
      <div className="max-h-[300px] lg:max-h-[400px] overflow-y-auto">
        {youtubeMusic.map((item, index) => {
          const isActive = index === safeSelectedIndex;
          const id = getYouTubeVideoId(item.link);
          const thumb = item.thumbnail || (id ? youtubeThumb(id) : "") || "";

          return (
            <button
              key={item.id}
              onClick={() => onSelect(index)}
              className={[
                "w-full p-3 flex gap-3 items-center text-left transition-colors border-b border-pinkLight/40",
                isActive ? "bg-pinkSoft/30" : "hover:bg-pinkSoft/15",
              ].join(" ")}
            >
              {/* playing */}
              <div className="w-6 flex-shrink-0 text-center">
                {isActive ? (
                  <div className="flex items-center justify-center gap-[2px]">
                    <span className="w-[3px] h-3 bg-pinkMain rounded-full animate-pulse" />
                    <span className="w-[3px] h-4 bg-pinkMain rounded-full animate-pulse delay-75" />
                    <span className="w-[3px] h-2 bg-pinkMain rounded-full animate-pulse delay-150" />
                  </div>
                ) : (
                  <span className="text-xs text-graySoft">{index + 1}</span>
                )}
              </div>

              {/* thumbnail */}
              <div className="relative w-20 h-12 flex-shrink-0 rounded overflow-hidden bg-pinkSoft/30">
                {thumb ? (
                  <img
                    src={thumb}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-sm">🎵</span>
                  </div>
                )}
              </div>

              {/* info */}
              <div className="flex-1 min-w-0">
                <p
                  className={[
                    "text-xs font-extrabold line-clamp-2",
                    isActive ? "text-pinkMain" : "text-blackSoft",
                  ].join(" ")}
                >
                  {item.title}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] text-graySoft">{item.type}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
