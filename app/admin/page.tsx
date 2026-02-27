import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import AdminOrderList from './AdminOrderList';

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect('/');
  }

  const admin = createAdminClient();

  const { data: orders } = await admin
    .from('orders')
    .select(`
      id, created_at, status, total_price,
      user_id,
      size:size_options(label, size),
      resin:resin_options(label, hex),
      wood:wood_options(label),
      leg:leg_options(label),
      profile:profiles(full_name, email)
    `)
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-600 mb-2">Admin</p>
          <h1 className="text-2xl font-bold tracking-tight text-white">주문 관리</h1>
          <p className="text-sm text-zinc-500 mt-1">총 {orders?.length ?? 0}건</p>
        </div>
        <AdminOrderList initialOrders={(orders ?? []) as never[]} />
      </div>
    </main>
  );
}
