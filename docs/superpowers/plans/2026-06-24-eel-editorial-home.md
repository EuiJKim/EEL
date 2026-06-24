# EEL 홈 Editorial Spreads Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 홈(`/`)·카테고리·Available의 작품 영역을 "히어로 1점 + 잡지식 스프레드 리듬 + 갤러리 분위기"로 재구성한다.

**Architecture:** 순수 헬퍼 `buildSpreads(entries)`가 작품 배열을 `{ hero, rows }` 구조로 변환한다(히어로 선정 + 반복 패턴 grouping). `GridLayout`이 이 구조를 받아 히어로 카드 + 행(`SpreadRow`)들을 렌더한다. `GridCard`는 `variant`로 크기·캡션·비율을 분기한다. 사이드바·헤더·CategoryTabs·AboutPopover·Projects·작품 상세는 건드리지 않는다.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind v4, Vitest(jsdom). 순수 로직만 단위 테스트(기존 `__tests__/calcPrice.test.ts`·`SpecIcon.test.tsx` 패턴).

---

## File Structure

| 파일 | 책임 | 변경 |
|---|---|---|
| `types/journal.ts` | 도메인 타입 | `FeedEntry`에 `featured?: boolean` 추가 |
| `data/journal-entries.ts` | 작품 데이터 | `table-first`에 `featured: true` |
| `lib/journal/buildSpreads.ts` | 작품 배열 → 히어로+행 구조 (순수) | **신규** |
| `__tests__/buildSpreads.test.ts` | 위 헬퍼 단위 테스트 | **신규** |
| `components/journal/GridCard.tsx` | 작품 카드 (variant별 크기/캡션) | variant prop 추가 |
| `components/journal/SpreadRow.tsx` | 한 행(largeDuo/triptych/duo) 렌더 | **신규** |
| `components/journal/GridLayout.tsx` | 작품 영역 조립 (히어로+행) | 균일 그리드 → 스프레드 렌더 |

**안 건드림:** Sidebar, MobileHeader, MobileFooter, MobileStickyCTA, CategoryTabs, AboutPopover, ProjectsGrid, `app/works/[id]/*`, Projects 전체.

---

## Task 1: `featured` 필드 추가 + 대표작 지정

**Files:**
- Modify: `types/journal.ts`
- Modify: `data/journal-entries.ts`

- [ ] **Step 1: 타입에 `featured` 추가**

`types/journal.ts`의 `FeedEntry` 인터페이스에서 `gallery` 줄 아래에 한 줄 추가:

```typescript
export interface FeedEntry {
  id: string;
  category: Category;
  title: string;
  image: string;
  // Optional metadata (furniture usually has these; objet/painting may not):
  year?: string;
  size?: string; // 'Ø 74 - 76 cm  /  H 76 cm'
  price?: string; // '₩ 1,500,000'
  status?: PieceStatus;
  gallery?: string[]; // additional images for detail page
  featured?: boolean; // hero piece on the editorial home (one piece)
}
```

- [ ] **Step 2: `table-first`에 `featured: true` 지정**

`data/journal-entries.ts`에서 `id: 'table-first'` 객체(Turquoise Resin Table)에 `featured: true`를 추가한다. `status: 'sold_out',` 줄 바로 다음에 넣는다:

```typescript
  {
    id: 'table-first',
    category: 'furniture',
    title: 'Turquoise Resin Table',
    image: '/products/table-first/1.jpg',
    year: '2025',
    size: 'Ø 74 - 76 cm  /  H 76 cm',
    price: '₩ 1,500,000',
    status: 'sold_out',
    featured: true,
    gallery: [
      '/products/table-first/1.jpg',
      '/products/table-first/2.jpg',
      '/products/table-first/3.jpg',
      '/products/table-first/4.jpg',
    ],
  },
```

- [ ] **Step 3: 타입체크**

Run: `bunx tsc --noEmit`
Expected: 출력 없음(에러 0). `featured`는 옵셔널이라 기존 코드 안 깨짐.

- [ ] **Step 4: 커밋**

```bash
git add types/journal.ts data/journal-entries.ts
git commit -m "feat(journal): add featured flag, mark Turquoise Resin Table as hero"
```

---

## Task 2: `buildSpreads` 헬퍼 + 테스트 (TDD)

순수 함수. 입력 작품 배열 → `{ hero, rows }`. 히어로 = `featured: true`인 첫 작품, 없으면 첫 작품. 나머지는 `[largeDuo(3), triptych(3), duo(2)]` 사이클로 그룹핑. 개수가 안 맞으면 마지막 행은 남은 만큼만.

