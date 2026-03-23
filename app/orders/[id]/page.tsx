import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import OrderTrackingClient from './OrderTrackingClient';

export default async function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth');

  const order = await prisma.order.findUnique({
    where: { id },
    include: { size: true, resin: true, wood: true, leg: true },
  });

  // Not found or belongs to a different user
  if (!order || order.userId !== user.id) notFound();

  return (
    <OrderTrackingClient
      order={{
        id: order.id,
        createdAt: order.createdAt.toISOString(),
        status: order.status,
        totalPrice: order.totalPrice,
        size:  order.size  ? { label: order.size.label,  size: order.size.size } : null,
        resin: order.resin ? { label: order.resin.label, hex:  order.resin.hex }  : null,
        wood:  order.wood  ? { label: order.wood.label }  : null,
        leg:   order.leg   ? { label: order.leg.label }   : null,
      }}
    />
  );
}
