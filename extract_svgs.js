const fs = require('fs');
const code = fs.readFileSync('public/realtora-real-estate/public/index.html', 'utf8');

const start = code.indexOf('Who Are We?');
const section = code.substring(start, start + 4000);

const matches = section.match(/<use href="#(.*?)"/g);
console.log('Matches:', matches);

if (matches) {
    matches.forEach(m => {
        const id = m.replace('<use href="#', '').replace('"', '');
        const svgStart = code.indexOf('id="' + id + '"');
        if (svgStart !== -1) {
            let svgEnd = code.indexOf('</svg>', svgStart);
            let rawSvg = code.substring(code.lastIndexOf('<svg', svgStart), svgEnd + 6);
            console.log('---');
            console.log(rawSvg);
        }
    });
}
