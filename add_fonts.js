const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');
css = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');\n` + css;
fs.writeFileSync('app/globals.css', css, 'utf8');
console.log('Added Google Fonts');
