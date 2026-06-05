const fs = require('fs');

let content = fs.readFileSync('app/page.js', 'utf8');

const errStart = content.indexOf('  return () => {\n      tl.kill();\n      ScrollTrigger.getAll().forEach(t => t.kill());\n      lenis.destroy();\n      gsap.ticker.remove((time) => lenis.raf(time * 1000));\n    };\n  }, []);\n\n  const handleNavClick =');

const finalReturn = content.lastIndexOf('  return (\n    <div className="relative min-h-screen');

if (errStart !== -1 && finalReturn !== -1) {
  content = content.substring(0, errStart) + content.substring(finalReturn);
  fs.writeFileSync('app/page.js', content, 'utf8');
  console.log('Successfully fixed syntax error in app/page.js');
} else {
  console.log('Markers not found');
}
