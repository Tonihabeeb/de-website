import { NextRequest, NextResponse } from 'next/server';
import { ProjectModel } from '@/database/models/Project';

export async function GET(request: NextRequest) {
  try {
    const projects = await ProjectModel.findAll();
    const json = JSON.stringify(projects, null, 2);
    return new NextResponse(json, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="projects-export.json"',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to export projects' },
      { status: 500 }
    );
  }
}
