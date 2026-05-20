import { JOURNAL_ENTRIES } from '@/data/journal-entries';
import type { Category } from '@/types/journal';
import GridCard from './GridCard';
import CategoryTabs from './CategoryTabs';

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
      {/* Section header + category tabs */}
      <div className="px-6 md:px-14 pt-14 md:pt-20 pb-6 md:pb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
          <div
            className="text-[10px] tracking-[0.22em] uppercase text-[#8a9488]"
            style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
          >
            Selected Works · {entries.length}
          </div>
          <CategoryTabs active={category} />
        </div>
        <div className="h-px bg-[#3a403c] mt-4 md:mt-6" />
      </div>

      {/* Grid */}
      <div className="px-6 md:px-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-14 md:gap-y-20 pb-24">
        {entries.map((entry) => (
          <GridCard key={entry.id} entry={entry} />
        ))}
      </div>

      {/* Footer */}
      <footer
        className="px-6 md:px-14 py-12 text-center text-[10px] tracking-[0.22em] uppercase text-[#5a6058] border-t border-[#3a403c]"
        style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
      >
        End of Journal · EEL Seoul
      </footer>
    </main>
  );
}
