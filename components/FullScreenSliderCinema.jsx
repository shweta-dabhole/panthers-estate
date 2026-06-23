"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FullScreenSliderCinema() {
  const containerRef = useRef(null);

  useEffect(() => {
    const slides = containerRef.current.querySelectorAll(".cg-slide");
    let currentSlideIndex = -1; // -1 represents the intro "Process" state
    let isAnimating = false;
    let currentTopValue = 0;

    const namesContainer = containerRef.current.querySelector(".cg-names");
    const namesWrapper = containerRef.current.querySelector(".cg-names-wrapper");
    const processIntro = containerRef.current.querySelector(".cg-process-intro");

    const elements = [
      { selector: ".cg-names", delay: 0.15 },
    ];

    // Initial setup for slides
    slides.forEach((slide, idx) => {
      if (idx !== 0) {
        const img = slide.querySelector("img");
        gsap.set(img, { scale: 2, top: "4em" });
      }
    });

    // Set initial position of names wrapper to be off-screen left and invisible
    gsap.set(namesWrapper, { x: "-100vw", opacity: 0 });

    function showIntro() {
      if (isAnimating) return;
      isAnimating = true;

      // Animate names wrapper back to the left
      gsap.to(namesWrapper, {
        x: "-100vw",
        opacity: 0,
        duration: 1,
        ease: "power4.inOut"
      });

      // Animate Process text back down to center
      gsap.to(processIntro, {
        y: "0",
        opacity: 1,
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => {
          isAnimating = false;
        }
      });
    }

    function hideIntro() {
      if (isAnimating) return;
      isAnimating = true;

      // Animate Process text up and fade out
      gsap.to(processIntro, {
        y: "-50vh",
        opacity: 0,
        duration: 1,
        ease: "power4.inOut"
      });

      // Animate names wrapper in from the left
      gsap.to(namesWrapper, {
        x: "0",
        opacity: 1,
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => {
          isAnimating = false;
        }
      });
    }

    function showSlide(index) {
      if (isAnimating) return;
      isAnimating = true;
      const slide = slides[index];
      const img = slide.querySelector("img");

      currentTopValue -= 220;

      elements.forEach((elem) => {
        gsap.to(containerRef.current.querySelector(elem.selector), {
          y: `${currentTopValue}px`,
          duration: 1.2,
          ease: "power4.inOut",
          delay: elem.delay,
        });
      });

      gsap.to(img, {
        scale: 1,
        top: "0%",
        duration: 1.2,
        ease: "power3.inOut",
      });
      gsap.to(
        slide,
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          duration: 1.2,
          ease: "power4.inOut",
          onComplete: () => {
            isAnimating = false;
          },
        },
        "<"
      );
    }

    function hideSlide(index) {
      if (isAnimating) return;
      isAnimating = true;
      const slide = slides[index];
      const img = slide.querySelector("img");

      currentTopValue += 220;
      elements.forEach((elem) => {
        gsap.to(containerRef.current.querySelector(elem.selector), {
          y: `${currentTopValue}px`,
          duration: 1.2,
          ease: "power4.inOut",
          delay: elem.delay,
        });
      });

      gsap.to(slide, {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        duration: 1.2,
        ease: "power4.inOut",
      });

      gsap.to(img, {
        scale: 2,
        top: "4em",
        duration: 1.2,
        ease: "power3.inOut",
      });

      gsap.to(
        slide,
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          duration: 1.2,
          ease: "power4.inOut",
          onComplete: () => {
            isAnimating = false;
          },
        },
        "<"
      );
    }

    const container = containerRef.current;
    
    const onWheel = (e) => {
      if (isAnimating) {
          e.preventDefault();
          return;
      }
      
      if (e.deltaY > 0 && currentSlideIndex === slides.length - 1) {
          return;
      }
      
      if (e.deltaY < 0 && currentSlideIndex === -1) {
          return;
      }

      e.preventDefault();
      
      if (e.deltaY > 0) {
        if (currentSlideIndex === -1) {
            hideIntro();
            currentSlideIndex++;
        } else if (currentSlideIndex < slides.length - 1) {
            showSlide(currentSlideIndex + 1);
            currentSlideIndex++;
        }
      } else if (e.deltaY < 0) {
        if (currentSlideIndex === 0) {
            showIntro();
            currentSlideIndex--;
        } else if (currentSlideIndex > 0) {
            hideSlide(currentSlideIndex);
            currentSlideIndex--;
        }
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen mb-32 md:mb-36 overflow-hidden font-['Poppins',sans-serif]">
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

      {/* Slider Content */}
      <div className="absolute top-0 left-0 w-full h-full z-50 bg-black/50 pointer-events-none">
        
        {/* Intro Process Text */}
        <div className="cg-process-intro absolute inset-0 flex items-center justify-center pointer-events-none p-4">
          <h1 className="text-white text-center text-[28px] md:text-[40px] lg:text-[56px] font-medium uppercase tracking-wider font-['Poppins',sans-serif] max-w-5xl leading-tight">
            THE PATH TO YOUR <br /> <span className="italic">DREAM HOME</span>
          </h1>
        </div>

        <div className="cg-names-wrapper absolute top-[65%] left-0 w-full -translate-y-1/2 h-[300px] text-white text-[36px] md:text-[56px] leading-tight uppercase [clip-path:polygon(0_0,100%_0,100%_220px,0_220px)] whitespace-nowrap">
          <div className="relative cg-names flex flex-col items-center w-full">
            <div className="h-[220px] flex flex-col justify-start items-center text-center">
              <div>Discover Your Vision</div>
              <p style={{ marginTop: '2rem' }} className="text-[16px] md:text-[18px] normal-case leading-normal whitespace-normal max-w-3xl font-normal text-white/80 tracking-normal mx-auto">
                We begin by understanding your lifestyle, preferences, and aspirations to find a residence that truly represents your vision. Every requirement is carefully considered to create a personalized property journey tailored to your needs.
              </p>
            </div>
            <div className="h-[220px] flex flex-col justify-start items-center text-center">
              <div>Curated Property Selection</div>
              <p style={{ marginTop: '2rem' }} className="text-[16px] md:text-[18px] normal-case leading-normal whitespace-normal max-w-6xl font-normal text-white/80 tracking-normal mx-auto">
                Explore our exclusive collection of luxury residences chosen for their exceptional design,<br />
                prime locations, and timeless value. Our experts carefully shortlist properties that align<br />
                with your lifestyle, investment goals, and expectations.
              </p>
            </div>
            <div className="h-[220px] flex flex-col justify-start items-center text-center">
              <div>Private Property Experience</div>
              <p style={{ marginTop: '2rem' }} className="text-[16px] md:text-[18px] normal-case leading-normal whitespace-normal max-w-6xl font-normal text-white/80 tracking-normal mx-auto">
                Enjoy personalized tours of carefully selected residences where every architectural detail and<br />
                refined space can be experienced. We ensure every visit feels exclusive, comfortable,<br />
                and focused on discovering your ideal home.
              </p>
            </div>
            <div className="h-[220px] flex flex-col justify-start items-center text-center">
              <div>Seamless Purchase Journey</div>
              <p style={{ marginTop: '2rem' }} className="text-[16px] md:text-[18px] normal-case leading-normal whitespace-normal max-w-6xl font-normal text-white/80 tracking-normal mx-auto px-4">
                From property discussions to negotiations and documentation, we manage every step with precision<br />
                and care. Our experts ensure a smooth, transparent, and stress-free experience throughout<br />
                the process. From final approvals to handover, we make your transition into ownership effortless.
              </p>
            </div>
            <div className="h-[220px] flex flex-col justify-start items-center text-center">
              <div>Welcome To Your New Home</div>
              <p style={{ marginTop: '2rem' }} className="text-[16px] md:text-[18px] normal-case leading-normal whitespace-normal max-w-6xl font-normal text-white/80 tracking-normal mx-auto">
                Step into a residence designed around elegance, comfort, and the lifestyle you desire.<br />
                Experience a home where thoughtful design, refined details, and luxury come together.<br />
                A place crafted to create lasting memories and a life that feels truly yours.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Slider */}
      <div className="relative w-full h-full">
        <div className="cg-slide absolute bottom-0 left-0 w-full h-full overflow-hidden [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]">
          <img src="/assets/1 process.png" alt="" className="absolute top-0 left-0 w-full h-full object-cover" />
        </div>
        <div className="cg-slide absolute bottom-0 left-0 w-full h-full overflow-hidden [clip-path:polygon(0_100%,100%_100%,100%_100%,0_100%)]">
          <img src="/assets/2 process.png" alt="" className="absolute top-0 left-0 w-full h-full object-cover" />
        </div>
        <div className="cg-slide absolute bottom-0 left-0 w-full h-full overflow-hidden [clip-path:polygon(0_100%,100%_100%,100%_100%,0_100%)]">
          <img src="/assets/3 process.png" alt="" className="absolute top-0 left-0 w-full h-full object-cover" />
        </div>
        <div className="cg-slide absolute bottom-0 left-0 w-full h-full overflow-hidden [clip-path:polygon(0_100%,100%_100%,100%_100%,0_100%)]">
          <img src="/assets/4 process.png" alt="" className="absolute top-0 left-0 w-full h-full object-cover" />
        </div>
        <div className="cg-slide absolute bottom-0 left-0 w-full h-full overflow-hidden [clip-path:polygon(0_100%,100%_100%,100%_100%,0_100%)]">
          <img src="/assets/5 process.png" alt="" className="absolute top-0 left-0 w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
