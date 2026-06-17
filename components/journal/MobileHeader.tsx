'use client';

import Link from 'next/link';
import { STUDIO } from '@/data/studio';
import { JOURNAL_ENTRIES } from '@/data/journal-entries';
import LiveClock from './LiveClock';
import { useLanguage } from '@/lib/language-context';

const COUNTS = {
  furniture: JOURNAL_ENTRIES.filter((e) => e.category === 'furniture').length,
  object: JOURNAL_ENTRIES.filter((e) => e.category === 'object').length,
  painting: JOURNAL_ENTRIES.filter((e) => e.category === 'painting').length,
};
const TOTAL = COUNTS.furniture + COUNTS.object + COUNTS.painting;

const T = {
  en: {
    status: 'Accepting commissions',
    works: `${TOTAL} Works`,
  },
  ko: {
    status: '주문 제작 가능',
    works: `${TOTAL}개 작품`,
  },
};

export default function MobileHeader() {
  const { lang, toggle } = useLanguage();
  const t = T[lang];

  return (
    <header
      className="md:hidden bg-[#0E1218]"
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
    >
      <div className="flex items-start justify-between gap-3 px-5 pt-6 pb-2">
        <Link
          href="/"
          className="text-[42px] font-bold tracking-[0.04em] leading-none"
          style={{ fontFamily: 'var(--font-gravitas), serif', color: '#F2EDE4' }}
        >
          {STUDIO.name}
        </Link>
        <div className="flex flex-col items-end gap-2 pt-0.5">
          <LiveClock size="sm" compact />
          <button
            onClick={toggle}
            className="text-[10px] tracking-[0.14em] uppercase flex items-center gap-1"
            style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
            aria-label="Toggle language"
          >
            <span className={lang === 'ko' ? 'text-[#F2EDE4]' : 'text-[#5a6058]'}>KR</span>
            <span className="text-[#3a403c]">·</span>
            <span className={lang === 'en' ? 'text-[#F2EDE4]' : 'text-[#5a6058]'}>EN</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 px-5 pb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#9ccfae] opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#9ccfae]" />
          </span>
          <span
            className="text-[10px] tracking-[0.2em] uppercase text-[#9ccfae]"
            style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
          >
            {t.status}
          </span>
        </div>
        <span
          className="text-[10px] tracking-[0.2em] uppercase text-[#8a9488]"
          style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
        >
          {t.works}
        </span>
      </div>
    </header>
  );
}
