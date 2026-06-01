import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const FROM_EMAIL = process.env.FROM_EMAIL ?? 'EEL Studio <onboarding@resend.dev>';

const inquirySchema = z.object({
  name:        z.string().min(1).max(50),
  phone:       z.string().min(1).max(20),
  email:       z.string().email().optional().or(z.literal('')),
  note:        z.string().max(1000).optional().default(''),
  pieceId:     z.string().min(1).max(80),
  pieceTitle:  z.string().min(1).max(120),
  pieceSize:   z.string().max(120).optional().default(''),
  piecePrice:  z.string().max(60).optional().default(''),
  utm:         z.record(z.string(), z.string()).optional().default({}),
});

function formatUTM(utm: Record<string, string>): string {
  const entries = Object.entries(utm).filter(([, v]) => v);
  if (entries.length === 0) return '-';
  return entries.map(([k, v]) => `${k}=${v}`).join(' · ');
}

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
    const parsed = inquirySchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: '필수 항목 누락' }, { status: 400 });
    }

    const { name, phone, email, note, pieceId, pieceTitle, pieceSize, piecePrice, utm } = parsed.data;

    const resend = new Resend(process.env.RESEND_API_KEY);

    const baseStyle = `background:#0d0d0d;color:#e4e4e7;padding:40px;border-radius:16px;font-family:sans-serif;`;

    const { error: adminError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [process.env.ADMIN_EMAIL!, 'plumcatmango@gmail.com'],
      subject: `[EEL] 작품 문의 — ${safe(pieceTitle)} (${safe(name)})`,
      html: `
        <div style="${baseStyle}">
          <h2 style="margin:0 0 24px;font-size:20px;color:#fff;">새 작품 문의가 접수됐습니다</h2>
          <table style="border-collapse:collapse;width:100%;font-size:14px;">
            <tr><td style="padding:8px 0;color:#888;width:100px;">작품</td><td style="padding:8px 0;color:#fff;">${safe(pieceTitle)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">ID</td><td style="padding:8px 0;color:#fff;">${safe(pieceId)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">사이즈</td><td style="padding:8px 0;color:#fff;">${safe(pieceSize)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">가격</td><td style="padding:8px 0;color:#fff;">${safe(piecePrice)}</td></tr>
            <tr><td colspan="2" style="padding:16px 0 8px;border-top:1px solid #333;"></td></tr>
            <tr><td style="padding:8px 0;color:#888;">이름</td><td style="padding:8px 0;color:#fff;">${safe(name)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">전화번호</td><td style="padding:8px 0;color:#fff;">${safe(phone)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">이메일</td><td style="padding:8px 0;color:#fff;">${safe(email)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;vertical-align:top;">문의 내용</td><td style="padding:8px 0;color:#fff;">${safe(note)}</td></tr>
            <tr><td colspan="2" style="padding:16px 0 8px;border-top:1px solid #333;"></td></tr>
            <tr><td style="padding:8px 0;color:#888;vertical-align:top;">유입 경로</td><td style="padding:8px 0;color:#aaa;font-size:12px;">${safe(formatUTM(utm))}</td></tr>
          </table>
        </div>
      `,
    });

    if (adminError) {
      console.error('[piece-inquiry] admin send failed:', adminError);
      return NextResponse.json({ error: '전송 실패' }, { status: 500 });
    }

    if (email) {
      const { error: customerError } = await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `[EEL Studio] ${pieceTitle} 문의가 접수되었습니다`,
        html: `
          <div style="${baseStyle}">
            <h2 style="margin:0 0 8px;font-size:22px;color:#fff;font-weight:300;letter-spacing:2px;">EEL STUDIO</h2>
            <p style="margin:24px 0 16px;font-size:15px;line-height:1.7;color:#fff;">${safe(name)}님, 작품 문의를 보내주셔서 감사합니다.</p>
            <p style="margin:0 0 32px;font-size:14px;line-height:1.7;color:#a1a1aa;">문의 내용을 확인한 후 1–2 영업일 내에 연락드리겠습니다.</p>
            <div style="padding:20px;background:#1a1a1a;border-radius:8px;">
              <p style="margin:0 0 12px;font-size:12px;color:#888;letter-spacing:1px;">접수 내역</p>
              <table style="border-collapse:collapse;width:100%;font-size:13px;">
                <tr><td style="padding:6px 0;color:#888;width:80px;">작품</td><td style="padding:6px 0;color:#fff;">${safe(pieceTitle)}</td></tr>
                <tr><td style="padding:6px 0;color:#888;">사이즈</td><td style="padding:6px 0;color:#fff;">${safe(pieceSize)}</td></tr>
                <tr><td style="padding:6px 0;color:#888;">가격</td><td style="padding:6px 0;color:#fff;">${safe(piecePrice)}</td></tr>
              </table>
            </div>
            <p style="margin:32px 0 0;font-size:11px;line-height:1.6;color:#555;">이 메일은 발신전용입니다. 추가 문의는 eel-studio.me 의 Contact을 이용해 주세요.</p>
          </div>
        `,
      });

      if (customerError) {
        console.error('[piece-inquiry] customer send failed:', customerError);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[piece-inquiry]', err);
    return NextResponse.json({ error: '전송 실패' }, { status: 500 });
  }
}
