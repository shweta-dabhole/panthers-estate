"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import MenuOverlay from '../../components/MenuOverlay';
import { FaqsSection, FooterSection } from '../page';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TermsConditionsPage() {
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
      <main id="terms-conditions-main" ref={containerRef} className="w-full flex justify-center px-6 pt-8 pb-40 overflow-hidden">
        <style dangerouslySetInnerHTML={{__html: `
          #terms-conditions-main p {
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
              Terms & Conditions
            </h1>
          </div>

          <div className="space-y-12 font-[var(--font-inter)] text-[#333] leading-[1.8] text-[16px]" style={{ marginTop: '40px' }}>
            <section>
              <h2 className="text-[22px] font-medium text-[#111] tracking-[-0.01em]" style={{ marginTop: '0px', marginBottom: '16px' }}>1. Acceptance of Terms</h2>
              <div style={{ marginBottom: '16px' }}>
                
                <p className="framer-text framer-styles-preset-12z08s1" dir="auto" >By using this website, you agree to these Terms and Conditions, including any updates, modifications, and revisions. If you do not agree, you must refrain from using the site.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[22px] font-medium text-[#111] tracking-[-0.01em]" style={{ marginTop: '24px', marginBottom: '16px' }}>2. Changes to Terms</h2>
              <div style={{ marginBottom: '16px' }}>
                
                <p className="framer-text framer-styles-preset-12z08s1" dir="auto" >We reserve the right to update or modify these Terms at any time without prior notice. Any changes will be posted on this page with the updated date. It is your responsibility to review these Terms periodically. Continued use of the site after changes are made constitutes your acceptance of those changes.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[22px] font-medium text-[#111] tracking-[-0.01em]" style={{ marginTop: '24px', marginBottom: '16px' }}>3. Use of the Website</h2>
              <div style={{ marginBottom: '16px' }}>
                
                <p className="framer-text framer-styles-preset-12z08s1" dir="auto" >You agree to use the site only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                <p className="framer-text framer-styles-preset-12z08s1" dir="auto" >Engage in any unlawful activity, including the violation of copyright, trademarks, or intellectual property rights.</p>
                <ul className="list-disc list-inside space-y-2 text-[#333] marker:text-[#555]" dir="auto"><li className="framer-text framer-styles-preset-12z08s1" data-preset-tag="p">Use the site to distribute malicious software, viruses, or other harmful computer code.</li><li className="framer-text framer-styles-preset-12z08s1" data-preset-tag="p">Use automated systems (bots, scrapers, etc.) to access or interact with the Site.</li></ul>
              </div>
            </section>

            <section>
              <h2 className="text-[22px] font-medium text-[#111] tracking-[-0.01em]" style={{ marginTop: '24px', marginBottom: '16px' }}>4. Intellectual Property</h2>
              <div style={{ marginBottom: '16px' }}>
                
                <p className="framer-text framer-styles-preset-12z08s1" dir="auto" >All content on the site, including but not limited to text, graphics, logos, images, videos, and software, is the property of Realtora or its licensors and is protected by intellectual property laws. You may not use, copy, distribute, or modify any content without explicit permission.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[22px] font-medium text-[#111] tracking-[-0.01em]" style={{ marginTop: '24px', marginBottom: '16px' }}>5. User-Generated Content</h2>
              <div style={{ marginBottom: '16px' }}>
                
                <p className="framer-text framer-styles-preset-12z08s1" dir="auto" >You may be able to submit content to the Site, including reviews, comments, or other materials. By submitting content, you grant Realtora a non-exclusive, royalty-free, perpetual, and transferable license to use, modify, reproduce, and distribute the content across our platforms.<br className="framer-text"/>You agree not to submit any content that:</p>
                <ul className="list-disc list-inside space-y-2 text-[#333] marker:text-[#555]" dir="auto"><li className="framer-text framer-styles-preset-12z08s1" data-preset-tag="p">Is defamatory, offensive, or obscene.</li><li className="framer-text framer-styles-preset-12z08s1" data-preset-tag="p">Violates any third-party rights, including intellectual property.</li><li className="framer-text framer-styles-preset-12z08s1" data-preset-tag="p">Promotes illegal activities or violates any laws.</li></ul>
              </div>
            </section>

            <section>
              <h2 className="text-[22px] font-medium text-[#111] tracking-[-0.01em]" style={{ marginTop: '24px', marginBottom: '16px' }}>6. Privacy</h2>
              <div style={{ marginBottom: '16px' }}>
                
                <p className="framer-text framer-styles-preset-12z08s1" dir="auto" >Your use of the site is governed by our Privacy Policy, which explains how we collect, use, and protect your personal data. By using the site, you consent to the collection and use of your information in accordance with the Privacy Policy.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[22px] font-medium text-[#111] tracking-[-0.01em]" style={{ marginTop: '24px', marginBottom: '16px' }}>7. Limitation of Liability</h2>
              <div style={{ marginBottom: '16px' }}>
                
                <p className="framer-text framer-styles-preset-12z08s1" dir="auto" >To the fullest extent permitted by law, Realtora is not liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the site, even if we have been advised of the possibility of such damages. We do not guarantee the accuracy, reliability, or availability of the Site or its contents.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[22px] font-medium text-[#111] tracking-[-0.01em]" style={{ marginTop: '24px', marginBottom: '16px' }}>8. Termination</h2>
              <div style={{ marginBottom: '16px' }}>
                
                <p className="framer-text framer-styles-preset-12z08s1" dir="auto" >We reserve the right to suspend or terminate your access to the site at any time, without notice, for conduct that violates these Terms or is deemed harmful to the Site or its users.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[22px] font-medium text-[#111] tracking-[-0.01em]" style={{ marginTop: '24px', marginBottom: '16px' }}>9. Change to Terms</h2>
              <div style={{ marginBottom: '16px' }}>
                
                <p className="framer-text framer-styles-preset-12z08s1" dir="auto" >We may update this Terms and Conditions from time to time. We will notify you of any material changes by posting the new policy on this page with a new effective date.</p>
              </div>
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
