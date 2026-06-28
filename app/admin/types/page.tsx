'use client'
import { useState } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
 // app\admin\types\page.tsx
 export default function AdminTypesPage() {
   const [isOpen, setIsOpen] = useState(true) 
   const [isMobileOpen, setIsMobileOpen] = useState(false) 
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
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Property Types</h1>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">Manage building nodes and structural classes</p>
          </div>
        </div>

        {/* Configuration Segment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Apartment', 'Commercial Office', 'Residential Plot'].map((type, i) => (
            <div key={i} className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Type Node</p>
                <p className="text-sm font-black text-slate-900 mt-0.5">{type}</p>
              </div>
              <button className="text-slate-400 hover:text-slate-900 transition-colors"><i className="bi bi-three-dots-vertical"></i></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}