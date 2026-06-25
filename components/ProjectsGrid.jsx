"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MenuOverlay from "./MenuOverlay";
import FooterSection from "./FooterSection";

const projectsData = [
  {
    slug: "velora",
    title: "Velora",
    location: "Levallois",
    filterName: "Residential",
    year: "2025",
    color: "hsla(16, 58.87%, 42.88%, 1.00)",
    price: "$1,600,000", bedrooms: 5, bathrooms: 5, sqft: "4,500",
    img: "/assets/new villa.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/MERSI x LEVALLOIS-9.png"
  },
  {
    slug: "hillcrest",
    title: "Hillcrest",
    location: "Paris 8",
    filterName: "Hospitality",
    year: "2025",
    color: "#657b69",
    price: "$1,875,000", bedrooms: 6, bathrooms: 8, sqft: "3,800",
    img: "/assets/p36i3IJiJzBK4cHjJGtkOkx4M.jpeg",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/MERSI x MAURICE_-10.png"
  },
  {
    slug: "marvelle",
    title: "Marvelle",
    location: "Paris 8",
    filterName: "Residential",
    year: "2025",
    color: "#aaa798",
    price: "$2,250,000", bedrooms: 5, bathrooms: 5, sqft: "4,000",
    img: "/assets/new villa 3.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/CC_MERSIxBERRI-16 (1).png"
  },
  {
    slug: "pinecrest",
    title: "Pinecrest",
    location: "Paris 17",
    filterName: "Hospitality",
    year: "2025",
    color: "#dc633f",
    price: "$2,500,000", bedrooms: 4, bathrooms: 3, sqft: "3,200",
    img: "/assets/BBK7G2W0GpZei2zukI6jNqEI6X4.jpeg",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover L_1.png"
  },
  {
    slug: "grandcrest",
    title: "Grandcrest",
    location: "Paris 7",
    filterName: "Residential",
    year: "2025",
    color: "#918f7a",
    price: "$1,450,000", bedrooms: 4, bathrooms: 4, sqft: "3,500",
    img: "/assets/CR9WCJs8QkwyR05G5BzUHipBX8.webp",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover L_2.png"
  },
  {
    slug: "willowood",
    title: "Willowood",
    location: "Paris 6",
    filterName: "Residential",
    year: "2025",
    color: "#b3a696",
    price: "$3,100,000", bedrooms: 7, bathrooms: 6, sqft: "5,200",
    img: "/assets/new villa 4.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover L_3.png"
  },
  {
    slug: "highlander",
    title: "Highlander",
    location: "Levallois",
    filterName: "Retail",
    year: "2025",
    color: "#dc8b3f",
    price: "$950,000", bedrooms: 3, bathrooms: 2, sqft: "2,100",
    img: "/assets/new villa 5.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/MERSI x AURÉLIEN COHEN-1 copie (1).png"
  },
  {
    slug: "brookstone",
    title: "Brookstone",
    location: "Paris 15",
    filterName: "Residential",
    year: "2025",
    color: "#8b9ec1",
    price: "$1,200,000", bedrooms: 4, bathrooms: 3, sqft: "2,800",
    img: "/assets/new villa 6.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover L.png"
  },
  {
    slug: "greenvale",
    title: "Greenvale",
    location: "Paris 1",
    filterName: "Residential",
    year: "2024",
    color: "#ccb598",
    price: "$4,500,000", bedrooms: 8, bathrooms: 8, sqft: "6,000",
    img: "/assets/new villa 7.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/CC_MERSI x RUE DE LA PAIX-16.png"
  },
  {
    slug: "velora-2",
    title: "Velora",
    location: "Levallois",
    filterName: "Residential",
    year: "2025",
    color: "hsla(16, 58.87%, 42.88%, 1.00)",
    price: "$1,600,000", bedrooms: 5, bathrooms: 5, sqft: "4,500",
    img: "/assets/new villa 8.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/MERSI x LEVALLOIS-9.png"
  }
];


