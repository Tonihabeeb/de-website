#!/usr/bin/env node

async function testBackend() {
  const baseUrl = 'http://localhost:4000';
  
  console.log('🧪 Testing backend connectivity...\n');
  
  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${baseUrl}/health`);
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Health endpoint working:', healthData);
    } else {
      console.log('❌ Health endpoint failed:', healthResponse.status);
    }
  } catch (error) {
    console.log('❌ Health endpoint error:', error.message);
  }
  
  try {
    // Test pages endpoint
    console.log('\n2. Testing pages endpoint...');
    const pagesResponse = await fetch(`${baseUrl}/api/pages`);
    if (pagesResponse.ok) {
      const pagesData = await pagesResponse.json();
      console.log('✅ Pages endpoint working:', pagesData.length, 'pages found');
    } else {
      console.log('❌ Pages endpoint failed:', pagesResponse.status);
    }
  } catch (error) {
    console.log('❌ Pages endpoint error:', error.message);
  }
  
  try {
    // Test navigation endpoint
    console.log('\n3. Testing navigation endpoint...');
    const navResponse = await fetch(`${baseUrl}/api/navigation`);
    if (navResponse.ok) {
      const navData = await navResponse.json();
      console.log('✅ Navigation endpoint working:', navData.length, 'items found');
    } else {
      console.log('❌ Navigation endpoint failed:', navResponse.status);
    }
  } catch (error) {
    console.log('❌ Navigation endpoint error:', error.message);
  }
  
  console.log('\n🎯 Backend test complete!');
}

testBackend(); 