import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Sidebar from '@/components/journal/Sidebar';
import MobileHeader from '@/components/journal/MobileHeader';
import { JOURNAL_ENTRIES } from '@/data/journal-entries';

const AVAILABLE_COUNT = JOURNAL_ENTRIES.filter((e) => e.status === 'available').length;

/**
 * Regression guard: /available existed as a page but nothing in the navigation
 * linked to it, so visitors could only reach it by typing the URL.
 */
describe('Available Now 내비게이션 노출', () => {
  afterEach(cleanup);

  it('데이터에 구매 가능한 작품이 실제로 존재한다 (테스트 전제)', () => {
    expect(AVAILABLE_COUNT).toBeGreaterThan(0);
  });

  it('Sidebar(데스크톱)에 /available 링크가 있다', () => {
    render(<Sidebar />);

    const links = screen.getAllByRole('link').filter(
      (a) => a.getAttribute('href') === '/available',
    );
    expect(links.length).toBeGreaterThan(0);
  });

  it('Sidebar 링크가 구매 가능 수량을 함께 보여준다', () => {
    render(<Sidebar />);

    const link = screen
      .getAllByRole('link')
      .find((a) => a.getAttribute('href') === '/available')!;
    const row = link.closest('div')!;
    expect(within(row).getByText(String(AVAILABLE_COUNT).padStart(2, '0'))).toBeInTheDocument();
  });

  it('MobileHeader에 /available 링크가 있다', () => {
    render(<MobileHeader />);

    const links = screen.getAllByRole('link').filter(
      (a) => a.getAttribute('href') === '/available',
    );
    expect(links.length).toBeGreaterThan(0);
  });

  it('MobileHeader 링크에 구매 가능 수량이 들어간다', () => {
    render(<MobileHeader />);

    const link = screen
      .getAllByRole('link')
      .find((a) => a.getAttribute('href') === '/available')!;
    expect(link.textContent).toContain(String(AVAILABLE_COUNT));
  });
});
