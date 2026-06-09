"use client";

import React, { useRef, useState } from 'react';
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
  const router = useRouter();

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

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (isMenuOpen && !isMenuAnimating) {
      toggleMenu();
      if (targetId && targetId !== 'external') {
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.location.href = `/#${targetId}`;
          }
        }, 800);
      }
    } else if (!isMenuOpen) {
       window.location.href = `/#${targetId}`;
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
          <div style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>
            PANTHERS
          </div>
        </div>
        <div className="menu-toggle cursor-pointer z-[110]" onClick={toggleMenu}>
          <div style={{ position: 'relative', width: '60px', height: '24px' }}>
            <p 
              id="menu-open"
              className="absolute top-0 left-0 w-full text-right font-semibold tracking-wider hover:opacity-70 transition-opacity uppercase text-sm md:text-base m-0"
              style={{ fontFamily: 'var(--font-poppins), sans-serif', opacity: isMenuOpen ? 0 : 1 }}
            >
              MENU
            </p>
            <p 
              id="menu-close"
              className="absolute top-0 left-0 w-full text-right font-semibold tracking-wider hover:opacity-70 transition-opacity uppercase text-sm md:text-base m-0"
              style={{ fontFamily: 'var(--font-poppins), sans-serif', opacity: isMenuOpen ? 1 : 0 }}
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
                  <Link data-taxi-ignore href="/#hero" onClick={(e) => handleNavClick(e, 'hero')}>Home</Link>
                </div>
                <div className="link" onMouseEnter={() => handleLinkHover('/assets/home%205.jpg')}>
                  <Link data-taxi-ignore href="/about-us" onClick={toggleMenu}>About Us</Link>
                </div>
                <div className="link" onMouseEnter={() => handleLinkHover('/assets/home%207.jpg')}>
                  <Link data-taxi-ignore href="/projects" onClick={toggleMenu}>Projects</Link>
                </div>
                <div className="link" onMouseEnter={() => handleLinkHover('/assets/menu%20img1.jpg')}>
                  <Link data-taxi-ignore href="/process" onClick={toggleMenu}>Process</Link>
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
