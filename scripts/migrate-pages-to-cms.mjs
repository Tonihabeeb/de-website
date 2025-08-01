#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the pages to migrate with their content
const pagesToMigrate = [
  {
    title: 'Home',
    slug: '',
    content: `
      <h1>Deep Engineering - Continuous Clean Energy, Anywhere</h1>
      <p>Delivering 24/7 renewable power through the revolutionary Kinetic Power Plant (KPP) technology – no fuel, no emissions. Iraq's pioneer in renewable energy project development.</p>
      <p>Our mission is to transform Iraq's energy landscape by deploying innovative, sustainable power solutions that work anywhere, anytime.</p>
    `,
    meta_title: 'Deep Engineering - Continuous Clean Energy, Anywhere',
    meta_description: 'Delivering 24/7 renewable power through the revolutionary Kinetic Power Plant (KPP) technology – no fuel, no emissions. Iraq\'s pioneer in renewable energy project development.',
    meta_keywords: 'renewable energy, kinetic power plant, KPP, clean energy, Iraq, sustainable power, green energy, 24/7 power, fuel-free energy',
    status: 'published'
  },
  {
    title: 'About Us',
    slug: 'about',
    content: `
      <h1>About Deep Engineering</h1>
      <p>Deep Engineering is Iraq's pioneer in renewable energy project development, turning innovative technology into sustainable power.</p>
      <p>Founded in 2019 in Erbil, with a branch in Basra, Deep Engineering has assembled a multidisciplinary team to drive Iraq's clean energy future. As the exclusive KPP licensee for Iraq, we are deploying world-class kinetic power plants to deliver reliable green electricity.</p>
      <h2>Our Mission</h2>
      <p>To transform Iraq's energy landscape through innovative, sustainable power solutions that work anywhere, anytime.</p>
      <h2>Our Focus</h2>
      <ul>
        <li>Renewable energy project development</li>
        <li>Smart-grid retrofits</li>
        <li>Project planning and execution</li>
        <li>KPP technology deployment</li>
      </ul>
      <h2>Our Achievements</h2>
      <p>90 MW KPP project in Samawah and 300 MW in KRG in development</p>
    `,
    meta_title: 'About Deep Engineering - Iraq\'s Renewable Energy Pioneer',
    meta_description: 'Learn about Deep Engineering, Iraq\'s pioneer in renewable energy project development. Founded in 2019, we\'re transforming the energy landscape with innovative KPP technology.',
    meta_keywords: 'Deep Engineering, Iraq renewable energy, KPP technology, clean energy projects, sustainable power',
    status: 'published'
  },
  {
    title: 'Technology',
    slug: 'technology',
    content: `
      <h1>Kinetic Power Plant Technology</h1>
      <p>Discover the revolutionary Kinetic Power Plant technology that's transforming renewable energy in Iraq and beyond. Clean, continuous, and deployable anywhere.</p>
      <h2>Revolutionary Energy Generation</h2>
      <p>The Kinetic Power Plant (KPP) represents a breakthrough in renewable energy technology. By harnessing the principles of buoyancy and gravity, KPP generates clean, continuous power without the limitations of traditional renewable sources.</p>
      <p>Our technology operates 24/7, requires no fuel, produces zero emissions, and can be deployed anywhere - from urban centers to remote locations. This makes KPP the ideal solution for Iraq's energy needs and global sustainability goals.</p>
      <h2>Key Benefits</h2>
      <ul>
        <li><strong>Clean:</strong> Zero emissions, no combustion</li>
        <li><strong>Continuous:</strong> 24/7 operation, no weather dependency</li>
        <li><strong>Decentralized:</strong> Can be installed at the point of need</li>
        <li><strong>Scalable:</strong> Modular design from few MW to 100+ MW</li>
        <li><strong>Small Footprint:</strong> ~300 m² per MW</li>
        <li><strong>Competitive:</strong> Projected ~€25/MWh</li>
      </ul>
      <h2>System Components</h2>
      <p>KPP systems consist of carefully engineered components that work together to generate clean, reliable power efficiently:</p>
      <ul>
        <li><strong>Kinetic Module:</strong> The core unit that converts kinetic energy into electricity</li>
        <li><strong>Control System:</strong> Advanced electronics for monitoring and optimizing performance</li>
        <li><strong>Power Electronics:</strong> Inverters and converters to deliver grid-ready power</li>
      </ul>
    `,
    meta_title: 'KPP Technology - Revolutionary Fuel-Free Power Generation',
    meta_description: 'Discover the revolutionary Kinetic Power Plant (KPP) technology - fuel-free, emissions-free power generation that works 24/7. Learn how KPP provides continuous clean energy anywhere.',
    meta_keywords: 'KPP technology, kinetic power plant, fuel-free energy, emissions-free power, 24/7 renewable energy, continuous power generation, clean energy technology',
    status: 'published'
  },
  {
    title: 'How KPP Works',
    slug: 'technology/how-it-works',
    content: `
      <h1>How KPP Works</h1>
      <p>Discover the innovative physics and engineering behind the Kinetic Power Plant technology that's revolutionizing energy generation.</p>
      <h2>The Science Behind KPP</h2>
      <p>The Kinetic Power Plant operates on the principle of buoyancy and gravity, creating a continuous cycle of energy generation without the need for fuel or external energy sources.</p>
      <h2>Key Advantages</h2>
      <ul>
        <li><strong>No Fuel Required:</strong> Operates entirely on kinetic energy, eliminating fuel costs and supply chain dependencies</li>
        <li><strong>Weather Independent:</strong> Unlike solar or wind, KPP technology works continuously regardless of weather conditions</li>
        <li><strong>Zero Emissions:</strong> Clean energy generation with no CO2, NOx, or particulate emissions</li>
        <li><strong>Baseload Capability:</strong> Provides reliable 24/7 power generation to meet continuous energy demands</li>
      </ul>
      <h2>Process Overview</h2>
      <p>The KPP system creates a continuous cycle where buoyant forces and gravity work together to generate electricity. This innovative approach eliminates the need for fuel while providing reliable, clean power generation.</p>
    `,
    meta_title: 'How KPP Works - Kinetic Power Plant Technology Explained',
    meta_description: 'Understand the innovative physics and engineering behind KPP technology. Learn how buoyancy and gravity create continuous, fuel-free power generation.',
    meta_keywords: 'how KPP works, kinetic power plant process, buoyancy gravity energy, fuel-free power generation, KPP technology explained',
    status: 'published'
  },
  {
    title: 'KPP Components',
    slug: 'technology/components',
    content: `
      <h1>KPP System Components</h1>
      <p>Explore the key components that make up a KPP power plant and understand how each part contributes to clean, reliable energy generation.</p>
      <h2>Core Components</h2>
      <h3>Kinetic Module</h3>
      <p>The heart of the KPP system, the kinetic module converts the continuous motion of buoyant forces into electrical energy. This innovative component eliminates the need for fuel while providing reliable power generation.</p>
      <h3>Control System</h3>
      <p>Advanced electronics monitor and optimize performance in real-time, ensuring maximum efficiency and reliability. The control system manages all aspects of power generation and grid integration.</p>
      <h3>Power Electronics</h3>
      <p>Inverters and converters transform the generated energy into grid-ready power, ensuring compatibility with existing electrical infrastructure.</p>
      <h2>Design Features</h2>
      <ul>
        <li><strong>Modular Design:</strong> Components are designed for easy assembly, maintenance, and replacement</li>
        <li><strong>Precision Engineering:</strong> Each component is manufactured to exacting tolerances</li>
        <li><strong>Scalable Architecture:</strong> Systems can be expanded from small installations to large power plants</li>
      </ul>
    `,
    meta_title: 'KPP Components - System Architecture and Design',
    meta_description: 'Explore the key components of KPP technology including kinetic modules, control systems, and power electronics. Understand the modular, scalable design.',
    meta_keywords: 'KPP components, kinetic module, control system, power electronics, modular design, precision engineering',
    status: 'published'
  },
  {
    title: 'Projects',
    slug: 'projects',
    content: `
      <h1>Our Projects</h1>
      <p>Discover our current and planned KPP projects across Iraq, delivering clean, reliable energy to communities and industries.</p>
      <h2>Current Projects</h2>
      <h3>Samawah 90 MW KPP Project</h3>
      <p>Our flagship project in Samawah represents a major milestone in Iraq's renewable energy development. This 90 MW installation will provide clean, continuous power to the region.</p>
      <h3>Kurdistan Region 300 MW Development</h3>
      <p>We're developing a 300 MW KPP installation in the Kurdistan Region, demonstrating the scalability and versatility of our technology.</p>
      <h2>Project Benefits</h2>
      <ul>
        <li><strong>Clean Energy:</strong> Zero emissions, supporting Iraq's environmental goals</li>
        <li><strong>Reliable Power:</strong> 24/7 operation, reducing energy insecurity</li>
        <li><strong>Economic Development:</strong> Creating jobs and supporting local communities</li>
        <li><strong>Energy Independence:</strong> Reducing reliance on imported fuel</li>
      </ul>
    `,
    meta_title: 'Deep Engineering Projects - KPP Installations in Iraq',
    meta_description: 'Explore our current and planned KPP projects across Iraq. From Samawah to Kurdistan Region, we\'re delivering clean, reliable energy solutions.',
    meta_keywords: 'KPP projects Iraq, Samawah project, Kurdistan energy, renewable energy projects, clean power Iraq',
    status: 'published'
  },
  {
    title: 'Contact',
    slug: 'contact',
    content: `
      <h1>Contact Deep Engineering</h1>
      <p>Get in touch with our team to learn more about KPP technology and explore partnership opportunities.</p>
      <h2>Our Offices</h2>
      <h3>Erbil Office</h3>
      <p>Roya Tower A 1-14<br>Erbil, Iraq 44001</p>
      <h3>Basra Office</h3>
      <p>Basra Branch<br>Basra, Iraq</p>
      <h2>Get in Touch</h2>
      <p>Ready to explore how KPP technology can transform your energy needs? Contact our team to discuss your requirements and learn more about our innovative solutions.</p>
      <p>Whether you're interested in project development, technology licensing, or partnership opportunities, we're here to help you achieve your energy goals.</p>
    `,
    meta_title: 'Contact Deep Engineering - Get in Touch',
    meta_description: 'Contact Deep Engineering to learn more about KPP technology and explore partnership opportunities. Offices in Erbil and Basra.',
    meta_keywords: 'contact Deep Engineering, KPP technology, renewable energy Iraq, partnership opportunities',
    status: 'published'
  },
  {
    title: 'Economics',
    slug: 'economics',
    content: `
      <h1>Economic Analysis</h1>
      <p>Explore the economic benefits and cost advantages of KPP technology compared to traditional energy sources.</p>
      <h2>Cost Advantages</h2>
      <p>KPP technology offers significant economic advantages over traditional power generation methods:</p>
      <ul>
        <li><strong>No Fuel Costs:</strong> Eliminates ongoing fuel expenses and supply chain dependencies</li>
        <li><strong>Low Operating Costs:</strong> Minimal maintenance requirements and automated operation</li>
        <li><strong>Competitive LCOE:</strong> Projected levelized cost of ~€25/MWh</li>
        <li><strong>Grid Stability Benefits:</strong> Reduces need for expensive grid infrastructure</li>
      </ul>
      <h2>Investment Opportunities</h2>
      <p>KPP projects offer attractive investment opportunities with predictable returns and long-term value creation. Our modular approach allows for scalable investments that grow with energy demand.</p>
      <h2>Economic Impact</h2>
      <p>Beyond direct energy costs, KPP projects create local jobs, support economic development, and contribute to energy security and independence.</p>
    `,
    meta_title: 'KPP Economics - Cost Analysis and Investment Opportunities',
    meta_description: 'Explore the economic benefits of KPP technology including cost advantages, investment opportunities, and economic impact analysis.',
    meta_keywords: 'KPP economics, cost analysis, investment opportunities, renewable energy economics, LCOE',
    status: 'published'
  }
];

