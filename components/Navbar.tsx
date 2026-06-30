'use client'
// components/Navbar.tsx
import { useState, useEffect } from 'react'
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { useRouter, usePathname } from 'next/navigation'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  
  const router = useRouter()
  const pathname = usePathname()

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: false,
      offset: 0,
    })
  }, [])

  // Refresh AOS on route change
  useEffect(() => {
    AOS.refresh()
  }, [pathname])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser))
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/admin/login')
    } catch (error: any) {
      alert(error.message)
    }
  }

  const isActive = (path: string) => pathname === path

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/properties', label: 'Property' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
  ]

  return (
    <>
      {/* ================= TOP NAVBAR (CLEAN WHITE) ================= */}
      <header 
        className="fixed top-0 left-0 w-full z-40 bg-white border-b border-slate-100 py-2.5 shadow-sm"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo with AOS */}
          <Link 
            href="/" 
            className="shrink-0"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <img src="img/logo.jpg" alt="Logo" className="w-[100px] object-contain rounded" />
          </Link>

          {/* Mobile Search Box */}
          <div 
            className="flex lg:hidden flex-1 max-w-md relative"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
              <i className="bi bi-search text-xs"></i>
            </span>
            <input 
              type="text" 
              placeholder="Search properties..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 pl-8 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-white transition-all"
            />
          </div>

          {/* Desktop Menu Links with AOS */}
          <div 
            className="hidden lg:flex items-center gap-1 bg-slate-50/80 border border-slate-200/60 p-0.5 rounded-full relative"
            data-aos="fade-down"
            data-aos-delay="300"
            data-aos-duration="600"
          >
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-bold px-4 py-1 rounded-full transition-all tracking-wide ${
                  isActive(link.href) || (link.href === '/properties' && pathname.startsWith('/properties'))
                    ? 'bg-white text-[#0066FF] shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
                data-aos="zoom-in"
                data-aos-delay={400 + index * 100}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side: Login Button with AOS */}
          <div 
            className="shrink-0 relative z-50"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/admin/dashboard"
                  className="text-xs font-bold bg-[#0066FF] text-white px-5 py-2 rounded-full hover:bg-[#0055DD] transition-all shadow-md hover:shadow-lg hover:scale-105"
                  data-aos="zoom-in"
                  data-aos-delay="500"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-xs font-bold text-red-500 hover:text-red-600 ml-2 hidden sm:inline-block transition-colors"
                  data-aos="zoom-in"
                  data-aos-delay="600"
                >
                  <i className="bi bi-box-arrow-right text-base"></i>
                </button>
              </div>
            ) : (
              <Link
                href="/admin/login"
                className="text-xs font-bold text-white bg-[#0066FF] px-5 py-2 rounded-full hover:bg-[#0055DD] transition-all shadow-md hover:shadow-lg hover:scale-105"
                data-aos="zoom-in"
                data-aos-delay="500"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* ================= INSTAGRAM STYLE SOLID WHITE BOTTOM NAV ================= */}
      <div 
        className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 z-50 px-2 py-2 flex items-center justify-around pb-safe shadow-[0_-4px_12px_rgba(0,0,0,0.03)]"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        {[
          { href: '/', icon: 'bi-house-door', label: 'Home' },
          { href: '/about', icon: 'bi-info-circle', label: 'About' },
          { href: '/properties', icon: 'bi-building', label: 'Property' },
          { href: '/contact', icon: 'bi-envelope', label: 'Contact' },
          { href: '/faq', icon: 'bi-question-circle', label: 'FAQ' },
        ].map((item, index) => (
          <Link 
            key={item.href}
            href={item.href} 
            className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-all ${
              isActive(item.href) || (item.href === '/properties' && pathname.startsWith('/properties'))
                ? 'text-[#0066FF] scale-110' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
            data-aos="fade-up"
            data-aos-delay={200 + index * 100}
            data-aos-duration="600"
          >
            <i className={`bi ${item.icon} text-xl`}></i>
            <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
          </Link>
        ))}
      </div>
    </>
  )
}