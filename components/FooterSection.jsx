"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FooterSection() {
  const sectionRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      gsap.fromTo(topRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
      gsap.fromTo(bottomRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 50%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="w-full relative flex flex-col items-center overflow-hidden" style={{ minHeight: '700px', padding: '100px 5% 60px 5%' }}>

      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img src="/assets/BBK7G2W0GpZei2zukI6jNqEI6X4.jpeg" alt="Footer Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a]"></div>
      </div>

      {/* Top: Newsletter */}
      <div ref={topRef} className="relative z-10 w-full max-w-[800px] flex flex-col items-center text-center" style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '56px', fontWeight: 500, color: '#ffffff', fontFamily: '"Outfit", sans-serif', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '20px' }}>
          Join Our News Letter
        </h2>
        <p style={{ fontSize: '18px', color: '#e5e5e5', fontFamily: '"Roboto", sans-serif', lineHeight: 1.6, marginBottom: '40px', maxWidth: '400px' }}>
          Stay informed. Get the best local<br />real estate updates without the fluff.
        </p>

        {/* Form */}
        <div className="flex items-center" style={{ gap: '16px' }}>
          <input
            type="email"
            placeholder="Enter Your Email"
            aria-label="Enter Your Email"
            className="outline-none placeholder-gray-300"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              padding: '16px 24px',
              borderRadius: '40px',
              width: '340px',
              fontSize: '16px',
              fontFamily: '"Roboto", sans-serif'
            }}
          />
          <button
            className="transition-transform hover:scale-105"
            style={{ backgroundColor: '#E05A00', color: '#ffffff', padding: '16px 36px', borderRadius: '40px', fontSize: '16px', fontWeight: 600, fontFamily: '"Roboto", sans-serif' }}
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom: Brand + Links */}
      <div ref={bottomRef} className="relative z-10 w-full max-w-[1200px] flex flex-col md:flex-row justify-between items-start" style={{ marginTop: 'auto', paddingTop: '120px' }}>

        {/* Left */}
        <div className="flex flex-col" style={{ maxWidth: '300px' }}>
          <h3 style={{ fontSize: '32px', fontWeight: 600, color: '#E05A00', fontFamily: '"Outfit", sans-serif', marginBottom: '16px' }}>
            Panthers
          </h3>
          <p style={{ fontSize: '16px', color: '#a3a3a3', fontFamily: '"Roboto", sans-serif', lineHeight: 1.6, marginBottom: '24px' }}>
            Begin Your Journey Toward Your Dream Home Today.
          </p>
          <div className="flex" style={{ gap: '16px' }}>
            <a href="#" className="flex items-center justify-center rounded-full transition-colors duration-300 bg-white/5 border border-white/10 text-white hover:bg-[#E05A00] hover:border-[#E05A00]" style={{ width: '44px', height: '44px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="flex items-center justify-center rounded-full transition-colors duration-300 bg-white/5 border border-white/10 text-white hover:bg-[#E05A00] hover:border-[#E05A00]" style={{ width: '44px', height: '44px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </a>
            <a href="#" className="flex items-center justify-center rounded-full transition-colors duration-300 bg-white/5 border border-white/10 text-white hover:bg-[#E05A00] hover:border-[#E05A00]" style={{ width: '44px', height: '44px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="flex items-center justify-center rounded-full transition-colors duration-300 bg-white/5 border border-white/10 text-white hover:bg-[#E05A00] hover:border-[#E05A00]" style={{ width: '44px', height: '44px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>

        {/* Right Links */}
        <div className="flex" style={{ gap: '120px' }}>
          <div className="flex flex-col">
            <h4 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', fontFamily: '"Roboto", sans-serif', marginBottom: '32px' }}>
              Main Pages
            </h4>
            <div className="flex flex-col" style={{ gap: '20px' }}>
              {[
                { name: 'Home', href: '/' },
                { name: 'Projects', href: '/projects' },
                { name: 'Process', href: '/process' },
                { name: 'About', href: '/about-us' },
                { name: 'Contact', href: '/contact' }
              ].map(link => (
                <a key={link.name} href={link.href} style={{ fontSize: '16px', color: '#a3a3a3', fontFamily: '"Roboto", sans-serif', transition: 'color 0.3s' }} className="hover:text-white">
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h4 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', fontFamily: '"Roboto", sans-serif', marginBottom: '32px' }}>
              Other pages
            </h4>
            <div className="flex flex-col" style={{ gap: '20px' }}>
              {[
                { name: '404', href: '/404' },
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Terms & Conditions', href: '/terms-conditions' }
              ].map(link => (
                <a key={link.name} href={link.href} style={{ fontSize: '16px', color: '#a3a3a3', fontFamily: '"Roboto", sans-serif', transition: 'color 0.3s' }} className="hover:text-white">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
