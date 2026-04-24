# T05. OG metadata + OG image

**Status:** 🔒 BLOCKED on P2 (OG image 준비 필요)

## 목적
링크 공유 시 썸네일 제대로 표시. DM·카톡·Dezeen 피치 모두 영향.

## 파일
- Create: `public/og-image.jpg` (사용자 P2)
- Modify: `app/layout.tsx`

## 구현

**app/layout.tsx — metadata 확장:**

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
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'EEL — a resin table in a dim atelier',
    }],
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

## 검증

1. 개발: `bun run dev` → View Source → `og:image` 태그 확인
2. 배포 후: https://developers.facebook.com/tools/debug/ 에서 URL 넣고 Fetch New Scrape Info

## Commit
```bash
git add app/layout.tsx public/og-image.jpg
git commit -m "feat(seo): add OG image + OpenGraph metadata for social shares"
```
