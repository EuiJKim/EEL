import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/** Only allow internal relative paths — block open redirects */
function sanitizeReturnTo(raw: string | null): string {
  if (!raw) return '/';
  // Must start with "/" and must NOT start with "//" (protocol-relative URL)
  if (!raw.startsWith('/') || raw.startsWith('//')) return '/';
  // Strip any embedded authority (e.g. /\evil.com)
  try {
    const url = new URL(raw, 'http://localhost');
    if (url.hostname !== 'localhost') return '/';
  } catch {
    return '/';
  }
  return raw;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const returnTo = sanitizeReturnTo(searchParams.get('returnTo'));

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(`${origin}${returnTo}`);
}
