import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { sizeId, resinId, woodId, legId, totalPrice, phone, note } = await req.json();

  const order = await prisma.order.create({
    data: { userId: user.id, sizeId, resinId, woodId, legId, totalPrice, phone, note },
  });

  const profile = await prisma.profile.findUnique({ where: { id: user.id } });

  return NextResponse.json({ id: order.id, profile });
}
