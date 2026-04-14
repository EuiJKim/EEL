# EEL 프로젝트

프리미엄 순수 레진 아트퍼니처 브랜드 **일(EEL)**의 e-커머스 웹사이트.

## 스택

- **프레임워크**: Next.js 16 (App Router) + TypeScript + React 19
- **스타일**: Tailwind CSS v4 + Framer Motion
- **DB/Auth**: Supabase (PostgreSQL + Google OAuth)
- **ORM**: Prisma 5.22
- **이메일**: Resend
- **검증**: Zod 4 (API 입력 검증)
- **3D**: Three.js 0.183 (WebGL 레진 미리보기)
- **테스트**: Vitest (`__tests__/`)
- **패키지 매니저**: bun (npm/pnpm 사용 금지)
- **배포**: Vercel → https://eel-studio.me

## 커맨드

```bash
bun run dev          # 개발 서버 (http://localhost:3000)
bun run build        # 프로덕션 빌드
bun run test         # 단위 테스트 (Vitest)
bun run lint         # ESLint
bun run prisma:gen   # Prisma 클라이언트 재생성
```

## 프로젝트 구조

```
app/
  page.tsx                              # 메인 홈 (풀스크린 fixed 히어로 이미지 + 텍스트 오버레이, 인트로 애니메이션)
  layout.tsx                            # 루트 레이아웃 (lang="ko", Gravitas One/Staatliches/Telex 폰트)
  globals.css                           # Tailwind v4 + CSS 변수 (--bg: #2e3330, heroZoom, blink 등)
  auth/
    page.tsx                            # Google OAuth 로그인 페이지
    callback/route.ts                   # OAuth 콜백 처리
  order/
    page.tsx                            # Commission 페이지 (Suspense 래핑)
    CommissionClient.tsx                # 6단계 커스텀 빌더 (Color→Shape→Size→Height→Legs→Inquiry) + 3D 프리뷰
    loading.tsx                         # Commission 로딩 스켈레톤
  orders/
    page.tsx                            # 내 주문 내역 (로그인 필요, 서버 컴포넌트)
    layout.tsx                          # 주문 페이지 레이아웃 (Header 사용)
    OrdersClient.tsx                    # 주문 목록 클라이언트 컴포넌트
    [id]/
      page.tsx                          # 주문 추적 상세 (소유권 검증)
      OrderTrackingClient.tsx           # 타임라인 UI
  admin/
    page.tsx                            # 관리자 주문 관리 (ADMIN_EMAIL만 접근)
    AdminOrderList.tsx                  # 주문 필터링 + 상태 변경 (useOptimistic)
  products/
    page.tsx                            # Works 페이지 (서버 컴포넌트, Supabase 직접 쿼리)
    WorksPageClient.tsx                 # Works 3열 그리드 + 상세 오버레이 (좌측 정보 + 우측 스크롤 갤러리 + 줌)
    loading.tsx                         # 카탈로그 로딩 스켈레톤
    [id]/
      page.tsx                          # 제품 상세 (서버 컴포넌트)
      ProductDetailClient.tsx           # 제품 상세 갤러리 + 스펙
      not-found.tsx                     # 404 페이지
  api/
    notify/route.ts                     # POST — 주문 접수 시 관리자/고객 이메일 발송 (Resend)
    orders/route.ts                     # POST — 주문 생성 (인증 필요)
    bto-options/route.ts                # GET — BTO 옵션 목록 (sizes, resins, woods, legs)
    admin/update-order/route.ts         # PATCH — 주문 상태 변경 (admin only)

components/
  BottomNav.tsx               # 하단 고정 네비 (Works 드롭다운/Commission/Contact), 스크롤 연동
  ContactModal.tsx            # 연락처 모달 (Instagram/Email/Location/Phone)
  CommissionPreview3D.tsx     # Three.js procedural 3D 테이블 프리뷰 (ExtrudeGeometry, shape/color/size/height/legs 반응형)
  Header.tsx                  # 플로팅 헤더 (orders 레이아웃에서 사용)
  Sidebar.tsx                 # 사이드바 (ProductDetailClient에서 사용)
  TablePreview3D.tsx          # Three.js 3D 프리뷰 (GLB 모델 로드 방식)
  BTOBuilder.tsx              # [레거시] 5단계 BTO 빌더 — CommissionClient로 대체됨
  LoadingScreen.tsx           # 로딩 스켈레톤
  SpecIcon.tsx                # 스펙 레이블 → Lucide 아이콘 매핑
  TableHero.tsx               # [미사용] 제품 쇼케이스
  CraftBridge.tsx             # [미사용] 제조 과정 4단계
  HomeProductsSection.tsx     # [미사용] 홈 제품 그리드
  Footer.tsx                  # [미사용] 사이트 푸터
  TablePreview3DLegacy.tsx    # [미사용] 3D 프리뷰 레거시

lib/
  utils.ts                    # formatKRW(n), formatDate(iso)
  constants.ts                # STATUS_CONFIG (주문 상태 라벨/색상), STATUS_ORDER
  prisma.ts                   # Prisma 클라이언트 싱글턴 (globalThis 캐싱)
  supabase/
    client.ts                 # 브라우저 Supabase 클라이언트 (createBrowserClient)
    server.ts                 # 서버 Supabase 클라이언트 (cookies() 기반)

prisma/
  schema.prisma               # DB 스키마 — Order, SizeOption, ResinOption, WoodOption, LegOption, Product, ProductImage, ProductSpec, Profile

__tests__/
  calcPrice.test.ts           # calcPrice() 단위 테스트
  SpecIcon.test.tsx           # SpecIcon 레이블 분기 테스트
```

