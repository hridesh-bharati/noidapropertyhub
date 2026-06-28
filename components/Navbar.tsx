'use client'
// components/Navbar.tsx
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { useRouter } from 'next/navigation'

interface PropertyItem {
  title: string
  subtitle: string
  href: string
  image: string
}

const propertyItems: PropertyItem[] = [
  { title: 'Offices for rent in Noida', subtitle: 'Fully Furnished Office on Lease in Noida', href: '/property/offices-rent-noida', image: 'bi-building shadow-sm' },
  { title: 'Offices for Rent in Delhi', subtitle: 'Ready to Move-in Office Space in Delhi', href: '/property/offices-rent-delhi', image: 'bi-building-fill text-indigo-600' },
  { title: 'Offices for Rent in Gurgaon', subtitle: 'Fully Furnished Office on Lease in Gurgaon', href: '/property/offices-rent-gurgaon', image: 'bi-building-up' },
  { title: 'Office for Rent in Greater Noida', subtitle: 'Fully Furnished Office on Lease in Greater Noida', href: '/property/offices-rent-greater-noida', image: 'bi-buildings' },
  { title: 'Co-working Spaces for Rent', subtitle: 'Flexible Co-working Spaces for Rent in Delhi NCR', href: '/property/coworking-rent', image: 'bi-laptop' },
  { title: 'Office for Rent on Noida Expressway', subtitle: 'Grade-A Offices in Best Buildings on Expressway', href: '/property/offices-noida-expressway', image: 'bi-building-gear' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isPropOpen, setIsPropOpen] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser))
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setIsOpen(false)
      setIsPropOpen(false)
      router.push('/admin/login')
    } catch (error: any) {
      alert(error.message)
    }
  }

  // डेस्कटॉप मेगा-ड्रॉपडाउन एनिमेशन
  useEffect(() => {
    if (!dropdownRef.current) return
    if (isPropOpen) {
      gsap.fromTo(dropdownRef.current,
        { display: 'none', opacity: 0, y: 15, scale: 0.98 },
        { display: 'grid', opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power3.out' }
      )
      gsap.fromTo('.mega-item', 
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, stagger: 0.02, duration: 0.2, ease: 'power2.out', delay: 0.05 }
      )
    } else {
      gsap.to(dropdownRef.current, {
        opacity: 0, y: 10, scale: 0.98, duration: 0.15, ease: 'power2.in',
        onComplete: () => { if (dropdownRef.current) dropdownRef.current.style.display = 'none' }
      })
    }
  }, [isPropOpen])

  // मोबाइल फुल-स्क्रीन मेनू एनिमेशन
  useEffect(() => {
    if (!mobileMenuRef.current) return
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(mobileMenuRef.current,
        { display: 'none', opacity: 0, scale: 1.02 },
        { display: 'flex', opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      )
      gsap.fromTo('.m-nav-item',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, duration: 0.25, ease: 'power3.out', delay: 0.08 }
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(mobileMenuRef.current, {
        opacity: 0, scale: 0.99, duration: 0.2, ease: 'power2.in',
        onComplete: () => { if (mobileMenuRef.current) mobileMenuRef.current.style.display = 'none' }
      })
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.prop-trigger')) setIsPropOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // पुराना मैग्नेटिक पुल होवर इफेक्ट वापस जोड़ा गया
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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? 'bg-white shadow-md border-b border-slate-100 py-2 sm:py-2.5'
          : 'bg-white/30 backdrop-blur-md border-b border-white/20 py-2.5 sm:py-3.5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* ब्रांड लोगो */}
        <Link href="/" className="relative z-50">
          <span className="text-xl font-black tracking-tighter text-slate-900">
            NOIDA<span className="text-primary font-light">HUB</span>
          </span>
        </Link>

        {/* पुराना वाइट शैडो कैप्सूल कंटेनर डिज़ाइन लिंक्स के लिए */}
        <div className="hidden lg:flex items-center gap-1.5 bg-white/50 border border-white/40 p-0.5 rounded-full shadow-sm relative">
          <Link
            href="/"
            className="text-[13px] font-bold text-slate-700 px-4 py-1 rounded-full hover:bg-white/80 hover:shadow-sm transition-all tracking-wide"
            onMouseMove={handleMagneticHover}
            onMouseLeave={handleMagneticLeave}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-[13px] font-bold text-slate-700 px-4 py-1 rounded-full hover:bg-white/80 hover:shadow-sm transition-all tracking-wide"
            onMouseMove={handleMagneticHover}
            onMouseLeave={handleMagneticLeave}
          >
            About
          </Link>
          
          {/* प्रॉपर्टी ड्रॉपडाउन */}
          <div className="prop-trigger relative">
            <button
              onClick={() => setIsPropOpen(!isPropOpen)}
              className={`text-[13px] font-bold px-4 py-1 rounded-full flex items-center gap-1 hover:bg-white/80 hover:shadow-sm transition-all ${
                isPropOpen ? 'text-primary bg-white shadow-sm' : 'text-slate-700'
              }`}
            >
              Property
              <svg className={`w-3 h-3 transition-transform duration-200 ${isPropOpen ? 'rotate-180' : 'text-slate-400'}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* स्क्रीनशॉट जैसा प्रीमियम 2-कॉलम मेगा ड्रॉपडाउन */}
            <div
              ref={dropdownRef}
              className="hidden absolute top-[45px] left-1/2 -translate-x-1/2 w-[720px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 grid-cols-2 gap-x-6 gap-y-4 z-50"
            >
              {propertyItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="mega-item flex items-start gap-3.5 p-2 rounded-xl hover:bg-slate-50 transition-all group"
                  onClick={() => setIsPropOpen(false)}
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
                    <i className={`bi ${item.image} text-lg`}></i>
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">{item.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/contact"
            className="text-[13px] font-bold text-slate-700 px-4 py-1 rounded-full hover:bg-white/80 hover:shadow-sm transition-all tracking-wide"
            onMouseMove={handleMagneticHover}
            onMouseLeave={handleMagneticLeave}
          >
            Contact
          </Link>
          <Link
            href="/faq"
            className="text-[13px] font-bold text-slate-700 px-4 py-1 rounded-full hover:bg-white/80 hover:shadow-sm transition-all tracking-wide"
            onMouseMove={handleMagneticHover}
            onMouseLeave={handleMagneticLeave}
          >
            FAQ
          </Link>
        </div>

        {/* राइट साइड एक्शन कंट्रोल पैनल */}
        <div className="flex items-center gap-3 relative z-50">
          {user ? (
            <div className="relative">
              <Link
                href="/admin/dashboard"
                className="text-xs font-bold bg-slate-950 text-white px-4 py-2 rounded-full hover:bg-slate-900 transition-all shadow-sm"
              >
                Dashboard
              </Link>
              <button 
                onClick={handleLogout} 
                className="text-xs font-bold text-red-600 ml-3 hover:underline hidden sm:inline-block"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/admin/login"
              className="text-xs font-bold text-white bg-primary px-4 py-2 rounded-full hover:bg-primary/90 transition-all shadow-sm"
            >
              Admin Panel
            </Link>
          )}

          {/* मोबाइल हैमबर्गर बटन */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-9 h-9 flex lg:hidden items-center justify-center rounded-full bg-slate-950 text-white shadow-md"
            aria-label="Toggle Menu"
          >
            <div className="w-4 h-3 relative flex flex-col justify-between">
              <span className={`block h-0.5 w-full bg-white rounded-full transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`block h-0.5 w-3/4 bg-white rounded-full transition-opacity duration-200 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-full bg-white rounded-full transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* मोबाइल फुल स्क्रीन क्लीन मेनू */}
      <div
        ref={mobileMenuRef}
        className="hidden fixed inset-0 w-full h-screen bg-white/98 backdrop-blur-lg z-40 flex-col pt-24 px-6 overflow-y-auto"
      >
        <div className="flex flex-col gap-5 text-center w-full max-w-sm mx-auto">
          <Link href="/" onClick={() => setIsOpen(false)} className="m-nav-item text-lg font-black text-slate-800 uppercase tracking-wider py-1 hover:text-primary">Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="m-nav-item text-lg font-black text-slate-800 uppercase tracking-wider py-1 hover:text-primary">About</Link>
          
          <div className="m-nav-item border-y border-slate-100 py-3 my-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Properties for Rent</p>
            <div className="grid grid-cols-1 gap-3.5 text-left max-h-[220px] overflow-y-auto px-2">
              {propertyItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 shrink-0"><i className={`bi ${item.image} text-sm`}></i></div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-primary">{item.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link href="/contact" onClick={() => setIsOpen(false)} className="m-nav-item text-lg font-black text-slate-800 uppercase tracking-wider py-1 hover:text-primary">Contact</Link>
          <Link href="/faq" onClick={() => setIsOpen(false)} className="m-nav-item text-lg font-black text-slate-800 uppercase tracking-wider py-1 hover:text-primary">FAQ</Link>
          
          {user && (
            <button
              onClick={handleLogout}
              className="m-nav-item mt-4 py-3 bg-red-50 text-red-600 font-bold rounded-xl text-xs uppercase tracking-widest"
            >
              Logout Admin
            </button>
          )}
        </div>
      </div>
    </header>
  )
}