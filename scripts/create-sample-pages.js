const Database = require('better-sqlite3');
const path = require('path');

// Connect to the database
const dbPath = path.join(__dirname, '..', 'database', 'cms.db');
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
        subtitle: "Innovative solutions for tomorrow's challenges",
        cta: 'Learn More',
      },
      sections: [
        {
          type: 'features',
          title: 'Our Services',
          items: [
            {
              title: 'Engineering Solutions',
              description: 'Advanced engineering services',
            },
            {
              title: 'Project Management',
              description: 'End-to-end project delivery',
            },
            {
              title: 'Technical Consulting',
              description: 'Expert technical guidance',
            },
          ],
        },
      ],
    }),
    meta_title: 'Deep Engineering - Home',
    meta_description:
      'Welcome to Deep Engineering, your partner in innovative engineering solutions.',
    meta_keywords: 'engineering, solutions, innovation, technology',
    status: 'published',
    created_by: 'admin',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
  },
  {
    id: '2',
    slug: 'about',
    title: 'About Us',
    content: JSON.stringify({
      hero: {
        title: 'About Deep Engineering',
        subtitle: 'Our story and mission',
        cta: 'Contact Us',
      },
      sections: [
        {
          type: 'content',
          title: 'Our Mission',
          content:
            'To provide innovative engineering solutions that drive progress and create value for our clients.',
        },
        {
          type: 'team',
          title: 'Our Team',
          description: 'Meet the experts behind our success',
        },
      ],
    }),
    meta_title: 'About Deep Engineering',
    meta_description:
      'Learn about Deep Engineering, our mission, and our team of experts.',
    meta_keywords: 'about, company, team, mission',
    status: 'published',
    created_by: 'admin',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
  },
  {
    id: '3',
    slug: 'services',
    title: 'Our Services',
    content: JSON.stringify({
      hero: {
        title: 'Our Services',
        subtitle: 'Comprehensive engineering solutions',
        cta: 'Get Started',
      },
      sections: [
        {
          type: 'services',
          items: [
            {
              title: 'Engineering Design',
              description: 'Custom engineering solutions',
            },
            {
              title: 'Project Management',
              description: 'End-to-end project delivery',
            },
            {
              title: 'Technical Consulting',
              description: 'Expert technical guidance',
            },
            {
              title: 'Quality Assurance',
              description: 'Rigorous quality standards',
            },
          ],
        },
      ],
    }),
    meta_title: 'Services - Deep Engineering',
    meta_description:
      'Explore our comprehensive range of engineering services and solutions.',
    meta_keywords: 'services, engineering, design, consulting',
    status: 'published',
    created_by: 'admin',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
  },
  {
    id: '4',
    slug: 'contact',
    title: 'Contact Us',
    content: JSON.stringify({
      hero: {
        title: 'Contact Us',
        subtitle: 'Get in touch with our team',
        cta: 'Send Message',
      },
      sections: [
        {
          type: 'contact',
          title: 'Get In Touch',
          description:
            "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
        },
      ],
    }),
    meta_title: 'Contact Deep Engineering',
    meta_description:
      'Contact Deep Engineering for inquiries, support, or to discuss your project needs.',
    meta_keywords: 'contact, support, inquiry, project',
    status: 'published',
    created_by: 'admin',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
  },
  {
    id: '5',
    slug: 'technology',
    title: 'Technology',
    content: JSON.stringify({
      hero: {
        title: 'Our Technology',
        subtitle: 'Cutting-edge engineering solutions',
        cta: 'Explore',
      },
      sections: [
        {
          type: 'technology',
          title: 'Innovation Hub',
          description: 'Discover our latest technological advancements',
        },
      ],
    }),
    meta_title: 'Technology - Deep Engineering',
    meta_description:
      'Explore our cutting-edge technology and innovative engineering solutions.',
    meta_keywords: 'technology, innovation, engineering, solutions',
    status: 'draft',
    created_by: 'admin',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

try {
  console.log('Creating sample pages...');

  // Check if pages table exists
  const tableExists = db
    .prepare(
      `
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name='pages'
  `
    )
    .get();

  if (!tableExists) {
    console.log('Pages table does not exist. Creating it...');

    // Create pages table
    db.exec(`
      CREATE TABLE pages (
        id VARCHAR(36) PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        content JSON NOT NULL,
        meta_title VARCHAR(255),
        meta_description TEXT,
        meta_keywords VARCHAR(500),
        status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
        published_at TIMESTAMP NULL,
        created_by VARCHAR(36),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
      insertStmt.run(
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
      insertedCount++;
      console.log(`✓ Created page: ${page.title}`);
    } catch (error) {
      console.log(`⚠ Skipped page: ${page.title} (may already exist)`);
    }
  }

  console.log(`\n✅ Successfully created ${insertedCount} sample pages`);

  // Verify the pages were created
  const pageCount = db.prepare('SELECT COUNT(*) as count FROM pages').get();
  console.log(`Total pages in database: ${pageCount.count}`);
} catch (error) {
  console.error('Error creating sample pages:', error);
} finally {
  db.close();
}
