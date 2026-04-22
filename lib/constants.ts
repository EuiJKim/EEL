export const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending:     { label: '접수 대기',  color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  confirmed:   { label: '주문 확정',  color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  in_progress: { label: '제작 중',    color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
  completed:   { label: '제작 완료',  color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  cancelled:   { label: '취소됨',     color: 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20' },
};

export const STATUS_ORDER = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'] as const;
