'use client';

import Link from 'next/link';
import type { Category } from '@/types/journal';
import { useLanguage } from '@/lib/language-context';

const TABS: { key: 'all' | Category; en: string; ko: string }[] = [
  { key: 'all', en: 'All', ko: '전체' },
  { key: 'furniture', en: 'Furniture', ko: '가구' },
  { key: 'object', en: 'Object', ko: '오브제' },
  { key: 'painting', en: 'Painting', ko: '페인팅' },
];

interface Props {
  active: 'all' | Category;
  /** Base path for tab links. '/' for home, '/available' for Available landing. */
  basePath?: '/' | '/available';
}

export default function CategoryTabs({ active, basePath = '/' }: Props) {
  const { lang } = useLanguage();

  return (
    <nav
      className="flex items-center gap-1 md:gap-2"
      style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
    >
      {TABS.map((t) => {
        const isActive = t.key === active;
        const href = t.key === 'all' ? basePath : `${basePath}?category=${t.key}`;
        return (
          <Link
            key={t.key}
            href={href}
            className={`tracking-[0.18em] md:tracking-[0.2em] uppercase px-2.5 md:px-3 py-2 min-h-[44px] flex items-center transition-all duration-150 hover:scale-[1.18] origin-left ${
              isActive ? 'text-[15px]' : 'text-[12px]'
            }`}
            style={{
              color: isActive ? '#F2EDE4' : '#8a9488',
            }}
          >
            {lang === 'ko' ? t.ko : t.en}
          </Link>
        );
      })}
      <Link
        href="/book"
        className="text-[12px] tracking-[0.18em] md:tracking-[0.2em] uppercase px-2.5 md:px-3 py-2 min-h-[44px] flex items-center transition-all duration-150 hover:scale-[1.18] origin-left"
        style={{ color: '#8a9488' }}
      >
        {lang === 'ko' ? '북' : 'Book'}
      </Link>
    </nav>
  );
}
