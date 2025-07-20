import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'database', 'cms.db');
const db = new Database(dbPath);

console.log('🔧 Setting up admin user and sample pages...\n');

try {
  // Check if admin user exists
  const adminUser = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@deepengineering.co');
  
  let adminUserId;
  
  if (!adminUser) {
    console.log('👤 Creating admin user...');
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    adminUserId = 'admin-001';
    
    const insertUser = db.prepare(`
      INSERT INTO users (id, name, email, password_hash, role, is_active)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    insertUser.run(
      adminUserId,
      'Admin User',
      'admin@deepengineering.co',
      hashedPassword,
      'super_admin',
      1
    );
    
    console.log('✅ Admin user created successfully');
  } else {
    adminUserId = adminUser.id;
    console.log('✅ Admin user already exists');
  }

  // Check if pages exist
  const pageCount = db.prepare('SELECT COUNT(*) as count FROM pages').get();
  console.log(`📊 Current pages in database: ${pageCount.count}`);

  if (pageCount.count === 0) {
    console.log('\n📝 Adding sample pages...\n');
    
    // Add sample pages with correct admin user reference
    const samplePages = [
      {
        id: 'page-001',
        slug: 'home',
        title: 'Home Page',
        content: JSON.stringify({ 
          blocks: [
            { 
              type: 'paragraph', 
              content: 'Welcome to Deep Engineering - Your Partner in Renewable Energy Innovation' 
            },
            {
              type: 'heading',
              content: 'Leading the Future of Energy'
            },
            {
              type: 'paragraph',
              content: 'We specialize in Kinetic Power Plant (KPP) technology, delivering sustainable energy solutions for a greener tomorrow.'
            }
          ]
        }),
        meta_title: 'Deep Engineering - Home',
        meta_description: 'Welcome to Deep Engineering, your partner in innovative renewable energy solutions with KPP technology.',
        meta_keywords: 'renewable energy, KPP technology, kinetic power, engineering solutions',
        status: 'published',
        created_by: adminUserId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: new Date().toISOString()
      },
      {
        id: 'page-002',
        slug: 'about',
        title: 'About Us',
        content: JSON.stringify({ 
          blocks: [
            { 
              type: 'heading', 
              content: 'About Deep Engineering' 
            },
            {
              type: 'paragraph',
              content: 'Deep Engineering is a leading renewable energy company specializing in Kinetic Power Plant (KPP) technology.'
            },
            {
              type: 'paragraph',
              content: 'Our mission is to provide sustainable, efficient, and innovative energy solutions that contribute to a cleaner, more sustainable future.'
            }
          ]
        }),
        meta_title: 'About Deep Engineering',
        meta_description: 'Learn about Deep Engineering and our mission to deliver innovative renewable energy solutions with KPP technology.',
        meta_keywords: 'about, company, mission, renewable energy, KPP',
        status: 'published',
        created_by: adminUserId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: new Date().toISOString()
      },
      {
        id: 'page-003',
        slug: 'technology',
        title: 'KPP Technology',
        content: JSON.stringify({ 
          blocks: [
            { 
              type: 'heading', 
              content: 'Kinetic Power Plant Technology' 
            },
            {
              type: 'paragraph',
              content: 'Our revolutionary KPP technology harnesses kinetic energy to generate clean, sustainable power.'
            },
            {
              type: 'paragraph',
              content: 'This innovative approach provides efficient energy generation with minimal environmental impact.'
            }
          ]
        }),
        meta_title: 'KPP Technology - Deep Engineering',
        meta_description: 'Discover our revolutionary Kinetic Power Plant (KPP) technology for sustainable energy generation.',
        meta_keywords: 'KPP technology, kinetic power, renewable energy, sustainable power',
        status: 'published',
        created_by: adminUserId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: new Date().toISOString()
      },
      {
        id: 'page-004',
        slug: 'services',
        title: 'Our Services',
        content: JSON.stringify({ 
          blocks: [
            { 
              type: 'heading', 
              content: 'Engineering Services' 
            },
            {
              type: 'paragraph',
              content: 'We offer comprehensive engineering services including KPP design, installation, and maintenance.'
            },
            {
              type: 'paragraph',
              content: 'Our team of experts provides end-to-end solutions for renewable energy projects.'
            }
          ]
        }),
        meta_title: 'Engineering Services - Deep Engineering',
        meta_description: 'Comprehensive engineering services for renewable energy projects including KPP design and implementation.',
        meta_keywords: 'engineering services, KPP design, renewable energy, project management',
        status: 'published',
        created_by: adminUserId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: new Date().toISOString()
      },
      {
        id: 'page-005',
        slug: 'contact',
        title: 'Contact Us',
        content: JSON.stringify({ 
          blocks: [
            { 
              type: 'heading', 
              content: 'Get in Touch' 
            },
            {
              type: 'paragraph',
              content: 'Ready to start your renewable energy project? Contact our team of experts today.'
            },
            {
              type: 'paragraph',
              content: 'We\'re here to help you implement sustainable energy solutions for your needs.'
            }
          ]
        }),
        meta_title: 'Contact Deep Engineering',
        meta_description: 'Contact Deep Engineering for your renewable energy project needs and KPP technology inquiries.',
        meta_keywords: 'contact, support, inquiry, renewable energy, KPP',
        status: 'published',
        created_by: adminUserId,
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
    console.log('\n📋 Existing pages:');
    const pages = db.prepare('SELECT id, slug, title, status, created_at FROM pages ORDER BY created_at DESC').all();
    
    pages.forEach(page => {
      console.log(`  - ${page.title} (${page.slug}) - ${page.status}`);
    });
  }

  console.log('\n🔑 Admin Login Credentials:');
  console.log('  Email: admin@deepengineering.co');
  console.log('  Password: admin123');

} catch (error) {
  console.error('❌ Error:', error.message);
} finally {
  db.close();
} 