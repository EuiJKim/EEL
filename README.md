# EEL — Furniture & Object Maker

서울 기반 프리미엄 레진 아트퍼니처 브랜드 **일(EEL)**의 e-커머스 + 쇼케이스 웹사이트.

## Live

https://eel-studio.me

## Stack

- **Framework**: Next.js 16 (App Router) + TypeScript + React 19
- **Style**: Tailwind CSS v4 + Framer Motion
- **DB/Auth**: Supabase (PostgreSQL + Google OAuth)
- **ORM**: Prisma 5.22
- **3D**: Three.js 0.183 (procedural table preview)
- **Email**: Resend
- **Package Manager**: bun
- **Deploy**: Vercel

## Getting Started

```bash
bun install
bun run dev        # http://localhost:3000
bun run build      # production build
bun run test       # unit tests (Vitest)
```

## Project Structure

```
app/
  page.tsx                    # Home (fullscreen hero + bottom nav)
  order/CommissionClient.tsx  # 7-step commission builder + 3D preview
  products/WorksPageClient.tsx # Works grid + detail overlay
  orders/                     # Order history
  admin/                      # Admin order management
  api/                        # REST endpoints

components/
  BottomNav.tsx               # Fixed bottom navigation
  ContactModal.tsx            # Contact modal
  CommissionPreview3D.tsx     # Three.js procedural 3D table
```

## Fonts

- **Gravitas One** — Logo, titles
- **Telex** — Body, descriptions
- **Staatliches** — Navigation, labels, UI

## Environment Variables

See `.env.local.example` for required variables:
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL` / `DIRECT_URL` (Supabase pooler)
- `RESEND_API_KEY` / `FROM_EMAIL`
- `ADMIN_EMAIL`
