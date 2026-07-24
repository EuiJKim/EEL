import { describe, it, expect } from 'vitest';
import {
  FROM_PRICE,
  getFromPrice,
  formatFromPrice,
} from '@/data/commission-pricing';

describe('FROM_PRICE 초기 상태', () => {
  it('S/M/L × wood/stainless 전 조합이 null (가격 미정)', () => {
    for (const size of ['S', 'M', 'L'] as const) {
      for (const mat of ['wood', 'stainless'] as const) {
        expect(FROM_PRICE[size][mat]).toBeNull();
      }
    }
  });
});

describe('getFromPrice', () => {
  it('null 조합이면 null (UI는 가격 미노출)', () => {
    expect(getFromPrice('M', 'wood')).toBeNull();
  });
  it('size나 material이 미선택이면 null', () => {
    expect(getFromPrice(null, 'wood')).toBeNull();
    expect(getFromPrice('M', null)).toBeNull();
    expect(getFromPrice(null, null)).toBeNull();
  });
});

describe('formatFromPrice', () => {
  it('천 단위 콤마 + ₩ + 물결', () => {
    expect(formatFromPrice(1200000)).toBe('₩1,200,000~');
    expect(formatFromPrice(850000)).toBe('₩850,000~');
  });
});
