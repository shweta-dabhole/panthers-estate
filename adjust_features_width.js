const fs = require('fs');

let code = fs.readFileSync('app/page.js', 'utf8');

const oldTabsCol = `<div className="w-full md:w-[45%] flex flex-col">`;
const newTabsCol = `<div className="w-full md:w-[48%] flex flex-col">`;

const oldImgCol = `<div className="w-full md:w-[55%] flex flex-col">`;
const newImgCol = `<div className="w-full md:w-[48%] flex flex-col">`;

if (code.includes(oldTabsCol) && code.includes(oldImgCol)) {
    code = code.replace(oldTabsCol, newTabsCol);
    code = code.replace(oldImgCol, newImgCol);
    fs.writeFileSync('app/page.js', code, 'utf8');
    console.log("Successfully adjusted column widths.");
} else {
    console.log("Could not find column definitions.");
}
