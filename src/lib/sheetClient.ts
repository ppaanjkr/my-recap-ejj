import type { CalendarItem } from "@/types/calendar";
import { MusicItem } from "@/types/music";
import { VideoItem } from "@/types/video";
import { WorkItem } from "@/types/work";

// const SHEET_TSV_URL = process.env.NEXT_PUBLIC_SHEET_TSV_URL ?? ""; 
// const SHEET_TSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvOnidB4yVNl_TOOzjwcW_yu845NxyVM1w5xC_u-4hDvZ9t30q7aqznADzGxy_l2UJx6HLoU9z3_Yu/pub?gid=0&single=true&output=tsv";
const SHEET_TSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvOnidB4yVNl_TOOzjwcW_yu845NxyVM1w5xC_u-4hDvZ9t30q7aqznADzGxy_l2UJx6HLoU9z3_Yu/pub";
const SHEETS = {
  events: `${SHEET_TSV_URL}?gid=0&single=true&output=tsv`,
  musics: `${SHEET_TSV_URL}?gid=1443708484&single=true&output=tsv`,
  works: `${SHEET_TSV_URL}?gid=433014224&single=true&output=tsv`,
  video: `${SHEET_TSV_URL}?gid=698776223&single=true&output=tsv`,
};

// get id from drive to thumbnail url
function getGoogleDriveThumbnail(url: string) {
  if (!url) return "";
  const trimUrl = url.trim();
  if (!trimUrl.includes("/")) return `https://drive.google.com/thumbnail?id=${trimUrl}&sz=w800`;
  const match = trimUrl.match(/\/d\/([^/]+)/);
  const id = match ? match[1] : trimUrl;
  return `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
}
function splitImages(v: string) {
  if (!v) return [];
  return v.split(",").map((s) => s.trim()).filter(Boolean).map(getGoogleDriveThumbnail);
}

function splitComma(v: string) {
  if (!v) return [];
  return v.split(",").map((s) => s.trim()).filter(Boolean);
}

function toBool(v: string) {
  const s = (v ?? "").trim().toLowerCase();
  return s === "true" || s === "1" || s === "yes";
}

function splitArtists(v: string) {
  return (v ?? "")
    .split(",")
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);
}

function matchArtist(cell: string, artist: string) {
  if (!artist) return true;
  return splitArtists(cell).includes(artist.toLowerCase());
}


export async function fetchEventsFromSheetTSV(): Promise<CalendarItem[]> {
  if (!SHEET_TSV_URL) throw new Error("Missing NEXT_PUBLIC_SHEET_TSV_URL");

  const res = await fetch(SHEETS.events, { cache: "no-store" });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

  const tsv = await res.text();
  const lines = tsv.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const header = lines[0].split("\t").map((h) => h.trim());
  const idx = (name: string) => header.indexOf(name);
  const dayCounter = new Map<string, number>();
  const items: CalendarItem[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split("\t");
    const get = (name: string) => {
      const j = idx(name);
      return j >= 0 ? (cols[j] ?? "").trim() : "";
    };

    const date = get("date");
    const title = get("title");
    if (!date || !title) continue;

    const count = dayCounter.get(date) ?? 0;
    dayCounter.set(date, count + 1);
    const id = `${date}-${String(count + 1).padStart(2, "0")}`;

    items.push({
      id,
      date,
      title,
      desc: get("desc") || undefined,
      images: splitImages(get("images")), 
      artists: splitComma(get("artists")), 
      hashtag: splitComma(get("hashtag")), 
      meeting: toBool(get("meeting")),
      keyword: get("keyword") || undefined,
      urlYoutube: get("urlYoutube") || undefined,
      urlFacebook: get("urlFacebook") || undefined,
      urlInstagram: get("urlInstagram") || undefined,
      urlTwitter: get("urlTwitter") || undefined,
      urlTiktok: get("urlTiktok") || undefined,
    });
  }
  return items;
}

export async function fetchMusicsFromSheetTSV(name: string) {
  if (!SHEET_TSV_URL) throw new Error("Missing NEXT_PUBLIC_SHEET_TSV_URL");

  const res = await fetch(SHEETS.musics, { cache: "no-store" });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const tsv = await res.text();
  const lines = tsv.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const header = lines[0].split("\t").map((h) => h.trim());
  const idx = (name: string) => header.indexOf(name);
  const dayCounter = new Map<string, number>();
  const items: MusicItem[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split("\t");
    const get = (name: string) => {
      const j = idx(name);
      return j >= 0 ? (cols[j] ?? "").trim() : "";
    };
    const date = get("date");
    const title = get("title");
    const count = dayCounter.get(date) ?? 0;
    if (!date || !title) continue;

    const id = `${date}-${String(count + 1).padStart(2, "0")}`;

    items.push({
      id,
      date,
      type: get("type"),
      title,
      artist: get("artists"),
      thumbnail: get("coverImage"),
      platform: get("platform"),
      link: get("url"),
    });
  }
  const filtered = items
    .filter((item) => matchArtist(item.artist ?? "", name))
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  return filtered;
}

  const statusRank = (s?: string) => {
    // 0 on-air 
    // 1 coming soon 
    // 9 finished 
    if (s === "1") return 0;
    if (s === "0") return 1;
    if (s === "9") return 2;
    return 3; 
  };
export async function fetchWorksFromSheetTSV(name: string) {
  if (!SHEET_TSV_URL) throw new Error("Missing NEXT_PUBLIC_SHEET_TSV_URL");

  const res = await fetch(SHEETS.works, { cache: "no-store" });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const tsv = await res.text();
  const lines = tsv.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const header = lines[0].split("\t").map((h) => h.trim());
  const idx = (name: string) => header.indexOf(name);
  const dayCounter = new Map<string, number>();
  const items: WorkItem[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split("\t");
    const get = (name: string) => {
      const j = idx(name);
      return j >= 0 ? (cols[j] ?? "").trim() : "";
    };
    const year = get("year");
    const title = get("title");
    const count = dayCounter.get(year) ?? 0;
    if (!year || !title) continue;

    const id = `${year}-${String(count + 1).padStart(2, "0")}`;

    items.push({
      id,
      year,
      title,
      type: get("type"),
      desc: get("desc"),
      poster: get("poster"),
      artist: get("artist"),
      character: get("character"),
      platforms: get("platforms"),
      status: get("status"),
    });
  }
  const filtered = items
    .filter((item) => matchArtist(item.artist ?? "", name))
    .sort((a, b) => {
      const ra = statusRank(a.status);
      const rb = statusRank(b.status);
      if (ra !== rb) return ra - rb; // ✅ status
      return (b.year ?? "").localeCompare(a.year ?? ""); // ปีใหม่→เก่า
    });
  return filtered;
}

export async function fetchVideosFromSheetTSV(name: string) {
  if (!SHEET_TSV_URL) throw new Error("Missing NEXT_PUBLIC_SHEET_TSV_URL");

  const res = await fetch(SHEETS.video, { cache: "no-store" });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const tsv = await res.text();
  const lines = tsv.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const header = lines[0].split("\t").map((h) => h.trim());
  const idx = (name: string) => header.indexOf(name);
  const dayCounter = new Map<string, number>();
  const items: VideoItem[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split("\t");
    const get = (name: string) => {
      const j = idx(name);
      return j >= 0 ? (cols[j] ?? "").trim() : "";
    };
    const date = get("date");
    const title = get("title");
    const count = dayCounter.get(date) ?? 0;
    if (!date || !title) continue;

    const id = `${date}-${String(count + 1).padStart(2, "0")}`;

    items.push({
      id,
      date,
      title,
      parentTitle: get("parentTitle"),
      artists: get("artists"),
      platform: get("platform"),
      link: get("url"),
      thumbnail: get("thumbnail")
    });
  }
  const filtered = items
    .filter((item) => matchArtist(item.artists ?? "", name))
    .sort((a, b) => {
      return (b.date ?? "").localeCompare(a.date ?? "");
    });
  return filtered;
}