const fs = require('fs');
const code = fs.readFileSync('public/realtora-real-estate/public/index.html', 'utf8');

const start = code.indexOf('Who Are We?');
const section = code.substring(start, start + 12000);

const parts = section.split('<use href="#');
console.log('Found pieces:', parts.length);
const ids = [];
for(let i=1; i<parts.length; i++) {
    const id = parts[i].split('"')[0];
    if (!ids.includes(id)) {
        ids.push(id);
    }
}
console.log('IDs:', ids);

ids.forEach(id => {
    const svgStart = code.indexOf('id="' + id + '"');
    if (svgStart !== -1) {
        let svgEnd = code.indexOf('</svg>', svgStart);
        let rawSvg = code.substring(code.lastIndexOf('<svg', svgStart), svgEnd + 6);
        console.log('ID:', id);
        console.log(rawSvg);
    }
});
