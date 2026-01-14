"use client";

import type { WorkItem } from "@/types/work";
import WorkCard from "./WorkCard";

export default function WorksSection({
  works,
  onWorkClick,
}: {
  works: WorkItem[];
  onWorkClick?: (work: WorkItem) => void;
}) {
  if (!works || works.length === 0) return null;

  return (
    <section id="works" className="px-4 md:px-12 pb-6 text-blackSoft">
      <h2 className="flex items-center gap-2 text-sm font-semibold mb-2">
        <span className="text-sm">🎬</span> Works
      </h2>
      <div className="h-[400px] overflow-y-auto border-gray-50 md:h-auto md:overflow-hidden">
        <div className="grid grid-cols-12 gap-2">
          {works.map((w, i) => (
            <WorkCard
              key={`${w.year}-${w.title}-${i}`}
              work={w}
              onClick={() => onWorkClick?.(w)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
