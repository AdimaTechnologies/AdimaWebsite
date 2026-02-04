import { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VISITOR_API = 'https://visitor.6developer.com/visit';

// Single request per page load: avoid duplicate calls (e.g. React Strict Mode) and reuse result
let visitRequestStarted = false;
let cachedTotalCount: number | null = null;

function updateVisitorElement(elementId: string, count: number): void {
  const el = document.getElementById(elementId);
  if (el) el.textContent = String(count);
}

function recordVisitAndShowCount(elementId: string): void {
  // If we already have a count, just update the DOM (e.g. after remount)
  if (cachedTotalCount !== null) {
    updateVisitorElement(elementId, cachedTotalCount);
    return;
  }
  // Only one request per session
  if (visitRequestStarted) return;
  visitRequestStarted = true;

  const domain = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : '');
  const timezone = typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : '';
  const page_path = typeof window !== 'undefined' ? window.location.pathname : '';
  const page_title = typeof document !== 'undefined' ? document.title : '';
  const referrer = typeof document !== 'undefined' ? document.referrer : '';
  let search_query = '';
  if (referrer) {
    try {
      const url = new URL(referrer);
      if (url.hostname.includes('google.com')) search_query = url.searchParams.get('q') || '';
      else if (url.hostname.includes('bing.com')) search_query = url.searchParams.get('q') || '';
      else if (url.hostname.includes('yahoo.com')) search_query = url.searchParams.get('p') || '';
      else if (url.hostname.includes('duckduckgo.com')) search_query = url.searchParams.get('q') || '';
    } catch {
      // ignore
    }
  }
  fetch(VISITOR_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain, timezone, page_path, page_title, referrer, search_query }),
  })
    .then((res) => res.json())
    .then((data: { totalCount?: number }) => {
      if (typeof data.totalCount === 'number') {
        cachedTotalCount = data.totalCount;
        updateVisitorElement(elementId, data.totalCount);
      }
    })
    .catch(() => {
      visitRequestStarted = false; // allow retry on next mount if failed
    });
}

export { recordVisitAndShowCount };
export const VISITOR_COUNTER_ELEMENT_ID = 'visitor-counter';

