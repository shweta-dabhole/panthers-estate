const fs = require('fs');

const code = fs.readFileSync('app/page.js', 'utf8');

const componentCode = `
const DiscoverSpacesSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const img1Ref = useRef(null); // top left
  const img2Ref = useRef(null); // bottom left
  const img3Ref = useRef(null); // top right
  const img4Ref = useRef(null); // bottom right
  const centerImgWrapperRef = useRef(null);
  const centerImgRef = useRef(null);
  const overlayTextRef = useRef(null);
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Create ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        }
      });

      // 1. Text splits apart
      tl.to(title1Ref.current, { x: "-50vw", opacity: 0, duration: 1 }, 0);
      tl.to(title2Ref.current, { x: "50vw", opacity: 0, duration: 1 }, 0);

      // 2. Small images scatter
      tl.to(img1Ref.current, { x: "-50vw", y: "-50vh", opacity: 0, duration: 1 }, 0);
      tl.to(img2Ref.current, { x: "-50vw", y: "50vh", opacity: 0, duration: 1 }, 0);
      tl.to(img3Ref.current, { x: "50vw", y: "-50vh", opacity: 0, duration: 1 }, 0);
      tl.to(img4Ref.current, { x: "50vw", y: "50vh", opacity: 0, duration: 1 }, 0);

      // 3. Center image scales up to fill the screen
      // It starts as a small circle in the center. We scale its wrapper to full viewport width/height
      // and remove the border radius.
      tl.fromTo(centerImgWrapperRef.current, 
        { width: "0px", height: "0px", borderRadius: "50%" },
        { width: "100vw", height: "100vh", borderRadius: "0px", duration: 1, ease: "power2.inOut" }, 
        0
      );

      // 4. Center image scales down a bit as it expands for a subtle parallax
      tl.fromTo(centerImgRef.current,
        { scale: 2 },
        { scale: 1, duration: 1, ease: "power2.out" },
        0
      );

      // 5. Text overlay fades in slightly after the image is fully expanded
      tl.fromTo(overlayTextRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.3 }, 
        0.7
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Custom Cursor Logic for the large image
  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current && isHovering) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: "power2.out",
          xPercent: -50,
          yPercent: -50
        });
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [isHovering]);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden" style={{ height: "300vh", backgroundColor: "#fff" }}>
      <div ref={containerRef} className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* Texts */}
        <div className="absolute z-10 w-full flex flex-col items-center justify-center pointer-events-none" style={{ gap: '10px' }}>
          <h2 ref={title1Ref} style={{ fontSize: '80px', fontWeight: 400, fontFamily: '"Newsreader", "Playfair Display", serif', color: '#191919', lineHeight: 1.1, letterSpacing: '-2px', margin: 0 }}>
            Discover Spaces
          </h2>
          <h2 ref={title2Ref} style={{ fontSize: '80px', fontWeight: 400, fontFamily: '"Newsreader", "Playfair Display", serif', color: '#191919', lineHeight: 1.1, letterSpacing: '-2px', margin: 0 }}>
            That Speak to You
          </h2>
        </div>

        {/* Small Images */}
        <img ref={img1Ref} src="images/BM5DJRZcwLRhIfqMFOK4GeI.webp" className="absolute object-cover shadow-xl" style={{ top: '15%', left: '15%', width: '220px', height: '140px', borderRadius: '16px' }} />
        <img ref={img2Ref} src="images/hoMkKeDJp1rMS99FfvGiuFk8Vsc.webp" className="absolute object-cover shadow-xl" style={{ bottom: '15%', left: '10%', width: '240px', height: '180px', borderRadius: '16px' }} />
        <img ref={img3Ref} src="images/hhMQHZPK2Han8nGE8ZGJzzB2Mo.webp" className="absolute object-cover shadow-xl" style={{ top: '15%', right: '15%', width: '240px', height: '140px', borderRadius: '16px' }} />
        <img ref={img4Ref} src="images/QHrU5R2YxV6j0vFGDThc7hSgGKw.webp" className="absolute object-cover shadow-xl" style={{ bottom: '15%', right: '10%', width: '220px', height: '140px', borderRadius: '16px' }} />

        {/* Center Reveal Image */}
        <div 
          ref={centerImgWrapperRef} 
          className="absolute z-20 flex items-end justify-start overflow-hidden shadow-2xl" 
          style={{ width: '0px', height: '0px', borderRadius: '50%' }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img ref={centerImgRef} src="images/OaySddwc0ovmBM0gb4ic04QX1Ls.jpeg" className="w-full h-full object-cover absolute inset-0 pointer-events-none" />
          
          {/* Overlay Content */}
          <div ref={overlayTextRef} className="relative z-30 p-10 flex flex-col md:flex-row items-start md:items-end justify-between w-full" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)', paddingTop: '100px' }}>
             <div className="flex flex-col items-start ml-8 mb-4">
               <h3 style={{ color: '#fff', fontSize: '56px', fontWeight: 500, margin: 0, fontFamily: '"Outfit", sans-serif', letterSpacing: '-1px' }}>Horizon Villa</h3>
               <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '20px', margin: 0, fontFamily: '"Inter", sans-serif' }}>Mystic Falls, Azure Ridge</p>
             </div>
          </div>
        </div>

      </div>

      {/* Custom Cursor */}
      <div 
        ref={cursorRef} 
        className="fixed z-50 pointer-events-none flex items-center justify-center bg-white shadow-lg"
        style={{ 
          width: '120px', height: '120px', borderRadius: '50%',
          opacity: isHovering ? 1 : 0, 
          transform: isHovering ? 'scale(1)' : 'scale(0.5)',
          transition: 'opacity 0.3s',
          top: 0, left: 0
        }}
      >
        <span style={{ fontSize: '15px', fontWeight: 500, color: '#191919', fontFamily: '"Inter", sans-serif' }}>View Details</span>
      </div>
    </section>
  );
};
`;

let newCode = code;

// 1. Inject the component definition above Home()
const homeIndex = newCode.indexOf('export default function Home() {');
newCode = newCode.slice(0, homeIndex) + componentCode + '\n\n' + newCode.slice(homeIndex);

// 2. Inject <DiscoverSpacesSection /> below Explore Properties
const injectionTarget = `          </div>
        </section>`;
const replacement = `          </div>
        </section>
        <DiscoverSpacesSection />`;

newCode = newCode.replace(injectionTarget, replacement);

fs.writeFileSync('app/page.js', newCode, 'utf8');
console.log("Successfully injected Discover Spaces Section.");
