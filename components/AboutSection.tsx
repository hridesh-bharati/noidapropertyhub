"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link'
export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (!containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%", 
        toggleActions: "play none none none"
      }
    });

    // 1. प्रीमियम इमेज मास्क और स्केल इफ़ेक्ट (Left Column)
    tl.fromTo(q(".animate-img-wrapper"), 
      { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", opacity: 0 },
      { clipPath: "polygon(0 0, 100 0, 100% 100%, 0% 100%)", opacity: 1, duration: 1, ease: "power4.inOut" }
    );

    tl.from(q(".animate-img"), {
      scale: 1.15,
      duration: 1.2,
      ease: "power2.out"
    }, "-=0.8");

    // 2. टेक्स्ट एलिमेंट्स का प्रीमियम फेड-अप और स्टैगर इफ़ेक्ट (Right Column)
    tl.from(q(".animate-text"), {
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.08, 
      ease: "power3.out"
    }, "-=0.6");

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-white py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Premium Image Setup with Floating Accent Frame */}
          <div className="w-full relative px-4 sm:px-6">
            {/* इमेज के पीछे का डिज़ाइनर बैकग्राउंड ब्लॉक */}
            <div className="absolute -top-6 -left-2 sm:-left-6 w-48 h-48 bg-primary/10 rounded-3xl -z-10" />
            <div className="absolute -bottom-6 -right-2 sm:-right-6 w-64 h-64 bg-slate-50 border border-slate-100 rounded-3xl -z-10 shadow-sm" />
            
            <div className="animate-img-wrapper w-full h-[320px] sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 relative bg-slate-100">
              
                <img 
                className=" w-full h-full object-cover" 
                src="/img/about.jpg" 
                alt="Premium Noida Hub Real Estate Properties"
              />
           
              {/* इमेज पर हल्का सा डार्क प्रीमियम टोन */}
              <div className="absolute inset-0 bg-slate-950/5 pointer-events-none" />
            </div>
          </div>
          
          {/* Right Column: Premium Typography and Features */}
          <div className="w-full text-left flex flex-col justify-center">
            
            <span className="animate-text text-[10px] sm:text-xs font-black tracking-[0.2em] text-primary uppercase mb-2 block">
              About Our Premium Hub
            </span>

            <h2 className="animate-text text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none mb-5">
              #1 Place To Find The <br className="hidden sm:inline" />Perfect Property
            </h2>
            
            <p className="animate-text text-xs sm:text-sm text-slate-400 font-medium leading-relaxed tracking-wide mb-6">
              NoidaHub bridges the gap between luxury workspace design and strategic corporate placement. 
              We curate office blocks and residential nodes inside India&apos;s most active economic corridors, 
              ensuring your footprint aligns perfectly with future-ready growth.
            </p>
            
            {/* प्रीमियम लिस्ट आइटम्स (सुंदर चेकमार्क आइकॉन के साथ) */}
            <div className="space-y-3.5 mb-8">
              {[
                "Verified corporate structures and premium nodes",
                "Direct leasing contracts with zero hidden overheads",
                "Fully curated workspaces tailored for scalable growth"
              ].map((text, index) => (
                <div key={index} className="animate-text flex items-center gap-3">
                  <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-700 tracking-wide">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* प्रीमियम मैग्नेटिक बटन इफ़ेक्ट */}
            <div className="animate-text">
              <Link 
                href="/about" 
                className="inline-block text-xs font-bold text-white bg-slate-950 px-6 py-3.5 rounded-full hover:bg-slate-900 transition-all shadow-lg hover:shadow-xl tracking-widest uppercase"
              >
                Read More Story
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
 