const fs = require('fs');
const code = fs.readFileSync('public/realtora-real-estate/public/index.html', 'utf8');
const start = code.indexOf('What Our Clients says');
const section = code.substring(start, start + 20000);

const images = section.match(/<img[^>]+src="images\/[^"]+"/g);
if (images) {
    console.log("Images:");
    console.log(images.map(img => img.match(/src="(.*?)"/)[1]).filter(i => !i.includes('svg')));
}

const pTags = section.match(/<p[^>]*>(.*?)<\/p>/g);
if (pTags) {
    console.log("Paragraphs:");
    console.log(pTags.map(p => p.replace(/<[^>]+>/g, '')).slice(0, 10));
}

const names = section.match(/<h[34][^>]*>(.*?)<\/h[34]>/g) || section.match(/<span[^>]*font-weight:[^>]*>(.*?)<\/span>/g);
if (names) {
    console.log("Names/Titles:");
    console.log(names.map(p => p.replace(/<[^>]+>/g, '')).slice(0, 10));
}
