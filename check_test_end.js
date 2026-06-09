const fs = require('fs');
const lines = fs.readFileSync('app/page.js', 'utf8').split('\n');
const startLine = lines.findIndex(l => l.includes('<div className="flex items-center" style={{ gap: \'16px\', marginTop: \'32px\' }}>'));
console.log(lines.slice(Math.max(0, startLine - 5), startLine + 30).join('\n'));
