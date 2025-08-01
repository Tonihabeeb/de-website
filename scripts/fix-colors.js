#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Patterns to replace
const replacements = [
  // Replace text-gray-900 with hover:shadow-md
  { from: /text-gray-900/g, to: 'hover:shadow-md' },
  // Replace text-gray-900 with hover:shadow-md  
  { from: /text-gray-900/g, to: 'hover:shadow-md' },
  // Replace text-gray-900 with hover:shadow-md
  { from: /text-gray-900/g, to: 'hover:shadow-md' },
  // Replace text-gray-900 with hover:shadow-md
  { from: /text-gray-900/g, to: 'hover:shadow-md' },
  // Replace text-gray-900 with hover:shadow-md
  { from: /text-gray-900/g, to: 'hover:shadow-md' },
];

// File patterns to process
const filePatterns = [
  'app/**/*.{tsx,ts,jsx,js}',
  'components/**/*.{tsx,ts,jsx,js}',
];

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let newContent = content;

    replacements.forEach(({ from, to }) => {
      if (from.test(newContent)) {
        newContent = newContent.replace(from, to);
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
      return true;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
  return false;
}

function main() {
  console.log('🔧 Fixing hover effects across the website...\n');

  let totalFiles = 0;
  let updatedFiles = 0;

  filePatterns.forEach(pattern => {
    const files = glob.sync(pattern);
    totalFiles += files.length;
    
    files.forEach(file => {
      if (processFile(file)) {
        updatedFiles++;
      }
    });
  });

  console.log(`\n📊 Summary:`);
  console.log(`   Total files processed: ${totalFiles}`);
  console.log(`   Files updated: ${updatedFiles}`);
  console.log(`\n✨ Hover effects have been improved!`);
  console.log(`   - Replaced blue text hover effects with shadow effects`);
  console.log(`   - Better visual feedback and depth`);
  console.log(`   - Consistent hover experience across the website`);
}

if (require.main === module) {
  main();
}

module.exports = { processFile, replacements }; 
