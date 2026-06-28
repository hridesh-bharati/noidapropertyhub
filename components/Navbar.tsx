'use client'
// components/Navbar.tsx
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { useRouter } from 'next/navigation'

interface NavItem {
  label: string
  href: string
}

const primaryLinks: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Buy', href: '/buy' },
  { label: 'Rent', href: '/rent' },
]

const propertyDropdownLinks: NavItem[] = [
  { label: 'Luxury Homes', href: '/luxury-homes' },
  { label: 'Villas', href: '/villas' },
  { label: 'Apartments', href: '/apartments' },
  { label: 'Commercial', href: '/commercial' },
  { label: 'Plots & Land', href: '/plots-land' },
  { label: 'New Launches', href: '/new-launches' },
]

const pagesDropdownLinks: NavItem[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Agents', href: '/agents' },
  { label: 'Project Reviews', href: '/reviews' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [activeDropdown, setActiveDropdown] = useState<'properties' | 'pages' | 'admin' | null>(null)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  
  const router = useRouter()
  const headerRef = useRef<HTMLElement>(null)
  const liquidBgRef = useRef<SVGPathElement>(null)
  const propertiesDropdownRef = useRef<HTMLDivElement>(null)
  const pagesDropdownRef = useRef<HTMLDivElement>(null)
  const adminDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setActiveDropdown(null)
      router.push('/admin/login')
    } catch (error: any) {
      alert(error.message)
    }
  }

  const toggleDropdown = (type: 'properties' | 'pages' | 'admin') => {
    const isOpening = activeDropdown !== type
    
    const getRef = (t: typeof activeDropdown) => {
      if (t === 'properties') return propertiesDropdownRef.current
      if (t === 'pages') return pagesDropdownRef.current
      if (t === 'admin') return adminDropdownRef.current
      return null
    }

    const currentRef = getRef(type)
    const previousRef = getRef(activeDropdown)

    if (activeDropdown && activeDropdown !== type && previousRef) {
      gsap.to(previousRef, { opacity: 0, y: 6, scale: 0.95, duration: 0.15, display: 'none' })
    }

    if (isOpening && currentRef) {
      setActiveDropdown(type)
      gsap.fromTo(currentRef,
        { display: 'none', opacity: 0, y: 8, scale: 0.94 },
        { display: 'block', opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power3.out' }
      )
      gsap.fromTo(currentRef.querySelectorAll('.dropdown-item'),
        { x: -6, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.02, duration: 0.2, ease: 'power2.out', delay: 0.03 }
      )
    } else if (currentRef) {
      gsap.to(currentRef, {
        opacity: 0, y: 6, scale: 0.95, duration: 0.15, ease: 'power2.in',
        onComplete: () => { setActiveDropdown(null); currentRef.style.display = 'none' }
      })
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.dropdown-trigger') && activeDropdown) {
        const getRef = (t: typeof activeDropdown) => {
          if (t === 'properties') return propertiesDropdownRef.current
          if (t === 'pages') return pagesDropdownRef.current
          if (t === 'admin') return adminDropdownRef.current
          return null
        }
        const currentRef = getRef(activeDropdown)
        if (currentRef) {
          gsap.to(currentRef, {
            opacity: 0, y: 6, scale: 0.95, duration: 0.15,
            onComplete: () => { setActiveDropdown(null); currentRef.style.display = 'none' }
          })
        }
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [activeDropdown])

  useEffect(() => {
    if (!liquidBgRef.current) return

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const tl = gsap.timeline()
      tl.to(liquidBgRef.current, {
        attr: { d: "M 0 0 Q 50 40 100 0 L 100 100 Q 50 100 0 100 Z" },
        duration: 0.4,
        ease: "power3.in"
      }).to(liquidBgRef.current, {
        attr: { d: "M 0 0 Q 50 0 100 0 L 100 100 Q 50 100 0 100 Z" },
        duration: 0.3,
        ease: "power2.out"
      })

      gsap.fromTo('.mobile-nav-item',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, duration: 0.35, ease: "back.out(1.1)", delay: 0.15 }
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(liquidBgRef.current, {
        attr: { d: "M 0 0 Q 50 0 100 0 L 100 0 Q 50 0 0 0 Z" },
        duration: 0.4,
        ease: "power3.inOut"
      })
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

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
      ref={headerRef}
      /* सुधार 1: जब isOpen true हो, तो पूरे हेडर का बैकग्राउंड और ब्लर पूरी तरह हटा दिया ताकि SVG साफ दिखे */
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-2 sm:py-2.5 ${
        isOpen 
          ? 'bg-transparent backdrop-blur-none border-transparent' 
          : isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-md border-b border-slate-200/60'
            : 'bg-white/30 backdrop-blur-md border-b border-white/20'
      }`}
    >
      {/* सुधार 2: z-30 सुनिश्चित करता है कि मेनू के लिंक्स हमेशा ऊपर रहें */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <div className="flex items-center justify-between h-10 sm:h-11">

          {/* ब्रांड लोगो */}
          <Link href="/" className="flex items-center gap-2 relative z-50">
            <span className={`text-lg font-black tracking-tighter transition-colors duration-300 ${isOpen ? 'text-white' : 'text-slate-900'}`}>
              NOIDA<span className="text-primary font-light">HUB</span>
            </span>
          </Link>

          {/* डेस्कटॉप मेनू लिंक्स */}
          <div className="hidden lg:flex items-center gap-1.5 bg-white/50 border border-white/40 p-0.5 rounded-full shadow-sm relative">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-bold text-slate-700 px-3.5 py-1 rounded-full hover:bg-white/80 hover:shadow-sm transition-all tracking-wide"
                onMouseMove={handleMagneticHover}
                onMouseLeave={handleMagneticLeave}
              >
                {link.label}
              </Link>
            ))}

            {/* प्रॉपर्टीज ड्रॉपडाउन */}
            <div className="dropdown-trigger relative">
              <button
                onClick={() => toggleDropdown('properties')}
                className={`text-[13px] font-bold px-3.5 py-1 rounded-full flex items-center gap-1 hover:bg-white/80 hover:shadow-sm transition-all ${activeDropdown === 'properties' ? 'text-primary bg-white shadow-sm' : 'text-slate-700'}`}
              >
                Properties
                <svg className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === 'properties' ? 'rotate-180 text-primary' : 'text-slate-400'}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div ref={propertiesDropdownRef} className="hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-100 p-1 overflow-hidden">
                {propertyDropdownLinks.map((subLink) => (
                  <Link
                    key={subLink.href}
                    href={subLink.href}
                    className="dropdown-item flex items-center gap-2 px-3 py-1.5 text-[12.5px] font-semibold text-slate-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/40" />
                    {subLink.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* पेजेस ड्रॉपडाउन */}
            <div className="dropdown-trigger relative">
              <button
                onClick={() => toggleDropdown('pages')}
                className={`text-[13px] font-bold px-3.5 py-1 rounded-full flex items-center gap-1 hover:bg-white/80 hover:shadow-sm transition-all ${activeDropdown === 'pages' ? 'text-primary bg-white shadow-sm' : 'text-slate-700'}`}
              >
                Pages
                <svg className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === 'pages' ? 'rotate-180 text-primary' : 'text-slate-400'}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div ref={pagesDropdownRef} className="hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-100 p-1 overflow-hidden">
                {pagesDropdownLinks.map((subLink) => (
                  <Link
                    key={subLink.href}
                    href={subLink.href}
                    className="dropdown-item flex items-center gap-2 px-3 py-1.5 text-[12.5px] font-semibold text-slate-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/40" />
                    {subLink.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* राइट साइड एक्शन कंट्रोल पैनल */}
          <div className="flex items-center gap-2 sm:gap-4 relative z-50">
            {user ? (
              <div className="dropdown-trigger relative hidden lg:block">
                <button
                  onClick={() => toggleDropdown('admin')}
                  className={`text-[12px] sm:text-[13px] font-bold bg-slate-950 text-white px-4 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-slate-900 transition-all shadow-sm ${activeDropdown === 'admin' ? 'ring-2 ring-primary/20' : ''}`}
                >
                  Hi, Admin
                  <svg className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === 'admin' ? 'rotate-180' : 'text-slate-400'}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div ref={adminDropdownRef} className="hidden absolute top-full right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-100 p-1 overflow-hidden">
                  <Link
                    href="/admin/dashboard"
                    className="dropdown-item flex items-center gap-2 px-3 py-2 text-[12.5px] font-bold text-slate-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                  >
                    <i className="bi bi-grid-1x2-fill text-xs text-slate-400"></i>
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item w-full flex items-center gap-2 px-3 py-2 text-[12.5px] font-bold text-red-600 hover:bg-red-50 rounded-lg transition-all text-left"
                  >
                    <i className="bi bi-box-arrow-right text-xs"></i>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/admin/login"
                className="text-[12px] sm:text-[13px] font-bold text-white bg-primary px-4 py-1.5 rounded-full hover:bg-primary/90 transition-all shadow-sm hidden lg:block"
              >
                Admin Panel
              </Link>
            )}

            {/* मोबाइल हैमबर्गर मेनू */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-8 h-8 sm:w-8.5 sm:h-8.5 flex items-center justify-center rounded-full transition-colors duration-300 ${isOpen ? 'bg-white text-slate-950' : 'bg-slate-950 text-white'} shadow-md`}
              aria-label="Toggle Menu"
            >
              <div className="w-4 h-3 relative flex flex-col justify-between z-10">
                <span className={`block h-0.5 w-full ${isOpen ? 'bg-slate-950' : 'bg-white'} rounded-full transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`} />
                <span className={`block h-0.5 w-3/4 ${isOpen ? 'bg-slate-950' : 'bg-white'} rounded-full transition-opacity duration-200 ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-full ${isOpen ? 'bg-slate-950' : 'bg-white'} rounded-full transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`} />
              </div>
            </button>
          </div>

        </div>
      </nav>

      {/* सुधार 3: `z-20` को `fixed` कंटेनर पर लगाया ताकि यह पूरे पेज की बाकी चीजों के ऊपर (जैसे Exclusive Floor Plans) रहे */}
      <div className={`fixed inset-0 pointer-events-none z-20 transition-all ${isOpen ? 'pointer-events-auto opacity-100' : 'opacity-0'}`}>
        <svg className="absolute w-full h-full fill-slate-950" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path ref={liquidBgRef} d="M 0 0 Q 50 0 100 0 L 100 0 Q 50 0 0 0 Z" />
        </svg>

        {isOpen && (
          /* सुधार 4: z-30 कंटेनर लिंक्स को हमेशा इस ब्लैक बैकग्राउंड के ऊपर रखेगा */
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center z-30 overflow-y-auto px-6 py-24">
            <div className="flex flex-col items-center justify-start gap-3 sm:gap-4.5 my-auto w-full">
              {[...primaryLinks, ...propertyDropdownLinks, ...pagesDropdownLinks].map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="mobile-nav-item text-lg sm:text-2xl font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors duration-150 block py-0.5"
                >
                  {link.label}
                </Link>
              ))}

              <hr className="w-12 border-white/10 my-2 mobile-nav-item" />
              {user ? (
                <>
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="mobile-nav-item text-md sm:text-lg font-bold text-white/80 hover:text-primary transition-colors block py-1"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { setIsOpen(false); handleLogout(); }}
                    className="mobile-nav-item text-md sm:text-lg font-bold text-red-400 hover:text-red-500 transition-colors block py-1"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="mobile-nav-item text-md sm:text-lg font-bold text-primary hover:text-white transition-colors block py-1"
                >
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}