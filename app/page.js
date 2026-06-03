"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const preLoaderRef = useRef(null);
  const loaderImgRef = useRef(null);
  const heroImgsRef = useRef(null);
  const navRef = useRef(null);
  const containerRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const menuContentRef = useRef(null);
  const menuPreviewImgRef = useRef(null);
  const heroTextLinesRef = useRef([]);
  const aboutSectionRef = useRef(null);
  const parallaxImagesRef = useRef([]);
  const aboutTextRefs = useRef([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);

  useEffect(() => {
    // 1. Initial State Setup
    // Position navigation slightly above and hidden initially for a smooth entrance
    gsap.set(navRef.current, { y: -50, opacity: 0 });

    // Set initial scale and rotation to images for a subtle organic entry
    const slideElements = heroImgsRef.current ? heroImgsRef.current.children : [];
    gsap.set(slideElements, { scale: 1.10 });

    // Set initial state for text lines
    gsap.set(heroTextLinesRef.current, { y: "150%", rotation: 10, transformOrigin: "left top" });

    // 2. Timeline for the entry animations
    const tl = gsap.timeline();

    // Fade in the blinking logo immediately
    tl.to(
      loaderImgRef.current,
      {
        opacity: 1.0,
        duration: 0.5,
        ease: "power2.out",
      },
      0
    );

    // Let the logo blink on screen for 1.5 seconds, then gracefully fade it out
    tl.to(
      loaderImgRef.current,
      {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "+=1.5"
    );

    // Slide up the black pre-loader screen like a curtain
    tl.to(
      preLoaderRef.current,
      {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
      },
      "-=0.2"
    );

    // Staggered clip-path swipe reveal of the images (Right to Left)
    if (slideElements.length > 0) {
      tl.to(
        slideElements,
        {
          clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
          duration: 2.2, // Increased for smoother flow
          ease: "power3.inOut", // Smoother curve
          stagger: 0.6, // More time between swipes
        },
        "-=0.8" // Start swiping as the curtain is sliding up
      );

      // Parallax scale down zoom effect as each image is revealed
      tl.to(
        slideElements,
        {
          scale: 1.0,
          duration: 2.5, // Smoother scale down
          ease: "power3.out",
          stagger: 0.6,
        },
        "-=2.2" // Sync perfectly with clipPath start
      );
    }

    // Animate navigation bar sliding down and fading into view much earlier
    tl.to(
      navRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
      },
      "-=1.8" // Adjusted overlap for new stagger timings
    );

    // Animate the text in
    if (heroTextLinesRef.current.length > 0) {
      tl.to(
        heroTextLinesRef.current,
        {
          y: "0%",
          rotation: 0,
          duration: 1.5,
          ease: "power4.out",
          stagger: 0.15,
        },
        "-=1.8" // Start during the final image swiping
      );
    }

    // Text animation is now handled completely independently above to prevent timeline clipping bugs!

    // 3. Setup ScrollTrigger for About section Parallax Images
    if (parallaxImagesRef.current.length > 0 && aboutSectionRef.current) {
      const validImgs = parallaxImagesRef.current.filter(Boolean);
      validImgs.forEach((img, index) => {
        // Tie trigger to the image itself so it animates precisely when it enters the viewport
        gsap.fromTo(
          img,
          { y: 150 },
          {
            y: -350,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5, // High smooth value for buttery scrolling
            },
          }
        );
      });
    }

    // 4. Text Reveal Scroll Animation
    if (aboutTextRefs.current.length > 0) {
      aboutTextRefs.current.forEach((textEl) => {
        gsap.fromTo(
          textEl,
          { opacity: 0.15, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: textEl,
              start: "top 85%",
              end: "top 45%",
              scrub: true,
            },
          }
        );
      });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (isMenuOpen && !isMenuAnimating) {
      toggleMenu();
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 800);
    }
  };

  const toggleMenu = () => {
    if (isMenuAnimating) return;
    setIsMenuAnimating(true);

    const open = document.querySelector("p#menu-open");
    const close = document.querySelector("p#menu-close");

    if (!isMenuOpen) {
      // OPEN MENU
      gsap.to(containerRef.current, {
        rotation: 10,
        x: 300,
        y: 450,
        scale: 1.5,
        duration: 1.25,
        ease: "power4.inOut",
      });

      // Animate Toggle Text
      gsap.to(open, { x: -5, y: -10, rotation: -5, opacity: 0, delay: 0.25, duration: 0.5, ease: "power2.out" });
      gsap.to(close, { x: 0, y: 0, rotation: 0, opacity: 1, delay: 0.5, duration: 0.5, ease: "power2.out" });

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
      gsap.to(containerRef.current, {
        rotation: 0,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.25,
        ease: "power4.inOut",
      });

      gsap.to(close, { x: -5, y: 10, rotation: 5, opacity: 0, delay: 0.25, duration: 0.5, ease: "power2.out" });
      gsap.to(open, { x: 0, y: 0, rotation: 0, opacity: 1, delay: 0.5, duration: 0.5, ease: "power2.out" });

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
          
          // Reset preview image
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
    <div className="relative min-h-screen w-full flex flex-col bg-[#0f0f0f] text-[#f2f2f2] select-none overflow-x-hidden">
      {/* 1. Pre-loader Section (Minimalist Logo Only) */}
      <div ref={preLoaderRef} className="pre-loader">
        <div 
          ref={loaderImgRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] px-4 opacity-0"
        >
          <img 
            src="/assets/panthers%20logo%20transparent.png" 
            alt="Panthers Estate Logo" 
            className="h-auto max-h-[35vh] w-full object-contain loader-logo-blink"
          />
        </div>
      </div>

      {/* 2. Navbar (Now outside hero, at the top) */}
      <nav ref={navRef}>
        <div className="logo">
          <img src="/assets/panthers%20logo%20transparent.png" alt="Panthers Estate" />
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>
          <p id="menu-open">Menu</p>
          <p id="menu-close">Close</p>
        </div>
      </nav>

      {/* Overlay Menu */}
      <div className="menu-overlay" ref={menuOverlayRef}>
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
                  <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')}>Home</a>
                </div>
                <div className="link" onMouseEnter={() => handleLinkHover('/assets/home%205.jpg')}>
                  <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About Us</a>
                </div>
                <div className="link" onMouseEnter={() => handleLinkHover('/assets/home%207.jpg')}>
                  <a href="#">Portfolio</a>
                </div>
                <div className="link" onMouseEnter={() => handleLinkHover('/assets/menu%20img1.jpg')}>
                  <a href="#">Careers</a>
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

      {/* 3. Main Hero Website Section Wrapped in Container for Rotation */}
      <div className="app-container" ref={containerRef}>
        <section id="hero" className="hero relative w-full h-screen">
          <div ref={heroImgsRef} className="hero-imgs relative w-full h-full">
            <img className="absolute inset-0 w-full h-full object-cover" src="/assets/home%202.jpg" alt="Panthers Home 2" style={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }} />
            <img className="absolute inset-0 w-full h-full object-cover" src="/assets/home%207.jpg" alt="Panthers Home 7" style={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }} />
            <img className="absolute inset-0 w-full h-full object-cover" src="/assets/home%20img.png" alt="Panthers Home Img" style={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }} />
          </div>

          {/* Text Overlay */}
          <div className="absolute bottom-8 left-4 md:bottom-16 md:left-12 z-50 pointer-events-none flex flex-col">
            <div className="overflow-hidden pb-2">
              <h1 
                ref={el => heroTextLinesRef.current[0] = el}
                className="text-white font-bold tracking-tighter drop-shadow-xl" 
                style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: 'clamp(4rem, 10vw, 9rem)', lineHeight: '1' }}
              >
                Find Your
              </h1>
            </div>
            <div className="overflow-hidden pb-2">
              <h1 
                ref={el => heroTextLinesRef.current[1] = el}
                className="text-white font-bold tracking-tighter drop-shadow-xl" 
                style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: 'clamp(4rem, 10vw, 9rem)', lineHeight: '1' }}
              >
                Dream Home
              </h1>
            </div>
          </div>
        </section>

        {/* 4. About Us Section */}
        <section 
          id="about"
          ref={aboutSectionRef}
          className="relative w-full flex flex-col justify-start items-center bg-white text-black overflow-hidden"
          style={{ paddingTop: '6rem', paddingBottom: '12rem', paddingLeft: '5%', paddingRight: '5%' }}
        >
          {/* Text Content */}
          <div className="relative z-10 w-full font-medium tracking-tight mt-8" style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: 'clamp(1.8rem, 4vw, 4rem)', lineHeight: '1.3' }}>
            <h2 ref={el => aboutTextRefs.current[0] = el} className="text-center text-[clamp(2.5rem,5vw,5rem)] tracking-[0.1em] uppercase text-[#315C8B] font-bold" style={{ fontFamily: 'var(--font-poppins), sans-serif', marginBottom: '8rem' }}>About Us</h2>
            <p ref={el => aboutTextRefs.current[1] = el} className="mb-24">This is PANTHERS ESTATE.</p>
            <p ref={el => aboutTextRefs.current[2] = el} className="mb-24">Built with vision. Designed for modern living.</p>
            <p ref={el => aboutTextRefs.current[3] = el} className="mb-24">Panthers Estate creates spaces that go beyond property — spaces shaped by quality, purpose, and timeless design. Every residence is thoughtfully planned to bring together comfort, elegance, and long-term value.</p>
            <p ref={el => aboutTextRefs.current[4] = el} className="mb-24">We believe a home is more than walls and architecture. It is where life grows, memories are built, and aspirations find their place.</p>
            <p ref={el => aboutTextRefs.current[5] = el} className="mb-24">From carefully selected locations to refined design and premium living experiences, Panthers Estate is committed to delivering homes that reflect contemporary lifestyles and lasting trust.</p>
            <p ref={el => aboutTextRefs.current[6] = el} className="mb-24">Discover spaces created for today and designed for tomorrow.</p>
          </div>

          {/* Floating Parallax Images */}
          <div className="absolute inset-0 pointer-events-none z-20">
            <img 
              ref={el => parallaxImagesRef.current[0] = el}
              src="/assets/about%201.jpg" 
              className="absolute top-[20%] right-[15%] w-[15vw] max-w-[200px] h-auto aspect-[3/4] object-cover shadow-2xl rounded-sm"
              alt="Floating 1"
            />
            <img 
              ref={el => parallaxImagesRef.current[1] = el}
              src="/assets/about%202.jpg" 
              className="absolute top-[35%] left-[15%] w-[15vw] max-w-[200px] h-auto aspect-[3/4] object-cover shadow-2xl rounded-sm"
              alt="Floating 2"
            />
            <img 
              ref={el => parallaxImagesRef.current[2] = el}
              src="/assets/about%205.jpg" 
              className="absolute top-[50%] right-[10%] w-[15vw] max-w-[200px] h-auto aspect-[3/4] object-cover shadow-2xl rounded-sm"
              alt="Floating 3"
            />
            <img 
              ref={el => parallaxImagesRef.current[3] = el}
              src="/assets/about%203.jpg" 
              className="absolute top-[65%] left-[10%] w-[15vw] max-w-[200px] h-auto aspect-[3/4] object-cover shadow-2xl rounded-sm"
              alt="Floating 4"
            />
          </div>
        </section>

      </div>
    </div>
  );
}
