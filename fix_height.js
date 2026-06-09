const fs = require('fs');

let code = fs.readFileSync('app/page.js', 'utf8');

// Find the section element and remove height: "400vh"
const oldSectionTag = `<section ref={sectionRef} className="relative w-full overflow-hidden" style={{ height: "400vh", backgroundColor: "#fff" }}>`;
const newSectionTag = `<section ref={sectionRef} className="relative w-full overflow-hidden h-screen" style={{ backgroundColor: "#fff" }}>`;

if (code.includes(oldSectionTag)) {
    code = code.replace(oldSectionTag, newSectionTag);
    // Also change the inner div from 'sticky top-0' to just absolute/relative since GSAP pins the section itself
    const oldInnerDiv = `<div ref={containerRef} className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">`;
    const newInnerDiv = `<div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden">`;
    code = code.replace(oldInnerDiv, newInnerDiv);
    
    fs.writeFileSync('app/page.js', code, 'utf8');
    console.log("Successfully fixed the height issue.");
} else {
    console.log("Could not find the section tag.");
}
