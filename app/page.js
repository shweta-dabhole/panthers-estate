"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import MenuOverlay from "../components/MenuOverlay";

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



    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#000000] text-[#f2f2f2] select-none overflow-x-hidden">
      {/* 1. Pre-loader Section (Minimalist Logo Only) */}
      <div ref={preLoaderRef} className="pre-loader">
        <div 
          ref={loaderImgRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full max-w-[600px] sm:max-w-[800px] md:max-w-[1000px] px-4 opacity-0"
        >
          <img 
            src="/assets/panthers%20logo%20new.png" 
            alt="Panthers Estate Logo" 
            className="h-auto max-h-[50vh] w-full object-contain loader-logo-blink"
          />
        </div>
      </div>

      {/* 2. Navigation & Full Screen Menu Overlay */}
      <MenuOverlay containerRef={containerRef} navRef={navRef} />

      {/* 3. Main Hero Website Section Wrapped in Container for Rotation */}
      <div className="app-container" ref={containerRef}>
        <section id="hero" className="hero relative w-full h-screen">
          <div ref={heroImgsRef} className="hero-imgs relative w-full h-full">
            <img className="absolute inset-0 w-full h-full object-cover" src="/assets/home%202.jpg" alt="Panthers Home 2" style={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }} />
            <img className="absolute inset-0 w-full h-full object-cover" src="/assets/home%207.jpg" alt="Panthers Home 7" style={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }} />
            <img className="absolute inset-0 w-full h-full object-cover" src="/assets/home%20img%201.png" alt="Panthers Home Img 1" style={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }} />
          </div>

          {/* Text Overlay */}
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 md:top-[40%] z-50 pointer-events-none flex flex-col items-center text-center w-full">
            <div className="overflow-hidden pb-4">
              <h1 
                ref={el => heroTextLinesRef.current[0] = el}
                className="text-white font-medium tracking-tighter drop-shadow-xl" 
                style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: '0.85' }}
              >
                Find Your
              </h1>
            </div>
            <div className="overflow-hidden pb-2 -mt-6 md:-mt-8">
              <h1 
                ref={el => heroTextLinesRef.current[1] = el}
                className="text-white font-medium tracking-tighter drop-shadow-xl" 
                style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: '0.85' }}
              >
                Dream Home
              </h1>
            </div>
            {/* Hard spacer to forcefully push the subtitle down */}
            <div style={{ height: '16px', width: '100%' }}></div>
            <div className="overflow-hidden max-w-2xl">
              <p 
                ref={el => heroTextLinesRef.current[2] = el}
                className="text-white text-base md:text-lg font-light opacity-90 drop-shadow-md tracking-wide"
              >
                Discover exceptional residences where thoughtful design, modern comfort, and timeless elegance come together. Explore spaces created to complement your lifestyle and inspire every day.
              </p>
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
          <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mt-8" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            <div className="w-full md:col-span-1">
              <h3 className="text-3xl font-bold tracking-wider text-[#000000]" style={{ fontFamily: 'var(--font-poppins), sans-serif', lineHeight: '1.2' }}>
                Why Panthers
              </h3>
            </div>
            
            <div className="w-full md:col-span-2 font-medium tracking-tight" style={{ fontSize: '1.3rem', lineHeight: '1.6' }}>
              <h2 className="text-2xl md:text-3xl font-bold text-black" style={{ fontFamily: 'var(--font-poppins), sans-serif', marginBottom: '1.2rem' }}>
                Find Your Place. Build Your Future.
              </h2>
              <p ref={el => aboutTextRefs.current[0] = el} style={{ opacity: 0.85 }}>
                <span className="text-black">At Panthers Estate, we believe great spaces shape great futures. Like the Panther, we move with purpose, confidence, and precision, ensuring every home we present and every investment we recommend creates lasting value. </span>
                <span className="text-black">Because finding the right property isn't just about where you are today—it's about where you're going next. We are committed to turning aspirations into addresses, helping you discover new possibilities and create a future built on confidence, growth, and opportunity.</span>
              </p>
            </div>
          </div>
        </section>



      </div>
    </div>
  );
}
