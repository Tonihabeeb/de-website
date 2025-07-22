import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { MediaModel } from '@/database/models/Media';

export const config = {
  api: {
    bodyParser: false,
  },
};

// GET /api/admin/media - Get all media
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mime_type = searchParams.get('mime_type') || undefined;
    const uploaded_by = searchParams.get('uploaded_by') || undefined;
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!)
      : undefined;
    const offset = searchParams.get('offset')
      ? parseInt(searchParams.get('offset')!)
      : undefined;
    const tags = searchParams.get('tags')
      ? searchParams
          .get('tags')!
          .split(',')
          .map(t => t.trim())
      : undefined;
    const alt_text = searchParams.get('alt_text') || undefined;
    const caption = searchParams.get('caption') || undefined;

    const media = MediaModel.findAll({
      mime_type,
      uploaded_by,
      tags,
      alt_text,
      caption,
      limit,
      offset,
    });

    return NextResponse.json({
      success: true,
      media,
      total: media.length,
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
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      // Handle file upload
      const form = formidable({
        multiples: true,
        uploadDir: path.join(process.cwd(), 'public', 'uploads'),
        keepExtensions: true,
      });
      const req = (request as any).req || request;
      const [fields, files] = await new Promise<[any, any]>(
        (resolve, reject) => {
          form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve([fields, files]);
          });
        }
      );
      let uploadedFiles: any[] = [];
      if (Array.isArray((files as any).files)) {
        uploadedFiles = (files as any).files;
      } else if ((files as any).files) {
        uploadedFiles = [(files as any).files];
      }
      const newMedia = uploadedFiles.map(file => {
        const media = MediaModel.create({
          filename: path.basename(file.filepath),
          original_name: file.originalFilename,
          file_path: `/uploads/${path.basename(file.filepath)}`,
          file_size: file.size,
          mime_type: file.mimetype,
          alt_text: fields.alt_text || '',
          caption: fields.caption || '',
          tags: fields.tags
            ? Array.isArray(fields.tags)
              ? fields.tags
              : [fields.tags]
            : [],
          uploaded_by: 'admin-001', // TODO: Use real user ID from auth
        });
        return media;
      });
      return NextResponse.json(
        {
          success: true,
          media: newMedia,
          message: 'Media uploaded successfully',
        },
        { status: 201 }
      );
    } else {
      // Fallback: JSON upload (for tests)
      const body = await request.json();
      const schema = z.object({
        filename: z.string().min(1),
        original_name: z.string().min(1),
        file_path: z.string().min(1),
        file_size: z
          .number()
          .int()
          .positive()
          .max(50 * 1024 * 1024), // max 50MB
        mime_type: z.string().min(1),
        alt_text: z.string().optional(),
        caption: z.string().optional(),
        tags: z.array(z.string()).optional(),
      });
      const result = schema.safeParse(body);
      if (!result.success) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid input',
            details: result.error.issues,
          },
          { status: 400 }
        );
      }
      const {
        filename,
        original_name,
        file_path,
        file_size,
        mime_type,
        alt_text,
        caption,
        tags,
      } = result.data;
      const newMedia = MediaModel.create({
        filename,
        original_name,
        file_path,
        file_size,
        mime_type,
        alt_text: alt_text || '',
        caption: caption || '',
        tags: tags || [],
        uploaded_by: 'admin-001', // TODO: Use real user ID from auth
      });
      return NextResponse.json(
        {
          success: true,
          media: newMedia,
          message: 'Media uploaded successfully',
        },
        { status: 201 }
      );
    }
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const ids = searchParams.get('ids');
    let deleted = 0;
    if (id) {
      if (MediaModel.deleteById(id)) deleted = 1;
    } else if (ids) {
      const idList = ids
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
      for (const mediaId of idList) {
        if (MediaModel.deleteById(mediaId)) deleted++;
      }
    } else {
      return NextResponse.json(
        { success: false, error: 'Media id or ids query parameter required' },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete media' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Media ID is required' },
        { status: 400 }
      );
    }
    const body = await request.json();
    const schema = z.object({
      alt_text: z.string().optional(),
      caption: z.string().optional(),
      tags: z.array(z.string()).optional(),
    });
    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid input',
          details: result.error.issues,
        },
        { status: 400 }
      );
    }
    const mediaItem = MediaModel.updateMetadata(id, result.data);
    if (!mediaItem) {
      return NextResponse.json(
        { success: false, error: 'Media not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, media: mediaItem });
  } catch (error) {
    console.error('Error updating media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update media' },
      { status: 500 }
    );
  }
}
