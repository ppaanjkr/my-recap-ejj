// utils/calendar-helpers.ts
export const ARTIST_ICON: Record<string, string> = {
  june: "/artist/june.png",
  enjoy: "/artist/enjoy.png",
};

export const pad2 = (n: number) => String(n).padStart(2, "0");
export const ymd = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
export const monthLabelTH = (d: Date) => d.toLocaleDateString("th-TH", { month: "long", year: "numeric" });
export const parseYMD = (dateStr: string) => new Date(`${dateStr}T00:00:00`);
export const formatThaiFull = (dateStr: string) => 
  parseYMD(dateStr).toLocaleDateString("th-TH", { weekday: "long", day: "numeric", month: "long", year: "numeric" });