const fs = require('fs');

let code = fs.readFileSync('app/page.js', 'utf8');

const startIndex = code.indexOf('const DiscoverSpacesSection = () => {');
const homeIndex = code.indexOf('export default function Home() {');

const newComponent = `const DiscoverSpacesSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  
  // Text Halves
  const textL1Ref = useRef(null); // "Discover "
  const textR1Ref = useRef(null); // "Spaces"
  const textL2Ref = useRef(null); // "That Speak "
  const textR2Ref = useRef(null); // "to You"

  // Small Images
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const img4Ref = useRef(null);

  // Center Image
  const centerImgWrapperRef = useRef(null);
  const centerImgRef = useRef(null);
  const overlayTextRef = useRef(null);
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
        }
      });

      // PHASE 1: Small images appear
      tl.fromTo([img1Ref.current, img2Ref.current, img3Ref.current, img4Ref.current], 
        { opacity: 0, scale: 0.8 }, 
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 }, 
        0
      );

      // PHASE 2: The Split & Expand (starts at 1.0)
      const splitStart = 1.0;
      
      // Text splits horizontally
      tl.to(textL1Ref.current, { x: "-30vw", duration: 1.5 }, splitStart);
      tl.to(textR1Ref.current, { x: "30vw", duration: 1.5 }, splitStart);
      tl.to(textL2Ref.current, { x: "-30vw", duration: 1.5 }, splitStart);
      tl.to(textR2Ref.current, { x: "30vw", duration: 1.5 }, splitStart);

      // Small images scatter and fade out
      tl.to(img1Ref.current, { x: "-30vw", y: "-30vh", opacity: 0, duration: 1.5 }, splitStart);
      tl.to(img2Ref.current, { x: "-30vw", y: "30vh", opacity: 0, duration: 1.5 }, splitStart);
      tl.to(img3Ref.current, { x: "30vw", y: "-30vh", opacity: 0, duration: 1.5 }, splitStart);
      tl.to(img4Ref.current, { x: "30vw", y: "30vh", opacity: 0, duration: 1.5 }, splitStart);

      // Center image scales up to fill the screen
      tl.fromTo(centerImgWrapperRef.current, 
        { width: "0px", height: "0px", borderRadius: "50%" },
        { width: "100vw", height: "100vh", borderRadius: "0px", duration: 1.5, ease: "power2.inOut" }, 
        splitStart
      );

      // Image subtle parallax scaling down to 1
      tl.fromTo(centerImgRef.current,
        { scale: 2 },
        { scale: 1, duration: 1.5, ease: "power2.out" },
        splitStart
      );

      // PHASE 3: Overlay fades in
      tl.fromTo(overlayTextRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.5 }, 
        splitStart + 1.2
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
    <section ref={sectionRef} className="relative w-full overflow-hidden" style={{ height: "400vh", backgroundColor: "#fff" }}>
      <div ref={containerRef} className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* Texts */}
        <div className="absolute z-10 w-full flex flex-col items-center justify-center pointer-events-none" style={{ gap: '10px' }}>
          
          <div className="flex" style={{ fontSize: '80px', fontWeight: 400, fontFamily: '"Newsreader", "Playfair Display", serif', color: '#191919', lineHeight: 1.1, letterSpacing: '-2px' }}>
            <div ref={textL1Ref} className="whitespace-pre">Discover </div>
            <div ref={textR1Ref} className="whitespace-pre">Spaces</div>
          </div>
          
          <div className="flex" style={{ fontSize: '80px', fontWeight: 400, fontFamily: '"Newsreader", "Playfair Display", serif', color: '#191919', lineHeight: 1.1, letterSpacing: '-2px' }}>
            <div ref={textL2Ref} className="whitespace-pre">That Speak </div>
            <div ref={textR2Ref} className="whitespace-pre">to You</div>
          </div>

        </div>

        {/* Small Images */}
        <img ref={img1Ref} src="/realtora-real-estate/public/images/BM5DJRZcwLRhIfqMFOK4GeI.webp" className="absolute object-cover shadow-xl" style={{ top: '15%', left: '15%', width: '220px', height: '140px', borderRadius: '16px' }} />
        <img ref={img2Ref} src="/realtora-real-estate/public/images/hoMkKeDJp1rMS99FfvGiuFk8Vsc.webp" className="absolute object-cover shadow-xl" style={{ bottom: '15%', left: '10%', width: '240px', height: '180px', borderRadius: '16px' }} />
        <img ref={img3Ref} src="/realtora-real-estate/public/images/hhMQHZPK2Han8nGE8ZGJzzB2Mo.webp" className="absolute object-cover shadow-xl" style={{ top: '15%', right: '15%', width: '240px', height: '140px', borderRadius: '16px' }} />
        <img ref={img4Ref} src="/realtora-real-estate/public/images/QHrU5R2YxV6j0vFGDThc7hSgGKw.webp" className="absolute object-cover shadow-xl" style={{ bottom: '15%', right: '10%', width: '220px', height: '140px', borderRadius: '16px' }} />

        {/* Center Reveal Image */}
        <div 
          ref={centerImgWrapperRef} 
          className="absolute z-20 flex items-end justify-start overflow-hidden shadow-2xl" 
          style={{ width: '0px', height: '0px', borderRadius: '50%' }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img ref={centerImgRef} src="/realtora-real-estate/public/images/OaySddwc0ovmBM0gb4ic04QX1Ls.jpeg" className="w-full h-full object-cover absolute inset-0 pointer-events-none" />
          
          {/* Overlay Content */}
          <div ref={overlayTextRef} className="relative z-30 p-10 flex flex-col items-start justify-end w-full h-full" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)' }}>
             <div className="ml-4 mb-4">
               <h3 style={{ color: '#fff', fontSize: '56px', fontWeight: 500, margin: 0, fontFamily: '"Outfit", sans-serif', letterSpacing: '-1px' }}>Horizon Villa</h3>
               <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', margin: 0, fontFamily: '"Inter", sans-serif' }}>Mystic Falls, Azure Ridge</p>
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
}

`;

code = code.substring(0, startIndex) + newComponent + code.substring(homeIndex);
fs.writeFileSync('app/page.js', code, 'utf8');
console.log("Successfully fixed syntax error.");
