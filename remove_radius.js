const fs = require('fs');
let code = fs.readFileSync('app/page.js', 'utf8');

const targetStr = `        {/* Center Reveal Image */}
        <div 
          ref={centerImgWrapperRef} 
          className="absolute z-20 flex items-end justify-start overflow-hidden shadow-2xl" 
          style={{ width: '0px', height: '0px', borderRadius: '50%' }}`;

const replacementStr = `        {/* Center Reveal Image */}
        <div 
          ref={centerImgWrapperRef} 
          className="absolute z-20 flex items-end justify-start overflow-hidden shadow-2xl" 
          style={{ width: '0px', height: '0px', borderRadius: '0px' }}`;

if (code.includes(targetStr)) {
    code = code.replace(targetStr, replacementStr);
    fs.writeFileSync('app/page.js', code, 'utf8');
    console.log("Successfully removed border radius from center reveal image");
} else {
    // try regex
    const regex = /borderRadius:\s*'50%'/g;
    if (regex.test(code)) {
        // Wait, there might be multiple borderRadius: '50%'.
        // Only replace the one in centerImgWrapperRef
        console.log("Using manual replace...");
    } else {
        console.log("Could not find borderRadius: 50%");
    }
}
