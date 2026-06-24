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
 * Hero = first entry flagged `featured`, else the first entry. The rest are
 * grouped by the repeating CYCLE; the final row may be shorter than its size.
 */
export function buildSpreads(entries: FeedEntry[]): SpreadLayout {
  if (entries.length === 0) return { hero: null, rows: [] };

  const featuredIndex = entries.findIndex((e) => e.featured);
  const heroIndex = featuredIndex >= 0 ? featuredIndex : 0;
  const hero = entries[heroIndex];
  const rest = entries.filter((_, i) => i !== heroIndex);

  const rows: SpreadRow[] = [];
  let i = 0;
  let c = 0;
  while (i < rest.length) {
    const { kind, size } = CYCLE[c % CYCLE.length];
    rows.push({ kind, items: rest.slice(i, i + size) });
    i += size;
    c += 1;
  }
  return { hero, rows };
}
