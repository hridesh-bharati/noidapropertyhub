// app/properties/page.tsx
'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Link from 'next/link'
import { allProperties } from '../../data/properties'

// Navigation sectors - ONLY THESE 20
const navigationSectors = [
    'Sector 140A', 'Sector 4', 'Sector 57', 'Sector 58', 'Sector 59',
    'Sector 63', 'Sector 65', 'Sector 67', 'Sector 80', 'Sector 83',
    'Hosiery Complex', 'Phase 2', 'Sector 138', 'Sector 85', 'Sector 140',
    'Sector 155', 'Ecotech 3', 'Sector 8', 'Sector 6', 'Sector 5'
];

// Filter locations - SAME 20 SECTORS
const filterLocations = [
    'Sector 140A', 'Sector 4', 'Sector 57', 'Sector 58', 'Sector 59',
    'Sector 63', 'Sector 65', 'Sector 67', 'Sector 80', 'Sector 83',
    'Hosiery Complex', 'Phase 2', 'Sector 138', 'Sector 85', 'Sector 140',
    'Sector 155', 'Ecotech 3', 'Sector 8', 'Sector 6', 'Sector 5'
];

// All categories - FIXED order
const allCategories = ['All', 'Warehouse', 'Factory'];

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
    if (f.includes('office') || f.includes('commercial')) return 'bi bi-building-fill text-amber-500';
    if (f.includes('automation')) return 'bi bi-robot text-amber-500';
    if (f.includes('packaging')) return 'bi bi-box-seam-fill text-amber-500';
    if (f.includes('lab')) return 'bi bi-flask-fill text-amber-500';
    if (f.includes('metro') || f.includes('station')) return 'bi bi-train-front-fill text-amber-500';
    if (f.includes('airport')) return 'bi bi-airplane-fill text-amber-500';
    if (f.includes('lift') || f.includes('elevator')) return 'bi bi-elevator-fill text-amber-500';
    if (f.includes('water')) return 'bi bi-droplet-fill text-amber-500';
    if (f.includes('waste')) return 'bi bi-recycle-fill text-amber-500';
    if (f.includes('waiting')) return 'bi bi-sofa-fill text-amber-500';
    if (f.includes('visitor')) return 'bi bi-person-fill text-amber-500';
    if (f.includes('reserved')) return 'bi bi-car-front-fill text-amber-500';
    if (f.includes('internet') || f.includes('data')) return 'bi bi-wifi text-amber-500';
    if (f.includes('fire') || f.includes('safety')) return 'bi bi-fire text-amber-500';
    if (f.includes('conference') || f.includes('meeting')) return 'bi bi-people text-amber-500';
    return 'bi bi-check-circle-fill text-amber-500';
}

