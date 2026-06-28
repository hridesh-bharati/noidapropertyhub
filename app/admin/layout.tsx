import Navbar from '@/components/Navbar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-tr from-slate-100 to-slate-200 ">
      <Navbar />
      <div className="w-full">
        {children}
      </div>
    </div>
  )
}