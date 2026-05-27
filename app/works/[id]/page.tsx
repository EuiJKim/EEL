import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { JOURNAL_ENTRIES } from '@/data/journal-entries';
import PieceInquiryButton from '@/components/journal/PieceInquiryButton';
import MobileStickyCTA from '@/components/journal/MobileStickyCTA';
import type { PieceStatus, FeedEntry } from '@/types/journal';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return JOURNAL_ENTRIES.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { id } = await params;
  const entry = JOURNAL_ENTRIES.find((e) => e.id === id);
  if (!entry) return { title: 'Not Found — EEL' };
  return {
    title: `${entry.title} — EEL`,
    description: entry.size ?? 'EEL — Seoul resin atelier',
    openGraph: {
      title: `${entry.title} — EEL`,
      images: [entry.image],
    },
  };
}

const STATUS_LABEL: Record<PieceStatus, string> = {
  available: 'Available',
  sold_out: 'Sold Out',
  commission_only: 'Commission Only',
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

export default async function JournalDetailPage({ params }: RouteParams) {
  const { id } = await params;
  const entry = JOURNAL_ENTRIES.find((e) => e.id === id);
  if (!entry) notFound();

  const gallery = entry.gallery?.length ? entry.gallery : [entry.image];
  const hasSpec = entry.size || entry.price || entry.status;

  return (
    <div
      className="min-h-screen bg-[#2e3330] text-[#e8ebe8] pb-11 md:pb-0"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-[#1a1d1b] border-b border-[#2a2e2c] h-14 flex items-center px-4 md:px-6">
        <Link
          href={`/?category=${entry.category}`}
          className="flex items-center gap-2 text-sm text-[#c0c5c2] hover:text-white transition-colors min-h-[44px]"
          aria-label={`Back to ${entry.category}`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <polyline points="13,4 7,10 13,16" />
          </svg>
          <span
            className="text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
          >
            {CATEGORY_LABEL[entry.category]}
          </span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Info column */}
        <aside className="md:w-[40%] md:max-w-[480px] md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-6 md:px-10 py-10 md:py-14">
          {/* Category + year meta */}
          <div
            className="flex items-center gap-2.5 text-[10px] tracking-[0.2em] uppercase text-[#8a9488] mb-3"
            style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
          >
            <span>{CATEGORY_LABEL[entry.category]}</span>
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

          {/* Specs (furniture only typically) */}
          {hasSpec && (
            <dl className="space-y-2 mb-7">
              {entry.size && (
                <div className="flex items-baseline gap-3">
                  <dt
                    className="text-[10px] tracking-[0.2em] uppercase text-[#8a9488] min-w-[48px]"
                    style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
                  >
                    Size
                  </dt>
                  <dd className="text-sm text-[#c0c5c2] tracking-[0.02em]">{entry.size}</dd>
                </div>
              )}
              {entry.price && (
                <div className="flex items-baseline gap-3">
                  <dt
                    className="text-[10px] tracking-[0.2em] uppercase text-[#8a9488] min-w-[48px]"
                    style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
                  >
                    Price
                  </dt>
                  <dd className="text-sm text-[#e8ebe8]">{entry.price}</dd>
                </div>
              )}
              {entry.status && (
                <div className="flex items-baseline gap-3">
                  <dt
                    className="text-[10px] tracking-[0.2em] uppercase text-[#8a9488] min-w-[48px]"
                    style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
                  >
                    Status
                  </dt>
                  <dd
                    className="text-[11px] tracking-[0.2em] uppercase"
                    style={{
                      fontFamily: "var(--font-staatliches), sans-serif",
                      color: STATUS_COLOR[entry.status],
                    }}
                  >
                    {STATUS_LABEL[entry.status]}
                  </dd>
                </div>
              )}
            </dl>
          )}

          {/* CTAs — Object/Painting are unique pieces, Inquire only.
              Furniture is commissionable: Inquire (if available) + Commission. */}
          <div className="flex flex-col gap-3">
            {entry.category === 'furniture' ? (
              <>
                {entry.status === 'available' && <PieceInquiryButton entry={entry} />}
                <Link
                  href="/order"
                  className="inline-block text-center px-5 py-3 border border-[#5a6058] text-[12px] tracking-[0.16em] uppercase text-[#e8ebe8] hover:bg-[#e8ebe8] hover:text-[#1a1d1b] transition-colors min-h-[44px]"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 500 }}
                >
                  Commission a similar piece →
                </Link>
              </>
            ) : (
              <PieceInquiryButton entry={entry} />
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
