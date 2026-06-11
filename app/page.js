"use client";
import P10HeroSection from '../components/P10HeroSection';
import InsightsMarqueeSection from '../components/InsightsMarqueeSection';

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
    image: "/realtora-real-estate/public/images/ChatGPT Image Jun 10, 2026, 12_51_45 PM.png",
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
    image: "/realtora-real-estate/public/images/ChatGPT Image Jun 10, 2026, 12_51_45 PM.png"
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
    // Parent animation handles the entry
  }, []);

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
    <div ref={cardRef} className="property-card flex flex-col w-full" style={{ gap: '24px' }}>
      <div 
        ref={imageWrapperRef}
        className="property-card-img relative w-full overflow-hidden rounded-[15px] cursor-none group"
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


const DiscoverSpacesSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  
  // Text Halves
  const textL1Ref = useRef(null); // "Discover "
  const textR1Ref = useRef(null); // "Spaces"
  const textL2Ref = useRef(null); // "That Speak "
  const textR2Ref = useRef(null); // "to You"

  // Small Images
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const img4Ref = useRef(null);

  // Center Image
  const centerImgWrapperRef = useRef(null);
  const centerImgRef = useRef(null);
  const overlayTextRef = useRef(null);
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
        }
      });

      // PHASE 1: Small images appear
      tl.fromTo([img1Ref.current, img2Ref.current, img3Ref.current, img4Ref.current], 
        { opacity: 0, scale: 0.8 }, 
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 }, 
        0
      );

      // PHASE 2: The Split & Expand (starts at 1.0)
      const splitStart = 1.0;
      
      // Text splits horizontally
      tl.to(textL1Ref.current, { x: "-30vw", duration: 1.5 }, splitStart);
      tl.to(textR1Ref.current, { x: "30vw", duration: 1.5 }, splitStart);
      tl.to(textL2Ref.current, { x: "-30vw", duration: 1.5 }, splitStart);
      tl.to(textR2Ref.current, { x: "30vw", duration: 1.5 }, splitStart);

      // Small images scatter and fade out
      tl.to(img1Ref.current, { x: "-30vw", y: "-30vh", opacity: 0, duration: 1.5 }, splitStart);
      tl.to(img2Ref.current, { x: "-30vw", y: "30vh", opacity: 0, duration: 1.5 }, splitStart);
      tl.to(img3Ref.current, { x: "30vw", y: "-30vh", opacity: 0, duration: 1.5 }, splitStart);
      tl.to(img4Ref.current, { x: "30vw", y: "30vh", opacity: 0, duration: 1.5 }, splitStart);

      // Center image scales up to fill the screen edge-to-edge
      tl.fromTo(centerImgWrapperRef.current, 
        { width: "0px", height: "0px", borderRadius: "50%", xPercent: -50, yPercent: -50 },
        { width: "98%", height: "98%", borderRadius: "40px", xPercent: -50, yPercent: -50, duration: 1.5, ease: "power2.inOut" }, 
        splitStart
      );

      // Image subtle parallax scaling down to 1
      tl.fromTo(centerImgRef.current,
        { scale: 2 },
        { scale: 1, duration: 1.5, ease: "power2.out" },
        splitStart
      );

      // PHASE 3: Overlay fades in
      tl.fromTo(overlayTextRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.5 }, 
        splitStart + 1.2
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2,
          ease: "power2.out",
          xPercent: -50,
          yPercent: -50,
          overwrite: "auto"
        });
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden h-screen" style={{ backgroundColor: "#fff" }}>
      <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden">
        
        {/* Texts */}
        <div className="absolute z-10 w-full flex flex-col items-center justify-center pointer-events-none" style={{ gap: '10px' }}>
          
          <div className="flex" style={{ fontSize: '80px', fontWeight: 400, fontFamily: 'var(--font-poppins), sans-serif', color: '#191919', lineHeight: 1.1, letterSpacing: '-2px' }}>
            <div ref={textL1Ref} className="whitespace-pre">Discover </div>
            <div ref={textR1Ref} className="whitespace-pre">Spaces</div>
          </div>
          
          <div className="flex" style={{ fontSize: '80px', fontWeight: 400, fontFamily: 'var(--font-poppins), sans-serif', color: '#191919', lineHeight: 1.1, letterSpacing: '-2px' }}>
            <div ref={textL2Ref} className="whitespace-pre">That Speak </div>
            <div ref={textR2Ref} className="whitespace-pre">to You</div>
          </div>

        </div>

        {/* Small Images */}
        <img ref={img1Ref} src="/realtora-real-estate/public/images/BM5DJRZcwLRhIfqMFOK4GeI.webp" className="absolute object-cover shadow-xl" style={{ top: '15%', left: '15%', width: '220px', height: '140px', borderRadius: '0px' }} />
        <img ref={img2Ref} src="/realtora-real-estate/public/images/hoMkKeDJp1rMS99FfvGiuFk8Vsc.webp" className="absolute object-cover shadow-xl" style={{ bottom: '15%', left: '10%', width: '240px', height: '180px', borderRadius: '0px' }} />
        <img ref={img3Ref} src="/realtora-real-estate/public/images/hhMQHZPK2Han8nGE8ZGJzzB2Mo.webp" className="absolute object-cover shadow-xl" style={{ top: '15%', right: '15%', width: '240px', height: '140px', borderRadius: '0px' }} />
        <img ref={img4Ref} src="/realtora-real-estate/public/images/QHrU5R2YxV6j0vFGDThc7hSgGKw.webp" className="absolute object-cover shadow-xl" style={{ bottom: '15%', right: '10%', width: '220px', height: '140px', borderRadius: '0px' }} />

        {/* Center Reveal Image */}
        <div 
          ref={centerImgWrapperRef} 
          className="absolute z-20 flex items-end justify-start overflow-hidden pointer-events-auto" 
          style={{ width: '0px', height: '0px', borderRadius: '50%', left: '50%', top: '50%', border: 'none', outline: 'none', boxShadow: 'none' }}
          onMouseEnter={() => {
            gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          }}
          onMouseLeave={() => {
            gsap.to(cursorRef.current, { opacity: 0, scale: 0.5, duration: 0.3, ease: "power2.in", overwrite: "auto" });
          }}
        >
          <img ref={centerImgRef} src="/realtora-real-estate/public/images/OaySddwc0ovmBM0gb4ic04QX1Ls.jpeg" className="w-full h-full object-cover absolute inset-0 pointer-events-none" style={{ border: 'none', outline: 'none' }} />
          
          {/* Overlay Content */}
          <div ref={overlayTextRef} className="relative z-30 flex flex-col items-center justify-end w-full h-full" style={{ padding: '40px', paddingBottom: '8%', background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)' }}>
             <div className="text-center">
               <h3 style={{ color: '#fff', fontSize: '56px', fontWeight: 500, margin: 0, fontFamily: '"Outfit", sans-serif', letterSpacing: '-1px' }}>Horizon Villa</h3>
               <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', margin: 0, fontFamily: '"Inter", sans-serif', textTransform: 'uppercase' }}>Mystic Falls, Azure Ridge</p>
             </div>
          </div>
        </div>

      </div>

      {/* Custom Cursor */}
      <div 
        ref={cursorRef} 
        className="fixed z-50 pointer-events-none flex items-center justify-center bg-white shadow-lg"
        style={{ 
          width: '120px', height: '48px', borderRadius: '100px',
          opacity: 0, 
          transform: 'scale(0.5)',
          top: 0, left: 0
        }}
      >
        <span style={{ fontSize: '15px', fontWeight: 500, color: '#191919', fontFamily: '"Inter", sans-serif' }}>View Details</span>
      </div>
    </section>
  );
}

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current.children, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, 
          duration: 0.8, 
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%"
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: "Lifestyle-Centric Living",
      image: "/realtora-real-estate/public/images/jFZ7UpAtLOeVJGXeZX6K072gE.png",
      description: "Thoughtfully planned spaces that fit the pace of real life, with room to grow, recharge, and gather."
    },
    {
      title: "Prime Residential Locations",
      image: "/realtora-real-estate/public/images/j8wE7PNwqxKHejAbpdrhyVl79s8.webp",
      description: "From upscale neighborhoods to emerging hotspots, each address is chosen for its value and vibrance."
    },
    {
      title: "Smart Sustainable Features",
      image: "/realtora-real-estate/public/images/ZpjnjMU3ELZv5AhKRQMj99dRIk.png",
      description: "Enjoy future-ready homes equipped with eco-conscious technology and intelligent design."
    },
    {
      title: "End-to-End Support",
      image: "/realtora-real-estate/public/images/bJ5HA9CE0X9HXUh4sJsZJh6xb40.png",
      description: "From discovery to handover, our experts guide you through every step for a smooth, stress-free journey."
    }
  ];

  return (
    <section id="features" ref={sectionRef} className="w-full flex flex-col items-center relative z-10" style={{ backgroundColor: '#f9f9f9', padding: '200px 5% 120px 5%', marginTop: '-1px' }}>
      {/* Header */}
      <div ref={headerRef} className="flex flex-col items-center text-center" style={{ maxWidth: '800px', marginBottom: '80px' }}>

        
        <h2 style={{ fontSize: '56px', fontWeight: 500, color: '#191919', fontFamily: 'var(--font-poppins), sans-serif', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '24px' }}>
          Why Thousands Trust Us to Find Their Next Home
        </h2>
        
        <p style={{ fontSize: '16px', color: '#757575', fontFamily: '"Inter", sans-serif', lineHeight: 1.6, textAlign: 'center', textTransform: 'none' }}>
          More than listings, we deliver guidance, peace of mind,<br />smarter decisions, and smoother experiences.
        </p>
      </div>

      {/* Main Content: 2 Columns */}
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-start justify-center" style={{ gap: '80px' }}>
        
        {/* Left: Tabs */}
        <div className="w-full md:w-[35%] flex flex-col" style={{ height: '340px' }}>
          {features.map((feature, idx) => {
            const isActive = activeTab === idx;
            return (
              <div 
                key={idx}
                onClick={() => setActiveTab(idx)}
                className="w-full flex items-center cursor-pointer transition-all duration-300 flex-1"
                style={{
                  borderBottom: '1px solid #e6e6e6',
                  opacity: isActive ? 1 : 0.6
                }}
              >
                {/* Dot */}
                <div style={{ 
                  width: '6px', height: '6px', borderRadius: '50%', 
                  backgroundColor: isActive ? '#191919' : 'transparent',
                  marginRight: '20px',
                  transition: 'background-color 0.3s'
                }} />
                
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: isActive ? 700 : 600, 
                  color: isActive ? '#191919' : '#9e9e9e',
                  fontFamily: '"Outfit", sans-serif',
                  margin: 0,
                  transition: 'color 0.3s'
                }}>
                  {feature.title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Right: Image */}
        <div className="w-full md:w-[45%] flex flex-col">
          <div className="relative w-full" style={{ height: '340px', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px' }}>
            {features.map((feature, idx) => (
              <img 
                key={idx}
                src={feature.image} 
                alt={feature.title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                style={{ opacity: activeTab === idx ? 1 : 0 }}
              />
            ))}
          </div>
          <div className="relative w-full h-[60px]">
            {features.map((feature, idx) => (
              <p 
                key={idx}
                className="absolute top-0 left-0 transition-opacity duration-500"
                style={{ 
                  opacity: activeTab === idx ? 1 : 0, 
                  fontSize: '16px', 
                  color: '#191919', 
                  fontFamily: '"Inter", sans-serif',
                  lineHeight: 1.5,
                  textTransform: 'none',
                  maxWidth: '100%'
                }}
              >
                {feature.description}
              </p>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

const BlogsSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);

  const blogs = [
    {
      title: "Your Luxury Sanctuary: Quick Home Design Tips",
      date: "Dec 7, 2024",
      readTime: "7 min read",
      image: "/realtora-real-estate/public/images/CR9WCJs8QkwyR05G5BzUHipBX8.webp"
    },
    {
      title: "How to Choose the Perfect Home for Your Family",
      date: "Sep 3, 2025",
      readTime: "10 min read",
      image: "/realtora-real-estate/public/images/sTu9AUvn0LRJMxRSYiuilf4brfc.webp"
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade in header elements
      gsap.fromTo(headerRef.current.children, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, 
          duration: 0.8, 
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%"
          }
        }
      );

      // Tilt-in effect for images
      const images = [img1Ref.current, img2Ref.current];
      images.forEach((item, index) => {
        if (!item) return;
        const isLeft = index % 2 === 0;
        gsap.set(item, {
          y: "60%",
          rotation: isLeft ? -15 : 15,
          transformOrigin: "center center",
        });
      });

      // Fade in cards
      gsap.fromTo([card1Ref.current, card2Ref.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%"
          }
        }
      );

      // Animate inner images
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.to(images, {
            y: 0,
            rotation: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.2,
          });
        }
      });

      // Animate inner text
      const cards = [card1Ref.current, card2Ref.current];
      cards.forEach((card, i) => {
        if (!card) return;
        const texts = card.querySelectorAll('.blog-text-anim');
        if (texts.length > 0) {
          gsap.fromTo(texts, 
            { opacity: 0, y: 30 }, 
            { 
              opacity: 1, 
              y: 0, 
              duration: 1.5, 
              stagger: 0.3, 
              ease: "power2.out", 
              delay: i * 0.2 + 0.6,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%"
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="blog" className="w-full flex flex-col items-center" style={{ backgroundColor: '#f9f9f9', padding: '120px 5%' }}>
      
      {/* Header Container */}
      <div className="w-full max-w-[1000px] flex flex-col relative" style={{ marginBottom: '80px' }}>
        

        {/* Title & Subtitle vs Button layout */}
        <div className="w-full flex flex-col md:flex-row justify-between items-end">
          
          <div ref={headerRef} className="flex flex-col" style={{ maxWidth: '600px' }}>
            <h2 style={{ fontSize: '56px', fontWeight: 500, color: '#191919', fontFamily: 'var(--font-poppins), sans-serif', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '16px' }}>
              Your Guide to Smart Home Buying
            </h2>
            <p style={{ fontSize: '18px', color: '#757575', fontFamily: '"Inter", sans-serif', lineHeight: 1.6, textTransform: 'none' }}>
              Read our latest articles on market trends,<br />financing tips, and home improvement ideas.
            </p>
          </div>

          {/* View All Button */}
          <button 
            className="group flex items-center justify-center transition-all duration-300 hover:bg-black hover:text-white"
            style={{ 
              padding: '12px 24px', 
              borderRadius: '30px', 
              border: '1px solid #191919',
              backgroundColor: 'transparent',
              marginTop: '24px'
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 500, color: '#191919', fontFamily: '"Inter", sans-serif', marginRight: '12px' }}>View All</span>
            <div className="flex items-center justify-center bg-black group-hover:bg-white text-white group-hover:text-black transition-colors duration-300" style={{ width: '28px', height: '28px', borderRadius: '50%' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </div>
          </button>

        </div>
      </div>

      {/* Cards Grid */}
      <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2" style={{ gap: '40px' }}>
        
        {/* Card 1 */}
        <div ref={card1Ref} className="group cursor-pointer flex flex-col" style={{ backgroundColor: '#f3f4f6', borderRadius: '16px', overflow: 'hidden' }}>
          <div ref={img1Ref} className="w-full overflow-hidden" style={{ height: '300px' }}>
            <img 
              src={blogs[0].image} 
              alt={blogs[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col" style={{ padding: '24px' }}>
            <h3 className="blog-text-anim transition-colors duration-300 group-hover:text-gray-600" style={{ fontSize: '22px', fontWeight: 600, color: '#191919', fontFamily: '"Outfit", sans-serif', lineHeight: 1.4, marginBottom: '32px' }}>
              {blogs[0].title}
            </h3>
            <div className="blog-text-anim flex items-center justify-between" style={{ fontSize: '15px', color: '#757575', fontFamily: '"Inter", sans-serif' }}>
              <span>{blogs[0].date}</span>
              <span>{blogs[0].readTime}</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div ref={card2Ref} className="group cursor-pointer flex flex-col" style={{ backgroundColor: '#f3f4f6', borderRadius: '16px', overflow: 'hidden' }}>
          <div ref={img2Ref} className="w-full overflow-hidden" style={{ height: '300px' }}>
            <img 
              src={blogs[1].image} 
              alt={blogs[1].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col" style={{ padding: '24px' }}>
            <h3 className="blog-text-anim transition-colors duration-300 group-hover:text-gray-600" style={{ fontSize: '22px', fontWeight: 600, color: '#191919', fontFamily: '"Outfit", sans-serif', lineHeight: 1.4, marginBottom: '32px' }}>
              {blogs[1].title}
            </h3>
            <div className="blog-text-anim flex items-center justify-between" style={{ fontSize: '15px', color: '#757575', fontFamily: '"Inter", sans-serif' }}>
              <span>{blogs[1].date}</span>
              <span>{blogs[1].readTime}</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const sliderRef = useRef(null);
  const imageSliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Charlotte Bennett",
      avatar: "/realtora-real-estate/public/images/z576pxgMO7uqozxes3YJljpu2s.webp",
      text: "“Exceptional service from start to finish. We found the perfect apartment that truly feels like home.”",
      image: "/realtora-real-estate/public/images/KYjiPvPFQrnxGJ1Rl36Vgqtiw.png"
    },
    {
      name: "Emily John",
      avatar: "/realtora-real-estate/public/images/V09GjbzLmn3SKxc0QOInwAHfw.webp",
      text: "“We couldn’t have asked for a better experience! From the moment we reached out, the team went above and beyond to find us the perfect home. Highly recommend!”",
      image: "/realtora-real-estate/public/images/CR9WCJs8QkwyR05G5BzUHipBX8.webp"
    },
    {
      name: "Henry Caldwell",
      avatar: "/realtora-real-estate/public/images/Y7Io1rEQTpr82XSw3hvUWDoM.webp",
      text: "“From virtual tours to final signing, the process was seamless. We couldn’t be happier with our new home.”",
      image: "/realtora-real-estate/public/images/wJUahXSEUzCrb6zS2SKNWdm2S0.png"
    }
  ];

  const slideTo = (index) => {
    setCurrentIndex(index);
    gsap.to(imageSliderRef.current, {
      xPercent: -(100 / testimonials.length) * index,
      duration: 0.6,
      ease: "power2.inOut"
    });
  };

  const handleNext = () => {
    slideTo((currentIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    slideTo(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current.children, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full flex flex-col items-center overflow-hidden" style={{ backgroundColor: '#f9f9f9', padding: '120px 5%' }}>
      <div ref={headerRef} className="w-full max-w-[1000px] flex flex-col relative" style={{ marginBottom: '100px' }}>

        <h2 style={{ fontSize: '56px', fontWeight: 500, color: '#191919', fontFamily: 'var(--font-poppins), sans-serif', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '16px' }}>What Our Clients says</h2>
        <p style={{ fontSize: '18px', color: '#757575', fontFamily: '"Inter", sans-serif', lineHeight: 1.6, maxWidth: '500px', textTransform: 'none' }}>More than listing, we deliver peace of mind,<br />smarter decisions, and smoother experiences.</p>
      </div>

      <div ref={contentRef} className="w-full max-w-[1000px] flex flex-col md:flex-row items-stretch justify-center" style={{ gap: '80px' }}>
        
        <div className="w-full md:w-[40%] flex flex-col justify-end pb-2">
          <div className="w-full relative" style={{ height: '240px' }}>
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="absolute inset-0 flex flex-col justify-end h-full transition-all duration-500" 
                style={{ 
                  opacity: idx === currentIndex ? 1 : 0, 
                  transform: `translateX(${idx === currentIndex ? 0 : (idx < currentIndex ? -20 : 20)}px)`,
                  pointerEvents: idx === currentIndex ? 'auto' : 'none' 
                }}
              >
                <div className="flex items-center" style={{ marginBottom: '24px' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', marginRight: '20px' }}>
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#191919', fontFamily: '"Outfit", sans-serif', margin: 0 }}>
                    {t.name}
                  </h3>
                </div>
                <p style={{ fontSize: '18px', color: '#757575', fontFamily: '"Inter", sans-serif', lineHeight: 1.6, paddingRight: '20px', textTransform: 'none' }}>
                  {t.text}
                </p>
              </div>
            ))}
          </div>
          
          <div className="flex items-center" style={{ gap: '16px', marginTop: '32px' }}>
            <button onClick={handlePrev} className="flex items-center justify-center bg-[#191919] text-white hover:bg-black transition-colors" style={{ width: '48px', height: '48px', borderRadius: '50%' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"></path></svg>
            </button>
            <button onClick={handleNext} className="flex items-center justify-center bg-[#191919] text-white hover:bg-black transition-colors" style={{ width: '48px', height: '48px', borderRadius: '50%' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"></path></svg>
            </button>
          </div>
        </div>

        <div className="w-full md:w-[45%] overflow-hidden relative" style={{ height: '340px', borderRadius: '16px' }}>
           <div ref={imageSliderRef} className="flex h-full w-[300%] absolute left-0 top-0">
             {testimonials.map((t, idx) => (
                <div key={idx} className="h-full p-0" style={{ width: '33.333%' }}>
                  <img 
                    src={t.image} 
                    alt="Property"
                    className="w-full h-full object-cover"
                    style={{ borderRadius: '16px' }}
                  />
                </div>
             ))}
           </div>
        </div>

      </div>
    </section>
  );
};


export const FaqsSection = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "Can I get help with paperwork and registration?",
      answer: "Yes, our expert team provides full assistance with all legal paperwork, registration processes, and documentation to ensure a seamless and hassle-free experience."
    },
    {
      question: "What if I'm looking for a home loan?",
      answer: "We partner with leading banks and financial institutions to help you secure the best home loan options with attractive interest rates and quick processing."
    },
    {
      question: "How quickly can I schedule a property visit?",
      answer: "You can schedule a property visit within 24 hours. Our agents are flexible and will coordinate a time that best suits your convenience."
    },
    {
      question: "Are your listings updated regularly?",
      answer: "Absolutely! We update our property listings daily to ensure you have access to the latest available homes, apartments, and commercial spaces."
    },
    {
      question: "Can I sell my property here?",
      answer: "Yes, you can list your property with us. Our marketing experts will ensure your listing reaches the right buyers for a quick and profitable sale."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
      gsap.fromTo(rightRef.current.children,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full flex flex-col items-center" style={{ backgroundColor: '#f9f9f9', padding: '120px 5%' }}>
      <div className="w-full max-w-[1000px] flex flex-col md:flex-row items-start justify-between" style={{ gap: '80px' }}>
        
        {/* Left Column */}
        <div ref={leftRef} className="w-full md:w-[45%] flex flex-col">

          
          <h2 style={{ fontSize: '44px', fontWeight: 500, color: '#191919', fontFamily: 'var(--font-poppins), sans-serif', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '24px' }}>
            Got Questions? We've Got Answers
          </h2>
          
          <p style={{ fontSize: '18px', color: '#757575', fontFamily: '"Inter", sans-serif', lineHeight: 1.6, marginBottom: '40px', maxWidth: '400px', textTransform: 'none' }}>
            Everything you need to know about buying, selling, and renting with confidence.
          </p>

          <button className="flex items-center justify-between self-start transition-all hover:bg-[#333]" style={{ backgroundColor: '#000000', color: '#fff', padding: '10px 10px 10px 32px', borderRadius: '50px', fontSize: '18px', fontWeight: 500, fontFamily: '"Inter", sans-serif' }}>
            <span style={{ marginRight: '16px' }}>Get in Touch</span>
            <div className="flex items-center justify-center bg-white text-black" style={{ width: '44px', height: '44px', borderRadius: '50%' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </button>
        </div>

        {/* Right Column: Accordion */}
        <div ref={rightRef} className="w-full md:w-[55%] flex flex-col" style={{ marginTop: '-30px' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} className="w-full flex flex-col cursor-pointer border-b border-[#e5e5e5] transition-colors" onClick={() => toggleFaq(idx)} style={{ padding: '24px 0' }}>
              <div className="w-full flex items-center justify-between">
                <h3 style={{ fontSize: '20px', fontWeight: 500, color: '#191919', fontFamily: '"Inter", sans-serif', margin: 0, paddingRight: '20px' }}>
                  {faq.question}
                </h3>
                <div className="flex items-center justify-center transition-transform duration-300" style={{ transform: openFaq === idx ? 'rotate(45deg)' : 'rotate(0deg)', minWidth: '24px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </div>
              <div className="overflow-hidden transition-all duration-500" style={{ maxHeight: openFaq === idx ? '200px' : '0px', opacity: openFaq === idx ? 1 : 0 }}>
                <p style={{ fontSize: '16px', color: '#757575', fontFamily: '"Inter", sans-serif', lineHeight: 1.6, marginTop: '16px', paddingRight: '40px', textTransform: 'none' }}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export const FooterSection = () => {
  const sectionRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(topRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
      gsap.fromTo(bottomRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 50%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="w-full relative flex flex-col items-center overflow-hidden" style={{ minHeight: '700px', padding: '100px 5% 60px 5%' }}>
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img src="/realtora-real-estate/public/images/BBK7G2W0GpZei2zukI6jNqEI6X4.jpeg" alt="Footer Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a]"></div>
      </div>

      {/* Top: Newsletter */}
      <div ref={topRef} className="relative z-10 w-full max-w-[800px] flex flex-col items-center text-center" style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '56px', fontWeight: 500, color: '#ffffff', fontFamily: '"Outfit", sans-serif', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '20px' }}>
          Join Our News Letter
        </h2>
        <p style={{ fontSize: '18px', color: '#e5e5e5', fontFamily: '"Inter", sans-serif', lineHeight: 1.6, marginBottom: '40px', maxWidth: '400px' }}>
          Stay informed. Get the best local<br />real estate updates without the fluff.
        </p>

        {/* Form Container */}
        <div className="flex items-center" style={{ gap: '16px' }}>
          <input 
            type="email" 
            placeholder="Enter Your Email"
            className="outline-none placeholder-gray-300"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.4)', 
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              padding: '16px 24px',
              borderRadius: '40px',
              width: '340px',
              fontSize: '16px',
              fontFamily: '"Inter", sans-serif'
            }}
          />
          <button className="transition-transform hover:scale-105" style={{ backgroundColor: '#ffffff', color: '#191919', padding: '16px 36px', borderRadius: '40px', fontSize: '16px', fontWeight: 600, fontFamily: '"Inter", sans-serif' }}>
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom: Footer Links */}
      <div ref={bottomRef} className="relative z-10 w-full max-w-[1200px] flex flex-col md:flex-row justify-between items-start" style={{ marginTop: 'auto', paddingTop: '120px' }}>
        
        {/* Left Side */}
        <div className="flex flex-col" style={{ maxWidth: '300px' }}>
          <h3 style={{ fontSize: '32px', fontWeight: 600, color: '#ffffff', fontFamily: '"Outfit", sans-serif', marginBottom: '16px' }}>
            Panthers
          </h3>
          <p style={{ fontSize: '16px', color: '#a3a3a3', fontFamily: '"Inter", sans-serif', lineHeight: 1.6 }}>
            Start your exciting journey to<br />homeownership right here.
          </p>
        </div>

        {/* Right Side Links */}
        <div className="flex" style={{ gap: '120px' }}>
          
          <div className="flex flex-col">
            <h4 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', fontFamily: '"Inter", sans-serif', marginBottom: '32px' }}>
              Main Pages
            </h4>
            <div className="flex flex-col" style={{ gap: '20px' }}>
              {['Home', 'Projects', 'About', 'Blogs'].map(link => (
                <a key={link} href="#" style={{ fontSize: '16px', color: '#a3a3a3', fontFamily: '"Inter", sans-serif', transition: 'color 0.3s' }} className="hover:text-white">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h4 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', fontFamily: '"Inter", sans-serif', marginBottom: '32px' }}>
              Other pages
            </h4>
            <div className="flex flex-col" style={{ gap: '20px' }}>
              {[
                { name: '404', href: '/404' },
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Terms & Conditions', href: '/terms-conditions' }
              ].map(link => (
                <a key={link.name} href={link.href} style={{ fontSize: '16px', color: '#a3a3a3', fontFamily: '"Inter", sans-serif', transition: 'color 0.3s' }} className="hover:text-white">
                  {link.name}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};


// --- NEW HERO SECTION --- //
const SplitTextWrapper = ({ text, type = "words", addFirstCharClass = false }) => {
  if (type === "words") {
    return text.split(" ").map((word, wIdx) => (
      <span key={wIdx} className="word inline-block relative overflow-hidden" style={{ marginRight: '0.25em' }}>
        <span className="inline-block translate-y-full will-change-transform">{word}</span>
      </span>
    ));
  } else if (type === "words, chars") {
    return text.split(" ").map((word, wIdx) => (
      <span key={wIdx} className="word inline-block" style={{ marginRight: '0.25em' }}>
        {word.split("").map((char, cIdx) => (
          <span key={cIdx} className={`char inline-block relative overflow-hidden ${addFirstCharClass && wIdx === 0 && cIdx === 0 ? 'first-char origin-top-left' : ''}`} style={{ marginTop: '0.75rem' }}>
            <span className="inline-block -translate-y-full will-change-transform">{char}</span>
          </span>
        ))}
      </span>
    ));
  }
};

const HeroSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!gsap.parseEase("hop")) {
        CustomEase.create("hop", ".8, 0, .3, 1");
      }

      const isMobile = window.innerWidth <= 1000;

      gsap.set(
        [
          ".split-overlay .intro-title .first-char span",
          ".split-overlay .outro-title .char span",
        ],
        { y: "0%" }
      );

      gsap.set(".split-overlay .intro-title .first-char", {
        x: isMobile ? "7.5rem" : "18rem",
        y: isMobile ? "-1rem" : "-2.75rem",
        fontWeight: "900",
        scale: 0.75,
      });

      gsap.set(".split-overlay .outro-title .char", {
        x: isMobile ? "-3rem" : "-8rem",
        fontSize: isMobile ? "6rem" : "14rem",
        fontWeight: "500",
      });

      const tl = gsap.timeline({ defaults: { ease: "hop" } });
      const tags = gsap.utils.toArray(".tag");

      tags.forEach((tag, index) => {
        tl.to(
          tag.querySelectorAll(".word span"),
          {
            y: "0%",
            duration: 0.75,
          },
          0.5 + index * 0.1
        );
      });

      tl.to(
        ".preloader .intro-title .char span",
        {
          y: "0%",
          duration: 0.75,
          stagger: 0.05,
        },
        0.5
      )
        .to(
          ".preloader .intro-title .char:not(.first-char) span",
          {
            y: "100%",
            duration: 0.75,
            stagger: 0.05,
          },
          2
        )
        .to(
          ".preloader .outro-title .char span",
          {
            y: "0%",
            duration: 0.75,
            stagger: 0.075,
          },
          2.5
        )
        .to(
          ".preloader .intro-title .first-char",
          {
            x: isMobile ? "9rem" : "21.25rem",
            duration: 1,
          },
          3.5
        )
        .to(
          ".preloader .outro-title .char",
          {
            x: isMobile ? "-3rem" : "-8rem",
            duration: 1,
          },
          3.5
        )
        .to(
          ".preloader .intro-title .first-char",
          {
            x: isMobile ? "7.5rem" : "18rem",
            y: isMobile ? "-1rem" : "-2.75rem",
            fontWeight: "900",
            scale: 0.75,
            duration: 0.75,
          },
          4.5
        )
        .to(
          ".preloader .outro-title .char",
          {
            x: isMobile ? "-3rem" : "-8rem",
            fontSize: isMobile ? "6rem" : "14rem",
            fontWeight: "500",
            duration: 0.75,
            onComplete: () => {
              gsap.set(".preloader", {
                clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
              });
              gsap.set(".split-overlay", {
                clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
              });
            },
          },
          4.5
        )
        .to(
          ".hero-container",
          {
            clipPath: "polygon(0% 48%, 100% 48%, 100% 52%, 0% 52%)",
            duration: 1,
          },
          5
        );

      tags.forEach((tag, index) => {
        tl.to(
          tag.querySelectorAll(".word span"),
          {
            y: "100%",
            duration: 0.75,
          },
          5.5 + index * 0.1
        );
      });

      tl.to(
        [".preloader", ".split-overlay"],
        {
          y: (i) => (i === 0 ? "-50%" : "50%"),
          duration: 1,
        },
        6
      )
        .to(
          ".hero-container",
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
          },
          6
        )
        .to(
          ".hero-container .card",
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.75,
          },
          6.25
        )
        .to(
          ".hero-container .card h1 .char span",
          {
            y: "0%",
            duration: 0.75,
            stagger: 0.05,
          },
          6.5
        )
        .to([".preloader", ".split-overlay", ".tags-overlay"], {
          display: "none"
        });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full relative h-screen">
      <div className="preloader">
        <div className="intro-title">
          <h1 className="uppercase text-6xl font-semibold leading-none"><SplitTextWrapper text="Panthers Estate" type="words, chars" addFirstCharClass={true} /></h1>
        </div>
        <div className="outro-title">
          <h1 className="uppercase text-6xl font-semibold leading-none"><SplitTextWrapper text="PE" type="words, chars" /></h1>
        </div>
      </div>
      <div className="split-overlay">
        <div className="intro-title">
          <h1 className="uppercase text-6xl font-semibold leading-none"><SplitTextWrapper text="Panthers Estate" type="words, chars" addFirstCharClass={true} /></h1>
        </div>
        <div className="outro-title">
          <h1 className="uppercase text-6xl font-semibold leading-none"><SplitTextWrapper text="PE" type="words, chars" /></h1>
        </div>
      </div>
      <div className="tags-overlay">
        <div className="tag tag-1 uppercase font-medium"><SplitTextWrapper text="Luxury Living" type="words" /></div>
        <div className="tag tag-2 uppercase font-medium"><SplitTextWrapper text="Modern Architecture" type="words" /></div>
        <div className="tag tag-3 uppercase font-medium"><SplitTextWrapper text="Prime Locations" type="words" /></div>
      </div>
      <div className="hero-container container">
        <nav className="absolute top-0 left-0 w-full z-10 text-white flex justify-between p-8">
          <p id="logo" className="font-semibold text-xl">Panthers</p>
          <p>Menu</p>
        </nav>
        <div className="hero-img absolute w-full h-full inset-0">
          <img src="/realtora-real-estate/public/images/BBK7G2W0GpZei2zukI6jNqEI6X4.jpeg" alt="Panthers Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        <div className="card text-black z-10 flex items-center justify-center" style={{ backgroundColor: '#fff', padding: '2rem' }}>
          <h1 className="uppercase text-5xl font-semibold leading-none"><SplitTextWrapper text="Panthers" type="words, chars" addFirstCharClass={true} /></h1>
        </div>
        <footer className="absolute bottom-0 left-0 w-full z-10 text-white flex justify-between p-8">
          <p className="uppercase font-medium text-sm">Scroll Down</p>
        </footer>
      </div>
    </div>
  );
};
// --- END NEW HERO SECTION --- //

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

  useEffect(() => {
    const healPage = () => {
      // 100ms timeout ensures the browser has fully finished its Back-Forward Cache restoration
      // before we force the video to play and reset the animations. This completely avoids page reloads!
      setTimeout(() => {
        // Force all background videos to play
        document.querySelectorAll('video').forEach(v => {
          if (v.paused) v.play().catch(e => console.log('Autoplay prevented', e));
        });
        
        // Hide loaders if stuck
        const preLoader = document.querySelector('.pre-loader');
        if (preLoader) preLoader.style.display = 'none';
      }, 100);
    };

    healPage(); // Run on fresh mounts
    window.addEventListener("pageshow", healPage); // Run on BFCache restores
    
    return () => window.removeEventListener("pageshow", healPage);
  }, []);
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
    gsap.set(navRef.current, { y: 0, opacity: 1 });

    const slideElements = heroImgsRef.current ? heroImgsRef.current.children : [];
    gsap.set(slideElements, { scale: 1.0, clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)" });

    gsap.set(heroTextLinesRef.current, { y: "0%", rotation: 0, transformOrigin: "left top" });

    // Preloader and loading elements have been removed from the animation timeline.
    if (preLoaderRef.current) gsap.set(preLoaderRef.current, { display: 'none' });
    if (loaderImgRef.current) gsap.set(loaderImgRef.current, { display: 'none' });

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
      const cardImages = featuredSectionRef.current.querySelectorAll('.property-card-img');
      
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

      if (cards.length > 0 && cardImages.length > 0) {
        cardImages.forEach((item, itemIndex) => {
          const isLeftProjectItem = itemIndex % 2 === 0;
          gsap.set(item, {
            y: "60%",
            rotation: isLeftProjectItem ? -15 : 15,
            transformOrigin: "center center",
          });
        });

        // Trigger animation per row using the static container
        for (let i = 0; i < cards.length; i += 2) {
          const rowImages = [cardImages[i], cardImages[i+1]].filter(Boolean);
          
          ScrollTrigger.create({
            trigger: cards[i], // Use the static card wrapper as trigger, not the translated image
            start: "top 95%",
            onEnter: () => {
              gsap.to(rowImages, {
                y: 0,
                rotation: 0,
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.2,
              });
            },
          });
        }
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
      // tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#000000] text-[#f2f2f2] select-none overflow-x-hidden">
      <P10HeroSection />

      {/* 2. Navigation & Full Screen Menu Overlay */}
      <MenuOverlay containerRef={containerRef} navRef={navRef} />

      {/* 3. Main Hero Website Section Wrapped in Container for Rotation */}
      <div className="app-container" ref={containerRef}>
        
        {/* 4. About Us Section (Who Are We) */}
        <section 
          id="about"
          ref={aboutSectionRef}
          className="relative w-full flex flex-col items-center overflow-hidden"
          style={{ paddingTop: '100px', paddingBottom: '100px', paddingLeft: '5%', paddingRight: '5%', backgroundColor: '#f9f9f9', fontFamily: '"Inter", sans-serif' }}
        >


          {/* Centered Large Text */}
          <div style={{ maxWidth: '850px', textAlign: 'center', marginBottom: '40px' }} ref={el => aboutTextRefs.current[1] = el}>
            <p style={{ fontSize: '30px', fontWeight: 400, color: '#191919', lineHeight: '1.5', margin: 0 }}>
              At Panthers, we believe a home is life's most important foundation. Our mission is to find your perfect habitat so you can comfortably build your future and best life.
            </p>
          </div>


        </section>

        {/* 4.5 Insights Marquee Section */}
        <InsightsMarqueeSection />

        {/* 5. Explore Properties Section */}
        <section 
          id="properties"
          ref={featuredSectionRef}
          className="relative w-full flex flex-col items-center overflow-hidden"
          style={{ paddingBottom: '100px', paddingTop: '200px', paddingLeft: '5%', paddingRight: '5%', backgroundColor: '#f9f9f9', fontFamily: '"Inter", sans-serif' }}
        >
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end" style={{ maxWidth: '1000px', marginBottom: '80px' }}>
            
            {/* Left Text Block */}
            <div className="flex flex-col items-start" style={{ maxWidth: '600px' }}>

              <h2 className="featured-header" style={{ fontSize: '44px', fontWeight: 500, color: '#191919', fontFamily: 'var(--font-poppins), sans-serif', letterSpacing: '-0.5px', lineHeight: '1.1em', margin: '0 0 16px 0' }}>
                Explore Properties
              </h2>
              <p className="featured-header" style={{ fontSize: '16px', color: '#666', lineHeight: '1.5em', margin: 0, maxWidth: '450px', textTransform: 'none' }}>
                Luxury villas, smart apartments, commercial spaces.<br />All verified and ready for you.
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
          <div className="w-full grid grid-cols-1 md:grid-cols-2" style={{ maxWidth: '1000px', gap: '40px' }}>
            {propertiesList.map((property, idx) => (
              <PropertyCard key={idx} property={property} index={idx} />
            ))}
          </div>
        </section>
        
        {/* 6. Discover Spaces Section */}
        <DiscoverSpacesSection />
        <FeaturesSection />
        <BlogsSection />
        <TestimonialsSection />
        <FaqsSection />
        <FooterSection />

              </div>
    </div>
  );
}
