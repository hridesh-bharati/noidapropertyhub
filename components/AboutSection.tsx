"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%", 
        toggleActions: "play none none none"
      }
    });

    // 1. इमेज का क्लासी स्लाइड + स्केल रिवील
    tl.fromTo(q(".animate-img-wrapper"),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    tl.fromTo(q(".animate-img"),
      { scale: 1.15 },
      { scale: 1, duration: 1.4, ease: "power2.out" },
      "-=1.0"
    );

    // 2. टेक्स्ट का क्लीन और प्रीमियम स्टैगर फेड-अप
    tl.fromTo(q(".animate-text"),
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" },
      "-=0.9"
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-gradient-to-br from-cyan-50/60 via-white to-emerald-50/50 py-20 sm:py-28 overflow-hidden text-slate-800 relative">
      
      {/* टॉप राइट और बॉटम लेफ्ट सॉफ्ट कलर्ड ग्लो सर्कल्स (सर्च बार की तरह सिंक) */}
      <div className="absolute -top-32 -right-32 w-[450px] h-[450px] rounded-full bg-cyan-200/30 blur-3xl pointer-events-none -z-0" />
      <div className="absolute -bottom-32 -left-32 w-[450px] h-[450px] rounded-full bg-emerald-200/30 blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Sharp Modern Image Block */}
          <div className="w-full relative">
            {/* क्लीन और मॉडर्न डबल-लेयर फाइन बॉर्डर इफ़ेक्ट */}
            <div className="absolute -inset-3 border border-slate-200/60 rounded-2xl -z-10 pointer-events-none" />
            <div className="absolute inset-0 border border-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] -z-10 pointer-events-none" />
            
            <div className="animate-img-wrapper w-full h-[360px] sm:h-[480px] rounded-xl overflow-hidden shadow-xl relative bg-slate-100">
              <img 
                className="animate-img w-full h-full object-cover transition-transform duration-700 ease-out" 
                src="/img/about.jpg" 
                alt="Premium Noida Hub Real Estate Properties"
              />
              {/* इमेज पर हल्का और सॉफ्ट ओवरले */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
          
          {/* Right Column: Sharp Clean Typography */}
          <div className="w-full flex flex-col justify-center">
            
            <span className="animate-text text-[11px] font-bold tracking-[0.25em] text-pink-600 uppercase mb-3.5 block font-sans">
              About Our Premium Hub
            </span>

            <h2 className="animate-text text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight leading-tight mb-6 font-sans">
              #1 Place To Find The <br />
              <span className="font-serif italic text-pink-600 font-normal">Perfect Property</span>
            </h2>
            
            <p className="animate-text text-sm text-slate-500 font-medium leading-relaxed mb-8 max-w-xl font-sans">
              NoidaHub bridges the gap between luxury workspace design and strategic corporate placement. 
              We curate office blocks and residential nodes inside India's most active economic corridors.
            </p>
            
            {/* मिनिमल लिस्ट आइटम्स विथ कोर बूटस्ट्रैप आइकन्स */}
            <div className="space-y-4 mb-10">
              {[
                "Verified corporate structures and premium nodes",
                "Direct leasing contracts with zero hidden overheads",
                "Fully curated workspaces tailored for scalable growth"
              ].map((text, index) => (
                <div key={index} className="animate-text flex items-start gap-3">
                  {/* कोर बूटस्ट्रैप चेक आइकन */}
                  <i className="bi bi-check2-circle text-emerald-500 text-lg leading-none shrink-0 mt-0.5"></i>
                  <p className="text-sm font-semibold text-slate-600 font-sans">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* प्रीमियम स्लीक कैप्सूल बटन */}
            <div className="animate-text">
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center text-xs font-bold tracking-wider text-white bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 h-12 px-8 rounded-xl shadow-[0_4px_14px_rgba(219,39,119,0.2)] hover:brightness-105 hover:-translate-y-0.5 transition-all duration-200 uppercase"
              >
                Read Our Story
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}