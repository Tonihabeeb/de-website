const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/about/learn-more/page.tsx');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Replace all checkmark styles
// From: blue background with white checkmark
// To: white background with blue checkmark
const oldPattern = /<div className='w-5 h-5 bg-primary rounded-full flex items-center justify-center mt-0\.5 flex-shrink-0'>\s*<CheckCircle2 className='w-3 h-3 text-white' \/>\s*<\/div>/g;
const newPattern = `<div className='w-5 h-5 bg-white border-2 border-primary rounded-full flex items-center justify-center mt-0.5 flex-shrink-0'>
                    <CheckCircle2 className='w-3 h-3 text-primary' />
                  </div>`;

// Count matches before replacement
const matches = content.match(oldPattern);
const matchCount = matches ? matches.length : 0;

// Perform the replacement
const updatedContent = content.replace(oldPattern, newPattern);

// Write the updated content back to the file
fs.writeFileSync(filePath, updatedContent, 'utf8');

console.log(`✅ Inverted ${matchCount} checkmark icons in learn-more page`);
console.log('Changed from: blue background + white checkmark');
console.log('Changed to: white background + blue checkmark'); 