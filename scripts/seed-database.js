const { UserModel, UserRole } = require('../backend/src/models/User');
const { ProjectModel } = require('../backend/src/models/Project');
const { PageModel } = require('../backend/src/models/Page');
const { SiteSettingModel } = require('../backend/src/models/SiteSetting');
const { NavigationMenuModel } = require('../backend/src/models/NavigationMenu');
const { initializeDatabase } = require('../backend/src/connection');

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Initialize database
    initializeDatabase();
    
    // Check if super admin already exists
    const existingUsers = await UserModel.findAll();
    if (existingUsers.length > 0) {
      console.log('⚠️  Database already has users. Skipping seeding.');
      return;
    }

    console.log('📝 Creating sample users...');
    
    // Create Super Admin
    const superAdmin = await UserModel.createSuperAdmin({
      name: 'System Administrator',
      email: 'admin@deepengineering.co',
      password: 'admin123!'
    });
    console.log(`✅ Created Super Admin: ${superAdmin.email}`);

    // Create Admin
    const admin = await UserModel.create({
      name: 'Project Manager',
      email: 'manager@deepengineering.co',
      password: 'manager123!',
      role: UserRole.ADMIN
    });
    console.log(`✅ Created Admin: ${admin.email}`);

    // Create Editor
    const editor = await UserModel.create({
      name: 'Content Editor',
      email: 'editor@deepengineering.co',
      password: 'editor123!',
      role: UserRole.EDITOR
    });
    console.log(`✅ Created Editor: ${editor.email}`);

    // Create Author
    const author = await UserModel.create({
      name: 'Technical Writer',
      email: 'writer@deepengineering.co',
      password: 'writer123!',
      role: UserRole.AUTHOR
    });
    console.log(`✅ Created Author: ${author.email}`);

    // Create regular user
    const user = await UserModel.create({
      name: 'Regular User',
      email: 'user@deepengineering.co',
      password: 'user123!',
      role: UserRole.USER
    });
    console.log(`✅ Created User: ${user.email}`);

    console.log('📝 Creating sample projects...');
    
    // Create sample projects
    const project1 = await ProjectModel.create({
      name: 'KPP Technology Development',
      description: 'Advanced kinetic power plant technology research and development for sustainable energy generation.',
      status: 'active',
      owner_id: admin.id
    });
    console.log(`✅ Created Project: ${project1.name}`);

    const project2 = await ProjectModel.create({
      name: 'Energy Efficiency Study',
      description: 'Comprehensive study on renewable energy efficiency improvements and optimization strategies.',
      status: 'completed',
      owner_id: admin.id
    });
    console.log(`✅ Created Project: ${project2.name}`);

    const project3 = await ProjectModel.create({
      name: 'Infrastructure Upgrade',
      description: 'Modernization of existing power generation infrastructure with latest technologies.',
      status: 'on_hold',
      owner_id: superAdmin.id
    });
    console.log(`✅ Created Project: ${project3.name}`);

    console.log('📝 Creating sample pages...');
    
    // Create sample pages
    const page1 = await PageModel.create({
      title: 'About Deep Engineering',
      slug: 'about',
      content: `
        <h1>About Deep Engineering</h1>
        <p>Deep Engineering is a leading technology company specializing in sustainable energy solutions and advanced engineering systems.</p>
        <p>Our mission is to develop innovative technologies that address the world's energy challenges while promoting environmental sustainability.</p>
        <h2>Our Vision</h2>
        <p>To be the global leader in sustainable energy technology, providing solutions that power the future while preserving our planet.</p>
      `,
      author_id: editor.id,
      published: true
    });
    console.log(`✅ Created Page: ${page1.title}`);

    const page2 = await PageModel.create({
      title: 'Our Technology',
      slug: 'technology',
      content: `
        <h1>Our Technology</h1>
        <p>Our cutting-edge KPP (Kinetic Power Plant) technology represents a breakthrough in sustainable energy generation.</p>
        <h2>Key Features</h2>
        <ul>
          <li>High efficiency energy conversion</li>
          <li>Minimal environmental impact</li>
          <li>Scalable design for various applications</li>
          <li>Advanced monitoring and control systems</li>
        </ul>
      `,
      author_id: author.id,
      published: true
    });
    console.log(`✅ Created Page: ${page2.title}`);

    const page3 = await PageModel.create({
      title: 'Contact Us',
      slug: 'contact',
      content: `
        <h1>Contact Us</h1>
        <p>Get in touch with our team to learn more about our technology and services.</p>
        <h2>Contact Information</h2>
        <p><strong>Email:</strong> info@deepengineering.co</p>
        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
        <p><strong>Address:</strong> 123 Innovation Drive, Tech City, TC 12345</p>
      `,
      author_id: editor.id,
      published: true
    });
    console.log(`✅ Created Page: ${page3.title}`);

    console.log('📝 Creating site settings...');
    
    // Create site settings
    const settings = [
      { key: 'site_name', value: 'Deep Engineering' },
      { key: 'site_description', value: 'Leading technology solutions for sustainable energy' },
      { key: 'contact_email', value: 'info@deepengineering.co' },
      { key: 'maintenance_mode', value: 'false' },
      { key: 'default_language', value: 'en' },
      { key: 'timezone', value: 'UTC' }
    ];

    for (const setting of settings) {
      await SiteSettingModel.create(setting);
    }
    console.log(`✅ Created ${settings.length} site settings`);

    console.log('📝 Creating navigation menu...');
    
    // Create default navigation menu
    const navigationItems = [
      { label: 'Home', url: '/', order: 1 },
      { label: 'About', url: '/about', order: 2 },
      { label: 'Technology', url: '/technology', order: 3 },
      { label: 'Projects', url: '/projects', order: 4 },
      { label: 'Contact', url: '/contact', order: 5 }
    ];

    await NavigationMenuModel.create({
      name: 'Main Navigation',
      items_json: JSON.stringify(navigationItems)
    });
    console.log('✅ Created main navigation menu');

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📋 Sample Login Credentials:');
    console.log('Super Admin: admin@deepengineering.co / admin123!');
    console.log('Admin: manager@deepengineering.co / manager123!');
    console.log('Editor: editor@deepengineering.co / editor123!');
    console.log('Author: writer@deepengineering.co / writer123!');
    console.log('User: user@deepengineering.co / user123!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase(); 