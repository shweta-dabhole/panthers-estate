const fs = require('fs');
let code = fs.readFileSync('app/page.js', 'utf8');

// 1. Adjust badge margin bottom
const oldBadge = `<div className="flex items-center self-start" style={{ marginBottom: '24px' }}>`;
const newBadge = `<div className="flex items-center self-start" style={{ marginBottom: '16px' }}>`;

// 2. Adjust title margin bottom
const oldTitle = `<h2 style={{ fontSize: '56px', fontWeight: 500, color: '#191919', fontFamily: '"Outfit", sans-serif', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '20px' }}>`;
const newTitle = `<h2 style={{ fontSize: '56px', fontWeight: 500, color: '#191919', fontFamily: '"Outfit", sans-serif', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '16px' }}>`;

// 3. Adjust header container margin bottom to the images
const oldHeaderContainer = `<div ref={headerRef} className="w-full max-w-[1200px] flex flex-col mb-16 relative">`;
const newHeaderContainer = `<div ref={headerRef} className="w-full max-w-[1200px] flex flex-col mb-[80px] relative">`;

code = code.replace(oldBadge, newBadge);
code = code.replace(oldTitle, newTitle);
code = code.replace(oldHeaderContainer, newHeaderContainer);

fs.writeFileSync('app/page.js', code, 'utf8');
console.log("Successfully adjusted margins for Blogs section.");
