"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

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

// 1. Three.js Background Component (Zero Third-Party Dependencies)
function BackgroundParticles() {
  const ref = useRef<any>();
  
  // बिना किसी बाहरी लाइब्रेरी के 1200 पार्टिकल्स (400 x 3 coordinates) जनरेट करना
  const [positions] = useState(() => {
    const points = new Float32Array(1200);
    for (let i = 0; i < points.length; i++) {
      points[i] = (Math.random() - 0.5) * 2.5; // [-1.25, 1.25] के बीच रैंडम स्प्रेड
    }
    return points;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 18;
      ref.current.rotation.y -= delta / 22;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#f59e0b" // अंबर (गोल्डन) टोन
          size={0.008}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

// 2. Main Premium Component
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
      { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.15, ease: "power4.out" },
      "-=0.5"
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="w-full bg-slate-950 py-24 sm:py-32 overflow-hidden relative min-h-screen flex items-center justify-center text-white"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <BackgroundParticles />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        
        {/* Header Block */}
        <div className="animate-header text-center mx-auto mb-16 max-w-2xl">
          <span className="text-[11px] font-bold tracking-[0.3em] text-amber-500 uppercase mb-3 block">
            Executive Endorsements
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight mb-4">
            What Our <span className="font-serif italic text-amber-500 font-normal">Clients Say</span>
          </h2>
          <div className="w-12 h-[1px] bg-amber-500/50 mx-auto my-5" />
          <p className="text-sm text-slate-400 font-normal leading-relaxed">
            Discover how corporate leaders and scaling enterprises optimized their infrastructure and accelerated market presence through NoidaHub.
          </p>
        </div>
        
        {/* Testimonials Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="animate-card group relative bg-gradient-to-b from-slate-900/80 to-slate-950/90 backdrop-blur-md border border-slate-800/60 rounded-none p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-amber-500/40"
            >
              {/* Core Bootstrap Icon Quote */}
              <div className="absolute top-6 right-8 text-slate-800 group-hover:text-amber-500/10 transition-colors duration-500 pointer-events-none">
                <i className="bi bi-quote text-5xl leading-none"></i>
              </div>

              <div className="flex flex-col h-full justify-between relative z-10">
                
                {/* Review Text */}
                <p className="text-sm text-slate-300 font-normal leading-relaxed tracking-wide mb-8 font-light">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                
                {/* User Profile Block */}
                <div className="flex items-center pt-4 border-t border-slate-900">
                  <div className="relative shrink-0">
                    <img 
                      className="rounded-none object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 border border-slate-800" 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      style={{ width: '48px', height: '48px' }}
                    />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-amber-500" />
                  </div>
                  
                  <div className="ps-4">
                    <h6 className="font-medium text-sm text-white tracking-wide mb-0.5 group-hover:text-amber-500 transition-colors duration-300">
                      {testimonial.name}
                    </h6>
                    <small className="text-[11px] uppercase tracking-wider text-slate-500 block font-semibold">
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