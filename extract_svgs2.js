const fs = require('fs');
const code = fs.readFileSync('public/realtora-real-estate/public/index.html', 'utf8');

const start = code.indexOf('Who Are We?');
const section = code.substring(start, start + 6000);

// Use a simple split approach instead of regex
const parts = section.split('<use href="#');
for(let i=1; i<parts.length; i++) {
    const id = parts[i].split('"')[0];
    const svgStart = code.indexOf('id="' + id + '"');
    if (svgStart !== -1) {
        let svgEnd = code.indexOf('</svg>', svgStart);
        let rawSvg = code.substring(code.lastIndexOf('<svg', svgStart), svgEnd + 6);
        console.log('ID:', id);
        console.log(rawSvg);
    }
}
