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

function getStatusFromSpecs(specs: ProductSpec[]): string | null {
  const statusSpec = specs.find((s) => s.label.toLowerCase() === 'status');
  return statusSpec?.value ?? null;
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
  const [zoomedImages, setZoomedImages] = useState<string[] | null>(null);
  const [zoomedIndex, setZoomedIndex] = useState(0);
  const [cartTooltip, setCartTooltip] = useState(false);

  const openZoom = (urls: string[], index: number) => {
    setZoomedImages(urls);
    setZoomedIndex(index);
  };
  const closeZoom = () => setZoomedImages(null);
  const handleCartClick = () => {
    setCartTooltip(true);
    setTimeout(() => setCartTooltip(false), 1000);
  };

  const isObject = category === 'objet';
  const isPainting = category === 'painting';
  const isEmpty = false;

  const getProductImages = (productId: string) =>
    images
      .filter((img) => img.product_id === productId)
      .sort((a, b) => a.sort_order - b.sort_order);

  const getDetailImages = (productId: string) => {
    const all = getProductImages(productId);
    return all.length > 1 ? all.slice(1) : all;
  };

  const getProductSpecs = (productId: string) =>
    specs
      .filter((s) => s.product_id === productId)
      .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <motion.div
      className="fixed inset-0 bg-[var(--bg)] z-[300]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
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
        <div className="absolute top-4 right-6 flex flex-col items-end gap-1">
          <button onClick={handleCartClick} className="bg-transparent border-none cursor-pointer text-white flex items-center p-0 hover:opacity-60 transition-opacity" aria-label="장바구니">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </button>
          <span
            className="text-[10px] text-white tracking-[0.04em] transition-opacity duration-200"
            style={{ opacity: cartTooltip ? 1 : 0, fontFamily: "'Telex', sans-serif" }}
          >
            soon….
          </span>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="w-full bg-white/15" style={{ height: '0.5px' }} />

      {/* ── Category tabs ── */}
      <div className="flex items-center justify-center gap-8 bg-black border-b border-[#222]">
        {['furniture', 'objet', 'painting'].map((cat) => (
          <Link
            key={cat}
            href={`/products?category=${cat}`}
            className={`text-sm tracking-[0.08em] uppercase transition-opacity duration-200 min-h-[44px] flex items-center px-3 ${
              category === cat ? 'text-white opacity-100' : 'text-white/50 hover:opacity-80'
            }`}
            style={{ fontFamily: "var(--font-staatliches, 'Staatliches'), sans-serif" }}
          >
            {cat === 'object' ? 'objet' : cat}
          </Link>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="overflow-y-auto" style={{ height: 'calc(100vh - 68px - 52px)' }}>
        {isPainting ? (
          /* Painting: 4-column grid, fixed aspect ratio, click to zoom */
          <div className="grid grid-cols-2 md:grid-cols-4 w-full" style={{ fontSize: 0, lineHeight: 0, gap: 0 }}>
            {products
              .filter((p) => p.id.startsWith('painting-'))
              .map((product) => {
                const thumb = getProductImages(product.id)[0];
                if (!thumb) return null;
                return (
                  <button
                    key={product.id}
                    onClick={() => openZoom(getProductImages(product.id).map(img => img.url), 0)}
                    className="overflow-hidden m-0 p-0 border-none bg-transparent cursor-pointer block"
                  >
                    <Image
                      src={thumb.url}
                      alt=""
                      width={600}
                      height={600}
                      className="w-full object-cover block"
                      style={{ aspectRatio: '1 / 1' }}
                      sizes="25vw"
                    />
                  </button>
                );
              })}
          </div>
        ) : isObject ? (
          /* Object: 5-column grid, smaller images */
          <div className="grid grid-cols-3 md:grid-cols-5 w-full" style={{ fontSize: 0, lineHeight: 0, gap: 0 }}>
            {products
              .filter((p) => p.id.startsWith('object-'))
              .map((product) => {
                const thumb = getProductImages(product.id)[0];
                if (!thumb) return null;
                return (
                  <button
                    key={product.id}
                    onClick={() => openZoom(getProductImages(product.id).map(img => img.url), 0)}
                    className="overflow-hidden m-0 p-0 border-none bg-transparent cursor-pointer block"
                  >
                    <Image
                      src={thumb.url}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full object-cover block"
                      style={{ aspectRatio: '1 / 1.15' }}
                      sizes="20vw"
                    />
                  </button>
                );
              })}
          </div>
        ) : (
          /* Furniture: 2~3 column grid */
          <div className="grid grid-cols-2 md:grid-cols-3 w-full" style={{ fontSize: 0, lineHeight: 0, gap: 0 }}>
            {products
              .filter((p) => !p.id.startsWith('object-') && !p.id.startsWith('painting-'))
              .map((product) => {
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

            {/* All screens: left info + right scrollable photos */}
            <div className="flex h-full">
              {/* Left: product info */}
              <div className="w-1/2 md:w-2/3 h-full flex flex-col items-center justify-center gap-2 md:gap-3 pointer-events-none px-4 md:px-10 text-center">
                <p
                  className="text-white tracking-[0.02em]"
                  style={{
                    fontFamily: "'Telex', sans-serif",
                    fontSize: 'clamp(14px, 2.4vw, 32px)',
                    fontWeight: 900,
                    letterSpacing: '0.02em',
                  }}
                >
                  {selectedProduct.name}
                </p>
                {getSizeFromSpecs(getProductSpecs(selectedProduct.id)) && (
                  <p
                    className="text-[#888]"
                    style={{
                      fontFamily: "'Telex', sans-serif",
                      fontSize: 'clamp(9px, 1vw, 13px)',
                      letterSpacing: '0.06em',
                      marginTop: 4,
                      whiteSpace: 'pre',
                    }}
                  >
                    {getSizeFromSpecs(getProductSpecs(selectedProduct.id))}
                  </p>
                )}
                {getPriceFromSpecs(getProductSpecs(selectedProduct.id)) && (
                  <p
                    className="text-[var(--text)]"
                    style={{
                      fontFamily: "'Telex', sans-serif",
                      fontSize: 'clamp(10px, 1.1vw, 15px)',
                      letterSpacing: '0.04em',
                      marginTop: 2,
                    }}
                  >
                    {getPriceFromSpecs(getProductSpecs(selectedProduct.id))}
                  </p>
                )}
                {getStatusFromSpecs(getProductSpecs(selectedProduct.id)) && (
                  <p
                    style={{
                      fontFamily: "var(--font-staatliches, 'Staatliches'), sans-serif",
                      fontSize: 'clamp(9px, 0.95vw, 12px)',
                      letterSpacing: '0.18em',
                      marginTop: 4,
                      color: '#e53e3e',
                    }}
                  >
                    {getStatusFromSpecs(getProductSpecs(selectedProduct.id))}
                  </p>
                )}
                <Link
                  href="/order"
                  className="pointer-events-auto inline-block mt-6 px-6 py-3 border border-white/30 text-white/90 text-xs tracking-[0.12em] uppercase hover:bg-white hover:text-black transition-colors duration-300"
                  style={{ fontFamily: "var(--font-staatliches, 'Staatliches'), sans-serif" }}
                >
                  {getStatusFromSpecs(getProductSpecs(selectedProduct.id))?.toLowerCase().includes('sold')
                    ? 'Commission a similar piece'
                    : 'Inquire about this piece'}
                </Link>
              </div>

              {/* Right: scrollable photos */}
              <div className="w-1/2 md:w-1/3 h-full overflow-y-auto flex flex-col">
                {getDetailImages(selectedProduct.id).map((img, i) => {
                  const allUrls = getDetailImages(selectedProduct.id).map(d => d.url);
                  return (
                    <button
                      key={img.id}
                      onClick={() => openZoom(allUrls, i)}
                      className="w-full block border-none bg-transparent p-0 m-0 cursor-zoom-in"
                    >
                      <Image
                        src={img.url}
                        alt={selectedProduct.name}
                        width={800}
                        height={1000}
                        className="w-full h-auto block"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════
          Zoom Overlay
         ══════════════════════════════════ */}
      <AnimatePresence>
        {zoomedImages && (
          <motion.div
            className="fixed inset-0 z-[500] bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeZoom}
          >
            {/* Close */}
            <button
              onClick={(e) => { e.stopPropagation(); closeZoom(); }}
              className="absolute top-5 right-6 bg-transparent border-none text-white cursor-pointer z-10 p-0 hover:opacity-50 transition-opacity"
              aria-label="닫기"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Image + arrows */}
            <div className="relative flex items-center" onClick={(e) => e.stopPropagation()}>
              {/* Prev arrow */}
              <div className="w-10 flex justify-center">
                {zoomedIndex > 0 && (
                  <button
                    onClick={() => setZoomedIndex(zoomedIndex - 1)}
                    className="bg-transparent border-none text-white cursor-pointer p-1 hover:opacity-50 transition-opacity"
                    aria-label="이전"
                  >
                    <svg width="28" height="28" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="13,4 7,10 13,16" />
                    </svg>
                  </button>
                )}
              </div>

              <Image
                key={zoomedIndex}
                src={zoomedImages[zoomedIndex]}
                alt="Zoomed"
                width={1200}
                height={1200}
                className="object-contain"
                style={{ maxHeight: '90vh', maxWidth: 'calc(90vw - 80px)', width: 'auto' }}
                sizes="90vw"
              />

              {/* Next arrow */}
              <div className="w-10 flex justify-center">
                {zoomedIndex < zoomedImages.length - 1 && (
                  <button
                    onClick={() => setZoomedIndex(zoomedIndex + 1)}
                    className="bg-transparent border-none text-white cursor-pointer p-1 hover:opacity-50 transition-opacity"
                    aria-label="다음"
                  >
                    <svg width="28" height="28" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="7,4 13,10 7,16" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
