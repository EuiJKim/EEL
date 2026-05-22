'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const FURNITURE: {
  id: string;
  name: string;
  nameKo?: string;
  specs: { en: string; ko: string }[];
  image: string;
  images: string[];
  price?: string;
  soldOut?: boolean;
}[] = [
  {
    id: 'table-first',
    name: 'Resin Table',
    nameKo: '레진 테이블',
    specs: [
      { en: 'Full Resin Top x Stainless Steel Base', ko: '풀 레진 상판 x 스테인리스 스틸 베이스' },
      { en: 'Color : Turquoise', ko: '컬러 : 터콰이즈' },
      { en: 'Size : Ø 74–76cm, H 76cm', ko: '사이즈 : Ø 74–76cm, H 76cm' },
    ],
    image: '/products/table-first/1.jpg',
    images: [
      '/products/table-first/1.jpg',
      '/products/table-first/2.jpg',
      '/products/table-first/3.jpg',
      '/products/table-first/4.jpg',
    ],
    price: '₩ 1,500,000',
    soldOut: true,
  },
  {
    id: 'cabinet-black',
    name: 'Resin Table',
    nameKo: '레진 테이블',
    specs: [
      { en: 'Full Resin Top x Black Titanium Base', ko: '풀 레진 상판 x 블랙 티타늄 베이스' },
      { en: 'Color : Glacier Blue', ko: '컬러 : 글레이셔 블루' },
      { en: 'Size : Ø 73–78cm, H 72cm', ko: '사이즈 : Ø 73–78cm, H 72cm' },
    ],
    image: '/products/cabinet-black/1.jpg',
    images: [
      '/products/cabinet-black/1.jpg',
      '/products/cabinet-black/3.jpg',
      '/products/cabinet-black/4.jpg',
      '/products/cabinet-black/5.jpg',
      '/products/cabinet-black/6.jpg',
      '/products/cabinet-black/7.jpg',
    ],
    price: '₩ 1,800,000',
  },
  {
    id: 'deep-green-table',
    name: 'Resin Table',
    nameKo: '레진 테이블',
    specs: [
      { en: 'Full Resin Top x Walnut Legs', ko: '풀 레진 상판 x 월넛 다리' },
      { en: 'Color : Deep Green', ko: '컬러 : 딥 그린' },
      { en: 'Size : Ø 38–48cm, H 54.5cm', ko: '사이즈 : Ø 38–48cm, H 54.5cm' },
    ],
    image: '/products/deep-green-table/deepgreen1.jpg',
    images: [
      '/products/deep-green-table/deepgreen1.jpg',
      '/products/deep-green-table/deepgreen2.jpg',
      '/products/deep-green-table/deepgreen3.jpg',
      '/products/deep-green-table/deepgreen4.jpg',
      '/products/deep-green-table/deepgreen5.jpg',
      '/products/deep-green-table/deepgreen6.jpg',
      '/products/deep-green-table/deepgreen7.jpg',
      '/products/deep-green-table/deepgreen8.jpg',
      '/products/deep-green-table/deepgreen9.jpg',
    ],
    price: '₩ 410,000',
  },
  {
    id: 'white-table',
    name: 'Resin Table',
    nameKo: '레진 테이블',
    specs: [
      { en: 'Full Resin Top x Brass Legs', ko: '풀 레진 상판 x 브라스 다리' },
      { en: 'Color : Ice White', ko: '컬러 : 아이스 화이트' },
      { en: 'Size : Ø 48–54cm, H 41.8cm', ko: '사이즈 : Ø 48–54cm, H 41.8cm' },
    ],
    image: '/products/white-table/1.jpg',
    images: [
      '/products/white-table/1.jpg',
      '/products/white-table/2.jpg',
      '/products/white-table/3.jpg',
      '/products/white-table/4.jpg',
      '/products/white-table/5.jpg',
      '/products/white-table/6.jpg',
      '/products/white-table/7.jpg',
      '/products/white-table/8.jpg',
      '/products/white-table/9.jpg',
    ],
    price: '₩ 350,000',
  },
  {
    id: 'black-table',
    name: 'Black Coated Table',
    specs: [] as { en: string; ko: string }[],
    image: '/products/black-table/blacktable1.jpg',
    images: [
      '/products/black-table/blacktable1.jpg',
      '/products/black-table/blacktable2.jpg',
      '/products/black-table/blacktable3.jpg',
      '/products/black-table/blacktable4.jpg',
      '/products/black-table/blacktable5.jpg',
    ],
  },
  {
    id: 'tile-table',
    name: 'Ceramic Tile Table',
    specs: [] as { en: string; ko: string }[],
    image: '/products/tile-table/1.jpg',
    images: [
      '/products/tile-table/1.jpg',
      '/products/tile-table/2.jpg',
      '/products/tile-table/3.jpg',
      '/products/tile-table/4.jpg',
    ],
  },
  {
    id: 'acrylic-blue-leg',
    name: 'Acrylic Table',
    specs: [] as { en: string; ko: string }[],
    image: '/products/acrylic-blue-leg/1.jpg',
    images: [
      '/products/acrylic-blue-leg/1.jpg',
      '/products/acrylic-blue-leg/2.jpg',
      '/products/acrylic-blue-leg/3.jpg',
      '/products/acrylic-blue-leg/4.jpg',
    ],
  },
  {
    id: 'table-second',
    name: 'Leaking Light Cabinet',
    specs: [] as { en: string; ko: string }[],
    image: '/products/table-second/1.jpg',
    images: [
      '/products/table-second/1.jpg',
      '/products/table-second/2.jpg',
      '/products/table-second/3.jpg',
      '/products/table-second/4.jpg',
      '/products/table-second/5.jpg',
    ],
  },
];

