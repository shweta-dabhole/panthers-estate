const fs = require('fs');

let code = fs.readFileSync('app/page.js', 'utf8');

// 1. Fix Image Paths
code = code.replace(/src="images\/BM5DJRZcwLRhIfqMFOK4GeI.webp"/g, 'src="/realtora-real-estate/public/images/BM5DJRZcwLRhIfqMFOK4GeI.webp"');
code = code.replace(/src="images\/hoMkKeDJp1rMS99FfvGiuFk8Vsc.webp"/g, 'src="/realtora-real-estate/public/images/hoMkKeDJp1rMS99FfvGiuFk8Vsc.webp"');
code = code.replace(/src="images\/hhMQHZPK2Han8nGE8ZGJzzB2Mo.webp"/g, 'src="/realtora-real-estate/public/images/hhMQHZPK2Han8nGE8ZGJzzB2Mo.webp"');
code = code.replace(/src="images\/QHrU5R2YxV6j0vFGDThc7hSgGKw.webp"/g, 'src="/realtora-real-estate/public/images/QHrU5R2YxV6j0vFGDThc7hSgGKw.webp"');
code = code.replace(/src="images\/OaySddwc0ovmBM0gb4ic04QX1Ls.jpeg"/g, 'src="/realtora-real-estate/public/images/OaySddwc0ovmBM0gb4ic04QX1Ls.jpeg"');

// 2. Fix Text Animation
// Instead of splitting left and right, the text just stays in place while the center image covers it!
const oldTextAnim1 = `tl.to(title1Ref.current, { x: "-50vw", opacity: 0, duration: 1 }, 0);`;
const oldTextAnim2 = `tl.to(title2Ref.current, { x: "50vw", opacity: 0, duration: 1 }, 0);`;

code = code.replace(oldTextAnim1, `// Text stays in place and gets covered by the image, no x movement!`);
code = code.replace(oldTextAnim2, ``);

// Ensure the text has a low z-index (z-10) and the image wrapper has a higher one (z-20). That is already the case.
// Wait, the user might want the text to fade out slightly? In the video, the text remains visible on the edges! So no opacity fade.

fs.writeFileSync('app/page.js', code, 'utf8');
console.log("Successfully fixed Discover Spaces animation and image paths.");
