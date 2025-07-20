console.log('🔍 Testing Pages API...\n');

async function testPagesAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/admin/pages');
    
    console.log(`Status: ${response.status}`);
    console.log(`Headers:`, Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('\n✅ API Response:');
      console.log(JSON.stringify(data, null, 2));
      
      if (data.pages && data.pages.length > 0) {
        console.log(`\n📋 Found ${data.pages.length} pages:`);
        data.pages.forEach(page => {
          console.log(`  - ${page.title} (${page.slug}) - ${page.status}`);
        });
      } else {
        console.log('\n❌ No pages found in response');
      }
    } else {
      const errorText = await response.text();
      console.log('\n❌ API Error:');
      console.log(errorText);
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

testPagesAPI(); 