'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import PieceInquiryButton from '@/components/journal/PieceInquiryButton';
import MobileStickyCTA from '@/components/journal/MobileStickyCTA';
import type { PieceStatus, FeedEntry } from '@/types/journal';

const STATUS_COLOR: Record<PieceStatus, string> = {
  available: '#9ccfae',
  sold_out: '#b06a64',
  commission_only: '#9aa39c',
};

const STATUS_LABEL = {
  en: { available: 'Available', sold_out: 'Sold Out', commission_only: 'Commission Only' },
  ko: { available: '구매 가능', sold_out: '판매 완료', commission_only: '커미션 전용' },
};

const CATEGORY_LABEL = {
  en: { furniture: 'Furniture', object: 'Object', painting: 'Painting' },
  ko: { furniture: '가구', object: '오브제', painting: '페인팅' },
};

const SPEC_LABEL = {
  en: { size: 'Size', price: 'Price', status: 'Status' },
  ko: { size: '사이즈', price: '가격', status: '상태' },
};

const COMMISSION_LABEL = {
  en: 'Commission a similar piece →',
  ko: '커스텀 주문하기 →',
};

export default function WorksDetailClient({ entry }: { entry: FeedEntry }) {
  const { lang } = useLanguage();
  const gallery = entry.gallery?.length ? entry.gallery : [entry.image];
  const hasSpec = entry.size || entry.price || entry.status;

  return (
    <div
      className="min-h-screen bg-[#2e3330] text-[#e8ebe8] pb-11 md:pb-0"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      <style>{`
        @keyframes commission-pulse {
          0%, 100% { border-color: #5a6058 !important; }
          50% { border-color: #c0c5c2 !important; }
        }
        .commission-btn { animation: commission-pulse 2s ease-in-out infinite !important; }
      `}</style>

      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-[#1a1d1b] border-b border-[#2a2e2c] h-14 flex items-center px-4 md:px-6">
        <Link
          href={`/?category=${entry.category}`}
          className="flex items-center gap-2 text-sm text-[#c0c5c2] hover:text-white transition-colors min-h-[44px]"
          aria-label={`Back to ${entry.category}`}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="13,4 7,10 13,16" />
          </svg>
          <span
            className="text-[15px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
          >
            {CATEGORY_LABEL[lang][entry.category]}
          </span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Info column */}
        <aside className="md:w-[40%] md:max-w-[480px] md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-6 md:px-10 py-10 md:py-14">
          {/* Category + year meta */}
          <div
            className="flex items-center gap-2.5 text-[13px] tracking-[0.2em] uppercase text-[#8a9488] mb-3"
            style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
          >
            <span>{CATEGORY_LABEL[lang][entry.category]}</span>
            {entry.year && (
              <>
                <span className="text-[#4a4f4b]">·</span>
                <span>{entry.year}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1
            className="text-2xl md:text-3xl lg:text-[34px] text-[#e8ebe8] mb-6 tracking-[-0.005em] leading-[1.12] whitespace-nowrap overflow-hidden"
            style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 500 }}
          >
            {entry.title}
          </h1>

          {/* Specs */}
          {hasSpec && (
            <dl className="space-y-2 mb-7">
              {entry.size && (
                <div className="flex items-baseline gap-3">
                  <dt
                    className="text-[13px] tracking-[0.2em] uppercase text-[#8a9488] min-w-[48px]"
                    style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
                  >
                    {SPEC_LABEL[lang].size}
                  </dt>
                  <dd className="text-[15px] text-[#c0c5c2] tracking-[0.02em]">{entry.size}</dd>
                </div>
              )}
              {entry.price && entry.status !== 'sold_out' && (
                <div className="flex items-baseline gap-3">
                  <dt
                    className="text-[13px] tracking-[0.2em] uppercase text-[#8a9488] min-w-[48px]"
                    style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
                  >
                    {SPEC_LABEL[lang].price}
                  </dt>
                  <dd className="text-[15px] text-[#e8ebe8]">{entry.price}</dd>
                </div>
              )}
              {entry.status && (
                <div className="flex items-baseline gap-3">
                  <dt
                    className="text-[13px] tracking-[0.2em] uppercase text-[#8a9488] min-w-[48px]"
                    style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
                  >
                    {SPEC_LABEL[lang].status}
                  </dt>
                  <dd
                    className="text-[13px] tracking-[0.2em] uppercase"
                    style={{ fontFamily: "var(--font-staatliches), sans-serif", color: STATUS_COLOR[entry.status] }}
                  >
                    {STATUS_LABEL[lang][entry.status]}
                  </dd>
                </div>
              )}
            </dl>
          )}

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            {entry.category === 'furniture' ? (
              <>
                {entry.status === 'available' && <PieceInquiryButton entry={entry} />}
                <Link
                  href="/order"
                  className="commission-btn inline-block text-center px-5 py-3 border border-[#5a6058] text-[12px] tracking-[0.16em] uppercase text-[#e8ebe8] hover:bg-[#e8ebe8] hover:text-[#1a1d1b] transition-colors min-h-[44px]"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 500 }}
                >
                  {COMMISSION_LABEL[lang]}
                </Link>
              </>
            ) : (
              entry.status !== 'sold_out' && <PieceInquiryButton entry={entry} />
            )}
          </div>
        </aside>

        {/* Gallery */}
        <main className="flex-1 flex flex-col items-end py-8 gap-6">
          {gallery.map((img, i) => (
            <div
              key={img + i}
              className="relative w-full md:w-[50vw] aspect-[4/5] bg-[#2a2e2c] overflow-hidden"
            >
              <Image
                src={img}
                alt={`${entry.title} — ${i + 1}`}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </main>
      </div>

      <MobileStickyCTA />
    </div>
  );
}
