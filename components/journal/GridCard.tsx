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

export type CardVariant = 'hero' | 'large' | 'medium' | 'small';

const VARIANT: Record<
  CardVariant,
  { image: string; title: string; titleWrap: string; titleFont: string; titleWeight: number; sizes: string }
> = {
  hero: {
    image: 'aspect-[4/5] md:aspect-[3/2]',
    title: 'text-xl md:text-2xl leading-[1.2] text-balance',
    titleWrap: '',
    titleFont: 'var(--font-inter), sans-serif',
    titleWeight: 600,
    sizes: '(max-width: 768px) 100vw, 70vw',
  },
  large: {
    image: 'aspect-[4/5]',
    title: 'text-lg md:text-xl leading-[1.2]',
    titleWrap: 'whitespace-nowrap overflow-hidden text-ellipsis',
    titleFont: 'var(--font-inter), sans-serif',
    titleWeight: 600,
    sizes: '(max-width: 768px) 100vw, 45vw',
  },
  medium: {
    image: 'aspect-[4/5]',
    title: 'text-base leading-[1.2]',
    titleWrap: 'whitespace-nowrap overflow-hidden text-ellipsis',
    titleFont: 'var(--font-inter), sans-serif',
    titleWeight: 600,
    sizes: '(max-width: 768px) 100vw, 33vw',
  },
  small: {
    image: 'aspect-square',
    title: 'text-[13px] md:text-[14px] leading-[1.18]',
    titleWrap: 'whitespace-nowrap overflow-hidden text-ellipsis',
    titleFont: 'var(--font-inter), sans-serif',
    titleWeight: 600,
    sizes: '(max-width: 768px) 50vw, 22vw',
  },
};

export default function GridCard({
  entry,
  variant = 'small',
}: {
  entry: FeedEntry;
  variant?: CardVariant;
}) {
  const { lang } = useLanguage();
  const v = VARIANT[variant];

  return (
    <Link
      href={`/works/${entry.id}`}
      className="group block"
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
    >
      {/* Image — first, so images top-align across a row regardless of
          caption height (prevents staggered/jagged rows) */}
      <div className={`relative w-full ${v.image} overflow-hidden bg-[#2a2e2c] rounded-lg`}>
        <Image
          src={entry.image}
          alt={entry.title}
          fill
          sizes={v.sizes}
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 mt-3 mb-1.5">
        <span
          className="text-[10px] tracking-[0.18em] uppercase text-[#888]"
          style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
        >
          {CATEGORY_LABEL[lang][entry.category]}
        </span>
        {entry.year && (
          <>
            <span className="text-[#bbb] text-[10px]">·</span>
            <span
              className="text-[10px] tracking-[0.18em] uppercase text-[#888]"
              style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
            >
              {entry.year}
            </span>
          </>
        )}
        {entry.status && (
          <>
            <span className="text-[#bbb] text-[10px]">·</span>
            <span
              className="text-[10px] tracking-[0.18em] uppercase whitespace-nowrap"
              style={{
                fontFamily: 'var(--font-staatliches), sans-serif',
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
        className={`${v.title} ${v.titleWrap} text-[#F2EDE4] tracking-[-0.005em] group-hover:text-white transition-colors duration-300`}
        style={{ fontFamily: v.titleFont, fontWeight: v.titleWeight }}
      >
        {entry.title}
      </h3>
    </Link>
  );
}
