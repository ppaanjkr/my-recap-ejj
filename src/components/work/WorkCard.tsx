"use client";

import type { WorkItem } from "@/types/work";
import { driveThumb, splitComma, statusLabel, typeLabel } from "@/lib/workUtils";
import { convertToThaiYear } from "@/lib/formatThaiDate";

export default function WorkCard({
  work,
  onClick,
}: {
  work: WorkItem;
  onClick?: () => void;
}) {
  const poster = driveThumb(work.poster);
  const platforms = splitComma(work.platforms);
  const statusText = statusLabel(work.status);

  return (
    <button
      type="button"
      onClick={onClick}
      className="col-span-12 md:col-span-6 w-full text-left rounded-lg border border-pinkLight bg-white shadow-md overflow-hidden hover:-translate-y-0.5 hover:shadow-lg transition"
    >
      <div className="grid grid-cols-12 gap-3 p-3">
        {/* Poster */}
        <div className="col-span-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-pinkSoft/30 flex items-center justify-center">
            {poster ? (
              <img src={poster} alt={work.title} className="h-full w-full object-cover" />
            ) : (
              <span className="text-2xl">🎬</span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="col-span-8 min-w-0">
          {/* Title + status */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="text-sm font-extrabold text-blackSoft line-clamp-2">
                {work.title}
              </div>
              <div className="mt-1 text-xs text-graySoft">
                {convertToThaiYear(work.year)} • {work.type}
              </div>
            </div>

            <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusText.cls}`}>
              {statusText.text}
            </span>
          </div>

          {/* character */}
          {work.character ? (
            <div className="mt-1 text-xs font-semibold text-pinkMain line-clamp-1">
              {work.character}
            </div>
          ) : null}

          {/* platforms */}
          {platforms.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {platforms.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-pinkLight bg-pinkSoft/20 px-2 py-0.5 text-[10px] font-semibold text-blackSoft"
                >
                  {p}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </button>
  );
}
