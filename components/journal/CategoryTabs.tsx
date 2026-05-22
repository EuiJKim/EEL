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
}

export default function CategoryTabs({ active }: Props) {
  const { lang } = useLanguage();

  return (
    <nav
      className="flex items-center gap-1 md:gap-2"
      style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
    >
      {TABS.map((t) => {
        const isActive = t.key === active;
        const href = t.key === 'all' ? '/' : `/?category=${t.key}`;
        return (
          <Link
            key={t.key}
            href={href}
            className={`text-[11px] tracking-[0.18em] md:tracking-[0.2em] uppercase px-2.5 md:px-3 py-2 min-h-[44px] flex items-center transition-colors ${
              isActive
                ? 'text-[#e8ebe8] border-b border-[#e8ebe8]'
                : 'text-[#8a9488] border-b border-transparent hover:text-[#c0c5c2]'
            }`}
          >
            {lang === 'ko' ? t.ko : t.en}
          </Link>
        );
      })}
    </nav>
  );
}
