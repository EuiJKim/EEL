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

/**
 * Active state is color + underline only — NOT a font-size change. Changing
 * the size on the active tab reflowed the wrapping row (the active tab would
 * jump to the next line). Constant size keeps the row stable.
 */
const tabCls =
  'text-[12px] tracking-[0.18em] md:tracking-[0.2em] uppercase px-2.5 md:px-3 py-2 min-h-[44px] flex items-center border-b-2 transition-colors duration-150';

export default function CategoryTabs({ active, basePath = '/' }: Props) {
  const projectsActive = active === 'projects';
  return (
    <nav
      className="flex items-center justify-between w-full md:w-auto md:flex-wrap md:justify-start md:gap-x-2"
      style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
    >
      {TABS.map((t) => {
        const isActive = t.key === active;
        return (
          <Link
            key={t.key}
            href={`${basePath}?category=${t.key}`}
            className={tabCls}
            style={{
              color: isActive ? '#F2EDE4' : '#c0c5c2',
              borderColor: isActive ? '#F2EDE4' : 'transparent',
            }}
          >
            {t.en}
          </Link>
        );
      })}
      <Link
        href="/projects"
        className={tabCls}
        style={{
          color: projectsActive ? '#F2EDE4' : '#c0c5c2',
          borderColor: projectsActive ? '#F2EDE4' : 'transparent',
        }}
      >
        Projects
      </Link>
    </nav>
  );
}
