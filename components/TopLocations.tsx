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
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
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
    <section className="w-full bg-white py-20 sm:py-24 relative overflow-hidden font-sans select-none text-slate-800">
      
      {/* सिर्फ बीच में चमकने वाला सॉफ्ट रेडियल ग्रेडिएंट (Cyan + Emerald Light Theme Sync) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12)_0%,rgba(52,211,153,0.06)_45%,transparent_70%)] pointer-events-none z-0" />

      {/* टॉप और बॉटम थिन लक्ज़री डिवाइडर लाइन्स */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div ref={containerRef} className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        
        {/* उप-शीर्षक - प्रीमियम ऐप बैज */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-[#2563EB]/15 rounded-full mb-4 shadow-sm backdrop-blur-md">
          <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full animate-pulse" />
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#2563EB] uppercase">
            Prime Locations
          </p>
        </div>
        
        {/* मुख्य शीर्षक */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3 leading-tight">
          Discover <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#1d4ed8] to-[#06B6D4]">Top Office Hubs</span>
        </h2>
        
        {/* विवरण */}
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-500 font-medium leading-relaxed tracking-wide mb-14">
          Premium office spaces across Delhi NCR's most active business corridors — curated with highest standards of corporate excellence.
        </p>

        {/* ग्रिड कंटेनर - 24px रेडियस और लक्ज़री होवर इफेक्ट्स */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {locations.map((loc, idx) => (
            <Link
              key={idx}
              ref={el => { cardsRef.current[idx] = el }}
              href={loc.href}
              className="group relative h-[340px] w-full rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)] transition-all duration-700 bg-slate-900 block border border-slate-100"
            >
              {/* बैकग्राउंड इमेज विथ स्मूथ स्लो-जूम */}
              <div 
                className="absolute inset-0 bg-cover bg-center scale-102 group-hover:scale-108 transition-transform duration-[1000ms] ease-out"
                style={{ backgroundImage: `url(${loc.image})` }}
              />

              {/* सिनेमैटिक ग्रेडिएंट ओवरले */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* टॉप-राइट फ्लोटिंग बैज */}
              <div className="absolute top-4 right-4 bg-slate-950/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl shadow-sm">
                <p className="text-[10px] font-bold text-white flex items-center gap-1.5">
                  <i className={`bi ${loc.icon} text-[#06B6D4]`}></i>
                  {loc.stats}
                </p>
              </div>

              {/* बॉटम टेक्स्ट एरिया */}
              <div className="absolute bottom-0 left-0 w-full p-6 text-left z-10">
                {/* होवर एनिमेटेड अंडरलाइन */}
                <div className="w-6 h-[2px] bg-[#06B6D4] rounded-full mb-3 group-hover:w-14 transition-all duration-500 ease-out" />
                
                <h3 className="text-xl font-extrabold text-white tracking-tight group-hover:text-[#06B6D4] transition-colors duration-300">
                  {loc.city}
                </h3>
                
                <p className="text-xs text-slate-300 font-semibold mt-1 tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
                  {loc.tagline}
                </p>

                {/* नेटिव ऐप स्टाइल 'Explore' बटन स्लाइडर */}
                <div className="flex items-center gap-1.5 mt-4 opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all duration-500 ease-out">
                  <span className="text-[10px] font-bold text-[#06B6D4] uppercase tracking-widest">Explore Node</span>
                  <i className="bi bi-arrow-right text-[#06B6D4] text-xs"></i>
                </div>
              </div>

              {/* इनर बॉर्डर ग्लो */}
              <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-[#2563EB]/20 transition-colors duration-500 pointer-events-none" />
            </Link>
          ))}
        </div>

        {/* बॉटम सीटीए - लक्ज़री ग्रेडिएंट बटन */}
        <div className="mt-14">
          <Link
            href="/property"
            className="inline-flex items-center justify-center gap-2 text-xs font-bold tracking-wider text-white bg-gradient-to-r from-[#2563EB] to-[#06B6D4] h-12 px-8 rounded-xl shadow-md shadow-blue-500/5 hover:brightness-105 hover:-translate-y-0.5 transition-all duration-200 uppercase group"
          >
            View All Locations
            <i className="bi bi-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </Link>
        </div>

      </div>
    </section>
  )
}