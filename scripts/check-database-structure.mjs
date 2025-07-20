import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database file path
const dbPath = path.join(__dirname, '..', 'database', 'cms.db');

console.log('🔍 Database Structure Analysis');
console.log('=============================');
console.log(`📁 Database path: ${dbPath}`);

// Create database instance
const db = new Database(dbPath);

try {
  // Get all tables
  const tables = db.prepare(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name NOT LIKE 'sqlite_%'
    ORDER BY name
  `).all();

  console.log(`\n📊 Found ${tables.length} tables:`);

  // Analyze each table
  for (const table of tables) {
    console.log(`\n🔸 Table: ${table.name}`);
    console.log('   └─ Columns:');
    
    // Get column information
    const columns = db.prepare(`PRAGMA table_info(${table.name})`).all();
    
    columns.forEach(col => {
      let columnInfo = `      • ${col.name} (${col.type})`;
      if (col.notnull) columnInfo += ' NOT NULL';
      if (col.pk) columnInfo += ' PRIMARY KEY';
      if (col.dflt_value !== null) columnInfo += ` DEFAULT ${col.dflt_value}`;
      console.log(columnInfo);
    });

    // Get foreign key information
    const foreignKeys = db.prepare(`PRAGMA foreign_key_list(${table.name})`).all();
    if (foreignKeys.length > 0) {
      console.log('   └─ Foreign Keys:');
      foreignKeys.forEach(fk => {
        console.log(`      • ${fk.from} → ${fk.table}.${fk.to}`);
      });
    }

    // Get index information
    const indexes = db.prepare(`
      SELECT name, sql FROM sqlite_master 
      WHERE type='index' AND tbl_name=? AND name NOT LIKE 'sqlite_%'
    `).all(table.name);
    
    if (indexes.length > 0) {
      console.log('   └─ Indexes:');
      indexes.forEach(idx => {
        console.log(`      • ${idx.name}`);
      });
    }

    // Count records
    const count = db.prepare(`SELECT COUNT(*) as count FROM ${table.name}`).get();
    console.log(`   └─ Records: ${count.count}`);
  }

  // Check specific data
  console.log('\n📋 Data Verification:');
  
  // Check projects
  const projects = db.prepare('SELECT name, status, capacity_mw FROM projects').all();
  console.log(`\n🔸 Projects (${projects.length}):`);
  projects.forEach(project => {
    console.log(`   • ${project.name} - ${project.status} (${project.capacity_mw}MW)`);
  });

  // Check users
  const users = db.prepare('SELECT name, email, role FROM users').all();
  console.log(`\n🔸 Users (${users.length}):`);
  users.forEach(user => {
    console.log(`   • ${user.name} (${user.email}) - ${user.role}`);
  });

  // Check site settings
  const settings = db.prepare('SELECT setting_key, setting_value FROM site_settings').all();
  console.log(`\n🔸 Site Settings (${settings.length}):`);
  settings.forEach(setting => {
    console.log(`   • ${setting.setting_key}: ${setting.setting_value}`);
  });

  // Check navigation menus
  const menus = db.prepare('SELECT name, location FROM navigation_menus').all();
  console.log(`\n🔸 Navigation Menus (${menus.length}):`);
  menus.forEach(menu => {
    console.log(`   • ${menu.name} (${menu.location})`);
  });

  // Database integrity check
  console.log('\n🔍 Database Integrity Check:');
  const integrity = db.prepare('PRAGMA integrity_check').get();
  if (integrity.integrity_check === 'ok') {
    console.log('✅ Database integrity: OK');
  } else {
    console.log('❌ Database integrity issues found:', integrity.integrity_check);
  }

  // Foreign key constraints
  const fkEnabled = db.prepare('PRAGMA foreign_keys').get();
  console.log(`🔗 Foreign keys enabled: ${fkEnabled.foreign_keys ? 'Yes' : 'No'}`);

  // WAL mode
  const journalMode = db.prepare('PRAGMA journal_mode').get();
  console.log(`📝 Journal mode: ${journalMode.journal_mode}`);

  console.log('\n✅ Database structure analysis completed!');

} catch (error) {
  console.error('❌ Error analyzing database:', error);
} finally {
  db.close();
} 