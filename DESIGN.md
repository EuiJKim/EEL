# Design System — 일(EEL)

## Product Context
- **What this is:** 프리미엄 순수 레진 아트퍼니처 브랜드. 수제 레진 테이블/오브제를 커스텀 제작하는 e-커머스+쇼케이스 사이트
- **Who it's for:** 디자인 의식이 있는 프리미엄 가구 구매자. 유일성과 수제 품질에 가치를 두는 고객
- **Space/industry:** 프리미엄 아트퍼니처 / 럭셔리 수제 가구
- **Project type:** 아트퍼니처 쇼케이스 + BTO(Build-to-Order) Commission

---

## Aesthetic Direction
- **Direction:** Dark Atelier (어두운 아뜰리에)
- **Decoration level:** 최소한 (minimal) — 타이포그래피와 여백이 모든 것을 말한다
- **Mood:** 서울의 작은 공방. 어둡고 조용한 공간에서 빛나는 레진 한 점. 제품이 공간을 채우고, 공간이 제품을 빛나게 한다.
- **Reference:** https://eeleeleeleel.github.io/eel/index.html (원본 사이트)

---

## Typography

### Font Stack
- **Logo/Display:** `Gravitas One` — 브랜드 로고 "EEL", 히어로 타이틀. 묵직한 serif.
- **Body/Description:** `Telex` — 본문, 설명 텍스트, 스펙, 가격. 깔끔한 sans-serif.
- **UI/Navigation:** `Staatliches` — 네비게이션, 라벨, 버튼. uppercase + letter-spacing. condensed sans-serif.
- **Contact Modal:** `DM Sans` — Contact 모달 전용. 부드러운 geometric sans-serif.

### Loading
```html
<link href="https://fonts.googleapis.com/css2?family=Gravitas+One&family=Telex&family=Staatliches&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet"/>
```

### Type Scale
| Role | Font | Size | Weight | Usage |
|------|------|------|--------|-------|
| Hero Logo | Gravitas One | clamp(36px, 5vw, 56px) | 400 | 메인 히어로 "EEL" |
| Page Title | Gravitas One | clamp(28px, 3.2vw, 46px) | 400 | Commission 타이틀 등 |
| Step Title | Gravitas One | 36px (lg), 24px (sm) | 400 | Color, Size, Height 등 |
| Body | Telex | clamp(13px, 1.4vw, 17px) | 400/700 | 설명 텍스트 |
| Product Name | Telex | clamp(16px, 2.4vw, 32px) | 900 | 작품 상세 제목 |
| Specs | Telex | clamp(10px, 1vw, 13px) | 400 | 사이즈, 규격 |
| Price | Telex | clamp(12px, 1.1vw, 15px) | 400 | 가격 표시 |
| Nav Link | Staatliches | 14px (desktop), 12px (mobile) | 400 | uppercase, tracking 0.08em |
| Step Number | Staatliches | 22px | 400 | "01", "02" 등 |
| Footer Info | Telex | 9px | 400 | 영업시간, 주소, 라이선스 |
| Contact Modal | DM Sans | 14-18px | 400/500 | 연락처 정보 |

---

## Color

