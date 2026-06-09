const fs = require('fs');

let code = fs.readFileSync('app/page.js', 'utf8');

// 1. Change items-start back to items-stretch (or leave as items-start but force height)
const oldContainer = `<div ref={contentRef} className="w-full max-w-[1200px] flex flex-col md:flex-row items-start justify-between" style={{ gap: '60px' }}>`;
const newContainer = `<div ref={contentRef} className="w-full max-w-[1200px] flex flex-col md:flex-row items-stretch justify-between" style={{ gap: '60px' }}>`;
code = code.replace(oldContainer, newContainer);

// 2. Rewrite the left column to justify-end and align everything to the bottom
const oldLeftCol = `<div className="w-full md:w-[40%] flex flex-col relative" style={{ minHeight: '300px' }}>
          <div className="w-full overflow-hidden h-[300px] relative">
            <div ref={sliderRef} className="flex h-full w-[300%] absolute left-0 top-0">
              {testimonials.map((t, idx) => (
                <div key={idx} className="flex flex-col h-full" style={{ width: '33.333%' }}>
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
          
          <div className="flex items-center absolute bottom-0" style={{ gap: '16px' }}>
            <button onClick={handlePrev} className="flex items-center justify-center bg-[#191919] text-white hover:bg-black transition-colors" style={{ width: '48px', height: '48px', borderRadius: '50%' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"></path></svg>
            </button>
            <button onClick={handleNext} className="flex items-center justify-center bg-[#191919] text-white hover:bg-black transition-colors" style={{ width: '48px', height: '48px', borderRadius: '50%' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"></path></svg>
            </button>
          </div>
        </div>`;

const newLeftCol = `<div className="w-full md:w-[40%] flex flex-col justify-end pb-2">
          <div className="w-full overflow-hidden relative" style={{ height: '240px' }}>
            <div ref={sliderRef} className="flex h-full w-[300%] absolute left-0 top-0">
              {testimonials.map((t, idx) => (
                <div key={idx} className="flex flex-col justify-end h-full" style={{ width: '33.333%' }}>
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
          
          <div className="flex items-center" style={{ gap: '16px', marginTop: '32px' }}>
            <button onClick={handlePrev} className="flex items-center justify-center bg-[#191919] text-white hover:bg-black transition-colors" style={{ width: '48px', height: '48px', borderRadius: '50%' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"></path></svg>
            </button>
            <button onClick={handleNext} className="flex items-center justify-center bg-[#191919] text-white hover:bg-black transition-colors" style={{ width: '48px', height: '48px', borderRadius: '50%' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"></path></svg>
            </button>
          </div>
        </div>`;

code = code.replace(oldLeftCol, newLeftCol);

fs.writeFileSync('app/page.js', code, 'utf8');
console.log("Successfully fixed the layout positioning.");
