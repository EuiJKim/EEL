# T01. TypeScript declarations for window.fbq

**Status:** ✅ DONE — commit `3138782`

## 목적
`fbq()`는 Meta Pixel 스크립트가 주입하는 전역 함수. ambient 선언 없으면 TypeScript 에러.

## 파일
- Create: `types/fbq.d.ts`

## 구현

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

## 검증
```bash
bun run lint
```
Expected: fbq 관련 에러 없음.

## Commit
```bash
git add types/fbq.d.ts
git commit -m "chore(types): add ambient declarations for Meta Pixel fbq"
```
