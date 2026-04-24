'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BottomNav from '@/components/BottomNav';
import ContactModal from '@/components/ContactModal';

export default function Home() {
  /* ── Intro ── */
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('eel-intro-done')) {
      setIntroVisible(false);
      return;
    }
    const t = setTimeout(() => {
      setIntroVisible(false);
      sessionStorage.setItem('eel-intro-done', '1');
    }, 800);
    return () => clearTimeout(t);
  }, []);

  /* ── Nav visibility (scroll up → show) ── */
  const [navVisible, setNavVisible] = useState(false);
  const [scrollHintHidden, setScrollHintHidden] = useState(false);
  const lastScrollY = useRef(0);

  // 모바일 vh 고정 — 최초 1회만 저장, resize 무시
  useEffect(() => {
    document.documentElement.style.setProperty('--fixed-vh', `${window.innerHeight}px`);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth < 768) return;
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      if (delta < -6) {
        setNavVisible(true);
        setScrollHintHidden(true);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleNav = () => {
    setNavVisible(v => {
      setScrollHintHidden(!v);
      return !v;
    });
  };

  /* ── Cart tooltip ── */
  const [cartTooltip, setCartTooltip] = useState(false);
  const handleCartClick = () => {
    setCartTooltip(true);
    setTimeout(() => setCartTooltip(false), 1000);
  };

  /* ── Contact modal ── */
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="bg-[var(--bg)]" style={{ minHeight: 'calc(100vh + 200px)' }}>
      {/* ── Intro overlay — black screen fades out ── */}
      <AnimatePresence>
        {introVisible && (
          <motion.div
            className="fixed inset-0 z-[999] bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          />
        )}
      </AnimatePresence>

      {/* ── Nav toggle (top-left circle) ── */}
      <button
        onClick={toggleNav}
        className="fixed top-5 left-6 z-[150] w-7 h-7 rounded-full bg-black border-none cursor-pointer hover:opacity-60 transition-opacity duration-200"
        aria-label="메뉴"
      />

      {/* ── Cart icon (top-right) ── */}
      <div className="fixed top-5 right-6 z-[150] flex flex-col items-end gap-1">
        <button
          onClick={handleCartClick}
          className="bg-transparent border-none cursor-pointer text-black flex items-center p-0 hover:opacity-60 transition-opacity duration-200"
          aria-label="장바구니"
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
        </button>
        <span
          className="text-[10px] text-black tracking-[0.04em] transition-opacity duration-200"
          style={{ opacity: cartTooltip ? 1 : 0, fontFamily: "'Telex', sans-serif" }}
        >
          soon….
        </span>
      </div>

      {/* ── Hero section (full-screen image + text overlay) ── */}
      <section className="fixed inset-0 w-full overflow-hidden" style={{ height: 'var(--fixed-vh, 100vh)' }}>
        {/* Background image with zoom animation */}
        <img
          src="/hero-bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ animation: 'heroZoom 2.4s cubic-bezier(0.4,0,0.2,1) forwards' }}
        />

        {/* Text overlay */}
        <div
          className="hero-text-wrap absolute z-10 flex flex-col gap-3 max-w-[720px]"
          style={{
            top: '108px',
            left: '32px',
            fontFamily: "'Telex', sans-serif",
            color: '#000',
          }}
        >
          {/* EEL logo text */}
          <h1
            className="hero-logo leading-[1.4] tracking-[0.02em]"
            style={{
              fontFamily: "var(--font-gravitas, 'Gravitas One'), serif",
              fontSize: 'clamp(40px, 5.6vw, 64px)',
              fontWeight: 900,
              WebkitTextStroke: '1px #000',
            }}
          >
            STUDIO EEL
          </h1>

          {/* Divider - full width */}
          <hr
            className="hero-divider border-none h-0 opacity-40 m-0"
            style={{
              borderTop: '1px solid #000',
              position: 'relative',
              left: '-32px',
              width: '100vw',
            }}
          />

          {/* Description */}
          <p
            className="hero-body font-bold opacity-90 whitespace-nowrap"
            style={{ fontSize: 'clamp(12px, 1.45vw, 19px)', lineHeight: 1.8, WebkitTextStroke: '0.4px #000' }}
          >
            A Seoul-based studio crafting resin objects that are eccentric by nature, precise by hand
          </p>
          <p
            className="hero-body font-bold opacity-90 mt-2"
            style={{ fontSize: 'clamp(14px, 1.55vw, 19px)', lineHeight: 1.8, WebkitTextStroke: '0.4px #000' }}
          >
            We work at the edge of material and form —<br />
            where function meets something harder to name
          </p>

          {/* Divider */}
          <hr
            className="hero-divider border-none h-0 opacity-40 m-0"
            style={{
              borderTop: '1px solid #000',
              position: 'relative',
              left: '-32px',
              width: '100vw',
            }}
          />

          {/* Contact icons */}
          <div className="flex items-center gap-3 mt-1 text-black">
            <a
              href="https://instagram.com/eel.eel.eel.eel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-black hover:opacity-50 transition-opacity duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a
              href="mailto:eelobjects@gmail.com"
              className="flex items-center text-black hover:opacity-50 transition-opacity duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <polyline points="2,4 12,13 22,4"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer info (fixed bottom-right) ── */}
      <div
        className="hero-footer-info fixed bottom-[76px] right-7 z-10 text-right flex flex-col gap-0.5"
        style={{ fontFamily: "'Telex', sans-serif" }}
      >
        {[
          'MON – SUN 12:00 – 18:00',
          'open 365',
        ].map((t, i) => (
          <p key={i} className="text-[9px] text-black tracking-[0.04em] leading-[1.5] opacity-65" style={{ WebkitTextStroke: '0.2px #000' }}>
            {t}
          </p>
        ))}
        <p className="text-[9px] text-black tracking-[0.04em] leading-[1.5] opacity-65 mt-1.5" style={{ WebkitTextStroke: '0.2px #000' }}>
          1F 508, Hoedong-gil, KOREA
        </p>
        {[
          'BIZ LICENSE 305-46-07793',
          'EEL',
          'CHAE MIN SOO',
          'Copyright \u00A92025 EEL All rights reserved',
        ].map((t, i) => (
          <p key={i} className="text-[9px] text-black tracking-[0.04em] leading-[1.5] opacity-65" style={{ WebkitTextStroke: '0.2px #000' }}>
            {t}
          </p>
        ))}
      </div>

      {/* ── Scroll hint arrow ── */}
      <div
        className={`scroll-hint-arrow fixed left-1/2 -translate-x-1/2 z-[90] text-black pointer-events-none transition-opacity duration-400 hidden md:block ${scrollHintHidden ? 'opacity-0' : 'scroll-blink'}`}
        style={{ bottom: '28px' }}
      >
        <svg width="40" height="40" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="4,7 10,13 16,7"/>
        </svg>
      </div>

      {/* ── Bottom Navigation ── */}
      <BottomNav visible={navVisible} onContactClick={() => setContactOpen(true)} />

      {/* ── Contact Modal ── */}
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}
