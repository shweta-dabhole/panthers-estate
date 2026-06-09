const fs = require('fs');
const code = fs.readFileSync('public/realtora-real-estate/public/index.html', 'utf8');

const start = code.indexOf('Got Questions?');
const section = code.substring(Math.max(0, start - 500), start + 8000);

const pTags = section.match(/<p[^>]*>(.*?)<\/p>/g);
if (pTags) {
    console.log("Paragraphs:");
    console.log([...new Set(pTags.map(p => p.replace(/<[^>]+>/g, '')))]);
}

const hTags = section.match(/<h[234][^>]*>(.*?)<\/h[234]>/g);
if (hTags) {
    console.log("Headings:");
    console.log([...new Set(hTags.map(h => h.replace(/<[^>]+>/g, '')))]);
}
