import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
  // 1. Explicitly type your refs so TypeScript knows they will hold DOM elements
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 2. Safely guard against null values before running animations
    if (
      !sectionRef.current ||
      !imageRef.current ||
      !contentRef.current ||
      !titleRef.current ||
      !descriptionRef.current ||
      !buttonsRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Image animation
      gsap.from(imageRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Content animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      tl.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6
      })
      .from(descriptionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6
      }, "-=0.3")
      .from(buttonsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6
      }, "-=0.3");

      // Hover animation for buttons - NOW SAFE FROM TYPE ERRORS
      const buttons = buttonsRef.current!.querySelectorAll('a');
      buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3"></div>
            
            <div className="relative p-8 md:p-12">
              <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
                {/* Image section */}
                <div className="w-full lg:w-5/12 flex-shrink-0">
                  <div ref={imageRef} className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-2xl transform rotate-3"></div>
                    <img 
                      className="relative w-full h-auto rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-700" 
                      src="/img/call-to-action.jpg" 
                      alt="Contact Agent"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-2 flex items-center gap-2 animate-bounce">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-gray-700">Available Now</span>
                    </div>
                  </div>
                </div>
                
                {/* Content section */}
                <div ref={contentRef} className="w-full lg:w-7/12 flex-1">
                  <div className="space-y-6">
                    <div ref={titleRef}>
                      <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold mb-4">
                        Get Started Today
                      </div>
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent leading-tight">
                        Contact With Our <br />
                        <span className="text-primary">Certified Agent</span>
                      </h1>
                    </div>
                    
                    <p ref={descriptionRef} className="text-gray-600 text-base md:text-lg leading-relaxed">
                      Eirmod sed ipsum dolor sit rebum magna erat. Tempor lorem kasd vero 
                      ipsum sit sit diam justo sed vero dolor duo.
                    </p>
                    
                    <div ref={buttonsRef} className="flex flex-wrap gap-4 pt-4">
                      <a 
                        href="#" 
                        className="group inline-flex items-center gap-3 bg-primary text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transform hover:-translate-y-1 transition-all duration-300"
                      >
                        <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Make A Call
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                      <a 
                        href="#" 
                        className="group inline-flex items-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                      >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Get Appointment
                      </a>
                    </div>

                    {/* Trust indicators */}
                    <div className="flex items-center gap-6 pt-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-gray-300 to-gray-400 shadow-md"></div>
                        ))}
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500">Trusted by 1000+ clients</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
