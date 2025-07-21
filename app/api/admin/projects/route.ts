import { NextRequest, NextResponse } from 'next/server';

// GET /api/admin/projects - Get all projects
export async function GET(request: NextRequest) {
  try {
    const sampleProjects = [
      {
        id: 'project-001',
        name: 'KPP Power Plant - Phase 1',
        slug: 'kpp-power-plant-phase-1',
        description:
          'First phase of the Kinetic Power Plant implementation with 50MW capacity',
        status: 'in-progress',
        capacity_mw: 50,
        location: 'Erbil, Iraq',
        start_date: '2024-01-15',
        end_date: '2025-06-30',
        budget: 25000000,
        budget_currency: 'USD',
        created_by: 'admin-001',
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-07-20T00:00:00.000Z',
      },
      {
        id: 'project-002',
        name: 'Renewable Energy Research Center',
        slug: 'renewable-energy-research-center',
        description:
          'Advanced research facility for renewable energy technologies and KPP optimization',
        status: 'planning',
        capacity_mw: 10,
        location: 'Baghdad, Iraq',
        start_date: '2024-09-01',
        end_date: '2026-03-31',
        budget: 15000000,
        budget_currency: 'USD',
        created_by: 'admin-001',
        created_at: '2024-06-01T00:00:00.000Z',
        updated_at: '2024-07-20T00:00:00.000Z',
      },
    ];

    return NextResponse.json({
      success: true,
      projects: sampleProjects,
      total: sampleProjects.length,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
