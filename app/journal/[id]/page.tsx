import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { JOURNAL_ENTRIES } from '@/data/journal-entries';
import type { PieceStatus } from '@/types/journal';

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
  available: '#7dcea0',
  sold_out: '#e74c3c',
  commission_only: '#8a9488',
};

export default async function JournalDetailPage({ params }: RouteParams) {
  const { id } = await params;
  const entry = JOURNAL_ENTRIES.find((e) => e.id === id);
  if (!entry) notFound();

  const gallery = entry.gallery?.length ? entry.gallery : [entry.image];

  return (
    <div
      className="min-h-screen bg-[#2e3330] text-[#e8ebe8]"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Top bar with back */}
      <div className="sticky top-0 z-10 bg-[#1a1d1b] border-b border-[#2a2e2c] h-14 flex items-center px-4 md:px-6">
        <Link
          href="/journal"
          className="flex items-center gap-2 text-sm text-[#c0c5c2] hover:text-white transition-colors"
          aria-label="Back to journal"
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
            className="text-[10px] tracking-[0.18em] uppercase"
            style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
          >
            Journal
          </span>
        </Link>
      </div>

      {/* Layout: info left, gallery right (desktop), stacked (mobile) */}
      <div className="flex flex-col md:flex-row">
        {/* Info column */}
        <aside className="md:w-[40%] md:max-w-[480px] md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:overflow-y-auto md:border-r md:border-[#2a2e2c] px-6 md:px-10 py-10 md:py-14">
          <div
            className="text-[10px] tracking-[0.18em] uppercase text-[#8a9488] mb-3"
            style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
          >
            {new Date(entry.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
            })}
          </div>

          <h1
            className="text-3xl md:text-4xl text-[#e8ebe8] mb-6 tracking-[0.01em] leading-tight"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            {entry.title}
          </h1>

          {/* Size */}
          {entry.size && (
            <div className="text-sm text-[#c0c5c2] mb-3 tracking-[0.04em]">
              {entry.size}
            </div>
          )}

          {/* Price */}
          {entry.price && (
            <div className="text-base text-[#e8ebe8] mb-4">{entry.price}</div>
          )}

          {/* Status */}
          {entry.status && (
            <div
              className="inline-block text-[11px] tracking-[0.18em] uppercase mb-8"
              style={{
                fontFamily: "var(--font-staatliches), sans-serif",
                color: STATUS_COLOR[entry.status],
              }}
            >
              {STATUS_LABEL[entry.status]}
            </div>
          )}

          {/* Commission CTA */}
          <div className="mt-2">
            <Link
              href="/order"
              className="inline-block px-5 py-3 border border-[#5a6058] text-[11px] tracking-[0.18em] uppercase text-[#e8ebe8] hover:bg-[#e8ebe8] hover:text-[#1a1d1b] transition-colors"
              style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
            >
              Commission a similar piece →
            </Link>
          </div>
        </aside>

        {/* Gallery */}
        <main className="flex-1">
          {gallery.map((img, i) => (
            <div
              key={img + i}
              className="relative w-full aspect-[4/5] md:aspect-[1/1] bg-[#2a2e2c] border-b border-[#2a2e2c] last:border-b-0"
            >
              <Image
                src={img}
                alt={`${entry.title} — ${i + 1}`}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
