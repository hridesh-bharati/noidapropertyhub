'use client'
import { useState } from 'react'
import { auth } from '@/lib/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import Link from 'next/link'

export default function ForgetPassPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleForget = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await sendPasswordResetEmail(auth, email)
      alert('Secure reset link routed successfully to your email!')
      setEmail('')
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-body w-full min-h-screen h-screen flex items-center justify-center    overflow-hidden">
      <div className="w-full max-w-md p-8 auth-card rounded-3xl shadow-xl border border-slate-100/80 mx-auto transition-all duration-300 max-h-[90vh] mobile-scroll overflow-y-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-slate-900 uppercase">Recover Account</h2>
        </div>
        <form onSubmit={handleForget} className="space-y-4">
          <input type="email" placeholder="Admin Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
          <button type="submit" disabled={loading} className="w-full py-3.5 bg-primary text-white font-bold rounded-xl text-xs uppercase tracking-widest">
            {loading ? 'Processing...' : 'Send Link'}
          </button>
        </form>
        <div className="text-center mt-4 text-xs">
          <Link href="/admin/login" className="text-slate-950 font-bold hover:underline">Return to Sign In</Link>
        </div>
      </div>
    </div>
  )
}