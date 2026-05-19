import Link from 'next/link';
import Image from 'next/image';
import type { FeedEntry, PieceStatus } from '@/types/journal';

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const STATUS_LABEL: Record<PieceStatus, string> = {
  available: 'Available',
  sold_out: 'Sold Out',
  commission_only: 'Commission',
};

const STATUS_COLOR: Record<PieceStatus, string> = {
  available: '#9ccfae',
  sold_out: '#b06a64',
  commission_only: '#9aa39c',
};

/**
 * Grid card — date + status chip + title + image. No description.
 * Whole card links to /journal/[id].
 */
export default function GridCard({ entry }: { entry: FeedEntry }) {
  return (
    <Link
      href={`/journal/${entry.id}`}
      className="group block"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Meta row: date · status */}
      <div className="flex items-center gap-3 mb-3">
        <time
          className="text-[10px] tracking-[0.18em] uppercase text-[#8a9488]"
          style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
        >
          {formatDate(entry.date)}
        </time>
        {entry.status && (
          <>
            <span className="text-[#4a4f4b] text-[10px]">·</span>
            <span
              className="text-[10px] tracking-[0.16em] uppercase"
              style={{
                fontFamily: "var(--font-staatliches), sans-serif",
                color: STATUS_COLOR[entry.status],
              }}
            >
              {STATUS_LABEL[entry.status]}
            </span>
          </>
        )}
      </div>

      {/* Title — Fraunces, single tight block, no awkward wrap */}
      <h3
        className="text-[22px] md:text-[26px] leading-[1.15] text-[#e8ebe8] mb-5 tracking-[-0.01em] text-balance group-hover:text-white transition-colors duration-300"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 400 }}
      >
        {entry.title}
      </h3>

      {/* Image */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#2a2e2c]">
        <Image
          src={entry.image}
          alt={entry.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
        />
        {/* Hover veil */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
    </Link>
  );
}
