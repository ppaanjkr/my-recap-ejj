export const SECTION_IDS = [
  "about",
  "works",
  "videos",
  "music",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];