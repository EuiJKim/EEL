import { describe, it, expect } from 'vitest';
import {
  LEG_MATERIALS,
  legShapesFor,
  isLegShapeAllowed,
  resolveLegShape,
  formatLegs,
} from '@/data/commission-legs';

describe('legShapesFor', () => {
  it('Wood는 4/Pedestal/Custom 세 가지', () => {
    expect(legShapesFor('wood')).toEqual(['4', '1', 'custom']);
  });
  it('Stainless는 기본 모양만 (custom 미노출)', () => {
    expect(legShapesFor('stainless')).toEqual(['4', '1']);
  });
});

describe('isLegShapeAllowed', () => {
  it('Rectangle이면 Pedestal 불가 (모든 소재)', () => {
    expect(isLegShapeAllowed('wood', '1', 'rectangle')).toBe(false);
    expect(isLegShapeAllowed('stainless', '1', 'rectangle')).toBe(false);
  });
  it('Rectangle이어도 4 Legs와 Wood Custom은 허용', () => {
    expect(isLegShapeAllowed('wood', '4', 'rectangle')).toBe(true);
    expect(isLegShapeAllowed('wood', 'custom', 'rectangle')).toBe(true);
  });
  it('custom은 wood에서만 허용', () => {
    expect(isLegShapeAllowed('wood', 'custom', 'organic')).toBe(true);
    expect(isLegShapeAllowed('stainless', 'custom', 'organic')).toBe(false);
  });
  it('Rectangle 외 모양에서 기본 다리는 모두 허용', () => {
    expect(isLegShapeAllowed('stainless', '1', 'round')).toBe(true);
    expect(isLegShapeAllowed('stainless', '4', 'organic')).toBe(true);
  });
});

describe('resolveLegShape (소재/상판 변경 시 자동 해제)', () => {
  it('Wood+Custom에서 Stainless로 바꾸면 해제(null)', () => {
    expect(resolveLegShape('stainless', 'custom', 'organic')).toBeNull();
  });
  it('허용되는 조합이면 현재 선택 유지', () => {
    expect(resolveLegShape('stainless', '4', 'rectangle')).toBe('4');
    expect(resolveLegShape('wood', 'custom', 'rectangle')).toBe('custom');
  });
  it('Rectangle로 바꿔서 Pedestal이 불가능해지면 해제(null)', () => {
    expect(resolveLegShape('wood', '1', 'rectangle')).toBeNull();
  });
  it('미선택(null)은 그대로 null', () => {
    expect(resolveLegShape('wood', null, 'organic')).toBeNull();
  });
});

describe('formatLegs', () => {
  it('소재+모양을 "Wood · Pedestal" 형식으로', () => {
    expect(formatLegs('wood', '1')).toBe('Wood · Pedestal');
    expect(formatLegs('wood', 'custom')).toBe('Wood · Custom');
    expect(formatLegs('stainless', '4')).toBe('Stainless · 4 Legs');
  });
  it('하나라도 미선택이면 "—"', () => {
    expect(formatLegs(null, '4')).toBe('—');
    expect(formatLegs('wood', null)).toBe('—');
    expect(formatLegs(null, null)).toBe('—');
  });
});

describe('LEG_MATERIALS', () => {
  it('wood/stainless 순서로 2개', () => {
    expect(LEG_MATERIALS.map(m => m.value)).toEqual(['wood', 'stainless']);
  });
});
