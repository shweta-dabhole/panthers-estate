const fs = require('fs');
const code = fs.readFileSync('public/realtora-real-estate/public/index.html', 'utf8');
const start = code.indexOf('What our clients say');
const section = code.substring(Math.max(0, start - 1000), start + 15000);

const images = section.match(/<img[^>]+src="images\/[^"]+"/g);
if (images) {
    console.log("Images:");
    console.log([...new Set(images.map(img => img.match(/src="(.*?)"/)[1]).filter(i => !i.includes('svg')))]);
}

const pTags = section.match(/<p[^>]*>(.*?)<\/p>/g);
if (pTags) {
    console.log("Paragraphs:");
    console.log([...new Set(pTags.map(p => p.replace(/<[^>]+>/g, '')))]);
}

const names = section.match(/<h[34][^>]*>(.*?)<\/h[34]>/g);
if (names) {
    console.log("Names/Titles:");
    console.log([...new Set(names.map(p => p.replace(/<[^>]+>/g, '')))]);
}
