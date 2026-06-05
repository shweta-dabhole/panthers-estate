const fs = require('fs');
const content = fs.readFileSync('public/mersi-scraped-site/www.mersi-architecture.com/projets/naya/index.html', 'utf8');
const svgs = content.match(/<svg[^>]*viewBox="0 0 550 237"[^>]*>.*?<\/svg>/gs);
if (svgs) {
    svgs.forEach((svg, i) => {
        const idx = content.indexOf(svg);
        const prefix = content.substring(Math.max(0, idx - 150), idx);
        console.log(`SVG ${i}:`, prefix);
    });
} else {
    console.log('No SVGs found');
}
