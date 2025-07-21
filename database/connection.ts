import Database from 'better-sqlite3';
import path from 'path';

// Database file path
const dbPath = path.join(process.cwd(), 'database', 'cms.db');

// Create database instance
export const db = new Database(dbPath);

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

    if (fs.existsSync(migrationsPath)) {
      const migrationFiles = fs
        .readdirSync(migrationsPath)
        .filter((file: string) => file.endsWith('.sql'))
        .sort();

      for (const file of migrationFiles) {
        const migrationPath = path.join(migrationsPath, file);
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
