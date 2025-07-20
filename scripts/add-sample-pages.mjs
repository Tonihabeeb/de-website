import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to the database
const dbPath = join(__dirname, '..', 'database', 'cms.db');
console.log('Database path:', dbPath);

const db = new Database(dbPath);

// Sample pages data
const samplePages = [
  {
    id: '1',
    slug: 'home',
    title: 'Homepage',
    content: JSON.stringify({
      hero: {
        title: 'Welcome to Deep Engineering',
        subtitle: 'Innovative solutions for tomorrow\'s challenges',
        cta: 'Learn More'
      }
    }),
    meta_title: 'Deep Engineering - Home',
    meta_description: 'Welcome to Deep Engineering, your partner in innovative engineering solutions.',
    meta_keywords: 'engineering, solutions, innovation, technology',
    status: 'published',
    created_by: 'admin',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString()
  },
  {
    id: '2',
    slug: 'about',
    title: 'About Us',
    content: JSON.stringify({
      hero: {
        title: 'About Deep Engineering',
        subtitle: 'Our story and mission',
        cta: 'Contact Us'
      }
    }),
    meta_title: 'About Deep Engineering',
    meta_description: 'Learn about Deep Engineering, our mission, and our team of experts.',
    meta_keywords: 'about, company, team, mission',
    status: 'published',
    created_by: 'admin',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString()
  },
  {
    id: '3',
    slug: 'services',
    title: 'Our Services',
    content: JSON.stringify({
      hero: {
        title: 'Our Services',
        subtitle: 'Comprehensive engineering solutions',
        cta: 'Get Started'
      }
    }),
    meta_title: 'Services - Deep Engineering',
    meta_description: 'Explore our comprehensive range of engineering services and solutions.',
    meta_keywords: 'services, engineering, design, consulting',
    status: 'published',
    created_by: 'admin',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString()
  }
];

try {
  console.log('Creating sample pages...');
  
  // Check if pages table exists
  const tableExists = db.prepare(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name='pages'
  `).get();
  
  console.log('Table exists:', !!tableExists);
  
  if (!tableExists) {
    console.log('Creating pages table...');
    db.exec(`
      CREATE TABLE pages (
        id VARCHAR(36) PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        content JSON NOT NULL,
        meta_title VARCHAR(255),
        meta_description TEXT,
        meta_keywords VARCHAR(500),
        status TEXT DEFAULT 'draft',
        published_at TEXT,
        created_by VARCHAR(36),
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
  
  // Insert sample pages
  const insertStmt = db.prepare(`
    INSERT OR IGNORE INTO pages (
      id, slug, title, content, meta_title, meta_description, meta_keywords,
      status, published_at, created_by, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  let insertedCount = 0;
  for (const page of samplePages) {
    try {
      const result = insertStmt.run(
        page.id,
        page.slug,
        page.title,
        page.content,
        page.meta_title,
        page.meta_description,
        page.meta_keywords,
        page.status,
        page.published_at,
        page.created_by,
        page.created_at,
        page.updated_at
      );
      
      if (result.changes > 0) {
        insertedCount++;
        console.log(`✓ Created page: ${page.title}`);
      } else {
        console.log(`⚠ Skipped page: ${page.title} (already exists)`);
      }
    } catch (error) {
      console.log(`✗ Error creating page ${page.title}:`, error.message);
    }
  }
  
  console.log(`\n✅ Successfully created ${insertedCount} sample pages`);
  
  // Verify the pages were created
  const pageCount = db.prepare('SELECT COUNT(*) as count FROM pages').get();
  console.log(`Total pages in database: ${pageCount.count}`);
  
  // Show all pages
  const allPages = db.prepare('SELECT id, title, slug, status FROM pages').all();
  console.log('\nPages in database:');
  allPages.forEach(page => {
    console.log(`- ${page.title} (${page.slug}) - ${page.status}`);
  });
  
} catch (error) {
  console.error('Error creating sample pages:', error);
} finally {
  db.close();
} 