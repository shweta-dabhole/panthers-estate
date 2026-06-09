const fs = require('fs');
const code = fs.readFileSync('public/realtora-real-estate/public/index.html', 'utf8');
const start = code.indexOf('Your Guide to Smart Home Buying');
const section = code.substring(start, start + 20000);

const images = section.match(/<img[^>]+src="images\/[^"]+"/g);
if (images) {
    console.log(images.map(img => img.match(/src="(.*?)"/)[1]));
}

const titles = section.match(/<h3[^>]*>(.*?)<\/h3>/g);
if (titles) {
    console.log(titles.map(t => t.replace(/<[^>]+>/g, '')));
}

const paragraphs = section.match(/<p[^>]*>(.*?)<\/p>/g);
if (paragraphs) {
    console.log(paragraphs.map(p => p.replace(/<[^>]+>/g, '')));
}
