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

    // Set initial position of names wrapper to be off-screen right and invisible
    gsap.set(namesWrapper, { x: "100vw", opacity: 0 });

    function showIntro() {
      if (isAnimating) return;
      isAnimating = true;

      // Animate names wrapper back to the right
      gsap.to(namesWrapper, {
        x: "100vw",
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

      currentTopValue -= 350;

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

      currentTopValue += 350;
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
        <a href="/" className="pointer-events-auto" style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', color: '#E05A00', letterSpacing: '1px', textDecoration: 'none' }}>
          PANTHERS
        </a>
        <div 
          onClick={() => {
            window.dispatchEvent(new CustomEvent('panthers:toggleMenu'));
          }}
          className="relative inline-flex items-center rounded-full border border-[#E05A00] group transition-all duration-300 pointer-events-auto cursor-pointer"
          style={{ height: '36px', paddingLeft: '16px', paddingRight: '4px' }}
        >
          <span 
            className="font-semibold text-[#E05A00]" 
            style={{ fontSize: '13px', letterSpacing: '0.025em', fontFamily: "var(--font-poppins), 'Poppins', sans-serif", marginRight: '12px' }}
          >
            Menu
          </span>
          <div 
            className="flex items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
            style={{ width: '28px', height: '28px', backgroundColor: '#E05A00' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </div>
        </div>
      </div>

      {/* Slider Content */}
      <div className="absolute top-0 right-0 w-1/2 h-full z-50 bg-[#FFFFFF] pointer-events-none flex flex-col justify-center">
        
        {/* Intro Process Text */}
        <div className="cg-process-intro absolute inset-0 flex items-center justify-start pointer-events-none pr-8" style={{ paddingLeft: '2vw' }}>
          <h1 className="text-[#1A1A1A] text-center text-[28px] md:text-[40px] lg:text-[56px] font-medium uppercase tracking-wider font-['Poppins',sans-serif] max-w-5xl leading-tight">
            THE PATH TO YOUR <br /> <span className="italic text-[#E05A00]">DREAM HOME</span>
          </h1>
        </div>

        <div className="cg-names-wrapper absolute top-[65%] left-0 w-full -translate-y-1/2 h-[450px] text-[#1A1A1A] text-[32px] md:text-[44px] leading-tight uppercase [clip-path:polygon(0_0,100%_0,100%_350px,0_350px)] whitespace-normal pr-8" style={{ paddingLeft: '2vw' }}>
          <div className="relative cg-names flex flex-col items-start w-full">
            <div className="h-[350px] flex flex-col justify-start items-start text-left">
              <div>Discover Your Vision</div>
              <p style={{ marginTop: '3.5rem' }} className="text-[16px] md:text-[18px] normal-case leading-normal whitespace-normal w-[90%] max-w-2xl pr-6 font-['Roboto',sans-serif] font-normal text-[#1A1A1A] tracking-normal ml-0">
                We begin by understanding your lifestyle, preferences, and aspirations to find a residence that reflects your vision. Every detail is thoughtfully considered to create a personalized property journey. From selecting the perfect location to exploring premium designs and features, we ensure a seamless experience. With expert guidance and transparent communication, we help you discover a home built around your comfort, goals, and future.
              </p>
            </div>
            <div className="h-[350px] flex flex-col justify-start items-start text-left">
              <div>Curated Property <br /> Selection</div>
              <p style={{ marginTop: '3.5rem' }} className="text-[16px] md:text-[18px] normal-case leading-normal whitespace-normal w-[90%] max-w-2xl pr-6 font-['Roboto',sans-serif] font-normal text-[#1A1A1A] tracking-normal ml-0">
                Explore our exclusive collection of luxury residences chosen for their exceptional design, prime locations, and timeless value. Our experts carefully shortlist properties that align with your lifestyle, investment goals, and expectations. Each residence is selected for its quality, comfort, and thoughtfully designed spaces. From elegant interiors to premium features, we help you find a home that matches your vision. Experience a curated selection of properties crafted for a refined and luxurious lifestyle.
              </p>
            </div>
            <div className="h-[350px] flex flex-col justify-start items-start text-left">
              <div>Private Property <br /> Experience</div>
              <p style={{ marginTop: '3.5rem' }} className="text-[16px] md:text-[18px] normal-case leading-normal whitespace-normal w-[90%] max-w-2xl pr-6 font-['Roboto',sans-serif] font-normal text-[#1A1A1A] tracking-normal ml-0">
                Enjoy personalized tours of carefully selected residences where every architectural detail and refined space can be experienced. We ensure every visit feels exclusive, comfortable, and focused on discovering your ideal home. Our team provides a guided experience, helping you explore unique features and premium amenities. Every property tour is designed to bring your vision closer to reality with ease and confidence. Step into spaces crafted for luxury, comfort, and a lifestyle that truly reflects you.
              </p>
            </div>
            <div className="h-[350px] flex flex-col justify-start items-start text-left">
              <div>Seamless Purchase <br /> Journey</div>
              <p style={{ marginTop: '3.5rem' }} className="text-[16px] md:text-[18px] normal-case leading-normal whitespace-normal w-[90%] max-w-2xl pr-6 font-['Roboto',sans-serif] font-normal text-[#1A1A1A] tracking-normal ml-0">
                From property discussions to negotiations and documentation, we manage every step with precision and care. Our experts ensure a smooth, transparent, and stress-free experience throughout the process. We handle every detail, from final approvals to seamless handover, making ownership effortless. With trusted guidance and dedicated support, we help turn your property journey into a confident and rewarding experience.
              </p>
            </div>
            <div className="h-[350px] flex flex-col justify-start items-start text-left">
              <div>Welcome To Your <br /> New Home</div>
              <p style={{ marginTop: '3.5rem' }} className="text-[16px] md:text-[18px] normal-case leading-normal whitespace-normal w-[90%] max-w-2xl pr-6 font-['Roboto',sans-serif] font-normal text-[#1A1A1A] tracking-normal ml-0">
                Step into a residence designed around elegance, comfort, and the lifestyle you desire. Experience a home where thoughtful design, refined details, and luxury come together seamlessly. Every space is crafted to reflect your personality, offering a perfect balance of beauty and functionality. Create lasting memories in a home that inspires comfort, sophistication, and a truly elevated living experience.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Slider */}
      <div className="absolute top-[55%] -translate-y-1/2 left-[4rem] w-[calc(50%-8rem)] h-[450px] z-0 rounded-[2rem] overflow-hidden shadow-lg">
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
