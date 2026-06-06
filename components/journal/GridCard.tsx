'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { FeedEntry, PieceStatus } from '@/types/journal';
import { useLanguage } from '@/lib/language-context';

const STATUS_COLOR: Record<PieceStatus, string> = {
  available: '#9ccfae',
  sold_out: '#b06a64',
  commission_only: '#9aa39c',
};

const STATUS_LABEL = {
  en: { available: 'Available', sold_out: 'Sold Out', commission_only: 'Commission' },
  ko: { available: '구매 가능', sold_out: '판매 완료', commission_only: '커미션' },
};

const CATEGORY_LABEL = {
  en: { furniture: 'Furniture', object: 'Object', painting: 'Painting' },
  ko: { furniture: '가구', object: '오브제', painting: '페인팅' },
};

export default function GridCard({ entry }: { entry: FeedEntry }) {
  const { lang } = useLanguage();

  return (
    <Link
      href={`/works/${entry.id}`}
      className="group block"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Meta row */}
      <div className="flex items-center gap-2.5 mb-2.5">
        <span
          className="text-[10px] tracking-[0.18em] uppercase text-[#888]"
          style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
        >
          {CATEGORY_LABEL[lang][entry.category]}
        </span>
        {entry.year && (
          <>
            <span className="text-[#bbb] text-[10px]">·</span>
            <span
              className="text-[10px] tracking-[0.18em] uppercase text-[#888]"
              style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
            >
              {entry.year}
            </span>
          </>
        )}
        {entry.status && (
          <>
            <span className="text-[#bbb] text-[10px]">·</span>
            <span
              className="text-[10px] tracking-[0.18em] uppercase"
              style={{
                fontFamily: "var(--font-staatliches), sans-serif",
                color: STATUS_COLOR[entry.status],
              }}
            >
              {STATUS_LABEL[lang][entry.status]}
            </span>
          </>
        )}
      </div>

      {/* Title */}
      <h3
        className="text-[13px] md:text-[14px] leading-[1.18] text-[#F2EDE4] mb-3 tracking-[-0.005em] whitespace-nowrap overflow-hidden group-hover:text-white transition-colors duration-300"
        style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 600 }}
      >
        {entry.title}
      </h3>

      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#2a2e2c] rounded-lg">
        <Image
          src={entry.image}
          alt={entry.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
    </Link>
  );
}
