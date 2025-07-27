const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

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

    // Default navigation menu
    const navMenuId = uuidv4();
    const navMenuName = 'Main Navigation';
    const navMenuItems = [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about', submenu: [
        { name: 'Learn more', href: '/about/learn-more' },
        { name: 'Leadership', href: '/about/leadership' },
      ] },
      { name: 'Technology', href: '/technology', submenu: [
        { name: 'Overview', href: '/technology' },
        { name: 'How It Works', href: '/technology/how-it-works' },
        { name: 'Components', href: '/technology/components', submenu: [
          { name: 'Overview', href: '/technology/components' },
          { name: 'Floater', href: '/technology/floater' },
          { name: 'Pneumatic System', href: '/technology/pneumatic-system' },
          { name: 'Conveyor Chain', href: '/technology/conveyor-chain' },
          { name: 'Generator', href: '/technology/generator' },
          { name: 'Control System', href: '/technology/control-system' },
          { name: 'Gearbox', href: '/technology/gearbox' },
        ] },
        { name: 'Performance', href: '/technology/performance' },
        { name: 'Specifications', href: '/technology/specifications' },
        { name: 'KPP Technical Documentation', href: '/technology/kpp-documentation' },
        { name: 'Economics', href: '/economics' },
        { name: 'Interactive Features', href: '/interactive-features' },
      ] },
      { name: 'Services', href: '/services', submenu: [
        { name: 'Supply', href: '/services/supply' },
        { name: 'EPC', href: '/services/epc' },
        { name: 'O&M', href: '/services/om' },
      ] },
      { name: 'Projects', href: '/projects' },
      { name: 'Team', href: '/team', submenu: [
        { name: 'Our Team', href: '/team' },
        { name: 'Careers', href: '/team/careers' },
      ] },
      { name: 'Contact', href: '/contact' },
    ];
    db.prepare(`INSERT OR IGNORE INTO navigation_menus (id, name, items_json, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)`)
      .run(navMenuId, navMenuName, JSON.stringify(navMenuItems), now, now);
    console.log('✅ Default navigation menu seeded');

    // Footer navigation menu
    const footerMenuId = uuidv4();
    const footerMenuName = 'Footer Navigation';
    const footerMenuItems = [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Contact', href: '/contact' },
    ];
    db.prepare(`INSERT OR IGNORE INTO navigation_menus (id, name, items_json, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)`)
      .run(footerMenuId, footerMenuName, JSON.stringify(footerMenuItems), now, now);
    console.log('✅ Footer navigation menu seeded');

    // Mobile navigation menu
    const mobileMenuId = uuidv4();
    const mobileMenuName = 'Mobile Navigation';
    const mobileMenuItems = navMenuItems; // For now, same as main
    db.prepare(`INSERT OR IGNORE INTO navigation_menus (id, name, items_json, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)`)
      .run(mobileMenuId, mobileMenuName, JSON.stringify(mobileMenuItems), now, now);
    console.log('✅ Mobile navigation menu seeded');

    db.close();
    console.log('🎉 Seeding complete!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

main(); 