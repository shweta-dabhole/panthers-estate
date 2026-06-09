const fs = require('fs');
const code = fs.readFileSync('public/realtora-real-estate/public/index.html', 'utf8');
const start = code.indexOf('id="highlight"');
console.log(code.substring(start, start + 8000));
