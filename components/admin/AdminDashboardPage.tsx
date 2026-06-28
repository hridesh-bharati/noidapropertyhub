'use client'
import { useEffect, useState } from 'react'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { ref, get, child } from 'firebase/database'
import { useRouter } from 'next/navigation'
import AdminSidebar from './AdminSidebar'

// Recharts Dynamic Component Imports
import { 
  AreaChart, Area, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts'

// Mock Analytics Data matching the reference image layout
const overviewData = [
  { name: '06', sale: 400, rent: 240 },
  { name: '07', sale: 300, rent: 139 },
  { name: '08', sale: 600, rent: 980 },
  { name: '09', sale: 800, rent: 390 },
  { name: '10', sale: 500, rent: 480 },
  { name: '11', sale: 900, rent: 380 },
  { name: '12', sale: 700, rent: 430 },
]

const pieData = [
  { name: 'Properties for Sale', value: 62 },
  { name: 'Properties for Rent', value: 38 },
]
const COLORS = ['#8b5cf6', '#f97316']

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [adminName, setAdminName] = useState('Admin User')
  
  // साइडबार के स्टेट्स को यहीं पर कंट्रोल करेंगे ताकि खाली जगह गायब हो सके
  const [isOpen, setIsOpen] = useState(true) // डेस्कटॉप के लिए
  const [isMobileOpen, setIsMobileOpen] = useState(false) // मोबाइल Off-canvas के लिए

  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/admin/login')
      } else {
        try {
          const dbRef = ref(db)
          const snapshot = await get(child(dbRef, `admins/${user.uid}`))
          if (snapshot.exists()) {
            setAdminName(snapshot.val().fullName)
          }
        } catch (err) {
          console.error("Dashboard connection error:", err)
        }
        setLoading(false)
      }
    })
    return () => unsubscribe()
  }, [router])

  if (loading) return <div className="text-center mt-20 font-black text-indigo-600 uppercase tracking-widest text-xs animate-pulse p-12">Booting Matrix Dashboard...</div>

  return (
    <div className="min-h-screen bg-slate-50/60 flex  pt-10 w-full">
      {/* 1. डायनामिक लेफ्ट साइडबार (स्टेट्स को प्रॉप्स की तरह भेज रहे हैं) */}
      <AdminSidebar 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        isMobileOpen={isMobileOpen} 
        setIsMobileOpen={setIsMobileOpen} 
      />

      {/* 2. मुख्य कंटेंट फ्रेम - जो साइडबार के सिकुड़ने पर खुद को बड़ा कर लेगा */}
      <div 
        className={`flex-1 w-full px-4 md:px-8 py-6 transition-all duration-300 ${
          isOpen ? 'md:pl-[270px]' : 'md:pl-[100px]'
        } pl-4 pt-24 md:pt-6`} // मोबाइल पर लेफ्ट पैडिंग नॉर्मल रहेगी और टॉप पैडिंग हैमबर्गर बटन के लिए होगी
      >
        
        {/* Top Header Section Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-4 rounded-3xl border border-slate-100/50">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">Welcome to NoidaHub Property Admin, <span className="text-indigo-600">{adminName}</span></p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            {/* Search input */}
            <div className="relative hidden md:block">
              <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input type="text" placeholder="Search here..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-xs focus:outline-none w-56" />
            </div>
            <button onClick={() => signOut(auth)} className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs uppercase tracking-wider rounded-full transition-all">
              <i className="bi bi-power mr-1.5"></i>Logout
            </button>
          </div>
        </div>

        {/* Core Metrics Primary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Main Hero Widget - Total Properties */}
          <div className="lg:col-span-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-6 text-white flex justify-between items-center relative overflow-hidden shadow-xl shadow-orange-500/10">
            <div className="z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <i className="bi bi-building text-lg"></i>
                </div>
                <span className="text-xs font-bold tracking-wider uppercase opacity-90">Total Properties</span>
              </div>
              <p className="text-xs opacity-75 mt-4">421 more to break last month record</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight z-10">4,562</h2>
            <div className="absolute right-[-10%] bottom-[-30%] opacity-10 text-[120px] font-black pointer-events-none"><i className="bi bi-building"></i></div>
          </div>

          {/* Revenue Micro Widget */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100/80 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Total Revenue</h4>
                <p className="text-2xl font-black text-slate-900 tracking-tight mt-1">$678,345</p>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                <i className="bi bi-graph-up-arrow"></i> 7%
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-4">Last month <span className="font-semibold text-slate-600">$563,443</span></p>
          </div>
        </div>

        {/* Secondary Detailed Distribution Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-3xl p-5 border border-slate-100 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-xl font-black text-slate-900 tracking-tight">2,356</p>
              <h4 className="text-xs font-bold text-slate-400 mt-0.5">Properties for Sale</h4>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-indigo-600/20 border-t-indigo-600 flex items-center justify-center text-xs font-black text-indigo-600">71%</div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-xl font-black text-slate-900 tracking-tight">2,206</p>
              <h4 className="text-xs font-bold text-slate-400 mt-0.5">Properties for Rent</h4>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center text-xs font-black text-emerald-600">33%</div>
          </div>
        </div>

        {/* Interactive Charts Platform Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Analytic Overview Linear/Bar Chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Overview Analytics</h3>
              <div className="flex gap-4 text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600 block"></span> Sale</span>
                <span className="flex items-center gap-1.5 font-semibold text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block"></span> Rent</span>
              </div>
            </div>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={overviewData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tickLine={false} stroke="#94a3b8" fontSize={11} />
                  <YAxis tickLine={false} stroke="#94a3b8" fontSize={11} />
                  <Tooltip />
                  <Area type="monotone" dataKey="sale" stroke="#4f46e5" fillOpacity={0.05} fill="#4f46e5" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="rent" stroke="#10b981" fillOpacity={0.05} fill="#10b981" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Share Breakdown Pie Display */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">Stock Breakdown</h3>
            <div className="w-full h-44 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500 block"></span> For Sale</span>
                <span>62%</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-orange-500 block"></span> For Rent</span>
                <span>38%</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}