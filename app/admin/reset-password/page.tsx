'use client'
import { useState } from 'react'
import { auth } from '@/lib/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ResetPasswordForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // सुरक्षा चेक: सिर्फ अधिकृत ईमेल को ही पासवर्ड रीसेट लिंक भेजने की अनुमति
    const allowedEmail = 'hridesh027@gmail.com'

    if (email.trim().toLowerCase() !== allowedEmail) {
      alert('You are not authorized to reset password for this admin hub!')
      setLoading(false)
      return
    }

    try {
      // फायरबेस के जरिए ईमेल पर पासवर्ड रीसेट लिंक भेजना
      await sendPasswordResetEmail(auth, email)
      alert('Password reset link sent to your email! Please check your inbox.')
      router.push('/admin/login')
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-body w-full min-h-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md p-8 auth-card rounded-3xl shadow-xl border border-slate-100/80 mx-auto transition-all duration-300 max-h-[90vh] mobile-scroll overflow-y-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Reset Password</h2>
          <p className="text-xs text-slate-400 font-semibold mt-1 tracking-wide">Enter your authorized email to receive reset link</p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="relative flex items-center">
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              className="w-full px-4 py-3.5 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:border-slate-900 focus:bg-white transition-all" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-3.5 bg-slate-950 text-white font-bold rounded-xl text-xs uppercase tracking-widest shadow-lg hover:bg-slate-900 disabled:opacity-50 transition-all mt-2"
          >
            {loading ? 'Sending Link...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <hr className="border-slate-100" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or</span>
        </div>
        
        <div className="flex flex-col items-center gap-2 text-xs">
          <p className="text-slate-500 font-medium">Remembered your password? <Link href="/admin/login" className="text-slate-950 font-bold hover:underline">Sign In</Link></p>
        </div>
      </div>
    </div>
  )
}