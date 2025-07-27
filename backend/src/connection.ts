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
        const migrationPath = path.join(finalMigrationsPath, file);
        const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

        console.log(`Executing migration: ${file}`);
        db.exec(migrationSQL);
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
