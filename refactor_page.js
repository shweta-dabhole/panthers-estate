const fs = require('fs');

let content = fs.readFileSync('app/page.js', 'utf8');

// 1. Import MenuOverlay
content = content.replace(
  'import Lenis from "lenis";',
  'import Lenis from "lenis";\nimport MenuOverlay from "../components/MenuOverlay";'
);

// 2. Remove states and refs
content = content.replace(/  const \[isMenuOpen, setIsMenuOpen\] = useState\(false\);\n  const \[isMenuAnimating, setIsMenuAnimating\] = useState\(false\);\n\n/, '');
content = content.replace(/  const menuOverlayRef = useRef\(null\);\n  const menuContentRef = useRef\(null\);\n  const menuPreviewImgRef = useRef\(null\);\n\n/, '');

// 3. Remove functions: handleNavClick, toggleMenu, handleLinkHover
const handleNavClickStart = content.indexOf('  const handleNavClick =');
const returnDivStart = content.indexOf('  return (');
if (handleNavClickStart !== -1 && returnDivStart !== -1) {
  content = content.substring(0, handleNavClickStart) + content.substring(returnDivStart);
}

// 4. Replace JSX
const navStart = content.indexOf('      {/* 2. Navigation Bar (Always on top) */}');
const heroStart = content.indexOf('      {/* 3. Main Hero Website Section Wrapped in Container for Rotation */}');
if (navStart !== -1 && heroStart !== -1) {
  content = content.substring(0, navStart) +
    '      {/* 2. Navigation & Full Screen Menu Overlay */}\n' +
    '      <MenuOverlay containerRef={containerRef} navRef={navRef} />\n\n' +
    content.substring(heroStart);
}

fs.writeFileSync('app/page.js', content, 'utf8');
console.log('Refactored app/page.js');
