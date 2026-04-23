# EEL 마케팅 — 90일 첫 매출 달성 설계안

**작성일:** 2026-04-23
**작성자:** 김의준 (EEL Studio) + Claude
**상태:** DRAFT (사용자 리뷰 대기)
**접근법:** Approach A — Conversion Focused

---

## 1. 전략 요약 (Executive Summary)

### Goal

90일 내 **첫 매출 1건 성사**.

- **Primary:** Commission 계약 1건 (단가 약 ₩1,500,000)
- **Secondary:** 또는 기존 Works 29점 중 1점 판매

### Strategy

> "기존 1,335 팔로워 + Works 29점을 최대 활용해 전환 경로를 최적화하고, Lookalike 광고로 닮은꼴 구매자를 발굴한다."

### Phases

| Phase | 기간 | 광고비 | 목표 |
|---|---|---|---|
| 1. Foundation | Week 1-2 | ₩0 | 전환 경로 구멍 막기 |
| 2. Launch | Week 3-6 | ₩840,000 | 광고 학습·데이터 쌓기 |
| 3. Convert | Week 7-12 | ₩1,200,000 | 첫 계약 성사 |
| **Total** | **12주** | **₩2,040,000** | **첫 매출 1건** |

---

## 2. 현황 (Baseline)

### Instagram (@eel.eel.eel.eel)
- 팔로워: 1,335
- 팔로잉: 0
- 포스트: 37
- 바이오: "based in seoul / handmade something / DM for inquiries"
- 포스팅 빈도 한계: 주 1개

### Website (eel-studio.me)
- Works 작품: 29점 (furniture 6 + objet 15 + painting 8)
- Commission 7단계 빌더: 완비 (Color → Shape → Size → Height → Legs → 폼 → 확인)
- 이메일 자동화: 관리자(sjkim942884@gmail.com) + 고객 확인 이메일 전송
- SEO 상태: OG image 없음, h1 없음, Meta Pixel 없음

### User Context
- 진행 중 커미션: 0개
- 기존 고객: 0명 (웹사이트 오픈 직후)
- 강점: 광고 운영·데이터 분석
- 약점: 촬영·콘텐츠 제작 (경험 부족)

---

## 3. Website Changes (Section 2 의 구현 범위)

### 🔴 Must-have (Phase 1 Week 1-2 완료)

| # | 변경 | 파일 | 예상 시간 |
|---|---|---|---|
| 1 | Meta Pixel 설치 (`fbq` init + PageView + Lead 이벤트) | `app/layout.tsx`, `app/order/CommissionClient.tsx`, `.env.local` | 30분 |
| 2 | OG image + OpenGraph 메타 태그 | `app/layout.tsx` (metadata), `public/og-image.jpg` | 15분 (이미지 준비 별도) |
| 3 | Works 제품 상세에 "Inquire" CTA 버튼 (→ `/order` 링크, 문의 유도) | `app/products/WorksPageClient.tsx` | 40분 |
| 4 | 홈 페이지 h1 태그 추가 (SEO) | `app/page.tsx` | 10분 |

### 🟡 Should-have (Phase 2 초반)

| # | 변경 | 파일 | 예상 시간 |
|---|---|---|---|
| 5 | About 페이지 신설 (작가 스토리) | `app/about/page.tsx` + 작가 사진 | 1시간 (사진·글 준비 별도) |
| 6 | Commission 페이지 상단 Social Proof | `app/order/CommissionClient.tsx` | 30분 |

### 🟢 Nice-to-have (Phase 3 여유 있으면)

| # | 변경 | 우선순위 |
|---|---|---|
| 7 | 홈 "Currently in the Studio" 섹션 | 낮음 |
| 8 | Journal 섹션 시작 | 낮음 (A에서는 우선순위 낮음) |

### Prerequisite (사용자 준비 필요)

- Meta Business Manager에서 **Pixel ID 발급** (16자리) → `.env.local`에 `NEXT_PUBLIC_META_PIXEL_ID`
- OG image 1장 (1200×630) — 완성작 Hero shot 또는 작업실 사진
- About 페이지용 작가 사진 + 300~500자 1인칭 글

---

## 4. Content Strategy (Section 3)

### Rhythm

- **주 1 포스트** 고정 (월요일 19:00 KST)
- Story 수시 (알고리즘 활발도 신호)

### 4-Week Rotation

제작 리듬(2주/작품)과 아카이브(29점) 혼합:

```
Week 1: 지금 작업 — Process (시작 / 재료)
Week 2: 지금 작업 — Hero Shot (완성 or 중간 공개)
Week 3: 아카이브 — Detail (29점 중 1점 클로즈업 캐러셀)
Week 4: Voice — 작가 철학 (작업실 풍경 1장 + 에세이 200자)
```

### "Available" Signal (A의 차별점)

모든 포스트 캡션 말미에 구매 유도 신호 명시:

