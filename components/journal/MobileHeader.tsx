import Link from 'next/link';
import Image from 'next/image';
import { STUDIO } from '@/data/studio';
import { FEATURED_WORKS } from '@/data/featured-works';
import LiveClock from './LiveClock';

/**
 * Mobile-only top section (< md). Replaces sidebar at small viewports.
 * Sidebar's content surfaces here as: logo, clock, about, featured tiles, CTA.
 */
export default function MobileHeader() {
  return (
    <header
      className="md:hidden bg-[#1a1d1b] border-b border-[#2a2e2c]"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Brand + Clock */}
      <div className="text-center pt-12 pb-10 px-6">
        <Link
          href="/journal"
          className="block text-5xl mb-5 tracking-[0.04em]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif", color: '#e8ebe8' }}
        >
          {STUDIO.name}
        </Link>
        <LiveClock size="lg" />
      </div>

      {/* About */}
      <section className="px-6 py-5 border-t border-[#2a2e2c]">
        <div
          className="text-[10px] tracking-[0.18em] uppercase text-[#8a9488] mb-2"
          style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
        >
          About
        </div>
        <p className="text-sm text-[#c0c5c2] leading-[1.7]">{STUDIO.about}</p>
      </section>

      {/* Featured Works */}
      <section className="px-6 py-5 border-t border-[#2a2e2c]">
        <div
          className="text-[10px] tracking-[0.18em] uppercase text-[#8a9488] mb-3"
          style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
        >
          Featured Works
        </div>
        <ul className="space-y-3">
          {FEATURED_WORKS.map((w) => (
            <li key={w.id}>
              <a
                href={w.href ?? '#'}
                className="flex items-center gap-4 min-h-[64px] hover:opacity-80 transition-opacity"
              >
                <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-sm bg-[#2a2e2c]">
                  <Image
                    src={w.thumbnail}
                    alt={w.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="text-sm">
                  <div className="text-[#e8ebe8]">{w.title}</div>
                  <div className="text-[#8a9488] text-xs mt-1">{w.status}</div>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <Link
          href="/products"
          className="inline-block mt-4 text-[10px] tracking-[0.18em] uppercase text-[#8a9488] border-b border-[#2a2e2c] pb-0.5"
          style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
        >
          View all works →
        </Link>
      </section>

      {/* CTA */}
      <section className="px-6 py-5 border-t border-[#2a2e2c]">
        <Link
          href="/order"
          className="block w-full text-center min-h-[44px] py-3 border border-[#5a6058] text-xs tracking-[0.18em] uppercase text-[#e8ebe8] hover:bg-[#e8ebe8] hover:text-[#1a1d1b] transition-colors"
          style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
        >
          Commission a piece
        </Link>
      </section>
    </header>
  );
}
