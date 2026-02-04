import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FounderSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Background parallax
            gsap.to(bgRef.current, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            // Content reveal
            gsap.fromTo(
                contentRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                }
            );

            // Image reveal (placeholder animation)
            gsap.fromTo(
                imageRef.current,
                { scale: 0.9, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                    },
                }
            );

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="founder"
            className="relative min-h-0 flex items-center justify-center overflow-hidden bg-[#0B0C10] py-12 md:py-16 lg:py-20"
        >
            {/* Background Element */}
            <div
                ref={bgRef}
                className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[#2D6BFF]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
            />

            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
                {/* Text Content */}
                <div ref={contentRef} className="flex-1 max-w-2xl">
                    <span className="text-[#2D6BFF] font-mono tracking-wider text-sm uppercase mb-4 block">
                        About the Founder
                    </span>
                    <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#F7F8FB] mb-2 leading-tight">
                        Peddinti Ashok <span className="text-[#2D6BFF] font-normal text-xl md:text-2xl">M.B.A</span>
                    </h2>
                    <h3 className="text-lg md:text-xl text-[#A6A9B1] mb-6 font-light">
                        Founder, Chairman & Managing Director of <span className="text-[#F7F8FB]">Adima Technologies Pvt Ltd</span>
                    </h3>

                    <div className="space-y-4 text-[#A6A9B1] text-base md:text-lg leading-relaxed">
                        <p>
                            A serial entrepreneur passionate about building impactful, India-first products. As Founder & CEO, I lead innovative ventures across social media, matrimony, e-commerce, classifieds, and electric mobility.
                        </p>
                        <p>
                            I welcome visionary collaborators, strategic partners, and forward-thinking investors
                            to help us innovate, scale, and shape India’s digital and mobility future.
                        </p>
                    </div>

                </div>

                {/* Image/Visual Placeholder - reduced to match text scale */}
                <div ref={imageRef} className="flex-1 w-full max-w-[200px] md:max-w-[240px] lg:max-w-[280px] aspect-[3/4] relative group shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#2D6BFF] to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-500 rounded-2xl" />
                    <div className="absolute inset-[1px] bg-[#0B0C10] rounded-2xl flex items-center justify-center border border-[#A6A9B1]/10 overflow-hidden">
                        <img 
                            src="/images/founder.png" 
                            alt="Peddinti Ashok" 
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        />
                    </div>
                    {/* Decorative corners */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-[#2D6BFF]/50 rounded-tl-xl" />
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-[#2D6BFF]/50 rounded-br-xl" />
                </div>
            </div>
        </section>
    );
}
