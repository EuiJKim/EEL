'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, ShoppingBag, X, CheckCircle, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

// =========================================
// 1. TYPES
// =========================================

interface SizeOption   { id: string; label: string; size: string; description: string; price: number; }
interface ResinOption  { id: string; label: string; hex: string; description: string; }
interface WoodOption   { id: string; label: string; description: string; color: string; price_addition: number; }
interface LegOption    { id: string; label: string; description: string; color: string; price_addition: number; }

interface BTOData {
  sizes: SizeOption[];
  resins: ResinOption[];
  woods: WoodOption[];
  legs: LegOption[];
}

interface Selection {
  size: string; resin: string; wood: string; leg: string;
}

const STEPS = ['사이즈', '레진 색상', '우드 종류', '다리 스타일', '주문'];

// =========================================
// 2. HELPERS
// =========================================

function calcPrice(sel: Partial<Selection>, data: BTOData): number {
  const base  = data.sizes.find((s) => s.id === sel.size)?.price ?? 0;
  const wood  = data.woods.find((w) => w.id === sel.wood)?.price_addition ?? 0;
  const leg   = data.legs.find((l)  => l.id === sel.leg)?.price_addition  ?? 0;
  return base + wood + leg;
}

function formatKRW(n: number) { return n.toLocaleString('ko-KR') + '원'; }

// =========================================
// 3. OPTION CARDS
// =========================================

