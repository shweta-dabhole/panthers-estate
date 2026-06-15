"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useParams } from "next/navigation";

const projectsData = [
  {
    slug: "naya",
    title: "Naya",
    location: "Levallois",
    filterName: "Residential",
    year: "2025",
    color: "hsla(16, 58.87%, 42.88%, 1.00)",
    img: "/mersi-scraped-site/www.mersi-architecture.com/assets/69a859206f8dac87c4c0b553_MERSI x LEVALLOIS-2 (1).png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/MERSI x LEVALLOIS-9.png"
  },
  {
    slug: "cafe-maurice-saint-honore",
    title: "Maurice Cafe St-Honore",
    location: "Paris 8",
    filterName: "Hospitality",
    year: "2025",
    color: "#657b69",
    img: "/mersi-scraped-site/www.mersi-architecture.com/assets/MERSI x MAURICE_-6.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/MERSI x MAURICE_-10.png"
  },
  {
    slug: "berri",
    title: "Berri",
    location: "Paris 8",
    filterName: "Residential",
    year: "2025",
    color: "#aaa798",
    img: "/mersi-scraped-site/www.mersi-architecture.com/assets/CC_MERSIxBERRI-24 (1).png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/CC_MERSIxBERRI-16 (1).png"
  },
  {
    slug: "cook",
    title: "Cook",
    location: "Paris 17",
    filterName: "Hospitality",
    year: "2025",
    color: "#dc633f",
    img: "/mersi-scraped-site/www.mersi-architecture.com/assets/CC_Mersi x Restaurant COOK-2.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover L_1.png"
  },
  {
    slug: "segur",
    title: "Segur",
    location: "Paris 7",
    filterName: "Residential",
    year: "2025",
    color: "#918f7a",
    img: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover R_1.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover L_2.png"
  },
  {
    slug: "tonnemani",
    title: "Tonnenami",
    location: "Paris 6",
    filterName: "Residential",
    year: "2025",
    color: "#b3a696",
    img: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover R_2.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover L_3.png"
  },
  {
    slug: "aurelien-cohen-levallois",
    title: "Aurelien Cohen",
    location: "Levallois",
    filterName: "Retail",
    year: "2025",
    color: "#dc8b3f",
    img: "/mersi-scraped-site/www.mersi-architecture.com/assets/MERSI x AURÉLIEN COHEN-4 (1).png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/MERSI x AURÉLIEN COHEN-1 copie (1).png"
  },
  {
    slug: "atokym",
    title: "Atokym",
    location: "Paris 15",
    filterName: "Residential",
    year: "2025",
    color: "#8b9ec1",
    img: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover R.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover L.png"
  },
  {
    slug: "paix",
    title: "Paix",
    location: "Paris 1",
    filterName: "Residential",
    year: "2024",
    color: "#ccb598",
    img: "/mersi-scraped-site/www.mersi-architecture.com/assets/CC_MERSI x RUE DE LA PAIX-1.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/CC_MERSI x RUE DE LA PAIX-16.png"
  }
];

