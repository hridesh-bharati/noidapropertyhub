'use client'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminAgentsPage() {
  return (
    <div className="min-h-screen bg-slate-50/60 pt-10 flex w-full">
      <AdminSidebar />
      
      <div className="flex-1 pl-24 md:pl-64 w-full px-4 md:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-4 rounded-3xl border border-slate-100/50">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Real Estate Agents</h1>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">Control registered network dealers metrics</p>
          </div>
        </div>

        <div className="p-8 border border-dashed border-slate-200 bg-white rounded-3xl text-center flex flex-col items-center justify-center min-h-[350px]">
          <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-slate-400 rounded-2xl flex items-center justify-center text-xl mb-4">
            <i className="bi bi-people"></i>
          </div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">No Broker Units Synced</p>
        </div>
      </div>
    </div>
  )
}