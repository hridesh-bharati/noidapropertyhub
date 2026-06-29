'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { gsap } from 'gsap'
import * as THREE from 'three'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [showMobileForm, setShowMobileForm] = useState<boolean>(false)
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
  const submitBtnRef = useRef<HTMLButtonElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
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
    setShowMobileForm(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // --- THREE.JS PARTICLES MECHANISM ---
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
      const height = heroRef.current?.clientHeight || 680
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    resizeRenderer()

    const verticesCount = isMobile ? 180 : 450
    const geometry = new THREE.BufferGeometry()
    const posArray = new Float32Array(verticesCount * 3)

    for (let i = 0; i < verticesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * (isMobile ? 7 : 11)
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

    // रॉयल ब्लू थीम कलर सिंक
    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.022 : 0.032,
      color: '#2563EB',
      transparent: true,
      opacity: isMobile ? 0.4 : 0.65,
      blending: THREE.AdditiveBlending
    })

    const particlesMesh = new THREE.Points(geometry, material)
    scene.add(particlesMesh)
    camera.position.z = isMobile ? 3 : 4

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (event: MouseEvent) => {
      if (isMobile) return
      mouse.x = (event.clientX / window.innerWidth) - 0.5
      mouse.y = (event.clientY / window.innerHeight) - 0.5

      gsap.to(particlesMesh.rotation, {
        y: mouse.x * 0.4,
        x: -mouse.y * 0.4,
        duration: 1.8,
        ease: 'power2.out'
      })
    }
    window.addEventListener('mousemove', handleMouseMove)

    const clock = new THREE.Clock()
    let animationFrameId: number

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()
      particlesMesh.rotation.y = elapsedTime * (isMobile ? 0.02 : 0.04)
      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    // --- GSAP STAGGER ENTRANCE ---
    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({
        defaults: { ease: 'power4.out', duration: isMobile ? 0.5 : 0.8 }
      })

      masterTl.fromTo(logoRef.current, { opacity: 0, y: -25 }, { opacity: 1, y: 0 })
              .fromTo('.logo-bar', { scaleY: 0, transformOrigin: 'bottom' }, { scaleY: 1, stagger: 0.08, duration: 0.35 }, '-=0.4')

      masterTl.fromTo(headingRef.current, 
        { opacity: 0, y: 30, rotationX: isMobile ? 0 : 10 }, 
        { opacity: 1, y: 0, rotationX: 0, duration: 0.9 }, 
        '-=0.3'
      )

      masterTl.fromTo(subtextRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6 }, '-=0.4')

      masterTl.fromTo(cardRef.current, 
        { opacity: 0, scale: 0.95, y: 40 }, 
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.1)' }, 
        '-=0.5'
      )

      if (statsRef.current) {
        masterTl.fromTo(statsRef.current.children, 
          { opacity: 0, y: 15 }, 
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 }, 
          '-=0.4'
        )
      }
    }, heroRef)

    window.addEventListener('resize', resizeRenderer)

    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resizeRenderer)
      cancelAnimationFrame(animationFrameId)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [isMobile])

  return (
    <div ref={heroRef} className="w-full bg-slate-950 overflow-hidden relative select-none font-sans">
      
      {/* 1. फुल-स्क्रीन इमेज बैनर लेयर */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-45 bg-slate-900">
        {slides.map((slide, index) => (
          <img
            key={index}
            className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-102 duration-[5000ms] ease-out' : 'opacity-0'
            }`}
            src={slide}
            alt={`Property Banner ${index + 1}`}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        ))}
        {/* लक्ज़री डार्क सिनेमैटिक ओवरले */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      {/* 2. THREE.JS 3D काइनेटिक पार्टिकल्स लेयर */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" />

      {/* 3. मेन कंटेंट ग्रिड */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 min-h-[640px] sm:min-h-[700px] md:min-h-[760px] flex flex-col justify-center pt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full">
          
          {/* लेफ्ट कॉलम: ब्रांडिंग और लक्ज़री टाइपोग्राफी */}
          <div className="md:col-span-7 flex flex-col justify-center text-white pointer-events-auto">
            
            {/* गूगल रिव्यूज और RERA ट्रस्ट बैज */}
            <div ref={logoRef} className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md shadow-sm">
                <i className="bi bi-google text-amber-400 text-xs"></i>
                <div className="flex gap-0.5 text-amber-400 text-[10px]">
                  <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                </div>
                <span className="text-[10px] font-bold text-slate-200">4.9 (500+ Reviews)</span>
              </div>
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md">
                <i className="bi bi-shield-check text-emerald-400 text-xs"></i>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">100% RERA Verified</span>
              </div>
            </div>

            {/* मुख्य टाइटल */}
            <h1 ref={headingRef} className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[1.05] mb-4">
              Unlock Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 drop-shadow-md">
                Dream Space
              </span> <br />
              In Noida
            </h1>

            {/* सब-डिस्क्रिप्शन */}
            <p ref={subtextRef} className="text-slate-300 text-sm sm:text-base md:text-lg font-medium tracking-wide max-w-xl border-l-2 border-cyan-500 pl-4 leading-relaxed mb-10">
              Explore Premium Commercial Assets & Ultra-Luxury Residential Spaces. Managed with precision and discretion.
            </p>

            {/* चैटजीपीटी द्वारा सुझाए गए मिसिंग प्रीमियम लाइव स्टैट्स */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 max-w-md pt-4 border-t border-white/10">
              <div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-white">500+</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Premium Nodes</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-white">150+</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Top Builders</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-white">99.4%</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Vetted Rate</div>
              </div>
            </div>
          </div>

          {/* राइट कॉलम: डेस्कटॉप मीडिया इन्क्वायरी फॉर्म (चैटजीपीटी और नेटिव ऐप स्टाइल) */}
          <div className="md:col-span-5 hidden md:block">
            <div ref={cardRef} className="bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] p-6 lg:p-7 border border-slate-100 w-full max-w-[380px] ml-auto pointer-events-auto">
              <div className="text-center mb-5">
                <span className="text-[11px] font-extrabold text-[#2563EB] tracking-widest uppercase flex items-center justify-center gap-1.5">
                  <i className="bi bi-whatsapp text-emerald-500 text-sm"></i> WhatsApp Enquiry
                </span>
                <div className="w-12 h-[1.5px] bg-[#2563EB]/20 mx-auto mt-2 rounded-full"></div>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-3.5">
                <div className="form-field">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full h-11 px-4 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all text-slate-900 font-semibold"
                  />
                </div>
                <div className="form-field">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full h-11 px-4 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all text-slate-900 font-semibold"
                  />
                </div>
                <div className="form-field">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all text-slate-900 font-semibold resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-blue-500/10 hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className="bi bi-send-fill text-[11px]"></i> Connect Instantly
                </button>
              </form>
              <span className="block text-[8px] text-slate-400 mt-3 text-center font-bold tracking-widest uppercase">
                Quick Response • 24/7 Digital Desk
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 4. मोबाइल के लिए नेटिव फ्लोटिंग एक्शन बटन */}
      <div className="fixed bottom-6 right-5 md:hidden z-[999]">
        <button
          onClick={() => setShowMobileForm(true)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4] shadow-xl active:scale-95 transition-all flex items-center justify-center text-white"
        >
          <span className="absolute inset-0 rounded-full bg-[#06B6D4] animate-ping opacity-25"></span>
          <i className="bi bi-chat-square-text text-xl"></i>
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center animate-bounce">
            !
          </span>
        </button>
      </div>

      {/* 5. मोबाइल बॉटम शीट पॉपअप फॉर्म (बग पूरी तरह फिक्स) */}
      {showMobileForm && (
        <div className="fixed inset-0 z-[1000] md:hidden bg-black/60 backdrop-blur-sm flex items-end transition-opacity duration-300">
          <div className="absolute inset-0" onClick={() => setShowMobileForm(false)} />
          <div className="bg-white w-full rounded-t-3xl p-6 relative z-10 animate-slide-up shadow-[0_-10px_30px_rgba(0,0,0,0.15)] pointer-events-auto">
            {/* टॉप ड्रैग नॉच */}
            <div className="w-12 h-1 bg-slate-200 mx-auto rounded-full mb-5" onClick={() => setShowMobileForm(false)} />
            
            <div className="flex justify-between items-center mb-5">
              <h4 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                <i className="bi bi-whatsapp text-emerald-500"></i> WhatsApp Enquiry
              </h4>
              <button onClick={() => setShowMobileForm(false)} className="text-slate-400 hover:text-slate-600">
                <i className="bi bi-x-circle-fill text-lg"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full h-11 px-4 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2563EB] text-slate-900 font-semibold"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full h-11 px-4 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2563EB] text-slate-900 font-semibold"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={2}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2563EB] text-slate-900 font-semibold resize-none"
              />
              <button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <i className="bi bi-whatsapp"></i> Send Message
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}