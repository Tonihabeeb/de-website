import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/middleware/permissions';
import { db } from '@/database/connection';

// GET /api/admin/navigation/[id] - Get navigation menu by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const stmt = db.prepare('SELECT * FROM navigation_menus WHERE id = ?');
    const menu = stmt.get(id) as any;

    if (!menu) {
      return NextResponse.json(
        { success: false, error: 'Navigation menu not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      menu: {
        id: menu.id,
        name: menu.name,
        location: menu.location,
        items: JSON.parse(menu.items),
        created_at: menu.created_at,
        updated_at: menu.updated_at,
      },
    });
  } catch (error) {
    console.error('Error fetching navigation menu:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch navigation menu' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/navigation/[id] - Update navigation menu
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const { name, location, items } = body;

    // Check if menu exists
    const existingStmt = db.prepare(
      'SELECT * FROM navigation_menus WHERE id = ?'
    );
    const existingMenu = existingStmt.get(id) as any;

    if (!existingMenu) {
      return NextResponse.json(
        { success: false, error: 'Navigation menu not found' },
        { status: 404 }
      );
    }

    // Validate location if provided
    if (location) {
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
    }

    // Check if name and location combination already exists (if changed)
    if (
      (name && name !== existingMenu.name) ||
      (location && location !== existingMenu.location)
    ) {
      const checkStmt = db.prepare(
        'SELECT id FROM navigation_menus WHERE name = ? AND location = ? AND id != ?'
      );
      const duplicate = checkStmt.get(
        name || existingMenu.name,
        location || existingMenu.location,
        id
      );

      if (duplicate) {
        return NextResponse.json(
          {
            success: false,
            error: 'Navigation menu with this name and location already exists',
          },
          { status: 409 }
        );
      }
    }

    // Update menu
    const updateStmt = db.prepare(`
      UPDATE navigation_menus 
      SET name = ?, location = ?, items = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    const result = updateStmt.run(
      name || existingMenu.name,
      location || existingMenu.location,
      JSON.stringify(items || existingMenu.items),
      id
    );

    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to update navigation menu' },
        { status: 500 }
      );
    }

    // Get updated menu
    const updatedStmt = db.prepare(
      'SELECT * FROM navigation_menus WHERE id = ?'
    );
    const updatedMenu = updatedStmt.get(id) as any;

    return NextResponse.json({
      success: true,
      menu: {
        id: updatedMenu.id,
        name: updatedMenu.name,
        location: updatedMenu.location,
        items: JSON.parse(updatedMenu.items),
        created_at: updatedMenu.created_at,
        updated_at: updatedMenu.updated_at,
      },
      message: 'Navigation menu updated successfully',
    });
  } catch (error) {
    console.error('Error updating navigation menu:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update navigation menu' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/navigation/[id] - Delete navigation menu
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;

    // Check if menu exists
    const existingStmt = db.prepare(
      'SELECT * FROM navigation_menus WHERE id = ?'
    );
    const existingMenu = existingStmt.get(id) as any;

    if (!existingMenu) {
      return NextResponse.json(
        { success: false, error: 'Navigation menu not found' },
        { status: 404 }
      );
    }

    // Delete menu
    const deleteStmt = db.prepare('DELETE FROM navigation_menus WHERE id = ?');
    const result = deleteStmt.run(id);

    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete navigation menu' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Navigation menu deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting navigation menu:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete navigation menu' },
      { status: 500 }
    );
  }
}
