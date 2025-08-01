#!/usr/bin/env node

console.log('🔧 Setting up TinyMCE for the page editor...\n');

console.log('📋 To fix the "read-only" TinyMCE error, you need to get a free API key:');
console.log('\n1. Go to https://www.tiny.cloud/auth/signup/');
console.log('2. Sign up for a free account');
console.log('3. Get your API key from the dashboard');
console.log('4. Add it to your .env.local file:');
console.log('\n   NEXT_PUBLIC_TINYMCE_API_KEY=your-api-key-here');
console.log('\n5. Restart your development server');

console.log('\n🎯 Benefits of having a TinyMCE API key:');
console.log('   ✅ Full rich text editing capabilities');
console.log('   ✅ Image upload and management');
console.log('   ✅ Advanced formatting options');
console.log('   ✅ Spell check and word count');
console.log('   ✅ Table creation and editing');
console.log('   ✅ Code view and HTML editing');

console.log('\n⚠️  Without an API key, TinyMCE runs in read-only mode');
console.log('   This causes the error you are seeing');

console.log('\n🚀 After adding the API key:');
console.log('   1. Create a .env.local file in your project root');
console.log('   2. Add: NEXT_PUBLIC_TINYMCE_API_KEY=your-key-here');
console.log('   3. Restart the development server');
console.log('   4. The page editor will work properly');

console.log('\n✨ The free tier includes:');
console.log('   - 100MB storage');
console.log('   - 1,000 API calls per month');
console.log('   - All core features');
console.log('   - Perfect for development and small projects'); 