import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PropertyType {
  icon: string;
  name: string;
  count: string;
  description: string;
  borderColor: string; // Left border color
  glowColor: string;   // Hover glow shadow color
}

// 4 कार्ड्स का रियलिस्टिक डेटा विथ स्पेसिफिक कलर्स (No Dark Mode, Ultra Clean Light Theme)
const propertyTypes: PropertyType[] = [
  { 
    icon: '/img/icon-apartment.png', 
    name: '1 BHK Comfort Living', 
    count: 'Daulat Park 1', 
    description: '01 Bedroom • 02 Bathrooms • Living Room • Modular Kitchen',
    borderColor: 'border-l-[6px] border-red-700',
    glowColor: 'hover:shadow-red-700/10'
  },
  { 
    icon: '/img/icon-villa.png', 
    name: '2 BHK Luxury Suite', 
    count: 'Premium Residency', 
    description: '02 Bedrooms • 02 Bathrooms • Large Living • Open Kitchen',
    borderColor: 'border-l-[6px] border-purple-700',
    glowColor: 'hover:shadow-purple-700/10'
  },
  { 
    icon: '/img/icon-house.png', 
    name: '3 BHK Modern Villa', 
    count: 'Elite Enclave', 
    description: '03 Bedrooms • 03 Bathrooms • Grand Lounge • Pantry Room',
    borderColor: 'border-l-[6px] border-green-700',
    glowColor: 'hover:shadow-green-700/10'
  },
  { 
    icon: '/img/icon-housing.png', 
    name: 'Smart Studio Space', 
    count: 'Urban Pods', 
    description: '01 Studio Bed • 01 Bathroom • Integrated Living & Dining',
    borderColor: 'border-l-[6px] border-blue-700',
    glowColor: 'hover:shadow-blue-700/10'
  },
];

export default function PropertyTypes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.property-card');

    // Smooth entry animation using GSAP
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      }
    );
  }, []);

  // माउस मूव करने पर रियलिस्टिक 3D टिल्ट इफ़ेक्ट के लिए फंक्शन
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // CSS Variables सेट करके स्मूथ 3D रोटेशन देना
    card.style.setProperty('--rx', `${-y / 15}deg`);
    card.style.setProperty('--ry', `${x / 15}deg`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="py-20 bg-slate-50 min-h-screen flex items-center justify-center text-slate-800">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header Section */}
        <div className="text-center mx-auto mb-16 max-w-[600px]">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            Our Architectural Layouts
          </span>
          <h2 className="mt-3 mb-4 text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Specially Designed For Comfort
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Explore our curated selection of Premium 3D mapped premium floors plans tailored for contemporary aesthetics and high-end utilities.
          </p>
        </div>
        
        {/* Grid Layout (2x2 structure for a cleaner, high-end real-estate website look) */}
        <div 
          ref={containerRef} 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{ perspective: '1000px' }} // 3D डेप्थ के लिए
        >
          {propertyTypes.map((property, index) => (
            <a 
              key={index}
              href="#" 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`property-card opacity-0 block group bg-white border border-slate-100 rounded-2xl p-8 shadow-sm transition-all duration-300 ease-out transform ${property.borderColor} ${property.glowColor}`}
              style={{
                transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
                transformStyle: 'preserve-3d',
                boxShadow: '0 4px 20px -2px rgba(148, 163, 184, 0.08)'
              }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6" style={{ transform: 'translateZ(20px)' }}>
                
                {/* Left content detail */}
                <div className="space-y-2 flex-1">
                  <span className="inline-block text-xs font-semibold px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                    {property.count}
                  </span>
                  <h3 className="font-extrabold text-xl text-slate-900 group-hover:text-amber-600 transition-colors duration-200">
                    {property.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium tracking-wide leading-relaxed pt-1">
                    {property.description}
                  </p>
                </div>

                {/* Right content - Icon Container with custom hover zoom */}
                <div className="w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-amber-50 group-hover:border-amber-200/50 transition-all duration-350 shadow-sm">
                  <img 
                    className="w-9 h-9 object-contain group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" 
                    src={property.icon} 
                    alt={property.name}
                    onError={(e) => {
                      // Fallback SVG string if image route is missing
                      e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d97706'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'/></svg>";
                    }}
                  />
                </div>

              </div>

              {/* Decorative Subtle CTA tag line at card bottom */}
              <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center text-xs font-semibold text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Explore Interactive Layout</span>
                <span>→</span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}