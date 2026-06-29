"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

interface TeamMember {
  image: string;
  name: string;
  designation: string;
  badge: string;
  social: {
    facebook: string;
    instagram: string;
    whatsapp: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop',
    name: 'Vikram Malhotra',
    badge: 'MANAGER',
    designation: 'Senior Advisor',
    social: { facebook: '#', instagram: '#', whatsapp: '#' },
  },
  {
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    name: 'Aanya Sharma',
    badge: 'CEO',
    designation: 'Noida Corridor Specialist',
    social: { facebook: '#', instagram: '#', whatsapp: '#' },
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    name: 'Rohit Verma',
    badge: 'GENERAL MANAGER',
    designation: 'General Manager',
    social: { facebook: '#', instagram: '#', whatsapp: '#' },
  },
  {
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop',
    name: 'Riya Kapoor',
    badge: 'TEAM LEAD',
    designation: 'Team Lead',
    social: { facebook: '#', instagram: '#', whatsapp: '#' },
  },
];

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (!containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    gsap.set(q(".animate-header"), { opacity: 0, y: -20 });
    gsap.set(q(".animate-card"), { opacity: 0, scale: 0.9, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    tl.to(q(".animate-header"), { opacity: 1, y: 0, duration: 0.6 });
    tl.to(q(".animate-card"), { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" }, "-=0.3");

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="bg-gradient-to-br from-cyan-50/70 via-white to-emerald-50/60 py-20 overflow-hidden font-sans select-none relative text-gray-800">
      
      {/* 1. टॉप राइट कलर्ड सर्कल (Soft Light Blue Blur Orb) */}
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-cyan-200/40 blur-3xl pointer-events-none -z-0" />
      
      {/* 2. बॉटम लेफ्ट कलर्ड सर्कल (Soft Light Green Blur Orb) */}
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-emerald-200/40 blur-3xl pointer-events-none -z-0" />

      {/* डेकोरेटिव थिन बैकग्राउंड लाइन */}
      <div className="absolute top-[48%] left-0 w-full h-[1px] bg-gray-200/60 -z-0 pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* टू-कॉलम हेडर ब्लॉक */}
        <div className="animate-header flex flex-col lg:flex-row lg:items-start lg:justify-between border-b border-gray-200/60 pb-10 mb-16 gap-4">
          <h2 className="text-4xl lg:text-5xl font-black text-[#1d4ed8] tracking-tight whitespace-nowrap">
            Our Team
          </h2>
          <p className="text-gray-500 text-sm max-w-xl lg:text-right leading-relaxed font-medium pt-2">
            Our dedicated team brings together expertise and passion to deliver the best real estate solutions. This is sample text. Insert your desired text here.
          </p>
        </div>
        
        {/* टीम ग्रिड */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="animate-card flex flex-col items-center text-center group">
              
              {/* इमेज कंटेनर विथ आर्क डिज़ाइन */}
              <div className="relative w-56 h-56 flex items-center justify-center mb-6">
                
                {/* आउटर ग्रेडिएंट आर्क */}
                <div className="absolute inset-0 rounded-full border-[3px] border-transparent bg-gradient-to-tr from-[#1d4ed8] via-[#ec4899] to-[#10b981] [mask-image:linear-gradient(white,white)] -z-10 opacity-90 group-hover:rotate-45 transition-transform duration-700" />
                
                {/* मुख्य सर्कुलर इमेज */}
                <div className="w-[88%] h-[88%] rounded-full overflow-hidden border-4 border-white shadow-lg relative">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    src={member.image} 
                    alt={member.name}
                  />
                </div>
              </div>
              
              {/* कैप्सूल शेप्ड डेसिग्नेशन बैच */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-[11px] px-6 py-1.5 rounded-full shadow-sm tracking-widest min-w-[130px] uppercase mb-3">
                {member.badge}
              </div>

              {/* नाम और छोटा सबटाइटल */}
              <h5 className="font-bold text-xl text-gray-900 tracking-tight mb-0.5">
                {member.name}
              </h5>
              <p className="text-gray-500 text-xs font-semibold tracking-wider uppercase mb-4">
                {member.designation}
              </p>

              {/* कलरफुल सोशल मीडिया आइकन्स - बॉटम कैप्सूल स्टाइल (हमेशा डिफ़ॉल्ट शो) */}
              <div className="bg-white/90 backdrop-blur-xs px-4 py-1.5 rounded-full flex items-center justify-center space-x-4 shadow-md border border-gray-100">
                {/* Facebook */}
                <Link href={member.social.facebook} className="text-[#1877F2] hover:scale-115 transition-transform flex items-center justify-center">
                  <i className="bi bi-facebook text-lg"></i>
                </Link>
                
                {/* Instagram Gradient */}
                <Link href={member.social.instagram} className="hover:scale-115 transition-transform flex items-center justify-center bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] bg-clip-text text-transparent">
                  <i className="bi bi-instagram text-lg font-bold"></i>
                </Link>
                
                {/* WhatsApp */}
                <Link href={member.social.whatsapp} className="text-[#25D366] hover:scale-115 transition-transform flex items-center justify-center">
                  <i className="bi bi-whatsapp text-lg"></i>
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}