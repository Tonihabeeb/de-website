#!/usr/bin/env node

/**
 * Super Admin Flow Simulation Script
 * Simulates a full super admin flow: login, admin actions, logout
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_BASE = 'http://localhost:4000/api';

async function main() {
  try {
    console.log('--- Super Admin Flow Simulation ---');

    // 1. Register super admin (if not exists)
    let res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Super Admin',
        email: 'superadmin@example.com',
        password: 'supersecret',
        role: 'superadmin',
      }),
    });
    if (res.status !== 201 && res.status !== 409) {
      throw new Error(`Super admin registration failed: ${res.status}`);
    }
    console.log('Super admin registered or already exists.');

    // 2. Login as super admin
    res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'superadmin@example.com',
        password: 'supersecret',
      }),
    });
    if (!res.ok) throw new Error(`Super admin login failed: ${res.status}`);
    const { token } = await res.json();
    if (!token) throw new Error('No token returned on login');
    console.log('Super admin logged in.');

    // 3. Access admin-only endpoint: list users
    res = await fetch(`${API_BASE}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`List users failed: ${res.status}`);
    const users = await res.json();
    console.log(`Fetched ${Array.isArray(users) ? users.length : Object.keys(users).length} users.`);

    // 4. Create a new user
    res = await fetch(`${API_BASE}/admin/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'testpass',
        role: 'user',
      }),
    });
    if (res.status !== 201 && res.status !== 409) {
      throw new Error(`Create user failed: ${res.status}`);
    }
    console.log('Test user created or already exists.');

    // 5. Change user role
    res = await fetch(`${API_BASE}/admin/users/role`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: 'testuser@example.com',
        role: 'editor',
      }),
    });
    if (!res.ok) throw new Error(`Change user role failed: ${res.status}`);
    console.log('Test user role changed to editor.');

    // 6. Access admin dashboard endpoint (example: projects)
    res = await fetch(`${API_BASE}/admin/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`Access admin projects failed: ${res.status}`);
    const projects = await res.json();
    console.log(`Fetched ${Array.isArray(projects) ? projects.length : Object.keys(projects).length} projects.`);

    // 6. Modify a page (update title of first page)
    res = await fetch(`${API_BASE}/admin/pages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`List pages failed: ${res.status}`);
    const pages = await res.json();
    const firstPage = Array.isArray(pages) ? pages[0] : null;
    if (!firstPage || !firstPage._id) throw new Error('No pages found to modify');
    res = await fetch(`${API_BASE}/admin/pages/${firstPage._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: 'Updated Title by Super Admin' }),
    });
    if (!res.ok) throw new Error(`Modify page failed: ${res.status}`);
    console.log(`Page ${firstPage._id} title updated.`);

    // 7. Upload a media file (simulate with a small text file)
    const FormData = (await import('form-data')).default;
    const form = new FormData();
    form.append('file', Buffer.from('Hello, world!'), {
      filename: 'test-upload.txt',
      contentType: 'text/plain',
    });
    res = await fetch(`${API_BASE}/admin/media/upload`, {
      method: 'POST',
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${token}`,
      },
      body: form,
    });
    if (!res.ok) throw new Error(`Media upload failed: ${res.status}`);
    const uploadResult = await res.json();
    console.log('Media file uploaded:', uploadResult);

    // 8. Logout (not always needed for JWT, but for completeness)
    // (Assume logout is client-side: just discard token)
    console.log('Super admin flow completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Super admin flow failed:', err.message);
    process.exit(1);
  }
}

main(); 