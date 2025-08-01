#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔧 Testing TinyMCE environment variable...\n');

// Check if .env.local exists and has the API key
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  console.log('📄 .env.local content:');
  console.log(envContent);
  
  if (envContent.includes('NEXT_PUBLIC_TINYMCE_API_KEY=')) {
    const apiKey = envContent.match(/NEXT_PUBLIC_TINYMCE_API_KEY=(.+)/)?.[1];
    if (apiKey && apiKey !== 'your-tinymce-api-key-here') {
      console.log('✅ API key found and configured');
      console.log('🔑 API key:', apiKey.substring(0, 10) + '...');
    } else {
      console.log('❌ API key not properly configured');
    }
  } else {
    console.log('❌ NEXT_PUBLIC_TINYMCE_API_KEY not found in .env.local');
  }
} else {
  console.log('❌ .env.local file not found');
}

console.log('\n📋 Next steps:');
console.log('1. Make sure the API key is correct in .env.local');
console.log('2. Restart the development server: npm run dev');
console.log('3. Clear browser cache and refresh the page');
console.log('4. Check browser console for TinyMCE errors'); 