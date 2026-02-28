'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

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

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 100, damping: 20, delay: i * 0.08 },
  }),
};

export default function ProductsCatalogClient({
  products,
  images,
}: {
  products: Product[];
  images: ProductImage[];
}) {
  return (
    <div className="relative min-h-screen bg-black text-zinc-100">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(60,60,60,0.3), transparent 60%)',
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 pt-28 pb-20">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500 mb-3">Collection</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
            제품 목록
          </h1>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, i) => {
            const firstImage = images
              .filter((img) => img.product_id === product.id)
              .sort((a, b) => a.sort_order - b.sort_order)[0];

            return (
              <motion.div
                key={product.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <Link href={`/products/${product.id}`} className="group block">
                  {/* Image area */}
                  <div
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/8 mb-4"
                    style={{ background: `radial-gradient(ellipse at 50% 80%, ${product.glow}, rgba(20,20,20,1) 70%)` }}
                  >
                    {firstImage && (
                      <Image
                        src={firstImage.url}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    )}
                  </div>

                  {/* Card body */}
                  <div className="px-1">
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1"
                      style={{ color: product.accent }}
                    >
                      {product.subtitle}
                    </p>
                    <h2 className="text-lg font-semibold text-white mb-1.5 group-hover:text-zinc-200 transition-colors">
                      {product.name}
                    </h2>
                    <p className="text-sm text-zinc-500 line-clamp-2 mb-3 leading-relaxed">
                      {product.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm text-zinc-400 group-hover:text-white transition-colors">
                      자세히 보기
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
