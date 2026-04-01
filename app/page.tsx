'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const [introPhase, setIntroPhase] = useState<'logo' | 'shrink' | 'done'>('logo');

  useEffect(() => {
    // Check if intro was already shown this session
    if (sessionStorage.getItem('eel-intro-done')) {
      setIntroPhase('done');
      return;
    }
    // Phase 1: show big logo for 1s, then shrink
    const t1 = setTimeout(() => setIntroPhase('shrink'), 1000);
    // Phase 2: after shrink animation, reveal page
    const t2 = setTimeout(() => {
      setIntroPhase('done');
      sessionStorage.setItem('eel-intro-done', '1');
    }, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <main className="bg-[#0a0a0a]">
      {/* Intro overlay */}
      <AnimatePresence>
        {introPhase !== 'done' && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <motion.span
              className="font-bold tracking-[0.35em] uppercase text-white select-none"
              initial={{ fontSize: '72px', opacity: 0 }}
              animate={
                introPhase === 'logo'
                  ? { fontSize: '72px', opacity: 1 }
                  : { fontSize: '15px', opacity: 0, y: -200 }
              }
              transition={
                introPhase === 'logo'
                  ? { duration: 0.6, ease: 'easeOut' }
                  : { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
              }
            >
              EEL
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <Sidebar />

      <section className="relative w-full h-screen flex lg:ml-[15%]">
        {/* Left: empty space */}
        <div className="hidden sm:block w-[40%]" />

        {/* Right: Resin hero image */}
        <div className="hidden sm:block relative w-[60%]">
          <Image
            src="/hero-resin.jpg"
            alt="Resin Art"
            fill
            className="object-cover"
            priority
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent w-1/4 pointer-events-none" />
        </div>

        {/* Mobile: background image */}
        <div className="absolute inset-0 sm:hidden">
          <Image
            src="/hero-resin.jpg"
            alt="Resin Art"
            fill
            className="object-cover opacity-30"
            priority
            loading="eager"
          />
        </div>
      </section>
    </main>
  );
}