// Function to create a unique ID
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// Function to format current date for SQLite
function getCurrentDate() {
  return new Date().toISOString().replace('T', ' ').replace('Z', '');
}

// Function to generate SQL insert statements
function generateSQLStatements() {
  const statements = [];
  
  pagesToMigrate.forEach(page => {
    const id = generateId();
    const now = getCurrentDate();
    
    const sql = `
INSERT INTO pages (
  id, title, slug, content, meta_title, meta_description, meta_keywords,
  og_title, og_description, og_image, twitter_title, twitter_description,
  twitter_image, status, created_at, updated_at, created_by
) VALUES (
  '${id}',
  '${page.title.replace(/'/g, "''")}',
  '${page.slug}',
  '${page.content.replace(/'/g, "''")}',
  '${page.meta_title.replace(/'/g, "''")}',
  '${page.meta_description.replace(/'/g, "''")}',
  '${page.meta_keywords.replace(/'/g, "''")}',
  '${page.meta_title.replace(/'/g, "''")}',
  '${page.meta_description.replace(/'/g, "''")}',
  '',
  '${page.meta_title.replace(/'/g, "''")}',
  '${page.meta_description.replace(/'/g, "''")}',
  '',
  '${page.status}',
  '${now}',
  '${now}',
  'system'
);`;
    
    statements.push(sql);
  });
  
  return statements;
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting page migration to CMS...');
    
    const sqlStatements = generateSQLStatements();
    
    // Create migration file
    const migrationPath = path.join(__dirname, '..', 'database', 'migrations', '003_migrate_static_pages.sql');
    
    // Ensure migrations directory exists
    const migrationsDir = path.dirname(migrationPath);
    if (!fs.existsSync(migrationsDir)) {
      fs.mkdirSync(migrationsDir, { recursive: true });
    }
    
    const migrationContent = `-- Migration: Migrate static pages to CMS
-- This migration adds existing static pages to the database for CMS editing

${sqlStatements.join('\n\n')}

-- Update any existing pages with the same slugs
DELETE FROM pages WHERE slug IN (${pagesToMigrate.map(p => `'${p.slug}'`).join(', ')});

-- Re-insert the migrated pages
${sqlStatements.join('\n\n')}
`;
    
    fs.writeFileSync(migrationPath, migrationContent);
    
    console.log(`✅ Migration file created: ${migrationPath}`);
    console.log(`📄 Migrated ${pagesToMigrate.length} pages:`);
    
    pagesToMigrate.forEach(page => {
      console.log(`   - ${page.title} (/${page.slug})`);
    });
    
    console.log('\n📋 Next steps:');
    console.log('1. Run the migration: node backend/src/app.ts');
    console.log('2. Access the admin panel: http://localhost:3000/admin/pages');
    console.log('3. Edit pages through the CMS interface');
    console.log('4. Update your page components to fetch from the API');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
main(); 