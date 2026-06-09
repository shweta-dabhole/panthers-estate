const fs = require('fs');
let code = fs.readFileSync('app/page.js', 'utf8');

const target = `At Realtora`;
const replacement = `At Panthers`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('app/page.js', code, 'utf8');
    console.log("Successfully replaced Realtora with Panthers in AboutSection");
} else {
    console.log("Could not find 'At Realtora'.");
}
