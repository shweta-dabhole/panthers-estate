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

const propertiesList = [
  {
    title: "Cedarwood Estates",
    price: "$1,600,000",
    beds: "5 Bedrooms",
    baths: "5 Bathrooms",
    sqft: "4,500 SQ.FT",
    image: "/realtora-real-estate/public/images/BM5DJRZcwLRhIfqMFOK4GeI.webp",
    badge: "FOR SALE"
  },
  {
    title: "Goldencrest Villas",
    price: "$1,875,000",
    beds: "6 Bedrooms",
    baths: "8 Bathrooms",
    sqft: "3,800 SQ.FT",
    image: "/realtora-real-estate/public/images/QHrU5R2YxV6j0vFGDThc7hSgGKw.webp",
    badge: "FOR SALE"
  },
  {
    title: "Silverstone Manor",
    price: "$2,250,000",
    beds: "5 Bedrooms",
    baths: "5 Bathrooms",
    sqft: "4,000 SQ.FT",
    image: "/realtora-real-estate/public/images/p36i3IJiJzBK4cHjJGtkOkx4M.jpeg",
    badge: "NEW"
  },
  {
    title: "Serenity Villas",
    price: "$2,500,000",
    beds: "4 Bedrooms",
    baths: "3 Bathrooms",
    sqft: "3,200 SQ.FT",
    image: "/realtora-real-estate/public/images/A2jIeSLi2HTwjLhzSESMxp3rd1c.webp",
    badge: "FOR SALE"
  }
];

const featuresList = [
  {
    title: "Lifestyle-Centric Living",
    description: "Thoughtfully planned spaces that fit the pace of real life, with room to grow, recharge, and gather.",
    image: "/realtora-real-estate/public/images/BM5DJRZcwLRhIfqMFOK4GeI.webp"
  },
  {
    title: "Prime & Promising Locations",
    description: "From upscale neighborhoods to emerging hotspots, each address is chosen for its value and vibrance.",
    image: "/realtora-real-estate/public/images/A2jIeSLi2HTwjLhzSESMxp3rd1c.webp"
  },
  {
    title: "Smart, Sustainable Features",
    description: "Enjoy future-ready homes equipped with eco-conscious technology and intelligent design.",
    image: "/realtora-real-estate/public/images/QHrU5R2YxV6j0vFGDThc7hSgGKw.webp"
  },
  {
    title: "End-to-End Support",
    description: "We handle the complexities of buying, selling, and renting, giving you peace of mind at every step.",
    image: "/realtora-real-estate/public/images/hoMkKeDJp1rMS99FfvGiuFk8Vsc.webp"
  }
];


