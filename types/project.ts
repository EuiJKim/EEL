/**
 * Projects — editorial / set-design / rental work where EEL's pieces appeared.
 * A different axis from Works (the sellable catalogue): Projects are prestige
 * assets, not products. No price/status; instead client, role, and which EEL
 * pieces were featured (cross-linked back to /works/[id]).
 */
export interface Project {
  id: string;            // 'w-magazine-2026'
  title: { en: string; ko: string };
  client: string;        // 'W Magazine'
  year: string;          // '2026'
  role: { en: string; ko: string }[]; // [{en:'Set Design',ko:'세트 디자인'}, ...]
  cover: string;         // hero image
  summary?: { en: string; ko: string };
  photos: string[];      // gallery images (rendered as masonry, natural ratio)
  /** IDs of JOURNAL_ENTRIES pieces that appear in this project. */
  featuredPieceIds?: string[];
}
