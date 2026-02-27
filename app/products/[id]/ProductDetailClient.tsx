'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Layers, Ruler, Palette } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  glow: string;
  accent: string;
  gradient: string;
}

interface ProductImage {
  id: string;
  url: string;
  sort_order: number;
}

interface ProductSpec {
  id: string;
  label: string;
  value: string;
  sort_order: number;
}

const imageVariant = {
  initial: { opacity: 0, scale: 1.05, filter: 'blur(8px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
  exit:    { opacity: 0, scale: 0.96, filter: 'blur(6px)', transition: { duration: 0.2 } },
};

export default function ProductDetailClient({
  product,
  images,
  specs,
}: {
  product: Product;
  images: ProductImage[];
  specs: ProductSpec[];
}) {
  const [activePhoto, setActivePhoto] = useState(0);

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-16">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 30% 40%, ${product.glow}, transparent 60%)`,
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ChevronLeft size={16} /> 홈으로
          </Link>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Gallery */}
          <div className="w-full lg:w-auto flex flex-col items-center gap-5 shrink-0">
            <div className="relative w-full max-w-[340px] sm:max-w-[460px] aspect-square rounded-2xl overflow-hidden border border-white/8 bg-zinc-900/60 backdrop-blur-sm shadow-2xl mx-auto">
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: `radial-gradient(circle at 50% 80%, ${product.glow}, transparent 70%)`,
                }}
              />
              <AnimatePresence mode="wait">
                {images[activePhoto] && (
                  <motion.div
                    key={activePhoto}
                    variants={imageVariant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="relative z-10 w-full h-full"
                  >
                    <Image
                      src={images[activePhoto].url}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 340px, 460px"
                      className="object-cover"
                      priority={activePhoto === 0}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute bottom-3 right-3 z-20 text-[11px] font-mono text-white/40 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
                {activePhoto + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 flex-wrap justify-center">
                {images.map((img, i) => (
                  <motion.button
                    key={img.id}
                    onClick={() => setActivePhoto(i)}
                    whileTap={{ scale: 0.93 }}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      activePhoto === i ? 'border-white/60' : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <Image src={img.url} alt="" fill sizes="64px" className="object-cover" />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 max-w-md">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
              style={{ color: product.accent }}
            >
              {product.subtitle}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500"
            >
              {product.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-zinc-400 text-sm leading-relaxed mb-8"
            >
              {product.description}
            </motion.p>

            {/* Specs */}
            {specs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-zinc-900/50 rounded-2xl border border-white/5 backdrop-blur-sm p-5 mb-8 space-y-3"
              >
                {specs.map((spec) => (
                  <div key={spec.id} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-zinc-500">
                      {spec.label === 'Material' && <Layers size={13} />}
                      {spec.label === 'Size' && <Ruler size={13} />}
                      {!['Material', 'Size'].includes(spec.label) && <Palette size={13} />}
                      {spec.label}
                    </span>
                    <span className="font-mono text-xs text-zinc-300">{spec.value}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/#build"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-black bg-white hover:bg-zinc-100 transition-colors"
              >
                직접 만들어보기
              </Link>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-white/8 hover:bg-white/12 border border-white/10 transition-colors"
              >
                다른 제품 보기
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
