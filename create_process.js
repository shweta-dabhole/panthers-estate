const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'public/panthers-real-estates/public/mersi-scraped-site/www.mersi-architecture.com/process/index.html');
const outDir = path.join(__dirname, 'public/panthers-real-estates/app/process');
const pagePath = path.join(outDir, 'page.js');

let htmlContent = fs.readFileSync(htmlPath, 'utf8');

let bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/);
let bodyContent = bodyMatch ? bodyMatch[1] : '';

// Remove script tags
bodyContent = bodyContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
// Escape backticks and standard variables
bodyContent = bodyContent.replace(/`/g, '\\`').replace(/\$/g, '\\$');

// Fix paths
bodyContent = bodyContent.replace(/\.\.\/cdn\.prod\.website-files\.com/g, '/mersi-scraped-site/cdn.prod.website-files.com');
bodyContent = bodyContent.replace(/\.\.\/d3e54v103j8qbb\.cloudfront\.net/g, '/mersi-scraped-site/d3e54v103j8qbb.cloudfront.net');
bodyContent = bodyContent.replace(/\.\.\/mersi\.netlify\.app/g, '/mersi-scraped-site/mersi.netlify.app');
bodyContent = bodyContent.replace(/href="projets/g, 'href="/mersi-scraped-site/www.mersi-architecture.com/projets');

const pageContent = `
"use client";
import React, { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    const loadScript = (src, type = 'text/javascript') => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.type = type;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const initScripts = async () => {
      try {
        await loadScript("/mersi-scraped-site/www.mersi-architecture.com/haqt6iy0yx2eNjk2ODk4NDJhNDBhMTdhYzQ1ZTU0MThh/KOb4T9Uw3E6nfGm5tJ7BcGMw3jQ");
        await loadScript("/mersi-scraped-site/d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8_site%3D69689842a40a17ac45e5418a.js");
        await loadScript("/mersi-scraped-site/cdn.prod.website-files.com/69689842a40a17ac45e5418a/js/webflow.schunk.bb13de08e76422e1.js");
        await loadScript("/mersi-scraped-site/cdn.prod.website-files.com/69689842a40a17ac45e5418a/js/webflow.a0aa6ca1.1176730d49a681da.js");
        await loadScript("/mersi-scraped-site/mersi.netlify.app/main.js", "module");
        
        console.log("All scripts loaded successfully!");
      } catch (err) {
        console.error("Error loading a script:", err);
      }
    };

    initScripts();

    return () => {
    }
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: \`${bodyContent}\` }} />
  );
}
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(pagePath, pageContent.trim());
console.log('Created process page in panthers-real-estates/app/process/page.js');
