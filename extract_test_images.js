const fs = require('fs');
const code = fs.readFileSync('public/realtora-real-estate/public/index.html', 'utf8');

const emilyIdx = code.indexOf('Emily John');
const henryIdx = code.indexOf('Henry Caldwell');

const extractImages = (start) => {
  const section = code.substring(Math.max(0, start - 2000), start + 4000);
  const images = section.match(/<img[^>]+src="images\/[^"]+"/g);
  if (images) {
      return images.map(img => img.match(/src="(.*?)"/)[1]).filter(i => !i.includes('svg'));
  }
  return [];
};

console.log("Emily Images:", extractImages(emilyIdx));
console.log("Henry Images:", extractImages(henryIdx));
