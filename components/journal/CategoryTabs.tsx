import Link from 'next/link';
import type { Category } from '@/types/journal';

const TABS: { key: 'all' | Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'furniture', label: 'Furniture' },
  { key: 'object', label: 'Object' },
  { key: 'painting', label: 'Painting' },
];

interface Props {
  active: 'all' | Category;
}

export default function CategoryTabs({ active }: Props) {
  return (
    <nav
      className="flex items-center gap-1 md:gap-2"
      style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
    >
      {TABS.map((t) => {
        const isActive = t.key === active;
        const href = t.key === 'all' ? '/journal' : `/journal?category=${t.key}`;
        return (
          <Link
            key={t.key}
            href={href}
            className={`text-[11px] tracking-[0.2em] uppercase px-3 py-2 min-h-[44px] flex items-center transition-colors ${
              isActive
                ? 'text-[#e8ebe8] border-b border-[#e8ebe8]'
                : 'text-[#8a9488] border-b border-transparent hover:text-[#c0c5c2]'
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
