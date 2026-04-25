# T10. Final verification + deploy

**Status:** 🔒 BLOCKED on T01~T09 완료

## 목적
모든 Phase 1 변경사항 검증 후 프로덕션 배포.

## 체크리스트

### 1. 전체 테스트
```bash
bun run test
```
Expected: 모든 테스트 PASS (calcPrice + SpecIcon + MetaPixel + CommissionLead).

### 2. 프로덕션 빌드
```bash
bun run build
```
Expected: 성공, TS 에러·env 경고 없음.

### 3. Lint
```bash
bun run lint
```
Expected: 0 에러.

### 4. Manual smoke test (`bun run dev`)
- [ ] 홈: 1 h1 소스에 존재
- [ ] Works: 제품 클릭 → 오버레이 → "Inquire" 버튼 → `/order` 이동
- [ ] `/about`: 초상 + 내러티브 + CTA 전부 보임
- [ ] `/order`: 7단계 완성
- [ ] Submit → 확인 모달 → 전송 → Network 탭에서 `fbq('track', 'Lead', ...)` 확인
- [ ] View source → `og:image` + `og:title` + `twitter:card` 전부 존재

### 5. 프로덕션 배포
```bash
git push origin HEAD:main
```
Vercel 자동 배포 (~2분).

### 6. 프로덕션 검증
- https://eel-studio.me 인코그니토 열기
- https://developers.facebook.com/tools/debug/ 에서 URL 넣고 Fetch New Scrape Info → OG 썸네일 확인
- Meta Ads Manager → Events Manager → EEL Pixel → Test Events
  - 사이트 방문 시 PageView 이벤트 도착 확인
  - Commission 제출 시 Lead 이벤트 도착 확인

### 7. 이슈 수정 (필요 시)
스모크 테스트 실패 시 수정 후 재푸시.

## 완료 시
Phase 1 전체 구현 완료. **Week 3 Phase 2 광고 런칭 준비 OK.**
