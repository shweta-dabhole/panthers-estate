"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from 'next/link';

const projectsData = [
  {
    id: "naya",
    name: "Naya",
    location: "Levallois",
    tag: "Résidentiel",
    year: "2025",
    color: "hsla(16, 58.87%, 42.88%, 1.00)",
    slug: "naya",
    leftImg: "/mersi-scraped-site/cdn.prod.website-files.com/697096b6dde8a7564252bfdd/69a858ffb31f5a2c4b0240d9_MERSI%20x%20LEVALLOIS-9.webp",
    rightImg: "/mersi-scraped-site/cdn.prod.website-files.com/697096b6dde8a7564252bfdd/69a859206f8dac87c4c0b553_MERSI%20x%20LEVALLOIS-2%20(1).webp",
  },
  {
    id: "maurice",
    name: "Maurice Cafe St-Honore",
    location: "Paris 8",
    tag: "Commercial",
    year: "2024",
    color: "#657b69",
    slug: "maurice",
    leftImg: "/mersi-scraped-site/cdn.prod.website-files.com/697096b6dde8a7564252bfdd/69a85c495cbbf3419dbc4ab9_MERSI%20x%20MAURICE_-10.webp",
    rightImg: "/mersi-scraped-site/cdn.prod.website-files.com/697096b6dde8a7564252bfdd/69a85c648569d5ab75b8d1a3_MERSI%20x%20MAURICE_-6.webp",
  },
  {
    id: "berri",
    name: "Berri",
    location: "Paris 8",
    tag: "Résidentiel",
    year: "2024",
    color: "#b3a598",
    slug: "berri",
    leftImg: "/mersi-scraped-site/cdn.prod.website-files.com/697096b6dde8a7564252bfdd/69a85c187ea27e1d8b193ede_CC_MERSIxBERRI-16%20(1).webp",
    rightImg: "/mersi-scraped-site/cdn.prod.website-files.com/697096b6dde8a7564252bfdd/69a85c20c68e51f70e07786b_CC_MERSIxBERRI-24%20(1).webp",
  },
  {
    id: "cook",
    name: "Cook",
    location: "Paris 16",
    tag: "Commercial",
    year: "2023",
    color: "#886e58",
    slug: "cook",
    leftImg: "/mersi-scraped-site/cdn.prod.website-files.com/697096b6dde8a7564252bfdd/699dcdc46ceb478ef3012143_Cover%20L.webp",
    rightImg: "/mersi-scraped-site/cdn.prod.website-files.com/697096b6dde8a7564252bfdd/69a85beae7ee6ecaf8863ba3_CC_Mersi%20x%20Restaurant%20COOK-2.webp",
  }
];

export default function MersiProjectsSlider() {
  const containerRef = useRef(null);
  const leftWrapperRef = useRef(null);
  const rightWrapperRef = useRef(null);
  const btnsWrapperRef = useRef(null);
  
  // Clean refs to avoid React hydration/re-render issues
  const leftRefs = useRef([]);
  const rightRefs = useRef([]);
  const btnRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const totalProjects = projectsData.length;
    
    // Initialize initial state (first slide visible, others clipped)
    gsap.set(leftRefs.current, { 
      clipPath: (i) => i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
      zIndex: (i) => totalProjects - i
    });
    
    gsap.set(rightRefs.current, { 
      clipPath: (i) => i === 0 ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
      zIndex: (i) => totalProjects - i
    });

    gsap.set(btnRefs.current, {
      clipPath: (i) => i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
      zIndex: (i) => totalProjects - i
    });

    // Create the pinned ScrollTrigger timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalProjects * 100}%`, // Scroll duration scales with number of items
          pin: true,
          scrub: 1, // Smooth scrubbing
          onUpdate: (self) => {
            // Determine active index based on scroll progress
            // Progress goes from 0 to 1 over the whole pinned section
            const newIndex = Math.min(
              Math.floor(self.progress * totalProjects),
              totalProjects - 1
            );
            if (newIndex !== activeIndex) {
              setActiveIndex(newIndex);
            }
          }
        }
      });

      // Build the scrubbing animations for each transition
      for (let i = 0; i < totalProjects - 1; i++) {
        // When scrolling down, slide i+1 reveals
        const nextLeft = leftRefs.current[i + 1];
        const nextRight = rightRefs.current[i + 1];
        const nextBtn = btnRefs.current[i + 1];
        
        // We set z-index high for the incoming elements so they appear over the old ones
        tl.set([nextLeft, nextRight, nextBtn], { zIndex: totalProjects + 1 }, i)
          .fromTo(nextLeft, 
            { clipPath: "inset(100% 0% 0% 0%)" }, 
            { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 
            i
          )
          .fromTo(nextRight, 
            { clipPath: "inset(0% 0% 100% 0%)" }, 
            { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 
            i
          )
          .fromTo(nextBtn,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
            i
          );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100vh] overflow-hidden flex flex-col md:flex-row bg-[#191919]"
    >
      {/* Left Slider List */}
      <div 
        ref={leftWrapperRef} 
        className="absolute top-0 left-0 w-full md:w-1/2 h-[50vh] md:h-[100vh]"
      >
        {projectsData.map((project, idx) => (
          <div 
            key={`left-${project.id}`}
            ref={el => leftRefs.current[idx] = el}
            className="absolute top-0 left-0 w-full h-full will-change-transform"
          >
            <img 
              src={project.leftImg} 
              alt={project.name} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Right Slider List */}
      <div 
        ref={rightWrapperRef}
        className="absolute bottom-0 md:top-0 right-0 w-full md:w-1/2 h-[50vh] md:h-[100vh]"
      >
        {projectsData.map((project, idx) => (
          <div 
            key={`right-${project.id}`}
            ref={el => rightRefs.current[idx] = el}
            className="absolute top-0 left-0 w-full h-full will-change-transform"
          >
            <img 
              src={project.rightImg} 
              alt={project.name} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Center Buttons List */}
      <div 
        ref={btnsWrapperRef}
        className="absolute bottom-[2rem] left-1/2 -translate-x-1/2 w-[90%] md:w-auto h-[60px] md:h-[80px] pointer-events-none"
        style={{ zIndex: 100 }}
      >
        {projectsData.map((project, idx) => (
          <div 
            key={`btn-${project.id}`}
            ref={el => btnRefs.current[idx] = el}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-auto"
          >
            <Link 
              href={`/projects/${project.slug}`}
              className="group flex items-center justify-between w-full min-w-[280px] md:min-w-[400px] h-[60px] md:h-[80px] rounded-full px-6 md:px-8 overflow-hidden relative cursor-pointer"
              style={{ backgroundColor: project.color }}
            >
              {/* Project Info Pill */}
              <div className="flex flex-col z-10">
                <h2 className="text-white text-xl md:text-3xl font-medium tracking-tight m-0" style={{ fontFamily: '"Outfit", sans-serif' }}>
                  {project.name}
                </h2>
                <div className="text-white text-sm opacity-80" style={{ fontFamily: '"Inter", sans-serif' }}>
                  {project.location}
                </div>
              </div>

              {/* View Arrow / Hover Expand */}
              <div className="z-10 bg-white/20 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
