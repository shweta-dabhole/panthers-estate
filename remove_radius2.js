const fs = require('fs');
let code = fs.readFileSync('app/page.js', 'utf8');

const regex = /borderRadius:\s*'24px'/g;
if (regex.test(code)) {
    code = code.replace(regex, "borderRadius: '0px'");
    fs.writeFileSync('app/page.js', code, 'utf8');
    console.log("Successfully removed border radius (set to 0px) for the 4 floating images.");
} else {
    // maybe it is still 16px?
    const regex16 = /borderRadius:\s*'16px'/g;
    if (regex16.test(code)) {
        code = code.replace(regex16, "borderRadius: '0px'");
        fs.writeFileSync('app/page.js', code, 'utf8');
        console.log("Successfully removed border radius (from 16px to 0px).");
    } else {
        console.log("Could not find border radius to remove.");
    }
}
