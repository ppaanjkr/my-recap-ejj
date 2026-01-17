import { VideoItem, VideoSeries } from "@/types/video";
import { getYouTubeVideoId, youtubeThumb } from "./videoUtils";

export function groupVideos(items: VideoItem[]) {
  const map = new Map<string, Map<string, VideoSeries>>();

  items.forEach((item) => {
    const platform = item.platform;
    const parent = item.parentTitle;

    if (!map.has(platform)) {
      map.set(platform, new Map());
    }

    const platformMap = map.get(platform)!;

    if (!platformMap.has(parent)) {
      platformMap.set(parent, {
        platform,
        parentTitle: parent,
        episodes: [],
      });
    }

    const videoId =
      platform === "youtube" ? getYouTubeVideoId(item.link) ?? undefined : undefined;

    platformMap.get(parent)!.episodes.push({
      ...item,
      videoId,
      thumbnail:
        item.thumbnail ||
        (videoId ? youtubeThumb(videoId) : undefined),
    });
  });

  return Array.from(map.entries()).map(([platform, seriesMap]) => ({
    platform,
    series: Array.from(seriesMap.values()).map((s) => ({
      ...s,
      episodes: s.episodes.sort((a, b) =>
        (b.date ?? "").localeCompare(a.date ?? "")
      ),
    })),
  }));
}
