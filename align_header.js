const fs = require('fs');

const code = fs.readFileSync('app/page.js', 'utf8');

let newCode = code;

// 1. Listings text color. Currently it is '#191919'
newCode = newCode.replace(
  `color: '#191919', margin: 0 }}>\n                  Listings`,
  `color: '#333', margin: 0 }}>\n                  Listings`
);

// 2. Paragraph max width. 
newCode = newCode.replace(
  `<p style={{ fontSize: '16px', color: '#666', lineHeight: '1.5em', margin: 0 }}>`,
  `<p style={{ fontSize: '16px', color: '#666', lineHeight: '1.5em', margin: 0, maxWidth: '380px' }}>`
);

fs.writeFileSync('app/page.js', newCode, 'utf8');
console.log("Successfully aligned text block.");
