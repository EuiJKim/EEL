'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
  return (
    <div className="relative min-h-screen bg-black text-zinc-100">
      <div className="relative max-w-5xl mx-auto px-6 pt-28 pb-24">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600 mb-3">
            Collection
          </p>
          <h1 className="font-display-kr text-[1.75rem] font-semibold tracking-tight text-white">
            Works
          </h1>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => {
            const firstImage = images
              .filter((img) => img.product_id === product.id)
              .sort((a, b) => a.sort_order - b.sort_order)[0];

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.06,
                }}
              >
                <Link href={`/products/${product.id}`} className="group block">
                  {/* Image */}
                  <div className="relative aspect-[4/3] rounded-[14px] overflow-hidden border border-white/[0.07] mb-4 bg-zinc-900">
                    {firstImage && (
                      <Image
                        src={firstImage.url}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        priority={i === 0}
                        loading={i === 0 ? 'eager' : undefined}
                      />
                    )}
                  </div>

                  {/* Label + Name */}
                  <div className="px-0.5">
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5"
                      style={{ color: product.accent }}
                    >
                      {product.subtitle}
                    </p>
                    <h2 className="text-[1rem] font-semibold text-white group-hover:text-zinc-300 transition-colors duration-150">
                      {product.name}
                    </h2>
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
