import React from 'react';

const images = [
  "/assets/stairs.png",
  "/assets/insight1.png",
  "/assets/insight2.png",
  "/assets/insight3.png",
  "/assets/006860af-28a5-4018-a8fd-df7af6325db1.png"
];

// Duplicate images to create the infinite scroll illusion (x4 to be safe for wide screens)
const duplicatedImages = [...images, ...images, ...images, ...images];

const InsightsMarqueeSection = () => {
  return (
    <section className="w-full pb-24 pt-0 overflow-hidden relative" style={{ backgroundColor: '#F9F9F9', fontFamily: '"Inter", sans-serif' }}>
      
      {/* Marquee Row 1 (Scroll Left) */}
      <div className="w-full relative" style={{ marginBottom: '64px' }}>
        <div className="animate-marquee" style={{ gap: '24px', paddingLeft: '24px' }}>
          {duplicatedImages.map((src, index) => (
            <div key={`row1-${index}`} className="flex-none" style={{ width: '350px', height: '250px' }}>
              <img 
                src={src} 
                alt={`Property Insight ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (Scroll Right) */}
      <div className="w-full relative">
        {/* We reverse the animation and offset the starting images so it looks different from row 1 */}
        <div className="animate-marquee-reverse" style={{ gap: '24px', paddingLeft: '24px' }}>
          {duplicatedImages.reverse().map((src, index) => (
            <div key={`row2-${index}`} className="flex-none" style={{ width: '350px', height: '250px' }}>
              <img 
                src={src} 
                alt={`Property Insight ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default InsightsMarqueeSection;
