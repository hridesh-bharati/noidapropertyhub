'use client'
import { useEffect, useState } from 'react'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { ref, get, child, update, remove } from 'firebase/database'
import { useRouter } from 'next/navigation'
import AdminSidebar from './AdminSidebar'

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(true)
  const [uid, setUid] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  
  // साइडबार के स्टेट्स को यहाँ पर कंट्रोल करेंगे ताकि खाली जगह गायब हो सके
  const [isOpen, setIsOpen] = useState(true) // डेस्कटॉप के लिए
  const [isMobileOpen, setIsMobileOpen] = useState(false) // मोबाइल Off-canvas के लिए

  const router = useRouter()

  // 1. READ OPERATION: Active session check and data fetch
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/admin/login')
      } else {
        setUid(user.uid)
        setEmail(user.email || '')
        
        try {
          const dbRef = ref(db)
          const snapshot = await get(child(dbRef, `admins/${user.uid}`))
          if (snapshot.exists()) {
            const data = snapshot.val()
            setFullName(data.fullName || '')
            setPhoneNumber(data.phoneNumber || '')
          }
        } catch (err) {
          console.error("CRUD Read Error:", err)
        } finally {
          setLoading(false)
        }
      }
    })
    return () => unsubscribe()
  }, [router])

  // 2. UPDATE OPERATION: Update node in Realtime Database
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)
    try {
      const adminRef = ref(db, `admins/${uid}`)
      await update(adminRef, {
        fullName,
        phoneNumber,
        updatedAt: new Date().toISOString()
      })
      alert('Profile records updated in database successfully!')
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsUpdating(false)
    }
  }

  // 3. DELETE OPERATION: Remove admin node from database and logout
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("CRITICAL WARNING: Are you sure you want to permanently delete your admin account node from the Realtime Database?")
    if (!confirmDelete) return

    try {
      setLoading(true)
      await remove(ref(db, `admins/${uid}`))
      alert('Admin record purged from system database nodes.')
      router.push('/admin/register')
    } catch (error: any) {
      alert(error.message)
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center mt-20 font-black text-indigo-600 uppercase tracking-widest text-xs animate-pulse p-12">Fetching Admin Profile Nodes...</div>

  return (
    <div className="min-h-screen bg-slate-50/60 flex w-full">
      {/* साइडबार कंपोनेंट में स्टेट्स पास करना */}
      <AdminSidebar 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        isMobileOpen={isMobileOpen} 
        setIsMobileOpen={setIsMobileOpen} 
      />

      {/* मुख्य कंटेंट फ्रेम - जो साइडबार के सिकुड़ने पर खुद को बड़ा कर लेगा */}
      <div 
        className={`flex-1 w-full px-4 md:px-8 py-6 transition-all duration-300 ${
          isOpen ? 'md:pl-[270px]' : 'md:pl-[100px]'
        } pl-4 pt-24 md:pt-6`}
      >
        
        {/* Upper Dashboard Tab Header */}
        <div className="mb-8 bg-white p-6 rounded-3xl border border-slate-100/50 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Admin Profile</h1>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">Manage your master system account credentials and configuration</p>
          </div>
          <span className="text-[10px] font-black tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full uppercase">
            ID: {uid.substring(0, 8)}...
          </span>
        </div>

        {/* Combined CRUD Panel Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Block - Card Visual Presentation */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-3xl font-black mb-4 uppercase">
              {fullName.charAt(0) || 'A'}
            </div>
            <h3 className="text-base font-black text-slate-900">{fullName || 'Admin User'}</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">{email}</p>
            <div className="w-full border-t border-slate-50 my-4 pt-4 flex justify-around text-center">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Role</p>
                <p className="text-xs font-black text-indigo-600 uppercase mt-0.5">Super Admin</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</p>
                <p className="text-xs font-black text-emerald-600 uppercase mt-0.5">Active</p>
              </div>
            </div>
          </div>

          {/* Right Block - UPDATE & DELETE Controller */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-6">Account Master Records</h3>
            
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    value={fullName} 
                    onChange={e => setFullName(e.target.value)} 
                    required 
                    className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Mobile Number</label>
                  <input 
                    type="tel" 
                    value={phoneNumber} 
                    onChange={e => setPhoneNumber(e.target.value)} 
                    required 
                    className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Registered Email (Read Only)</label>
                <input 
                  type="email" 
                  value={email} 
                  readOnly 
                  className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-400 text-sm font-medium focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Action Operations Bundle */}
              <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-slate-100 gap-4 mt-6">
                <button 
                  type="submit" 
                  disabled={isUpdating}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-950 text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-slate-900 transition-all disabled:opacity-50 shadow-md shadow-slate-950/10"
                >
                  {isUpdating ? 'Saving Records...' : 'Update Information'}
                </button>

                <button 
                  type="button"
                  onClick={handleDeleteAccount}
                  className="w-full sm:w-auto text-[11px] font-bold text-rose-600 hover:text-rose-700 uppercase tracking-wider hover:underline px-4 py-2 rounded-xl hover:bg-rose-50 transition-all"
                >
                  Delete Admin Node
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}