'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { gsap } from 'gsap'
import * as THREE from 'three'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  })

  // DOM References
  const heroRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const phoneInputRef = useRef<HTMLInputElement>(null)
  const messageInputRef = useRef<HTMLTextAreaElement>(null)
  const submitBtnRef = useRef<HTMLButtonElement>(null)
  const bottomTextRef = useRef<HTMLSpanElement>(null)
  const [showMobileForm, setShowMobileForm] = useState(false);
  
  // Three.js Canvas Reference
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const slides = ['/img/home1.png', '/img/home2.png']

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, phone, message } = formData
    const whatsappMessage = `Hello NoidaPropertyHub!%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AMessage: ${encodeURIComponent(message)}`
    window.open(`https://wa.me/917267995307?text=${whatsappMessage}`, '_blank')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // --- THREE.JS & GSAP INTEGRATION ---
  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: !isMobile
    })

    const resizeRenderer = () => {
      const width = heroRef.current?.clientWidth || window.innerWidth
      const height = heroRef.current?.clientHeight || 560
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    resizeRenderer()

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

    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (event: MouseEvent) => {
      if (isMobile) return

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

    const clock = new THREE.Clock()
    let animationFrameId: number

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()
      particlesMesh.rotation.y = elapsedTime * (isMobile ? 0.03 : 0.05)
      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          duration: isMobile ? 0.5 : 0.8
        }
      })

      masterTl.fromTo(logoRef.current,
        { opacity: 0, y: isMobile ? -20 : -30 },
        { opacity: 1, y: 0, duration: isMobile ? 0.5 : 0.7 }
      )
        .fromTo('.logo-bar',
          { scaleY: 0, transformOrigin: 'bottom' },
          { scaleY: 1, stagger: isMobile ? 0.05 : 0.1, duration: 0.4 },
          '-=0.3'
        )

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

      // Form Card Entrance - Zoom In Effect
      masterTl.fromTo(cardRef.current,
        {
          opacity: 0,
          scale: 0.3,
          rotationZ: isMobile ? 0 : -5
        },
        {
          opacity: 1,
          scale: 1,
          rotationZ: 0,
          duration: isMobile ? 0.8 : 1.2,
          ease: 'back.out(1.7)'
        },
        '-=0.4'
      )

      // Form Fields Animation
      masterTl.fromTo('.form-field',
        { opacity: 0, x: -30, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out'
        },
        '-=0.5'
      )

      // Submit Button - Left to Right
      masterTl.fromTo(submitBtnRef.current,
        { x: -50, opacity: 0, scale: 0.8 },
        { x: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' },
        '-=0.2'
      )

      masterTl.fromTo(bottomTextRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.3 },
        '-=0.1'
      )

      gsap.from(particlesMesh.scale, {
        x: 0, y: 0, z: 0,
        duration: isMobile ? 1 : 1.5,
        ease: 'power3.out',
        delay: 0.2
      })
    }, heroRef)

    const handleResize = () => {
      resizeRenderer()
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)

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
      <div className="relative w-full h-[500px] sm:h-[550px] md:h-[650px] lg:h-[720px]">

        {/* Carousel Background Section */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-50 bg-slate-900">
          {slides.map((slide, index) => (
            <img
              key={index}
              className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 scale-105 duration-[5000ms] ease-out z-0' : 'opacity-0 -z-10'
                }`}
              src={slide}
              alt={`Property Banner ${index + 1}`}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-transparent z-0" />
        </div>

        {/* THREE.JS 3D CANVAS LAYER */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" />

        {/* Overlay Content Area */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-20 select-none">
          <div className="relative w-full h-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center">

            {/* Left Section: Branding */}
            <div className="absolute left-[4%] sm:left-[6%] top-[10%] sm:top-[14%] bottom-[10%] flex flex-col justify-between max-w-[90%] sm:max-w-[65%] md:max-w-[55%] pointer-events-auto text-white">

              <div ref={logoRef} className="flex items-center space-x-2.5 mt-13">
                <div className="flex items-end space-x-0.5 h-[16px] sm:h-[18px] md:h-[24px]">
                  <div className="logo-bar w-[3px] sm:w-[3.5px] h-[50%] bg-gradient-to-t from-sky-500 to-emerald-400 rounded-full"></div>
                  <div className="logo-bar w-[3px] sm:w-[3.5px] h-[100%] bg-gradient-to-t from-sky-500 to-emerald-400 rounded-full"></div>
                  <div className="logo-bar w-[3px] sm:w-[3.5px] h-[70%] bg-gradient-to-t from-sky-500 to-emerald-400 rounded-full"></div>
                </div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 text-sm sm:text-xl md:text-2xl font-black tracking-tight drop-shadow-sm">
                  NoidaProperty<span className="font-light opacity-90 text-sky-400">Hub.com</span>
                </span>
              </div>

              <div className="my-auto py-6">
                <span className="block text-[9px] sm:text-xs md:text-sm font-bold tracking-[0.3em] text-emerald-400 uppercase mb-2 drop-shadow-md">
                  // Premium Real Estate Hub
                </span>

                <h1 ref={headingRef} className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-black uppercase tracking-tight leading-[1.05] drop-shadow-2xl text-white">
                  Unlock Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 filter drop-shadow-[0_4px_12px_rgba(14,165,233,0.3)]">
                    Dream Space
                  </span> <br />
                  In Noida
                </h1>

                <p ref={subtextRef} className="mt-4 sm:mt-6 text-[11px] sm:text-sm md:text-lg font-medium text-slate-300 tracking-wide max-w-[90%] border-l-2 border-emerald-500/50 pl-4 leading-relaxed">
                  Explore Premium Commercial Assets & Ultra-Luxury Residential Spaces.
                </p>
              </div>

              <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest hidden sm:block">
                Authorized RERA Registered Projects Only
              </div>
            </div>

            {/* Right Section: WhatsApp Form Card - Hide on Mobile */}
            <div
              ref={cardRef}
              className="absolute hidden md:flex top-[56%] right-[5%] lg:right-[10%] bg-white/95 backdrop-blur-md px-5 py-4 sm:px-6 sm:py-5 md:px-7 md:py-6 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,.5)] flex-col border border-white/20 pointer-events-auto min-w-[240px] sm:min-w-[280px] md:min-w-[320px]"
              style={{ transform: "translateY(-50%)" }}
            >
              <div className="card-inner w-full">
                <div className="text-center mb-3">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">📱 WhatsApp Enquiry</span>
                  <div className="w-10 h-0.5 bg-emerald-400/50 mx-auto mt-1.5 rounded-full"></div>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="w-full">
                  <div className="form-field mb-2.5">
                    <input
                      ref={nameInputRef}
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div className="form-field mb-2.5">
                    <input
                      ref={phoneInputRef}
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div className="form-field mb-3">
                    <textarea
                      ref={messageInputRef}
                      name="message"
                      placeholder="Your Message"
                      rows={2}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all placeholder:text-slate-400 resize-none"
                    />
                  </div>

                  <button
                    ref={submitBtnRef}
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 text-white font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg shadow-lg hover:shadow-emerald-500/30 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Send on WhatsApp
                  </button>
                </form>

                <span
                  ref={bottomTextRef}
                  className="block text-[8px] text-slate-400 mt-2.5 text-center font-bold tracking-widest uppercase"
                >
                  Quick Response • 24/7 Support
                </span>
              </div>
              
            </div>
            {/* Mobile Help / WhatsApp Floating Button */}
            <div className="fixed bottom-18 right-5 md:hidden z-[9999]">
              <button
                onClick={() => setShowMobileForm(true)}
                className="group relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 via-green-500 to-cyan-500 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
              >
                {/* Ripple Animation */}
                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20"></span>

                {/* Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="relative w-8 h-8 text-white"
                >
                  <path d="M20.52 3.48A11.83 11.83 0 0012.05 0C5.5 0 .16 5.34.16 11.89c0 2.09.55 4.14 1.59 5.95L0 24l6.47-1.7a11.88 11.88 0 005.58 1.43h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.43-8.36zM12.06 21.8h-.01a9.92 9.92 0 01-5.04-1.38l-.36-.21-3.84 1.01 1.03-3.74-.24-.38a9.93 9.93 0 01-1.52-5.28C2.08 6.36 6.5 1.94 12.05 1.94c2.65 0 5.14 1.03 7.01 2.9a9.86 9.86 0 012.9 7.02c0 5.55-4.42 9.94-9.9 9.94z" />
                </svg>

                {/* Help Badge */}
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                  ?
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}