import { JOURNAL_ENTRIES } from '@/data/journal-entries';
import GridCard from './GridCard';

/**
 * Right column on /journal — no hero. Grid starts directly (Porto Rocha
 * "work catalogue" essence). Mobile 1 / Tablet 2 / Desktop 3 cols.
 */
export default function GridLayout() {
  return (
    <main
      className="flex-1 min-h-screen bg-[#2e3330]"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Section header — generous top padding */}
      <div className="px-6 md:px-14 pt-16 md:pt-20 pb-8">
        <div
          className="text-[10px] tracking-[0.22em] uppercase text-[#8a9488]"
          style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
        >
          Selected Works
        </div>
        <div className="h-px bg-[#3a403c] mt-4" />
      </div>

      {/* Grid — wider gutters, taller vertical rhythm */}
      <div className="px-6 md:px-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-20 pb-24">
        {JOURNAL_ENTRIES.map((entry) => (
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
