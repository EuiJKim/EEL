import type { SpreadRow as SpreadRowData } from '@/lib/journal/buildSpreads';
import GridCard from './GridCard';

/** One editorial row. On mobile every kind stacks to a single column
 *  (one piece per row); desktop keeps the largeDuo/triptych/duo rhythm. */
export default function SpreadRow({ row }: { row: SpreadRowData }) {
  // A lone leftover item (any row kind) closes the feed as a full-width band
  // instead of sitting orphaned in a half-empty multi-col grid on desktop.
  if (row.items.length === 1) {
    return <GridCard entry={row.items[0]} variant="wide" />;
  }

  if (row.kind === 'largeDuo') {
    const [large, ...smalls] = row.items;
    if (!large) return null;
    if (smalls.length === 0) {
      return <GridCard entry={large} variant="wide" />;
    }
    return (
      <div className="flex flex-col md:flex-row gap-y-12 md:gap-6">
        <div className="md:flex-[2]">
          <GridCard entry={large} variant="large" />
        </div>
        <div className="md:flex-1 grid grid-cols-1 gap-x-12 gap-y-12 md:gap-6">
          {smalls.map((e) => (
            <GridCard key={e.id} entry={e} variant="small" />
          ))}
        </div>
      </div>
    );
  }

  if (row.kind === 'triptych') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12 md:gap-6">
        {row.items.map((e) => (
          <GridCard key={e.id} entry={e} variant="small" />
        ))}
      </div>
    );
  }

  // duo
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-6">
      {row.items.map((e) => (
        <GridCard key={e.id} entry={e} variant="medium" />
      ))}
    </div>
  );
}
