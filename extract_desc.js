const fs = require('fs');
const code = fs.readFileSync('public/realtora-real-estate/public/index.html', 'utf8');
const start = code.indexOf('id="features"');
const sect = code.substring(start, start + 20000);
const m = sect.match(/<p[^>]*>(.*?)<\/p>/g);
if (m) {
  console.log(m.map(s => s.replace(/<[^>]+>/g, '')));
} else {
  console.log('none');
}
