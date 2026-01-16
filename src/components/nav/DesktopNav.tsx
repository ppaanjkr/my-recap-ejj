"use client";

import type { SectionId } from "@/types/section";
import { scrollToTop } from "@/lib/scrollToTop";

const navItems: { id: SectionId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "works", label: "Works" },
  { id: "videos", label: "Videos" },
  { id: "music", label: "Music" },
];

export default function DesktopNav({
  activeSection,
  onChange,
}: {
  activeSection: SectionId;
  onChange: (id: SectionId) => void;
}) {
  return (
    <nav className="sticky top-0 z-40 hidden md:block bg-white border-b border-pinkLight/50 mb-5">
      <div className="flex justify-center gap-2 py-3">
        {navItems.map((item) => {
          const active = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onChange(item.id);
                scrollToTop();
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition
                ${
                  active
                    ? "bg-pinkMain text-white"
                    : "text-blackSoft hover:bg-pinkSoft/40"
                }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
