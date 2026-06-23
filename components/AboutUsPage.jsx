"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MenuOverlay from "@/components/MenuOverlay";
import FAQAccordion from "@/components/FAQAccordion";
import FooterSection from "@/components/FooterSection";
import MorphogenesisHero from "@/components/MorphogenesisHero";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUsPage() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Hero Image Expansion Animation
      const heroImage = document.querySelector('.hero-expand-img');
      const heroSection = document.querySelector('.hero-expand-section');
      
      if (heroImage && heroSection) {
        gsap.to(heroImage, {
          width: "100vw",
          height: "100vh",
          y: 0, // Animate from -15vh back to center
          borderRadius: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "+=1500",
            scrub: true,
            pin: true,
          }
        });
      }

      // Add a simple fade-in up animation for all major sections
      const sections = gsap.utils.toArray("section:not(.hero-expand-section)");
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
    <main ref={containerRef} className="bg-[#F9F9F9] text-[#0B0B0B] min-h-screen relative z-20 font-sans overflow-x-hidden">
      <MenuOverlay isBlackText={false} />


      {/* NEW HERO SECTION */}
      <MorphogenesisHero />

      {/* Container */}
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-16 lg:px-32 pb-32">
        






        {/* Meet Our Team */}
        <section className="mb-32 w-full flex flex-col items-center" style={{ marginTop: '160px' }}>
          <div className="flex flex-col items-start justify-start w-full max-w-[1100px] mx-auto gap-4" style={{ paddingBottom: '80px' }}>

            <h2 className="text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight text-[#0B0B0B]" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
              Meet Our Team
            </h2>
            <p className="text-[#555555] text-lg">
              Luxury begins with the people who understand it best.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1100px] mx-auto w-full">
             <div className="flex flex-col group cursor-pointer">
               <div className="w-[85%] max-w-[320px] aspect-[3/4] rounded-[16px] overflow-hidden relative">
                 <img src="/assets/team%201.png" alt="Marcus Legrand" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               </div>
               <h3 className="text-xl font-['Poppins',sans-serif] font-medium mb-2" style={{ marginTop: '16px' }}>Marcus Legrand</h3>
               <p className="text-[#555555] font-['Roboto',sans-serif] font-medium uppercase tracking-wider text-sm">Founder & CEO</p>
             </div>
             <div className="flex flex-col group cursor-pointer">
               <div className="w-[85%] max-w-[320px] aspect-[3/4] rounded-[16px] overflow-hidden relative">
                 <img src="/assets/team%202.png" alt="Emma Rodrigues" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               </div>
               <h3 className="text-xl font-['Poppins',sans-serif] font-medium mb-2" style={{ marginTop: '16px' }}>Emma Rodrigues</h3>
               <p className="text-[#555555] font-['Roboto',sans-serif] font-medium uppercase tracking-wider text-sm">Real Estate Agent</p>
             </div>
             <div className="flex flex-col group cursor-pointer">
               <div className="w-[85%] max-w-[320px] aspect-[3/4] rounded-[16px] overflow-hidden relative">
                 <img src="/assets/team%203.png" alt="Daniel Ruiz" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               </div>
               <h3 className="text-xl font-['Poppins',sans-serif] font-medium mb-2" style={{ marginTop: '16px' }}>Daniel Ruiz</h3>
               <p className="text-[#555555] font-['Roboto',sans-serif] font-medium uppercase tracking-wider text-sm">Real Estate Agent</p>
             </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full flex flex-col items-center" style={{ marginTop: '160px', marginBottom: '120px' }}>
          <div className="w-full max-w-[1000px] flex flex-col md:flex-row items-start justify-between" style={{ gap: '80px' }}>
            {/* Left Column */}
            <div className="w-full md:w-[45%] flex flex-col pt-4">
              <h2 className="text-4xl md:text-[44px]" style={{ fontWeight: 500, color: '#191919', fontFamily: 'var(--font-sans), sans-serif', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '24px' }}>
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
