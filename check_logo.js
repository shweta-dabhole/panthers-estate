const fs = require('fs');
const content = fs.readFileSync('public/mersi-scraped-site/www.mersi-architecture.com/projets/naya/index.html', 'utf8');

// Find elements with class containing 'logo' or 'brand'
const logoMatches = content.match(/<[^>]+class="[^"]*(logo|brand)[^"]*"[^>]*>/gi);
if (logoMatches) {
    console.log("Found logo/brand classes:", logoMatches);
} else {
    console.log("No logo/brand classes found.");
}

// Find SVGs again and their parents
const svgs = content.match(/<svg[^>]*>.*?<\/svg>/gs);
if (svgs) {
    svgs.forEach((svg, i) => {
        if (svg.includes('550 237')) {
            const idx = content.indexOf(svg);
            const parentContext = content.substring(Math.max(0, idx - 100), idx);
            console.log(`SVG ${i} Parent Context:`, parentContext);
        }
    });
}
