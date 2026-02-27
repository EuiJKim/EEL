'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PROCESS_STEPS = [
  {
    number: '01',
    title: '원목 선별',
    desc: '수백 년 된 원목에서 자연이 만든 고유한 결과 형태를 직접 선별합니다.',
  },
  {
    number: '02',
    title: '레진 배합',
    desc: '원하는 색감과 깊이를 위해 에폭시 레진을 수작업으로 혼합합니다.',
  },
  {
    number: '03',
    title: '타설 & 양생',
    desc: '일정 온도와 습도를 유지하며 72시간 이상 레진을 천천히 굳힙니다.',
  },
  {
    number: '04',
    title: '연마 & 마감',
    desc: '2000방까지 단계적으로 연마해 유리처럼 투명한 표면을 완성합니다.',
  },
];

const STATS = [
  { value: '72h+', label: '양생 시간' },
  { value: '6–10w', label: '제작 기간' },
  { value: '100%', label: '핸드메이드' },
];

export default function CraftBridge() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#0d0d0d', padding: '120px 24px' }}
    >
      {/* Background texture lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 80px)',
        }}
      />

      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '400px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(180,120,60,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative max-w-5xl mx-auto">

        {/* Headline */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs font-bold uppercase tracking-[0.3em] mb-5"
            style={{ color: 'rgba(180,120,60,0.8)' }}
          >
            The Craft
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
            style={{
              color: 'transparent',
              backgroundImage: 'linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              lineHeight: 1.15,
            }}
          >
            모든 테이블은<br />당신을 위해 처음부터 만들어집니다
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ color: 'rgba(255,255,255,0.35)', fontSize: '15px', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto' }}
          >
            동일한 테이블은 세상에 단 하나도 없습니다.<br />
            자연이 만든 나무결과 당신이 선택한 색감이 만나<br />오직 하나뿐인 작품이 탄생합니다.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-0 mb-20"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="flex flex-col items-center px-10 py-5" style={{
                borderLeft: i === 0 ? '1px solid rgba(255,255,255,0.06)' : undefined,
                borderRight: '1px solid rgba(255,255,255,0.06)',
              }}>
                <span
                  className="text-3xl font-bold mb-1 tracking-tight"
                  style={{ color: 'rgba(255,255,255,0.9)', fontVariantNumeric: 'tabular-nums' }}
                >
                  {stat.value}
                </span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', overflow: 'hidden' }}
        >
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: '#0d0d0d',
                padding: '32px 28px',
              }}
            >
              <span
                className="block text-xs font-bold font-mono mb-4"
                style={{ color: 'rgba(180,120,60,0.6)' }}
              >
                {step.number}
              </span>
              <h3
                className="text-base font-semibold mb-2"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col items-center mt-16 gap-3"
        >
          <span className="text-xs uppercase tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            당신의 테이블을 만들어보세요
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12M4 10l6 6 6-6" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
