import LogoutButton from '@/components/admin/LogoutButton'

export default function LogoutRoute() {
  return (
    <div className="text-center p-8 bg-white rounded-2xl border max-w-sm mx-auto shadow">
      <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Are you sure you want to exit?</p>
      <LogoutButton />
    </div>
  )
}