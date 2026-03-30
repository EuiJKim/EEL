import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6 py-16 sm:py-20">
        {/* Top: Brand + Nav */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10 mb-16">
          <div>
            <Link
              href="/"
              className="text-[11px] font-bold tracking-[0.35em] uppercase text-white"
            >
              EEL
            </Link>
            <p className="mt-3 text-sm text-zinc-600 leading-relaxed max-w-[280px]">
              프리미엄 순수 레진 아트퍼니처.<br />
              모든 테이블은 당신을 위해 처음부터 만들어집니다.
            </p>
          </div>

          <nav className="flex gap-10">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600">
                Menu
              </span>
              <Link href="/products" className="text-sm text-zinc-500 hover:text-white transition-colors">
                Works
              </Link>
              <Link href="/#build" className="text-sm text-zinc-500 hover:text-white transition-colors">
                Order
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600">
                Account
              </span>
              <Link href="/orders" className="text-sm text-zinc-500 hover:text-white transition-colors">
                My Orders
              </Link>
              <Link href="/auth" className="text-sm text-zinc-500 hover:text-white transition-colors">
                Login
              </Link>
            </div>
          </nav>
        </div>

        {/* Bottom: Copyright */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-[11px] text-zinc-700 tracking-wide">
            &copy; {new Date().getFullYear()} EEL Studio. All rights reserved.
          </p>
          <p className="text-[11px] text-zinc-700 tracking-wide">
            Handmade in Korea
          </p>
        </div>
      </div>
    </footer>
  );
}
