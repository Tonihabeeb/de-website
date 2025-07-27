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

async function cleanupUsers() {
  try {
    console.log('🧹 Cleaning up users database...');
    
    // Check existing users
    const existingUsers = db.prepare('SELECT id, name, email, role FROM users').all();
    
    if (existingUsers.length > 0) {
      console.log('📋 Current users in database:');
      existingUsers.forEach(user => {
        console.log(`  - ${user.name} (${user.email}) - Role: ${user.role}`);
      });
      console.log('');
    }

    // Remove all existing users
    console.log('🗑️  Removing all existing users...');
    const deleteResult = db.prepare('DELETE FROM users').run();
    console.log(`✅ Removed ${deleteResult.changes} users from database.`);

    console.log('🔧 Creating new Super Admin user...');

    // Create super admin user with specified credentials
    const id = uuidv4();
    const name = 'Nizar Debss';
    const email = 'nizar@deepengineering.co';
    const password = 'Nizar159?';
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

    console.log('✅ Database cleanup completed successfully!');
    console.log('\n📋 Super Admin Credentials:');
    console.log(`👤 Name: ${name}`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log('\n🔗 You can now login at: http://localhost:3000/login');
    console.log('🎯 Use these credentials to access the admin panel and create other users.');

    // Verify the user was created
    const newUser = db.prepare('SELECT id, name, email, role FROM users').get();
    console.log('\n✅ Verification - User in database:');
    console.log(`  - ${newUser.name} (${newUser.email}) - Role: ${newUser.role}`);

  } catch (error) {
    console.error('❌ Error during database cleanup:', error);
    process.exit(1);
  } finally {
    db.close();
  }
}

// Run the function
cleanupUsers(); 