export default function ClosingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const triangleRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Glow pulse
      gsap.to(glowRef.current, {
        scale: 1.3,
        opacity: 0.4,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Triangle entrance - FASTER
      gsap.fromTo(
        triangleRef.current,
        { y: '-50vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.3,
          },
        }
      );

      // Headline - FASTER
      gsap.fromTo(
        headlineRef.current,
        { y: '10vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.3,
          },
        }
      );

      // Subheadline - FASTER
      gsap.fromTo(
        subheadlineRef.current,
        { y: '8vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 35%',
            scrub: 0.3,
          },
        }
      );

      // Footer - FASTER
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            end: 'top 25%',
            scrub: 0.3,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Update visitor count display (request already fired once from App for faster load)
  useEffect(() => {
    recordVisitAndShowCount(VISITOR_COUNTER_ELEMENT_ID);
  }, []);

  const OFFICE_ADDRESS = 'Plot No 1/C, Sy No 83/1, 4th Floor, Raidurgam, Knowledge City Rd, Panmaktha, Hyderabad, Serilingampalle (M), Telangana 500032';
  const SUPPORT_EMAIL = 'info@adimatechnologies.com';
  const LINKEDIN_URL = 'https://www.linkedin.com/company/adima-technologies-pvt-ltd/';
  const INSTAGRAM_URL = 'https://www.instagram.com/adima_technologies_pvt_ltd/';

  return (
    <section
      id="footer"
      ref={sectionRef}
      className="relative bg-[#0B0C10] overflow-hidden"
    >
      {/* Animated glow */}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-[#2D6BFF] opacity-30 blur-[150px] pointer-events-none will-transform"
      />

      {/* Top accent triangle */}
      <div
        ref={triangleRef}
        className="absolute left-1/2 top-0 w-[35vw] h-[20vw] bg-[#2D6BFF] will-transform -translate-x-1/2"
        style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
      />

      {/* Decorative elements */}
      <div
        className="absolute left-[10%] top-[25%] w-[3vw] h-[3vw] bg-[#2D6BFF]/30"
        style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
      />
      <div
        className="absolute right-[12%] bottom-[30%] w-[4vw] h-[4vw] bg-[#F7F8FB]/20"
        style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
      />

      {/* Part 1: Connect With Us (contact CTA only) */}
      <div className="relative min-h-[60vh] flex flex-col items-center justify-center px-6 pt-16 pb-12">
        <h2
          ref={headlineRef}
          className="font-display font-bold text-[clamp(40px,8vw,100px)] leading-[0.95] tracking-[-0.03em] text-[#F7F8FB] text-center will-transform"
        >
          Connect With Us
        </h2>

        <p
          ref={subheadlineRef}
          className="mt-6 text-lg md:text-xl text-[#A6A9B1] text-center max-w-lg will-transform"
        >
          Join the moment to talk about our products, design, scale.
        </p>
      </div>

      {/* Part 2: Footer - 3 columns like design (OUR OFFICE | GET OUR APP + FOLLOW US | LEGAL + Visitor) */}
      <div
        ref={footerRef}
        className="relative border-t border-[#1E2230] bg-[#07080C] will-transform py-8 sm:py-10 md:py-12 px-4 sm:px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 text-center md:text-left">
            {/* Column 1: OUR OFFICE + SUPPORT & INQUIRIES */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[#F7F8FB] font-semibold text-xs tracking-wider uppercase mb-2">Our Office</p>
                <p className="text-[#A6A9B1] text-sm leading-relaxed max-w-full sm:max-w-xs">{OFFICE_ADDRESS}</p>
              </div>
              <div>
                <p className="text-[#F7F8FB] font-semibold text-xs tracking-wider uppercase mb-2">Suggestions, Support & Inquiries</p>
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#2D6BFF] hover:text-[#5BA3FF] text-sm underline break-all transition-colors">
                  {SUPPORT_EMAIL}
                </a>
              </div>
            </div>

            {/* Column 2: GET OUR APP + FOLLOW US (centered) */}
            <div className="flex flex-col gap-6 items-center justify-center text-center">
              {/* <div>
                <p className="text-[#F7F8FB] font-semibold text-xs tracking-wider uppercase mb-3">Get Our App</p>
                <div className="flex items-center justify-center gap-3">
                  <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="inline-block w-10 h-10 rounded-lg overflow-hidden hover:opacity-90 transition-opacity" aria-label="Download on App Store">
                    <img src="/images/app-store-png-logo-33102.png" alt="App Store" className="w-full h-full object-contain" />
                  </a>
                  <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="inline-block w-10 h-10 rounded-lg overflow-hidden hover:opacity-90 transition-opacity" aria-label="Get it on Google Play">
                    <img src="/images/play-store-logo-33868.png" alt="Google Play" className="w-full h-full object-contain" />
                  </a>
                </div>
              </div> */}
              <div>
                <p className="text-[#F7F8FB] font-semibold text-xs tracking-wider uppercase mb-3">Follow Us</p>
                <div className="flex items-center justify-center gap-3">
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg border border-[#2A2E3A] bg-[#0F1118] flex items-center justify-center text-[#A6A9B1] hover:text-[#2D6BFF] hover:border-[#2D6BFF]/50 transition-colors" aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg border border-[#2A2E3A] bg-[#0F1118] flex items-center justify-center text-[#A6A9B1] hover:text-[#2D6BFF] hover:border-[#2D6BFF]/50 transition-colors" aria-label="Instagram">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 3: LEGAL + Visitor counter */}
            <div className="flex flex-col gap-6 items-center md:items-end">
              <div>
                <p className="text-[#F7F8FB] font-semibold text-xs tracking-wider uppercase mb-3">Quick Links</p>
                <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3">
                  <Link to="/terms" className="text-[#A6A9B1] text-sm hover:text-[#F7F8FB] transition-colors">
                    Terms & Conditions
                  </Link>
                  <span className="text-[#A6A9B1]/50">|</span>
                  <Link to="/privacy" className="text-[#A6A9B1] text-sm hover:text-[#F7F8FB] transition-colors">
                    Privacy Policies
                  </Link>
                </div>
              </div>
              
            </div>
          </div>

          {/* Bottom bar: Copyright left, Besides right */}
          <div className="mt-8 pt-6 border-t border-[#1E2230] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A6A9B1]/70">
            <span>© 2026 Adima Technologies Pvt Ltd. All Rights Reserved.</span>
            <p className="text-[#A6A9B1] text-sm flex items-center gap-2 flex-wrap">
                This site has{' '}
                <span
                  id={VISITOR_COUNTER_ELEMENT_ID}
                  className="inline-flex items-center justify-center min-w-[2rem] px-2.5 py-0.5 rounded-sm bg-[#2B2D3B] text-[#FFFFFF] font-medium text-sm"
                />
                {' '}
                visitors
              </p>
          </div>
        </div>
      </div>
    </section>
  );
}
