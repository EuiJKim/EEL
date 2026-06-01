'use client';

import { useEffect, useRef, useState } from 'react';
import { STUDIO } from '@/data/studio';
import { useLanguage } from '@/lib/language-context';

const ABOUT_KO = '서울 기반 핸드메이드 스튜디오. 독특하고 정교한 무언가를 만듭니다. 주문 제작은 최대 21일, 촬영 소품 대여도 가능합니다.';

const T = {
  en: {
    about: 'About',
    body: STUDIO.about,
    tagline: 'Made-to-order · 21-day cure · Seoul',
    contact: 'Contact',
  },
  ko: {
    about: '소개',
    body: ABOUT_KO,
    tagline: '주문 제작 · 21일 경화 · 서울',
    contact: 'Contact',
  },
};

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

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`text-[12px] tracking-[0.18em] md:tracking-[0.2em] uppercase px-2.5 md:px-3 py-2 min-h-[44px] flex items-center gap-1.5 transition-colors ${
          open ? 'border-b' : 'border-b border-transparent'
        }`}
        style={{
          fontFamily: 'var(--font-staatliches), sans-serif',
          color: open ? '#e8ebe8' : '#8a9488',
          borderColor: open ? '#e8ebe8' : 'transparent',
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
          className="absolute left-0 top-full mt-2 w-[88vw] max-w-[420px] bg-[#1a1d1b] border border-[#2a2e2c] shadow-2xl z-30 p-6"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          <div
            className="text-[10px] tracking-[0.2em] uppercase text-[#8a9488] mb-2"
            style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
          >
            {t.about}
          </div>
          <p className="text-[12px] text-[#c0c5c2] leading-[1.7] mb-3 whitespace-pre-line">{t.body}</p>
          <p
            className="text-[10px] tracking-[0.2em] uppercase text-[#8a9488] mb-5"
            style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
          >
            {t.tagline}
          </p>

          <div className="h-px bg-[#2a2e2c] my-5" />

          <div
            className="text-[10px] tracking-[0.2em] uppercase text-[#8a9488] mb-3"
            style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
          >
            {t.contact}
          </div>
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
        </div>
      )}
    </div>
  );
}
