// app/properties/[id]/page.jsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { allProperties, getRelatedProperties } from "../../../data/properties";

function getFeatureIconClass(feature) {
    const f = feature.toLowerCase();
    if (f.includes('dock') || f.includes('bay')) return 'bi bi-truck-flatbed text-amber-500';
    if (f.includes('security')) return 'bi bi-shield-lock-fill text-amber-500';
    if (f.includes('backup') || f.includes('power')) return 'bi bi-lightning-charge-fill text-amber-500';
    if (f.includes('production') || f.includes('assembly') || f.includes('line')) return 'bi bi-cpu-fill text-amber-500';
    if (f.includes('quarter') || f.includes('worker') || f.includes('staff')) return 'bi bi-people-fill text-amber-500';
    if (f.includes('canteen') || f.includes('food')) return 'bi bi-cup-hot-fill text-amber-500';
    if (f.includes('cold') || f.includes('storage')) return 'bi bi-thermometer-snow text-amber-500';
    if (f.includes('parking') || f.includes('fleet') || f.includes('car')) return 'bi bi-p-circle-fill text-amber-500';
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

export default async function PropertyDetails({ params }) {
    const { id } = await params;
    const property = allProperties.find(p => p.id === Number(id));

    if (!property) {
        notFound();
    }

    const relatedProperties = getRelatedProperties(property.id, 4);

    return (
        <main className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased pb-16">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-slate-200 py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold tracking-wide select-none flex-wrap">
                        <Link href="/" className="hover:text-slate-700 transition-colors">Home</Link>
                        <span>|</span>
                        <Link href="/properties" className="hover:text-slate-700 transition-colors">Properties</Link>
                        <span>|</span>
                        <Link href="/properties/noida" className="hover:text-slate-700 transition-colors">Noida</Link>
                        <span>|</span>
                        <span className="text-slate-800 font-bold truncate max-w-[200px]">{property.title}</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column */}
                    <div className="lg:col-span-2">
                        
                        {/* Main Image */}
                        <div className="relative rounded-[24px] overflow-hidden aspect-[4/3] bg-slate-200 border border-slate-200 shadow-sm">
                            <img 
                                src={property.image} 
                                alt={property.title} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 flex items-center gap-2">
                                <span className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg">
                                    {property.type}
                                </span>
                                {property.verified && (
                                    <span className="px-2.5 py-1.5 bg-white/95 text-amber-600 rounded-xl text-[10px] font-bold shadow-sm border border-slate-100 flex items-center gap-1">
                                        <i className="bi bi-patch-check-fill"></i> Verified
                                    </span>
                                )}
                            </div>
                            {property.featured && (
                                <div className="absolute top-4 right-4">
                                    <span className="px-3 py-1.5 bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] font-black uppercase tracking-wider rounded-xl flex items-center gap-1.5 border border-amber-500/30 shadow-lg">
                                        <i className="bi bi-star-fill text-amber-400"></i> Featured
                                    </span>
                                </div>
                            )}
                            {property.advisor && (
                                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-xl px-3 py-1.5 shadow-lg border border-slate-100">
                                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs">
                                        {property.advisor.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-700">YOUR ADVISOR</p>
                                        <p className="text-xs font-black text-slate-900">{property.advisor}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Property Details */}
                        <div className="mt-8 bg-white rounded-[24px] border border-slate-200 p-6 shadow-sm">
                            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                                        {property.category}
                                    </span>
                                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-2 text-slate-950">
                                        {property.title}
                                    </h1>
                                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                                        <i className="bi bi-geo-alt-fill text-amber-500"></i> {property.location}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-black text-slate-950">{property.price}</div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                                        {property.availability}
                                    </span>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-slate-100 my-4">
                                <div className="text-center">
                                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Built-Up Area</div>
                                    <div className="text-sm font-black text-slate-800">{property.builtUpArea || property.sqft}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Typical Floor</div>
                                    <div className="text-sm font-black text-slate-800">{property.typicalFloor || 'N/A'}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Certification</div>
                                    <div className="text-sm font-black text-slate-800">{property.certification || 'On request'}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Status</div>
                                    <div className="text-sm font-black text-emerald-600">{property.availability}</div>
                                </div>
                            </div>

                            {/* At A Glance */}
                            {property.typicalFloor && (
                                <div className="mt-4">
                                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-600 mb-3">At A Glance</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                        <div className="flex justify-between py-1.5 border-b border-slate-200/60 text-xs">
                                            <span className="text-slate-500 font-semibold">Usage Type</span>
                                            <span className="text-slate-800 font-black">{property.category}</span>
                                        </div>
                                        <div className="flex justify-between py-1.5 border-b border-slate-200/60 text-xs">
                                            <span className="text-slate-500 font-semibold">Location</span>
                                            <span className="text-slate-800 font-black">{property.location}</span>
                                        </div>
                                        <div className="flex justify-between py-1.5 border-b border-slate-200/60 text-xs sm:border-b-0">
                                            <span className="text-slate-500 font-semibold">Floors</span>
                                            <span className="text-slate-800 font-black">{property.floors || 'G+2'}</span>
                                        </div>
                                        <div className="flex justify-between py-1.5 border-b border-slate-200/60 text-xs sm:border-b-0">
                                            <span className="text-slate-500 font-semibold">Built-Up Area</span>
                                            <span className="text-slate-800 font-black">{property.builtUpArea || property.sqft}</span>
                                        </div>
                                        <div className="flex justify-between py-1.5 border-b border-slate-200/60 text-xs">
                                            <span className="text-slate-500 font-semibold">Parking Ratio</span>
                                            <span className="text-slate-800 font-black">{property.category === 'IT/ITeS Building' ? '1:1000 sq.ft.' : '1:2000 sq.ft.'}</span>
                                        </div>
                                        <div className="flex justify-between py-1.5 border-b border-slate-200/60 text-xs">
                                            <span className="text-slate-500 font-semibold">Nearest Metro</span>
                                            <span className="text-slate-800 font-black">{property.nearby?.metro?.[0]?.name || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between py-1.5 border-b border-slate-200/60 text-xs sm:border-b-0">
                                            <span className="text-slate-500 font-semibold">Nearest Airport</span>
                                            <span className="text-slate-800 font-black">{property.nearby?.airport || 'Noida International Airport'}</span>
                                        </div>
                                        <div className="flex justify-between py-1.5 text-xs">
                                            <span className="text-slate-500 font-semibold">Facing</span>
                                            <span className="text-slate-800 font-black">East</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Features */}
                            <div className="mt-4">
                                <h3 className="text-sm font-black uppercase tracking-wider text-slate-600 mb-3">Key Features & Amenities</h3>
                                <div className="flex flex-wrap gap-2">
                                    {property.features.map((feature, idx) => (
                                        <span key={idx} className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200/60 shadow-sm">
                                            <i className={`${getFeatureIconClass(feature)} text-sm`}></i>
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-6 pt-4 border-t border-slate-100">
                                <h3 className="text-sm font-black uppercase tracking-wider text-slate-600 mb-2">About This Property</h3>
                                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                    {property.description || `A premium ${property.category.toLowerCase()} space in ${property.location} offering modern amenities and excellent connectivity.`}
                                </p>
                            </div>

                            {/* Location Section */}
                            {property.nearby && (
                                <div className="mt-6 pt-4 border-t border-slate-100">
                                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-600 mb-3">Location & Connectivity</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {property.nearby.metro?.map((metro, idx) => (
                                            <div key={idx} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                                                <div className="text-xs font-bold text-slate-500">{metro.name}</div>
                                                <div className="text-sm font-black text-slate-800">{metro.distance}</div>
                                            </div>
                                        ))}
                                        {property.nearby.airport && (
                                            <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                                                <div className="text-xs font-bold text-slate-500">Airport</div>
                                                <div className="text-sm font-black text-slate-800">{property.nearby.airport}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Contact Agent */}
                        <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-[24px] border border-amber-200/50 p-6">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-sm font-black text-slate-800">Interested in this property?</h3>
                                    <p className="text-xs text-slate-600 mt-1">Get a callback from our team within 30 minutes.</p>
                                </div>
                                <div className="flex gap-3">
                                    <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm">
                                        <i className="bi bi-telephone-fill"></i> Call Now
                                    </button>
                                    <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm">
                                        <i className="bi bi-whatsapp"></i> WhatsApp
                                    </button>
                                </div>
                            </div>
                            {property.advisor && (
                                <div className="mt-4 pt-3 border-t border-amber-200/30 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 font-bold text-sm">
                                        {property.advisor.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500">Your Advisor</p>
                                        <p className="text-sm font-black text-slate-800">{property.advisor}</p>
                                    </div>
                                    <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                                        <i className="bi bi-clock"></i> Replies in minutes
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[24px] border border-slate-200 p-6 shadow-sm sticky top-24">
                            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">Quick Actions</h3>
                            
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all shadow-sm">
                                    <i className="bi bi-calendar-check"></i> Schedule Visit
                                </button>
                                <button className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 hover:border-amber-500 text-slate-700 text-xs font-bold rounded-xl transition-all">
                                    <i className="bi bi-download"></i> Download Brochure
                                </button>
                                <button className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 hover:border-amber-500 text-slate-700 text-xs font-bold rounded-xl transition-all">
                                    <i className="bi bi-share"></i> Share Property
                                </button>
                                <button className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 hover:border-amber-500 text-slate-700 text-xs font-bold rounded-xl transition-all">
                                    <i className="bi bi-bookmark"></i> Save Property
                                </button>
                            </div>

                            <hr className="my-4 border-slate-100" />

                            {/* Enquiry Form */}
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">Send a Query</h4>
                                <form className="space-y-3">
                                    <input 
                                        type="text" 
                                        placeholder="Full Name" 
                                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all bg-slate-50"
                                    />
                                    <input 
                                        type="email" 
                                        placeholder="E-mail" 
                                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all bg-slate-50"
                                    />
                                    <div className="flex gap-2">
                                        <select className="px-2 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 bg-slate-50">
                                            <option>+91</option>
                                            <option>+1</option>
                                            <option>+44</option>
                                        </select>
                                        <input 
                                            type="tel" 
                                            placeholder="Mobile Number" 
                                            className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all bg-slate-50"
                                        />
                                    </div>
                                    <textarea 
                                        placeholder="Type your Message Here" 
                                        rows="2"
                                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all bg-slate-50 resize-none"
                                    ></textarea>
                                    <button className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all shadow-sm">
                                        Request Callback
                                    </button>
                                </form>
                            </div>

                            <hr className="my-4 border-slate-100" />

                            {/* Highlights */}
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">Highlights</h4>
                                <ul className="space-y-2 text-xs">
                                    <li className="flex items-center gap-2 text-slate-600">
                                        <i className={`bi ${property.verified ? 'bi-check-circle-fill text-emerald-500' : 'bi-clock text-amber-500'}`}></i>
                                        {property.verified ? 'Verified Property' : 'Verification Pending'}
                                    </li>
                                    <li className="flex items-center gap-2 text-slate-600">
                                        <i className={`bi ${property.featured ? 'bi-star-fill text-amber-500' : 'bi-star text-slate-400'}`}></i>
                                        {property.featured ? 'Featured Listing' : 'Standard Listing'}
                                    </li>
                                    <li className="flex items-center gap-2 text-slate-600">
                                        <i className="bi bi-check-circle-fill text-emerald-500 text-xs"></i>
                                        {property.availability === 'Available Now' ? 'Ready to Move' : property.availability === 'Available from Next Month' ? 'Available Next Month' : 'Coming Soon'}
                                    </li>
                                    <li className="flex items-center gap-2 text-slate-600">
                                        <i className="bi bi-tag-fill text-amber-500 text-xs"></i>
                                        {property.category}
                                    </li>
                                </ul>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 text-center mb-2">Trusted by organizations that value precision and discretion</p>
                                <div className="flex items-center justify-center gap-3 flex-wrap">
                                    <span className="text-[10px] font-black text-slate-600">Cesc</span>
                                    <span className="text-[10px] font-black text-emerald-600">greenko</span>
                                    <span className="text-[10px] font-black text-slate-700">hindustantimes</span>
                                    <span className="text-[10px] font-black text-red-600">passaur</span>
                                    <span className="text-[10px] font-black text-blue-600">Redcliffe</span>
                                    <span className="text-[10px] font-black text-amber-600">Hisense</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Properties */}
                {relatedProperties.length > 0 && (
                    <div className="mt-16">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-black text-slate-950">Similar Properties</h2>
                            <Link href="/properties" className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1">
                                View All <i className="bi bi-arrow-right"></i>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProperties.map((relProp) => (
                                <Link 
                                    key={relProp.id} 
                                    href={`/properties/${relProp.id}`}
                                    className="group bg-white rounded-[24px] border border-slate-200/90 overflow-hidden shadow-sm hover:border-amber-500/40 hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                                        <img 
                                            src={relProp.image} 
                                            alt={relProp.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                                            <span className="px-2.5 py-1 bg-slate-950/60 backdrop-blur-md text-white text-[9px] font-bold rounded-lg border border-white/10">
                                                {relProp.category}
                                            </span>
                                            {relProp.type && (
                                                <span className="px-2.5 py-1 bg-amber-500/80 backdrop-blur-md text-white text-[9px] font-bold rounded-lg border border-white/10">
                                                    {relProp.type}
                                                </span>
                                            )}
                                        </div>
                                        {relProp.verified && (
                                            <div className="absolute top-2 right-2">
                                                <span className="px-1.5 py-0.5 bg-emerald-500/80 backdrop-blur-md text-white text-[8px] font-bold rounded-lg border border-white/10">
                                                    <i className="bi bi-patch-check-fill"></i>
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[10px] font-bold text-amber-600">{relProp.availability}</span>
                                            <span className="text-sm font-black text-slate-950">{relProp.price}</span>
                                        </div>
                                        <h3 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-amber-600 transition-colors">
                                            {relProp.title}
                                        </h3>
                                        <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                                            <i className="bi bi-geo-alt-fill text-amber-500"></i> {relProp.location}
                                        </p>
                                        <p className="text-[10px] text-slate-400 mt-1">{relProp.sqft}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-8">
                    <Link 
                        href="/properties" 
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-amber-600 transition-colors"
                    >
                        <i className="bi bi-arrow-left"></i> Back to Properties
                    </Link>
                </div>
            </div>
        </main>
    );
}