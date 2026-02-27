'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Ruler, Palette, ChevronRight } from 'lucide-react';

// =========================================
// 1. DATA
// =========================================

export type ProductId = 'table-first' | 'table-second' | 'acrylic-blue-leg' | 'cabinet-black';

interface ProductData {
  id: ProductId;
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

const PRODUCTS: ProductData[] = [
  {
    id: 'table-first',
    index: 1,
    name: 'River Flow',
    subtitle: 'Dining Table',
    description:
      '자연 그대로의 나무결과 에폭시 레진이 만나 탄생한 리버 플로우 테이블. 살아있는 나무의 유기적인 형태를 그대로 보존하며 깊고 투명한 레진이 강물처럼 흘러내립니다.',
    images: [
      '/products/table-first/1.jpg',
      '/products/table-first/2.jpg',
      '/products/table-first/3.jpg',
      '/products/table-first/4.jpg',
    ],
    colors: {
      gradient: 'from-amber-700 to-stone-900',
      glow: 'rgba(180, 120, 60, 0.2)',
      accent: '#d97706',
    },
    specs: [
      { label: 'Material', value: 'Walnut + Epoxy Resin' },
      { label: 'Size', value: '180 × 90 cm' },
      { label: 'Resin Depth', value: '12mm' },
    ],
  },
  {
    id: 'table-second',
    index: 2,
    name: 'Ocean Drift',
    subtitle: 'Dining Table',
    description:
      '심해의 빛깔을 담은 오션 드리프트. 깊고 투명한 블루 레진이 오크 원목과 어우러져 파도가 부서지는 해안선을 연상시킵니다. 공간의 중심이 되는 존재감.',
    images: [
      '/products/table-second/1.jpg',
      '/products/table-second/2.jpg',
      '/products/table-second/3.jpg',
      '/products/table-second/4.jpg',
    ],
    colors: {
      gradient: 'from-blue-700 to-slate-900',
      glow: 'rgba(59, 130, 246, 0.2)',
      accent: '#3b82f6',
    },
    specs: [
      { label: 'Material', value: 'Oak + Blue Epoxy Resin' },
      { label: 'Size', value: '200 × 95 cm' },
      { label: 'Resin Depth', value: '15mm' },
    ],
  },
  {
    id: 'acrylic-blue-leg',
    index: 3,
    name: 'Azure Edge',
    subtitle: 'Side Table',
    description:
      '투명 아크릴 레그와 레진 상판의 조합. 마치 테이블이 공중에 떠 있는 듯한 착각을 선사합니다. 미니멀한 공간에 포인트를 더하는 아이코닉한 디자인.',
    images: [
      '/products/acrylic-blue-leg/1.jpg',
      '/products/acrylic-blue-leg/2.jpg',
      '/products/acrylic-blue-leg/3.jpg',
      '/products/acrylic-blue-leg/4.jpg',
    ],
    colors: {
      gradient: 'from-cyan-600 to-indigo-900',
      glow: 'rgba(6, 182, 212, 0.2)',
      accent: '#06b6d4',
    },
    specs: [
      { label: 'Material', value: 'Acrylic Leg + Resin Top' },
      { label: 'Size', value: '60 × 60 cm' },
      { label: 'Leg Type', value: 'Clear Acrylic' },
    ],
  },
  {
    id: 'cabinet-black',
    index: 4,
    name: 'Noir Cabinet',
    subtitle: 'Storage Cabinet',
    description:
      '매트 블랙 마감과 레진 패널의 만남. 모던한 수납 공간에 아트피스의 품격을 더합니다. 깊이감 있는 블랙 레진이 빛에 따라 다양한 표정을 보여줍니다.',
    images: [
      '/products/cabinet-black/1.jpg',
      '/products/cabinet-black/2.jpg',
      '/products/cabinet-black/3.jpg',
      '/products/cabinet-black/4.jpg',
    ],
    colors: {
      gradient: 'from-zinc-700 to-black',
      glow: 'rgba(113, 113, 122, 0.2)',
      accent: '#71717a',
    },
    specs: [
      { label: 'Material', value: 'MDF + Black Resin' },
      { label: 'Size', value: '120 × 40 × 80 cm' },
      { label: 'Finish', value: 'Matte Black' },
    ],
  },
];

// =========================================
// 2. ANIMATIONS
// =========================================

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 100, damping: 20, delay: i * 0.08 },
  }),
  exit: { opacity: 0, y: -12, filter: 'blur(6px)', transition: { duration: 0.18 } },
};

const imageVariant = {
  initial: { opacity: 0, scale: 1.08, filter: 'blur(12px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
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
  <div className="flex flex-col items-center gap-5 shrink-0">
    {/* Main Image */}
    <div className="relative w-[340px] h-[340px] md:w-[460px] md:h-[460px] rounded-2xl overflow-hidden border border-white/8 bg-zinc-900/60 backdrop-blur-sm shadow-2xl">
      {/* glow */}
      <motion.div
        animate={{ background: `radial-gradient(circle at 50% 80%, ${product.colors.glow}, transparent 70%)` }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      />
      <AnimatePresence mode="wait">
        <motion.img
          key={`${product.id}-${activePhoto}`}
          src={product.images[activePhoto]}
          alt={product.name}
          variants={imageVariant}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative z-10 w-full h-full object-cover"
          draggable={false}
        />
      </AnimatePresence>

      {/* Photo counter */}
      <div className="absolute bottom-3 right-3 z-20 text-[11px] font-mono text-white/40 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
        {activePhoto + 1} / {product.images.length}
      </div>
    </div>

    {/* Thumbnail Row */}
    <div className="flex gap-3">
      {product.images.map((src, i) => (
        <motion.button
          key={i}
          onClick={() => onPhotoChange(i)}
          whileTap={{ scale: 0.93 }}
          className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
            activePhoto === i ? 'border-white/60' : 'border-white/10 hover:border-white/30'
          }`}
        >
          <img src={src} alt="" className="w-full h-full object-cover" />
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
    <motion.div
      key={product.id}
      className="flex flex-col items-start max-w-sm"
    >
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

      {/* Specs */}
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

      {/* CTA */}
      <motion.button
        custom={4} variants={fadeUp} initial="hidden" animate="visible" exit="exit"
        onClick={onBuild}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all group"
      >
        직접 만들어보기
        <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </motion.div>
  </AnimatePresence>
);

const NumberSwitcher = ({
  products,
  activeId,
  onSelect,
}: {
  products: ProductData[];
  activeId: ProductId;
  onSelect: (id: ProductId) => void;
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
  const [activeId, setActiveId] = useState<ProductId>('table-first');
  const [activePhoto, setActivePhoto] = useState(0);

  const product = PRODUCTS.find((p) => p.id === activeId)!;

  const handleSelect = (id: ProductId) => {
    setActiveId(id);
    setActivePhoto(0);
  };

  return (
    <section className="relative min-h-screen w-full bg-black text-zinc-100 overflow-hidden flex flex-col items-center justify-center selection:bg-zinc-800">
      <Background product={product} />

      {/* Brand label */}
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
          <ProductGallery
            product={product}
            activePhoto={activePhoto}
            onPhotoChange={setActivePhoto}
          />
          <ProductInfo product={product} onBuild={onBuildClick} />
        </motion.div>
      </main>

      <NumberSwitcher products={PRODUCTS} activeId={activeId} onSelect={handleSelect} />
    </section>
  );
}
