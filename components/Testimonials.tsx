"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Testimonial {
  image: string;
  name: string;
  profession: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    image: '/img/testimonial-1.jpg',
    name: 'Vikram Malhotra',
    profession: 'CEO, NexaCorp',
    text: 'NoidaHub bridges the gap between luxury workspace design and strategic corporate placement. We curated our entire office block inside their premium economic corridor with absolute zero hassle.'
  },
  {
    image: '/img/testimonial-2.jpg',
    name: 'Aanya Sharma',
    profession: 'Managing Director, Vesta Retail',
    text: 'The transparency in their direct leasing contracts is unparalleled. No hidden overheads, exceptionally curated spaces tailored precisely for high-end scalable growth.'
  },
  {
    image: '/img/testimonial-3.jpg',
    name: 'Rohit Verma',
    profession: 'Founder, AlphaTech',
    text: 'Stunning layouts and verified premium nodes. Moving our technical core to this hub immediately elevated our brand presence in India’s most active economic zone.'
  },
];

export default function Testimonials() {
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

    tl.fromTo(q(".animate-header"), 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(q(".animate-card"),
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "power4.out" },
      "-=0.5"
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="w-full bg-slate-950 py-24 sm:py-32 overflow-hidden relative text-white"
    >
      {/* वाइब्रेंट कलरफुल ओर्ब्स (बिना Three.js के प्रीमियम बैकग्राउंड) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-500/[0.08] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-blue-500/[0.08] rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-500/[0.05] rounded-full blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        
        {/* Header Block */}
        <div className="animate-header text-center mx-auto mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-pink-500/10 to-blue-500/10 border border-pink-500/20 rounded-full mb-4 shadow-sm">
            <span className="w-2 h-2 bg-pink-500 rounded-full animate-ping" />
            <span className="text-[10px] font-black tracking-widest text-pink-400 uppercase">Executive Endorsements</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4 text-white">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">Clients Say</span>
          </h2>
          <p className="text-sm text-slate-400 font-normal leading-relaxed max-w-xl mx-auto">
            Discover how corporate leaders optimized their infrastructure and accelerated market presence through NoidaHub.
          </p>
        </div>
        
        {/* Testimonials Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="animate-card group relative bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 hover:border-pink-500/30 hover:-translate-y-2"
            >
              {/* होवर ग्लो इफ़ेक्ट */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10" />

              {/* बूटस्ट्रैप कोट आइकॉन */}
              <div className="absolute top-6 right-8 text-slate-800 group-hover:text-pink-500/10 transition-colors duration-500 pointer-events-none">
                <i className="bi bi-quote text-5xl leading-none"></i>
              </div>

              <div className="flex flex-col h-full justify-between relative z-10">
                
                {/* Review Text */}
                <p className="text-sm text-slate-300 font-normal leading-relaxed tracking-wide mb-8 font-light italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                
                {/* User Profile */}
                <div className="flex items-center pt-4 border-t border-white/5">
                  <div className="relative shrink-0">
                    <img 
                      className="rounded-xl object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10" 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      style={{ width: '48px', height: '48px' }}
                    />
                    <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-slate-950" />
                  </div>
                  
                  <div className="ps-4">
                    <h6 className="font-bold text-sm text-white tracking-wide mb-0.5 group-hover:text-pink-400 transition-colors duration-300">
                      {testimonial.name}
                    </h6>
                    <small className="text-[10px] uppercase tracking-wider text-slate-500 block font-black">
                      {testimonial.profession}
                    </small>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}