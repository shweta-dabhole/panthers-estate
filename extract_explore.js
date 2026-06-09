const fs = require('fs');
const code = fs.readFileSync('public/realtora-real-estate/public/index.html', 'utf8');
const start = code.indexOf('id="properties"');
if (start !== -1) {
  console.log(code.substring(start - 100, start + 3000));
} else {
  console.log('Not found');
}
