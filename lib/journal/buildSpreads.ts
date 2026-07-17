import type { FeedEntry } from '@/types/journal';

export type RowKind = 'largeDuo' | 'triptych' | 'duo';

export interface SpreadRow {
  kind: RowKind;
  items: FeedEntry[];
}

export interface SpreadLayout {
  hero: FeedEntry | null;
  rows: SpreadRow[];
}

/** Repeating editorial rhythm: big+two-small, then a triptych, then a duo. */
const CYCLE: { kind: RowKind; size: number }[] = [
  { kind: 'largeDuo', size: 3 },
  { kind: 'triptych', size: 3 },
  { kind: 'duo', size: 2 },
];

/**
 * Turn a flat list of works into a hero + magazine-style spread rows.
 * Hero = first entry flagged `featured`. If none is flagged, the first entry
 * becomes the hero UNLESS `leadingDuoRows` is set — that opts out of the
 * fallback hero so the feed can lead with plain 2-up rows instead (used to
 * keep the newest arrivals as equal-weight pairs at the top). An explicit
 * `featured` entry always wins regardless of `leadingDuoRows`. The rest are
 * grouped by the repeating CYCLE; the final row may be shorter than its size.
 */
export function buildSpreads(entries: FeedEntry[], leadingDuoRows = 0): SpreadLayout {
  if (entries.length === 0) return { hero: null, rows: [] };

  const featuredIndex = entries.findIndex((e) => e.featured);
  const heroIndex = featuredIndex >= 0 ? featuredIndex : leadingDuoRows === 0 ? 0 : -1;
  const hero = heroIndex >= 0 ? entries[heroIndex] : null;
  const rest = heroIndex >= 0 ? entries.filter((_, i) => i !== heroIndex) : entries;

  const rows: SpreadRow[] = [];
  let i = 0;
  let c = 0;

  for (let d = 0; d < leadingDuoRows && i < rest.length; d++) {
    rows.push({ kind: 'duo', items: rest.slice(i, i + 2) });
    i += 2;
  }

  while (i < rest.length) {
    const { kind, size } = CYCLE[c % CYCLE.length];
    rows.push({ kind, items: rest.slice(i, i + size) });
    i += size;
    c += 1;
  }
  return { hero, rows };
}
