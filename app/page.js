"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const SplitTextChars = ({ text }) => {
  return text.split('').map((char, index) => (
    <div key={index} className="char">
      <span>{char === ' ' ? '\u00A0' : char}</span>
    </div>
  ));
};

function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
    repeat: config.repeat,
    defaults: { ease: "none" },
  });
  let length = items.length;
  let startX = items[0].offsetLeft;
  let widths = [];
  let xPercents = [];
  let pixelsPerSecond = (config.speed || 1) * 100;
  let totalWidth, curX, distanceToStart, distanceToLoop, item, i;

  gsap.set(items, {
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] =
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
        gsap.getProperty(el, "xPercent");
      return xPercents[i];
    },
  });

  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);

  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
      item,
      {
        xPercent: ((curX - distanceToLoop) / widths[i]) * 100,
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    ).fromTo(
      item,
      { xPercent: ((curX - distanceToLoop + totalWidth) / widths[i]) * 100 },
      {
        xPercent: xPercents[i],
        duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
        immediateRender: false,
      },
      distanceToLoop / pixelsPerSecond
    );
  }

  tl.progress(1, true).progress(0, true);
  return tl;
}

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
  const cardsSectionRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);

  useEffect(() => {
    // Initialize Lenis Smooth Scrolling
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

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

    // 5. Capsules Sticky Cards Animation Setup
    if (cardsSectionRef.current) {
      const cards = gsap.utils.toArray(cardsSectionRef.current.querySelectorAll(".card"));
      if (cards.length > 0) {
        const introCard = cards[0];
        const cardImgWrapper = introCard.querySelector(".card-img");
        const cardImg = introCard.querySelector(".card-img img");
        
        if (cardImgWrapper && cardImg) {
          gsap.set(cardImgWrapper, { scale: 0.5, borderRadius: "400px" });
          gsap.set(cardImg, { scale: 1.5 });
        }

        function animateContentIn(titleChars, description) {
          gsap.to(titleChars, { x: "0%", duration: 0.75, ease: "power4.out" });
          gsap.to(description, {
            x: 0,
            opacity: 1,
            duration: 0.75,
            delay: 0.1,
            ease: "power4.out",
          });
        }

        function animateContentOut(titleChars, description) {
          gsap.to(titleChars, { x: "100%", duration: 0.5, ease: "power4.out" });
          gsap.to(description, {
            x: "40px",
            opacity: 0,
            duration: 0.5,
            ease: "power4.out",
          });
        }

        const marquee = introCard.querySelector(".card-marquee .marquee");
        const titleChars = introCard.querySelectorAll(".char span");
        const description = introCard.querySelector(".card-description");

        ScrollTrigger.create({
          trigger: introCard,
          start: "top top",
          end: "+=300vh",
          onUpdate: (self) => {
            const progress = self.progress;
            const imgScale = 0.5 + progress * 0.5;
            const borderRadius = 400 - progress * 375;
            const innerImgScale = 1.5 - progress * 0.5;

            gsap.set(cardImgWrapper, {
              scale: imgScale,
              borderRadius: borderRadius + "px",
            });
            gsap.set(cardImg, { scale: innerImgScale });

            if (imgScale >= 0.5 && imgScale <= 0.75) {
              const fadeProgress = (imgScale - 0.5) / (0.75 - 0.5);
              gsap.set(marquee, { opacity: 1 - fadeProgress });
            } else if (imgScale < 0.5) {
              gsap.set(marquee, { opacity: 1 });
            } else if (imgScale > 0.75) {
              gsap.set(marquee, { opacity: 0 });
            }

            if (progress >= 1 && !introCard.contentRevealed) {
              introCard.contentRevealed = true;
              animateContentIn(titleChars, description);
            }
            if (progress < 1 && introCard.contentRevealed) {
              introCard.contentRevealed = false;
              animateContentOut(titleChars, description);
            }
          },
        });

        cards.forEach((card, index) => {
          const isLastCard = index === cards.length - 1;
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            end: isLastCard ? "+=100vh" : "top top",
            endTrigger: isLastCard ? null : cards[cards.length - 1],
            pin: true,
            pinSpacing: isLastCard,
          });
        });

        cards.forEach((card, index) => {
          if (index < cards.length - 1) {
            const cardWrapper = card.querySelector(".card-wrapper");
            ScrollTrigger.create({
              trigger: cards[index + 1],
              start: "top bottom",
              end: "top top",
              onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(cardWrapper, {
                  scale: 1 - progress * 0.25,
                  opacity: 1 - progress,
                });
              },
            });
          }
        });

        cards.forEach((card, index) => {
          if (index > 0) {
            const innerCardImg = card.querySelector(".card-img img");
            const imgContainer = card.querySelector(".card-img");
            ScrollTrigger.create({
              trigger: card,
              start: "top bottom",
              end: "top top",
              onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(innerCardImg, { scale: 2 - progress });
                gsap.set(imgContainer, { borderRadius: 150 - progress * 125 + "px" });
              },
            });
          }
        });

        cards.forEach((card, index) => {
          if (index === 0) return;

          const cardDescription = card.querySelector(".card-description");
          const cardTitleChars = card.querySelectorAll(".char span");

          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            onEnter: () => animateContentIn(cardTitleChars, cardDescription),
            onLeaveBack: () => animateContentOut(cardTitleChars, cardDescription),
          });
        });

        // Marquee Animation
        const marqueeItems = gsap.utils.toArray(cardsSectionRef.current.querySelectorAll(".marquee h1"));
        if (marqueeItems.length > 0) {
          horizontalLoop(marqueeItems, {
            repeat: -1,
            paddingRight: 30,
          });
        }
      }
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
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
        clearProps: "transform",
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
    <div className="relative min-h-screen w-full flex flex-col bg-[#315C8B] text-[#f2f2f2] select-none overflow-x-hidden">
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
                  <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')}>Portfolio</a>
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
                style={{ fontSize: 'clamp(4rem, 10vw, 9rem)', lineHeight: '1' }}
              >
                Find Your
              </h1>
            </div>
            <div className="overflow-hidden pb-2">
              <h1 
                ref={el => heroTextLinesRef.current[1] = el}
                className="text-white font-bold tracking-tighter drop-shadow-xl" 
                style={{ fontSize: 'clamp(4rem, 10vw, 9rem)', lineHeight: '1' }}
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
          <div className="relative z-10 w-full font-medium tracking-tight mt-8" style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.8rem, 4vw, 4rem)', lineHeight: '1.3' }}>
            <h2 ref={el => aboutTextRefs.current[0] = el} className="text-center text-[clamp(2.5rem,5vw,5rem)] tracking-[0.1em] uppercase text-[#315C8B] font-bold" style={{ marginBottom: '8rem' }}>About Us</h2>
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

        {/* 5. Capsules Work Section */}
        <section id="portfolio" className="capsule-cards-section overflow-hidden">
          <section className="capsules-intro">
            <h1>We design spaces that don’t just exist.</h1>
          </section>
          <section className="cards" ref={cardsSectionRef}>
            <div className="card">
              <div className="card-marquee">
                <div className="marquee">
                  <h1>Design Beyond Boundaries</h1>
                  <h1>Built for Tomorrow</h1>
                  <h1>Real Impact</h1>
                  <h1>Digital Visions</h1>
                </div>
              </div>
              <div className="card-wrapper">
                <div className="card-content">
                  <div className="card-title">
                    <h1><SplitTextChars text="Curved Horizon" /></h1>
                  </div>
                  <div className="card-description">
                    <p>
                      A futuristic residence that plays with curvature and flow,
                      blending bold geometry with natural topography.
                    </p>
                  </div>
                </div>
                <div className="card-img">
                  <img src="/card-img-1.jpg" alt="" />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-wrapper">
                <div className="card-content">
                  <div className="card-title">
                    <h1><SplitTextChars text="Glass Haven" /></h1>
                  </div>
                  <div className="card-description">
                    <p>
                      A sleek pavilion of pure transparency, openness and light,
                      designed to dissolve into its environment.
                    </p>
                  </div>
                </div>
                <div className="card-img">
                  <img src="/card-img-2.jpg" alt="" />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-wrapper">
                <div className="card-content">
                  <div className="card-title">
                    <h1><SplitTextChars text="Moss Cube" /></h1>
                  </div>
                  <div className="card-description">
                    <p>
                      A minimalist cube home crowned with a living moss dome, merging
                      micro-architecture with ecological design.
                    </p>
                  </div>
                </div>
                <div className="card-img">
                  <img src="/card-img-3.jpg" alt="" />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-wrapper">
                <div className="card-content">
                  <div className="card-title">
                    <h1><SplitTextChars text="Floating Shelter" /></h1>
                  </div>
                  <div className="card-description">
                    <p>
                      This design explores an ethereal structure perched on a grassy
                      islet, seemingly hovering above water.
                    </p>
                  </div>
                </div>
                <div className="card-img">
                  <img src="/card-img-4.jpg" alt="" />
                </div>
              </div>
            </div>
          </section>
          <section className="capsules-outro">
            <h1>Architecture reimagined for the virtual age.</h1>
          </section>
        </section>

      </div>
    </div>
  );
}
