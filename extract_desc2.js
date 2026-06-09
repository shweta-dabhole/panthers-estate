const fs = require('fs');
const code = fs.readFileSync('public/realtora-real-estate/public/index.html', 'utf8');
const start = code.indexOf('id="features"');
const sect = code.substring(start, start + 20000);

const m1 = sect.indexOf('Lifestyle-Centric Living');
const m2 = sect.indexOf('Prime &amp; Promising Locations');
const m3 = sect.indexOf('Smart, Sustainable Features');
const m4 = sect.indexOf('End-to-End Support');

console.log(sect.substring(m1, m1 + 200));
console.log(sect.substring(m2, m2 + 200));
console.log(sect.substring(m3, m3 + 200));
console.log(sect.substring(m4, m4 + 200));
