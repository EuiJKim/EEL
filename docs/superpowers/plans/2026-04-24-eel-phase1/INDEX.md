# EEL Phase 1 Implementation Plan — 2026-04-24

**Goal:** Phase 1 (Week 1-2) 웹사이트 변경 완료 → Week 3 광고 런칭 준비
**Spec:** `../../specs/2026-04-23-eel-marketing/` (topic별 분할됨)

## 진행 상태 (현재)

| # | 태스크 | 상태 | 커밋 |
|---|---|---|---|
| 0 | Prerequisites (P1·P2·P3) | ⏳ 사용자 대기 | — |
| 1 | TypeScript declarations | ✅ | `3138782` |
| 2 | MetaPixel component (TDD) | ✅ | `7e027ac` |
| 3 | Wire MetaPixel to layout | ✅ | `67f2b9c` |
| 4 | Fire Lead event on submit | ✅ | `86eecb0` |
| 5 | OG metadata + image | 🔒 P2 필요 | — |
| 6 | Home page h1 tag | ✅ | `9236036` |
| 7 | Inquire CTA on Works | ✅ | `f1f90a6` |
| 8 | About page scaffold | 🔒 P3 필요 | — |
| 9 | About page content | 🔒 P3 필요 | — |
| 10 | Final verify + deploy | 🔒 전체 완료 대기 | — |

## 파일 목록

```
00-prerequisites.md       # P1·P2·P3 사용자 준비
T01-types-fbq.md          # window.fbq 타입 선언
T02-metapixel.md          # MetaPixel 컴포넌트 + 테스트
T03-wire-layout.md        # 루트 레이아웃 주입
T04-lead-event.md         # Lead 이벤트 헬퍼 + 테스트
T05-og-metadata.md        # OpenGraph 메타 + 이미지
T06-h1.md                 # 홈 h1 태그
T07-inquire-cta.md        # Works 상세 CTA
T08-about-scaffold.md     # About 페이지 구조
T09-about-content.md      # About 내러티브
T10-final-verify.md       # 최종 검증 + 배포
milestones.md             # Phase 2-3 운영 마일스톤 (비코드)
```

**원본 전체 플랜:** `../2026-04-24-eel-marketing-phase1-implementation.md`
