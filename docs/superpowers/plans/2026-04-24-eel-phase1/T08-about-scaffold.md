# T08. About page scaffolding

**Status:** 🔒 BLOCKED on P3 (작가 사진 필요)

## 목적
프리미엄 수제 구매는 "누가 만드는가"가 결정적. `/about` 라우트에 작가 내러티브.

## 파일
- Create: `app/about/page.tsx`
- Create: `public/about/artist-portrait.jpg` (P3 사진)

## 사진 배치 (사용자 할 일)

```bash
mkdir -p public/about
cp /path/to/artist-portrait.jpg public/about/artist-portrait.jpg
```

## Page 구조

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
        <h1 className="text-3xl md:text-5xl mb-10 md:mb-16"
            style={{ fontFamily: "var(--font-gravitas, serif)" }}>
          About
        </h1>

        <div className="aspect-[4/5] relative mb-10 md:mb-16 overflow-hidden">
          <Image src="/about/artist-portrait.jpg"
            alt="Chae Min Soo in the EEL atelier, Seoul"
            fill sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover" priority />
        </div>

        <div className="space-y-6 text-[15px] leading-[1.8]"
             style={{ fontFamily: "Telex, sans-serif" }}>
          {/* Content filled in T09 */}
          <p className="text-[#8a9488] italic">
            [About content to be added — see T09.]
          </p>
        </div>

        <div className="mt-16 md:mt-24 border-t border-[#404840] pt-10">
          <Link href="/order"
            className="inline-block px-8 py-4 border border-[#e8ebe8]/30 text-[#e8ebe8] text-xs tracking-[0.12em] uppercase hover:bg-[#e8ebe8] hover:text-[#2e3330] transition-colors duration-300"
            style={{ fontFamily: "var(--font-staatliches, sans-serif)" }}>
            Start a Commission
          </Link>
        </div>
      </div>
    </main>
  );
}
```

## 검증
```bash
bun run dev
# http://localhost:3000/about — dark bg + portrait + placeholder + CTA
```

## Commit
```bash
git add app/about/page.tsx public/about/artist-portrait.jpg
git commit -m "feat(about): scaffold /about page with portrait and commission CTA"
```
