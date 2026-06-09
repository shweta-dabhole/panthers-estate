const fs = require('fs');

const code = fs.readFileSync('app/page.js', 'utf8');

// The goal is to keep the button and paragraph flush (which they currently are because the left block has no extra margin-bottom)
// But we need to INCREASE the margin below the ENTIRE header (paragraph + button) so there is a larger gap before the property cards.

let newCode = code.replace(
  `<div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-16" style={{ maxWidth: '1200px' }}>`,
  `<div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end" style={{ maxWidth: '1200px', marginBottom: '80px' }}>`
);

fs.writeFileSync('app/page.js', newCode, 'utf8');
console.log("Successfully increased margin below the entire header section.");
