'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function P10HeroSection() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Just play the video immediately since we removed the loading animation
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
      
      // Ensure copy text is visible
      gsap.set(".t27-copy", { opacity: 1 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[100svh] overflow-hidden bg-[#0a0a0a]">
      <div className="p10-container" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
        <nav className="absolute top-0 w-full flex justify-between items-center z-50 px-6 py-6 md:px-16 md:py-8">
          <div style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', color: '#fff', letterSpacing: '1px' }}>
            <h1 className="sr-only">Panthers Estate</h1>
            PANTHERS
          </div>
          <div 
            onClick={() => {
              // Dispatch a custom event that MenuOverlay listens for — no DOM querying needed
              window.dispatchEvent(new CustomEvent('panthers:toggleMenu'));
            }}
            className="flex items-center gap-2"
            style={{ cursor: 'pointer', color: '#fff' }}
            role="button"
            tabIndex="0"
            aria-label="Toggle Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </div>
        </nav>

        <div className="p10-hero-img">
            <video ref={videoRef} playsInline muted loop aria-hidden="true" title="Background Luxury Video" style={{ width: '100vw', height: '100vh', objectFit: 'cover', position: 'fixed', top: 0, left: 0, zIndex: -2 }}>
              <source src="/assets/luxury_video.mp4" type="video/mp4" />
            </video>
        </div>


        <div className="t27-copy">
          <p>LA 09123, <br />TYO 2398</p>
          <p>thinking about the future</p>
          <p>
            enter <br />
            terminal&reg;
          </p>
          <p></p>
        </div>

        <footer className="p10-footer">
        </footer>
      </div>
    </div>
  );
}
