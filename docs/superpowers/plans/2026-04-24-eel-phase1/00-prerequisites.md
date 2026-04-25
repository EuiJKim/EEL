# 00. Prerequisites (사용자 준비물)

Phase 1 블로커. 태스크 진행 전 확보 필요.

## P1. Meta Pixel ID
1. business.facebook.com → **Events Manager** → **Connect Data Sources** → **Web**
2. 이름: `EEL Pixel`
3. 생성 후 15~16자리 ID 복사
4. 워크트리의 `.env.local`에 추가:
   ```
   NEXT_PUBLIC_META_PIXEL_ID=1234567890123456
   ```

**필요한 태스크:** T03 검증, T10 전환 이벤트 확인.

## P2. OG Image 1200×630
- JPG 또는 PNG
- 콘셉트: 완성 작품 Hero Shot (어두운 배경) 또는 작업실
- 저장 위치 (나중): `public/og-image.jpg`

**필요한 태스크:** T05.

## P3. About 페이지 자료
- **사진 1장**: 작가 또는 작업실 (세로 4:5, 1200px+)
  - 저장 위치 (나중): `public/about/artist-portrait.jpg`
- **글 300~500자** (한국어 1인칭):
  - 시작 이야기 / 3주 철학 / 재료 선택 기준

**필요한 태스크:** T08 (사진), T09 (글).

## 상태

- [ ] P1 완료
- [ ] P2 완료
- [ ] P3 완료

모두 체크되면 `node`, `T05`, `T08`, `T09`, `T10` 실행 가능.
