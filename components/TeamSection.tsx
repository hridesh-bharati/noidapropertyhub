"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

interface TeamMember {
  image: string;
  name: string;
  designation: string;
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    image: '/img/team-1.jpg',
    name: 'Vikram Malhotra',
    designation: 'Senior Advisor / Noida Corridor Specialist',
    social: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    image: '/img/team-2.jpg',
    name: 'Aanya Sharma',
    designation: 'Senior Advisor / Noida Corridor Specialist',
    social: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    image: '/img/team-3.jpg',
    name: 'Rohit Verma',
    designation: 'Senior Advisor / Noida Corridor Specialist',
    social: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    image: '/img/team-4.jpg',
    name: 'Riya Kapoor',
    designation: 'Senior Advisor / Noida Corridor Specialist',
    social: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
    },
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

    // सेट इनिशियल स्टेट्स
    gsap.set(q(".animate-header"), { opacity: 0, y: 30 });
    gsap.set(q(".animate-card"), { opacity: 0, y: 50, scale: 0.95 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    // 1. हेडिंग एनिमेशन
    tl.to(q(".animate-header"), {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    // 2. कार्ड्स का प्रीमियम स्टैगर और स्केल-अप
    tl.to(q(".animate-card"), {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      stagger: 0.15,
      ease: "power4.out"
    }, "-=0.5");

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="premium-gradient-bg py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Block (image_0.png जैसा सटीक) */}
        <div className="animate-header text-center mx-auto mb-16 max-w-3xl">
          <span className="text-[11px] font-bold tracking-[0.3em] text-gray-800 uppercase mb-3 block">
            Our Premium Hub Agents
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight leading-tight mb-4">
            Meet Our <span className="font-serif italic text-pink-600 font-normal">Experienced</span> Property Agents
          </h2>
          <div className="w-12 h-[1px] bg-pink-600/30 mx-auto my-5" />
          <p className="text-sm text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Our dedicated specialists in NoidaHub are committed to guiding you towards your ideal corporate space and residential nodes within India's dynamic corridors. Connect with our expert advisors.
          </p>
        </div>
        
        {/* Team Grid Layout (image_0.png जैसा सटीक) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="animate-card team-item rounded-none overflow-hidden group">
              <div className="relative">
                <img 
                  className="w-full h-80 object-cover rounded-none transition-transform duration-500 group-hover:scale-105" 
                  src={member.image} 
                  alt={member.name}
                />
                
                {/* प्रीमियम सोशल मीडिया आइकन कंटेनर */}
                <div className="absolute right-4 bottom-4 flex flex-col space-y-1.5 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                  <Link href={member.social.facebook} className="bg-white/90 backdrop-blur-sm text-pink-600 w-10 h-10 flex items-center justify-center rounded-full hover:bg-pink-600 hover:text-white transition-all shadow-md">
                    <i className="fab fa-facebook-f text-lg"></i>
                  </Link>
                  <Link href={member.social.twitter} className="bg-white/90 backdrop-blur-sm text-blue-600 w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-md">
                    <i className="fab fa-twitter text-lg"></i>
                  </Link>
                  <Link href={member.social.instagram} className="bg-white/90 backdrop-blur-sm text-gray-900 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-900 hover:text-white transition-all shadow-md">
                    <i className="fab fa-instagram text-lg"></i>
                  </Link>
                </div>

                {/* इमेज पर हल्का ओवरले */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/20 via-transparent to-transparent pointer-events-none rounded-none" />
              </div>
              
              <div className="text-center p-6 border border-gray-200 border-t-0 bg-white rounded-none">
                <h5 className="font-semibold mb-0.5 text-lg text-gray-900 tracking-tight">{member.name}</h5>
                <small className="text-gray-600 text-sm font-normal block">{member.designation}</small>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}