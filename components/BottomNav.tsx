'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface BottomNavProps {
  visible: boolean;
  onContactClick: () => void;
}

export default function BottomNav({ visible, onContactClick }: BottomNavProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    <nav
      className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-6 z-[100] bg-black text-white transition-transform duration-400"
      style={{
        height: 'var(--nav-h, 64px)',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
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
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className="font-[var(--font-ui)] text-xs sm:text-sm tracking-[0.08em] uppercase text-white transition-opacity duration-200 hover:opacity-50"
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
            <Link
              href="/products?category=furniture"
              className="text-xs sm:text-sm tracking-[0.08em] uppercase text-white transition-opacity duration-200 hover:opacity-50 py-1"
              style={{ fontFamily: "var(--font-staatliches, 'Staatliches'), sans-serif" }}
            >
              Furniture
            </Link>
            <Link
              href="/products?category=object"
              className="text-xs sm:text-sm tracking-[0.08em] uppercase text-white transition-opacity duration-200 hover:opacity-50 py-1"
              style={{ fontFamily: "var(--font-staatliches, 'Staatliches'), sans-serif" }}
            >
              Object
            </Link>
            <Link
              href="/products?category=painting"
              className="text-xs sm:text-sm tracking-[0.08em] uppercase text-white transition-opacity duration-200 hover:opacity-50 py-1"
              style={{ fontFamily: "var(--font-staatliches, 'Staatliches'), sans-serif" }}
            >
              Painting
            </Link>
          </div>
        </div>

        <Link
          href="/order"
          className="text-xs sm:text-sm tracking-[0.08em] uppercase text-white transition-opacity duration-200 hover:opacity-50"
          style={{ fontFamily: "var(--font-staatliches, 'Staatliches'), sans-serif", WebkitTextStroke: '0.4px #fff' }}
        >
          Commission
        </Link>

        <button
          onClick={onContactClick}
          className="text-xs sm:text-sm tracking-[0.08em] uppercase text-white transition-opacity duration-200 hover:opacity-50"
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
  );
}
