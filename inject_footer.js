const fs = require('fs');

let code = fs.readFileSync('app/page.js', 'utf8');

const footerComponent = `const FooterSection = () => {
  const sectionRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(topRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
      gsap.fromTo(bottomRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 50%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="w-full relative flex flex-col items-center overflow-hidden" style={{ minHeight: '700px', padding: '100px 5% 60px 5%' }}>
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img src="/realtora-real-estate/public/images/BBK7G2W0GpZei2zukI6jNqEI6X4.jpeg" alt="Footer Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a]"></div>
      </div>

      {/* Top: Newsletter */}
      <div ref={topRef} className="relative z-10 w-full max-w-[800px] flex flex-col items-center text-center" style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '56px', fontWeight: 500, color: '#ffffff', fontFamily: '"Outfit", sans-serif', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '20px' }}>
          Join Our News Letter
        </h2>
        <p style={{ fontSize: '18px', color: '#e5e5e5', fontFamily: '"Inter", sans-serif', lineHeight: 1.6, marginBottom: '40px', maxWidth: '400px' }}>
          Stay informed. Get the best local<br />real estate updates without the fluff.
        </p>

        {/* Form Container */}
        <div className="flex items-center" style={{ gap: '16px' }}>
          <input 
            type="email" 
            placeholder="Enter Your Email"
            className="outline-none placeholder-gray-300"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.4)', 
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              padding: '16px 24px',
              borderRadius: '40px',
              width: '340px',
              fontSize: '16px',
              fontFamily: '"Inter", sans-serif'
            }}
          />
          <button className="transition-transform hover:scale-105" style={{ backgroundColor: '#ffffff', color: '#191919', padding: '16px 36px', borderRadius: '40px', fontSize: '16px', fontWeight: 600, fontFamily: '"Inter", sans-serif' }}>
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom: Footer Links */}
      <div ref={bottomRef} className="relative z-10 w-full max-w-[1200px] flex flex-col md:flex-row justify-between items-start" style={{ marginTop: 'auto', paddingTop: '120px' }}>
        
        {/* Left Side */}
        <div className="flex flex-col" style={{ maxWidth: '300px' }}>
          <h3 style={{ fontSize: '32px', fontWeight: 600, color: '#ffffff', fontFamily: '"Outfit", sans-serif', marginBottom: '16px' }}>
            Realtora
          </h3>
          <p style={{ fontSize: '16px', color: '#a3a3a3', fontFamily: '"Inter", sans-serif', lineHeight: 1.6 }}>
            Start your exciting journey to<br />homeownership right here.
          </p>
        </div>

        {/* Right Side Links */}
        <div className="flex" style={{ gap: '120px' }}>
          
          <div className="flex flex-col">
            <h4 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', fontFamily: '"Inter", sans-serif', marginBottom: '32px' }}>
              Main Pages
            </h4>
            <div className="flex flex-col" style={{ gap: '20px' }}>
              {['Home', 'Projects', 'About', 'Blogs'].map(link => (
                <a key={link} href="#" style={{ fontSize: '16px', color: '#a3a3a3', fontFamily: '"Inter", sans-serif', transition: 'color 0.3s' }} className="hover:text-white">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h4 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', fontFamily: '"Inter", sans-serif', marginBottom: '32px' }}>
              Other pages
            </h4>
            <div className="flex flex-col" style={{ gap: '20px' }}>
              {['404', 'Privacy Policy', 'Terms & Conditions'].map(link => (
                <a key={link} href="#" style={{ fontSize: '16px', color: '#a3a3a3', fontFamily: '"Inter", sans-serif', transition: 'color 0.3s' }} className="hover:text-white">
                  {link}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
`;

const homeIndex = code.indexOf('export default function Home() {');
code = code.substring(0, homeIndex) + footerComponent + '\n' + code.substring(homeIndex);

const targetLocation = `<FaqsSection />`;
code = code.replace(targetLocation, `<FaqsSection />\n        <FooterSection />`);

fs.writeFileSync('app/page.js', code, 'utf8');
console.log("Successfully injected FooterSection");
