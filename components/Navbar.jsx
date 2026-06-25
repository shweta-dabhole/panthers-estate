"use client";

import React from 'react';
import Link from 'next/link';

export default function Navbar({ isWhiteText = false }) {
  const textColor = isWhiteText ? '#ffffff' : '#E05A00';
  const borderColor = isWhiteText ? '#ffffff' : '#E05A00';
  const iconBgColor = isWhiteText ? '#ffffff' : '#E05A00';
  const iconColor = isWhiteText ? '#1A1A1A' : '#ffffff';

  return (
    <div className="absolute top-0 left-0 w-full flex justify-between items-center z-[9999] pointer-events-none" style={{ padding: '2rem 4rem', backgroundColor: 'transparent', margin: 0, border: 'none' }}>
      <Link href="/" className="pointer-events-auto" style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', color: textColor, letterSpacing: '1px', textDecoration: 'none' }}>
        PANTHERS
      </Link>
      <div 
        onClick={() => {
          window.dispatchEvent(new CustomEvent('panthers:toggleMenu'));
        }}
        className="relative inline-flex items-center rounded-full border group transition-all duration-300 pointer-events-auto cursor-pointer"
        style={{ height: '36px', paddingLeft: '16px', paddingRight: '4px', borderColor: borderColor }}
      >
        <span 
          className="font-semibold" 
          style={{ fontSize: '13px', letterSpacing: '0.025em', fontFamily: "var(--font-poppins), 'Poppins', sans-serif", marginRight: '12px', color: textColor }}
        >
          Menu
        </span>
        <div 
          className="flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
          style={{ width: '28px', height: '28px', backgroundColor: iconBgColor, color: iconColor }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        </div>
      </div>
    </div>
  );
}
