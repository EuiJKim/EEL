import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

const orderSchema = z.object({
  sizeId:     z.string().uuid(),
  resinId:    z.string().uuid(),
  woodId:     z.string().uuid(),
  legId:      z.string().uuid(),
  totalPrice: z.number().int().nonnegative(),
  phone:      z.string().min(1).max(20),
  note:       z.string().max(1000).optional().default(''),
});

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const parsed = orderSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { sizeId, resinId, woodId, legId, totalPrice, phone, note } = parsed.data;

  // Verify all option IDs actually exist in the database
  const [size, resin, wood, leg] = await Promise.all([
    prisma.sizeOption.findUnique({ where: { id: sizeId } }),
    prisma.resinOption.findUnique({ where: { id: resinId } }),
    prisma.woodOption.findUnique({ where: { id: woodId } }),
    prisma.legOption.findUnique({ where: { id: legId } }),
  ]);

  if (!size || !resin || !wood || !leg) {
    return NextResponse.json({ error: 'Invalid option ID(s)' }, { status: 400 });
  }

  try {
    const order = await prisma.order.create({
      data: { userId: user.id, sizeId, resinId, woodId, legId, totalPrice, phone, note },
    });

    const profile = await prisma.profile.findUnique({ where: { id: user.id } });

    return NextResponse.json({ id: order.id, profile });
  } catch (err) {
    console.error('[orders] Failed to create order:', err);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
