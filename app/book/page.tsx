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
        <h1
          className="text-[40px] md:text-[64px] leading-none tracking-[-0.02em] text-[#F2EDE4]"
          style={{ fontFamily: 'var(--font-gravitas), serif' }}
        >
          2026
        </h1>
        <p
          className="mt-3 text-[11px] tracking-[0.2em] uppercase text-[#8a9488]"
          style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
        >
          Cortis · W Magazine Digital Cover Set Design
        </p>
      </div>

      {/* Photos */}
      <div className="px-6 md:px-14 pb-20 space-y-3 md:space-y-4">
        {/* Row 1: full width */}
        <div className="relative w-full aspect-[3/2]">
          <Image src={PHOTOS[0]} alt="" fill className="object-cover" />
        </div>

        {/* Row 2: two columns */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="relative aspect-[3/4]">
            <Image src={PHOTOS[1]} alt="" fill className="object-cover" />
          </div>
          <div className="relative aspect-[3/4]">
            <Image src={PHOTOS[2]} alt="" fill className="object-cover" />
          </div>
        </div>

        {/* Row 3: full width */}
        <div className="relative w-full aspect-[3/2]">
          <Image src={PHOTOS[3]} alt="" fill className="object-cover" />
        </div>

        {/* Row 4: two columns */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="relative aspect-[3/4]">
            <Image src={PHOTOS[4]} alt="" fill className="object-cover" />
          </div>
          <div className="relative aspect-[3/4]">
            <Image src={PHOTOS[5]} alt="" fill className="object-cover" />
          </div>
        </div>

        {/* Row 5: full width */}
        <div className="relative w-full aspect-[3/2]">
          <Image src={PHOTOS[6]} alt="" fill className="object-cover" />
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
