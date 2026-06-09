const fs = require('fs');

let code = fs.readFileSync('app/page.js', 'utf8');

const faqsComponent = `const FaqsSection = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "Can I get help with paperwork and registration?",
      answer: "Yes, our expert team provides full assistance with all legal paperwork, registration processes, and documentation to ensure a seamless and hassle-free experience."
    },
    {
      question: "What if I'm looking for a home loan?",
      answer: "We partner with leading banks and financial institutions to help you secure the best home loan options with attractive interest rates and quick processing."
    },
    {
      question: "How quickly can I schedule a property visit?",
      answer: "You can schedule a property visit within 24 hours. Our agents are flexible and will coordinate a time that best suits your convenience."
    },
    {
      question: "Are your listings updated regularly?",
      answer: "Absolutely! We update our property listings daily to ensure you have access to the latest available homes, apartments, and commercial spaces."
    },
    {
      question: "Can I sell my property here?",
      answer: "Yes, you can list your property with us. Our marketing experts will ensure your listing reaches the right buyers for a quick and profitable sale."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
      gsap.fromTo(rightRef.current.children,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full flex flex-col items-center" style={{ backgroundColor: '#f9f9f9', padding: '120px 5%' }}>
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-start justify-between" style={{ gap: '80px' }}>
        
        {/* Left Column */}
        <div ref={leftRef} className="w-full md:w-[45%] flex flex-col">
          <div className="flex items-center self-start" style={{ marginBottom: '24px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d96a29', marginRight: '10px' }} />
            <span style={{ fontSize: '16px', fontWeight: 500, color: '#191919', fontFamily: '"Inter", sans-serif' }}>FAQs</span>
          </div>
          
          <h2 style={{ fontSize: '56px', fontWeight: 500, color: '#191919', fontFamily: '"Outfit", sans-serif', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '24px' }}>
            Got Questions?<br />We've Got Answers
          </h2>
          
          <p style={{ fontSize: '18px', color: '#757575', fontFamily: '"Inter", sans-serif', lineHeight: 1.6, marginBottom: '40px', maxWidth: '400px' }}>
            Everything you need to know about buying, selling, and renting with confidence.
          </p>

          <button className="flex items-center justify-center self-start transition-all hover:bg-[#333]" style={{ backgroundColor: '#191919', color: '#fff', padding: '16px 32px', borderRadius: '40px', fontSize: '16px', fontWeight: 500, fontFamily: '"Inter", sans-serif' }}>
            Get in Touch
            <div className="flex items-center justify-center bg-white text-black ml-3" style={{ width: '28px', height: '28px', borderRadius: '50%' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
            </div>
          </button>
        </div>

        {/* Right Column: Accordion */}
        <div ref={rightRef} className="w-full md:w-[55%] flex flex-col" style={{ marginTop: '20px' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} className="w-full flex flex-col cursor-pointer border-b border-[#e5e5e5] transition-colors" onClick={() => toggleFaq(idx)} style={{ padding: '24px 0' }}>
              <div className="w-full flex items-center justify-between">
                <h3 style={{ fontSize: '20px', fontWeight: 500, color: '#191919', fontFamily: '"Inter", sans-serif', margin: 0, paddingRight: '20px' }}>
                  {faq.question}
                </h3>
                <div className="flex items-center justify-center transition-transform duration-300" style={{ transform: openFaq === idx ? 'rotate(45deg)' : 'rotate(0deg)', minWidth: '24px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </div>
              <div className="overflow-hidden transition-all duration-500" style={{ maxHeight: openFaq === idx ? '200px' : '0px', opacity: openFaq === idx ? 1 : 0 }}>
                <p style={{ fontSize: '16px', color: '#757575', fontFamily: '"Inter", sans-serif', lineHeight: 1.6, marginTop: '16px', paddingRight: '40px' }}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
`;

const homeIndex = code.indexOf('export default function Home() {');
code = code.substring(0, homeIndex) + faqsComponent + '\n' + code.substring(homeIndex);

const targetLocation = `<TestimonialsSection />`;
code = code.replace(targetLocation, `<TestimonialsSection />\n        <FaqsSection />`);

fs.writeFileSync('app/page.js', code, 'utf8');
console.log("Successfully injected FaqsSection");
