const fs = require('fs');

let globals = fs.readFileSync('app/globals.css', 'utf8');

// Find where my broken string started
const badIdx = globals.indexOf('\\n\\n/* P10 Hero Styles */\\n');
if (badIdx !== -1) {
    globals = globals.substring(0, badIdx);
}

// Prepare the new CSS
let p10Css = fs.readFileSync('public/Intro page-Agencies/styles.css', 'utf8');

// Remove google fonts import
p10Css = p10Css.replace(/@import.*?;/g, '');

// Rename classes to avoid conflicts
p10Css = p10Css.replace(/\.preloader/g, '.p10-preloader');
p10Css = p10Css.replace(/\.split-overlay/g, '.p10-split-overlay');
p10Css = p10Css.replace(/\.tags-overlay/g, '.p10-tags-overlay');
p10Css = p10Css.replace(/\.intro-title/g, '.p10-intro-title');
p10Css = p10Css.replace(/\.outro-title/g, '.p10-outro-title');
p10Css = p10Css.replace(/\.tag/g, '.p10-tag');
p10Css = p10Css.replace(/\.container/g, '.p10-container');
p10Css = p10Css.replace(/\.hero-img/g, '.p10-hero-img');
p10Css = p10Css.replace(/\.card/g, '.p10-card');
p10Css = p10Css.replace(/\.char/g, '.p10-char');
p10Css = p10Css.replace(/\.word/g, '.p10-word');

// We also need to prefix global element tags so they only apply within p10-hero
// body -> delete
p10Css = p10Css.replace(/body\s*{[^}]*}/g, '');
p10Css = p10Css.replace(/\*\s*{[^}]*}/g, '');

// img -> .p10-hero-img img
p10Css = p10Css.replace(/^img\s*{/gm, '.p10-hero-img img {');

// h1 -> .p10-hero h1
p10Css = p10Css.replace(/^h1\s*{/gm, '.p10-hero.h1 {');
p10Css = p10Css.replace(/@media \(max-width: 1000px\) \{\s*h1\s*{/gm, '@media (max-width: 1000px) {\n  .p10-hero.h1 {');

// p -> .p10-hero p
p10Css = p10Css.replace(/^p\s*{/gm, '.p10-hero.p {');

// append
globals = globals + '\n\n/* --- P10 Hero Styles --- */\n' + p10Css;

fs.writeFileSync('app/globals.css', globals, 'utf8');
console.log('Fixed CSS');
