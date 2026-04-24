# EEL Marketing Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship all Phase 1 (Week 1-2) website changes so paid ads can launch in Week 3 with Meta Pixel data collection and conversion-optimized landing.

**Architecture:** Next.js 16 App Router with TypeScript. Meta Pixel injected via a client component loaded in `app/layout.tsx`. Custom `Lead` conversion event fires from `CommissionClient` after successful inquiry submission. Website Works catalog gets a prominent "Inquire" CTA; new `/about` page adds artist narrative as social proof. All changes are additive — existing flows and visuals preserved.

**Tech Stack:** Next.js 16 · React 19 · TypeScript · Tailwind v4 · Vitest 4 · Meta Pixel · Resend

**Related Spec:** [docs/superpowers/specs/2026-04-23-eel-marketing-first-sale-design.md](../specs/2026-04-23-eel-marketing-first-sale-design.md) (sections 3, 5)

**Scope Note:** This plan covers **Phase 1 code tasks only**. Phase 2 (Week 3-6) and Phase 3 (Week 7-12) are operational work (ads launch, content posting, DM response) and are captured as non-code milestones at the end of this plan for user self-execution — they do not require code changes.

---

## User Prerequisites (Block code tasks)

These must be complete before Task 3 (Pixel wiring) can verify:

- [ ] **P1: Obtain Meta Pixel ID** — Go to business.facebook.com → Events Manager → Connect Data Sources → Web → Name it "EEL Pixel" → copy 15–16 digit Pixel ID
- [ ] **P2: Create OG image** — 1200×630 JPG/PNG of signature Work piece (dark background, centered subject). Save locally as `og-image.jpg`, will upload in Task 7
- [ ] **P3: Prepare About page content** — 1 author portrait (작업실 분위기) + 1인칭 Korean narrative text 300–500자 (starting story, 3-week philosophy, material selection criteria)

**User can complete P1–P3 in parallel with code Tasks 1, 2, 5, 6 running.**

---

## File Structure

**Create:**
- `types/fbq.d.ts` — TypeScript ambient declarations for `window.fbq`
- `components/MetaPixel.tsx` — client component that injects Meta Pixel JS
- `app/about/page.tsx` — server component for About page
- `app/about/AboutClient.tsx` — client component for About interactions (if any; otherwise inline)
- `public/og-image.jpg` — 1200×630 social share image (user-provided)
- `__tests__/MetaPixel.test.tsx` — unit test for pixel component
- `__tests__/CommissionLead.test.tsx` — unit test for Lead event firing

**Modify:**
- `app/layout.tsx` — add MetaPixel component + OG metadata
- `app/page.tsx` — add h1 tag to hero
- `app/order/CommissionClient.tsx` — fire `Lead` event on successful submit
- `app/products/WorksPageClient.tsx` — add "Inquire about this piece" CTA in product detail overlay
- `.env.local` — add `NEXT_PUBLIC_META_PIXEL_ID` (user provides value from P1)
- `.env` — document the new env var

---

## Task 1: TypeScript declarations for window.fbq

**Why:** `fbq()` is Meta's global function injected by Pixel script. Without ambient declarations, TypeScript errors on `window.fbq(...)` calls.

**Files:**
- Create: `types/fbq.d.ts`

- [ ] **Step 1: Write declaration file**

Create `types/fbq.d.ts`:

```typescript
declare global {
  interface Window {
    fbq?: (
      command: 'init' | 'track' | 'trackCustom',
      eventNameOrPixelId: string,
      params?: Record<string, unknown>
    ) => void;
    _fbq?: unknown;
  }
}

export {};
```

- [ ] **Step 2: Verify TypeScript picks up the declaration**

Run: `bun run lint`
Expected: no errors related to fbq

- [ ] **Step 3: Commit**

```bash
git add types/fbq.d.ts
git commit -m "chore(types): add ambient declarations for Meta Pixel fbq"
```

---

## Task 2: MetaPixel component (TDD)

**Why:** Isolates Pixel initialization into a single testable unit. Loaded once in root layout.

**Files:**
- Create: `components/MetaPixel.tsx`
- Create: `__tests__/MetaPixel.test.tsx`

- [ ] **Step 1: Write failing test**

Create `__tests__/MetaPixel.test.tsx`:

