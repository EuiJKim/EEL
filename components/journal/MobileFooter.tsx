/**
 * Mobile-only footer (< md). About/Contact live in AboutPopover (sticky
 * top) and IG/Email/Commission live in MobileStickyCTA (sticky bottom),
 * so the footer is reduced to a closing imprint mark — page punctuation.
 */
export default function MobileFooter() {
  return (
    <footer
      className="md:hidden text-center text-[9px] leading-[1.8] tracking-[0.15em] uppercase text-[#5a6058] py-8 px-6 border-t border-[#3a403c] pb-24"
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
    >
      <p>010-5229-7728</p>
      <p>Daily 12:00 – 18:00</p>
      <p>37-14, Hoedong-gil, 403, Korea</p>
      <p>BIZ LICENSE 305-46-07793</p>
      <p className="mt-2">EEL · CHAE MINSOO</p>
      <p className="mt-1">Copyright © 2025 EEL All rights reserved.</p>
    </footer>
  );
}
