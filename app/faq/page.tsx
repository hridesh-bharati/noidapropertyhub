'use client';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// 🎯 Approved 20 Sectors Tag Cloud
const sectors = [
  'Sector 140A', 'Sector 4', 'Sector 57', 'Sector 58', 'Sector 59',
  'Sector 63', 'Sector 65', 'Sector 67', 'Sector 80', 'Sector 83',
  'Hosiery Complex', 'Phase 2', 'Sector 138', 'Sector 85', 'Sector 140',
  'Sector 155', 'Ecotech 3', 'Sector 8', 'Sector 6', 'Sector 5'
];

const faqData = [
  {
    category: "Factory & Manufacturing Spaces",
    theme: "from-amber-500 to-orange-600 text-orange-600 border-orange-500 bg-orange-50/50",
    items: [
      { 
        q: "What are the core benefits of renting a factory space within these 20 specific sectors in Noida?", 
        a: "Renting factory spaces in established zones like Sector 57, 58, 59, 63, 65, 67, Phase 2, and Ecotech 3 offers a major competitive edge. These micro-markets feature heavy-vehicle wide approach roads, high-tension industrial power grids, customized manufacturing line layouts, and pre-constructed industrial drainage networks."
      },
      { 
        q: "What specific manufacturing infrastructure is available in the Hosiery Complex, Sector 80, 83, and 85 industrial clusters?", 
        a: "Properties in the Hosiery Complex, Sector 80, 83, and 85 are highly optimized for light engineering, garments, and assembly-line setups. Standard configurations include heavy tool rooms, dedicated raw material holding bays, specialized quality control labs, and isolated finished goods areas." 
      },
      { 
        q: "Are the older industrial blocks like Sector 4, 5, 6, and 8 suitable for modern high-tech production plants?", 
        a: "Yes, absolutely. Sectors 4, 5, 6, and 8 are Noida's foundational industrial layouts and boast premium geographical proximity to Delhi. Most available rental units here have undergone extensive modernization, offering reinforced columns, modern processing plants, integrated worker canteens, and advanced fire safety frameworks." 
      },
      { 
        q: "Do I need explicit sub-lease permission from the Noida Authority or GNIDA before renting a factory?", 
        a: "Yes, commercial compliance requires a Transfer of Memorandum (TM) or a formal sub-lease permission letter issued by the respective authority (Noida Authority or GNIDA). This document ensures your business can legally secure industrial power connections and factory licenses."
      }
    ]
  },
  {
    category: "Warehouse & Logistical Storage Hubs",
    theme: "from-blue-500 to-indigo-600 text-indigo-600 border-indigo-500 bg-indigo-50/50",
    items: [
      { 
        q: "Why are Sector 140A, Sector 140, and Sector 138 emerging as the top choices for large-scale warehouse leasing?", 
        a: "Sectors 140A, 140, and 138 sit right along the logistics corridors connected directly to the Noida-Greater Noida Expressway. Warehouses in these nodes offer unmatched vertical clearance heights ranging from 30 to 45 feet, heavy floor-load metrics (5 to 8 tons per square meter using FM2 flooring), multiple automatic docking levelers, and expansive structural container parking yards." 
      },
      { 
        q: "Are the warehouse configurations in Sector 63, 65, and Phase 2 suitable for e-commerce fulfillment centers?", 
        a: "Sector 63, 65, and Phase 2 are stellar hyper-local hubs for rapid last-mile delivery and e-commerce distribution. These zones offer 24/7 security frameworks, continuous power backup, advanced fire protection setups, and quick access to major distribution networks across Delhi NCR." 
      },
      { 
        q: "What standard floor load capacities and ceiling clearances can I expect across the listed 20 sectors?", 
        a: "For industrial warehouses, standard clear height ranges from 30 feet to 42 feet at the eaves, which accommodates high-density multi-tier racking systems. The floor load capacity across these premium structures ranges from 5 Ton to 8 Ton per square meter, preventing foundational cracks under heavy machinery." 
      }
    ]
  },
  {
    category: "Legal Protocols & Financial Regulations",
    theme: "from-emerald-500 to-teal-600 text-teal-600 border-teal-500 bg-teal-50/50",
    items: [
      { 
        q: "What is the standard lease tenure and annual rent escalation structure for industrial spaces in Noida?", 
        a: "Industrial and commercial leases are typically long-term arrangements to protect the tenant's capital investment in plant and machinery. The standard contract duration ranges from 3 to 9 years (often structured as a 3+3+3 year format with fixed lock-in clauses). Rent escalation usually ranges between 5% and 15%, compounding every 1 to 3 years." 
      },
      { 
        q: "What are the standard upfront financial obligations regarding security deposits and brokerage fees?", 
        a: "For warehouses and manufacturing factories across Noida and Greater Noida, landlords generally demand an advance security deposit equivalent to 3 to 4 months of the net monthly rent. The standard commercial brokerage fee is typically equivalent to 1 month's rent, which becomes payable upon execution." 
      },
      { 
        q: "Is GST applicable on industrial property rentals, and can tenants claim an Input Tax Credit (ITC)?", 
        a: "Yes, renting out commercial or industrial immovable property attracts a standard GST rate of 18%. The landlord includes this in the monthly invoice, and if your business is registered under GST in Uttar Pradesh, you can claim a 100% Input Tax Credit (ITC) against your output tax liabilities." 
      }
    ]
  }
];

