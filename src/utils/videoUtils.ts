export function getYouTubeVideoId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:.*v=|v\/|embed\/)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function youtubeThumb(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function platformIcon(platform: string) {
  switch (platform) {
    case "youtube":
      return "▶️";
    case "tiktok":
      return "🎵";
    case "instagram":
      return "📸";
    case "facebook":
      return "📘";
    default:
      return "🎬";
  }
}
