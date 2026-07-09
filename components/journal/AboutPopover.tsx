'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { STUDIO } from '@/data/studio';
import { JOURNAL_ENTRIES } from '@/data/journal-entries';
import { PROJECTS } from '@/data/projects';
import { useLanguage } from '@/lib/language-context';

const COUNTS = {
  furniture: JOURNAL_ENTRIES.filter((e) => e.category === 'furniture').length,
  object: JOURNAL_ENTRIES.filter((e) => e.category === 'object').length,
  painting: JOURNAL_ENTRIES.filter((e) => e.category === 'painting').length,
};

const ABOUT_KO = '서울 기반 핸드메이드 스튜디오. 독특하고 정교한 무언가를 만듭니다. 주문 제작은 최대 21일, 촬영 소품 대여도 가능합니다.';

const T = {
  en: {
    about: 'About',
    body: STUDIO.about,
    tagline: 'Made-to-order · 21-day cure · Seoul',
    works: 'Works',
    projects: 'Projects',
    furniture: 'Furniture',
    object: 'Object',
    painting: 'Painting',
    contact: 'Contact',
  },
  ko: {
    about: '소개',
    body: ABOUT_KO,
    tagline: '주문 제작 · 21일 경화 · 서울',
    works: '작품',
    projects: '프로젝트',
    furniture: '가구',
    object: '오브제',
    painting: '페인팅',
    contact: 'Contact',
  },
};

const pad = (n: number) => String(n).padStart(2, '0');

export default function AboutPopover() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const t = T[lang];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const label = (text: string) => (
    <div
      className="text-[10px] tracking-[0.2em] uppercase text-[#8a9488] mb-2"
      style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
    >
      {text}
    </div>
  );

  const close = () => setOpen(false);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`text-[14px] tracking-[0.18em] md:tracking-[0.2em] uppercase px-2.5 md:px-3 py-2 min-h-[44px] flex items-center gap-1.5 whitespace-nowrap transition-colors ${
          open ? 'border-b' : 'border-b border-transparent'
        }`}
        style={{
          fontFamily: 'var(--font-staatliches), sans-serif',
          color: open ? '#F2EDE4' : '#c0c5c2',
          borderColor: open ? '#F2EDE4' : 'transparent',
        }}
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
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="2,3.5 5,6.5 8,3.5" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full mt-2 w-[88vw] max-w-[420px] max-h-[70vh] overflow-y-auto bg-[#1a1d1b] border border-[#2a2e2c] shadow-2xl z-30 p-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          {/* About */}
          {label(t.about)}
          <p className="text-[12px] text-[#c0c5c2] leading-[1.7] mb-3 whitespace-pre-line">{t.body}</p>
          <p
            className="text-[10px] tracking-[0.2em] uppercase text-[#8a9488]"
            style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
          >
            {t.tagline}
          </p>

          <div className="h-px bg-[#2a2e2c] my-5" />

          {/* Works */}
          {label(t.works)}
          <ul
            className="text-[12px] text-[#c0c5c2] space-y-1.5"
            style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
          >
            {([
              ['/?category=furniture', t.furniture, COUNTS.furniture],
              ['/?category=object', t.object, COUNTS.object],
              ['/?category=painting', t.painting, COUNTS.painting],
            ] as const).map(([href, name, n]) => (
              <li key={href} className="flex justify-between tracking-[0.14em] uppercase">
                <Link href={href} onClick={close} className="hover:text-white transition-colors">
                  {name}
                </Link>
                <span className="text-[#8a9488]">{pad(n)}</span>
              </li>
            ))}
          </ul>

          <div className="h-px bg-[#2a2e2c] my-5" />

          {/* Projects */}
          {label(t.projects)}
          <ul
            className="text-[12px] text-[#c0c5c2] space-y-1.5"
            style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
          >
            {PROJECTS.map((p) => (
              <li key={p.id} className="flex justify-between tracking-[0.14em] uppercase gap-2">
                <Link
                  href={`/projects/${p.id}`}
                  onClick={close}
                  className="hover:text-white transition-colors truncate"
                >
                  {p.client}
                </Link>
                <span className="text-[#8a9488] shrink-0">{p.year}</span>
              </li>
            ))}
          </ul>

          <div className="h-px bg-[#2a2e2c] my-5" />

          {/* Contact */}
          {label(t.contact)}
          <ul className="space-y-1.5 text-[12px] text-[#c0c5c2]">
            <li>
              <a
                href={STUDIO.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:text-white transition-colors"
              >
                Instagram <span className="text-[#5a6058] ml-2">{STUDIO.contact.instagram}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${STUDIO.contact.email}`}
                className="inline-flex items-center hover:text-white transition-colors"
              >
                Email <span className="text-[#5a6058] ml-2">{STUDIO.contact.email}</span>
              </a>
            </li>
          </ul>

          {/* Imprint */}
          <div
            className="text-[9px] leading-[1.7] text-[#5a6058] mt-5 pt-4 border-t border-[#2a2e2c]"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            <p>010-5229-7728 · Daily 12:00 – 18:00</p>
            <p>37-14, Hoedong-gil, 403, Korea</p>
            <p>BIZ LICENSE 305-46-07793 · EEL · CHAE MINSOO</p>
            <p>Copyright © 2025 EEL All rights reserved.</p>
          </div>
        </div>
      )}
    </div>
  );
}
