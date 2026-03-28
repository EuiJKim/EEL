# EEL 프로젝트 현황

## 프로젝트 개요
- **브랜드**: 일(EEL) — 프리미엄 순수 레진 아트퍼니처
- **스택**: Next.js 16 + TypeScript + Supabase + Framer Motion + Tailwind CSS v4
- **배포**: Vercel → https://eel-smoky.vercel.app
- **로컬**: http://localhost:3000
- **패키지 매니저**: bun

---

## 구현 완료

### 페이지
- [x] `/` — 메인 홈 (TableHero → CraftBridge → BTOBuilder)
- [x] `/products` — 제품 카탈로그 (Supabase 연동)
- [x] `/products/[id]` — 제품 상세 페이지
- [x] `/auth` — Google OAuth 로그인
- [x] `/orders` — 내 주문 내역 (로그인 필요)
- [x] `/admin` — 주문 관리 (ADMIN_EMAIL만 접근 가능)

### 컴포넌트
- [x] `Header` — 유리형 플로팅 헤더, 로그인/로그아웃, 유저 드롭다운
- [x] `TableHero` — 제품 갤러리, 동적 배경, 썸네일 스위처
- [x] `CraftBridge` — 제조 과정 4단계 + 통계 섹션
- [x] `BTOBuilder` — 5단계 커스텀 주문 (사이즈→레진→우드→다리→주문 요약)
- [x] `AdminOrderList` — 주문 필터링, 상태 변경 (Optimistic UI)

### API
- [x] `POST /api/notify` — 주문 접수 시 관리자/고객 이메일 발송 (Resend)
- [x] `PATCH /api/admin/update-order` — 주문 상태 변경 (admin only)
- [x] `GET /auth/callback` — Google OAuth 콜백 처리

### 인프라
- [x] Supabase Auth (Google OAuth)
- [x] Supabase DB 테이블: `products`, `product_images`, `product_specs`, `orders`, `profiles`, `size_options`, `resin_options`, `wood_options`, `leg_options`
- [x] Resend 이메일 연동 (주문 알림)
- [x] `.env.local` 환경변수 설정 완료

### 코드 정리 (2026-03-16)
- [x] `formatKRW` / `formatDate` → `lib/utils.ts` 공통 유틸로 통합
- [x] `WoodStep` + `LegStep` → `SwatchStep` 하나로 합침
- [x] `layout.tsx` `lang="ko"` 수정, `Geist_Mono` 미사용 제거
- [x] `auth/page.tsx` hover 효과 JS DOM 조작 → Tailwind 클래스로 교체
- [x] `.env.local` 누락 변수 추가 (`RESEND_API_KEY`, `ADMIN_EMAIL`, `NEXT_PUBLIC_SITE_URL`)

---

## 현재 이슈

### 🔴 Critical
- [ ] **Resend 발신 도메인 미설정** — 현재 `onboarding@resend.dev`로 발송 중. 실서비스 전에 커스텀 도메인 설정 필요 (Resend 대시보드 → Domains)
- [ ] **사업자등록증 자격 문제** — 예비창업패키지 신청 전 주관기관에 직접 문의 필요 (등록일 2025.11.03, 기준일 2026.01.22)

### 🟡 Minor
- [x] **`EarbudHero.tsx` 미사용 컴포넌트** — 삭제 완료 (2026-03-20)
- [x] **`app/admin/page.tsx` 타입 핵** — `AdminOrder[]` 타입으로 수정 완료
- [x] **`app/hello/page.tsx`** — 삭제 완료 (2026-03-20)
- [x] **Spec 아이콘 로직 중복** — `components/SpecIcon.tsx`로 추출 완료
- [ ] **Prisma 스키마 타입 불일치** — `product_images.id`가 DB에서 integer이지만 스키마에는 `String @id @default(uuid())`로 선언됨. 현재는 Supabase 직접 쿼리로 우회 중이나, 누군가 Prisma로 image 쿼리 추가 시 P2032 에러 발생. 스키마를 `Int @id @default(autoincrement())`로 수정 필요
- [ ] **테스트 없음** — Vitest 세팅 후 최소 단위 테스트 작성: `calcPrice()`, URL 파라미터 인코드/디코드 round-trip, `SpecIcon` label 분기, 결제 webhook 서명 검증
- [x] **DESIGN.md 생성** — Dark Precision 디자인 시스템 문서화 완료 (2026-03-23). Noto Serif KR / DM Sans / amber #C8922A CTA 원칙 포함

---

## 다음 작업 목록

