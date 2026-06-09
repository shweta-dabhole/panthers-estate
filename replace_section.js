const fs = require('fs');

const code = fs.readFileSync('app/page.js', 'utf8');
const oldSection = fs.readFileSync('oldSection.txt', 'utf8');

const newSection = `        {/* 4. About Us Section (Who Are We) */}
        <section 
          id="about"
          ref={aboutSectionRef}
          className="relative w-full flex flex-col items-center bg-[#fafafa] text-[#191919] overflow-hidden font-sans"
          style={{ paddingTop: '6rem', paddingBottom: '6rem', paddingLeft: '5%', paddingRight: '5%' }}
        >
          {/* Centered Heading with Dot */}
          <div className="flex items-center gap-2 mb-6" ref={el => aboutTextRefs.current[0] = el}>
            <div className="w-2 h-2 rounded-full bg-[#c9521d]"></div>
            <h3 className="text-[14px] font-medium tracking-wide text-[#333]">
              Who Are We?
            </h3>
          </div>

          {/* Centered Large Text */}
          <div className="max-w-[700px] text-center mb-16" ref={el => aboutTextRefs.current[1] = el}>
            <p className="text-[20px] md:text-[22px] font-normal text-[#222]" style={{ lineHeight: '1.5' }}>
              At Realtora, we believe a home is life's most important foundation. Our mission is to find your perfect habitat so you can comfortably build your future and best life.
            </p>
          </div>

          {/* Cards Section */}
          <div className="w-full max-w-[1000px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" ref={cardsSectionRef}>
            {/* Card 1 */}
            <div className="stat-card bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col justify-start" style={{ minHeight: '200px' }}>
              <div className="mb-10 text-gray-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path></svg>
              </div>
              <div>
                <h4 className="text-[34px] md:text-[38px] font-semibold text-[#111] mb-1 tracking-tight leading-none">5000+</h4>
                <p className="text-[#555] text-[13px] font-medium tracking-wide">Property deliverd</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="stat-card bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col justify-start" style={{ minHeight: '200px' }}>
              <div className="mb-10 text-gray-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <div>
                <h4 className="text-[34px] md:text-[38px] font-semibold text-[#111] mb-1 tracking-tight leading-none">2000+</h4>
                <p className="text-[#555] text-[13px] font-medium tracking-wide">Client served worldwide</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="stat-card bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col justify-start" style={{ minHeight: '200px' }}>
              <div className="mb-10 text-gray-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
              </div>
              <div>
                <h4 className="text-[34px] md:text-[38px] font-semibold text-[#111] mb-1 tracking-tight leading-none">100+</h4>
                <p className="text-[#555] text-[13px] font-medium tracking-wide">Awards</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="stat-card bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col justify-start" style={{ minHeight: '200px' }}>
              <div className="mb-10 text-gray-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 6h12M8 6v14M16 6v14M8 14h8"/>
                </svg>
              </div>
              <div>
                <h4 className="text-[34px] md:text-[38px] font-semibold text-[#111] mb-1 tracking-tight leading-none">12+</h4>
                <p className="text-[#555] text-[13px] font-medium tracking-wide">Years of expereince</p>
              </div>
            </div>
          </div>
        </section>`;

if (code.includes(oldSection)) {
  const newCode = code.replace(oldSection, newSection);
  fs.writeFileSync('app/page.js', newCode, 'utf8');
  console.log('Successfully updated section styles to match image.');
} else {
  console.log('Could not find old section to replace.');
}
