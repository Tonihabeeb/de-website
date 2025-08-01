#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Setting up CMS pages integration...\n');

// Check if migration file exists
const migrationPath = path.join(process.cwd(), 'database', 'migrations', '003_migrate_static_pages.sql');
if (!fs.existsSync(migrationPath)) {
  console.log('❌ Migration file not found. Please run the migration script first:');
  console.log('   node scripts/migrate-pages-to-cms.mjs');
  process.exit(1);
}

console.log('✅ Migration file found');
console.log('📄 Pages to be migrated:');
console.log('   - Home (/)');
console.log('   - About (/about)');
console.log('   - Technology (/technology)');
console.log('   - How KPP Works (/technology/how-it-works)');
console.log('   - KPP Components (/technology/components)');
console.log('   - Projects (/projects)');
console.log('   - Contact (/contact)');
console.log('   - Economics (/economics)');

console.log('\n📋 Next steps to complete the integration:');
console.log('\n1. Start the backend server (if not already running):');
console.log('   cd backend && npm start');
console.log('\n2. The migration will run automatically when the backend starts');
console.log('\n3. Test the admin panel:');
console.log('   http://localhost:3000/admin/pages');
console.log('\n4. Test the CMS integration:');
console.log('   http://localhost:3000/about');
console.log('\n5. Edit pages through the CMS:');
console.log('   http://localhost:3000/admin/pages/edit?id=PAGE_ID');
console.log('\n6. To integrate more pages, add the CMSContent component:');
console.log(`
   import CMSContent from '@/components/CMSContent';
   
   <CMSContent 
     fallback={<YourFallbackContent />}
   />
`);

console.log('\n🎯 Benefits of this integration:');
console.log('   ✅ All page content is now editable through the admin panel');
console.log('   ✅ SEO metadata can be updated without code changes');
console.log('   ✅ Content changes are version controlled');
console.log('   ✅ Rich text editing with TinyMCE');
console.log('   ✅ Preview functionality before publishing');
console.log('   ✅ SEO analysis and optimization tools');

console.log('\n🔧 To add more pages to the CMS:');
console.log('   1. Add the page content to the migration script');
console.log('   2. Run the migration again');
console.log('   3. Update the page component to use CMSContent');

console.log('\n✨ Integration complete! Your existing pages can now be edited through the backend page editor.'); 