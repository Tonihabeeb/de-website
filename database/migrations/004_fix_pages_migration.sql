-- Migration: Fix pages migration with proper author_id
-- This migration adds existing static pages to the database for CMS editing

-- First, create a system user for the pages
INSERT OR IGNORE INTO users (
  id, name, email, password_hash, role, is_active
) VALUES (
  'system-user',
  'System User',
  'system@deepengineering.co',
  '$2b$10$dummy.hash.for.system.user',
  'admin',
  1
);

-- Clear any existing pages to avoid conflicts
DELETE FROM pages WHERE created_by = 'system';

-- Insert pages with proper author_id
INSERT INTO pages (
  id, title, slug, content, meta_title, meta_description, meta_keywords,
  og_title, og_description, og_image, twitter_title, twitter_description,
  twitter_image, status, created_at, updated_at, created_by, author_id
) VALUES 
(
  'home-page',
  'Home',
  '',
  '<h1>Deep Engineering - Continuous Clean Energy, Anywhere</h1><p>Delivering 24/7 renewable power through the revolutionary Kinetic Power Plant (KPP) technology – no fuel, no emissions. Iraq''s pioneer in renewable energy project development.</p><p>Our mission is to transform Iraq''s energy landscape by deploying innovative, sustainable power solutions that work anywhere, anytime.</p>',
  'Deep Engineering - Continuous Clean Energy, Anywhere',
  'Delivering 24/7 renewable power through the revolutionary Kinetic Power Plant (KPP) technology – no fuel, no emissions. Iraq''s pioneer in renewable energy project development.',
  'renewable energy, kinetic power plant, KPP, clean energy, Iraq, sustainable power, green energy, 24/7 power, fuel-free energy',
  'Deep Engineering - Continuous Clean Energy, Anywhere',
  'Delivering 24/7 renewable power through the revolutionary Kinetic Power Plant (KPP) technology – no fuel, no emissions. Iraq''s pioneer in renewable energy project development.',
  '',
  'Deep Engineering - Continuous Clean Energy, Anywhere',
  'Delivering 24/7 renewable power through the revolutionary Kinetic Power Plant (KPP) technology – no fuel, no emissions. Iraq''s pioneer in renewable energy project development.',
  '',
  'published',
  '2025-07-27 20:27:52.945',
  '2025-07-27 20:27:52.945',
  'system',
  'system-user'
),
(
  'about-page',
  'About Us',
  'about',
  '<h1>About Deep Engineering</h1><p>Deep Engineering is Iraq''s pioneer in renewable energy project development, turning innovative technology into sustainable power.</p><p>Founded in 2019 in Erbil, with a branch in Basra, Deep Engineering has assembled a multidisciplinary team to drive Iraq''s clean energy future. As the exclusive KPP licensee for Iraq, we are deploying world-class kinetic power plants to deliver reliable green electricity.</p><h2>Our Mission</h2><p>To transform Iraq''s energy landscape through innovative, sustainable power solutions that work anywhere, anytime.</p><h2>Our Focus</h2><ul><li>Renewable energy project development</li><li>Smart-grid retrofits</li><li>Project planning and execution</li><li>KPP technology deployment</li></ul><h2>Our Achievements</h2><p>90 MW KPP project in Samawah and 300 MW in KRG in development</p>',
  'About Deep Engineering - Iraq''s Renewable Energy Pioneer',
  'Learn about Deep Engineering, Iraq''s pioneer in renewable energy project development. Founded in 2019, we''re transforming the energy landscape with innovative KPP technology.',
  'Deep Engineering, Iraq renewable energy, KPP technology, clean energy projects, sustainable power',
  'About Deep Engineering - Iraq''s Renewable Energy Pioneer',
  'Learn about Deep Engineering, Iraq''s pioneer in renewable energy project development. Founded in 2019, we''re transforming the energy landscape with innovative KPP technology.',
  '',
  'About Deep Engineering - Iraq''s Renewable Energy Pioneer',
  'Learn about Deep Engineering, Iraq''s pioneer in renewable energy project development. Founded in 2019, we''re transforming the energy landscape with innovative KPP technology.',
  '',
  'published',
  '2025-07-27 20:27:52.945',
  '2025-07-27 20:27:52.945',
  'system',
  'system-user'
),
(
  'technology-page',
  'Technology',
  'technology',
  '<h1>Kinetic Power Plant Technology</h1><p>Discover the revolutionary Kinetic Power Plant technology that''s transforming renewable energy in Iraq and beyond. Clean, continuous, and deployable anywhere.</p><h2>Revolutionary Energy Generation</h2><p>The Kinetic Power Plant (KPP) represents a breakthrough in renewable energy technology. By harnessing the principles of buoyancy and gravity, KPP generates clean, continuous power without the limitations of traditional renewable sources.</p><p>Our technology operates 24/7, requires no fuel, produces zero emissions, and can be deployed anywhere - from urban centers to remote locations. This makes KPP the ideal solution for Iraq''s energy needs and global sustainability goals.</p><h2>Key Benefits</h2><ul><li><strong>Clean:</strong> Zero emissions, no combustion</li><li><strong>Continuous:</strong> 24/7 operation, no weather dependency</li><li><strong>Decentralized:</strong> Can be installed at the point of need</li><li><strong>Scalable:</strong> Modular design from few MW to 100+ MW</li><li><strong>Small Footprint:</strong> ~300 m² per MW</li><li><strong>Competitive:</strong> Projected ~€25/MWh</li></ul><h2>System Components</h2><p>KPP systems consist of carefully engineered components that work together to generate clean, reliable power efficiently:</p><ul><li><strong>Kinetic Module:</strong> The core unit that converts kinetic energy into electricity</li><li><strong>Control System:</strong> Advanced electronics for monitoring and optimizing performance</li><li><strong>Power Electronics:</strong> Inverters and converters to deliver grid-ready power</li></ul>',
  'KPP Technology - Revolutionary Fuel-Free Power Generation',
  'Discover the revolutionary Kinetic Power Plant (KPP) technology - fuel-free, emissions-free power generation that works 24/7. Learn how KPP provides continuous clean energy anywhere.',
  'KPP technology, kinetic power plant, fuel-free energy, emissions-free power, 24/7 renewable energy, continuous power generation, clean energy technology',
  'KPP Technology - Revolutionary Fuel-Free Power Generation',
  'Discover the revolutionary Kinetic Power Plant (KPP) technology - fuel-free, emissions-free power generation that works 24/7. Learn how KPP provides continuous clean energy anywhere.',
  '',
  'KPP Technology - Revolutionary Fuel-Free Power Generation',
  'Discover the revolutionary Kinetic Power Plant (KPP) technology - fuel-free, emissions-free power generation that works 24/7. Learn how KPP provides continuous clean energy anywhere.',
  '',
  'published',
  '2025-07-27 20:27:52.945',
  '2025-07-27 20:27:52.945',
  'system',
  'system-user'
),
(
  'contact-page',
  'Contact',
  'contact',
  '<h1>Contact Deep Engineering</h1><p>Get in touch with our team to learn more about KPP technology and explore partnership opportunities.</p><h2>Our Offices</h2><h3>Erbil Office</h3><p>Roya Tower A 1-14<br>Erbil, Iraq 44001</p><h3>Basra Office</h3><p>Basra Branch<br>Basra, Iraq</p><h2>Get in Touch</h2><p>Ready to explore how KPP technology can transform your energy needs? Contact our team to discuss your requirements and learn more about our innovative solutions.</p><p>Whether you''re interested in project development, technology licensing, or partnership opportunities, we''re here to help you achieve your energy goals.</p>',
  'Contact Deep Engineering - Get in Touch',
  'Contact Deep Engineering to learn more about KPP technology and explore partnership opportunities. Offices in Erbil and Basra.',
  'contact Deep Engineering, KPP technology, renewable energy Iraq, partnership opportunities',
  'Contact Deep Engineering - Get in Touch',
  'Contact Deep Engineering to learn more about KPP technology and explore partnership opportunities. Offices in Erbil and Basra.',
  '',
  'Contact Deep Engineering - Get in Touch',
  'Contact Deep Engineering to learn more about KPP technology and explore partnership opportunities. Offices in Erbil and Basra.',
  '',
  'published',
  '2025-07-27 20:27:52.945',
  '2025-07-27 20:27:52.945',
  'system',
  'system-user'
),
(
  'projects-page',
  'Projects',
  'projects',
  '<h1>Our Projects</h1><p>Discover our current and planned KPP projects across Iraq, delivering clean, reliable energy to communities and industries.</p><h2>Current Projects</h2><h3>Samawah 90 MW KPP Project</h3><p>Our flagship project in Samawah represents a major milestone in Iraq''s renewable energy development. This 90 MW installation will provide clean, continuous power to the region.</p><h3>Kurdistan Region 300 MW Development</h3><p>We''re developing a 300 MW KPP installation in the Kurdistan Region, demonstrating the scalability and versatility of our technology.</p><h2>Project Benefits</h2><ul><li><strong>Clean Energy:</strong> Zero emissions, supporting Iraq''s environmental goals</li><li><strong>Reliable Power:</strong> 24/7 operation, reducing energy insecurity</li><li><strong>Economic Development:</strong> Creating jobs and supporting local communities</li><li><strong>Energy Independence:</strong> Reducing reliance on imported fuel</li></ul>',
  'Deep Engineering Projects - KPP Installations in Iraq',
  'Explore our current and planned KPP projects across Iraq. From Samawah to Kurdistan Region, we''re delivering clean, reliable energy solutions.',
  'KPP projects Iraq, Samawah project, Kurdistan energy, renewable energy projects, clean power Iraq',
  'Deep Engineering Projects - KPP Installations in Iraq',
  'Explore our current and planned KPP projects across Iraq. From Samawah to Kurdistan Region, we''re delivering clean, reliable energy solutions.',
  '',
  'Deep Engineering Projects - KPP Installations in Iraq',
  'Explore our current and planned KPP projects across Iraq. From Samawah to Kurdistan Region, we''re delivering clean, reliable energy solutions.',
  '',
  'published',
  '2025-07-27 20:27:52.945',
  '2025-07-27 20:27:52.945',
  'system',
  'system-user'
); 