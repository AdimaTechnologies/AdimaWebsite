import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const triangleTLRef = useRef<HTMLDivElement>(null);
  const triangleBRRef = useRef<HTMLDivElement>(null);
  const triangleTRRef = useRef<HTMLDivElement>(null);
  const triangleBLRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microLabelRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // 1. Initial State Set
      gsap.set([taglineRef.current, ctaRef.current, microLabelRef.current], { autoAlpha: 0, y: 30 });
      gsap.set([triangleTLRef.current, triangleBRRef.current, triangleTRRef.current, triangleBLRef.current], { autoAlpha: 0, scale: 0.8 });
      gsap.set(glowRef.current, { scale: 0.8, autoAlpha: 0 });

      // 2. Background Elements specific reveal (Subtle & Sleek)
      tl.to(glowRef.current, {
        scale: 1,
        autoAlpha: 0.3,
        duration: 2,
        ease: 'sine.out'
      })
        .to([triangleTLRef.current, triangleBRRef.current], {
          autoAlpha: 1,
          scale: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: 'power3.out'
        }, '<0.2')
        .to([triangleTRRef.current, triangleBLRef.current], {
          autoAlpha: 0.6, // Slight transparency for depth
          scale: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: 'power3.out'
        }, '<0.1');

      // 3. Content Reveal (Staggered up)
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(words,
          { y: 50, autoAlpha: 0, rotateX: -20 },
          {
            y: 0,
            autoAlpha: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: 'expo.out'
          },
          '-=1.0'
        );
      }

      tl.to(taglineRef.current, {
        y: 0,
        autoAlpha: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out'
      }, '-=0.8');

      tl.to(ctaRef.current, {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.2)' // Subtle bounce
      }, '-=0.6');

      tl.to(microLabelRef.current, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8
      }, '-=0.6');

      // Continuous Glow Pulse (Post-intro)
      gsap.to(glowRef.current, {
        scale: 1.1,
        opacity: 0.2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2 // Start after intro
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation - SHORTER duration
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%', // REDUCED from 130%
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([triangleTLRef.current, triangleBRRef.current, triangleTRRef.current, triangleBLRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            });
            gsap.set(headlineRef.current, { opacity: 1, x: 0, y: 0 });
            gsap.set(taglineRef.current, { opacity: 1, y: 0 });
            gsap.set(ctaRef.current, { opacity: 1, y: 0 });
            gsap.set(microLabelRef.current, { opacity: 1 });
          },
        },
      });

      // EXIT phase (60% - 100%) - FASTER exit
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1, scale: 1 },
        { x: '-25vw', opacity: 0, scale: 0.9, ease: 'power2.in' },
        0.6
      );

      scrollTl.fromTo(
        triangleTLRef.current,
        { x: 0, y: 0, opacity: 1 },
        { x: '-20vw', y: '-20vh', opacity: 0, ease: 'power2.in' },
        0.6
      );

      scrollTl.fromTo(
        triangleBRRef.current,
        { x: 0, y: 0, opacity: 1 },
        { x: '20vw', y: '20vh', opacity: 0, ease: 'power2.in' },
        0.6
      );

      scrollTl.fromTo(
        [triangleTRRef.current, triangleBLRef.current],
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 1.3, ease: 'power2.in' },
        0.65
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '15vh', opacity: 0, ease: 'power2.in' },
        0.62
      );

      scrollTl.fromTo(
        taglineRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.62
      );

      scrollTl.fromTo(
        microLabelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        glowRef.current,
        { opacity: 0.4, scale: 1 },
        { opacity: 0, scale: 2, ease: 'power2.in' },
        0.6
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-[#0B0C10] z-10 overflow-hidden"
    >
      {/* Animated glow orb */}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-[#2D6BFF] opacity-20 blur-[120px] pointer-events-none will-transform"
      />

      {/* Top-left white triangle */}
      <div
        ref={triangleTLRef}
        className="absolute left-0 top-0 w-[18vw] h-[18vw] bg-[#F7F8FB] will-transform"
        style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
      />

      {/* Bottom-right accent triangle */}
      <div
        ref={triangleBRRef}
        className="absolute right-0 bottom-0 w-[18vw] h-[18vw] bg-[#2D6BFF] will-transform"
        style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
      />

      {/* Top-right small accent triangle */}
      <div
        ref={triangleTRRef}
        className="absolute right-[10%] top-0 w-[8vw] h-[8vw] bg-[#2D6BFF]/60 will-transform"
        style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
      />

      {/* Bottom-left small white triangle */}
      <div
        ref={triangleBLRef}
        className="absolute left-[10%] bottom-0 w-[6vw] h-[6vw] bg-[#F7F8FB]/40 will-transform"
        style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#2D6BFF] rounded-full animate-pulse"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.3}s`,
              opacity: 0.4 + (i % 3) * 0.2,
            }}
          />
        ))}
      </div>

      {/* Main content - responsive padding for small screens */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-0">
        {/* Headline - Mobile: Adima → Technologies → Pvt Ltd (column). Desktop: row */}
        <div
          ref={headlineRef}
          className="text-center will-transform"
          style={{ perspective: '1000px' }}
        >
          <h1 className="font-display font-bold text-[#F7F8FB] flex flex-col md:flex-row items-center justify-center gap-1 sm:gap-1 md:gap-4">
            <span className="word inline-block text-[clamp(2.5rem,12vw,100px)] md:text-[clamp(36px,6vw,100px)] leading-[0.9] tracking-[-0.04em]">
              Adima
            </span>
            <span className="word inline-block text-[clamp(2.5rem,12vw,100px)] md:text-[clamp(36px,6vw,100px)] leading-[0.9] tracking-[-0.04em] text-[#2D6BFF]">
              Technologies
            </span>
            <span className="word inline-block text-[clamp(2.5rem,12vw,100px)] md:text-[clamp(36px,6vw,100px)] leading-[0.9] tracking-[-0.04em] text-[#A6A9B1]">
              Pvt Ltd
            </span>
          </h1>
        </div>

        {/* Tagline - tighter on mobile, readable hierarchy */}
        <p
          ref={taglineRef}
          className="mt-6 md:mt-8 text-lg sm:text-lg md:text-2xl text-[#A6A9B1] text-center max-w-2.5xl px-2 will-transform leading-snug md:leading-normal"
        >
          A product-based company building{' '}
          <span
            className="font-semibold bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #E8F0FF 20%, #A8D0FF 45%, #5BA3FF 70%, #2D6BFF 100%)',
              textShadow: '0 1px 2px rgba(255,255,255,0.5)',
            }}
          >
            5 innovative products
          </span>
          {' '}for India.
          <span className="block mt-5 md:mt-5 flex justify-center">
            <span
              className="inline-flex items-center rounded-full px-4 py-2.5 md:px-4 md:py-2.5 text-[#E8EEF6] text-base md:text-lg border border-white/20 bg-white/[0.08] backdrop-blur-2xl text-center"
              style={{
                boxShadow: [
                  'inset 0 1px 0 0 rgba(255,255,255,0.15), inset 0 -1px 0 0 rgba(255,255,255,0.03)',
                  '0 1px 0 rgba(255,255,255,0.06)',
                  '0 2px 4px rgba(0,0,0,0.15)',
                  '0 4px 8px rgba(0,0,0,0.12)',
                  '0 6px 12px rgba(0,0,0,0.08)',
                ].join(', '),
                transform: 'perspective(600px) rotateX(2deg)',
              }}
            >
              <span className="font-medium tracking-tight">
                Incubated at{' '}
                <span
                  className="font-semibold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #5BA3FF 0%, #2D6BFF 50%, #1a5aee 100%)',
                  }}
                >
                  World&apos;s largest
                </span>
                {' '}incubation center
              </span>
            </span>
          </span>
        </p>

        {/* T-Hub + Made in India - compact on mobile */}
        <div ref={ctaRef} className="mt-5 md:mt-6 flex flex-col items-center justify-center gap-3 md:gap-4 text-center will-transform">
          <p ref={microLabelRef} className="inline-flex items-center justify-center gap-2 text-lg sm:text-xl md:text-2xl text-[#F7F8FB]">
            <MapPin className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#F7F8FB] flex-shrink-0" aria-hidden />
            <span className="font-bold">
              T-Hub, Hyderabad
            </span>
          </p>
          <p className="inline-flex items-center justify-center gap-2 text-lg sm:text-xl md:text-2xl text-[#A6A9B1]">
            <img
              src="/images/india-flag.png"
              alt="India"
              className="w-7 h-7 sm:w-8 sm:h-8 object-cover flex-shrink-0 rounded-full"
            />
            <span>Made in India.{' '}
              <span className="text-[#2D6BFF] font-medium">Made for India.</span>
            </span>
          </p>
        </div>
      </div>




    </section>
  );
}