### Homepage (Hero)
배경은 히어로 이미지. 텍스트와 UI는 검은색 (#000).

| Token | Value | Usage |
|-------|-------|-------|
| Hero text | `#000000` | 히어로 텍스트, 아이콘 |
| Hero stroke | `0.4-1.2px #000` | WebkitTextStroke |
| Nav bg | `#000000` | 하단 네비게이션 바 |
| Nav text | `#FFFFFF` | 네비 링크 |
| Nav toggle | `#000000` | 좌상단 원형 버튼 |
| Footer text | `#000` opacity 0.65 | 우하단 정보 |

### Works / Detail Pages
| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#2e3330` | 다크 그린 배경 |
| `--text` | `#e8ebe8` | 주요 텍스트 |
| `--sub` | `#8a9488` | 보조 텍스트 |
| `--border` | `#404840` | 테두리 |
| Specs text | `#888888` | 사이즈/규격 |
| Topbar bg | `#000000` | Works/Commission 상단바 |

### Commission Page
| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0e0e0e` | 페이지 배경 |
| Text | `#e8e8e8` | 주요 텍스트 |
| Sub text | `#666666` | 보조/비활성 |
| Border | `#222222` | 구분선, 카드 테두리 |
| Selected | `#FFFFFF` border | 선택된 옵션 |
| Selected bg | `rgba(255,255,255,0.04)` | 선택된 옵션 배경 |
| Submit button | `#FFFFFF` bg, `#000` text | 문의 보내기 버튼 |

### Contact Modal
| Token | Value | Usage |
|-------|-------|-------|
| Overlay | `rgba(0,0,0,0.4)` | 모달 오버레이 |
| Modal bg | `#111111` | 모달 배경 |
| Divider | `#2a2a2a` | 구분선 |
| Text | `#e8e8e8` | 연락처 텍스트 |

---

## Spacing
- **Base unit:** 자유 (원본 사이트 스타일에 맞춤)
- **Density:** 여유로운 (spacious) — 히어로에 충분한 호흡

| Context | Value | Usage |
|---------|-------|-------|
| Hero text gap | 12-16px | 텍스트 블록 간격 |
| Nav height | 64px | 하단 네비게이션 |
| Topbar height | 68px | Works/Commission 상단바 |
| Section margin | 80-120px | Commission 단계 간격 (lg) |
| Section margin (mobile) | 48-64px | 모바일 단계 간격 |
| Card padding | 28px 20px | Size/Legs 카드 |

---

## Layout
- **Homepage:** 전체화면 fixed 히어로 이미지 + 좌측 텍스트 오버레이
- **Navigation:** 하단 고정 바 (스크롤 업 시 표시, 다운 시 숨김)
- **Works:** 3열 그리드 (데스크톱) / 2열 (모바일), gap 없음
- **Product Detail:** 좌측 50-66% 정보 + 우측 33-50% 스크롤 갤러리
- **Commission:** 좌측 스텝 스크롤 + 우측 sticky 3D 프리뷰 (데스크톱) / 상단 3D + 아래 스텝 (모바일)

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| Swatch | 4px | 컬러 스워치 |
| Modal | 12px | Contact 모달 |
| Shape icon | 0 | Shape 선택 카드 |

---

## Motion
- **Approach:** 최소한 기능적 (minimal-functional)

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| Intro overlay | 1.4s | cubic-bezier(0.4, 0, 0.2, 1) | 검은 오버레이 페이드아웃 |
| Hero zoom | 2.4s | cubic-bezier(0.4, 0, 0.2, 1) | scale(1.12→1) 이미지 |
| Logo intro | 0.6s→0.8s | easeOut → cubic-bezier | 로고 페이드인 → 축소 |
| Nav slide | 0.4s | cubic-bezier(0.4, 0, 0.2, 1) | 하단 네비 슬라이드 |
| Scroll hint | 1.6s | ease-in-out infinite | 깜빡이는 화살표 |
| Detail overlay | 0.4s | ease | 작품 상세 페이드인 |
| Zoom overlay | 0.3s | ease | 이미지 확대 페이드인 |
| Fade-up | 0.7s | ease | Commission 단계 진입 |
| Dropdown | 0.3s | ease | Works 드롭다운 메뉴 |

---

## Accessibility & Touch Targets
- **최소 터치 영역:** 36px (프리미엄 브랜드 밸런스, 44px Apple 가이드라인 참고)
- **네비 버튼:** 텍스트 크기 유지 + py-2 패딩으로 터치 영역 확보 (~36px)
- **드롭다운 항목:** py-2 패딩
- **소셜 아이콘:** 아이콘 24px + 주변 패딩으로 36px+ 터치 영역
- **모달 닫기 버튼:** 최소 36x36px
- **폰트 제한:** Gravitas One / Telex / Staatliches / DM Sans(Contact 모달) 4종만 사용 (추가 폰트 금지)

---

## Key Components
- **Nav Toggle:** 좌상단 28px 검은 원형 버튼
- **Cart Icon:** 우상단 30px SVG bag 아이콘
- **Scroll Hint:** 하단 중앙 40px 화살표, blink 애니메이션
- **Bottom Nav:** 하단 64px 검은 바, Works(드롭다운)/Commission/Contact, 버튼 터치 영역 36px+
- **Contact Modal:** 480px, Instagram/Email/주소/전화번호
- **Works Grid:** gap 없음, aspect-ratio 1:1.2
- **3D Preview:** Three.js procedural 테이블 (ExtrudeGeometry organic shape)

---

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-23 | 디자인 시스템 최초 생성 | /design-consultation — 코드베이스 분석 + 경쟁사 리서치 기반 |
| 2026-04-13 | 원본 사이트 스타일로 전환 | eeleeleeleel.github.io 기준, Gravitas One + Telex + Staatliches |
| 2026-04-13 | 배경색 #0a0a0a → #2e3330 | 다크 그린으로 변경 (원본 사이트 매칭) |
| 2026-04-13 | 네비게이션 사이드바 → 하단 바 | 원본 사이트 구조 매칭, 스크롤 연동 |
| 2026-04-13 | Commission 7단계 빌더 | Color(+Opacity)→Shape→Size→Height→Legs→Inquiry, 원본 + Shape + Opacity 추가 |
| 2026-04-13 | Three.js 직접 생성 3D | GLTF 의존 제거, procedural organic/round/square/rectangle |
| 2026-04-14 | Rectangle+Pedestal 제약 | 직사각형 선택 시 Pedestal 다리 선택 불가 (자동 4 Legs 전환) |
| 2026-04-14 | DB pooler URL 전환 | Supabase ap-northeast-2 pooler, products 페이지 Prisma→Supabase 직접 쿼리 |
| 2026-04-14 | 배포 도메인 | eel-studio.me (Vercel 커스텀 도메인) |
| 2026-04-15 | Commission 투명도 단계 추가 | Color 선택에 투명/반투명/불투명 옵션 추가, 3D 프리뷰 반영 |
| 2026-04-15 | 커미션 문의 이메일 연동 | /api/commission-inquiry → Resend로 관리자에게 문의 발송 |
| 2026-04-15 | 제품 이미지 대량 추가 | Furniture 5종, Object 15종, Painting 8종 (public/products/) |
| 2026-04-15 | 터치 타겟 최소 36px | 네비 버튼 py-2 패딩 추가, 드롭다운 항목 패딩 확대, 디자인 리뷰 기반 |
| 2026-04-15 | 폰트 4종 확정 | Gravitas One / Telex / Staatliches / DM Sans(Contact 모달), 추가 폰트 금지 |
