const fs = require('fs');
const code = fs.readFileSync('public/realtora-real-estate/public/index.html', 'utf8');

// The section might not be strictly id="blog", let's search for "Your Guide to Smart Home Buying"
const start = code.indexOf('Your Guide to Smart Home Buying');
if (start > -1) {
    console.log(code.substring(Math.max(0, start - 500), start + 4000));
} else {
    console.log('not found');
}
