import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'EEL Studio <onboarding@resend.dev>';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
function safe(v: unknown): string {
  if (v == null || v === '') return '-';
  return escapeHtml(String(v));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, note, color, shape, size, height, legs } = body;

    if (!name || !phone || !email) {
      return NextResponse.json({ error: '필수 항목 누락' }, { status: 400 });
    }

    const baseStyle = `background:#0d0d0d;color:#e4e4e7;padding:40px;border-radius:16px;font-family:sans-serif;`;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: process.env.ADMIN_EMAIL!,
      subject: `[EEL] 커미션 문의 — ${safe(name)}`,
      html: `
        <div style="${baseStyle}">
          <h2 style="margin:0 0 24px;font-size:20px;color:#fff;">새 커미션 문의가 접수됐습니다</h2>
          <table style="border-collapse:collapse;width:100%;font-size:14px;">
            <tr><td style="padding:8px 0;color:#888;width:100px;">이름</td><td style="padding:8px 0;color:#fff;">${safe(name)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">전화번호</td><td style="padding:8px 0;color:#fff;">${safe(phone)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">이메일</td><td style="padding:8px 0;color:#fff;">${safe(email)}</td></tr>
            <tr><td colspan="2" style="padding:16px 0 8px;border-top:1px solid #333;"></td></tr>
            <tr><td style="padding:8px 0;color:#888;">컬러</td><td style="padding:8px 0;color:#fff;">${safe(color)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Shape</td><td style="padding:8px 0;color:#fff;">${safe(shape)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Size</td><td style="padding:8px 0;color:#fff;">${safe(size)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Height</td><td style="padding:8px 0;color:#fff;">${safe(height)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Legs</td><td style="padding:8px 0;color:#fff;">${safe(legs)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;vertical-align:top;">요청사항</td><td style="padding:8px 0;color:#fff;">${safe(note)}</td></tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[commission-inquiry]', err);
    return NextResponse.json({ error: '전송 실패' }, { status: 500 });
  }
}
