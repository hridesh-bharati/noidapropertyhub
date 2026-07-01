'use client';

import { useState, useEffect, useMemo } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '@/components/Navbar';
// ============================================
// 🎯 DATA: 20 INDUSTRIAL SECTORS
// ============================================
const sectors = [
  'Sector 140A', 'Sector 4', 'Sector 57', 'Sector 58', 'Sector 59',
  'Sector 63', 'Sector 65', 'Sector 67', 'Sector 80', 'Sector 83',
  'Hosiery Complex', 'Phase 2', 'Sector 138', 'Sector 85', 'Sector 140',
  'Sector 155', 'Ecotech 3', 'Sector 8', 'Sector 6', 'Sector 5'
];

// ============================================
// 🏭 PROPERTIES DATA - FACTORY & WAREHOUSE RENTALS ONLY
// ============================================
const warehouseFeatures = [
  ['Loading Dock', '24/7 Security', 'Power Backup', 'Fire Safety', 'Fleet Parking', 'CCTV Surveillance'],
  ['Cold Storage', 'Loading Bay', 'Temperature Control', 'Security', 'Power Backup', 'Inventory Area'],
  ['Multiple Docks', 'Warehouse Office', 'Staff Canteen', 'Security System', 'Generator Backup', 'Sprinkler System'],
  ['Ground Level Access', 'Heavy Vehicle Access', '24/7 Power', 'Security Guard', 'Parking Area', 'Washroom'],
  ['High Ceiling', 'Racking System', 'Forklift Access', 'Fire Alarm', 'CCTV', 'Staff Room']
];

const factoryFeatures = [
  ['Production Line', 'Assembly Area', 'Quality Control Lab', 'Staff Quarters', 'Power Backup', 'Fire Safety'],
  ['Heavy Machinery Area', 'Raw Material Store', 'Finished Goods Area', 'Canteen', 'Security', 'Generator'],
  ['Manufacturing Unit', 'Tool Room', 'Inspection Area', 'Worker Facilities', 'Power Backup', 'Loading Bay'],
  ['Processing Plant', 'Storage Shed', 'Packaging Unit', 'Staff Canteen', '24/7 Power', 'Safety Equipment'],
  ['Industrial Unit', 'Machine Floor', 'Utility Area', 'Office Block', 'Fire System', 'Backup Power']
];

const warehouseTitles = [
  'Premium Warehouse Space',
  'Modern Storage Warehouse',
  'Large Distribution Warehouse',
  'Industrial Warehouse Unit',
  'Smart Logistics Warehouse'
];

const factoryTitles = [
  'Industrial Factory Unit',
  'Manufacturing Factory Space',
  'Production Factory Complex',
  'Heavy Industrial Factory',
  'Light Manufacturing Factory'
];

const getPropertyImage = (index) => {
  const images = [
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1565031491910-e57fac031c08?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=350&fit=crop'
  ];
  return images[index % images.length];
};

