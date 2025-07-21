import { NextRequest, NextResponse } from 'next/server';

// Sample tags data for development
const sampleTags = [
  {
    id: 'tag-001',
    name: 'technical',
    description: 'Technical documentation and diagrams',
    color: '#3B82F6',
    created_at: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'tag-002',
    name: 'kpp',
    description: 'Kinetic Power Plant related content',
    color: '#10B981',
    created_at: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'tag-003',
    name: 'construction',
    description: 'Construction and site work',
    color: '#F59E0B',
    created_at: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'tag-004',
    name: 'team',
    description: 'Team photos and personnel',
    color: '#8B5CF6',
    created_at: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'tag-005',
    name: 'diagram',
    description: 'Technical diagrams and schematics',
    color: '#EF4444',
    created_at: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'tag-006',
    name: 'project',
    description: 'Project related content',
    color: '#06B6D4',
    created_at: '2024-01-01T00:00:00.000Z',
  },
];

// GET /api/admin/media/tags - Get all tags
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      tags: sampleTags,
      total: sampleTags.length,
    });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}
