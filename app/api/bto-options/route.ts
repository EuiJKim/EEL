import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [sizes, resins, woods, legs] = await Promise.all([
      prisma.sizeOption.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.resinOption.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.woodOption.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.legOption.findMany({ orderBy: { sortOrder: 'asc' } }),
    ]);
    return NextResponse.json({ sizes, resins, woods, legs });
  } catch (err) {
    console.error('[bto-options] Failed to fetch options:', err);
    return NextResponse.json({ error: 'Failed to load options' }, { status: 500 });
  }
}
