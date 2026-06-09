const fs = require('fs');

let code = fs.readFileSync('app/page.js', 'utf8');

const oldTestimonials = `  const testimonials = [
    {
      name: "Charlotte Bennett",
      avatar: "/realtora-real-estate/public/images/z576pxgMO7uqozxes3YJljpu2s.webp",
      text: "“Exceptional service from start to finish. We found the perfect apartment that truly feels like home.”",
      image: "/realtora-real-estate/public/images/KYjiPvPFQrnxGJ1Rl36Vgqtiw.png"
    },
    {
      name: "Emily John",
      avatar: "/realtora-real-estate/public/images/V09GjbzLmn3SKxc0QOInwAHfw.webp",
      text: "“We couldn’t have asked for a better experience! From the moment we reached out, the team went above and beyond to find us the perfect home. Highly recommend!”",
      image: "/realtora-real-estate/public/images/A2jIeSLi2HTwjLhzSESMxp3rd1c.webp"
    },
    {
      name: "Henry Caldwell",
      avatar: "/realtora-real-estate/public/images/Y7Io1rEQTpr82XSw3hvUWDoM.webp",
      text: "“From virtual tours to final signing, the process was seamless. We couldn’t be happier with our new home.”",
      image: "/realtora-real-estate/public/images/wJUahXSEUzCrb6zS2SKNWdm2S0.png"
    }
  ];`;

const newTestimonials = `  const testimonials = [
    {
      name: "Charlotte Bennett",
      avatar: "/realtora-real-estate/public/images/z576pxgMO7uqozxes3YJljpu2s.webp",
      text: "“Exceptional service from start to finish. We found the perfect apartment that truly feels like home.”",
      image: "/realtora-real-estate/public/images/KYjiPvPFQrnxGJ1Rl36Vgqtiw.png"
    },
    {
      name: "Emily John",
      avatar: "/realtora-real-estate/public/images/V09GjbzLmn3SKxc0QOInwAHfw.webp",
      text: "“We couldn’t have asked for a better experience! From the moment we reached out, the team went above and beyond to find us the perfect home. Highly recommend!”",
      image: "/realtora-real-estate/public/images/Y7Io1rEQTpr82XSw3hvUWDoM.webp"
    },
    {
      name: "Henry Caldwell",
      avatar: "/realtora-real-estate/public/images/A2jIeSLi2HTwjLhzSESMxp3rd1c.webp",
      text: "“From virtual tours to final signing, the process was seamless. We couldn’t be happier with our new home.”",
      image: "/realtora-real-estate/public/images/wJUahXSEUzCrb6zS2SKNWdm2S0.png"
    }
  ];`;

code = code.replace(oldTestimonials, newTestimonials);

// Fix the text animation to be a crossfade
const oldTextContainer = `<div className="w-full overflow-hidden relative" style={{ height: '240px' }}>
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
          </div>`;

const newTextContainer = `<div className="w-full relative" style={{ height: '240px' }}>
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="absolute inset-0 flex flex-col justify-end h-full transition-all duration-500" 
                style={{ 
                  opacity: idx === currentIndex ? 1 : 0, 
                  transform: \`translateX(\${idx === currentIndex ? 0 : (idx < currentIndex ? -20 : 20)}px)\`,
                  pointerEvents: idx === currentIndex ? 'auto' : 'none' 
                }}
              >
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
          </div>`;

code = code.replace(oldTextContainer, newTextContainer);

// Remove the text slider tracking from slideTo
const oldSlideTo = `  const slideTo = (index) => {
    setCurrentIndex(index);
    gsap.to(sliderRef.current, {
      xPercent: -100 * index,
      duration: 0.6,
      ease: "power2.inOut"
    });
    gsap.to(imageSliderRef.current, {
      xPercent: -100 * index,
      duration: 0.6,
      ease: "power2.inOut"
    });
  };`;

const newSlideTo = `  const slideTo = (index) => {
    setCurrentIndex(index);
    gsap.to(imageSliderRef.current, {
      xPercent: -100 * index,
      duration: 0.6,
      ease: "power2.inOut"
    });
  };`;

code = code.replace(oldSlideTo, newSlideTo);

fs.writeFileSync('app/page.js', code, 'utf8');
console.log("Successfully fixed testimonial images and text crossfade animation.");
