'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

const tabButtons = [
  { id: 'featured', label: 'Featured', icon: '⭐' },
  { id: 'sell', label: 'For Sale', icon: '🏷️' },
  { id: 'rent', label: 'For Rent', icon: '🔑' },
]

export default function PropertyListing() {
  const [activeTab, setActiveTab] = useState<string>('featured')
  
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const hoverTimelines = useRef<Map<number, gsap.core.Timeline>>(new Map())

  // Register GSAP plugins
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

  // Filtered properties
  const getFilteredProperties = useCallback((): Property[] => {
    switch (activeTab) {
      case 'sell':
        return allProperties.filter(p => p.type === 'For Sell')
      case 'rent':
        return allProperties.filter(p => p.type === 'For Rent')
      default:
        return allProperties
    }
  }, [activeTab])

  const properties = getFilteredProperties()

  // Initial header animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      headerTl
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

      // Tabs animation
      gsap.fromTo(tabsRef.current?.children || [],
        { opacity: 0, scale: 0.8, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: tabsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Animate cards when tab changes or initial load
  useEffect(() => {
    // Small delay to ensure DOM is updated
    const timeout = setTimeout(() => {
      // Clean up old hover timelines
      hoverTimelines.current.forEach(tl => tl.kill())
      hoverTimelines.current.clear()

      const cards = Array.from(cardRefs.current.values()).filter(Boolean)
      
      // Kill any existing animations
      gsap.killTweensOf(cards)

      // Animate cards from sides
      cards.forEach((card, index) => {
        const direction = index % 2 === 0 ? -60 : 60
        
        gsap.fromTo(card,
          { 
            opacity: 0, 
            x: direction,
            y: 20,
            scale: 0.92,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: index * 0.08,
            ease: 'back.out(1.4)',
            overwrite: true
          }
        )

        // Setup hover animations
        setupCardHover(card, index)
      })
    }, 50)

    return () => clearTimeout(timeout)
  }, [activeTab, properties.length])

  // Setup hover animations for a card
  const setupCardHover = (card: HTMLDivElement, index: number) => {
    const imageEl = card.querySelector('.card-image') as HTMLElement
    const overlayEl = card.querySelector('.card-overlay') as HTMLElement
    const arrowEl = card.querySelector('.card-arrow') as HTMLElement
    const detailsEl = card.querySelector('.card-details') as HTMLElement

    if (!imageEl) return

    // Remove old listeners by checking if already set up
    const hasListener = card.getAttribute('data-hover-setup')
    if (hasListener === 'true') return
    card.setAttribute('data-hover-setup', 'true')

    card.addEventListener('mouseenter', () => {
      // Kill existing hover timeline for this card
      const existingTl = hoverTimelines.current.get(index)
      if (existingTl) existingTl.kill()

      const tl = gsap.timeline()
      hoverTimelines.current.set(index, tl)

      tl.to(imageEl, { scale: 1.08, duration: 0.4, ease: 'power2.out' })
        .to(overlayEl, { opacity: 1, duration: 0.25 }, 0)
        .to(arrowEl, { opacity: 1, x: 0, duration: 0.25, ease: 'back.out(1.5)' }, 0.1)
        .to(detailsEl, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.15)
        .to(card, { 
          boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25)',
          borderColor: '#93c5fd',
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
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          borderColor: '#e2e8f0',
          duration: 0.3 
        }, 0)
    })
  }

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50/30 to-transparent" />
        <div className="absolute top-40 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          {/* Badge */}
          <div className="listing-badge inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Latest Properties
            </span>
          </div>

          {/* Title */}
          <h2 className="listing-title text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Premium{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Properties
              </span>
              <svg 
                className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 text-blue-200"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>{' '}
            in Noida
          </h2>

          <p className="listing-desc text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Discover handpicked premium properties in Noida's most desirable locations. 
            Each listing is verified for quality and value.
          </p>
        </div>

        {/* Filter Tabs */}
        <div 
          ref={tabsRef}
          className="flex justify-center mb-10 sm:mb-14"
        >
          <div className="relative inline-flex bg-slate-100 rounded-full p-1.5">
            {/* Animated tab indicator */}
            <div 
              className="absolute top-1.5 left-1.5 h-[calc(100%-12px)] bg-white rounded-full shadow-md transition-all duration-300 ease-out"
              style={{
                width: `calc(${100 / tabButtons.length}% - 8px)`,
                transform: `translateX(${tabButtons.findIndex(t => t.id === activeTab) * 100}%)`
              }}
            />
            
            {tabButtons.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative z-10 px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-full transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'text-slate-900'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <span className="hidden sm:inline mr-1.5">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
        >
          {properties.map((property) => (
            <div
              key={property.id}
              ref={(el) => setCardRef(property.id, el)}
              data-property-id={property.id}
              className="property-card group bg-white rounded-2xl border border-slate-200 overflow-hidden transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={property.image}
                  alt={property.title}
                  className="card-image w-full h-full object-cover transition-transform duration-500"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div className="card-overlay absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 transition-opacity duration-300" />

                {/* Top badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm ${
                    property.type === 'For Sell'
                      ? 'bg-emerald-500/90 text-white'
                      : 'bg-blue-500/90 text-white'
                  }`}>
                    {property.type}
                  </span>
                  
                  {property.verified && (
                    <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full" title="Verified Property">
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </div>

                {/* Featured badge */}
                {property.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-orange-400/90 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Featured
                    </span>
                  </div>
                )}

                {/* Category badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-slate-800 text-sm font-semibold rounded-lg shadow-sm">
                    {property.category}
                  </span>
                </div>

                {/* View property arrow */}
                <div className="card-arrow absolute bottom-4 right-4 opacity-0 translate-x-2">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Quick details overlay on hover */}
                <div className="card-details absolute bottom-20 left-4 right-4 opacity-0 translate-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
                      <span className="block text-xs text-white/80">Area</span>
                      <span className="text-sm font-bold text-white">{property.sqft}</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
                      <span className="block text-xs text-white/80">Beds</span>
                      <span className="text-sm font-bold text-white">{property.beds}</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
                      <span className="block text-xs text-white/80">Baths</span>
                      <span className="text-sm font-bold text-white">{property.baths}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 lg:p-6">
                {/* Price & Status */}
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    {property.price}
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs font-semibold">Available</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
                  {property.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-slate-500">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs sm:text-sm truncate">{property.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {properties.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Properties Found</h3>
            <p className="text-slate-500">No properties available in this category right now.</p>
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center mt-12 sm:mt-16">
          <a
            href="/properties"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-blue-600 hover:to-blue-700 text-white font-semibold text-sm sm:text-base rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5"
          >
            Browse All Properties
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}