import type { TableShape } from '@/components/CommissionPreview3D';

export type LegMaterial = 'wood' | 'stainless' | 'titanium';
export type LegShapeValue = '4' | '1' | 'custom';

export const LEG_MATERIALS: { value: LegMaterial; label: string; desc: string }[] = [
  { value: 'wood', label: 'Wood', desc: '원목 · 형태 자유, 상판과 톤 맞춤' },
  { value: 'stainless', label: 'Stainless', desc: '스테인리스 · 대형·다이닝에 안정' },
  { value: 'titanium', label: 'Titanium', desc: '티타늄 · 다크 톤 프리미엄' },
];

export const LEG_SHAPES: { value: LegShapeValue; label: string; desc: string }[] = [
  { value: '4', label: '4 Legs', desc: '안정적인 네 다리' },
  { value: '1', label: 'Pedestal', desc: '중앙 단일 기둥' },
  { value: 'custom', label: 'Custom', desc: '원하는 모양 · 별도 견적' },
];

const SHAPE_LABEL: Record<LegShapeValue, string> = {
  '4': '4 Legs',
  '1': 'Pedestal',
  custom: 'Custom',
};

const MATERIAL_LABEL: Record<LegMaterial, string> = {
  wood: 'Wood',
  stainless: 'Stainless',
  titanium: 'Titanium',
};

/** 소재별로 노출되는 다리 모양. custom은 Wood 전용. */
export function legShapesFor(material: LegMaterial): LegShapeValue[] {
  return material === 'wood' ? ['4', '1', 'custom'] : ['4', '1'];
}

/** 소재+상판 조합에서 해당 다리 모양이 선택 가능한가. */
export function isLegShapeAllowed(
  material: LegMaterial,
  legShape: LegShapeValue,
  tableShape: TableShape,
): boolean {
  if (!legShapesFor(material).includes(legShape)) return false;
  if (legShape === '1' && tableShape === 'rectangle') return false;
  return true;
}

/** 소재·상판 변경 후 현재 다리 선택이 불가능해졌으면 해제(null). */
export function resolveLegShape(
  material: LegMaterial,
  current: LegShapeValue | null,
  tableShape: TableShape,
): LegShapeValue | null {
  if (current === null) return null;
  return isLegShapeAllowed(material, current, tableShape) ? current : null;
}

export type CommissionHeight = '30–40 cm' | '40–50 cm' | '72–75 cm';

/**
 * 제작 이력 기반 소재 추천 (소프트 가이드 — 제약 아님).
 * 실제 이력: 다이닝 높이(H72+) 작품은 전부 금속 페데스탈(하중·안정성),
 * 로우 테이블(H55 이하)은 원목 커스텀(선반 페데스탈·박스·테이퍼드)이 주력.
 */
export function recommendedLegMaterials(
  height: CommissionHeight | null,
): LegMaterial[] {
  if (height === '72–75 cm') return ['stainless', 'titanium'];
  if (height === '30–40 cm' || height === '40–50 cm') return ['wood'];
  return [];
}

/** 요약/이메일용 표기: "Wood · Pedestal". 미완성 선택은 "—". */
export function formatLegs(
  material: LegMaterial | null,
  legShape: LegShapeValue | null,
): string {
  if (!material || !legShape) return '—';
  return `${MATERIAL_LABEL[material]} · ${SHAPE_LABEL[legShape]}`;
}
