const fs = require('fs');
const path = require('path');

// Define the patterns to replace
const replacements = [
  // Replace list-disc with custom bullet styling
  { 
    from: /className=['"]list-disc[^'"]*['"]/g, 
    to: 'className="space-y-2"' 
  },
  // Replace list-disc list-inside with custom bullet styling
  { 
    from: /className=['"]list-disc list-inside[^'"]*['"]/g, 
    to: 'className="space-y-2"' 
  },
  // Replace list-disc pl-6 with custom bullet styling
  { 
    from: /className=['"]list-disc pl-6[^'"]*['"]/g, 
    to: 'className="space-y-2"' 
  },
  // Replace list-disc pl-6 space-y-2 with custom bullet styling
  { 
    from: /className=['"]list-disc pl-6 space-y-2[^'"]*['"]/g, 
    to: 'className="space-y-2"' 
  },
  // Replace list-disc pl-6 mb-6 text-gray-text with custom bullet styling
  { 
    from: /className=['"]list-disc pl-6 mb-6 text-gray-text[^'"]*['"]/g, 
    to: 'className="space-y-2 mb-6"' 
  },
  // Replace list-disc list-inside text-white/80 with custom bullet styling
  { 
    from: /className=['"]list-disc list-inside text-white\/80[^'"]*['"]/g, 
    to: 'className="space-y-2"' 
  },
  // Replace list-disc list-inside text-white/80 mb-2 with custom bullet styling
  { 
    from: /className=['"]list-disc list-inside text-white\/80 mb-2[^'"]*['"]/g, 
    to: 'className="space-y-2 mb-2"' 
  },
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

    // Replace <li> elements with custom bullet styling
    // Pattern: <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Some text</span>
                </li> or <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Some text</span>
                </li>
    const liPattern = /<li[^>]*>(?:•\s*)?([^<]+)<\/li>/g;
    const liMatches = content.match(liPattern);
    if (liMatches) {
      content = content.replace(liPattern, (match, text) => {
        return `<li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">${text.trim()}</span>
                </li>`;
      });
      changesMade += liMatches.length;
    }

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
      const result = processDirectory(filePath);
      totalChanges += result.changes;
      filesChanged += result.files;
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
      const changes = processFile(filePath);
      if (changes > 0) {
        filesChanged++;
        totalChanges += changes;
        console.log(`✅ Updated ${filePath} (${changes} changes)`);
      }
    }
  });

  return { changes: totalChanges, files: filesChanged };
}

// Start processing from the project root
const projectRoot = path.join(__dirname, '..');
console.log('🔧 Standardizing bullet points across the website...');
console.log('Applying dark blue circular bullets with dark grey text style');

const result = processDirectory(projectRoot);

console.log(`\n✅ Complete!`);
console.log(`📊 Total changes made: ${result.changes}`);
console.log(`📁 Files updated: ${result.files}`);
console.log(`\n🎯 Style applied:`);
console.log(`   • Dark blue circular bullets (w-2 h-2 bg-primary rounded-full)`);
console.log(`   • Dark grey text (text-gray-text)`);
console.log(`   • Consistent spacing and alignment`); 