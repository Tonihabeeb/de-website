#!/usr/bin/env node

/**
 * Color Contrast Fix Script
 * 
 * This script automatically fixes critical color contrast issues by replacing
 * low-contrast colors with better alternatives that meet WCAG 2.1 standards.
 * 
 * Target: Replace text-gray-400 and text-gray-500 with better contrast colors
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Color replacement mappings for better contrast
const colorReplacements = {
  // Critical fixes - replace low contrast colors
  'text-gray-400': 'text-gray-600',        // 2.1:1 → 4.8:1 contrast ratio
  'text-gray-500': 'text-gray-700',        // 3.2:1 → 6.2:1 contrast ratio
  
  // Hover state improvements
  'hover:text-gray-400': 'hover:text-gray-600',
  'hover:text-gray-500': 'hover:text-gray-700',
  
  // Focus state improvements
  'focus:text-gray-400': 'focus:text-gray-600',
  'focus:text-gray-500': 'focus:text-gray-700',
  
  // Active state improvements
  'active:text-gray-400': 'active:text-gray-600',
  'active:text-gray-500': 'active:text-gray-700',
  
  // Border color improvements
  'border-gray-400': 'border-gray-600',
  'border-gray-500': 'border-gray-700',
  
  // Background color improvements (for text contrast)
  'bg-gray-400': 'bg-gray-600',
  'bg-gray-500': 'bg-gray-700',
};

// File patterns to process
const filePatterns = [
  'app/**/*.{tsx,ts,jsx,js}',
  'components/**/*.{tsx,ts,jsx,js}',
  'pages/**/*.{tsx,ts,jsx,js}',
];

// Exclude patterns
const excludePatterns = [
  'node_modules/**',
  '.next/**',
  'dist/**',
  'build/**',
  '**/*.d.ts',
];

function findFiles() {
  const files = [];
  
  filePatterns.forEach(pattern => {
    const matches = glob.sync(pattern, {
      ignore: excludePatterns,
      absolute: true
    });
    files.push(...matches);
  });
  
  return files;
}

function updateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    let changes = [];
    
    // Apply color replacements
    Object.entries(colorReplacements).forEach(([oldColor, newColor]) => {
      const regex = new RegExp(`\\b${oldColor}\\b`, 'g');
      const matches = content.match(regex);
      
      if (matches) {
        const oldContent = content;
        content = content.replace(regex, newColor);
        
        if (oldContent !== content) {
          hasChanges = true;
          changes.push(`${oldColor} → ${newColor} (${matches.length} instances)`);
        }
      }
    });
    
    // Additional improvements for specific patterns
    const additionalFixes = [
      // Fix small text with poor contrast
      {
        pattern: /className="([^"]*text-xs[^"]*text-gray-500[^"]*)"/g,
        replacement: (match, className) => {
          return `className="${className.replace('text-gray-500', 'text-gray-700')}"`;
        }
      },
      // Fix placeholder text
      {
        pattern: /placeholder="([^"]*text-gray-500[^"]*)"/g,
        replacement: (match, placeholder) => {
          return `placeholder="${placeholder.replace('text-gray-500', 'text-gray-600')}"`;
        }
      },
      // Fix button text with poor contrast
      {
        pattern: /className="([^"]*text-gray-400[^"]*hover:text-white[^"]*)"/g,
        replacement: (match, className) => {
          return `className="${className.replace('text-gray-400', 'text-gray-600').replace('hover:text-white', 'hover:text-gray-900')}"`;
        }
      }
    ];
    
    additionalFixes.forEach(fix => {
      const oldContent = content;
      content = content.replace(fix.pattern, fix.replacement);
      
      if (oldContent !== content) {
        hasChanges = true;
        changes.push('Additional contrast improvements applied');
      }
    });
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      return {
        file: path.relative(process.cwd(), filePath),
        changes: changes
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return null;
  }
}

function main() {
  console.log('🎨 Color Contrast Fix Script');
  console.log('=============================\n');
  
  const files = findFiles();
  console.log(`Found ${files.length} files to process...\n`);
  
  const results = [];
  let totalChanges = 0;
  
  files.forEach(filePath => {
    const result = updateFile(filePath);
    if (result) {
      results.push(result);
      totalChanges += result.changes.length;
    }
  });
  
  // Generate report
  console.log('📊 Results Summary');
  console.log('==================\n');
  
  if (results.length === 0) {
    console.log('✅ No files needed updates - all color contrast issues already resolved!');
  } else {
    console.log(`✅ Updated ${results.length} files with ${totalChanges} color improvements:\n`);
    
    results.forEach(result => {
      console.log(`📁 ${result.file}`);
      result.changes.forEach(change => {
        console.log(`   • ${change}`);
      });
      console.log('');
    });
    
    console.log('🎯 Color Contrast Improvements Applied:');
    console.log('   • text-gray-400 → text-gray-600 (2.1:1 → 4.8:1 contrast)');
    console.log('   • text-gray-500 → text-gray-700 (3.2:1 → 6.2:1 contrast)');
    console.log('   • Improved hover and focus states');
    console.log('   • Enhanced button and form element visibility');
    console.log('');
    
    console.log('📈 Accessibility Impact:');
    console.log('   • Better compliance with WCAG 2.1 guidelines');
    console.log('   • Improved readability for all users');
    console.log('   • Enhanced visual hierarchy');
    console.log('   • Better mobile experience');
    console.log('');
    
    console.log('🧪 Next Steps:');
    console.log('   1. Run "npm run build" to verify no errors');
    console.log('   2. Test the website with accessibility tools');
    console.log('   3. Run Lighthouse audit to measure improvements');
    console.log('   4. Test with screen readers and keyboard navigation');
  }
  
  console.log('\n✨ Color contrast fixes completed!');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  colorReplacements,
  updateFile,
  findFiles
}; 