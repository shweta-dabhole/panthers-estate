const fs = require('fs');
let content = fs.readFileSync('app/projects/htmlContent.js', 'utf8');
content = content.replace(/href="\/projets\//g, 'href="/projects/');
fs.writeFileSync('app/projects/htmlContent.js', content);
console.log('Replaced /projets/ with /projects/');
