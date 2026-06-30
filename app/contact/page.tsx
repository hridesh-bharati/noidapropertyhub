'use client';

import React, { useLayoutEffect, useRef } from 'react';
import {
  Building2, MapPin, Grid, ShieldAlert, Key, Calendar,
  Layers, Phone, Mail, CheckCircle2, Star, Share2, Heart,
  ChevronRight, ArrowRight, Compass, Truck, Eye, Navigation,
  Layers3,
  MoveDiagonal2,
  LayoutGrid,
  Car,
  Train,
  Plane,
  Trees,
  CarFront,
  Waves,
  Trash2,
  Zap,
  ShieldCheck,
  PhoneCall,
  MessageCircle,
} from 'lucide-react';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EstateLionExactPropertyPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- Header Animation ---
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          }
        });
      }

      // --- Gallery Animation ---
      if (galleryRef.current) {
        gsap.from(galleryRef.current, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        });
      }

      // --- Description Animation ---
      if (descRef.current) {
        gsap.from(descRef.current, {
          x: -30,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        });
      }

      // --- Specifications Animation (Stagger) ---
      if (specsRef.current) {
        const specItems = specsRef.current.querySelectorAll('.spec-item');
        gsap.from(specItems, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: specsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          }
        });
      }

      // --- Amenities Animation (Stagger) ---
      if (amenitiesRef.current) {
        const amenityItems = amenitiesRef.current.querySelectorAll('.amenity-item');
        gsap.from(amenityItems, {
          scale: 0.8,
          opacity: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: amenitiesRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        });
      }

      // --- CTA Animation ---
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          }
        });
      }

      // --- Map Animation ---
      if (mapRef.current) {
        gsap.from(mapRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        });
      }

      // --- Sidebar Animation ---
      if (sidebarRef.current) {
        gsap.from(sidebarRef.current, {
          x: 60,
          opacity: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sidebarRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        });
      }

      // --- Parallax effect on main container ---
      if (mainRef.current) {
        gsap.to(mainRef.current, {
          backgroundPosition: '50% 30%',
          ease: "none",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });
      }

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <div ref={mainRef} className="min-h-screen pt-9 bg-[#F5F0E8] text-[#1E1B17] font-sans antialiased selection:bg-amber-600 selection:text-white bg-[radial-gradient(ellipse_at_top_left,_#FFF5E6_0%,_#F5E6D3_100%)]">
        <main className="max-w-full mx-auto px-4 sm:px-6 py-6">

          {/* BREADCRUMBS & UTILITY LINE - Glassmorphism */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/30">
            <div className="flex items-center space-x-2 text-xs font-medium text-[#5A4A3A]">
              <a href="#" className="hover:text-[#B8860B] transition-colors">Home</a>
              <ChevronRight className="w-3 h-3" />
              <a href="#" className="hover:text-[#B8860B] transition-colors">Noida Properties</a>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#1E1B17] font-semibold bg-white/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/40 shadow-lg">Sector 67 Warehouse</span>
            </div>
            <div className="flex items-center space-x-3 text-[#5A4A3A] text-xs">
              <button className="flex items-center space-x-1 hover:text-red-600 bg-white/60 backdrop-blur-md px-3 py-2 rounded-full border border-white/40 shadow-lg hover:shadow-red-100/50 transition-all duration-300">
                <Heart className="w-3.5 h-3.5" /> <span>Save</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-600 bg-white/60 backdrop-blur-md px-3 py-2 rounded-full border border-white/40 shadow-lg hover:shadow-blue-100/50 transition-all duration-300">
                <Share2 className="w-3.5 h-3.5" /> <span>Share</span>
              </button>
            </div>
          </div>

          {/* 2-COLUMN STRUCTURE (MAIN : SIDEBAR) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* LEFT MAIN AREA */}
            <div className="lg:col-span-2 space-y-6">

              {/* PROPERTY HEADER - Glassmorphism with Dark Yellow & Red */}
              <div ref={headerRef} className="relative bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl p-6 md:p-8 overflow-hidden">
                <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-amber-500 via-red-500 to-amber-700 opacity-30" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-2xl" />

                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2">
                        <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-600 to-red-600 text-white text-xs font-semibold shadow-lg shadow-amber-500/30">
                          For Sale
                        </span>
                        <span className="px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/60 text-slate-700 text-xs font-medium shadow-sm">
                          Commercial Building
                        </span>
                      </div>

                      <h1 className="mt-5 text-2xl md:text-3xl font-bold text-[#1E1B17] leading-tight max-w-5xl bg-gradient-to-r from-[#1E1B17] to-[#B8860B] bg-clip-text text-transparent">
                        25,000 sq.ft Warehouse for Sale in Sector 67, Noida
                      </h1>

                      <div className="flex items-center mt-3">
                        <MapPin className="w-4 h-4 mr-2 text-red-600" />
                        <span className='text-[#4A3F35] font-medium'>Sector-67 Noida, Noida</span>
                      </div>

                      <div className="mt-6">
                        <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-amber-700 to-red-600 bg-clip-text text-transparent">
                          ₹65 Cr
                        </h2>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <button className="group bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 transition-all duration-300 px-8 py-4 rounded-2xl text-white font-semibold shadow-xl shadow-amber-500/30 hover:shadow-red-500/50 transform hover:-translate-y-0.5">
                        Enquire Now
                        <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: "Built-up Area", value: "25,000 sq.ft.", icon: Layers3 },
                      { label: "Typical Floor", value: "25,000 sq.ft.", icon: LayoutGrid },
                      { label: "Certification", value: "On Request", icon: ShieldCheck },
                    ].map((item, index) => (
                      <div key={index}
                        className="group p-6 rounded-2xl bg-white/50 backdrop-blur-md border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <item.icon className="w-5 h-5 text-amber-600" />
                          <p className="uppercase tracking-[2px] text-[10px] text-[#5A4A3A] font-semibold">
                            {item.label}
                          </p>
                        </div>
                        <h4 className="text-xl font-bold text-[#1E1B17]">
                          {item.value}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* IMAGE GALLERY - Modern Grid with Glassmorphism */}
              <div ref={galleryRef} className="space-y-3">
                <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden bg-gradient-to-br from-amber-200 to-amber-300 border border-white/40 shadow-2xl group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                    <Building2 className="w-16 h-16 text-[#5A4A3A]/60 mb-3" />
                    <span className="text-sm font-extrabold text-[#3A3028] bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">[ Main Image: Warehouse Front Facade ]</span>
                  </div>
                  <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-white/20">
                    1 / 4 Photos
                  </span>
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 hover:bg-white/40 transition">
                      <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {['Trimix Flooring', 'Office Area', 'Side Access Road'].map((label, i) => (
                    <div key={i}
                      className="h-24 sm:h-32 bg-gradient-to-br from-amber-100 to-amber-200 border border-white/40 rounded-2xl flex items-center justify-center p-2 text-center text-[10px] font-bold text-[#4A3F35] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    >
                      <span className="bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">[ {label} ]</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DESCRIPTION - Glassmorphism */}
              <div ref={descRef} className="relative bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl p-6 md:p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 to-red-50/30" />
                <div className="relative z-10">
                  <h3 className="text-base font-bold text-[#0F172A] flex items-center space-x-3">
                    <span className="w-1 h-6 bg-gradient-to-b from-amber-500 to-red-500 rounded-full" />
                    <span>Property Description</span>
                  </h3>
                  <div className="text-sm text-[#4A3F35] leading-relaxed space-y-3 mt-4">
                    <p className=" backdrop-blur-sm p-4 rounded-xl border border-white/30">
                      A <b className='className="text-amber-700'> standalone warehouse</b> is available for sale in <b className="text-amber-700"> Sector 67, Noida,</b> offering an excellent opportunity for investors, logistics companies, manufacturing units, e-commerce businesses, and distribution operators seeking ownership of a strategically located industrial asset. Situated in one of Noida's established industrial and commercial hubs, the property provides outstanding connectivity and operational efficiency.

                      Developed on a <b className="text-amber-700">4,000 sq.m plot,</b> the property features a <b className="text-amber-700">25,000 sq.ft ground-floor warehouse,</b> offering a large, unobstructed floor plate ideal for warehousing, storage, fulfillment operations, light manufacturing, and distribution activities. The efficient single-level layout ensures smooth movement of goods, easy loading and unloading, and flexible space utilization for a wide range of industrial operations.

                      Strategically located near the <b className="text-red-600">Noida–Greater Noida Expressway, NH-24,</b> and the <b className="text-red-600"> FNG Expressway, </b> the warehouse offers seamless connectivity to Delhi, Greater Noida, Ghaziabad, and the wider NCR region. The property is conveniently located near <b className="text-amber-700"> Sector 59  Metro Station, </b> providing excellent accessibility for employees and business visitors. It also benefits from convenient access to Indira Gandhi International Airport and Noida International Airport, supporting efficient domestic and international business operations.

                      Surrounded by established industrial developments, manufacturing facilities, and corporate offices, this standalone warehouse presents a compelling opportunity for owner-occupiers and investors seeking a high-potential industrial property in one of Noida's most prominent industrial corridors.
                    </p>
                    <p className="bg-white/40 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                      Equipped with a solid industrial layout, wide front gates handling heavy carrier configuration models seamlessly, internal storage bays, structure height profile exceeding 30 feet apex, and robust electrical wiring installations pre-aligned.
                    </p>
                  </div>
                </div>
              </div>

              {/* SPECIFICATIONS - Modern Glassmorphism Grid */}
              <div ref={specsRef} className="relative bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl p-6 md:p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 to-red-50/20" />
                <div className="relative z-10">
                  <div className="mb-8">
                    <p className="uppercase tracking-[4px] text-xs font-semibold text-[#8A7A6A]">
                      At A Glance
                    </p>
                    <h2 className="text-3xl font-bold text-[#1E1B17] mt-2 bg-gradient-to-r from-[#1E1B17] to-[#B8860B] bg-clip-text text-transparent">
                      Specifications
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[
                      { icon: Building2, title: "Usage Type", value: "Commercial Building" },
                      { icon: MapPin, title: "Location", value: "Sector-67 Noida" },
                      { icon: Navigation, title: "Address", value: "Sector-67" },
                      { icon: Layers3, title: "Floors", value: "Ground Floor" },
                      { icon: MoveDiagonal2, title: "Built-Up Area", value: "25,000 sq.ft." },
                      { icon: LayoutGrid, title: "Typical Floor Plate", value: "Approx. 25,000 sq.ft." },
                      { icon: Car, title: "Parking Ratio", value: "1:1000 sq.ft." },
                      { icon: Train, title: "Nearest Metro Stn.", value: "Sector 59 Metro" },
                      { icon: Plane, title: "Nearest Airport", value: "Noida International Airport" },
                      { icon: Trees, title: "Plot Area", value: "4,000 sq.m." },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="spec-item group bg-white/50 backdrop-blur-md border border-white/40 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <item.icon className="w-5 h-5 text-amber-600" />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <p className="text-red-600 font-medium text-xs uppercase tracking-wider">
                              {item.title}
                            </p>
                            <h4 className="text-base font-semibold text-[#1E1B17]">
                              {item.value}
                            </h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AMENITIES - Glassmorphism with Gradient */}
              <div ref={amenitiesRef} className="relative bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl p-6 md:p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 to-amber-50/20" />
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-[#1E1B17] mb-8 bg-gradient-to-r from-[#1E1B17] to-[#B8860B] bg-clip-text text-transparent">
                    Amenities
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[
                      { icon: Car, name: "Visitors Parking" },
                      { icon: Waves, name: "Water Storage" },
                      { icon: Trash2, name: "Waste Disposal" },
                      { icon: Zap, name: "Power Back-Up" },
                      { icon: ShieldCheck, name: "24x7 Security" },
                      { icon: CarFront, name: "Reserved Parking" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="amenity-item group flex items-center gap-3 p-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/30 hover:bg-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        <item.icon className="w-5 h-5 text-amber-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-[#1E1B17] font-medium text-sm">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CONTACT CTA - Gradient Glassmorphism */}
              <div ref={ctaRef} className="relative bg-gradient-to-br from-amber-500/20 via-red-500/10 to-amber-400/20 backdrop-blur-2xl border border-white/40 rounded-3xl p-6 md:p-8 mt-8 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 to-red-500/5" />
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div>
                    <h3 className="text-3xl font-bold text-[#1E1B17] bg-gradient-to-r from-[#1E1B17] to-[#8B6914] bg-clip-text text-transparent">
                      Interested in this building?
                    </h3>
                    <p className="text-[#4A3F35] mt-3 text-lg bg-white/40 backdrop-blur-sm inline-block px-4 py-2 rounded-full border border-white/30">
                      Get a callback from our leasing team within 30 minutes.
                    </p>
                  </div>
                  <button className="group bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 transition-all duration-300 text-white font-semibold px-8 py-4 rounded-2xl flex items-center gap-3 shadow-xl shadow-amber-500/30 hover:shadow-red-500/50 transform hover:-translate-y-0.5">
                    <PhoneCall className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Talk to an Expert
                  </button>
                </div>
              </div>

              {/* LOCATION MAP - Glassmorphism */}
              <div ref={mapRef} className="relative bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl p-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 to-red-50/20" />
                <div className="relative z-10">
                  <h3 className="text-base font-bold text-[#0F172A] flex items-center space-x-3 mb-4">
                    <span className="w-1 h-6 bg-gradient-to-b from-amber-500 to-red-500 rounded-full" />
                    <span>Geographic Mapping Location</span>
                  </h3>
                  <div className="w-full h-64 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl border border-white/40 relative overflow-hidden flex flex-col justify-end p-4 shadow-inner">
                    <div className="absolute inset-0 bg-[radial-gradient(#B8860B_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="bg-[#1E1B17]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-xl flex items-center space-x-1 border border-white/20">
                        <MapPin className="w-3 h-3 text-red-500" />
                        <span>Noida Sector 67 Hub</span>
                      </div>
                      <div className="w-4 h-4 bg-gradient-to-r from-amber-500 to-red-500 rounded-full border-2 border-white mt-1 animate-ping" />
                      <div className="w-4 h-4 bg-gradient-to-r from-amber-500 to-red-500 rounded-full border-2 border-white mt-[-16px] absolute" />
                    </div>
                    <div className="z-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl max-w-sm border border-white/60 shadow-xl">
                      <p className="font-bold text-[#1E1B17]">Connectivity Highlights</p>
                      <p className="text-[#4A3F35] mt-0.5 text-sm">3 km distance reach parameters from Delhi Meerut Expressway entry hub point.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CONVERSION FORM BANNER - Enhanced Glassmorphism */}
            <div ref={sidebarRef} className="lg:sticky lg:top-24 space-y-4">
              <div className="relative bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl p-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/10 to-red-50/10" />
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-red-500 to-amber-700" />

                <div className="relative z-10">
                  <div className="flex items-center space-x-3 pb-4 border-b border-white/20">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-600 to-red-600 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-amber-500/30">
                      EL
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1E1B17] text-sm">EstateLion Desk Manager</h4>
                      <p className="text-[11px] text-[#5A4A3A] mt-0.5 flex items-center">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block mr-1.5 animate-pulse" />
                        Verified Advisory Representative
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 bg-white/50 backdrop-blur-md rounded-2xl border border-white/40 shadow-lg overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center border-2 border-white shadow-lg">
                          <span className="text-2xl font-bold text-[#4A3F35]">AT</span>
                        </div>
                        <div>
                          <p className="uppercase text-[10px] tracking-[2px] text-[#8A7A6A] font-semibold">
                            Your Advisor
                          </p>
                          <h3 className="text-xl font-bold text-[#1E1B17]">
                            Ashutosh Tripathi
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-sm text-[#5A4A3A] font-medium">
                              Replies in minutes
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-white/20 grid grid-cols-2">
                      <button className="py-4 flex justify-center items-center gap-2 hover:bg-white/30 transition-all duration-300 group">
                        <MessageCircle className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-sm">WhatsApp</span>
                      </button>
                      <button className="border-l border-white/20 py-4 flex justify-center items-center gap-2 hover:bg-white/30 transition-all duration-300 group">
                        <PhoneCall className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-sm">+91 9999320114</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 bg-white/50 backdrop-blur-md rounded-2xl border border-white/40 shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/20">
                      <h3 className="text-2xl font-bold text-[#1E1B17] bg-gradient-to-r from-[#1E1B17] to-[#B8860B] bg-clip-text text-transparent">
                        Send a query
                      </h3>
                    </div>
                    <form className="p-6 space-y-4">
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full h-12 rounded-xl border border-white/30 bg-white/40 backdrop-blur-sm px-4 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all placeholder:text-[#8A7A6A]"
                      />
                      <input
                        type="email"
                        placeholder="E-mail"
                        className="w-full h-12 rounded-xl border border-white/30 bg-white/40 backdrop-blur-sm px-4 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all placeholder:text-[#8A7A6A]"
                      />
                      <div className="grid grid-cols-[90px_1fr] gap-3">
                        <select className="h-12 rounded-xl border border-white/30 bg-white/40 backdrop-blur-sm px-2 outline-none focus:border-amber-400 transition-all">
                          <option>IN +91</option>
                        </select>
                        <input
                          type="tel"
                          placeholder="Mobile Number"
                          className="h-12 rounded-xl border border-white/30 bg-white/40 backdrop-blur-sm px-4 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all placeholder:text-[#8A7A6A]"
                        />
                      </div>
                      <textarea
                        rows={5}
                        placeholder="Type your Message Here"
                        className="w-full rounded-xl border border-white/30 bg-white/40 backdrop-blur-sm px-4 py-3 outline-none resize-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all placeholder:text-[#8A7A6A]"
                      />
                      <button className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white font-semibold transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-red-500/50 transform hover:-translate-y-0.5">
                        Request Callback
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="relative bg-[#1E1B17]/90 backdrop-blur-2xl text-[#E8DDD0] rounded-2xl p-5 border border-white/10 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2A241E]/50 to-[#1E1B17]/50" />
                <div className="relative z-10">
                  <p className="font-bold text-white/90 mb-1 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Verification Guarantee
                  </p>
                  <p className="text-xs leading-relaxed text-[#B8A99A]">
                    Prices listed are subject to market clearing rates. No hidden broker payout mandates apply on premium inventory operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}