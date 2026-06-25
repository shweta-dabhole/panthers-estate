#1A1A1A"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LuxuryHero() {
  const headingText = "Where Luxury Meets \nYour Vision";

  return (
    <section className="hero-expand-section relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Overlay Header */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center z-[9999] pointer-events-none" style={{ padding: '2rem 4rem', backgroundColor: 'transparent', margin: 0, border: 'none' }}>
        <a href="/" className="pointer-events-auto" style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', color: '#fff', letterSpacing: '1px', textDecoration: 'none' }}>
          PANTHERS
        </a>
        <div
          onClick={() => {
            window.dispatchEvent(new CustomEvent('panthers:toggleMenu'));
          }}
          className="flex items-center gap-2 pointer-events-auto"
          style={{ cursor: 'pointer', color: '#fff' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        </div>
      </div>

      {/* Background with Ken Burns Effect */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url("/assets/new villa.png")' }}
        />
      </motion.div>

      {/* Dark Transparent Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/30 to-black/80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-start justify-center text-left w-full h-full gap-6" style={{ padding: '0 4rem' }}>
        <h1 className="text-white text-[1.5rem] md:text-[2.5rem] lg:text-[3.5rem] font-medium tracking-normal leading-tight overflow-hidden flex flex-wrap justify-start font-['Poppins',sans-serif]">
          {headingText.split("").map((char, index) => {
            if (char === "\n") return <div key={index} className="basis-full h-0" />;
            return (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.2, 0.65, 0.3, 0.9],
                  delay: index * 0.05,
                }}
                style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
              >
                {char}
              </motion.span>
            );
          })}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: headingText.length * 0.05 + 0.3,
          }}
          className="text-white/80 text-[14px] md:text-[18px] max-w-2xl font-light tracking-wide uppercase text-left"
        >
          We curate luxury residences with integrity, precision, and a deep understanding of what makes a home truly yours.
        </motion.p>
      </div>


    </section>
  );
}
