"use client";

import { MusicItem } from "@/types/music";

export default function OtherMusic({ items }: { items: MusicItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="mt-2">
      <h3 className="text-xs font-semibold text-graySoft px-1">รับชมเพิ่มเติม</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-pinkLight bg-white shadow-md p-3 flex gap-3 items-center hover:-translate-y-0.5 hover:shadow-lg transition"
          >
            {/* Thumbnail */}
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-pinkSoft/30 flex items-center justify-center flex-shrink-0">
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span className="text-sm">🎵</span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="font-extrabold text-blackSoft text-sm line-clamp-1">
                {item.title}
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-pinkLight bg-pinkSoft/20 px-2 py-0.5 text-[10px] font-semibold text-blackSoft">
                  {item.platform}
                </span>

                <span className="text-[10px] text-graySoft">{item.type}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
