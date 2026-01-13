import { MusicItem } from "@/types/music";

export const getYouTubeVideoId = (url: string): string | null => {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const youtubeThumb = (videoId: string) =>
  `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

export function splitMusic(music: MusicItem[]) {
  const youtubeMusic = music.filter((i) => i.platform === "youtube");
  const otherMusic = music.filter((i) => i.platform !== "youtube");
  return { youtubeMusic, otherMusic };
}
