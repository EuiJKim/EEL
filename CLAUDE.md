# EEL 프로젝트

프리미엄 순수 레진 아트퍼니처 브랜드 **일(EEL)**의 e-커머스 웹사이트.

## 스택

- **프레임워크**: Next.js 16 (App Router) + TypeScript
- **스타일**: Tailwind CSS v4 + Framer Motion
- **DB/Auth**: Supabase (PostgreSQL + Google OAuth)
- **ORM**: Prisma 5.22
- **이메일**: Resend
- **3D**: Three.js (WebGL 레진 미리보기)
- **테스트**: Vitest (`__tests__/`)
- **패키지 매니저**: bun
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
  page.tsx                        # 메인 홈 (TableHero → CraftBridge → BTOBuilder)
  layout.tsx                      # 루트 레이아웃 (lang="ko")
  auth/page.tsx                   # Google 로그인
  auth/callback/route.ts          # OAuth 콜백
  orders/page.tsx                 # 내 주문 내역 (로그인 필요)
  orders/OrdersClient.tsx         # 주문 목록 클라이언트
  admin/page.tsx                  # 관리자 주문 관리 (ADMIN_EMAIL만 접근)
  admin/AdminOrderList.tsx        # 주문 필터링 + 상태 변경 (Optimistic UI)
  products/page.tsx               # 제품 카탈로그
  products/[id]/page.tsx          # 제품 상세
  api/notify/route.ts             # 주문 이메일 발송
  api/admin/update-order/route.ts # 주문 상태 변경
  api/bto-options/                # BTO 옵션 API
  api/orders/                     # 주문 API
components/
  Header.tsx          # 유리형 플로팅 헤더 + 로그인/드롭다운
  TableHero.tsx       # 제품 쇼케이스 + 동적 배경
  CraftBridge.tsx     # 제조 과정 4단계 + 통계
  BTOBuilder.tsx      # 5단계 커스텀 주문 빌더
  TablePreview3D.tsx  # Three.js 3D 레진 미리보기 (WebGL 폴백 포함)
  SpecIcon.tsx        # 스펙 레이블 → 아이콘 공통 컴포넌트
  HomeProductsSection.tsx  # 홈 제품 그리드 (SSR)
lib/
  utils.ts        # formatKRW, formatDate
  prisma.ts       # Prisma 클라이언트 싱글턴
  supabase/
    client.ts     # 브라우저 Supabase 클라이언트
    server.ts     # 서버 Supabase 클라이언트
prisma/
  schema.prisma   # DB 스키마
```

## 환경변수 (`.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
ADMIN_EMAIL                  # sjkim942884@gmail.com
NEXT_PUBLIC_SITE_URL         # 배포 시 실제 URL로 변경 필요
DATABASE_URL                 # Prisma용 Supabase connection string
```

## Supabase 테이블

`products`, `product_images`, `product_specs`, `orders`, `profiles`,
`size_options`, `resin_options`, `wood_options`, `leg_options`

## 주의사항

- **패키지 매니저는 bun** — npm/pnpm 명령어 사용 금지
- **Tailwind v4** — `tailwind.config.js` 없음, CSS `@import "tailwindcss"` 방식
- **Next.js App Router** — `use client` 명시 없으면 서버 컴포넌트
- Supabase 서버 클라이언트는 반드시 `lib/supabase/server.ts` 사용 (`cookies()` 기반)
- 관리자 체크: `user.email === process.env.ADMIN_EMAIL`
- `app/hello/page.tsx` — 내용 미확인, 불필요하면 삭제
- Resend 발신 주소 현재 `onboarding@resend.dev` (실서비스 전 커스텀 도메인 필요)

## 현재 이슈 (TODO.md 참고)

- Resend 커스텀 도메인 미설정
- `app/admin/page.tsx` 타입 핵: `(orders ?? []) as never[]`
- Spec 아이콘 로직 중복 (`TableHero.tsx` / `ProductDetailClient.tsx`)
