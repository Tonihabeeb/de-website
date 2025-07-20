import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'database', 'cms.db');

console.log('🔍 Testing database connection...\n');

try {
  const db = new Database(dbPath);
  
  console.log('✅ Database connection successful');
  
  // Test if pages table exists
  const tableExists = db.prepare(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name='pages'
  `).get();
  
  if (!tableExists) {
    console.log('❌ Pages table does not exist!');
    process.exit(1);
  }
  
  console.log('✅ Pages table exists');
  
  // Test if we can query pages
  const pages = db.prepare('SELECT id, slug, title, status FROM pages LIMIT 5').all();
  console.log(`✅ Found ${pages.length} pages in database`);
  
  if (pages.length > 0) {
    console.log('\n📋 Sample pages:');
    pages.forEach(page => {
      console.log(`  - ${page.title} (${page.slug}) - ${page.status}`);
    });
  }
  
  // Test if users table exists
  const usersTableExists = db.prepare(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name='users'
  `).get();
  
  if (usersTableExists) {
    const users = db.prepare('SELECT id, name, email, role FROM users LIMIT 5').all();
    console.log(`\n✅ Found ${users.length} users in database`);
    
    if (users.length > 0) {
      console.log('\n👥 Sample users:');
      users.forEach(user => {
        console.log(`  - ${user.name} (${user.email}) - ${user.role}`);
      });
    }
  }
  
  db.close();
  console.log('\n✅ Database test completed successfully');
  
} catch (error) {
  console.error('❌ Database test failed:', error.message);
  process.exit(1);
} 