'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

// Core Constants and Data structures configured outside component render cycle
const navigationSectors = [
    'Sector 140A', 'Sector -4', 'Sector 57', 'Sector 58', 'Sector 59',
    'Sector 63', 'Sector 65', 'Sector 67', 'Sector 80', 'Sector 83',
    'Hosiery complex', 'Phase 2', 'Sector 138', 'Sector 85', 'Sector 140',
    'Sector 155', 'Ecotech 3', 'Sector 8', 'Sector 6', 'Sector 5'
]

const locations = [
    'Sector-62 Noida',
    'Sector-63 Noida',
    'Film City Noida',
    'Sector-136 Noida',
    'Sector-2 Noida',
    'Sector-125 Noida',
    'Sector-3 Noida',
    'Sector-142 Noida',
]

interface Property {
    id: number
    image: string
    type: string
    category: string
    price: string
    title: string
    location: string
    sqft: string
    features: string[]
    featured?: boolean
    verified?: boolean
    availability: string
}

const allProperties: Property[] = [
    {
        id: 1,
        image: '/img/property-1.jpg',
        type: 'For Rent',
        category: 'Warehouse',
        price: '₹1.25 Lakh/mo',
        title: 'Premium Warehouse with Loading Dock',
        location: 'Sector 62, Noida',
        sqft: '15,000 Sqft',
        features: ['Loading Dock', '24/7 Security', 'Power Backup'],
        featured: true,
        verified: true,
        availability: 'Available Now'
    },
    {
        id: 2,
        image: '/img/property-2.jpg',
        type: 'For Rent',
        category: 'Factory',
        price: '₹2.8 Lakh/mo',
        title: 'Industrial Factory with Production Line',
        location: 'Sector 44, Noida',
        sqft: '25,000 Sqft',
        features: ['Production Line', 'Staff Quarters', 'Canteen'],
        featured: true,
        verified: true,
        availability: 'Available Now'
    },
    {
        id: 3,
        image: '/img/property-3.jpg',
        type: 'For Rent',
        category: 'Warehouse',
        price: '₹85,000/mo',
        title: 'Modern Warehouse with Cold Storage',
        location: 'Sector 18, Noida',
        sqft: '8,500 Sqft',
        features: ['Cold Storage', 'Security System', 'Loading Bay'],
        featured: false,
        verified: false,
        availability: 'Available from Next Month'
    },
    {
        id: 4,
        image: '/img/property-4.jpg',
        type: 'For Rent',
        category: 'Factory',
        price: '₹1.5 Lakh/mo',
        title: 'Light Manufacturing Factory Unit',
        location: 'Sector 50, Noida',
        sqft: '12,000 Sqft',
        features: ['Assembly Line', 'Office Space', 'Parking'],
        featured: false,
        verified: true,
        availability: 'Available Now'
    },
    {
        id: 5,
        image: '/img/property-5.jpg',
        type: 'For Rent',
        category: 'Warehouse',
        price: '₹2.2 Lakh/mo',
        title: 'Massive Distribution Warehouse',
        location: 'Sector 15A, Noida',
        sqft: '35,000 Sqft',
        features: ['Distribution Center', 'Fleet Parking', 'Office Block'],
        featured: true,
        verified: true,
        availability: 'Available Now'
    },
    {
        id: 6,
        image: '/img/property-6.jpg',
        type: 'For Rent',
        category: 'Factory',
        price: '₹3.5 Lakh/mo',
        title: 'Heavy Industrial Factory Complex',
        location: 'Sector 38, Noida',
        sqft: '45,000 Sqft',
        features: ['Heavy Machinery', 'Worker Facilities', 'Storage'],
        featured: false,
        verified: false,
        availability: 'Available from Next Quarter'
    },
    {
        id: 7,
        image: '/img/carousel-1.jpg',
        type: 'For Rent',
        category: 'Warehouse',
        price: '₹65,000/mo',
        title: 'Small Warehouse for Storage',
        location: 'Sector 3, Noida',
        sqft: '5,000 Sqft',
        features: ['Storage', 'Security', 'Loading Area'],
        featured: false,
        verified: true,
        availability: 'Available Now'
    },
    {
        id: 8,
        image: '/img/carousel-2.jpg',
        type: 'For Rent',
        category: 'Factory',
        price: '₹1.8 Lakh/mo',
        title: 'Food Processing Factory Unit',
        location: 'Sector 63, Noida',
        sqft: '18,000 Sqft',
        features: ['Processing Line', 'Cold Storage', 'Lab'],
        featured: true,
        verified: true,
        availability: 'Available Now'
    },
    {
        id: 9,
        image: '/img/about.jpg',
        type: 'For Rent',
        category: 'Warehouse',
        price: '₹95,000/mo',
        title: 'E-commerce Fulfillment Warehouse',
        location: 'Sector 136, Noida',
        sqft: '12,500 Sqft',
        features: ['Automation', 'Packaging Area', 'Office'],
        featured: false,
        verified: true,
        availability: 'Available Now'
    }
]

