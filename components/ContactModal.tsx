'use client';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center transition-opacity duration-300"
      style={{
        background: 'rgba(0,0,0,0.4)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-[#111] w-[480px] max-w-[calc(100%-40px)] p-12 relative rounded-xl transition-transform duration-300"
        style={{ transform: open ? 'translateY(0)' : 'translateY(12px)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-5 bg-transparent border-none text-sm cursor-pointer text-white opacity-40 hover:opacity-100 transition-opacity duration-200"
        >
          &#10005;
        </button>

        <p
          className="text-[28px] text-white tracking-[0.06em] mb-3.5 -mt-2"
          style={{ fontFamily: "var(--font-gravitas, 'Gravitas One'), serif" }}
        >
          Contact
        </p>

        <hr className="border-none border-t border-[#2a2a2a] mb-5" style={{ borderTopWidth: 1, borderTopStyle: 'solid', borderTopColor: '#2a2a2a' }} />

        <div className="flex flex-col gap-4">
          {/* Instagram */}
          <div className="flex items-center gap-4 text-[#e8e8e8]" style={{ fontFamily: "var(--font-dm-sans, 'DM Sans'), sans-serif", fontSize: 14, letterSpacing: '0.02em' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-85">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
            <span>eel.eel.eel.eel</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 text-[#e8e8e8]" style={{ fontFamily: "var(--font-dm-sans, 'DM Sans'), sans-serif", fontSize: 14, letterSpacing: '0.02em' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-85">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <polyline points="2,4 12,13 22,4"/>
            </svg>
            <span>eelobjects<span style={{ fontFamily: "'Telex', sans-serif", WebkitTextStroke: '0' }}>@</span>gmail.com</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4 text-[#e8e8e8]" style={{ fontFamily: "var(--font-dm-sans, 'DM Sans'), sans-serif", fontSize: 14, letterSpacing: '0.02em' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-85">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            <span>압구정동, 서울 &nbsp;/&nbsp; 문발동, 파주</span>
          </div>

        </div>
      </div>
    </div>
  );
}
