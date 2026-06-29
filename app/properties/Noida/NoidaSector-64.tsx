"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaStar, 
  FaChevronRight, 
  FaHome, 
  FaBuilding, 
  FaUsers, 
  FaAward,
  FaClock, 
  FaShieldAlt, 
  FaChartLine,
  FaCalendarAlt,
  FaCamera,
  FaPlay,
  FaDownload,
  FaCommentDots,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaFacebook,
  FaFilter,
  FaTimes,
  FaSlidersH,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTag,
  FaCheckCircle,
  FaPhoneAlt,
  FaWhatsapp,
  FaEye,
  FaInfoCircle
} from 'react-icons/fa';
import { HiHeart } from 'react-icons/hi';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function OfficeListingsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      const cards = gsap.utils.toArray('.listing-card');
      cards.forEach((card: any) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Stats counter
      document.querySelectorAll('.stat-number').forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0');
        const suffix = stat.getAttribute('data-suffix') || '';
        
        gsap.fromTo(stat, 
          { innerText: '0' },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            onUpdate: function() {
              const value = Math.round(Number(this.targets()[0].innerText));
              stat.innerText = value + suffix;
            }
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Office listings data
  const listings = [
    {
      id: 1,
      title: "ServSpaces 63",
      location: "Sector-63 Noida",
      type: "Office Building",
      area: "000-15,000 sq.ft",
      price: "Call for Price",
      image: "/api/placeholder/400/300",
      units: 3,
      badge: "Featured",
      furnished: "Fully Furnished",
      metro: "Near Metro"
    },
    {
      id: 2,
      title: "Fully Furnished 15,000 Sq. Ft. Office for Lease",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "3,000 sq.ft.",
      price: "₹14.95 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: "Near Metro"
    },
    {
      id: 3,
      title: "Fully Furnished 22,000sq.ft. Office for Rent",
      location: "Sector-63 Noida Near Metro",
      type: "Office Space",
      area: "22,000 sq.ft.",
      price: "₹12 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: "Near Metro"
    },
    {
      id: 4,
      title: "4200 sq ft. Fully Furnished Office Space on Lease",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "4,200 sq.ft",
      price: "₹1.89 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 5,
      title: "Fully Furnished 2600 sq.ft. Office for Rent in Zygon Square",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "2,600 sq.ft",
      price: "₹2.6 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 6,
      title: "3200 sq.ft. Fully Furnished Office Space on Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "200 sq.ft",
      price: "₹1.92 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 7,
      title: "Ready to Move 10000 sq.ft. Furnished Office for Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "10,000 sq.ft",
      price: "₹6.5 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 8,
      title: "Fully Furnished 3000 sq.ft Office for Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "3,000 sq.ft",
      price: "₹2.15 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 9,
      title: "ASF Symphony",
      location: "Sector-63 Noida",
      type: "Office Building",
      area: "10,000-33,000 sq.ft.",
      price: "Call for Price",
      image: "/api/placeholder/400/300",
      units: 4,
      badge: "Premium",
      furnished: "Semi-Furnished",
      metro: ""
    },
    {
      id: 10,
      title: "Fully Furnished 7000 sq.ft. Office Space for Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "7,000 sq.ft",
      price: "₹5.6 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 11,
      title: "Fully Furnished 4000 sq.ft. Office Space for Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "4,000 sq.ft",
      price: "₹2.4 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 12,
      title: "3000 sq.ft. Fully Furnished Office Space on Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "3,000 sq.ft",
      price: "₹1.65 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 13,
      title: "25000 sqft Fully Furnished Office Space on Lease",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "25,000 sq.ft",
      price: "₹14.25 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 14,
      title: "3500 sq.ft. Fully Furnished Office Space on Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "3,500 sq.ft",
      price: "₹2.1 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 15,
      title: "Fully Furnished IT/ITes Independent Building for Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "45,000 sq.ft",
      price: "₹22.5 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 16,
      title: "Newly Furnished 3200 sq.ft. Office for Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "3,200 sq.ft",
      price: "₹1.92 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 17,
      title: "3500 sq.ft. Fully Furnished Office Space on Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "3,500 sq.ft",
      price: "₹1.82 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 18,
      title: "Fully Furnished 3000 sq.ft. Office Space for Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "3,000 sq.ft",
      price: "₹1.65 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 19,
      title: "Fully Furnished 4000 sq.ft. Office for Rent Near Metro",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "4,000 sq.ft",
      price: "Call for Price",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: "Near Metro"
    },
    {
      id: 20,
      title: "Ready to Move 3500 sq.ft. Furnished Office for Rent",
      location: "Sector-63 Noida, Near Metro",
      type: "Office Space",
      area: "3,500 sq.ft",
      price: "₹2.1 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: "Near Metro"
    },
    {
      id: 21,
      title: "Fully Furnished 2000 sq.ft Office for Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "2,000 sq.ft",
      price: "₹1 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 22,
      title: "3500 sq.ft. Fully Furnished Office Space on Lease",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "3,500 sq.ft",
      price: "₹1.93 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 23,
      title: "Fully Furnished 15,000 Sq. Ft. Office for Lease",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "15,000 sq.ft",
      price: "₹9.75 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 24,
      title: "Ready to Fit-out 55000 sq.ft. Office Space for Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "55,000 sq.ft",
      price: "₹22 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Raw Space",
      metro: ""
    },
    {
      id: 25,
      title: "New Furnished 3800 sq.ft Office for Lease / Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "3,800 sq.ft",
      price: "₹2.66 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 26,
      title: "Fully Furnished 3000 sq.ft Office for Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "3,000 sq.ft",
      price: "₹1.65 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 27,
      title: "4500 sq.ft. Fully Furnished Office Space on Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "4,500 sq.ft",
      price: "₹2.7 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 28,
      title: "Fully Furnished 2000 sq.ft Office for Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "2,000 sq.ft",
      price: "₹1.7 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 29,
      title: "Fully Furnished 4000 sq.ft Office for Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "4,000 sq.ft",
      price: "₹2.8 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 30,
      title: "Fully Furnished 5000 sq.ft. Office Space for Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "5,000 sq.ft",
      price: "₹8 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 31,
      title: "Fully Furnished 5000 sq.ft Office for Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "5,000 sq.ft",
      price: "₹3.25 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 32,
      title: "2000 sq.ft. Fully Furnished Office Space on Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "2,000 sq.ft",
      price: "₹1.7 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    },
    {
      id: 33,
      title: "2500 sq.ft. Fully Furnished Office Space on Rent",
      location: "Sector-63 Noida",
      type: "Office Space",
      area: "2,500 sq.ft",
      price: "₹1.63 lac",
      image: "/api/placeholder/400/300",
      badge: "FOR RENT",
      furnished: "Fully Furnished",
      metro: ""
    }
  ];

  // FAQ data
  const faqs = [
    {
      q: "How many office space rentals are available in Sector-63 Noida, Noida?",
      a: "Currently, there are over 33+ office spaces available for rent in Sector-63 Noida, ranging from small boutique offices to large corporate spaces."
    },
    {
      q: "What is the average office rent in Sector-63 Noida, Noida?",
      a: "The average office rent in Sector-63 Noida is approximately ₹62 per sq.ft., with prices ranging from ₹40 to ₹100 per sq.ft. depending on the building and amenities."
    },
    {
      q: "Which are the top office buildings in Sector-63 Noida, Noida?",
      a: "Top office buildings in Sector-63 Noida include ServSpaces 63, ASF Symphony, Zygon Square, and several independent corporate towers with modern amenities."
    },
    {
      q: "What is the rent range for office space in Sector-63 Noida, Noida?",
      a: "The rent range for office spaces in Sector-63 Noida varies from ₹240 to ₹2,100 per sq.ft. depending on the property type, furnishings, and specific location within the sector."
    }
  ];

  // Locations data
  const locations = [
    "Sector-62 Noida", "Sector-63 Noida", "Film City Noida", "Sector-136 Noida",
    "Sector-2 Noida", "Sector-125 Noida", "Sector-3 Noida", "Sector-142 Noida",
    "Sector-16 Noida", "Sector-126 Noida", "Sector-127 Noida", "Sector-135 Noida",
    "Sector-132 Noida", "Sector-98 Noida", "Sector-94 Noida", "Sector-9 Noida",
    "Sector-4 Noida", "Sector-144 Noida", "Sector-129 Noida", "Sector-6 Noida",
    "Sector-64 Noida", "Sector-1 Noida", "Sector-137 Noida", "Sector-143A Noida",
    "Sector-18 Noida", "Sector-128 Noida", "Sector-10 Noida", "Sector-90 Noida"
  ];

  // Delhi locations
  const delhiLocations = [
    "Connaught Place", "Okhla Estate Phase-3", "Aerocity", "Jasola",
    "Mohan Co-operative Industrial Estate", "Lajpat Nagar", "Nehru Place", "Saket",
    "Green Park", "Siri Fort", "Yusuf Sarai", "Defence Colony", "East Of Kailash",
    "Okhla Estate Phase-1", "Panchsheel Park", "Okhla Estate Phase-2", "South Extension-1",
    "Hauz Khas", "Qutab Institutional Area", "Bhikaji Cama Place", "Greater Kailash 2",
    "Safdarjang Enclave", "Sarvodaya Enclave", "Vasant Kunj"
  ];

  // Gurgaon locations
  const gurgaonLocations = [
    "Golf Course Road, Gurgaon", "MG Road, Gurgaon", "Sector-44 Gurgaon",
    "DLF Cyber City, Gurgaon", "Udyog Vihar Phase-4, Gurgaon", "Golf Course Extn Road, Gurgaon",
    "Udyog Vihar Phase-1, Gurgaon", "Udyog Vihar Phase-5, Gurgaon", "Sushant Lok, Gurgaon",
    "Sector-18 Gurgaon"
  ];

  return (
    <div ref={pageRef} className="w-full bg-[#F8FAFC] relative overflow-hidden">
      
      {/* ─── Background Elements ─── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a03_1px,transparent_1px),linear-gradient(to_bottom,#0f172a03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
      <div className="absolute top-[5%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[550px] h-[550px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">

        {/* ===== HERO / BREADCRUMB SECTION ===== */}
        <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] mx-4 lg:mx-8 mt-4 rounded-[2.5rem] shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 sm:py-16 relative">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
              <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <span className="text-slate-600">/</span>
              <Link href="/office-space-rent" className="hover:text-amber-400 transition-colors">Office for Rent</Link>
              <span className="text-slate-600">/</span>
              <Link href="/office-space-rent/noida" className="hover:text-amber-400 transition-colors">Noida</Link>
              <span className="text-slate-600">/</span>
              <span className="text-amber-400 font-bold">Sector-63 Noida</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Office Space for Rent in <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">Sector-63 Noida</span>
            </h1>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">33+</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Office Listings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">₹62</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Avg Rent / sq.ft.</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">₹40-100</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rent Range</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">2</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sector-62 Noida</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FILTERS SECTION ===== */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 -mt-4 relative z-20">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6">
            {/* Filter Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-bold text-slate-700 transition-all border border-slate-200"
                >
                  <FaFilter className="w-4 h-4" />
                  Filters
                  {filtersOpen ? <FaTimes className="w-4 h-4" /> : <FaSlidersH className="w-4 h-4" />}
                </button>
                <button className="text-xs font-medium text-slate-500 hover:text-amber-600 transition-colors">Reset All</button>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-500 font-medium">33 of 33 results</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="area">Area: Largest First</option>
                </select>
                <div className="flex gap-1 border border-slate-200 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1.5 text-xs font-bold transition-colors ${viewMode === 'grid' ? 'bg-amber-500 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                  >
                    Grid
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1.5 text-xs font-bold transition-colors ${viewMode === 'list' ? 'bg-amber-500 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Filters */}
            <div className={`overflow-hidden transition-all duration-300 ${filtersOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search office, building, loc" 
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
                <div>
                  <select className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500">
                    <option>Budget: Min</option>
                    <option>₹10,000</option>
                    <option>₹50,000</option>
                    <option>₹1 Lakh</option>
                    <option>₹5 Lakhs</option>
                  </select>
                </div>
                <div>
                  <select className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500">
                    <option>Budget: Max</option>
                    <option>₹50,000</option>
                    <option>₹1 Lakh</option>
                    <option>₹5 Lakhs</option>
                    <option>₹10 Lakhs</option>
                  </select>
                </div>
                <div>
                  <select className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500">
                    <option>Furnishing</option>
                    <option>Furnished</option>
                    <option>Unfurnished</option>
                    <option>Semi-Furnished</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Locations:</span>
              <button className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-medium text-amber-700">Sector-63 Noida</button>
              <button className="px-3 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-xs font-medium text-slate-600 transition-all hover:border-amber-300 hover:text-amber-600">Sector-62 Noida</button>
              <button className="px-3 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-xs font-medium text-slate-600 transition-all hover:border-amber-300 hover:text-amber-600">Film City Noida</button>
              <button className="px-3 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-xs font-medium text-slate-600 transition-all hover:border-amber-300 hover:text-amber-600">Sector-136 Noida</button>
              <button className="px-3 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-xs font-medium text-slate-600 transition-all hover:border-amber-300 hover:text-amber-600">Sector-2 Noida</button>
            </div>
          </div>
        </section>

        {/* ===== LISTINGS GRID ===== */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing, index) => (
              <div key={listing.id} className="listing-card group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    🏢
                  </div>
                  {listing.badge && (
                    <span className={`absolute top-3 left-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg ${
                      listing.badge === 'Featured' ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white' :
                      listing.badge === 'Premium' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                      'bg-amber-500 text-[#0F172A]'
                    }`}>
                      {listing.badge}
                    </span>
                  )}
                  {listing.metro && (
                    <span className="absolute top-3 right-3 px-3 py-1 bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                      🚇 {listing.metro}
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent p-4">
                    <div className="flex items-center gap-2 text-white text-xs font-medium">
                      <FaMapMarkerAlt className="w-3 h-3" />
                      {listing.location}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-bold text-[#0F172A] text-sm leading-tight">{listing.title}</h4>
                    <button className="w-7 h-7 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center transition-colors flex-shrink-0">
                      <HiHeart className="w-4 h-4 text-slate-400 hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                  
                  <p className="text-xs text-slate-500 font-medium mb-3">{listing.type}</p>
                  
                  <div className="flex items-center gap-3 text-xs text-slate-600 mb-3">
                    <span className="flex items-center gap-1"><FaBuilding className="w-3 h-3" /> {listing.area}</span>
                    {listing.units && (
                      <span className="flex items-center gap-1"><FaEye className="w-3 h-3" /> {listing.units} Units</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      {listing.furnished}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <span className="text-lg font-bold text-[#0F172A]">{listing.price}</span>
                      {listing.price !== 'Call for Price' && (
                        <span className="text-[10px] text-slate-400 ml-1">/month</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 bg-green-50 hover:bg-green-100 rounded-full flex items-center justify-center transition-colors text-green-600">
                        <FaWhatsapp className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 bg-blue-50 hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors text-blue-600">
                        <FaPhoneAlt className="w-4 h-4" />
                      </button>
                      <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-[#0F172A] font-bold text-[10px] uppercase tracking-wider rounded-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all hover:-translate-y-0.5">
                        Know More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-[#0F172A] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-500 hover:text-[#0F172A] transition-all hover:shadow-xl hover:-translate-y-0.5">
              Load More Properties
            </button>
          </div>
        </section>

        {/* ===== ADVISORY SUPPORT ===== */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 p-8 lg:p-12 shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2Mi1IMjR2LTJoMTJ6TTM2IDI0djJIMjR2LTJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-4">
                  Find Your Ideal Office with <br />
                  <span className="text-white">ESTATE LION</span>
                </h3>
                <p className="text-[#0F172A]/80 text-sm mb-6">
                  Our experts will handpick options matching your exact needs, ensuring you find the perfect workspace for your business growth.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="w-5 h-5 text-white mt-0.5" />
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-sm">Bespoke Matching</h4>
                      <p className="text-[#0F172A]/70 text-xs">Personalized property options</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="w-5 h-5 text-white mt-0.5" />
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-sm">Price Advantage</h4>
                      <p className="text-[#0F172A]/70 text-xs">Expert negotiation for best terms</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="w-5 h-5 text-white mt-0.5" />
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-sm">Local Intelligence</h4>
                      <p className="text-[#0F172A]/70 text-xs">Deep knowledge of local markets</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="w-5 h-5 text-white mt-0.5" />
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-sm">500+ Businesses</h4>
                      <p className="text-[#0F172A]/70 text-xs">Found their perfect office</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-white font-bold text-lg mb-4">Get a Personalized Quote</h4>
                <form className="space-y-3">
                  <input type="text" placeholder="Your name" className="w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder:text-white/60 text-sm outline-none focus:ring-2 focus:ring-white/50" />
                  <input type="email" placeholder="Your email" className="w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder:text-white/60 text-sm outline-none focus:ring-2 focus:ring-white/50" />
                  <input type="tel" placeholder="+91 Your phone number" className="w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder:text-white/60 text-sm outline-none focus:ring-2 focus:ring-white/50" />
                  <textarea placeholder="Describe your ideal office space, location preferences, budget range, team size, etc." rows={2} className="w-full px-4 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder:text-white/60 text-sm outline-none focus:ring-2 focus:ring-white/50 resize-none" />
                  <button className="w-full py-3 bg-[#0F172A] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-xl transition-all hover:-translate-y-0.5">
                    Get a Quote
                  </button>
                  <p className="text-[10px] text-white/60 text-center">Free consultation • No commitment required</p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <span className="inline-block text-[10px] font-bold tracking-[0.3em] text-amber-600 uppercase mb-3">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h4 className="font-bold text-[#0F172A] text-sm">{faq.q}</h4>
                    <FaChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </section>

        {/* ===== LOCATIONS FOOTER ===== */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-lg">
            <h4 className="font-bold text-[#0F172A] text-sm mb-4">Office for Rent in Noida</h4>
            <div className="flex flex-wrap gap-2">
              {locations.map((loc, i) => (
                <Link key={i} href="#" className="text-xs text-slate-500 hover:text-amber-600 transition-colors px-2 py-1 hover:bg-amber-50 rounded">
                  {loc}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== DELHI LOCATIONS ===== */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-lg">
            <h4 className="font-bold text-[#0F172A] text-sm mb-4">Office for Rent in New Delhi</h4>
            <div className="flex flex-wrap gap-2">
              {delhiLocations.map((loc, i) => (
                <Link key={i} href="#" className="text-xs text-slate-500 hover:text-amber-600 transition-colors px-2 py-1 hover:bg-amber-50 rounded">
                  {loc}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== GURGAON LOCATIONS ===== */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-4 pb-16">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-lg">
            <h4 className="font-bold text-[#0F172A] text-sm mb-4">Office for Rent in Gurgaon</h4>
            <div className="flex flex-wrap gap-2">
              {gurgaonLocations.map((loc, i) => (
                <Link key={i} href="#" className="text-xs text-slate-500 hover:text-amber-600 transition-colors px-2 py-1 hover:bg-amber-50 rounded">
                  {loc}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <section className="bg-[#0F172A] text-white py-16 mt-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              
              <div>
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">ESTATE LION</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  2nd Floor, Plot No-1, Film City,<br />
                  Sector-16A Noida - 201301
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                  <FaPhone className="w-4 h-4" />
                  <span>+91 9999320114</span>
                </div>
                <div className="text-xs text-slate-500">
                  © 2014-2026 ESTATELION.COM
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-amber-400">Company</h4>
                <ul className="space-y-2">
                  {['Home', 'About Us', 'Contact Us', 'Privacy Policy'].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-amber-400">Quick Links</h4>
                <ul className="space-y-2">
                  {['Office for Rent in Noida', 'Office for Rent in Delhi', 'Office for Rent in Gurgaon', 'Office for Rent in DLF Cyber City'].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-amber-400">Popular Locations</h4>
                <ul className="space-y-2">
                  {['Office for Rent in Sector-62 Noida', 'Office for Rent in Film City Noida', 'Office for Rent in Connaught Place', 'Office for Rent in Aerocity, Delhi', 'Office for Rent on Noida Expressway', 'Office for Rent in Sector-16 Noida'].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <Link href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                  <FaFacebook className="w-4 h-4" />
                </Link>
                <Link href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                  <FaTwitter className="w-4 h-4" />
                </Link>
                <Link href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                  <FaInstagram className="w-4 h-4" />
                </Link>
                <Link href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                  <FaLinkedin className="w-4 h-4" />
                </Link>
                <Link href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                  <FaYoutube className="w-4 h-4" />
                </Link>
              </div>
              <div className="text-xs text-slate-500">
                All Rights Reserved
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}