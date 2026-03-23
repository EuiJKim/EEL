# Design System — 일(EEL)

## Product Context
- **What this is:** 프리미엄 순수 레진 아트퍼니처 브랜드. 수제 레진 테이블을 커스텀 제작(BTO)하는 e-커머스 사이트
- **Who it's for:** 디자인 의식이 있는 프리미엄 가구 구매자. 유일성과 수제 품질에 가치를 두는 고객
- **Space/industry:** 프리미엄 아트퍼니처 / 럭셔리 수제 가구 e-커머스
- **Project type:** 아트퍼니처 e-커머스 + BTO(Build-to-Order) 빌더

---

## Aesthetic Direction
- **Direction:** Dark Precision (어두운 정밀함)
- **Decoration level:** 최소한 (minimal) — 장식은 없다. 타이포그래피와 여백이 모든 것을 말한다
- **Mood:** 애플이 가구를 만든다면. 지나친 것이 없고, 부족한 것도 없다. 제품이 공간을 채우고, 공간이 제품을 빛나게 한다. 장인성은 절제로 표현된다 — 글꼴의 선택, 여백의 너비, 타이포그래피의 위계.
- **Why dark:** 어둠은 군더더기를 지운다. 제품 이미지와 텍스트만 남는다. 경쟁사가 크림색 배경에 많은 것을 채울 때, EEL은 어둠 속에서 제품 하나를 놓는다.
- **Anti-pattern:** 빛나는 글로우, 레인보우 그라디언트, 카드 위 레진 색상 ambient glow — 모두 금지. 장식이 아닌 절제가 장인성이다.

---

## Typography

### Font Stack
- **Display/Hero (한글):** `Noto Serif KR` — 한국어 세리프. Fraunces와 같은 따뜻한 권위감. 히어로 제목, 섹션 타이틀 한글에 사용.
- **Display/Hero (영문):** `Fraunces` — 라틴 세리프. 영문 브랜드 모멘트, 이탤릭 강조에 사용.
- **Body/UI:** `DM Sans` — 모든 본문, 레이블, 버튼, 네비게이션.
- **Data/Prices/Specs:** `Geist Mono` — 가격, 스펙 수치, 주문 번호. tabular-nums.

> **왜 두 개의 디스플레이 폰트?** Fraunces는 한국어 글리프가 없어서 한글이 시스템 폰트로 fallback된다. Noto Serif KR이 한글 세리프 담당, Fraunces가 영문 세리프 담당.

### Loading
```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;600&family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..400&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet"/>
```

### Type Scale
| Role | Font | Size | Weight | Usage |
|------|------|------|--------|-------|
| Hero (한글) | Noto Serif KR | clamp(2.5rem, 6vw, 4.5rem) | 600 | 메인 히어로 한글 제목 |
| Hero (영문) | Fraunces | same | 400 italic | 영문 브랜드 강조, 이탤릭 |
| Section title (한글) | Noto Serif KR | 1.75rem | 600 | 섹션 헤딩 한글 |
| Card title | DM Sans | 1rem–1.1rem | 600 | 제품명 — 세리프 금지, 깔끔하게 |
| Body | DM Sans | 15px | 400 | 본문 |
| Label | DM Sans | 10px | 700 | uppercase tracking-[.2em] 레이블 |
| UI / Button | DM Sans | 13–14px | 500 | 버튼, 네비 |
| Price | Geist Mono | 14–16px | 500 | 가격, tabular-nums |
| Spec / Code | Geist Mono | 12–13px | 400 | 치수, HEX, 주문번호 |

**규칙:** Fraunces는 히어로·섹션 타이틀에만. 카드, 버튼, 네비에는 DM Sans만.

---

## Color

### Approach: 단색에 가깝게 — 강조색은 딱 한 번
어두운 배경 + 오프화이트 텍스트 + 앰버 단 하나. 앰버는 주요 CTA 버튼에만. 카드에 색을 입히거나 배경에 글로우를 넣지 않는다.

### Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#0a0a0a` | 페이지 배경 |
| `--surface` | `#111111` | 카드, 모달 표면 |
| `--surface2` | `#1a1a1a` | 중첩 표면, 호버 배경 |
| `--border` | `rgba(255,255,255,0.07)` | 기본 테두리 — 거의 안 보이게 |
| `--border2` | `rgba(255,255,255,0.12)` | 호버 테두리 |
| `--text` | `#F5F5F4` | 주요 텍스트 |
| `--text2` | `rgba(245,245,244,0.50)` | 보조 텍스트 |
| `--text3` | `rgba(245,245,244,0.28)` | 비활성/캡션 |
| **`--amber`** | **`#C8922A`** | **주요 CTA 버튼에만 — 다른 곳에 쓰지 않는다** |
| `--amber-glow` | 사용 금지 | 배경 글로우에 앰버 사용 금지 |

### 색 사용 원칙
- 카드에 그라디언트/글로우 배경 금지
- UI 요소에 컬러 accent 금지 (CTA 버튼 제외)
- 상태 표시(주문 상태 배지)는 예외 — 기능적 색상

### Semantic Colors (주문 상태 배지만)
| Status | Color | BG |
|--------|-------|----|
| pending | `#FCD34D` | `rgba(252,211,77,0.08)` |
| confirmed | `#60A5FA` | `rgba(96,165,250,0.08)` |
| in_progress | `#F97316` | `rgba(249,115,22,0.08)` |
| completed | `#4ADE80` | `rgba(74,222,128,0.08)` |
| cancelled | `#71717A` | `rgba(113,113,122,0.08)` |

---

## Spacing
- **Base unit:** 8px
- **Density:** 여유로운(spacious) — 애플처럼. 여백이 프리미엄이다.

| Token | Value | Usage |
|-------|-------|-------|
| 2xs | 2px | 미세 간격 |
| xs | 4px | 아이콘-텍스트 |
| sm | 8px | 컴팩트 패딩 |
| md | 16px | 기본 패딩 |
| lg | 24px | 섹션 내 간격 |
| xl | 48px | 카드 패딩 |
| 2xl | 80px | 섹션 간격 |
| 3xl | 120–160px | 히어로/섹션 상하 패딩 |

---

## Layout
- **Approach:** 정밀한 그리드 (precision grid) — 이탈 없음
- **Grid:** 1컬럼(모바일) / 2컬럼(태블릿 768px+) / 3컬럼(데스크탑 1024px+)
- **Max content width:** 980px (제품 카탈로그), 720px (주문 폼/추적)
- **Container padding:** 48px (데스크탑), 20px (모바일)

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| sm | 6px | 스워치, 소형 요소 |
| md | 10px | 소형 카드, 배지 |
| lg | 14px | 제품 카드, 폼 섹션 |
| xl | 18px | 모달 |
| full | 9999px | 버튼, 배지 |

**규칙:** 반경을 작게 유지. 애플처럼 너무 둥글지 않게.

---

## Motion
- **Approach:** 최소한 기능적 (minimal-functional) — 이해를 돕는 전환만. 없으면 더 좋다.
- **Easing:** 진입 `ease-out` / 퇴장 `ease-in`
- **Duration:**

| Type | Duration | Usage |
|------|----------|-------|
| micro | 80–120ms | 색상 전환, 호버 |
| short | 200–300ms | 버튼, 카드 진입 |
| medium | 300–450ms | 모달, 페이지 진입 |

- **카드 진입:** `opacity: 0 → 1` + `y: 8 → 0` 스태거. 8px 이상 이동하지 않는다.
- **금지:** blur 애니메이션, scale 애니메이션, 복잡한 스프링. 움직임이 눈에 띄면 너무 많다.

---

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-23 | 디자인 시스템 최초 생성 | /design-consultation — 코드베이스 분석 + 경쟁사 리서치 기반 |
| 2026-03-23 | 앰버(#C8922A) 강조색 선택 | 경쟁사 대비 차별화. 레진·황금 수지 연상 |
| 2026-03-23 | Fraunces 세리프 채택 | 히어로/타이틀에만. 장인 감성의 유일한 장식 |
| 2026-03-23 | DM Sans 본문 채택 | 깔끔함과 한국어 가독성 |
| 2026-03-23 | 다크 테마 유지 | 경쟁사 전부 라이트. 어둠이 차별점 |
| 2026-03-23 | Obsidian Craft → Dark Precision 방향 전환 | "Simple as Apple" + 장인 감성. 글로우·그라디언트 제거. 절제가 장인성 |
