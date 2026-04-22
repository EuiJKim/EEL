import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import OrdersClient, { Order } from './OrdersClient';

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/auth');

  const raw = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      size: true,
      resin: true,
      wood: true,
      leg: true,
    },
  });

  const orders: Order[] = raw.map((o) => ({
    id: o.id,
    createdAt: o.createdAt.toISOString(),
    status: o.status,
    totalPrice: o.totalPrice,
    size: o.size ? { label: o.size.label, size: o.size.size } : null,
    resin: o.resin ? { label: o.resin.label, hex: o.resin.hex } : null,
    wood: o.wood ? { label: o.wood.label } : null,
    leg: o.leg ? { label: o.leg.label } : null,
  }));

  return <OrdersClient orders={orders} />;
}
