const fs = require('fs');

const code = fs.readFileSync('app/page.js', 'utf8');

let newCode = code;

// 1. Revert marginBottom on featured-header
newCode = newCode.replace(
  `<div className="flex flex-col items-start featured-header" style={{ maxWidth: '600px', marginBottom: '24px' }}>`,
  `<div className="flex flex-col items-start featured-header" style={{ maxWidth: '600px' }}>`
);

// 2. Revert paragraph maxWidth
newCode = newCode.replace(
  /<p style=\{\{ fontSize: '16px', color: '#666', lineHeight: '1.5em', margin: 0, maxWidth: '345px' \}\}>/g,
  `<p style={{ fontSize: '16px', color: '#666', lineHeight: '1.5em', margin: 0, maxWidth: '380px' }}>`
);

fs.writeFileSync('app/page.js', newCode, 'utf8');
console.log("Successfully reverted button alignment and paragraph width.");
