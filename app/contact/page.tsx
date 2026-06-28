"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'Luxury Apartment',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // एंट्रेंस एनीमेशन फॉर हेडर एंड फ़ॉर्म कार्ड
      gsap.fromTo(".animate-header", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
      gsap.fromTo(".animate-card", 
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", delay: 0.1 }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // 1. बैकएंड API रूट पर डेटा भेजना (अगर आप API के जरिए SMS/WhatsApp हैंडल कर रहे हैं)
      const res = await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        // 2. फ़ॉलबैक (Fallback): अगर API सेट नहीं है, तो डायरेक्ट व्हाट्सएप पर री-डायरेक्ट करना
        const whatsappText = `*New Lead from NoidaHub*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Interest:* ${formData.propertyType}%0A*Message:* ${formData.message}`;
        window.open(`https://wa.me/917267997307?text=${whatsappText}`, '_blank');
        setStatus('success');
      }
    } catch (error) {
      // एरर आने पर भी व्हाट्सएप फ़ॉलबैक चालू रहेगा
      const whatsappText = `*New Lead from NoidaHub*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Interest:* ${formData.propertyType}%0A*Message:* ${formData.message}`;
      window.open(`https://wa.me/917267997307?text=${whatsappText}`, '_blank');
      setStatus('success');
    }
  };

  return (
   <>
   <Navbar />
    <div ref={pageRef} className="w-full min-h-screen bg-white relative overflow-hidden py-24 flex items-center">
      
      {/* ─── सिग्नेचर लक्ज़री नियॉन ओर्ब्स ─── */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-pink-500/10 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-tl from-blue-500/10 via-transparent to-transparent rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* लेफ्ट कॉलम: लक्ज़री इंफ़ो */}
        <div className="lg:col-span-5 space-y-8 text-left">
          <div className="animate-header">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-pink-500/10 to-blue-500/10 border border-pink-500/20 rounded-full mb-4 shadow-sm">
              <span className="w-2 h-2 bg-pink-500 rounded-full animate-ping" />
              <span className="text-[10px] font-black tracking-widest text-pink-600 uppercase">Direct Registry Access</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none mb-4">
              Connect with <br />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600">
                Our Specialists
              </span>
            </h1>
            <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-sm">
              Submit your project scope or investment goals. Your query will hit our direct operations dashboard instantly.
            </p>
          </div>

          <div className="space-y-4 animate-header">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center text-sm shadow-md">
                <i className="bi bi-telephone-fill"></i>
              </div>
              <div>
                <small className="block text-[9px] uppercase font-black text-slate-400 tracking-wider">Priority Desk</small>
                <span className="text-sm font-bold text-slate-800">+91 7267997307</span>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-pink-600 text-white flex items-center justify-center text-sm shadow-md">
                <i className="bi bi-envelope-fill"></i>
              </div>
              <div>
                <small className="block text-[9px] uppercase font-black text-slate-400 tracking-wider">Official Verification</small>
                <span className="text-sm font-bold text-slate-800">advisory@noidahub.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* राइट कॉलम: प्रीमियम ग्लासमोर्फिज़्म फ़ॉर्म */}
        <div className="lg:col-span-7 w-full">
          <div className="animate-card bg-white/70 backdrop-blur-xl border border-white/80 p-6 sm:p-10 rounded-3xl shadow-[0_30px_70px_-15px_rgba(15,23,42,0.08)]">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-2">Your Name</label>
                  <input 
                    type="text" required
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Vikram Malhotra"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/90 text-xs font-semibold text-slate-900 placeholder-slate-400 outline-none focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-2">Phone Number</label>
                  <input 
                    type="tel" required
                    value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="91XXXXXXXX"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/90 text-xs font-semibold text-slate-900 placeholder-slate-400 outline-none focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-2">Email Address</label>
                <input 
                  type="email" required
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="name@company.com"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/90 text-xs font-semibold text-slate-900 placeholder-slate-400 outline-none focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-2">Investment Interest</label>
                <select 
                  value={formData.propertyType} onChange={e => setFormData({...formData, propertyType: e.target.value})}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/90 text-xs font-semibold text-slate-700 outline-none appearance-none focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/10 transition-all"
                >
                  <option>Luxury Apartment</option>
                  <option>Exclusive Villa</option>
                  <option>Commercial Layout</option>
                  <option>Institutional Plot</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-2">Project Brief / Message</label>
                <textarea 
                  rows={4} required
                  value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                  placeholder="Describe your ideal location or deployment scale..."
                  className="w-full p-4 rounded-xl border border-slate-200 bg-white/90 text-xs font-semibold text-slate-900 placeholder-slate-400 outline-none resize-none focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/10 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full h-13 rounded-xl text-white font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-pink-600 via-purple-600 to-orange-500 border-none shadow-[0_6px_20px_rgba(236,72,153,0.25)] hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span>Processing...</span>
                ) : status === 'success' ? (
                  <span>✓ Transmitted Successfully</span>
                ) : (
                  <>
                    <i className="bi bi-send-fill text-xs"></i>
                    <span>Transmit Advisory Request</span>
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
    <Footer />
   </>
  );
}