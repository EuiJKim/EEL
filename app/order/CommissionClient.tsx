'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import type { TableShape } from '@/components/CommissionPreview3D';
import { fireLeadEvent } from './fireLeadEvent';

const CommissionPreview3D = dynamic(() => import('@/components/CommissionPreview3D'), { ssr: false });

/* ── Color palette (categorized) ── */
const COLOR_CATEGORIES = [
  {
    label: 'Blue & Green',
    colors: [
      { hex: '#A8D5E2', name: 'Glacier Blue' },
      { hex: '#5BA4CF', name: 'Sky Blue' },
      { hex: '#AED6F1', name: 'Baby Blue' },
      { hex: '#85C1E9', name: 'Cornflower' },
      { hex: '#1ABC9C', name: 'Aqua' },
      { hex: '#40E0D0', name: 'Turquoise' },
      { hex: '#0E7C7B', name: 'Teal' },
      { hex: '#1B4F72', name: 'Deep Ocean' },
      { hex: '#1A237E', name: 'Navy' },
      { hex: '#27AE60', name: 'Emerald' },
      { hex: '#2ECC71', name: 'Green' },
      { hex: '#7DCEA0', name: 'Sage' },
      { hex: '#ABEBC6', name: 'Mint' },
      { hex: '#D5F5E3', name: 'Seafoam' },
      { hex: '#6B7C37', name: 'Olive' },
    ],
  },
  {
    label: 'Neutral',
    colors: [
      { hex: '#F0EDE8', name: 'Pearl' },
      { hex: '#BDC3C7', name: 'Smoke' },
      { hex: '#2C3E50', name: 'Charcoal' },
      { hex: '#17202A', name: 'Obsidian' },
    ],
  },
  {
    label: 'Warm',
    colors: [
      { hex: '#FAD7A0', name: 'Peach' },
      { hex: '#F39C12', name: 'Amber' },
      { hex: '#D4AC0D', name: 'Gold' },
      { hex: '#CA6F1E', name: 'Terracotta' },
    ],
  },
  {
    label: 'Pink & Purple',
    colors: [
      { hex: '#F5B7B1', name: 'Rose' },
      { hex: '#E74C3C', name: 'Coral' },
      { hex: '#7B2D42', name: 'Burgundy' },
      { hex: '#E8DAEF', name: 'Lavender' },
      { hex: '#6C3483', name: 'Violet' },
    ],
  },
];

/* ── Options ── */
const SHAPE_OPTIONS: { value: TableShape; label: string; desc: string }[] = [
  { value: 'organic', label: 'Organic', desc: '자연스러운 곡선' },
  { value: 'round', label: 'Round', desc: '원형' },
  { value: 'square', label: 'Square', desc: '정사각형' },
  { value: 'rectangle', label: 'Rectangle', desc: '직사각형' },
];

const HEIGHT_OPTIONS = [
  { label: '30–40 cm' as const },
  { label: '40–50 cm' as const },
  { label: '72–75 cm' as const },
];

const LEG_OPTIONS = [
  { value: '4' as const, label: '4 Legs', desc: '안정적인 네 다리' },
  { value: '1' as const, label: 'Pedestal', desc: '중앙 단일 기둥' },
];

