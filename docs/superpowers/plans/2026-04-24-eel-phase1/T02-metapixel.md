# T02. MetaPixel component (TDD)

**Status:** ✅ DONE — commit `7e027ac`

## 목적
Pixel 초기화를 단일 테스트 가능한 유닛으로 격리. 루트 레이아웃에서 1회 로드.

## 파일
- Create: `components/MetaPixel.tsx`
- Create: `__tests__/MetaPixel.test.tsx`
- Install: `@testing-library/react` + `@testing-library/jest-dom` + `jsdom`
- Modify: `vitest.config.ts` (environment → `jsdom`)

## 테스트 (먼저 작성)

```typescript
import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import MetaPixel from '@/components/MetaPixel';

// next/script mock (jsdom에서 children 렌더 안 됨)
vi.mock('next/script', () => ({
  default: ({ children, id }: any) =>
    <script id={id} dangerouslySetInnerHTML={{ __html: children }} />
}));

describe('MetaPixel', () => {
  beforeEach(() => { delete (window as any).fbq; });

  it('renders nothing when pixelId is empty', () => {
    const { container } = render(<MetaPixel pixelId="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders Script with fbq init when pixelId set', () => {
    const { container } = render(<MetaPixel pixelId="1234567890" />);
    expect(container.innerHTML).toContain("fbq('init', '1234567890')");
    expect(container.innerHTML).toContain("fbq('track', 'PageView')");
  });
});
```

## 컴포넌트

```tsx
'use client';
import Script from 'next/script';

interface MetaPixelProps { pixelId: string; }

export default function MetaPixel({ pixelId }: MetaPixelProps) {
  if (!pixelId) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');`}
      </Script>
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`} alt="" />
      </noscript>
    </>
  );
}
```

## Commit
```bash
git commit -m "feat(pixel): add MetaPixel component with init + PageView tracking"
```
