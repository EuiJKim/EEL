'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import type { TableShape } from '@/components/CommissionPreview3D';

const CommissionPreview3D = dynamic(() => import('@/components/CommissionPreview3D'), { ssr: false });

/* ── Color palette (hardcoded, richer) ── */
const COLORS = [
  { hex: '#A8D5E2', name: 'Glacier Blue' },
  { hex: '#1B4F72', name: 'Deep Ocean' },
  { hex: '#5BA4CF', name: 'Sky Blue' },
  { hex: '#40E0D0', name: 'Turquoise' },
  { hex: '#0E7C7B', name: 'Teal' },
  { hex: '#27AE60', name: 'Emerald' },
  { hex: '#7DCEA0', name: 'Sage' },
  { hex: '#ABEBC6', name: 'Mint' },
  { hex: '#2ECC71', name: 'Green' },
  { hex: '#1ABC9C', name: 'Aqua' },
  { hex: '#F0EDE8', name: 'Pearl' },
  { hex: '#BDC3C7', name: 'Smoke' },
  { hex: '#17202A', name: 'Obsidian' },
  { hex: '#F39C12', name: 'Amber' },
  { hex: '#E74C3C', name: 'Coral' },
  { hex: '#CA6F1E', name: 'Terracotta' },
  { hex: '#6C3483', name: 'Violet' },
  { hex: '#2C3E50', name: 'Charcoal' },
  { hex: '#D4AC0D', name: 'Gold' },
  { hex: '#E8DAEF', name: 'Lavender' },
  { hex: '#F5B7B1', name: 'Rose' },
  { hex: '#AED6F1', name: 'Baby Blue' },
  { hex: '#FAD7A0', name: 'Peach' },
  { hex: '#D5F5E3', name: 'Seafoam' },
  { hex: '#85C1E9', name: 'Cornflower' },
];

/* ── Options ── */
const SHAPE_OPTIONS: { value: TableShape; label: string; desc: string }[] = [
  { value: 'organic', label: 'Organic', desc: '자연스러운 곡선' },
  { value: 'round', label: 'Round', desc: '원형' },
  { value: 'square', label: 'Square', desc: '정사각형' },
  { value: 'rectangle', label: 'Rectangle', desc: '직사각형' },
];

const HEIGHT_OPTIONS = [
  { label: 'Dining' as const, cm: '72 — 75 cm', desc: '식탁' },
  { label: 'Café' as const, cm: '65 cm', desc: '카페, 바 체어용' },
  { label: 'Side' as const, cm: '40 — 50 cm', desc: '소파 사이드, 협탁' },
];

const LEG_OPTIONS = [
  { value: '4' as const, label: '4 Legs', desc: '안정적인 네 다리' },
  { value: '1' as const, label: 'Pedestal', desc: '중앙 단일 기둥' },
];

