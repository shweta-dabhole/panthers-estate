const fs = require('fs');

const code = fs.readFileSync('app/page.js', 'utf8');

// The goal is to perfectly align the View All button with the text as shown in the image.
// In the image, the button's vertical center aligns with the last line of the paragraph.
// Since the wrapper has items-end, we can add marginBottom to the left text block to lift the text up relative to the button.

let newCode = code.replace(
  `<div className="flex flex-col items-start featured-header" style={{ maxWidth: '600px' }}>`,
  `<div className="flex flex-col items-start featured-header" style={{ maxWidth: '600px', marginBottom: '24px' }}>`
);

// We also need to fine-tune the paragraph wrapping.
// We'll set max-width to 360px (which we already did) but let's make sure it breaks exactly like the image.
newCode = newCode.replace(
  `<p style={{ fontSize: '16px', color: '#666', lineHeight: '1.5em', margin: 0, maxWidth: '380px' }}>`,
  `<p style={{ fontSize: '16px', color: '#666', lineHeight: '1.5em', margin: 0, maxWidth: '345px' }}>`
);

// If the previous replace didn't work (maybe it was 380px), just use a regex
newCode = newCode.replace(
  /<p style=\{\{ fontSize: '16px', color: '#666', lineHeight: '1.5em', margin: 0(?:, maxWidth: '[^']+')? \}\}>/g,
  `<p style={{ fontSize: '16px', color: '#666', lineHeight: '1.5em', margin: 0, maxWidth: '345px' }}>`
);

fs.writeFileSync('app/page.js', newCode, 'utf8');
console.log("Successfully adjusted button alignment gap.");
