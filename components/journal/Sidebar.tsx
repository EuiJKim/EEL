import Link from 'next/link';
import Image from 'next/image';
import { STUDIO } from '@/data/studio';
import { FEATURED_WORKS } from '@/data/featured-works';
import LiveClock from './LiveClock';

/**
 * Desktop sidebar (≥ md). Sticky, full-height, independent scroll for long
 * content. Holds brand, clock, about, featured works, contact, CTA.
 */
export default function Sidebar() {
  return (
    <aside
      className="hidden md:flex md:flex-col md:w-[300px] md:h-screen md:sticky md:top-0 md:overflow-y-auto bg-[#1a1d1b] border-r border-[#2a2e2c] p-7 gap-7"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Brand + Clock */}
      <div>
        <Link
          href="/journal"
          className="block text-3xl mb-6 tracking-[0.04em] hover:opacity-80 transition-opacity"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif", color: '#e8ebe8' }}
        >
          {STUDIO.name}
        </Link>
        <LiveClock size="sm" />
      </div>

      {/* About */}
      <section>
        <div
          className="text-[10px] tracking-[0.18em] uppercase text-[#8a9488] mb-2"
          style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
        >
          About
        </div>
        <p className="text-[13px] text-[#c0c5c2] leading-[1.65]">{STUDIO.about}</p>
      </section>

      {/* Featured Works */}
      <section>
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
                className="flex items-center gap-3 hover:opacity-70 transition-opacity"
              >
                <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-sm bg-[#2a2e2c]">
                  <Image
                    src={w.thumbnail}
                    alt={w.title}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="text-[12px]">
                  <div className="text-[#e8ebe8] leading-tight">{w.title}</div>
                  <div className="text-[#8a9488] text-[11px] mt-0.5">{w.status}</div>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <Link
          href="/products"
          className="inline-block mt-4 text-[10px] tracking-[0.18em] uppercase text-[#8a9488] hover:text-[#e8ebe8] transition-colors border-b border-[#2a2e2c] hover:border-[#5a6058] pb-0.5"
          style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
        >
          View all works →
        </Link>
      </section>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Contact + CTA */}
      <section className="pt-6 border-t border-[#2a2e2c]">
        <div
          className="text-[10px] tracking-[0.18em] uppercase text-[#8a9488] mb-2"
          style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
        >
          Contact
        </div>
        <ul className="space-y-1 text-[13px] text-[#c0c5c2] mb-4">
          <li>
            <a
              href={STUDIO.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href={`mailto:${STUDIO.contact.email}`}
              className="hover:text-white transition-colors"
            >
              Email
            </a>
          </li>
        </ul>
        <Link
          href="/order"
          className="inline-block px-4 py-2 border border-[#5a6058] text-[11px] tracking-[0.14em] uppercase text-[#e8ebe8] hover:bg-[#e8ebe8] hover:text-[#1a1d1b] transition-colors"
          style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
        >
          Commission
        </Link>
      </section>
    </aside>
  );
}
