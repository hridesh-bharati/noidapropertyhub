'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

interface Property {
  id: number
  image: string
  type: string
  category: string
  price: string
  title: string
  location: string
  sqft: string
  beds: string
  baths: string
  featured?: boolean
  verified?: boolean
}

const allProperties: Property[] = [
  {
    id: 1,
    image: '/img/property-1.jpg',
    type: 'For Sell',
    category: 'Apartment',
    price: '₹1.25 Cr',
    title: 'Premium 3BHK Apartment in Sector 62',
    location: 'Sector 62, Noida',
    sqft: '1,850 Sqft',
    beds: '3 Bed',
    baths: '2 Bath',
    featured: true,
    verified: true
  },
  {
    id: 2,
    image: '/img/property-2.jpg',
    type: 'For Rent',
    category: 'Villa',
    price: '₹45,000/mo',
    title: 'Luxury Villa with Garden View',
    location: 'Sector 44, Noida',
    sqft: '2,400 Sqft',
    beds: '4 Bed',
    baths: '3 Bath',
    featured: true,
    verified: true
  },
  {
    id: 3,
    image: '/img/property-3.jpg',
    type: 'For Sell',
    category: 'Office',
    price: '₹2.8 Cr',
    title: 'Commercial Office Space',
    location: 'Sector 18, Noida',
    sqft: '3,200 Sqft',
    beds: '4 Cabins',
    baths: '2 Bath',
    featured: false,
    verified: false
  },
  {
    id: 4,
    image: '/img/property-4.jpg',
    type: 'For Rent',
    category: 'Builder Floor',
    price: '₹35,000/mo',
    title: 'Builder Floor in Prime Location',
    location: 'Sector 50, Noida',
    sqft: '1,600 Sqft',
    beds: '3 Bed',
    baths: '2 Bath',
    featured: false,
    verified: true
  },
  {
    id: 5,
    image: '/img/property-5.jpg',
    type: 'For Sell',
    category: 'Independent House',
    price: '₹4.5 Cr',
    title: 'Independent House with Terrace',
    location: 'Sector 15A, Noida',
    sqft: '3,500 Sqft',
    beds: '5 Bed',
    baths: '4 Bath',
    featured: true,
    verified: true
  },
  {
    id: 6,
    image: '/img/property-6.jpg',
    type: 'For Rent',
    category: 'Retail Shop',
    price: '₹80,000/mo',
    title: 'Prime Retail Space in Mall',
    location: 'Sector 38, Noida',
    sqft: '800 Sqft',
    beds: '1 Hall',
    baths: '1 Bath',
    featured: false,
    verified: false
  },
]