function ProjectCard({ project, index, total }) {
  const imgRef    = useRef(null);
  const cursorRef = useRef(null);
  const linkRef   = useRef(null);

  // --- Custom round cursor ---
  const handleMouseMove = (e) => {
    if (!linkRef.current || !cursorRef.current) return;
    const rect = linkRef.current.getBoundingClientRect();
    gsap.to(cursorRef.current, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      xPercent: -50,
      yPercent: -50,
      duration: 0.2, overwrite: 'auto',
    });
  };
  const handleMouseEnter = () => gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.5)', xPercent: -50, yPercent: -50 });
  const handleMouseLeave = () => gsap.to(cursorRef.current, { scale: 0.5, opacity: 0, duration: 0.3, ease: 'power2.in', xPercent: -50, yPercent: -50 });

  return (
    <div className="project-card-wrapper w-full" style={{ marginBottom: '8rem' }}>

      {/* Placeholder maintains the space in the grid */}
      <div className="project-card-placeholder w-full relative" style={{ aspectRatio: '1/1' }}>
        
        {/* Animated container transitions from strip to grid */}
        <div
          className="project-card-animated"
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            overflow: 'hidden',
            borderRadius: '16px', // Rounded corners to match screenshot
            transformOrigin: 'top left',
            zIndex: 5,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link href={`/projects/${project.slug}`} ref={linkRef} className="group" style={{ display: 'block', width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>

            <div ref={imgRef} style={{ width: '100%', height: '100%' }}>
              <img
                src={project.img}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                className="group-hover:scale-[1.05] transition-transform duration-700"
              />
            </div>

            {/* Custom pill cursor */}
            <div
              ref={cursorRef}
              style={{
                position: 'absolute', top: 0, left: 0,
                padding: '12px 24px', borderRadius: '9999px',
                backgroundColor: '#FFFFFF', color: '#1A1A1A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none', zIndex: 20,
                opacity: 0, transform: 'scale(0.5)',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <span style={{ fontFamily: '"Roboto", sans-serif', fontSize: '15px', fontWeight: 500, letterSpacing: '0' }}>View Details</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Label below image — fades in after reveal */}
      <div
        className="project-card-label"
        style={{
          display: 'flex', flexDirection: 'column', gap: '0.5rem',
          marginTop: '1.25rem',
          fontFamily: '"Roboto", sans-serif',
          opacity: 0, // initially hidden
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1a1a1a' }}>
            {project.title}
          </span>
          <span style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1a1a1a' }}>
            {project.price}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 400, color: '#666' }}>
            {project.bedrooms} Bedrooms
          </span>
          <span style={{ fontSize: '0.875rem', fontWeight: 400, color: '#ccc' }}>•</span>
          <span style={{ fontSize: '0.875rem', fontWeight: 400, color: '#666' }}>
            {project.bathrooms} Bathrooms
          </span>
          <span style={{ fontSize: '0.875rem', fontWeight: 400, color: '#ccc' }}>•</span>
          <span style={{ fontSize: '0.875rem', fontWeight: 400, color: '#666' }}>
            {project.sqft} SQ.FT
          </span>
        </div>
      </div>

    </div>
  );
}

export default function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const gridRef = useRef(null);

  const filterOptions = [
    { id: "Residential", label: "Résidentiel" },
    { id: "Retail", label: "Retail" },
    { id: "Hospitality", label: "Hospitality" }
  ];

  const filteredProjects = activeFilter === "All"
    ? projectsData
    : projectsData.filter(project => project.filterName === activeFilter);

  const handleFilterClick = (filterId) => {
    if (activeFilter === filterId) {
      setActiveFilter("All");
    } else {
      setActiveFilter(filterId);
    }
  };

  // Global Grid Animation: Strip to Grid
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // Wait a tiny bit for layout to settle, or use requestAnimationFrame
    const ctx = gsap.context(() => {
      const placeholders = gsap.utils.toArray('.project-card-placeholder');
      const animatedCards = gsap.utils.toArray('.project-card-animated');
      const labels = gsap.utils.toArray('.project-card-label');

      if (!placeholders.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.projects-page-wrapper',
          start: 'top top',
          end: '+=1000', // Scroll distance for transition to complete
          scrub: 1,
        }
      });

      const numCards = placeholders.length;
      const clientWidth = document.documentElement.clientWidth;
      // Define the strip at the bottom of the viewport
      const stripHeight = window.innerHeight * 0.25; // 25vh height
      const stripGap = 16; // 16px gap between images
      const totalGaps = numCards > 1 ? (numCards - 1) * stripGap : 0;
      
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollX = window.scrollX || document.documentElement.scrollLeft;

      placeholders.forEach((placeholder, i) => {
        const pRect = placeholder.getBoundingClientRect();
        const aCard = animatedCards[i];
        
        // Calculate the absolute initial strip position
        const stripWidth = (clientWidth - totalGaps) / numCards;
        const stripX = i * (stripWidth + stripGap);
        // Move the strip downwards slightly to maintain a nice gap from the heading
        const stripY = window.innerHeight * 0.65 - (stripHeight / 2);
        
        // Calculate placeholder top at scroll=0
        const pTopAtZero = pRect.top + scrollY;
        const pLeftAtZero = pRect.left + scrollX;

        // Delta for gsaps x/y
        const deltaX = stripX - pLeftAtZero;
        const deltaY = stripY - pTopAtZero;

        // Initial strip state
        gsap.set(aCard, {
          x: deltaX,
          y: deltaY,
          width: stripWidth,
          height: stripHeight,
          borderRadius: 0,
        });

        // Animate to natural grid state
        tl.to(aCard, {
          x: 0,
          y: 0,
          width: pRect.width,
          height: pRect.height,
          borderRadius: 4,
          ease: 'power1.inOut',
        }, 0);

        // Fade in labels
        if (labels[i]) {
          tl.to(labels[i], {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.in',
          }, 0.6); // Starts later in the scrub
        }
      });
    }, gridRef);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <div className="projects-page-wrapper w-full bg-[#EDE7DE] select-none relative overflow-x-hidden" style={{ backgroundColor: '#EDE7DE' }}>
      <MenuOverlay isBlackText={true} />
      <nav className="absolute top-0 w-full flex justify-between items-center z-50" style={{ padding: '2rem 4rem' }}>
        <Link href="/" style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', color: '#E05A00', letterSpacing: '1px', textDecoration: 'none' }}>
          PANTHERS
        </Link>
        <div 
          onClick={() => {
            window.dispatchEvent(new CustomEvent('panthers:toggleMenu'));
          }}
          className="relative inline-flex items-center rounded-full border border-[#E05A00] group transition-all duration-300 pointer-events-auto cursor-pointer"
          style={{ height: '48px', paddingLeft: '24px', paddingRight: '6px' }}
        >
          <span 
            className="font-semibold text-[#E05A00]" 
            style={{ fontSize: '15px', letterSpacing: '0.025em', fontFamily: "var(--font-poppins), 'Poppins', sans-serif", marginRight: '16px' }}
          >
            Menu
          </span>
          <div 
            className="flex items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
            style={{ width: '36px', height: '36px', backgroundColor: '#E05A00' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </div>
        </div>
      </nav>
      {/* 2. Hero section — full viewport height, flex col centered */}
      <section style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: '11.25rem 0.625rem 0.625rem',
        boxSizing: 'border-box',
      }}>
        {/* Hero title stacked at top */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', flex: 1, marginTop: '-4rem' }}>
          <h1 style={{
            textAlign: 'center',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-poppins), sans-serif',
            fontSize: '50px',
            fontWeight: 700,
            lineHeight: 0.9,
            letterSpacing: '-0.01em',
            color: '#1a1a1a',
            margin: '0 auto',
            padding: 0,
            whiteSpace: 'normal',
            width: '100%',
            maxWidth: '500px',
          }}>
            Explore Exclusive<br/>Luxury Properties<br/>Designed For You
          </h1>
        </div>
      </section>

      {/* 3. Project Grid */}
      <div style={{ padding: '0 15vw 6.25rem', maxWidth: '1440px', margin: '0 auto' }}>


        {/* Two-Column Aligned Grid */}
        <div ref={gridRef} style={{ display: 'flex', flexDirection: 'row', gap: '6rem', width: '100%', alignItems: 'flex-start' }}>
          {/* Left Column */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
            {filteredProjects
              .filter((_, idx) => idx % 2 === 0)
              .map((project, idx) => (
                <ProjectCard key={project.slug} project={project} index={idx * 2} />
              ))}
          </div>

          {/* Right Column */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
            {filteredProjects
              .filter((_, idx) => idx % 2 === 1)
              .map((project, idx) => (
                <ProjectCard key={project.slug} project={project} index={idx * 2 + 1} />
              ))}
          </div>
        </div>

      </div>

      <FooterSection />
    </div>
  );
}
