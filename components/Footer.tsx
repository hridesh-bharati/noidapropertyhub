'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-400 pt-20 overflow-hidden border-t border-slate-900">
      {/* सटल नियॉन ओर्ब्स फॉर कलरफुल वाइब */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-pink-500/[0.05] rounded-full blur-[130px]" />
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-500/[0.04] rounded-full blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Get In Touch */}
          <div>
            <h5 className="text-white mb-6 text-sm font-black tracking-widest uppercase">
              Get In Touch
            </h5>
            <div className="space-y-4 text-sm font-medium">
              <p className="flex items-start gap-3 hover:text-white transition-colors duration-300">
                <i className="bi bi-geo-alt-fill text-primary mt-0.5"></i>
                <span>123 Street, Sector 62, Noida, India</span>
              </p>
              <p className="flex items-center gap-3 hover:text-white transition-colors duration-300">
                <i className="bi bi-telephone-fill text-primary"></i>
                <span>+012 345 67890</span>
              </p>
              <p className="flex items-center gap-3 hover:text-white transition-colors duration-300">
                <i className="bi bi-envelope-fill text-primary"></i>
                <span>info@noidapropertyhub.com</span>
              </p>
            </div>
            
            {/* Social Media Links with Interactive Micro-interactions */}
            <div className="flex pt-6 space-x-3">
              {[
                { icon: 'bi-twitter-x', href: '#' },
                { icon: 'bi-facebook', href: '#' },
                { icon: 'bi-youtube', href: '#' },
                { icon: 'bi-linkedin', href: '#' }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-9 h-9 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 bg-slate-900/50 hover:text-white hover:bg-primary hover:border-primary hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                >
                  <i className={`bi ${social.icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="text-white mb-6 text-sm font-black tracking-widest uppercase">
              Quick Links
            </h5>
            <div className="flex flex-col space-y-3 text-sm font-medium">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Contact Us', href: '/contact' },
                { name: 'Our Services', href: '/services' },
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms & Condition', href: '/terms' }
              ].map((link, i) => (
                <Link 
                  key={i} 
                  href={link.href} 
                  className="group text-slate-400 hover:text-white transition-colors duration-300 relative inline-block self-start"
                >
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300 ease-in-out" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Photo Gallery */}
          <div>
            <h5 className="text-white mb-6 text-sm font-black tracking-widest uppercase">
              Photo Gallery
            </h5>
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div 
                  key={num} 
                  className="relative overflow-hidden aspect-square bg-slate-900 rounded-xl border border-slate-900 group"
                >
                  <img 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                    src={`/img/property-${num}.jpg`} 
                    alt={`Property ${num}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h5 className="text-white mb-6 text-sm font-black tracking-widest uppercase">
              Newsletter
            </h5>
            <p className="text-sm text-slate-400 leading-relaxed font-medium mb-4">
              Subscribe to get premium listings and market updates directly in your inbox.
            </p>
            <div className="relative mt-3 w-full">
              <input 
                className="w-full py-3.5 ps-4 pe-24 bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-colors" 
                type="email" 
                placeholder="Your email address"
              />
              <button 
                type="button" 
                className="absolute top-1.5 right-1.5 px-4 py-2 bg-slate-950 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg border border-slate-800 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
              >
                Sign Up
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-950/60 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4">
            
            {/* Copyright Info */}
            <div className="text-xs font-medium text-slate-500 text-center md:text-left leading-relaxed">
              &copy; {new Date().getFullYear()}{' '}
              <a className="text-slate-400 hover:text-white transition-colors" href="#">
                NoidaHub
              </a>
              . All Rights Reserved.
              <br className="md:hidden" />
              <span className="hidden md:inline"> | </span>
              Distributed By{' '}
              <a 
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 font-bold" 
                href="https://noidapropertyhub.vercel.app/" 
                target="_blank"
                rel="noopener noreferrer"
              >
                NoidaPropertyHub.com
              </a>
            </div>
            
            {/* Bottom Mini Links */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold">
              {[
                { name: 'Home', href: '/' },
                { name: 'Cookies', href: '/cookies' },
                { name: 'Help', href: '/help' },
                { name: 'FAQs', href: '/faqs' }
              ].map((bLink, i) => (
                <Link key={i} href={bLink.href} className="text-slate-500 hover:text-white transition-colors">
                  {bLink.name}
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}