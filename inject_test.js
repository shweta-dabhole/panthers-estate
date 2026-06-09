const fs = require('fs');

let code = fs.readFileSync('app/page.js', 'utf8');

const testimonialsComponent = `const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  const testimonials = [
    {
      name: "Charlotte Bennett",
      avatar: "/realtora-real-estate/public/images/z576pxgMO7uqozxes3YJljpu2s.webp",
      text: "“Exceptional service from start to finish. We found the perfect apartment that truly feels like home.”",
      image: "/realtora-real-estate/public/images/KYjiPvPFQrnxGJ1Rl36Vgqtiw.png"
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade in header elements
      gsap.fromTo(headerRef.current.children, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, 
          duration: 0.8, 
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%"
          }
        }
      );

      // Fade in content
      gsap.fromTo(contentRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full flex flex-col items-center" style={{ backgroundColor: '#f9f9f9', padding: '120px 5%' }}>
      
      {/* Header Container */}
      <div ref={headerRef} className="w-full max-w-[1200px] flex flex-col mb-[80px] relative">
        
        {/* Badge */}
        <div className="flex items-center self-start" style={{ marginBottom: '16px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d96a29', marginRight: '10px' }} />
          <span style={{ fontSize: '16px', fontWeight: 500, color: '#191919', fontFamily: '"Inter", sans-serif' }}>Testimonials</span>
        </div>
        
        {/* Title */}
        <h2 style={{ fontSize: '56px', fontWeight: 500, color: '#191919', fontFamily: '"Outfit", sans-serif', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '16px' }}>
          What Our Clients says
        </h2>
        
        {/* Subtitle */}
        <p style={{ fontSize: '18px', color: '#757575', fontFamily: '"Inter", sans-serif', lineHeight: 1.6, maxWidth: '500px' }}>
          More than listing, we deliver peace of mind,<br />smarter decisions, and smoother experiences.
        </p>

      </div>

      {/* Main Content: 2 Columns */}
      <div ref={contentRef} className="w-full max-w-[1200px] flex flex-col md:flex-row items-end justify-between" style={{ gap: '60px' }}>
        
        {/* Left: Testimonial Card */}
        <div className="w-full md:w-[45%] flex flex-col">
          <div className="flex items-center" style={{ marginBottom: '24px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', marginRight: '20px' }}>
              <img src={testimonials[0].avatar} alt={testimonials[0].name} className="w-full h-full object-cover" />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#191919', fontFamily: '"Outfit", sans-serif', margin: 0 }}>
              {testimonials[0].name}
            </h3>
          </div>
          
          <p style={{ fontSize: '18px', color: '#757575', fontFamily: '"Inter", sans-serif', lineHeight: 1.6 }}>
            {testimonials[0].text}
          </p>
        </div>

        {/* Right: Property Image */}
        <div className="w-full md:w-[55%] relative" style={{ height: '500px', borderRadius: '16px', overflow: 'hidden' }}>
          <img 
            src={testimonials[0].image} 
            alt="Property"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

      </div>

    </section>
  );
};
`;

const homeIndex = code.indexOf('export default function Home() {');
code = code.substring(0, homeIndex) + testimonialsComponent + '\n' + code.substring(homeIndex);

const targetLocation = `<BlogsSection />`;
code = code.replace(targetLocation, `<BlogsSection />\n        <TestimonialsSection />`);

fs.writeFileSync('app/page.js', code, 'utf8');
console.log("Successfully injected TestimonialsSection");
