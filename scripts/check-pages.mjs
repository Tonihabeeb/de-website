import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'database', 'cms.db');
const db = new Database(dbPath);

console.log('🔍 Checking for existing pages in the database...\n');

try {
  // Check if pages table exists
  const tableExists = db.prepare(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name='pages'
  `).get();

  if (!tableExists) {
    console.log('❌ Pages table does not exist!');
    process.exit(1);
  }

  // Count total pages
  const countResult = db.prepare('SELECT COUNT(*) as count FROM pages').get();
  console.log(`📊 Total pages in database: ${countResult.count}`);

  if (countResult.count === 0) {
    console.log('\n📝 No pages found. Adding sample pages...\n');
    
    // Add sample pages
    const samplePages = [
      {
        id: '1',
        slug: 'home',
        title: 'Home Page',
        content: JSON.stringify({ blocks: [{ type: 'paragraph', content: 'Welcome to Deep Engineering' }] }),
        meta_title: 'Deep Engineering - Home',
        meta_description: 'Welcome to Deep Engineering, your partner in innovative engineering solutions.',
        meta_keywords: 'engineering, innovation, technology',
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
        content: JSON.stringify({ blocks: [{ type: 'paragraph', content: 'Learn about our company and mission.' }] }),
        meta_title: 'About Deep Engineering',
        meta_description: 'Learn about Deep Engineering and our mission to deliver innovative engineering solutions.',
        meta_keywords: 'about, company, mission',
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
        content: JSON.stringify({ blocks: [{ type: 'paragraph', content: 'Explore our comprehensive engineering services.' }] }),
        meta_title: 'Engineering Services - Deep Engineering',
        meta_description: 'Comprehensive engineering services tailored to your needs.',
        meta_keywords: 'services, engineering, solutions',
        status: 'published',
        created_by: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: new Date().toISOString()
      },
      {
        id: '4',
        slug: 'contact',
        title: 'Contact Us',
        content: JSON.stringify({ blocks: [{ type: 'paragraph', content: 'Get in touch with our team.' }] }),
        meta_title: 'Contact Deep Engineering',
        meta_description: 'Contact Deep Engineering for your engineering needs.',
        meta_keywords: 'contact, support, inquiry',
        status: 'published',
        created_by: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: new Date().toISOString()
      }
    ];

    const insertStmt = db.prepare(`
      INSERT INTO pages (
        id, slug, title, content, meta_title, meta_description, meta_keywords,
        status, created_by, created_at, updated_at, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const page of samplePages) {
      insertStmt.run(
        page.id,
        page.slug,
        page.title,
        page.content,
        page.meta_title,
        page.meta_description,
        page.meta_keywords,
        page.status,
        page.created_by,
        page.created_at,
        page.updated_at,
        page.published_at
      );
      console.log(`✅ Added page: ${page.title} (${page.slug})`);
    }

    console.log('\n🎉 Sample pages added successfully!');
  } else {
    // Show existing pages
    console.log('\n📋 Existing pages:');
    const pages = db.prepare('SELECT id, slug, title, status, created_at FROM pages ORDER BY created_at DESC').all();
    
    pages.forEach(page => {
      console.log(`  - ${page.title} (${page.slug}) - ${page.status}`);
    });
  }

} catch (error) {
  console.error('❌ Error:', error.message);
} finally {
  db.close();
} 