# Commission 빌더 — 반투명 제거 + 다리 소재/가격 구조 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/order` 빌더에서 반투명 옵션을 제거하고, Legs 스텝을 소재(Wood/Stainless/Titanium)→모양 2단 구조로 바꾸며, null-게이트 시작가 테이블과 3D 프리뷰 다리 소재 색을 추가한다.

**Architecture:** 규칙(소재별 모양 노출, 자동 해제, 가격 조회)은 순수 함수 모듈 2개(`data/commission-legs.ts`, `data/commission-pricing.ts`)로 분리해 Vitest로 검증하고, `CommissionClient.tsx`는 이 모듈을 소비만 한다. 문의 API(`/api/commission-inquiry`)는 `legs`가 자유 문자열(max 50)이라 **수정 불필요** — 클라이언트가 `"Wood · Pedestal"` 형식으로 보내면 이메일에 그대로 출력된다.

**Tech Stack:** Next.js 16 App Router / TypeScript / Vitest(jsdom) / Three.js / bun

## Global Constraints

- 패키지 매니저 **bun 전용** — 테스트는 `bun run test`(1회 실행), 타입체크는 `bunx tsc --noEmit`
- `tsc --noEmit`에 기존 에러 1건 존재: `__tests__/MetaPixel.test.tsx`의 `@testing-library/react` 미설치 — **이 에러는 무시** (이 계획과 무관)
- 커밋 메시지는 한글
- 스텝 순서(6단계)·28색 팔레트·Shape/Size/Height 스텝·Resend 발송 로직은 건드리지 않는다
- 디자인 가드레일: 글로우·레인보우 그라디언트·blur 애니메이션 금지, 터치 타깃 44×44px 이상
- 스펙: `docs/superpowers/specs/2026-07-21-commission-legs-pricing-design.md`

---

## File Structure

| 파일 | 역할 |
|---|---|
| `data/commission-legs.ts` (신설) | 다리 소재/모양 타입·옵션 목록·노출 규칙·자동 해제·표시 포맷 (순수 함수) |
| `data/commission-pricing.ts` (신설) | 사이즈×소재 시작가 테이블(초기 전부 null) + 조회/포맷 헬퍼 |
| `__tests__/commissionLegs.test.ts` (신설) | 규칙 모듈 단위 테스트 |
| `__tests__/commissionPricing.test.ts` (신설) | 가격 모듈 단위 테스트 |
| `app/order/CommissionClient.tsx` (수정) | 투명도 2택, Legs 2단 UI, 요약/payload, 안내 문구 |
| `components/CommissionPreview3D.tsx` (수정) | `legMaterial` prop + 다리 색 분기 |

---

### Task 1: `data/commission-legs.ts` — 다리 규칙 모듈 (TDD)

**Files:**
- Create: `data/commission-legs.ts`
- Test: `__tests__/commissionLegs.test.ts`

**Interfaces:**
- Consumes: `TableShape` from `@/components/CommissionPreview3D` (기존 export: `'organic' | 'round' | 'square' | 'rectangle'`)
- Produces (Task 3·4가 사용):
  - `type LegMaterial = 'wood' | 'stainless' | 'titanium'`
  - `type LegShapeValue = '4' | '1' | 'custom'`
  - `const LEG_MATERIALS: { value: LegMaterial; label: string; desc: string }[]`
  - `const LEG_SHAPES: { value: LegShapeValue; label: string; desc: string }[]`
  - `legShapesFor(material: LegMaterial): LegShapeValue[]`
  - `isLegShapeAllowed(material: LegMaterial, legShape: LegShapeValue, tableShape: TableShape): boolean`
  - `resolveLegShape(material: LegMaterial, current: LegShapeValue | null, tableShape: TableShape): LegShapeValue | null`
  - `formatLegs(material: LegMaterial | null, legShape: LegShapeValue | null): string`

- [ ] **Step 1: 실패하는 테스트 작성**

`__tests__/commissionLegs.test.ts`:

