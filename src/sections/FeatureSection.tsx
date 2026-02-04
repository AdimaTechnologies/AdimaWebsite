import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FeatureSectionProps {
  id: string;
  eyebrow: string;
  headline: string;
  body: string;
  bullets: string[];
  cta: string;
  ctaLink?: string;
  imageSrc: string;
  imageAlt: string;
  layout: 'left' | 'right';
  trianglePosition: 'tl' | 'tr' | 'bl' | 'br' | 'none';
  triangleColor?: 'accent' | 'white';
  icon?: React.ReactNode;
}

export default function FeatureSection({
  id,
  eyebrow,
  headline,
  body,
  bullets,
  cta,
  ctaLink = '#',
  imageSrc,
  imageAlt,
  layout,
  trianglePosition,
  triangleColor = 'accent',
  icon,
}: FeatureSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaCardRef = useRef<HTMLDivElement>(null);
  const textClusterRef = useRef<HTMLDivElement>(null);
  const triangleRef = useRef<HTMLDivElement>(null);
  const bulletsRef = useRef<HTMLUListElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Media card animation - FASTER
      gsap.fromTo(
        mediaCardRef.current,
        {
          x: layout === 'left' ? '-15vw' : '15vw',
          opacity: 0,
          rotateY: layout === 'left' ? 12 : -12,
          scale: 0.9,
        },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 30%',
            scrub: 0.3,
          },
        }
      );

      // Text cluster animation - FASTER
      gsap.fromTo(
        textClusterRef.current,
        {
          x: layout === 'left' ? '12vw' : '-12vw',
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 35%',
            scrub: 0.3,
          },
        }
      );

      // Glow animation
      gsap.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 0.5,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.3,
          },
        }
      );

      // Bullets stagger - FASTER
      if (bulletsRef.current) {
        const bulletItems = bulletsRef.current.querySelectorAll('li');
        gsap.fromTo(
          bulletItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 55%',
              end: 'top 25%',
              scrub: 0.3,
            },
          }
        );
      }

      // Triangle parallax
      if (triangleRef.current) {
        gsap.fromTo(
          triangleRef.current,
          { y: 0 },
          {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [layout]);

  const getTriangleStyle = () => {
    const color = triangleColor === 'accent' ? '#2D6BFF' : '#F7F8FB';
    switch (trianglePosition) {
      case 'tl':
        return {
          left: 0,
          top: 0,
          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          width: '14vw',
          height: '14vw',
          backgroundColor: color,
        };
      case 'tr':
        return {
          right: 0,
          top: 0,
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
          width: '14vw',
          height: '14vw',
          backgroundColor: color,
        };
      case 'bl':
        return {
          left: 0,
          bottom: 0,
          clipPath: 'polygon(0 0, 0 100%, 100% 100%)',
          width: '16vw',
          height: '16vw',
          backgroundColor: color,
        };
      case 'br':
        return {
          right: 0,
          bottom: 0,
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
          width: '16vw',
          height: '16vw',
          backgroundColor: color,
        };
      default:
        return {};
    }
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative min-h-screen bg-[#0B0C10] py-16 lg:py-0 overflow-hidden"
    >
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-[#2D6BFF] opacity-0 blur-[120px] pointer-events-none will-transform"
      />

      {/* Decorative triangle */}
      {trianglePosition !== 'none' && (
        <div
          ref={triangleRef}
          className="absolute will-transform"
          style={getTriangleStyle()}
        />
      )}

      {/* Small floating triangles */}
      <div
        className="absolute left-[5%] top-[20%] w-[2vw] h-[2vw] bg-[#2D6BFF]/20"
        style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
      />
      <div
        className="absolute right-[8%] bottom-[15%] w-[3vw] h-[3vw] bg-[#F7F8FB]/10"
        style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
      />

      {/* Content container */}
      <div className="relative w-full h-full min-h-screen flex items-center">
        <div className="w-full px-6 lg:px-[6vw] py-12 lg:py-0">
          <div
            className={`flex flex-col ${layout === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12 lg:gap-16`}
          >
            {/* Media Card */}
            <div
              ref={mediaCardRef}
              className="w-full lg:w-[42vw] h-[50vh] lg:h-[72vh] will-transform"
              style={{ perspective: '1000px' }}
            >
              <div className="media-card w-full h-full relative group">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* Text Cluster */}
            <div
              ref={textClusterRef}
              className="w-full lg:w-[38vw] will-transform"
            >
              {/* Eyebrow with icon */}
              <div className="flex items-center gap-2">
                {icon && <span className="text-[#2D6BFF]">{icon}</span>}
                <span className="font-mono text-xs tracking-[0.12em] text-[#2D6BFF] uppercase">
                  {eyebrow}
                </span>
              </div>

              {/* Headline */}
              <h3 className="mt-4 font-display font-bold text-[clamp(36px,5vw,64px)] leading-[1] tracking-[-0.02em] text-[#F7F8FB]">
                {headline}
              </h3>

              {/* Body */}
              <p className="mt-6 text-base md:text-lg text-[#A6A9B1] leading-relaxed">
                {body}
              </p>

              {/* Bullets */}
              <ul ref={bulletsRef} className="mt-8 space-y-4">
                {bullets.map((bullet, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 will-transform"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2D6BFF]/20 flex items-center justify-center mt-0.5">
                      <Check size={14} className="text-[#2D6BFF]" />
                    </span>
                    <span className="text-sm md:text-base text-[#A6A9B1]">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={ctaLink}
                className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-[#2D6BFF] hover:text-[#F7F8FB] transition-colors group"
              >
                <span className="underline underline-offset-4">{cta}</span>
                <ArrowRight
                  size={16}
                  className="transform group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
