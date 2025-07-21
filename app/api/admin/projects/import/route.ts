import { NextRequest, NextResponse } from 'next/server';
import { ProjectModel } from '@/database/models/Project';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!Array.isArray(body)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid format: expected an array of projects',
        },
        { status: 400 }
      );
    }
    const results = [];
    for (const project of body) {
      if (!project.slug || !project.name || !project.content) {
        results.push({
          slug: project.slug,
          success: false,
          error: 'Missing required fields',
        });
        continue;
      }
      try {
        await ProjectModel.create(project);
        results.push({ slug: project.slug, success: true });
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        results.push({
          slug: project.slug,
          success: false,
          error: errorMsg || 'Failed to import',
        });
      }
    }
    return NextResponse.json({ success: true, results });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to import projects' },
      { status: 500 }
    );
  }
}
