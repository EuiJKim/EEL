# T09. About page content (artist narrative)

**Status:** 🔒 BLOCKED on P3 (내러티브 글 필요)

## 목적
스캐폴드는 플레이스홀더. 실제 1인칭 서사가 신뢰 → 문의 전환.

## 파일
- Modify: `app/about/page.tsx`

## 사용자 할 일
300~500자 1인칭 한국어 내러티브 3 paragraph:
1. 시작 이야기 — 왜 레진 작업을 시작했는지
2. 3주 철학 — 왜 그만큼 걸리는지
3. 재료 선택 — 오크·레진·안료 기준

## 구현 (T08의 placeholder 교체)

```tsx
<div className="space-y-6 text-[15px] leading-[1.8]"
     style={{ fontFamily: "Telex, sans-serif" }}>
  <p>
    {/* paragraph 1 — 시작 이야기 */}
    저는 채민수입니다. 2022년 어느 겨울, 오래된 오크 한 조각에
    레진을 흘려보낸 것이 시작이었습니다.
    {/* ... 사용자 글 */}
  </p>
  <p>
    {/* paragraph 2 — 3주 철학 */}
    레진은 천천히 굳습니다. 한 층, 하루.
    스물한 번의 하루가 모여 한 작품이 됩니다.
    {/* ... */}
  </p>
  <p>
    {/* paragraph 3 — 재료 */}
    쓰는 재료는 셋뿐입니다. 화이트 오크, 안료, 투명 레진.
    {/* ... */}
  </p>
</div>
```

## 작가 서명 (CTA 위에 추가)

```tsx
<p className="mt-12 text-xs tracking-[0.08em] text-[#8a9488]"
   style={{ fontFamily: "var(--font-staatliches, sans-serif)" }}>
  — CHAE MIN SOO, Seoul
</p>
```

## Commit
```bash
git add app/about/page.tsx
git commit -m "content(about): add artist narrative for About page"
```