```ts
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
  it('Stainless와 Titanium은 기본 모양만 (custom 미노출)', () => {
    expect(legShapesFor('stainless')).toEqual(['4', '1']);
    expect(legShapesFor('titanium')).toEqual(['4', '1']);
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
    expect(isLegShapeAllowed('titanium', 'custom', 'organic')).toBe(false);
  });
  it('Rectangle 외 모양에서 기본 다리는 모두 허용', () => {
    expect(isLegShapeAllowed('titanium', '1', 'round')).toBe(true);
    expect(isLegShapeAllowed('stainless', '4', 'organic')).toBe(true);
  });
});

describe('resolveLegShape (소재/상판 변경 시 자동 해제)', () => {
  it('Wood+Custom에서 Stainless로 바꾸면 해제(null)', () => {
    expect(resolveLegShape('stainless', 'custom', 'organic')).toBeNull();
  });
  it('허용되는 조합이면 현재 선택 유지', () => {
    expect(resolveLegShape('titanium', '4', 'rectangle')).toBe('4');
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
    expect(formatLegs('titanium', '4')).toBe('Titanium · 4 Legs');
  });
  it('하나라도 미선택이면 "—"', () => {
    expect(formatLegs(null, '4')).toBe('—');
    expect(formatLegs('wood', null)).toBe('—');
    expect(formatLegs(null, null)).toBe('—');
  });
});

describe('LEG_MATERIALS', () => {
  it('wood/stainless/titanium 순서로 3개', () => {
    expect(LEG_MATERIALS.map(m => m.value)).toEqual(['wood', 'stainless', 'titanium']);
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `bun run test __tests__/commissionLegs.test.ts`
Expected: FAIL — `Cannot find module '@/data/commission-legs'` 또는 유사 모듈 미존재 에러

- [ ] **Step 3: 모듈 구현**

`data/commission-legs.ts`:

```ts
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
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `bun run test __tests__/commissionLegs.test.ts`
Expected: PASS (5 describe, 전부 green)

- [ ] **Step 5: 커밋**

```bash
git add data/commission-legs.ts __tests__/commissionLegs.test.ts
git commit -m "feat: 다리 소재/모양 규칙 모듈 추가 (소재별 노출·자동 해제·표기)"
```

---

### Task 2: `data/commission-pricing.ts` — 시작가 테이블 (TDD)

**Files:**
- Create: `data/commission-pricing.ts`
- Test: `__tests__/commissionPricing.test.ts`

**Interfaces:**
- Consumes: `LegMaterial` from `@/data/commission-legs` (Task 1)
- Produces (Task 3이 사용):
  - `type CommissionSize = 'S' | 'M' | 'L'`
  - `const FROM_PRICE: Record<CommissionSize, Record<LegMaterial, number | null>>`
  - `getFromPrice(size: CommissionSize | null, material: LegMaterial | null): number | null`
  - `formatFromPrice(price: number): string` — `"₩1,200,000~"` 형식

- [ ] **Step 1: 실패하는 테스트 작성**

