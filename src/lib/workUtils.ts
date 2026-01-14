export function splitComma(v?: string) {
  if (!v) return [];
  return v.split(",").map(s => s.trim()).filter(Boolean);
}

// รองรับ drive link แบบ file/d/ID/view?..., หรือให้มาเป็น ID ตรงๆ
export function driveThumb(urlOrId?: string) {
  const v = (urlOrId ?? "").trim();
  if (!v) return "";

  // plain id
  if (/^[a-zA-Z0-9_-]{10,}$/.test(v) && !v.includes("/")) {
    return `https://drive.google.com/thumbnail?id=${v}&sz=w800`;
  }

  // https://drive.google.com/file/d/<ID>/view?...
  const m1 = v.match(/\/file\/d\/([^/]+)/);
  if (m1?.[1]) return `https://drive.google.com/thumbnail?id=${m1[1]}&sz=w800`;

  // .../d/<ID>/...
  const m2 = v.match(/\/d\/([^/]+)/);
  if (m2?.[1]) return `https://drive.google.com/thumbnail?id=${m2[1]}&sz=w800`;

  // ...?id=<ID>
  const m3 = v.match(/[?&]id=([^&]+)/);
  if (m3?.[1]) return `https://drive.google.com/thumbnail?id=${m3[1]}&sz=w800`;

  return "";
}


export function statusLabel(status?: string) {
  if (status === "1") return { text: "Coming soon", cls: "bg-pinkSoft/40 border-pinkLight text-blackSoft" };
  if (status === "9") return { text: "Finished", cls: "bg-gray-100 border-gray-200 text-graySoft" };
  return { text: "On-air", cls: "bg-pinkMain/15 border-pinkLight text-pinkMain" };
}

export function typeLabel(type?: string) {
  if (type === "series") return "Series";
  if (type === "movie") return "Movie";
  if (type === "mc") return "MC";
  if (type === "vc") return "VC";
  return "Work";
}
