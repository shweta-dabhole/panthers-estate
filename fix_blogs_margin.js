const fs = require('fs');

let code = fs.readFileSync('app/page.js', 'utf8');

// 1. Fix the header container margin (Tailwind arbitrary value might be failing)
const oldHeaderContainer = `<div ref={headerRef} className="w-full max-w-[1200px] flex flex-col mb-[80px] relative">`;
const newHeaderContainer = `<div ref={headerRef} className="w-full max-w-[1200px] flex flex-col relative" style={{ marginBottom: '80px' }}>`;

if (code.includes(oldHeaderContainer)) {
    code = code.replace(oldHeaderContainer, newHeaderContainer);
}

// 2. Fix the View All button text color (it was white on transparent background!)
const oldButtonText = `<span style={{ fontSize: '16px', fontWeight: 500, fontFamily: '"Inter", sans-serif', marginRight: '12px' }}>View All</span>`;
const newButtonText = `<span style={{ fontSize: '16px', fontWeight: 500, color: '#191919', fontFamily: '"Inter", sans-serif', marginRight: '12px' }}>View All</span>`;

if (code.includes(oldButtonText)) {
    code = code.replace(oldButtonText, newButtonText);
}

fs.writeFileSync('app/page.js', code, 'utf8');
console.log("Successfully fixed margin and button text color.");
