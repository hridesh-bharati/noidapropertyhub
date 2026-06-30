"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';

import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaStar, 
  FaChevronRight, 
  FaClock, 
  FaShieldAlt, 
  FaPlay,
  FaDownload,
  FaCommentDots,
} from 'react-icons/fa';
import { HiHeart } from 'react-icons/hi';

export default function AboutPageContent() {
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  // Property data
  const properties = [
    {
      id: 1,
      title: "Luxury Penthouse with Sky Deck",
      location: "DLF Phase 5, Gurugram",
      price: "₹8.5 Cr",
      type: "Penthouse",
      beds: 4,
      baths: 5,
      area: "4,500 sq.ft",
      badge: "Featured",
      badgeColor: "from-yellow-400 to-amber-500"
    },
    {
      id: 2,
      title: "Waterfront Villa with Private Pool",
      location: "Sector 150, Noida",
      price: "₹5.2 Cr",
      type: "Villa",
      beds: 3,
      baths: 4,
      area: "3,200 sq.ft",
      badge: "Luxury",
      badgeColor: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Commercial Office Space - Premium",
      location: "Connaught Place, Delhi",
      price: "₹12.5 Cr",
      type: "Commercial",
      beds: 0,
      baths: 2,
      area: "6,800 sq.ft",
      badge: "Prime",
      badgeColor: "from-blue-500 to-cyan-500"
    },
    {
      id: 4,
      title: "Studio Apartment with City View",
      location: "Aerocity, Delhi",
      price: "₹2.8 Cr",
      type: "Studio",
      beds: 1,
      baths: 1,
      area: "850 sq.ft",
      badge: "New",
      badgeColor: "from-green-500 to-emerald-500"
    }
  ];

  // Projects data
  const projects = [
    {
      id: 1,
      name: "The Imperial Heights",
      developer: "DLF Limited",
      location: "Golf Course Road, Gurugram",
      type: "Luxury Residential",
      units: 320,
      completion: "2025",
      status: "Pre-Launch"
    },
    {
      id: 2,
      name: "Corporate One Tower",
      developer: "Godrej Properties",
      location: "Sector 62, Noida",
      type: "Commercial",
      units: 45,
      completion: "2024",
      status: "Ready"
    },
    {
      id: 3,
      name: "The Park Residences",
      developer: "Prestige Group",
      location: "South Delhi",
      type: "Residential",
      units: 180,
      completion: "2026",
      status: "Under Construction"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Khanna",
      company: "CEO, TechVentures",
      text: "ESTATE LION provided exceptional guidance for our corporate office acquisition. Their market intelligence and negotiation skills were outstanding.",
      rating: 5,
      initial: "R"
    },
    {
      id: 2,
      name: "Priya Sharma",
      company: "Director, Global Corp",
      text: "The team at ESTATE LION helped us find the perfect commercial space in Noida. Their end-to-end execution made the entire process seamless.",
      rating: 5,
      initial: "P"
    },
    {
      id: 3,
      name: "Amit Patel",
      company: "MD, Alpha Group",
      text: "We've worked with many advisors, but ESTATE LION stands out for their transparency, depth of market knowledge, and genuine commitment.",
      rating: 5,
      initial: "A"
    }
  ];

  // Builders data
  const builders = [
    { id: 1, name: "DLF" },
    { id: 2, name: "Godrej" },
    { id: 3, name: "Prestige" },
    { id: 4, name: "Sobha" },
    { id: 5, name: "Tata Housing" },
    { id: 6, name: "Brigade" }
  ];

  // FAQ data
  const faqs = [
    {
      q: "How does the site selection process work?",
      a: "We begin with a detailed requirement analysis understanding your business needs, budget constraints, growth projections, and specific location preferences. We then use our proprietary database to identify suitable properties, both on-market and off-market, present you with curated options, and facilitate site visits. Our team handles all negotiations and due diligence to secure the best terms."
    },
    {
      q: "Do you handle legal documentation and compliance?",
      a: "Yes, our in-house legal team manages all aspects of documentation, including title verification, due diligence, registration, and compliance. We ensure every transaction is legally sound and fully compliant with RERA and other relevant regulations, providing you complete peace of mind."
    },
    {
      q: "What types of properties do you specialize in?",
      a: "We specialize in premium commercial assets including office spaces, retail outlets, and institutional-grade properties, as well as ultra-luxury residential spaces including penthouses, villas, and high-end apartments. Our expertise covers Delhi, Noida, Gurugram, and surrounding areas."
    },
    {
      q: "Do you offer post-purchase services?",
      a: "Absolutely. Our relationship extends beyond the transaction. We provide ongoing support including property management, leasing assistance, maintenance coordination, and advisory services for portfolio optimization and future investments."
    }
  ];

  return (
    <>
      <Navbar />
      <div className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
        
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[100px]" />
        </div>

        <div className="relative">

          {/* ===== HERO SECTION ===== */}
          <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 mx-4 lg:mx-8 mt-4 rounded-[3rem] shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Content */}
                <div>
                  <div 
                    data-aos="fade-down" 
                    data-aos-delay="200"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-full text-amber-400 text-[11px] font-bold tracking-[0.2em] uppercase mb-8"
                  >
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                    Premium Advisory Since 2014
                  </div>
                  
                  <h1 
                    data-aos="fade-up" 
                    data-aos-delay="400"
                    className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6"
                  >
                    Precision in{' '}
                    <br className="hidden sm:block" />
                    <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                      Real Estate
                    </span>
                  </h1>
                  
                  <p 
                    data-aos="fade-up" 
                    data-aos-delay="600"
                    className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-xl mb-10"
                  >
                    ESTATE LION bridges the gap between complex market dynamics and informed investment decisions. We are strategic partners in your asset growth journey.
                  </p>
                  
                  <div 
                    data-aos="fade-up" 
                    data-aos-delay="800"
                    className="flex flex-wrap gap-4"
                  >
                    <Link href="/contact" className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
                      Partner With Us
                      <FaChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="#properties" className="px-8 py-4 border-2 border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                      Explore Properties
                    </Link>
                  </div>

                  {/* Rating */}
                  <div 
                    data-aos="fade-up" 
                    data-aos-delay="1000"
                    className="mt-8 flex items-center gap-4"
                  >
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((i) => (
                        <FaStar key={i} className="w-5 h-5 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-slate-400 text-sm">
                      <span className="text-white font-bold">4.9/5</span> from 500+ Reviews
                    </span>
                  </div>
                </div>

                {/* Right Content */}
                <div data-aos="fade-left" data-aos-delay="400">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-blue-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                    <div className="relative w-full h-[400px] lg:h-[500px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_70%)]" />
                      <div className="text-center p-8 relative z-10">
                        <div className="text-9xl mb-6 animate-bounce">🏢</div>
                        <p className="text-white/90 font-bold text-2xl">Premium Real Estate Advisory</p>
                        <p className="text-slate-400 mt-2 flex items-center justify-center gap-2">
                          <FaMapMarkerAlt className="w-4 h-4 text-amber-400" />
                          Delhi • Noida • Gurugram
                        </p>
                        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><FaClock className="w-3 h-3" /> 24/7 Support</span>
                          <span className="flex items-center gap-1"><FaShieldAlt className="w-3 h-3" /> RERA Certified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-white/5">
                {[
                  { num: "12+", text: "Years of Excellence" },
                  { num: "5M+", text: "Sq. Ft. Transacted" },
                  { num: "3000+", text: "Corporate Clients" },
                  { num: "4", text: "High Growth Centers" }
                ].map((stat, idx) => (
                  <div 
                    key={idx} 
                    data-aos="zoom-in" 
                    data-aos-delay={200 * idx}
                    className="text-center group"
                  >
                    <div className="text-4xl lg:text-5xl font-black text-amber-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                      {stat.num}
                    </div>
                    <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                      {stat.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== SEARCH SECTION ===== */}
          <section className="max-w-7xl mx-auto px-6 lg:px-8 -mt-10 relative z-20">
            <div 
              data-aos="fade-up" 
              data-aos-delay="200"
              className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <select className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none appearance-none cursor-pointer">
                    <option>Property Type</option>
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Penthouse</option>
                    <option>Villa</option>
                  </select>
                </div>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <select className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none appearance-none cursor-pointer">
                    <option>Select Location</option>
                    <option>Delhi</option>
                    <option>Noida</option>
                    <option>Gurugram</option>
                    <option>Mumbai</option>
                  </select>
                </div>
                <button className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-xl hover:shadow-amber-500/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                  <FaSearch className="w-4 h-4" />
                  Search Registry
                </button>
              </div>
              
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trending:</span>
                {['Waterfront', 'Metropolitan', 'Penthouses', 'EcoLuxury'].map((tag, i) => (
                  <button key={i} className="px-4 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-xs font-medium text-slate-600 transition-all hover:border-amber-300 hover:text-amber-600">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ===== WHY CHOOSE US ===== */}
          <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span 
                data-aos="fade-up"
                className="inline-block text-[11px] font-bold tracking-[0.3em] text-amber-600 uppercase mb-3"
              >
                Why Choose Us
              </span>
              <h2 
                data-aos="fade-up" 
                data-aos-delay="100"
                className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight"
              >
                Industry Leaders{' '}
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Choose ESTATE LION</span>
              </h2>
              <p 
                data-aos="fade-up" 
                data-aos-delay="200"
                className="text-slate-500 mt-4 max-w-xl mx-auto"
              >
                We move beyond standard listings to deliver intelligence-led advisory — every recommendation is backed by market data and compliance diligence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: "📊", 
                  title: "Market Intelligence", 
                  desc: "Access to real-time transaction data and sector trends. We advise based on where the market is going, not just where it is today.",
                  color: "from-blue-500 to-cyan-500"
                },
                { 
                  icon: "🛡️", 
                  title: "Risk & Compliance", 
                  desc: "We handle rigorous paperwork and legal compliance, ensuring a lean, transparent, and legally sound transaction every time.",
                  color: "from-amber-500 to-orange-500"
                },
                { 
                  icon: "🤝", 
                  title: "Relationship First", 
                  desc: "Success is not a one-time deal. We build multi-year partnerships, acting as your dedicated real estate department.",
                  color: "from-purple-500 to-pink-500"
                }
              ].map((box, i) => (
                <div 
                  key={i} 
                  data-aos="flip-left" 
                  data-aos-delay={150 * i}
                  className="group bg-white border border-slate-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${box.color} flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    {box.icon}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-3">{box.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{box.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ===== PROPERTY CATEGORIES ===== */}
          <section className="bg-white py-24 border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span 
                  data-aos="fade-up"
                  className="inline-block text-[11px] font-bold tracking-[0.3em] text-amber-600 uppercase mb-3"
                >
                  Property Categories
                </span>
                <h2 
                  data-aos="fade-up" 
                  data-aos-delay="100"
                  className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight"
                >
                  Explore Our{' '}
                  <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Premium Portfolio</span>
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: "🏢", label: "Commercial", count: "240+ Properties" },
                  { icon: "🏠", label: "Residential", count: "180+ Properties" },
                  { icon: "🏗️", label: "Under Construction", count: "65+ Properties" },
                  { icon: "🏰", label: "Luxury Villas", count: "90+ Properties" }
                ].map((cat, i) => (
                  <div 
                    key={i} 
                    data-aos="zoom-in" 
                    data-aos-delay={100 * i}
                    className="group bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-slate-200/50 cursor-pointer"
                  >
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
                    <h4 className="font-bold text-slate-900">{cat.label}</h4>
                    <p className="text-sm text-slate-400 mt-1">{cat.count}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== FEATURED PROPERTIES ===== */}
          <section id="properties" className="py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span 
                  data-aos="fade-up"
                  className="inline-block text-[11px] font-bold tracking-[0.3em] text-amber-600 uppercase mb-3"
                >
                  Featured Properties
                </span>
                <h2 
                  data-aos="fade-up" 
                  data-aos-delay="100"
                  className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight"
                >
                  Premium{' '}
                  <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Properties</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {properties.map((property, idx) => (
                  <div 
                    key={property.id} 
                    data-aos="fade-up" 
                    data-aos-delay={150 * idx}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="relative h-52 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center overflow-hidden">
                      <div className="text-6xl transition-transform duration-500 group-hover:scale-110">
                        {property.type === 'Commercial' ? '🏢' : property.type === 'Penthouse' ? '🏙️' : property.type === 'Villa' ? '🏠' : '🏢'}
                      </div>
                      {property.badge && (
                        <span className={`absolute top-3 left-3 px-3 py-1 bg-gradient-to-r ${property.badgeColor} text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg`}>
                          {property.badge}
                        </span>
                      )}
                      <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg hover:shadow-xl">
                        <HiHeart className="w-5 h-5 text-slate-400 hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                    
                    <div className="p-5">
                      <div className="text-sm font-bold text-amber-600 mb-1">{property.type}</div>
                      <h4 className="font-bold text-slate-900 leading-tight mb-1">{property.title}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                        <FaMapMarkerAlt className="w-3 h-3 text-amber-500" /> {property.location}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 pb-4 border-b border-slate-100">
                        <span>🛏️ {property.beds} Beds</span>
                        <span>🚿 {property.baths} Baths</span>
                        <span>📐 {property.area}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-slate-900">{property.price}</span>
                        <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold text-[10px] uppercase tracking-wider rounded-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all hover:-translate-y-0.5">
                          Enquire Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== COMMERCIAL OFFICE ===== */}
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span 
                  data-aos="fade-up"
                  className="inline-block text-[11px] font-bold tracking-[0.3em] text-amber-600 uppercase mb-3"
                >
                  Commercial
                </span>
                <h2 
                  data-aos="fade-up" 
                  data-aos-delay="100"
                  className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight"
                >
                  Premium{' '}
                  <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Office Spaces</span>
                </h2>
              </div>

              <div 
                data-aos="fade-up" 
                data-aos-delay="200"
                className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-10 lg:p-16 shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
                
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div>
                    <span className="inline-block px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-[11px] font-bold uppercase tracking-wider mb-6">
                      Institutional Grade
                    </span>
                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                      Corporate Headquarters &{' '}
                      <span className="text-amber-400">Premium Office Suites</span>
                    </h3>
                    <p className="text-slate-300 leading-relaxed mb-8">
                      From site selection to fit-out advisory and lease management, we streamline the entire lifecycle of your corporate real estate needs across Delhi NCR.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-xl hover:shadow-amber-500/30 transition-all hover:-translate-y-1">
                        View Office Spaces
                      </button>
                      <button className="px-6 py-3 border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all">
                        Schedule Visit
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: "300+", label: "Properties Available" },
                      { value: "50K+", label: "Sq. Ft. Portfolio" },
                      { value: "4.9", label: "Client Rating" },
                      { value: "24/7", label: "Support" }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                        <div className="text-2xl lg:text-3xl font-bold text-amber-400 mb-1">{item.value}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== LATEST PROJECTS ===== */}
          <section className="bg-white py-24 border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span 
                  data-aos="fade-up"
                  className="inline-block text-[11px] font-bold tracking-[0.3em] text-amber-600 uppercase mb-3"
                >
                  Projects
                </span>
                <h2 
                  data-aos="fade-up" 
                  data-aos-delay="100"
                  className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight"
                >
                  Latest{' '}
                  <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Developments</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {projects.map((project, idx) => (
                  <div 
                    key={project.id} 
                    data-aos="fade-up" 
                    data-aos-delay={200 * idx}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="relative h-52 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                      <div className="text-7xl relative z-10 group-hover:scale-110 transition-transform duration-500">🏗️</div>
                      <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-slate-900 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg z-10">
                        {project.status}
                      </div>
                      <div className="absolute bottom-4 left-4 text-white z-10">
                        <span className="font-bold text-lg">{project.name}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-slate-500 font-medium">{project.developer}</p>
                      <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                        <FaMapMarkerAlt className="w-3 h-3 text-amber-500" /> {project.location}
                      </p>
                      <div className="mt-4 flex items-center justify-between text-xs">
                        <span className="text-slate-500">{project.type}</span>
                        <span className="text-slate-400">{project.units} Units</span>
                        <span className="text-slate-400">Completion: {project.completion}</span>
                      </div>
                      <button className="w-full mt-5 py-3 bg-slate-900 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-500 hover:text-slate-900 transition-all duration-300">
                        View Project
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== AMENITIES ===== */}
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span 
                  data-aos="fade-up"
                  className="inline-block text-[11px] font-bold tracking-[0.3em] text-amber-600 uppercase mb-3"
                >
                  Amenities
                </span>
                <h2 
                  data-aos="fade-up" 
                  data-aos-delay="100"
                  className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight"
                >
                  World-Class{' '}
                  <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Facilities</span>
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: "🏊", name: "Swimming Pool", desc: "Temperature controlled" },
                  { icon: "💪", name: "Gymnasium", desc: "State-of-the-art fitness" },
                  { icon: "🌳", name: "Gardens", desc: "Lush walking trails" },
                  { icon: "🅿️", name: "Parking", desc: "Ample visitor parking" },
                  { icon: "🔒", name: "Security", desc: "24/7 surveillance" },
                  { icon: "🎾", name: "Sports Courts", desc: "Tennis & squash" },
                  { icon: "🧘", name: "Yoga Studio", desc: "Wellness space" },
                  { icon: "🎉", name: "Clubhouse", desc: "Community lounge" }
                ].map((amenity, i) => (
                  <div 
                    key={i} 
                    data-aos="zoom-in" 
                    data-aos-delay={80 * i}
                    className="group p-6 bg-slate-50 rounded-2xl text-center hover:bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-slate-200/50 cursor-pointer"
                  >
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{amenity.icon}</div>
                    <h4 className="font-bold text-slate-900">{amenity.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">{amenity.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== TRUSTED BUILDERS ===== */}
          <section className="bg-white py-24 border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span 
                  data-aos="fade-up"
                  className="inline-block text-[11px] font-bold tracking-[0.3em] text-amber-600 uppercase mb-3"
                >
                  Our Network
                </span>
                <h2 
                  data-aos="fade-up" 
                  data-aos-delay="100"
                  className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight"
                >
                  Trusted{' '}
                  <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Corporate Partners</span>
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {builders.map((builder, idx) => (
                  <div 
                    key={builder.id} 
                    data-aos="flip-left" 
                    data-aos-delay={100 * idx}
                    className="group bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 flex items-center justify-center border border-slate-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-300"
                  >
                    <span className="text-lg font-bold text-slate-400 group-hover:text-amber-600 transition-colors">
                      {builder.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== TESTIMONIALS ===== */}
          <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span 
                  data-aos="fade-up"
                  className="inline-block text-[11px] font-bold tracking-[0.3em] text-amber-400 uppercase mb-3"
                >
                  Testimonials
                </span>
                <h2 
                  data-aos="fade-up" 
                  data-aos-delay="100"
                  className="text-4xl lg:text-5xl font-bold text-white tracking-tight"
                >
                  What Our{' '}
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">Clients Say</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, idx) => (
                  <div 
                    key={testimonial.id} 
                    data-aos="fade-up" 
                    data-aos-delay={200 * idx}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="flex items-center gap-1 mb-5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="w-5 h-5 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-300 leading-relaxed mb-6 italic">"{testimonial.text}"</p>
                    <div className="flex items-center gap-4 pt-5 border-t border-white/10">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.initial}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{testimonial.name}</h4>
                        <p className="text-sm text-slate-400">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== FAQ ===== */}
          <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                <span 
                  data-aos="fade-up"
                  className="inline-block text-[11px] font-bold tracking-[0.3em] text-amber-600 uppercase mb-3"
                >
                  FAQ
                </span>
                <h2 
                  data-aos="fade-up" 
                  data-aos-delay="100"
                  className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight"
                >
                  Frequently Asked{' '}
                  <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Questions</span>
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div 
                    key={i} 
                    data-aos="fade-up" 
                    data-aos-delay={100 * i}
                    className="bg-slate-50 rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300"
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                        <h4 className="font-bold text-slate-900 pr-4">{faq.q}</h4>
                        <FaChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="px-6 pb-6">
                        <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== DOWNLOAD BROCHURE ===== */}
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div 
                data-aos="fade-up"
                className="relative rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 p-10 lg:p-16 shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-3">Download Our Brochure</h3>
                    <p className="text-slate-800/80">Get comprehensive details about our premium properties and services.</p>
                  </div>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-end">
                    <button className="px-8 py-4 bg-slate-900 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center gap-2">
                      <FaDownload className="w-4 h-4" />
                      Download Now
                    </button>
                    <button className="px-8 py-4 bg-white text-slate-900 font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center gap-2">
                      <FaPlay className="w-4 h-4" />
                      Virtual Tour
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== FINAL CTA ===== */}
          <section className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
            <div 
              data-aos="zoom-in"
              className="relative rounded-[3rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 lg:p-16 text-center shadow-2xl border border-white/5 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              
              <div className="relative">
                <span className="inline-block text-[11px] font-bold tracking-[0.3em] text-amber-400 uppercase mb-4">
                  Let's Talk
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
                  Ready to Optimize Your{' '}
                  <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                    Real Estate Portfolio?
                  </span>
                </h2>
                <p className="text-slate-300 max-w-xl mx-auto mb-10">
                  Whether you're a multinational scouting a headquarters or an investor hunting yield, ESTATE LION brings the advisory, rigour, and network to get it right.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link 
                    href="/contact" 
                    className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 hover:-translate-y-1"
                  >
                    Talk to an Expert
                  </Link>
                  <Link 
                    href="/properties" 
                    className="px-8 py-4 border-2 border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                  >
                    Explore Properties
                  </Link>
                  <button className="px-8 py-4 bg-green-600/20 border border-green-500/30 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-green-600/30 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
                    <FaCommentDots className="w-4 h-4" />
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ===== FOOTER ===== */}
          <Footer />

        </div>
      </div>
    </>
  );
}