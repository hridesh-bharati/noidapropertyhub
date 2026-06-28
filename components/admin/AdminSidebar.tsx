'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (val: boolean) => void;
}

export default function AdminSidebar({ isOpen, setIsOpen, isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'bi-grid-1x2-fill' },
    { name: 'Property', path: '/admin/properties', icon: 'bi-house-door' },
    { name: 'Types', path: '/admin/types', icon: 'bi-layers' },
    { name: 'Customer', path: '/admin/customers', icon: 'bi-person' },
    { name: 'Agent', path: '/admin/agents', icon: 'bi-people' },
    { name: 'Profile', path: '/admin/profile', icon: 'bi-gear' },
  ]

  return (
    <>
      {/* मोबाइल हैमबर्गर बटन (क्लिक करने पर खुलेगा भी और बंद भी होगा) */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-12 left-4 z-50 bg-indigo-600 text-white p-2 rounded-xl shadow-md flex items-center justify-center cursor-pointer"
      >
        <i className={`bi ${isMobileOpen ? 'bi-x-lg' : 'bi-list'} text-xl`}></i>
      </button>

      {/* मोबाइल बैकड्रॉप */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/40 mt-12 top-12 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* मुख्य साइडबार */}
      <div
        className={`bg-white min-h-screen border-r border-slate-100 flex flex-col justify-between pt-10 px-4 fixed left-0 z-40 transition-all duration-300 ${
          isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'
        } ${
          isOpen ? 'md:w-64' : 'md:w-20'
        }`}
      >
        {/* डेस्कटॉप के लिए छोटा/बड़ा करने वाला बटन */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden md:flex absolute -right-3 top-12 bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 rounded-full w-6 h-6 items-center justify-center shadow-sm cursor-pointer z-50 transition-transform duration-300"
        >
          <i className={`bi ${isOpen ? 'bi-chevron-left' : 'bi-chevron-right'} text-xs`}></i>
        </button>

        {/* मोबाइल के लिए अलग से बंद करने का बटन (सुरक्षा के लिए रखा है, चाहे तो हटा भी सकते हैं) */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden absolute right-4 top-4 text-slate-400 hover:text-slate-900"
        >
          <i className="bi bi-x-lg text-lg"></i>
        </button>

        {/* मेनू आइटम्स */}
        <div className="mt-6 md:mt-0">
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                    isOpen ? 'md:justify-start' : 'md:justify-center'
                  } ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <i className={`bi ${item.icon} text-lg ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-900'}`}></i>
                  <span
                    className={`text-sm tracking-wide whitespace-nowrap transition-all duration-200 ${
                      isOpen ? 'md:opacity-100 md:block' : 'md:opacity-0 md:hidden'
                    } block`}
                  >
                    {item.name}
                  </span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* फुटर */}
        <div className={`text-center border-t border-slate-50 pt-4 pb-4 ${isOpen ? 'md:block' : 'md:hidden'} block`}>
          <p className="text-[10px] text-slate-400 font-medium">NoidaHub</p>
          <p className="text-[9px] text-slate-300 mt-0.5">© 2026</p>
        </div>
      </div>
    </>
  )
}