```typescript
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MetaPixel from '@/components/MetaPixel';

describe('MetaPixel', () => {
  beforeEach(() => {
    delete (window as any).fbq;
  });

  it('renders nothing when pixelId is empty', () => {
    const { container } = render(<MetaPixel pixelId="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders Script tag with fbq init when pixelId is set', () => {
    const { container } = render(<MetaPixel pixelId="1234567890" />);
    // next/script renders a <script> — in test, we check DOM text for init call
    const html = container.innerHTML;
    expect(html).toContain("fbq('init', '1234567890')");
    expect(html).toContain("fbq('track', 'PageView')");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun run test __tests__/MetaPixel.test.tsx`
Expected: FAIL with "Cannot find module '@/components/MetaPixel'"

- [ ] **Step 3: Install @testing-library/react if missing**

Check `package.json`:

```bash
grep "@testing-library/react" package.json
```

If not present, install:

```bash
bun add -D @testing-library/react @testing-library/jest-dom jsdom
```

Then ensure `vitest.config.ts` has:

```typescript
test: {
  environment: 'jsdom',
}
```

- [ ] **Step 4: Write minimal implementation**

Create `components/MetaPixel.tsx`:

```tsx
'use client';

import Script from 'next/script';

interface MetaPixelProps {
  pixelId: string;
}

export default function MetaPixel({ pixelId }: MetaPixelProps) {
  if (!pixelId) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `bun run test __tests__/MetaPixel.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 6: Commit**

```bash
git add components/MetaPixel.tsx __tests__/MetaPixel.test.tsx package.json bun.lock vitest.config.ts
git commit -m "feat(pixel): add MetaPixel component with init + PageView tracking"
```

---

## Task 3: Wire MetaPixel into root layout + env var

**Why:** Loads Pixel on every page. Requires `NEXT_PUBLIC_META_PIXEL_ID` env var.

**Files:**
- Modify: `app/layout.tsx`
- Modify: `.env.local` (user adds actual ID)
- Modify: `.env` (documentation)

- [ ] **Step 1: Add env var placeholder to `.env`**

Append to `.env`:

```
# Meta Pixel (client-side, exposed to browser). Obtain from business.facebook.com → Events Manager.
NEXT_PUBLIC_META_PIXEL_ID=
```

- [ ] **Step 2: User adds real ID to `.env.local`**

User edits `.env.local` and adds:

```
NEXT_PUBLIC_META_PIXEL_ID=<16-digit ID from P1>
```

- [ ] **Step 3: Import MetaPixel in layout**

Edit `app/layout.tsx`. At top of imports:

```tsx
import MetaPixel from "@/components/MetaPixel";
```

In the `<body>` element, add `<MetaPixel>` as first child:

```tsx
<body className={`${gravitasOne.variable} ${staatliches.variable} ${dmSans.variable} antialiased`}>
  <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ''} />
  {children}
</body>
```

- [ ] **Step 4: Verify Pixel loads in dev**

Run: `bun run dev`
Open http://localhost:3000
Open browser DevTools → Network tab → filter by "fbevents.js"
Expected: request to `https://connect.facebook.net/en_US/fbevents.js` with 200 status
Also: `window.fbq` accessible in console

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx .env
git commit -m "feat(pixel): wire MetaPixel into root layout via env var"
```

---

## Task 4: Fire Lead event on Commission submit

**Why:** Lead events are the "conversion signal" Meta optimizes against in Phase 3. Without this, Conversions campaigns have no target.

**Files:**
- Modify: `app/order/CommissionClient.tsx`
- Create: `__tests__/CommissionLead.test.tsx`

- [ ] **Step 1: Write failing test for the event dispatcher helper**

Create `__tests__/CommissionLead.test.tsx`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireLeadEvent } from '@/app/order/fireLeadEvent';

describe('fireLeadEvent', () => {
  beforeEach(() => {
    (window as any).fbq = vi.fn();
  });

  it('calls fbq with Lead and KRW value', () => {
    fireLeadEvent(1500000);
    expect((window as any).fbq).toHaveBeenCalledWith('track', 'Lead', {
      value: 1500000,
      currency: 'KRW',
    });
  });

  it('is safe when fbq is undefined', () => {
    delete (window as any).fbq;
    expect(() => fireLeadEvent(1500000)).not.toThrow();
  });

  it('uses default value when no amount passed', () => {
    fireLeadEvent();
    expect((window as any).fbq).toHaveBeenCalledWith('track', 'Lead', {
      value: 1500000,
      currency: 'KRW',
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun run test __tests__/CommissionLead.test.tsx`
Expected: FAIL with "Cannot find module '@/app/order/fireLeadEvent'"

