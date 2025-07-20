import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database file path
const dbPath = path.join(__dirname, '..', 'database', 'cms.db');

console.log('🚀 Initializing database...');
console.log(`📁 Database path: ${dbPath}`);

// Create database instance
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Set busy timeout
db.pragma('busy_timeout = 5000');

try {
  // Read and execute migration files
  const migrationsPath = path.join(__dirname, '..', 'database', 'migrations');
  
  if (fs.existsSync(migrationsPath)) {
    const migrationFiles = fs.readdirSync(migrationsPath)
      .filter((file) => file.endsWith('.sql'))
      .sort();
    
    console.log(`📋 Found ${migrationFiles.length} migration files`);
    
    for (const file of migrationFiles) {
      const migrationPath = path.join(migrationsPath, file);
      const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
      
      console.log(`🔄 Executing migration: ${file}`);
      db.exec(migrationSQL);
      console.log(`✅ Completed: ${file}`);
    }
  } else {
    console.log('❌ Migrations directory not found');
  }
  
  console.log('\n🎉 Database initialized successfully!');
  
  // Show database info
  const tables = db.prepare(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name NOT LIKE 'sqlite_%'
  `).all();
  
  console.log('\n📊 Database tables created:');
  tables.forEach((table, index) => {
    console.log(`  ${index + 1}. ${table.name}`);
  });
  
} catch (error) {
  console.error('❌ Error initializing database:', error);
  process.exit(1);
} finally {
  db.close();
} 