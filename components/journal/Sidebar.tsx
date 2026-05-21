import Link from 'next/link';
import { STUDIO } from '@/data/studio';
import { JOURNAL_ENTRIES } from '@/data/journal-entries';
import LiveClock from './LiveClock';

const COUNTS = {
  furniture: JOURNAL_ENTRIES.filter((e) => e.category === 'furniture').length,
  object: JOURNAL_ENTRIES.filter((e) => e.category === 'object').length,
  painting: JOURNAL_ENTRIES.filter((e) => e.category === 'painting').length,
};

/**
 * Desktop sidebar (≥ md). Sticky, full-height, independent scroll for long
 * content. Holds brand, clock, about, featured works, contact, CTA.
 */
export default function Sidebar() {
  return (
    <aside
      className="hidden md:flex md:flex-col md:w-[300px] md:h-screen md:sticky md:top-0 md:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-[#1a1d1b] p-7 gap-7"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Brand + Clock */}
      <div>
        <Link
          href="/"
          className="block text-3xl mb-6 tracking-[0.04em] hover:opacity-80 transition-opacity"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif", color: '#e8ebe8' }}
        >
          {STUDIO.name}
        </Link>
        <LiveClock size="sm" />

        {/* Status pill */}
        <div className="flex items-center gap-2 mt-4">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#9ccfae] opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#9ccfae]" />
          </span>
          <span
            className="text-[10px] tracking-[0.2em] uppercase text-[#9ccfae]"
            style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
          >
            Accepting commissions
          </span>
        </div>
      </div>

      {/* About */}
      <section>
        <div
          className="text-[10px] tracking-[0.18em] uppercase text-[#8a9488] mb-2"
          style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
        >
          About
        </div>
        <p className="text-[13px] text-[#c0c5c2] leading-[1.65] mb-3">{STUDIO.about}</p>
        <p
          className="text-[10px] tracking-[0.2em] uppercase text-[#8a9488]"
          style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
        >
          Made-to-order · 21-day cure · Seoul
        </p>
      </section>

      {/* Index */}
      <section>
        <div
          className="text-[10px] tracking-[0.18em] uppercase text-[#8a9488] mb-2"
          style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
        >
          Index
        </div>
        <ul
          className="text-[12px] text-[#c0c5c2] space-y-1"
          style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
        >
          <li className="flex justify-between tracking-[0.14em] uppercase">
            <span>Furniture</span>
            <span className="text-[#8a9488]">{String(COUNTS.furniture).padStart(2, '0')}</span>
          </li>
          <li className="flex justify-between tracking-[0.14em] uppercase">
            <span>Object</span>
            <span className="text-[#8a9488]">{String(COUNTS.object).padStart(2, '0')}</span>
          </li>
          <li className="flex justify-between tracking-[0.14em] uppercase">
            <span>Painting</span>
            <span className="text-[#8a9488]">{String(COUNTS.painting).padStart(2, '0')}</span>
          </li>
        </ul>
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
          className="inline-block px-4 py-2 border border-[#5a6058] text-[12px] tracking-[0.14em] uppercase text-[#e8ebe8] hover:bg-[#e8ebe8] hover:text-[#1a1d1b] transition-colors"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 500 }}
        >
          Commission
        </Link>
      </section>

      {/* Imprint */}
      <div
        className="text-[10px] tracking-[0.2em] uppercase text-[#5a6058] pt-4"
        style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
      >
        © 2026 EEL Studio · Seoul
      </div>
    </aside>
  );
}
