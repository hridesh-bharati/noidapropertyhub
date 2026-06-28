'use client'
import { useState } from 'react'
import { supabase } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Supabase user profile me password update kar dega
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })

    setLoading(false)
    if (error) {
      alert(error.message)
    } else {
      alert('Password updated successfully! Redirecting to login...')
      router.push('/admin/login')
    }
  }

  return (
    <form onSubmit={handleReset} className="max-w-md p-6 bg-white rounded-2xl shadow-md space-y-4 mx-auto mt-10">
      <h2 className="text-xl font-black text-slate-900 text-center">SET NEW PASSWORD</h2>
      <input type="password" placeholder="Enter New Secure Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full p-2.5 bg-slate-50 border rounded-xl text-slate-900 text-sm" />
      <button type="submit" disabled={loading} className="w-full py-2.5 bg-slate-950 text-white font-bold rounded-xl text-sm disabled:opacity-50 uppercase tracking-wider">
        {loading ? 'Updating...' : 'Update Password'}
      </button>
    </form>
  )
}