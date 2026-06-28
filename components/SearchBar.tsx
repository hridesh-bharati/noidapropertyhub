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
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      }

      if (subtitleRef.current) {
        entranceTl.fromTo(subtitleRef.current, 
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 
          "-=0.35"
        );
      }

      entranceTl.fromTo(cardRef.current, 
        { opacity: 0, y: 20, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" },
        "-=0.25"
      );

      const validInputs = inputRefs.current.filter(Boolean);
      const interactiveElements = [...validInputs, buttonRef.current];
      
      entranceTl.fromTo(interactiveElements, 
        { opacity: 0, y: 10, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.04, duration: 0.35, ease: "power2.out" },
        "-=0.3"
      );

      const tagElements = Array.from(tagsRef.current.children);
      entranceTl.fromTo(tagElements, 
        { opacity: 0, scale: 0.95, x: -3 },
        { opacity: 1, scale: 1, x: 0, stagger: 0.02, duration: 0.25, ease: "power2.out" },
        "-=0.2"
      );

      const statItems = Array.from(statsRef.current.children);
      gsap.fromTo(statItems, 
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.06, 
          duration: 0.5, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // INTERACTIVE HOVER EFFECTS
      validInputs.forEach((input) => {
        if (!input) return;
        
        input.addEventListener('focus', () => {
          gsap.to(input, {
            borderColor: '#ec4899',
            boxShadow: '0 0 0 3px rgba(236, 72, 153, 0.12)',
            backgroundColor: '#ffffff',
            duration: 0.2
          });
        });

        input.addEventListener('blur', () => {
          gsap.to(input, {
            borderColor: 'rgba(226, 232, 240, 0.8)',
            boxShadow: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            duration: 0.2
          });
        });

        input.addEventListener('mouseenter', () => {
          if (document.activeElement === input) return;
          gsap.to(input, {
            borderColor: 'rgba(99, 102, 241, 0.3)', 
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
          brightness: 1.1,
          y: -1,
          boxShadow: '0 6px 20px rgba(236, 72, 153, 0.3)',
          duration: 0.2
        });
      });

      currentButton.addEventListener('mouseleave', () => {
        gsap.to(currentButton, {
          brightness: 1,
          y: 0,
          boxShadow: '0 4px 12px rgba(236, 72, 153, 0.15)',
          duration: 0.2
        });
      });

      currentButton.addEventListener('mousedown', () => {
        gsap.to(currentButton, { scale: 0.98, duration: 0.1 });
      });

      currentButton.addEventListener('mouseup', () => {
        gsap.to(currentButton, { scale: 1, duration: 0.1 });
      });

      tagElements.forEach((tag) => {
        tag.addEventListener('mouseenter', () => {
          gsap.to(tag, {
            backgroundColor: 'rgba(236, 72, 153, 0.06)',
            borderColor: 'rgba(236, 72, 153, 0.25)',
            color: '#db2777',
            y: -0.5,
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
            y: -3,
            backgroundColor: '#ffffff',
            borderColor: 'rgba(99, 102, 241, 0.2)', 
            boxShadow: '0 12px 25px -8px rgba(99, 102, 241, 0.1)',
            duration: 0.2
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.65)',
            borderColor: 'rgba(255, 255, 255, 0.5)',
            boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.01)',
            duration: 0.2
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="py-14 px-4 min-h-[580px] flex items-center relative overflow-hidden bg-slate-50"
    >
      {/* Dynamic Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[550px] h-[550px] bg-gradient-to-tl from-indigo-500/10 via-blue-500/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div ref={containerRef} className="max-w-5xl mx-auto w-full relative z-10">
        
        {/* Header - Tightened Gaps */}
        <div className="text-center mb-8">
          <div ref={titleRef}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-pink-500/8 to-indigo-500/8 border border-pink-500/15 rounded-full mb-3 shadow-sm backdrop-blur-md">
              <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-black tracking-widest text-pink-600 uppercase">Worldwide Assets</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-2 leading-tight">
              Find Worldwide <br className="sm:hidden" />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">
                Luxury Properties
              </span>
            </h2>
          </div>
          <p ref={subtitleRef} className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto font-medium tracking-wide leading-relaxed">
            Discover bespoke residences and high-yield institutional assets around the globe.
          </p>
        </div>

        {/* Search Card - Reduced Padding & Gaps */}
        <div ref={cardRef} className="bg-white/75 rounded-2xl shadow-[0_20px_50px_-12px_rgba(15,23,42,0.05)] p-4 md:p-5 border border-white/90 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Input 1 - Search */}
            <div className="md:col-span-3">
              <div className="relative">
                <input
                  ref={el => { inputRefs.current[0] = el; }}
                  type="text"
                  placeholder="City, neighborhood, or ZIP..."
                  className="w-full h-11 px-3.5 pr-9 rounded-lg border border-slate-200/90 bg-white/90 text-slate-900 placeholder-slate-400 outline-none text-xs font-semibold shadow-sm transition-all duration-150"
                />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Input 2 - Property Type */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  ref={el => { inputRefs.current[1] = el; }}
                  className="w-full h-11 px-3.5 pr-9 rounded-lg border border-slate-200/90 bg-white/90 text-slate-700 outline-none text-xs font-semibold shadow-sm appearance-none cursor-pointer transition-all duration-150">
                  <option value="">Property Type</option>
                  <option value="1">Luxury Apartment</option>
                  <option value="2">Exclusive Villa</option>
                  <option value="3">Penthouse Suite</option>
                  <option value="4">Commercial Assets</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Input 3 - Location */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  ref={el => { inputRefs.current[2] = el; }}
                  className="w-full h-11 px-3.5 pr-9 rounded-lg border border-slate-200/90 bg-white/90 text-slate-700 outline-none text-xs font-semibold shadow-sm appearance-none cursor-pointer transition-all duration-150"
                >
                  <option value="">Global Location</option>
                  <option value="1">New York, USA</option>
                  <option value="2">London, UK</option>
                  <option value="3">Dubai, UAE</option>
                  <option value="4">Tokyo, Japan</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Action Button */}
            <div className="md:col-span-3">
              <button
                ref={buttonRef}
                className="w-full h-11 rounded-lg text-white font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 border-none shadow-[0_4px_12px_rgba(236,72,153,0.2)] flex items-center justify-center gap-2 cursor-pointer select-none outline-none transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Registry
              </button>
            </div>
          </div>

          {/* Tags Section - Decreased Margin */}
          <div ref={tagsRef} className="mt-4 flex flex-wrap items-center gap-1.5 text-[10px]">
            <span className="text-slate-800 font-black mr-1 uppercase tracking-wider">Trending:</span>
            {['Waterfront', 'Metropolitan', 'Historical', 'Penthouses', 'Eco-Luxury'].map((tag) => (
              <button key={tag} className="px-3 py-1.5 rounded-lg text-slate-600 font-bold border border-slate-200/60 bg-white/50 backdrop-blur-sm cursor-pointer outline-none transition-all">
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid - Lowered Tops & Flattened Layout */}
        <div ref={statsRef} className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { metric: "12,000+", label: "Premium Listings", color: "from-pink-600 to-purple-600" },
            { metric: "$4.2B+", label: "Transaction Volume", color: "from-purple-600 to-indigo-600" },
            { metric: "60+", label: "Countries Connected", color: "from-indigo-600 to-blue-600" },
            { metric: "99.4%", label: "Vetted Asset Rate", color: "from-indigo-500 to-pink-600" }
          ].map((stat, i) => (
            <div key={i} className="text-center bg-white/65 p-3.5 rounded-xl border border-white/50 shadow-sm backdrop-blur-md">
              <div className={`text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-0.5`}>
                {stat.metric}
              </div>
              <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}