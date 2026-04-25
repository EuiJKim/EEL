# T03. Wire MetaPixel into root layout

**Status:** ✅ DONE — commit `67f2b9c`

## 목적
모든 페이지에 Pixel 로드. `NEXT_PUBLIC_META_PIXEL_ID` 환경변수 필수.

## 파일
- Modify: `app/layout.tsx`
- Create: `.env.example` (placeholder — `.env`가 gitignore라서)

## 변경 내역

**.env.example:**
```
# Meta Pixel (client-side, exposed to browser). Obtain from business.facebook.com → Events Manager.
NEXT_PUBLIC_META_PIXEL_ID=
```

**app/layout.tsx 상단 import 추가:**
```tsx
import MetaPixel from "@/components/MetaPixel";
```

**body 첫 자식으로 추가:**
```tsx
<body className={`${gravitasOne.variable} ${staatliches.variable} ${dmSans.variable} antialiased`}>
  <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ''} />
  {children}
</body>
```

## 검증
```bash
bun run build
```
Expected: 성공. (env var 비어있어도 MetaPixel이 null 반환하므로 안전.)

## 사용자 할 일
`.env.local`에 실제 Pixel ID 추가:
```
NEXT_PUBLIC_META_PIXEL_ID=1234567890123456
```
