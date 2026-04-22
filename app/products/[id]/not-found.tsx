import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 flex flex-col items-center justify-center px-6">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-600 mb-3">404</p>
      <h1 className="text-2xl font-bold text-white mb-2">제품을 찾을 수 없어요</h1>
      <p className="text-sm text-zinc-500 mb-8">존재하지 않거나 삭제된 제품입니다.</p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full bg-white/8 border border-white/10 text-sm text-white hover:bg-white/12 transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </main>
  );
}
