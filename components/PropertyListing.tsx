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

  // Register GSAP plugins & cleanup
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      hoverTimelines.current.forEach(tl => tl.kill())
    }
  }, [])

  // Set card ref
  const setCardRef = useCallback((id: number, el: HTMLDivElement | null) => {
    if (el) {
      cardRefs.current.set(id, el)
    } else {
      cardRefs.current.delete(id)
    }
  }, [])

  // Setup hover animations
  const setupCardHover = (card: HTMLDivElement, index: number) => {
    const imageEl = card.querySelector('.card-image') as HTMLElement
    const overlayEl = card.querySelector('.card-overlay') as HTMLElement
    const arrowEl = card.querySelector('.card-arrow') as HTMLElement
    const detailsEl = card.querySelector('.card-details') as HTMLElement

    if (!imageEl) return

    const hasListener = card.getAttribute('data-hover-setup')
    if (hasListener === 'true') return
    card.setAttribute('data-hover-setup', 'true')

    card.addEventListener('mouseenter', () => {
      const existingTl = hoverTimelines.current.get(index)
      if (existingTl) existingTl.kill()

      const tl = gsap.timeline()
      hoverTimelines.current.set(index, tl)

      tl.to(imageEl, { scale: 1.06, duration: 0.4, ease: 'power2.out' })
        .to(overlayEl, { opacity: 1, duration: 0.25 }, 0)
        .to(arrowEl, { opacity: 1, x: 0, duration: 0.25, ease: 'back.out(1.5)' }, 0.1)
        .to(detailsEl, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.15)
        .to(card, { 
          y: -8,
          boxShadow: '0 30px 60px -15px rgba(15, 23, 42, 0.15)',
          borderColor: '#cbd5e1',
          duration: 0.3 
        }, 0)
    })

    card.addEventListener('mouseleave', () => {
      const existingTl = hoverTimelines.current.get(index)
      if (existingTl) existingTl.kill()

      const tl = gsap.timeline()
      hoverTimelines.current.set(index, tl)

      tl.to(imageEl, { scale: 1, duration: 0.4, ease: 'power2.out' })
        .to(overlayEl, { opacity: 0, duration: 0.25 }, 0)
        .to(arrowEl, { opacity: 0, x: 10, duration: 0.25 }, 0)
        .to(detailsEl, { y: 5, opacity: 0, duration: 0.25 }, 0)
        .to(card, { 
          y: 0,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          borderColor: '#f1f5f9',
          duration: 0.3 
        }, 0)
    })
  }

  // Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })
        .fromTo('.listing-badge', 
          { opacity: 0, y: 15, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }
        )
        .fromTo('.listing-title', 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        )
        .fromTo('.listing-desc', 
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          '-=0.3'
        )

      // Grid Cards Entrance
      const cards = Array.from(cardRefs.current.values()).filter(Boolean)
      gsap.fromTo(cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
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
      className="relative py-20 sm:py-24 lg:py-28 bg-[#fafafa] overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-slate-100 to-transparent" />
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-[-10%] w-[400px] h-[400px] bg-indigo-500/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="listing-badge inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white rounded-full mb-5 shadow-sm">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="text-xs font-medium tracking-widest uppercase">Exclusive Portfolio</span>
          </div>
          <h2 className="listing-title text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Featured{' '}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
              Collection
            </span>{' '}
            in Noida
          </h2>
          <p className="listing-desc text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto font-light">
            Explore our curated catalog of ultra-premium spaces, hand-picked and rigorously verified for the modern connoisseur.
          </p>
        </div>

        {/* Properties Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {allProperties.map((property) => (
            <div
              key={property.id}
              ref={(el) => setCardRef(property.id, el)}
              data-property-id={property.id}
              className="property-card group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                <img
                  src={property.image}
                  alt={property.title}
                  className="card-image w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="card-overlay absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 transition-opacity duration-300" />

                {/* Top Left Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm border ${
                    property.type === 'For Sell'
                      ? 'bg-emerald-500/80 text-white border-emerald-400/20'
                      : 'bg-blue-500/80 text-white border-blue-400/20'
                  }`}>
                    {property.type === 'For Sell' ? 'For Sale' : property.type}
                  </span>
                  {property.verified && (
                    <span className="p-1.5 bg-white/80 backdrop-blur-md rounded-xl border border-white/20 shadow-sm" title="Verified Property">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </div>

                {/* Featured Star */}
                {property.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 bg-amber-500/90 backdrop-blur-md border border-amber-400/20 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-sm">
                      <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Featured
                    </span>
                  </div>
                )}

                {/* Category Tag */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1.5 bg-slate-900/75 backdrop-blur-md text-white text-xs font-medium rounded-xl tracking-wide border border-white/10">
                    {property.category}
                  </span>
                </div>

                {/* Arrow */}
                <div className="card-arrow absolute bottom-4 right-4 opacity-0 translate-x-2">
                  <div className="w-10 h-10 bg-white text-slate-900 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

                {/* Specs Overlay */}
                <div className="card-details absolute bottom-16 left-4 right-4 opacity-0 translate-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-2 text-center">
                      <span className="block text-[10px] text-slate-200 uppercase tracking-wider font-light">Area</span>
                      <span className="text-xs font-semibold text-white">{property.sqft}</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-2 text-center">
                      <span className="block text-[10px] text-slate-200 uppercase tracking-wider font-light">Beds</span>
                      <span className="text-xs font-semibold text-white">{property.beds}</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-2 text-center">
                      <span className="block text-[10px] text-slate-200 uppercase tracking-wider font-light">Baths</span>
                      <span className="text-xs font-semibold text-white">{property.baths}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {property.price}
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 text-emerald-700 bg-emerald-50 rounded-lg text-xs font-medium">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Active
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
                  {property.title}
                </h3>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <svg className="w-4 h-4 flex-shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium text-slate-500 truncate">{property.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Polished & Fixed Next.js Link CTA */}
        <div className="text-center mt-16 sm:mt-20">
          <Link
            href="/properties"
            className="group inline-flex items-center gap-2.5 px-8 py-4 bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/20 hover:-translate-y-0.5"
          >
            Explore All Properties
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}