## 환경변수 (`.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL       # Supabase 프로젝트 URL
NEXT_PUBLIC_SUPABASE_ANON_KEY  # Supabase anon 키
RESEND_API_KEY                 # Resend 이메일 API 키
ADMIN_EMAIL                    # 관리자 이메일 (sjkim942884@gmail.com)
NEXT_PUBLIC_SITE_URL           # 사이트 URL (배포 시 실제 URL로 변경)
FROM_EMAIL                     # (선택) 발신 이메일 주소 (기본값: EEL Studio <onboarding@resend.dev>)
DATABASE_URL                   # Prisma용 Supabase 커넥션 스트링
DIRECT_URL                     # Prisma용 직접 DB 연결 URL
```

## Supabase 테이블

`products`, `product_images`, `product_specs`, `orders`, `profiles`, `size_options`, `resin_options`, `wood_options`, `leg_options`

## 디자인 시스템 (DESIGN.md 참고)

- **방향**: Dark Atelier — 다크 그린 배경(#2e3330) + 오프화이트 텍스트(#e8ebe8)
- **폰트**: Gravitas One (로고/타이틀) / Telex (본문/설명) / Staatliches (네비/라벨/UI)
- **CSS 변수**: `--font-gravitas`, `--font-staatliches`, `--bg: #2e3330`, `--text: #e8ebe8`
- **Tailwind v4**: `tailwind.config.js` 없음, CSS `@import "tailwindcss"` 방식
- **홈**: 풀스크린 fixed 히어로 이미지 + 하단 고정 네비 (Works/Commission/Contact)
- **금지 사항**: 글로우, 레인보우 그라디언트, blur 애니메이션

## 주의사항

- **패키지 매니저는 bun** — npm/pnpm 명령어 사용 금지
- **Tailwind v4** — `tailwind.config.js` 없음, CSS `@import "tailwindcss"` + `@theme inline` 방식
- **Next.js App Router** — `'use client'` 명시 없으면 서버 컴포넌트
- Supabase 서버 클라이언트는 반드시 `lib/supabase/server.ts` 사용 (`cookies()` 기반)
- 관리자 체크: `user.email === process.env.ADMIN_EMAIL`
- Resend 발신 주소: `EEL Studio <order@send.eel-studio.me>`
- `products` 페이지는 Prisma 대신 Supabase 직접 쿼리 사용 (DB pooler 호환)
- Commission 빌더는 `/order` 경로 (주의: `/orders`는 내 주문 내역)
- Commission 6단계: Color→Shape→Size→Height→Legs→Inquiry (하드코딩, DB 불필요)
- 직사각형(Rectangle) 선택 시 Pedestal 다리 선택 불가
- 주문 상태 흐름: `pending → confirmed → in_progress → completed` (또는 `cancelled`)

## 알려진 이슈

### 코드 품질
- `BTOBuilder.tsx` 레거시 파일 남아있음 — CommissionClient로 대체됨, 삭제 가능
- 미사용 컴포넌트 정리 필요: TableHero, CraftBridge, HomeProductsSection, Footer, TablePreview3DLegacy, ProductsCatalogClient
- `product_images.id` Prisma 스키마(String)와 DB(integer) 불일치 → P2032 에러

### 미구현
- 결제 시스템 (Toss Payments / 카카오페이)
- AR 미리보기 (WebXR)
- 모바일 반응형 전면 점검
- OG 이미지, 파비콘
- 테스트 커버리지 부족 (API 라우트, 컴포넌트 미테스트)

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
- Save progress, checkpoint, resume → invoke checkpoint
- Code quality, health check → invoke health
