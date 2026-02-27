'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, ShoppingBag } from 'lucide-react';

// =========================================
// 1. DATA
// =========================================

const STEPS = ['사이즈', '레진 색상', '우드 종류', '다리 스타일', '주문'];

const SIZE_OPTIONS = [
  { id: 's', label: 'Small', size: '120 × 70 cm', desc: '2인용 • 소형 공간에 적합', price: 1200000 },
  { id: 'm', label: 'Medium', size: '160 × 85 cm', desc: '4인용 • 표준 다이닝', price: 1800000 },
  { id: 'l', label: 'Large', size: '200 × 100 cm', desc: '6인용 • 넓은 거실 / 홈 오피스', price: 2400000 },
  { id: 'xl', label: 'X-Large', size: '240 × 110 cm', desc: '8인용 • 프리미엄 대형', price: 3200000 },
];

const RESIN_OPTIONS = [
  { id: 'ocean-blue', label: 'Ocean Blue', hex: '#1e4d8c', desc: '깊고 투명한 심해의 블루' },
  { id: 'forest-green', label: 'Forest Green', hex: '#1a4a2e', desc: '자연 그대로의 녹색 숲' },
  { id: 'amber-gold', label: 'Amber Gold', hex: '#b45309', desc: '따뜻한 호박색 빛', },
  { id: 'midnight', label: 'Midnight Black', hex: '#0f0f14', desc: '깊이감 있는 매트 블랙' },
  { id: 'arctic', label: 'Arctic White', hex: '#e8e8f0', desc: '순백의 북극 얼음' },
  { id: 'sunset', label: 'Sunset Red', hex: '#7c1e1e', desc: '붉은 노을의 따뜻함' },
];

const WOOD_OPTIONS = [
  { id: 'walnut', label: 'Walnut', desc: '짙은 갈색 결, 고급스러운 분위기', color: '#4a2c1a' },
  { id: 'oak', label: 'White Oak', desc: '밝은 크림색 결, 따뜻하고 자연스러움', color: '#c9a97a' },
  { id: 'ash', label: 'Ash Wood', desc: '회색빛 흰색 결, 모던하고 심플함', color: '#a89880' },
  { id: 'pine', label: 'Black Pine', desc: '짙은 흑색 결, 강렬한 존재감', color: '#2a1f1a' },
];

const LEG_OPTIONS = [
  { id: 'steel-black', label: 'Steel Black', desc: '매트 블랙 메탈 — 인더스트리얼', color: '#1c1c1c' },
  { id: 'steel-gold', label: 'Brushed Gold', desc: '브러시드 골드 — 럭셔리', color: '#b8952a' },
  { id: 'walnut-leg', label: 'Walnut Wood', desc: '원목 월넛 레그 — 내추럴', color: '#4a2c1a' },
  { id: 'acrylic', label: 'Clear Acrylic', desc: '투명 아크릴 — 플로팅 효과', color: '#a0d8f0' },
];

interface Selection {
  size: string;
  resin: string;
  wood: string;
  leg: string;
}

// =========================================
// 2. HELPERS
// =========================================

const PRICE_ADDITIONS: Record<string, number> = {
  walnut: 200000,
  pine: 150000,
  'steel-gold': 100000,
  acrylic: 80000,
};

function calcPrice(sel: Partial<Selection>): number {
  const base = SIZE_OPTIONS.find((s) => s.id === sel.size)?.price ?? 0;
  const extra = Object.entries(PRICE_ADDITIONS).reduce(
    (acc, [key, val]) => (Object.values(sel).includes(key) ? acc + val : acc),
    0
  );
  return base + extra;
}

function formatKRW(n: number) {
  return n.toLocaleString('ko-KR') + '원';
}

// =========================================
// 3. OPTION CARDS
// =========================================

