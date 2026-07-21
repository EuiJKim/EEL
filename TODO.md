# EEL 프로젝트 현황

## 프로젝트 개요
- **브랜드**: 일(EEL) — 프리미엄 순수 레진 아트퍼니처
- **스택**: Next.js 16 + TypeScript + Supabase + Tailwind CSS v4 + Three.js
- **배포**: Vercel → https://eel-studio.me
- **패키지 매니저**: bun

---

## 구현 완료

### 페이지
- [x] `/` — Porto Rocha 스타일 저널 피드 홈 (에디토리얼 그리드, Furniture/Object/Painting 카테고리 탭)
- [x] `/available` — 즉시 구매 가능 피스 (Inquire to reserve)
- [x] `/projects` , `/projects/[id]` — 프로젝트(구 Book) 상세, `/book`은 레거시 리다이렉트로 유지
- [x] `/works/[id]` — 작품 상세 (Object/Painting은 Inquire만, Commission 버튼 없음)
- [x] `/products` — Works 페이지 (3열 그리드, 카테고리: Furniture/Object/Painting)
- [x] `/products/[id]` — 제품 상세 (좌측 정보 + 우측 스크롤 갤러리 + 줌)
- [x] `/order` — Commission 7단계 빌더 (Color+Opacity→Shape→Size→Height→Legs→Inquiry + 3D 프리뷰)
- [x] `/auth` — Google OAuth 로그인
- [x] `/orders` — 내 주문 내역 (로그인 필요)
- [x] `/admin` — 주문 관리 (ADMIN_EMAIL만 접근)

### 컴포넌트
- [x] `components/journal/*` — 저널 홈 시스템 (Sidebar, GridLayout, SpreadRow, GridCard variant, CategoryTabs, MobileHeader/Footer/StickyCTA, PieceInquiryButton, ProjectsGrid, AboutPopover, LiveClock)
- [x] `BottomNav` — 하단 고정 네비 (Works 드롭다운/Commission/Contact), 스크롤 연동
- [x] `ContactModal` — Instagram/Email/Location/Phone
- [x] `CommissionPreview3D` — Three.js procedural 3D 테이블 (ExtrudeGeometry, shape/color/size/height/legs/opacity 반응형)
- [x] `CommissionClient` — 7단계 커스텀 빌더, 28색 팔레트 + 커스텀 색상, 투명도 선택, 4가지 Shape, 직사각형-Pedestal 제약
- [x] `WorksPageClient` — 3열(데스크톱)/2열(모바일) 그리드, 상세 오버레이
- [x] 미사용 레거시 컴포넌트 삭제 완료 (`BTOBuilder`, `TableHero`, `CraftBridge`, `HomeProductsSection`, `Footer`, `TablePreview3DLegacy`, `ProductsCatalogClient`)

### API
- [x] `POST /api/notify` — 주문 접수 시 관리자/고객 이메일 발송 (Resend)
- [x] `POST /api/commission-inquiry` — 커미션 문의 이메일 발송 (Resend, 관리자에게)
- [x] `POST /api/piece-inquiry` — 저널/available 피스 문의
- [x] `PATCH /api/admin/update-order` — 주문 상태 변경 (admin only)
- [x] `POST /api/orders` — 주문 생성
- [x] `GET /api/bto-options` — BTO 옵션 목록

### 인프라
- [x] Supabase Auth (Google OAuth)
- [x] Supabase DB (pooler 연결, ap-northeast-2)
- [x] Resend 이메일 (커스텀 도메인: order@send.eel-studio.me)
- [x] Vercel 배포 + 커스텀 도메인 (eel-studio.me)
- [x] 환경변수 설정 완료 (Vercel + .env.local)
- [x] Dev 워크트리 정리 — 메인 폴더에서 직접 `bun run dev` (별도 워크트리 불필요)

### 디자인
- [x] Dark Atelier 디자인 시스템 (DESIGN.md)
- [x] 폰트: Gravitas One / Telex / Staatliches
- [x] 다크 그린 배경 (#2e3330) + 오프화이트 텍스트 (#e8ebe8)
- [x] 인트로 애니메이션 (검은 화면 페이드아웃 1.4s)
- [x] 히어로 줌 애니메이션 (2.4s)
- [x] OG 이미지 (`public/og-image.jpg`) + OpenGraph/Twitter Card 메타데이터
- [x] 파비콘 적용 (`app/favicon.ico`)
- [x] 모바일 카드 간격 통일, 프로젝트 summary 줄바꿈, 하단 네비 정리 (2026-06-24~)

---

## 현재 이슈

- [ ] `data/commission-pricing.ts` FROM_PRICE 시작가 숫자 기입 (기입 즉시 Inquiry에 예상 시작가 노출됨)

### 코드 정리
- [ ] `app/eel/` + `components/eel/*` — 다른 곳에서 링크되지 않는 고아 라우트 (과거 merge 충돌 해결 과정에서 유입된 것으로 보임, 삭제 검토 필요)
- [ ] Prisma 스키마 타입 불일치 — `product_images.id` DB integer vs 스키마 String
- [ ] products 페이지 외 다른 페이지들도 Prisma → Supabase 직접 쿼리 전환 검토
- [ ] `__tests__/MetaPixel.test.tsx` — `@testing-library/react` 미설치로 `tsc --noEmit`에서 에러 (devDependency 설치 필요)

---

## 다음 작업

### 기능
- [x] Commission 문의 폼 실제 이메일 발송 연동 (`/api/commission-inquiry`)
- [x] 저널 스타일 에디토리얼 홈 + Available/Projects 섹션
- [x] Commission 빌더: 반투명 제거 + 다리 소재(Wood/Stainless/Titanium)→모양 2단 선택 + 시작가 구조 (값 미기입 시 미노출)
- [ ] 결제 시스템 연동 (Toss Payments / 카카오페이)
- [ ] 모바일 반응형 전면 점검
- [ ] AR 미리보기 (WebXR)

### 브랜드/디자인
- [x] OG 이미지 설정
- [x] 파비콘 적용
- [ ] 제품 이미지 업로드 (Supabase Storage)
- [ ] 실제 제품 데이터 입력

### 인프라
- [ ] Supabase RLS 정책 점검
- [ ] Google OAuth Redirect URI — 프로덕션 도메인 추가
- [ ] 테스트 커버리지 확대
