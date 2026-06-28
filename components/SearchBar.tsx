import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

      // 1. Instant Page Load Entrance (No scroll wait for above-the-fold elements)
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

      // Card Fade/Scale Up
      entranceTl.fromTo(cardRef.current, 
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      );

      // Inputs & Button Staggered Reveal with guaranteed final opacity 1
      const validInputs = inputRefs.current.filter(Boolean);
      const interactiveElements = [...validInputs, buttonRef.current];
      
      entranceTl.fromTo(interactiveElements, 
        { opacity: 0, y: 15, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.4, ease: "power2.out" },
        "-=0.3"
      );

      // Tags Entrance
      const tagElements = Array.from(tagsRef.current.children);
      entranceTl.fromTo(tagElements, 
        { opacity: 0, scale: 0.9, x: -5 },
        { opacity: 1, scale: 1, x: 0, stagger: 0.03, duration: 0.3, ease: "power2.out" },
        "-=0.2"
      );

      // Stats Grid Scroll Animation (Separate trigger as it's lower on page)
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


      // 2. EXACTIVE INTERACTIVE HOVER / FOCUS EFFECTS

      // Inputs Glow & Highlight
      validInputs.forEach((input) => {
        if (!input) return;
        
        input.addEventListener('focus', () => {
          gsap.to(input, {
            borderColor: '#0078d4',
            boxShadow: '0 0 0 3px rgba(0, 120, 212, 0.25)',
            backgroundColor: '#ffffff',
            y: -1,
            duration: 0.2
          });
        });

        input.addEventListener('blur', () => {
          gsap.to(input, {
            borderColor: 'rgba(0, 0, 0, 0.18)',
            boxShadow: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            y: 0,
            duration: 0.2
          });
        });

        input.addEventListener('mouseenter', () => {
          if (document.activeElement === input) return;
          gsap.to(input, {
            borderColor: 'rgba(0, 120, 212, 0.5)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            duration: 0.15
          });
        });

        input.addEventListener('mouseleave', () => {
          if (document.activeElement === input) return;
          gsap.to(input, {
            borderColor: 'rgba(0, 0, 0, 0.18)',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            duration: 0.15
          });
        });
      });

      // Search Button Interaction (Tactile Native Win11 Behavior)
      const currentButton = buttonRef.current;
      currentButton.addEventListener('mouseenter', () => {
        gsap.to(currentButton, {
          backgroundColor: '#006cc1',
          y: -1,
          boxShadow: '0 4px 12px rgba(0, 120, 212, 0.3)',
          duration: 0.2
        });
      });

      currentButton.addEventListener('mouseleave', () => {
        gsap.to(currentButton, {
          backgroundColor: '#0078d4',
          y: 0,
          boxShadow: '0 2px 6px rgba(0, 120, 212, 0.2)',
          duration: 0.2
        });
      });

      currentButton.addEventListener('mousedown', () => {
        gsap.to(currentButton, { scale: 0.97, duration: 0.1 });
      });

      currentButton.addEventListener('mouseup', () => {
        gsap.to(currentButton, { scale: 1, duration: 0.1 });
      });

      // Tags Hover Action
      tagElements.forEach((tag) => {
        tag.addEventListener('mouseenter', () => {
          gsap.to(tag, {
            backgroundColor: 'rgba(0, 120, 212, 0.12)',
            borderColor: 'rgba(0, 120, 212, 0.4)',
            color: '#0078d4',
            y: -1,
            duration: 0.2
          });
        });
        tag.addEventListener('mouseleave', () => {
          gsap.to(tag, {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderColor: 'rgba(0, 0, 0, 0.1)',
            color: '#334155',
            y: 0,
            duration: 0.2
          });
        });
      });

      // Stats Floating Highlight
      statItems.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -4,
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            borderColor: 'rgba(0, 120, 212, 0.25)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.04)',
            duration: 0.25
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.35)',
            borderColor: 'rgba(255, 255, 255, 0.4)',
            boxShadow: 'none',
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
      className="py-20 px-4 bg-no-repeat bg-cover min-h-[600px] flex items-center"
      style={{ 
        backgroundImage: 'linear-gradient(135deg, #f3f6fa 0%, #e4ecf5 40%, #d5e4f5 80%, #f3f6fa 100%)'
      }}
    >
      <div ref={containerRef} className="max-w-6xl mx-auto w-full">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div ref={titleRef}>
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-700 mb-3 bg-white/70 border border-white/60 shadow-sm backdrop-blur-md">
              🌐 International Real Estate Registry
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-2">
              Find Worldwide Properties
            </h2>
          </div>
          <p ref={subtitleRef} className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto font-normal">
            Discover luxury residences and institutional-grade commercial investments globally.
          </p>
        </div>

        {/* Windows 11 Acrylic Glassmorphism Card (Enhanced Border Contrast) */}
        <div ref={cardRef} className="bg-white/30 rounded-xl shadow-xl shadow-slate-300/30 p-6 md:p-7 border border-white/60 backdrop-blur-3xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Input 1 - Search */}
            <div className="md:col-span-3">
              <div className="relative">
                <input
                  ref={el => { inputRefs.current[0] = el; }}
                  type="text"
                  placeholder="City, neighborhood, or ZIP..."
                  className="w-full h-12 px-4 pr-10 rounded-lg border border-black/20 bg-white/85 text-slate-900 placeholder-slate-400 outline-none text-sm font-medium shadow-sm transition-all duration-150"
                />
                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Input 2 - Property Type */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  ref={el => { inputRefs.current[1] = el; }}
                  className="w-full h-12 px-4 pr-10 rounded-lg border border-black/20 bg-white/85 text-slate-800 outline-none text-sm font-medium shadow-sm appearance-none cursor-pointer transition-all duration-150">
                  <option value="">Property Type</option>
                  <option value="1">Luxury Apartment</option>
                  <option value="2">Exclusive Villa</option>
                  <option value="3">Penthouse Suite</option>
                  <option value="4">Commercial Assets</option>
                </select>
                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Input 3 - Location */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  ref={el => { inputRefs.current[2] = el; }}
                  className="w-full h-12 px-4 pr-10 rounded-lg border border-black/20 bg-white/85 text-slate-800 outline-none text-sm font-medium shadow-sm appearance-none cursor-pointer transition-all duration-150"
                >
                  <option value="">Global Location</option>
                  <option value="1">New York, USA</option>
                  <option value="2">London, UK</option>
                  <option value="3">Dubai, UAE</option>
                  <option value="4">Tokyo, Japan</option>
                </select>
                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Windows 11 Solid Accent Blue Button (100% High Visibility) */}
            <div className="md:col-span-3">
              <button
                ref={buttonRef}
                className="w-full h-12 rounded-lg text-white font-semibold text-sm tracking-wide bg-[#0078d4] border border-blue-600/30 shadow-md flex items-center justify-center gap-2 cursor-pointer select-none outline-none active:scale-[0.98]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Registry
              </button>
            </div>
          </div>

          {/* Tags */}
          <div ref={tagsRef} className="mt-5 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-700 font-bold mr-1 uppercase tracking-wider">Trending:</span>
            {['Waterfront', 'Metropolitan', 'Historical', 'Penthouses', 'Eco-Luxury'].map((tag) => (
              <button key={tag} className="px-3 py-1.5 rounded-md text-slate-700 font-semibold border border-black/10 bg-white/50 backdrop-blur-sm cursor-pointer outline-none">
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div ref={statsRef} className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { metric: "12,000+", label: "Premium Listings" },
            { metric: "$4.2B+", label: "Transaction Volume" },
            { metric: "60+", label: "Countries Connected" },
            { metric: "99.4%", label: "Vetted Asset Rate" }
          ].map((stat, i) => (
            <div key={i} className="text-center bg-white/35 p-4 rounded-xl border border-white/40 shadow-sm backdrop-blur-md">
              <div className="text-2xl font-extrabold tracking-tight text-blue-700 mb-0.5">{stat.metric}</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}