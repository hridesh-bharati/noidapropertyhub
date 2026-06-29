"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const clientLogos = [
    { name: "Dassault Aviation", img: "/img/dassault-logo.svg", fallback: "DASSAULT AVIATION" },
    { name: "Redcliffe Labs", img: "/img/redcliffe-logo.webp", fallback: "Redcliffe labs" },
    { name: "Hisense", img: "/img/hisense-logo.svg", fallback: "Hisense" },
    { name: "Audi", img: "/img/audi-logo.svg", fallback: "Audi" },
    { name: "Vinove", img: "/img/vinove-logo.svg", fallback: "VINOVE" },
    { name: "Cengage", img: "/img/cengage-logo.svg", fallback: "CENGAGE" },
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
        <section className="w-full bg-white py-16 sm:py-20 overflow-hidden font-sans select-none relative text-slate-800">
            
            {/* सिर्फ और सिर्फ बीच में चमकने वाला सॉफ्ट रेडियल ग्रेडिएंट (Cyan + Emerald मिक्स) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15)_0%,rgba(52,211,153,0.08)_45%,transparent_70%)] pointer-events-none z-0" />

            {/* आर्किटेक्चरल ग्रिड बैकग्राउंड */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a03_1px,transparent_1px),linear-gradient(to_bottom,#0f172a03_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                {/* लक्ज़री हेडर ब्लॉक */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/80 border border-pink-500/15 rounded-full mb-4 shadow-sm backdrop-blur-md">
                        <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold tracking-[0.2em] text-pink-600 uppercase">Our Network</span>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3 leading-tight">
                        Trusted Corporate <br className="sm:hidden" />
                        <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">
                            Partners & Clients
                        </span>
                    </h2>
                </div>

                {/* ट्रस्टेड बैज (बिना होवर इफ़ेक्ट और कलरफुल बूटस्ट्रैप आइकॉन) */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/95 border border-slate-200/60 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.02)] backdrop-blur-md">
                        <i className="bi bi-shield-check text-[#25D366] text-xl leading-none"></i>
                        <span className="text-xs font-semibold tracking-wide text-slate-600">
                            Trusted by organizations that value precision and discretion
                        </span>
                    </div>
                </div>

                {/* मारकी रीयल इनफिनिट लूप */}
                <div className="relative w-full overflow-hidden py-4">

                    {/* लेफ्ट और राइट ब्लर विथ सटल टोन */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/30 to-transparent z-20 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/30 to-transparent z-20 pointer-events-none" />

                    {/* एनिमेटेड रो */}
                    <div
                        ref={marqueeRowRef}
                        className="flex whitespace-nowrap items-center gap-24 w-max cursor-pointer select-none"
                    >
                        {[...clientLogos, ...clientLogos].map((logo, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-center h-12"
                            >
                                <img
                                    src={logo.img}
                                    alt={logo.name}
                                    className="h-8 w-auto object-contain max-w-[140px] opacity-75 hover:opacity-100 transition-opacity duration-300"
                                    onError={(e) => {
                                        const target = e.target as HTMLElement;
                                        target.style.display = "none";
                                        const p = document.createElement("p");
                                        p.className = "text-xs font-black tracking-widest text-slate-400 uppercase";
                                        p.innerText = logo.fallback;
                                        target.parentNode?.appendChild(p);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}