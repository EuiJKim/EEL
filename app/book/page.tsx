import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Book — EEL',
  description: 'W Magazine · 2026. Set design by EEL.',
};

const PHOTOS = Array.from({ length: 7 }, (_, i) => `/book/${i + 1}.jpg`);

export default function BookPage() {
  return (
    <div
      className="min-h-screen bg-[#110D1C] text-[#e8ebe8]"
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
    >
      {/* Back button */}
      <div className="px-6 md:px-14 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#c0c5c2] hover:text-white transition-colors min-h-[44px]"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="13,4 7,10 13,16" />
          </svg>
          <span
            className="text-[15px] tracking-[0.2em] uppercase"
            style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
          >
            Back
          </span>
        </Link>
      </div>

      {/* Header */}
      <div className="px-6 md:px-14 pt-6 md:pt-8 pb-8 md:pb-12">
        <p
          className="text-[20px] tracking-[0.2em] uppercase text-[#F2EDE4]"
          style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
        >
          Cortis
        </p>
        <p
          className="mt-1 text-[15px] tracking-[0.2em] uppercase text-[#F2EDE4]"
          style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
        >
          2026 W Magazine Digital Cover Set Design
        </p>
      </div>

      {/* Photos */}
      <div className="px-6 md:px-14 pb-20 space-y-3 md:space-y-4">
        {/* Row 1: photos 2,3 — two columns, original ratio (no crop) */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <Image src={PHOTOS[1]} alt="" width={1697} height={2560} style={{ width: '100%', height: 'auto' }} />
          <Image src={PHOTOS[2]} alt="" width={1697} height={2560} style={{ width: '100%', height: 'auto' }} />
        </div>

        {/* Row 2: photo 1 full width */}
        <div className="relative w-full aspect-[3/2]">
          <Image src={PHOTOS[0]} alt="" fill className="object-cover" />
        </div>

        {/* Row 3: photo 4 full width */}
        <div className="relative w-full aspect-[3/2]">
          <Image src={PHOTOS[3]} alt="" fill className="object-cover" />
        </div>

        {/* Row 4: three columns */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <div className="relative aspect-[3/4]">
            <Image src={PHOTOS[4]} alt="" fill className="object-cover" />
          </div>
          <div className="relative aspect-[3/4]">
            <Image src={PHOTOS[5]} alt="" fill className="object-cover" />
          </div>
          <div className="relative aspect-[3/4]">
            <Image src={PHOTOS[6]} alt="" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="px-6 md:px-14 py-8 border-t border-[#2a2e2c] text-[9px] tracking-[0.2em] uppercase text-[#5a6058]"
        style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
      >
        EEL Studio · Seoul
      </div>
    </div>
  );
}
