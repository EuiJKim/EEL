import { JOURNAL_ENTRIES } from '@/data/journal-entries';
import type { Category } from '@/types/journal';
import GridCard from './GridCard';
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

  return (
    <main
      className="flex-1 min-h-screen bg-[#110D1C]"
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
      <div className="sticky top-0 z-20 bg-[#110D1C] md:static px-6 md:px-14 pt-4 md:pt-6 pb-3 md:pb-8">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          <AboutPopover />
          <div className="-mx-2 md:mx-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <CategoryTabs active={category} basePath={availableOnly ? '/available' : '/'} />
          </div>
        </div>
        <div className="h-px bg-[#2a2e2c] mt-3 md:mt-6" />
      </div>

      {/* Grid */}
      <div className="px-6 md:px-10 pt-6 md:pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 md:gap-x-6 gap-y-10 md:gap-y-14 pb-16 md:pb-24">
        {entries.length === 0 ? (
          <div className="col-span-full py-16 text-center text-[#8a9488] text-sm">
            현재 구매 가능한 작품이 없습니다. Commission으로 의뢰해주세요.
          </div>
        ) : (
          entries.map((entry) => <GridCard key={entry.id} entry={entry} />)
        )}
      </div>

      {/* Footer (desktop only — mobile uses MobileFooter) */}
      <footer
        className="hidden md:block px-6 md:px-14 py-12 text-center text-[10px] tracking-[0.22em] uppercase text-[#5a6058] border-t border-[#2a2e2c]"
        style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
      >
        End of Journal · EEL
      </footer>
    </main>
  );
}