`__tests__/commissionPricing.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import {
  FROM_PRICE,
  getFromPrice,
  formatFromPrice,
} from '@/data/commission-pricing';

describe('FROM_PRICE 초기 상태', () => {
  it('S/M/L × wood/stainless/titanium 전 조합이 null (가격 미정)', () => {
    for (const size of ['S', 'M', 'L'] as const) {
      for (const mat of ['wood', 'stainless', 'titanium'] as const) {
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
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `bun run test __tests__/commissionPricing.test.ts`
Expected: FAIL — 모듈 미존재

- [ ] **Step 3: 모듈 구현**

`data/commission-pricing.ts`:

```ts
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
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `bun run test __tests__/commissionPricing.test.ts`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add data/commission-pricing.ts __tests__/commissionPricing.test.ts
git commit -m "feat: 사이즈×다리소재 시작가 테이블 (null-게이트, 값은 추후 기입)"
```

---

### Task 3: CommissionClient — 반투명 제거 + Legs 2단 UI + 요약/payload

**Files:**
- Modify: `app/order/CommissionClient.tsx`

**Interfaces:**
- Consumes (Task 1·2): `LEG_MATERIALS`, `LEG_SHAPES`, `legShapesFor`, `isLegShapeAllowed`, `resolveLegShape`, `formatLegs`, `LegMaterial`, `LegShapeValue` from `@/data/commission-legs`; `getFromPrice`, `formatFromPrice` from `@/data/commission-pricing`
- Produces (Task 4가 사용): `<CommissionPreview3D legMaterial={selectedLegMaterial} ... />` prop 전달 (Task 4에서 prop 추가 전까지는 전달하지 않음 — 이 Task에서는 기존 props만 유지)

- [ ] **Step 1: 투명도 반투명 제거**

`app/order/CommissionClient.tsx` 변경 (기존 코드 기준 라인은 Task 착수 시점 기준으로 탐색):

상태 타입 (기존 85행):

```ts
// 변경 전
const [selectedOpacity, setSelectedOpacity] = useState<'투명' | '반투명' | '불투명' | null>(null);
// 변경 후
const [selectedOpacity, setSelectedOpacity] = useState<'투명' | '불투명' | null>(null);
```

투명도 버튼 (기존 199~216행의 Opacity 블록):

```tsx
{/* Opacity — 2 columns */}
<div className="mb-6">
  <p className="text-sm text-[#aaa] tracking-[0.06em] mb-3">투명도</p>
  <div className="grid grid-cols-2 border border-[#2a2a2a]">
    {(['투명', '불투명'] as const).map((op, i) => (
      <button key={op} onClick={() => setSelectedOpacity(op)}
        className="py-4 text-sm tracking-[0.06em] cursor-pointer transition-all"
        style={{
          fontFamily: "'Telex', sans-serif",
          background: selectedOpacity === op ? '#fff' : 'transparent',
          color: selectedOpacity === op ? '#0e0e0e' : '#999',
          borderRight: i < 1 ? '1px solid #2a2a2a' : 'none',
        }}>
        {op}
      </button>
    ))}
  </div>
</div>
```

(`grid-cols-3`→`grid-cols-2`, 배열에서 `'반투명'` 제거, `borderRight` 조건 `i < 2`→`i < 1`.)

- [ ] **Step 2: Inquiry 스텝에 특수 마감 안내 문구 추가**

Inquiry 스텝(기존 367~370행)의 안내 블록에 한 줄 추가 — textarea 위가 아닌 기존 안내문 묶음에 배치:

```tsx
<div className="flex flex-col gap-1 mb-6">
  <p className="text-sm text-[#999] tracking-[0.04em]">내용을 확인하고 문의를 보내주세요.</p>
  <p className="text-[11px] text-[#666] tracking-[0.02em]" style={{ fontFamily: "'Telex', sans-serif" }}>레진 작업 특성상 미세한 기포나 표면 흔적이 생길 수 있습니다.</p>
  <p className="text-[11px] text-[#666] tracking-[0.02em]" style={{ fontFamily: "'Telex', sans-serif" }}>반투명 등 특수 마감은 요청사항에 적어주시면 상담 시 안내드립니다.</p>
</div>
```

- [ ] **Step 3: Legs 상태를 소재+모양으로 확장**

import 추가 (파일 상단):

```ts
import {
  LEG_MATERIALS, LEG_SHAPES, legShapesFor, isLegShapeAllowed, resolveLegShape, formatLegs,
  type LegMaterial, type LegShapeValue,
} from '@/data/commission-legs';
import { getFromPrice, formatFromPrice } from '@/data/commission-pricing';
```

기존 77~80행 `LEG_OPTIONS` 상수 삭제 (Task 1 모듈의 `LEG_SHAPES`로 대체).

상태 (기존 89행):

```ts
// 변경 전
const [selectedLegs, setSelectedLegs] = useState<'4' | '1' | null>(null);
// 변경 후
const [selectedLegMaterial, setSelectedLegMaterial] = useState<LegMaterial | null>(null);
const [selectedLegs, setSelectedLegs] = useState<LegShapeValue | null>(null);
```

Shape 스텝의 Rectangle 클릭 핸들러 (기존 238행) — 하드코딩된 해제 로직을 모듈로 교체:

```tsx
onClick={() => {
  setSelectedShape(s.value);
  if (selectedLegMaterial) {
    setSelectedLegs(resolveLegShape(selectedLegMaterial, selectedLegs, s.value));
  } else if (s.value === 'rectangle' && selectedLegs === '1') {
    setSelectedLegs(null);
  }
}}
```

프리뷰 호출(기존 488행) **임시 호환 처리** — `CommissionPreview3D`의 `legs` prop은 Task 4에서야 `'custom'`을 수용하므로, 이 Task에서는 매핑으로 타입을 맞춘다 (Task 4 Step 3에서 제거):

```tsx
<CommissionPreview3D resinColor={previewColor} size={selectedSize} height={selectedHeight}
  legs={selectedLegs === 'custom' ? '4' : selectedLegs} shape={selectedShape} opacity={selectedOpacity} />
