"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Link from "next/link";
import MenuOverlay from "./MenuOverlay";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Horizontal Loop helper function
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
    repeat: config.repeat,
    defaults: { ease: "none" },
  });
  let length = items.length;
  let startX = items[0].offsetLeft;
  let widths = [];
  let xPercents = [];
  let pixelsPerSecond = (config.speed || 1) * 100;
  let totalWidth, curX, distanceToStart, distanceToLoop, item, i;

  gsap.set(items, {
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] =
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
        gsap.getProperty(el, "xPercent");
      return xPercents[i];
    },
  });

  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);

  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
      item,
      {
        xPercent: ((curX - distanceToLoop) / widths[i]) * 100,
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    ).fromTo(
      item,
      { xPercent: ((curX - distanceToLoop + totalWidth) / widths[i]) * 100 },
      {
        xPercent: xPercents[i],
        duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
        immediateRender: false,
      },
      distanceToLoop / pixelsPerSecond
    );
  }

  tl.progress(1, true).progress(0, true);
  return tl;
}

export default function TailwindCapsulesStickyCards() {
  const containerRef = useRef(null);

  useEffect(() => {
    let lenis;
    function raf(time) {
      if (lenis) lenis.raf(time * 1000);
    }

    if (typeof window !== "undefined") {
      lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    let ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const cards = gsap.utils.toArray(".card-section", container);
      if (!cards.length) return;
      const introCard = cards[0];

      const marqueeItems = gsap.utils.toArray(".marquee h1", container);
      if (marqueeItems.length > 0) {
        horizontalLoop(marqueeItems, {
          repeat: -1,
          paddingRight: 30,
        });
      }

      const cardImgWrapper = introCard.querySelector(".card-img");
      const cardImg = introCard.querySelector(".card-img img");
      if (cardImgWrapper && cardImg) {
        gsap.set(cardImgWrapper, { scale: 0, borderRadius: "200px", opacity: 0 });
        gsap.set(cardImg, { scale: 1.5 });
      }

      function animateContentIn(titleChars, description) {
        gsap.to(titleChars, { x: "0%", duration: 0.75, ease: "power4.out" });
        gsap.to(description, {
          x: 0,
          opacity: 1,
          duration: 0.75,
          delay: 0.1,
          ease: "power4.out",
        });
      }

      function animateContentOut(titleChars, description) {
        gsap.to(titleChars, { x: "100%", duration: 0.5, ease: "power4.out" });
        gsap.to(description, {
          x: "40px",
          opacity: 0,
          duration: 0.5,
          ease: "power4.out",
        });
      }

      const marquee = introCard.querySelector(".card-marquee .marquee");
      const titleChars = introCard.querySelectorAll(".char span");
      const description = introCard.querySelector(".card-description");

      ScrollTrigger.create({
        trigger: introCard,
        start: "top top",
        end: "+=300vh",
        onUpdate: (self) => {
          const progress = self.progress;
          const imgScale = progress;
          const currentBorderRadius = progress > 0 ? 24 / progress : 200;
          const innerImgScale = 1.5 - progress * 0.5;

          if (cardImgWrapper && cardImg) {
            gsap.set(cardImgWrapper, {
              scale: imgScale,
              borderRadius: currentBorderRadius + "px",
              opacity: Math.min(1, progress * 10)
            });
            gsap.set(cardImg, { scale: innerImgScale });
          }

          const textLeft = introCard.querySelector(".text-left-part");
          const textRight = introCard.querySelector(".text-right-part");
          if (textLeft && textRight) {
            gsap.set(textLeft, { x: `${-progress * 60}vw`, opacity: Math.max(0, 1 - progress * 1.5) });
            gsap.set(textRight, { x: `${progress * 60}vw`, opacity: Math.max(0, 1 - progress * 1.5) });
          }

          if (marquee) {
            if (imgScale >= 0.5 && imgScale <= 0.75) {
              const fadeProgress = (imgScale - 0.5) / (0.75 - 0.5);
              gsap.set(marquee, { opacity: 1 - fadeProgress });
            } else if (imgScale < 0.5) {
              gsap.set(marquee, { opacity: 1 });
            } else if (imgScale > 0.75) {
              gsap.set(marquee, { opacity: 0 });
            }
          }

          if (progress >= 1 && !introCard.contentRevealed) {
            introCard.contentRevealed = true;
            if (titleChars.length && description) animateContentIn(titleChars, description);
          }
          if (progress < 1 && introCard.contentRevealed) {
            introCard.contentRevealed = false;
            if (titleChars.length && description) animateContentOut(titleChars, description);
          }
        },
      });

      cards.forEach((card, index) => {
        const isLastCard = index === cards.length - 1;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          end: isLastCard ? "+=100vh" : "top top",
          endTrigger: isLastCard ? null : cards[cards.length - 1],
          pin: true,
          pinSpacing: isLastCard,
        });
      });

      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          const cardWrapper = card.querySelector(".card-wrapper");
          if (cardWrapper) {
            ScrollTrigger.create({
              trigger: cards[index + 1],
              start: "top bottom",
              end: "top top",
              onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(cardWrapper, {
                  scale: 1 - progress * 0.25,
                  opacity: 1 - progress,
                });
              },
            });
          }
        }
      });

      cards.forEach((card, index) => {
        if (index > 0) {
          const cImg = card.querySelector(".card-img img");
          const imgContainer = card.querySelector(".card-img");
          if (cImg && imgContainer) {
            ScrollTrigger.create({
              trigger: card,
              start: "top bottom",
              end: "top top",
              onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(cImg, { scale: 2 - progress });
                gsap.set(imgContainer, { borderRadius: 150 - progress * 125 + "px" });
              },
            });
          }
        }
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        const cardDescription = card.querySelector(".card-description");
        const cardTitleChars = card.querySelectorAll(".char span");

        if (cardTitleChars.length && cardDescription) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            onEnter: () => animateContentIn(cardTitleChars, cardDescription),
            onLeaveBack: () => animateContentOut(cardTitleChars, cardDescription),
          });
        }
      });
      
    }, containerRef);

    return () => {
      ctx.revert();
      if (lenis) {
        lenis.destroy();
        gsap.ticker.remove(raf);
      }
    };
  }, []);

  const renderTitle = (text) => {
    return text.split(" ").map((word, wordIndex, arr) => (
      <span key={wordIndex} className="inline-block whitespace-nowrap">
        {word.split("").map((char, charIndex) => (
          <div key={charIndex} className="char relative overflow-hidden inline-block">
            <span className="inline-block will-change-transform translate-x-full">
              {char}
            </span>
          </div>
        ))}
        {wordIndex !== arr.length - 1 && (
          <span className="inline-block w-[0.4em]"></span>
        )}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="bg-[#F9F9F9] text-black font-sans overflow-x-hidden">
      <MenuOverlay isBlackText={true} />
      <nav className="absolute top-0 w-full flex justify-between items-center z-50 px-6 py-6 md:px-16 md:py-8">
        <Link href="/" style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', color: '#000', letterSpacing: '1px', textDecoration: 'none' }}>
          PANTHERS
        </Link>
        <div 
          onClick={() => {
            window.dispatchEvent(new CustomEvent('panthers:toggleMenu'));
          }}
          className="flex items-center gap-2"
          style={{ cursor: 'pointer', color: '#000' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        </div>
      </nav>
      <section className="relative flex flex-col gap-[25svh]">
        {/* Card 1 */}
        <div className="card-section intro relative w-screen h-[100svh] p-[1.5em]">
          
          <div className="card-wrapper relative w-full h-full z-10">
            {/* Background Text Flanking the Image */}
            <div className="bg-text absolute inset-0 flex items-center justify-center gap-[2vw] w-full pointer-events-none z-0 overflow-hidden">
              <div className="text-left-part">
                <h1 className="text-5xl md:text-[6rem] lg:text-[8rem] font-medium tracking-tight text-[#0B0B0B] whitespace-nowrap leading-none text-center" style={{ transform: 'translateY(-2rem)' }}>
                  Our
                </h1>
              </div>
              <div className="text-right-part">
                <h1 className="text-5xl md:text-[6rem] lg:text-[8rem] font-medium tracking-tight text-[#0B0B0B] whitespace-nowrap leading-none text-center" style={{ transform: 'translateY(-2rem)' }}>
                  Process
                </h1>
              </div>
            </div>
            <div className="card-content absolute w-full h-full flex items-end justify-center z-10">
              <div className="card-description text-center w-[90%] md:w-[40%] mb-[3em] relative translate-x-[40px] opacity-0">
                <p className="text-lg md:text-[1.125rem] font-normal leading-[1.25] text-white">
                  A futuristic residence that plays with curvature and flow,
                  blending bold geometry with natural topography.
                </p>
              </div>
            </div>
            <div className="card-img absolute w-full h-full rounded-[150px] overflow-hidden">
              <img
                src="/assets/1%20process.png"
                alt=""
                className="relative w-full h-full object-cover will-change-transform scale-[2]"
              />
              <div className="absolute top-10 left-10 md:top-16 md:left-16 max-w-[80vw] text-left pointer-events-none text-white z-20">
                <h1 className="font-medium tracking-tight leading-[1.1]" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", textTransform: "uppercase", fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
                  {renderTitle("01. DISCOVER YOUR VISION")}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card-section relative w-screen h-[100svh] p-[1.5em] mt-[50vh]">
          <div className="card-wrapper relative w-full h-full">
            <div className="card-content absolute w-full h-full flex items-end justify-center z-10">
              <div className="card-description text-center w-[90%] md:w-[40%] mb-[3em] relative translate-x-[40px] opacity-0">
                <p className="text-lg md:text-[1.125rem] font-normal leading-[1.25] text-white">
                  Explore our exclusive collection of residences chosen for their elegance, location, and timeless value.
                </p>
              </div>
            </div>
            <div className="card-img absolute w-full h-full rounded-[150px] overflow-hidden">
              <img
                src="/assets/2%20process.png"
                alt=""
                className="relative w-full h-full object-cover will-change-transform scale-[2]"
              />
              <div className="absolute top-10 left-10 md:top-16 md:left-16 max-w-[80vw] text-left pointer-events-none text-white z-20">
                <h1 className="font-medium tracking-tight leading-[1.1]" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", textTransform: "uppercase", fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
                  {renderTitle("02. CURATED PROPERTY SELECTION")}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card-section relative w-screen h-[100svh] p-[1.5em]">
          <div className="card-wrapper relative w-full h-full">
            <div className="card-content absolute w-full h-full flex items-end justify-center z-10">
              <div className="card-description text-center w-[90%] md:w-[40%] mb-[3em] relative translate-x-[40px] opacity-0">
                <p className="text-lg md:text-[1.125rem] font-normal leading-[1.25] text-white">
                  Experience every detail through personalized tours of exceptional homes and their refined spaces.
                </p>
              </div>
            </div>
            <div className="card-img absolute w-full h-full rounded-[150px] overflow-hidden">
              <img
                src="/assets/3%20process.png"
                alt=""
                className="relative w-full h-full object-cover will-change-transform scale-[2]"
              />
              <div className="absolute top-10 left-10 md:top-16 md:left-16 max-w-[80vw] text-left pointer-events-none text-white z-20">
                <h1 className="font-medium tracking-tight leading-[1.1]" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", textTransform: "uppercase", fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
                  {renderTitle("03. PRIVATE PROPERTY EXPERIENCE")}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="card-section relative w-screen h-[100svh] p-[1.5em]">
          <div className="card-wrapper relative w-full h-full">
            <div className="card-content absolute w-full h-full flex items-end justify-center z-10">
              <div className="card-description text-center w-[90%] md:w-[40%] mb-[3em] relative translate-x-[40px] opacity-0">
                <p className="text-lg md:text-[1.125rem] font-normal leading-[1.25] text-white">
                  From negotiations to documentation, we ensure a smooth and transparent buying experience.
                </p>
              </div>
            </div>
            <div className="card-img absolute w-full h-full rounded-[150px] overflow-hidden">
              <img
                src="/assets/4%20process.png"
                alt=""
                className="relative w-full h-full object-cover will-change-transform scale-[2]"
              />
              <div className="absolute top-10 left-10 md:top-16 md:left-16 max-w-[80vw] text-left pointer-events-none text-white z-20">
                <h1 className="font-medium tracking-tight leading-[1.1]" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", textTransform: "uppercase", fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
                  {renderTitle("04. DESIGN & LIFESTYLE EVALUATION")}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Card 5 */}
        <div className="card-section relative w-screen h-[100svh] p-[1.5em]">
          <div className="card-wrapper relative w-full h-full">
            <div className="card-content absolute w-full h-full flex items-end justify-center z-10">
              <div className="card-description text-center w-[90%] md:w-[40%] mb-[3em] relative translate-x-[40px] opacity-0">
                <p className="text-lg md:text-[1.125rem] font-normal leading-[1.25] text-white">
                  Step into a residence crafted around comfort, luxury, and the lifestyle you deserve.
                </p>
              </div>
            </div>
            <div className="card-img absolute w-full h-full rounded-[150px] overflow-hidden">
              <img
                src="/assets/5%20process.png"
                alt=""
                className="relative w-full h-full object-cover will-change-transform scale-[2]"
              />
              <div className="absolute top-10 left-10 md:top-16 md:left-16 max-w-[80vw] text-left pointer-events-none text-white z-20">
                <h1 className="font-medium tracking-tight leading-[1.1]" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", textTransform: "uppercase", fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}>
                  {renderTitle("05. WELCOME TO YOUR NEW HOME")}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full h-[7rem]"></div>
    </div>
  );
}