export default function CommissionClient() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [colorName, setColorName] = useState('컬러를 선택해주세요');
  const [selectedOpacity, setSelectedOpacity] = useState<'투명' | '반투명' | '불투명' | null>(null);
  const [selectedShape, setSelectedShape] = useState<TableShape>('organic');
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | null>(null);
  const [selectedHeight, setSelectedHeight] = useState<'30–40 cm' | '40–50 cm' | '72–75 cm' | null>(null);
  const [selectedLegs, setSelectedLegs] = useState<'4' | '1' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [previewColor, setPreviewColor] = useState('#EDE4D0');
  const [customColor, setCustomColor] = useState('');
  const [customSize, setCustomSize] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', note: '' });

  const handleSend = async () => {
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/commission-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          color: `${selectedOpacity ? `${colorName} (${selectedOpacity})` : colorName}${customColor ? ` / "${customColor}"` : ''}`,
          shape: SHAPE_OPTIONS.find(s => s.value === selectedShape)?.label ?? selectedShape,
          size: selectedSize ? `${selectedSize}${customSize ? ` / "${customSize}"` : ''}` : customSize || '—',
          height: selectedHeight ?? '—',
          legs: selectedLegs === '4' ? '4 Legs' : selectedLegs === '1' ? 'Pedestal' : '—',
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      fireLeadEvent();
    } catch {
      setSubmitError('전송에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const TOTAL_STEPS = 6;

  const goToStep = (next: number) => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentStep(next);
      setFadeIn(true);
    }, 180);
  };

  const goNext = () => goToStep(Math.min(currentStep + 1, TOTAL_STEPS - 1));
  const goPrev = () => goToStep(Math.max(currentStep - 1, 0));

  const autoNext = (fn: () => void) => {
    fn();
    setTimeout(goNext, 320);
  };

  const summaryRows = [
    { label: 'Color', value: selectedColor ? `${colorName}${selectedOpacity ? ` (${selectedOpacity})` : ''}${customColor ? ` / "${customColor}"` : ''}` : customColor ? `"${customColor}"` : '—' },
    { label: 'Shape', value: SHAPE_OPTIONS.find(s => s.value === selectedShape)?.label ?? '—' },
    { label: 'Size', value: selectedSize ? `${selectedSize}${customSize ? ` / "${customSize}"` : ''}` : customSize ? `"${customSize}"` : '—' },
    { label: 'Height', value: selectedHeight ?? '—' },
    { label: 'Legs', value: selectedLegs === '4' ? '4 Legs' : selectedLegs === '1' ? 'Pedestal' : '—' },
  ];

  const LIGHT_COLORS = ['#F0EDE8', '#E8DAEF', '#D5F5E3', '#FAD7A0', '#F5B7B1', '#AED6F1'];

  const stepContent = [
    /* 0 — Color */
    <div key="color">
      <div className="mb-1 text-xs tracking-[0.2em] text-[#888]" style={{ fontFamily: "var(--font-staatliches)" }}></div>
      <h2 className="text-white mb-6" style={{ fontFamily: "var(--font-gravitas)", fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 400, letterSpacing: '0.02em' }}>Color</h2>

      {/* Category tabs */}
      <div className="flex gap-0 mb-5 border-b border-[#2a2a2a]">
        {COLOR_CATEGORIES.map((cat, i) => (
          <button key={cat.label} type="button" onClick={() => setSelectedCategory(i)}
            className="px-3 sm:px-4 py-2 text-xs tracking-[0.06em] cursor-pointer bg-transparent border-0 transition-colors relative"
            style={{ color: selectedCategory === i ? '#e8e8e8' : '#888', fontFamily: "'Telex', sans-serif" }}>
            {cat.label}
            {selectedCategory === i && <span className="absolute bottom-0 left-0 right-0 h-px bg-white" />}
          </button>
        ))}
      </div>

      <p className={`text-sm tracking-[0.06em] min-h-[20px] mb-4 transition-colors duration-300 ${selectedColor ? 'text-[#e8e8e8]' : 'text-[#888]'}`}>
        {colorName}
      </p>

      <div className="flex flex-wrap gap-3 mb-6" style={{ minHeight: '88px' }}>
        {COLOR_CATEGORIES[selectedCategory].colors.map((c) => (
          <button key={c.hex} type="button"
            onClick={() => { setSelectedColor(c.hex); setColorName(c.name); setPreviewColor(c.hex); }}
            aria-label={c.name}
            className="flex flex-col items-center gap-1.5 cursor-pointer bg-transparent border-0 p-0 group">
            <span className="w-10 h-10 rounded-sm block transition-transform duration-200 group-hover:scale-[1.08]"
              style={{
                background: c.hex,
                boxShadow: selectedColor === c.hex ? '0 0 0 2px #0e0e0e, 0 0 0 4px #fff' : 'none',
                transform: selectedColor === c.hex ? 'scale(1.08)' : undefined,
                border: LIGHT_COLORS.includes(c.hex) ? '1px solid #444' : 'none',
              }} />
            <span className="text-[10px] tracking-[0.02em] text-center leading-tight max-w-[44px]"
              style={{ color: selectedColor === c.hex ? '#e8e8e8' : '#888', fontFamily: "'Telex', sans-serif" }}>
              {c.name}
            </span>
          </button>
        ))}
      </div>

      {/* Opacity — 3 columns */}
      <div className="mb-6">
        <p className="text-sm text-[#aaa] tracking-[0.06em] mb-3">투명도</p>
        <div className="grid grid-cols-3 border border-[#2a2a2a]">
          {(['투명', '반투명', '불투명'] as const).map((op, i) => (
            <button key={op} onClick={() => setSelectedOpacity(op)}
              className="py-4 text-sm tracking-[0.06em] cursor-pointer transition-all"
              style={{
                fontFamily: "'Telex', sans-serif",
                background: selectedOpacity === op ? '#fff' : 'transparent',
                color: selectedOpacity === op ? '#0e0e0e' : '#999',
                borderRight: i < 2 ? '1px solid #2a2a2a' : 'none',
              }}>
              {op}
            </button>
          ))}
        </div>
      </div>

      {/* 커스텀 컬러 */}
      <div className="mb-6">
        <p className="text-sm text-[#aaa] tracking-[0.06em] mb-3">커스텀 컬러</p>
        <input type="text" placeholder="원하는 컬러를 설명해주세요" className="comm-input" value={customColor} onChange={e => setCustomColor(e.target.value)} />
      </div>

      <p className="text-[#666] text-xs leading-relaxed">
        레진 소재의 특성상 실제 색상은 선택하신 컬러와 다소 차이가 있을 수 있습니다.
      </p>
    </div>,

    /* 1 — Shape */
    <div key="shape">
      <h2 className="text-white mb-2" style={{ fontFamily: "var(--font-gravitas)", fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 400, letterSpacing: '0.02em' }}>Shape</h2>
      <p className="text-sm text-[#999] mb-8 tracking-[0.04em]">테이블 상판 모양을 선택해주세요</p>
      <div className="grid grid-cols-2 gap-3">
        {SHAPE_OPTIONS.map((s) => (
          <button key={s.value}
            onClick={() => { setSelectedShape(s.value); if (s.value === 'rectangle' && selectedLegs === '1') setSelectedLegs('4'); }}
            className="border py-6 px-3 cursor-pointer flex flex-col items-center gap-3 transition-all"
            style={{ borderColor: selectedShape === s.value ? '#fff' : '#222', background: selectedShape === s.value ? 'rgba(255,255,255,0.04)' : 'transparent' }}>
            <div className="w-12 h-12 flex items-center justify-center">
              {s.value === 'organic' && (
                <svg width="48" height="48" viewBox="-6 -6 12 12" fill="none" stroke={selectedShape === s.value ? '#fff' : '#888'} strokeWidth="0.4">
                  <path d="M0.3,4.3 C2.3,5 4.4,4.3 5.1,2.6 C5.9,0.9 5.3,-1.2 4.2,-2.6 C3,-4.3 0.9,-5 -1.1,-4.6 C-3.1,-4.1 -4.7,-2.7 -5.1,-0.9 C-5.6,1 -4.9,3 -3.1,3.9 C-2.1,4.4 -1,3.6 0.3,4.3Z" />
                </svg>
              )}
              {s.value === 'round' && (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={selectedShape === s.value ? '#fff' : '#888'} strokeWidth="1.5">
                  <circle cx="24" cy="24" r="18" />
                </svg>
              )}
              {s.value === 'square' && (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={selectedShape === s.value ? '#fff' : '#888'} strokeWidth="1.5">
                  <rect x="6" y="6" width="36" height="36" rx="3" />
                </svg>
              )}
              {s.value === 'rectangle' && (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={selectedShape === s.value ? '#fff' : '#888'} strokeWidth="1.5">
                  <rect x="3" y="10" width="42" height="28" rx="3" />
                </svg>
              )}
            </div>
            <span className="text-white text-sm" style={{ fontFamily: "var(--font-gravitas)" }}>{s.label}</span>
            <span className="text-xs text-[#999] tracking-[0.04em]">{s.desc}</span>
          </button>
        ))}
      </div>
    </div>,

    /* 2 — Size */
    <div key="size">

      <h2 className="text-white mb-2" style={{ fontFamily: "var(--font-gravitas)", fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 400, letterSpacing: '0.02em' }}>Size</h2>
      <p className="text-sm text-[#999] mb-8 tracking-[0.04em]">테이블 상판 지름 또는 폭을 선택해주세요</p>
      <div className="flex gap-3">
        {(['S', 'M', 'L'] as const).map((letter) => {
          const range = letter === 'S' ? '40–50 cm' : letter === 'M' ? '50–65 cm' : '70–90 cm';
          return (
            <button key={letter} onClick={() => setSelectedSize(letter)}
              className="flex-1 border py-8 px-3 cursor-pointer flex flex-col items-center gap-2 transition-all"
              style={{ borderColor: selectedSize === letter ? '#fff' : '#222', background: selectedSize === letter ? 'rgba(255,255,255,0.04)' : 'transparent' }}>
              <span className="text-white text-3xl leading-none" style={{ fontFamily: "var(--font-gravitas)" }}>{letter}</span>
              <span className="text-xs text-[#999] tracking-[0.04em] text-center">{range}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-6">
        <p className="text-sm text-[#aaa] tracking-[0.06em] mb-3">원하는 사이즈 직접 입력</p>
        <input type="text" placeholder="예: 가로 120cm × 세로 60cm" className="comm-input" value={customSize} onChange={e => setCustomSize(e.target.value)} />
        <p className="mt-3 text-xs text-[#555] leading-relaxed">
          ※ 너무 큰 사이즈는 제작이 제한될 수 있으니 참고해 주세요.
        </p>
      </div>
    </div>,

    /* 3 — Height */
    <div key="height">

      <h2 className="text-white mb-2" style={{ fontFamily: "var(--font-gravitas)", fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 400, letterSpacing: '0.02em' }}>Height</h2>
      <p className="text-sm text-[#999] mb-8 tracking-[0.04em]">테이블 높이를 선택해주세요</p>
      <div className="flex gap-3">
        {HEIGHT_OPTIONS.map((h) => (
          <button key={h.label} onClick={() => setSelectedHeight(h.label)}
            className="flex-1 border py-8 px-3 cursor-pointer flex items-center justify-center transition-all"
            style={{
              borderColor: selectedHeight === h.label ? '#fff' : '#222',
              background: selectedHeight === h.label ? 'rgba(255,255,255,0.04)' : 'transparent',
            }}>
            <span className="text-white text-lg text-center leading-snug" style={{ fontFamily: "var(--font-gravitas)" }}>{h.label}</span>
          </button>
        ))}
      </div>
    </div>,

    /* 4 — Legs */
    <div key="legs">

      <h2 className="text-white mb-2" style={{ fontFamily: "var(--font-gravitas)", fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 400, letterSpacing: '0.02em' }}>Legs</h2>
      <p className="text-sm text-[#999] mb-8 tracking-[0.04em]">다리 형태를 선택해주세요</p>
      <div className="flex gap-3">
        {LEG_OPTIONS.map((l) => {
          const disabled = l.value === '1' && selectedShape === 'rectangle';
          return (
            <button key={l.value}
              onClick={() => { if (!disabled) setSelectedLegs(l.value); }}
              className={`flex-1 border py-8 px-3 flex flex-col items-center gap-3 transition-all ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
              style={{ borderColor: selectedLegs === l.value && !disabled ? '#fff' : '#222', background: selectedLegs === l.value && !disabled ? 'rgba(255,255,255,0.04)' : 'transparent' }}>
              <div className="flex flex-col items-center gap-1 h-14 justify-end">
                <div className="w-12 h-2 bg-[#888] rounded-sm" />
                {l.value === '4' ? (
                  <div className="flex gap-3">
                    {[0,1,2,3].map(i => <span key={i} className="block w-[4px] h-6 bg-[#777] rounded-sm" />)}
                  </div>
                ) : (
                  <span className="block w-2 h-7 bg-[#777] rounded-sm" />
                )}
              </div>
              <span className="text-white text-sm" style={{ fontFamily: "var(--font-gravitas)" }}>{l.label}</span>
              <span className="text-xs text-[#999] text-center tracking-[0.04em]">{l.desc}</span>
              {disabled && <span className="text-xs text-[#777]">직사각형은 불가</span>}
            </button>
          );
        })}
      </div>
    </div>,

    /* 5 — Inquiry */
    <div key="inquiry">

      <h2 className="text-white mb-2" style={{ fontFamily: "var(--font-gravitas)", fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 400, letterSpacing: '0.02em' }}>Inquiry</h2>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-[#999] tracking-[0.04em]">선택 내용을 확인하고 문의를 보내주세요</p>
        {!submitted && (
          <button form="inquiry-form" type="submit" disabled={submitting}
            className="bg-white text-black border-none py-2.5 px-8 text-xs tracking-[0.08em] cursor-pointer hover:opacity-75 transition-opacity disabled:opacity-40 shrink-0"
            style={{ fontFamily: "'Telex', sans-serif" }}>
            {submitting ? '전송 중...' : '문의 보내기'}
          </button>
        )}
      </div>

      <div className="border-t border-b border-[#222] py-4 mb-7">
        {summaryRows.map((row) => (
          <div key={row.label} className="flex justify-between py-1.5 text-sm">
            <span className="text-[#888] tracking-[0.06em]">{row.label}</span>
            <span className="text-[#e8e8e8]">{row.value}</span>
          </div>
        ))}
      </div>

      {submitted ? (
        <p className="text-white/50 text-sm tracking-[0.04em]">
          문의가 접수됐습니다. 빠른 시일 내에 연락드리겠습니다.
        </p>
      ) : (
        <form id="inquiry-form" className="flex flex-col gap-4" onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          setFormData({
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
            email: (form.elements.namedItem('email') as HTMLInputElement).value,
            note: (form.elements.namedItem('note') as HTMLTextAreaElement).value,
          });
          handleSend();
        }}>
          <div className="flex gap-6">
            <div className="flex-1">
              <p className="text-sm text-[#aaa] mb-1" style={{ fontFamily: "'Telex', sans-serif" }}>
                이름<span className="text-red-500 ml-0.5">*</span>
              </p>
              <input name="name" type="text" required className="comm-input" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#aaa] mb-1" style={{ fontFamily: "'Telex', sans-serif" }}>
                전화번호<span className="text-red-500 ml-0.5">*</span>
              </p>
              <input name="phone" type="tel" required inputMode="numeric" pattern="[0-9]*"
                onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''); }}
                className="comm-input" />
            </div>
          </div>
          <input name="email" type="email" placeholder="이메일 (선택)" className="comm-input" />
          <textarea name="note" placeholder="추가 요청사항" rows={3} className="comm-input resize-none" />
          {submitError && <p className="text-red-400 text-xs">{submitError}</p>}
        </form>
      )}
    </div>,
  ];

  return (
    <div className="h-screen flex flex-col" style={{ background: '#0e0e0e', color: '#e8e8e8', fontFamily: "'Telex', sans-serif" }}>
      {/* ── Top bar ── */}
      <div className="h-14 shrink-0 bg-black flex items-center justify-between z-[100] border-b border-[#222] px-5">
        <Link href="/" className="text-white flex items-center hover:opacity-50 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="13,4 7,10 13,16" />
          </svg>
        </Link>
        <Link href="/" className="text-[20px] text-white tracking-[0.12em] hover:opacity-50 transition-opacity" style={{ fontFamily: "var(--font-gravitas, 'Gravitas One'), serif" }}>
          EEL
        </Link>
        <div className="flex gap-1.5 items-center">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <button key={i} onClick={() => goToStep(i)}
              className="h-1 cursor-pointer border-0 p-0 rounded-sm transition-all duration-300"
              style={{
                width: i === currentStep ? '32px' : '20px',
                background: i <= currentStep ? '#fff' : '#333',
              }} />
          ))}
        </div>
      </div>

      {/* ── Layout ── */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0">

        {/* Left: current step */}
        <div className="flex-1 min-w-0 flex flex-col min-h-0">
          {/* Step content — scrollable */}
          <div className="flex-1 overflow-y-auto hide-scrollbar px-6 sm:px-10 md:px-[8%] lg:px-[10%] pt-10 pb-6"
            style={{ opacity: fadeIn ? 1 : 0, transition: 'opacity 0.18s ease' }}>
            {stepContent[currentStep]}
          </div>

          {/* Nav buttons */}
          <div className="shrink-0 border-t border-[#1a1a1a] px-6 sm:px-10 md:px-[8%] lg:px-[10%] py-5 flex items-center justify-between">
            <button onClick={goPrev} disabled={currentStep === 0}
              className="flex items-center gap-3 bg-transparent border-0 cursor-pointer transition-opacity disabled:opacity-20 hover:opacity-60"
              style={{ color: '#ccc', fontFamily: "'Telex', sans-serif", fontSize: '16px', letterSpacing: '0.06em' }}>
              <svg width="28" height="28" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="13,4 7,10 13,16" />
              </svg>
              이전
            </button>

            <span className="text-[#888] tracking-[0.1em]" style={{ fontFamily: "var(--font-staatliches)", fontSize: '16px' }}>
              {currentStep + 1} / {TOTAL_STEPS}
            </span>

            {currentStep < TOTAL_STEPS - 1 ? (
              <button onClick={goNext}
                className="flex items-center gap-3 bg-transparent border-0 cursor-pointer hover:opacity-60 transition-opacity"
                style={{ color: '#ccc', fontFamily: "'Telex', sans-serif", fontSize: '16px', letterSpacing: '0.06em' }}>
                다음
                <svg width="28" height="28" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="7,4 13,10 7,16" />
                </svg>
              </button>
            ) : (
              <div className="w-16" />
            )}
          </div>
        </div>

        {/* Right: 3D preview + summary — md+ only */}
        <div className="hidden md:flex w-[44%] min-w-[280px] max-w-[520px] shrink-0 flex-col border-l border-[#1a1a1a]">
          <div className="flex-1 w-full flex items-center justify-center p-8 min-h-0">
            <div className="w-full h-full">
              <CommissionPreview3D resinColor={previewColor} size={selectedSize} height={selectedHeight} legs={selectedLegs} shape={selectedShape} opacity={selectedOpacity} />
            </div>
          </div>
          <div className="w-full border-t border-[#1a1a1a] px-6 py-5 shrink-0">
            {summaryRows.map((row) => (
              <div key={row.label} className="flex justify-between py-1 text-xs">
                <span className="text-[#888] tracking-[0.08em]" style={{ fontFamily: "var(--font-staatliches, 'Staatliches'), sans-serif" }}>{row.label}</span>
                <span className="text-[#e8e8e8] transition-colors duration-300">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .comm-input {
          background: transparent; border: none; border-bottom: 1px solid #222;
          color: #e8e8e8; font-family: 'Telex', sans-serif; font-size: 14px;
          padding: 12px 0; outline: none; width: 100%; transition: border-color 0.2s;
        }
        .comm-input::placeholder { color: #777; }
        .comm-input:focus { border-bottom-color: #fff; }
      `}</style>
    </div>
  );
}