export default function ProjectDetail() {
  const params = useParams();
  const slug = params?.slug;
  const project = projectsData.find((p) => p.slug === slug);
  const containerRef = useRef(null);
  const horizontalRowRef = useRef(null);
  const wrapperRef = useRef(null);

  useLayoutEffect(() => {
    if (!project || !containerRef.current || !horizontalRowRef.current || !wrapperRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate the container to fade in
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power3.out" }
    );

    let ctx = gsap.context(() => {
      const row = horizontalRowRef.current;
      
      // The total width to translate is the total scrollWidth minus the viewport width
      const getScrollAmount = () => row.scrollWidth - window.innerWidth;

      const tween = gsap.to(row, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
      
      // Delay refresh slightly for Next.js to finish painting
      setTimeout(() => ScrollTrigger.refresh(), 100);
    });

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#EDE7DE]">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Link href="/projects" className="ml-4 underline">Go Back</Link>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} style={{ width: '100%' }}>
    <div ref={containerRef} style={{ width: '100%', height: '100vh', backgroundColor: '#EDE7DE', overflow: 'hidden' }}>
      
      {/* THE ENTIRE PAGE IS ONE HORIZONTAL ROW */}
      <div 
        ref={horizontalRowRef}
        style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center', // Center items vertically by default
          height: '100vh',
          width: 'max-content'
        }}
      >
      
        {/* BLOCK 1: LEFT PANEL - INITIAL 50VW */}
        <div 
          style={{ 
            width: '50vw', 
            backgroundColor: project.color, 
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2.5rem',
            color: '#1a1a1a',
            boxSizing: 'border-box',
            flexShrink: 0
          }}
        >
          {/* Top left pseudo-logo to go back */}
          <Link href="/projects" style={{ cursor: 'pointer', display: 'inline-block' }}>
            <h2 style={{ fontFamily: 'Doner, Arial, sans-serif', fontSize: '1.5rem', fontWeight: 700, margin: 0, textTransform: 'uppercase' }}>
              MERSI
            </h2>
          </Link>
          
          {/* Centered details */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxWidth: '300px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '1.5rem' }}>
               <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.875rem', fontWeight: 600 }}>{project.location}</span>
               <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.875rem', fontWeight: 600 }}>{project.year}</span>
            </div>
            
            {/* Thumbnail preview - Portrait */}
            <div style={{ width: '100%', aspectRatio: '4/5', overflow: 'hidden', marginBottom: '1.5rem' }}>
              <img src={project.hoverImg} alt={`${project.title} preview`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            
            <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '1rem', fontWeight: 500, textAlign: 'center' }}>
              Intérieur singulier et intemporel<br/>
              {project.filterName}
            </div>
          </div>

          {/* Bottom massive title */}
          <div>
            <h1 style={{ fontFamily: 'Doner, Arial, sans-serif', fontSize: '8rem', fontWeight: 700, lineHeight: 0.9, textTransform: 'uppercase', margin: 0, textAlign: 'center' }}>
              {project.title}
            </h1>
          </div>
        </div>
        
        {/* BLOCK 2: FIRST IMAGE (PADDED) */}
        <div style={{ width: '50vw', height: '100vh', padding: '2.5rem', boxSizing: 'border-box', flexShrink: 0 }}>
          <img src={project.img} alt={`${project.title} 1`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* BLOCK 3: TEXT BLOCK */}
        <div style={{ width: '50vw', height: '100vh', padding: '4rem', display: 'flex', flexDirection: 'column', gap: '3rem', flexShrink: 0, justifyContent: 'center', boxSizing: 'border-box' }}>
           <h2 style={{ fontFamily: 'Doner, Arial, sans-serif', fontSize: '2rem', textTransform: 'uppercase', lineHeight: 1.2 }}>
             Restaurant Méditerranéen,<br/>Institution du quartier
           </h2>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <div style={{ padding: '1rem 0', borderBottom: '1px solid #ccc', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
               <span>Retail Concept</span>
               <span>01</span>
             </div>
             <div style={{ padding: '1rem 0', borderBottom: '1px solid #ccc', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
               <span>Conception architecturale</span>
               <span>02</span>
             </div>
             <div style={{ padding: '1rem 0', borderBottom: '1px solid #ccc', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
               <span>Pilotage de chantier</span>
               <span>03</span>
             </div>
             <div style={{ padding: '1rem 0', borderBottom: '1px solid #ccc', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
               <span>Mobilier et décoration</span>
               <span>04</span>
             </div>
           </div>
           <h3 style={{ fontFamily: 'Doner, Arial, sans-serif', fontSize: '5rem', margin: 0 }}>
             120<span style={{ fontSize: '2rem' }}>m²</span>
           </h3>
        </div>
        
        {/* BLOCK 4: WIDE IMAGE (PADDED) */}
        <div style={{ width: '70vw', height: '100vh', padding: '2.5rem 0 2.5rem 2.5rem', boxSizing: 'border-box', flexShrink: 0 }}>
           <img src={project.hoverImg} alt={`${project.title} wide`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* BLOCK 5: IMAGE COLLAGE (3 IMAGES) */}
        <div style={{ width: '80vw', height: '100vh', padding: '2.5rem', boxSizing: 'border-box', flexShrink: 0, display: 'flex', gap: '2.5rem' }}>
           <div style={{ flex: 1, height: '100%' }}>
             <img src={project.img} alt="Detail 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
           </div>
           <div style={{ flex: 1.5, height: '100%' }}>
             <img src={project.hoverImg} alt="Detail 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
           </div>
           <div style={{ flex: 1, height: '100%' }}>
             <img src={project.img} alt="Detail 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
           </div>
        </div>

        {/* BLOCK 6: BATHROOMS (2 IMAGES) */}
        <div style={{ width: '60vw', height: '100vh', padding: '2.5rem 0', boxSizing: 'border-box', flexShrink: 0, display: 'flex', gap: '2.5rem' }}>
           <div style={{ flex: 1, height: '100%' }}>
             <img src={project.hoverImg} alt="Bath 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
           </div>
           <div style={{ flex: 1, height: '100%' }}>
             <img src={project.img} alt="Bath 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
           </div>
        </div>

        {/* BLOCK 7: PEOPLE AND NEWSLETTER */}
        <div style={{ width: '80vw', height: '100vh', flexShrink: 0, display: 'flex', alignItems: 'center', paddingRight: '2.5rem', boxSizing: 'border-box' }}>
           <div style={{ flex: 1, height: '100%', padding: '0 2.5rem 0 0' }}>
             <img src={project.hoverImg} alt="Architects" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
           </div>
           <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3rem' }}>
             <h2 style={{ fontFamily: 'Doner, Arial, sans-serif', fontSize: '2.5rem', margin: 0, lineHeight: 1.2 }}>
               Nous concevons des lieux uniques, pensés pour être vécus, et dessinés pour traverser le temps.
             </h2>
             <div style={{ padding: '2rem', border: '1px solid #ccc', backgroundColor: '#EDE7DE', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <h3 style={{ fontFamily: 'Doner, Arial, sans-serif', fontSize: '1.5rem', margin: 0 }}>Newsletter</h3>
               <div style={{ display: 'flex', borderBottom: '1px solid #1a1a1a', paddingBottom: '0.5rem' }}>
                 <input type="email" placeholder="VOTRE EMAIL" style={{ background: 'transparent', border: 'none', outline: 'none', flex: 1, fontFamily: '"Inter", sans-serif', fontSize: '0.875rem' }} />
                 <span style={{ cursor: 'pointer' }}>→</span>
               </div>
             </div>
           </div>
        </div>
        
        {/* BLOCK 8: CONTACT FOOTER */}
        <div style={{ width: '50vw', height: '100vh', backgroundColor: '#EDE7DE', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem', boxSizing: 'border-box', flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 style={{ fontFamily: 'Doner, Arial, sans-serif', fontSize: '2rem', margin: 0 }}>Mail</h3>
              <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '1rem', margin: 0 }}>hello@panthers-estate.com</p>
            </div>
            <div>
              <h3 style={{ fontFamily: 'Doner, Arial, sans-serif', fontSize: '2rem', margin: 0 }}>WhatsApp</h3>
              <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '1rem', margin: 0 }}>Let's talk</p>
            </div>
            <div>
              <h3 style={{ fontFamily: 'Doner, Arial, sans-serif', fontSize: '2rem', margin: 0 }}>Phone</h3>
              <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '1rem', margin: 0 }}>+33 1 23 45 67 89</p>
            </div>
          </div>
        </div>

    </div>
    </div>
    </div>
  );
}
