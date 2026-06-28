"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const clientLogos = [
    { name: "Dassault Aviation", img: "/img/dassault-logo.svg", fallback: "DASSAULT AVIATION" },
    { name: "Redcliffe Labs", img: "/img/redcliffe-logo.png", fallback: "Redcliffe labs" },
    { name: "Hisense", img: "/img/hisense-logo.svg", fallback: "Hisense" },
    { name: "Audi", img: "/img/audi-logo.svg", fallback: "Audi" },
    { name: "Vinove", img: "/img/vinove-logo.svg", fallback: "VINOVE" },
    { name: "Cengage", img: "/img/cengage-logo.svg", fallback: "CENGAGE" },
    { name: "eBay", img: "/img/ebay.png", fallback: "ebay" },
];

const statsData = [
    { metric: "12+", label: "Years Experience", glow: "border-orange-200 bg-gradient-to-br from-orange-500/[0.03] to-amber-500/[0.01]" },
    { metric: "5M+", label: "Sq. Ft. Transacted", glow: "border-blue-200 bg-gradient-to-br from-blue-500/[0.03] to-indigo-500/[0.01]" },
    { metric: "3000+", label: "Corporate Clients", glow: "border-cyan-200 bg-gradient-to-br from-cyan-500/[0.03] to-teal-500/[0.01]" },
    { metric: "4", label: "High Growth Cities (NCR)", glow: "border-pink-200 bg-gradient-to-br from-pink-500/[0.03] to-purple-500/[0.01]" },
];

export default function LogoMarquee() {
    const marqueeRowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!marqueeRowRef.current) return;

        const marqueeRow = marqueeRowRef.current;
        const scrollWidth = marqueeRow.scrollWidth / 2;

        const animation = gsap.to(marqueeRow, {
            x: `-=${scrollWidth}`,
            duration: 25,
            ease: "none",
            repeat: -1,
            modifiers: {
                x: (x) => {
                    const currentX = parseFloat(x);
                    return `${currentX % scrollWidth}px`;
                },
            },
        });

        marqueeRow.addEventListener("mouseenter", () => gsap.to(animation, { timeScale: 0.2, duration: 0.5 }));
        marqueeRow.addEventListener("mouseleave", () => gsap.to(animation, { timeScale: 1, duration: 0.5 }));

        return () => {
            animation.kill();
        };
    }, []);

    return (
        <section className="w-full py-16 overflow-hidden relative bg-white">

            {/* 1. पिक्चर जैसा प्रीमियम आर्किटेक्चरल ग्रिड बैकग्राउंड */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a04_1px,transparent_1px),linear-gradient(to_bottom,#0f172a04_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none z-0" />

            {/* 2. पिक्चर जैसी सटीक लक्ज़री नियॉन ओर्ब्स पोजीशनिंग */}
            <div className="absolute top-[-10%] left-[-5%] w-[450px] h-[450px] bg-gradient-to-br from-pink-500/15 via-pink-400/5 to-transparent rounded-full blur-[110px] pointer-events-none z-0" />
            <div className="absolute top-[25%] right-[-10%] w-[500px] h-[450px] bg-gradient-to-l from-blue-400/20 via-cyan-400/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-[-10%] left-[15%] w-[350px] h-[350px] bg-gradient-to-tr from-amber-400/10 to-transparent rounded-full blur-[90px] pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                {/* Trusted By Badge */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex items-center gap-3 px-8 py-3 bg-white/70 border border-slate-200/50 rounded-2xl shadow-[0_15px_35px_-5px_rgba(15,23,42,0.04)] backdrop-blur-md">
                        <i className="bi bi-shield-check text-red-600 text-lg"></i>
                        <span className="text-xs font-bold tracking-wide text-slate-800">
                            Trusted by organizations that value precision and discretion
                        </span>
                    </div>
                </div>

                {/* मारकी रीयल इनफिनिट लूप */}
                <div className="relative w-full overflow-hidden py-6 mb-16">

                    {/* लेफ्ट ब्लर विथ सटल ब्लू टोन */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
                    <div className="absolute left-0 top-1/4 w-12 h-1/2 bg-blue-500/10 blur-xl z-20 pointer-events-none" />

                    {/* राइट ब्लर विथ सटल ब्लू टोन */}
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />
                    <div className="absolute right-0 top-1/4 w-16 h-1/2 bg-blue-400/15 blur-xl z-20 pointer-events-none" />

                    {/* एनिमेटेड रो */}
                    <div
                        ref={marqueeRowRef}
                        className="flex whitespace-nowrap items-center gap-20 w-max cursor-pointer select-none"
                    >
                        {[...clientLogos, ...clientLogos].map((logo, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-center h-12 transition-all duration-300"
                            >
                                <img
                                    src={logo.img}
                                    alt={logo.name}
                                    className="h-7 w-auto object-contain max-w-[150px]"
                                    onError={(e) => {
                                        const target = e.target as HTMLElement;
                                        target.style.display = "none";
                                        const p = document.createElement("p");
                                        p.className = "text-sm font-black tracking-widest text-slate-400 uppercase";
                                        p.innerText = logo.fallback;
                                        target.parentNode?.appendChild(p);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. पिक्चर वाले 4 प्रीमियम इंफोग्राफिक स्टैट्स कार्ड्स */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsData.map((stat, i) => (
                        <div
                            key={i}
                            className={`p-6 rounded-2xl border bg-white/60 backdrop-blur-md shadow-[0_10px_25px_-5px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${stat.glow}`}
                        >
                            <div className="text-3xl sm:text-4xl font-black tracking-tight text-red-600 mb-1">
                                {stat.metric}
                            </div>
                            <div className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest leading-tight">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}