const PHOTO_PADDING = 64;

function Lightbox({ images, startIndex, onClose }: { images: string[]; startIndex: number; onClose: () => void }) {
  const [current, setCurrent] = useState(startIndex);
  const [fade, setFade] = useState(true);

  const goTo = useCallback((next: number) => {
    setFade(false);
    setTimeout(() => { setCurrent(next); setFade(true); }, 150);
  }, []);

  const prev = () => goTo((current - 1 + images.length) % images.length);
  const next = () => goTo((current + 1) % images.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current]);

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-8 text-white/60 hover:text-white transition-colors bg-transparent border-0 cursor-pointer z-10"
        style={{ fontSize: '28px', lineHeight: 1 }}
      >
        ×
      </button>

      {/* Counter */}
      <span className="absolute top-7 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-[0.1em]" style={{ fontFamily: "var(--font-inter, 'Inter'), sans-serif" }}>
        {current + 1} / {images.length}
      </span>

      {/* Image + side arrows */}
      <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
        {/* Prev */}
        <div className="w-10 flex-shrink-0 flex justify-center">
          {images.length > 1 && current > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="text-white/50 hover:text-white transition-colors bg-transparent border-0 cursor-pointer p-2"
            >
              <svg width="28" height="28" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <polyline points="13,4 7,10 13,16" />
              </svg>
            </button>
          )}
        </div>

        <img
          src={images[current]}
          alt=""
          className="max-h-[85vh] max-w-[70vw] object-contain select-none"
          style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.15s ease' }}
        />

        {/* Next */}
        <div className="w-10 flex-shrink-0 flex justify-center">
          {images.length > 1 && current < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="text-white/50 hover:text-white transition-colors bg-transparent border-0 cursor-pointer p-2"
            >
              <svg width="28" height="28" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <polyline points="7,4 13,10 7,16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i); }}
              className="w-1.5 h-1.5 rounded-full border-0 cursor-pointer p-0 transition-all"
              style={{ background: i === current ? '#fff' : 'rgba(255,255,255,0.25)' }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function HomeGallery() {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  return (
    <>
      <div>
        {FURNITURE.map((item) => (
          <section
            key={item.id}
            className="w-full flex items-start"
            style={{ height: '100vh', background: '#0e0e0e' }}
          >
            {/* Left — photo (clickable) */}
            <div
              className="h-full flex items-center justify-center shrink-0 cursor-zoom-in"
              style={{ width: '55%', padding: `${PHOTO_PADDING}px 40px ${PHOTO_PADDING}px 80px` }}
              onClick={() => setLightbox({ images: item.images, index: 0 })}
            >
              <img
                src={item.image}
                alt={item.name}
                className="max-h-full max-w-full object-contain block hover:opacity-90 transition-opacity duration-200"
              />
            </div>

            {/* Right — text */}
            <div
              style={{ width: '45%', paddingTop: `${PHOTO_PADDING}px`, paddingRight: '80px', paddingLeft: '20px' }}
            >
              <h2
                style={{ fontFamily: "var(--font-inter, 'Inter'), sans-serif", fontSize: 'clamp(14px, 1.6vw, 22px)', fontWeight: 600, color: '#fff', lineHeight: 1.3, letterSpacing: '0.02em', marginBottom: '16px' }}
              >
                {item.name}
              </h2>
              {item.specs.map((spec, i) => (
                <p key={i} style={{ fontFamily: "var(--font-inter, 'Inter'), sans-serif", fontSize: 'clamp(11px, 1vw, 14px)', fontWeight: 400, color: '#fff', letterSpacing: '0.04em', lineHeight: 1.6, marginBottom: '6px' }}>
                  {spec.en}
                </p>
              ))}
              {(item.nameKo || item.specs.length > 0) && (
                <div style={{ marginTop: '24px' }}>
                  {item.nameKo && (
                    <p style={{ fontFamily: "var(--font-inter, 'Inter'), sans-serif", fontSize: 'clamp(14px, 1.6vw, 22px)', fontWeight: 600, color: '#fff', letterSpacing: '0.02em', marginBottom: '16px' }}>
                      {item.nameKo}
                    </p>
                  )}
                  {item.specs.map((spec, i) => (
                    <p key={i} style={{ fontFamily: "var(--font-inter, 'Inter'), sans-serif", fontSize: 'clamp(10px, 0.85vw, 12px)', fontWeight: 400, color: '#fff', letterSpacing: '0.04em', lineHeight: 1.6, marginBottom: '6px' }}>
                      {spec.ko}
                    </p>
                  ))}
                </div>
              )}
              {item.price && (
                <div style={{ marginTop: '32px' }}>
                  <p style={{ fontFamily: "var(--font-inter, 'Inter'), sans-serif", fontSize: 'clamp(12px, 1.1vw, 16px)', fontWeight: 500, color: '#fff', letterSpacing: '0.04em' }}>
                    {item.price}
                  </p>
                  {item.soldOut && (
                    <p style={{ fontFamily: "var(--font-inter, 'Inter'), sans-serif", fontSize: 'clamp(9px, 0.75vw, 11px)', fontWeight: 400, color: '#e05555', letterSpacing: '0.06em', marginTop: '4px' }}>
                      sold out
                    </p>
                  )}
                </div>
              )}
              <Link
                href="/order"
                style={{
                  display: 'inline-block',
                  marginTop: '36px',
                  fontFamily: "var(--font-inter, 'Inter'), sans-serif",
                  fontSize: 'clamp(10px, 0.85vw, 12px)',
                  fontWeight: 400,
                  color: '#fff',
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.4)',
                  paddingBottom: '2px',
                  opacity: 0.7,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
              >
                Commission a similar piece →
              </Link>
            </div>
          </section>
        ))}
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
