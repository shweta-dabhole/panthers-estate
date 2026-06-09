const fs = require('fs');
const code = fs.readFileSync('public/realtora-real-estate/public/index.html', 'utf8');

const start = code.indexOf('Join Our News');
const section = code.substring(Math.max(0, start - 5000), start + 8000);

const images = section.match(/<img[^>]+src="images\/[^"]+"/g);
if (images) {
    const list = images.map(img => {
        const srcMatch = img.match(/src="(.*?)"/);
        return srcMatch ? srcMatch[1] : '';
    });
    console.log([...new Set(list)].join('\n'));
}