// ✅ ADD THIS: Define the props interface
interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  activeColor: string;
}

// ✅ ADD THIS: Type the function component with the interface
function AccordionItem({ question, answer, isOpen, onClick, activeColor }: AccordionItemProps) {
  return (
    <div 
      className={`border bg-white rounded-xl sm:rounded-2xl shadow-sm transition-all duration-300 overflow-hidden mb-3 ${
        isOpen ? 'border-slate-300 shadow-md ring-1 ring-black/[0.03]' : 'border-slate-200/70 hover:border-slate-300'
      }`}
      data-aos="fade-up"
    >
      <button
        onClick={onClick}
        className="w-full flex justify-between items-start gap-3 p-4 sm:p-5 text-left transition-colors duration-200 hover:bg-slate-50/60"
        aria-expanded={isOpen}
      >
        <span className={`text-[15px] sm:text-lg font-semibold tracking-tight transition-colors duration-200 ${isOpen ? activeColor : 'text-slate-800'}`}>
          {question}
        </span>
        <span className={`transform transition-all duration-300 p-1.5 rounded-xl flex-shrink-0 mt-0.5 ${
          isOpen ? 'rotate-180 bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'
        }`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[600px] border-t border-slate-100 bg-slate-50/50' : 'max-h-0'
        }`}
      >
        <div className="p-4 sm:p-5 text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function ColorfulFaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const handleToggle = (globalIndex: number) => {
    setOpenIndex(openIndex === globalIndex ? null : globalIndex);
  };

  let globalCounter = 0;

  return (
    <div className="min-h-screen bg-slate-50/80 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-purple-500 selection:text-white">
      <div className="max-w-4xl mx-auto">
        
        {/* SEO Structured Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqData.flatMap(group => 
                group.items.map(item => ({
                  "@type": "Question",
                  "name": item.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.a
                  }
                }))
              )
            })
          }}
        />

        {/* Dynamic Colorful Header */}
        <div className="text-center mb-10 sm:mb-14" data-aos="fade-down">
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 font-extrabold tracking-widest text-xs uppercase bg-slate-100 px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            ⚡ Industrial Resource Base
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Leasing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">Knowledge Hub</span>
          </h1>
          <p className="mt-4 text-sm sm:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about industrial zoning regulations, logistic operations, and legal contracts across Noida's top 20 sectors.
          </p>
        </div>

        {/* Mobile Friendly Sector Tag Cloud */}
        <div className="bg-white border border-slate-200/80 p-5 sm:p-6 rounded-2xl sm:rounded-3xl mb-10 shadow-sm" data-aos="fade-up">
          <div className="flex items-center gap-2 mb-3 px-0.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Verified Operational Regions:
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 max-h-[140px] overflow-y-auto pr-1 scrollbar-thin">
            {sectors.map((sec, i) => (
              <span 
                key={i} 
                className="text-[11px] sm:text-xs font-bold text-slate-600 bg-slate-100/80 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white px-2.5 py-1.5 rounded-lg sm:rounded-xl cursor-default transition-all duration-200"
              >
                {sec}
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic Category Clusters */}
        <div className="space-y-10 sm:space-y-12">
          {faqData.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-3 sm:space-y-4">
              
              {/* Sticky Fluid Blurred Header */}
              <div 
                className="sticky top-0 bg-slate-50/90 backdrop-blur-md py-2.5 z-10 flex items-center gap-3 border-b border-slate-200/60"
                data-aos="fade-right"
              >
                <span className={`h-6 w-1.5 rounded-full bg-gradient-to-b ${group.theme.split(' ')[0]} ${group.theme.split(' ')[1]}`}></span>
                <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">
                  {group.category}
                </h2>
              </div>

              {/* Accordion Map Render */}
              <div className="mt-2">
                {group.items.map((item) => {
                  const currentIndex = globalCounter++;
                  return (
                    <AccordionItem 
                      key={currentIndex} 
                      question={item.q} 
                      answer={item.a} 
                      isOpen={openIndex === currentIndex}
                      onClick={() => handleToggle(currentIndex)}
                      activeColor={group.theme.split(' ')[2]}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Vibrant Gradient Conversion CTA Card */}
        <div 
          className="mt-16 sm:mt-20 text-center bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-800 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-xl shadow-purple-900/20 relative overflow-hidden"
          data-aos="zoom-in"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.15),transparent)] pointer-events-none"></div>
          <h3 className="text-xl sm:text-3xl font-black tracking-tight">Have a custom requirement?</h3>
          <p className="mt-2.5 text-purple-100 max-w-lg mx-auto text-xs sm:text-base leading-relaxed">
            Drop us your target floor metrics, power grid necessities, and logistics layout parameters. Our enterprise agents match setups instantly.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 relative z-10">
            <a 
              href="/contact" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-all duration-200 active:scale-[0.98] text-sm"
            >
              Contact Industrial Desk
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}