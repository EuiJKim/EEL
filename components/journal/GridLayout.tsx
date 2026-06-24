import { JOURNAL_ENTRIES } from '@/data/journal-entries';
import type { Category } from '@/types/journal';
import { buildSpreads } from '@/lib/journal/buildSpreads';
import GridCard from './GridCard';
import SpreadRow from './SpreadRow';
import CategoryTabs from './CategoryTabs';
import AboutPopover from './AboutPopover';

interface Props {
  category?: 'all' | Category;
  /** When true, only show pieces with status === 'available'. Used on /available. */
  availableOnly?: boolean;
}

/**
 * Right column on / and /available. Sticky category tabs on mobile.
 * Mobile 1 / Tablet 2 / Desktop 4 cols.
 */
export default function GridLayout({ category = 'all', availableOnly = false }: Props) {
  let entries =
    category === 'all'
      ? JOURNAL_ENTRIES
      : JOURNAL_ENTRIES.filter((e) => e.category === category);
  if (availableOnly) {
    entries = entries.filter((e) => e.status === 'available');
  }
  const layout = buildSpreads(entries);

  return (
    <main
      className="flex-1 min-h-screen bg-[#16111F]"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Available landing banner — only on /available */}
      {availableOnly && (
        <div
          className="px-6 md:px-14 pt-8 md:pt-12 pb-2"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          <div
            className="text-[10px] tracking-[0.22em] uppercase text-[#9ccfae] mb-2"
            style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
          >
            ● Available Now · {entries.length} pieces
          </div>
          <h2
            className="text-[#F2EDE4] text-2xl md:text-3xl tracking-[-0.005em] mb-2"
            style={{ fontFamily: 'var(--font-gravitas), serif' }}
          >
            Ready to ship
          </h2>
          <p className="text-[13px] md:text-sm text-[#c0c5c2] leading-[1.65] max-w-[560px]">
            Pieces currently in stock at the Seoul atelier. Inquire to reserve —
            we ship worldwide.
          </p>
        </div>
      )}

      {/* Section header + category tabs — sticky on mobile */}
      <div className="sticky top-0 z-20 bg-[#16111F] md:static px-6 md:px-14 pt-4 md:pt-6 pb-3 md:pb-8">
        <div className="flex flex-wrap items-start md:items-center justify-between md:justify-end gap-y-1 gap-x-3 md:gap-6">
          <div className="md:hidden shrink-0">
            <AboutPopover />
          </div>
          <div className="md:overflow-x-auto md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden">
            <CategoryTabs active={category} basePath={availableOnly ? '/available' : '/'} />
          </div>
        </div>
        <div className="h-px bg-[#2a2e2c] mt-3 md:mt-6" />
      </div>

      {/* Editorial spreads: hero + rhythm rows */}
      {entries.length === 0 ? (
        <div className="px-6 md:px-10 py-16 text-center text-[#8a9488] text-sm">
          현재 구매 가능한 작품이 없습니다. Commission으로 의뢰해주세요.
        </div>
      ) : (
        <div className="px-6 md:px-10 pt-6 md:pt-2 pb-16 md:pb-24 flex flex-col gap-y-12 md:gap-y-20">
          {layout.hero && <GridCard entry={layout.hero} variant="hero" />}
          {layout.rows.map((row, ri) => (
            <SpreadRow key={ri} row={row} />
          ))}
        </div>
      )}

    </main>
  );
}
