"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useParams } from "next/navigation";

const projectsData = [
  {
    slug: "velora",
    title: "Velora",
    location: "Levallois",
    filterName: "Residential",
    year: "2025",
    color: "hsla(16, 58.87%, 42.88%, 1.00)",
    img: "/assets/new villa.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/MERSI x LEVALLOIS-9.png",
    areaVal: "5000 SQ.FT",
    bedroomsVal: "5",
    floorsVal: "02",
    parkingsVal: "04",
    price: "$1,60,000",
    desc: "Velora Villa",
    specs: [
      { label: "Pool", value: "Infinity Pool" },
      { label: "Home Theatre", value: "Yes" },
      { label: "Smart Homes", value: "Enabled" },
      { label: "Garden Area", value: "1000 sqft" }
    ],
    facilities: [
      { label: "Hospital", value: "2.5 KM" },
      { label: "School", value: "1.2 KM" },
      { label: "Shopping Mall", value: "3 KM" },
      { label: "Supermarket", value: "1 KM" }
    ],
    images: [
      "/assets/velora 1.png",
      "/assets/velora 2.png",
      "/assets/velora 3.png",
      "/assets/velora 4.png",
      "/assets/velora 5.png",
      "/assets/velora 6.png",
      "/assets/velora 7.png",
      "/assets/velora 8.png"
    ]
  },
  {
    slug: "hillcrest",
    title: "Hillcrest",
    location: "Paris 8",
    filterName: "Hospitality",
    year: "2025",
    color: "hsla(16, 58.87%, 42.88%, 1.00)",
    img: "/assets/new villa.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/MERSI x MAURICE_-10.png",
    areaVal: "5000 SQ.FT",
    bedroomsVal: "5",
    floorsVal: "02",
    parkingsVal: "04",
    price: "$1,60,000",
    desc: "Velora Villa",
    specs: [
      { label: "Pool", value: "Infinity Pool" },
      { label: "Home Theatre", value: "Yes" },
      { label: "Smart Homes", value: "Enabled" },
      { label: "Garden Area", value: "1000 sqft" }
    ],
    facilities: [
      { label: "Hospital", value: "2.5 KM" },
      { label: "School", value: "1.2 KM" },
      { label: "Shopping Mall", value: "3 KM" },
      { label: "Supermarket", value: "1 KM" }
    ],
    images: [
      "/assets/velora 1.png",
      "/assets/velora 2.png",
      "/assets/velora 3.png",
      "/assets/velora 4.png",
      "/assets/velora 5.png",
      "/assets/velora 6.png",
      "/assets/velora 7.png",
      "/assets/velora 8.png"
    ]
  },
  {
    slug: "marvelle",
    title: "Marvelle",
    location: "Paris 8",
    filterName: "Residential",
    year: "2025",
    color: "hsla(16, 58.87%, 42.88%, 1.00)",
    img: "/assets/new villa.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/CC_MERSIxBERRI-16 (1).png",
    areaVal: "5000 SQ.FT",
    bedroomsVal: "5",
    floorsVal: "02",
    parkingsVal: "04",
    price: "$1,60,000",
    desc: "Velora Villa",
    specs: [
      { label: "Pool", value: "Infinity Pool" },
      { label: "Home Theatre", value: "Yes" },
      { label: "Smart Homes", value: "Enabled" },
      { label: "Garden Area", value: "1000 sqft" }
    ],
    facilities: [
      { label: "Hospital", value: "2.5 KM" },
      { label: "School", value: "1.2 KM" },
      { label: "Shopping Mall", value: "3 KM" },
      { label: "Supermarket", value: "1 KM" }
    ],
    images: [
      "/assets/velora 1.png",
      "/assets/velora 2.png",
      "/assets/velora 3.png",
      "/assets/velora 4.png",
      "/assets/velora 5.png",
      "/assets/velora 6.png",
      "/assets/velora 7.png",
      "/assets/velora 8.png"
    ]
  },
  {
    slug: "pinecrest",
    title: "Pinecrest",
    location: "Paris 17",
    filterName: "Hospitality",
    year: "2025",
    color: "hsla(16, 58.87%, 42.88%, 1.00)",
    img: "/assets/new villa.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover L_1.png",
    areaVal: "5000 SQ.FT",
    bedroomsVal: "5",
    floorsVal: "02",
    parkingsVal: "04",
    price: "$1,60,000",
    desc: "Velora Villa",
    specs: [
      { label: "Pool", value: "Infinity Pool" },
      { label: "Home Theatre", value: "Yes" },
      { label: "Smart Homes", value: "Enabled" },
      { label: "Garden Area", value: "1000 sqft" }
    ],
    facilities: [
      { label: "Hospital", value: "2.5 KM" },
      { label: "School", value: "1.2 KM" },
      { label: "Shopping Mall", value: "3 KM" },
      { label: "Supermarket", value: "1 KM" }
    ],
    images: [
      "/assets/velora 1.png",
      "/assets/velora 2.png",
      "/assets/velora 3.png",
      "/assets/velora 4.png",
      "/assets/velora 5.png",
      "/assets/velora 6.png",
      "/assets/velora 7.png",
      "/assets/velora 8.png"
    ]
  },
  {
    slug: "grandcrest",
    title: "Grandcrest",
    location: "Paris 7",
    filterName: "Residential",
    year: "2025",
    color: "hsla(16, 58.87%, 42.88%, 1.00)",
    img: "/assets/new villa.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover L_2.png",
    areaVal: "5000 SQ.FT",
    bedroomsVal: "5",
    floorsVal: "02",
    parkingsVal: "04",
    price: "$1,60,000",
    desc: "Velora Villa",
    specs: [
      { label: "Pool", value: "Infinity Pool" },
      { label: "Home Theatre", value: "Yes" },
      { label: "Smart Homes", value: "Enabled" },
      { label: "Garden Area", value: "1000 sqft" }
    ],
    facilities: [
      { label: "Hospital", value: "2.5 KM" },
      { label: "School", value: "1.2 KM" },
      { label: "Shopping Mall", value: "3 KM" },
      { label: "Supermarket", value: "1 KM" }
    ],
    images: [
      "/assets/velora 1.png",
      "/assets/velora 2.png",
      "/assets/velora 3.png",
      "/assets/velora 4.png",
      "/assets/velora 5.png",
      "/assets/velora 6.png",
      "/assets/velora 7.png",
      "/assets/velora 8.png"
    ]
  },
  {
    slug: "willowood",
    title: "Willowood",
    location: "Paris 6",
    filterName: "Residential",
    year: "2025",
    color: "hsla(16, 58.87%, 42.88%, 1.00)",
    img: "/assets/new villa.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover L_3.png",
    areaVal: "5000 SQ.FT",
    bedroomsVal: "5",
    floorsVal: "02",
    parkingsVal: "04",
    price: "$1,60,000",
    desc: "Velora Villa",
    specs: [
      { label: "Pool", value: "Infinity Pool" },
      { label: "Home Theatre", value: "Yes" },
      { label: "Smart Homes", value: "Enabled" },
      { label: "Garden Area", value: "1000 sqft" }
    ],
    facilities: [
      { label: "Hospital", value: "2.5 KM" },
      { label: "School", value: "1.2 KM" },
      { label: "Shopping Mall", value: "3 KM" },
      { label: "Supermarket", value: "1 KM" }
    ],
    images: [
      "/assets/velora 1.png",
      "/assets/velora 2.png",
      "/assets/velora 3.png",
      "/assets/velora 4.png",
      "/assets/velora 5.png",
      "/assets/velora 6.png",
      "/assets/velora 7.png",
      "/assets/velora 8.png"
    ]
  },
  {
    slug: "highlander",
    title: "Highlander",
    location: "Levallois",
    filterName: "Retail",
    year: "2025",
    color: "hsla(16, 58.87%, 42.88%, 1.00)",
    img: "/assets/new villa.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/MERSI x AURÉLIEN COHEN-1 copie (1).png",
    areaVal: "5000 SQ.FT",
    bedroomsVal: "5",
    floorsVal: "02",
    parkingsVal: "04",
    price: "$1,60,000",
    desc: "Velora Villa",
    specs: [
      { label: "Pool", value: "Infinity Pool" },
      { label: "Home Theatre", value: "Yes" },
      { label: "Smart Homes", value: "Enabled" },
      { label: "Garden Area", value: "1000 sqft" }
    ],
    facilities: [
      { label: "Hospital", value: "2.5 KM" },
      { label: "School", value: "1.2 KM" },
      { label: "Shopping Mall", value: "3 KM" },
      { label: "Supermarket", value: "1 KM" }
    ],
    images: [
      "/assets/velora 1.png",
      "/assets/velora 2.png",
      "/assets/velora 3.png",
      "/assets/velora 4.png",
      "/assets/velora 5.png",
      "/assets/velora 6.png",
      "/assets/velora 7.png",
      "/assets/velora 8.png"
    ]
  },
  {
    slug: "brookstone",
    title: "Brookstone",
    location: "Paris 15",
    filterName: "Residential",
    year: "2025",
    color: "hsla(16, 58.87%, 42.88%, 1.00)",
    img: "/assets/new villa.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/Cover L.png",
    areaVal: "5000 SQ.FT",
    bedroomsVal: "5",
    floorsVal: "02",
    parkingsVal: "04",
    price: "$1,60,000",
    desc: "Velora Villa",
    specs: [
      { label: "Pool", value: "Infinity Pool" },
      { label: "Home Theatre", value: "Yes" },
      { label: "Smart Homes", value: "Enabled" },
      { label: "Garden Area", value: "1000 sqft" }
    ],
    facilities: [
      { label: "Hospital", value: "2.5 KM" },
      { label: "School", value: "1.2 KM" },
      { label: "Shopping Mall", value: "3 KM" },
      { label: "Supermarket", value: "1 KM" }
    ],
    images: [
      "/assets/velora 1.png",
      "/assets/velora 2.png",
      "/assets/velora 3.png",
      "/assets/velora 4.png",
      "/assets/velora 5.png",
      "/assets/velora 6.png",
      "/assets/velora 7.png",
      "/assets/velora 8.png"
    ]
  },
  {
    slug: "greenvale",
    title: "Greenvale",
    location: "Paris 1",
    filterName: "Residential",
    year: "2024",
    color: "hsla(16, 58.87%, 42.88%, 1.00)",
    img: "/assets/new villa.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/CC_MERSI x RUE DE LA PAIX-16.png",
    areaVal: "5000 SQ.FT",
    bedroomsVal: "5",
    floorsVal: "02",
    parkingsVal: "04",
    price: "$1,60,000",
    desc: "Velora Villa",
    specs: [
      { label: "Pool", value: "Infinity Pool" },
      { label: "Home Theatre", value: "Yes" },
      { label: "Smart Homes", value: "Enabled" },
      { label: "Garden Area", value: "1000 sqft" }
    ],
    facilities: [
      { label: "Hospital", value: "2.5 KM" },
      { label: "School", value: "1.2 KM" },
      { label: "Shopping Mall", value: "3 KM" },
      { label: "Supermarket", value: "1 KM" }
    ],
    images: [
      "/assets/velora 1.png",
      "/assets/velora 2.png",
      "/assets/velora 3.png",
      "/assets/velora 4.png",
      "/assets/velora 5.png",
      "/assets/velora 6.png",
      "/assets/velora 7.png",
      "/assets/velora 8.png"
    ]
  },
  {
    slug: "velora-2",
    title: "Velora",
    location: "Levallois",
    filterName: "Residential",
    year: "2025",
    color: "hsla(16, 58.87%, 42.88%, 1.00)",
    img: "/assets/new villa 8.png",
    hoverImg: "/mersi-scraped-site/www.mersi-architecture.com/assets/MERSI x LEVALLOIS-9.png",
    areaVal: "5000 SQ.FT",
    bedroomsVal: "5",
    floorsVal: "02",
    parkingsVal: "04",
    price: "$1,60,000",
    desc: "Velora Villa",
    specs: [
      { label: "Pool", value: "Infinity Pool" },
      { label: "Home Theatre", value: "Yes" },
      { label: "Smart Homes", value: "Enabled" },
      { label: "Garden Area", value: "1000 sqft" }
    ],
    facilities: [
      { label: "Hospital", value: "2.5 KM" },
      { label: "School", value: "1.2 KM" },
      { label: "Shopping Mall", value: "3 KM" },
      { label: "Supermarket", value: "1 KM" }
    ],
    images: [
      "/assets/velora 1.png",
      "/assets/velora 2.png",
      "/assets/velora 3.png",
      "/assets/velora 4.png",
      "/assets/velora 5.png",
      "/assets/velora 6.png",
      "/assets/velora 7.png",
      "/assets/velora 8.png"
    ]
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

      // Block 1 animations on load
      gsap.fromTo(
        [row.querySelector('.block1-thumb'), row.querySelector('.block1-title')],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" }
      );

      // Reveal animation (bottom to top) for scrolling image containers
      gsap.utils.toArray(row.querySelectorAll('.parallax-container')).forEach((container) => {
        gsap.fromTo(container,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              containerAnimation: tween,
              start: "left 95%",
              toggleActions: "play none none none",
            }
          }
        );
      });

      // Parallax effect for all images inside .parallax-container
      gsap.utils.toArray(row.querySelectorAll('.parallax-img')).forEach((img) => {
        gsap.fromTo(img,
          { xPercent: -10 },
          {
            xPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest('.parallax-container') || img.parentElement,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            }
          }
        );
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

          
          {/* Centered details */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxWidth: '300px', margin: '0 auto' }}>

            
            {/* Thumbnail preview - Portrait */}
            <div className="block1-thumb" style={{ width: '100%', aspectRatio: '4/5', overflow: 'hidden', marginBottom: '1.5rem' }}>
              <img src={project.images?.[0] || project.hoverImg} alt={`${project.title} preview`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Bottom massive title */}
          <div>
            <h1 className="block1-title" style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '3rem', fontWeight: 700, lineHeight: 0.9, textTransform: 'uppercase', margin: 0, textAlign: 'center' }}>
              {project.title}
            </h1>
          </div>
        </div>
        
        {/* BLOCK 2: FIRST IMAGE (PADDED) */}
        <div style={{ width: '60vw', height: '75vh', padding: '2.5rem', boxSizing: 'border-box', flexShrink: 0 }}>
          <div className="parallax-container" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <img className="parallax-img" src={project.img} alt={`${project.title} 1`} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.2)' }} />
          </div>
        </div>

        {/* BLOCK 3: TEXT BLOCK */}
        <div style={{ width: '30vw', height: '100vh', padding: '3rem', display: 'flex', flexDirection: 'column', gap: '3rem', flexShrink: 0, justifyContent: 'center', boxSizing: 'border-box' }}>
           <h2 style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '2rem', textTransform: 'uppercase', lineHeight: 1.2 }}>
             {project.desc || project.title}
           </h2>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <div style={{ padding: '1rem 0', borderBottom: '1px solid #ccc', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
               <span>Area</span>
               <span>{project.areaVal || "5000 SQ.FT"}</span>
             </div>
             <div style={{ padding: '1rem 0', borderBottom: '1px solid #ccc', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
               <span>Floors</span>
               <span>{project.floorsVal || "02"}</span>
             </div>
             <div style={{ padding: '1rem 0', borderBottom: '1px solid #ccc', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
               <span>Bedrooms</span>
               <span>{project.bedroomsVal || "5"}</span>
             </div>
             <div style={{ padding: '1rem 0', borderBottom: '1px solid #ccc', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
               <span>Parkings</span>
               <span>{project.parkingsVal || "04"}</span>
             </div>
           </div>
           <h3 style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '3rem', margin: 0 }}>
             {project.price || "$1,60,000"}
           </h3>
        </div>
        
        {/* BLOCK 4: WIDE IMAGE (PADDED) */}
        <div style={{ width: '60vw', height: '75vh', padding: '2.5rem 0 2.5rem 2.5rem', boxSizing: 'border-box', flexShrink: 0 }}>
          <div className="parallax-container" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <img className="parallax-img" src={project.images?.[1] || project.hoverImg} alt={`${project.title} wide`} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.2)' }} />
          </div>
        </div>

        {/* BLOCK 5: IMAGE COLLAGE (3 IMAGES) */}
        <div style={{ width: '80vw', height: '75vh', padding: '2.5rem', boxSizing: 'border-box', flexShrink: 0, display: 'flex', gap: '2.5rem' }}>
           <div className="parallax-container" style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
             <img className="parallax-img" src={project.images?.[2] || project.img} alt="Detail 1" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.2)' }} />
           </div>
           <div className="parallax-container" style={{ flex: 1.5, height: '100%', overflow: 'hidden' }}>
             <img className="parallax-img" src={project.images?.[3] || project.hoverImg} alt="Detail 2" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.2)' }} />
           </div>
           <div className="parallax-container" style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
             <img className="parallax-img" src={project.images?.[4] || project.img} alt="Detail 3" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.2)' }} />
           </div>
        </div>

        {/* BLOCK 5B: DUPLICATED TEXT BLOCK */}
        <div style={{ width: '30vw', height: '100vh', padding: '3rem', display: 'flex', flexDirection: 'column', gap: '3rem', flexShrink: 0, justifyContent: 'center', boxSizing: 'border-box' }}>
           <h2 style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '2rem', textTransform: 'uppercase', lineHeight: 1.2 }}>
             {project.desc || project.title}
           </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(project.specs || [
                { label: "Pool", value: "Infinity Pool" },
                { label: "Home Theatre", value: "Yes" },
                { label: "Smart Homes", value: "Enabled" },
                { label: "Garden Area", value: "1000 sqft" }
              ]).map((spec, i) => (
                <div key={i} style={{ padding: '1rem 0', borderBottom: '1px solid #ccc', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                  <span>{spec.label}</span>
                  <span>{spec.value}</span>
                </div>
              ))}
            </div>
        </div>

        {/* BLOCK 6: BATHROOMS (2 IMAGES) */}
        <div style={{ width: '60vw', height: '75vh', padding: '2.5rem 2.5rem 2.5rem 0', boxSizing: 'border-box', flexShrink: 0, display: 'flex', gap: '2.5rem' }}>
           <div className="parallax-container" style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
             <img className="parallax-img" src={project.images?.[5] || project.hoverImg} alt="Bath 1" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.2)' }} />
           </div>
           <div className="parallax-container" style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
             <img className="parallax-img" src={project.images?.[6] || project.img} alt="Bath 2" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.2)' }} />
           </div>
        </div>

        {/* BLOCK 7: PEOPLE AND NEWSLETTER */}
        <div style={{ width: '80vw', height: '75vh', flexShrink: 0, display: 'flex', alignItems: 'center', padding: '2.5rem 8vw 2.5rem 0', boxSizing: 'border-box' }}>
           <div style={{ flex: 1, height: '100%', padding: '0 2.5rem 0 0' }}>
             <div className="parallax-container" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
               <img className="parallax-img" src={project.images?.[7] || project.hoverImg} alt="Architects" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.2)' }} />
             </div>
           </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3rem', justifyContent: 'center' }}>
               <h2 style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '2rem', textTransform: 'uppercase', lineHeight: 1.2 }}>
                 Nearby Facilities
               </h2>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
                 {(project.facilities || [
                   { label: "Hospital", value: "2.5 KM" },
                   { label: "School", value: "1.2 KM" },
                   { label: "Shopping Mall", value: "3 KM" },
                   { label: "Supermarket", value: "1 KM" }
                 ]).map((fac, i) => (
                   <div key={i} style={{ padding: '1rem 0', borderBottom: '1px solid #ccc', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                     <span>{fac.label}</span>
                     <span>{fac.value}</span>
                   </div>
                 ))}
               </div>
            </div>
        </div>
        
        {/* BLOCK 8: CONTACT FOOTER */}
        <div style={{ width: '30vw', height: '100vh', backgroundColor: '#EDE7DE', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem', boxSizing: 'border-box', flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '2rem', margin: 0 }}>Mail</h3>
              <p style={{ fontFamily: '"Roboto", sans-serif', fontSize: '1rem', margin: 0 }}>hello@panthers-estate.com</p>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '2rem', margin: 0 }}>WhatsApp</h3>
              <p style={{ fontFamily: '"Roboto", sans-serif', fontSize: '1rem', margin: 0 }}>Let's talk</p>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '2rem', margin: 0 }}>Phone</h3>
              <p style={{ fontFamily: '"Roboto", sans-serif', fontSize: '1rem', margin: 0 }}>+33 1 23 45 67 89</p>
            </div>
          </div>
        </div>

    </div>
    </div>
    </div>
  );
}
