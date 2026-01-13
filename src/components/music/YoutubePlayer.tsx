"use client";

import { MusicItem } from "@/types/music";
import { getYouTubeVideoId } from "@/lib/youtube";

export default function YoutubePlayer({ current }: { current?: MusicItem }) {
  const currentVideoId = current ? getYouTubeVideoId(current.link) : null;

  return (
    <div className="w-full lg:w-2/3 flex flex-col">
      <div className="relative aspect-video bg-black flex-shrink-0">
        {currentVideoId ? (
          <iframe
            key={currentVideoId}
            src={`https://www.youtube-nocookie.com/embed/${currentVideoId}?rel=0&autoplay=1`}
            title={current?.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share autoplay"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-pinkSoft/30">
            <div className="text-center">
              <span className="text-sm">🎵</span>
              <p className="text-graySoft text-sm">Video preview unavailable</p>
            </div>
          </div>
        )}
      </div>

      {/* info */}
      <div className="p-4 border-b border-pinkLight/60 lg:border-b-0">
        <div className="flex items-center gap-x-3">
          <span className="inline-flex items-center rounded-full border border-pinkLight bg-pinkSoft/30 px-3 py-1 text-xs font-semibold">
            {current?.type}
          </span>
          <span className="font-semibold line-clamp-2">{current?.title}</span>
        </div>
      </div>
    </div>
  );
}
