const fs = require('fs');
let content = fs.readFileSync('e:/My Documents Do Not Delete/Documents/GitHub/panthers-estate/app/about-us/htmlContent.js', 'utf8');
let srcTags = content.split('src=\\"');
for(let i=1; i<Math.min(srcTags.length, 6); i++) {
  console.log(srcTags[i].split('\\"')[0]);
}
