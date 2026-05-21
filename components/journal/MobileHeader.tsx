import Link from 'next/link';
import { STUDIO } from '@/data/studio';
import { JOURNAL_ENTRIES } from '@/data/journal-entries';
import LiveClock from './LiveClock';

const COUNTS = {
  furniture: JOURNAL_ENTRIES.filter((e) => e.category === 'furniture').length,
  object: JOURNAL_ENTRIES.filter((e) => e.category === 'object').length,
  painting: JOURNAL_ENTRIES.filter((e) => e.category === 'painting').length,
};

/**
 * Mobile-only top section (< md). Compact identity block so the grid
 * surfaces within the first scroll. Featured Works removed (redundant
 * with the grid right below). About / Contact / Imprint surface as a
 * footer in MobileFooter — this is identity + status only.
 */
export default function MobileHeader() {
  return (
    <header
      className="md:hidden bg-[#1a1d1b] border-b border-[#2a2e2c]"
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
    >
      <div className="flex items-start justify-between gap-3 px-5 pt-6 pb-2">
        <Link
          href="/"
          className="text-[28px] tracking-[0.04em] leading-none"
          style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', color: '#e8ebe8' }}
        >
          {STUDIO.name}
        </Link>
        <div className="text-right pt-0.5">
          <LiveClock size="sm" compact />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 px-5 pb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#9ccfae] opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#9ccfae]" />
          </span>
          <span
            className="text-[10px] tracking-[0.2em] uppercase text-[#9ccfae]"
            style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
          >
            Accepting commissions
          </span>
        </div>
        <span
          className="text-[10px] tracking-[0.2em] uppercase text-[#8a9488]"
          style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
        >
          {COUNTS.furniture + COUNTS.object + COUNTS.painting} Works
        </span>
      </div>
    </header>
  );
}
