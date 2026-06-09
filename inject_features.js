const fs = require('fs');

let code = fs.readFileSync('app/page.js', 'utf8');

const featuresComponent = `const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
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
  ];

  return (
    <section id="features" className="w-full flex flex-col items-center" style={{ backgroundColor: '#f9f9f9', padding: '120px 5%' }}>
      {/* Header */}
      <div className="flex flex-col items-center text-center" style={{ maxWidth: '800px', marginBottom: '80px' }}>
        {/* Badge */}
        <div className="flex items-center" style={{ backgroundColor: '#fff', padding: '8px 20px', borderRadius: '30px', marginBottom: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d96a29', marginRight: '10px' }} />
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#191919', fontFamily: '"Inter", sans-serif' }}>Features</span>
        </div>
        
        <h2 style={{ fontSize: '56px', fontWeight: 500, color: '#191919', fontFamily: '"Outfit", sans-serif', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '24px' }}>
          Why Thousands Trust Us to Find Their Next Home
        </h2>
        
        <p style={{ fontSize: '18px', color: '#757575', fontFamily: '"Inter", sans-serif', lineHeight: 1.6 }}>
          More than listing, we deliver peace of mind, smarter decisions, and smoother experiences.
        </p>
      </div>

      {/* Main Content: 2 Columns */}
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-center justify-between" style={{ gap: '60px' }}>
        
        {/* Left: Tabs */}
        <div className="w-full md:w-[45%] flex flex-col">
          {features.map((feature, idx) => {
            const isActive = activeTab === idx;
            return (
              <div 
                key={idx}
                onClick={() => setActiveTab(idx)}
                className="w-full flex items-center cursor-pointer transition-all duration-300"
                style={{
                  padding: '32px 0',
                  borderBottom: '1px solid #e6e6e6',
                  opacity: isActive ? 1 : 0.6
                }}
              >
                {/* Dot */}
                <div style={{ 
                  width: '6px', height: '6px', borderRadius: '50%', 
                  backgroundColor: isActive ? '#191919' : 'transparent',
                  marginRight: '20px',
                  transition: 'background-color 0.3s'
                }} />
                
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: isActive ? 600 : 500, 
                  color: isActive ? '#191919' : '#9e9e9e',
                  fontFamily: '"Outfit", sans-serif',
                  margin: 0,
                  transition: 'color 0.3s'
                }}>
                  {feature.title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Right: Image */}
        <div className="w-full md:w-[55%] relative" style={{ height: '560px', borderRadius: '16px', overflow: 'hidden' }}>
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

      </div>
    </section>
  );
};
`;

const homeIndex = code.indexOf('export default function Home() {');
code = code.substring(0, homeIndex) + featuresComponent + '\n' + code.substring(homeIndex);

const targetLocation = `<DiscoverSpacesSection />`;
code = code.replace(targetLocation, `<DiscoverSpacesSection />\n        <FeaturesSection />`);

fs.writeFileSync('app/page.js', code, 'utf8');
console.log("Successfully injected FeaturesSection");
