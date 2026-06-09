const fs = require('fs');

let code = fs.readFileSync('app/page.js', 'utf8');

const blogsComponent = `const BlogsSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  const blogs = [
    {
      title: "Your Luxury Sanctuary: Quick Home Design Tips",
      date: "Dec 7, 2024",
      readTime: "7 min read",
      image: "/realtora-real-estate/public/images/CR9WCJs8QkwyR05G5BzUHipBX8.webp"
    },
    {
      title: "How to Choose the Perfect Home for Your Family",
      date: "Sep 3, 2025",
      readTime: "10 min read",
      image: "/realtora-real-estate/public/images/sTu9AUvn0LRJMxRSYiuilf4brfc.webp"
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

      // Fade in cards
      gsap.fromTo([card1Ref.current, card2Ref.current],
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
    <section ref={sectionRef} id="blog" className="w-full flex flex-col items-center" style={{ backgroundColor: '#f9f9f9', padding: '120px 5%' }}>
      
      {/* Header Container */}
      <div ref={headerRef} className="w-full max-w-[1200px] flex flex-col mb-16 relative">
        
        {/* Badge */}
        <div className="flex items-center self-start" style={{ marginBottom: '24px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d96a29', marginRight: '10px' }} />
          <span style={{ fontSize: '16px', fontWeight: 500, color: '#191919', fontFamily: '"Inter", sans-serif' }}>Blogs</span>
        </div>
        
        {/* Title & Subtitle vs Button layout */}
        <div className="w-full flex flex-col md:flex-row justify-between items-end">
          
          <div className="flex flex-col" style={{ maxWidth: '600px' }}>
            <h2 style={{ fontSize: '56px', fontWeight: 500, color: '#191919', fontFamily: '"Outfit", sans-serif', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '20px' }}>
              Your Guide to Smart Home Buying
            </h2>
            <p style={{ fontSize: '18px', color: '#757575', fontFamily: '"Inter", sans-serif', lineHeight: 1.6 }}>
              Read our latest articles on market trends,<br />financing tips, and home improvement ideas.
            </p>
          </div>

          {/* View All Button */}
          <button 
            className="group flex items-center justify-center transition-all duration-300 hover:bg-black hover:text-white"
            style={{ 
              padding: '12px 24px', 
              borderRadius: '30px', 
              border: '1px solid #191919',
              backgroundColor: 'transparent',
              marginTop: '24px'
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 500, fontFamily: '"Inter", sans-serif', marginRight: '12px' }}>View All</span>
            <div className="flex items-center justify-center bg-black group-hover:bg-white text-white group-hover:text-black transition-colors duration-300" style={{ width: '28px', height: '28px', borderRadius: '50%' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </div>
          </button>

        </div>
      </div>

      {/* Cards Grid */}
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2" style={{ gap: '40px' }}>
        
        {/* Card 1 */}
        <div ref={card1Ref} className="group cursor-pointer flex flex-col">
          <div className="w-full overflow-hidden" style={{ borderRadius: '16px', height: '400px', marginBottom: '24px' }}>
            <img 
              src={blogs[0].image} 
              alt={blogs[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col px-2">
            <h3 className="transition-colors duration-300 group-hover:text-gray-600" style={{ fontSize: '32px', fontWeight: 500, color: '#191919', fontFamily: '"Outfit", sans-serif', lineHeight: 1.2, letterSpacing: '-0.5px', marginBottom: '16px' }}>
              {blogs[0].title}
            </h3>
            <div className="flex items-center" style={{ fontSize: '14px', color: '#757575', fontFamily: '"Inter", sans-serif' }}>
              <span>{blogs[0].date}</span>
              <span className="mx-3" style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#d96a29' }}></span>
              <span>{blogs[0].readTime}</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div ref={card2Ref} className="group cursor-pointer flex flex-col">
          <div className="w-full overflow-hidden" style={{ borderRadius: '16px', height: '400px', marginBottom: '24px' }}>
            <img 
              src={blogs[1].image} 
              alt={blogs[1].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col px-2">
            <h3 className="transition-colors duration-300 group-hover:text-gray-600" style={{ fontSize: '32px', fontWeight: 500, color: '#191919', fontFamily: '"Outfit", sans-serif', lineHeight: 1.2, letterSpacing: '-0.5px', marginBottom: '16px' }}>
              {blogs[1].title}
            </h3>
            <div className="flex items-center" style={{ fontSize: '14px', color: '#757575', fontFamily: '"Inter", sans-serif' }}>
              <span>{blogs[1].date}</span>
              <span className="mx-3" style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#d96a29' }}></span>
              <span>{blogs[1].readTime}</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
`;

const homeIndex = code.indexOf('export default function Home() {');
code = code.substring(0, homeIndex) + blogsComponent + '\n' + code.substring(homeIndex);

const targetLocation = `<FeaturesSection />`;
code = code.replace(targetLocation, `<FeaturesSection />\n        <BlogsSection />`);

fs.writeFileSync('app/page.js', code, 'utf8');
console.log("Successfully injected BlogsSection");
