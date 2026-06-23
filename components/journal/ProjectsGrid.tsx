'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PROJECTS } from '@/data/projects';
import { useLanguage } from '@/lib/language-context';
import CategoryTabs from './CategoryTabs';
import AboutPopover from './AboutPopover';

/**
 * Projects index — same header/tab shell as the Works grid so navigation feels
 * unified, but cards render as projects (cover + client · year + role) and link
 * to /projects/[id]. Projects is a peer top-level section to Works.
 */
export default function ProjectsGrid() {
  const { lang } = useLanguage();

  return (
    <main
      className="flex-1 min-h-screen bg-[#110D1C]"
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
    >
      {/* Section header + tabs — sticky on mobile */}
      <div className="sticky top-0 z-20 bg-[#110D1C] md:static px-6 md:px-14 pt-4 md:pt-6 pb-3 md:pb-8">
        <div className="flex flex-wrap items-start md:items-center justify-between md:justify-end gap-y-1 gap-x-3 md:gap-6">
          <div className="md:hidden shrink-0">
            <AboutPopover />
          </div>
          <div className="md:overflow-x-auto md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden">
            <CategoryTabs active="projects" />
          </div>
        </div>
        <div className="h-px bg-[#2a2e2c] mt-3 md:mt-6" />
      </div>

      {/* Grid */}
      <div className="px-6 md:px-10 pt-6 md:pt-0 grid grid-cols-1 md:grid-cols-2 gap-x-5 md:gap-x-6 gap-y-10 md:gap-y-14 pb-16 md:pb-24">
        {PROJECTS.map((p) => (
          <Link key={p.id} href={`/projects/${p.id}`} className="group block">
            {/* Meta row */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <span
                className="text-[12px] tracking-[0.18em] uppercase text-[#8a9488]"
                style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
              >
                {p.client}
              </span>
              <span className="text-[#4a4f4b] text-[12px]">·</span>
              <span
                className="text-[12px] tracking-[0.18em] uppercase text-[#8a9488]"
                style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
              >
                {p.year}
              </span>
            </div>

            {/* Title */}
            <h3
              className="text-[15px] md:text-[16px] leading-[1.3] text-[#F2EDE4] mb-3 tracking-[-0.005em] group-hover:text-white transition-colors duration-300"
              style={{ fontFamily: 'var(--font-inter), sans-serif', fontWeight: 600 }}
            >
              {p.title[lang]}
            </h3>

            {/* Cover */}
            <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#1a1d1b] rounded-lg">
              <Image
                src={p.cover}
                alt={p.title[lang]}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            {/* Role */}
            <div
              className="mt-2.5 text-[11px] tracking-[0.16em] uppercase text-[#8a9488]"
              style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
            >
              {p.role.map((r) => r[lang]).join(' · ')}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
