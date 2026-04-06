import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { STATUS_ORDER } from '@/lib/constants';

const updateOrderSchema = z.object({
  orderId: z.string().uuid(),
  status:  z.enum(STATUS_ORDER),
});

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const parsed = updateOrderSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const { orderId, status } = parsed.data;

  try {
    await prisma.order.update({ where: { id: orderId }, data: { status } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/update-order] Failed:', err);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
