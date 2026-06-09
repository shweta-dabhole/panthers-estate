const fs = require('fs');
const code = fs.readFileSync('app/page.js', 'utf8');
const start = code.indexOf('id="features"');
console.log(code.substring(start + 800, start + 2500));
