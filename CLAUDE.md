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
- **배포**: Vercel → https://eel-smoky.vercel.app

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
  page.tsx                              # 메인 홈 (애니메이션 인트로 → hero 이미지)
  layout.tsx                            # 루트 레이아웃 (lang="ko", DM Sans/Fraunces/Noto Serif KR 폰트)
  globals.css                           # Tailwind v4 + CSS 변수 (--background, --foreground, 폰트 테마)
  auth/
    page.tsx                            # Google OAuth 로그인 페이지
    callback/route.ts                   # OAuth 콜백 처리
  order/
    page.tsx                            # BTO 빌더 페이지 (Suspense 래핑)
    loading.tsx                         # BTO 로딩 스켈레톤
  orders/
    page.tsx                            # 내 주문 내역 (로그인 필요, 서버 컴포넌트)
    layout.tsx                          # 주문 페이지 레이아웃
    OrdersClient.tsx                    # 주문 목록 클라이언트 컴포넌트
    [id]/
      page.tsx                          # 주문 추적 상세 (소유권 검증)
      OrderTrackingClient.tsx           # 타임라인 UI
  admin/
    page.tsx                            # 관리자 주문 관리 (ADMIN_EMAIL만 접근)
    AdminOrderList.tsx                  # 주문 필터링 + 상태 변경 (useOptimistic)
  products/
    page.tsx                            # 제품 카탈로그 (서버 컴포넌트, Supabase 직접 쿼리)
    loading.tsx                         # 카탈로그 로딩 스켈레톤
    ProductsCatalogClient.tsx           # 제품 캐러셀 UI
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
  Header.tsx                  # 유리형 플로팅 헤더 + 로그인/드롭다운 + 모바일 메뉴
  Footer.tsx                  # 사이트 푸터
  Sidebar.tsx                 # 사이드바 네비게이션
  TableHero.tsx               # 제품 쇼케이스 (갤러리 + 스펙 + 넘버 스위처, Supabase 실시간 페칭)
  CraftBridge.tsx             # 제조 과정 4단계 + 통계 (useInView 애니메이션)
  BTOBuilder.tsx              # 5단계 커스텀 주문 빌더 (Size→Resin→Wood→Leg→Review)
  HomeProductsSection.tsx     # 홈 제품 그리드 (SSR)
  TablePreview3D.tsx          # Three.js 3D 레진 미리보기 (dynamic import, SSR 비활성)
  TablePreview3DLegacy.tsx    # 3D 프리뷰 레거시 버전
  table-3d/
    TableModel.tsx            # 3D 테이블 모델 컴포넌트
    StudioEnv.tsx             # 3D 스튜디오 환경 (조명/배경)
    constants.ts              # 3D 관련 상수
  SpecIcon.tsx                # 스펙 레이블 → Lucide 아이콘 매핑
  LoadingScreen.tsx           # 로딩 스켈레톤

lib/
  utils.ts                    # formatKRW(n), formatDate(iso)
  constants.ts                # STATUS_CONFIG (주문 상태 라벨/색상), STATUS_ORDER
  prisma.ts                   # Prisma 클라이언트 싱글턴 (globalThis 캐싱)
  supabase/
    client.ts                 # 브라우저 Supabase 클라이언트 (createBrowserClient)
    server.ts                 # 서버 Supabase 클라이언트 (cookies() 기반)

prisma/
  schema.prisma               # DB 스키마 — Order, SizeOption, ResinOption, WoodOption, LegOption, Product, ProductImage, ProductSpec, Profile

scripts/
  generate-table-model.py     # 3D 테이블 모델 데이터 생성 스크립트

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

- **방향**: Dark Precision — 어두운 배경(#0a0a0a) + 오프화이트 텍스트 + 앰버(#C8922A) CTA 단 하나
- **폰트**: Noto Serif KR (한글 히어로) / Fraunces (영문 히어로) / DM Sans (본문/UI) / Geist Mono (가격/스펙)
- **CSS 변수**: `--font-display-kr`, `--font-display-en`, `--font-sans`, `--font-mono`
- **Tailwind v4**: `tailwind.config.js` 없음, `globals.css`의 `@theme inline` 블록에서 테마 정의
- **금지 사항**: 글로우, 레인보우 그라디언트, scale 애니메이션, blur 애니메이션

## 주의사항

- **패키지 매니저는 bun** — npm/pnpm 명령어 사용 금지
- **Tailwind v4** — `tailwind.config.js` 없음, CSS `@import "tailwindcss"` + `@theme inline` 방식
- **Next.js App Router** — `'use client'` 명시 없으면 서버 컴포넌트
- Supabase 서버 클라이언트는 반드시 `lib/supabase/server.ts` 사용 (`cookies()` 기반)
- 관리자 체크: `user.email === process.env.ADMIN_EMAIL`
- Resend 발신 주소 현재 `onboarding@resend.dev` (실서비스 전 커스텀 도메인 필요)
- `product_images` 쿼리 시 Prisma 대신 Supabase 직접 쿼리 사용 (스키마 타입 불일치 우회)
- BTO 빌더는 `/order` 경로 (주의: `/orders`는 내 주문 내역)
- 주문 상태 흐름: `pending → confirmed → in_progress → completed` (또는 `cancelled`)

## 알려진 이슈

### 코드 품질
- `BTOBuilder.tsx` 728줄 거대 파일 — 분리 필요
- `BTOBuilder.tsx` 내 `.catch(() => {})` 무시 패턴 — 에러 로깅 필요
- Header와 Sidebar에서 프로필을 각각 독립적으로 페칭 — Context/훅 공유 필요
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
