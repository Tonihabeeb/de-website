import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const db = new Database('database/cms.db');

async function main() {
  try {
    // Super admin user
    const superAdminId = uuidv4();
    const name = 'Super Admin';
    const email = 'admin@example.com';
    const password = 'admin123'; // Change after first login!
    const password_hash = await bcrypt.hash(password, 10);
    const role = 'superadmin';
    const now = new Date().toISOString();

    // Insert super admin
    db.prepare(`INSERT OR IGNORE INTO users (id, name, email, password_hash, role, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 1, ?, ?)`)
      .run(superAdminId, name, email, password_hash, role, now, now);
    console.log('✅ Super admin user seeded:', email);

    // Default site setting
    const siteSettingId = uuidv4();
    db.prepare(`INSERT OR IGNORE INTO site_settings (id, key, value, updated_at)
      VALUES (?, 'site_title', 'Deep Engineering Platform', ?)`)
      .run(siteSettingId, now);
    console.log('✅ Default site title seeded');

    db.close();
    console.log('🎉 Seeding complete!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

main(); 