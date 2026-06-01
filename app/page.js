"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Home() {
  const preLoaderRef = useRef(null);
  const progressBarRef = useRef(null);
  const heroImgsRef = useRef(null);
  const navRef = useRef(null);
  const loaderImgRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 1. Initial State Setup
    // Position navigation out of screen initially
    gsap.set(navRef.current, { y: -150 });

    // Set initial scale and rotation to images for a subtle organic entry
    const images = heroImgsRef.current ? heroImgsRef.current.querySelectorAll("img") : [];
    gsap.set(images, { scale: 1.10 });

    // Set initial scale and opacity for centered loader image
    gsap.set(loaderImgRef.current, { scale: 0.4, opacity: 0 });

    // 2. Timeline for the preloader and entry animations
    const tl = gsap.timeline();

    // Animate the counter value smoothly from 0 to 100 in sync with the progress bar
    const counterObj = { value: 0 };
    tl.to(
      counterObj,
      {
        value: 100,
        duration: 2.3,
        ease: "power2.out",
        onUpdate: () => {
          setCount(Math.floor(counterObj.value));
        },
      },
      0
    );

    // Animate centered showcase image scaling up as the page loads
    tl.to(
      loaderImgRef.current,
      {
        scale: 1.0,
        opacity: 1.0,
        duration: 2.3,
        ease: "power2.out",
      },
      0
    );

    // Sync progress bar width from 0% to 100% over the counter duration
    tl.to(
      progressBarRef.current,
      {
        width: "100%",
        duration: 2.3,
        ease: "power3.inOut",
      },
      0
    );

    // Brief hold on 100% and then fade out progress bar
    tl.to(
      progressBarRef.current,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      },
      "-=0.1"
    );

    // Slide up pre-loader screen like a curtain to reveal the main screen
    tl.to(
      preLoaderRef.current,
      {
        yPercent: -100,
        duration: 1.0,
        ease: "power4.inOut",
      },
      "+=0.1"
    );

    // Staggered clip-path swipe reveal of the images (Right to Left)
    if (images.length > 0) {
      tl.to(
        images,
        {
          clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
          duration: 1.8,
          ease: "power2.inOut",
          stagger: 0.55,
        },
        "-=0.85" // overlaps with the curtain slide-up for a seamless transition
      );

      // Parallax scale down zoom effect as each image is revealed
      tl.to(
        images,
        {
          scale: 1.0,
          duration: 2.6,
          ease: "power1.out",
          stagger: 0.55,
        },
        "-=1.8" // sync with the start of the clip-path animations
      );
    }

    // Animate navigation bar sliding down into view
    tl.to(
      navRef.current,
      {
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      },
      "-=0.6"
    );

    // Clean up timeline on unmount
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative h-screen w-full flex flex-col overflow-hidden bg-[var(--bg-light)] select-none">
      {/* 1. Pre-loader Section */}
      <div ref={preLoaderRef} className="pre-loader">
        {/* Centered Showcase Image */}
        <div 
          ref={loaderImgRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full max-w-[280px] sm:max-w-[360px] md:max-w-[440px] px-4"
        >
          <img 
            src="/assets/panthers%20logo.png" 
            alt="Panthers Estate Logo" 
            className="h-auto max-h-[25vh] w-full object-contain loader-logo-blink"
          />
        </div>

        <div className="absolute bottom-12 right-12 flex items-end gap-3 md:bottom-16 md:right-16 md:gap-5">
          <p className="font-light tracking-wide">Loading</p>
          <div className="counter font-semibold">
            {count}%
          </div>
        </div>
        {/* Progress Bar Line */}
        <div className="progress-bar-container">
          <div ref={progressBarRef} className="progress-bar" />
        </div>
      </div>

      {/* 2. Navbar (Now outside hero, at the top) */}
      <nav ref={navRef}>
        <div className="logo">
          <img src="/assets/panthers%20logo.png" alt="Panthers Estate" />
        </div>
        <div className="menu">
          <p>Menu</p>
        </div>
      </nav>

      {/* 3. Main Hero Website Section */}
      <section className="hero">
        <div ref={heroImgsRef} className="hero-imgs">
          <img src="/assets/home%202.jpg" alt="Panthers Home 2" />
          <img src="/assets/home%203.jpg" alt="Panthers Home 3" />
          <img src="/assets/home%204.jpg" alt="Panthers Home 4" />
          <img src="/assets/home%205.jpg" alt="Panthers Home 5" />
          <img src="/assets/home%206.jpg" alt="Panthers Home 6" />
          <img src="/assets/home%207.jpg" alt="Panthers Home 7" />
          <img src="/assets/home%201.jpg" alt="Panthers Home 1" />
        </div>
      </section>
    </div>
  );
}
