import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Sample media data for development
const sampleMedia = [
  {
    id: 'media-001',
    filename: 'kpp-schematic.jpg',
    original_name: 'KPP Schematic Diagram.jpg',
    file_path: '/uploads/kpp-schematic.jpg',
    file_size: 2048576,
    mime_type: 'image/jpeg',
    alt_text: 'Kinetic Power Plant schematic diagram',
    caption: 'Technical schematic showing the KPP system components and flow',
    tags: ['technical', 'schematic', 'kpp', 'diagram'],
    uploaded_by: 'admin-001',
    created_at: '2024-07-01T00:00:00.000Z'
  },
  {
    id: 'media-002',
    filename: 'power-plant-site.jpg',
    original_name: 'Power Plant Site.jpg',
    file_path: '/uploads/power-plant-site.jpg',
    file_size: 3145728,
    mime_type: 'image/jpeg',
    alt_text: 'Power plant construction site',
    caption: 'Construction site showing the foundation work for the new power plant',
    tags: ['construction', 'site', 'power-plant', 'foundation'],
    uploaded_by: 'admin-001',
    created_at: '2024-07-05T00:00:00.000Z'
  },
  {
    id: 'media-003',
    filename: 'technical-specs.pdf',
    original_name: 'Technical Specifications.pdf',
    file_path: '/uploads/technical-specs.pdf',
    file_size: 5242880,
    mime_type: 'application/pdf',
    alt_text: 'Technical specifications document',
    caption: 'Comprehensive technical specifications for the KPP system',
    tags: ['technical', 'specifications', 'document', 'pdf'],
    uploaded_by: 'admin-001',
    created_at: '2024-07-10T00:00:00.000Z'
  },
  {
    id: 'media-004',
    filename: 'team-photo.jpg',
    original_name: 'Engineering Team.jpg',
    file_path: '/uploads/team-photo.jpg',
    file_size: 1572864,
    mime_type: 'image/jpeg',
    alt_text: 'Engineering team working on KPP project',
    caption: 'Our dedicated engineering team working on the KPP implementation',
    tags: ['team', 'engineering', 'kpp', 'project'],
    uploaded_by: 'admin-001',
    created_at: '2024-07-15T00:00:00.000Z'
  },
  {
    id: 'media-005',
    filename: 'energy-flow-diagram.png',
    original_name: 'Energy Flow Diagram.png',
    file_path: '/uploads/energy-flow-diagram.png',
    file_size: 1048576,
    mime_type: 'image/png',
    alt_text: 'Energy flow diagram for KPP system',
    caption: 'Visual representation of energy flow through the KPP system',
    tags: ['diagram', 'energy-flow', 'kpp', 'visual'],
    uploaded_by: 'admin-001',
    created_at: '2024-07-18T00:00:00.000Z'
  }
];

// GET /api/admin/media - Get all media
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mime_type = searchParams.get('mime_type');
    const uploaded_by = searchParams.get('uploaded_by');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined;

    let filteredMedia = [...sampleMedia];

    // Apply filters
    if (mime_type) {
      filteredMedia = filteredMedia.filter(media => media.mime_type === mime_type);
    }

    if (uploaded_by) {
      filteredMedia = filteredMedia.filter(media => media.uploaded_by === uploaded_by);
    }

    // Apply pagination
    if (offset) {
      filteredMedia = filteredMedia.slice(offset);
    }

    if (limit) {
      filteredMedia = filteredMedia.slice(0, limit);
    }

    return NextResponse.json({
      success: true,
      media: filteredMedia,
      total: sampleMedia.length,
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}

// POST /api/admin/media - Upload new media
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filename, original_name, file_path, file_size, mime_type, alt_text, caption, tags } = body;

    // Validate required fields
    if (!filename || !original_name || !file_path || !file_size || !mime_type) {
      return NextResponse.json(
        { success: false, error: 'Filename, original name, file path, file size, and mime type are required' },
        { status: 400 }
      );
    }

    const newMedia = {
      id: uuidv4(),
      filename,
      original_name,
      file_path,
      file_size,
      mime_type,
      alt_text,
      caption,
      tags: tags || [],
      uploaded_by: 'admin-001',
      created_at: new Date().toISOString(),
    };

    // In a real implementation, this would be saved to the database
    sampleMedia.push(newMedia);

    return NextResponse.json({
      success: true,
      media: newMedia,
      message: 'Media uploaded successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error uploading media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload media' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/media - Delete media items
export async function DELETE(request: NextRequest) {
  try {
    // Check permissions
    // const permissionCheck = await requireManageMedia()(request);
    // if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids');

    if (!ids) {
      return NextResponse.json(
        { success: false, error: 'Media IDs are required' },
        { status: 400 }
      );
    }

    const mediaIds = ids.split(',');
    let deletedCount = 0;

    for (const mediaId of mediaIds) {
      try {
        // Get media item
        const mediaItem = sampleMedia.find(item => item.id === mediaId);

        if (mediaItem) {
          // Delete from sample data
          const index = sampleMedia.indexOf(mediaItem);
          if (index > -1) {
            sampleMedia.splice(index, 1);
          }
          deletedCount++;
        }
      } catch (error) {
        console.error(`Error deleting media ${mediaId}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Deleted ${deletedCount} media items`,
      deletedCount
    });
  } catch (error) {
    console.error('Error deleting media items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete media items' },
      { status: 500 }
    );
  }
} 