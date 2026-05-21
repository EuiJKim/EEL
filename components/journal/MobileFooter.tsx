/**
 * Mobile-only footer (< md). About/Contact live in AboutPopover (sticky
 * top) and IG/Email/Commission live in MobileStickyCTA (sticky bottom),
 * so the footer is reduced to a closing imprint mark — page punctuation.
 */
export default function MobileFooter() {
  return (
    <footer
      className="md:hidden text-center text-[10px] tracking-[0.2em] uppercase text-[#5a6058] py-8 border-t border-[#3a403c]"
      style={{ fontFamily: 'var(--font-staatliches), sans-serif' }}
    >
      © 2026 EEL Studio · Seoul
    </footer>
  );
}
