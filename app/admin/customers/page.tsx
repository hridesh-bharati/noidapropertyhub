'use client'
import AdminSidebar from '@/components/admin/AdminSidebar'
 import { useState } from 'react'
  const [isOpen, setIsOpen] = useState(true) // डेस्कटॉप के लिए
  const [isMobileOpen, setIsMobileOpen] = useState(false) // मोबाइल Off-canvas के लिए

export default function AdminCustomersPage() {
  return (
    <div className="min-h-screen bg-slate-50/60 flex pt-10 w-full">
        {/* साइडबार कंपोनेंट में स्टेट्स पास करना */}
            <AdminSidebar 
              isOpen={isOpen} 
              setIsOpen={setIsOpen} 
              isMobileOpen={isMobileOpen} 
              setIsMobileOpen={setIsMobileOpen} 
            />
            
      
      <div className="flex-1 pl-24 md:pl-64 w-full px-4 md:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-4 rounded-3xl border border-slate-100/50">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Customer Database</h1>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">Track registration profiles and target buyers</p>
          </div>
        </div>

        <div className="p-8 border border-dashed border-slate-200 bg-white rounded-3xl text-center flex flex-col items-center justify-center min-h-[350px]">
          <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-slate-400 rounded-2xl flex items-center justify-center text-xl mb-4">
            <i className="bi bi-person"></i>
          </div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">No Buyer Records Active</p>
        </div>
      </div>
    </div>
  )
}