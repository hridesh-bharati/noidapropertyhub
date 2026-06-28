'use client'
// components/Navbar.tsx
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { useRouter, usePathname } from 'next/navigation'

interface PropertyItem {
  title: string
  subtitle: string
  href: string
  image: string
}

const propertyItems: PropertyItem[] = [
  { title: 'Offices for rent in Noida', subtitle: 'Fully Furnished Office on Lease in Noida', href: '/property/offices-rent-noida', image: 'bi-building text-slate-700' },
  { title: 'Offices for Rent in Delhi', subtitle: 'Ready to Move-in Office Space in Delhi', href: '/property/offices-rent-delhi', image: 'bi-building-fill text-blue-600' },
  { title: 'Offices for Rent in Gurgaon', subtitle: 'Fully Furnished Office on Lease in Gurgaon', href: '/property/offices-rent-gurgaon', image: 'bi-building-up text-slate-700' },
  { title: 'Office for Rent in Greater Noida', subtitle: 'Fully Furnished Office on Lease in Greater Noida', href: '/property/offices-rent-greater-noida', image: 'bi-buildings text-slate-700' },
  { title: 'Co-working Spaces for Rent', subtitle: 'Flexible Co-working Spaces for Rent in Delhi NCR', href: '/property/coworking-rent', image: 'bi-laptop text-slate-700' },
  { title: 'Office for Rent on Noida Expressway', subtitle: 'Grade-A Offices in Best Buildings on Expressway', href: '/property/offices-noida-expressway', image: 'bi-building-gear text-slate-700' },
]

