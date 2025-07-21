import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/middleware/permissions';
import { db } from '@/database/connection';
import { v4 as uuidv4 } from 'uuid';

// GET /api/admin/navigation - Get all navigation menus
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');

    let query = 'SELECT * FROM navigation_menus';
    const params: any[] = [];

    if (location) {
      query += ' WHERE location = ?';
      params.push(location);
    }

    query += ' ORDER BY location, name';

    const stmt = db.prepare(query);
    const menus = stmt.all(...params) as any[];

    return NextResponse.json({
      success: true,
      menus: menus.map(menu => ({
        id: menu.id,
        name: menu.name,
        location: menu.location,
        items: JSON.parse(menu.items),
        created_at: menu.created_at,
        updated_at: menu.updated_at,
      })),
    });
  } catch (error) {
    console.error('Error fetching navigation menus:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch navigation menus' },
      { status: 500 }
    );
  }
}

// POST /api/admin/navigation - Create new navigation menu
export async function POST(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const { name, location, items } = body;

    // Validate required fields
    if (!name || !location || !items) {
      return NextResponse.json(
        { success: false, error: 'Name, location, and items are required' },
        { status: 400 }
      );
    }

    // Validate location
    const validLocations = ['header', 'footer', 'sidebar'];
    if (!validLocations.includes(location)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid location. Must be one of: header, footer, sidebar',
        },
        { status: 400 }
      );
    }

    // Check if menu with same name and location already exists
    const existingStmt = db.prepare(
      'SELECT id FROM navigation_menus WHERE name = ? AND location = ?'
    );
    const existing = existingStmt.get(name, location);

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: 'Navigation menu with this name and location already exists',
        },
        { status: 409 }
      );
    }

    // Create navigation menu
    const menuId = uuidv4();
    const insertStmt = db.prepare(`
      INSERT INTO navigation_menus (id, name, location, items)
      VALUES (?, ?, ?, ?)
    `);

    insertStmt.run(menuId, name, location, JSON.stringify(items));

    const newMenu = {
      id: menuId,
      name,
      location,
      items,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        menu: newMenu,
        message: 'Navigation menu created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating navigation menu:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create navigation menu' },
      { status: 500 }
    );
  }
}
