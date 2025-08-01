import { NextRequest, NextResponse } from 'next/server';

// Sample projects data
const sampleProjects = [
  {
    id: '1',
    name: 'KPP Power Plant - Basra',
    slug: 'kpp-power-plant-basra',
    description: 'Advanced kinetic power plant providing 24/7 renewable energy to Basra region.',
    content: {},
    status: 'completed',
    capacity_mw: 50,
    location: 'Basra, Iraq',
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Community Microgrid - Baghdad',
    slug: 'community-microgrid-baghdad',
    description: 'Local community power generation using KPP technology to provide reliable electricity.',
    content: {},
    status: 'in-progress',
    capacity_mw: 10,
    location: 'Baghdad, Iraq',
    created_at: new Date('2024-02-01'),
    updated_at: new Date('2024-02-01'),
  },
  {
    id: '3',
    name: 'Industrial Complex - Erbil',
    slug: 'industrial-complex-erbil',
    description: 'Large-scale industrial power solution using innovative KPP technology.',
    content: {},
    status: 'planning',
    capacity_mw: 100,
    location: 'Erbil, Iraq',
    created_at: new Date('2024-03-01'),
    updated_at: new Date('2024-03-01'),
  },
];

// GET /api/projects - Get all projects (public route)
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      projects: sampleProjects,
    });
  } catch (error) {
    console.error('Error in projects API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
} 