import Link from 'next/link';
import Image from 'next/image';
import type { FeedEntry, PieceStatus } from '@/types/journal';

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

const CATEGORY_LABEL: Record<FeedEntry['category'], string> = {
  furniture: 'Furniture',
  object: 'Object',
  painting: 'Painting',
};

/**
 * Grid card — category · year · status chip · title · image · price.
 * Whole card links to /works/[id]. Object/Painting render minimal
 * (no year/status/price) — just category + title + image.
 */
export default function GridCard({ entry }: { entry: FeedEntry }) {
  return (
    <Link
      href={`/works/${entry.id}`}
      className="group block"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Meta row */}
      <div className="flex items-center gap-2.5 mb-2.5">
        <span
          className="text-[10px] tracking-[0.18em] uppercase text-[#8a9488]"
          style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
        >
          {CATEGORY_LABEL[entry.category]}
        </span>
        {entry.year && (
          <>
            <span className="text-[#4a4f4b] text-[10px]">·</span>
            <span
              className="text-[10px] tracking-[0.18em] uppercase text-[#8a9488]"
              style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
            >
              {entry.year}
            </span>
          </>
        )}
        {entry.status && (
          <>
            <span className="text-[#4a4f4b] text-[10px]">·</span>
            <span
              className="text-[10px] tracking-[0.18em] uppercase"
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

      {/* Title */}
      <h3
        className="text-[20px] md:text-[24px] leading-[1.18] text-[#e8ebe8] mb-4 tracking-[-0.005em] text-balance group-hover:text-white transition-colors duration-300"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 500 }}
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
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Price under image (furniture only) */}
      {entry.price && (
        <div
          className="mt-3 text-[13px] text-[#c0c5c2] tracking-[0.02em]"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {entry.price}
        </div>
      )}
    </Link>
  );
}
