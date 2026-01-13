"use client";

import { MusicItem } from "@/types/music";
import { useMemo, useState } from "react";
import YoutubePlayer from "./YoutubePlayer";
import YoutubePlaylist from "./YoutubePlaylist";
import OtherMusic from "./OtherMusic";
import { splitMusic } from "@/lib/youtube";

interface Props {
  music: MusicItem[];
}

export default function MusicSection({ music }: Props) {
  const { youtubeMusic, otherMusic } = useMemo(() => splitMusic(music), [music]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const safeSelectedIndex = useMemo(() => {
    if (youtubeMusic.length === 0) return 0;
    return Math.min(selectedIndex, youtubeMusic.length - 1);
  }, [selectedIndex, youtubeMusic.length]);

  const current = youtubeMusic[safeSelectedIndex];

  if (!music || music.length === 0) return null;

  return (
    <section id="music" className="px-4 md:px-12 pb-6 text-blackSoft">
      <h2 className="flex items-center gap-2 text-sm font-semibold mb-1">
        <span className="text-sm">🎵</span> Music
      </h2>

      {youtubeMusic.length > 0 && (
        <div className="rounded-lg border border-pinkLight bg-white shadow-md overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            <YoutubePlayer current={current} />
            <YoutubePlaylist
              youtubeMusic={youtubeMusic}
              selectedIndex={safeSelectedIndex}
              onSelect={setSelectedIndex}
            />
          </div>
        </div>
      )}

      <OtherMusic items={otherMusic} />
    </section>
  );
}