- [ ] **Step 3: Create the helper**

Create `app/order/fireLeadEvent.ts`:

```typescript
/**
 * Fires Meta Pixel 'Lead' conversion event. Safe to call when fbq is not loaded
 * (ad blockers, Pixel not initialized yet) — silently no-ops.
 *
 * Value defaults to 1,500,000 KRW (typical EEL commission average) for Meta's
 * Conversion Value optimization.
 */
export function fireLeadEvent(value: number = 1_500_000): void {
  if (typeof window === 'undefined') return;
  if (typeof window.fbq !== 'function') return;

  window.fbq('track', 'Lead', {
    value,
    currency: 'KRW',
  });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bun run test __tests__/CommissionLead.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Wire event into CommissionClient**

Edit `app/order/CommissionClient.tsx`. Add import at top:

```tsx
import { fireLeadEvent } from './fireLeadEvent';
```

Inside `handleSend`, after `setSubmitted(true)` (the successful-response branch), add `fireLeadEvent()`:

Find this block:

```tsx
if (!res.ok) throw new Error();
setConfirmOpen(false);
setSubmitted(true);
```

Replace with:

```tsx
if (!res.ok) throw new Error();
setConfirmOpen(false);
setSubmitted(true);
fireLeadEvent();
```

- [ ] **Step 6: Verify in dev**

Run: `bun run dev`
- Open Commission page → fill all 7 steps → submit
- In DevTools Network tab, filter `facebook`: should see a `/tr/` request with `ev=Lead`

- [ ] **Step 7: Commit**

```bash
git add app/order/fireLeadEvent.ts __tests__/CommissionLead.test.tsx app/order/CommissionClient.tsx
git commit -m "feat(pixel): fire Meta Pixel Lead event on commission submit"
```

---

## Task 5: OG metadata + OG image

**Why:** Current site has no `og:image`, so shared links render as text-only previews in KakaoTalk / Messenger / Dezeen pitches.

**Files:**
- Modify: `app/layout.tsx`
- Create: `public/og-image.jpg` (from P2)

- [ ] **Step 1: User uploads the OG image**

User runs (from repo root):

```bash
# Place the prepared 1200x630 image here:
cp /path/to/og-image.jpg public/og-image.jpg
```

Or drag into VSCode / Finder. Verify size:

```bash
ls -la public/og-image.jpg
```

Expected: file exists, ~100–500 KB reasonable.

- [ ] **Step 2: Extend metadata in layout**

Edit `app/layout.tsx`, replace the `metadata` export:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://eel-studio.me'),
  title: "EEL — Furniture & Object Maker",
  description:
    "A Seoul-based studio crafting resin objects that are eccentric by nature, precise by hand.",
  openGraph: {
    type: 'website',
    url: 'https://eel-studio.me',
    title: 'EEL — Seoul Resin Atelier',
    description:
      'Custom resin furniture, hand-made in Seoul. Every piece cures over 21 days.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EEL — a resin table in a dim atelier',
      },
    ],
    locale: 'ko_KR',
    siteName: 'EEL Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EEL — Seoul Resin Atelier',
    description: 'Custom resin furniture, hand-made in Seoul.',
    images: ['/og-image.jpg'],
  },
};
```

- [ ] **Step 3: Verify OG tags render**

Run: `bun run dev`
- Open http://localhost:3000
- View page source (Ctrl+U)
- Search for `og:image` — expected: `<meta property="og:image" content="https://eel-studio.me/og-image.jpg">`
- Search for `twitter:card` — expected: `summary_large_image`

- [ ] **Step 4: Test preview with external tool**

After deploying (later), paste `https://eel-studio.me` into:
- https://opengraph.xyz
- Or Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/

Expected: thumbnail shows the uploaded image.

