import Link from 'next/link';
import { STUDIO } from '@/data/studio';

/**
 * Mobile-only fixed bottom action bar. Always visible while browsing
 * /journal so commission / contact paths are never more than one tap
 * away. Footer info still surfaces below for users who scroll all the way.
 */
export default function MobileStickyCTA() {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1a1d1b]/95 backdrop-blur-sm border-t border-[#2a2e2c] flex items-stretch"
      style={{
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)',
        paddingTop: '8px',
      }}
    >
      <a
        href={STUDIO.contact.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="flex items-center justify-center w-14 h-14 text-[#c0c5c2] hover:text-white transition-colors border-r border-[#2a2e2c]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </a>
      <a
        href={`mailto:${STUDIO.contact.email}`}
        aria-label="Email"
        className="flex items-center justify-center w-14 h-14 text-[#c0c5c2] hover:text-white transition-colors border-r border-[#2a2e2c]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      </a>
      <Link
        href="/order"
        className="flex-1 flex items-center justify-center h-14 text-[#F2EDE4] text-[11px] tracking-[0.16em] uppercase hover:text-white transition-colors"
        style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', fontWeight: 500 }}
      >
        Commission a piece →
      </Link>
    </div>
  );
}