// Generate all properties
const generateProperties = () => {
  const properties = [];
  const advisors = ['Ashutosh Tripathi', 'Priya Sharma', 'Rahul Verma', 'Sneha Patel', 'Vikram Singh'];
  
  sectors.forEach((sector, index) => {
    // Warehouse
    const warehouseSqft = ['8,000', '12,000', '15,000', '20,000', '25,000', '30,000', '35,000', '40,000', '45,000', '50,000'];
    const warehousePrices = ['₹1.8 Cr', '₹2.2 Cr', '₹2.8 Cr', '₹3.5 Cr', '₹4.2 Cr', '₹5.0 Cr', '₹5.8 Cr', '₹6.5 Cr', '₹7.5 Cr', '₹8.5 Cr'];
    
    properties.push({
      id: properties.length + 1,
      image: getPropertyImage(index),
      type: 'For Rent',
      category: 'Warehouse',
      price: warehousePrices[index % warehousePrices.length],
      title: `${warehouseTitles[index % warehouseTitles.length]} in ${sector}, Noida`,
      location: `${sector}, Noida`,
      sqft: `${warehouseSqft[index % warehouseSqft.length]} Sq.Ft`,
      features: warehouseFeatures[index % warehouseFeatures.length],
      featured: index % 5 === 0,
      verified: true,
      availability: 'Available Now',
      advisor: advisors[index % advisors.length],
      sector: sector
    });

    // Factory
    const factorySqft = ['15,000', '20,000', '25,000', '30,000', '35,000', '40,000', '45,000', '50,000', '55,000', '60,000'];
    const factoryPrices = ['₹3.5 Cr', '₹4.5 Cr', '₹5.5 Cr', '₹6.5 Cr', '₹7.5 Cr', '₹8.5 Cr', '₹9.5 Cr', '₹10.5 Cr', '₹11.5 Cr', '₹12.5 Cr'];
    
    properties.push({
      id: properties.length + 1,
      image: getPropertyImage(index + 1),
      type: 'For Rent',
      category: 'Factory',
      price: factoryPrices[index % factoryPrices.length],
      title: `${factoryTitles[index % factoryTitles.length]} in ${sector}, Noida`,
      location: `${sector}, Noida`,
      sqft: `${factorySqft[index % factorySqft.length]} Sq.Ft`,
      features: factoryFeatures[index % factoryFeatures.length],
      featured: index % 4 === 0,
      verified: true,
      availability: 'Available Now',
      advisor: advisors[(index + 2) % advisors.length],
      sector: sector
    });
  });
  
  return properties;
};

const allProperties = generateProperties();

