const fs = require('fs');
let code = fs.readFileSync('app/page.js', 'utf8');

const regex = /<img ref={img(\d)Ref}[^>]+borderRadius:\s*'16px'[^>]+>/g;
code = code.replace(regex, (match) => {
    return match.replace("borderRadius: '16px'", "borderRadius: '24px'");
});

fs.writeFileSync('app/page.js', code, 'utf8');
console.log("Successfully increased border radius for Discover Spaces images to 24px.");
