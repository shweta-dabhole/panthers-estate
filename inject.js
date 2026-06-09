const fs = require('fs');

const code = fs.readFileSync('public/realtora-real-estate/app/page.js', 'utf8');
const heroEndIndex = code.indexOf('</section>') + 10;

const newSection = `

        {/* 4. About Us Section (Who Are We) */}
        <section 
          id="about"
          ref={aboutSectionRef}
          className="relative w-full flex flex-col items-center bg-[#fafafa] text-black overflow-hidden"
          style={{ paddingTop: '8rem', paddingBottom: '8rem', paddingLeft: '5%', paddingRight: '5%' }}
        >
          {/* Centered Heading with Dot */}
          <div className="flex items-center gap-3 mb-8" ref={el => aboutTextRefs.current[0] = el}>
            <div className="w-2.5 h-2.5 rounded-full bg-[#c9521d]"></div>
            <h3 className="text-[1.1rem] font-medium tracking-wide text-gray-800" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Who Are We?
            </h3>
          </div>

          {/* Centered Large Text */}
          <div className="max-w-[1000px] text-center mb-20" ref={el => aboutTextRefs.current[1] = el}>
            <p className="text-[1.3rem] md:text-[1.6rem] lg:text-[1.8rem] font-light text-[#2a2a2a]" style={{ lineHeight: '1.6' }}>
              At Realtora, we believe a home is life's most important foundation. Our mission is to find your perfect habitat so you can comfortably build your future and best life.
            </p>
          </div>

          {/* Cards Section */}
          <div className="w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" ref={cardsSectionRef}>
            {/* Card 1 */}
            <div className="stat-card bg-white rounded-3xl p-8 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100 flex flex-col justify-between" style={{ minHeight: '240px' }}>
              <div className="mb-6 text-gray-700">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path></svg>
              </div>
              <div>
                <h4 className="text-5xl font-bold text-[#111] mb-3 tracking-tight">5000+</h4>
                <p className="text-gray-500 text-[1rem] font-medium tracking-wide">Property deliverd</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="stat-card bg-white rounded-3xl p-8 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100 flex flex-col justify-between" style={{ minHeight: '240px' }}>
              <div className="mb-6 text-gray-700">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <div>
                <h4 className="text-5xl font-bold text-[#111] mb-3 tracking-tight">2000+</h4>
                <p className="text-gray-500 text-[1rem] font-medium tracking-wide">Client served worldwide</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="stat-card bg-white rounded-3xl p-8 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100 flex flex-col justify-between" style={{ minHeight: '240px' }}>
              <div className="mb-6 text-gray-700">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
              </div>
              <div>
                <h4 className="text-5xl font-bold text-[#111] mb-3 tracking-tight">100+</h4>
                <p className="text-gray-500 text-[1rem] font-medium tracking-wide">Awards</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="stat-card bg-white rounded-3xl p-8 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100 flex flex-col justify-between" style={{ minHeight: '240px' }}>
              <div className="mb-6 text-gray-700">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 6h12M8 6v14M16 6v14M8 14h8"/>
                </svg>
              </div>
              <div>
                <h4 className="text-5xl font-bold text-[#111] mb-3 tracking-tight">12+</h4>
                <p className="text-gray-500 text-[1rem] font-medium tracking-wide">Years of expereince</p>
              </div>
            </div>
          </div>
        </section>`;

const newCode = code.substring(0, heroEndIndex) + newSection + code.substring(heroEndIndex);
fs.writeFileSync('public/realtora-real-estate/app/page.js', newCode, 'utf8');
console.log('Injection successful');
