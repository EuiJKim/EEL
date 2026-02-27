import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { orderId, userEmail, userName, summary } = await req.json();

    const adminEmail = process.env.ADMIN_EMAIL!;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';

    const orderSummaryHtml = `
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;">
        <tr><td style="padding:8px 0;color:#888;">사이즈</td><td style="padding:8px 0;color:#fff;">${summary.size}</td></tr>
        <tr><td style="padding:8px 0;color:#888;">레진 색상</td><td style="padding:8px 0;color:#fff;">${summary.resin}</td></tr>
        <tr><td style="padding:8px 0;color:#888;">우드 종류</td><td style="padding:8px 0;color:#fff;">${summary.wood}</td></tr>
        <tr><td style="padding:8px 0;color:#888;">다리 스타일</td><td style="padding:8px 0;color:#fff;">${summary.leg}</td></tr>
        <tr style="border-top:1px solid #333;">
          <td style="padding:12px 0 0;color:#888;font-weight:600;">예상 금액</td>
          <td style="padding:12px 0 0;color:#fff;font-weight:700;">${summary.totalPrice}</td>
        </tr>
      </table>
    `;

    const baseStyle = `background:#0d0d0d;color:#e4e4e7;padding:40px;border-radius:16px;`;

    // Send to admin
    await resend.emails.send({
      from: 'EEL Studio <onboarding@resend.dev>',
      to: adminEmail,
      subject: `[EEL] 새 주문 접수 — ${userName ?? userEmail}`,
      html: `
        <div style="${baseStyle}">
          <h2 style="margin:0 0 8px;font-size:20px;color:#fff;">새 주문이 접수됐습니다</h2>
          <p style="margin:0 0 24px;color:#888;font-size:13px;">주문번호: ${orderId}</p>
          <p style="margin:0 0 4px;color:#888;font-size:13px;">주문자: ${userName ?? '-'} (${userEmail})</p>
          ${orderSummaryHtml}
          <a href="${siteUrl}/admin" style="display:inline-block;margin-top:28px;padding:12px 24px;background:#fff;color:#000;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
            관리자 페이지에서 확인하기
          </a>
        </div>
      `,
    });

    // Send to user
    if (userEmail) {
      await resend.emails.send({
        from: 'EEL Studio <onboarding@resend.dev>',
        to: userEmail,
        subject: '[EEL] 주문이 접수됐습니다',
        html: `
          <div style="${baseStyle}">
            <h2 style="margin:0 0 8px;font-size:20px;color:#fff;">주문이 접수됐습니다</h2>
            <p style="margin:0 0 24px;color:#888;font-size:13px;">빠른 시일 내에 확인 후 연락드리겠습니다.</p>
            ${orderSummaryHtml}
            <a href="${siteUrl}/orders" style="display:inline-block;margin-top:28px;padding:12px 24px;background:#fff;color:#000;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
              내 주문 내역 보기
            </a>
          </div>
        `,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[notify]', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
