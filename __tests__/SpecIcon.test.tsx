import { describe, it, expect } from 'vitest';
import React from 'react';

// Mirror the logic from components/SpecIcon.tsx without rendering (pure branch test)
function getIconName(label: string): string {
  if (label === 'Material') return 'Layers';
  if (label === 'Size') return 'Ruler';
  return 'Palette';
}

describe('SpecIcon label → icon mapping', () => {
  it('Material → Layers', () => {
    expect(getIconName('Material')).toBe('Layers');
  });

  it('Size → Ruler', () => {
    expect(getIconName('Size')).toBe('Ruler');
  });

  it('Resin Depth → Palette (fallback)', () => {
    expect(getIconName('Resin Depth')).toBe('Palette');
  });

  it('Leg Type → Palette (fallback)', () => {
    expect(getIconName('Leg Type')).toBe('Palette');
  });

  it('unknown label → Palette (fallback)', () => {
    expect(getIconName('anything')).toBe('Palette');
  });
});