// ============================================
// 📋 FAQ DATA - RENTAL FOCUSED
// ============================================
const faqData = [
  {
    category: "1. Factory Spaces for Rent/Lease",
    icon: "🏭",
    items: [
      { 
        q: "Noida aur Greater Noida ke in 20 core sectors me factory space rent par lene ke kya benefits hain?", 
        a: `Hamare premium sectors jaise Sector 57, 58, 59, 63, 65, 67, Phase 2, aur Ecotech 3 explicitly industrial manufacturing units ke liye designed hain. Yahan wide heavy-vehicle approach roads, standard high-tension power connectivity, pre-installed industrial layouts aur smooth structural drainage setups milte hain jo local authority aur state compliance rules ko support karte hain. In sectors me 24/7 security, dedicated power backup, aur worker facilities standard available hain.`
      },
      { 
        q: "Industrial Areas jaise Hosiery Complex, Sector 80, 83 aur 85 me production floor features kya hote hain?", 
        a: "In sectors me high-grade production lines, clear assembly areas, tools and storage units ke sath custom layouts available hain. Heavy machinery spaces me power capabilities load flexibility ke mutabiq custom upgrade ho sakti hain aur structured worker utilities facility range me targeted milti hain. In sectors me loading docks, raw material storage, finished goods area, aur staff canteen facilities bhi standard hain." 
      },
      { 
        q: "Kya Sector 4, 5, 6, aur 8 jaise core sectors me manufacturing lines up-to-date hain?", 
        a: "Ji haan, ye sectors Noida ke primary industrial layouts me aate hain. Yahan process plants, dedicated raw material setups aur manufacturing layouts already operation-ready modes me hain. Gated environments ke sath heavy transport loading docks closely connected hain. In sectors me power supply 24/7 available hai aur industrial corridors se direct connectivity hai." 
      },
      { 
        q: "Factory rental me minimum lease period kya hota hai aur renewal terms kya hain?", 
        a: "Industrial factory rentals me amoman minimum 3 saal ka lease agreement hota hai, jisme 5 aur 9 saal ke options bhi available hain. Renewal terms me 15-20% rent escalation hota hai jo market conditions par depend karta hai. Lock-in period typically 3 saal ka hota hai, jiske baad early termination options available hain." 
      }
    ]
  },
  {
    category: "2. Warehousing & Logistics Storage for Rent",
    icon: "📦",
    items: [
      { 
        q: "Sector 140A, Sector 140, aur Sector 138 me modern warehouses renting standard features kya hain?", 
        a: "In premium logistics nodes me heavy racking structures, massive internal layouts (e.g., 25,000 to 50,000 Sq.Ft) aur cross-docking loading units standard hain. Multi-tier structural safety, fire hydrants, automated dock levelers aur massive container fleet yards space logic me embedded hote hain. In sectors me CCTV surveillance, 24/7 security, aur dedicated parking for heavy vehicles available hai." 
      },
      { 
        q: "E-commerce aur supply chain companies ke liye Sector 63, 65 aur Phase 2 areas distribution centers ke liye sahi hain?", 
        a: "Absolutely! Ye nodes Noida-Greater Noida Expressway aur main peripheral corridors se direct line optimization hold karte hain. Yahan 24/7 security layouts, full power setups, massive ceiling vertical clearance heights aur fleet dynamic loading docks heavy transit cycles ko support karte hain. In sectors se Delhi, Ghaziabad, aur Greater Noida markets tak easy access hai." 
      },
      { 
        q: "Warehouse rental me loading dock aur storage capacity parameters kya hain?", 
        a: "Standard warehouses me 4-6 loading docks available hain, jo heavy vehicles ke liye designed hain. Storage capacity 8,000 se 50,000 Sq.Ft tak available hai. Ceiling height 25-35 feet hai jo racking systems support karta hai. Floor load bearing capacity 2-3 tons per sq.ft hai, jo heavy machinery aur palletized storage ke liye suitable hai." 
      }
    ]
  },
  {
    category: "3. Commercial/Industrial Rental Protocols & Rules",
    icon: "📋",
    items: [
      { 
        q: "Noida industrial zones me factory/warehouse rentals par standard lease cycle criteria kya hota hai?", 
        a: "Industrial rentals amoman corporate structure leases handle karte hain jo minimum 3 saal, 5 saal ya 9 saal tak run hote hain. Isme periodic rent escalation values amoman contract conditions ke mutabiq 3 ya 5 saal ke loops par calculate ki jati hain. Rent escalation typically 15-20% after every 3 years, ya 5-7% annual increment basis par hota hai." 
      },
      { 
        q: "Industrial properties rent out karne par Security Deposit, Brokerage aur GST values kya lagti hain?", 
        a: "Standard market rules ke mutabiq industrial leasing properties par 3 se 4 mahine ka standard advance security deposit lagta hai. Commercial rental values par 18% GST rules apply hote hain jiska commercial firms dynamic input tax credit (ITC) verify karke system logic parameters set kar sakti hain. Brokerage typically 1 month's rent (one-time) hoti hai, jo tenant pays karta hai." 
      },
      { 
        q: "Industrial rental agreement me kaun-kaun se legal documents required hain?", 
        a: "Industrial rental ke liye GST Registration Certificate, PAN Card of Company/Firm, Memorandum of Association (MOA) / Partnership Deed, Signatory Authority Letter, Previous Rent Receipts (if any), 3 Years ITR for Company, aur Board Resolution (for companies) required hain. Sabhi documents ko notarized aur registered hona chahiye." 
      }
    ]
  },
  {
    category: "4. Power, Infrastructure & Utilities",
    icon: "⚡",
    items: [
      { 
        q: "Industrial sectors me power backup aur electricity load availability kya hai?", 
        a: "Sectors me 100% power backup available hai through DG sets. Sanctioned load typically 50 KW se 500 KW+ tak available hai, jo requirement ke hisaab se increase ki ja sakti hai. Noida Power Company Limited (NPCL) se 24/7 electricity supply available hai. Three-phase power connection standard hai, aur industrial rates applicable hain." 
      },
      { 
        q: "Water supply aur drainage systems kya hain industrial areas me?", 
        a: "Industrial areas me dedicated water supply lines hain for industrial use. Borewell options bhi available hain. STP (Sewage Treatment Plant) facilities mandatory hain for large units. Rainwater harvesting systems installed hain. Industrial drainage systems Noida Authority approved hain aur smooth disposal ke liye designed hain." 
      }
    ]
  }
];

// ============================================
// 🧩 COMPONENTS
// ============================================

