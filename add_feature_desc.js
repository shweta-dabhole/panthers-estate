const fs = require('fs');
let code = fs.readFileSync('app/page.js', 'utf8');

const oldFeaturesArray = `  const features = [
    {
      title: "Lifestyle-Centric Living",
      image: "/realtora-real-estate/public/images/jFZ7UpAtLOeVJGXeZX6K072gE.png"
    },
    {
      title: "Prime & Promising Locations",
      image: "/realtora-real-estate/public/images/j8wE7PNwqxKHejAbpdrhyVl79s8.webp"
    },
    {
      title: "Smart, Sustainable Features",
      image: "/realtora-real-estate/public/images/ZpjnjMU3ELZv5AhKRQMj99dRIk.png"
    },
    {
      title: "End-to-End Support",
      image: "/realtora-real-estate/public/images/bJ5HA9CE0X9HXUh4sJsZJh6xb40.png"
    }
  ];`;

const newFeaturesArray = `  const features = [
    {
      title: "Lifestyle-Centric Living",
      image: "/realtora-real-estate/public/images/jFZ7UpAtLOeVJGXeZX6K072gE.png",
      description: "Thoughtfully planned spaces that fit the pace of real life, with room to grow, recharge, and gather."
    },
    {
      title: "Prime & Promising Locations",
      image: "/realtora-real-estate/public/images/j8wE7PNwqxKHejAbpdrhyVl79s8.webp",
      description: "From upscale neighborhoods to emerging hotspots, each address is chosen for its value and vibrance."
    },
    {
      title: "Smart, Sustainable Features",
      image: "/realtora-real-estate/public/images/ZpjnjMU3ELZv5AhKRQMj99dRIk.png",
      description: "Enjoy future-ready homes equipped with eco-conscious technology and intelligent design."
    },
    {
      title: "End-to-End Support",
      image: "/realtora-real-estate/public/images/bJ5HA9CE0X9HXUh4sJsZJh6xb40.png",
      description: "From discovery to handover, our experts guide you through every step for a smooth, stress-free journey."
    }
  ];`;

code = code.replace(oldFeaturesArray, newFeaturesArray);

const oldImageContainer = `<div className="w-full md:w-[55%] relative" style={{ height: '560px', borderRadius: '16px', overflow: 'hidden' }}>
          {features.map((feature, idx) => (
            <img 
              key={idx}
              src={feature.image} 
              alt={feature.title}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              style={{ opacity: activeTab === idx ? 1 : 0 }}
            />
          ))}
        </div>`;

const newImageContainer = `<div className="w-full md:w-[55%] flex flex-col">
          <div className="relative w-full" style={{ height: '560px', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px' }}>
            {features.map((feature, idx) => (
              <img 
                key={idx}
                src={feature.image} 
                alt={feature.title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                style={{ opacity: activeTab === idx ? 1 : 0 }}
              />
            ))}
          </div>
          <div className="relative w-full h-[60px]">
            {features.map((feature, idx) => (
              <p 
                key={idx}
                className="absolute top-0 left-0 transition-opacity duration-500"
                style={{ 
                  opacity: activeTab === idx ? 1 : 0, 
                  fontSize: '18px', 
                  color: '#191919', 
                  fontFamily: '"Inter", sans-serif',
                  lineHeight: 1.5,
                  maxWidth: '90%'
                }}
              >
                {feature.description}
              </p>
            ))}
          </div>
        </div>`;

code = code.replace(oldImageContainer, newImageContainer);

fs.writeFileSync('app/page.js', code, 'utf8');
console.log("Successfully added descriptions below features image");
