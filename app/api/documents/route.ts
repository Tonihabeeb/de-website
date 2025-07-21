import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    // Build the backend URL with query parameters
    const backendUrl = new URL('/api/documents', BACKEND_URL);
    if (type) {
      backendUrl.searchParams.set('type', type);
    }

    // Get the authorization header from the request
    const authHeader = request.headers.get('authorization');

    const response = await fetch(backendUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
    });

    if (!response.ok) {
      // If the backend returns an error, return sample data for unauthenticated users
      if (response.status === 401) {
        // Return sample project data for unauthenticated users
        const sampleProjects = [
          {
            _id: 'sample-1',
            title: 'KPP Power Plant - Erbil',
            description:
              'Our flagship Kinetic Power Plant project in Erbil, demonstrating 24/7 renewable energy generation with zero emissions.',
            location: 'Erbil, Iraq',
            status: 'In Progress',
            capacityMW: 50,
            image: '/hero-static.svg',
            category: 'renewable-energy',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
          },
          {
            _id: 'sample-2',
            title: 'Green Energy Initiative',
            description:
              'Comprehensive renewable energy solution providing sustainable power to industrial facilities.',
            location: 'Baghdad, Iraq',
            status: 'Planning',
            capacityMW: 25,
            image: '/hero-static.svg',
            category: 'industrial',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
          },
          {
            _id: 'sample-3',
            title: 'Community Power Project',
            description:
              'Local community power generation using KPP technology to provide reliable electricity.',
            location: 'Basra, Iraq',
            status: 'Completed',
            capacityMW: 10,
            image: '/hero-static.svg',
            category: 'community',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
          },
        ];

        return NextResponse.json({
          documents: sampleProjects,
          message: 'Sample data for unauthenticated users',
        });
      }

      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching documents:', error);

    // Return sample data as fallback
    const sampleProjects = [
      {
        _id: 'sample-1',
        title: 'KPP Power Plant - Erbil',
        description:
          'Our flagship Kinetic Power Plant project in Erbil, demonstrating 24/7 renewable energy generation with zero emissions.',
        location: 'Erbil, Iraq',
        status: 'In Progress',
        capacityMW: 50,
        image: '/hero-static.svg',
        category: 'renewable-energy',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
      {
        _id: 'sample-2',
        title: 'Green Energy Initiative',
        description:
          'Comprehensive renewable energy solution providing sustainable power to industrial facilities.',
        location: 'Baghdad, Iraq',
        status: 'Planning',
        capacityMW: 25,
        image: '/hero-static.svg',
        category: 'industrial',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
      {
        _id: 'sample-3',
        title: 'Community Power Project',
        description:
          'Local community power generation using KPP technology to provide reliable electricity.',
        location: 'Basra, Iraq',
        status: 'Completed',
        capacityMW: 10,
        image: '/hero-static.svg',
        category: 'community',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
    ];

    return NextResponse.json({
      documents: sampleProjects,
      message: 'Sample data due to backend connection issue',
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get('authorization');

    const response = await fetch(`${BACKEND_URL}/api/documents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json(
      { error: 'Failed to create document' },
      { status: 500 }
    );
  }
}
