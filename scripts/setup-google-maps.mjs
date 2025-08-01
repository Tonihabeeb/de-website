#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🗺️  Setting up Google Maps API key...\n');

// Check if .env.local exists and has the API key
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  console.log('📄 Current .env.local content:');
  console.log(envContent);
  
  if (envContent.includes('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=')) {
    const apiKey = envContent.match(/NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=(.+)/)?.[1];
    if (apiKey && apiKey !== 'your-google-maps-api-key-here') {
      console.log('✅ Google Maps API key found and configured');
      console.log('🔑 API key:', apiKey.substring(0, 10) + '...');
    } else {
      console.log('❌ Google Maps API key not properly configured');
    }
  } else {
    console.log('❌ NEXT_PUBLIC_GOOGLE_MAPS_API_KEY not found in .env.local');
  }
} else {
  console.log('❌ .env.local file not found');
}

console.log('\n📋 To fix the Google Maps error:');
console.log('1. Go to https://console.cloud.google.com/');
console.log('2. Create a new project or select existing one');
console.log('3. Enable the "Maps JavaScript API"');
console.log('4. Create credentials (API key)');
console.log('5. Replace "your-google-maps-api-key-here" in .env.local with your actual API key');
console.log('6. Restart the development server: npm run dev');
console.log('\n💡 The Google Maps component is used on the Contact page to show office locations.'); 