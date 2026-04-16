'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BottomNavProps {
  visible: boolean;
  onContactClick: () => void;
}

export default function BottomNav({ visible, onContactClick }: BottomNavProps) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleWorksNav = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setDropdownOpen(false);
    setTransitioning(true);
    setTimeout(() => router.push(href), 350);
  };

  const handleMouseEnter = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => setDropdownOpen(false), 700);
  };

  useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  return (
    <>
      {/* Transition overlay */}
      <div
        className="fixed inset-0 bg-black pointer-events-none z-[999]"
        style={{
          opacity: transitioning ? 1 : 0,
          transition: transitioning ? 'opacity 0.35s ease' : 'none',
        }}
      />

    <nav
      className="fixed left-0 right-0 flex items-center justify-between px-6 z-[100] bg-black text-white transition-transform duration-400"
      style={{
        height: 'var(--nav-h, 64px)',
        bottom: 0,
        top: 'auto',
        transform: (visible || isMobile) ? 'translateY(0)' : 'translateY(100%)',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-[#333]" />

      {/* Left */}
      <div className="flex items-center gap-5 flex-1" />

      {/* Center */}
      <div className="flex items-center gap-4 sm:gap-9 absolute left-1/2 -translate-x-1/2">
        {/* Works dropdown */}
        <div
          className="relative flex items-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className="font-[var(--font-ui)] text-xs sm:text-sm tracking-[0.08em] uppercase text-white transition-opacity duration-200 hover:opacity-50 py-2"
            style={{ fontFamily: "var(--font-staatliches, 'Staatliches'), sans-serif", WebkitTextStroke: '0.4px #fff' }}
          >
            Works
          </button>
          <div
            className="absolute bottom-full left-1/2 -translate-x-1/2 bg-black flex flex-col items-center gap-0.5 px-5 pt-3 pb-5 whitespace-nowrap border-t border-[#333] transition-opacity duration-300"
            style={{
              opacity: dropdownOpen ? 1 : 0,
              pointerEvents: dropdownOpen ? 'auto' : 'none',
            }}
          >
            <a
              href="/products?category=furniture"
              onClick={handleWorksNav('/products?category=furniture')}
              className="text-xs sm:text-sm tracking-[0.08em] uppercase text-white transition-opacity duration-200 hover:opacity-50 py-2 cursor-pointer"
              style={{ fontFamily: "var(--font-staatliches, 'Staatliches'), sans-serif" }}
            >
              Furniture
            </a>
            <a
              href="/products?category=objet"
              onClick={handleWorksNav('/products?category=objet')}
              className="text-xs sm:text-sm tracking-[0.08em] uppercase text-white transition-opacity duration-200 hover:opacity-50 py-2 cursor-pointer"
              style={{ fontFamily: "var(--font-staatliches, 'Staatliches'), sans-serif" }}
            >
              Objet
            </a>
            <a
              href="/products?category=painting"
              onClick={handleWorksNav('/products?category=painting')}
              className="text-xs sm:text-sm tracking-[0.08em] uppercase text-white transition-opacity duration-200 hover:opacity-50 py-2 cursor-pointer"
              style={{ fontFamily: "var(--font-staatliches, 'Staatliches'), sans-serif" }}
            >
              Painting
            </a>
          </div>
        </div>

        <Link
          href="/order"
          className="text-xs sm:text-sm tracking-[0.08em] uppercase text-white transition-opacity duration-200 hover:opacity-50 py-2"
          style={{ fontFamily: "var(--font-staatliches, 'Staatliches'), sans-serif", WebkitTextStroke: '0.4px #fff' }}
        >
          Commission
        </Link>

        <button
          onClick={onContactClick}
          className="text-xs sm:text-sm tracking-[0.08em] uppercase text-white transition-opacity duration-200 hover:opacity-50 py-2"
          style={{ fontFamily: "var(--font-staatliches, 'Staatliches'), sans-serif", WebkitTextStroke: '0.4px #fff' }}
        >
          Contact
        </button>
      </div>

      {/* Right */}
      <div className="hidden sm:flex items-center justify-end flex-1">
        <span
          className="text-base sm:text-xl tracking-[0.04em] uppercase text-white"
          style={{ fontFamily: "var(--font-staatliches, 'Staatliches'), sans-serif", WebkitTextStroke: '0.4px #fff' }}
        >
          &copy; EEL
        </span>
      </div>
    </nav>
    </>
  );
}
