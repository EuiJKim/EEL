import { describe, it, expect } from 'vitest';
import { buildSpreads } from '@/lib/journal/buildSpreads';
import type { FeedEntry } from '@/types/journal';

const mk = (id: string, featured = false): FeedEntry => ({
  id,
  category: 'object',
  title: id,
  image: `/x/${id}.jpg`,
  ...(featured ? { featured: true } : {}),
});

describe('buildSpreads', () => {
  it('빈 배열 → hero null, rows 빈 배열', () => {
    expect(buildSpreads([])).toEqual({ hero: null, rows: [] });
  });

  it('featured가 있으면 그게 hero', () => {
    const entries = [mk('a'), mk('b', true), mk('c')];
    const { hero } = buildSpreads(entries);
    expect(hero?.id).toBe('b');
  });

  it('featured가 없으면 첫 작품이 hero', () => {
    const { hero } = buildSpreads([mk('a'), mk('b')]);
    expect(hero?.id).toBe('a');
  });

  it('hero는 rows에서 제외된다', () => {
    const entries = [mk('a'), mk('b', true), mk('c')];
    const ids = buildSpreads(entries).rows.flatMap((r) => r.items.map((i) => i.id));
    expect(ids).not.toContain('b');
    expect(ids).toEqual(['a', 'c']);
  });

  it('8개(hero 제외) → largeDuo(3) + triptych(3) + duo(2)', () => {
    const entries = Array.from({ length: 9 }, (_, i) => mk(`e${i}`)); // hero=e0, rest=8
    const { rows } = buildSpreads(entries);
    expect(rows.map((r) => r.kind)).toEqual(['largeDuo', 'triptych', 'duo']);
    expect(rows.map((r) => r.items.length)).toEqual([3, 3, 2]);
  });

  it('사이클 반복: rest 9개 → largeDuo, triptych, duo, largeDuo(1)', () => {
    const entries = Array.from({ length: 10 }, (_, i) => mk(`e${i}`)); // rest=9
    const { rows } = buildSpreads(entries);
    expect(rows.map((r) => r.kind)).toEqual(['largeDuo', 'triptych', 'duo', 'largeDuo']);
    expect(rows[3].items.length).toBe(1); // 남은 1개
  });

  it('작품 1개 → hero만, rows 빈 배열', () => {
    const { hero, rows } = buildSpreads([mk('only')]);
    expect(hero?.id).toBe('only');
    expect(rows).toEqual([]);
  });
});
