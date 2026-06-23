'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Instagram, Mail } from 'lucide-react';
import { STUDIO } from '@/data/studio';
import { JOURNAL_ENTRIES } from '@/data/journal-entries';
import { PROJECTS } from '@/data/projects';
import LiveClock from './LiveClock';
import { useLanguage } from '@/lib/language-context';

const COUNTS = {
  furniture: JOURNAL_ENTRIES.filter((e) => e.category === 'furniture').length,
  object: JOURNAL_ENTRIES.filter((e) => e.category === 'object').length,
  painting: JOURNAL_ENTRIES.filter((e) => e.category === 'painting').length,
};

const ABOUT_KO = '서울 기반 핸드메이드 스튜디오. 독특하고 정교한 무언가를 만듭니다. 주문 제작은 최대 21일, 촬영 소품 대여도 가능합니다.';

const T = {
  en: {
    status: 'Accepting commissions',
    about: 'About',
    body: STUDIO.about,
    tagline: 'Made-to-order · 21-day cure · Seoul',
    works: 'Works',
    projects: 'Projects',
    furniture: 'Furniture',
    object: 'Object',
    painting: 'Painting',
    commission: 'Commission',
  },
  ko: {
    status: '주문 제작 가능',
    about: '소개',
    body: ABOUT_KO,
    tagline: '주문 제작 · 21일 경화 · 서울',
    works: '작품',
    projects: '프로젝트',
    furniture: '가구',
    object: '오브제',
    painting: '페인팅',
    commission: '커미션 문의',
  },
};

const pad = (n: number) => String(n).padStart(2, '0');

export default function Sidebar() {
  const { lang, toggle } = useLanguage();
  const t = T[lang];
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <aside
      className="hidden md:flex md:flex-col md:w-[300px] md:h-screen md:sticky md:top-0 md:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-[#110D1C] px-6 pt-5 pb-8 justify-between gap-6"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Top: brand + toggle + status + big clock + about */}
      <div>
        <div className="flex items-start justify-between mb-5">
          <Link
            href="/"
            className="block text-[56px] font-normal tracking-[0.04em] hover:opacity-80 transition-opacity leading-none"
            style={{ fontFamily: "var(--font-gravitas), serif", color: '#F2EDE4' }}
          >
            {STUDIO.name}
          </Link>
          <div
            className="mt-1 flex items-center gap-1"
            style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
          >
            <span
              onClick={toggle}
              className={`text-[10px] tracking-[0.14em] uppercase cursor-pointer transition-transform duration-150 hover:scale-125 inline-block ${lang === 'ko' ? 'text-[#F2EDE4]' : 'text-[#5a6058]'}`}
            >KR</span>
            <span className="text-[#3a403c] text-[10px]">·</span>
            <span
              onClick={toggle}
              className={`text-[10px] tracking-[0.14em] uppercase cursor-pointer transition-transform duration-150 hover:scale-125 inline-block ${lang === 'en' ? 'text-[#F2EDE4]' : 'text-[#5a6058]'}`}
            >EN</span>
          </div>
        </div>

        {/* Status pill */}
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#9ccfae] opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#9ccfae]" />
          </span>
          <span
            className="text-[11px] tracking-[0.2em] uppercase text-[#9ccfae]"
            style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
          >
            {t.status}
          </span>
        </div>

        {/* Big clock */}
        <div className="mb-7">
          <LiveClock size="xl" />
        </div>

        {/* About — click to expand */}
        <div>
          <button
            type="button"
            onClick={() => setAboutOpen((v) => !v)}
            aria-expanded={aboutOpen}
            className="flex items-center gap-1.5 text-[13px] tracking-[0.18em] uppercase text-[#F2EDE4] hover:opacity-80 transition-opacity"
            style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
          >
            {t.about}
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              className={`transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`}
            >
              <polyline points="2,3.5 5,6.5 8,3.5" />
            </svg>
          </button>
          <div
            className={`grid transition-all duration-300 ease-out ${aboutOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}
          >
            <div className="overflow-hidden">
              <p className="text-[12px] text-[#c0c5c2] leading-[1.6] mb-2 whitespace-pre-line">{t.body}</p>
              <p
                className="text-[10px] tracking-[0.2em] uppercase text-[#8a9488]"
                style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
              >
                {t.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Works */}
        <div className="mt-6">
          <div
            className="text-[13px] tracking-[0.18em] uppercase text-[#F2EDE4] mb-2"
            style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
          >
            {t.works}
          </div>
          <ul
            className="text-[12px] text-[#c0c5c2] space-y-1"
            style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
          >
            {([
              ['/?category=furniture', t.furniture, COUNTS.furniture],
              ['/?category=object', t.object, COUNTS.object],
              ['/?category=painting', t.painting, COUNTS.painting],
            ] as const).map(([href, name, n]) => (
              <li key={href} className="flex justify-between tracking-[0.14em] uppercase">
                <Link href={href} className="hover:text-white transition-colors">{name}</Link>
                <span className="text-[#8a9488]">{pad(n)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div className="mt-5">
          <Link
            href="/projects"
            className="block text-[13px] tracking-[0.18em] uppercase text-[#F2EDE4] mb-2 hover:opacity-80 transition-opacity"
            style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
          >
            {t.projects}
          </Link>
          <ul
            className="text-[12px] text-[#c0c5c2] space-y-1"
            style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
          >
            {PROJECTS.map((p) => (
              <li key={p.id} className="flex justify-between tracking-[0.14em] uppercase gap-2">
                <Link href={`/projects/${p.id}`} className="hover:text-white transition-colors truncate">
                  {p.client}
                </Link>
                <span className="text-[#8a9488] shrink-0">{p.year}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom: Commission + Contact */}
      <div>
        <Link
          href="/order"
          className="commission-link block w-full mb-4 py-2.5 text-[12px] tracking-[0.14em] uppercase text-center bg-[#F2EDE4] hover:bg-white transition-colors"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 500, color: '#1a1d1b' }}
        >
          {t.commission}
        </Link>
        <div className="flex items-center gap-3">
          <a
            href={STUDIO.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c0c5c2] hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={18} strokeWidth={1.5} />
          </a>
          <a
            href={`mailto:${STUDIO.contact.email}`}
            className="text-[#c0c5c2] hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail strokeWidth={1.5} style={{ width: '18px', height: '22px' }} />
          </a>
        </div>
      </div>
    </aside>
  );
}
