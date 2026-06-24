import type { SpreadRow as SpreadRowData } from '@/lib/journal/buildSpreads';
import GridCard from './GridCard';

/** One editorial row. Reflows to mobile: largeDuo → big then 2-col smalls;
 *  triptych → 2-col; duo → stacked. */
export default function SpreadRow({ row }: { row: SpreadRowData }) {
  if (row.kind === 'largeDuo') {
    const [large, ...smalls] = row.items;
    if (!large) return null;
    if (smalls.length === 0) {
      return <GridCard entry={large} variant="large" />;
    }
    return (
      <div className="flex flex-col md:flex-row gap-x-5 gap-y-8 md:gap-6">
        <div className="md:flex-[2]">
          <GridCard entry={large} variant="large" />
        </div>
        <div className="md:flex-1 grid grid-cols-2 md:grid-cols-1 gap-x-5 gap-y-8 md:gap-6">
          {smalls.map((e) => (
            <GridCard key={e.id} entry={e} variant="small" />
          ))}
        </div>
      </div>
    );
  }

  if (row.kind === 'triptych') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-8 md:gap-6">
        {row.items.map((e) => (
          <GridCard key={e.id} entry={e} variant="small" />
        ))}
      </div>
    );
  }

  // duo
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-6">
      {row.items.map((e) => (
        <GridCard key={e.id} entry={e} variant="medium" />
      ))}
    </div>
  );
}
