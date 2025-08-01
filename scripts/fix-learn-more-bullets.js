const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/about/learn-more/page.tsx');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Pattern to match the complex checkmark bullet points
const checkmarkPattern = /<div className='w-5 h-5 bg-white border-2 border-primary rounded-full flex items-center justify-center mt-0\.5 flex-shrink-0'>\s*<CheckCircle2 className='w-3 h-3 text-primary' \/>\s*<\/div>/g;

// Replace with simple dark blue circular bullets
const simpleBullet = `<div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>`;

// Count matches before replacement
const matches = content.match(checkmarkPattern);
const matchCount = matches ? matches.length : 0;

// Perform the replacement
const updatedContent = content.replace(checkmarkPattern, simpleBullet);

// Write the updated content back to the file
fs.writeFileSync(filePath, updatedContent, 'utf8');

console.log(`✅ Fixed ${matchCount} bullet points in learn-more page`);
console.log('Changed from: Complex checkmark style (white background + border + checkmark icon)');
console.log('Changed to: Simple dark blue circular bullets (w-2 h-2 bg-primary rounded-full)');
console.log('Now matches the screenshot style!'); 