'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { FeedEntry } from '@/types/journal';
import { getStoredUTM } from '@/components/UTMTracker';

interface Props {
  entry: FeedEntry;
}

type SendState = 'idle' | 'sending' | 'sent' | 'error';

export default function PieceInquiryButton({ entry }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [state, setState] = useState<SendState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    setErrorMsg('');
    try {
      const utm = getStoredUTM();
      const res = await fetch('/api/piece-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          note,
          pieceId: entry.id,
          pieceTitle: entry.title,
          pieceSize: entry.size ?? '',
          piecePrice: entry.price ?? '',
          utm,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? '전송 실패');
      }
      setState('sent');
      // Fire Pixel Lead event with ad attribution
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        const value = parseFloat((entry.price ?? '').replace(/[^0-9]/g, '')) || 500_000;
        window.fbq('track', 'Lead', {
          value,
          currency: 'KRW',
          content_name: entry.title,
          content_category: entry.category,
          ...utm,
        });
      }
    } catch (err) {
      setState('error');
      setErrorMsg(err instanceof Error ? err.message : '전송 실패');
    }
  }

  function reset() {
    setName('');
    setPhone('');
    setEmail('');
    setNote('');
    setState('idle');
    setErrorMsg('');
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          reset();
          setOpen(true);
        }}
        className="inline-block text-center px-5 py-3 bg-[#F2EDE4] text-[#1a1d1b] text-[11px] tracking-[0.2em] uppercase hover:bg-white transition-colors min-h-[44px]"
        style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
      >
        Inquire about this piece →
      </button>

      {open && mounted && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 md:p-6"
          onClick={() => setOpen(false)}
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          <div
            className="relative w-full max-w-[480px] max-h-[90vh] overflow-y-auto bg-[#1a1d1b] border border-[#2a2e2c] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center text-[#8a9488] hover:text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4 L16 16 M16 4 L4 16" />
              </svg>
            </button>

            <div className="px-7 pt-9 pb-7">
              {/* Header */}
              <div
                className="text-[10px] tracking-[0.22em] uppercase text-[#8a9488] mb-2"
                style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
              >
                Inquire
              </div>
              <h2
                className="text-[22px] text-[#F2EDE4] leading-[1.2] mb-1"
                style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', fontWeight: 500 }}
              >
                {entry.title}
              </h2>
              <div className="text-[12px] text-[#8a9488] mb-6 space-y-0.5">
                {entry.size && <div>{entry.size}</div>}
                {entry.price && <div className="text-[#c0c5c2]">{entry.price}</div>}
              </div>

              {state === 'sent' ? (
                <div className="py-6">
                  <p className="text-[14px] text-[#F2EDE4] leading-[1.7] mb-2">
                    문의가 접수되었습니다.
                  </p>
                  <p className="text-[12px] text-[#8a9488] leading-[1.7] mb-6">
                    1–2 영업일 내에 연락드리겠습니다.
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="w-full px-5 py-3 border border-[#5a6058] text-[11px] tracking-[0.2em] uppercase text-[#F2EDE4] hover:bg-[#F2EDE4] hover:text-[#1a1d1b] transition-colors min-h-[44px]"
                    style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Field
                    label="Name *"
                    value={name}
                    onChange={setName}
                    required
                    autoComplete="name"
                  />
                  <Field
                    label="Phone *"
                    value={phone}
                    onChange={setPhone}
                    required
                    type="tel"
                    autoComplete="tel"
                  />
                  <Field
                    label="Email"
                    value={email}
                    onChange={setEmail}
                    type="email"
                    autoComplete="email"
                  />
                  <div>
                    <label
                      className="block text-[10px] tracking-[0.2em] uppercase text-[#8a9488] mb-1.5"
                      style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
                    >
                      Message
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={4}
                      maxLength={1000}
                      placeholder="배송, 결제, 추가 정보 등 궁금한 점을 적어주세요."
                      className="w-full bg-[#2e3330] border border-[#3a403c] focus:border-[#8a9488] outline-none px-3 py-2.5 text-[14px] text-[#F2EDE4] placeholder-[#5a6058] resize-none"
                    />
                  </div>

                  {state === 'error' && (
                    <p className="text-[12px] text-[#b06a64]">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={state === 'sending' || !name || !phone}
                    className="w-full px-5 py-3 bg-[#F2EDE4] text-[#1a1d1b] text-[11px] tracking-[0.2em] uppercase hover:bg-white transition-colors min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
                  >
                    {state === 'sending' ? 'Sending…' : 'Send Inquiry →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = 'text',
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        className="block text-[10px] tracking-[0.2em] uppercase text-[#8a9488] mb-1.5"
        style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        className="w-full bg-[#2e3330] border border-[#3a403c] focus:border-[#8a9488] outline-none px-3 py-2.5 text-[14px] text-[#F2EDE4] placeholder-[#5a6058]"
      />
    </div>
  );
}
