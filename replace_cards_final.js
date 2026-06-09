const fs = require('fs');

const code = fs.readFileSync('app/page.js', 'utf8');
const oldSectionStart = code.indexOf('{/* 4. About Us Section (Who Are We) */}');
const oldSectionEnd = code.indexOf('</section>', oldSectionStart) + 10;

if (oldSectionStart === -1 || oldSectionEnd === -1) {
  console.error("Could not find the section to replace");
  process.exit(1);
}

const oldSection = code.substring(oldSectionStart, oldSectionEnd);

const newSection = `{/* 4. About Us Section (Who Are We) */}
        <section 
          id="about"
          ref={aboutSectionRef}
          className="relative w-full flex flex-col items-center bg-[#f9f9f9] text-[#191919] overflow-hidden font-sans"
          style={{ paddingTop: '8rem', paddingBottom: '8rem', paddingLeft: '5%', paddingRight: '5%' }}
        >
          {/* Centered Heading with Dot */}
          <div className="flex items-center gap-3 mb-8" ref={el => aboutTextRefs.current[0] = el}>
            <div className="w-2 h-2 rounded-full bg-[#d05c2a]"></div>
            <h3 className="text-[15px] font-medium tracking-wide text-[#191919]">
              Who Are We?
            </h3>
          </div>

          {/* Centered Large Text */}
          <div className="max-w-[760px] text-center mb-24" ref={el => aboutTextRefs.current[1] = el}>
            <p className="text-[24px] md:text-[28px] font-normal text-[#191919]" style={{ lineHeight: '1.5' }}>
              At Realtora, we believe a home is life's most important foundation. Our mission is to find your perfect habitat so you can comfortably build your future and best life.
            </p>
          </div>

          {/* Cards Section */}
          <div className="w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" ref={cardsSectionRef}>
            {/* Card 1 */}
            <div className="stat-card bg-[#f9f9f9] rounded-[15px] p-8 border-[1.3px] border-[#e6e6e6] flex flex-col items-start justify-between h-[212px]">
              <div className="text-[#666666] w-8 h-8 flex-none">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 6 L 0 0 L 10.5 0 L 10.5 6 Z" fillOpacity="0" fill="#666666" transform="translate(6.75 12)"/>
                  <path d="M 0 6 L 0 0 L 10.5 0 L 10.5 6" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#666666" transform="translate(6.75 12)"/>
                  <path d="M 0 0 L 10.5 0" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#666666" transform="translate(6.75 15)"/>
                  <path d="M 0 0 L 21 0" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#666666" transform="translate(1.5 18)"/>
                  <path d="M 21 0 L 0 4.5" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#666666" transform="translate(1.5 4.5)"/>
                  <path d="M 0 0 L 0 9.322" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#666666" transform="translate(3 8.678)"/>
                  <path d="M 0 0 L 0 13.178" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#666666" transform="translate(21 4.822)"/>
                </svg>
              </div>
              <div className="flex flex-col items-start gap-4">
                <h4 className="text-[40px] font-[600] text-[#191919] tracking-[-0.04em] leading-[1em]">5000+</h4>
                <p className="text-[#191919] text-[15px] font-normal leading-[1em]">Property deliverd</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="stat-card bg-[#f9f9f9] rounded-[15px] p-8 border-[1.3px] border-[#e6e6e6] flex flex-col items-start justify-between h-[212px]">
              <div className="text-[#666666] w-8 h-8 flex-none">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 3.75 C 0 1.679 1.679 0 3.75 0 C 5.821 0 7.5 1.679 7.5 3.75 C 7.5 5.821 5.821 7.5 3.75 7.5 C 1.679 7.5 0 5.821 0 3.75 Z" fillOpacity="0" fill="#666666" transform="translate(8.25 9.75)"/>
                  <path d="M 0 3 C 0 1.343 1.343 0 3 0 C 4.657 0 6 1.343 6 3 C 6 4.657 4.657 6 3 6 C 1.343 6 0 4.657 0 3 Z" fillOpacity="0" fill="#666666" transform="translate(3 5.25)"/>
                  <path d="M 0 3 C 0 1.343 1.343 0 3 0 C 4.657 0 6 1.343 6 3 C 6 4.657 4.657 6 3 6 C 1.343 6 0 4.657 0 3 Z" fillOpacity="0" fill="#666666" transform="translate(15 5.25)"/>
                  <path d="M 0 0 C 1.771 -0.001 3.439 0.833 4.5 2.25" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#666666" transform="translate(18 11.25)"/>
                  <path d="M 0 2.25 C 1.061 0.833 2.729 -0.001 4.5 0" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#666666" transform="translate(1.5 11.25)"/>
                  <path d="M 0 3.75 C 0 1.679 1.679 0 3.75 0 C 5.821 0 7.5 1.679 7.5 3.75 C 7.5 5.821 5.821 7.5 3.75 7.5 C 1.679 7.5 0 5.821 0 3.75 Z" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#666666" transform="translate(8.25 9.75)"/>
                  <path d="M 0 3 C 1.095 1.141 3.092 0 5.25 0 C 7.408 0 9.405 1.141 10.5 3" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#666666" transform="translate(6.75 17.25)"/>
                  <path d="M 0 2.25 C 0.39 0.741 1.87 -0.218 3.407 0.043 C 4.944 0.304 6.025 1.698 5.894 3.252 C 5.764 4.805 4.465 6 2.906 6" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#666666" transform="translate(15.094 5.25)"/>
                  <path d="M 2.999 6 C 1.44 6 0.141 4.805 0.011 3.252 C -0.12 1.698 0.961 0.304 2.498 0.043 C 4.034 -0.218 5.515 0.741 5.905 2.25" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#666666" transform="translate(3.001 5.25)"/>
                </svg>
              </div>
              <div className="flex flex-col items-start gap-4">
                <h4 className="text-[40px] font-[600] text-[#191919] tracking-[-0.04em] leading-[1em]">2000+</h4>
                <p className="text-[#191919] text-[15px] font-normal leading-[1em]">Client served worldwide</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="stat-card bg-[#f9f9f9] rounded-[15px] p-8 border-[1.3px] border-[#e6e6e6] flex flex-col items-start justify-between h-[212px]">
              <div className="text-[#666666] w-8 h-8 flex-none">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 0 L 13.5 0 L 13.5 5.916 C 13.5 9.638 10.523 12.722 6.802 12.75 C 5.002 12.764 3.272 12.059 1.995 10.791 C 0.718 9.524 0 7.799 0 6 Z" fillOpacity="0" fill="#666666" transform="translate(5.25 4.5)"/>
                  <path d="M 0 0 L 6 0" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#666666" transform="translate(9 21)"/>
                  <path d="M 0 0 L 0 3.75" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#666666" transform="translate(12 17.25)"/>
                  <path d="M 3.938 5.25 L 3 5.25 C 1.343 5.25 0 3.907 0 2.25 L 0 0.75 C 0 0.336 0.336 0 0.75 0 L 3.75 0" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#666666" transform="translate(1.5 6.75)"/>
                  <path d="M 0 5.25 L 0.938 5.25 C 2.594 5.25 3.938 3.907 3.938 2.25 L 3.938 0.75 C 3.938 0.336 3.602 0 3.188 0 L 0.188 0" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#666666" transform="translate(18.563 6.75)"/>
                  <path d="M 0 0 L 13.5 0 L 13.5 5.916 C 13.5 9.638 10.523 12.722 6.802 12.75 C 5.002 12.764 3.272 12.059 1.995 10.791 C 0.718 9.524 0 7.799 0 6 Z" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#666666" transform="translate(5.25 4.5)"/>
                </svg>
              </div>
              <div className="flex flex-col items-start gap-4">
                <h4 className="text-[40px] font-[600] text-[#191919] tracking-[-0.04em] leading-[1em]">100+</h4>
                <p className="text-[#191919] text-[15px] font-normal leading-[1em]">Awards</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="stat-card bg-[#f9f9f9] rounded-[15px] p-8 border-[1.3px] border-[#e6e6e6] flex flex-col items-start justify-between h-[212px]">
              <div className="text-[#666666] w-8 h-8 flex-none">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0.75 3.75 C 0.336 3.75 0 3.414 0 3 L 0 0.75 C 0 0.336 0.336 0 0.75 0 L 11.25 0 C 11.664 0 12 0.336 12 0.75 L 12 3 C 12 3.414 11.664 3.75 11.25 3.75 Z" fillOpacity="0" fill="#666666" transform="translate(6 3)"/>
                  <path d="M 0.75 3.75 C 0.336 3.75 0 3.414 0 3 L 0 0.75 C 0 0.336 0.336 0 0.75 0 L 11.25 0 C 11.664 0 12 0.336 12 0.75 L 12 3 C 12 3.414 11.664 3.75 11.25 3.75 Z" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#666666" transform="translate(6 3)"/>
                  <path d="M 0 0 L 2.25 14.25" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#666666" transform="translate(15.75 6.75)"/>
                  <path d="M 0 14.25 L 2.25 0" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#666666" transform="translate(6 6.75)"/>
                  <path d="M 0 0 L 10.343 0" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="#666666" transform="translate(6.829 15.75)"/>
                </svg>
              </div>
              <div className="flex flex-col items-start gap-4">
                <h4 className="text-[40px] font-[600] text-[#191919] tracking-[-0.04em] leading-[1em]">12+</h4>
                <p className="text-[#191919] text-[15px] font-normal leading-[1em]">Years of expereince</p>
              </div>
            </div>
          </div>
        </section>`;

const newCode = code.replace(oldSection, newSection);
fs.writeFileSync('app/page.js', newCode, 'utf8');
console.log('Successfully updated cards with exact SVGs and justify-between flex layout.');
