'use client'
import { useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PlanData {
  id: number;
  title: string;
  subtitle: string;
  beds: string;
  baths: string;
  living: string;
  kitchen: string;
  image: string;
  accentBadge: string;
}

const propertyPlans: PlanData[] = [
  {
    id: 1,
    title: '1 BHK Design Comfort',
    subtitle: 'Specially optimized for smart corporate living.',
    beds: '1 Bed',
    baths: '2 Baths',
    living: 'Living Included',
    kitchen: 'Modular Unit',
    image: '/img/h1.jpeg', 
    accentBadge: 'bg-primary/10 text-primary border-primary/20',
  },
  {
    id: 2,
    title: '2 BHK Luxury Suite',
    subtitle: 'Modern and spacious premium layout.',
    beds: '2 Beds',
    baths: '2 Baths',
    living: 'Large Living',
    kitchen: 'Open Concept',
    image: '/img/h1.jpeg',
    accentBadge: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  },
  {
    id: 3,
    title: '3 BHK Elegant Villa',
    subtitle: 'Perfect blend of luxury and convenience.',
    beds: '3 Beds',
    baths: '3 Baths',
    living: 'Grand Hall',
    kitchen: 'Pantry Added',
    image: '/img/h1.jpeg',
    accentBadge: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  },
  {
    id: 4,
    title: 'Studio Apartment Smart',
    subtitle: 'Minimalist approach for urban professionals.',
    beds: '1 Studio',
    baths: '1 Bath',
    living: 'Integrated',
    kitchen: 'Compact Kit',
    image: '/img/h1.jpeg',
    accentBadge: 'bg-blue-50 text-blue-600 border-blue-100',
  },
];

function ThreeDImage({ imgUrl }: { imgUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imgUrl);

  useFrame((state) => {
    if (!meshRef.current) return;
    const x = (state.pointer.x * Math.PI) / 10;
    const y = (state.pointer.y * Math.PI) / 10;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -y, 0.08);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x, 0.08);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3.8, 2.5]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent opacity={0.95} />
    </mesh>
  );
}

function FallbackMesh() {
  return (
    <mesh>
      <planeGeometry args={[3.8, 2.5]} />
      <meshBasicMaterial color="#f8fafc" />
    </mesh>
  );
}

export default function Property3DGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.plan-card');
    
    // सिनेमाई स्क्रॉल ट्रिगर एनीमेशन
    gsap.fromTo(cards,
      { opacity: 0, y: 50, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* ब्लूरेड ग्रेडिएंट ओर्ब्स - टॉप लेफ्ट (ब्लू) और बॉटम राइट (ग्रीन) */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-400/15 rounded-full blur-[150px] pointer-events-none" />
      
      {/* ओवरलैपिंग सेकेंडरी ब्लर लेयर */}
      <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-indigo-300/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-[20%] w-[300px] h-[300px] bg-teal-300/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mx-auto mb-16 max-w-2xl px-2">
          <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary mb-3 bg-primary/10 border border-primary/20 shadow-sm">
            📐 Architectural Innovation
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Exclusive Floor Plans
          </h2>
          <div className="w-12 h-0.5 bg-primary/50 mx-auto mb-5 rounded-full" />
          <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed tracking-wide">
            Explore our state-of-the-art 3D layout architecture designs fine-tuned for high-end modern living. Move your mouse over the floor plans to inspect angles.
          </p>
        </div>

        {/* 4 Cards Grid Layout */}
        <div 
          ref={containerRef} 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {propertyPlans.map((plan) => (
            <div 
              key={plan.id}
              className="plan-card opacity-0 bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-200/60 flex flex-col sm:flex-row shadow-sm hover:shadow-2xl hover:border-slate-300/80 group transition-all duration-500"
            >
              
              {/* 3D Canvas Box Frame */}
              <div className="w-full sm:w-[45%] h-60 sm:h-auto bg-slate-100/80 relative overflow-hidden border-b sm:border-b-0 sm:border-r border-slate-200/50">
                <Canvas camera={{ position: [0, 0, 2.4], fov: 50 }}>
                  <ambientLight intensity={1.8} />
                  <Suspense fallback={<FallbackMesh />}>
                    <ThreeDImage imgUrl={plan.image} />
                  </Suspense>
                </Canvas>
                
                {/* फ्लोटिंग विजेट */}
                <div className="absolute bottom-3 left-3 bg-slate-900/90 text-[9px] px-2.5 py-1 text-white font-bold rounded-lg pointer-events-none shadow-md uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  3D Interactive
                </div>
              </div>

              {/* Content Box Segment */}
              <div className="p-6 w-full sm:w-[55%] flex flex-col justify-between bg-white/60 backdrop-blur-sm">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-md sm:text-lg font-black text-slate-900 tracking-tight group-hover:text-primary transition-colors">
                      {plan.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium tracking-wide mb-5">
                    {plan.subtitle}
                  </p>
                  
                  {/* Property Specs - Modern Grid Nodes instead of traditional list */}
                  <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                    {[
                      { icon: 'bi-door-open', val: plan.beds },
                      { icon: 'bi-droplet', val: plan.baths },
                      { icon: 'bi-tv', val: plan.living },
                      { icon: 'bi-egg-fried', val: plan.kitchen }
                    ].map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-slate-100 shadow-sm backdrop-blur-sm">
                        <i className={`bi ${spec.icon} text-primary text-xs`}></i>
                        <span className="text-[11px] font-bold text-slate-600 truncate">{spec.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* प्रीमियम बटन */}
                <button className="mt-6 w-full py-3 bg-slate-950 hover:bg-primary text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all duration-300 shadow-md shadow-slate-900/5 hover:shadow-primary/20">
                  View Specifications
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}