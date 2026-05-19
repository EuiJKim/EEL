# EEL

프리미엄 레진 아트퍼니처 브랜드 EEL의 e-커머스 + 쇼케이스. Next.js App Router / Supabase / Vercel(eel-studio.me).

## 커맨드

```bash
bun run dev          # 개발 서버 :3000  (npm/pnpm 금지)
bun run build        # 프로덕션 빌드
bun run test         # Vitest (watch 아님, 1회 실행)
bun run lint         # ESLint
bunx tsc --noEmit    # 타입체크
bun run prisma:gen   # Prisma 클라이언트 재생성
```

## 핵심 규칙 (코드만 봐선 모르는 것)

### 빌드·환경
- 패키지 매니저 **bun 전용** — npm/pnpm 명령 절대 금지
- Tailwind v4 — `tailwind.config.js` 없음. `@import "tailwindcss"` + `@theme inline` 방식
- `'use client'` 없으면 서버 컴포넌트 (App Router 기본)
- Supabase 서버 클라이언트는 반드시 `lib/supabase/server.ts` (`cookies()` 기반). 브라우저용은 `lib/supabase/client.ts`
- 관리자 게이트: `user.email === process.env.ADMIN_EMAIL` (값: sjkim942884@gmail.com)

### 라우팅 함정
- `/order` = Commission 빌더 / `/orders` = 내 주문 내역 — **헷갈리지 말 것**
- `/journal` = Porto Rocha 스타일 작업 피드 (현재 로컬 전용, main 미반영). 기존 `/`는 그대로 둠

### 데이터
- `products` 페이지는 **Prisma 아님 — Supabase 직접 쿼리** (DB pooler 호환). 제품/이미지는 `public/products/` 하드코딩 패치
- Commission 7단계(Color+Opacity→Shape→Size→Height→Legs→Inquiry)는 **하드코딩, DB 불필요**. 28색 팔레트 + 커스텀 색 + 투명도
- Rectangle 선택 시 Pedestal 다리 **선택 불가** (비즈니스 규칙)
- 주문 상태: `pending → confirmed → in_progress → completed` (또는 `cancelled`)
- `DATABASE_URL`=pooler 커넥션 / `DIRECT_URL`=Prisma 직접 연결. 둘 다 필요

### 이메일 (Resend)
- 발신 주소 프로덕션: `EEL Studio <order@send.eel-studio.me>`. `.env` 기본값 `onboarding@resend.dev`은 실발송 실패(조용히)
- **Resend SDK는 에러를 throw 안 함** — `{ data, error }` 반환. `error` 미체크 시 silent failure. 모든 `resend.emails.send()` 후 `error` 체크 필수
- 커미션 문의 → `/api/commission-inquiry` (관리자 + 고객 확인 메일). 도메인 인증은 정확한 서브도메인 단위 (`send.eel-studio.me`)

### Meta Pixel / 마케팅
- `NEXT_PUBLIC_META_PIXEL_ID` env로 주입 (`components/MetaPixel.tsx`, 루트 레이아웃). 빈 값이면 null 렌더 (안전)
- Commission 제출 성공 시 `Lead` 이벤트 발화 (`app/order/fireLeadEvent.ts`)
- 마케팅 전략 스펙: `docs/superpowers/specs/2026-04-23-eel-marketing/` (90일 첫 매출, Approach A)

## 알려진 함정

- `product_images.id`: Prisma 스키마(String) vs 실제 DB(integer) 불일치 → P2032 에러. Prisma로 이 테이블 쿼리 금지
- 레거시/미사용 컴포넌트 다수 (`BTOBuilder`, `TableHero`, `CraftBridge`, `Footer`, `TablePreview3DLegacy` 등) — 수정 대상 아님
- Next.js `Script`(next/script)는 jsdom 테스트에서 inline children 미렌더 → 테스트 시 mock 필요

## 디자인

상세는 `DESIGN.md` 참조. 가드레일만:
- Dark Atelier: 배경 `#2e3330`, 텍스트 `#e8ebe8`
- 폰트: Gravitas One(타이틀) / Telex(본문) / Staatliches(UI·라벨)
- **금지**: 글로우, 레인보우 그라디언트, blur 애니메이션
- 모바일 터치 타깃 최소 44×44px

## Skill routing

요청이 스킬과 매칭되면 **다른 행동 전에 Skill 도구를 첫 액션으로** 호출.

- 제품 아이디어·브레인스토밍 → office-hours
- 버그·에러·500 → investigate
- 배포·push·PR → ship
- QA·사이트 테스트 → qa
- 코드 리뷰·diff 확인 → review
- 배포 후 문서 갱신 → document-release
- 주간 회고 → retro
- 디자인 시스템·브랜드 → design-consultation
- 비주얼 감사·디자인 폴리시 → design-review
- 아키텍처 리뷰 → plan-eng-review
- 진행 저장·재개 → checkpoint
- 코드 품질·헬스체크 → health

## 작업 환경 (Windows + git 워크트리)

- **dev 서버는 워크트리에서 실행** — `.claude/worktrees/recursing-kepler`. 메인 EEL 폴더에서 띄우면 `/journal` 등 신규 라우트 404
- `.env.local`은 메인 EEL 폴더에 있고 워크트리엔 없음 — 새 env는 양쪽 + Vercel 대시보드 별도 등록
- Vercel 환경변수 변경은 자동 배포 안 됨 — Deployments → Redeploy(캐시 OFF) 수동
- git pull/rebase가 `.claude/settings.local.json` 변경으로 자주 막힘 → `git stash push .claude/` 후 진행
- one-off 스크립트는 `node -e` (`bun run -e`는 prisma postinstall 노이즈 발생)
- `public/products/*` 원본 이미지 전부 세로(~2666×3333) — 가로비 컨테이너 강제 시 잘림, object-cover 주의
