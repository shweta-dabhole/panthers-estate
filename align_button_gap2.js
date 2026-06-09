const fs = require('fs');

const code = fs.readFileSync('app/page.js', 'utf8');

let newCode = code;

// Add margin bottom to the left text block so the button sits lower, matching the image.
newCode = newCode.replace(
  `<div className="flex flex-col items-start featured-header" style={{ maxWidth: '600px' }}>`,
  `<div className="flex flex-col items-start featured-header" style={{ maxWidth: '600px', marginBottom: '20px' }}>`
);

// Fix the paragraph width so it wraps exactly like the image
newCode = newCode.replace(
  `<p style={{ fontSize: '16px', color: '#666', lineHeight: '1.5em', margin: 0, maxWidth: '380px' }}>`,
  `<p style={{ fontSize: '16px', color: '#666', lineHeight: '1.5em', margin: 0, maxWidth: '345px' }}>`
);

fs.writeFileSync('app/page.js', newCode, 'utf8');
console.log("Successfully re-applied button alignment gap.");
