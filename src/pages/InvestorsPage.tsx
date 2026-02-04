import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowRight, TrendingUp, ShieldCheck, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function InvestorsPage() {
    const pageRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const pitchRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
            // Header Animation
            gsap.fromTo(headerRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out"
                }
            );

             // Pitch Animation
             gsap.fromTo(pitchRef.current?.children || [],
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: pitchRef.current,
                        start: "top 80%"
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
                            start: "top 85%"
                        }
                    }
                );
            }

        }, pageRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={pageRef} className="min-h-screen bg-[#0B0C10] pt-24 pb-12 md:pt-28 md:pb-16 relative overflow-hidden">
             {/* Background Elements */}
             <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[#2D6BFF]/5 rounded-full blur-[120px] pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[#8B5CF6]/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Header Area - compact layout for 100% zoom */}
            <div className="container mx-auto px-6 relative z-10 mb-8 md:mb-12 max-w-4xl">
                <div ref={headerRef} className="text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#F7F8FB]/10 text-[#F7F8FB] text-xs font-mono tracking-wider mb-3 border border-[#F7F8FB]/20">
                        INVESTOR RELATIONS
                    </span>
                    <h1 className="font-display font-bold text-2xl md:text-4xl lg:text-5xl text-[#F7F8FB] mb-4 leading-tight">
                        Invest in India’s <span className="text-[#2D6BFF]">Digital Future.</span>
                    </h1>
                    <p className="text-base md:text-lg text-[#A6A9B1] leading-relaxed mb-3 max-w-3xl mx-auto">
                        We’re building apps and ecosystems that connect millions across social, matrimony, e‑commerce, classifieds, and EV mobility. Invest and be part of shaping how India connects, moves, and transacts.
                    </p>
                    <p className="text-sm text-[#E4E6EB] max-w-2xl mx-auto leading-snug">
                        Our vision: one portfolio of trusted, high-impact products that serve real needs—from verified matrimony and family-safe commerce to the next wave of mobility. We’re execution-focused, T-Hub backed, and ready to scale with the right partners.
                    </p>
                </div>
            </div>

            {/* Pitch Section - compact */}
            <div className="container mx-auto px-6 mb-10 md:mb-14 relative z-10 max-w-5xl">
                <div ref={pitchRef} className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                    {/* Card 1 */}
                    <div className="p-4 md:p-5 rounded-xl bg-[#F7F8FB]/5 border border-[#F7F8FB]/10 hover:border-[#2D6BFF]/30 transition-colors duration-300 group">
                        <div className="w-9 h-9 md:w-10 md:h-10 bg-[#2D6BFF]/10 text-[#2D6BFF] rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <TrendingUp size={18} className="md:w-5 md:h-5" />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-[#F7F8FB] mb-2">Scalable Growth</h3>
                        <p className="text-[#A6A9B1] text-xs md:text-sm leading-snug">
                            Our diverse portfolio of products targets high-growth sectors including social media, matrimony, and EV mobility, tapping into India's massive digital user base.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="p-4 md:p-5 rounded-xl bg-[#F7F8FB]/5 border border-[#F7F8FB]/10 hover:border-[#2D6BFF]/30 transition-colors duration-300 group">
                        <div className="w-9 h-9 md:w-10 md:h-10 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <ShieldCheck size={18} className="md:w-5 md:h-5" />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-[#F7F8FB] mb-2">Trust & Safety</h3>
                        <p className="text-[#A6A9B1] text-xs md:text-sm leading-snug">
                            We prioritize user safety and authenticity across all platforms, from verification-first matrimony to safe e-commerce for families.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="p-4 md:p-5 rounded-xl bg-[#F7F8FB]/5 border border-[#F7F8FB]/10 hover:border-[#2D6BFF]/30 transition-colors duration-300 group">
                        <div className="w-9 h-9 md:w-10 md:h-10 bg-[#10B981]/10 text-[#10B981] rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <Globe size={18} className="md:w-5 md:h-5" />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-[#F7F8FB] mb-2">Bharat First</h3>
                        <p className="text-[#A6A9B1] text-xs md:text-sm leading-snug">
                            Designed specifically for the Indian market, our solutions address local needs while maintaining global standards of technology and design.
                        </p>
                    </div>
                </div>
            </div>

           

            {/* Contact CTA - compact */}
            <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                <div className="bg-gradient-to-br from-[#16181D] to-[#0B0C10] border border-[#2D6BFF]/20 rounded-xl p-5 md:p-8 text-center mx-auto relative overflow-hidden group">
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2D6BFF] to-transparent opacity-50" />
                     <div className="absolute inset-0 bg-[#2D6BFF] opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none" />

                    <h2 className="font-display font-bold text-lg md:text-xl lg:text-2xl text-[#F7F8FB] mb-2">
                        Let’s build the next chapter together
                    </h2>
                    <p className="text-xs md:text-sm text-[#A6A9B1] mb-4 max-w-xl mx-auto">
                        We’re raising and actively looking for strategic partners who believe in our vision. Pitch decks, metrics, and a conversation are one email away.
                    </p>
                    <p className="text-sm font-mono text-[#A6A9B1] uppercase tracking-wider mb-6">
                        Get in touch
                    </p>
                    <a 
                        href="mailto:investors@adimatechnologies.com"
                        className="inline-flex items-center gap-3 bg-[#2D6BFF] hover:bg-[#2558D9] text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(45,107,255,0.4)]"
                    >
                        <Mail size={20} />
                        <span>info@adimatechnologies.com</span>
                        <ArrowRight size={20} />
                    </a>
                    <p className="mt-6 text-sm text-[#A6A9B1]">
                        We’d love to hear from you.
                    </p>
                </div>
            </div>
        </main>
    );
}
