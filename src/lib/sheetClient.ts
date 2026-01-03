import type { CalendarItem } from "@/types/calendar";

// const SHEET_TSV_URL = process.env.NEXT_PUBLIC_SHEET_TSV_URL ?? ""; 
const SHEET_TSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvOnidB4yVNl_TOOzjwcW_yu845NxyVM1w5xC_u-4hDvZ9t30q7aqznADzGxy_l2UJx6HLoU9z3_Yu/pub?gid=0&single=true&output=tsv";

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

export async function fetchEventsFromSheetTSV(): Promise<CalendarItem[]> {
  if (!SHEET_TSV_URL) throw new Error("Missing NEXT_PUBLIC_SHEET_TSV_URL");

  const res = await fetch(SHEET_TSV_URL, { cache: "no-store" });
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