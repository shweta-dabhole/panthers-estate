'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function P10HeroSection() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 900;
      const tl = gsap.timeline();
      
      // Initialize states - no opacity 0 for letters so they show instantly
      gsap.set(".t27-copy", { opacity: 0 });

      tl.to(".t27-letter", {
        y: "-100vh",
        duration: 2,
        ease: "power3.inOut",
      }, "+=1.5") // Wait 1.5s then slide text up
      .to(".t27-block-left", {
        left: "-50%",
        duration: 2,
        ease: "power3.inOut",
        onStart: () => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
          }
        }
      }, "-=0.5") // Start opening the blocks slightly before the text finishes sliding up
      .to(".t27-block-right", {
        right: "-50%",
        duration: 2,
        ease: "power3.inOut",
      }, "<")
      .to(".t27-copy", {
        opacity: 1,
        duration: 1.2,
        ease: "power2.inOut"
      }, "-=0.8");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[100svh] overflow-hidden bg-[#0a0a0a]">
      <div className="p10-container" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
        <nav className="absolute top-0 w-full flex justify-between items-center z-50" style={{ padding: '2rem 4rem' }}>
          <div style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', color: '#fff', letterSpacing: '1px' }}>
            PANTHERS
          </div>
          <div 
            onClick={() => {
              const menuToggle = document.getElementById('menu-open')?.parentElement;
              if (menuToggle) menuToggle.click();
            }}
            style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', color: '#fff', letterSpacing: '1px', cursor: 'pointer' }}
          >
            MENU
          </div>
        </nav>

        <div className="p10-hero-img">
            <video ref={videoRef} playsInline muted loop style={{ width: '100vw', height: '100vh', objectFit: 'cover', position: 'fixed', top: 0, left: 0, zIndex: -2 }}>
              <source src="/assets/luxury_video.mp4" type="video/mp4" />
            </video>
        </div>

        <div className="t27-blocks">
          <div className="t27-block t27-block-left"></div>
          <div className="t27-block t27-block-right"></div>
        </div>

        <div className="t27-letters" style={{ justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
          <div className="t27-letter" style={{ position: 'relative', fontSize: '10vw', letterSpacing: '0.05em', color: '#000', opacity: 1, visibility: 'visible' }}>
            PANTHERS
          </div>
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
