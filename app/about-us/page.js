"use client";

import React, { useEffect, useRef } from 'react';
import { htmlContent } from './htmlContent';

export default function AboutUsPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Set required Webflow data attributes on documentElement so scripts attach properly
    document.documentElement.setAttribute('data-wf-domain', 'www.mersi-architecture.com');
    document.documentElement.setAttribute('data-wf-page', '697cc97b2fe152b789c72768');
    document.documentElement.setAttribute('data-wf-site', '69689842a40a17ac45e5418a');

    const loadScript = (src, type = 'text/javascript') => {
      return new Promise((resolve, reject) => {
        // Prevent duplicate loads
        if (document.querySelector(`script[src="${src}"]`)) {
          return resolve();
        }
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
        await loadScript("https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js");
        await loadScript("/mersi-scraped-site/cdn.prod.website-files.com/69689842a40a17ac45e5418a/js/webflow.schunk.bb13de08e76422e1.js");
        await loadScript("https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/js/webflow.556f1102.e5192474d0749b99.js");
        await loadScript("/mersi-scraped-site/mersi.netlify.app/main.js", "module");
        
        console.log("All Webflow scripts loaded successfully for About Us page!");
        
        // Re-initialize Webflow
        if (window.Webflow) {
          window.Webflow.destroy();
          window.Webflow.ready();
          window.Webflow.require('ix2').init();
        }
        
        // Trigger the DOMContentLoaded and load events that the GSAP script in main.js is waiting for
        window.dispatchEvent(new Event('DOMContentLoaded'));
        window.dispatchEvent(new Event('load'));
      } catch (err) {
        console.error("Error loading Webflow scripts:", err);
      }
    };

    // Wait for all images to load before initializing scripts so GSAP Flip calculates correct dimensions
    const imagesLoaded = () => {
      const images = Array.from(document.images);
      const promises = images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      });
      return Promise.race([
        Promise.all(promises),
        new Promise(resolve => setTimeout(resolve, 3000)) // 3s timeout
      ]);
    };

    imagesLoaded().then(() => {
      initScripts();
    });

    return () => {
      // Clean up script tags on unmount
      const scriptsToRemove = [
        "https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js",
        "/mersi-scraped-site/cdn.prod.website-files.com/69689842a40a17ac45e5418a/js/webflow.schunk.bb13de08e76422e1.js",
        "https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/js/webflow.556f1102.e5192474d0749b99.js",
        "/mersi-scraped-site/mersi.netlify.app/main.js"
      ];
      scriptsToRemove.forEach(src => {
        const el = document.querySelector(`script[src="${src}"]`);
        if (el) el.remove();
      });
      
      // Cleanup Webflow and GSAP if needed
      if (window.Webflow) {
        window.Webflow.destroy();
      }
      if (window.ScrollTrigger) {
          window.ScrollTrigger.getAll().forEach(t => t.kill());
      }
    };
  }, []);

  return (
    <div className="webflow-wrapper">
      <link href="https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/css/mersiv2.webflow.shared.48daa5886.min.css" rel="stylesheet" type="text/css" />
      <div 
        ref={containerRef} 
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
      />
    </div>
  );
}
