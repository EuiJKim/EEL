'use client';

import Link from 'next/link';
import Image from 'next/image';
import { JOURNAL_ENTRIES } from '@/data/journal-entries';
import { useLanguage } from '@/lib/language-context';
import type { Project } from '@/types/project';

const T = {
  en: { back: 'Projects', client: 'Client', role: 'Role', featured: 'Pieces featured' },
  ko: { back: '프로젝트', client: '클라이언트', role: '역할', featured: '촬영에 쓰인 작품' },
};

export default function ProjectDetailClient({ project }: { project: Project }) {
  const { lang } = useLanguage();
  const t = T[lang];

  const featured = (project.featuredPieceIds ?? [])
    .map((id) => JOURNAL_ENTRIES.find((e) => e.id === id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <div
      className="min-h-screen bg-[#110D1C] text-[#F2EDE4]"
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-[#110D1C]/95 backdrop-blur-sm h-14 flex items-center px-4 md:px-6">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-sm text-[#c0c5c2] hover:text-white transition-colors min-h-[44px]"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="13,4 7,10 13,16" />
          </svg>
          <span
            className="text-[15px] tracking-[0.2em] uppercase"
            style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
          >
            {t.back}
          </span>
        </Link>
      </div>

      {/* Header */}
      <div className="px-6 md:px-14 pt-6 md:pt-10 pb-8 md:pb-12 max-w-[1100px]">
        <div
          className="flex items-center gap-2.5 text-[13px] tracking-[0.2em] uppercase text-[#b8c2b5] mb-3"
          style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
        >
          <span>{project.client}</span>
          <span className="text-[#4a4f4b]">·</span>
          <span>{project.year}</span>
          {project.talent && (
            <>
              <span className="text-[#4a4f4b]">·</span>
              <span>{project.talent}</span>
            </>
          )}
        </div>
        <h1
          className="text-2xl md:text-4xl lg:text-[44px] text-[#F2EDE4] mb-4 tracking-[-0.01em] leading-[1.1]"
          style={{ fontFamily: 'var(--font-gravitas), serif', fontWeight: 400 }}
        >
          {project.title[lang]}
        </h1>
        {project.summary && (
          <p className="text-[14px] md:text-[15px] text-[#c0c5c2] leading-[1.7] max-w-[640px] md:max-w-none mb-5">
            {project.summary[lang]}
          </p>
        )}
        <div
          className="text-[11px] tracking-[0.18em] uppercase text-[#b8c2b5]"
          style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
        >
          {project.role.map((r) => r[lang]).join('  ·  ')}
        </div>
      </div>

      {/* Hero cover (natural ratio, no crop) */}
      <div className="px-6 md:px-14 mb-3 md:mb-4">
        <Image
          src={project.cover}
          alt={project.title[lang]}
          width={2400}
          height={1600}
          priority
          className="w-full h-auto"
          sizes="(max-width: 768px) 100vw, 90vw"
        />
      </div>

      {/* Gallery — masonry, natural ratios, no crop */}
      <div className="px-6 md:px-14 pb-16 columns-1 md:columns-2 gap-3 md:gap-4 [&>*]:mb-3 md:[&>*]:mb-4">
        {project.photos.map((src, i) => (
          <Image
            key={src + i}
            src={src}
            alt={`${project.title[lang]} — ${i + 1}`}
            width={1697}
            height={2560}
            className="w-full h-auto break-inside-avoid"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        ))}
      </div>

      {/* Featured pieces cross-link */}
      {featured.length > 0 && (
        <div className="px-6 md:px-14 pb-24 border-t border-[#2a2e2c] pt-10">
          <div
            className="text-[13px] tracking-[0.2em] uppercase text-[#b8c2b5] mb-5"
            style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
          >
            {t.featured}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8">
            {featured.map((piece) => (
              <Link key={piece.id} href={`/works/${piece.id}`} className="group block">
                <div className="relative w-full aspect-square overflow-hidden bg-[#1a1d1b] rounded-lg mb-2.5">
                  <Image
                    src={piece.image}
                    alt={piece.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 22vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div
                  className="text-[13px] text-[#F2EDE4] group-hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-inter), sans-serif', fontWeight: 500 }}
                >
                  {piece.title} →
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
