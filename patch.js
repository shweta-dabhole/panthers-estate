const fs = require('fs');
let code = fs.readFileSync('app/page.js', 'utf8');

// Inject the import at the top
code = "import P10HeroSection from '../components/P10HeroSection';\n" + code;

// Replace the JSX preloader with P10HeroSection
const preloaderStart = code.indexOf('{/* 1. Pre-loader Section (Minimalist Logo Only) */}');
const menuOverlayEnd = code.indexOf('<MenuOverlay containerRef={containerRef} navRef={navRef} />') + '<MenuOverlay containerRef={containerRef} navRef={navRef} />'.length;

if (preloaderStart !== -1 && menuOverlayEnd !== -1) {
    const toReplace = code.substring(preloaderStart, menuOverlayEnd);
    code = code.replace(toReplace, `<P10HeroSection />\n\n      {/* 2. Navigation & Full Screen Menu Overlay */}\n      <MenuOverlay containerRef={containerRef} navRef={navRef} />`);
}

// Remove the old tl.to preloader animation logic from useEffect
const tlStart = code.indexOf('// 3. Pre-loader Sequence');
const tlEnd = code.indexOf('// Set up parallax for About Section');

if (tlStart !== -1 && tlEnd !== -1) {
    const tlToReplace = code.substring(tlStart, tlEnd);
    code = code.replace(tlToReplace, '');
}

fs.writeFileSync('app/page.js', code, 'utf8');
console.log('Patched app/page.js successfully');
