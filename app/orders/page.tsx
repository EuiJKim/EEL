'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { ShoppingBag, Clock, CheckCircle, Wrench, XCircle, ChevronLeft } from 'lucide-react';

interface Order {
  id: string;
  created_at: string;
  status: string;
  total_price: number;
  size: { label: string; size: string };
  resin: { label: string; hex: string };
  wood: { label: string };
  leg: { label: string };
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending:     { label: '접수 대기',   color: 'text-amber-400 bg-amber-400/10 border-amber-400/20',   icon: <Clock size={13} /> },
  confirmed:   { label: '주문 확정',   color: 'text-blue-400 bg-blue-400/10 border-blue-400/20',      icon: <CheckCircle size={13} /> },
  in_progress: { label: '제작 중',     color: 'text-purple-400 bg-purple-400/10 border-purple-400/20', icon: <Wrench size={13} /> },
  completed:   { label: '제작 완료',   color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', icon: <CheckCircle size={13} /> },
  cancelled:   { label: '취소됨',      color: 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20',      icon: <XCircle size={13} /> },
};

function formatKRW(n: number) { return n.toLocaleString('ko-KR') + '원'; }

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/auth');
        return;
      }

      const { data } = await supabase
        .from('orders')
        .select(`
          id, created_at, status, total_price,
          size:size_options(label, size),
          resin:resin_options(label, hex),
          wood:wood_options(label),
          leg:leg_options(label)
        `)
        .order('created_at', { ascending: false });

      setOrders((data as unknown as Order[]) ?? []);
      setLoading(false);
    }

    fetchOrders();
  }, [router]);

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-16">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ChevronLeft size={16} /> 홈으로
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">내 주문 내역</h1>
          <p className="text-sm text-zinc-500">주문하신 제품의 현황을 확인하세요</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
          </div>
        )}

        {/* Empty */}
        {!loading && orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/8 flex items-center justify-center mb-4">
              <ShoppingBag size={24} className="text-zinc-600" />
            </div>
            <p className="text-zinc-400 font-medium mb-1">아직 주문 내역이 없어요</p>
            <p className="text-zinc-600 text-sm mb-6">나만의 테이블을 주문해보세요</p>
            <button
              onClick={() => router.push('/')}
              className="px-5 py-2.5 rounded-full bg-white/8 border border-white/10 text-sm text-white hover:bg-white/12 transition-colors"
            >
              주문하러 가기
            </button>
          </motion.div>
        )}

        {/* Order List */}
        <div className="space-y-4">
          {orders.map((order, i) => {
            const status = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  padding: '24px',
                }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-zinc-600 font-mono mb-1">{formatDate(order.created_at)}</p>
                    <p className="text-xs text-zinc-700 font-mono"># {order.id.slice(0, 8).toUpperCase()}</p>
                  </div>
                  <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${status.color}`}>
                    {status.icon}
                    {status.label}
                  </span>
                </div>

                {/* Options */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-4">
                  {[
                    { label: '사이즈',    value: `${order.size?.label} (${order.size?.size})` },
                    { label: '레진 색상', value: order.resin?.label,  dot: order.resin?.hex },
                    { label: '우드',      value: order.wood?.label },
                    { label: '다리',      value: order.leg?.label },
                  ].map((row) => (
                    <div key={row.label}>
                      <p className="text-[10px] text-zinc-600 mb-0.5">{row.label}</p>
                      <div className="flex items-center gap-1.5">
                        {row.dot && <div className="w-2.5 h-2.5 rounded-full border border-white/10 shrink-0" style={{ background: row.dot }} />}
                        <p className="text-xs text-zinc-300 font-medium">{row.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="border-t border-white/6 pt-3 flex items-center justify-between">
                  <span className="text-xs text-zinc-500">예상 금액</span>
                  <span className="text-sm font-bold text-white">{formatKRW(order.total_price)}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
