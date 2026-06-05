const fs = require('fs');

const htmlPath = 'e:/My Documents Do Not Delete/Documents/GitHub/panthers-estate/public/panthers-real-estates/public/mersi-scraped-site/www.mersi-architecture.com/agence/index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

let bodyStartIdx = htmlContent.indexOf('<body');
let bodyContent = htmlContent.slice(bodyStartIdx);
bodyContent = bodyContent.substring(bodyContent.indexOf('>') + 1);

let scriptIdx = bodyContent.indexOf('<script');
if (scriptIdx !== -1) bodyContent = bodyContent.substring(0, scriptIdx);

// We intentionally leave the navbar and menu_w intact because main.js from Mersi depends on them and crashes if they are absent.
// Instead of removing them here, we will hide them using CSS if necessary.

bodyContent = bodyContent.replace(/\.\.\/cdn\.prod\.website-files\.com/g, 'https://cdn.prod.website-files.com');
const outputJs = 'export const htmlContent = ' + JSON.stringify(bodyContent) + ';\n';
fs.writeFileSync('e:/My Documents Do Not Delete/Documents/GitHub/panthers-estate/app/about-us/htmlContent.js', outputJs);
console.log('Fixed htmlContent.js');
