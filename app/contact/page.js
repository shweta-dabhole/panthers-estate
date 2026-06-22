"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import MenuOverlay from "@/components/MenuOverlay";
import FooterSection from "@/components/FooterSection";
import ContactForm from "@/components/ContactForm";
import FAQAccordion from "@/components/FAQAccordion";

export default function ContactPage() {
  return (
    <>
      <MenuOverlay isBlackText={true} />
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center z-50" style={{ padding: '2rem 4rem' }}>
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
      <main className="bg-[#F9F9F9] text-[#0B0B0B] min-h-screen relative z-20 font-sans overflow-x-hidden" style={{ paddingTop: '5rem' }}>
        <div className="max-w-[1440px] mx-auto w-full" style={{ paddingLeft: '8rem', paddingRight: '8rem', paddingBottom: '8rem' }}>
        
        {/* Hero Section */}
        <section className="flex flex-col items-start justify-start w-full text-left !p-0" style={{ marginBottom: '4rem' }}>
          <h1 className="font-medium leading-[1.05] tracking-tight text-[#0B0B0B] text-left w-full mt-0 font-sans !normal-case" style={{ fontSize: '50px', textTransform: 'none', marginBottom: '2rem' }}>
            Let's Begin Your<br />Home Journey
          </h1>
          <p className="text-[#555555] max-w-[600px] font-normal leading-[1.6] m-0 text-left !normal-case" style={{ fontSize: '18px', textTransform: 'none' }}>
            From luxury residences to smart investments, we’re here to turn your property goals into reality.
          </p>
        </section>

        {/* Hero Image */}
        <section className="w-full" style={{ marginBottom: '8rem' }}>
          <div className="relative w-full aspect-[4/3] md:aspect-[16/7] max-h-[700px] rounded-[32px] overflow-hidden">
            <Image
              src="/assets/conatct%20img.png"
              alt="Beautiful modern house"
              fill
              className="object-cover w-full h-full"
            />
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="w-full flex flex-col md:flex-row items-start justify-between" style={{ gap: '80px', marginBottom: '8rem' }}>
          {/* Left Side */}
          <div className="flex flex-col justify-between pr-0 lg:pr-12">
            <div>
              <h2 className="text-[3.5rem] md:text-[4rem] font-semibold tracking-tight text-[#000000] leading-[1.1] !normal-case" style={{ marginBottom: '1.5rem', textTransform: 'none' }}>
                Start Your Property<br />Journey
              </h2>
              <p className="text-[#555555] text-[1rem] max-w-[400px] leading-[1.6] !normal-case" style={{ marginBottom: '3rem', textTransform: 'none' }}>
                Ready to visit your dream property? Complete the form and our agent will contact you within 24 hours.
              </p>
            </div>

            <div className="mt-12 lg:mt-auto">
              <div className="w-10 h-10 rounded-lg bg-[#111] border border-[#222] shadow-sm flex items-center justify-center" style={{ marginBottom: '24px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h3 className="text-[1.2rem] font-bold text-[#0B0B0B]" style={{ marginBottom: '8px' }}>Start a Conversation With Us</h3>
              <p className="text-[#555555] text-[1rem]" style={{ marginBottom: '8px' }}>
                Explore exclusive properties with support from our experienced advisors.
              </p>
              <a href="mailto:support@panthers.com" className="text-[#0B0B0B] hover:text-[#FF5A3D] transition-colors font-bold text-[1rem] inline-block">
                support@panthers.com
              </a>
            </div>
          </div>

          {/* Right Side (Form) */}
          <div className="bg-white border border-[#E5E5E5] shadow-sm rounded-[24px] overflow-hidden w-full max-w-[600px] lg:max-w-[450px] xl:max-w-[500px] shrink-0">
            <ContactForm />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-24 md:mb-32 w-full">
          {/* Left Side */}
          <div className="flex flex-col items-start pr-0 lg:pr-12">
            <h2 style={{ fontSize: '44px', fontWeight: 500, color: '#191919', fontFamily: 'var(--font-poppins), sans-serif', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '24px' }}>
              Got Questions? We've Got Answers
            </h2>
            <p style={{ fontSize: '18px', color: '#757575', fontFamily: '"Roboto", sans-serif', lineHeight: 1.6, marginBottom: '40px', maxWidth: '400px', textTransform: 'none' }}>
              Everything you need to know about buying, selling, and renting with confidence.
            </p>
            <button className="flex items-center justify-between self-start transition-all hover:bg-[#333]" style={{ backgroundColor: '#000000', color: '#fff', padding: '10px 10px 10px 32px', borderRadius: '50px', fontSize: '18px', fontWeight: 500, fontFamily: '"Roboto", sans-serif' }}>
              <span style={{ marginRight: '16px' }}>Get in Touch</span>
              <div className="flex items-center justify-center bg-white text-black" style={{ width: '44px', height: '44px', borderRadius: '50%' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </button>
          </div>

          {/* Right Side (Accordion) */}
          <div className="w-full flex flex-col lg:mt-[-30px]">
            <FAQAccordion />
          </div>
        </section>

      </div>
      <FooterSection />
    </main>
    </>
  );
}
