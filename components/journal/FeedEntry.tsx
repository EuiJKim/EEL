import Link from 'next/link';
import Image from 'next/image';
import type { FeedEntry as FeedEntryType, EntryType } from '@/types/journal';

const TYPE_LABELS: Record<EntryType, string> = {
  in_progress: 'In Progress',
  completed: 'Completed',
  material: 'Material Study',
  archive: 'Archive',
  announcement: 'Announcement',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

interface Props {
  entry: FeedEntryType;
  featured?: boolean;
}

export default function FeedEntry({ entry, featured = false }: Props) {
  /**
   * Responsive sizing strategy:
   * - Mobile (< md): all entries identical size (aspect-[4/5])
   * - Tablet (md): featured slightly bigger
   * - Desktop (lg+): featured takes full feed column, others 75%
   * - Wide (xl+): featured can grow even larger
   *
   * Source photos are portrait (2666x3333 ≈ 4:5), so aspect-[4/5] matches
   * natural orientation → object-cover crops minimally.
   */
  const imageContainerClass = featured
    ? // FEATURED: hero treatment
      'relative w-full aspect-[4/5] md:aspect-[4/5] lg:aspect-[3/4] xl:aspect-[4/5] overflow-hidden bg-[#2a2e2c] mb-7'
    : // REGULAR: smaller, centered on desktop
      'relative w-full md:max-w-[78%] lg:max-w-[70%] xl:max-w-[640px] mx-0 aspect-[4/5] md:aspect-[1/1] overflow-hidden bg-[#2a2e2c] mb-7';

  // Mobile: full width. Desktop featured: full column. Others: narrower.
  const sizesAttr = featured
    ? '(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 1000px'
    : '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px';

  return (
    <article id={entry.id} className={featured ? 'pt-10 pb-16' : 'py-14'}>
      {/* Meta + Title */}
      <header className="mb-6 px-6 md:px-12">
        <div className="flex items-baseline gap-3 mb-3">
          <time
            className="text-[10px] tracking-[0.18em] uppercase text-[#8a9488]"
            style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
          >
            {formatDate(entry.date)}
          </time>
          <span className="text-[#5a6058]">·</span>
          <span
            className="text-[10px] tracking-[0.18em] uppercase text-[#8a9488]"
            style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
          >
            {TYPE_LABELS[entry.type]}
          </span>
        </div>
        {entry.subtitle && (
          <div
            className="text-sm text-[#8a9488] mb-1"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {entry.subtitle}
          </div>
        )}
        <h2
          className={`text-[#e8ebe8] tracking-[0.01em] ${
            featured
              ? 'text-3xl md:text-5xl lg:text-6xl'
              : 'text-2xl md:text-3xl'
          }`}
          style={{ fontFamily: "var(--font-gravitas), serif" }}
        >
          {entry.title}
        </h2>
      </header>

      {/* Image */}
      <div className={featured ? '' : 'px-6 md:px-12'}>
        <div className={imageContainerClass}>
          <Image
            src={entry.image}
            alt={entry.title}
            fill
            className="object-cover"
            sizes={sizesAttr}
            priority={featured}
          />
        </div>
      </div>

      {/* Body */}
      {entry.body && (
        <p
          className={`leading-[1.75] text-[#c0c5c2] px-6 md:px-12 mt-6 ${
            featured
              ? 'text-base md:text-lg max-w-[720px]'
              : 'text-[15px] md:text-base max-w-[640px]'
          }`}
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {entry.body}
        </p>
      )}

      {/* CTA */}
      {entry.cta && (
        <div className="mt-6 px-6 md:px-12">
          <Link
            href={entry.cta.href}
            className="inline-block text-[11px] tracking-[0.18em] uppercase text-[#e8ebe8] border-b border-[#5a6058] hover:border-[#e8ebe8] pb-1 transition-colors"
            style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
          >
            {entry.cta.label} →
          </Link>
        </div>
      )}
    </article>
  );
}
