const fs = require('fs');
const code = fs.readFileSync('app/page.js', 'utf8');

// 1. Inject PropertyCard component
const propertyCardCode = `
const PropertyCard = ({ property, index }) => {
  const cardRef = useRef(null);
  const cursorRef = useRef(null);
  const imageWrapperRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, [index]);

  const handleMouseMove = (e) => {
    if (!imageWrapperRef.current || !cursorRef.current) return;
    const rect = imageWrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    gsap.to(cursorRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMouseEnter = () => {
    gsap.to(cursorRef.current, { 
      scale: 1, 
      opacity: 1, 
      duration: 0.3, 
      ease: "back.out(1.5)" 
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cursorRef.current, { 
      scale: 0.5, 
      opacity: 0, 
      duration: 0.3, 
      ease: "power2.in" 
    });
  };

  return (
    <div ref={cardRef} className="flex flex-col w-full" style={{ gap: '24px' }}>
      <div 
        ref={imageWrapperRef}
        className="relative w-full overflow-hidden rounded-[15px] cursor-none group"
        style={{ aspectRatio: '1.5', backgroundColor: '#e3e3e3' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" 
        />
        
        {/* Custom Pill Cursor */}
        <div 
          ref={cursorRef}
          className="absolute pointer-events-none z-10 flex items-center justify-center bg-white shadow-lg"
          style={{ 
            top: '-24px', 
            left: '-60px', 
            width: '120px', 
            height: '48px', 
            borderRadius: '100px',
            opacity: 0,
            transform: 'scale(0.5)'
          }}
        >
          <span style={{ fontSize: '15px', fontWeight: 500, color: '#111' }}>View Details</span>
        </div>
      </div>
      
      <div className="flex flex-col" style={{ gap: '10px' }}>
        <div className="flex justify-between items-center w-full">
          <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#191919', margin: 0 }}>{property.title}</h3>
          <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#191919', margin: 0 }}>{property.price}</h3>
        </div>
        <div className="flex items-center text-[#666]" style={{ fontSize: '14px', gap: '8px' }}>
          <span>{property.beds}</span>
          <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#aaa' }}></span>
          <span>{property.baths}</span>
          <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#aaa' }}></span>
          <span>{property.sqft}</span>
        </div>
      </div>
    </div>
  );
};

export default function Home() {`;

let newCode = code;
if (!newCode.includes('const PropertyCard')) {
    newCode = newCode.replace('export default function Home() {', propertyCardCode);
}

// 2. Replace the Explore Properties section
const exploreStart = newCode.indexOf('{/* 5. Explore Properties Section */}');
const exploreEnd = newCode.indexOf('</section>', exploreStart) + 10;

if (exploreStart === -1 || exploreEnd === -1) {
  console.error("Could not find Explore Properties section to replace");
  process.exit(1);
}

const beforeExplore = newCode.substring(0, exploreStart);
const afterExplore = newCode.substring(exploreEnd);

const newExploreSection = `{/* 5. Explore Properties Section */}
        <section 
          id="properties"
          ref={featuredSectionRef}
          className="relative w-full flex flex-col items-center overflow-hidden"
          style={{ paddingBottom: '100px', paddingTop: '100px', paddingLeft: '5%', paddingRight: '5%', backgroundColor: '#f9f9f9', fontFamily: '"Inter", sans-serif' }}
        >
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-16" style={{ maxWidth: '1200px' }}>
            
            {/* Left Text Block */}
            <div className="flex flex-col items-start featured-header" style={{ maxWidth: '600px' }}>
              <div className="flex items-center" style={{ gap: '10px', marginBottom: '20px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#b85300' }}></div>
                <h3 style={{ fontSize: '17px', fontWeight: 400, letterSpacing: '-0.4px', color: '#191919', margin: 0 }}>
                  Listings
                </h3>
              </div>
              <h2 style={{ fontSize: '44px', fontWeight: 500, color: '#191919', letterSpacing: '-0.5px', lineHeight: '1.1em', margin: '0 0 16px 0' }}>
                Explore Properties
              </h2>
              <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.5em', margin: 0 }}>
                Luxury villas, smart apartments, commercial spaces. All verified and ready for you.
              </p>
            </div>

            {/* Right Button */}
            <div className="featured-header mt-8 md:mt-0 flex-none cursor-pointer group">
              <div className="flex items-center justify-between transition-all duration-300 hover:bg-[#ebebeb]" style={{ height: '48px', padding: '6px 6px 6px 24px', borderRadius: '229px', border: '1px solid #191919', backgroundColor: 'transparent' }}>
                <span style={{ fontSize: '15px', fontWeight: 500, color: '#191919', marginRight: '20px' }}>View All</span>
                <div className="flex items-center justify-center bg-[#191919] transition-colors duration-300" style={{ width: '36px', height: '36px', borderRadius: '50%' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16" fill="#fff">
                    <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Cards Grid Wrapper */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2" style={{ maxWidth: '1200px', gap: '40px' }}>
            {propertiesList.map((property, idx) => (
              <PropertyCard key={idx} property={property} index={idx} />
            ))}
          </div>
        </section>`;

newCode = beforeExplore + newExploreSection + afterExplore;

fs.writeFileSync('app/page.js', newCode, 'utf8');
console.log('Successfully injected PropertyCard and animated grid.');
