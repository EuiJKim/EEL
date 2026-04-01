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

export default function ProductsCatalogClient({
  products,
  images,
}: {
  products: Product[];
  images: ProductImage[];
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = products[activeIdx];
  const activeImages = images
    .filter((img) => img.product_id === active?.id)
    .sort((a, b) => a.sort_order - b.sort_order);

  if (!active) return null;

  return (
    <div className="flex h-screen">
      {/* Center: selected product content (scrollable) */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-6 lg:px-10 pt-16 lg:pt-8 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero image */}
            {activeImages[0] && (
              <div className="relative w-full aspect-[16/10] mb-6">
                <Image
                  src={activeImages[0].url}
                  alt={active.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="70vw"
                />
              </div>
            )}

            {/* Info row */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 mb-10">
              <div className="lg:w-1/3">
                <h1 className="text-[13px] font-semibold tracking-[0.05em] text-white mb-2">
                  {active.name}
                </h1>
                <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-500 mb-3">
                  {active.subtitle}
                </p>
                <Link
                  href={`/order?resinHint=${encodeURIComponent(active.accent)}`}
                  className="inline-block text-[9px] tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors border-b border-zinc-700 hover:border-white pb-0.5"
                >
                  직접 만들어보기 →
                </Link>
              </div>
              <div className="lg:w-2/3">
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  {active.description}
                </p>
              </div>
            </div>

            {/* Gallery grid */}
            {activeImages.length > 1 && (
              <div className="columns-1 sm:columns-2 gap-3 space-y-3">
                {activeImages.slice(1).map((img) => (
                  <div key={img.id} className="break-inside-avoid">
                    <Image
                      src={img.url}
                      alt={active.name}
                      width={1200}
                      height={900}
                      sizes="(max-width: 640px) 100vw, 35vw"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right sidebar: thumbnails (desktop only) */}
      <aside className="hidden lg:block w-[15%] min-w-[140px] max-w-[200px] h-screen overflow-y-auto hide-scrollbar border-l border-white/[0.04] py-8 px-3">
        <div className="flex flex-col gap-5">
          {products.map((product, i) => {
            const thumb = images
              .filter((img) => img.product_id === product.id)
              .sort((a, b) => a.sort_order - b.sort_order)[0];
            const isActive = i === activeIdx;

            return (
              <button
                key={product.id}
                onClick={() => setActiveIdx(i)}
                className={`relative overflow-hidden transition-opacity duration-200 ${
                  isActive ? 'opacity-100 ring-1 ring-white/20' : 'opacity-50 hover:opacity-80'
                }`}
              >
                {thumb && (
                  <Image
                    src={thumb.url}
                    alt={product.name}
                    width={200}
                    height={140}
                    sizes="200px"
                    className="w-full h-auto object-cover"
                  />
                )}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Mobile: bottom product selector */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/[0.06] px-4 py-3">
        <div className="flex gap-2 overflow-x-auto">
          {products.map((product, i) => {
            const thumb = images
              .filter((img) => img.product_id === product.id)
              .sort((a, b) => a.sort_order - b.sort_order)[0];
            const isActive = i === activeIdx;

            return (
              <button
                key={product.id}
                onClick={() => setActiveIdx(i)}
                className={`relative w-16 h-12 shrink-0 overflow-hidden rounded transition-opacity ${
                  isActive ? 'opacity-100 ring-1 ring-white/30' : 'opacity-40'
                }`}
              >
                {thumb && (
                  <Image
                    src={thumb.url}
                    alt={product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
