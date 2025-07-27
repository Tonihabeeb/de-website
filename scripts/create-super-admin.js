const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, '..', 'database', 'cms.db');

// Create database instance
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

async function createSuperAdmin() {
  try {
    console.log('🔧 Checking existing users...');
    
    // Check existing users
    const existingUsers = db.prepare('SELECT id, name, email, role FROM users').all();
    
    if (existingUsers.length > 0) {
      console.log('📋 Existing users in database:');
      existingUsers.forEach(user => {
        console.log(`  - ${user.name} (${user.email}) - Role: ${user.role}`);
      });
      console.log('');
    }

    // Check if our target super admin already exists
    const existingSuperAdmin = db.prepare('SELECT * FROM users WHERE email = ?').get('admin@deepengineering.co');
    
    if (existingSuperAdmin) {
      console.log('⚠️  Super Admin with email admin@deepengineering.co already exists.');
      console.log('📧 You can use the existing credentials or create a new admin user from the UI.');
      return;
    }

    console.log('🔧 Creating new Super Admin user...');

    // Create super admin user
    const id = uuidv4();
    const name = 'System Administrator';
    const email = 'admin@deepengineering.co';
    const password = 'admin123!';
    const role = 'superadmin';
    const isActive = 1;
    const now = new Date().toISOString();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert super admin
    const stmt = db.prepare(`
      INSERT INTO users (
        id, name, email, password_hash, role, is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      name,
      email,
      hashedPassword,
      role,
      isActive,
      now,
      now
    );

    console.log('✅ Super Admin created successfully!');
    console.log('\n📋 Super Admin Credentials:');
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log('\n🔗 You can now login at: http://localhost:3000/login');
    console.log('🎯 Use these credentials to access the admin panel and create other users.');

  } catch (error) {
    console.error('❌ Error creating Super Admin:', error);
    process.exit(1);
  } finally {
    db.close();
  }
}

// Run the function
createSuperAdmin(); 