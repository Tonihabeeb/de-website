import { NextRequest, NextResponse } from 'next/server';

// POST /api/admin/projects/[id]/versions/[versionId]/restore - Restore project version
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; versionId: string }> }
) {
  const { id, versionId } = await params;
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const res = await fetch(`${backendUrl}/api/projects/${id}/versions/${versionId}/restore`, {
      method: 'POST',
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { success: false, error: error.error || 'Failed to restore project version' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('Error restoring project version:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to restore project version' },
      { status: 500 }
    );
  }
}
