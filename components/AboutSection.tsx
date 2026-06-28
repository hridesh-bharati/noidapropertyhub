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

    // एक बार में ही स्मूथ और क्लीन फेड-इन एनीमेशन
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%", 
        toggleActions: "play none none none"
      }
    });

    // 1. इमेज का सिंपल और क्लासी स्लाइड + स्केल रिवील
    tl.fromTo(q(".animate-img-wrapper"),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

    tl.fromTo(q(".animate-img"),
      { scale: 1.2 },
      { scale: 1, duration: 1.6, ease: "power2.out" },
      "-=1.2"
    );

    // 2. टेक्स्ट का बिना किसी रोटेशन के क्लीन फेड-अप इफ़ेक्ट
    tl.fromTo(q(".animate-text"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      "-=1.0"
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-slate-950 py-20 sm:py-28 overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Sharp Modern Image Block */}
          <div className="w-full relative">
            {/* कोई फालतू बैकग्राउंड डिब्बे नहीं, सिर्फ एक क्लीन बॉर्डर लाइन */}
            <div className="absolute -inset-3 border border-slate-800 rounded-2xl -z-10 pointer-events-none" />
            
            <div className="animate-img-wrapper w-full h-[350px] sm:h-[480px] rounded-xl overflow-hidden shadow-2xl relative bg-slate-900">
              <img 
                className="animate-img w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" 
                src="/img/about.jpg" 
                alt="Premium Noida Hub Real Estate Properties"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
          
          {/* Right Column: Sharp Clean Typography */}
          <div className="w-full flex flex-col justify-center">
            
            <span className="animate-text text-[11px] font-bold tracking-[0.3em] text-amber-500 uppercase mb-3 block">
              About Our Premium Hub
            </span>

            <h2 className="animate-text text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight mb-6">
              #1 Place To Find The <br />
              <span className="font-serif italic text-amber-500 font-normal">Perfect Property</span>
            </h2>
            
            <p className="animate-text text-sm text-slate-400 font-normal leading-relaxed mb-8 max-w-xl">
              NoidaHub bridges the gap between luxury workspace design and strategic corporate placement. 
              We curate office blocks and residential nodes inside India's most active economic corridors.
            </p>
            
            {/* Minimal List Items */}
            <div className="space-y-4 mb-10">
              {[
                "Verified corporate structures and premium nodes",
                "Direct leasing contracts with zero hidden overheads",
                "Fully curated workspaces tailored for scalable growth"
              ].map((text, index) => (
                <div key={index} className="animate-text flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  </div>
                  <p className="text-sm font-medium text-slate-300">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* Premium Minimal Button */}
            <div className="animate-text">
              <Link 
                href="/about" 
                className="inline-block text-xs font-semibold tracking-widest text-slate-950 bg-white px-8 py-4 rounded-none hover:bg-amber-500 hover:text-slate-950 transition-all duration-300 uppercase"
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