```

- [ ] **Step 4: Legs 스텝 UI를 소재→모양 2단으로 교체**

기존 321~352행 `/* 4 — Legs */` 블록 전체를 아래로 교체:

```tsx
/* 4 — Legs */
<div key="legs">
  <h2 className="text-white mb-2" style={{ fontFamily: "var(--font-gravitas)", fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 400, letterSpacing: '0.02em' }}>Legs</h2>
  <p className="text-sm text-[#999] mb-6 tracking-[0.04em]">다리 소재를 먼저 선택해주세요</p>

  {/* 소재 선택 */}
  <div className="flex gap-3 mb-8">
    {LEG_MATERIALS.map((m) => {
      const isActive = selectedLegMaterial === m.value;
      return (
        <button key={m.value}
          onClick={() => {
            setSelectedLegMaterial(m.value);
            setSelectedLegs(resolveLegShape(m.value, selectedLegs, selectedShape));
          }}
          className="flex-1 border py-6 px-3 cursor-pointer flex flex-col items-center gap-2 transition-all active:scale-[0.98]"
          style={{ borderColor: isActive ? '#fff' : '#3a3a3a', background: isActive ? '#fff' : 'transparent' }}>
          <span className="text-sm" style={{ fontFamily: "var(--font-gravitas)", color: isActive ? '#0e0e0e' : '#fff' }}>{m.label}</span>
          <span className="text-xs text-center tracking-[0.04em]" style={{ color: isActive ? '#555' : '#999' }}>{m.desc}</span>
        </button>
      );
    })}
  </div>

  {/* 모양 선택 — 소재 미선택 시 dim */}
  <p className="text-sm mb-3 tracking-[0.04em]" style={{ color: selectedLegMaterial ? '#999' : '#555' }}>
    {selectedLegMaterial ? '다리 형태를 선택해주세요' : '소재를 선택하면 형태를 고를 수 있습니다'}
  </p>
  <div className={`flex gap-3 ${selectedLegMaterial ? '' : 'opacity-30 pointer-events-none'}`}>
    {LEG_SHAPES
      .filter(l => !selectedLegMaterial || legShapesFor(selectedLegMaterial).includes(l.value))
      .map((l) => {
        const disabled = !selectedLegMaterial ||
          !isLegShapeAllowed(selectedLegMaterial, l.value, selectedShape);
        const isActive = selectedLegs === l.value && !disabled;
        return (
          <button key={l.value}
            onClick={() => { if (!disabled) setSelectedLegs(l.value); }}
            className={`flex-1 border py-8 px-3 flex flex-col items-center gap-3 transition-all ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer active:scale-[0.98]'}`}
            style={{ borderColor: isActive ? '#fff' : '#3a3a3a', background: isActive ? '#fff' : 'transparent' }}>
            <div className="flex flex-col items-center gap-1 h-14 justify-end">
              <div className="w-12 h-2 rounded-sm" style={{ background: isActive ? '#0e0e0e' : '#888' }} />
              {l.value === '4' && (
                <div className="flex gap-3">
                  {[0,1,2,3].map(i => <span key={i} className="block w-[4px] h-6 rounded-sm" style={{ background: isActive ? '#0e0e0e' : '#777' }} />)}
                </div>
              )}
              {l.value === '1' && (
                <span className="block w-2 h-7 rounded-sm" style={{ background: isActive ? '#0e0e0e' : '#777' }} />
              )}
              {l.value === 'custom' && (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#0e0e0e' : '#777'} strokeWidth="1.6" strokeLinecap="round">
                  <path d="M12 4v16M4 12h16" />
                </svg>
              )}
            </div>
            <span className="text-sm" style={{ fontFamily: "var(--font-gravitas)", color: isActive ? '#0e0e0e' : '#fff' }}>{l.label}</span>
            <span className="text-xs text-center tracking-[0.04em]" style={{ color: isActive ? '#555' : '#999' }}>{l.desc}</span>
            {l.value === 'custom' && (
              <span className="text-[10px] tracking-[0.08em] uppercase" style={{ color: isActive ? '#555' : '#888' }}>별도 견적</span>
            )}
            {selectedLegMaterial && l.value === '1' && selectedShape === 'rectangle' && (
              <span className="text-xs text-[#777]">직사각형은 불가</span>
            )}
          </button>
        );
      })}
  </div>

  {selectedLegs === 'custom' && (
    <p className="mt-4 text-xs text-[#666] leading-relaxed">
      원하는 다리 모양은 문의 단계의 요청사항에 설명해 주세요. 커스텀 다리는 상담 후 별도 견적으로 안내드립니다.
    </p>
  )}
