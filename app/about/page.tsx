"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

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
  FaFacebook
} from 'react-icons/fa';
import { HiHeart } from 'react-icons/hi';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPageContent() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.hero-title', 
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
      
      gsap.fromTo('.hero-subtitle', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 }
      );
      
      gsap.fromTo('.hero-buttons', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.6 }
      );
      
      gsap.fromTo('.hero-stats', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.8 }
      );

      // Stats counter animation
    // Stats counter animation
document.querySelectorAll('.stat-number').forEach((el) => {
  const stat = el as HTMLElement; // Element को HTMLElement में कास्ट करें
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
        // targets()[0] को भी HTMLElement कास्ट करें ताकि textContent रीड हो सके
        const targetEl = this.targets()[0] as HTMLElement;
        const value = Math.round(Number(targetEl.textContent || '0'));
        stat.textContent = value + suffix; // innerText की जगह textContent का उपयोग बेहतर है
      }
    }
  );
});
      // Section animations
      const sections = gsap.utils.toArray('.animate-section');
      sections.forEach((sec: any) => {
        gsap.fromTo(sec.querySelectorAll('.anim-el'),
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Card hover animations
      document.querySelectorAll('.property-card, .project-card').forEach((card) => {
        card.addEventListener('mouseenter', function(e) {
          const target = e.currentTarget as HTMLElement;
          gsap.to(target.querySelector('.card-image'), {
            scale: 1.05,
            duration: 0.5,
            ease: "power2.out"
          });
        });
        
        card.addEventListener('mouseleave', function(e) {
          const target = e.currentTarget as HTMLElement;
          gsap.to(target.querySelector('.card-image'), {
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        });
      });

    }, pageRef);

    return () => ctx.revert();
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
      image: "/api/placeholder/600/400",
      badge: "Featured",
      badgeColor: "from-yellow-500 to-amber-500"
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
      image: "/api/placeholder/600/400",
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
      image: "/api/placeholder/600/400",
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
      image: "/api/placeholder/600/400",
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
      image: "/api/placeholder/600/400",
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
      image: "/api/placeholder/600/400",
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
      image: "/api/placeholder/600/400",
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
      image: "/api/placeholder/60/60"
    },
    {
      id: 2,
      name: "Priya Sharma",
      company: "Director, Global Corp",
      text: "The team at ESTATE LION helped us find the perfect commercial space in Noida. Their end-to-end execution made the entire process seamless.",
      rating: 5,
      image: "/api/placeholder/60/60"
    },
    {
      id: 3,
      name: "Amit Patel",
      company: "MD, Alpha Group",
      text: "We've worked with many advisors, but ESTATE LION stands out for their transparency, depth of market knowledge, and genuine commitment.",
      rating: 5,
      image: "/api/placeholder/60/60"
    }
  ];

  // Builders data
  const builders = [
    { id: 1, name: "DLF", logo: "/api/placeholder/120/60" },
    { id: 2, name: "Godrej", logo: "/api/placeholder/120/60" },
    { id: 3, name: "Prestige", logo: "/api/placeholder/120/60" },
    { id: 4, name: "Sobha", logo: "/api/placeholder/120/60" },
    { id: 5, name: "Tata Housing", logo: "/api/placeholder/120/60" },
    { id: 6, name: "Brigade", logo: "/api/placeholder/120/60" }
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
        <div ref={pageRef} className="w-full bg-[#F8FAFC] relative overflow-hidden">
      
      {/* ─── Premium Background Elements ─── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a03_1px,transparent_1px),linear-gradient(to_bottom,#0f172a03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
      
      {/* Subtle gradient orbs */}
      <div className="absolute top-[5%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] right-[-15%] w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[550px] h-[550px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">

        {/* ===== HERO SECTION ===== */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-[2.5rem] mx-4 lg:mx-8 mt-4 shadow-2xl">
          {/* Pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
          
          {/* Gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 sm:py-24 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="hero-title">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-[10px] font-extrabold tracking-[0.2em] uppercase mb-6">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                    Premium Advisory Since 2014
                  </span>
                </div>
                
                <h1 className="hero-title text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                  Precision in{' '}
                  <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent">
                    Real Estate
                  </span>
                </h1>
                
                <p className="hero-subtitle text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-xl mb-8">
                  ESTATE LION bridges the gap between complex market dynamics and informed investment decisions. We are not just advisors — we are strategic partners in asset growth.
                </p>
                
                <div className="hero-buttons flex flex-wrap gap-4">
                  <Link href="/contact" className="group px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-[#0F172A] font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-xl hover:shadow-amber-500/30 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                    Partner With Us
                    <FaChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="#properties" className="px-8 py-3.5 border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm hover:-translate-y-0.5">
                    Explore Properties
                  </Link>
                </div>

                {/* Trust Badge */}
                <div className="hero-subtitle mt-8 flex items-center gap-6">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((i) => (
                      <FaStar key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm text-slate-400">
                    4.9/5 from <span className="text-white font-bold">500+</span> Reviews
                  </span>
                </div>
              </div>
              
              <div className="hero-title relative">
                <div className="w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-amber-500/10 backdrop-blur-sm flex items-center justify-center relative group">
                  {/* Decorative element */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="text-center p-8 relative z-10">
                    <div className="text-9xl mb-6 filter drop-shadow-2xl">🏢</div>
                    <p className="text-white/90 font-medium text-xl">Premium Real Estate Advisory</p>
                    <p className="text-slate-400 text-sm mt-2 flex items-center justify-center gap-2">
                      <FaMapMarkerAlt className="w-4 h-4" />
                      Delhi • Noida • Gurugram
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><FaClock className="w-3 h-3" /> 24/7 Support</span>
                      <span className="flex items-center gap-1"><FaShieldAlt className="w-3 h-3" /> RERA Certified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats - Gold styled */}
            <div className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-10 border-t border-white/5">
              {[
                { num: "12", suffix: "+", text: "Years of Excellence" },
                { num: "5", suffix: "M+", text: "Sq. Ft. Transacted" },
                { num: "3000", suffix: "+", text: "Corporate Clients" },
                { num: "4", suffix: "", text: "High Growth Centers" }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl sm:text-4xl font-black">
                    <span className="stat-number text-amber-400" data-target={stat.num} data-suffix={stat.suffix}>0</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mt-0.5">{stat.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SEARCH SECTION ===== */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 -mt-8 relative z-20">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none appearance-none">
                  <option>Property Type</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Penthouse</option>
                  <option>Villa</option>
                </select>
              </div>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none appearance-none">
                  <option>Global Location</option>
                  <option>Delhi</option>
                  <option>Noida</option>
                  <option>Gurugram</option>
                  <option>Mumbai</option>
                </select>
              </div>
              <button className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-[#0F172A] font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-xl hover:shadow-amber-500/30 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
                <FaSearch className="w-4 h-4" />
                Search Registry
              </button>
            </div>
            
            {/* Trending chips */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trending:</span>
              {['Waterfront', 'Metropolitan', 'Historical Penthouses', 'EcoLuxury'].map((tag, i) => (
                <button key={i} className="px-3 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-xs font-medium text-slate-600 transition-all hover:border-amber-300 hover:text-amber-600">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY CHOOSE US ===== */}
        <section className="animate-section max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="anim-el inline-block text-[10px] font-bold tracking-[0.3em] text-amber-600 uppercase mb-3">Why Choose Us</span>
            <h2 className="anim-el text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
              Industry Leaders{' '}
              <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Choose ESTATE LION</span>
            </h2>
            <p className="anim-el text-sm text-slate-500 mt-4 max-w-xl mx-auto">
              We move beyond standard listings to deliver intelligence-led advisory — every recommendation is backed by market data, compliance diligence, and a long-term value lens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <FaChartLine className="w-8 h-8" />, 
                title: "Market Intelligence", 
                desc: "Access to real-time transaction data and sector trends. We advise based on where the market is going, not just where it is today.",
                gradient: "from-blue-500 to-cyan-500"
              },
              { 
                icon: <FaShieldAlt className="w-8 h-8" />, 
                title: "Risk & Compliance", 
                desc: "We handle the rigorous paperwork and legal compliance, ensuring a lean, transparent, and legally sound transaction every time.",
                gradient: "from-amber-500 to-orange-500"
              },
              { 
                icon: <FaUsers className="w-8 h-8" />, 
                title: "Relationship First", 
                desc: "Success is not a one-time deal. We build multi-year partnerships, acting as your dedicated real estate department.",
                gradient: "from-purple-500 to-pink-500"
              }
            ].map((box, i) => (
              <div key={i} className="anim-el group relative overflow-hidden bg-white border border-slate-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className={`absolute inset-0 bg-gradient-to-br ${box.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${box.gradient} bg-opacity-10 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    {box.icon}
                  </div>
                  <h4 className="text-lg font-bold text-[#0F172A] tracking-tight mb-3">{box.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">{box.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== PROPERTY CATEGORIES ===== */}
        <section className="animate-section bg-white py-24 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="anim-el inline-block text-[10px] font-bold tracking-[0.3em] text-amber-600 uppercase mb-3">Property Categories</span>
              <h2 className="anim-el text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
                Explore Our{' '}
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Premium Portfolio</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "🏢", label: "Commercial", count: "240+ Properties" },
                { icon: "🏠", label: "Residential", count: "180+ Properties" },
                { icon: "🏗️", label: "Under Construction", count: "65+ Properties" },
                { icon: "🌳", label: "Luxury Villas", count: "90+ Properties" }
              ].map((cat, i) => (
                <div key={i} className="anim-el group relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-slate-200/50 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 transition-all duration-500" />
                  <div className="relative">
                    <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
                    <h4 className="font-bold text-[#0F172A] text-sm">{cat.label}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{cat.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== POPULAR LOCATIONS ===== */}
        <section className="animate-section py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="anim-el inline-block text-[10px] font-bold tracking-[0.3em] text-amber-600 uppercase mb-3">Prime Locations</span>
              <h2 className="anim-el text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
                Discover Top{' '}
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Office Hubs</span>
              </h2>
              <p className="anim-el text-sm text-slate-500 mt-4 max-w-xl mx-auto">
                Premium office spaces across Delhi NCR's most active business corridors — curated for discerning occupiers seeking excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "DLF Cyber City", location: "Gurugram", price: "₹180/sq.ft", type: "Commercial" },
                { name: "Connaught Place", location: "Delhi", price: "₹250/sq.ft", type: "Retail" },
                { name: "Sector 62", location: "Noida", price: "₹120/sq.ft", type: "Commercial" }
              ].map((loc, i) => (
                <div key={i} className="anim-el group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60" />
                    <div className="text-6xl filter grayscale group-hover:grayscale-0 transition-all duration-500">🏙️</div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">{loc.type}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-[#0F172A] text-lg mb-0.5">{loc.name}</h4>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <FaMapMarkerAlt className="w-4 h-4" /> {loc.location}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-bold text-amber-600">{loc.price}</span>
                      <button className="text-xs font-bold text-[#0F172A] hover:text-amber-600 transition-colors flex items-center gap-1">
                        View Details <FaChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/locations" className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors">
                VIEW ALL LOCATIONS
                <FaChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ===== PROPERTY CARDS ===== */}
        <section id="properties" className="animate-section bg-white py-24 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="anim-el inline-block text-[10px] font-bold tracking-[0.3em] text-amber-600 uppercase mb-3">Featured Properties</span>
              <h2 className="anim-el text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
                Premium{' '}
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Properties</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {properties.map((property, idx) => (
                <div key={property.id} className="anim-el property-card group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-52 overflow-hidden bg-slate-200">
                    <div className={`card-image w-full h-full bg-gradient-to-br ${property.badgeColor} bg-opacity-20 flex items-center justify-center text-6xl transition-transform duration-500`}>
                      {property.type === 'Commercial' ? '🏢' : property.type === 'Penthouse' ? '🏙️' : property.type === 'Villa' ? '🏠' : '🏢'}
                    </div>
                    {property.badge && (
                      <span className={`absolute top-3 left-3 px-3 py-1 bg-gradient-to-r ${property.badgeColor} text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg`}>
                        {property.badge}
                      </span>
                    )}
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                      <HiHeart className="w-4 h-4 text-slate-600 hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                  
                  <div className="p-5">
                    <div className="text-sm font-bold text-amber-600 mb-0.5">{property.type}</div>
                    <h4 className="font-bold text-[#0F172A] text-base leading-tight mb-0.5">{property.title}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                      <FaMapMarkerAlt className="w-3 h-3" /> {property.location}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1"><FaHome className="w-3 h-3" /> {property.beds} Beds</span>
                      <span className="flex items-center gap-1"><FaBuilding className="w-3 h-3" /> {property.baths} Baths</span>
                      <span>{property.area}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-lg font-bold text-[#0F172A]">{property.price}</span>
                      <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-[#0F172A] font-bold text-[10px] uppercase tracking-wider rounded-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all hover:-translate-y-0.5">
                        Enquire Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FLOOR PLANS ===== */}
        <section className="animate-section py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="anim-el inline-block text-[10px] font-bold tracking-[0.3em] text-amber-600 uppercase mb-3">Architectural Innovation</span>
              <h2 className="anim-el text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
                Exclusive{' '}
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Floor Plans</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "1 BHK Design Comfort", beds: 2, baths: 2, features: "Large Living, Open Concept", price: "₹45 Lakhs" },
                { name: "2 BHK Luxury Suite", beds: 2, baths: 2, features: "Living Incl., Modular Unit", price: "₹65 Lakhs" },
                { name: "3 BHK Elegant Villa", beds: 3, baths: 3, features: "Grand Hall, Pantry Added", price: "₹95 Lakhs" },
                { name: "Studio Apartment Smart", beds: 0, baths: 1, features: "Integrated, Compact kit", price: "₹30 Lakhs" }
              ].map((plan, i) => (
                <div key={i} className="anim-el group bg-white rounded-2xl p-6 border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{['🏠', '🏢', '🏘️', '🏙️'][i]}</div>
                  <h4 className="font-bold text-[#0F172A] text-lg mb-2">{plan.name}</h4>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1"><FaHome className="w-3 h-3" /> {plan.beds} Beds</span>
                    <span className="flex items-center gap-1"><FaBuilding className="w-3 h-3" /> {plan.baths} Baths</span>
                  </div>
                  <p className="text-sm text-slate-600 font-medium mb-3">{plan.features}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-sm font-bold text-amber-600">{plan.price}</span>
                    <button className="text-[10px] font-bold text-[#0F172A] hover:text-amber-600 transition-colors flex items-center gap-1">
                      VIEW SPEC <FaChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== LUXURY VILLAS ===== */}
        <section className="animate-section bg-white py-24 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="anim-el inline-block text-[10px] font-bold tracking-[0.3em] text-amber-600 uppercase mb-3">Luxury Living</span>
              <h2 className="anim-el text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
                Premium{' '}
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Villas & Estates</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: "The Royal Palms", location: "Golf Course Extension, Gurugram", price: "₹12.5 Cr", area: "8,500 sq.ft", features: "Private Pool, Home Theater, 6 BHK" },
                { name: "Lakeside Estate", location: "Sector 150, Noida", price: "₹8.2 Cr", area: "6,200 sq.ft", features: "Waterfront, Private Garden, 4 BHK" }
              ].map((villa, i) => (
                <div key={i} className="anim-el group relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200/50">
                  <div className="h-64 bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center text-8xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-70" />
                    <div className="relative z-10">🏰</div>
                    <div className="absolute bottom-4 left-6 right-6">
                      <span className="text-white font-bold text-xl">{villa.name}</span>
                      <p className="text-white/80 text-sm flex items-center gap-1"><FaMapMarkerAlt className="w-4 h-4" /> {villa.location}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-2xl font-bold text-[#0F172A]">{villa.price}</span>
                        <span className="text-sm text-slate-400 ml-2">{villa.area}</span>
                      </div>
                      <span className="text-xs font-bold text-amber-600">{villa.features}</span>
                    </div>
                    <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-[#0F172A] font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-xl hover:shadow-amber-500/30 transition-all hover:-translate-y-0.5">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== COMMERCIAL OFFICE ===== */}
        <section className="animate-section py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="anim-el inline-block text-[10px] font-bold tracking-[0.3em] text-amber-600 uppercase mb-3">Commercial</span>
              <h2 className="anim-el text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
                Premium{' '}
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Office Spaces</span>
              </h2>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-8 lg:p-12 shadow-2xl">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
              
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-4">
                    Institutional Grade
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    Corporate Headquarters & <br />
                    <span className="text-amber-400">Premium Office Suites</span>
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    From site selection to fit-out advisory and lease management, we streamline the entire lifecycle of your corporate real estate needs across Delhi NCR.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-[#0F172A] font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-xl hover:shadow-amber-500/30 transition-all hover:-translate-y-0.5">
                      View Office Spaces
                    </button>
                    <button className="px-6 py-2.5 border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm">
                      Schedule Visit
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {['300+', '50K+', '4.9', '24/7'].map((stat, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                      <div className="text-2xl font-bold text-amber-400">{stat}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                        {['Properties Available', 'Sq. Ft. Portfolio', 'Client Rating', 'Support'][i]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== AMENITIES ===== */}
        <section className="animate-section bg-white py-24 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="anim-el inline-block text-[10px] font-bold tracking-[0.3em] text-amber-600 uppercase mb-3">Amenities</span>
              <h2 className="anim-el text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
                World-Class{' '}
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Facilities</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: "🏊", name: "Swimming Pool", desc: "Temperature controlled infinity pool" },
                { icon: "💪", name: "Gymnasium", desc: "State-of-the-art fitness center" },
                { icon: "🌳", name: "Landscaped Gardens", desc: "Lush green walking trails" },
                { icon: "🅿️", name: "Parking", desc: "Ample visitor & resident parking" },
                { icon: "🔒", name: "Security", desc: "24/7 surveillance & patrol" },
                { icon: "🏸", name: "Sports Courts", desc: "Tennis, squash & badminton" },
                { icon: "🧘", name: "Yoga Studio", desc: "Dedicated wellness space" },
                { icon: "🎉", name: "Clubhouse", desc: "Community hall & lounge" }
              ].map((amenity, i) => (
                <div key={i} className="anim-el group p-6 bg-slate-50 rounded-2xl text-center hover:bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-slate-200/50 cursor-pointer">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{amenity.icon}</div>
                  <h4 className="font-bold text-[#0F172A] text-sm">{amenity.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{amenity.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TRUSTED BUILDERS ===== */}
        <section className="animate-section py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="anim-el inline-block text-[10px] font-bold tracking-[0.3em] text-amber-600 uppercase mb-3">Our Network</span>
              <h2 className="anim-el text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
                Trusted{' '}
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Corporate Partners</span>
              </h2>
              <p className="anim-el text-sm text-slate-500 mt-4">
                Trusted by organizations that value precision and discretion
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {builders.map((builder) => (
                <div key={builder.id} className="anim-el group bg-white rounded-2xl p-6 flex items-center justify-center border border-slate-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 grayscale hover:grayscale-0">
                  <div className="w-full h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center text-xs font-bold text-slate-400">
                    {builder.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== LATEST PROJECTS ===== */}
        <section className="animate-section bg-white py-24 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="anim-el inline-block text-[10px] font-bold tracking-[0.3em] text-amber-600 uppercase mb-3">Projects</span>
              <h2 className="anim-el text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
                Latest{' '}
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Projects</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="anim-el project-card group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-6xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-70" />
                    <div className="relative z-10">🏗️</div>
                    <div className="absolute top-3 right-3 px-3 py-1 bg-amber-500 text-[#0F172A] text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                      {project.status}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-sm font-bold">{project.name}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-slate-500 font-medium">{project.developer}</p>
                    <p className="text-sm text-slate-600 flex items-center gap-1 mt-0.5"><FaMapMarkerAlt className="w-3 h-3" /> {project.location}</p>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-slate-500">{project.type}</span>
                      <span className="text-slate-400">{project.units} Units</span>
                      <span className="text-slate-400">Completion: {project.completion}</span>
                    </div>
                    <button className="w-full mt-4 py-2 bg-[#0F172A] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-500 hover:text-[#0F172A] transition-all">
                      View Project
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section className="animate-section py-24 bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="anim-el inline-block text-[10px] font-bold tracking-[0.3em] text-amber-400 uppercase mb-3">Testimonials</span>
              <h2 className="anim-el text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                What Our{' '}
                <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">Clients Say</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="anim-el bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{testimonial.name}</h4>
                      <p className="text-xs text-slate-400">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== GOOGLE REVIEWS ===== */}
        <section className="animate-section py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 lg:p-12 border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
                <div className="text-center md:text-left">
                  <div className="text-6xl mb-2">⭐</div>
                  <div className="text-3xl font-bold text-[#0F172A]">4.9/5</div>
                  <p className="text-sm text-slate-500">Based on 500+ Reviews</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">Why Our Clients Love Us</h3>
                  <p className="text-sm text-slate-500">Exceptional service, transparent deals, and unmatched market expertise across Delhi NCR.</p>
                </div>
                <div className="text-center md:text-right">
                  <button className="px-6 py-3 bg-[#0F172A] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-500 hover:text-[#0F172A] transition-all hover:shadow-xl hover:-translate-y-0.5">
                    Read All Reviews
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== STATISTICS ===== */}
        <section className="animate-section py-24 bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { num: "500", suffix: "+", label: "Properties Sold", icon: "🏠" },
                { num: "150", suffix: "+", label: "Trusted Builders", icon: "🏗️" },
                { num: "1000", suffix: "+", label: "Happy Customers", icon: "👤" },
                { num: "98", suffix: "%", label: "Client Retention", icon: "📈" }
              ].map((stat, i) => (
                <div key={i} className="anim-el text-center">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl sm:text-4xl font-bold text-amber-400">
                    <span className="stat-number" data-target={stat.num} data-suffix={stat.suffix}>0</span>
                  </div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="animate-section py-24 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="anim-el inline-block text-[10px] font-bold tracking-[0.3em] text-amber-600 uppercase mb-3">FAQ</span>
              <h2 className="anim-el text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
                Frequently Asked{' '}
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Questions</span>
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="anim-el bg-slate-50 rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300">
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer">
                      <h4 className="font-bold text-[#0F172A] text-sm">{faq.q}</h4>
                      <FaChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BLOG / NEWS ===== */}
        <section className="animate-section py-24 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="anim-el inline-block text-[10px] font-bold tracking-[0.3em] text-amber-600 uppercase mb-3">Insights</span>
              <h2 className="anim-el text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
                Latest{' '}
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">News & Insights</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Noida Property Market: 2026 Growth Projections", date: "June 25, 2026", category: "Market Update" },
                { title: "Ultra-Luxury Living: Trends in Delhi NCR", date: "June 20, 2026", category: "Luxury" },
                { title: "Commercial Real Estate: Investment Guide 2026", date: "June 15, 2026", category: "Investment" }
              ].map((post, i) => (
                <div key={i} className="anim-el group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-6xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60" />
                    <div className="relative z-10">📰</div>
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">{post.category}</span>
                    <h4 className="font-bold text-[#0F172A] text-base mt-1 leading-tight">{post.title}</h4>
                    <p className="text-xs text-slate-400 mt-2">{post.date}</p>
                    <button className="mt-3 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1">
                      Read More <FaChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== DOWNLOAD BROCHURE ===== */}
        <section className="animate-section py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 p-8 lg:p-12 shadow-2xl">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2Mi1IMjR2LTJoMTJ6TTM2IDI0djJIMjR2LTJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
              
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-2">Download Our Brochure</h3>
                  <p className="text-[#0F172A]/80 text-sm">Get comprehensive details about our premium properties and services.</p>
                </div>
                <div className="flex flex-wrap gap-4 justify-center md:justify-end">
                  <button className="px-6 py-3 bg-[#0F172A] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-xl transition-all hover:-translate-y-0.5 flex items-center gap-2">
                    <FaDownload className="w-4 h-4" />
                    Download Now
                  </button>
                  <button className="px-6 py-3 bg-white text-[#0F172A] font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-xl transition-all hover:-translate-y-0.5 flex items-center gap-2">
                    <FaPlay className="w-4 h-4" />
                    Virtual Tour
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="animate-section max-w-5xl mx-auto px-6 lg:px-8 py-12">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-10 sm:p-16 text-center shadow-2xl border border-white/5">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            
            {/* Gold accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            
            <div className="relative">
              <span className="anim-el inline-block text-[10px] font-bold tracking-[0.3em] text-amber-400 uppercase mb-4">Let's Talk</span>
              <h2 className="anim-el text-3xl sm:text-5xl font-bold text-white tracking-tight mb-6">
                Ready to Optimize Your{' '}
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                  Real Estate Portfolio?
                </span>
              </h2>
              <p className="anim-el text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto leading-relaxed mb-8">
                Whether you're a multinational scouting a headquarters or an investor hunting yield, ESTATE LION brings the advisory, rigour, and network to get it right.
              </p>
              <div className="anim-el flex flex-wrap justify-center gap-4">
                <Link 
                  href="/contact" 
                  className="inline-block text-xs font-black tracking-widest text-[#0F172A] bg-gradient-to-r from-amber-500 to-amber-600 px-10 py-4 rounded-xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 uppercase hover:-translate-y-0.5"
                >
                  Talk to an Expert
                </Link>
                <Link 
                  href="/properties" 
                  className="inline-block text-xs font-black tracking-widest text-white border-2 border-white/30 px-10 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 uppercase backdrop-blur-sm hover:-translate-y-0.5"
                >
                  Explore Properties
                </Link>
                <button className="inline-block text-xs font-black tracking-widest text-white bg-green-600/20 border border-green-500/30 px-10 py-4 rounded-xl hover:bg-green-600/30 transition-all duration-300 uppercase hover:-translate-y-0.5 flex items-center gap-2">
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