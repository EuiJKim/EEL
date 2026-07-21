import type { TableShape } from '@/components/CommissionPreview3D';

export type LegMaterial = 'wood' | 'stainless' | 'titanium';
export type LegShapeValue = '4' | '1' | 'custom';

export const LEG_MATERIALS: { value: LegMaterial; label: string; desc: string }[] = [
  { value: 'wood', label: 'Wood', desc: '원목 · 커스텀 모양 가능' },
  { value: 'stainless', label: 'Stainless', desc: '스테인리스 · 기본 모양' },
  { value: 'titanium', label: 'Titanium', desc: '티타늄 · 기본 모양' },
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

/** 요약/이메일용 표기: "Wood · Pedestal". 미완성 선택은 "—". */
export function formatLegs(
  material: LegMaterial | null,
  legShape: LegShapeValue | null,
): string {
  if (!material || !legShape) return '—';
  return `${MATERIAL_LABEL[material]} · ${SHAPE_LABEL[legShape]}`;
}
