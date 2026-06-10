const fs = require('fs');
const path = require('path');

const filePath = path.join('e:', 'My Documents Do Not Delete', 'Documents', 'GitHub', 'panthers-estate', 'app', 'page.js');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Explore Properties
content = content.replace(
  /<h2 style={{ fontSize: '56px', fontWeight: 500, color: '#191919', fontFamily: '"Outfit", sans-serif',/g,
  `<h2 style={{ fontSize: '56px', fontWeight: 500, color: '#191919', fontFamily: 'var(--font-poppins)',`
);
// This will replace FeaturedSection, BlogsSection, TestimonialsSection.

// 2. Discover Spaces That Speak to You
content = content.replace(
  /fontFamily: '"Newsreader", "Playfair Display", serif'/g,
  `fontFamily: 'var(--font-poppins)'`
);

// 3. Why Thousands Trust Us...
content = content.replace(
  /Why People Trust Us to Find the Right Home/g,
  `Why Thousands Trust Us to Find Their Next Home`
);
// And its font (already covered by #1 if it had Outfit, let me check. Yes, it had Outfit).

// 4. FaqsSection (it has 44px)
content = content.replace(
  /<h2 style={{ fontSize: '44px', fontWeight: 500, color: '#191919', fontFamily: '"Outfit", sans-serif',/g,
  `<h2 style={{ fontSize: '44px', fontWeight: 500, color: '#191919', fontFamily: 'var(--font-poppins)',`
);

fs.writeFileSync(filePath, content);
console.log('Replacements complete');
