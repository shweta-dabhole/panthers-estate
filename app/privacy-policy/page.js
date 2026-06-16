"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MenuOverlay from '../../components/MenuOverlay';
import { FaqsSection, FooterSection } from '../page';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PrivacyPolicyPage() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Animate the main heading
    gsap.fromTo(
      ".force-h1-style",
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: "power3.out", 
        scrollTrigger: {
          trigger: ".force-h1-style",
          start: "top 85%",
        }
      }
    );

    // Animate each section (points) on scroll
    gsap.utils.toArray("section").forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#191919] selection:bg-[#191919] selection:text-white">
      <MenuOverlay isBlackText={true} />
      
      {/* Simple Header - keeping the panthers navbar but with dark text */}
      <nav className="w-full flex justify-between items-center p-8 z-50 relative">
        <Link href="/">
          <p className="uppercase tracking-widest cursor-pointer hover:opacity-70 transition-opacity" style={{ color: 'black', textShadow: 'none', fontSize: '20px', fontWeight: '900', letterSpacing: '2px', lineHeight: '1', marginLeft: '12px' }}>
            Panthers
          </p>
        </Link>
      </nav>

      {/* Content */}
      <main id="privacy-policy-main" ref={containerRef} className="w-full flex justify-center px-6 pt-8 pb-40 overflow-hidden">
        <style dangerouslySetInnerHTML={{__html: `
          #privacy-policy-main p {
            text-transform: none !important;
            font-size: inherit !important;
            font-weight: normal !important;
          }
          .force-h1-style {
            font-size: 50px !important;
            font-weight: 400 !important;
            font-family: var(--font-poppins), sans-serif !important;
            text-transform: capitalize !important;
            margin-top: 80px !important;
            margin-bottom: 40px !important;
          }
          .force-content-margin {
            margin-top: 40px !important;
          }
        `}} />
        <div ref={contentRef} className="w-full max-w-[768px]">
          <div className="text-center">
            <h1 className="mb-5 leading-tight tracking-[-0.02em] text-[#111] whitespace-nowrap force-h1-style">
              Privacy Policy
            </h1>
          </div>

          <div className="space-y-12 font-[var(--font-roboto)] text-[#333] leading-[1.8] text-[16px]" style={{ marginTop: '40px' }}>
            <section>
              <h2 className="text-[22px] font-medium text-[#111] tracking-[-0.01em]" style={{ marginBottom: '16px' }}>1. Information We Collect</h2>
              <p style={{ marginBottom: '16px' }}>
                We may collect and process the following types of information:
                Name, Email address, Phone number, Mailing address, Other identifiable information and browsing data when you interact with our website.
              </p>
            </section>

            <section>
              <h2 className="text-[22px] font-medium text-[#111] tracking-[-0.01em]" style={{ marginTop: '24px', marginBottom: '16px' }}>2. How We Use Your Information</h2>
              <p style={{ marginBottom: '16px' }}>
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#333] marker:text-[#555]">
                <li>Operate and improve our website</li>
                <li>Respond to your messages or inquiries</li>
                <li>Understand how visitors use our site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[22px] font-medium text-[#111] tracking-[-0.01em]" style={{ marginTop: '24px', marginBottom: '16px' }}>3. Cookies</h2>
              <p style={{ marginBottom: '16px' }}>
                Our site may use cookies to enhance your experience. You can choose to disable cookies in your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-[22px] font-medium text-[#111] tracking-[-0.01em]" style={{ marginTop: '24px', marginBottom: '16px' }}>4. Security</h2>
              <p style={{ marginBottom: '16px' }}>
                We implement appropriate technical and organizational measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-[22px] font-medium text-[#111] tracking-[-0.01em]" style={{ marginTop: '24px', marginBottom: '16px' }}>5. Third-Party Links</h2>
              <p style={{ marginBottom: '16px' }}>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of such websites.
              </p>
            </section>

            <section>
              <h2 className="text-[22px] font-medium text-[#111] tracking-[-0.01em]" style={{ marginTop: '24px', marginBottom: '16px' }}>6. Your Rights</h2>
              <p style={{ marginBottom: '16px' }}>
                You can:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#333] marker:text-[#555]">
                <li>Choose not to provide personal information</li>
                <li>Disable cookies in your browser</li>
                <li>Contact us to request deletion of any personal data we may have</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[22px] font-medium text-[#111] tracking-[-0.01em]" style={{ marginTop: '24px', marginBottom: '16px' }}>7. Changes to This Privacy Policy</h2>
              <p style={{ marginBottom: '16px' }}>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page with a new effective date.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Include the exported sections */}
      <FaqsSection />
      <FooterSection />
    </div>
  );
}
