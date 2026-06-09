const fs = require('fs');

let code = fs.readFileSync('app/page.js', 'utf8');

// 1. Fix the subtitle text alignment and line break
const oldSubtitle = `<p style={{ fontSize: '18px', color: '#757575', fontFamily: '"Inter", sans-serif', lineHeight: 1.6 }}>
          More than listing, we deliver peace of mind, smarter decisions, and smoother experiences.
        </p>`;

const newSubtitle = `<p style={{ fontSize: '18px', color: '#757575', fontFamily: '"Inter", sans-serif', lineHeight: 1.6, textAlign: 'center' }}>
          More than listing, we deliver peace of mind,<br />smarter decisions, and smoother experiences.
        </p>`;

if (code.includes(oldSubtitle)) {
    code = code.replace(oldSubtitle, newSubtitle);
}

// 2. Fix the image container height to match the tabs
// The old container was 560px
const oldImgContainer = `className="relative w-full" style={{ height: '560px', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px' }}`;
const newImgContainer = `className="relative w-full" style={{ height: '400px', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px' }}`;

if (code.includes(oldImgContainer)) {
    code = code.replace(oldImgContainer, newImgContainer);
}

fs.writeFileSync('app/page.js', code, 'utf8');
console.log("Successfully updated subtitle alignment and image height.");
