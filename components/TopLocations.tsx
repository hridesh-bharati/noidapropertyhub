'use client'
import Link from 'next/link'

interface LocationCard {
  city: string
  tagline: string
  image: string
  href: string
}

const locations: LocationCard[] = [
  {
    city: 'Noida',
    tagline: 'Premium office spaces',
    image: 'https://images.unsplash.com/photo-1590059132612-f75609fcb42b?q=80&w=600&auto=format&fit=crop', // आप अपनी इमेज पाथ यहाँ बदल सकते हैं
    href: '/property/offices-rent-noida',
  },
  {
    city: 'New Delhi',
    tagline: 'Central business district',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=600&auto=format&fit=crop',
    href: '/property/offices-rent-delhi',
  },
  {
    city: 'Gurgaon',
    tagline: 'Modern corporate hubs',
    image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=600&auto=format&fit=crop',
    href: '/property/offices-rent-gurgaon',
  },
  {
    city: 'Greater Noida',
    tagline: 'Emerging business hub',
    image: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=600&auto=format&fit=crop',
    href: '/property/offices-rent-greater-noida',
  },
]

export default function TopLocations() {
  return (
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* उप-शीर्षक (Sub-header) */}
        <p className="text-[10px] sm:text-xs font-black tracking-[0.2em] text-red-500 uppercase">
          Where We Operate
        </p>
        
        {/* मुख्य शीर्षक */}
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2.5">
          Top Office Locations
        </h2>
        
        {/* शीर्षक के नीचे की प्रीमियम लाइन */}
        <div className="w-12 h-0.5 bg-red-400/60 mx-auto mt-4 rounded-full" />
        
        {/* विवरण (Description) */}
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-400 font-medium leading-relaxed mt-5 tracking-wide px-2">
          Premium office spaces across Noida, New Delhi, Gurgaon, and Greater Noida — 
          curated in India&apos;s most active business corridors for discerning occupiers.
        </p>

        {/* ग्रिड कंटेनर (4-कॉलम लेआउट) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 sm:mt-16">
          {locations.map((loc, idx) => (
            <Link
              key={idx}
              href={loc.href}
              className="group relative h-[260px] sm:h-[300px] w-full rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-slate-100 block"
            >
              {/* बैकग्राउंड इमेज */}
              <div 
                className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                style={{ backgroundImage: `url(${loc.image})` }}
              />

              {/* ब्लैक ग्रेडिएंट ओवरले - जो टेक्स्ट को हमेशा विज़िबल रखेगा */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />

              {/* कार्ड का कंटेंट (बॉटम-लेफ्ट अलाइनमेंट) */}
              <div className="absolute bottom-0 left-0 w-full p-6 text-left transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {loc.city}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1 tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
                  {loc.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}