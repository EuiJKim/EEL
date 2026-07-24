import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import CommissionClient from '@/app/order/CommissionClient';

vi.mock('next/dynamic', () => ({
  default: () => () => null,
}));

vi.mock('@/app/order/fireLeadEvent', () => ({
  fireLeadEvent: vi.fn(),
}));

/** 다음 버튼을 클릭하고 180ms 스텝 전환 타이머를 흘려보낸다. */
function clickNext() {
  fireEvent.click(screen.getByRole('button', { name: /다음/ }));
  act(() => {
    vi.advanceTimersByTime(200);
  });
}

async function goToLegsStep() {
  clickNext(); // Color -> Shape
  clickNext(); // Shape -> Size
  clickNext(); // Size -> Height
  clickNext(); // Height -> Legs
}

describe('CommissionClient', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('Color 스텝에서는 투명/불투명만 렌더링하고 반투명은 없다', () => {
    render(<CommissionClient />);

    expect(screen.getByRole('button', { name: '투명' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '불투명' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '반투명' })).not.toBeInTheDocument();
    expect(screen.queryByText('반투명')).not.toBeInTheDocument();
  });

  it('Legs 스텝에서 소재 2종이 렌더링되고, 소재 미선택 시 모양 카드는 비활성 래퍼로 감싸진다', () => {
    const { container } = render(<CommissionClient />);

    goToLegsStep();

    expect(screen.getByRole('button', { name: /Wood/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Stainless/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Titanium/ })).not.toBeInTheDocument();

    const dimWrapper = container.querySelector('.pointer-events-none');
    expect(dimWrapper).toBeTruthy();
    expect(dimWrapper?.className).toContain('opacity-30');
  });

  it('Wood 선택 시 Custom 카드가 나타나고, Stainless 선택 시 사라진다', () => {
    render(<CommissionClient />);

    goToLegsStep();

    fireEvent.click(screen.getByRole('button', { name: /Wood/ }));
    expect(screen.getByText('별도 견적')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Stainless/ }));
    expect(screen.queryByText('별도 견적')).not.toBeInTheDocument();
  });

  it('Wood+Custom 선택 후 Stainless로 바꾸면 다리 선택이 자동 해제된다', () => {
    render(<CommissionClient />);

    goToLegsStep();

    fireEvent.click(screen.getByRole('button', { name: /Wood/ }));
    const customCard = screen.getByText('별도 견적').closest('button')!;
    fireEvent.click(customCard);

    // Custom이 활성 상태로 반영됐는지(요약 Legs 행) 확인
    const legsRowBeforeSwitch = screen.getByText('Legs', { selector: 'span' }).closest('div');
    expect(legsRowBeforeSwitch).toHaveTextContent('Wood · Custom');

    fireEvent.click(screen.getByRole('button', { name: /Stainless/ }));

    expect(screen.queryByText('별도 견적')).not.toBeInTheDocument();
    const legsRowAfterSwitch = screen.getByText('Legs', { selector: 'span' }).closest('div');
    expect(legsRowAfterSwitch).toHaveTextContent('—');
  });

  it('Wood + Pedestal 선택 시 요약에 "Wood · Pedestal"이 표시된다', () => {
    render(<CommissionClient />);

    goToLegsStep();

    fireEvent.click(screen.getByRole('button', { name: /Wood/ }));
    fireEvent.click(screen.getByRole('button', { name: /Pedestal/ }));

    const legsRow = screen.getByText('Legs', { selector: 'span' }).closest('div');
    expect(legsRow).toHaveTextContent('Wood · Pedestal');
  });

  it('Legs 스텝에서 미선택 시 다음 버튼이 비활성화되고, 소재+다리 선택 후 활성화된다', () => {
    render(<CommissionClient />);

    goToLegsStep();

    expect(screen.getByRole('button', { name: /다음/ })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: /Wood/ }));
    fireEvent.click(screen.getByRole('button', { name: /4 Legs/ }));

    expect(screen.getByRole('button', { name: /다음/ })).not.toBeDisabled();
  });
});
