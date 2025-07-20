import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/middleware/permissions';
import { db } from '@/database/connection';

// GET /api/admin/settings - Get all site settings
export async function GET(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const stmt = db.prepare('SELECT * FROM site_settings ORDER BY setting_key');
    const rows = stmt.all() as any[];

    // Convert rows to settings object
    const settings: Record<string, any> = {};
    rows.forEach(row => {
      let value = row.setting_value;
      
      // Parse value based on type
      switch (row.setting_type) {
        case 'number':
          value = parseFloat(value);
          break;
        case 'boolean':
          value = value === 'true' || value === '1';
          break;
        case 'json':
          try {
            value = JSON.parse(value);
          } catch {
            value = null;
          }
          break;
      }
      
      settings[row.setting_key] = value;
    });

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch site settings' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/settings - Update site settings
export async function PUT(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const { settings } = body;

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Settings object is required' },
        { status: 400 }
      );
    }

    const updatedSettings: Record<string, any> = {};

    // Update each setting
    for (const [key, value] of Object.entries(settings)) {
      let settingValue = value;
      let settingType = 'string';

      // Determine type and format value
      if (typeof value === 'number') {
        settingType = 'number';
        settingValue = value.toString();
      } else if (typeof value === 'boolean') {
        settingType = 'boolean';
        settingValue = value.toString();
      } else if (typeof value === 'object') {
        settingType = 'json';
        settingValue = JSON.stringify(value);
      }

      // Check if setting exists
      const existingStmt = db.prepare('SELECT id FROM site_settings WHERE setting_key = ?');
      const existing = existingStmt.get(key);

      if (existing) {
        // Update existing setting
        const updateStmt = db.prepare(`
          UPDATE site_settings 
          SET setting_value = ?, setting_type = ?, updated_at = CURRENT_TIMESTAMP 
          WHERE setting_key = ?
        `);
        updateStmt.run(settingValue, settingType, key);
      } else {
        // Create new setting
        const insertStmt = db.prepare(`
          INSERT INTO site_settings (id, setting_key, setting_value, setting_type, description)
          VALUES (?, ?, ?, ?, ?)
        `);
        const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        insertStmt.run(id, key, settingValue, settingType, `Setting for ${key}`);
      }

      // Store the parsed value for response
      updatedSettings[key] = value;
    }

    return NextResponse.json({
      success: true,
      settings: updatedSettings,
      message: 'Site settings updated successfully',
    });
  } catch (error) {
    console.error('Error updating site settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update site settings' },
      { status: 500 }
    );
  }
}

// POST /api/admin/settings/reset - Reset settings to defaults
export async function POST(request: NextRequest) {
  try {
    // Check permissions
    const permissionCheck = await requireAdmin()(request);
    if (permissionCheck) return permissionCheck;

    const body = await request.json();
    const { settings } = body;

    if (!settings || !Array.isArray(settings)) {
      return NextResponse.json(
        { success: false, error: 'Settings array is required' },
        { status: 400 }
      );
    }

    // Clear existing settings
    const clearStmt = db.prepare('DELETE FROM site_settings');
    clearStmt.run();

    // Insert default settings
    const insertStmt = db.prepare(`
      INSERT INTO site_settings (id, setting_key, setting_value, setting_type, description)
      VALUES (?, ?, ?, ?, ?)
    `);

    for (const setting of settings) {
      const { key, value, type = 'string', description = '' } = setting;
      const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      
      let settingValue = value;
      if (type === 'json') {
        settingValue = JSON.stringify(value);
      } else if (typeof value !== 'string') {
        settingValue = value.toString();
      }

      insertStmt.run(id, key, settingValue, type, description);
    }

    return NextResponse.json({
      success: true,
      message: 'Site settings reset to defaults successfully',
    });
  } catch (error) {
    console.error('Error resetting site settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reset site settings' },
      { status: 500 }
    );
  }
} 