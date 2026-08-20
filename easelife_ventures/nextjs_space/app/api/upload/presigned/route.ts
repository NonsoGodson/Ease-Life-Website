import { NextResponse } from 'next/server';
import { generatePresignedUploadUrl } from '@/lib/s3';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const fileName = body?.fileName;
    const contentType = body?.contentType ?? 'application/octet-stream';

    if (!fileName) {
      return NextResponse.json(
        { success: false, message: 'fileName is required.' },
        { status: 400 }
      );
    }

    // Contact-form attachments are stored privately (accessed by admin via signed URL).
    const { uploadUrl, cloud_storage_path } = await generatePresignedUploadUrl(
      fileName,
      contentType,
      false
    );

    return NextResponse.json({ success: true, uploadUrl, cloud_storage_path });
  } catch (error) {
    console.error('Presigned URL error:', error);
    return NextResponse.json(
      { success: false, message: 'Could not prepare upload.' },
      { status: 500 }
    );
  }
}
