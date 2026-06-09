const fs = require('fs');
let code = fs.readFileSync('app/page.js', 'utf8');

const target = `<h3 style={{ fontSize: '32px', fontWeight: 600, color: '#ffffff', fontFamily: '"Outfit", sans-serif', marginBottom: '16px' }}>
            Realtora
          </h3>`;

const replacement = `<h3 style={{ fontSize: '32px', fontWeight: 600, color: '#ffffff', fontFamily: '"Outfit", sans-serif', marginBottom: '16px' }}>
            Panthers
          </h3>`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('app/page.js', code, 'utf8');
    console.log("Successfully replaced Realtora with Panthers in FooterSection");
} else {
    console.log("Could not find exact target string. Will try replacing by regex.");
    // fallback just in case
    const regex = /(<h3[^>]+>)\s*Realtora\s*(<\/h3>)/;
    if (regex.test(code)) {
        code = code.replace(regex, "$1\n            Panthers\n          $2");
        fs.writeFileSync('app/page.js', code, 'utf8');
        console.log("Successfully replaced via regex");
    } else {
        console.log("Failed to find Realtora inside h3");
    }
}
