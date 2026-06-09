const fs = require('fs');

const code = fs.readFileSync('app/page.js', 'utf8');

const oldSectionStart = code.indexOf('{/* 4. About Us Section (Who Are We) */}');
const endOfAboutSection = code.indexOf('</section>', oldSectionStart) + 10;

if (oldSectionStart === -1 || endOfAboutSection === -1) {
  console.error("Could not find the About section");
  process.exit(1);
}

const beforeAbout = code.substring(0, endOfAboutSection);
const afterAbout = code.substring(endOfAboutSection);

// Check if Explore Properties is already injected somewhere
if (afterAbout.includes('id="properties"') || afterAbout.includes('Explore Properties Section')) {
    console.error("Explore properties already exists? Please check manually.");
    // Actually, I can just replace it if it does.
}

const exploreSection = `

        {/* 5. Explore Properties Section */}
        <section 
          id="properties"
          ref={featuredSectionRef}
          className="relative w-full flex flex-col items-center overflow-hidden"
          style={{ paddingBottom: '100px', paddingLeft: '5%', paddingRight: '5%', backgroundColor: '#f9f9f9', fontFamily: '"Inter", sans-serif' }}
        >
          {/* Header Area */}
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-12" style={{ maxWidth: '1200px' }}>
            
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

          {/* Cards Marquee Wrapper */}
          <div className="w-full relative" style={{ maxWidth: '1200px' }}>
            <div className="property-cards-wrapper flex" style={{ width: 'max-content' }}>
              {propertiesList.map((property, idx) => (
                <div 
                  key={idx} 
                  className="property-card flex-none relative overflow-hidden group cursor-pointer" 
                  style={{ width: '45vw', maxWidth: '600px', minWidth: '320px', aspectRatio: '4/3', borderRadius: '20px', marginRight: '32px' }}
                >
                  <img 
                    src={property.image} 
                    alt={property.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" 
                  />
                  {/* Optional: Add a dark overlay on hover like original site might have, or just let image scale */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>`;

const newCode = beforeAbout + exploreSection + afterAbout;
fs.writeFileSync('app/page.js', newCode, 'utf8');
console.log('Successfully injected Explore Properties section.');
