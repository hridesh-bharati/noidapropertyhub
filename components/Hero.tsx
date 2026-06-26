'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { gsap } from 'gsap'
import * as THREE from 'three'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  
  // DOM References
  const heroRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const contactBtnRef = useRef<HTMLButtonElement>(null)
  const phoneLinkRef = useRef<HTMLAnchorElement>(null)
  const bottomTextRef = useRef<HTMLSpanElement>(null)
  
  // Three.js Canvas Reference
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const slides = ['/img/hero1.webp', '/img/hero1.webp'] 

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  // --- THREE.JS & GSAP INTEGRATION ---
  useEffect(() => {
    if (!canvasRef.current) return

    // 1. Scene Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: !isMobile // Disable antialias on mobile for performance
    })
    
    const resizeRenderer = () => {
      const width = heroRef.current?.clientWidth || window.innerWidth
      const height = heroRef.current?.clientHeight || 560
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2)) // Limit pixel ratio on mobile
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    resizeRenderer()

    // 2. 3D Elements - Reduce particles on mobile
    const verticesCount = isMobile ? 150 : 400
    const geometry = new THREE.BufferGeometry()
    const posArray = new Float32Array(verticesCount * 3)

    for (let i = 0; i < verticesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * (isMobile ? 8 : 12)
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.025 : 0.035,
      color: '#0ea5e9',
      transparent: true,
      opacity: isMobile ? 0.4 : 0.6,
      blending: THREE.AdditiveBlending
    })

    const particlesMesh = new THREE.Points(geometry, material)
    scene.add(particlesMesh)
    camera.position.z = isMobile ? 3 : 4

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    // 3. Mouse Move Parallax - Disabled on mobile (touch devices)
    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (event: MouseEvent) => {
      if (isMobile) return // Skip on mobile
      
      mouse.x = (event.clientX / window.innerWidth) - 0.5
      mouse.y = (event.clientY / window.innerHeight) - 0.5

      gsap.to(particlesMesh.rotation, {
        y: mouse.x * 0.5,
        x: -mouse.y * 0.5,
        duration: 1.5,
        ease: 'power2.out'
      })
    }
    window.addEventListener('mousemove', handleMouseMove)

    // 4. Animation Loop
    const clock = new THREE.Clock()
    let animationFrameId: number

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()
      // Slower rotation on mobile
      particlesMesh.rotation.y = elapsedTime * (isMobile ? 0.03 : 0.05)
      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    // 5. GSAP ANIMATIONS - Mobile Optimized
    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({ 
        defaults: { 
          ease: 'power3.out', 
          duration: isMobile ? 0.5 : 0.8 
        }
      })

      // Logo Animation
      masterTl.fromTo(logoRef.current, 
        { opacity: 0, y: isMobile ? -20 : -30 },
        { opacity: 1, y: 0, duration: isMobile ? 0.5 : 0.7 }
      )
      .fromTo('.logo-bar', 
        { scaleY: 0, transformOrigin: 'bottom' },
        { scaleY: 1, stagger: isMobile ? 0.05 : 0.1, duration: 0.4 },
        '-=0.3'
      )

      // Heading - Simplified animation on mobile
      masterTl.fromTo(headingRef.current, 
        { 
          opacity: 0, 
          x: isMobile ? -20 : -50, 
          y: isMobile ? 10 : 0,
          ...(isMobile ? {} : { rotationY: 15 })
        },
        { 
          opacity: 1, 
          x: 0, 
          y: 0,
          ...(isMobile ? {} : { rotationY: 0 }),
          duration: isMobile ? 0.6 : 0.9, 
          ease: isMobile ? 'power2.out' : 'back.out(1.2)' 
        },
        '-=0.2'
      )

      // Subtext
      masterTl.fromTo(subtextRef.current, 
        { 
          opacity: 0, 
          y: isMobile ? 15 : 30, 
          ...(isMobile ? {} : { filter: 'blur(10px)' })
        },
        { 
          opacity: 1, 
          y: 0, 
          ...(isMobile ? {} : { filter: 'blur(0px)' }),
          duration: isMobile ? 0.5 : 0.7 
        },
        '-=0.3'
      )

      // Contact Card - Simpler on mobile
      masterTl.fromTo(cardRef.current, 
        { 
          opacity: 0, 
          scale: isMobile ? 0.9 : 0.7, 
          ...(isMobile ? { y: 20 } : { x: 100, rotationZ: -5 })
        },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          x: 0,
          rotationZ: 0,
          duration: isMobile ? 0.7 : 1,
          ease: isMobile ? 'power2.out' : 'elastic.out(1, 0.8)'
        },
        '-=0.4'
      )

      // Card inner elements
      masterTl.fromTo('.card-inner > *', 
        { opacity: 0, y: 10, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          stagger: isMobile ? 0.1 : 0.15,
          duration: 0.4,
          ease: 'power2.out'
        },
        '-=0.5'
      )

      // Contact Button
      masterTl.fromTo(contactBtnRef.current,
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.4,
          ease: 'back.out(1.5)'
        },
        '-=0.2'
      )

      // Phone Link
      masterTl.fromTo(phoneLinkRef.current,
        { opacity: 0, x: isMobile ? 0 : 20, y: isMobile ? 10 : 0 },
        { opacity: 1, x: 0, y: 0, duration: 0.4 },
        '-=0.1'
      )

      // Bottom Text
      masterTl.fromTo(bottomTextRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3 },
        '-=0.1'
      )

      // 3D Particles entrance - Faster on mobile
      gsap.from(particlesMesh.scale, { 
        x: 0, 
        y: 0, 
        z: 0, 
        duration: isMobile ? 1 : 1.5, 
        ease: 'power3.out',
        delay: 0.2
      })

      // NO FLOATING/VIBRATING ANIMATIONS - Removed heading and card floating

    }, heroRef)

    // Window Resize Handling
    const handleResize = () => {
      resizeRenderer()
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [isMobile])

  return (
    <div ref={heroRef} className="container-fluid p-0 m-0 bg-slate-950 w-full overflow-hidden relative">
      <div className="relative w-full h-[400px] sm:h-[420px] md:h-[500px] lg:h-[560px]">
        
        {/* Carousel Background Section */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40">
          {slides.map((slide, index) => (
            <img
              key={index}
              className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
              }`}
              src={slide}
              alt={`Property Banner ${index + 1}`}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>

        {/* THREE.JS 3D CANVAS LAYER */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" />

        {/* Overlay Content Area */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-20 select-none">
          <div className="relative w-full h-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center">
            
            {/* Left Section: Branding & Main Typography */}
            <div className="absolute left-[4%] sm:left-[6%] top-[10%] sm:top-[14%] bottom-[8%] flex flex-col justify-between max-w-[85%] sm:max-w-[60%] md:max-w-[50%] pointer-events-auto text-white">
              
              {/* Logo Layout */}
              <div ref={logoRef} className="flex items-center space-x-2 mt-3">
                <div className="flex items-end space-x-0.5 h-[14px] sm:h-[16px] md:h-[22px]">
                  <div className="logo-bar w-[3px] sm:w-[3.5px] h-[50%] bg-white"></div>
                  <div className="logo-bar w-[3px] sm:w-[3.5px] h-[100%] bg-white"></div>
                  <div className="logo-bar w-[3px] sm:w-[3.5px] h-[70%] bg-white"></div>
                </div>
                <span className="text-white text-xs sm:text-lg md:text-2xl font-bold tracking-tight">
                  NoidaProperty<span className="font-normal opacity-95">Hb.com</span>
                </span>
              </div>

              {/* Main Heading & Subtitle */}
              <div className="my-auto">
                <h1 ref={headingRef} className="text-xl sm:text-4xl md:text-5xl lg:text-[56px] font-black uppercase tracking-wide leading-[1.1] sm:leading-[1.1] drop-shadow-md">
                  Unlock Your <br />
                  Dream Space <br />
                  In Noida
                </h1>
                
                <p ref={subtextRef} className="mt-2 sm:mt-4 text-[10px] sm:text-xs md:text-lg font-medium text-white opacity-95 tracking-wide max-w-[95%]">
                  Premium Commercial & Luxury Residential Properties
                </p>
              </div>
              
              <div></div>
            </div>

            {/* Right Section: Slanted Contact Card - Mobile optimized */}
            <div 
              ref={cardRef} 
              className="absolute top-[50%] right-[2%] sm:right-[5%] md:right-[8%] lg:right-[22%] bg-white/95 backdrop-blur-sm px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 rounded-lg shadow-2xl flex flex-col items-center justify-center border border-gray-100 pointer-events-auto min-w-[180px] sm:min-w-[240px] md:min-w-[320px]"
              style={{ 
                transform: `translateY(-50%) ${isMobile ? 'skewX(0deg)' : 'skewX(-12deg)'}`,
              }}
            >
              {/* Inner Content Container */}
              <div 
                className="card-inner w-full flex flex-col items-center justify-center"
                style={{ 
                  transform: isMobile ? 'skewX(0deg)' : 'skewX(12deg)',
                }}
              >
                
                {/* Contact Us Button */}
                <button 
                  ref={contactBtnRef}
                  className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider px-4 py-1.5 sm:px-6 sm:py-2 md:px-8 md:py-2.5 rounded-full shadow-md active:from-emerald-700 active:to-teal-600 hover:from-emerald-700 hover:to-teal-600 transition-all duration-300 w-full text-center touch-manipulation"
                >
                  Contact Us
                </button>
                
                {/* Phone Number Section */}
                <a 
                  ref={phoneLinkRef}
                  href="tel:+917267995307" 
                  className="mt-2 sm:mt-3 md:mt-4 flex items-center space-x-1.5 sm:space-x-2 text-slate-800 active:text-blue-600 hover:text-blue-600 transition-colors touch-manipulation"
                >
                  <div className="bg-teal-50 p-1 sm:p-1.5 md:p-2 rounded-full border border-teal-100">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-1C7.22 18 2 12.78 2 6V3z"/>
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm md:text-lg font-extrabold whitespace-nowrap">
                    CALL NOW: +91 7267995307
                  </span>
                </a>
                
                {/* Bottom Subtext */}
                <span 
                  ref={bottomTextRef}
                  className="text-[8px] sm:text-[10px] md:text-xs text-gray-500 mt-1.5 sm:mt-2 font-medium tracking-wide uppercase"
                >
                  Explore Top Locations
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}