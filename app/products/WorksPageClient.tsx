'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: string;
  index: number;
  name: string;
  subtitle: string;
  description: string;
  glow: string;
  accent: string;
  gradient: string;
}

interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  sort_order: number;
}

interface ProductSpec {
  id: string;
  product_id: string;
  label: string;
  value: string;
  sort_order: number;
}

/* ── helpers ── */
function getSizeFromSpecs(specs: ProductSpec[]): string | null {
  const sizeSpec = specs.find(
    (s) => s.label.toLowerCase().includes('size') || s.label.toLowerCase().includes('사이즈') || s.label === '크기' || s.label === '규격'
  );
  return sizeSpec?.value ?? null;
}

function getPriceFromSpecs(specs: ProductSpec[]): string | null {
  const priceSpec = specs.find(
    (s) => s.label.toLowerCase().includes('price') || s.label.toLowerCase().includes('가격')
  );
  return priceSpec?.value ?? null;
}

/* ════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════ */
export default function WorksPageClient({
  category,
  products,
  images,
  specs,
}: {
  category: string;
  products: Product[];
  images: ProductImage[];
  specs: ProductSpec[];
}) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const isEmpty = category !== 'furniture';

  const getProductImages = (productId: string) =>
    images
      .filter((img) => img.product_id === productId)
      .sort((a, b) => a.sort_order - b.sort_order);

  const getProductSpecs = (productId: string) =>
    specs
      .filter((s) => s.product_id === productId)
      .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="fixed inset-0 bg-[var(--bg)] z-[300]">
      {/* ── Top bar ── */}
      <div className="sticky top-0 left-0 right-0 h-[68px] bg-black flex items-center justify-center z-10 shrink-0">
        <Link
          href="/"
          className="absolute left-4 text-white flex items-center hover:opacity-50 transition-opacity"
        >
          <svg width="28" height="28" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="13,4 7,10 13,16" />
          </svg>
        </Link>
        <Link
          href="/"
          className="text-[22px] text-white tracking-[0.12em] hover:opacity-50 transition-opacity"
          style={{ fontFamily: "var(--font-gravitas, 'Gravitas One'), serif" }}
        >
          EEL
        </Link>
        <button className="absolute top-5 right-6 bg-transparent border-none cursor-pointer text-white flex items-center p-0 hover:opacity-60 transition-opacity" aria-label="장바구니">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </button>
      </div>

      {/* ── Category tabs ── */}
      <div className="flex items-center justify-center gap-8 py-4 bg-black border-b border-[#222]">
        {['furniture', 'object', 'painting'].map((cat) => (
          <Link
            key={cat}
            href={`/products?category=${cat}`}
            className={`text-sm tracking-[0.08em] uppercase transition-opacity duration-200 ${
              category === cat ? 'text-white opacity-100' : 'text-white/50 hover:opacity-80'
            }`}
            style={{ fontFamily: "var(--font-staatliches, 'Staatliches'), sans-serif" }}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="overflow-y-auto" style={{ height: 'calc(100vh - 68px - 52px)' }}>
        {isEmpty ? (
          /* Empty state for Object / Painting */
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <p
              className="text-[28px] text-white/20 tracking-[0.06em]"
              style={{ fontFamily: "var(--font-gravitas, 'Gravitas One'), serif" }}
            >
              Coming Soon
            </p>
            <p className="text-sm text-white/30" style={{ fontFamily: "'Telex', sans-serif" }}>
              새로운 작품이 준비 중입니다
            </p>
          </div>
        ) : (
          /* Furniture grid */
          <div className="grid grid-cols-2 md:grid-cols-3 w-full" style={{ fontSize: 0, lineHeight: 0, gap: 0 }}>
            {products.map((product) => {
              const thumb = getProductImages(product.id)[0];
              if (!thumb) return null;
              return (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="overflow-hidden m-0 p-0 border-none bg-transparent cursor-pointer block"
                >
                  <Image
                    src={thumb.url}
                    alt={product.name}
                    width={600}
                    height={720}
                    className="w-full object-cover block"
                    style={{ aspectRatio: '1 / 1.2' }}
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════
          Product Detail Overlay
         ══════════════════════════════════ */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-[var(--bg)] z-[400]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 left-4 bg-transparent border-none text-[var(--text)] cursor-pointer z-10 flex items-center p-0 hover:opacity-50 transition-opacity"
            >
              <svg width="28" height="28" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="13,4 7,10 13,16" />
              </svg>
            </button>

            {/* Desktop layout: left info (fixed) + right photos (scroll) */}
            <div className="hidden md:flex h-full">
              {/* Left: product info */}
              <div className="w-2/3 h-full flex flex-col items-center justify-center gap-3 pointer-events-none px-10 text-center">
                <p
                  className="text-white tracking-[0.02em]"
                  style={{
                    fontFamily: "'Telex', sans-serif",
                    fontSize: 'clamp(16px, 2.4vw, 32px)',
                    fontWeight: 900,
                    letterSpacing: '0.02em',
                  }}
                >
                  {selectedProduct.name}
                </p>
                {getSizeFromSpecs(getProductSpecs(selectedProduct.id)) && (
                  <p
                    className="text-[#888] whitespace-nowrap"
                    style={{
                      fontFamily: "'Telex', sans-serif",
                      fontSize: 'clamp(10px, 1vw, 13px)',
                      letterSpacing: '0.06em',
                      marginTop: 4,
                    }}
                  >
                    {getSizeFromSpecs(getProductSpecs(selectedProduct.id))}
                  </p>
                )}
                {getPriceFromSpecs(getProductSpecs(selectedProduct.id)) && (
                  <p
                    className="text-[var(--text)] whitespace-nowrap"
                    style={{
                      fontFamily: "'Telex', sans-serif",
                      fontSize: 'clamp(12px, 1.1vw, 15px)',
                      letterSpacing: '0.04em',
                      marginTop: 2,
                    }}
                  >
                    {getPriceFromSpecs(getProductSpecs(selectedProduct.id))}
                  </p>
                )}
              </div>

              {/* Right: scrollable photos */}
              <div className="w-1/3 h-full overflow-y-auto flex flex-col">
                {getProductImages(selectedProduct.id).map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setZoomedImage(img.url)}
                    className="w-full block border-none bg-transparent p-0 m-0 cursor-zoom-in"
                  >
                    <Image
                      src={img.url}
                      alt={selectedProduct.name}
                      width={800}
                      height={1000}
                      className="w-full h-auto block"
                      sizes="33vw"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile layout: info on top, photos below */}
            <div className="md:hidden overflow-y-auto h-full">
              <div className="pt-20 pb-6 px-6 text-left">
                <p
                  className="text-white text-xl font-bold"
                  style={{ fontFamily: "'Telex', sans-serif" }}
                >
                  {selectedProduct.name}
                </p>
                {getSizeFromSpecs(getProductSpecs(selectedProduct.id)) && (
                  <p className="text-[#888] text-xs mt-2" style={{ fontFamily: "'Telex', sans-serif" }}>
                    {getSizeFromSpecs(getProductSpecs(selectedProduct.id))}
                  </p>
                )}
                {getPriceFromSpecs(getProductSpecs(selectedProduct.id)) && (
                  <p className="text-[var(--text)] text-sm mt-1" style={{ fontFamily: "'Telex', sans-serif" }}>
                    {getPriceFromSpecs(getProductSpecs(selectedProduct.id))}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                {getProductImages(selectedProduct.id).map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setZoomedImage(img.url)}
                    className="w-full block border-none bg-transparent p-0 m-0 cursor-zoom-in"
                  >
                    <Image
                      src={img.url}
                      alt={selectedProduct.name}
                      width={800}
                      height={1000}
                      className="w-full h-auto block"
                      sizes="100vw"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════
          Zoom Overlay
         ══════════════════════════════════ */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            className="fixed inset-0 z-[500] bg-black/90 flex items-center justify-center cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setZoomedImage(null)}
          >
            <Image
              src={zoomedImage}
              alt="Zoomed"
              width={1600}
              height={1200}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              sizes="90vw"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
