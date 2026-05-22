import Image from 'next/image';
import { JOURNAL_ENTRIES } from '@/data/journal-entries';
import type { Category } from '@/types/journal';
import GridCard from './GridCard';
import CategoryTabs from './CategoryTabs';
import AboutPopover from './AboutPopover';

interface Props {
  category?: 'all' | Category;
}

/**
 * Right column on /journal — no hero, category tabs, then grid.
 * Mobile 1 / Tablet 2 / Desktop 3 cols.
 */
export default function GridLayout({ category = 'all' }: Props) {
  const entries =
    category === 'all'
      ? JOURNAL_ENTRIES
      : JOURNAL_ENTRIES.filter((e) => e.category === category);

  return (
    <main
      className="flex-1 min-h-screen bg-[#2e3330]"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Banner */}
      <div className="hidden md:block w-full h-[85px] relative overflow-hidden">
        <Image
          src="/green.jpg"
          alt="EEL banner"
          fill
          className="object-cover object-left"
          priority
        />
      </div>

      {/* Section header + category tabs — sticky on mobile */}
      <div className="sticky top-0 z-20 bg-[#2e3330] md:static px-6 md:px-14 pt-4 md:pt-6 pb-3 md:pb-8">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          <AboutPopover />
          <div className="-mx-2 md:mx-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <CategoryTabs active={category} />
          </div>
        </div>
        <div className="h-px bg-[#3a403c] mt-3 md:mt-6" />
      </div>

      {/* Grid */}
      <div className="px-6 md:px-14 pt-6 md:pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-10 md:gap-y-20 pb-16 md:pb-24">
        {entries.map((entry) => (
          <GridCard key={entry.id} entry={entry} />
        ))}
      </div>

      {/* Footer (desktop only — mobile uses MobileFooter) */}
      <footer
        className="hidden md:block px-6 md:px-14 py-12 text-center text-[10px] tracking-[0.22em] uppercase text-[#5a6058] border-t border-[#3a403c]"
        style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
      >
        End of Journal · EEL Seoul
      </footer>
    </main>
  );
}