```
완성작 포스트:
  ─────
  Available for commission.
  Similar pieces: eel-studio.me/order

아카이브 포스트:
  ─────
  Archive · Commission similar: eel-studio.me
```

### Visual Consistency

- 어두운 배경 (#2e3330 계열, Dark Atelier 유지)
- 크롭 1:1 (캐러셀 표지도 1:1)
- 이모지·필터·대량 해시태그 금지
- 캡션: 영문 1줄 훅 + 한글 3~5줄 + 해시태그 5~10개

### Content Backlog (Phase 1에 미리 준비)

Week 1 게시 전까지 4주치 초안 작성:

| 주차 | 소스 | 포맷 |
|---|---|---|
| W1 | 지금 시작할 작품 or 기존 1점 재활용 | Process 사진 1장 |
| W2 | 같은 작품 or 아카이브 | Hero Shot |
| W3 | 기존 29점 중 1점 Detail | 캐러셀 3~4장 |
| W4 | Voice essay | 사진 1장 + 에세이 200자 |

---

## 5. Ads Engine (Section 4)

### Phase 1 (Week 1-2): OFF

Pixel 설치 후 2주간 방문자 데이터 축적. 광고 돌리기 전 Retargeting 풀 구축.

### Phase 2 (Week 3-6): 학습 & 발굴 — 일 ₩30,000 × 28일 = ₩840,000

```
Campaign 1: Traffic → Profile Visit
├── Ad Set A: Lookalike 1% (from 1,335 팔로워)
│   └── 일 ₩10,000
├── Ad Set B: Broad Interest
│   └── 오디언스: 서울·경기 28-48세
│       Interests: Interior design, Dezeen, Monocle, Handmade, Mid-century modern
│   └── 일 ₩10,000
└── Ad Set C: Retargeting (Week 5부터 활성화)
    └── 대상: eel-studio.me 방문자 + IG engager
    └── 일 ₩10,000

각 Ad Set에 광고 2~3개 (Use existing post 방식으로 오가닉 포스트 재활용)
```

### Phase 3 (Week 7-12, 약 42일 중 40일 active): 스케일 & 전환 — 일 ₩30,000 × 40일 = ₩1,200,000

```
Campaign 2: Conversions → Lead (Pixel 기반)
├── Ad Set A+ : 승자 Lookalike 확장 (1% → 3%)
├── Ad Set B+ : 승자 Interest 강화 + 신규 크리에이티브 2개
└── Ad Set C+ : Retargeting 강화 (30일 이내 방문자)
```

### KPI Thresholds (Phase 2)

- CTR ≥ 1.5%
- CPC ≤ ₩1,000
- Profile visit per ₩1,000 spend ≥ 0.8 (즉, 광고비 1만원당 프로필 방문 8+)
- DM 유입 월 3~5건

---

## 6. DM Funnel & Conversion (Section 5)

### Templates (미리 저장)

**Template 1 — 초기 문의 응답 (DM 첫 메시지):**

```
안녕하세요. EEL입니다.
문의해주셔서 감사합니다.

저희는 모든 작품을 주문 제작으로 약 3주간 만듭니다.
관심 있는 형태·크기·컬러가 있으시면
eel-studio.me/order 에서 옵션을 선택하며
3D로 미리 보실 수 있습니다.

또는 이 DM으로 대략적인 희망사항 말씀해주시면
제가 먼저 제안드리겠습니다.

답변 드리는 데 하루 정도 걸릴 수 있습니다.
```

**Template 2 — 견적 요청 응답:**

```
{이름}님, 옵션 확인했습니다.

— Shape: {Organic}
— Size: {M (50-65cm)}
— Height: {Dining (72-75cm)}
— Color: {Glacier Blue, 반투명}
— Legs: {4 Legs}

이 구성이면 재료비·작업 기간 고려하여
{₩1,500,000~₩1,800,000} 선에서 제작 가능합니다.

전체 과정:
  1. 계약금 30% 입금 시 작업 시작
  2. 3주 제작 (매주 진행 사진 공유)
  3. 완성 후 잔금 70%
  4. 서울 권역 직접 배송

계약 진행 원하시면 알려주세요.
추가 문의는 언제든 환영합니다.
```

**Template 3 — 미전환자 Nurture (2주 후 재접촉):**

```
{이름}님, 안녕하세요.

지난번 문의 주신 후 잘 지내고 계신가요?

{이번 주 완성한 유사 작품 사진 1~2장}

비슷한 구성으로 진행 중인 새 의뢰도 있어
혹시 결정에 도움이 될까 공유드립니다.

편하실 때 연락 주세요.
```

### Response Speed

- Phase 2: 24시간 이내
- Phase 3: 12시간 이내

### Funnel Stages

| Stage | 정의 | Healthy Conv Rate |
|---|---|---|
| 1 | DM 접수 | — |
| 2 | 대화 이어짐 | 60~80% |
| 3 | 견적 제시 | 30~50% |
| 4 | 계약금 입금 🎯 | 20~40% |
| 5 | 작품 완성·배송 | (포트폴리오화) |

**종합 Conv Rate: 5~15%**. 계약 1건 = DM 10~20건 필요.

---

## 7. Measurement & KPIs (Section 6)

### North Star

**90일 내 첫 매출 1건** (Commission 계약 or Works 판매).

### Weekly Dashboard (월요일 30분)

```markdown
## Week N — 2026-MM-DD

### 광고
- 지출: ₩
- CTR / CPC / Frequency

### IG
- 새 팔로워 / 프로필 방문 / Save Rate

### Funnel
- 새 DM / 상담 진행 / 견적 제시 / 계약 🎯

### 노트
- 이번 주 승자 광고
- 이번 주 승자 포스트
- 다음 주 조정 사항
```

### Monthly Checkpoints

**Day 30 리뷰:**
- ✅ 합격: 팔로워 +100~200, DM 3~5건, CTR ≥ 1.5%
- 🟡 주의: DM 0건 → 크리에이티브 재검토
- ❌ 실패: 프로필 방문 500 미만 → 오디언스 재설정

**Day 60 리뷰:**
- ✅ 합격: 팔로워 1,700+, 누적 DM 10건+, 견적 2~3건, 상담 진행 중
- 🟡 주의: 견적 갔지만 계약 0 → 템플릿·가격 재검토
- ❌ 실패 (pivot 트리거): DM 5건 미만 → Approach B 일부 전환

**Day 90 최종:**
- ✅ 성공: 계약 1건+ or Works 판매 1점+
- 🟡 부분 성공: 상담 진행 or 견적 5+ → 120일 연장
- ❌ 실패: DM 10건 미만 & 계약 0 → Approach B 전면 피벗

### Tools

- Meta Ads Manager (광고)
- Instagram Insights (오가닉)
- Meta Pixel Events Manager (전환)
- Markdown 주간 로그 (`.gstack/marketing/week-N.md` 또는 Notion)

---

## 8. Risk & Mitigation

| 리스크 | 확률 | 완화책 |
|---|---|---|
| 광고 승인 지연 (Meta 심사) | 낮음 | Phase 1 말에 테스트 광고 1건 미리 |
| 크리에이티브 반응 제로 | 중간 | Week 4 시점 재촬영 옵션 |
| DM 유입 있지만 전환 제로 | 중간 | Template 2 가격 투명성 강화, About 페이지 링크 공유 |
| 팔로워 1,335 중 구매 의사 매우 낮음 | 낮음 | Lookalike 대신 Interest 비중 확대 |
| 네 시간 부족 (주 4시간 초과) | 중간 | Phase 2에서 광고 운영 30분/주로 축소 |

---

## 9. Success Criteria (Day 90)

### Primary (메인 목표)

- [ ] Commission 계약 1건+ or Works 판매 1점+

### Secondary (브랜드 자산)

- [ ] 팔로워 2,000+ (≥15% 증가)
- [ ] 누적 DM 문의 15건+
- [ ] Pixel 방문자 데이터 누적 5,000+
- [ ] 광고 학습 데이터 완비 (Phase 4 확장 가능)

### Failure Fallback

위 Primary 미달 시 Approach B (Content Flywheel) 로 일부 or 전면 전환.

---

## 10. Budget Summary

| 항목 | 금액 |
|---|---|
| Phase 1 광고비 | ₩0 |
| Phase 2 광고비 | ₩840,000 |
| Phase 3 광고비 | ₩1,200,000 |
| 외주·장비 | ₩0 (자체 스마트폰 촬영) |
| **Total** | **₩2,040,000** |

### ROI Scenarios

- 계약 1건 (₩1,500,000) → **-₩540,000** (브랜드 자산 + 광고 데이터 감안 시 break-even)
- 계약 2건 (₩3,000,000) → **+₩960,000 흑자**
- Works 1점 판매 → 단가에 따라 ±
- 계약 0건 → **-₩2,040,000 + 브랜드 자산·학습 데이터 (Approach B로 피벗)**

---

## 11. Open Questions

- [ ] 지금 시작할 작품 있는지 (Process 시리즈 W1 게시용)
- [ ] About 페이지용 작가 사진 준비 가능 시점
- [ ] OG image로 쓸 대표 작품 선정
- [ ] 일 광고비 ₩30,000 고정인지, 상황 따라 ±20% 허용인지

---

## 12. Next Steps

1. **Spec self-review** (Claude, 인라인 수정)
2. **사용자 리뷰** (이 문서 검토 + 피드백)
3. **승인 후 writing-plans 스킬로 전환** → 주차별 실행 태스크 분해
4. **Phase 1 실행 시작** (Week 1 Day 1 = 이번 주 월요일)

---

*End of design document.*
