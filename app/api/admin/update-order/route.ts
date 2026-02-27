import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { STATUS_ORDER } from '@/lib/constants';

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { orderId, status } = await req.json();

  if (!orderId || !STATUS_ORDER.includes(status)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from('orders')
    .update({ status })
    .eq('id', orderId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
