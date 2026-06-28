'use client'
import { useState, useEffect } from 'react'
import { auth, db } from '@/lib/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { ref, set } from 'firebase/database'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/admin/dashboard')
      }
    })
    return () => unsubscribe()
  }, [router])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const allowedEmail = 'hridesh027@gmail.com'
    const allowedPhone = '7267995307'

    if (email.trim().toLowerCase() !== allowedEmail || phone.trim() !== allowedPhone) {
      alert('You are not authorized to create an Admin account!')
      setLoading(false)
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await set(ref(db, 'admins/' + user.uid), {
        uid: user.uid,
        fullName: name,
        email: email,
        phoneNumber: phone,
        createdAt: new Date().toISOString()
      })

      alert('Admin Account Created!')
      router.push('/admin/dashboard')
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
          <h2 className="text-2xl font-black text-slate-900 uppercase">Create Admin</h2>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
          <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
          <input type="tel" placeholder="Mobile Number" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
          <button type="submit" disabled={loading} className="w-full py-3.5 bg-slate-950 text-white font-bold rounded-xl text-xs uppercase tracking-widest disabled:opacity-50">
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>
        <div className="text-center mt-4 text-xs">
          <p className="text-slate-500">Already an admin? <Link href="/admin/login" className="text-slate-950 font-bold hover:underline">Sign In</Link></p>
        </div>
      </div>
    </div>
  )
}