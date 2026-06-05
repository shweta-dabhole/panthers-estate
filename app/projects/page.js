"use client";

import React, { useEffect, useRef } from 'react';
import MenuOverlay from '../../components/MenuOverlay';
import { htmlContent } from './htmlContent';

export default function ProjectsPage() {
  const containerRef = useRef(null);
  useEffect(() => {
    // Set required Webflow data attributes on documentElement so scripts attach properly
    document.documentElement.setAttribute('data-wf-domain', 'www.mersi-architecture.com');
    document.documentElement.setAttribute('data-wf-page', '69689842a40a17ac45e54188');
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
        await loadScript("/mersi-scraped-site/cdn.prod.website-files.com/69689842a40a17ac45e5418a/js/webflow.a0aa6ca1.1176730d49a681da.js");
        await loadScript("/mersi-scraped-site/mersi.netlify.app/main.js", "module");
        
        console.log("All Webflow scripts loaded successfully!");
        
        // Re-initialize Webflow
        if (window.Webflow) {
          window.Webflow.destroy();
          window.Webflow.ready();
          window.Webflow.require('ix2').init();
        }
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
        new Promise(resolve => setTimeout(resolve, 1500)) // Fallback timeout to prevent hanging
      ]);
    };

    // Initialize scripts immediately so GSAP scroll triggers attach without delay
    initScripts();

    // After images load, force a resize to fix masonry layout and refresh ScrollTrigger
    imagesLoaded().then(() => {
      window.dispatchEvent(new Event('resize'));
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
    });

    // Also periodically refresh for the first 2 seconds just in case
    const interval = setInterval(() => {
      window.dispatchEvent(new Event('resize'));
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    }, 400);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="webflow-wrapper">
      <link href="https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/css/mersiv2.webflow.shared.48daa5886.min.css" rel="stylesheet" type="text/css" />
      <style dangerouslySetInnerHTML={{__html: `
        html, body { height: auto; }
        .ms-fake, .ms-real, svg[viewBox="0 0 550 237"], .logo-nav, .logo-landing-big, .nav-r, .nav-link { display: none !important; }
        .container-loader.loader { display: none !important; }
        [line], [reveal-letter], [reveal-op] { opacity: 1 !important; transform: none !important; }
      `}} />
      <MenuOverlay containerRef={containerRef} isBlackText={true} />
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}