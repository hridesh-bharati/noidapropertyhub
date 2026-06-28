"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPageContent() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.animate-section');
      sections.forEach((sec: any) => {
        gsap.fromTo(sec.querySelectorAll('.anim-el'),
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      gsap.fromTo('.founder-mask',
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", opacity: 0 },
        {
          clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: ".founder-mask",
            start: "top 85%"
          }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="w-full bg-white relative overflow-hidden">
      
      {/* ─── Background Orbs ─── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a03_1px,transparent_1px),linear-gradient(to_bottom,#0f172a03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
      <div className="absolute top-[5%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-transparent rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[35%] right-[-15%] w-[700px] h-[700px] bg-gradient-to-tl from-blue-500/20 via-cyan-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[550px] h-[550px] bg-gradient-to-tr from-purple-500/15 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[60%] left-[40%] w-[300px] h-[300px] bg-gradient-to-r from-orange-400/10 to-pink-400/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">

        {/* ===== SECTION 1: HERO - GRADIENT BACKGROUND ===== */}
        <section className="animate-section relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/80 to-indigo-900 rounded-b-[3rem] mx-4 lg:mx-8 mt-4">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 sm:py-28 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="anim-el text-[11px] font-bold tracking-[0.3em] text-pink-300 uppercase mb-4 block">Our Manifesto</span>
                <h1 className="anim-el text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none mb-6">
                  Precision in <br />
                  <span className="font-serif italic font-normal bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Real Estate Strategy.
                  </span>
                </h1>
                <p className="anim-el text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-xl mb-8">
                  ESTATE LION bridges the gap between complex market dynamics and informed investment decisions. We are not just advisors — we are strategic partners in asset growth.
                </p>
                <div className="anim-el flex items-center gap-4 flex-wrap">
                  <Link href="/contact" className="px-8 py-3.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-xl hover:shadow-pink-500/30 transition-all shadow-md">Partner With Us</Link>
                  <Link href="#founder" className="px-8 py-3.5 border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm">Read Legacy</Link>
                </div>
              </div>
              <div className="anim-el relative">
                <div className="w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-8xl mb-4">🏢</div>
                    <p className="text-white/80 font-medium text-lg">Premium Real Estate Advisory</p>
                    <p className="text-slate-400 text-sm mt-2">Delhi • Noida • Gurugram</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats - Light & Glossy */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10">
              {[
                { num: "12+", text: "Years of Excellence" },
                { num: "5M+", text: "Sq. Ft. Transacted" },
                { num: "3000+", text: "Corporate Clients" },
                { num: "4", text: "High Growth Centers" }
              ].map((stat, idx) => (
                <div key={idx} className="anim-el text-center md:text-left">
                  <div className="text-3xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-0.5">{stat.num}</div>
                  <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">{stat.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 2: FOUNDER - WARM & ELEGANT ===== */}
        <section id="founder" className="animate-section max-w-6xl mx-auto px-6 lg:px-8 py-24">
          <div className="bg-gradient-to-br from-amber-50 via-orange-50/50 to-rose-50 rounded-3xl p-8 lg:p-12 shadow-xl border border-amber-100/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="text-amber-600 text-5xl mb-3">“</div>
                <h3 className="text-2xl font-light text-slate-800 mb-6 tracking-tight">
                  From the Desk <br />
                  <span className="font-serif italic font-normal text-amber-600">of the Founder</span>
                </h3>
                <div className="founder-mask w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-2 border-amber-200/50 bg-gradient-to-b from-amber-200 to-amber-300 flex items-center justify-center mb-4">
                  <div className="text-center p-6">
                    <div className="text-8xl mb-3">👤</div>
                    <p className="text-slate-700 font-medium text-sm">Amit Sharma</p>
                    <p className="text-slate-500 text-xs">Founder & Director</p>
                  </div>
                </div>
                <h5 className="font-black text-slate-800 tracking-tight text-base mb-0.5">Amit Sharma</h5>
                <small className="text-[10px] uppercase tracking-widest font-extrabold text-amber-600">Founder & Director, ESTATE LION</small>
              </div>

              <div className="lg:col-span-8 text-slate-700 text-sm sm:text-base font-medium leading-relaxed space-y-6 pt-4">
                <p className="text-slate-800 font-bold text-lg border-l-4 border-amber-500 ps-4 mb-6">
                  "Real estate, at its core, is not about transactions. It is about decisions—decisions that impact businesses, capital allocation, growth trajectories, and long-term outcomes."
                </p>
                <p>
                  When ESTATE LION was conceived, the objective was clear: to build a real estate advisory platform rooted in clarity, intelligence, and accountability, not noise or volume. In a market often driven by urgency and opacity, we chose a different path — one that prioritizes insight over inventory, relationships over short-term gains, and trust over transactions.
                </p>
                <p>
                  Over the years, I have had the opportunity to work closely with corporate leaders, entrepreneurs, developers, and institutional decision-makers across Delhi NCR. A consistent pattern emerged: the most successful outcomes were never the result of speed, but of structured thinking, deep market understanding, and honest counsel.
                </p>
                <div className="p-5 bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-200/50 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700">
                  💡 ESTATE LION continues to grow through enduring relationships rather than aggressive expansion. We work with a defined set of clients, invest time in understanding their context, and deliver outcomes that stand the test of time.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 3: EXPERTISE - VIBRANT CARDS ===== */}
        <section className="animate-section max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="anim-el text-[10px] font-bold tracking-[0.3em] text-blue-600 uppercase mb-3 block">Our Expertise</span>
            <h2 className="anim-el text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Why Industry <span className="font-serif italic font-normal bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Leaders Choose Us</span>
            </h2>
            <p className="anim-el text-sm text-slate-500 mt-4 max-w-xl mx-auto">
              We move beyond standard listings to deliver intelligence-led advisory — every recommendation is backed by market data, compliance diligence, and a long-term value lens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "📊", title: "Market Intelligence", desc: "Access to real-time transaction data and sector trends. We advise based on where the market is going, not just where it is today.", gradient: "from-blue-500 to-cyan-500" },
              { icon: "🛡️", title: "Risk & Compliance", desc: "We handle the rigorous paperwork and legal compliance, ensuring a lean, transparent, and legally sound transaction every time.", gradient: "from-purple-500 to-pink-500" },
              { icon: "🤝", title: "Relationship First", desc: "Success is not a one-time deal. We build multi-year partnerships, acting as your dedicated real estate department.", gradient: "from-orange-500 to-rose-500" }
            ].map((box, i) => (
              <div key={i} className="anim-el group relative overflow-hidden bg-white border border-slate-100 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className={`absolute inset-0 bg-gradient-to-br ${box.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className="relative">
                  <div className={`text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block p-3 rounded-2xl bg-gradient-to-br ${box.gradient} bg-opacity-10`}>
                    {box.icon}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 tracking-tight mb-3">{box.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">{box.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* End-to-End Banner - Colorful Gradient */}
          <div className="anim-el mt-12 relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 sm:p-12 shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
              <div className="lg:col-span-8">
                <h4 className="text-xl sm:text-2xl font-bold tracking-tight mb-3 text-white">End-to-End Execution</h4>
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  From site selection and negotiation to fit-out advisory and lease management. We streamline the entire lifecycle of your property needs across New Delhi, Noida, and Gurugram.
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl text-white border border-white/30 animate-pulse">→</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 4: ENGAGEMENT MODEL - COLORFUL BACKGROUND ===== */}
        <section className="animate-section max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-8 lg:p-12 shadow-xl border border-blue-100/50">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-5 anim-el">
                <div className="w-full h-[340px] sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <div className="text-center p-8">
                    <div className="text-7xl mb-4">🏗️</div>
                    <p className="text-slate-700 font-medium text-lg">Strategic Advisory</p>
                    <p className="text-slate-500 text-sm">3-Step Engagement Model</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-8">
                <div>
                  <span className="anim-el text-[10px] font-bold tracking-[0.3em] text-cyan-600 uppercase mb-3 block">How We Work</span>
                  <h2 className="anim-el text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    Our Engagement <span className="font-serif italic font-normal bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Model</span>
                  </h2>
                  <p className="anim-el text-sm text-slate-600 mt-2">
                    A disciplined three-step process that turns requirement intake into a closed, compliant transaction — with you informed at every stage.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    { num: "01", title: "Requirement Analysis", desc: "We begin by understanding your operational needs, financial constraints, and long-term growth plans.", color: "from-cyan-500 to-blue-500" },
                    { num: "02", title: "Market Scanning & Selection", desc: "Utilizing our proprietary database to identify on-market and off-market opportunities that match your criteria.", color: "from-blue-500 to-indigo-500" },
                    { num: "03", title: "Negotiation & Closure", desc: "We leverage our transaction volume to secure the best commercial terms, ensuring legal diligence is flawless.", color: "from-indigo-500 to-purple-500" }
                  ].map((step, idx) => (
                    <div key={idx} className="anim-el group flex items-start gap-4 p-5 rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 shadow-sm hover:shadow-lg border border-white/50">
                      <div className={`text-xl font-black bg-gradient-to-br ${step.color} bg-clip-text text-transparent min-w-[40px]`}>{step.num}</div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 mb-1 tracking-tight">{step.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ===== SECTION 5: VISION + MISSION + LEADERSHIP - COLORFUL CARDS ===== */}
        <section className="animate-section max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            <div className="anim-el group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
              <div className="relative">
                <div className="text-4xl mb-4">🔭</div>
                <h3 className="text-2xl font-black tracking-tight mb-3">Our Vision</h3>
                <p className="text-sm text-white/80 font-medium leading-relaxed">
                  Beyond Square Footage. To redefine real estate advisory through intelligence, integrity, and lasting impact.
                </p>
              </div>
            </div>

            <div className="anim-el group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
              <div className="relative">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-black tracking-tight mb-3">Our Mission</h3>
                <p className="text-sm text-white/80 font-medium leading-relaxed">
                  Empower every client with transparent, data-backed counsel that aligns real estate with long-term business strategy.
                </p>
              </div>
            </div>

            <div className="anim-el group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
              <div className="relative">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-2xl font-black tracking-tight mb-3">Leadership</h3>
                <p className="text-sm text-white/80 font-medium leading-relaxed">
                  A senior team with deep experience across real estate advisory, market analysis, and transaction execution — accountable to every mandate.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ===== SECTION 6: CTA - VIBRANT GRADIENT ===== */}
        <section className="animate-section max-w-5xl mx-auto px-6 lg:px-8 py-20 sm:py-24">
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600 p-10 sm:p-16 text-center shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <span className="anim-el text-[10px] font-bold tracking-[0.3em] text-white/80 uppercase mb-4 block">Let's Talk</span>
              <h2 className="anim-el text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
                Ready to Optimize Your <br />
                <span className="font-serif italic font-normal text-white/90">Real Estate Portfolio?</span>
              </h2>
              <p className="anim-el text-xs sm:text-sm text-white/70 font-medium max-w-xl mx-auto leading-relaxed mb-8">
                Whether you're a multinational scouting a headquarters or an investor hunting yield, ESTATE LION brings the advisory, rigour, and network to get it right.
              </p>
              <div className="anim-el flex flex-wrap justify-center gap-4">
                <Link 
                  href="/contact" 
                  className="inline-block text-xs font-black tracking-widest text-purple-900 bg-white px-10 py-4 rounded-xl hover:bg-white/90 transition-all duration-300 uppercase shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  Talk to an Expert
                </Link>
                <Link 
                  href="/properties" 
                  className="inline-block text-xs font-black tracking-widest text-white border-2 border-white/50 px-10 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 uppercase backdrop-blur-sm hover:-translate-y-0.5"
                >
                  Explore Properties
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 7: FOOTER LINKS ===== */}
        <section className="animate-section max-w-7xl mx-auto px-6 lg:px-8 py-16 border-t border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div>
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'About Us', 'Contact Us', 'Privacy Policy'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-slate-500 hover:text-pink-600 transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4">Popular Locations</h4>
              <ul className="space-y-3">
                {[
                  'Office for Rent in Noida',
                  'Office for Rent in Delhi',
                  'Office for Rent in Gurgaon',
                  'Office for Rent in DLF Cyber City',
                  'Office for Rent in Aerocity, Delhi'
                ].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-slate-500 hover:text-pink-600 transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-3">
                {['ESTATE LION', '2nd Floor, Plot No-1, Film City', 'Sector-16A Noida - 201301', '+91 9999320114', '© 2014-2026 ESTATELION.COM'].map((item) => (
                  <li key={item} className="text-sm text-slate-500">{item}</li>
                ))}
              </ul>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}