function SizeStep({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {SIZE_OPTIONS.map((opt) => (
        <motion.button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          whileTap={{ scale: 0.97 }}
          className={`relative p-4 rounded-xl border text-left transition-all ${
            value === opt.id
              ? 'border-white/30 bg-white/8'
              : 'border-white/8 bg-zinc-900/50 hover:border-white/15'
          }`}
        >
          {value === opt.id && (
            <motion.div layoutId="size-sel" className="absolute inset-0 rounded-xl bg-white/5" transition={{ type: 'spring', stiffness: 300, damping: 28 }} />
          )}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm text-white">{opt.label}</span>
              {value === opt.id && <Check size={13} className="text-white/70" />}
            </div>
            <div className="text-xs text-zinc-400 font-mono mb-1">{opt.size}</div>
            <div className="text-[11px] text-zinc-600">{opt.desc}</div>
            <div className="mt-2 text-xs font-semibold" style={{ color: '#d4a853' }}>
              {formatKRW(opt.price)}~
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

function ResinStep({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      {RESIN_OPTIONS.map((opt) => (
        <motion.button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          whileTap={{ scale: 0.96 }}
          className={`relative p-3 rounded-xl border text-left transition-all ${
            value === opt.id ? 'border-white/30 bg-white/8' : 'border-white/8 bg-zinc-900/50 hover:border-white/15'
          }`}
        >
          <div
            className="w-full h-12 rounded-lg mb-2 border border-white/10"
            style={{ background: opt.hex }}
          />
          <div className="text-xs font-semibold text-white mb-0.5">{opt.label}</div>
          <div className="text-[10px] text-zinc-500 leading-tight">{opt.desc}</div>
          {value === opt.id && (
            <div className="absolute top-2 right-2">
              <Check size={12} className="text-white/70" />
            </div>
          )}
        </motion.button>
      ))}
    </div>
  );
}

function WoodStep({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {WOOD_OPTIONS.map((opt) => (
        <motion.button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          whileTap={{ scale: 0.97 }}
          className={`relative p-4 rounded-xl border text-left transition-all ${
            value === opt.id ? 'border-white/30 bg-white/8' : 'border-white/8 bg-zinc-900/50 hover:border-white/15'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-8 h-8 rounded-lg border border-white/10 shrink-0"
              style={{ background: opt.color }}
            />
            <div>
              <div className="text-sm font-semibold text-white">{opt.label}</div>
              {value === opt.id && <Check size={12} className="text-white/60 inline" />}
            </div>
          </div>
          <div className="text-[11px] text-zinc-500">{opt.desc}</div>
          {opt.id === 'walnut' && (
            <div className="mt-1.5 text-[10px] font-semibold text-amber-500/80">+200,000원</div>
          )}
          {opt.id === 'pine' && (
            <div className="mt-1.5 text-[10px] font-semibold text-amber-500/80">+150,000원</div>
          )}
        </motion.button>
      ))}
    </div>
  );
}

function LegStep({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {LEG_OPTIONS.map((opt) => (
        <motion.button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          whileTap={{ scale: 0.97 }}
          className={`relative p-4 rounded-xl border text-left transition-all ${
            value === opt.id ? 'border-white/30 bg-white/8' : 'border-white/8 bg-zinc-900/50 hover:border-white/15'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-8 h-8 rounded-lg border border-white/10 shrink-0"
              style={{ background: opt.color }}
            />
            <div>
              <div className="text-sm font-semibold text-white">{opt.label}</div>
              {value === opt.id && <Check size={12} className="text-white/60 inline" />}
            </div>
          </div>
          <div className="text-[11px] text-zinc-500">{opt.desc}</div>
          {opt.id === 'steel-gold' && (
            <div className="mt-1.5 text-[10px] font-semibold text-amber-500/80">+100,000원</div>
          )}
          {opt.id === 'acrylic' && (
            <div className="mt-1.5 text-[10px] font-semibold text-amber-500/80">+80,000원</div>
          )}
        </motion.button>
      ))}
    </div>
  );
}

function OrderStep({ sel }: { sel: Partial<Selection> }) {
  const size = SIZE_OPTIONS.find((s) => s.id === sel.size);
  const resin = RESIN_OPTIONS.find((r) => r.id === sel.resin);
  const wood = WOOD_OPTIONS.find((w) => w.id === sel.wood);
  const leg = LEG_OPTIONS.find((l) => l.id === sel.leg);
  const total = calcPrice(sel);

  const rows = [
    { label: '사이즈', value: size ? `${size.label} (${size.size})` : '-' },
    { label: '레진 색상', value: resin?.label ?? '-' },
    { label: '우드 종류', value: wood?.label ?? '-' },
    { label: '다리 스타일', value: leg?.label ?? '-' },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="bg-zinc-900/50 rounded-xl border border-white/8 p-5 space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">{row.label}</span>
            <span className="text-zinc-200 font-medium">{row.value}</span>
          </div>
        ))}
        <div className="border-t border-white/8 pt-3 flex items-center justify-between">
          <span className="text-zinc-400 font-semibold">예상 금액</span>
          <span className="text-white text-lg font-bold">{formatKRW(total)}</span>
        </div>
      </div>

      <p className="text-[11px] text-zinc-600 leading-relaxed">
        * 모든 제품은 수작업 제작되며 주문 확정 후 6~10주 소요됩니다. 최종 가격은 상담 후 확정됩니다.
      </p>

      <motion.button
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-100 transition-colors"
      >
        <ShoppingBag size={16} />
        주문 문의하기
      </motion.button>
    </div>
  );
}

// =========================================
// 4. MAIN
// =========================================

export default function BTOBuilder() {
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState<Partial<Selection>>({});

  const update = (key: keyof Selection, val: string) =>
    setSel((prev) => ({ ...prev, [key]: val }));

  const keys: (keyof Selection)[] = ['size', 'resin', 'wood', 'leg'];
  const canNext =
    step === 4 || (step < 4 && sel[keys[step]] !== undefined);

  const stepContent = [
    <SizeStep  key="size"  value={sel.size  ?? ''} onChange={(v) => update('size', v)} />,
    <ResinStep key="resin" value={sel.resin ?? ''} onChange={(v) => update('resin', v)} />,
    <WoodStep  key="wood"  value={sel.wood  ?? ''} onChange={(v) => update('wood', v)} />,
    <LegStep   key="leg"   value={sel.leg   ?? ''} onChange={(v) => update('leg', v)} />,
    <OrderStep key="order" sel={sel} />,
  ];

  return (
    <section className="relative w-full bg-black text-zinc-100 px-6 py-20">
      <div className="max-w-xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-600 mb-3">Build to Order</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
            나만의 테이블을 만들어보세요
          </h2>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-10 gap-0">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center">
              <button
                onClick={() => i <= step && setStep(i)}
                className={`flex flex-col items-center gap-1 focus:outline-none`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    i < step
                      ? 'bg-white text-black'
                      : i === step
                      ? 'bg-white/15 text-white border border-white/30'
                      : 'bg-zinc-900 text-zinc-600 border border-white/8'
                  }`}
                >
                  {i < step ? <Check size={13} /> : i + 1}
                </div>
                <span className={`text-[10px] hidden md:block transition-colors ${i === step ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`w-8 md:w-12 h-px mx-1 transition-colors duration-500 ${i < step ? 'bg-white/30' : 'bg-white/8'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(6px)' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-sm font-semibold text-zinc-400 mb-4 uppercase tracking-widest">
                {STEPS[step]}
              </p>
              {stepContent[step]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {step < 4 && (
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className={`flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors ${step === 0 ? 'invisible' : ''}`}
            >
              <ChevronLeft size={15} /> 이전
            </button>

            <motion.button
              onClick={() => canNext && setStep((s) => s + 1)}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                canNext
                  ? 'bg-white/10 text-white hover:bg-white/15 border border-white/15'
                  : 'bg-zinc-900 text-zinc-600 border border-white/5 cursor-not-allowed'
              }`}
            >
              {step === 3 ? '주문 요약 보기' : '다음'}
              <ChevronRight size={15} />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