(For now in dev, skip this step — local URL won't work externally.)

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx public/og-image.jpg
git commit -m "feat(seo): add OG image + OpenGraph metadata for social shares"
```

---

## Task 6: Home page h1 tag

**Why:** SEO basics. Google uses h1 to understand page topic. Current home has 0 h1 tags. Must be a real h1, not styled div.

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Read current home structure**

Open `app/page.tsx`. Locate the hero text area (likely renders "EEL" logo text).

- [ ] **Step 2: Find the "EEL" logo text element**

Run:

```bash
grep -n "EEL" app/page.tsx
```

Expected: find the line rendering the large "EEL" brand mark.

- [ ] **Step 3: Wrap or change the EEL logo to h1**

Modify that element so it is an `<h1>` (keeping visual style via className):

Example (adapt to actual markup):

```tsx
<h1 className="font-[var(--font-gravitas)] text-[clamp(36px,5vw,56px)] leading-none tracking-tight">
  EEL
</h1>
```

The h1 must be **exactly one** per page. If there are multiple "EEL" text occurrences, only the largest brand display gets h1; the others stay as spans or p tags.

- [ ] **Step 4: Verify only 1 h1 on homepage**

Run: `bun run dev`, then in browser console:

```javascript
document.querySelectorAll('h1').length
```

Expected: `1`

Visual output should be identical to before.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat(seo): add h1 tag to home hero for SEO"
```

---

## Task 7: Inquire CTA on Works page

**Why:** Current Works catalog shows SOLD OUT tag but has no path for visitors to say "I want one like this." Adds a clear next action.

**Files:**
- Modify: `app/products/WorksPageClient.tsx`

- [ ] **Step 1: Find product detail overlay**

Run:

```bash
grep -n "SOLD OUT\|sold out" app/products/WorksPageClient.tsx
```

Locate the section rendering product detail overlay (left-side info panel).

- [ ] **Step 2: Add "Inquire about this piece" CTA button**

Inside the detail overlay, below the price / SOLD OUT row, add a Next.js Link:

```tsx
import Link from 'next/link';

// Inside product detail overlay component JSX, below price/status:
<Link
  href="/order"
  className="inline-block mt-6 px-6 py-3 border border-white/30 text-white/90 text-xs tracking-[0.12em] uppercase hover:bg-white hover:text-black transition-colors duration-300"
  style={{ fontFamily: "var(--font-staatliches, 'Staatliches'), sans-serif" }}
>
  Inquire about a similar piece
</Link>
```

If the product has `available: true` state (check existing props), label text is `"Inquire about this piece"`; otherwise `"Commission a similar piece"`.

- [ ] **Step 3: Verify button appears and routes**

Run: `bun run dev`
- Navigate to http://localhost:3000/products
- Click any product → detail overlay opens
- Scroll to below price area → button visible
- Click the button → should navigate to `/order`

- [ ] **Step 4: Commit**

```bash
git add app/products/WorksPageClient.tsx
git commit -m "feat(conversion): add Inquire CTA to Works product detail overlay"
```

---

## Task 8: About page scaffolding

**Why:** Premium artisan buyers need to see the maker. New `/about` route holds the narrative.

**Files:**
- Create: `app/about/page.tsx`
- Create: `public/about/artist-portrait.jpg` (from P3)

- [ ] **Step 1: User places portrait image**

```bash
mkdir -p public/about
cp /path/to/artist-portrait.jpg public/about/artist-portrait.jpg
```

Verify:

```bash
ls -la public/about/
```

- [ ] **Step 2: Create minimal about page**

Create `app/about/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — EEL',
  description: 'Meet the maker behind EEL. A Seoul-based resin atelier founded by Chae Min Soo.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#2e3330] text-[#e8ebe8] px-6 md:px-16 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1
          className="text-3xl md:text-5xl mb-10 md:mb-16"
          style={{ fontFamily: "var(--font-gravitas, serif)" }}
        >
          About
        </h1>

        <div className="aspect-[4/5] relative mb-10 md:mb-16 overflow-hidden">
          <Image
            src="/about/artist-portrait.jpg"
            alt="Chae Min Soo in the EEL atelier, Seoul"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6 text-[15px] leading-[1.8]" style={{ fontFamily: "Telex, sans-serif" }}>
          {/* Content to be filled in Task 9 */}
          <p className="text-[#8a9488] italic">
            [About content to be added — see Task 9.]
          </p>
        </div>

        <div className="mt-16 md:mt-24 border-t border-[#404840] pt-10">
          <Link
            href="/order"
            className="inline-block px-8 py-4 border border-[#e8ebe8]/30 text-[#e8ebe8] text-xs tracking-[0.12em] uppercase hover:bg-[#e8ebe8] hover:text-[#2e3330] transition-colors duration-300"
            style={{ fontFamily: "var(--font-staatliches, sans-serif)" }}
          >
            Start a Commission
          </Link>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify page renders**

Run: `bun run dev`
- Navigate to http://localhost:3000/about
- Expected: dark green page, "About" title, portrait image, placeholder paragraph, "Start a Commission" button

- [ ] **Step 4: Add nav link (optional for Phase 1)**

Skip for now — BottomNav is crowded. Page is reachable via direct URL and future Journal/About linking.

- [ ] **Step 5: Commit**

```bash
git add app/about/page.tsx public/about/artist-portrait.jpg
git commit -m "feat(about): scaffold /about page with portrait and commission CTA"
```

---

## Task 9: About page content (artist narrative)

**Why:** Scaffold is placeholder. Real narrative converts trust into inquiries.

**Files:**
- Modify: `app/about/page.tsx`

- [ ] **Step 1: User provides narrative text**

User writes 300–500자 Korean first-person narrative covering:
- 시작 이야기 (왜 레진 작업을 시작했는지)
- 3-week philosophy (왜 그만큼 걸리는지)
- 재료 선택 기준 (오크·레진·안료를 어떻게 고르는지)

- [ ] **Step 2: Replace placeholder in page.tsx**

Edit `app/about/page.tsx`. Replace the `{/* Content to be filled */}` block with actual content:

```tsx
<div className="space-y-6 text-[15px] leading-[1.8]" style={{ fontFamily: "Telex, sans-serif" }}>
  <p>
    {/* paragraph 1 — 시작 이야기 */}
    저는 채민수입니다. 2022년 어느 겨울, 오래된 오크 한 조각에 레진을 흘려보낸 것이 시작이었습니다.
    {/* ...continue with user-provided narrative */}
  </p>
  <p>
    {/* paragraph 2 — 3주 철학 */}
    레진은 천천히 굳습니다. 한 층, 하루. 스물한 번의 하루가 모여 한 작품이 됩니다.
    {/* ...continue */}
  </p>
  <p>
    {/* paragraph 3 — 재료 */}
    쓰는 재료는 셋뿐입니다. 화이트 오크, 안료, 투명 레진.
    {/* ...continue */}
  </p>
</div>
```

(Exact text varies with user's voice. Keep the HTML structure: `<div>` wrapper + `<p>` per paragraph + matching font stack.)

- [ ] **Step 3: Add quiet line below content**

Above the "Start a Commission" CTA, add a small attribution:

```tsx
<p
  className="mt-12 text-xs tracking-[0.08em] text-[#8a9488]"
  style={{ fontFamily: "var(--font-staatliches, sans-serif)" }}
>
  — CHAE MIN SOO, Seoul
</p>
```

- [ ] **Step 4: Verify final render**

Run: `bun run dev`
- http://localhost:3000/about
- Narrative visible, typography readable, portrait above text, attribution + CTA below

- [ ] **Step 5: Commit**

```bash
git add app/about/page.tsx
git commit -m "content(about): add artist narrative for About page"
```

---

## Task 10: Final verification + smoke test

**Why:** Catch regressions before deploying. All changes shipped — verify together.

- [ ] **Step 1: Run full test suite**

```bash
bun run test
```

Expected: all tests PASS (existing `calcPrice.test.ts` + `SpecIcon.test.tsx` + new `MetaPixel.test.tsx` + `CommissionLead.test.tsx`)

- [ ] **Step 2: Build production bundle**

```bash
bun run build
```

Expected: successful build, no TypeScript errors, no missing env warnings

- [ ] **Step 3: Lint**

```bash
bun run lint
```

Expected: zero errors

- [ ] **Step 4: Manual smoke test**

Run `bun run dev`, walk the flow:
- [ ] Home loads, 1 h1 visible in source
- [ ] Works page loads, product click opens overlay, "Inquire" button present and routes to `/order`
- [ ] `/about` loads, portrait + narrative + CTA visible
- [ ] `/order` Commission builder 7 steps complete
- [ ] Submit form → confirm modal → 전송하기 → verify `fbq('track', 'Lead', ...)` fires in Network tab
- [ ] View page source → `og:image` + `og:title` + `twitter:card` all present

- [ ] **Step 5: Push to production**

```bash
git push origin HEAD:main
```

Vercel auto-deploys. Wait ~2 minutes.

- [ ] **Step 6: Verify on production**

- Open https://eel-studio.me in incognito
- Open https://developers.facebook.com/tools/debug/ → paste URL → Fetch New Scrape Info
- Expected: OG image thumbnail shows correctly
- Open https://www.facebook.com/ads/manager → Events Manager → your Pixel → Test Events tab
- Expected: PageView + Lead events arrive when you visit site + submit commission

- [ ] **Step 7: Final commit if any fixes**

If smoke test found issues, fix and commit. Then Phase 1 is complete.

---

# Phase 2 & 3 Operational Milestones

**Not code** — user self-execution after Phase 1 ships. Captured here so the plan doc = single source of truth.

## Phase 2: Launch (Week 3-6)

- [ ] **M1: Create Meta Business Manager + link Instagram** (Week 3 Day 1, 45 min)
  - business.facebook.com → Create Business → link @eel.eel.eel.eel
  - Add payment method (본인 명의 카드)
  - Create Ad Account "EEL Ads" (KRW, Asia/Seoul)

- [ ] **M2: Build Phase 2 content backlog** (Week 3 Day 2-3)
  - 4주치 포스트 초안 (Process / Hero / Detail / Voice)
  - Claude helps draft captions + selects archive works

- [ ] **M3: Update IG bio + DM templates** (Week 3 Day 4)
  - 바이오 3줄 재작성 (Spec Section 2 기준)
  - DM 템플릿 3종을 IG Saved Replies에 저장

- [ ] **M4: Launch Phase 2 ads** (Week 3 Day 5)
  - Campaign: Traffic → Profile Visit
  - 3 Ad Sets: Lookalike 1% + Interest + Retargeting
  - Budget: 일 ₩30,000 × 28일
  - Creative: Use existing IG post (Phase 1 백로그에서)

- [ ] **M5: Weekly review ritual** (Week 3-6 매주 월요일)
  - Ads Manager 30분
  - IG Insights 15분
  - DM 응대 및 퍼널 기록
  - Markdown week-N.md 로그 작성

- [ ] **M6: Day 30 checkpoint** (Week 6 끝)
  - 합격 기준 체크 (팔로워 +100~200, DM 3~5건, CTR ≥1.5%)
  - Phase 3 조정 사항 정리

## Phase 3: Convert (Week 7-12)

- [ ] **M7: Switch Campaign to Conversions → Lead** (Week 7 Day 1)
  - Pixel 데이터 충분 누적 확인
  - 승자 Ad Set만 유지, Conversions Objective로 전환

- [ ] **M8: Expand Lookalike 1% → 3%** (Week 7 Day 2)
  - Ads Manager에서 기존 Lookalike 복제 → 3% 버전

- [ ] **M9: Retargeting 강화** (Week 7 Day 3)
  - 30일 이내 방문자 전용 Ad Set
  - 크리에이티브: 승자 포스트 + 변형 2개

- [ ] **M10: Day 60 checkpoint** (Week 10 끝)
  - 합격/주의/실패 기준으로 판정
  - 필요 시 Approach B 일부 전환 고려

- [ ] **M11: DM 응답 속도 12h 이내 유지** (Phase 3 전반)
  - 견적 → 계약 conversion focus

- [ ] **M12: Day 90 final judgment** (Week 12 끝)
  - 🎯 Primary: 계약 1건+
  - Secondary: 팔로워 2,000+ / DM 15건+
  - 결과에 따라 다음 단계 결정 (지속 / 확장 / 피벗)

---

# Self-Review (Writing-Plans skill requirement)

Checked this plan against the spec:

**Spec coverage:**
- Spec Section 3 (Website Changes) → Tasks 1–9 ✓
- Spec Section 4 (Content Strategy) → M2, M3 (ops) ✓
- Spec Section 5 (Ads Engine) → M4, M7, M8, M9 (ops) ✓
- Spec Section 6 (DM Funnel) → M3, M11 (ops) ✓
- Spec Section 7 (KPIs) → M5, M6, M10, M12 (ops) ✓
- Spec Section 11 (Open Questions) → addressed in Prerequisites P1–P3 ✓

**Placeholder scan:** None. All steps have concrete code or commands. Task 9's narrative paragraphs are marked as user-provided with structure scaffold.

**Type consistency:** `fireLeadEvent` function name used consistently across Task 4 test and impl. `MetaPixel` component name consistent in Tasks 2 + 3. `window.fbq` signature matches declaration in Task 1.

**Gaps:** None identified.
