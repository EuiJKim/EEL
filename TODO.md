# EEL 프로젝트 현황

## 프로젝트 개요
- **브랜드**: 일(EEL) — 프리미엄 순수 레진 아트퍼니처
- **스택**: Next.js 16 + TypeScript + Supabase + Tailwind CSS v4 + Three.js
- **배포**: Vercel → https://eel-studio.me
- **패키지 매니저**: bun

---

## 구현 완료

### 페이지
- [x] `/` — 메인 홈 (풀스크린 fixed 히어로 이미지 + 하단 고정 네비)
- [x] `/products` — Works 페이지 (3열 그리드, 카테고리: Furniture/Object/Painting)
- [x] `/products/[id]` — 제품 상세 (좌측 정보 + 우측 스크롤 갤러리 + 줌)
- [x] `/order` — Commission 6단계 빌더 (Color→Shape→Size→Height→Legs→Inquiry + 3D 프리뷰)
- [x] `/auth` — Google OAuth 로그인
- [x] `/orders` — 내 주문 내역 (로그인 필요)
- [x] `/admin` — 주문 관리 (ADMIN_EMAIL만 접근)

### 컴포넌트
- [x] `BottomNav` — 하단 고정 네비 (Works 드롭다운/Commission/Contact), 스크롤 연동
- [x] `ContactModal` — Instagram/Email/Location/Phone
- [x] `CommissionPreview3D` — Three.js procedural 3D 테이블 (ExtrudeGeometry, shape/color/size/height/legs 반응형)
- [x] `CommissionClient` — 6단계 커스텀 빌더, 25색 팔레트, 4가지 Shape, 직사각형-Pedestal 제약
- [x] `WorksPageClient` — 3열(데스크톱)/2열(모바일) 그리드, 상세 오버레이

### API
- [x] `POST /api/notify` — 주문 접수 시 관리자/고객 이메일 발송 (Resend)
- [x] `PATCH /api/admin/update-order` — 주문 상태 변경 (admin only)
- [x] `POST /api/orders` — 주문 생성
- [x] `GET /api/bto-options` — BTO 옵션 목록

### 인프라
- [x] Supabase Auth (Google OAuth)
- [x] Supabase DB (pooler 연결, ap-northeast-2)
- [x] Resend 이메일 (커스텀 도메인: order@send.eel-studio.me)
- [x] Vercel 배포 + 커스텀 도메인 (eel-studio.me)
- [x] 환경변수 설정 완료 (Vercel + .env.local)

### 디자인
- [x] Dark Atelier 디자인 시스템 (DESIGN.md)
- [x] 폰트: Gravitas One / Telex / Staatliches
- [x] 다크 그린 배경 (#2e3330) + 오프화이트 텍스트 (#e8ebe8)
- [x] 인트로 애니메이션 (검은 화면 페이드아웃 1.4s)
- [x] 히어로 줌 애니메이션 (2.4s)

---

## 현재 이슈

### 코드 정리
- [ ] 미사용 레거시 컴포넌트 삭제: BTOBuilder, TableHero, CraftBridge, HomeProductsSection, Footer, TablePreview3DLegacy, ProductsCatalogClient
- [ ] Prisma 스키마 타입 불일치 — `product_images.id` DB integer vs 스키마 String
- [ ] products 페이지 외 다른 페이지들도 Prisma → Supabase 직접 쿼리 전환 검토

---

## 다음 작업

### 기능
- [ ] Commission 문의 폼 실제 이메일 발송 연동
- [ ] 결제 시스템 연동 (Toss Payments / 카카오페이)
- [ ] 모바일 반응형 전면 점검
- [ ] AR 미리보기 (WebXR)

### 브랜드/디자인
- [ ] OG 이미지 설정
- [ ] 파비콘 적용
- [ ] 제품 이미지 업로드 (Supabase Storage)
- [ ] 실제 제품 데이터 입력

### 인프라
- [ ] Supabase RLS 정책 점검
- [ ] Google OAuth Redirect URI — 프로덕션 도메인 추가
- [ ] 테스트 커버리지 확대
