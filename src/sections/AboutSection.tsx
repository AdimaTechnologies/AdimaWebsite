import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Target, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { label: '5 Products', sub: 'One portfolio', icon: Zap },
  { label: 'T-Hub', sub: 'World\'s largest incubator', icon: Building2 },
  { label: 'India-first', sub: 'Built for India', icon: Target },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const highlightRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.fromTo(
        labelRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        }
      );

      gsap.fromTo(
        titleRef.current,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          delay: 0.1,
        }
      );

      highlightRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
            delay: 0.2 + i * 0.08,
          }
        );
      });

      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
          delay: 0.25,
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0C10] py-20 sm:py-24 md:py-28 lg:py-32"
    >
      {/* Ambient glow */}
      <div
        ref={bgRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#2D6BFF]/8 rounded-full blur-3xl pointer-events-none"
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50vw] h-[50vw] bg-[#2D6BFF]/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#2D6BFF 1px, transparent 1px), linear-gradient(90deg, #2D6BFF 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl" ref={contentRef}>
        <span
          ref={labelRef}
          className="text-[#2D6BFF] font-mono tracking-wider text-xs sm:text-sm uppercase mb-3 sm:mb-4 block"
        >
          About Us
        </span>
        <h2
          ref={titleRef}
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F7F8FB] mb-8 sm:mb-10 leading-tight"
        >
          Building India&apos;s Digital & Mobility Future
        </h2>

        {/* Highlight pills */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <div
                key={h.label}
                ref={(el) => { highlightRefs.current[i] = el; }}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl border border-[#1E2230] bg-[#0F1118]/80 backdrop-blur-sm hover:border-[#2D6BFF]/30 hover:bg-[#0F1118] transition-all duration-300"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#2D6BFF]/15 border border-[#2D6BFF]/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#2D6BFF]" />
                </div>
                <div>
                  <span className="text-[#F7F8FB] font-semibold text-sm sm:text-base block leading-tight">{h.label}</span>
                  <span className="text-[#A6A9B1] text-xs sm:text-sm">{h.sub}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Content card */}
        <div
          ref={cardRef}
          className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-[#2D6BFF]/30 via-[#2D6BFF]/10 to-transparent shadow-[0_0_40px_-10px_rgba(45,107,255,0.15)] hover:shadow-[0_0_50px_-15px_rgba(45,107,255,0.2)] transition-shadow duration-500"
        >
          <div className="rounded-2xl border border-[#1E2230]/80 bg-[#0F1118]/90 backdrop-blur-md p-6 sm:p-8 md:p-10">
            <div className="space-y-5 sm:space-y-6 text-[#A6A9B1] text-base sm:text-lg leading-relaxed">
              <p>
                <strong className="text-[#F7F8FB]">Adima Technologies Pvt Ltd</strong> is a product-based company
                focused on creating impactful, India-first solutions. We are building{' '}
                <strong className="text-[#F7F8FB]">5 innovative products</strong> across social media, matrimony,
                e-commerce, classifieds, and electric mobility—each designed to serve and scale with India.
              </p>
              <p>
                Incubated at <strong className="text-[#2D6BFF]">T-Hub</strong>—the world&apos;s largest incubation
                center—we combine ecosystem support with execution rigor to innovate, scale, and shape India&apos;s
                digital and mobility landscape.
              </p>
              <p>
                Our mission is to build trusted, scalable platforms that put users first—whether connecting people,
                enabling commerce, or powering the next generation of electric mobility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
