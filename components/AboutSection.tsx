"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // SSR (Next.js) सेफ चेकिंग: सिर्फ क्लाइंट साइड पर ही रजिस्टर करें
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // अगर ref मौजूद नहीं है तो रुक जाएं
    if (!containerRef.current) return;

    // इस कंपोनेंट के अंदर के ही एलिमेंट्स को सेलेक्ट करने के लिए
    const q = gsap.utils.selector(containerRef);

    // Timeline बनाना
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // जब स्क्रीन के 80% हिस्से पर सेक्शन आए, तब शुरू हो
        toggleActions: "play none none none"
      }
    });

    // 1. Image Animation (नीचे से ऊपर आना और ओपेसिटी बढ़ना)
    tl.from(q(".animate-img"), {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out"
    });

    // 2. Text Elements Animation (एक के बाद एक आना - Stagger)
    tl.from(q(".animate-text"), {
      opacity: 0,
      x: 30,
      duration: 0.6,
      stagger: 0.15, // हर टेक्स्ट के बीच 0.15 सेकंड का गैप
      ease: "power2.out"
    }, "-=0.4"); // इमेज एनीमेशन खत्म होने से थोड़ा पहले शुरू होगा

    // Cleanup: जब कंपोनेंट हटे तो एनीमेशन और स्क्रॉल ट्रिगर को डिलीट कर दें
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="py-5 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center">
          
          {/* Left Column: Image */}
          <div className="w-full lg:w-1/2 mb-5 lg:mb-0">
            <div className="about-img animate-img relative overflow-hidden p-5">
              <img 
                className="w-full h-auto rounded" 
                src="/img/about.jpg" 
                alt="About Us"
              />
            </div>
          </div>
          
          {/* Right Column: Text Content */}
          <div className="w-full lg:w-1/2 lg:pl-12">
            <h1 className="animate-text mb-4 text-3xl font-bold">
              #1 Place To Find The Perfect Property
            </h1>
            <p className="animate-text mb-4 text-gray-600">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet 
              diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo 
              justo magna dolore erat amet
            </p>
            <p className="animate-text mb-2">
              <i className="fa fa-check text-primary me-3"></i>
              Tempor erat elitr rebum at clita
            </p>
            <p className="animate-text mb-2">
              <i className="fa fa-check text-primary me-3"></i>
              Aliqu diam amet diam et eos
            </p>
            <p className="animate-text mb-4">
              <i className="fa fa-check text-primary me-3"></i>
              Clita duo justo magna dolore erat amet
            </p>
            <a className="animate-text btn-primary inline-block py-3 px-5 mt-3" href="#">
              Read More
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}