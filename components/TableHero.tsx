'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Ruler, Palette, ChevronRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const MotionImage = motion(Image);

// =========================================
// 1. TYPES
// =========================================

interface ProductData {
  id: string;
  index: number;
  name: string;
  subtitle: string;
  description: string;
  images: string[];
  colors: {
    gradient: string;
    glow: string;
    accent: string;
  };
  specs: { label: string; value: string }[];
}

// =========================================
// 2. ANIMATIONS
// =========================================

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 100, damping: 20, delay: i * 0.08 },
  }),
  exit: { opacity: 0, y: -12, filter: 'blur(6px)', transition: { duration: 0.18 } },
};

const imageVariant = {
  initial: { opacity: 0, scale: 1.08, filter: 'blur(12px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  exit:    { opacity: 0, scale: 0.94, filter: 'blur(8px)', transition: { duration: 0.25 } },
};

// =========================================
// 3. SUB-COMPONENTS
// =========================================

const Background = ({ product }: { product: ProductData }) => (
  <div className="fixed inset-0 pointer-events-none">
    <motion.div
      animate={{ background: `radial-gradient(ellipse at 30% 50%, ${product.colors.glow}, transparent 60%)` }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
    />
  </div>
);

const ProductGallery = ({
  product,
  activePhoto,
  onPhotoChange,
}: {
  product: ProductData;
  activePhoto: number;
  onPhotoChange: (i: number) => void;
}) => (
  <div className="flex flex-col items-center gap-5 shrink-0 w-full sm:w-auto">
    <div className="relative w-full max-w-[340px] sm:max-w-[460px] aspect-square rounded-2xl overflow-hidden border border-white/8 bg-zinc-900/60 backdrop-blur-sm shadow-2xl mx-auto">
      <motion.div
        animate={{ background: `radial-gradient(circle at 50% 80%, ${product.colors.glow}, transparent 70%)` }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      />
      <AnimatePresence mode="wait">
        <MotionImage
          key={`${product.id}-${activePhoto}`}
          src={product.images[activePhoto]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 340px, 460px"
          className="relative z-10 object-cover"
          variants={imageVariant}
          initial="initial"
          animate="animate"
          exit="exit"
          draggable={false}
          priority={activePhoto === 0}
        />
      </AnimatePresence>
      <div className="absolute bottom-3 right-3 z-20 text-[11px] font-mono text-white/40 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
        {activePhoto + 1} / {product.images.length}
      </div>
    </div>
    <div className="flex gap-3 flex-wrap justify-center">
      {product.images.map((src, i) => (
        <motion.button
          key={i}
          onClick={() => onPhotoChange(i)}
          whileTap={{ scale: 0.93 }}
          className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
            activePhoto === i ? 'border-white/60' : 'border-white/10 hover:border-white/30'
          }`}
        >
          <Image src={src} alt="" fill sizes="64px" className="object-cover" />
          {activePhoto === i && (
            <motion.div
              layoutId="thumb-active"
              className="absolute inset-0 bg-white/10"
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  </div>
);

const ProductInfo = ({ product, onBuild }: { product: ProductData; onBuild: () => void }) => (
  <AnimatePresence mode="wait">
    <motion.div key={product.id} className="flex flex-col items-start max-w-sm w-full sm:w-auto">
      <motion.p custom={0} variants={fadeUp} initial="hidden" animate="visible" exit="exit"
        className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
        style={{ color: product.colors.accent }}
      >
        {product.subtitle}
      </motion.p>
      <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" exit="exit"
        className="text-4xl md:text-5xl font-bold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500"
      >
        {product.name}
      </motion.h1>
      <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" exit="exit"
        className="text-zinc-400 leading-relaxed mb-7 text-sm"
      >
        {product.description}
      </motion.p>
      <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" exit="exit"
        className="w-full bg-zinc-900/50 rounded-2xl border border-white/5 backdrop-blur-sm p-5 mb-6 space-y-3"
      >
        {product.specs.map((spec) => (
          <div key={spec.label} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-zinc-500">
              {spec.label === 'Material' && <Layers size={13} />}
              {spec.label === 'Size' && <Ruler size={13} />}
              {(spec.label === 'Resin Depth' || spec.label === 'Leg Type' || spec.label === 'Finish') && <Palette size={13} />}
              {spec.label}
            </span>
            <span className="font-mono text-xs text-zinc-300">{spec.value}</span>
          </div>
        ))}
      </motion.div>
      <div className="flex items-center gap-3 flex-wrap">
        <motion.button
          custom={4} variants={fadeUp} initial="hidden" animate="visible" exit="exit"
          onClick={onBuild}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-black bg-white hover:bg-zinc-100 transition-all"
        >
          직접 만들어보기
          <ChevronRight size={15} />
        </motion.button>
        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" exit="exit">
          <Link
            href={`/products/${product.id}`}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all group"
          >
            자세히 보기
            <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  </AnimatePresence>
);

const NumberSwitcher = ({
  products,
  activeId,
  onSelect,
}: {
  products: ProductData[];
  activeId: string;
  onSelect: (id: string) => void;
}) => (
  <div className="fixed bottom-10 inset-x-0 flex justify-center z-50 pointer-events-none">
    <motion.div
      layout
      className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-zinc-900/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
    >
      {products.map((p) => (
        <motion.button
          key={p.id}
          onClick={() => onSelect(p.id)}
          whileTap={{ scale: 0.92 }}
          className="relative w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold focus:outline-none"
        >
          {activeId === p.id && (
            <motion.div
              layoutId="switcher-bg"
              className="absolute inset-0 rounded-full bg-white/12"
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            />
          )}
          <span className={`relative z-10 transition-colors duration-200 ${activeId === p.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
            {p.index}
          </span>
          {activeId === p.id && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -bottom-0.5 h-[3px] w-4 rounded-full bg-white/50"
            />
          )}
        </motion.button>
      ))}
    </motion.div>
  </div>
);

// =========================================
// 4. MAIN
// =========================================

export default function TableHero({ onBuildClick }: { onBuildClick: () => void }) {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      const supabase = createClient();

      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .order('index');

      if (!productsData) return;

      const { data: imagesData } = await supabase
        .from('product_images')
        .select('*')
        .order('sort_order');

      const { data: specsData } = await supabase
        .from('product_specs')
        .select('*')
        .order('sort_order');

      const mapped: ProductData[] = productsData.map((p) => ({
        id: p.id,
        index: p.index,
        name: p.name,
        subtitle: p.subtitle,
        description: p.description,
        images: (imagesData ?? [])
          .filter((img) => img.product_id === p.id)
          .map((img) => img.url),
        colors: {
          gradient: p.gradient,
          glow: p.glow,
          accent: p.accent,
        },
        specs: (specsData ?? [])
          .filter((spec) => spec.product_id === p.id)
          .map((spec) => ({ label: spec.label, value: spec.value })),
      }));

      setProducts(mapped);
      setActiveId(mapped[0]?.id ?? '');
    }

    fetchProducts();
  }, []);

  const product = products.find((p) => p.id === activeId);

  const handleSelect = (id: string) => {
    setActiveId(id);
    setActivePhoto(0);
  };

  if (!product) return null;

  return (
    <section className="relative min-h-screen w-full bg-black text-zinc-100 overflow-hidden flex flex-col items-center justify-center selection:bg-zinc-800">
      <Background product={product} />
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-xs font-bold uppercase tracking-[0.35em] text-zinc-600"
      >
        EEL Studio
      </motion.div>
      <main className="relative z-10 w-full px-6 py-16 max-w-7xl mx-auto">
        <motion.div
          layout
          transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 lg:gap-32 w-full"
        >
          <ProductGallery product={product} activePhoto={activePhoto} onPhotoChange={setActivePhoto} />
          <ProductInfo product={product} onBuild={onBuildClick} />
        </motion.div>
      </main>
      <NumberSwitcher products={products} activeId={activeId} onSelect={handleSelect} />
    </section>
  );
}
