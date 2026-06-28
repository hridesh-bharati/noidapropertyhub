"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SearchBar() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<(HTMLInputElement | HTMLSelectElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (
        !sectionRef.current || 
        !containerRef.current || 
        !cardRef.current || 
        !buttonRef.current || 
        !tagsRef.current || 
        !statsRef.current
      ) return;

      const entranceTl = gsap.timeline();

      if (titleRef.current) {
        entranceTl.fromTo(titleRef.current, 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      }

      if (subtitleRef.current) {
        entranceTl.fromTo(subtitleRef.current, 
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 
          "-=0.3"
        );
      }

      entranceTl.fromTo(cardRef.current, 
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      );

      const validInputs = inputRefs.current.filter(Boolean);
      const interactiveElements = [...validInputs, buttonRef.current];
      
      entranceTl.fromTo(interactiveElements, 
        { opacity: 0, y: 15, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.4, ease: "power2.out" },
        "-=0.3"
      );

      const tagElements = Array.from(tagsRef.current.children);
      entranceTl.fromTo(tagElements, 
        { opacity: 0, scale: 0.9, x: -5 },
        { opacity: 1, scale: 1, x: 0, stagger: 0.03, duration: 0.3, ease: "power2.out" },
        "-=0.2"
      );

      const statItems = Array.from(statsRef.current.children);
      gsap.fromTo(statItems, 
        { opacity: 0, y: 25 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.08, 
          duration: 0.6, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // INTERACTIVE HOVER EFFECTS (Updated Colors to Match Premium Palette)
      validInputs.forEach((input) => {
        if (!input) return;
        
        input.addEventListener('focus', () => {
          gsap.to(input, {
            borderColor: '#E65C1E', // फोकस करने पर आपके ब्रांड का ओरेंज कलर
            boxShadow: '0 0 0 4px rgba(230, 92, 30, 0.2)',
            backgroundColor: '#ffffff',
            y: -1,
            duration: 0.2
          });
        });

        input.addEventListener('blur', () => {
          gsap.to(input, {
            borderColor: 'rgba(226, 232, 240, 0.8)',
            boxShadow: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            y: 0,
            duration: 0.2
          });
        });

        input.addEventListener('mouseenter', () => {
          if (document.activeElement === input) return;
          gsap.to(input, {
            borderColor: 'rgba(230, 92, 30, 0.4)',
            backgroundColor: '#ffffff',
            duration: 0.15
          });
        });

        input.addEventListener('mouseleave', () => {
          if (document.activeElement === input) return;
          gsap.to(input, {
            borderColor: 'rgba(226, 232, 240, 0.8)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            duration: 0.15
          });
        });
      });

      const currentButton = buttonRef.current;
      currentButton.addEventListener('mouseenter', () => {
        gsap.to(currentButton, {
          backgroundColor: '#cc4e14', // डीप ओरेंज होवर इफ़ेक्ट
          y: -1,
          boxShadow: '0 6px 20px rgba(230, 92, 30, 0.4)',
          duration: 0.2
        });
      });

      currentButton.addEventListener('mouseleave', () => {
        gsap.to(currentButton, {
          backgroundColor: '#E65C1E',
          y: 0,
          boxShadow: '0 4px 14px rgba(230, 92, 30, 0.25)',
          duration: 0.2
        });
      });

      currentButton.addEventListener('mousedown', () => {
        gsap.to(currentButton, { scale: 0.97, duration: 0.1 });
      });

      currentButton.addEventListener('mouseup', () => {
        gsap.to(currentButton, { scale: 1, duration: 0.1 });
      });

      tagElements.forEach((tag) => {
        tag.addEventListener('mouseenter', () => {
          gsap.to(tag, {
            backgroundColor: 'rgba(230, 92, 30, 0.1)',
            borderColor: 'rgba(230, 92, 30, 0.4)',
            color: '#E65C1E',
            y: -1,
            duration: 0.2
          });
        });
        tag.addEventListener('mouseleave', () => {
          gsap.to(tag, {
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            borderColor: 'rgba(226, 232, 240, 0.8)',
            color: '#475569',
            y: 0,
            duration: 0.2
          });
        });
      });

      statItems.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -5,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderColor: 'rgba(230, 92, 30, 0.3)',
            boxShadow: '0 12px 24px -10px rgba(15, 23, 42, 0.1)',
            duration: 0.25
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderColor: 'rgba(255, 255, 255, 0.6)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
            duration: 0.25
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="py-24 px-4 min-h-[650px] flex items-center relative overflow-hidden"
      style={{ 
        // सुधरा हुआ बैकग्राउंड: सुपर वाइब्रेंट, कलरफुल और मॉडर्न ग्रेडिएंट
        backgroundImage: 'linear-gradient(135deg, #fef2eb 0%, #f1f5f9 50%, #e0f2fe 100%)'
      }}
    >
      {/* बैकग्राउंड में और गहराई देने के लिए कलरफुल एब्सोल्यूट ओर्ब्स (Orbs) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div ref={containerRef} className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div ref={titleRef}>
            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest text-primary mb-4 bg-white/90 border border-primary/20 shadow-sm backdrop-blur-md">
              🌐 International Real Estate Registry
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-3">
              Find Worldwide <span className="text-primary">Properties</span>
            </h2>
          </div>
          <p ref={subtitleRef} className="text-slate-500 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-medium tracking-wide">
            Discover luxury residences and institutional-grade commercial investments globally.
          </p>
        </div>

        {/* ग्लास-मॉर्फिज्म सर्च कार्ड (हाई कॉन्ट्रास्ट और वाइब्रेंट लुक) */}
        <div ref={cardRef} className="bg-white/70 rounded-3xl shadow-2xl shadow-slate-900/5 p-6 md:p-8 border border-white/80 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Input 1 - Search */}
            <div className="md:col-span-3">
              <div className="relative">
                <input
                  ref={el => { inputRefs.current[0] = el; }}
                  type="text"
                  placeholder="City, neighborhood, or ZIP..."
                  className="w-full h-13 px-4 pr-10 rounded-xl border border-slate-200 bg-white/90 text-slate-900 placeholder-slate-400 outline-none text-xs font-semibold shadow-inner transition-all duration-150"
                />
                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Input 2 - Property Type */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  ref={el => { inputRefs.current[1] = el; }}
                  className="w-full h-13 px-4 pr-10 rounded-xl border border-slate-200 bg-white/90 text-slate-700 outline-none text-xs font-semibold shadow-inner appearance-none cursor-pointer transition-all duration-150">
                  <option value="">Property Type</option>
                  <option value="1">Luxury Apartment</option>
                  <option value="2">Exclusive Villa</option>
                  <option value="3">Penthouse Suite</option>
                  <option value="4">Commercial Assets</option>
                </select>
                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Input 3 - Location */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  ref={el => { inputRefs.current[2] = el; }}
                  className="w-full h-13 px-4 pr-10 rounded-xl border border-slate-200 bg-white/90 text-slate-700 outline-none text-xs font-semibold shadow-inner appearance-none cursor-pointer transition-all duration-150"
                >
                  <option value="">Global Location</option>
                  <option value="1">New York, USA</option>
                  <option value="2">London, UK</option>
                  <option value="3">Dubai, UAE</option>
                  <option value="4">Tokyo, Japan</option>
                </select>
                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* एनिमेटेड ब्रांड ओरेंज एक्शन बटन */}
            <div className="md:col-span-3">
              <button
                ref={buttonRef}
                className="w-full h-13 rounded-xl text-white font-bold text-xs uppercase tracking-wider bg-primary border-none shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer select-none outline-none"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Registry
              </button>
            </div>
          </div>

          {/* Tags */}
          <div ref={tagsRef} className="mt-6 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="text-slate-800 font-black mr-1 uppercase tracking-wider">Trending:</span>
            {['Waterfront', 'Metropolitan', 'Historical', 'Penthouses', 'Eco-Luxury'].map((tag) => (
              <button key={tag} className="px-3.5 py-2 rounded-xl text-slate-600 font-bold border border-slate-200/80 bg-white/60 backdrop-blur-sm cursor-pointer outline-none transition-all">
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid (कलरफुल और हाई-कॉन्ट्रास्ट लुक) */}
        <div ref={statsRef} className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { metric: "12,000+", label: "Premium Listings" },
            { metric: "$4.2B+", label: "Transaction Volume" },
            { metric: "60+", label: "Countries Connected" },
            { metric: "99.4%", label: "Vetted Asset Rate" }
          ].map((stat, i) => (
            <div key={i} className="text-center bg-white/70 p-5 rounded-2xl border border-white/60 shadow-sm backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-primary mb-0.5">{stat.metric}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}