import { NextRequest, NextResponse } from 'next/server';
import { requireEditProjects } from '@/middleware/permissions';
import { ProjectModel } from '@/database/models/Project';
import { writeFile, readFile, unlink } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

// GET /api/admin/projects/[id]/media - Get project media
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check permissions
    const permissionCheck = await requireEditProjects()(request);
    if (permissionCheck) return permissionCheck;

    const project = await ProjectModel.findById(id);
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    // For now, return mock media list since we don't have a media table yet
    // TODO: Implement actual media database table and queries
    const media = [
      {
        id: '1',
        filename: 'project-image-1.jpg',
        original_name: 'project-image-1.jpg',
        file_path: `/uploads/projects/${id}/project-image-1.jpg`,
        file_size: 1024 * 1024, // 1MB
        mime_type: 'image/jpeg',
        alt_text: 'Project overview image',
        caption: 'Main project visualization',
        tags: ['overview', 'visualization'],
        uploaded_by: 'admin@example.com',
        created_at: new Date().toISOString(),
      }
    ];

    return NextResponse.json({
      success: true,
      media,
      total: media.length,
    });
  } catch (error) {
    console.error('Error fetching project media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project media' },
      { status: 500 }
    );
  }
}

// POST /api/admin/projects/[id]/media - Upload project media
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check permissions
    const permissionCheck = await requireEditProjects()(request);
    if (permissionCheck) return permissionCheck;

    const project = await ProjectModel.findById(id);
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const altText = formData.get('alt_text') as string;
    const caption = formData.get('caption') as string;
    const tags = formData.get('tags') as string;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Create project-specific uploads directory
    const projectUploadsDir = path.join(process.cwd(), 'public', 'uploads', 'projects', id);
    if (!existsSync(projectUploadsDir)) {
      mkdirSync(projectUploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name;
    const extension = path.extname(originalName);
    const filename = `${timestamp}-${Math.random().toString(36).substring(2)}${extension}`;
    const filePath = path.join(projectUploadsDir, filename);

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // For now, return mock media object since we don't have a media table yet
    // TODO: Save to media database table with project association
    const media = {
      id: timestamp.toString(),
      filename,
      original_name: originalName,
      file_path: `/uploads/projects/${id}/${filename}`,
      file_size: buffer.length,
      mime_type: file.type,
      alt_text: altText || '',
      caption: caption || '',
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      uploaded_by: 'admin@example.com', // TODO: Get from auth
      created_at: new Date().toISOString(),
      project_id: id,
    };

    return NextResponse.json({
      success: true,
      media,
      message: 'Project media uploaded successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error uploading project media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload project media' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/projects/[id]/media - Delete project media
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check permissions
    const permissionCheck = await requireEditProjects()(request);
    if (permissionCheck) return permissionCheck;

    const { searchParams } = new URL(request.url);
    const mediaId = searchParams.get('media_id');

    if (!mediaId) {
      return NextResponse.json(
        { success: false, error: 'Media ID is required' },
        { status: 400 }
      );
    }

    const project = await ProjectModel.findById(id);
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    // For now, just return success since we don't have actual media storage yet
    // TODO: Implement actual media deletion from database and file system
    return NextResponse.json({
      success: true,
      message: 'Project media deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project media' },
      { status: 500 }
    );
  }
} 