"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projectsData = [
  {
    id: "naya",
    name: "Naya",
    location: "Levallois",
    tag: "Résidentiel",
    year: "2025",
    color: "hsla(16, 58.87%, 42.88%, 1.00)",
    leftImg: "/assets/images/69a858ffb31f5a2c4b0240d9_MERSI%20x%20LEVALLOIS-9.webp",
    rightImg: "/assets/images/69a859206f8dac87c4c0b553_MERSI%20x%20LEVALLOIS-2%20(1).webp",
  },
  {
    id: "maurice",
    name: "Maurice Cafe St-Honore",
    location: "Paris 8",
    tag: "Commercial",
    year: "2024",
    color: "#657b69",
    leftImg: "/assets/images/69a85c495cbbf3419dbc4ab9_MERSI%20x%20MAURICE_-10.webp",
    rightImg: "/assets/images/69a85c648569d5ab75b8d1a3_MERSI%20x%20MAURICE_-6.webp",
  },
  {
    id: "berri",
    name: "Berri",
    location: "Paris 8",
    tag: "Résidentiel",
    year: "2024",
    color: "#b3a598",
    leftImg: "/assets/images/69a85c187ea27e1d8b193ede_CC_MERSIxBERRI-16%20(1).webp",
    rightImg: "/assets/images/69a85c20c68e51f70e07786b_CC_MERSIxBERRI-24%20(1).webp",
  },
  {
    id: "cook",
    name: "Cook",
    location: "Paris 16",
    tag: "Commercial",
    year: "2023",
    color: "#886e58",
    leftImg: "/assets/images/699dcdc46ceb478ef3012143_Cover%20L.webp",
    rightImg: "/assets/images/69a85beae7ee6ecaf8863ba3_CC_Mersi%20x%20Restaurant%20COOK-2.webp",
  }
];

export default function ProjectsSlider() {
  const containerRef = useRef(null);
  const leftImagesRef = useRef([]);
  const rightImagesRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Create arrays to hold clean refs that won't duplicate on re-renders
  const leftRefs = Array(projectsData.length).fill(0).map(() => useRef(null));
  const rightRefs = Array(projectsData.length).fill(0).map(() => useRef(null));

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      // Gather actual DOM elements from our clean refs
      const leftElements = leftRefs.map(ref => ref.current);
      const rightElements = rightRefs.map(ref => ref.current);

      gsap.set(leftElements, { yPercent: 100, zIndex: 1 });
      gsap.set(rightElements, { yPercent: -100, zIndex: 1 });
      
      gsap.set(leftElements[0], { yPercent: 0, zIndex: 2 });
      gsap.set(rightElements[0], { yPercent: 0, zIndex: 2 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleHover = (index) => {
    if (index === activeIndex) return;

    const leftElements = leftRefs.map(ref => ref.current);
    const rightElements = rightRefs.map(ref => ref.current);

    const tl = gsap.timeline();
    const isScrollingDown = index > activeIndex;

    // Put current image at lower zIndex
    gsap.set([leftElements[activeIndex], rightElements[activeIndex]], { zIndex: 1 });
    // Put new image at higher zIndex to slide over
    gsap.set([leftElements[index], rightElements[index]], { zIndex: 2 });

    // Animate out current
    tl.to(leftElements[activeIndex], {
      yPercent: isScrollingDown ? -100 : 100,
      duration: 1.2,
      ease: "power4.inOut"
    }, 0);

    tl.to(rightElements[activeIndex], {
      yPercent: isScrollingDown ? 100 : -100,
      duration: 1.2,
      ease: "power4.inOut"
    }, 0);

    // Prepare and animate in new
    gsap.set(leftElements[index], { yPercent: isScrollingDown ? 100 : -100 });
    gsap.set(rightElements[index], { yPercent: isScrollingDown ? -100 : 100 });

    tl.to(leftElements[index], {
      yPercent: 0,
      duration: 1.2,
      ease: "power4.inOut"
    }, 0);

    tl.to(rightElements[index], {
      yPercent: 0,
      duration: 1.2,
      ease: "power4.inOut"
    }, 0);

    setActiveIndex(index);
  };

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="relative w-full h-[100vh] overflow-hidden flex flex-col lg:flex-row"
      style={{ backgroundColor: '#000' }}
    >
      {/* Left Slider */}
      <div className="absolute top-0 left-0 w-full lg:w-1/2 h-[50vh] lg:h-[100vh] overflow-hidden">
        {projectsData.map((project, idx) => (
          <div 
            key={`left-${project.id}`}
            ref={leftRefs[idx]}
            className="absolute top-0 left-0 w-full h-full will-change-transform"
            style={{ backgroundColor: '#000' }}
          >
            <img 
              src={project.leftImg} 
              alt={project.name} 
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        ))}
      </div>

      {/* Right Slider */}
      <div className="absolute bottom-0 lg:top-0 right-0 w-full lg:w-1/2 h-[50vh] lg:h-[100vh] overflow-hidden">
        {projectsData.map((project, idx) => (
          <div 
            key={`right-${project.id}`}
            ref={rightRefs[idx]}
            className="absolute top-0 left-0 w-full h-full will-change-transform"
            style={{ backgroundColor: '#000' }}
          >
            <img 
              src={project.rightImg} 
              alt={project.name} 
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        ))}
      </div>

      {/* Center Buttons */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-none"
        style={{ zIndex: 9999 }}
      >
        {projectsData.map((project, idx) => (
          <div 
            key={`btn-${project.id}`}
            className="pointer-events-auto cursor-pointer"
            onMouseEnter={() => handleHover(idx)}
            onClick={() => handleHover(idx)}
          >
            <div 
              className="px-8 py-4 rounded-[40px] flex items-center justify-between gap-12 transition-all duration-500 hover:scale-105"
              style={{ 
                backgroundColor: activeIndex === idx ? project.color : 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                color: activeIndex === idx ? '#fff' : 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <div className="flex flex-col">
                <h2 className="text-2xl lg:text-4xl font-bold tracking-tight m-0">{project.name}</h2>
                <span className="text-sm opacity-80 uppercase tracking-widest mt-1">{project.location}</span>
              </div>
              <div className="hidden lg:flex flex-col text-right">
                <span className="text-sm opacity-80">{project.tag}</span>
                <span className="text-sm opacity-80">{project.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
