const fs = require('fs');

const code = fs.readFileSync('app/page.js', 'utf8');

let newCode = code;

// 1. Remove the marginBottom from the left text block to make them perfectly flush at the bottom.
newCode = newCode.replace(
  `<div className="flex flex-col items-start featured-header" style={{ maxWidth: '600px', marginBottom: '20px' }}>`,
  `<div className="flex flex-col items-start featured-header" style={{ maxWidth: '600px' }}>`
);

// If it somehow had 24px instead of 20px
newCode = newCode.replace(
  `<div className="flex flex-col items-start featured-header" style={{ maxWidth: '600px', marginBottom: '24px' }}>`,
  `<div className="flex flex-col items-start featured-header" style={{ maxWidth: '600px' }}>`
);

// 2. Ensure paragraph wraps properly
newCode = newCode.replace(
  /<p style=\{\{ fontSize: '16px', color: '#666', lineHeight: '1.5em', margin: 0(?:, maxWidth: '[^']+')? \}\}>/g,
  `<p style={{ fontSize: '16px', color: '#666', lineHeight: '1.5em', margin: 0, maxWidth: '345px' }}>`
);

fs.writeFileSync('app/page.js', newCode, 'utf8');
console.log("Successfully aligned button perfectly flush with paragraph.");
