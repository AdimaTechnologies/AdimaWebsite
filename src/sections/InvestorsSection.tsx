import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const investors = [
    // Using placeholders for now as specific investor assets weren't provided,
    // but styling them to look premium.
    { name: "Global Ventures", tier: "Lead Investor" },
    { name: "Future Capital", tier: "Series A" },
    { name: "Tech Nexus", tier: "Strategic Partner" },
    { name: "Angel Syndicate", tier: "Seed" },
    { name: "Innovation Fund", tier: "Series A" },
    { name: "NextGen Capital", tier: "Seed" }
];

export default function InvestorsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // Header Animation
            gsap.fromTo(headerRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%'
                    }
                }
            );

            // Grid Animation
            if (gridRef.current) {
                gsap.fromTo(gridRef.current.children,
                    { y: 30, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "back.out(1.2)",
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: "top 75%"
                        }
                    }
                );
            }

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="investors" className="relative py-32 bg-[#0B0C10] overflow-hidden">
            {/* Background Elements */}
            <div className="absolute left-0 bottom-0 w-[40vw] h-[40vw] bg-[#F7F8FB]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div ref={headerRef} className="text-center mb-20">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#F7F8FB]/10 text-[#F7F8FB] text-sm font-mono tracking-wider mb-6 border border-[#F7F8FB]/20">
                        BACKED BY THE BEST
                    </span>
                    <h2 className="font-display font-bold text-4xl md:text-6xl text-[#F7F8FB] mb-6">
                        Our Investors
                    </h2>
                    <p className="text-xl text-[#A6A9B1] max-w-2xl mx-auto">
                        Supported by visionaries who believe in the future of India's digital ecosystem.
                    </p>
                </div>

                <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
                    {investors.map((investor, i) => (
                        <div key={i} className="group relative">
                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-[#2D6BFF] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-xl" />

                            <div className="relative h-40 flex flex-col items-center justify-center p-8 border border-[#A6A9B1]/10 rounded-xl bg-[#F7F8FB]/5 backdrop-blur-sm group-hover:border-[#2D6BFF]/30 transition-colors duration-300">
                                {/* Placeholder Logo Style */}
                                <div className="text-2xl font-display font-bold text-[#F7F8FB] group-hover:text-[#2D6BFF] transition-colors">
                                    {investor.name}
                                </div>
                                <span className="mt-2 text-xs font-mono text-[#A6A9B1] uppercase tracking-wider">
                                    {investor.tier}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
