'use client';

import Link from 'next/link';
import { Instagram, Mail } from 'lucide-react';
import { STUDIO } from '@/data/studio';
import { JOURNAL_ENTRIES } from '@/data/journal-entries';
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
    aboutBody: STUDIO.about,
    tagline: 'Made-to-order · 21-day cure · Seoul',
    index: 'Index',
    furniture: 'Furniture',
    object: 'Object',
    painting: 'Painting',
    commission: 'Commission',
    contact: 'Contact',
  },
  ko: {
    status: '주문 제작 가능',
    about: '소개',
    aboutBody: ABOUT_KO,
    tagline: '주문 제작 · 21일 경화 · 서울',
    index: '작품 목록',
    furniture: '가구',
    object: '오브제',
    painting: '페인팅',
    commission: '커미션 문의',
    contact: 'Contact',
  },
};

export default function Sidebar() {
  const { lang, toggle } = useLanguage();
  const t = T[lang];

  return (
    <aside
      className="hidden md:flex md:flex-col md:w-[300px] md:h-screen md:sticky md:top-0 md:overflow-hidden bg-[#110D1C] px-6 pt-5 pb-8 justify-between"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Brand + Clock */}
      <div>
        <div className="flex items-start justify-between mb-8">
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
        <LiveClock size="sm" compact />

        {/* Status pill */}
        <div className="flex items-center gap-2 mt-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#9ccfae] opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#9ccfae]" />
          </span>
          <span
            className="text-[10px] tracking-[0.2em] uppercase text-[#9ccfae]"
            style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
          >
            {t.status}
          </span>
        </div>
      </div>

      {/* About */}
      <section>
        <div
          className="text-[12px] tracking-[0.18em] uppercase text-[#8a9488] mb-1.5"
          style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
        >
          {t.about}
        </div>
        <p className="text-[12px] text-[#c0c5c2] leading-[1.55] mb-1.5 whitespace-pre-line">{t.aboutBody}</p>
        <p
          className="text-[10px] tracking-[0.2em] uppercase text-[#8a9488]"
          style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
        >
          {t.tagline}
        </p>
      </section>

      {/* Index */}
      <section>
        <div
          className="text-[12px] tracking-[0.18em] uppercase text-[#8a9488] mb-1.5"
          style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
        >
          {t.index}
        </div>
        <ul
          className="text-[12px] text-[#c0c5c2] space-y-1"
          style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
        >
          <li className="flex justify-between tracking-[0.14em] uppercase">
            <span>{t.furniture}</span>
            <span className="text-[#8a9488]">{String(COUNTS.furniture).padStart(2, '0')}</span>
          </li>
          <li className="flex justify-between tracking-[0.14em] uppercase">
            <span>{t.object}</span>
            <span className="text-[#8a9488]">{String(COUNTS.object).padStart(2, '0')}</span>
          </li>
          <li className="flex justify-between tracking-[0.14em] uppercase">
            <span>{t.painting}</span>
            <span className="text-[#8a9488]">{String(COUNTS.painting).padStart(2, '0')}</span>
          </li>
        </ul>
        <Link
          href="/order"
          className="commission-link block w-full mt-3 py-1.5 text-[12px] tracking-[0.14em] uppercase text-center bg-[#F2EDE4] hover:bg-white transition-colors"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 500, color: '#1a1d1b' }}
        >
          {t.commission}
        </Link>

        <div className="mt-3 pt-3 border-t border-[#2a2e2c]">
          <div
            className="text-[12px] tracking-[0.18em] uppercase text-[#8a9488] mb-1.5"
            style={{ fontFamily: "var(--font-staatliches), sans-serif" }}
          >
            {t.contact}
          </div>
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

          {/* Imprint */}
          <div
            className="text-[9px] leading-[1.6] text-[#5a6058] mt-3"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            <p>010-5229-7728</p>
            <p>Daily 12:00 – 18:00</p>
            <p>37-14, Hoedong-gil, 403, Korea</p>
            <p>BIZ LICENSE 305-46-07793</p>
            <p>EEL</p>
            <p>CHAE MINSOO</p>
            <p>Copyright © 2025 EEL All rights reserved.</p>
          </div>
        </div>
      </section>
    </aside>
  );
}
