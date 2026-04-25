import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock next/script so inline children render into the DOM under jsdom.
// Real next/script defers inline script content and doesn't emit it into
// container.innerHTML, which would hide the fbq init snippet from assertions.
vi.mock('next/script', () => ({
  default: ({ children, id }: { children?: React.ReactNode; id?: string }) => (
    <script data-testid={id} dangerouslySetInnerHTML={{ __html: String(children ?? '') }} />
  ),
}));

import MetaPixel from '@/components/MetaPixel';

describe('MetaPixel', () => {
  beforeEach(() => {
    delete (window as any).fbq;
  });

  it('renders nothing when pixelId is empty', () => {
    const { container } = render(<MetaPixel pixelId="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders Script tag with fbq init when pixelId is set', () => {
    const { container } = render(<MetaPixel pixelId="1234567890" />);
    const html = container.innerHTML;
    expect(html).toContain("fbq('init', '1234567890')");
    expect(html).toContain("fbq('track', 'PageView')");
  });
});
