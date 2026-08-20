import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { serviceTagToLabel } from '@/lib/services-data';
import { siteConfig } from '@/lib/site-config';
import type { Prisma, LeadStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

const VALID_STATUSES = ['NEW', 'CONTACTED', 'QUOTED', 'PAID', 'DELIVERED'];

function senderInfo() {
  const appUrl = process.env.NEXTAUTH_URL || 'https://www.easelifeventures.com';
  let hostname = 'easelifeventures.com';
  try {
    hostname = new URL(appUrl).hostname;
  } catch {
    /* keep fallback */
  }
  return { hostname, senderEmail: `noreply@${hostname}` };
}

async function sendEmail(payload: Record<string, unknown>): Promise<void> {
  try {
    const res = await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await res.json().catch(() => ({}));
    if (!result?.success && !result?.notification_disabled) {
      console.error('Notification email failed:', result?.message);
    }
  } catch (err) {
    console.error('Notification email error:', err);
  }
}

// -------- POST: capture a new lead (public) --------
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const name = (body?.name ?? '').toString().trim();
    const email = (body?.email ?? '').toString().trim();
    const phone = (body?.phone ?? '').toString().trim();
    const serviceCategory = (body?.serviceCategory ?? 'general').toString();
    const message = (body?.message ?? '').toString().trim();
    const attachmentPath = body?.attachmentPath ? body.attachmentPath.toString() : null;
    const attachmentName = body?.attachmentName ? body.attachmentName.toString() : null;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, message: 'Please fill in your name, email, phone and message.' },
        { status: 400 }
      );
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const serviceLabel = serviceTagToLabel[serviceCategory] ?? 'General Enquiry';

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        serviceCategory,
        serviceLabel,
        message,
        attachmentPath,
        attachmentName,
        source: 'Contact Form',
      },
    });

    const { hostname, senderEmail } = senderInfo();

    // 1) Confirmation email to the person who submitted.
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0B2A4A;">
        <div style="background:#0B2A4A; padding:24px; border-radius:10px 10px 0 0; text-align:center;">
          <h1 style="color:#ffffff; margin:0; font-size:20px;">Ease Life Ventures Limited</h1>
          <p style="color:#D4A017; margin:6px 0 0; font-size:13px; letter-spacing:0.5px;">Crafting Success. Opening Doors.</p>
        </div>
        <div style="background:#f7f9fc; padding:28px; border-radius:0 0 10px 10px;">
          <h2 style="color:#0B2A4A; margin-top:0;">Thank you, ${name}!</h2>
          <p style="font-size:15px; line-height:1.6;">We have received your enquiry about <strong>${serviceLabel}</strong>. Our team will respond within <strong>24 hours</strong>.</p>
          <div style="background:#ffffff; border-left:4px solid #D4A017; padding:14px 16px; border-radius:6px; margin:18px 0;">
            <p style="margin:0; font-size:14px; color:#334155;"><strong>Your message:</strong><br/>${message.replace(/</g, '&lt;')}</p>
          </div>
          <p style="font-size:14px; line-height:1.6;">Need a faster response? Chat with us on WhatsApp at <a href="https://wa.me/2348037910898" style="color:#0B2A4A; font-weight:bold;">${siteConfig.contact.phone}</a>.</p>
          <p style="font-size:13px; color:#64748b; margin-top:24px;">Ease Life Ventures Limited &middot; ${siteConfig.serviceArea}<br/>${siteConfig.contact.email}</p>
        </div>
      </div>`;

    await sendEmail({
      deployment_token: process.env.ABACUSAI_API_KEY,
      app_id: process.env.WEB_APP_ID,
      notification_id: process.env.NOTIF_ID_LEAD_CONFIRMATION,
      subject: 'We received your enquiry — Ease Life Ventures Limited',
      body: confirmationHtml,
      is_html: true,
      recipient_email: email,
      sender_email: senderEmail,
      sender_alias: 'Ease Life Ventures',
    });

    // 2) Admin notification to the business owner.
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color:#0B2A4A;">
        <h2 style="color:#0B2A4A; border-bottom:2px solid #D4A017; padding-bottom:10px;">New Lead Captured</h2>
        <div style="background:#f7f9fc; padding:20px; border-radius:8px; margin:16px 0;">
          <p style="margin:8px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin:8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin:8px 0;"><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          <p style="margin:8px 0;"><strong>Service:</strong> ${serviceLabel}</p>
          ${attachmentName ? `<p style="margin:8px 0;"><strong>Attachment:</strong> ${attachmentName}</p>` : ''}
          <p style="margin:8px 0;"><strong>Message:</strong></p>
          <div style="background:#ffffff; padding:14px; border-radius:6px; border-left:4px solid #0B2A4A;">${message.replace(/</g, '&lt;')}</div>
        </div>
        <p style="font-size:13px; color:#64748b;">Manage this lead in your admin dashboard. Received ${new Date().toISOString()}.</p>
      </div>`;

    await sendEmail({
      deployment_token: process.env.ABACUSAI_API_KEY,
      app_id: process.env.WEB_APP_ID,
      notification_id: process.env.NOTIF_ID_NEW_LEAD_ALERT,
      subject: `New ${serviceLabel} lead from ${name}`,
      body: adminHtml,
      is_html: true,
      recipient_email: siteConfig.contact.email,
      reply_to: email,
      sender_email: senderEmail,
      sender_alias: 'Ease Life Ventures Website',
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you — we will respond within 24 hours.',
      leadId: lead.id,
    });
  } catch (error) {
    console.error('Create lead error:', error);
    return NextResponse.json(
      { success: false, message: 'Could not submit your enquiry. Please try again.' },
      { status: 500 }
    );
  }
}

// -------- GET: list leads (admin only) --------
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') ?? '';
    const category = searchParams.get('category') ?? '';
    const search = (searchParams.get('search') ?? '').trim();

    const where: Prisma.LeadWhereInput = {};
    if (status && VALID_STATUSES.includes(status)) {
      where.status = status as LeadStatus;
    }
    if (category && category !== 'all') {
      where.serviceCategory = category;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { message: { contains: search, mode: 'insensitive' } },
      ];
    }

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 500,
    });

    const counts = await prisma.lead.groupBy({
      by: ['status'],
      _count: { _all: true },
    });
    const statusCounts: Record<string, number> = {};
    counts.forEach((c) => {
      statusCounts[c.status] = c._count._all;
    });

    return NextResponse.json({ success: true, leads, statusCounts });
  } catch (error) {
    console.error('List leads error:', error);
    return NextResponse.json(
      { success: false, message: 'Could not load leads.' },
      { status: 500 }
    );
  }
}
