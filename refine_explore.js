const fs = require('fs');

const code = fs.readFileSync('app/page.js', 'utf8');

// 1. Fix the padding-top of the Explore Properties section
let newCode = code.replace(
  /paddingBottom: '100px', paddingTop: '100px'/g,
  "paddingBottom: '100px', paddingTop: '40px'"
);

// 2. Fix the PropertyCard specs colors
const oldSpecsCode = `<div className="flex items-center text-[#666]" style={{ fontSize: '14px', gap: '8px' }}>
          <span>{property.beds}</span>
          <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#aaa' }}></span>
          <span>{property.baths}</span>
          <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#aaa' }}></span>
          <span>{property.sqft}</span>
        </div>`;

const newSpecsCode = `<div className="flex items-center" style={{ fontSize: '15px', gap: '8px' }}>
          <div className="flex gap-1 items-center">
            <span style={{ color: '#757575' }}>{property.beds.split(' ')[0]}</span>
            <span style={{ color: '#4d4d4d' }}>{property.beds.split(' ')[1]}</span>
          </div>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#d1d1d1' }}></span>
          <div className="flex gap-1 items-center">
            <span style={{ color: '#757575' }}>{property.baths.split(' ')[0]}</span>
            <span style={{ color: '#4d4d4d' }}>{property.baths.split(' ')[1]}</span>
          </div>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#d1d1d1' }}></span>
          <div className="flex gap-1 items-center">
            <span style={{ color: '#757575' }}>{property.sqft.split(' ')[0]}</span>
            <span style={{ color: '#4d4d4d' }}>{property.sqft.split(' ')[1]}</span>
          </div>
        </div>`;

newCode = newCode.replace(oldSpecsCode, newSpecsCode);

fs.writeFileSync('app/page.js', newCode, 'utf8');
console.log('Successfully refined spacing and colors.');
