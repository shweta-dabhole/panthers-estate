"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MenuOverlay from "@/components/MenuOverlay";
import FAQAccordion from "@/components/FAQAccordion";
import FooterSection from "@/components/FooterSection";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUsPage() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    // Add a simple fade-in up animation for all major sections
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray("section");
      sections.forEach((sec) => {
        gsap.fromTo(
          sec,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#F9F9F9] text-[#0B0B0B] min-h-screen relative z-20 font-sans overflow-x-hidden pt-32">
      <MenuOverlay isBlackText={true} />
      <nav className="absolute top-0 w-full flex justify-between items-center z-50" style={{ padding: '2rem 4rem' }}>
        <Link href="/" style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', color: '#000', letterSpacing: '1px', textDecoration: 'none' }}>
          PANTHERS
        </Link>
        <div 
          onClick={() => {
            window.dispatchEvent(new CustomEvent('panthers:toggleMenu'));
          }}
          style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', color: '#000', letterSpacing: '1px', cursor: 'pointer' }}
        >
          MENU
        </div>
      </nav>
      {/* Container */}
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-16 lg:px-32 pb-32">
        


        {/* Who Are We & Stats */}
        <section className="flex flex-col items-center justify-center gap-16 mb-32 pt-16" style={{ marginTop: '9rem' }}>
          <div className="flex flex-col items-center text-center max-w-[850px]">
            <h3 className="text-[#555555] uppercase tracking-widest text-sm font-medium mb-6">About Us</h3>
            <p style={{ fontSize: '30px', fontWeight: 400, color: '#191919', lineHeight: '1.5', margin: 0 }}>
              At Panthers, we believe a home is life's most important foundation. Our mission is to find your perfect habitat so you can comfortably build your future and best life.
            </p>
          </div>

        </section>

        {/* Our Values */}
        <section className="mb-32 w-full flex flex-col items-center justify-center" style={{ marginTop: '120px' }}>
          <div className="flex flex-col items-center justify-center mb-24 max-w-3xl mx-auto w-full" style={{ marginBottom: '80px' }}>

            <h2 className="text-5xl md:text-6xl font-medium leading-[1.15] tracking-tight text-center w-full" style={{ fontFamily: 'var(--font-sans), sans-serif', textAlign: 'center', marginBottom: '40px' }}>
              Built on Trust, Driven<br className="hidden md:block"/> by Excellence
            </h2>
            <p className="text-[#555555] text-lg text-center w-full" style={{ textAlign: 'center' }}>
              Delivering exceptional real estate experiences through<br className="hidden md:block"/> honesty, dedication, and client-focused service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1100px] mx-auto w-full">
            {/* Card 1: Integrity */}
            <div className="bg-[#f5f5f5] p-8 rounded-[24px] flex flex-col items-center text-center gap-10">
               <div className="w-10 h-10">
                 <svg viewBox="0 0 24 24" fill="none" stroke="#d05c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                   <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                   <path d="M9 12l2 2 4-4"></path>
                 </svg>
               </div>
               <div>
                 <h3 className="text-2xl font-bold mb-2 text-[#191919]" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>Integrity</h3>
                 <p className="text-[#666666] text-base leading-snug">Transparent and<br/>honest at every step.</p>
               </div>
            </div>
            {/* Card 2: Client Focus */}
            <div className="bg-[#f5f5f5] p-8 rounded-[24px] flex flex-col items-center text-center gap-10">
               <div className="w-10 h-10">
                 <svg viewBox="0 0 24 24" fill="none" stroke="#d05c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                   <path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>
                 </svg>
               </div>
               <div>
                 <h3 className="text-2xl font-bold mb-2 text-[#191919]" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>Client Focus</h3>
                 <p className="text-[#666666] text-base leading-snug">Personalized solutions<br/>tailored to your needs.</p>
               </div>
            </div>
            {/* Card 3: Excellence */}
            <div className="bg-[#f5f5f5] p-8 rounded-[24px] flex flex-col items-center text-center gap-10">
               <div className="w-10 h-10">
                 <svg viewBox="0 0 24 24" fill="none" stroke="#d05c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                   <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                 </svg>
               </div>
               <div>
                 <h3 className="text-2xl font-bold mb-2 text-[#191919]" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>Excellence</h3>
                 <p className="text-[#666666] text-base leading-snug">Committed to quality<br/>service and results.</p>
               </div>
            </div>
            {/* Card 4: Reliability */}
            <div className="bg-[#f5f5f5] p-8 rounded-[24px] flex flex-col items-center text-center gap-10">
               <div className="w-10 h-10">
                 <svg viewBox="0 0 24 24" fill="none" stroke="#d05c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                   <circle cx="12" cy="5" r="3"></circle>
                   <line x1="12" y1="22" x2="12" y2="8"></line>
                   <path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>
                 </svg>
               </div>
               <div>
                 <h3 className="text-2xl font-bold mb-2 text-[#191919]" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>Reliability</h3>
                 <p className="text-[#666666] text-base leading-snug">Dependable support<br/>you can count on.</p>
               </div>
            </div>
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="mb-32">
          <div className="flex flex-col items-start justify-start mb-12">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#d05c24]"></div>
              <h3 className="text-[#333333] text-lg font-medium">Team</h3>
            </div>
            <h2 className="text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight mb-4 text-[#0B0B0B]" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
              Meet Our Team
            </h2>
            <p className="text-[#555555] text-lg">
              Luxury begins with the people who understand it best.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1100px] mx-auto w-full">
             <div className="flex flex-col group cursor-pointer">
               <div className="w-full aspect-[3/4] rounded-[40px] overflow-hidden mb-6 relative">
                 <img src="https://framerusercontent.com/images/N0Rx0wEwyuc4sNvtbFFdiuZd6w.png?width=1200&height=1200" alt="Marcus Legrand" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               </div>
               <h3 className="text-3xl font-serif font-medium mb-2">Marcus Legrand</h3>
               <p className="text-[#555555] font-medium uppercase tracking-wider text-sm">Founder & CEO</p>
             </div>
             <div className="flex flex-col group cursor-pointer">
               <div className="w-full aspect-[3/4] rounded-[40px] overflow-hidden mb-6 relative">
                 <img src="https://framerusercontent.com/images/U3gNo5T6vzUmpD4Ya6xWQ68KwS0.png?width=800&height=1200" alt="Emma Rodrigues" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               </div>
               <h3 className="text-3xl font-serif font-medium mb-2">Emma Rodrigues</h3>
               <p className="text-[#555555] font-medium uppercase tracking-wider text-sm">Real Estate Agent</p>
             </div>
             <div className="flex flex-col group cursor-pointer">
               <div className="w-full aspect-[3/4] rounded-[40px] overflow-hidden mb-6 relative">
                 <img src="https://framerusercontent.com/images/GnEW4Rnk3ulU6n4SWKVyRKdpgE.jpg?width=1200&height=1200" alt="Daniel Ruiz" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               </div>
               <h3 className="text-3xl font-serif font-medium mb-2">Daniel Ruiz</h3>
               <p className="text-[#555555] font-medium uppercase tracking-wider text-sm">Real Estate Agent</p>
             </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full flex flex-col items-center" style={{ marginTop: '160px', marginBottom: '120px' }}>
          <div className="w-full max-w-[1000px] flex flex-col md:flex-row items-start justify-between" style={{ gap: '80px' }}>
            {/* Left Column */}
            <div className="w-full md:w-[45%] flex flex-col pt-4">
              <h2 style={{ fontSize: '44px', fontWeight: 500, color: '#191919', fontFamily: 'var(--font-sans), sans-serif', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '24px' }}>
                Got Questions? We've Got Answers
              </h2>
              <p style={{ fontSize: '18px', color: '#757575', fontFamily: '"Roboto", sans-serif', lineHeight: 1.6, marginBottom: '40px', maxWidth: '400px', textTransform: 'none' }}>
                Everything you need to know about buying, selling, and renting with confidence.
              </p>
              <a href="/contact" className="flex items-center justify-between self-start transition-all hover:bg-[#333]" style={{ backgroundColor: '#000000', color: '#fff', padding: '10px 10px 10px 32px', borderRadius: '50px', fontSize: '18px', fontWeight: 500, fontFamily: '"Roboto", sans-serif' }}>
                <span style={{ marginRight: '16px' }}>Get in Touch</span>
                <div className="flex items-center justify-center bg-white text-black" style={{ width: '44px', height: '44px', borderRadius: '50%' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </a>
            </div>

            {/* Right Column: Accordion */}
            <div className="w-full md:w-[55%] flex flex-col" style={{ marginTop: '-20px' }}>
              <FAQAccordion />
            </div>
          </div>
        </section>

      </div>
      
      {/* Footer */}
      <FooterSection />
    </main>
  );
}