export default function CommissionClient() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [colorName, setColorName] = useState('컬러를 선택해주세요');
  const [selectedShape, setSelectedShape] = useState<TableShape>('organic');
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | null>(null);
  const [selectedHeight, setSelectedHeight] = useState<'Dining' | 'Café' | 'Side' | null>(null);
  const [selectedLegs, setSelectedLegs] = useState<'4' | '1' | null>(null);
  const [customColorOpen, setCustomColorOpen] = useState(false);
  const [previewColor, setPreviewColor] = useState('#EDE4D0');

  const sectionsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!sectionsRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    sectionsRef.current.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const summaryRows = [
    { label: 'Color', value: selectedColor ? colorName : '—' },
    { label: 'Shape', value: SHAPE_OPTIONS.find(s => s.value === selectedShape)?.label ?? '—' },
    { label: 'Size', value: selectedSize ?? '—' },
    { label: 'Height', value: selectedHeight ?? '—' },
    { label: 'Legs', value: selectedLegs === '4' ? '4 Legs' : selectedLegs === '1' ? 'Pedestal' : '—' },
  ];

  /* step number helper */
  const Step = ({ n }: { n: string }) => (
    <div className="text-base sm:text-lg lg:text-[22px] tracking-[0.2em] text-[#666] mb-2 sm:mb-3" style={{ fontFamily: "var(--font-staatliches, 'Staatliches'), sans-serif" }}>{n}</div>
  );
  const Title = ({ children }: { children: string }) => (
    <h2 className="text-white text-xl sm:text-2xl lg:text-4xl mb-1.5 sm:mb-2" style={{ fontFamily: "var(--font-gravitas, 'Gravitas One'), serif", fontWeight: 400, letterSpacing: '0.02em' }}>{children}</h2>
  );
  const Desc = ({ children }: { children: string }) => (
    <p className="text-xs sm:text-sm text-[#666] mb-4 sm:mb-6 lg:mb-8 leading-relaxed">{children}</p>
  );

  return (
    <div className="h-screen flex flex-col" style={{ background: '#0e0e0e', color: '#e8e8e8', fontFamily: "'Telex', sans-serif" }}>
      {/* ── Top bar ── */}
      <div className="h-16 shrink-0 bg-black flex items-center justify-center z-[100] border-b border-[#222] relative">
        <Link href="/" className="absolute left-5 text-white flex items-center hover:opacity-50 transition-opacity">
          <svg width="28" height="28" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="13,4 7,10 13,16" />
          </svg>
        </Link>
        <Link href="/" className="text-[22px] text-white tracking-[0.12em] hover:opacity-50 transition-opacity" style={{ fontFamily: "var(--font-gravitas, 'Gravitas One'), serif" }}>
          EEL
        </Link>
      </div>

      {/* ── Layout: mobile=column, md+=row ── */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0">

        {/* Mobile: 3D preview strip at top */}
        <div className="md:hidden shrink-0 h-[200px] border-b border-[#222] flex items-center justify-center px-4">
          <div className="w-full h-full max-w-[240px]">
            <CommissionPreview3D resinColor={previewColor} size={selectedSize} height={selectedHeight} legs={selectedLegs} shape={selectedShape} />
          </div>
        </div>

        {/* Left: steps — hide-scrollbar */}
        <div ref={sectionsRef} className="flex-1 min-w-0 overflow-y-auto hide-scrollbar px-5 sm:px-8 md:px-[8%] lg:px-[10%] py-8 sm:py-12 md:py-16 lg:py-20 pb-40">

          {/* Intro */}
          <div className="fade-up mb-12 sm:mb-20 lg:mb-24">
            <h1 className="text-white mb-4 sm:mb-6" style={{ fontFamily: "var(--font-gravitas, 'Gravitas One'), serif", fontSize: 'clamp(20px, 3.2vw, 46px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '0.02em' }}>
              Custom Resin Table
            </h1>
            <hr className="border-none mt-4 w-full" style={{ borderTop: '1px solid #333' }} />
          </div>

          {/* 01 Color */}
          <section className="fade-up mb-12 sm:mb-20 lg:mb-28">
            <Step n="01" />
            <Title>Color</Title>
            <Desc>레진 컬러를 선택해주세요</Desc>
            <div className="grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-9 gap-1.5 sm:gap-2 mb-3 sm:mb-4 max-w-[340px]">
              {COLORS.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => { setSelectedColor(c.hex); setColorName(c.name); setPreviewColor(c.hex); }}
                  className="aspect-square rounded cursor-pointer transition-transform duration-200 hover:scale-[1.08] max-w-[34px]"
                  style={{
                    background: c.hex,
                    boxShadow: selectedColor === c.hex ? '0 0 0 3px #fff, 0 0 0 5px #0e0e0e' : 'none',
                    transform: selectedColor === c.hex ? 'scale(1.08)' : undefined,
                    border: ['#F0EDE8', '#E8DAEF', '#D5F5E3', '#FAD7A0', '#F5B7B1'].includes(c.hex) ? '1px solid #555' : 'none',
                  }}
                />
              ))}
            </div>
            <p className={`text-xs sm:text-[13px] tracking-[0.06em] min-h-[20px] transition-colors duration-300 ${selectedColor ? 'text-[#e8e8e8]' : 'text-[#666]'}`}>
              {colorName}
            </p>
            <button
              onClick={() => setCustomColorOpen(!customColorOpen)}
              className="mt-3 sm:mt-4 bg-transparent border border-[#222] text-[#666] text-xs sm:text-[13px] px-4 sm:px-5 py-2 sm:py-2.5 cursor-pointer tracking-[0.04em] hover:border-white hover:text-white transition-all"
              style={{ fontFamily: "'Telex', sans-serif" }}
            >
              + 커스텀 컬러
            </button>
            {customColorOpen && (
              <div className="mt-3">
                <input type="text" placeholder="원하는 컬러를 설명해주세요" className="comm-input" />
              </div>
            )}
          </section>

          {/* 02 Shape */}
          <section className="fade-up mb-12 sm:mb-20 lg:mb-28">
            <Step n="02" />
            <Title>Shape</Title>
            <Desc>테이블 상판 모양을 선택해주세요</Desc>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {SHAPE_OPTIONS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => { setSelectedShape(s.value); if (s.value === 'rectangle' && selectedLegs === '1') setSelectedLegs('4'); }}
                  className="border py-4 sm:py-5 lg:py-7 px-2 sm:px-3 cursor-pointer flex flex-col items-center gap-2 sm:gap-3 transition-all"
                  style={{
                    borderColor: selectedShape === s.value ? '#fff' : '#222',
                    background: selectedShape === s.value ? 'rgba(255,255,255,0.04)' : 'transparent',
                  }}
                >
                  {/* Shape icon */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                    {s.value === 'organic' && (
                      <svg width="48" height="48" viewBox="-6 -6 12 12" fill="none" stroke={selectedShape === s.value ? '#fff' : '#666'} strokeWidth="0.4">
                        <path d="M0.3,4.3 C2.3,5 4.4,4.3 5.1,2.6 C5.9,0.9 5.3,-1.2 4.2,-2.6 C3,-4.3 0.9,-5 -1.1,-4.6 C-3.1,-4.1 -4.7,-2.7 -5.1,-0.9 C-5.6,1 -4.9,3 -3.1,3.9 C-2.1,4.4 -1,3.6 0.3,4.3Z" />
                      </svg>
                    )}
                    {s.value === 'round' && (
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={selectedShape === s.value ? '#fff' : '#666'} strokeWidth="1.5">
                        <circle cx="24" cy="24" r="18" />
                      </svg>
                    )}
                    {s.value === 'square' && (
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={selectedShape === s.value ? '#fff' : '#666'} strokeWidth="1.5">
                        <rect x="6" y="6" width="36" height="36" rx="3" />
                      </svg>
                    )}
                    {s.value === 'rectangle' && (
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={selectedShape === s.value ? '#fff' : '#666'} strokeWidth="1.5">
                        <rect x="3" y="10" width="42" height="28" rx="3" />
                      </svg>
                    )}
                  </div>
                  <span className="text-white text-xs sm:text-sm" style={{ fontFamily: "var(--font-gravitas, 'Gravitas One'), serif" }}>{s.label}</span>
                  <span className="text-[9px] sm:text-[10px] lg:text-xs text-[#666] text-center tracking-[0.04em]">{s.desc}</span>
                </button>
              ))}
            </div>
          </section>

          {/* 03 Size */}
          <section className="fade-up mb-12 sm:mb-20 lg:mb-28">
            <Step n="03" />
            <Title>Size</Title>
            <Desc>테이블 상판 지름 또는 폭을 선택해주세요</Desc>
            <div className="flex gap-2 sm:gap-3 lg:gap-4">
              {(['S', 'M', 'L'] as const).map((letter) => {
                const range = letter === 'S' ? '30–45cm' : letter === 'M' ? '50–65cm' : '70–90cm';
                return (
                  <button
                    key={letter}
                    onClick={() => setSelectedSize(letter)}
                    className="flex-1 border py-4 sm:py-5 lg:py-7 px-2 sm:px-3 lg:px-5 cursor-pointer flex flex-col items-center gap-1.5 sm:gap-2 transition-all"
                    style={{ borderColor: selectedSize === letter ? '#fff' : '#222', background: selectedSize === letter ? 'rgba(255,255,255,0.04)' : 'transparent' }}
                  >
                    <span className="text-white text-xl sm:text-2xl lg:text-[32px] leading-none" style={{ fontFamily: "var(--font-gravitas, 'Gravitas One'), serif" }}>{letter}</span>
                    <span className="text-[9px] sm:text-[10px] lg:text-xs text-[#666] tracking-[0.04em] text-center">{range}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 04 Height */}
          <section className="fade-up mb-12 sm:mb-20 lg:mb-28">
            <Step n="04" />
            <Title>Height</Title>
            <Desc>테이블 용도에 맞는 높이를 선택해주세요</Desc>
            <div className="flex flex-col gap-0.5">
              {HEIGHT_OPTIONS.map((h) => (
                <button
                  key={h.label}
                  onClick={() => setSelectedHeight(h.label)}
                  className="flex items-center gap-2 sm:gap-4 lg:gap-6 py-3 sm:py-4 lg:py-5 px-3 sm:px-4 lg:px-6 cursor-pointer transition-all text-left"
                  style={{
                    border: selectedHeight === h.label ? '1px solid #fff' : '1px solid transparent',
                    borderBottom: selectedHeight === h.label ? '1px solid #fff' : '1px solid #222',
                    background: selectedHeight === h.label ? 'rgba(255,255,255,0.04)' : 'transparent',
                  }}
                >
                  <span className="text-white text-sm sm:text-base lg:text-lg min-w-[50px] sm:min-w-[70px] lg:min-w-[80px]" style={{ fontFamily: "var(--font-gravitas, 'Gravitas One'), serif" }}>{h.label}</span>
                  <span className="text-[10px] sm:text-xs lg:text-sm text-[#666] flex-1 tracking-[0.04em]">{h.cm}</span>
                  <span className="text-[9px] sm:text-[10px] lg:text-xs text-[#444] tracking-[0.04em] hidden sm:inline">{h.desc}</span>
                </button>
              ))}
            </div>
          </section>

          {/* 05 Legs */}
          <section className="fade-up mb-12 sm:mb-20 lg:mb-28">
            <Step n="05" />
            <Title>Legs</Title>
            <Desc>다리 형태를 선택해주세요</Desc>
            <div className="flex gap-2 sm:gap-3 lg:gap-4">
              {LEG_OPTIONS.map((l) => {
                const disabled = l.value === '1' && selectedShape === 'rectangle';
                return (
                <button
                  key={l.value}
                  onClick={() => { if (!disabled) setSelectedLegs(l.value); }}
                  className={`flex-1 border py-4 sm:py-5 lg:py-7 px-2 sm:px-3 lg:px-5 flex flex-col items-center gap-2 sm:gap-3 transition-all ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                  style={{ borderColor: selectedLegs === l.value && !disabled ? '#fff' : '#222', background: selectedLegs === l.value && !disabled ? 'rgba(255,255,255,0.04)' : 'transparent' }}
                >
                  <div className="flex flex-col items-center gap-1 h-12 sm:h-14 lg:h-16 justify-end">
                    <div className="w-10 sm:w-[50px] lg:w-[60px] h-2 sm:h-2.5 bg-[#555] rounded-sm" />
                    {l.value === '4' ? (
                      <div className="flex gap-2 sm:gap-2.5 lg:gap-3.5">
                        {[0,1,2,3].map(i => <span key={i} className="block w-[3px] sm:w-[4px] lg:w-[5px] h-5 sm:h-6 lg:h-7 bg-[#444] rounded-sm" />)}
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <span className="block w-1.5 sm:w-2 lg:w-2.5 h-6 sm:h-7 lg:h-8 bg-[#444] rounded-sm" />
                      </div>
                    )}
                  </div>
                  <span className="text-white text-xs sm:text-sm lg:text-base" style={{ fontFamily: "var(--font-gravitas, 'Gravitas One'), serif" }}>{l.label}</span>
                  <span className="text-[9px] sm:text-[10px] lg:text-xs text-[#666] text-center tracking-[0.04em]">{l.desc}</span>
                  {disabled && <span className="text-[9px] text-[#555] mt-1">직사각형은 불가</span>}
                </button>
                );
              })}
            </div>
          </section>

          {/* 06 Inquiry */}
          <section className="fade-up mb-12 sm:mb-20 lg:mb-28">
            <Step n="06" />
            <Title>Inquiry</Title>
            <Desc>선택 내용을 확인하고 문의를 보내주세요</Desc>

            <div className="border-t border-b border-[#222] py-4 sm:py-6 mb-8 sm:mb-10">
              {summaryRows.map((row) => (
                <div key={row.label} className="flex justify-between py-1.5 sm:py-2 text-xs sm:text-sm">
                  <span className="text-[#666] tracking-[0.06em]">{row.label}</span>
                  <span className="text-[#e8e8e8]">{row.value}</span>
                </div>
              ))}
            </div>

            <form className="flex flex-col gap-4 sm:gap-5" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="이름" required className="comm-input" />
              <input type="tel" placeholder="전화번호" required className="comm-input" />
              <input type="email" placeholder="이메일" required className="comm-input" />
              <textarea placeholder="추가 요청사항" rows={4} className="comm-input resize-none" />
              <button type="submit" className="self-start bg-white text-black border-none py-3 sm:py-4 px-6 sm:px-10 text-xs sm:text-sm tracking-[0.08em] cursor-pointer hover:opacity-75 transition-opacity mt-2" style={{ fontFamily: "'Telex', sans-serif" }}>
                문의 보내기
              </button>
            </form>
          </section>
        </div>

        {/* Right: 3D preview — md+ only */}
        <div className="hidden md:flex w-[35%] min-w-[200px] max-w-[400px] shrink-0 flex-col border-l border-[#222]">
          <div className="flex-1 w-full flex items-center justify-center p-3 sm:p-6 lg:p-10 min-h-0">
            <div className="w-full h-full">
              <CommissionPreview3D
                resinColor={previewColor}
                size={selectedSize}
                height={selectedHeight}
                legs={selectedLegs}
                shape={selectedShape}
              />
            </div>
          </div>
          <div className="w-full border-t border-[#222] px-3 sm:px-6 lg:px-10 py-3 sm:py-4 lg:py-6 shrink-0">
            {summaryRows.map((row) => (
              <div key={row.label} className="flex justify-between py-0.5 sm:py-1 lg:py-1.5 text-[10px] sm:text-[11px] lg:text-[13px]">
                <span className="text-[#666] tracking-[0.08em]" style={{ fontFamily: "var(--font-staatliches, 'Staatliches'), sans-serif" }}>{row.label}</span>
                <span className="text-[#e8e8e8] transition-colors duration-300">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .fade-up { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
      `}</style>
      <style jsx global>{`
        .comm-input {
          background: transparent; border: none; border-bottom: 1px solid #222;
          color: #e8e8e8; font-family: 'Telex', sans-serif; font-size: 14px;
          padding: 12px 0; outline: none; width: 100%; transition: border-color 0.2s;
        }
        .comm-input::placeholder { color: #444; }
        .comm-input:focus { border-bottom-color: #fff; }
        @media (max-width: 640px) { .comm-input { font-size: 13px; padding: 10px 0; } }
      `}</style>
    </div>
  );
}