const PropertyCard = ({ property, index }) => {
  const cardRef = useRef(null);
  const cursorRef = useRef(null);
  const imageWrapperRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, [index]);

  const handleMouseMove = (e) => {
    if (!imageWrapperRef.current || !cursorRef.current) return;
    const rect = imageWrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    gsap.to(cursorRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMouseEnter = () => {
    gsap.to(cursorRef.current, { 
      scale: 1, 
      opacity: 1, 
      duration: 0.3, 
      ease: "back.out(1.5)" 
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cursorRef.current, { 
      scale: 0.5, 
      opacity: 0, 
      duration: 0.3, 
      ease: "power2.in" 
    });
  };

  return (
    <div ref={cardRef} className="flex flex-col w-full" style={{ gap: '24px' }}>
      <div 
        ref={imageWrapperRef}
        className="relative w-full overflow-hidden rounded-[15px] cursor-none group"
        style={{ aspectRatio: '1.5', backgroundColor: '#e3e3e3' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" 
        />
        
        {/* Custom Pill Cursor */}
        <div 
          ref={cursorRef}
          className="absolute pointer-events-none z-10 flex items-center justify-center bg-white shadow-lg"
          style={{ 
            top: '-24px', 
            left: '-60px', 
            width: '120px', 
            height: '48px', 
            borderRadius: '100px',
            opacity: 0,
            transform: 'scale(0.5)'
          }}
        >
          <span style={{ fontSize: '15px', fontWeight: 500, color: '#111' }}>View Details</span>
        </div>
      </div>
      
      <div className="flex flex-col" style={{ gap: '10px' }}>
        <div className="flex justify-between items-center w-full">
          <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#191919', margin: 0 }}>{property.title}</h3>
          <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#191919', margin: 0 }}>{property.price}</h3>
        </div>
        <div className="flex items-center" style={{ fontSize: '15px', gap: '8px' }}>
          <div className="flex gap-1 items-center">
            <span style={{ color: '#757575' }}>{property.beds.split(' ')[0]}</span>
            <span style={{ color: '#4d4d4d' }}>{property.beds.split(' ')[1]}</span>
          </div>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#d1d1d1' }}></span>
          <div className="flex gap-1 items-center">
            <span style={{ color: '#757575' }}>{property.baths.split(' ')[0]}</span>
            <span style={{ color: '#4d4d4d' }}>{property.baths.split(' ')[1]}</span>
          </div>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#d1d1d1' }}></span>
          <div className="flex gap-1 items-center">
            <span style={{ color: '#757575' }}>{property.sqft.split(' ')[0]}</span>
            <span style={{ color: '#4d4d4d' }}>{property.sqft.split(' ')[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
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
  const featuredSectionRef = useRef(null);
  const discoverSectionRef = useRef(null);
  const discoverParallaxRef = useRef([]);
  const discoverCenterRef = useRef(null);
  const featuresSectionRef = useRef(null);
  const horizonVillaRef = useRef(null);
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
        if (textEl) {
          gsap.fromTo(
            textEl,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: textEl,
                start: "top 85%",
                toggleActions: "play none none reverse"
              },
            }
          );
        }
      });
    }

    // Cards Animation
    if (cardsSectionRef.current) {
      const cards = cardsSectionRef.current.querySelectorAll('.stat-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsSectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }

    // Infinite Loop Horizontal Marquee for Explore Properties
    if (featuredSectionRef.current) {
      const headerElements = featuredSectionRef.current.querySelectorAll('.featured-header');
      const cards = featuredSectionRef.current.querySelectorAll('.property-card');
      
      if (headerElements.length > 0) {
        gsap.fromTo(
          headerElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuredSectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      if (cards.length > 0) {
        const loop = horizontalLoop(gsap.utils.toArray(cards), {
          repeat: -1,
          speed: 0.5,
          paddingRight: 32 // matching gap-8
        });

        // Pause loop on hover
        const wrapper = featuredSectionRef.current.querySelector(".property-cards-wrapper");
        if (wrapper) {
          const onEnter = () => loop.pause();
          const onLeave = () => loop.play();
          wrapper.addEventListener("mouseenter", onEnter);
          wrapper.addEventListener("mouseleave", onLeave);

          // Save cleanup handler
          wrapper._cleanup = () => {
            wrapper.removeEventListener("mouseenter", onEnter);
            wrapper.removeEventListener("mouseleave", onLeave);
            loop.kill();
          };
        }

        // Fade in the cards wrapper
        gsap.fromTo(
          ".property-cards-wrapper",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuredSectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }

    // Discover Parallax Animation (4 corner images)
    if (discoverParallaxRef.current.length > 0 && discoverSectionRef.current) {
      discoverParallaxRef.current.forEach((img, index) => {
        if (img) {
          const yStart = [300, -300, 350, -280][index] || 300;
          const yEnd = [-300, 300, -350, 280][index] || -300;
          gsap.fromTo(
            img,
            { y: yStart },
            {
              y: yEnd,
              ease: "none",
              scrollTrigger: {
                trigger: discoverSectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );
        }
      });
    }

    // Center image in Discover section - subtle float
    if (discoverCenterRef.current && discoverSectionRef.current) {
      gsap.fromTo(
        discoverCenterRef.current,
        { y: 80, scale: 0.95 },
        {
          y: -80,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: discoverSectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        }
      );
    }

    // Horizon Villa Scroll Reveal - scales from rounded card to full bleed
    if (horizonVillaRef.current) {
      gsap.fromTo(
        horizonVillaRef.current,
        { borderRadius: '3rem', scale: 0.88, margin: '0 3rem' },
        {
          borderRadius: '0rem',
          scale: 1,
          margin: '0 0',
          ease: "none",
          scrollTrigger: {
            trigger: horizonVillaRef.current,
            start: "top 85%",
            end: "top 20%",
            scrub: 1.5,
          },
        }
      );
    }

    // Features Scroll Linked Tabs
    if (featuresSectionRef.current) {
      ScrollTrigger.create({
        trigger: featuresSectionRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          let index = Math.floor(self.progress * featuresList.length);
          if (index >= featuresList.length) index = featuresList.length - 1;
          setActiveFeature(index);
        }
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
                className="text-white font-medium tracking-tighter drop-shadow-xl font-poppins" 
                style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: '0.85' }}
              >
                Find Your
              </h1>
            </div>
            <div className="overflow-hidden pb-2 -mt-6 md:-mt-8">
              <h1 
                ref={el => heroTextLinesRef.current[1] = el}
                className="text-white font-medium tracking-tighter drop-shadow-xl font-poppins" 
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
                className="text-white text-base md:text-lg font-light opacity-90 drop-shadow-md tracking-wide font-poppins"
              >
                Discover exceptional residences where thoughtful design, modern comfort, and timeless elegance come together. Explore spaces created to complement your lifestyle and inspire every day.
              </p>
            </div>
          </div>
        </section>

                {/* 4. About Us Section (Who Are We) */}
        <section 
          id="about"
          ref={aboutSectionRef}
          className="relative w-full flex flex-col items-center overflow-hidden"
          style={{ paddingTop: '100px', paddingBottom: '100px', paddingLeft: '5%', paddingRight: '5%', backgroundColor: '#f9f9f9', fontFamily: '"Inter", sans-serif' }}
        >
          {/* Centered Heading with Dot */}
          <div className="flex items-center" style={{ gap: '10px', marginBottom: '32px' }} ref={el => aboutTextRefs.current[0] = el}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#b85300' }}></div>
            <h3 style={{ fontSize: '17px', fontWeight: 400, letterSpacing: '-0.4px', color: '#191919', margin: 0 }}>
              Who Are We?
            </h3>
          </div>

          {/* Centered Large Text */}
          <div style={{ maxWidth: '760px', textAlign: 'center', marginBottom: '100px' }} ref={el => aboutTextRefs.current[1] = el}>
            <p style={{ fontSize: '24px', fontWeight: 400, color: '#191919', lineHeight: '1.5', margin: 0 }}>
              At Realtora, we believe a home is life's most important foundation. Our mission is to find your perfect habitat so you can comfortably build your future and best life.
            </p>
          </div>

          {/* Cards Section */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '24px', maxWidth: '1200px' }} ref={cardsSectionRef}>
            {/* Card 1 */}
            <div className="flex flex-col justify-between" style={{ height: '212px', padding: '32px', borderRadius: '15px', borderWidth: '1.3px', borderStyle: 'solid', borderColor: '#e6e6e6', backgroundColor: '#f9f9f9' }}>
              <div style={{ width: '32px', height: '32px', color: '#666', flex: 'none' }}>
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 6 L 0 0 L 10.5 0 L 10.5 6 Z" fillOpacity="0" fill="currentColor" transform="translate(6.75 12)"/>
                  <path d="M 0 6 L 0 0 L 10.5 0 L 10.5 6" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" stroke="currentColor" transform="translate(6.75 12)"/>
                  <path d="M 0 0 L 10.5 0" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" stroke="currentColor" transform="translate(6.75 15)"/>
                  <path d="M 0 0 L 21 0" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" stroke="currentColor" transform="translate(1.5 18)"/>
                  <path d="M 21 0 L 0 4.5" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" stroke="currentColor" transform="translate(1.5 4.5)"/>
                  <path d="M 0 0 L 0 9.322" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" stroke="currentColor" transform="translate(3 8.678)"/>
                  <path d="M 0 0 L 0 13.178" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" stroke="currentColor" transform="translate(21 4.822)"/>
                </svg>
              </div>
              <div className="flex flex-col" style={{ gap: '16px' }}>
                <h4 style={{ fontSize: '40px', fontWeight: 600, color: '#111', lineHeight: '1em', letterSpacing: '-0.04em', margin: 0 }}>5000+</h4>
                <p style={{ fontSize: '15px', fontWeight: 400, color: '#333', lineHeight: '1.2em', margin: 0 }}>Property deliverd</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col justify-between" style={{ height: '212px', padding: '32px', borderRadius: '15px', borderWidth: '1.3px', borderStyle: 'solid', borderColor: '#e6e6e6', backgroundColor: '#f9f9f9' }}>
              <div style={{ width: '32px', height: '32px', color: '#666', flex: 'none' }}>
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 3.75 C 0 1.679 1.679 0 3.75 0 C 5.821 0 7.5 1.679 7.5 3.75 C 7.5 5.821 5.821 7.5 3.75 7.5 C 1.679 7.5 0 5.821 0 3.75 Z" fillOpacity="0" fill="currentColor" transform="translate(8.25 9.75)"/>
                  <path d="M 0 3 C 0 1.343 1.343 0 3 0 C 4.657 0 6 1.343 6 3 C 6 4.657 4.657 6 3 6 C 1.343 6 0 4.657 0 3 Z" fillOpacity="0" fill="currentColor" transform="translate(3 5.25)"/>
                  <path d="M 0 3 C 0 1.343 1.343 0 3 0 C 4.657 0 6 1.343 6 3 C 6 4.657 4.657 6 3 6 C 1.343 6 0 4.657 0 3 Z" fillOpacity="0" fill="currentColor" transform="translate(15 5.25)"/>
                  <path d="M 0 0 C 1.771 -0.001 3.439 0.833 4.5 2.25" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" stroke="currentColor" transform="translate(18 11.25)"/>
                  <path d="M 0 2.25 C 1.061 0.833 2.729 -0.001 4.5 0" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" stroke="currentColor" transform="translate(1.5 11.25)"/>
                  <path d="M 0 3.75 C 0 1.679 1.679 0 3.75 0 C 5.821 0 7.5 1.679 7.5 3.75 C 7.5 5.821 5.821 7.5 3.75 7.5 C 1.679 7.5 0 5.821 0 3.75 Z" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" stroke="currentColor" transform="translate(8.25 9.75)"/>
                  <path d="M 0 3 C 1.095 1.141 3.092 0 5.25 0 C 7.408 0 9.405 1.141 10.5 3" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" stroke="currentColor" transform="translate(6.75 17.25)"/>
                  <path d="M 0 2.25 C 0.39 0.741 1.87 -0.218 3.407 0.043 C 4.944 0.304 6.025 1.698 5.894 3.252 C 5.764 4.805 4.465 6 2.906 6" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" stroke="currentColor" transform="translate(15.094 5.25)"/>
                  <path d="M 2.999 6 C 1.44 6 0.141 4.805 0.011 3.252 C -0.12 1.698 0.961 0.304 2.498 0.043 C 4.034 -0.218 5.515 0.741 5.905 2.25" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" stroke="currentColor" transform="translate(3.001 5.25)"/>
                </svg>
              </div>
              <div className="flex flex-col" style={{ gap: '16px' }}>
                <h4 style={{ fontSize: '40px', fontWeight: 600, color: '#111', lineHeight: '1em', letterSpacing: '-0.04em', margin: 0 }}>2000+</h4>
                <p style={{ fontSize: '15px', fontWeight: 400, color: '#333', lineHeight: '1.2em', margin: 0 }}>Client served worldwide</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col justify-between" style={{ height: '212px', padding: '32px', borderRadius: '15px', borderWidth: '1.3px', borderStyle: 'solid', borderColor: '#e6e6e6', backgroundColor: '#f9f9f9' }}>
              <div style={{ width: '32px', height: '32px', color: '#666', flex: 'none' }}>
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 0 L 13.5 0 L 13.5 5.916 C 13.5 9.638 10.523 12.722 6.802 12.75 C 5.002 12.764 3.272 12.059 1.995 10.791 C 0.718 9.524 0 7.799 0 6 Z" fillOpacity="0" fill="currentColor" transform="translate(5.25 4.5)"/>
                  <path d="M 0 0 L 6 0" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" stroke="currentColor" transform="translate(9 21)"/>
                  <path d="M 0 0 L 0 3.75" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" stroke="currentColor" transform="translate(12 17.25)"/>
                  <path d="M 3.938 5.25 L 3 5.25 C 1.343 5.25 0 3.907 0 2.25 L 0 0.75 C 0 0.336 0.336 0 0.75 0 L 3.75 0" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" stroke="currentColor" transform="translate(1.5 6.75)"/>
                  <path d="M 0 5.25 L 0.938 5.25 C 2.594 5.25 3.938 3.907 3.938 2.25 L 3.938 0.75 C 3.938 0.336 3.602 0 3.188 0 L 0.188 0" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" stroke="currentColor" transform="translate(18.563 6.75)"/>
                  <path d="M 0 0 L 13.5 0 L 13.5 5.916 C 13.5 9.638 10.523 12.722 6.802 12.75 C 5.002 12.764 3.272 12.059 1.995 10.791 C 0.718 9.524 0 7.799 0 6 Z" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" stroke="currentColor" transform="translate(5.25 4.5)"/>
                </svg>
              </div>
              <div className="flex flex-col" style={{ gap: '16px' }}>
                <h4 style={{ fontSize: '40px', fontWeight: 600, color: '#111', lineHeight: '1em', letterSpacing: '-0.04em', margin: 0 }}>100+</h4>
                <p style={{ fontSize: '15px', fontWeight: 400, color: '#333', lineHeight: '1.2em', margin: 0 }}>Awards</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col justify-between" style={{ height: '212px', padding: '32px', borderRadius: '15px', borderWidth: '1.3px', borderStyle: 'solid', borderColor: '#e6e6e6', backgroundColor: '#f9f9f9' }}>
              <div style={{ width: '32px', height: '32px', color: '#666', flex: 'none' }}>
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0.75 3.75 C 0.336 3.75 0 3.414 0 3 L 0 0.75 C 0 0.336 0.336 0 0.75 0 L 11.25 0 C 11.664 0 12 0.336 12 0.75 L 12 3 C 12 3.414 11.664 3.75 11.25 3.75 Z" fillOpacity="0" fill="currentColor" transform="translate(6 3)"/>
                  <path d="M 0.75 3.75 C 0.336 3.75 0 3.414 0 3 L 0 0.75 C 0 0.336 0.336 0 0.75 0 L 11.25 0 C 11.664 0 12 0.336 12 0.75 L 12 3 C 12 3.414 11.664 3.75 11.25 3.75 Z" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" stroke="currentColor" transform="translate(6 3)"/>
                  <path d="M 0 0 L 2.25 14.25" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" stroke="currentColor" transform="translate(15.75 6.75)"/>
                  <path d="M 0 14.25 L 2.25 0" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" stroke="currentColor" transform="translate(6 6.75)"/>
                  <path d="M 0 0 L 10.343 0" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" stroke="currentColor" transform="translate(6.829 15.75)"/>
                </svg>
              </div>
              <div className="flex flex-col" style={{ gap: '16px' }}>
                <h4 style={{ fontSize: '40px', fontWeight: 600, color: '#111', lineHeight: '1em', letterSpacing: '-0.04em', margin: 0 }}>12+</h4>
                <p style={{ fontSize: '15px', fontWeight: 400, color: '#333', lineHeight: '1.2em', margin: 0 }}>Years of expereince</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Explore Properties Section */}
        <section 
          id="properties"
          ref={featuredSectionRef}
          className="relative w-full flex flex-col items-center overflow-hidden"
          style={{ paddingBottom: '100px', paddingTop: '40px', paddingLeft: '5%', paddingRight: '5%', backgroundColor: '#f9f9f9', fontFamily: '"Inter", sans-serif' }}
        >
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end" style={{ maxWidth: '1200px', marginBottom: '80px' }}>
            
            {/* Left Text Block */}
            <div className="flex flex-col items-start featured-header" style={{ maxWidth: '600px' }}>
              <div className="flex items-center" style={{ gap: '10px', marginBottom: '20px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#b85300' }}></div>
                <h3 style={{ fontSize: '17px', fontWeight: 400, letterSpacing: '-0.4px', color: '#333', margin: 0 }}>
                  Listings
                </h3>
              </div>
              <h2 style={{ fontSize: '44px', fontWeight: 500, color: '#191919', letterSpacing: '-0.5px', lineHeight: '1.1em', margin: '0 0 16px 0' }}>
                Explore Properties
              </h2>
              <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.5em', margin: 0, maxWidth: '345px' }}>
                Luxury villas, smart apartments, commercial spaces. All verified and ready for you.
              </p>
            </div>

            {/* Right Button */}
            <div className="featured-header mt-8 md:mt-0 flex-none cursor-pointer group">
              <div className="flex items-center justify-between transition-all duration-300 hover:bg-[#ebebeb]" style={{ height: '48px', padding: '6px 6px 6px 24px', borderRadius: '229px', border: '1px solid #191919', backgroundColor: 'transparent' }}>
                <span style={{ fontSize: '15px', fontWeight: 500, color: '#191919', marginRight: '20px' }}>View All</span>
                <div className="flex items-center justify-center bg-[#191919] transition-colors duration-300" style={{ width: '36px', height: '36px', borderRadius: '50%' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16" fill="#fff">
                    <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Cards Grid Wrapper */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2" style={{ maxWidth: '1200px', gap: '40px' }}>
            {propertiesList.map((property, idx) => (
              <PropertyCard key={idx} property={property} index={idx} />
            ))}
          </div>
        </section>


              </div>
    </div>
  );
}
