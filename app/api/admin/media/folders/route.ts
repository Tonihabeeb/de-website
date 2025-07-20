import { NextRequest, NextResponse } from 'next/server';

// Sample folders data for development
const sampleFolders = [
  {
    id: 'folder-001',
    name: 'Technical Documents',
    description: 'Technical documentation and schematics',
    parent_id: null,
    created_by: 'admin-001',
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-07-20T00:00:00.000Z'
  },
  {
    id: 'folder-002',
    name: 'Project Photos',
    description: 'Project site photos and progress images',
    parent_id: null,
    created_by: 'admin-001',
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-07-20T00:00:00.000Z'
  },
  {
    id: 'folder-003',
    name: 'KPP Schematics',
    description: 'KPP system schematics and diagrams',
    parent_id: 'folder-001',
    created_by: 'admin-001',
    created_at: '2024-02-01T00:00:00.000Z',
    updated_at: '2024-07-20T00:00:00.000Z'
  },
  {
    id: 'folder-004',
    name: 'Site Progress',
    description: 'Construction site progress photos',
    parent_id: 'folder-002',
    created_by: 'admin-001',
    created_at: '2024-03-01T00:00:00.000Z',
    updated_at: '2024-07-20T00:00:00.000Z'
  }
];

// GET /api/admin/media/folders - Get all folders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parent_id = searchParams.get('parent_id');

    let filteredFolders = [...sampleFolders];

    // Apply parent filter
    if (parent_id) {
      filteredFolders = filteredFolders.filter(folder => folder.parent_id === parent_id);
    }

    return NextResponse.json({
      success: true,
      folders: filteredFolders,
      total: sampleFolders.length,
    });
  } catch (error) {
    console.error('Error fetching folders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch folders' },
      { status: 500 }
    );
  }
} 