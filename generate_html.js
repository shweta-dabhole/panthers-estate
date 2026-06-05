const fs = require('fs');
const content = fs.readFileSync('temp_projects.txt', 'utf8');
const escapedContent = content
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\$/g, '\\$');
fs.writeFileSync('app/projects/htmlContent.js', `export const htmlContent = \`${escapedContent}\`;`);
console.log('Done');