</div>,
```

- [ ] **Step 5: 요약·payload·시작가 표기 갱신**

`summaryRows`의 Legs 행 (기존 151행):

```ts
{ label: 'Legs', value: formatLegs(selectedLegMaterial, selectedLegs) },
```

`handleSend`의 payload legs (기존 113행):

```ts
legs: formatLegs(selectedLegMaterial, selectedLegs),
```

Inquiry 스텝 요약 테이블(기존 372~379행) 바로 아래에 시작가/별도견적 표기 추가:

```tsx
<div className="border-t border-b border-[#222] py-4 mb-7">
  {summaryRows.map((row) => (
    <div key={row.label} className="flex justify-between py-1.5 text-sm">
      <span className="text-[#888] tracking-[0.06em]">{row.label}</span>
      <span className="text-[#e8e8e8]">{row.value}</span>
    </div>
  ))}
  {selectedLegs === 'custom' ? (
    <div className="flex justify-between py-1.5 text-sm">
      <span className="text-[#888] tracking-[0.06em]">Est. Price</span>
      <span className="text-[#e8e8e8]">별도 견적 · 상담 후 확정</span>
    </div>
  ) : (() => {
    const from = getFromPrice(selectedSize, selectedLegMaterial);
    return from !== null ? (
      <div className="flex justify-between py-1.5 text-sm">
        <span className="text-[#888] tracking-[0.06em]">Est. Price</span>
        <span className="text-[#e8e8e8]">예상 시작가 {formatFromPrice(from)} · 상담 후 확정</span>
      </div>
    ) : null;
  })()}
