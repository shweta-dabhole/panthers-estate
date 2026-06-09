const fs = require('fs');

let code = fs.readFileSync('app/page.js', 'utf8');

// I need to add GSAP logic to recreate the dragging/sliding effect instead of a simple opacity fade.
const interactiveTestimonials = `const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const sliderRef = useRef(null);
  const imageSliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Charlotte Bennett",
      avatar: "/realtora-real-estate/public/images/z576pxgMO7uqozxes3YJljpu2s.webp",
      text: "“Exceptional service from start to finish. We found the perfect apartment that truly feels like home.”",
      image: "/realtora-real-estate/public/images/KYjiPvPFQrnxGJ1Rl36Vgqtiw.png"
    },
    {
      name: "Emily John",
      avatar: "/realtora-real-estate/public/images/V09GjbzLmn3SKxc0QOInwAHfw.webp",
      text: "“We couldn’t have asked for a better experience! From the moment we reached out, the team went above and beyond to find us the perfect home. Highly recommend!”",
      image: "/realtora-real-estate/public/images/A2jIeSLi2HTwjLhzSESMxp3rd1c.webp"
    },
    {
      name: "Henry Caldwell",
      avatar: "/realtora-real-estate/public/images/Y7Io1rEQTpr82XSw3hvUWDoM.webp",
      text: "“From virtual tours to final signing, the process was seamless. We couldn’t be happier with our new home.”",
      image: "/realtora-real-estate/public/images/wJUahXSEUzCrb6zS2SKNWdm2S0.png"
    }
  ];

  const slideTo = (index) => {
    setCurrentIndex(index);
    gsap.to(sliderRef.current, {
      xPercent: -100 * index,
      duration: 0.6,
      ease: "power2.inOut"
    });
    gsap.to(imageSliderRef.current, {
      xPercent: -100 * index,
      duration: 0.6,
      ease: "power2.inOut"
    });
  };

  const handleNext = () => {
    slideTo((currentIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    slideTo(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current.children, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
      // Initial content animation
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full flex flex-col items-center overflow-hidden" style={{ backgroundColor: '#f9f9f9', padding: '120px 5%' }}>
      {/* Header Container */}
      <div ref={headerRef} className="w-full max-w-[1200px] flex flex-col mb-[80px] relative">
        <div className="flex items-center self-start" style={{ marginBottom: '16px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d96a29', marginRight: '10px' }} />
          <span style={{ fontSize: '16px', fontWeight: 500, color: '#191919', fontFamily: '"Inter", sans-serif' }}>Testimonials</span>
        </div>
        <h2 style={{ fontSize: '56px', fontWeight: 500, color: '#191919', fontFamily: '"Outfit", sans-serif', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '16px' }}>What Our Clients says</h2>
        <p style={{ fontSize: '18px', color: '#757575', fontFamily: '"Inter", sans-serif', lineHeight: 1.6, maxWidth: '500px' }}>More than listing, we deliver peace of mind,<br />smarter decisions, and smoother experiences.</p>
      </div>

      {/* Main Content: 2 Columns */}
      <div ref={contentRef} className="w-full max-w-[1200px] flex flex-col md:flex-row items-start justify-between" style={{ gap: '60px' }}>
        
        {/* Left: Testimonial Cards Carousel */}
        <div className="w-full md:w-[40%] flex flex-col relative" style={{ minHeight: '300px' }}>
          
          {/* Mask container */}
          <div className="w-full overflow-hidden h-full relative" style={{ flexGrow: 1 }}>
            {/* Sliding Track */}
            <div ref={sliderRef} className="flex h-full w-full" style={{ width: \`\${testimonials.length * 100}%\` }}>
              {testimonials.map((t, idx) => (
                <div key={idx} className="flex flex-col flex-shrink-0" style={{ width: \`\${100 / testimonials.length}%\` }}>
                  <div className="flex items-center" style={{ marginBottom: '24px' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', marginRight: '20px' }}>
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#191919', fontFamily: '"Outfit", sans-serif', margin: 0 }}>
                      {t.name}
                    </h3>
                  </div>
                  <p style={{ fontSize: '18px', color: '#757575', fontFamily: '"Inter", sans-serif', lineHeight: 1.6, paddingRight: '20px' }}>
                    {t.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows positioned below the mask */}
          <div className="flex items-center mt-8" style={{ gap: '16px' }}>
            <button onClick={handlePrev} className="flex items-center justify-center bg-[#191919] text-white hover:bg-black transition-colors" style={{ width: '48px', height: '48px', borderRadius: '50%' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"></path></svg>
            </button>
            <button onClick={handleNext} className="flex items-center justify-center bg-[#191919] text-white hover:bg-black transition-colors" style={{ width: '48px', height: '48px', borderRadius: '50%' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"></path></svg>
            </button>
          </div>
        </div>

        {/* Right: Property Image Slider */}
        <div className="w-full md:w-[60%] overflow-hidden" style={{ height: '440px', borderRadius: '16px' }}>
           <div ref={imageSliderRef} className="flex h-full w-full" style={{ width: \`\${testimonials.length * 100}%\` }}>
             {testimonials.map((t, idx) => (
                <div key={idx} className="flex-shrink-0 h-full p-2" style={{ width: \`\${100 / testimonials.length}%\` }}>
                  <img 
                    src={t.image} 
                    alt="Property"
                    className="w-full h-full object-cover"
                    style={{ borderRadius: '16px' }}
                  />
                </div>
             ))}
           </div>
        </div>

      </div>
    </section>
  );
};`;

const startIdx = code.indexOf('const TestimonialsSection = () => {');
const endIdx = code.indexOf('};', startIdx) + 2;

code = code.substring(0, startIdx) + interactiveTestimonials + code.substring(endIdx);

fs.writeFileSync('app/page.js', code, 'utf8');
console.log("Updated Testimonials to have sliding animation.");
