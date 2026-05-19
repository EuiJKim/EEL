import { JOURNAL_ENTRIES } from '@/data/journal-entries';
import FeedEntry from './FeedEntry';

export default function FeedColumn() {
  return (
    <main
      className="flex-1 min-h-screen bg-[#2e3330]"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Section header */}
      <div className="px-6 md:px-12 pt-12 md:pt-14">
        <div
          className="text-[10px] tracking-[0.18em] uppercase text-[#8a9488]"
          style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
        >
          Latest
        </div>
        <div className="h-px bg-[#2a2e2c] mt-3" />
      </div>

      {/* Entries */}
      {JOURNAL_ENTRIES.map((entry, i) => (
        <div key={entry.id}>
          <FeedEntry entry={entry} featured={i === 0} />
          {i < JOURNAL_ENTRIES.length - 1 && (
            <div className="h-px bg-[#2a2e2c] mx-6 md:mx-12" />
          )}
        </div>
      ))}

      {/* End mark */}
      <footer
        className="px-6 md:px-12 py-16 text-center text-[10px] tracking-[0.18em] uppercase text-[#5a6058]"
        style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
      >
        End of Journal
      </footer>
    </main>
  );
}