function SizeStep({ value, onChange, sizes }: { value: string; onChange: (v: string) => void; sizes: SizeOption[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {sizes.map((opt) => (
        <motion.button key={opt.id} onClick={() => onChange(opt.id)} whileTap={{ scale: 0.97 }}
          className={`relative p-4 rounded-xl border text-left transition-all ${value === opt.id ? 'border-white/30 bg-white/8' : 'border-white/8 bg-zinc-900/50 hover:border-white/15'}`}
        >
          {value === opt.id && <motion.div layoutId="size-sel" className="absolute inset-0 rounded-xl bg-white/5" transition={{ type: 'spring', stiffness: 300, damping: 28 }} />}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm text-white">{opt.label}</span>
              {value === opt.id && <Check size={13} className="text-white/70" />}
            </div>
            <div className="text-xs text-zinc-400 font-mono mb-1">{opt.size}</div>
            <div className="text-[11px] text-zinc-600">{opt.description}</div>
            <div className="mt-2 text-xs font-semibold" style={{ color: '#d4a853' }}>{formatKRW(opt.price)}~</div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

function ResinStep({ value, onChange, resins }: { value: string; onChange: (v: string) => void; resins: ResinOption[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      {resins.map((opt) => (
        <motion.button key={opt.id} onClick={() => onChange(opt.id)} whileTap={{ scale: 0.96 }}
          className={`relative p-3 rounded-xl border text-left transition-all ${value === opt.id ? 'border-white/30 bg-white/8' : 'border-white/8 bg-zinc-900/50 hover:border-white/15'}`}
        >
          <div className="w-full h-12 rounded-lg mb-2 border border-white/10" style={{ background: opt.hex }} />
          <div className="text-xs font-semibold text-white mb-0.5">{opt.label}</div>
          <div className="text-[10px] text-zinc-500 leading-tight">{opt.description}</div>
          {value === opt.id && <div className="absolute top-2 right-2"><Check size={12} className="text-white/70" /></div>}
        </motion.button>
      ))}
    </div>
  );
}

function WoodStep({ value, onChange, woods }: { value: string; onChange: (v: string) => void; woods: WoodOption[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {woods.map((opt) => (
        <motion.button key={opt.id} onClick={() => onChange(opt.id)} whileTap={{ scale: 0.97 }}
          className={`relative p-4 rounded-xl border text-left transition-all ${value === opt.id ? 'border-white/30 bg-white/8' : 'border-white/8 bg-zinc-900/50 hover:border-white/15'}`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg border border-white/10 shrink-0" style={{ background: opt.color }} />
            <div>
              <div className="text-sm font-semibold text-white">{opt.label}</div>
              {value === opt.id && <Check size={12} className="text-white/60 inline" />}
            </div>
          </div>
          <div className="text-[11px] text-zinc-500">{opt.description}</div>
          {opt.price_addition > 0 && <div className="mt-1.5 text-[10px] font-semibold text-amber-500/80">+{formatKRW(opt.price_addition)}</div>}
        </motion.button>
      ))}
    </div>
  );
}

function LegStep({ value, onChange, legs }: { value: string; onChange: (v: string) => void; legs: LegOption[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {legs.map((opt) => (
        <motion.button key={opt.id} onClick={() => onChange(opt.id)} whileTap={{ scale: 0.97 }}
          className={`relative p-4 rounded-xl border text-left transition-all ${value === opt.id ? 'border-white/30 bg-white/8' : 'border-white/8 bg-zinc-900/50 hover:border-white/15'}`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg border border-white/10 shrink-0" style={{ background: opt.color }} />
            <div>
              <div className="text-sm font-semibold text-white">{opt.label}</div>
              {value === opt.id && <Check size={12} className="text-white/60 inline" />}
            </div>
          </div>
          <div className="text-[11px] text-zinc-500">{opt.description}</div>
          {opt.price_addition > 0 && <div className="mt-1.5 text-[10px] font-semibold text-amber-500/80">+{formatKRW(opt.price_addition)}</div>}
        </motion.button>
      ))}
    </div>
  );
}

function OrderStep({
  sel, data, onSubmit, submitting,
}: {
  sel: Partial<Selection>; data: BTOData; onSubmit: () => void; submitting: boolean;
}) {
  const size  = data.sizes.find((s) => s.id === sel.size);
  const resin = data.resins.find((r) => r.id === sel.resin);
  const wood  = data.woods.find((w) => w.id === sel.wood);
  const leg   = data.legs.find((l)  => l.id === sel.leg);
  const total = calcPrice(sel, data);

  const rows = [
    { label: '사이즈',    value: size  ? `${size.label} (${size.size})` : '-' },
    { label: '레진 색상', value: resin?.label ?? '-' },
    { label: '우드 종류', value: wood?.label  ?? '-' },
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
        onClick={onSubmit}
        disabled={submitting}
        whileTap={{ scale: submitting ? 1 : 0.97 }}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? <Loader2 size={16} className="animate-spin" /> : <ShoppingBag size={16} />}
        {submitting ? '접수 중...' : '주문 문의하기'}
      </motion.button>
    </div>
  );
}

// =========================================
// 4. SUCCESS MODAL
// =========================================

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
          backdropFilter: 'blur(32px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '24px',
          padding: '40px 36px',
          maxWidth: '360px',
          width: '100%',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-600 hover:text-zinc-400 transition-colors">
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-5">
            <CheckCircle size={28} className="text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">주문이 접수됐습니다</h3>
          <p className="text-sm text-zinc-400 leading-relaxed mb-6">
            빠른 시일 내에 확인 후 연락드리겠습니다.<br />
            주문 내역은 마이페이지에서 확인하실 수 있어요.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-100 transition-colors"
          >
            확인
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// =========================================
// 5. MAIN
// =========================================

export default function BTOBuilder() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState<Partial<Selection>>({});
  const [data, setData] = useState<BTOData>({ sizes: [], resins: [], woods: [], legs: [] });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    async function fetchOptions() {
      const supabase = createClient();
      const [sizes, resins, woods, legs] = await Promise.all([
        supabase.from('size_options').select('*').order('sort_order'),
        supabase.from('resin_options').select('*').order('sort_order'),
        supabase.from('wood_options').select('*').order('sort_order'),
        supabase.from('leg_options').select('*').order('sort_order'),
      ]);
      setData({
        sizes: sizes.data ?? [],
        resins: resins.data ?? [],
        woods: woods.data ?? [],
        legs: legs.data ?? [],
      });
    }
    fetchOptions();
  }, []);

  const update = (key: keyof Selection, val: string) =>
    setSel((prev) => ({ ...prev, [key]: val }));

  const keys: (keyof Selection)[] = ['size', 'resin', 'wood', 'leg'];
  const canNext = step === 4 || (step < 4 && sel[keys[step]] !== undefined);

  async function handleSubmit() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/auth');
      return;
    }

    setSubmitting(true);
    const total = calcPrice(sel, data);

    const { error } = await supabase.from('orders').insert({
      user_id: user.id,
      size_id: sel.size,
      resin_id: sel.resin,
      wood_id: sel.wood,
      leg_id: sel.leg,
      total_price: total,
    });

    setSubmitting(false);

    if (!error) {
      setShowSuccess(true);
    }
  }

  const stepContent = [
    <SizeStep  key="size"  value={sel.size  ?? ''} onChange={(v) => update('size',  v)} sizes={data.sizes} />,
    <ResinStep key="resin" value={sel.resin ?? ''} onChange={(v) => update('resin', v)} resins={data.resins} />,
    <WoodStep  key="wood"  value={sel.wood  ?? ''} onChange={(v) => update('wood',  v)} woods={data.woods} />,
    <LegStep   key="leg"   value={sel.leg   ?? ''} onChange={(v) => update('leg',   v)} legs={data.legs} />,
    <OrderStep key="order" sel={sel} data={data} onSubmit={handleSubmit} submitting={submitting} />,
  ];

  return (
    <>
      <AnimatePresence>
        {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
      </AnimatePresence>

      <section className="relative w-full bg-black text-zinc-100 px-6 py-20">
        <div className="max-w-xl mx-auto">
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

          <div className="flex items-center justify-center mb-10 gap-0">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center">
                <button onClick={() => i <= step && setStep(i)} className="flex flex-col items-center gap-1 focus:outline-none">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    i < step ? 'bg-white text-black' : i === step ? 'bg-white/15 text-white border border-white/30' : 'bg-zinc-900 text-zinc-600 border border-white/8'
                  }`}>
                    {i < step ? <Check size={13} /> : i + 1}
                  </div>
                  <span className={`text-[10px] hidden md:block transition-colors ${i === step ? 'text-zinc-300' : 'text-zinc-600'}`}>{label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`w-8 md:w-12 h-px mx-1 transition-colors duration-500 ${i < step ? 'bg-white/30' : 'bg-white/8'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(6px)' }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-sm font-semibold text-zinc-400 mb-4 uppercase tracking-widest">{STEPS[step]}</p>
                {stepContent[step]}
              </motion.div>
            </AnimatePresence>
          </div>

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
                  canNext ? 'bg-white/10 text-white hover:bg-white/15 border border-white/15' : 'bg-zinc-900 text-zinc-600 border border-white/5 cursor-not-allowed'
                }`}
              >
                {step === 3 ? '주문 요약 보기' : '다음'}
                <ChevronRight size={15} />
              </motion.button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
