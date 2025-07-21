#!/usr/bin/env ts-node

import { initializeDatabase } from '../database/connection';
import { UserModel, UserRole } from '../database/models/User';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(prompt, resolve);
  });
}

async function createSuperAdmin() {
  try {
    console.log('🚀 Initializing CMS Database...');
    initializeDatabase();

    console.log('👤 Creating Super Admin User...\n');

    // Get user input
    const name = await question('Enter full name: ');
    const email = await question('Enter email address: ');
    const password = await question('Enter password (min 8 characters): ');
    const confirmPassword = await question('Confirm password: ');

    // Validate input
    if (!name.trim()) {
      throw new Error('Name is required');
    }

    if (!email.trim() || !email.includes('@')) {
      throw new Error('Valid email address is required');
    }

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Check if super admin already exists
    const existingSuperAdmin = await UserModel.findAll({
      role: UserRole.SUPER_ADMIN,
    });
    if (existingSuperAdmin.length > 0) {
      console.log('⚠️  Super admin already exists!');
      console.log('Existing super admin users:');
      existingSuperAdmin.forEach(user => {
        console.log(`  - ${user.name} (${user.email})`);
      });

      const overwrite = await question(
        '\nDo you want to create another super admin? (y/N): '
      );
      if (
        overwrite.toLowerCase() !== 'y' &&
        overwrite.toLowerCase() !== 'yes'
      ) {
        console.log('❌ Super admin creation cancelled');
        process.exit(0);
      }
    }

    // Create super admin user
    const superAdmin = await UserModel.createSuperAdmin({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password,
    });

    console.log('\n✅ Super Admin created successfully!');
    console.log('📋 User Details:');
    console.log(`  Name: ${superAdmin.name}`);
    console.log(`  Email: ${superAdmin.email}`);
    console.log(`  Role: ${superAdmin.role}`);
    console.log(`  ID: ${superAdmin.id}`);
    console.log(`  Created: ${superAdmin.created_at.toISOString()}`);

    console.log('\n🔐 Login Credentials:');
    console.log(`  Email: ${superAdmin.email}`);
    console.log(`  Password: ${'*'.repeat(password.length)}`);

    console.log('\n🚀 You can now log in to the CMS admin panel!');
    console.log('   URL: http://localhost:3000/admin');
  } catch (error) {
    console.error(
      '❌ Error creating super admin:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the script
if (require.main === module) {
  createSuperAdmin();
}

export { createSuperAdmin };
