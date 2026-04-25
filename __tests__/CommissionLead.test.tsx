import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireLeadEvent } from '@/app/order/fireLeadEvent';

describe('fireLeadEvent', () => {
  beforeEach(() => {
    (window as any).fbq = vi.fn();
  });

  it('calls fbq with Lead and KRW value', () => {
    fireLeadEvent(1500000);
    expect((window as any).fbq).toHaveBeenCalledWith('track', 'Lead', {
      value: 1500000,
      currency: 'KRW',
    });
  });

  it('is safe when fbq is undefined', () => {
    delete (window as any).fbq;
    expect(() => fireLeadEvent(1500000)).not.toThrow();
  });

  it('uses default value when no amount passed', () => {
    fireLeadEvent();
    expect((window as any).fbq).toHaveBeenCalledWith('track', 'Lead', {
      value: 1500000,
      currency: 'KRW',
    });
  });
});
