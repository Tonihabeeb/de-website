const fs = require('fs');
const path = require('path');

// Define the patterns to replace
const replacements = [
  // Replace hover:text-gray-300 with hover:text-gray-300 for better contrast
  { from: /hover:text-gray-300/g, to: 'hover:text-gray-300' },
  // Also fix any remaining hover:text-blue patterns
  { from: /hover:text-gray-300/g, to: 'hover:text-gray-300' },
  { from: /hover:text-gray-300/g, to: 'hover:text-gray-300' },
  { from: /hover:text-gray-300/g, to: 'hover:text-gray-300' },
  { from: /hover:text-gray-300/g, to: 'hover:text-gray-300' },
  { from: /hover:text-gray-300/g, to: 'hover:text-gray-300' },
];

// Function to process a file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let changesMade = 0;

    // Apply all replacements
    replacements.forEach(({ from, to }) => {
      const matches = content.match(from);
      if (matches) {
        content = content.replace(from, to);
        changesMade += matches.length;
      }
    });

    // Only write if changes were made
    if (changesMade > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      return changesMade;
    }
    return 0;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return 0;
  }
}

// Function to recursively find and process files
function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  let totalChanges = 0;
  let filesChanged = 0;

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      totalChanges += processDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
      const changes = processFile(filePath);
      if (changes > 0) {
        filesChanged++;
        totalChanges += changes;
        console.log(`✅ Updated ${filePath} (${changes} changes)`);
      }
    }
  });

  return totalChanges;
}

// Start processing from the project root
const projectRoot = path.join(__dirname, '..');
console.log('🔧 Fixing button hover colors across the website...');
console.log('Changing hover:text-gray-300 to hover:text-gray-300 for better contrast');

const totalChanges = processDirectory(projectRoot);

console.log(`\n✅ Complete!`);
console.log(`📊 Total changes made: ${totalChanges}`);
console.log(`📁 Files updated: ${filesChanged}`);
console.log(`\n🎯 Changes applied:`);
replacements.forEach(({ from, to }) => {
  console.log(`   ${from.source} → ${to}`);
}); 