</div>
```

(FROM_PRICE가 전부 null인 현재는 custom 선택 시의 "별도 견적" 행만 노출된다 — 스펙 2.3 그대로.)

- [ ] **Step 5.5: Legs 스텝 완료 조건 (스펙 2.2 — 소재+모양 둘 다 선택해야 다음)**

goNext 버튼 렌더(기존 469~477행)에 disabled 조건 추가. Legs 스텝은 index 4:

```tsx
{currentStep < TOTAL_STEPS - 1 ? (
  <button onClick={goNext}
    disabled={currentStep === 4 && (!selectedLegMaterial || !selectedLegs)}
    className="flex items-center gap-3 bg-transparent border-0 cursor-pointer hover:opacity-60 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed"
    style={{ color: '#ccc', fontFamily: "'Telex', sans-serif", fontSize: '16px', letterSpacing: '0.06em' }}>
    다음
    <svg width="28" height="28" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="7,4 13,10 7,16" />
    </svg>
  </button>
) : (
  <div className="w-16" />
)}
```

주의: 상단 진행바의 스텝 점프 버튼(기존 432~439행 `goToStep(i)`)은 그대로 둔다 — 뒤 스텝으로 점프해도 요약이 '—'를 보여주고 formatLegs가 '—'를 반환하므로 안전하며, 기존 자유 탐색 UX를 해치지 않는다.

- [ ] **Step 6: 타입체크 + 전체 테스트**

Run: `bunx tsc --noEmit`
Expected: MetaPixel.test.tsx의 기존 에러 1건 외 에러 없음

Run: `bun run test`
Expected: 전체 PASS (기존 테스트 + Task 1·2 테스트)

- [ ] **Step 7: dev 서버 시각 확인**

Run: `bun run dev` 후 `http://localhost:3000/order` 접속. 확인 항목:
1. Color 스텝: 투명도 버튼이 투명/불투명 2개
2. Legs 스텝: 소재 3버튼 → 미선택 시 하단 모양 dim, Wood 선택 시 Custom 카드 노출(별도 견적 배지), Stainless/Titanium 선택 시 Custom 미노출
3. Wood+Custom 선택 후 소재를 Stainless로 → 모양 선택 해제됨
4. Shape에서 Rectangle 선택 → Legs의 Pedestal 비활성 + "직사각형은 불가"
5. Inquiry 요약: "Wood · Pedestal" 형식, Custom 선택 시 "별도 견적 · 상담 후 확정" 행
6. 이메일 payload는 3에서 확인한 요약과 동일 문자열 (Network 탭 or 실제 제출)

- [ ] **Step 8: 커밋**

```bash
git add app/order/CommissionClient.tsx
git commit -m "feat: 커미션 빌더 반투명 제거 + 다리 소재→모양 2단 선택 + 별도견적/시작가 표기"
```

---

### Task 4: CommissionPreview3D — 다리 소재 색 반영

**Files:**
- Modify: `components/CommissionPreview3D.tsx`
- Modify: `app/order/CommissionClient.tsx` (prop 전달 1줄)

**Interfaces:**
- Consumes: `LegMaterial` type from `@/data/commission-legs` (Task 1)
- Produces: `Props`에 `legMaterial?: LegMaterial | null` 추가 — Task 3의 `selectedLegMaterial`을 그대로 받는다

- [ ] **Step 1: Props와 opacity 타입 갱신**

`components/CommissionPreview3D.tsx` 상단 (기존 8~15행):

```ts
import type { LegMaterial } from '@/data/commission-legs';

interface Props {
  resinColor: string;
  size: 'S' | 'M' | 'L' | null;
  height: '30–40 cm' | '40–50 cm' | '72–75 cm' | null;
  legs: '4' | '1' | 'custom' | null;
  shape: TableShape;
  opacity?: '투명' | '불투명' | null;
  legMaterial?: LegMaterial | null;
}
```

opacity 업데이트 effect (기존 242~250행)에서 `'반투명'` 분기 제거:

```ts
if (opacity === '투명') { mat.opacity = 0.25; mat.transmission = 0.95; mat.roughness = 0.04; }
else { mat.opacity = 0.93; mat.transmission = 0; mat.roughness = 0.12; }
```

- [ ] **Step 2: 다리 소재 색 분기 추가**

컴포넌트 시그니처(기존 92행)에 `legMaterial` 추가:

```ts
export default function CommissionPreview3D({ resinColor, size, height, legs, shape, opacity, legMaterial }: Props) {
```

legs 업데이트 effect(기존 279~284행)를 custom 수용으로 수정 — custom은 4-legs 지오메트리로 표시 (스펙 2.4: 커스텀 형상 모델링 안 함):

```ts
/* ── Update legs ── */
useEffect(() => {
  if (!sceneRef.current || !legs) return;
  sceneRef.current.legs4Group.visible = legs === '4' || legs === 'custom';
  sceneRef.current.legs1Group.visible = legs === '1';
}, [legs]);
```

새 effect 추가 (legs effect 바로 아래) — 소재별 색·질감:

