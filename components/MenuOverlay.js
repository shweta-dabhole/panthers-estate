"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';

export default function MenuOverlay({ containerRef, navRef, isBlackText = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  
  // Create an internal ref if one isn't provided
  const internalNavRef = useRef(null);
  const activeNavRef = navRef || internalNavRef;

  const menuOverlayRef = useRef(null);
  const menuContentRef = useRef(null);
  const menuPreviewImgRef = useRef(null);
  const toggleMenuRef = useRef(null); // Ref to avoid stale closure in event listeners
  const router = useRouter();

  // BFCache State Reset: When navigating back from a raw HTML page (like /projects),
  // the browser restores the exact memory state. We must force a reload so the video plays and menu resets.
  useEffect(() => {
    const healMenu = () => {
      setIsMenuOpen(false);
      setIsMenuAnimating(false);
      if (menuOverlayRef.current) {
        gsap.set(menuOverlayRef.current, { pointerEvents: "none", clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" });
      }
      if (menuContentRef.current) {
        gsap.set(menuContentRef.current, { rotation: -15, x: -100, y: -100, scale: 1.5, opacity: 0.25 });
      }
      const open = document.getElementById("menu-open");
      const close = document.getElementById("menu-close");
      if (open && close) {
         gsap.set(close, { opacity: 0 });
         gsap.set(open, { opacity: 1 });
      }
    };

    healMenu();
    window.addEventListener("pageshow", healMenu);

    // Listen for the custom toggle event from P10HeroSection's MENU button
    // Use ref to avoid stale closure — always calls the latest toggleMenu
    const onToggle = () => { if (toggleMenuRef.current) toggleMenuRef.current(); };
    window.addEventListener("panthers:toggleMenu", onToggle);

    return () => {
      window.removeEventListener("pageshow", healMenu);
      window.removeEventListener("panthers:toggleMenu", onToggle);
    };
  }, []);

  // Keep toggleMenuRef pointing to the latest toggleMenu after every render (avoids stale closure)
  useEffect(() => {
    toggleMenuRef.current = toggleMenu;
  });

  const toggleMenu = () => {
    if (isMenuAnimating) return;
    setIsMenuAnimating(true);

    const open = document.querySelector("p#menu-open");
    const close = document.querySelector("p#menu-close");

    if (!isMenuOpen) {
      // OPEN MENU
      if (containerRef && containerRef.current) {
        gsap.to(containerRef.current, {
          rotation: 10,
          x: 300,
          y: 450,
          scale: 1.5,
          duration: 1.25,
          ease: "power4.inOut",
        });
      }

      // Animate Toggle Text
      if (open && close) {
        gsap.to(open, { x: -5, y: -10, rotation: -5, opacity: 0, delay: 0.25, duration: 0.5, ease: "power2.out" });
        gsap.to(close, { x: 0, y: 0, rotation: 0, opacity: 1, delay: 0.5, duration: 0.5, ease: "power2.out" });
      }

      gsap.to(menuContentRef.current, {
        rotation: 0,
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1.25,
        ease: "power4.inOut",
      });

      gsap.to([".menu-links .link a", ".menu-socials .social a"], {
        y: "0%",
        delay: 0.75,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.to(menuOverlayRef.current, {
        pointerEvents: "auto",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)",
        duration: 1.25,
        ease: "power4.inOut",
        onComplete: () => {
          setIsMenuOpen(true);
          setIsMenuAnimating(false);
        },
      });
    } else {
      // CLOSE MENU
      if (containerRef && containerRef.current) {
        gsap.to(containerRef.current, {
          rotation: 0,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.25,
          ease: "power4.inOut",
          clearProps: "transform",
        });
      }

      if (open && close) {
        gsap.to(close, { x: -5, y: 10, rotation: 5, opacity: 0, delay: 0.25, duration: 0.5, ease: "power2.out" });
        gsap.to(open, { x: 0, y: 0, rotation: 0, opacity: 1, delay: 0.5, duration: 0.5, ease: "power2.out" });
      }

      gsap.to(menuContentRef.current, {
        rotation: -15,
        x: -100,
        y: -100,
        scale: 1.5,
        opacity: 0.25,
        duration: 1.25,
        ease: "power4.inOut",
      });

      gsap.to(menuOverlayRef.current, {
        pointerEvents: "none",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.25,
        ease: "power4.inOut",
        onComplete: () => {
          setIsMenuOpen(false);
          setIsMenuAnimating(false);
          gsap.set([".menu-links .link a", ".menu-socials .social a"], { y: "120%", opacity: 0.25 });
          
          if (menuPreviewImgRef.current) {
            menuPreviewImgRef.current.innerHTML = "";
            const defaultImg = document.createElement("img");
            defaultImg.src = "/assets/home%202.jpg";
            menuPreviewImgRef.current.appendChild(defaultImg);
          }
        },
      });
    }
  };

  const handleNavClick = (e, targetUrl) => {
    e.preventDefault();
    if (isMenuOpen && !isMenuAnimating) {
      toggleMenu();
      setTimeout(() => {
        // FORCE REACT STATE RESET before leaving!
        // This guarantees that if the browser restores this exact memory frame from BFCache, 
        // the menu will NOT be stuck in an "animating" or "open" state.
        setIsMenuOpen(false);
        setIsMenuAnimating(false);
        
        if (targetUrl.startsWith('/#')) {
          const targetId = targetUrl.substring(2);
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.location.href = targetUrl;
          }
        } else {
          window.location.href = targetUrl;
        }
      }, 1000); // Wait 1s for GSAP menu close animation to finish
    } else if (!isMenuOpen) {
       window.location.href = targetUrl;
    }
  };

  const handleLinkHover = (imgSrc) => {
    if (!isMenuOpen || isMenuAnimating) return;
    if (!imgSrc || !menuPreviewImgRef.current) return;

    const previewImages = menuPreviewImgRef.current.querySelectorAll("img");
    if (previewImages.length > 0 && previewImages[previewImages.length - 1].src.endsWith(imgSrc)) return;

    const newPreviewImg = document.createElement("img");
    newPreviewImg.src = imgSrc;
    newPreviewImg.style.opacity = "0";
    newPreviewImg.style.transform = "scale(1.25) rotate(10deg)";

    menuPreviewImgRef.current.appendChild(newPreviewImg);

    if (previewImages.length > 3) {
      for (let i = 0; i < previewImages.length - 3; i++) {
        menuPreviewImgRef.current.removeChild(previewImages[i]);
      }
    }

    gsap.to(newPreviewImg, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.75,
      ease: "power2.out",
    });
  };

  return (
    <>
      <nav 
        id="panthers-nav-locked"
        ref={activeNavRef} 
        className="hidden"
        style={{ display: 'none' }}
      >
        <div className="logo cursor-pointer z-[110]" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px', color: (isBlackText && !isMenuOpen) ? 'black' : 'inherit' }}>
            PANTHERS
          </div>
        </div>
        <div className="menu-toggle cursor-pointer z-[110]" onClick={toggleMenu}>
          <div style={{ position: 'relative', width: '60px', height: '24px' }}>
              <p 
                id="menu-open"
                className="absolute top-0 left-0 w-full text-right font-semibold tracking-wider hover:opacity-70 transition-opacity uppercase text-sm md:text-base m-0"
                style={{ fontFamily: 'var(--font-poppins), sans-serif', opacity: isMenuOpen ? 0 : 1, color: (isBlackText && !isMenuOpen) ? 'black' : 'inherit' }}
              >
                MENU
              </p>
              <p 
                id="menu-close"
                className="absolute top-0 left-0 w-full text-right font-semibold tracking-wider hover:opacity-70 transition-opacity uppercase text-sm md:text-base m-0"
                style={{ fontFamily: 'var(--font-poppins), sans-serif', opacity: isMenuOpen ? 1 : 0, color: isMenuOpen ? 'white' : ((isBlackText && !isMenuOpen) ? 'black' : 'inherit') }}
              >
                CLOSE
              </p>
          </div>
        </div>
      </nav>

      {/* Overlay Menu */}
      <div className="menu-overlay" ref={menuOverlayRef}>
        <div 
          onClick={toggleMenu}
          className="absolute top-8 right-8 md:top-12 md:right-12 z-[120] cursor-pointer hover:opacity-70 transition-opacity"
          style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        <div className="menu-content" ref={menuContentRef}>
          <div className="menu-items">
            <div className="col-lg">
              <div className="menu-preview-img" ref={menuPreviewImgRef}>
                <img src="/assets/home%202.jpg" alt="Preview" />
              </div>
            </div>
            <div className="col-sm">
              <div className="menu-links">
                <div className="link" onMouseEnter={() => handleLinkHover('/assets/home%202.jpg')}>
                  <a data-taxi-ignore href="/#hero" onClick={(e) => handleNavClick(e, '/#hero')}>Home</a>
                </div>
                <div className="link" onMouseEnter={() => handleLinkHover('/assets/home%205.jpg')}>
                  <a data-taxi-ignore href="/about-us" onClick={(e) => handleNavClick(e, '/about-us')}>About Us</a>
                </div>
                <div className="link" onMouseEnter={() => handleLinkHover('/assets/home%207.jpg')}>
                  <a data-taxi-ignore href="/projects" onClick={(e) => handleNavClick(e, '/projects')}>Projects</a>
                </div>
                <div className="link" onMouseEnter={() => handleLinkHover('/assets/menu%20img1.jpg')}>
                  <a data-taxi-ignore href="/process" onClick={(e) => handleNavClick(e, '/process')}>Process</a>
                </div>
                <div className="link" onMouseEnter={() => handleLinkHover('/assets/home%201.jpg')}>
                  <a href="#">Connect</a>
                </div>
              </div>
            </div>
          </div>
          <div className="menu-footer">
            <div className="col-lg">
              <div className="menu-socials">
                <div className="social"><a href="#">Behance</a></div>
                <div className="social"><a href="#">Dribbble</a></div>
                <div className="social"><a href="#">LinkedIn</a></div>
                <div className="social"><a href="#">Instagram</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
