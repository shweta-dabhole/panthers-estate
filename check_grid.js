const fs = require('fs');
const content = fs.readFileSync('app/projects/htmlContent.js', 'utf8');

const m = content.match(/<a[^>]*class="[^"]*grid__item[^"]*"[^>]*>/gi);
if(m) {
    console.log(m[0]);
} else {
    console.log('No grid items found');
}

const images = content.match(/<img[^>]*class="[^"]*"[^>]*>/gi);
if (images) {
    console.log(images[0]);
}
