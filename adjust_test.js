const fs = require('fs');

let code = fs.readFileSync('app/page.js', 'utf8');

// 1. Change alignment to items-start and adjust image size
const oldContentContainer = `<div ref={contentRef} className="w-full max-w-[1200px] flex flex-col md:flex-row items-end justify-between" style={{ gap: '60px' }}>`;
const newContentContainer = `<div ref={contentRef} className="w-full max-w-[1200px] flex flex-col md:flex-row items-start justify-between" style={{ gap: '60px' }}>`;
code = code.replace(oldContentContainer, newContentContainer);

const oldImgContainer = `<div className="w-full md:w-[55%] relative" style={{ height: '500px', borderRadius: '16px', overflow: 'hidden' }}>`;
const newImgContainer = `<div className="w-full md:w-[55%] relative" style={{ height: '420px', borderRadius: '16px', overflow: 'hidden' }}>`;
code = code.replace(oldImgContainer, newImgContainer);

// 2. Add the navigation arrows under the paragraph
const oldTextContainer = `<p style={{ fontSize: '18px', color: '#757575', fontFamily: '"Inter", sans-serif', lineHeight: 1.6 }}>
            {testimonials[0].text}
          </p>
        </div>`;

const newTextContainer = `<p style={{ fontSize: '18px', color: '#757575', fontFamily: '"Inter", sans-serif', lineHeight: 1.6 }}>
            {testimonials[0].text}
          </p>
          
          {/* Navigation Arrows */}
          <div className="flex items-center" style={{ marginTop: '40px', gap: '16px' }}>
            <button className="flex items-center justify-center bg-[#191919] text-white hover:bg-black transition-colors" style={{ width: '48px', height: '48px', borderRadius: '50%' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"></path>
              </svg>
            </button>
            <button className="flex items-center justify-center bg-[#191919] text-white hover:bg-black transition-colors" style={{ width: '48px', height: '48px', borderRadius: '50%' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </button>
          </div>
        </div>`;

code = code.replace(oldTextContainer, newTextContainer);

// 3. Make the left column 40% and right column 60% for a wider image
code = code.replace(`<div className="w-full md:w-[45%] flex flex-col">`, `<div className="w-full md:w-[40%] flex flex-col">`);
code = code.replace(`<div className="w-full md:w-[55%] relative" style={{ height: '420px'`, `<div className="w-full md:w-[60%] relative" style={{ height: '440px'`);


fs.writeFileSync('app/page.js', code, 'utf8');
console.log("Successfully adjusted Testimonials layout and added arrows.");
