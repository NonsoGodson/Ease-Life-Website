import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getFileUrl } from '@/lib/s3';
import type { LeadStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

const VALID_STATUSES = ['NEW', 'CONTACTED', 'QUOTED', 'PAID', 'DELIVERED'];

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const id = params?.id;
    const body = await request.json().catch(() => ({}));
    const data: { status?: LeadStatus; adminNotes?: string } = {};

    if (body?.status) {
      if (!VALID_STATUSES.includes(body.status)) {
        return NextResponse.json(
          { success: false, message: 'Invalid status.' },
          { status: 400 }
        );
      }
      data.status = body.status as LeadStatus;
    }
    if (typeof body?.adminNotes === 'string') {
      data.adminNotes = body.adminNotes;
    }

    const lead = await prisma.lead.update({ where: { id }, data });
    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('Update lead error:', error);
    return NextResponse.json(
      { success: false, message: 'Could not update lead.' },
      { status: 500 }
    );
  }
}

// GET a signed URL for a lead's attachment (admin only).
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const lead = await prisma.lead.findUnique({ where: { id: params?.id } });
    if (!lead?.attachmentPath) {
      return NextResponse.json(
        { success: false, message: 'No attachment for this lead.' },
        { status: 404 }
      );
    }

    const url = await getFileUrl(lead.attachmentPath, 'application/octet-stream', false);
    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error('Attachment URL error:', error);
    return NextResponse.json(
      { success: false, message: 'Could not generate download link.' },
      { status: 500 }
    );
  }
}
