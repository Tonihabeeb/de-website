import { NextRequest, NextResponse } from 'next/server';
import { requireEditPages } from '@/middleware/permissions';

// POST /api/admin/pages/[id]/versions/[versionId]/restore - Restore page version
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; versionId: string }> }
) {
  try {
    const { id, versionId } = await params;

    // Check permissions
    const permissionCheck = await requireEditPages()(request);
    if (permissionCheck) return permissionCheck;

    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/pages/${id}/versions/${versionId}/restore`, {
      method: 'POST',
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to restore page version' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('Error restoring page version:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to restore page version' },
      { status: 500 }
    );
  }
}
