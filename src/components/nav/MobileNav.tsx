"use client";

import { User, Film, PlayCircle, Music } from "lucide-react";
import type { SectionId } from "@/types/section";
import { scrollToTop } from "@/lib/scrollToTop";

const navItems = [
  { id: "about", label: "About", icon: <User size={18} /> },
  { id: "works", label: "Works", icon: <Film size={18} /> },
  { id: "videos", label: "Videos", icon: <PlayCircle size={18} /> },
  { id: "music", label: "Music", icon: <Music size={18} /> },
] as const;

export default function MobileNav({
  activeSection,
  onChange,
}: {
  activeSection: SectionId;
  onChange: (id: SectionId) => void;
}) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-pinkLight md:hidden">
      <div className="flex h-14">
        {navItems.map((item) => {
          const active = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onChange(item.id);
                scrollToTop();
              }}
              className={`flex-1 flex flex-col items-center justify-center text-[10px] font-semibold
                ${active ? "text-pinkMain" : "text-graySoft"}`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
