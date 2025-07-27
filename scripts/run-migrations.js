const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const db = new Database('database/cms.db');
const migrationsDir = path.join(__dirname, '../database/migrations');

function ensureMigrationsTable() {
  db.prepare(`CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL UNIQUE,
    applied_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`).run();
}

function getAppliedMigrations() {
  const rows = db.prepare('SELECT filename FROM migrations').all();
  return new Set(rows.map(r => r.filename));
}

function getMigrationFiles() {
  return fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();
}

function applyMigration(filename) {
  const filePath = path.join(migrationsDir, filename);
  const sql = fs.readFileSync(filePath, 'utf8');
  db.exec(sql);
  db.prepare('INSERT INTO migrations (filename) VALUES (?)').run(filename);
  console.log(`✅ Applied migration: ${filename}`);
}

function main() {
  ensureMigrationsTable();
  const applied = getAppliedMigrations();
  const files = getMigrationFiles();
  let appliedAny = false;
  for (const file of files) {
    if (!applied.has(file)) {
      try {
        applyMigration(file);
        appliedAny = true;
      } catch (err) {
        console.error(`❌ Failed to apply migration ${file}:`, err);
        process.exit(1);
      }
    } else {
      console.log(`- Already applied: ${file}`);
    }
  }
  if (!appliedAny) {
    console.log('No new migrations to apply.');
  } else {
    console.log('All pending migrations applied.');
  }
  db.close();
}

main(); 