export default function Navbar() {
  const [isPropOpen, setIsPropOpen] = useState<boolean>(false)
  const [isMobilePropOpen, setIsMobilePropOpen] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  
  const router = useRouter()
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mobileSheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser))
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setIsPropOpen(false)
      setIsMobilePropOpen(false)
      router.push('/admin/login')
    } catch (error: any) {
      alert(error.message)
    }
  }

  // डेस्कटॉप मेगा-ड्रॉपडाउन जीएसएपी एनिमेशन
  useEffect(() => {
    if (!dropdownRef.current) return
    if (isPropOpen) {
      gsap.fromTo(dropdownRef.current,
        { display: 'none', opacity: 0, y: 15, scale: 0.98 },
        { display: 'grid', opacity: 1, y: 0, scale: 1, duration: 0.22, ease: 'power3.out' }
      )
    } else {
      gsap.to(dropdownRef.current, {
        opacity: 0, y: 10, scale: 0.98, duration: 0.15, ease: 'power2.in',
        onComplete: () => { if (dropdownRef.current) dropdownRef.current.style.display = 'none' }
      })
    }
  }, [isPropOpen])

  // मोबाइल बॉटम शीट एनिमेशन
  useEffect(() => {
    if (!mobileSheetRef.current) return
    if (isMobilePropOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(mobileSheetRef.current,
        { display: 'none', y: '100%' },
        { display: 'block', y: '0%', duration: 0.3, ease: 'power3.out' }
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(mobileSheetRef.current, {
        y: '100%', duration: 0.25, ease: 'power2.in',
        onComplete: () => { if (mobileSheetRef.current) mobileSheetRef.current.style.display = 'none' }
      })
    }
  }, [isMobilePropOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.prop-trigger')) setIsPropOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleMagneticHover = (e: React.MouseEvent<HTMLElement>) => {
    const bound = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bound.left - bound.width / 2;
    const y = e.clientY - bound.top - bound.height / 2;
    gsap.to(e.currentTarget, {
      x: x * 0.35,
      y: y * 0.35,
      color: '#E65C1E',
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleMagneticLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, color: '#334155', duration: 0.4, ease: 'elastic.out(1.1, 0.5)' })
  }

  const isActive = (path: string) => pathname === path

  return (
    <>
      {/* ================= TOP NAVBAR (CLEAN WHITE) ================= */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white border-b border-slate-100 py-2.5 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* लोगो (Width 100px फिक्स) */}
          <Link href="/" className="shrink-0">
            <img src="img/logo.jpg" alt="Logo" className="w-[100px] object-contain rounded" />
          </Link>

          {/* मोबाइल सर्च बॉक्स */}
          <div className="flex lg:hidden flex-1 max-w-md relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
              <i className="bi bi-search text-xs"></i>
            </span>
            <input 
              type="text" 
              placeholder="Search properties..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 pl-8 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-white transition-all"
            />
          </div>

          {/* डेस्कटॉप मेनू लिंक्स */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-50/80 border border-slate-200/60 p-0.5 rounded-full relative">
            <Link
              href="/"
              className={`text-[13px] font-bold px-4 py-1 rounded-full transition-all tracking-wide ${isActive('/') ? 'bg-white text-[#0066FF] shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              onMouseMove={handleMagneticHover}
              onMouseLeave={handleMagneticLeave}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-[13px] font-bold px-4 py-1 rounded-full transition-all tracking-wide ${isActive('/about') ? 'bg-white text-[#0066FF] shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              onMouseMove={handleMagneticHover}
              onMouseLeave={handleMagneticLeave}
            >
              About
            </Link>
            
            <div className="prop-trigger relative">
              <button
                onClick={() => setIsPropOpen(!isPropOpen)}
                className={`text-[13px] font-bold px-4 py-1 rounded-full flex items-center gap-1 transition-all ${
                  isPropOpen ? 'text-[#0066FF] bg-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Property
                <svg className={`w-3 h-3 transition-transform duration-200 ${isPropOpen ? 'rotate-180 text-[#0066FF]' : 'text-slate-400'}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* डेस्कटॉप मेगा ड्रॉपडाउन */}
              <div
                ref={dropdownRef}
                className="hidden absolute top-[45px] left-1/2 -translate-x-1/2 w-[720px] bg-white rounded-2xl shadow-xl border border-slate-100 p-6 grid-cols-2 gap-x-6 gap-y-4 z-50"
              >
                {propertyItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="mega-item flex items-start gap-3.5 p-2 rounded-xl hover:bg-slate-50 transition-all group"
                    onClick={() => setIsPropOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                      <i className={`bi ${item.image} text-lg group-hover:text-[#0066FF]`}></i>
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#0066FF] transition-colors">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">{item.subtitle}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              className={`text-[13px] font-bold px-4 py-1 rounded-full transition-all tracking-wide ${isActive('/contact') ? 'bg-white text-[#0066FF] shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              onMouseMove={handleMagneticHover}
              onMouseLeave={handleMagneticLeave}
            >
              Contact
            </Link>
            <Link
              href="/faq"
              className={`text-[13px] font-bold px-4 py-1 rounded-full transition-all tracking-wide ${isActive('/faq') ? 'bg-white text-[#0066FF] shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              onMouseMove={handleMagneticHover}
              onMouseLeave={handleMagneticLeave}
            >
              FAQ
            </Link>
          </div>

          {/* राइट साइड: लॉगिन बटन (ब्राइट ब्लू कलर) */}
          <div className="shrink-0 relative z-50">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/admin/dashboard"
                  className="text-xs font-bold bg-[#0066FF] text-white px-5 py-2 rounded-full hover:bg-[#0055DD] transition-all shadow-md"
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="text-xs font-bold text-red-500 hover:text-red-600 ml-2 hidden sm:inline-block">
                  <i className="bi bi-box-arrow-right text-base"></i>
                </button>
              </div>
            ) : (
              <Link
                href="/admin/login"
                className="text-xs font-bold text-white bg-[#0066FF] px-5 py-2 rounded-full hover:bg-[#0055DD] transition-all shadow-md"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* ================= INSTAGRAM STYLE SOLID WHITE BOTTOM NAV ================= */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 z-50 px-2 py-2 flex items-center justify-around pb-safe shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <Link 
          href="/" 
          className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-colors ${isActive('/') ? 'text-[#0066FF]' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <i className="bi bi-house-door text-xl"></i>
          <span className="text-[10px] font-bold tracking-tight">Home</span>
        </Link>
        <Link 
          href="/about" 
          className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-colors ${isActive('/about') ? 'text-[#0066FF]' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <i className="bi bi-info-circle text-xl"></i>
          <span className="text-[10px] font-bold tracking-tight">About</span>
        </Link>
        <button 
          onClick={() => setIsMobilePropOpen(true)}
          className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-colors ${isMobilePropOpen || pathname.startsWith('/property') ? 'text-[#0066FF]' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <i className="bi bi-building text-xl"></i>
          <span className="text-[10px] font-bold tracking-tight">Property</span>
        </button>
        <Link 
          href="/contact" 
          className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-colors ${isActive('/contact') ? 'text-[#0066FF]' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <i className="bi bi-envelope text-xl"></i>
          <span className="text-[10px] font-bold tracking-tight">Contact</span>
        </Link>
        <Link 
          href="/faq" 
          className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-colors ${isActive('/faq') ? 'text-[#0066FF]' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <i className="bi bi-question-circle text-xl"></i>
          <span className="text-[10px] font-bold tracking-tight">FAQ</span>
        </Link>
      </div>

      {/* ================= LIGHT WHITE PROPERTY BOTTOM SHEET ================= */}
      <div 
        className="lg:hidden fixed inset-0 bg-black/50 z-50 transition-opacity"
        style={{ display: isMobilePropOpen ? 'block' : 'none' }}
        onClick={() => setIsMobilePropOpen(false)}
      >
        <div 
          ref={mobileSheetRef}
          className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl p-5 max-h-[70vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-5" onClick={() => setIsMobilePropOpen(false)}></div>
          
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Properties for Rent</h3>
            <button onClick={() => setIsMobilePropOpen(false)} className="text-slate-400 hover:text-slate-600 text-lg">
              <i className="bi bi-x-circle-fill"></i>
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2.5 pb-12">
            {propertyItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={() => setIsMobilePropOpen(false)}
                className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50/40 hover:border-blue-200/50 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-white shadow-xs border border-slate-100 flex items-center justify-center shrink-0">
                  <i className={`bi ${item.image.split(' ')[0]} text-base text-slate-600 group-hover:text-[#0066FF]`}></i>
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#0066FF] transition-colors">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}