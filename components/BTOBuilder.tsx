'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, ChevronRight, ChevronLeft, ShoppingBag, X, CheckCircle, Loader2,
  Maximize2, Link2, Copy,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { formatKRW } from '@/lib/utils';

const TablePreview3D = dynamic(() => import('./TablePreview3D'), { ssr: false });

const LS_KEY = 'eel-bto-selection';

// =========================================
// 1. TYPES
// =========================================

interface SizeOption   { id: string; label: string; size: string; description: string; price: number; }
interface ResinOption  { id: string; label: string; hex: string; description: string; }
interface WoodOption   { id: string; label: string; description: string; color: string; priceAddition: number; }
interface LegOption    { id: string; label: string; description: string; color: string; priceAddition: number; }

interface BTOData {
  sizes: SizeOption[];
  resins: ResinOption[];
  woods: WoodOption[];
  legs: LegOption[];
}

interface Selection {
  size: string; resin: string; wood: string; leg: string;
}

const STEPS = ['Size', 'Resin', 'Wood', 'Leg', 'Review'];

// =========================================
// 2. COUNT-UP HOOK
// =========================================

function useCountUp(target: number, duration = 420) {
  const [display, setDisplay] = useState(target);
  const prevRef = useRef(target);

  useEffect(() => {
    if (prevRef.current === target) return;
    const start    = prevRef.current;
    const started  = performance.now();
    prevRef.current = target;

    const tick = (now: number) => {
      const p = Math.min((now - started) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setDisplay(Math.round(start + (target - start) * e));
      if (p < 1) requestAnimationFrame(tick);
      else setDisplay(target);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);

  return display;
}

// =========================================
// 3. HELPERS
// =========================================

function calcPrice(sel: Partial<Selection>, data: BTOData): number {
  const base = data.sizes.find((s) => s.id === sel.size)?.price ?? 0;
  const wood = data.woods.find((w) => w.id === sel.wood)?.priceAddition ?? 0;
  const leg  = data.legs.find((l)  => l.id === sel.leg)?.priceAddition  ?? 0;
  return base + wood + leg;
}

// Squared Euclidean RGB distance between two hex colors (no sqrt needed for comparison)
function hexDist(a: string, b: string): number {
  const parse = (h: string) => {
    const hex = h.replace('#', '').padEnd(6, '0');
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  };
  const [r1, g1, b1] = parse(a);
  const [r2, g2, b2] = parse(b);
  return (r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2;
}

// Build a shareable BTO config URL
function buildShareUrl(sel: Partial<Selection>): string {
  const params = new URLSearchParams();
  if (sel.size)  params.set('size',  sel.size);
  if (sel.resin) params.set('resin', sel.resin);
  if (sel.wood)  params.set('wood',  sel.wood);
  if (sel.leg)   params.set('leg',   sel.leg);
  return `${window.location.origin}/order?${params.toString()}`;
}

// =========================================
// 4. OPTION CARDS
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
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
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

function SwatchStep({ value, onChange, options }: {
  value: string;
  onChange: (v: string) => void;
  options: (WoodOption | LegOption)[];
}) {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {options.map((opt) => (
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
          {opt.priceAddition > 0 && (
            <div className="mt-1.5 text-[10px] font-semibold text-amber-500/80">+{formatKRW(opt.priceAddition)}</div>
          )}
        </motion.button>
      ))}
    </div>
  );
}

function OrderStep({
  sel, data, onSubmit, submitting, error, onShare, copied,
  phone, onPhoneChange, note, onNoteChange,
}: {
  sel: Partial<Selection>; data: BTOData; onSubmit: () => void; submitting: boolean; error: boolean;
  onShare: () => void; copied: boolean;
  phone: string; onPhoneChange: (v: string) => void; note: string; onNoteChange: (v: string) => void;
}) {
  const size  = data.sizes.find((s) => s.id === sel.size);
  const resin = data.resins.find((r) => r.id === sel.resin);
  const wood  = data.woods.find((w) => w.id === sel.wood);
  const leg   = data.legs.find((l)  => l.id === sel.leg);
  const total = calcPrice(sel, data);

  const rows = [
    { label: 'Size',  value: size  ? `${size.label} (${size.size})` : '-' },
    { label: 'Resin', value: resin?.label ?? '-' },
    { label: 'Wood',  value: wood?.label  ?? '-' },
    { label: 'Leg',   value: leg?.label   ?? '-' },
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
          <span className="text-zinc-400 font-semibold">Total</span>
          <span className="text-white text-lg font-bold">{formatKRW(total)}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs text-zinc-400 mb-1.5">연락처 (필수)</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="010-0000-0000"
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/50 border border-white/8 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-zinc-400 mb-1.5">요청사항 (선택)</label>
          <textarea
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            placeholder="원하시는 디자인이나 참고 이미지 등을 적어주세요"
            rows={2}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/50 border border-white/8 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 transition-colors resize-none"
          />
        </div>
      </div>

      <p className="text-[11px] text-zinc-600 leading-relaxed">
        * 주문 접수 후 상담을 통해 최종 가격과 제작 일정을 안내드립니다.
      </p>

      {error && (
        <p className="text-xs text-red-400 text-center">Submission failed. Please try again.</p>
      )}

      <div className="flex gap-3">
        <motion.button
          onClick={onShare}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors text-sm text-zinc-300 shrink-0"
          title="Share this configuration"
        >
          {copied ? <Copy size={15} className="text-emerald-400" /> : <Link2 size={15} />}
          {copied ? 'Copied!' : 'Share'}
        </motion.button>
        <motion.button
          onClick={onSubmit}
          disabled={submitting || !phone.trim()}
          whileTap={{ scale: (submitting || !phone.trim()) ? 1 : 0.97 }}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#C8922A] text-black font-bold text-sm hover:bg-[#b8821e] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? <Loader2 size={16} className="animate-spin" /> : <ShoppingBag size={16} />}
          {submitting ? 'Processing...' : 'Request Order'}
        </motion.button>
      </div>
    </div>
  );
}

// =========================================
// 5. SUCCESS MODAL
// =========================================

function SuccessModal({ onClose, orderId }: { onClose: () => void; orderId: string | null }) {
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
          <h3 className="text-xl font-bold text-white mb-2">Order Received</h3>
          <p className="text-sm text-zinc-400 leading-relaxed mb-6">
            Your one-of-a-kind table has begun.<br />
            6–10 weeks from confirmation, made by hand.
          </p>
          <div className="flex flex-col gap-2 w-full">
            {orderId && (
              <a
                href={`/orders/${orderId}`}
                className="w-full py-3 rounded-xl bg-[#C8922A] text-black font-semibold text-sm hover:bg-[#b8821e] transition-colors text-center"
              >
                Track Order →
              </a>
            )}
            <button
              onClick={onClose}
              className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors ${orderId ? 'bg-white/8 text-zinc-300 hover:bg-white/12 border border-white/10' : 'bg-[#C8922A] text-black hover:bg-[#b8821e]'}`}
            >
              {orderId ? 'Continue' : 'Done'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// =========================================
// 6. MAIN
// =========================================

export default function BTOBuilder() {
  const router        = useRouter();
  const searchParams  = useSearchParams();
  const [step, setStep]               = useState(0);
  const [sel, setSel]                 = useState<Partial<Selection>>({});
  const [data, setData]               = useState<BTOData>({ sizes: [], resins: [], woods: [], legs: [] });
  const [submitting, setSubmitting]   = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId]         = useState<string | null>(null);
  const [submitError, setSubmitError] = useState(false);
  const [copied, setCopied]           = useState(false);
  const [phone, setPhone]             = useState('');
  const [note, setNote]               = useState('');

  // Fetch BTO options + restore saved selection (URL params override localStorage)
  useEffect(() => {
    fetch('/api/bto-options')
      .then((r) => r.json())
      .then((fetched: BTOData) => {
        setData(fetched);

        // 1. Restore from localStorage
        const fromStorage: Partial<Selection> = {};
        try {
          const saved = localStorage.getItem(LS_KEY);
          if (saved) {
            const parsed: Partial<Selection> = JSON.parse(saved);
            if (fetched.sizes.find((s)  => s.id === parsed.size))   fromStorage.size  = parsed.size;
            if (fetched.resins.find((r) => r.id === parsed.resin))  fromStorage.resin = parsed.resin;
            if (fetched.woods.find((w)  => w.id === parsed.wood))   fromStorage.wood  = parsed.wood;
            if (fetched.legs.find((l)   => l.id === parsed.leg))    fromStorage.leg   = parsed.leg;
          }
        } catch { /* ignore */ }

        // 2. URL params override localStorage (exact IDs)
        const fromUrl: Partial<Selection> = {};
        const urlSize  = searchParams.get('size');
        const urlResin = searchParams.get('resin');
        const urlWood  = searchParams.get('wood');
        const urlLeg   = searchParams.get('leg');
        if (urlSize  && fetched.sizes.find((s)  => s.id === urlSize))   fromUrl.size  = urlSize;
        if (urlResin && fetched.resins.find((r) => r.id === urlResin))  fromUrl.resin = urlResin;
        if (urlWood  && fetched.woods.find((w)  => w.id === urlWood))   fromUrl.wood  = urlWood;
        if (urlLeg   && fetched.legs.find((l)   => l.id === urlLeg))    fromUrl.leg   = urlLeg;

        // 3. Resin hint: match closest hex if no exact resin param given
        const resinHint = searchParams.get('resinHint');
        if (resinHint && !fromUrl.resin && fetched.resins.length) {
          let best = fetched.resins[0].id;
          let bestDist = Infinity;
          for (const r of fetched.resins) {
            const d = hexDist(resinHint, r.hex);
            if (d < bestDist) { bestDist = d; best = r.id; }
          }
          fromUrl.resin = best;
        }

        const merged = { ...fromStorage, ...fromUrl };
        if (Object.keys(merged).length) setSel(merged);
      })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist selections to localStorage
  useEffect(() => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(sel)); } catch { /* ignore */ }
  }, [sel]);

  const update = (key: keyof Selection, val: string) =>
    setSel((prev) => ({ ...prev, [key]: val }));

  const keys: (keyof Selection)[] = ['size', 'resin', 'wood', 'leg'];
  const canNext = step === 4 || (step < 4 && sel[keys[step]] !== undefined);

  // Free step navigation — can jump to completed steps or any step whose prerequisites are met
  const canJumpToStep = (i: number): boolean => {
    if (i <= step) return true;
    if (i === 4) return keys.every((k) => sel[k] !== undefined);
    return keys.slice(0, i).every((k) => sel[k] !== undefined);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;
      if ((e.key === 'ArrowRight' || e.key === 'Enter') && canNext && step < 4) {
        setStep((s) => s + 1);
      } else if (e.key === 'ArrowLeft' && step > 0) {
        setStep((s) => s - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [canNext, step]);

  // Count-up animated price
  const livePrice    = calcPrice(sel, data);
  const displayPrice = useCountUp(livePrice);

  function handleShare() {
    const url = buildShareUrl(sel);
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // Fallback: select text (older browsers)
      const el = document.createElement('textarea');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  async function handleSubmit() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/auth?returnTo=/order'); return; }

    setSubmitting(true);
    setSubmitError(false);
    const total = calcPrice(sel, data);

    const res    = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sizeId: sel.size, resinId: sel.resin, woodId: sel.wood, legId: sel.leg, totalPrice: total, phone: phone || null, note: note || null }),
    });
    const result = await res.json();
    setSubmitting(false);

    if (res.ok && result.id) {
      setOrderId(result.id);
      setShowSuccess(true);
      const size  = data.sizes.find((s) => s.id === sel.size);
      const resin = data.resins.find((r) => r.id === sel.resin);
      const wood  = data.woods.find((w) => w.id === sel.wood);
      const leg   = data.legs.find((l)  => l.id === sel.leg);
      fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId:   result.id,
          userEmail: result.profile?.email    ?? user.email,
          userName:  result.profile?.fullName,
          summary: {
            size:       size  ? `${size.label} (${size.size})` : '-',
            resin:      resin?.label ?? '-',
            wood:       wood?.label  ?? '-',
            leg:        leg?.label   ?? '-',
            totalPrice: total.toLocaleString('ko-KR') + '원',
            phone:      phone || '-',
            note:       note || '-',
          },
        }),
      }).catch(() => {});
    } else {
      setSubmitError(true);
    }
  }

  // Derive current preview colors
  const previewResin = data.resins.find((r) => r.id === sel.resin)?.hex   ?? '#4a90d9';
  const previewWood  = data.woods.find((w)  => w.id === sel.wood)?.color  ?? '#8B6F3E';
  const previewLeg   = data.legs.find((l)   => l.id === sel.leg)?.color   ?? '#5a5a5a';

  const stepContent = [
    <SizeStep   key="size"  value={sel.size  ?? ''} onChange={(v) => update('size',  v)} sizes={data.sizes} />,
    <ResinStep  key="resin" value={sel.resin ?? ''} onChange={(v) => update('resin', v)} resins={data.resins} />,
    <SwatchStep key="wood"  value={sel.wood  ?? ''} onChange={(v) => update('wood',  v)} options={data.woods} />,
    <SwatchStep key="leg"   value={sel.leg   ?? ''} onChange={(v) => update('leg',   v)} options={data.legs} />,
    <OrderStep  key="order" sel={sel} data={data} onSubmit={handleSubmit} submitting={submitting} error={submitError} onShare={handleShare} copied={copied} phone={phone} onPhoneChange={setPhone} note={note} onNoteChange={setNote} />,
  ];

  return (
    <>
      <AnimatePresence>
        {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} orderId={orderId} />}
      </AnimatePresence>

      <section className="relative w-full bg-[#0a0a0a] text-zinc-100 px-4 sm:px-6 pt-20 sm:pt-16 pb-16 sm:pb-20">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-600 mb-3">Build to Order</p>
            <h2 className="font-display-en text-3xl md:text-4xl font-semibold tracking-tight text-white text-balance">
              Build Your Table
            </h2>
          </motion.div>

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

            {/* 3D Preview Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-[420px] lg:sticky lg:top-24 shrink-0"
            >
              <div
                className="relative rounded-2xl overflow-hidden border border-white/8"
                style={{
                  background: 'radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.6) 100%)',
                  height: 300,
                }}
              >
                <TablePreview3D
                  resinHex={previewResin}
                  woodColor={previewWood}
                  legColor={previewLeg}
                  sizeId={sel.size}
                  resinId={sel.resin}
                  woodId={sel.wood}
                />

                {/* Drag hint */}
                {!sel.resin && !sel.wood && !sel.leg && (
                  <div className="absolute inset-0 flex flex-col items-end justify-end p-3 pointer-events-none gap-1">
                    <p className="text-[10px] text-zinc-600 tracking-wide">Drag to rotate</p>
                    <p className="text-[10px] text-zinc-700 tracking-wide">Options update in real time</p>
                  </div>
                )}

                {/* Current selection label overlays */}
                {(sel.resin || sel.wood) && (
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 pointer-events-none">
                    {sel.resin && (
                      <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
                        <div className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ background: previewResin }} />
                        <span className="text-[10px] text-zinc-400">{data.resins.find((r) => r.id === sel.resin)?.label}</span>
                      </div>
                    )}
                    {sel.wood && (
                      <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
                        <div className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ background: previewWood }} />
                        <span className="text-[10px] text-zinc-400">{data.woods.find((w) => w.id === sel.wood)?.label}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Selection summary chips */}
              {(sel.size || sel.resin || sel.wood || sel.leg) && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-1.5 mt-3 px-1"
                >
                  {sel.size && (
                    <button onClick={() => setStep(0)}
                      className="flex items-center gap-1.5 bg-white/5 hover:bg-white/8 border border-white/10 rounded-full px-2.5 py-1 text-[10px] text-zinc-400 transition-colors"
                    >
                      <Maximize2 size={9} className="text-zinc-600" />
                      {data.sizes.find((s) => s.id === sel.size)?.label}
                    </button>
                  )}
                  {sel.resin && (
                    <button onClick={() => setStep(1)}
                      className="flex items-center gap-1.5 bg-white/5 hover:bg-white/8 border border-white/10 rounded-full px-2.5 py-1 text-[10px] text-zinc-400 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: previewResin }} />
                      {data.resins.find((r) => r.id === sel.resin)?.label}
                    </button>
                  )}
                  {sel.wood && (
                    <button onClick={() => setStep(2)}
                      className="flex items-center gap-1.5 bg-white/5 hover:bg-white/8 border border-white/10 rounded-full px-2.5 py-1 text-[10px] text-zinc-400 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: previewWood }} />
                      {data.woods.find((w) => w.id === sel.wood)?.label}
                    </button>
                  )}
                  {sel.leg && (
                    <button onClick={() => setStep(3)}
                      className="flex items-center gap-1.5 bg-white/5 hover:bg-white/8 border border-white/10 rounded-full px-2.5 py-1 text-[10px] text-zinc-400 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: previewLeg }} />
                      {data.legs.find((l) => l.id === sel.leg)?.label}
                    </button>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Step Controls */}
            <div className="flex-1 w-full min-w-0">

              {/* Step indicator */}
              <div className="flex items-center justify-center mb-8 gap-0">
                {STEPS.map((label, i) => {
                  const jumpable = canJumpToStep(i);
                  return (
                    <div key={label} className="flex items-center">
                      <button
                        onClick={() => jumpable && setStep(i)}
                        className={`flex flex-col items-center gap-1 focus:outline-none ${jumpable ? 'cursor-pointer' : 'cursor-default'}`}
                      >
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          i < step  ? 'bg-white text-black'
                          : i === step ? 'bg-white/15 text-white border border-white/30'
                          : 'bg-zinc-900 text-zinc-600 border border-white/8'
                        }`}>
                          {i < step ? <Check size={13} /> : i + 1}
                        </div>
                        <span className={`text-[10px] hidden md:block transition-colors ${i === step ? 'text-zinc-300' : 'text-zinc-600'}`}>{label}</span>
                      </button>
                      {i < STEPS.length - 1 && (
                        <div className={`w-8 md:w-12 h-px mx-1 transition-colors duration-500 ${i < step ? 'bg-white/30' : 'bg-white/8'}`} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Floating price badge */}
              <AnimatePresence>
                {livePrice > 0 && step < 4 && (
                  <motion.div
                    key="price-badge"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex justify-end mb-4"
                  >
                    <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5">
                      <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Est.</span>
                      <span className="text-sm font-bold text-white tabular-nums">{formatKRW(displayPrice)}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step content */}
              <div className="min-h-[280px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="text-sm font-semibold text-zinc-400 mb-4 uppercase tracking-widest">{STEPS[step]}</p>
                    {stepContent[step]}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation buttons */}
              {step < 4 && (
                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    className={`inline-flex items-center gap-1.5 min-h-[44px] px-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors ${step === 0 ? 'invisible' : ''}`}
                  >
                    <ChevronLeft size={15} /> Back
                  </button>
                  <motion.button
                    onClick={() => canNext && setStep((s) => s + 1)}
                    whileTap={{ scale: 0.97 }}
                    className={`inline-flex items-center gap-1.5 min-h-[44px] px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                      canNext ? 'bg-white/10 text-white hover:bg-white/15 border border-white/15' : 'bg-zinc-900 text-zinc-600 border border-white/5 cursor-not-allowed'
                    }`}
                  >
                    {step === 3 ? 'Review' : 'Next'}
                    <ChevronRight size={15} />
                  </motion.button>
                </div>
              )}

              {/* Keyboard hint */}
              <p className="text-center text-[10px] text-zinc-700 mt-4 hidden md:block">
                ← → to navigate
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
