// app/properties/Noida/[sector]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Link from 'next/link';
import {
    Building2, MapPin, PhoneCall, ShieldCheck, MessageCircle,
    Waves, Trash2, Zap, CarFront, ChevronRight, Heart, Share2,
    Layers3, LayoutGrid, MoveDiagonal2, Car, Train, Plane, Trees,
    ArrowRight
} from 'lucide-react'
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { allProperties, allSectors } from '@/data/properties'

export default function SectorPropertyPage() {
    const params = useParams()
    const sectorSlug = params.sector as string

    const mainRef = useRef<HTMLDivElement>(null)
    const [property, setProperty] = useState<any>(null)
    const [sectorName, setSectorName] = useState('')

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic',
        })
    }, [])

    useEffect(() => {
        if (sectorSlug) {
            // 1. Normalize the incoming slug (e.g., "sector67-noida" -> "sector67")
            const normalizedSlug = sectorSlug
                .toLowerCase()
                .replace(/-noida$/i, '')          // Strip trailing "-noida"
                .replace(/[^a-z0-9]/g, '');       // Remove spaces and hyphens

            // 2. Generate a clean display name for the fallback UI
            const numericMatch = sectorSlug.match(/\d+/);
            let displaySector = sectorSlug
                .replace(/-noida$/i, '')
                .split('-')
                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ');

            if (numericMatch && !displaySector.includes(' ')) {
                // Handles turning "sector67" into "Sector 67"
                displaySector = displaySector.replace(numericMatch[0], ` ${numericMatch[0]}`);
            }
            setSectorName(displaySector);

            // 3. Robust filtering using normalized string comparisons
            const sectorProperties = allProperties.filter(p => {
                const normalizedLocation = p.location.toLowerCase().replace(/[^a-z0-9]/g, '');
                return normalizedLocation.includes(normalizedSlug);
            });

            if (sectorProperties.length > 0) {
                setProperty(sectorProperties[0]);
            } else {
                setProperty(null); // Clear state if no match is found
            }
        }
    }, [sectorSlug]);

    const handleShare = async () => {
    const shareData = {
        title: property?.title || 'Premium Property in Noida',
        text: `Check out this property: ${property?.title} in ${sectorName}`,
        url: window.location.href, // Yeh automatically current page ka URL utha lega
    };

    // Check agar browser native mobile sharing support karta hai (Web Share API)
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        try {
            await navigator.share(shareData);
            console.log('Successfully shared');
        } catch (error) {
            console.log('Error sharing:', error);
        }
    } else {
        // Fallback: Agar browser support nahi karta (jaise Desktop PC), toh link copy ho jayega
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('Property link copied to clipboard!'); 
            // Aap alert ki jagah apna custom Toast Notification bhi use kar sakte hain
        } catch (err) {
            console.error('Failed to copy link: ', err);
        }
    }
};


    if (!property) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen pt-20 bg-[#F5F0E8] flex items-center justify-center">
                    <div className="text-center">
                        <Building2 className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-[#1E1B17]">No Property Found</h2>
                        <p className="text-[#5A4A3A] mt-2">No properties available for {sectorName || sectorSlug}</p>
                    </div>
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div ref={mainRef} className="min-h-screen pt-16  bg-[#F5F0E8] text-[#1E1B17] font-sans antialiased selection:bg-amber-600 selection:text-white bg-[radial-gradient(ellipse_at_top_left,_#FFF5E6_0%,_#F5E6D3_100%)]">
                <main className="max-w-full mx-auto px-4 sm:px-6 py-6" >

                    {/* BREADCRUMBS */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/30">
                        <div className="flex items-center space-x-2 text-xs font-medium text-[#5A4A3A]">
                            <Link href="/" className="hover:text-[#B8860B] transition-colors">Home</Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link href="/properties" className="hover:text-[#B8860B] transition-colors">Noida Properties</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-[#1E1B17] font-semibold bg-white/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/40 shadow-lg">Sector 67 Warehouse</span>
                        </div>
                        <div className="flex items-center space-x-3 text-[#5A4A3A] text-xs">
                            <button className="flex items-center space-x-1 hover:text-red-600 bg-white/60 backdrop-blur-md px-3 py-2 rounded-full border border-white/40 shadow-lg hover:shadow-red-100/50 transition-all duration-300">
                                <Heart className="w-3.5 h-3.5" /> <span>Save</span>
                            </button>
                          {/* Purane button ko isse replace karein */}
<button 
    onClick={handleShare}
    className="flex items-center space-x-1 hover:text-blue-600 bg-white/60 backdrop-blur-md px-3 py-2 rounded-full border border-white/40 shadow-lg hover:shadow-blue-100/50 transition-all duration-300"
>
    <Share2 className="w-3.5 h-3.5" /> <span>Share</span>
</button>
                        </div>
                    </div>

                    {/* 2-COLUMN STRUCTURE */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                        {/* LEFT MAIN AREA */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* PROPERTY HEADER */}
                            <div data-aos="fade-up" data-aos-delay="100" className="relative bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl p-6 md:p-8 overflow-hidden">
                                <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-amber-500 via-red-500 to-amber-700 opacity-30" />
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-2xl" />

                                <div className="relative z-10">
                                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-600 to-red-600 text-white text-xs font-semibold shadow-lg">
                                                    {property.type}
                                                </span>
                                                <span className="px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/60 text-slate-700 text-xs font-medium shadow-sm">
                                                    {property.category}
                                                </span>
                                            </div>

                                            <h1 className="mt-5 text-2xl md:text-3xl font-bold text-[#1E1B17] leading-tight max-w-5xl bg-gradient-to-r from-[#1E1B17] to-[#B8860B] bg-clip-text text-transparent">
                                                {property.title}
                                            </h1>

                                            <div className="flex items-center mt-3">
                                                <MapPin className="w-4 h-4 mr-2 text-red-600" />
                                                <span className='text-[#4A3F35] font-medium'>{property.location}</span>
                                            </div>

                                            <div className="mt-6">
                                                <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-amber-700 to-red-600 bg-clip-text text-transparent">
                                                    {property.price}
                                                </h2>
                                            </div>
                                        </div>

                                        <div className="shrink-0">
                                            <button className="group bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 transition-all duration-300 px-8 py-4 rounded-2xl text-white font-semibold shadow-xl shadow-amber-500/30 transform hover:-translate-y-0.5">
                                                Enquire Now
                                                <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {[
                                            {
                                                label: "Built-up Area",
                                                value: property.sqft,
                                                icon: "bi bi-layers-half",
                                                gradient: "from-red-600 via-orange-500 to-amber-500 shadow-orange-500/20"
                                            },
                                            {
                                                label: "Typical Floor",
                                                value: property.typicalFloor || property.sqft,
                                                icon: "bi bi-grid-3x3-gap-fill",
                                                gradient: "from-emerald-500 via-teal-500 to-blue-600 shadow-emerald-500/20"
                                            },
                                            {
                                                label: "Certification",
                                                value: property.certification || "On Request",
                                                icon: "bi bi-shield-check",
                                                gradient: "from-purple-600 via-indigo-500 to-blue-500 shadow-purple-500/20"
                                            },
                                        ].map((item, index) => (
                                            <div
                                                key={index}
                                                data-aos="zoom-in"
                                                data-aos-delay={100 + (index * 100)}
                                                className={`group relative p-0 rounded-[32px] bg-gradient-to-br ${item.gradient} border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden aspect-[4/3] flex flex-col justify-between`}
                                            >
                                                {/* Tia sáng chạy chéo khi hover */}
                                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

                                                {/* Top Body */}
                                                <div className="p-6 flex flex-col items-center justify-center flex-1">
                                                    <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-2">
                                                        <i className={`${item.icon} text-2xl`}></i>
                                                    </div>
                                                    <p className="text-[11px] uppercase tracking-[2px] text-white/90 font-black text-center">
                                                        {item.label}
                                                    </p>
                                                </div>

                                                {/* Bottom Frosted Glass Area */}
                                                <div className="w-full bg-slate-950/45 backdrop-blur-md border-t border-white/10 px-6 py-5 text-center rounded-b-[32px]">
                                                    <p className="text-[10px] uppercase tracking-wider text-white/60 font-bold mb-0.5">
                                                        {item.label}
                                                    </p>
                                                    <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                                                        {item.value}
                                                    </h4>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>

                            {/* IMAGE GALLERY */}
                            <div data-aos="fade-up" data-aos-delay="200" className="space-y-3">
                                <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden bg-gradient-to-br from-amber-200 to-amber-300 border border-white/40 shadow-2xl group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                                        <Building2 className="w-16 h-16 text-[#5A4A3A]/60 mb-3" />
                                        <span className="text-sm font-extrabold text-[#3A3028] bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                                            [{property.category} - {sectorName}]
                                        </span>
                                    </div>
                                    <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-white/20">
                                        {sectorName} Property
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {['Floor Area', 'Loading Zone', 'Access Road'].map((label, i) => (
                                        <div key={i} className="h-24 sm:h-32 bg-gradient-to-br from-amber-100 to-amber-200 border border-white/40 rounded-2xl flex items-center justify-center p-2 text-center text-[10px] font-bold text-[#4A3F35] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                                            <span className="bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">[ {label} ]</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* DESCRIPTION */}
                            <div data-aos="fade-right" data-aos-delay="300" className="relative bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl p-6 md:p-8 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 to-red-50/30" />
                                <div className="relative z-10">
                                    <h3 className="text-base font-bold text-[#0F172A] flex items-center space-x-3">
                                        <span className="w-1 h-6 bg-gradient-to-b from-amber-500 to-red-500 rounded-full" />
                                        <span>Property Description</span>
                                    </h3>
                                    <div className="text-sm text-[#4A3F35] leading-relaxed space-y-3 mt-4">
                                        <p className="backdrop-blur-sm p-4 rounded-xl border border-white/30">
                                            {property.description || `A premium ${property.category?.toLowerCase()} space available for ${property.type?.toLowerCase()} in ${sectorName}, Noida. This well-maintained property offers ${property.sqft} of built-up area with modern amenities and excellent connectivity. Perfect for businesses seeking quality industrial/commercial space in Noida's prime location.`}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* SPECIFICATIONS */}
                            <div data-aos="fade-up" data-aos-delay="100" className="relative bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl p-6 md:p-8 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 to-red-50/20" />
                                <div className="relative z-10">
                                    <div className="mb-8">
                                        <p className="uppercase tracking-[4px] text-xs font-semibold text-[#8A7A6A]">At A Glance</p>
                                        <h2 className="text-3xl font-bold text-[#1E1B17] mt-2 bg-gradient-to-r from-[#1E1B17] to-[#B8860B] bg-clip-text text-transparent">Specifications</h2>
                                    </div>

                                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {[
                                            { label: "Built-up Area", value: property.sqft, icon: "bi bi-layers-half" },
                                            { label: "Typical Floor", value: property.typicalFloor || property.sqft, icon: "bi bi-grid-3x3-gap-fill" },
                                            { label: "Certification", value: property.certification || "On Request", icon: "bi bi-shield-check" },
                                        ].map((item, index) => (
                                            <div
                                                key={index}
                                                data-aos="zoom-in"
                                                data-aos-delay={100 + (index * 100)}
                                                className="group relative p-6 rounded-4xl bg-gradient-to-br from-white via-white to-amber-50/40 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
                                            >
                                                <div className="absolute   top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 via-red-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-amber-500/5 to-red-500/5 rounded-full blur-xl pointer-events-none" />
                                                <div className="relative z-10">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-red-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                                                            <i className={`${item.icon} text-base`}></i>
                                                        </div>

                                                        <p className="uppercase tracking-[2px] text-[10px] text-[#8A7A6A] font-black">
                                                            {item.label}
                                                        </p>
                                                    </div>

                                                    {/* Value Chữ to đậm chất Premium */}
                                                    <h4 className="text-2xl font-black text-[#1E1B17] tracking-tight bg-gradient-to-r from-[#1E1B17] via-[#2A241E] to-amber-800 bg-clip-text group-hover:text-transparent transition-all duration-300">
                                                        {item.value}
                                                    </h4>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* AMENITIES */}
                            <div data-aos="fade-up" data-aos-delay="200" className="relative bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl p-6 md:p-8 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 to-amber-50/20" />
                                <div className="relative z-10">
                                    <h2 className="text-3xl font-bold text-[#1E1B17] mb-8 bg-gradient-to-r from-[#1E1B17] to-[#B8860B] bg-clip-text text-transparent">Amenities</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {(property.features || []).map((feature: string, index: number) => (
                                            <div key={index} data-aos="flip-left" data-aos-delay={100 + (index * 80)} className="group flex items-center gap-3 p-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/30 hover:bg-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                                                <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                                <span className="text-[#1E1B17] font-medium text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* CONTACT CTA */}
                            <div data-aos="fade-up" data-aos-delay="300" className="relative bg-gradient-to-br from-amber-500/20 via-red-500/10 to-amber-400/20 backdrop-blur-2xl border border-white/40 rounded-3xl p-6 md:p-8 mt-8 overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 to-red-500/5" />
                                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                    <div>
                                        <h3 className="text-3xl font-bold text-[#1E1B17] bg-gradient-to-r from-[#1E1B17] to-[#8B6914] bg-clip-text text-transparent">Interested in this property?</h3>
                                        <p className="text-[#4A3F35] mt-3 text-lg bg-white/40 backdrop-blur-sm inline-block px-4 py-2 rounded-full border border-white/30">Get a callback within 30 minutes.</p>
                                    </div>
                                    <button className="group bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 transition-all duration-300 text-white font-semibold px-8 py-4 rounded-2xl flex items-center gap-3 shadow-xl shadow-amber-500/30 transform hover:-translate-y-0.5">
                                        <PhoneCall className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        Talk to an Expert
                                    </button>
                                </div>
                            </div>

                            {/* LOCATION MAP */}
                            <div data-aos="zoom-in" data-aos-delay="200" className="relative bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl p-6 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 to-red-50/20" />
                                <div className="relative z-10">
                                    <h3 className="text-base font-bold text-[#0F172A] flex items-center space-x-3 mb-4">
                                        <span className="w-1 h-6 bg-gradient-to-b from-amber-500 to-red-500 rounded-full" />
                                        <span>Location Map - {sectorName}</span>
                                    </h3>
                                    <div className="w-full h-64 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl border border-white/40 relative overflow-hidden flex flex-col justify-end p-4 shadow-inner">
                                        <div className="absolute inset-0 bg-[radial-gradient(#B8860B_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                            <div className="bg-[#1E1B17]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-xl flex items-center space-x-1 border border-white/20">
                                                <MapPin className="w-3 h-3 text-red-500" />
                                                <span>{sectorName}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDEBAR */}
                        <div data-aos="fade-left" data-aos-delay="400" className="lg:sticky lg:top-24 space-y-4">
                            <div className="relative bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl p-6 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/10 to-red-50/10" />
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-red-500 to-amber-700" />

                                <div className="relative z-10">
                                    <div className="flex items-center space-x-3 pb-4 border-b border-white/20">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-600 to-red-600 text-white flex items-center justify-center font-black text-sm shadow-lg">EL</div>
                                        <div>
                                            <h4 className="font-bold text-[#1E1B17] text-sm">EstateLion Desk Manager</h4>
                                            <p className="text-[11px] text-[#5A4A3A] mt-0.5 flex items-center">
                                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block mr-1.5 animate-pulse" />
                                                Verified Advisory Representative
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 bg-white/50 backdrop-blur-md rounded-2xl border border-white/40 shadow-lg overflow-hidden">
                                        <div className="p-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center border-2 border-white shadow-lg">
                                                    <span className="text-2xl font-bold text-[#4A3F35]">AT</span>
                                                </div>
                                                <div>
                                                    <p className="uppercase text-[10px] tracking-[2px] text-[#8A7A6A] font-semibold">Your Advisor</p>
                                                    <h3 className="text-xl font-bold text-[#1E1B17]">{property.advisor || 'Ashutosh Tripathi'}</h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                        <span className="text-sm text-[#5A4A3A] font-medium">Replies in minutes</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-t border-white/20 grid grid-cols-2">
                                            <button className="py-4 flex justify-center items-center gap-2 hover:bg-white/30 transition-all duration-300 group">
                                                <MessageCircle className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                                                <span className="font-medium text-sm">WhatsApp</span>
                                            </button>
                                            <button className="border-l border-white/20 py-4 flex justify-center items-center gap-2 hover:bg-white/30 transition-all duration-300 group">
                                                <PhoneCall className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                                                <span className="font-medium text-sm">+91 9999320114</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-4 bg-white/50 backdrop-blur-md rounded-2xl border border-white/40 shadow-lg overflow-hidden">
                                        <div className="px-6 py-4 border-b border-white/20">
                                            <h3 className="text-2xl font-bold text-[#1E1B17] bg-gradient-to-r from-[#1E1B17] to-[#B8860B] bg-clip-text text-transparent">Send a query</h3>
                                        </div>
                                        <form className="p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                                            <input type="text" placeholder="Full Name" className="w-full h-12 rounded-xl border border-white/30 bg-white/40 backdrop-blur-sm px-4 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all" />
                                            <input type="email" placeholder="E-mail" className="w-full h-12 rounded-xl border border-white/30 bg-white/40 backdrop-blur-sm px-4 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all" />
                                            <div className="grid grid-cols-[90px_1fr] gap-3">
                                                <select className="h-12 rounded-xl border border-white/30 bg-white/40 backdrop-blur-sm px-2 outline-none focus:border-amber-400 transition-all">
                                                    <option>IN +91</option>
                                                </select>
                                                <input type="tel" placeholder="Mobile Number" className="h-12 rounded-xl border border-white/30 bg-white/40 backdrop-blur-sm px-4 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all" />
                                            </div>
                                            <textarea rows={5} placeholder="Type your Message Here" className="w-full rounded-xl border border-white/30 bg-white/40 backdrop-blur-sm px-4 py-3 outline-none resize-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all" />
                                            <button className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white font-semibold transition-all duration-300 shadow-lg shadow-amber-500/30 transform hover:-translate-y-0.5">Request Callback</button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="relative bg-[#1E1B17]/90 backdrop-blur-2xl text-[#E8DDD0] rounded-2xl p-5 border border-white/10 shadow-2xl overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#2A241E]/50 to-[#1E1B17]/50" />
                                <div className="relative z-10">
                                    <p className="font-bold text-white/90 mb-1 flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                        Verification Guarantee
                                    </p>
                                    <p className="text-xs leading-relaxed text-[#B8A99A]">Prices listed are subject to market clearing rates. No hidden broker payout mandates apply on premium inventory operations.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    )
}