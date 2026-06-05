const fs = require('fs');
const content = fs.readFileSync('app/projects/htmlContent.js', 'utf8');

const items = content.match(/<img[^>]*>/gi);
if (items) {
    items.forEach(img => {
        const classMatch = img.match(/class="([^"]*)"/);
        if (classMatch) {
            console.log(classMatch[1]);
        }
    });
}
