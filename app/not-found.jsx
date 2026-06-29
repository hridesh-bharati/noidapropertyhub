// app/not-found.jsx
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 text-center">
            <h1 className="text-7xl font-black text-slate-950 tracking-tight mb-2">404</h1>
            <h2 className="text-xl font-bold text-slate-800 mb-4">Premium Setup Not Found</h2>
            <p className="text-xs text-slate-500 max-w-sm mb-6 leading-relaxed">
                The space configuration or property identity you are trying to access does not exist or has been leased out.
            </p>
            <Link 
                href="/" 
                className="px-5 py-2.5 bg-slate-950 hover:bg-amber-500 text-white hover:text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-300 shadow-sm"
            >
                Back to Dashboard
            </Link>
        </div>
    );
}