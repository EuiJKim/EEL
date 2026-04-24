# T04. Fire Lead event on Commission submit (TDD)

**Status:** ✅ DONE — commit `86eecb0`

## 목적
Commission 폼 제출 시 Meta Pixel `Lead` 이벤트 발화 → Phase 3 Conversions 최적화 전제.

## 파일
- Create: `app/order/fireLeadEvent.ts`
- Create: `__tests__/CommissionLead.test.tsx`
- Modify: `app/order/CommissionClient.tsx`

## 테스트 (먼저)

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireLeadEvent } from '@/app/order/fireLeadEvent';

describe('fireLeadEvent', () => {
  beforeEach(() => { (window as any).fbq = vi.fn(); });

  it('calls fbq with Lead and KRW value', () => {
    fireLeadEvent(1500000);
    expect((window as any).fbq).toHaveBeenCalledWith('track', 'Lead',
      { value: 1500000, currency: 'KRW' });
  });

  it('is safe when fbq is undefined', () => {
    delete (window as any).fbq;
    expect(() => fireLeadEvent(1500000)).not.toThrow();
  });

  it('uses default value when no amount passed', () => {
    fireLeadEvent();
    expect((window as any).fbq).toHaveBeenCalledWith('track', 'Lead',
      { value: 1500000, currency: 'KRW' });
  });
});
```

## 헬퍼

```typescript
// app/order/fireLeadEvent.ts
export function fireLeadEvent(value: number = 1_500_000): void {
  if (typeof window === 'undefined') return;
  if (typeof window.fbq !== 'function') return;

  window.fbq('track', 'Lead', { value, currency: 'KRW' });
}
```

## CommissionClient 수정

```tsx
import { fireLeadEvent } from './fireLeadEvent';
// ... in handleSend try block, after setSubmitted(true):
fireLeadEvent();
```

## Commit
```bash
git commit -m "feat(pixel): fire Meta Pixel Lead event on commission submit"
```