### 기능 개발
- [x] **3D 레진 미리보기** — BTOBuilder에 Three.js/WebGL 기반 실시간 렌더링 추가 (2026-03-16)
- [ ] **AR 미리보기** — WebXR API로 실내 공간에 가구 가상 배치
- [x] **BTO 시뮬레이터 가격 실시간 표시** — `calcPrice()` + `useCountUp()` 훅으로 완료 (플로팅 배지 표시)
- [x] **제품 상세 → BTO 연동** — `?resinHint=<hex>#build` URL 파라미터로 가장 가까운 레진 자동 선택
- [ ] **결제 시스템 연동** — Toss Payments 또는 카카오페이 (CEO 리뷰에서 승인됨)
- [x] **주문 제작 현황 트래킹** — `/orders/[id]` 타임라인 UI, 주문 카드 클릭 시 이동
- [x] **커스텀 설계 공유 링크** — BTO 주문 단계에서 공유 버튼, URL 파라미터 인코딩/디코딩
- [x] **홈 제품 섹션** — `HomeProductsSection` 서버 컴포넌트 (TableHero와 BTOBuilder 사이)
- [ ] **모바일 반응형 점검** — 전체 페이지 모바일 UX 확인 및 개선

### 브랜드/디자인
- [ ] **product.accent 명도 접근성 감사** — 각 제품의 `accent` 색상이 `#0a0a0a` 배경에서 WCAG 4.5:1 이상의 명도 대비를 갖추는지 확인. 카탈로그 확장 전 진행 권장 (FINDING-004)
- [ ] **제품 상세 페이지 가격 표시** — `products/[id]` 페이지에 시작 가격("120만원~") 추가. BTO 최소 사이즈 기준 또는 products 테이블에 `starting_price` 컬럼 추가. 전환율 직접 영향 (FINDING-R003 from /design-review 2026-03-28, re-opened from FINDING-006 2026-03-24) — **High priority: 신뢰/전환 직결**
- [ ] **Three.js PCFSoftShadowMap 경고 제거** — `TablePreview3D.tsx`에서 `renderer.shadowMap.type = THREE.PCFShadowMap`으로 변경하거나 Three.js 버전 업그레이드. 유저에게 보이지 않으나 콘솔 노이즈 (FINDING-002, deferred)
- [x] **LCP 이미지 로딩** — `loading="eager"` 추가 완료 (2026-03-24, commit 52de3f4)
- [ ] **OG 이미지 설정** — SNS 공유 시 미리보기 이미지 (`/public/og.jpg`)
- [ ] **파비콘** — EEL 브랜드 파비콘 적용
- [ ] **제품 이미지 업로드** — Supabase Storage에 실제 제품 사진 등록
- [ ] **Supabase 데이터 입력** — 실제 제품, 사이즈/레진/우드/다리 옵션 데이터 입력

### 인프라
- [ ] **커스텀 도메인 연결** — Vercel에 eel.kr 또는 eel.co.kr 도메인 연결
- [ ] **Resend 커스텀 도메인** — noreply@eel.kr 등으로 발신 주소 변경
- [ ] **Supabase RLS 정책 점검** — orders 테이블 Row Level Security 확인
- [ ] **Google OAuth Redirect URI** — 프로덕션 도메인 추가 (Google Cloud Console)

---

## 환경변수 현황

```
NEXT_PUBLIC_SUPABASE_URL       ✅ 설정됨
NEXT_PUBLIC_SUPABASE_ANON_KEY  ✅ 설정됨
SUPABASE_SERVICE_ROLE_KEY      ✅ 설정됨
RESEND_API_KEY                 ✅ 설정됨
ADMIN_EMAIL                    ✅ 설정됨 (sjkim942884@gmail.com)
NEXT_PUBLIC_SITE_URL           ✅ 설정됨 (localhost:3000, 배포 시 변경 필요)
```

---

## 주요 파일 구조

```
EEL/
├── app/
│   ├── page.tsx                  # 메인 홈
│   ├── layout.tsx                # 루트 레이아웃 (lang="ko")
│   ├── auth/page.tsx             # Google 로그인
│   ├── auth/callback/route.ts   # OAuth 콜백
│   ├── orders/page.tsx           # 내 주문 내역
│   ├── admin/page.tsx            # 관리자 주문 관리
│   ├── admin/AdminOrderList.tsx  # 주문 목록 클라이언트
│   ├── products/page.tsx         # 제품 카탈로그
│   ├── products/[id]/page.tsx    # 제품 상세
│   └── api/
│       ├── notify/route.ts             # 주문 이메일 발송
│       └── admin/update-order/route.ts # 주문 상태 변경
├── components/
│   ├── Header.tsx        # 플로팅 헤더
│   ├── TableHero.tsx     # 제품 쇼케이스
│   ├── CraftBridge.tsx   # 제조 과정 섹션
│   ├── BTOBuilder.tsx    # 커스텀 주문 빌더
│   └── EarbudHero.tsx    # 미사용 (삭제 검토)
└── lib/
    ├── utils.ts              # formatKRW, formatDate
    ├── constants.ts          # STATUS_CONFIG, STATUS_ORDER
    └── supabase/
        ├── client.ts         # 브라우저 클라이언트
        ├── server.ts         # 서버 클라이언트
        └── admin.ts          # service_role 클라이언트
```
