const fs = require('fs');
const html = fs.readFileSync('public/realtora website scrap/realtora_framer/about-us.html', 'utf-8');

// A very naive regex to extract h1, h2, h3, p texts
const headings = html.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/g);
const paragraphs = html.match(/<p[^>]*>(.*?)<\/p>/g);
const images = html.match(/<img[^>]*src="([^"]+)"[^>]*>/g);

console.log("=== HEADINGS ===");
if (headings) headings.forEach(h => console.log(h.replace(/<[^>]+>/g, '').trim()));

console.log("\n=== PARAGRAPHS ===");
if (paragraphs) {
    // only show first 10
    paragraphs.slice(0, 10).forEach(p => console.log(p.replace(/<[^>]+>/g, '').trim()));
}

console.log("\n=== IMAGES ===");
if (images) {
    images.forEach(img => {
        const match = img.match(/src="([^"]+)"/);
        if (match) console.log(match[1]);
    });
}