// Accordion Component
function AccordionItem({ question, answer, isOpen, onClick }) {
  return (
    <div 
      className="border border-slate-200/60 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden mb-4"
      data-aos="fade-up"
    >
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-5 text-left font-semibold text-slate-800 hover:bg-blue-50/30 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg pr-4 text-slate-900 font-medium tracking-tight">{question}</span>
        <span className={`transform transition-transform duration-300 p-2 rounded-full bg-slate-100 text-slate-600 flex-shrink-0 ${isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[800px] border-t border-slate-100 bg-slate-50/40' : 'max-h-0'}`}
      >
        <div className="p-5 text-slate-600 text-sm sm:text-base leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

// Property Card Component
function PropertyCard({ property }) {
  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Warehouse': return 'bg-blue-100 text-blue-800';
      case 'Factory': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-slate-100"
      data-aos="fade-up"
    >
      {/* Image */}
      <div className="relative h-48 sm:h-56 bg-slate-200 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryBadge(property.category)}`}>
            {property.category}
          </span>
          {property.featured && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-400 text-yellow-900">
              ⭐ Featured
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-500 text-white shadow-lg">
            {property.type}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/90 text-slate-700 backdrop-blur-sm shadow-sm">
            {property.availability}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-bold text-slate-900 line-clamp-2 flex-1 pr-3">
            {property.title}
          </h3>
          <span className="text-lg font-extrabold text-blue-600 whitespace-nowrap">
            {property.price}
          </span>
        </div>

        <div className="flex items-center text-slate-500 text-sm mb-2">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {property.location}
        </div>

        <div className="flex items-center text-slate-500 text-sm mb-3">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
          </svg>
          {property.sqft}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {property.features.slice(0, 4).map((feature, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
              {feature}
            </span>
          ))}
          {property.features.length > 4 && (
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
              +{property.features.length - 4} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center">
            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-xs">
              {property.advisor.charAt(0)}
            </div>
            <span className="ml-2 text-xs text-slate-600">
              <span className="font-medium text-slate-800">{property.advisor}</span>
            </span>
          </div>
          {property.verified && (
            <span className="flex items-center text-green-600 text-xs font-medium">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verified
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// 🍪 COOKIES POLICY COMPONENT
// ============================================
function CookiesPolicy() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      // Show cookies banner after 2 seconds
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t-4 border-blue-600 shadow-2xl animate-slide-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <h3 className="font-bold text-slate-800">🍪 Cookies Policy</h3>
            </div>
            <p className="text-sm text-slate-600">
              We use cookies to enhance your experience, analyze site traffic, and serve personalized content. 
              By clicking "Accept All", you consent to our use of cookies.
            </p>
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium mt-1"
            >
              {showDetails ? 'Hide Details' : 'View Cookie Details'}
            </button>
            
            {showDetails && (
              <div className="mt-2 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 space-y-1 border border-slate-200">
                <p><strong>Essential Cookies:</strong> Required for basic site functionality (session, security).</p>
                <p><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site (Google Analytics).</p>
                <p><strong>Preference Cookies:</strong> Remember your settings and preferences.</p>
                <p><strong>Marketing Cookies:</strong> Used to deliver relevant ads and track campaign performance.</p>
                <p className="text-slate-400 mt-1">You can change your preferences anytime through your browser settings.</p>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 flex-shrink-0">
            <button
              onClick={declineCookies}
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 font-medium rounded-lg hover:bg-slate-100 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="px-5 py-2 text-sm bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

// ============================================
// 🎯 MAIN COMPONENT
// ============================================
export default function IndustrialRentalPlatform() {
  const [activeTab, setActiveTab] = useState('properties');
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const itemsPerPage = 6;

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter Properties
  const filteredProperties = useMemo(() => {
    let filtered = allProperties;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedSector !== 'All') {
      filtered = filtered.filter(p => p.sector === selectedSector);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.features.some(f => f.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, selectedSector, searchQuery]);

  // Filter FAQ
  const filteredFaq = useMemo(() => {
    let filtered = faqData;

    if (selectedSector !== 'All') {
      filtered = filtered.map(group => ({
        ...group,
        items: group.items.filter(item => 
          item.q.toLowerCase().includes(selectedSector.toLowerCase()) ||
          item.a.toLowerCase().includes(selectedSector.toLowerCase())
        )
      })).filter(group => group.items.length > 0);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.map(group => ({
        ...group,
        items: group.items.filter(item => 
          item.q.toLowerCase().includes(query) ||
          item.a.toLowerCase().includes(query)
        )
      })).filter(group => group.items.length > 0);
    }

    return filtered;
  }, [selectedSector, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSector, searchQuery]);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const totalQuestions = faqData.reduce((acc, g) => acc + g.items.length, 0);
  const filteredQuestions = filteredFaq.reduce((acc, g) => acc + g.items.length, 0);

  let globalCounter = 0;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
   
    <>
    <Navbar />
     <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* ========== COOKIES POLICY BANNER ========== */}
        <CookiesPolicy />

        {/* ========== SCHEMA MARKUP ========== */}
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

        {/* ========== HEADER ========== */}
        <div className="text-center mb-10" data-aos="fade-down">
          <span className="inline-block text-blue-600 font-bold tracking-wider text-xs uppercase bg-blue-50 px-4 py-1.5 rounded-full shadow-sm border border-blue-100">
            🏭 Noida Industrial Rentals
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Factory & Warehouse <br className="sm:hidden" />
            <span className="text-blue-600">Rental Platform</span>
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Find premium industrial spaces across Noida's 20 core sectors. 
            Verified properties, transparent leases, and expert guidance.
          </p>
          <div className="mt-4 flex justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              {allProperties.length} Properties
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              {sectors.length} Sectors
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              {totalQuestions} FAQs
            </span>
          </div>
        </div>

        {/* ========== TAB NAVIGATION ========== */}
        <div className="flex justify-center mb-8" data-aos="fade-up">
          <div className="bg-white rounded-2xl shadow-md border border-slate-200/60 p-1.5 inline-flex">
            <button
              onClick={() => setActiveTab('properties')}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'properties'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Properties
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === 'properties' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {allProperties.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'faq'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              FAQs
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === 'faq' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {totalQuestions}
              </span>
            </button>
          </div>
        </div>

        {/* ========== SEARCH & FILTERS ========== */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-4 md:p-6 mb-8" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search properties, sectors, features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50/50 hover:bg-white"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-slate-50/50 hover:bg-white pr-10"
              >
                <option value="All">All Categories</option>
                <option value="Warehouse">Warehouse</option>
                <option value="Factory">Factory</option>
              </select>
            </div>

            {/* Sector Filter */}
            <div>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-slate-50/50 hover:bg-white pr-10"
              >
                <option value="All">All Sectors</option>
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== 'All' || selectedSector !== 'All' || searchQuery) && (
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
              <span className="text-sm text-slate-500">Filters:</span>
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')} className="ml-2 hover:text-blue-900">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {selectedSector !== 'All' && (
                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                  {selectedSector}
                  <button onClick={() => setSelectedSector('All')} className="ml-2 hover:text-green-900">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="ml-2 hover:text-slate-900">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedSector('All');
                  setSearchQuery('');
                }}
                className="text-sm text-red-500 hover:text-red-700 font-medium ml-auto"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* ========== SECTOR CLOUD ========== */}
        <div className="bg-white border border-slate-200/60 p-4 rounded-2xl mb-10 shadow-sm" data-aos="fade-up">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Active Industrial Locations:
            </h3>
            <span className="ml-auto text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              {sectors.length} sectors
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sectors.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(selectedSector === sec ? 'All' : sec)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  selectedSector === sec
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>

        {/* ========== TAB CONTENT ========== */}
        {activeTab === 'properties' ? (
          // ===== PROPERTIES TAB =====
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-slate-600 text-sm">
                Showing <span className="font-semibold text-slate-900">{paginatedProperties.length}</span> of{' '}
                <span className="font-semibold text-slate-900">{filteredProperties.length}</span> properties
              </p>
            </div>

            {filteredProperties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-10">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-xl border transition-all ${
                        currentPage === 1
                          ? 'border-slate-200 text-slate-400 cursor-not-allowed'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      Previous
                    </button>
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) pageNum = i + 1;
                        else if (currentPage <= 3) pageNum = i + 1;
                        else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                        else pageNum = currentPage - 2 + i;

                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded-xl font-medium transition-all ${
                              currentPage === pageNum
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-xl border transition-all ${
                        currentPage === totalPages
                          ? 'border-slate-200 text-slate-400 cursor-not-allowed'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-xl font-semibold text-slate-600">No properties found</h3>
                <p className="text-slate-400 mt-2">Try adjusting your filters</p>
              </div>
            )}
          </>
        ) : (
          // ===== FAQ TAB =====
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-slate-600 text-sm">
                Showing <span className="font-semibold text-slate-900">{filteredQuestions}</span> of{' '}
                <span className="font-semibold text-slate-900">{totalQuestions}</span> answers
              </p>
            </div>

            {filteredFaq.length > 0 ? (
              <div className="space-y-10">
                {filteredFaq.map((group, groupIdx) => (
                  <div key={groupIdx} className="space-y-4">
                    <h2 
                      className="text-lg sm:text-xl font-extrabold text-slate-900 pl-4 border-l-4 border-blue-600 sticky top-0 bg-slate-50/95 py-3 backdrop-blur-md z-10 tracking-tight flex items-center gap-3"
                      data-aos="fade-right"
                    >
                      <span className="text-2xl">{group.icon}</span>
                      {group.category}
                      <span className="text-blue-600 text-sm font-normal bg-blue-50 px-2 py-0.5 rounded">
                        {group.items.length}
                      </span>
                    </h2>
                    <div className="mt-4">
                      {group.items.map((item) => {
                        const currentIndex = globalCounter++;
                        return (
                          <AccordionItem 
                            key={currentIndex} 
                            question={item.q} 
                            answer={item.a} 
                            isOpen={openIndex === currentIndex}
                            onClick={() => handleToggle(currentIndex)}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-slate-600">No matching questions</h3>
                <p className="text-slate-400 mt-2">Try different search terms</p>
              </div>
            )}
          </>
        )}

        {/* ========== STATS SECTION ========== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16" data-aos="fade-up">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{sectors.length}</div>
            <div className="text-xs text-slate-400 font-medium">Industrial Sectors</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600">{allProperties.length}</div>
            <div className="text-xs text-slate-400 font-medium">Available Properties</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{totalQuestions}</div>
            <div className="text-xs text-slate-400 font-medium">Expert Answers</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-2xl font-bold text-purple-600">24/7</div>
            <div className="text-xs text-slate-400 font-medium">Support Available</div>
          </div>
        </div>

        {/* ========== CTA SECTION ========== */}
        <div 
          className="mt-16 text-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-blue-600/20 relative overflow-hidden"
          data-aos="zoom-in"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent)] pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 text-8xl opacity-10 select-none">🏭</div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight relative z-10">
            Need Immediate Industrial Space?
          </h3>
          <p className="mt-3 text-blue-100 max-w-xl mx-auto text-sm sm:text-base leading-relaxed relative z-10">
            Share your requirements - sector, area (sq.ft), power load, and budget. 
            Our industrial experts will find the perfect match within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 relative z-10">
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
            >
              Contact Commercial Desk
            </a>
          </div>
          <p className="mt-4 text-xs text-blue-200/70 relative z-10">
            ⚡ Free consultation • Verified properties • Fast response • No hidden charges
          </p>
        </div>

        {/* ========== SCROLL TO TOP BUTTON ========== */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 hover:shadow-xl active:scale-95"
            aria-label="Scroll to top"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        )}

        {/* ========== FOOTER WITH COOKIES LINK ========== */}
        <footer className="mt-16 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Noida Industrial Rentals. All rights reserved.</p>
            <div className="flex gap-6">
              <button
                onClick={() => {
                  // Reset cookies and show banner again
                  localStorage.removeItem('cookiesAccepted');
                  window.location.reload();
                }}
                className="hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Cookies Settings
              </button>
              <a href="/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
    </>
  );
}