**Files:**
- Create: `lib/journal/buildSpreads.ts`
- Test: `__tests__/buildSpreads.test.ts`

- [ ] **Step 1: 실패하는 테스트 작성**

`__tests__/buildSpreads.test.ts`:

```typescript
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
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `bun run test buildSpreads`
Expected: FAIL — `buildSpreads` 모듈 없음 / import 에러.

- [ ] **Step 3: 헬퍼 구현**

`lib/journal/buildSpreads.ts`:

```typescript
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
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `bun run test buildSpreads`
Expected: PASS — 7개 통과.

- [ ] **Step 5: 커밋**

```bash
git add lib/journal/buildSpreads.ts __tests__/buildSpreads.test.ts
git commit -m "feat(journal): buildSpreads helper for editorial hero + rhythm"
```

---

## Task 3: `GridCard` variant 추가

`variant`로 이미지 비율·제목 크기/폰트·캡션을 분기. 기본값 `'small'`(현재 모습 유지). 히어로 제목만 Gravitas(디스플레이) + 줄바꿈 허용, 나머지는 Inter 한 줄.

**Files:**
- Modify: `components/journal/GridCard.tsx` (전체 교체)

- [ ] **Step 1: GridCard 전체 교체**

`components/journal/GridCard.tsx` 전체를 아래로 교체:

```tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { FeedEntry, PieceStatus } from '@/types/journal';
import { useLanguage } from '@/lib/language-context';

const STATUS_COLOR: Record<PieceStatus, string> = {
  available: '#9ccfae',
  sold_out: '#b06a64',
  commission_only: '#9aa39c',
};

const STATUS_LABEL = {
  en: { available: 'Available', sold_out: 'Sold Out', commission_only: 'Commission' },
  ko: { available: '구매 가능', sold_out: '판매 완료', commission_only: '커미션' },
};

const CATEGORY_LABEL = {
  en: { furniture: 'Furniture', object: 'Object', painting: 'Painting' },
  ko: { furniture: '가구', object: '오브제', painting: '페인팅' },
};

export type CardVariant = 'hero' | 'large' | 'medium' | 'small';

const VARIANT: Record<
  CardVariant,
  { image: string; title: string; titleWrap: string; titleFont: string; titleWeight: number; sizes: string }
> = {
  hero: {
    image: 'aspect-[4/5] md:aspect-[3/2]',
    title: 'text-2xl md:text-4xl leading-[1.1] text-balance',
    titleWrap: '',
    titleFont: 'var(--font-gravitas), serif',
    titleWeight: 400,
    sizes: '(max-width: 768px) 100vw, 70vw',
  },
  large: {
    image: 'aspect-[4/5]',
    title: 'text-lg md:text-xl leading-[1.2]',
    titleWrap: 'whitespace-nowrap overflow-hidden',
    titleFont: 'var(--font-inter), sans-serif',
    titleWeight: 600,
    sizes: '(max-width: 768px) 100vw, 45vw',
  },
  medium: {
    image: 'aspect-[4/5]',
    title: 'text-base leading-[1.2]',
    titleWrap: 'whitespace-nowrap overflow-hidden',
    titleFont: 'var(--font-inter), sans-serif',
    titleWeight: 600,
    sizes: '(max-width: 768px) 100vw, 33vw',
  },
  small: {
    image: 'aspect-square',
    title: 'text-[13px] md:text-[14px] leading-[1.18]',
    titleWrap: 'whitespace-nowrap overflow-hidden',
    titleFont: 'var(--font-inter), sans-serif',
    titleWeight: 600,
    sizes: '(max-width: 768px) 50vw, 22vw',
  },
};

export default function GridCard({
  entry,
  variant = 'small',
}: {
  entry: FeedEntry;
  variant?: CardVariant;
}) {
  const { lang } = useLanguage();
  const v = VARIANT[variant];

  return (
    <Link
      href={`/works/${entry.id}`}
      className="group block"
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
    >
      {/* Meta row */}
      <div className="flex items-center gap-2.5 mb-2.5">
        <span
          className="text-[10px] tracking-[0.18em] uppercase text-[#888]"
          style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
        >
          {CATEGORY_LABEL[lang][entry.category]}
        </span>
        {entry.year && (
          <>
            <span className="text-[#bbb] text-[10px]">·</span>
            <span
              className="text-[10px] tracking-[0.18em] uppercase text-[#888]"
              style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
            >
              {entry.year}
            </span>
          </>
        )}
        {entry.status && (
          <>
            <span className="text-[#bbb] text-[10px]">·</span>
            <span
              className="text-[10px] tracking-[0.18em] uppercase"
              style={{
                fontFamily: 'var(--font-staatliches), sans-serif',
                color: STATUS_COLOR[entry.status],
              }}
            >
              {STATUS_LABEL[lang][entry.status]}
            </span>
          </>
        )}
      </div>

      {/* Title */}
      <h3
        className={`${v.title} ${v.titleWrap} text-[#F2EDE4] mb-3 tracking-[-0.005em] group-hover:text-white transition-colors duration-300`}
        style={{ fontFamily: v.titleFont, fontWeight: v.titleWeight }}
      >
        {entry.title}
      </h3>

      {/* Image */}
      <div className={`relative w-full ${v.image} overflow-hidden bg-[#2a2e2c] rounded-lg`}>
        <Image
          src={entry.image}
          alt={entry.title}
          fill
          sizes={v.sizes}
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: 타입체크**

Run: `bunx tsc --noEmit`
Expected: 출력 없음. (GridLayout이 아직 variant 없이 `<GridCard entry=.../>`를 쓰지만 `variant`는 옵셔널이라 OK.)

- [ ] **Step 3: 커밋**

```bash
git add components/journal/GridCard.tsx
git commit -m "feat(journal): GridCard size variants (hero/large/medium/small)"
```

---

## Task 4: `SpreadRow` 컴포넌트

한 행을 종류별로 렌더. `largeDuo` = 큰 1점 + 작은 2점(데스크탑 우측 세로 스택, 모바일 2열). `triptych` = 모바일 2열/데스크탑 3열. `duo` = 모바일 1열/데스크탑 2열. `largeDuo`에 작은 작품이 없으면(꼬리 1개) 큰 작품만 풀폭.

**Files:**
- Create: `components/journal/SpreadRow.tsx`

- [ ] **Step 1: SpreadRow 작성**

`components/journal/SpreadRow.tsx`:

```tsx
import type { SpreadRow as SpreadRowData } from '@/lib/journal/buildSpreads';
import GridCard from './GridCard';

/** One editorial row. Reflows to mobile: largeDuo → big then 2-col smalls;
 *  triptych → 2-col; duo → stacked. */
export default function SpreadRow({ row }: { row: SpreadRowData }) {
  if (row.kind === 'largeDuo') {
    const [large, ...smalls] = row.items;
    if (!large) return null;
    if (smalls.length === 0) {
      return <GridCard entry={large} variant="large" />;
    }
    return (
      <div className="flex flex-col md:flex-row gap-x-5 gap-y-8 md:gap-6">
        <div className="md:flex-[2]">
          <GridCard entry={large} variant="large" />
        </div>
        <div className="md:flex-1 grid grid-cols-2 md:grid-cols-1 gap-x-5 gap-y-8 md:gap-6">
          {smalls.map((e) => (
            <GridCard key={e.id} entry={e} variant="small" />
          ))}
        </div>
      </div>
    );
  }

  if (row.kind === 'triptych') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-8 md:gap-6">
        {row.items.map((e) => (
          <GridCard key={e.id} entry={e} variant="small" />
        ))}
      </div>
    );
  }

  // duo
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-6">
      {row.items.map((e) => (
        <GridCard key={e.id} entry={e} variant="medium" />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: 타입체크**

Run: `bunx tsc --noEmit`
Expected: 출력 없음.

- [ ] **Step 3: 커밋**

```bash
git add components/journal/SpreadRow.tsx
git commit -m "feat(journal): SpreadRow renders largeDuo/triptych/duo rows"
```

---

## Task 5: `GridLayout` 통합

균일 그리드를 히어로 + 스프레드 행 렌더로 교체. 빈 상태·Available 배너·헤더는 그대로.

**Files:**
- Modify: `components/journal/GridLayout.tsx`

- [ ] **Step 1: import 교체**

`components/journal/GridLayout.tsx` 상단 import 블록을 아래로 교체(기존 `import Link from 'next/link';`는 더 이상 안 쓰므로 제거):

```tsx
import { JOURNAL_ENTRIES } from '@/data/journal-entries';
import type { Category } from '@/types/journal';
import { buildSpreads } from '@/lib/journal/buildSpreads';
import GridCard from './GridCard';
import SpreadRow from './SpreadRow';
import CategoryTabs from './CategoryTabs';
import AboutPopover from './AboutPopover';
```

- [ ] **Step 2: 레이아웃 계산 추가**

`entries` 필터링 직후(`if (availableOnly) {...}` 블록 다음 줄)에 한 줄 추가:

```tsx
  if (availableOnly) {
    entries = entries.filter((e) => e.status === 'available');
  }
  const layout = buildSpreads(entries);
```

- [ ] **Step 3: 그리드 블록 교체**

기존 `{/* Grid */}` 주석부터 그 `</div>`까지(아래 블록 전체)를:

```tsx
      {/* Grid */}
      <div className="px-6 md:px-10 pt-6 md:pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 md:gap-x-6 gap-y-10 md:gap-y-14 pb-16 md:pb-24">
        {entries.length === 0 ? (
          <div className="col-span-full py-16 text-center text-[#8a9488] text-sm">
            현재 구매 가능한 작품이 없습니다. Commission으로 의뢰해주세요.
          </div>
        ) : (
          entries.map((entry) => <GridCard key={entry.id} entry={entry} />)
        )}
      </div>
```

아래로 교체:

```tsx
      {/* Editorial spreads: hero + rhythm rows */}
      {entries.length === 0 ? (
        <div className="px-6 md:px-10 py-16 text-center text-[#8a9488] text-sm">
          현재 구매 가능한 작품이 없습니다. Commission으로 의뢰해주세요.
        </div>
      ) : (
        <div className="px-6 md:px-10 pt-6 md:pt-2 pb-16 md:pb-24 flex flex-col gap-y-12 md:gap-y-20">
          {layout.hero && <GridCard entry={layout.hero} variant="hero" />}
          {layout.rows.map((row, ri) => (
            <SpreadRow key={ri} row={row} />
          ))}
        </div>
      )}
```

- [ ] **Step 4: 타입체크 + 전체 테스트**

Run: `bunx tsc --noEmit && bun run test`
Expected: 타입 에러 0, 모든 테스트 PASS(buildSpreads 7개 + 기존 테스트).

- [ ] **Step 5: 커밋**

```bash
git add components/journal/GridLayout.tsx
git commit -m "feat(journal): GridLayout renders editorial hero + spread rows"
```

---

## Task 6: 빌드 검증 + 시각 확인

**Files:** 없음(검증 전용)

- [ ] **Step 1: 프로덕션 빌드**

Run: `bun run build`
Expected: `✓ Compiled successfully`, 페이지 생성 에러 0. `/`, `/available`, `/works/[id]`, `/projects` 모두 빌드됨.

- [ ] **Step 2: dev 서버에서 시각 확인 (워크트리에서)**

Run: `bun run dev` (워크트리 루트에서)
브라우저로 확인:
- `http://localhost:3000/` — 맨 위 히어로(Turquoise Resin Table) 크게, 아래로 큰1+작은2 → 3등분 → 큰2 리듬, 여백 넉넉
- `http://localhost:3000/?category=object` — object 25점이 같은 리듬으로, 히어로 = object 첫 작품
- `http://localhost:3000/?category=furniture` — 8점, 히어로 = Turquoise(featured)
- `http://localhost:3000/available` — Available 배너 + 히어로 + 남은 1점(꼬리 처리: 큰 작품 풀폭)
- 모바일(390px, DevTools) — 히어로 풀폭, 풀폭↔2열 번갈이, 카드 클릭 → 상세 이동
- 작품 클릭 → `/works/[id]` 정상

- [ ] **Step 3: 가드레일 점검(눈으로)**

- 글로우·레인보우 그라디언트·blur 애니메이션 없음(호버는 scale + 어두운 베일만)
- 보라 배경(`#110D1C`) 유지, 톤 변화 없음
- 세로 원본 이미지 잘림 과하지 않은지(특히 hero `md:aspect-[3/2]`) — 과하면 후속 조정 메모

- [ ] **Step 4: (문제 없으면) 최종 커밋 없음 — Task별 커밋으로 충분**

빌드·테스트·시각 확인이 끝나면 작업 완료. 푸시는 사용자 확인 후 별도로.

---

## Self-Review (작성자 점검 결과)

- **스펙 커버리지:** 히어로(C)=Task1·5, 리듬(B)=Task2·4·5, 분위기(D, 여백·캡션·호버)=Task3·5, 비율 잘림 주의=Task3(hero ratio)·Task6 점검, 엣지케이스(빈/1점/꼬리/Available)=Task2 테스트+Task4 largeDuo 꼬리 처리+Task5 빈 상태. 사이드바 미변경=파일 구조에서 명시. ✅
- **플레이스홀더:** 없음(모든 스텝에 실제 코드/명령).
- **타입 일관성:** `buildSpreads`/`SpreadLayout`/`SpreadRow`(타입)/`SpreadRow`(컴포넌트, `SpreadRowData`로 import)/`CardVariant`('hero'|'large'|'medium'|'small') 전 태스크 일치. `variant` 값은 Task4에서 large/small/medium만 사용, hero는 Task5에서 사용 — 모두 VARIANT에 정의됨. ✅