function getFeatureIconClass(feature: string): string {
    const f = feature.toLowerCase();
    if (f.includes('dock') || f.includes('bay')) return 'bi bi-truck-flatbed text-amber-500';
    if (f.includes('security')) return 'bi bi-shield-lock-fill text-amber-500';
    if (f.includes('backup') || f.includes('power')) return 'bi bi-lightning-charge-fill text-amber-500';
    if (f.includes('production') || f.includes('assembly') || f.includes('line')) return 'bi bi-cpu-fill text-amber-500';
    if (f.includes('quarter') || f.includes('worker') || f.includes('staff')) return 'bi bi-people-fill text-amber-500';
    if (f.includes('canteen') || f.includes('food')) return 'bi bi-cup-hot-fill text-amber-500';
    if (f.includes('cold') || f.includes('storage')) return 'bi bi-thermometer-snow text-amber-500';
    if (f.includes('parking') || f.includes('fleet')) return 'bi bi-p-circle-fill text-amber-500';
    if (f.includes('office')) return 'bi bi-building-fill text-amber-500';
    return 'bi bi-check-circle-fill text-amber-500';
}

export default function AllPropertiesPage() {
    const pageRef = useRef<HTMLDivElement>(null)
    const sidebarRef = useRef<HTMLDivElement>(null)
    const mobileDrawerRef = useRef<HTMLDivElement>(null)
    const mobileOverlayRef = useRef<HTMLDivElement>(null)
    const mainContentRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)
    const heroRef = useRef<HTMLDivElement>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Filter states
    const [selectedLocations, setSelectedLocations] = useState<string[]>(['Noida'])
    const [budgetMin, setBudgetMin] = useState<string>('')
    const [budgetMax, setBudgetMax] = useState<string>('')
    const [areaMin, setAreaMin] = useState<string>('')
    const [areaMax, setAreaMax] = useState<string>('')
    const [sortBy, setSortBy] = useState<string>('Relevance')
    const [searchQuery, setSearchQuery] = useState('')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [categoryFilter, setCategoryFilter] = useState<string>('All')
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

    // Filtered properties
    const filteredProperties = allProperties.filter(property => {
        if (selectedLocations.length > 0 && !selectedLocations.some(loc =>
            property.location.includes(loc.replace('Sector-', 'Sector '))
        )) {
            return false
        }

        if (searchQuery && !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !property.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !property.category.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false
        }

        if (categoryFilter !== 'All' && property.category !== categoryFilter) {
            return false
        }

        if (budgetMin || budgetMax) {
            const priceNum = parseInt(property.price.replace(/[^0-9]/g, ''))
            if (budgetMin && priceNum < parseInt(budgetMin)) return false
            if (budgetMax && priceNum > parseInt(budgetMax)) return false
        }

        return true
    })

    const toggleLocation = (location: string) => {
        if (location === 'Noida') {
            setSelectedLocations(['Noida'])
            return
        }
        setSelectedLocations(prev => {
            const newLocations = prev.includes(location)
                ? prev.filter(l => l !== location)
                : [...prev.filter(l => l !== 'Noida'), location]
            return newLocations.length === 0 ? ['Noida'] : newLocations
        })
    }

    const resetFilters = () => {
        setSelectedLocations(['Noida'])
        setBudgetMin('')
        setBudgetMax('')
        setAreaMin('')
        setAreaMax('')
        setSortBy('Relevance')
        setSearchQuery('')
        setCategoryFilter('All')
    }

    // GSAP Mobile Drawer Trigger Control Fix
    const toggleMobileDrawer = (open: boolean) => {
        if (open) {
            setIsMobileFilterOpen(true)
            document.body.style.overflow = 'hidden'
            gsap.killTweensOf([mobileDrawerRef.current, mobileOverlayRef.current])

            // Reset positioning before entry animation
            gsap.set(mobileOverlayRef.current, { display: 'block', opacity: 0 })
            gsap.set(mobileDrawerRef.current, { display: 'block', y: '-100%', opacity: 0 })

            gsap.to(mobileOverlayRef.current, { opacity: 1, duration: 0.3 })
            gsap.to(mobileDrawerRef.current, {
                y: '0%',
                opacity: 1,
                duration: 0.4,
                ease: 'power3.out'
            })
        } else {
            gsap.killTweensOf([mobileDrawerRef.current, mobileOverlayRef.current])
            gsap.to(mobileDrawerRef.current, {
                y: '-100%',
                opacity: 0,
                duration: 0.3,
                ease: 'power3.in'
            })
            gsap.to(mobileOverlayRef.current, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    setIsMobileFilterOpen(false)
                    if (mobileOverlayRef.current) mobileOverlayRef.current.style.display = 'none';
                    if (mobileDrawerRef.current) mobileDrawerRef.current.style.display = 'none';
                    document.body.style.overflow = ''
                }
            })
        }
    }

    // Navigation scroll triggers
    const scrollNavigation = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 250;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            // Hero Parallax
            gsap.to(heroRef.current, {
                y: 50,
                scale: 0.98,
                opacity: 0.8,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                }
            })

            // Hero Badge Animation
            gsap.fromTo('.hero-badge',
                { opacity: 0, y: -30, scale: 0.8, rotationX: -10 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotationX: 0,
                    duration: 0.8,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )

            // Hero Title Animation
            const titleChars = document.querySelectorAll('.hero-title-char')
            gsap.fromTo(titleChars,
                { opacity: 0, y: 50, rotationX: -15, filter: 'blur(4px)' },
                {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    filter: 'blur(0px)',
                    duration: 0.6,
                    stagger: 0.04,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )

            // Sidebar Desktop Animation
            gsap.fromTo('.filter-sidebar',
                { opacity: 0, x: -50, rotationY: -8 },
                {
                    opacity: 1,
                    x: 0,
                    rotationY: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sidebarRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )

            // Property Cards Base Scroll Setup
            gsap.fromTo('.property-card',
                { opacity: 0, y: 60, scale: 0.95, rotationX: 4 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotationX: 0,
                    duration: 0.8,
                    stagger: { amount: 0.5, from: 'start', grid: 'auto' },
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )
        }, pageRef)

        return () => {
            ctx.revert()
            ScrollTrigger.getAll().forEach(t => t.kill())
            document.body.style.overflow = ''
        }
    }, [])

    const splitText = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className="hero-title-char inline-block">
                {char === ' ' ? '\u00A0' : char}
            </span>
        ))
    }

    const FiltersLayoutContent = () => (
        <>
            <div className="filter-title flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-950 flex items-center gap-2">
                    <i className="bi bi-sliders text-amber-500 text-base"></i>
                    Premium Filters
                </h2>
                <button onClick={resetFilters} className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors">
                    Reset All
                </button>
            </div>

            {/* Search Box */}
            <div className="filter-section mb-5">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Search Spaces</label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Keywords (e.g. Cold storage, Dock)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 pl-9 text-xs font-medium focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-slate-400"
                    />
                    <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                </div>
            </div>

            {/* Category Filter Fix for Gradient visibility and active text hides */}
            <div className="filter-section mb-5">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Space Configuration</label>
                <div className="grid grid-cols-3 gap-1.5">
                    {['All', 'Warehouse', 'Factory'].map(cat => {
                        const isActive = categoryFilter === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                className={`filter-btn py-2 rounded-xl text-xs font-bold transition-all border ${isActive
                                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/20 border-transparent'
                                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                    }`}
                            >
                                <span className={`block text-[10px] tracking-wide ${isActive ? 'text-white font-black' : 'text-slate-600'}`}>
                                    {cat}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Budget Range */}
            <div className="filter-section mb-5">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Monthly Budget (₹ Lakh)</label>
                <div className="grid grid-cols-2 gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={budgetMin}
                        onChange={(e) => setBudgetMin(e.target.value)}
                        className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-amber-500"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        value={budgetMax}
                        onChange={(e) => setBudgetMax(e.target.value)}
                        className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-amber-500"
                    />
                </div>
            </div>

            {/* Target Locations Checklist */}
            <div className="filter-section mb-5">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Target Locations</label>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                    {locations.map(loc => (
                        <label key={loc} className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 cursor-pointer hover:text-slate-900 transition-colors select-none">
                            <input
                                type="checkbox"
                                checked={selectedLocations.includes(loc)}
                                onChange={() => toggleLocation(loc)}
                                className="w-3.5 h-3.5 rounded border-slate-300 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                            />
                            {loc}
                        </label>
                    ))}
                </div>
            </div>

            {/* Premium Native Utility Handles */}
            <div className="filter-section grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 mt-2">
                <button className="flex items-center justify-center gap-1.5 py-2.5 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-700 transition-colors bg-white">
                    <i className="bi bi-telephone-fill text-slate-500 text-xs"></i> Call Us
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm">
                    <i className="bi bi-whatsapp text-sm"></i> Chat
                </button>
            </div>
        </>
    )

    return (
        <main ref={pageRef} className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased overflow-x-hidden pb-12">

            {/* ================= TOP LEVEL HORIZONTAL BREADCRUMB & SCROLLABLE SECTORS ================= */}
            <div className="w-full bg-white border-b border-slate-200 py-3 sticky top-0 z-40 shadow-2xs">
                <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs string row view */}
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold mb-3 tracking-wide select-none">
                        <Link href="/" className="hover:text-slate-700 transition-colors">Home</Link>
                        <span>|</span>
                        <Link href="/office-for-rent" className="hover:text-slate-700 transition-colors">Office for Rent</Link>
                        <span>|</span>
                        <Link href="/noida" className="hover:text-slate-700 transition-colors">Noida</Link>
                        <span>|</span>
                        <Link href="/noida/sector-63" className="hover:text-slate-700 transition-colors">Sector-63 Noida</Link>
                        <span>|</span>
                        <span className="text-slate-800 font-bold">ServSpaces 63</span>
                    </div>

                    {/* Horizontal Scroller Container Framework Wrapper */}
                    <div className="relative flex items-center group/nav">
                        {/* Left Arrow Handler Navigation */}
                        <button
                            onClick={() => scrollNavigation('left')}
                            className="absolute left-0 bg-white/95 border border-slate-200 rounded-full w-7 h-7 flex items-center justify-center shadow-md z-10 opacity-0 group-hover/nav:opacity-100 transition-opacity text-slate-600 hover:bg-slate-50"
                        >
                            <i className="bi bi-chevron-left text-xs"></i>
                        </button>

                        {/* Middle Scroll Layer Map Area */}
                        <div
                            ref={scrollContainerRef}
                            className="w-full flex items-center gap-2 overflow-x-auto scrollbar-none py-1 px-1 mask-image-horizontal"
                            style={{ scrollbarWidth: 'none' }}
                        >
                            {navigationSectors.map((sector, idx) => {
                                const sectorSlug = sector.toLowerCase().replace(/[^a-z0-9]/g, '-');
                                return (
                                    <Link
                                        key={idx}
                                        href={`/property/noida/${sectorSlug}`}
                                        className="shrink-0 px-4 py-1.5 bg-white border border-slate-200 hover:border-amber-500/50 rounded-full text-xs font-semibold text-slate-700 hover:text-amber-600 transition-all shadow-2xs select-none"
                                    >
                                        {sector}
                                    </Link>
                                )
                            })}
                        </div>

                        {/* Right Arrow Handler Navigation */}
                        <button
                            onClick={() => scrollNavigation('right')}
                            className="absolute right-0 bg-white/95 border border-slate-200 rounded-full w-7 h-7 flex items-center justify-center shadow-md z-10 opacity-0 group-hover/nav:opacity-100 transition-opacity text-slate-600 hover:bg-slate-50"
                        >
                            <i className="bi bi-chevron-right text-xs"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Background Grid Canvas Elements */}
            <div className="fixed inset-0 pointer-events-none z-0 select-none">
                <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-amber-50/20 via-indigo-50/5 to-transparent" />
                <div className="absolute top-20 right-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.012)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            {/* GSAP MOBILE DRAWER SCREEN OVERLAY CONTAINER (Fixed classes and display state) */}
            <div
                ref={mobileOverlayRef}
                onClick={() => toggleMobileDrawer(false)}
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 hidden opacity-0 lg:hidden"
            />
            <div
                ref={mobileDrawerRef}
                className="fixed top-0 inset-x-0 bg-white z-50 rounded-b-[28px] border-b border-slate-200 p-6 shadow-2xl max-h-[85vh] overflow-y-auto transform -translate-y-100% opacity-0 hidden lg:hidden"
            >
                <div className="flex justify-end mb-2">
                    <button
                        onClick={() => toggleMobileDrawer(false)}
                        className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
                    >
                        <i className="bi bi-x-lg text-xs"></i>
                    </button>
                </div>
                <FiltersLayoutContent />
            </div>

            <div className="relative max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10 flex flex-col lg:flex-row gap-8">

                {/* DESKTOP FILTER SIDEBAR */}
                <aside ref={sidebarRef} className="hidden lg:block w-[320px] shrink-0 bg-white border border-slate-200 rounded-[24px] p-5 shadow-xs self-start sticky top-36">
                    <FiltersLayoutContent />
                </aside>

                {/* INDUSTRIAL PORTFOLIO GRID MATRIX REGION */}
                <div ref={mainContentRef} className="flex-1">

                    {/* Header Setup */}
                    <div ref={heroRef} className="mb-10 text-center lg:text-left">
                        <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-full mb-4 shadow-md border border-amber-500/20">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
                            </span>
                            <span className="text-[10px] font-black tracking-widest uppercase bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">GOLD PREMIUM</span>
                            <span className="w-px h-3 bg-white/20" />
                            <span className="text-[10px] font-bold text-slate-300">{allProperties.length} Premium Units</span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-none">
                            Industrial &amp;{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600">
                                {splitText('Warehouse')}
                            </span>
                            <br className="hidden lg:block" />
                            <span className="text-xl sm:text-2xl font-bold text-slate-500">
                                {splitText(' Spaces For Rent in Noida')}
                            </span>
                        </h1>
                        <p className="hero-desc text-xs font-medium text-slate-500 mt-3 leading-relaxed">
                            Find customized institutional-grade setups engineered for optimal workflow efficiency, logistical operations, and heavy machinery layouts.
                        </p>
                    </div>

                    {/* Action Filters Context Bar */}
                    <div className="results-bar bg-white border border-slate-200 rounded-2xl p-3.5 mb-6 flex items-center justify-between gap-4 shadow-xs">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                            <span className="font-black text-slate-950 bg-slate-100 px-2 py-0.5 rounded-md">{filteredProperties.length}</span>
                            <span>Listings Found</span>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* FLOATING MOBILE FILTER SWITCH ACTION */}
                            <button
                                onClick={() => toggleMobileDrawer(true)}
                                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 text-white rounded-xl text-xs font-bold shadow-md hover:bg-slate-900 transition-all border border-amber-500/30"
                            >
                                <i className="bi bi-sliders text-amber-400"></i> Filters
                            </button>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-[11px] font-bold text-slate-700 focus:outline-none"
                            >
                                <option>Relevance</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>

                            <div className="hidden sm:flex border border-slate-200 rounded-xl p-0.5 bg-slate-50">
                                <button onClick={() => setViewMode('grid')} className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400'}`}>Grid</button>
                                <button onClick={() => setViewMode('list')} className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400'}`}>List</button>
                            </div>
                        </div>
                    </div>

                    {/* CORE PROPERTY CARDS MATRIX GRID RENDERING */}
                    <div ref={gridRef} className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                        {filteredProperties.map((property) => (
                            <div
                                key={property.id}
                                className="property-card group relative bg-white rounded-[24px] border border-slate-200/90 overflow-hidden shadow-xs hover:border-amber-500/40 transition-all duration-300"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <div className="card-glow absolute -inset-20 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 z-0">
                                    <div className="w-full h-full bg-radial from-amber-500/10 via-transparent to-transparent blur-2xl rounded-full" />
                                </div>

                                <div className="relative overflow-hidden aspect-[4/3] bg-slate-100 border-b border-slate-100 z-10">
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="card-image w-full h-full object-cover transition-transform duration-700 ease-out"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-20">
                                        <span className="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md">
                                            Lease
                                        </span>
                                        {property.verified && (
                                            <span className="p-1 bg-white/95 text-amber-600 rounded-lg shadow-sm border border-slate-100" title="Verified Setup">
                                                <i className="bi bi-patch-check-fill text-xs flex"></i>
                                            </span>
                                        )}
                                    </div>

                                    {property.featured && (
                                        <div className="absolute top-3.5 right-3.5 z-20">
                                            <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-amber-400 text-[9px] font-black uppercase tracking-wider rounded-lg flex items-center gap-1.5 border border-amber-500/30 shadow-lg">
                                                <i className="bi bi-star-fill text-[9px] text-amber-400 animate-pulse"></i>
                                                Top Rated
                                            </span>
                                        </div>
                                    )}

                                    <div className="absolute bottom-3 left-3 z-20">
                                        <span className="px-2.5 py-1 bg-slate-950/60 backdrop-blur-md text-white text-[10px] font-bold rounded-lg border border-white/10 flex items-center gap-1.5 shadow-sm">
                                            <svg className="w-3 h-3 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                {getCategoryIcon(property.category)}
                                            </svg>
                                            {property.category}
                                        </span>
                                    </div>

                                    <div className="card-details absolute bottom-3 right-3 left-3 z-20 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        <div className="grid grid-cols-3 gap-1.5">
                                            <div className="bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-xl p-1.5 text-center">
                                                <span className="block text-[7px] text-slate-400 uppercase tracking-widest font-bold">Space</span>
                                                <span className="text-[10px] font-black text-white">{property.sqft}</span>
                                            </div>
                                            <div className="bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-xl p-1.5 text-center">
                                                <span className="block text-[7px] text-slate-400 uppercase tracking-widest font-bold">Amenities</span>
                                                <span className="text-[10px] font-black text-amber-400">{property.features.length} Tech</span>
                                            </div>
                                            <div className="bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-xl p-1.5 text-center">
                                                <span className="block text-[7px] text-slate-400 uppercase tracking-widest font-bold">Status</span>
                                                <span className="text-[10px] font-black text-emerald-400">Ready</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 relative z-10 bg-white">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[9px] font-extrabold text-amber-700 bg-amber-50 border border-amber-200/40 px-2 py-0.5 rounded-md uppercase tracking-wider">
                                            {property.availability}
                                        </span>
                                        <div className="card-price text-base font-black text-slate-950 tracking-tight">
                                            {property.price}
                                        </div>
                                    </div>

                                    <h3 className="card-title text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-amber-600 transition-colors duration-200 mb-2">
                                        {property.title}
                                    </h3>

                                    <div className="card-location flex items-center gap-1 text-slate-400 border-t border-slate-50 pt-2.5 mb-3">
                                        <i className="bi bi-geo-alt-fill text-amber-500 text-xs"></i>
                                        <span className="text-[11px] font-semibold text-slate-500 truncate">{property.location}</span>
                                    </div>

                                    <div className="mt-2.5 flex flex-wrap gap-1">
                                        {property.features.map((feature, idx) => (
                                            <span key={idx} className="card-feature flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-slate-700 text-[10px] font-bold rounded-lg border border-slate-200/60 shadow-2xs group-hover:border-amber-500/20 transition-colors">
                                                <i className={`${getFeatureIconClass(feature)} text-xs`}></i>
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                    <Link
                                        href={`/properties/${property.id}`}
                                        className="w-full py-2.5 bg-slate-900 group-hover:bg-amber-500 text-white group-hover:text-slate-950 text-[11px] font-black uppercase tracking-wider rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 select-none mt-4">
                                        View Details
                                        <i className="bi bi-arrow-right-short text-base flex"></i>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cta-section text-center mt-16">
                        <Link
                            href="/contact"
                            className="cta-button group inline-flex items-center gap-2.5 px-8 py-4 bg-slate-950 hover:bg-amber-500 text-white hover:text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 border border-amber-500/30"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Request On-Site Inspection
                                <i className="bi bi-chevron-right transform group-hover:translate-x-1 transition-transform"></i>
                            </span>
                        </Link>
                    </div>

                </div>

            </div>
        </main>
    )
}

function getCategoryIcon(category: string) {
    switch (category) {
        case 'Warehouse':
            return (
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.456c.108 0 .22-.045.285-.141a.49.49 0 0 0 .044-.454l-1.442-5.11a.49.49 0 0 0-.47-.36H11.54a.49.49 0 0 0-.47.36l-1.442 5.11a.49.49 0 0 0 .044.454c.065.096.177.141.285.141H12.75zm0 0H3.75m0 0h4.5V12m0 0h3.181a.49.49 0 0 0 .47-.36l1.15-4.08a.49.49 0 0 0-.47-.635H8.25V12z" />
            );
        case 'Factory':
            return (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.827m11.479-8.238l1.15-.827M8.14 21.27l.707-1.03m9.243-6.472l.707-1.03M12 22.5v-1.5m0-18V3m-3.265 1.053l-.513 1.41m9.53 3.422l-.513 1.41m-7.075 5.568l-.827 1.15m6.472-9.243l-.827 1.15M10.27 15.14l-1.03.707m6.472-9.243l-1.03.707" />
            );
        default:
            return (
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18v18H3V3z" />
            );
    }
}