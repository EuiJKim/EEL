# T07. Inquire CTA on Works product detail

**Status:** ✅ DONE — commit `f1f90a6`

## 목적
Works 제품 상세 오버레이에 구매 의사 표현 경로 추가. SOLD OUT만 있고 "비슷한 거 어떻게 사나" 경로 없음.

## 파일
- Modify: `app/products/WorksPageClient.tsx`

## 구현

제품 상세 좌측 정보 패널의 가격·상태 아래에 Link 추가:

```tsx
<Link
  href="/order"
  className="inline-block mt-6 px-6 py-3 pointer-events-auto border border-white/30 text-white/90 text-xs tracking-[0.12em] uppercase hover:bg-white hover:text-black transition-colors duration-300"
  style={{ fontFamily: "var(--font-staatliches, 'Staatliches'), sans-serif" }}
>
  {getStatusFromSpecs(...)?.includes('sold')
    ? 'Commission a similar piece'
    : 'Inquire about this piece'}
</Link>
```

## 조건부 라벨
- Available piece → `Inquire about this piece`
- Sold out → `Commission a similar piece`

둘 다 `/order` 페이지로 이동.

## 스타일 규칙
- Dark Atelier 미학
- `border-white/30`, Staatliches font, uppercase
- Hover: 흰 배경 + 검은 텍스트로 invert
- `pointer-events-auto` — 부모 컨테이너의 `pointer-events-none` 상쇄

## Commit
```bash
git add app/products/WorksPageClient.tsx
git commit -m "feat(conversion): add Inquire CTA to Works product detail overlay"
```
