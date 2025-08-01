#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Patterns to replace
const replacements = [
  // Replace bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-xl hover:scale-105 hover:from-primary-dark hover:to-primary hover:text-white with bg-primary text-white
  { from: /bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-xl hover:scale-105 hover:from-primary-dark hover:to-primary hover:text-white/g, to: 'bg-primary text-white' },
  // Replace bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-xl hover:scale-105 hover:from-primary-dark hover:to-primary hover:text-white with bg-primary text-white  
  { from: /bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-xl hover:scale-105 hover:from-primary-dark hover:to-primary hover:text-white/g, to: 'bg-primary text-white' },
  // Replace bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-xl hover:scale-105 hover:from-primary-dark hover:to-primary hover:text-white with bg-primary text-white
  { from: /bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-xl hover:scale-105 hover:from-primary-dark hover:to-primary hover:text-white/g, to: 'bg-primary text-white' },
  // Replace bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-xl hover:scale-105 hover:from-primary-dark hover:to-primary hover:text-white with bg-primary text-white
  { from: /bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-xl hover:scale-105 hover:from-primary-dark hover:to-primary hover:text-white/g, to: 'bg-primary text-white' },
  // Replace bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-xl hover:scale-105 hover:from-primary-dark hover:to-primary hover:text-white with bg-primary text-white
  { from: /bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-xl hover:scale-105 hover:from-primary-dark hover:to-primary hover:text-white/g, to: 'bg-primary text-white' },
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
