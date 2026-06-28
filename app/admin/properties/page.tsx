'use client'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { useState } from 'react'

export default function AdminPropertiesPage() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50/60 pt-10 flex w-full">
      <AdminSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* मुख्य कंटेंट फ्रेम - यहाँ क्लास को डायनामिक कर दिया है ताकि खाली जगह न बचे */}
      <div 
        className={`flex-1 w-full px-4 md:px-8 py-6 transition-all duration-300 ${
          isOpen ? 'md:pl-[270px]' : 'md:pl-[100px]'
        } pl-4 pt-24 md:pt-6`}
      >
        {/* Header Action Node */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-4 rounded-3xl border border-slate-100/50">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Property Management</h1>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">Add, update, or remove active estate profiles</p>
          </div>
          <button className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-indigo-600/10 hover:bg-indigo-700 transition-all">
            <i className="bi bi-plus-lg mr-2"></i>Add Property
          </button>
        </div>

        {/* Placeholder Dynamic List Engine */}
        <div className="p-8 border border-dashed border-slate-200 bg-white rounded-3xl text-center flex flex-col items-center justify-center min-h-[350px]">
          <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-slate-400 rounded-2xl flex items-center justify-center text-xl mb-4">
            <i className="bi bi-house-door"></i>
          </div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">No Real Estate Logs Yet</p>
          <p className="text-[11px] text-slate-400 mt-1 max-w-xs font-medium">Your activated property nodes will populate this interface framework.</p>
        </div>
      </div>
    </div>
  )
}