```ts
/* ── Update leg material color ── */
useEffect(() => {
  if (!sceneRef.current) return;
  const legMat = sceneRef.current.legMat;
  if (legMaterial === 'wood') {
    legMat.color.set(0x8a6f4d); legMat.roughness = 0.7; legMat.metalness = 0.05;
  } else if (legMaterial === 'stainless') {
    legMat.color.set(0xc0c4c8); legMat.roughness = 0.25; legMat.metalness = 0.9;
  } else if (legMaterial === 'titanium') {
    legMat.color.set(0x6b6e72); legMat.roughness = 0.35; legMat.metalness = 0.85;
  } else {
    legMat.color.set(0xb0b0b0); legMat.roughness = 0.25; legMat.metalness = 0.9; // 기본(미선택)
  }
}, [legMaterial]);
```

- [ ] **Step 3: CommissionClient에서 prop 전달 (Task 3의 임시 매핑 제거)**

`app/order/CommissionClient.tsx`의 프리뷰 호출 — Task 3 Step 3에서 넣었던 `legs={selectedLegs === 'custom' ? '4' : selectedLegs}` 임시 매핑을 직접 전달로 교체하고 `legMaterial` 추가:

```tsx
<CommissionPreview3D resinColor={previewColor} size={selectedSize} height={selectedHeight} legs={selectedLegs} shape={selectedShape} opacity={selectedOpacity} legMaterial={selectedLegMaterial} />
```

- [ ] **Step 4: 타입체크 + 전체 테스트**

Run: `bunx tsc --noEmit`
Expected: MetaPixel 기존 에러 외 없음

Run: `bun run test`
Expected: 전체 PASS

- [ ] **Step 5: dev 서버 시각 확인**

`http://localhost:3000/order` Legs 스텝에서:
1. Wood 선택 → 프리뷰 다리 갈색
2. Stainless 선택 → 밝은 은색
3. Titanium 선택 → 어두운 회색
4. Wood+Custom 선택 → 다리가 4-legs 형태로 갈색 표시
5. 투명/불투명 전환 시 상판 질감 변화 정상 (반투명 분기 제거 후 회귀 없음)

- [ ] **Step 6: 커밋**

```bash
git add components/CommissionPreview3D.tsx app/order/CommissionClient.tsx
git commit -m "feat: 3D 프리뷰 다리 소재 색 반영 (Wood/Stainless/Titanium)"
```

---

### Task 5: 빌드 검증 + API 확인 + 문서 갱신

**Files:**
- Modify: `TODO.md` (다음 작업 섹션에 완료 반영)
- 확인만: `app/api/commission-inquiry/route.ts` (수정 없음)

**Interfaces:**
- Consumes: Task 3의 payload 형식 `"Wood · Pedestal"` / `"Wood · Custom"`

- [ ] **Step 1: API가 새 legs 형식을 수용하는지 확인 (수정 아님)**

`app/api/commission-inquiry/route.ts`의 `legs: z.string().max(50)` — `"Stainless · 4 Legs"`(18자)까지 전부 50자 이내인지 확인. 이메일 템플릿은 `${safe(legs)}`로 문자열을 그대로 출력하므로 변경 불필요.

Run: `node -e "console.log(['Wood · Pedestal','Wood · Custom','Stainless · 4 Legs','Titanium · 4 Legs'].map(s=>s.length))"`
Expected: 전부 50 미만 (예: `[ 15, 13, 18, 17 ]`)

- [ ] **Step 2: 프로덕션 빌드**

Run: `bun run build`
Expected: 빌드 성공, `/order` 라우트 포함

- [ ] **Step 3: TODO.md 갱신**

`TODO.md`의 "다음 작업 > 기능" 목록에 완료 항목 추가:

```markdown
- [x] Commission 빌더: 반투명 제거 + 다리 소재(Wood/Stainless/Titanium)→모양 2단 선택 + 시작가 구조 (값 미기입 시 미노출)
```

같은 파일 "현재 이슈" 아래에 후속 메모 추가:

```markdown
- [ ] `data/commission-pricing.ts` FROM_PRICE 시작가 숫자 기입 (기입 즉시 Inquiry에 예상 시작가 노출됨)
```

- [ ] **Step 4: 커밋**

```bash
git add TODO.md
git commit -m "docs: 커미션 빌더 다리 소재/시작가 구조 완료 반영, 가격 기입 후속 작업 기록"
```
