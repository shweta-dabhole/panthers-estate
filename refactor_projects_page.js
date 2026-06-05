const fs = require('fs');

let content = fs.readFileSync('app/projects/page.js', 'utf8');

// 1. Import MenuOverlay and useRef
content = content.replace(
  "import React, { useEffect } from 'react';",
  "import React, { useEffect, useRef } from 'react';\nimport MenuOverlay from '../../components/MenuOverlay';"
);

// 2. Add containerRef
content = content.replace(
  "export default function ProjectsPage() {",
  "export default function ProjectsPage() {\n  const containerRef = useRef(null);"
);

// 3. Replace the custom nav with MenuOverlay and wrap in containerRef
const navRegex = /      <nav className="fixed[\s\S]*?<\/nav>/;
content = content.replace(navRegex, '      <MenuOverlay containerRef={containerRef} isBlackText={true} />');

content = content.replace(
  '<div dangerouslySetInnerHTML={{ __html: htmlContent }} />',
  '<div ref={containerRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />'
);

fs.writeFileSync('app/projects/page.js', content, 'utf8');
console.log('Refactored app/projects/page.js');
