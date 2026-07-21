import type { LegMaterial } from '@/data/commission-legs';

export type CommissionSize = 'S' | 'M' | 'L';

/**
 * 사이즈 × 다리 소재별 시작가(₩). null = 아직 미정 → UI에 가격 미노출.
 * 숫자가 확정되면 여기만 채우면 Inquiry 요약에 "예상 시작가"가 켜진다.
 * Wood Custom 모양은 이 테이블과 무관하게 항상 "별도 견적"으로 표기한다.
 */
export const FROM_PRICE: Record<CommissionSize, Record<LegMaterial, number | null>> = {
  S: { wood: null, stainless: null, titanium: null },
  M: { wood: null, stainless: null, titanium: null },
  L: { wood: null, stainless: null, titanium: null },
};

/** 조합의 시작가. 미선택이거나 미정이면 null. */
export function getFromPrice(
  size: CommissionSize | null,
  material: LegMaterial | null,
): number | null {
  if (!size || !material) return null;
  return FROM_PRICE[size][material];
}

/** "₩1,200,000~" 형식. */
export function formatFromPrice(price: number): string {
  return `₩${price.toLocaleString('ko-KR')}~`;
}
