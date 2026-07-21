# Commission 빌더 — 반투명 제거 + 다리 소재/가격 구조 디자인 스펙

**날짜:** 2026-07-21
**상태:** APPROVED (디자인 합의 완료, 구현 계획 대기)
**범위:** `/order` Commission 빌더의 Color(투명도)·Legs 스텝 + Inquiry 요약/이메일 + 3D 프리뷰. 스텝 순서(6단계), 28색 팔레트, Shape/Size/Height 스텝, 이메일 발송 로직 구조는 건드리지 않음.

---

## 1. 배경 (왜 바꾸나)

실제 고객 문의에서 나온 문제 두 가지:

1. **"반투명인지 불투명인지 잘 모르겠다"** — 반투명 옵션이 혼란만 만들고 있음. 내부 판단도 "애매한 포지션". 유지 비용(예시 촬영, 설명, 제작 편차)이 가치보다 큼 → 제거.
2. **"다리 소재는 제한이 없는 걸까요? 선택에 소재는 없네요"** — 현재 Legs 스텝은 모양(4 Legs/Pedestal)만 있고 소재 축이 없음. 실제 제약은 소재에 있음: 나무는 커스텀 모양 제작 가능(가격 상승), 스테인리스·티타늄은 기본 모양만 가능 → 소재를 1차 선택으로 올리고, 소재가 모양 선택지를 제한하는 구조로.

추가로 예상 견적 표기가 필요하지만, 커스텀 다리 가격이 천차만별이라 단일 예상가는 신뢰 리스크 → "시작가(from) + 별도 견적" 2단계 표기. 시작가 숫자는 아직 없으므로 **구조만 만들고 값이 채워지면 켜지는** 방식.

---

## 2. 변경 상세

### 2.1 투명도 — 반투명 제거

- `CommissionClient.tsx`의 투명도 상태 타입 `'투명' | '반투명' | '불투명'` → `'투명' | '불투명'`, 버튼 3개 → 2개 (그리드 3열 → 2열).
- Inquiry 스텝 요청사항 textarea 위에 안내 문구 한 줄 추가:
  - "반투명 등 특수 마감은 요청사항에 적어주시면 상담 시 안내드립니다."
  - (확인 결과 현재 빌더는 한국어 단일 — `useLanguage` 미사용. 다국어 처리 불필요.)
- 과거 문의 데이터의 "(반투명)" 표기는 그대로 둠. 마이그레이션 불필요.

### 2.2 Legs 스텝 — 소재 → 모양 2단 구조

**상단: 소재 선택 (3택)**

| 소재 | 커스텀 모양 | 비고 |
|---|---|---|
| Wood | 가능 (별도 견적) | 기본 모양도 가능 |
| Stainless | 불가 | 기본 모양만 |
| Titanium | 불가 | 기본 모양만 |

**하단: 모양 선택 — 소재에 따라 노출 변경**

- Wood: `4 Legs` / `Pedestal` / `Custom`
  - Custom 카드: "별도 견적" 배지 + "원하는 모양은 문의 단계에서 설명해 주세요" 안내 텍스트.
- Stainless, Titanium: `4 Legs` / `Pedestal`만. Custom 카드 자체를 렌더하지 않음 (비활성 표시가 아니라 미노출).

**제약 규칙 (기존 패턴 재사용)**

- Rectangle 선택 시 Pedestal 불가 — 기존 규칙 유지, Custom에는 적용 안 함.
- 소재 변경 시 현재 선택된 모양이 새 소재에서 불가능하면(예: Wood+Custom → Stainless) 모양 선택 자동 해제. 기존 "Rectangle 선택 → Pedestal이면 4 Legs로" 해제 패턴과 동일한 방식.
- 소재 미선택 상태에서는 모양 카드 비활성(dim 처리, 클릭 불가) — 소재를 먼저 고르게 유도.

**상태/데이터 반영**

- 상태: `selectedLegMaterial: 'wood' | 'stainless' | 'titanium' | null` 추가, `selectedLegs: '4' | '1' | 'custom' | null`로 확장.
- Inquiry 요약 및 이메일 payload의 Legs 값: `"Wood · Pedestal"`, `"Wood · Custom"` 형식.
- Legs 스텝 완료 조건: 소재 + 모양 둘 다 선택.

### 2.3 가격 구조 — 시작가 테이블 (값은 나중에)

- `data/commission-pricing.ts` 신설:

```ts
// 사이즈 × 다리 소재별 시작가(₩). null = 아직 미정 → UI에 가격 미노출.
export const FROM_PRICE: Record<Size, Record<LegMaterial, number | null>> = { ... };
```

- 초기값은 전부 `null`. **모든 값이 null인 동안 가격 UI는 어디에도 렌더되지 않는다** (배포해도 사용자에게 변화 없음).
- 숫자가 채워지면 Inquiry 스텝 선택 요약에 표시:
  - 기본 모양: "예상 시작가 ₩X,XXX,XXX~ · 상담 후 확정"
  - Wood Custom: 가격 숫자 없이 항상 "별도 견적 · 상담 후 확정"
- 정확한 견적을 약속하는 표기는 어디에도 쓰지 않는다. 모든 가격은 "부터(~)" + "상담 후 확정" 병기.

### 2.4 3D 프리뷰 — 다리 소재 색 반영

- `CommissionPreview3D`에 `legMaterial?: 'wood' | 'stainless' | 'titanium' | null` prop 추가.
- 다리 메시 머티리얼 색상만 변경 (지오메트리 변경 없음):
  - Wood: 갈색 계열 (예: `#8a6f4d`)
  - Stainless: 밝은 은색 (예: `#c0c4c8`)
  - Titanium: 어두운 회색 (예: `#6b6e72`)
- 미선택(null) 시 현재 기본색 유지. Custom 모양 선택 시에도 다리는 기존 지오메트리(4 Legs 형태)로 표시 — 커스텀 형상 모델링은 하지 않는다 (과설계 금지).

---

## 3. 컴포넌트 영향 범위

| 파일 | 변경 |
|---|---|
| `app/order/CommissionClient.tsx` | 투명도 2택, Legs 스텝 2단 구조, 상태 추가, 요약/제출 payload 갱신, 안내 문구 |
| `components/CommissionPreview3D.tsx` | `legMaterial` prop + 다리 머티리얼 색 분기 |
| `data/commission-pricing.ts` (신설) | 시작가 테이블 (초기 전부 null) |
| `app/api/commission-inquiry/route.ts` | 이메일 본문에 Legs 소재 포함 (payload 형식 변화 수용) |

**안 건드림:** 스텝 순서·개수, 28색 팔레트, 커스텀 색상 입력, Shape/Size/Height 스텝, Resend 발송 로직 구조, Lead 이벤트.

---

## 4. 엣지 케이스

- Rectangle + Wood + Custom: 허용 (Rectangle 제약은 Pedestal에만 적용).
- 소재 변경으로 모양이 해제된 채 Next 시도: Legs 스텝 완료 조건(소재+모양)으로 차단 — 기존 스텝 검증 방식 그대로.
- 가격 테이블 일부만 채워진 경우: 해당 조합만 가격 표시, null 조합은 미표시 (전부-아니면-전무가 아니라 조합 단위 판정).

## 5. 테스트

- 소재별 모양 노출 규칙 (Wood 3개 / Stainless·Titanium 2개) 단위 테스트.
- 소재 변경 시 불가능 모양 자동 해제 로직 테스트.
- FROM_PRICE null → 가격 UI 미렌더 / 값 존재 → "₩~" 표기 렌더 테스트.
- 제출 payload에 `"Wood · Custom"` 형식 포함 확인.
