import Link from 'next/link';
import type { Category } from '@/types/journal';

const TABS: { key: Category; en: string; ko: string }[] = [
  { key: 'furniture', en: 'Furniture', ko: '가구' },
  { key: 'object', en: 'Object', ko: '오브제' },
  { key: 'painting', en: 'Painting', ko: '페인팅' },
];

interface Props {
  active: 'all' | Category | 'projects';
  /** Base path for tab links. '/' for home, '/available' for Available landing. */
  basePath?: '/' | '/available';
}

export default function CategoryTabs({ active, basePath = '/' }: Props) {
  const projectsActive = active === 'projects';
  return (
    <nav
      className="flex flex-wrap items-center gap-1 md:gap-2"
      style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
    >
      {TABS.map((t) => {
        const isActive = t.key === active;
        const href = `${basePath}?category=${t.key}`;
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
            {t.en}
          </Link>
        );
      })}
      <Link
        href="/projects"
        className={`tracking-[0.18em] md:tracking-[0.2em] uppercase px-2.5 md:px-3 py-2 min-h-[44px] flex items-center transition-all duration-150 hover:scale-[1.18] origin-left ${
          projectsActive ? 'text-[15px]' : 'text-[12px]'
        }`}
        style={{ color: projectsActive ? '#F2EDE4' : '#8a9488' }}
      >
        Projects
      </Link>
    </nav>
  );
}
