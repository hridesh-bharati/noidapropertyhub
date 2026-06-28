'use client'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LocationCard {
  city: string
  tagline: string
  image: string
  href: string
  stats: string
  icon: string
}

const locations: LocationCard[] = [
  {
    city: 'Noida',
    tagline: 'Premium office spaces',
    image: 'https://images.unsplash.com/photo-1590059132612-f75609fcb42b?q=80&w=600&auto=format&fit=crop',
    href: '/property/offices-rent-noida',
    stats: '50+ Properties',
    icon: 'bi-building'
  },
  {
    city: 'New Delhi',
    tagline: 'Central business district',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=600&auto=format&fit=crop',
    href: '/property/offices-rent-delhi',
    stats: '35+ Properties',
    icon: 'bi-geo-alt'
  },
  {
    city: 'Gurgaon',
    tagline: 'Modern corporate hubs',
    image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=600&auto=format&fit=crop',
    href: '/property/offices-rent-gurgaon',
    stats: '40+ Properties',
    icon: 'bi-briefcase'
  },
  {
    city: 'Greater Noida',
    tagline: 'Emerging business hub',
    image: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=600&auto=format&fit=crop',
    href: '/property/offices-rent-greater-noida',
    stats: '25+ Properties',
    icon: 'bi-graph-up-arrow'
  },
]

export default function TopLocations() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const cards = cardsRef.current.filter(Boolean)

    gsap.fromTo(cards,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section className="w-full bg-gradient-to-b from-white via-slate-50/50 to-white py-16 sm:py-24 relative overflow-hidden">
      {/* बैकग्राउंड डेकोरेशन */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* उप-शीर्षक (Sub-header) - प्रीमियम बैज */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <p className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
            Prime Locations
          </p>
        </div>
        
        {/* मुख्य शीर्षक */}
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Discover <span className="text-primary">Top</span> Office Hubs
        </h2>
        
        {/* शीर्षक के नीचे प्रीमियम लाइन */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="w-8 h-0.5 bg-primary/40 rounded-full" />
          <div className="w-12 h-0.5 bg-primary rounded-full" />
          <div className="w-8 h-0.5 bg-primary/40 rounded-full" />
        </div>
        
        {/* विवरण */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-500 font-medium leading-relaxed mt-5 tracking-wide px-2">
          Premium office spaces across Delhi NCR's most active business corridors — 
          curated for discerning occupiers seeking <span className="text-primary font-bold">excellence</span>.
        </p>

        {/* ग्रिड कंटेनर - प्रीमियम कार्ड्स */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 sm:mt-16">
          {locations.map((loc, idx) => (
            <Link
              key={idx}
              ref={el => { cardsRef.current[idx] = el }}
              href={loc.href}
              className="group relative h-[320px] w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 bg-slate-900 block"
            >
              {/* बैकग्राउंड इमेज */}
              <div 
                className="absolute inset-0 bg-cover bg-center scale-110 group-hover:scale-125 transition-transform duration-[800ms] ease-out"
                style={{ backgroundImage: `url(${loc.image})` }}
              />

              {/* ड्यूल ओवरले - प्रीमियम ग्रेडिएंट */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-slate-950/20 opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* टॉप-राइट बैज */}
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full">
                <p className="text-[9px] font-black text-white/90 uppercase tracking-wider flex items-center gap-1.5">
                  <i className={`bi ${loc.icon} text-primary text-[10px]`}></i>
                  {loc.stats}
                </p>
              </div>

              {/* बॉटम कंटेंट */}
              <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                {/* होवर इंडिकेटर लाइन */}
                <div className="w-8 h-0.5 bg-primary rounded-full mb-3 group-hover:w-16 transition-all duration-500" />
                
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-primary transition-colors duration-300">
                  {loc.city}
                </h3>
                
                <p className="text-sm text-slate-300 font-medium mt-1 tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
                  {loc.tagline}
                </p>

                {/* एरो इंडिकेटर */}
                <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Explore</span>
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* बॉर्डर ग्लो इफेक्ट */}
              <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
            </Link>
          ))}
        </div>

        {/* बॉटम सीटीए */}
        <div className="mt-12">
          <Link
            href="/property"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-slate-950 hover:bg-primary text-white font-bold rounded-full text-xs uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-primary/25 group"
          >
            View All Locations
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}