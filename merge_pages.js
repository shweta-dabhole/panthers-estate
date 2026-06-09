const fs = require('fs');

const mainPage = fs.readFileSync('app/page.js', 'utf8');
const realtoraPage = fs.readFileSync('public/realtora-real-estate/app/page.js', 'utf8');

// Extract the hero section from realtora
const realtoraHeroRegex = /(<section className="relative h-screen flex items-center justify-center overflow-hidden">[\s\S]*?<\/section>)/;
const realtoraHeroMatch = realtoraPage.match(realtoraHeroRegex);
const realtoraHero = realtoraHeroMatch ? realtoraHeroMatch[1] : '';

// Extract the parts of the main page
// We want everything from the top of the file until the start of the return statement
const returnRegex = /(return \([\s\S]*?)(<section id="hero"[\s\S]*?<\/section>)([\s\S]*)/;
const mainPageMatch = mainPage.match(returnRegex);

if (!mainPageMatch) {
  console.log("Could not parse main page");
  process.exit(1);
}

// Replace the main page hero with the realtora hero
const newReturn = mainPageMatch[1] + realtoraHero + mainPageMatch[3];
const fullNewPage = mainPage.replace(returnRegex, newReturn);

// For the GSAP animations, if they refer to hero elements, they might fail if those refs aren't attached.
// But we're attaching `heroImgsRef`, `heroTextLinesRef`? No, the realtora hero doesn't have those refs!
// So let's add the refs to the realtora hero, OR just leave them null.
// If we leave them null, the GSAP code checks if they exist before animating (e.g. `slideElements.length > 0`, `if (heroTextLinesRef.current.length > 0)`).
// So it won't crash, it just won't animate the hero section, WHICH IS FINE because the realtora hero is static!
// Wait, we need to make sure the realtora hero is inside `app-container` if `containerRef` is used.
// Yes, the replacement is exactly in the spot of `<section id="hero"...`.
// The realtora hero will just be placed there.

fs.writeFileSync('public/realtora-real-estate/app/page.js', fullNewPage, 'utf8');
console.log("Successfully created new page");
