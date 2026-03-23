'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Clock, CheckCircle, Wrench, Package } from 'lucide-react';
import { STATUS_CONFIG } from '@/lib/constants';
import { formatKRW, formatDate } from '@/lib/utils';

interface OrderDetail {
  id: string;
  createdAt: string;
  status: string;
  totalPrice: number;
  size:  { label: string; size: string } | null;
  resin: { label: string; hex: string }  | null;
  wood:  { label: string } | null;
  leg:   { label: string } | null;
}

// Timeline stages in order
const STAGES: { key: string; label: string; icon: React.ReactNode; desc: string }[] = [
  { key: 'pending',     label: '접수 대기',  icon: <Clock size={16} />,        desc: '매거진답니다. 세세히 살펴보고 있어요.' },
  { key: 'confirmed',   label: '주문 확정',  icon: <CheckCircle size={16} />,  desc: '장인이 선정되었습니다. 유일한 작품이 시작됩니다.' },
  { key: 'in_progress', label: '제작 중',    icon: <Wrench size={16} />,       desc: '레진이 굳어지고 있어요. 세상에 하나뿐인.' },
  { key: 'completed',   label: '제작 완료',  icon: <Package size={16} />,      desc: '완성되었습니다. 살아있는 작품을 맞이할 준비하세요.' },
];

function getStageIndex(status: string): number {
  if (status === 'cancelled') return -1;
  return STAGES.findIndex((s) => s.key === status);
}

export default function OrderTrackingClient({ order }: { order: OrderDetail }) {
  const currentIdx = getStageIndex(order.status);
  const isCancelled = order.status === 'cancelled';
  const statusCfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-16">
      <div className="max-w-lg mx-auto">

        {/* Back */}
        <Link
          href="/orders"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-10"
        >
          <ChevronLeft size={16} /> 주문 목록
        </Link>

        {/* Order header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-600 mb-2">주문 추적</p>
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="text-xs text-zinc-600 font-mono mb-1">{formatDate(order.createdAt)}</p>
              <p className="text-sm font-mono text-zinc-400"># {order.id.slice(0, 8).toUpperCase()}</p>
            </div>
            <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${statusCfg.color}`}>
              {statusCfg.label}
            </span>
          </div>
        </motion.div>

        {/* Timeline */}
        {!isCancelled && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mb-8"
          >
            <div className="relative">
              {/* Vertical connector */}
              <div className="absolute left-[19px] top-5 bottom-5 w-px bg-white/8" />

              <div className="space-y-1">
                {STAGES.map((stage, i) => {
                  const done    = i < currentIdx;
                  const active  = i === currentIdx;
                  const pending = i > currentIdx;

                  return (
                    <motion.div
                      key={stage.key}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * i + 0.1 }}
                      className="flex items-start gap-4 py-3 relative"
                    >
                      {/* Circle */}
                      <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                        active  ? 'bg-white text-black border-white'            :
                        done    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                                  'bg-zinc-900 text-zinc-700 border-white/8'
                      }`}>
                        {stage.icon}
                        {done && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 rounded-full bg-emerald-500/10"
                          />
                        )}
                      </div>

                      {/* Text */}
                      <div className="pt-2">
                        <p className={`text-sm font-semibold ${active ? 'text-white' : done ? 'text-emerald-400' : 'text-zinc-600'}`}>
                          {stage.label}
                        </p>
                        {(active || done) && (
                          <p className="text-xs text-zinc-500 mt-0.5">{stage.desc}</p>
                        )}
                      </div>

                      {/* Active pulse */}
                      {active && (
                        <motion.div
                          className="absolute left-[19px] top-[19px] w-2.5 h-2.5 rounded-full bg-white"
                          animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          style={{ marginLeft: '-5px', marginTop: '-5px' }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Cancelled notice */}
        {isCancelled && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mb-8 p-4 rounded-xl border border-zinc-500/20 bg-zinc-500/8 text-sm text-zinc-400"
          >
            이 주문은 취소되었습니다.
          </motion.div>
        )}

        {/* Order summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="bg-zinc-900/50 rounded-2xl border border-white/6 p-5 space-y-3"
        >
          {[
            { label: '사이즈',    value: order.size  ? `${order.size.label} (${order.size.size})` : '-' },
            { label: '레진 색상', value: order.resin?.label ?? '-', dot: order.resin?.hex },
            { label: '우드 종류', value: order.wood?.label  ?? '-' },
            { label: '다리 스타일', value: order.leg?.label ?? '-' },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">{row.label}</span>
              <span className="flex items-center gap-1.5 text-zinc-200 font-medium">
                {row.dot && (
                  <span className="w-3 h-3 rounded-full border border-white/10 inline-block shrink-0" style={{ background: row.dot }} />
                )}
                {row.value}
              </span>
            </div>
          ))}
          <div className="border-t border-white/6 pt-3 flex items-center justify-between">
            <span className="text-sm text-zinc-400 font-semibold">예상 금액</span>
            <span className="text-base font-bold text-white">{formatKRW(order.totalPrice)}</span>
          </div>
        </motion.div>

        {/* Lead time note */}
        <p className="mt-4 text-[11px] text-zinc-700 leading-relaxed">
          모든 제품은 수작업 제작되며 주문 확정 후 6~10주 소요됩니다. 최종 가격은 상담 후 확정됩니다.
        </p>
      </div>
    </main>
  );
}
