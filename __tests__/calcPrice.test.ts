import { describe, it, expect } from 'vitest';

// ─── Types mirrored from BTOBuilder ──────────────────────────────────────────
interface SizeOption   { id: string; label: string; size: string; description: string; price: number; }
interface WoodOption   { id: string; label: string; description: string; color: string; priceAddition: number; }
interface LegOption    { id: string; label: string; description: string; color: string; priceAddition: number; }
interface BTOData {
  sizes: SizeOption[];
  resins: { id: string; label: string; hex: string; description: string }[];
  woods: WoodOption[];
  legs: LegOption[];
}
interface Selection { size: string; resin: string; wood: string; leg: string; }

// ─── Inline the pure function (no browser APIs, safe to import directly) ─────
function calcPrice(sel: Partial<Selection>, data: BTOData): number {
  const base = data.sizes.find((s) => s.id === sel.size)?.price ?? 0;
  const wood = data.woods.find((w) => w.id === sel.wood)?.priceAddition ?? 0;
  const leg  = data.legs.find((l)  => l.id === sel.leg)?.priceAddition  ?? 0;
  return base + wood + leg;
}

// ─── Fixtures ─────────────────────────────────────────────────────────────────
const DATA: BTOData = {
  sizes:  [
    { id: 's',  label: 'Small',  size: '60cm', description: '', price: 800_000 },
    { id: 'm',  label: 'Medium', size: '73cm', description: '', price: 1_200_000 },
    { id: 'xl', label: 'XL',    size: '90cm', description: '', price: 1_800_000 },
  ],
  resins: [],
  woods:  [
    { id: 'walnut', label: '월넛', description: '', color: '#5c4033', priceAddition: 150_000 },
    { id: 'ash',    label: '애쉬', description: '', color: '#d4c4a0', priceAddition: 100_000 },
  ],
  legs:   [
    { id: 'gold',   label: '골드',   description: '', color: '#c9a84c', priceAddition: 80_000 },
    { id: 'silver', label: '실버',   description: '', color: '#b0b8c0', priceAddition: 0 },
  ],
};

describe('calcPrice', () => {
  it('returns 0 when nothing is selected', () => {
    expect(calcPrice({}, DATA)).toBe(0);
  });

  it('returns base price when only size is selected', () => {
    expect(calcPrice({ size: 'm' }, DATA)).toBe(1_200_000);
  });

  it('adds wood priceAddition to base', () => {
    expect(calcPrice({ size: 'm', wood: 'walnut' }, DATA)).toBe(1_350_000);
  });

  it('adds leg priceAddition to base', () => {
    expect(calcPrice({ size: 's', leg: 'gold' }, DATA)).toBe(880_000);
  });

  it('sums base + wood + leg correctly', () => {
    expect(calcPrice({ size: 'xl', wood: 'walnut', leg: 'gold' }, DATA)).toBe(2_030_000);
  });

  it('returns 0 for unknown size id', () => {
    expect(calcPrice({ size: 'unknown' }, DATA)).toBe(0);
  });

  it('ignores unknown wood id (no addition)', () => {
    expect(calcPrice({ size: 'm', wood: 'nonexistent' }, DATA)).toBe(1_200_000);
  });

  it('handles leg with 0 priceAddition (silver)', () => {
    expect(calcPrice({ size: 'm', wood: 'ash', leg: 'silver' }, DATA)).toBe(1_300_000);
  });
});
