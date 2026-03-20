import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import AdminOrderList, { AdminOrder } from './AdminOrderList';

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect('/');
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      size: true,
      resin: true,
      wood: true,
      leg: true,
    },
  });

  const userIds = [...new Set(orders.map((o) => o.userId))];
  const profiles = await prisma.profile.findMany({
    where: { id: { in: userIds } },
  });
  const profileMap = Object.fromEntries(profiles.map((p) => [p.id, p]));

  // Map to the snake_case shape AdminOrderList expects
  const adminOrders: AdminOrder[] = orders.map((o) => {
    const profile = profileMap[o.userId];
    return {
      id: o.id,
      created_at: o.createdAt.toISOString(),
      status: o.status,
      total_price: o.totalPrice,
      user_id: o.userId,
      size: o.size ? { label: o.size.label, size: o.size.size } : null,
      resin: o.resin ? { label: o.resin.label, hex: o.resin.hex } : null,
      wood: o.wood ? { label: o.wood.label } : null,
      leg: o.leg ? { label: o.leg.label } : null,
      profile: profile
        ? { full_name: profile.fullName ?? null, email: profile.email ?? null }
        : null,
    };
  });

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-600 mb-2">Admin</p>
          <h1 className="text-2xl font-bold tracking-tight text-white">주문 관리</h1>
          <p className="text-sm text-zinc-500 mt-1">총 {adminOrders.length}건</p>
        </div>
        <AdminOrderList initialOrders={adminOrders} />
      </div>
    </main>
  );
}
