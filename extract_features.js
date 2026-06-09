const fs = require('fs');
const code = fs.readFileSync('public/realtora-real-estate/public/index.html', 'utf8');
const start = code.indexOf('id="features"');
console.log(code.substring(Math.max(0, start - 100), start + 4000));