export default function PropertyListing() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const hoverTimelines = useRef<Map<number, gsap.core.Timeline>>(new Map())

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      hoverTimelines.current.forEach(tl => tl.kill())
    }
  }, [])

  const setCardRef = useCallback((id: number, el: HTMLDivElement | null) => {
    if (el) {
      cardRefs.current.set(id, el)
    } else {
      cardRefs.current.delete(id)
    }
  }, [])

  const setupCardHover = (card: HTMLDivElement, index: number) => {
    const imageEl = card.querySelector('.card-image') as HTMLElement
    const glowEl = card.querySelector('.card-glow') as HTMLElement
    const btnEl = card.querySelector('.card-btn') as HTMLElement

    if (!imageEl) return

    const hasListener = card.getAttribute('data-hover-setup')
    if (hasListener === 'true') return
    card.setAttribute('data-hover-setup', 'true')

    card.addEventListener('mouseenter', () => {
      const existingTl = hoverTimelines.current.get(index)
      if (existingTl) existingTl.kill()

      const tl = gsap.timeline()
      hoverTimelines.current.set(index, tl)

      tl.to(imageEl, { scale: 1.08, duration: 0.4, ease: 'power2.out' })
        .to(card, { y: -10, borderColor: 'rgba(236, 72, 153, 0.4)', boxShadow: '0 30px 60px -15px rgba(236, 72, 153, 0.15)', duration: 0.3 }, 0)
        .to(glowEl, { opacity: 0.8, scale: 1.1, duration: 0.4 }, 0)
        .to(btnEl, { bg: '#E65C1E', scale: 1.05, duration: 0.2 }, 0)
    })

    card.addEventListener('mouseleave', () => {
      const existingTl = hoverTimelines.current.get(index)
      if (existingTl) existingTl.kill()

      const tl = gsap.timeline()
      hoverTimelines.current.set(index, tl)

      tl.to(imageEl, { scale: 1, duration: 0.4, ease: 'power2.out' })
        .to(card, { y: 0, borderColor: 'rgba(241, 245, 249, 0.8)', boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.04)', duration: 0.3 }, 0)
        .to(glowEl, { opacity: 0, scale: 1, duration: 0.4 }, 0)
        .to(btnEl, { bg: '#0f172a', scale: 1, duration: 0.2 }, 0)
    })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.listing-header-el',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          }
        }
      )

      const cards = Array.from(cardRefs.current.values()).filter(Boolean)
      gsap.fromTo(cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
          onComplete: () => {
            cards.forEach((card, index) => setupCardHover(card, index))
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="premium-gradient-bg py-24 sm:py-32 overflow-hidden"
    >
      {/* अतिरिक्त बैकग्राउंड डेकोरेशन फॉर वाइब्रेंट लुक */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/10 to-pink-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-1 lg:px-8 z-10">

        {/* Colorful Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-20">
          <div className="listing-header-el inline-flex items-center gap-2 px-1 py-1.5 bg-gradient-to-r from-pink-500/10 to-blue-500/10 border border-pink-500/20 rounded-full mb-4 shadow-sm">
            <span className="w-2 h-2 bg-pink-500 rounded-full animate-ping" />
            <span className="text-[10px] font-black tracking-widest text-pink-600 uppercase">Hot Properties</span>
          </div>

          <h2 className="listing-header-el text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-4">
            Discover Elite{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600">
              Living Nodes
            </span>
          </h2>
          <p className="listing-header-el text-sm text-slate-500 font-medium max-w-xl mx-auto">
            Explore premium residencies and dynamic commercial nodes supercharged with prime connectivity.
          </p>
        </div>

        {/* Colorful Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-2"
        >
          {allProperties.map((property) => (
            <div
              key={property.id}
              ref={(el) => setCardRef(property.id, el)}
              className="group relative bg-white/70 backdrop-blur-md rounded-3xl border border-slate-100 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-300"
            >
              {/* होवर पर पीछे चमकने वाला नियॉन ग्लो */}
              <div className="card-glow absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl opacity-0 blur-xl -z-10 transition-all duration-500" />

              {/* Image Frame */}
              <div className="relative overflow-hidden aspect-[4/3] rounded-2xl bg-slate-100 mb-5">
                <img
                  src={property.image}
                  alt={property.title}
                  className="card-image w-full h-full object-cover transition-all duration-500"
                  loading="lazy"
                />

                {/* Neon Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider text-white shadow-md ${property.type === 'For Sell'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
                    : 'bg-gradient-to-r from-pink-500 to-purple-600'
                    }`}>
                    {property.type === 'For Sell' ? 'Buy Now' : 'On Rent'}
                  </span>

                  {property.verified && (
                    <span className="p-1.5 bg-white/90 backdrop-blur-md rounded-xl text-blue-600 shadow-sm" title="Verified">
                      <i className="bi bi-patch-check-fill text-sm"></i>
                    </span>
                  )}
                </div>

                {property.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[9px] font-black uppercase tracking-wider rounded-xl shadow-md">
                      ★ Hot
                    </span>
                  </div>
                )}
              </div>

              {/* Meta details (Specs Row) */}
              <div className="flex items-center gap-3 mb-3 text-[11px] font-bold text-purple-600/80 uppercase tracking-wider">
                <span>{property.category}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span className="flex items-center gap-0.5"><i className="bi bi-ruler"></i> {property.sqft.split(' ')[0]} Sqft</span>
              </div>

              {/* Title & Price Section */}
              <h3 className="text-base font-bold text-slate-800 tracking-tight mb-2 line-clamp-1 group-hover:text-purple-700 transition-colors duration-300">
                {property.title}
              </h3>

              <div className="flex items-center gap-1 text-slate-400 mb-5">
                <i className="bi bi-geo-alt-fill text-slate-400 text-xs"></i>
                <span className="text-xs font-semibold text-slate-400 truncate">{property.location}</span>
              </div>

              {/* Lower Section: Price + CTA Button inside Card */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <small className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">Value</small>
                  <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">
                    {property.price}
                  </span>
                </div>

                <Link href={`/properties`} className="card-btn inline-block  hover:scale-105 transition-transform duration-300">
                  <button className="card-btn w-10 h-10 bg-slate-950 text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:bg-slate-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </button>
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Big Vibrant Action Button */}
        <div className="text-center mt-20">
          <Link
            href="/properties"
            className="inline-block text-xs font-black tracking-widest text-white bg-gradient-to-r from-pink-600 via-purple-600 to-orange-500 px-10 py-4 rounded-xl hover:opacity-95 transition-all duration-300 uppercase shadow-[0_10px_30px_rgba(236,72,153,0.3)] hover:shadow-[0_15px_35px_rgba(236,72,153,0.45)] hover:-translate-y-0.5"
          >
            Explore Full Grid
          </Link>
        </div>
      </div>
    </section>
  )
}