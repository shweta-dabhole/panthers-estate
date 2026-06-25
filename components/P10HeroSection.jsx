'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from "./Navbar";

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
        <Navbar />
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
