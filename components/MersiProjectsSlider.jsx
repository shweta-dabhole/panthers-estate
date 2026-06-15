"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from 'next/link';

const projectsData = [
  {
    id: "velora",
    name: "Velora",
    location: "Levallois",
    tag: "Résidentiel",
    year: "2025",
    color: "hsla(16, 58.87%, 42.88%, 1.00)",
    slug: "velora",
    leftImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/MERSI x LEVALLOIS-9.png",
    rightImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/69a859206f8dac87c4c0b553_MERSI x LEVALLOIS-2 (1).png",
  },
  {
    id: "maurice",
    name: "Maurice Cafe St-Honore",
    location: "Paris 8",
    tag: "Hospitality",
    year: "2025",
    color: "#657b69",
    slug: "cafe-maurice-saint-honore",
    leftImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/MERSI x MAURICE_-10.png",
    rightImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/MERSI x MAURICE_-6.png",
  },
  {
    id: "berri",
    name: "Berri",
    location: "Paris 8",
    tag: "Résidentiel",
    year: "2025",
    color: "#aaa798",
    slug: "berri",
    leftImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/CC_MERSIxBERRI-16 (1).png",
    rightImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/CC_MERSIxBERRI-24 (1).png",
  },
  {
    id: "cook",
    name: "Cook",
    location: "Paris 17",
    tag: "Hospitality",
    year: "2025",
    color: "#dc633f",
    slug: "cook",
    leftImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover L_1.png",
    rightImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/CC_Mersi x Restaurant COOK-2.png",
  },
  {
    id: "segur",
    name: "Segur",
    location: "Paris 7",
    tag: "Résidentiel",
    year: "2025",
    color: "#918f7a",
    slug: "segur",
    leftImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover L_2.png",
    rightImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover R_1.png",
  },
  {
    id: "tonnemani",
    name: "Tonnenami",
    location: "Paris 6",
    tag: "Résidentiel",
    year: "2025",
    color: "#b3a696",
    slug: "tonnemani",
    leftImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover L_3.png",
    rightImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover R_2.png",
  },
  {
    id: "aurelien-cohen",
    name: "Aurelien Cohen",
    location: "Levallois",
    tag: "Retail",
    year: "2025",
    color: "#dc8b3f",
    slug: "aurelien-cohen-levallois",
    leftImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/MERSI x AURÉLIEN COHEN-1 copie (1).png",
    rightImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/MERSI x AURÉLIEN COHEN-4 (1).png",
  },
  {
    id: "atokym",
    name: "Atokym",
    location: "Paris 15",
    tag: "Résidentiel",
    year: "2025",
    color: "#8b9ec1",
    slug: "atokym",
    leftImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover L.png",
    rightImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover R.png",
  },
  {
    id: "paix",
    name: "Paix",
    location: "Paris 1",
    tag: "Résidentiel",
    year: "2024",
    color: "#ccb598",
    slug: "paix",
    leftImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/CC_MERSI x RUE DE LA PAIX-16.png",
    rightImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/CC_MERSI x RUE DE LA PAIX-1.png",
  }
];

export default function MersiProjectsSlider() {
  const containerRef = useRef(null);
  const leftWrapperRef = useRef(null);
  const rightWrapperRef = useRef(null);
  const btnsWrapperRef = useRef(null);
  
  const leftRefs = useRef([]);
  const rightRefs = useRef([]);
  const btnRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  // Use a ref for comparison inside GSAP callbacks (avoids stale closure + re-registration)
  const activeIndexRef = useRef(0);

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
          end: `+=${totalProjects * 100}%`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const newIndex = Math.min(
              Math.floor(self.progress * totalProjects),
              totalProjects - 1
            );
            if (newIndex !== activeIndexRef.current) {
              activeIndexRef.current = newIndex;
              setActiveIndex(newIndex);
            }
          }
        }
      });

      // Build the scrubbing animations for each transition
      for (let i = 0; i < totalProjects - 1; i++) {
        const nextLeft = leftRefs.current[i + 1];
        const nextRight = rightRefs.current[i + 1];
        const nextBtn = btnRefs.current[i + 1];
        
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
      className="relative w-full h-[100vh] overflow-hidden flex flex-col md:flex-row bg-[#1A1A1A]"
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
            className="absolute top-0 left-0 w-full h-full will-change-[clip-path]"
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
        className="absolute top-[50vh] md:top-0 right-0 w-full md:w-1/2 h-[50vh] md:h-[100vh]"
      >
        {projectsData.map((project, idx) => (
          <div 
            key={`right-${project.id}`}
            ref={el => rightRefs.current[idx] = el}
            className="absolute top-0 left-0 w-full h-full will-change-[clip-path]"
          >
            <img 
              src={project.rightImg} 
              alt={project.name} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Center Buttons List - positioned at bottom on mobile, centre on desktop */}
      <div 
        ref={btnsWrapperRef}
        className="absolute bottom-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 left-1/2 -translate-x-1/2 w-[90vw] md:w-auto pointer-events-none"
        style={{ zIndex: 100, height: '80px' }}
      >
        {projectsData.map((project, idx) => (
          <div 
            key={`btn-${project.id}`}
            ref={el => btnRefs.current[idx] = el}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-auto"
          >
            <Link 
              href={`/projects/${project.slug}`}
              className="group flex items-center justify-between gap-6 w-full md:w-auto md:min-w-[480px] h-[68px] md:h-[80px] rounded-full px-6 md:px-8 overflow-hidden relative cursor-pointer transition-opacity duration-300 hover:opacity-90"
              style={{ backgroundColor: project.color }}
            >
              {/* Left info: name + location */}
              <div className="flex flex-col z-10 min-w-0">
                <h2 
                  className="text-[#1A1A1A] text-lg md:text-2xl font-medium tracking-tight m-0 leading-tight truncate"
                  style={{ fontFamily: '"Outfit", "Inter", sans-serif' }}
                >
                  {project.name}
                </h2>
                <span 
                  className="hidden md:block text-[#1A1A1A] text-xs opacity-70 mt-0.5"
                  style={{ fontFamily: '"Inter", sans-serif', letterSpacing: '0.05em' }}
                >
                  {project.location}
                </span>
              </div>

              {/* Right info: tag + year + arrow */}
              <div className="flex items-center gap-4 z-10 shrink-0">
                <div 
                  className="hidden md:flex flex-col items-end text-[#1A1A1A] opacity-70"
                  style={{ fontFamily: '"Inter", sans-serif', fontSize: '12px' }}
                >
                  <span>{project.tag}</span>
                  <span>{project.year}</span>
                </div>
                
                {/* Arrow icon matching original site */}
                <div className="flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <svg width="18" height="18" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      fillRule="evenodd" 
                      clipRule="evenodd" 
                      d="M6.97361 0.199952L0.200012 0.199951L0.200012 1.42636L6.10593 1.42636L0.412716 7.11956L1.2804 7.98725L6.97361 2.29404L6.97361 8.19995L8.20001 8.19995L8.20001 1.42636L8.20001 0.199953L6.97361 0.199952Z" 
                      fill="#1A1A1A" 
                      stroke="#1A1A1A" 
                      strokeWidth="0.4"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
