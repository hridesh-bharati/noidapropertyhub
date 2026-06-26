import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SearchBar() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const inputRefs = useRef([]);
  const buttonRef = useRef(null);
  const tagsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main section animation
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Title and subtitle animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out"
      })
      .from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3");

      // Inputs staggered animation
      gsap.from(inputRefs.current, {
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Button animation with bounce
      gsap.from(buttonRef.current, {
        opacity: 0,
        scale: 0.7,
        duration: 0.8,
        delay: 0.4,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Tags animation
      gsap.from(tagsRef.current.children, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.08,
        delay: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Button floating animation
      gsap.to(buttonRef.current, {
        y: -4,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Button pulse glow
      gsap.to(buttonRef.current, {
        boxShadow: "0 8px 30px rgba(139, 0, 0, 0.4)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Hover animations
      buttonRef.current.addEventListener('mouseenter', () => {
        gsap.to(buttonRef.current, {
          scale: 1.08,
          boxShadow: "0 12px 40px rgba(139, 0, 0, 0.5)",
          duration: 0.3,
          ease: "power2.out"
        });
      });

      buttonRef.current.addEventListener('mouseleave', () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          boxShadow: "0 8px 30px rgba(139, 0, 0, 0.3)",
          duration: 0.3,
          ease: "power2.out"
        });
      });

      // Input focus animations
      inputRefs.current.forEach((input) => {
        input.addEventListener('focus', () => {
          gsap.to(input, {
            borderColor: "#8B0000",
            boxShadow: "0 0 0 5px rgba(139, 0, 0, 0.08)",
            scale: 1.03,
            backgroundColor: "#ffffff",
            duration: 0.3,
            ease: "power2.out"
          });
        });

        input.addEventListener('blur', () => {
          gsap.to(input, {
            borderColor: "#e5e7eb",
            boxShadow: "none",
            scale: 1,
            backgroundColor: "#f9fafb",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Tag hover animations
      Array.from(tagsRef.current.children).forEach(tag => {
        tag.addEventListener('mouseenter', () => {
          gsap.to(tag, {
            scale: 1.1,
            backgroundColor: "#8B0000",
            color: "#ffffff",
            duration: 0.3,
            ease: "power2.out"
          });
        });
        tag.addEventListener('mouseleave', () => {
          gsap.to(tag, {
            scale: 1,
            backgroundColor: "#f3f4f6",
            color: "#6b7280",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div ref={containerRef} className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div ref={titleRef}>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white mb-4" 
                  style={{ background: 'linear-gradient(135deg, #8B0000, #660000)' }}>
              Find Your Dream Home
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Search Properties
            </h2>
          </div>
          <p ref={subtitleRef} className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the perfect property with our advanced search tool
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-3">
              <div className="relative">
                <input
                  ref={el => inputRefs.current[0] = el}
                  type="text"
                  placeholder="Search keyword..."
                  className="w-full h-14 px-5 pr-12 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 outline-none transition-all duration-300"
                />
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Property Type */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  ref={el => inputRefs.current[1] = el}
                  className="w-full h-14 px-5 pr-12 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-700 outline-none appearance-none cursor-pointer transition-all duration-300"
                >
                  <option value="">Property Type</option>
                  <option value="1">🏢 Apartment</option>
                  <option value="2">🏡 Villa</option>
                  <option value="3">🏘️ House</option>
                  <option value="4">🏬 Commercial</option>
                </select>
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Location */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  ref={el => inputRefs.current[2] = el}
                  className="w-full h-14 px-5 pr-12 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-700 outline-none appearance-none cursor-pointer transition-all duration-300"
                >
                  <option value="">Location</option>
                  <option value="1">🗽 New York</option>
                  <option value="2">🌴 Los Angeles</option>
                  <option value="3">🌆 Chicago</option>
                  <option value="4">🏖️ Miami</option>
                </select>
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Search Button */}
            <div className="md:col-span-3">
              <button
                ref={buttonRef}
                className="w-full h-14 rounded-xl text-white font-semibold text-lg transition-all duration-300 relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, #8B0000, #660000)',
                  boxShadow: '0 4px 20px rgba(139, 0, 0, 0.3)'
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Now
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
              </button>
            </div>
          </div>

          {/* Popular Tags */}
          <div ref={tagsRef} className="mt-6 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-gray-500 font-medium mr-2">🔥 Popular:</span>
            <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:bg-red-700 hover:text-white border-2 border-transparent hover:border-red-700">
              Luxury Homes
            </button>
            <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:bg-red-700 hover:text-white border-2 border-transparent hover:border-red-700">
              Beachfront
            </button>
            <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:bg-red-700 hover:text-white border-2 border-transparent hover:border-red-700">
              Downtown
            </button>
            <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:bg-red-700 hover:text-white border-2 border-transparent hover:border-red-700">
              Investment
            </button>
            <button className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:bg-red-700 hover:text-white border-2 border-transparent hover:border-red-700">
              🏡 Family Homes
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-800">500+</div>
            <div className="text-sm text-gray-500">Properties</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-800">120+</div>
            <div className="text-sm text-gray-500">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-800">50+</div>
            <div className="text-sm text-gray-500">Cities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-800">98%</div>
            <div className="text-sm text-gray-500">Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
}