const fs = require('fs');

let code = fs.readFileSync('app/page.js', 'utf8');

// Fix Emily's property image
code = code.replace(
  '"/realtora-real-estate/public/images/Y7Io1rEQTpr82XSw3hvUWDoM.webp"',
  '"/realtora-real-estate/public/images/CR9WCJs8QkwyR05G5BzUHipBX8.webp"'
);

// Fix the slider math
const oldSlideTo = `  const slideTo = (index) => {
    setCurrentIndex(index);
    gsap.to(imageSliderRef.current, {
      xPercent: -100 * index,
      duration: 0.6,
      ease: "power2.inOut"
    });
  };`;

const newSlideTo = `  const slideTo = (index) => {
    setCurrentIndex(index);
    gsap.to(imageSliderRef.current, {
      xPercent: -(100 / testimonials.length) * index,
      duration: 0.6,
      ease: "power2.inOut"
    });
  };`;

code = code.replace(oldSlideTo, newSlideTo);

fs.writeFileSync('app/page.js', code, 'utf8');
console.log("Successfully fixed slider logic and Emily's image.");