export default function AllPropertiesPage() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Filter states
    const [selectedLocations, setSelectedLocations] = useState<string[]>(['Noida'])
    const [budgetMin, setBudgetMin] = useState<string>('')
    const [budgetMax, setBudgetMax] = useState<string>('')
    const [sortBy, setSortBy] = useState<string>('Relevance')
    const [searchQuery, setSearchQuery] = useState('')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [categoryFilter, setCategoryFilter] = useState<string>('All')
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

    // Filtered properties - MUST be before any useEffect that uses it
    const filteredProperties = useMemo(() => {
        return allProperties.filter(property => {
            if (selectedLocations.length > 0 && !selectedLocations.some(loc =>
                property.location.includes(loc)
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
    }, [selectedLocations, searchQuery, categoryFilter, budgetMin, budgetMax])

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: false,
            offset: 50,
            delay: 0,
        })
    }, [])

    // Refresh AOS when filters or view mode change
    useEffect(() => {
        setTimeout(() => {
            AOS.refresh()
        }, 100)
    }, [filteredProperties, viewMode])

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
        setSortBy('Relevance')
        setSearchQuery('')
        setCategoryFilter('All')
    }

    const toggleMobileDrawer = (open: boolean) => {
        setIsMobileFilterOpen(open)
        document.body.style.overflow = open ? 'hidden' : ''
    }

    const scrollNavigation = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 250;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    const FiltersLayoutContent = () => (
        <>
            <div className="filter-title flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-950 flex items-center gap-2">
                    <i className="bi bi-sliders text-amber-500 text-base"></i>
                    Premium Filters
                </h2>
                <button
                    onClick={resetFilters}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
                >
                    Reset All
                </button>
            </div>

            <div className="filter-section mb-5" data-aos="fade-up" data-aos-delay="100">
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

            <div className="filter-section mb-5" data-aos="fade-up" data-aos-delay="200">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Space Configuration</label>
                <div className="grid grid-cols-2 gap-1.5">
                    {allCategories.map((cat, idx) => {
                        const isActive = categoryFilter === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                data-aos="zoom-in"
                                data-aos-delay={200 + idx * 50}
                                className={`filter-btn py-2 rounded-xl text-xs font-bold transition-all border ${isActive
                                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/20 border-transparent scale-105'
                                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:scale-105'
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

            <div className="filter-section mb-5" data-aos="fade-up" data-aos-delay="300">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Budget (₹ Cr)</label>
                <div className="grid grid-cols-2 gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={budgetMin}
                        onChange={(e) => setBudgetMin(e.target.value)}
                        className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-amber-500 transition-all hover:border-amber-300"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        value={budgetMax}
                        onChange={(e) => setBudgetMax(e.target.value)}
                        className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-amber-500 transition-all hover:border-amber-300"
                    />
                </div>
            </div>

            <div className="filter-section mb-5" data-aos="fade-up" data-aos-delay="400">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Target Locations</label>
                <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1">
                    {filterLocations.map((loc, idx) => (
                        <label
                            key={loc}
                            data-aos="fade-right"
                            data-aos-delay={400 + idx * 30}
                            className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 cursor-pointer hover:text-slate-900 transition-colors select-none group"
                        >
                            <input
                                type="checkbox"
                                checked={selectedLocations.includes(loc)}
                                onChange={() => toggleLocation(loc)}
                                className="w-3.5 h-3.5 rounded border-slate-300 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer group-hover:scale-110 transition-transform"
                            />
                            {loc}
                        </label>
                    ))}
                </div>
            </div>

            <div className="filter-section grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 mt-2" data-aos="fade-up" data-aos-delay="500">
                <button className="flex items-center justify-center gap-1.5 py-2.5 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-700 transition-all bg-white hover:shadow-md hover:scale-105">
                    <i className="bi bi-telephone-fill text-slate-500 text-xs"></i> Call Us
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md hover:scale-105">
                    <i className="bi bi-whatsapp text-sm"></i> Chat
                </button>
            </div>
        </>
    )

    return (
        <main className="bg-[#f8fafc] text-slate-800 antialiased overflow-x-hidden pb-12">

            {/* TOP HEADER WITH SECTORS */}
            <div
                className="w-full bg-white border-b border-slate-200 py-3 sticky top-0 z-40 shadow-sm"
                data-aos="fade-down"
                data-aos-duration="600"
            >
                <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold mb-3 tracking-wide select-none">
                        <Link href="/" className="hover:text-slate-700 transition-colors">Home</Link>
                        <span>|</span>
                        <Link href="/properties" className="hover:text-slate-700 transition-colors">Properties</Link>
                        <span>|</span>
                        <span className="text-slate-800 font-bold">All Properties</span>
                    </div>

                    <div className="relative flex items-center group/nav">
                        <button
                            onClick={() => scrollNavigation('left')}
                            className="absolute left-0 bg-white/95 border border-slate-200 rounded-full w-7 h-7 flex items-center justify-center shadow-md z-10 opacity-0 group-hover/nav:opacity-100 transition-opacity text-slate-600 hover:bg-slate-50"
                        >
                            <i className="bi bi-chevron-left text-xs"></i>
                        </button>

                        <div
                            ref={scrollContainerRef}
                            className="w-full flex items-center gap-2 overflow-x-auto scrollbar-none py-1 px-1"
                            style={{ scrollbarWidth: 'none' }}
                        >
                            {navigationSectors.map((sector, idx) => {
                                const sectorSlug = sector.toLowerCase().replace(/[^a-z0-9]/g, '-');
                                return (
                                    <Link
                                        key={idx}
                                        href={`/properties/noida/${sectorSlug}`}
                                        data-aos="zoom-in"
                                        data-aos-delay={idx * 50}
                                        data-aos-duration="400"
                                        className="shrink-0 px-4 py-1.5 bg-white border border-slate-200 hover:border-amber-500/50 hover:scale-105 rounded-full text-xs font-semibold text-slate-700 hover:text-amber-600 transition-all shadow-sm select-none"
                                    >
                                        {sector}
                                    </Link>
                                )
                            })}
                        </div>

                        <button
                            onClick={() => scrollNavigation('right')}
                            className="absolute right-0 bg-white/95 border border-slate-200 rounded-full w-7 h-7 flex items-center justify-center shadow-md z-10 opacity-0 group-hover/nav:opacity-100 transition-opacity text-slate-600 hover:bg-slate-50"
                        >
                            <i className="bi bi-chevron-right text-xs"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0 select-none">
                <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-amber-50/20 via-indigo-50/5 to-transparent" />
                <div className="absolute top-20 right-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.012)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            {/* Mobile Filter Drawer */}
            {isMobileFilterOpen && (
                <>
                    <div
                        onClick={() => toggleMobileDrawer(false)}
                        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 lg:hidden animate-fadeIn"
                    />
                    <div
                        className="fixed top-0 inset-x-0 bg-white z-50 rounded-b-[28px] border-b border-slate-200 p-6 shadow-2xl max-h-[85vh] overflow-y-auto lg:hidden animate-slideDown"
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
                </>
            )}

            <div className="relative max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10 flex flex-col lg:flex-row gap-8">

                {/* DESKTOP FILTER SIDEBAR */}
               <aside
    className="hidden lg:block w-[320px] shrink-0 bg-white border border-slate-200 rounded-[24px] p-5 shadow-sm self-start sticky top-36"
    data-aos="fade-right"
    data-aos-duration="800"
    data-aos-delay="200"
>
                    <FiltersLayoutContent />
                </aside>

                {/* MAIN CONTENT */}
                <div className="flex-1">

                    {/* Hero Section */}
                    <div
                        className="mb-10 text-center lg:text-left"
                        data-aos="fade-up"
                        data-aos-duration="800"
                    >
                        <div
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-full mb-4 shadow-md border border-amber-500/20"
                            data-aos="zoom-in"
                            data-aos-delay="200"
                            data-aos-duration="600"
                        >
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
                            </span>
                            <span className="text-[10px] font-black tracking-widest uppercase bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">GOLD PREMIUM</span>
                            <span className="w-px h-3 bg-white/20" />
                            <span className="text-[10px] font-bold text-slate-300">{allProperties.length} Premium Units</span>
                        </div>

                        <h1
                            className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-none"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            Industrial &amp;{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600">
                                Warehouse
                            </span>
                            <br className="hidden lg:block" />
                            <span className="text-xl sm:text-2xl font-bold text-slate-500">
                                Spaces For Rent in Noida
                            </span>
                        </h1>
                        <p
                            className="text-xs font-medium text-slate-500 mt-3 leading-relaxed"
                            data-aos="fade-up"
                            data-aos-delay="400"
                        >
                            Premium commercial and industrial spaces across prime Noida sectors including Sector 140A, Sector 67, Sector 83, Ecotech 3, and more.
                        </p>
                    </div>

                    {/* Results Bar */}
                    <div
                        className="results-bar bg-white border border-slate-200 rounded-2xl p-3.5 mb-6 flex items-center justify-between gap-4 shadow-sm"
                        data-aos="fade-down"
                        data-aos-delay="200"
                        data-aos-duration="600"
                    >
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                            <span className="font-black text-slate-950 bg-slate-100 px-2 py-0.5 rounded-md">{filteredProperties.length}</span>
                            <span>Listings Found</span>
                        </div>

                        <div className="flex items-center gap-2">
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
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                                >
                                    Grid
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                                >
                                    List
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Property Cards Grid */}
                    <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                        {filteredProperties.map((property, index) => (
                            <div
                                key={property.id}
                                className="property-card group relative bg-white rounded-[24px] border border-slate-200/90 overflow-hidden shadow-sm hover:border-amber-500/40 hover:shadow-xl transition-all duration-300"
                                data-aos="fade-up"
                                data-aos-delay={100 + (index % 6) * 100}
                                data-aos-duration="600"
                                data-aos-offset="50"
                            >
                                <div className="card-glow absolute -inset-20 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 z-0">
                                    <div className="w-full h-full bg-radial from-amber-500/10 via-transparent to-transparent blur-2xl rounded-full" />
                                </div>

                                <div className="relative overflow-hidden aspect-[4/3] bg-slate-100 border-b border-slate-100 z-10">
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="card-image w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                        loading="lazy"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/img/placeholder.jpg'
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-20">
                                        <span className="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md">
                                            {property.type}
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
                                                Featured
                                            </span>
                                        </div>
                                    )}

                                    <div className="absolute bottom-3 left-3 z-20">
                                        <span className="px-2.5 py-1 bg-slate-950/60 backdrop-blur-md text-white text-[10px] font-bold rounded-lg border border-white/10 flex items-center gap-1.5 shadow-sm">
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
                                                <span className="text-[10px] font-black text-amber-400">{property.features.length}</span>
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
                                        {property.features.slice(0, 3).map((feature, idx) => (
                                            <span key={idx} className="card-feature flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-slate-700 text-[10px] font-bold rounded-lg border border-slate-200/60 shadow-sm group-hover:border-amber-500/20 transition-colors">
                                                <i className={`${getFeatureIconClass(feature)} text-xs`}></i>
                                                {feature}
                                            </span>
                                        ))}
                                        {property.features.length > 3 && (
                                            <span className="card-feature px-2.5 py-1 bg-slate-50 text-slate-700 text-[10px] font-bold rounded-lg border border-slate-200/60">
                                                +{property.features.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    <Link
                                        href={`/properties/Noida/${property.location
                                            .split(',')[0].trim().toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`}
                                        className="w-full py-2.5 bg-slate-900 group-hover:bg-amber-500 text-white group-hover:text-slate-950 text-[11px] font-black uppercase tracking-wider rounded-xl transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 select-none mt-4"
                                    >
                                        View Details
                                        <i className="bi bi-arrow-right-short text-base flex group-hover:translate-x-1 transition-transform"></i>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProperties.length === 0 && (
                        <div
                            className="text-center py-16"
                            data-aos="fade-up"
                            data-aos-duration="600"
                        >
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-slate-800">No Properties Found</h3>
                            <p className="text-sm text-slate-500 mt-2">Try adjusting your filters or search terms</p>
                            <button
                                onClick={resetFilters}
                                className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-xl text-sm font-bold hover:bg-amber-600 transition-colors hover:scale-105"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}

                    <div
                        className="cta-section text-center mt-16"
                        data-aos="fade-up"
                        data-aos-delay="200"
                        data-aos-duration="800"
                    >
                        <Link
                            href="/contact"
                            className="cta-button group inline-flex items-center gap-2.5 px-8 py-4 bg-slate-950 hover:bg-amber-500 text-white hover:text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 border border-amber-500/30 hover:shadow-xl hover:scale-105"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Request On-Site Inspection
                                <i className="bi bi-chevron-right transform group-hover:translate-x-1 transition-transform"></i>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Custom Animations for Mobile Drawer */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideDown {
                    from { transform: translateY(-100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                .animate-slideDown {
                    animation: slideDown 0.4s ease-out;
                }
            `}</style>
        </main>
    )
}