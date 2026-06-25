"use client";

import React from "react";
import Link from "next/link";

const projectsData = [
  { slug: "velora", img: "/assets/new villa.png" },
  { slug: "hillcrest", img: "/assets/p36i3IJiJzBK4cHjJGtkOkx4M.jpeg" },
  { slug: "marvelle", img: "/assets/new villa 3.png" },
  { slug: "pinecrest", img: "/assets/BBK7G2W0GpZei2zukI6jNqEI6X4.jpeg" },
  { slug: "grandcrest", img: "/assets/CR9WCJs8QkwyR05G5BzUHipBX8.webp" },
  { slug: "willowood", img: "/assets/new villa 4.png" },
  { slug: "highlander", img: "/assets/new villa 5.png" },
  { slug: "brookstone", img: "/assets/new villa 6.png" },
  { slug: "greenvale", img: "/assets/new villa 7.png" },
  { slug: "velora-2", img: "/assets/new villa 8.png" }
];

export default function ProjectsStrip() {
  return (
    <section className="w-full bg-[#FFFFFF] pt-32 flex flex-col items-center justify-center relative z-20">
      <div className="flex flex-col items-center justify-center w-full px-4">
        <h1 
          className="text-center uppercase font-bold leading-[0.9] tracking-tighter text-[#1a1a1a] w-full" 
          style={{ fontSize: "36px", fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
        >
          Explore Exclusive<br/>Luxury Properties<br/>Designed For You
        </h1>
        <div className="flex justify-center w-full" style={{ marginTop: '4rem' }}>
          <Link 
            href="/projects" 
            className="relative inline-flex items-center rounded-full border border-[#E05A00] group transition-all duration-300 hover:border-[#C2410C] whitespace-nowrap"
            style={{ height: '52px', paddingLeft: '32px', paddingRight: '6px' }}
          >
            <span 
              className="font-semibold text-[#E05A00]" 
              style={{ fontSize: '16px', letterSpacing: '0.025em', fontFamily: "var(--font-poppins), 'Poppins', sans-serif", marginRight: '24px' }}
            >
              View All
            </span>
            <div 
              className="flex items-center justify-center bg-[#E05A00] rounded-full text-white transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
              style={{ width: '38px', height: '38px' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-full h-[4rem] md:h-[6rem]"></div>
      <div className="w-full flex gap-4 px-4 overflow-hidden">
        {projectsData.map((project, idx) => (
          <Link 
            href={`/projects/${project.slug}`} 
            key={idx} 
            className="flex-1 h-[15vh] md:h-[25vh] overflow-hidden group rounded-[4px]"
          >
            <img 
              src={project.img} 
              alt={project.slug} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
          </Link>
        ))}
      </div>
      <div className="w-full h-[8rem]"></div>
    </section>
  );
}
