const fs = require('fs');

let code = fs.readFileSync('app/page.js', 'utf8');

const oldButton = `<button className="flex items-center justify-center self-start transition-all hover:bg-[#333]" style={{ backgroundColor: '#191919', color: '#fff', padding: '16px 32px', borderRadius: '40px', fontSize: '16px', fontWeight: 500, fontFamily: '"Inter", sans-serif' }}>
            Get in Touch
            <div className="flex items-center justify-center bg-white text-black ml-3" style={{ width: '28px', height: '28px', borderRadius: '50%' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
            </div>
          </button>`;

const newButton = `<button className="flex items-center justify-between self-start transition-all hover:bg-[#333]" style={{ backgroundColor: '#000000', color: '#fff', padding: '10px 10px 10px 32px', borderRadius: '50px', fontSize: '18px', fontWeight: 500, fontFamily: '"Inter", sans-serif' }}>
            <span style={{ marginRight: '16px' }}>Get in Touch</span>
            <div className="flex items-center justify-center bg-white text-black" style={{ width: '44px', height: '44px', borderRadius: '50%' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </button>`;

code = code.replace(oldButton, newButton);

fs.writeFileSync('app/page.js', code, 'utf8');
console.log("Successfully fixed the FAQ Get In Touch button.");
