'use client';

import { useState, useOptimistic, useTransition } from 'react';
import { STATUS_CONFIG, STATUS_ORDER } from '@/lib/constants';
import { Clock, CheckCircle, Wrench, XCircle } from 'lucide-react';

interface AdminOrder {
  id: string;
  created_at: string;
  status: string;
  total_price: number;
  user_id: string;
  size: { label: string; size: string } | null;
  resin: { label: string; hex: string } | null;
  wood: { label: string } | null;
  leg: { label: string } | null;
  profile: { full_name: string | null; email: string | null } | null;
}

const STATUS_ICONS: Record<string, React.ReactNode> = {
  pending:     <Clock size={12} />,
  confirmed:   <CheckCircle size={12} />,
  in_progress: <Wrench size={12} />,
  completed:   <CheckCircle size={12} />,
  cancelled:   <XCircle size={12} />,
};

function formatKRW(n: number) { return n.toLocaleString('ko-KR') + '원'; }
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' });
}

const FILTER_TABS = ['전체', ...STATUS_ORDER.map((s) => STATUS_CONFIG[s].label)];

export default function AdminOrderList({ initialOrders }: { initialOrders: AdminOrder[] }) {
  const [filter, setFilter] = useState('전체');
  const [isPending, startTransition] = useTransition();
  const [optimisticOrders, updateOptimistic] = useOptimistic(
    initialOrders,
    (state: AdminOrder[], { id, status }: { id: string; status: string }) =>
      state.map((o) => (o.id === id ? { ...o, status } : o))
  );

  const filtered =
    filter === '전체'
      ? optimisticOrders
      : optimisticOrders.filter((o) => STATUS_CONFIG[o.status]?.label === filter);

  async function handleStatusChange(orderId: string, newStatus: string) {
    startTransition(async () => {
      updateOptimistic({ id: orderId, status: newStatus });
      await fetch('/api/admin/update-order', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
    });
  }

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              filter === tab
                ? 'bg-white text-black border-white'
                : 'bg-transparent text-zinc-400 border-white/10 hover:border-white/25'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Order List */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <p className="text-center text-zinc-600 py-16 text-sm">해당 상태의 주문이 없습니다</p>
        )}
        {filtered.map((order) => {
          const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
          return (
            <div
              key={order.id}
              className="rounded-2xl border border-white/8 p-6 space-y-4"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-xs font-mono text-zinc-600 mb-0.5">{formatDate(order.created_at)}</p>
                  <p className="text-xs font-mono text-zinc-700"># {order.id.slice(0, 8).toUpperCase()}</p>
                  <p className="text-sm text-zinc-300 mt-1 font-medium">
                    {order.profile?.full_name ?? order.profile?.email ?? order.user_id.slice(0, 8)}
                  </p>
                  {order.profile?.email && (
                    <p className="text-xs text-zinc-600">{order.profile.email}</p>
                  )}
                </div>

                {/* Status Selector */}
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.color}`}>
                    {STATUS_ICONS[order.status]}
                    {cfg.label}
                  </span>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    disabled={isPending}
                    className="text-xs bg-zinc-900 border border-white/10 rounded-lg px-2 py-1.5 text-zinc-300 focus:outline-none focus:border-white/25"
                  >
                    {STATUS_ORDER.map((s) => (
                      <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <p className="text-zinc-600 mb-0.5">사이즈</p>
                  <p className="text-zinc-300">{order.size ? `${order.size.label} (${order.size.size})` : '-'}</p>
                </div>
                <div>
                  <p className="text-zinc-600 mb-0.5">레진</p>
                  <div className="flex items-center gap-1.5">
                    {order.resin?.hex && (
                      <div className="w-3 h-3 rounded-full border border-white/10" style={{ background: order.resin.hex }} />
                    )}
                    <p className="text-zinc-300">{order.resin?.label ?? '-'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-zinc-600 mb-0.5">우드</p>
                  <p className="text-zinc-300">{order.wood?.label ?? '-'}</p>
                </div>
                <div>
                  <p className="text-zinc-600 mb-0.5">다리</p>
                  <p className="text-zinc-300">{order.leg?.label ?? '-'}</p>
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-white/6 pt-3 flex items-center justify-between">
                <span className="text-xs text-zinc-500">예상 금액</span>
                <span className="text-sm font-bold text-white">{formatKRW(order.total_price)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
