import Database from 'better-sqlite3';
import path from 'path';

// Database file path - handle both backend and root directory contexts
const dbPath = path.join(process.cwd(), 'database', 'cms.db');
const alternativeDbPath = path.join(process.cwd(), '..', 'database', 'cms.db');

// Try the current directory first, then the parent directory
let finalDbPath = dbPath;
if (!require('fs').existsSync(path.dirname(dbPath))) {
  finalDbPath = alternativeDbPath;
}

// Create database instance
export const db = new Database(finalDbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Set busy timeout
db.pragma('busy_timeout = 5000');

// Initialize database with migrations
export function initializeDatabase() {
  try {
    // Drop and recreate migrations table to ensure correct schema
    db.exec(`DROP TABLE IF EXISTS migrations`);
    db.exec(`
      CREATE TABLE migrations (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        executed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Read and execute migration files
    const fs = require('fs');
    const migrationsPath = path.join(process.cwd(), 'database', 'migrations');
    const alternativeMigrationsPath = path.join(process.cwd(), '..', 'database', 'migrations');
    
    // Use the same directory logic as the database path
    const finalMigrationsPath = !fs.existsSync(migrationsPath) ? alternativeMigrationsPath : migrationsPath;

    if (fs.existsSync(finalMigrationsPath)) {
      const migrationFiles = fs
        .readdirSync(finalMigrationsPath)
        .filter((file: string) => file.endsWith('.sql'))
        .sort();

      for (const file of migrationFiles) {
        const migrationId = file.replace('.sql', '');
        
        // Check if migration has already been executed
        const stmt = db.prepare('SELECT id FROM migrations WHERE id = ?');
        const existing = stmt.get(migrationId);
        
        if (!existing) {
          const migrationPath = path.join(finalMigrationsPath, file);
          const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

          console.log(`Executing migration: ${file}`);
          
          // Execute the migration
          db.exec(migrationSQL);
          
          // Record that this migration has been executed
          const insertStmt = db.prepare('INSERT INTO migrations (id, name) VALUES (?, ?)');
          insertStmt.run(migrationId, file);
          
          console.log(`Migration ${migrationId} completed and recorded`);
        } else {
          console.log(`Migration ${migrationId} already executed, skipping`);
        }
      }
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Close database connection
export function closeDatabase() {
  db.close();
}

// Export database instance
export default db;
