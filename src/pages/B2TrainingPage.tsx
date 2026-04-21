import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  TrendingUp,
  Calendar,
  IndianRupee,
  Zap,
  Monitor,
  Server,
  Database,
  Cloud,
  Bot,
  Wrench,
  Check,
  Users,
  Sparkles,
  Mail,
  Phone,
  Quote,
  ArrowRight,
  Upload,
  CheckCircle,
} from 'lucide-react';

const MAIL_B2 = 'trainings.b2@adimatechnologies.com';
const MAIL_OFFER_SUBJECT =
  'B2 Java Full Stack – Rs 30k (Rs 10k off) enquiry';
const PHONE_B2 = '+919502718181';
const PHONE_B2_DISPLAY = '+91 95027 18181';

/** Simple Icons CDN — brand SVGs (https://simpleicons.org) */
function techIconUrl(slug: string, color = 'ffffff'): string {
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}

type TechItem = { label: string; slug: string };

const techGroups: { title: string; icon: typeof Monitor; items: TechItem[] }[] = [
  {
    title: 'Frontend',
    icon: Monitor,
    items: [
      { label: 'HTML', slug: 'html5' },
      { label: 'CSS', slug: 'css3' },
      { label: 'JavaScript', slug: 'javascript' },
      { label: 'React.js', slug: 'react' },
      { label: 'Bootstrap', slug: 'bootstrap' },
      { label: 'Tailwind CSS', slug: 'tailwindcss' },
      { label: 'Redux', slug: 'redux' },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    items: [
      { label: 'Core Java', slug: 'openjdk' },
      { label: 'Advanced Java', slug: 'openjdk' },
      { label: 'Spring', slug: 'spring' },
      { label: 'Spring Boot (REST APIs)', slug: 'springboot' },
      { label: 'Hibernate (JPA)', slug: 'hibernate' },
      { label: 'Microservices Basics', slug: 'kubernetes' },
    ],
  },
  {
    title: 'Database & BaaS',
    icon: Database,
    items: [
      { label: 'MySQL', slug: 'mysql' },
      { label: 'Supabase', slug: 'supabase' },
      { label: 'MongoDB', slug: 'mongodb' },
    ],
  },
  {
    title: 'Cloud & Deployment',
    icon: Cloud,
    items: [
      { label: 'AWS', slug: 'amazonaws' },
      { label: 'Docker', slug: 'docker' },
      { label: 'CI/CD (GitHub Actions)', slug: 'githubactions' },
    ],
  },
  {
    title: 'AI & Tooling',
    icon: Bot,
    items: [
      { label: 'AI APIs', slug: 'openai' },
      { label: 'Claude Code', slug: 'anthropic' },
      { label: 'Cursor IDE', slug: 'cursor' },
      { label: 'Ollama (Local LLMs)', slug: 'ollama' },
      { label: 'Antigravity', slug: 'google' },
      { label: 'Latest AI Tools', slug: 'huggingface' },
    ],
  },
  {
    title: 'Dev Tools & Design',
    icon: Wrench,
    items: [
      { label: 'Git', slug: 'git' },
      { label: 'GitHub', slug: 'github' },
      { label: 'Postman', slug: 'postman' },
      { label: 'Maven', slug: 'apachemaven' },
      { label: 'IntelliJ IDEA', slug: 'intellijidea' },
      { label: 'VS Code', slug: 'visualstudiocode' },
      { label: 'Figma', slug: 'figma' },
      { label: 'Swagger', slug: 'swagger' },
    ],
  },
];

function TechChip({ label, slug }: TechItem) {
  const [failed, setFailed] = useState(false);
  const initials = label
    .replace(/[^a-zA-Z]/g, ' ')
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col items-center gap-1.5 w-[4.5rem] sm:w-[5.25rem]">
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-[#0B0C10] border border-[#2D6BFF]/25 flex items-center justify-center shadow-[0_0_12px_rgba(45,107,255,0.12)]">
        {!failed ? (
          <img
            src={techIconUrl(slug)}
            alt=""
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
            loading="lazy"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="text-[10px] font-bold text-[#2D6BFF] leading-none text-center px-0.5">{initials || '—'}</span>
        )}
      </div>
      <span className="text-[9px] sm:text-[10px] text-center text-[#A6A9B1] leading-snug line-clamp-3">{label}</span>
    </div>
  );
}

const highlights = [
  '6 Months Program | 2 Hours/Day (Flexible Learning)',
  'Complete Java Full Stack + AI Integration',
  'Hands-on Learning through Real-Time Product Development',
  'Training by In-House Experts from a Product Startup',
  'Weekly Tasks, Assignments & Performance Tracking',
  'Resume Crafted to Stand Out Among Top Applicants',
  'Live Projects Included in Resume Support',
  'Job Assistance with Resume, Interview Calls & Guidance',
  'Career-Focused Training: Graduate to Software Developer',
];

const whoCanJoin = ['Freshers (B.Tech / Degree)', 'Final Year Students', 'Career Switchers (Non-IT to IT)'];

const whyJoin = [
  'Become job-ready with coding skills & project experience',
  'Learn on live company products — not just practice projects',
  'Build a strong portfolio that attracts recruiters',
  'Add real training projects to your resume',
  'Get a professional resume that stands out among 100+ applicants',
  'Understand how real IT companies design, build & deploy applications',
  'Get step-by-step guidance to crack interviews confidently',
  'Learn with personal mentorship (Only 25 Seats)',
  'Certificate of Completion + Session Recordings / Backup Support Available',
];

const testimonials: { title: string; quote: string; author: string }[] = [
  {
    title: 'Real Project Experience',
    quote:
      'During my training, I worked on real-time projects like the EkPage Admin Panel. This hands-on exposure strengthened my resume and gave me practical industry experience beyond theory.',
    author: 'Kasaiah, TCS',
  },
  {
    title: 'Cracked Interview in First Attempt',
    quote:
      'My interviewer was impressed with my experience in building real-world features like authentication and payment gateway integration. That confidence helped me secure a job in my very first interview.',
    author: 'Nageena, Capgemini',
  },
  {
    title: 'Learn by Building, Not Just Theory',
    quote:
      'This is not a typical training institute. Here, we don’t just learn concepts—we build complete applications from scratch to deployment, which made a huge difference in my understanding.',
    author: 'Sri Vidya, Cognizant',
  },
  {
    title: 'Industry-Level Interview Preparation',
    quote:
      'The trainers guide us like industry professionals. Mock interviews conducted every 15 days helped me face real interview scenarios and crack my job confidently.',
    author: 'Indu Sri, Capgemini',
  },
  {
    title: 'Improved Communication & Confidence',
    quote:
      'Regular group discussions and activities helped me overcome stage fear and significantly improved my communication skills.',
    author: 'Krishna, Higher Studies (UK)',
  },
  {
    title: 'Better Than Traditional Institutes',
    quote:
      'I had previously joined another institute where the focus was mainly on theory and basic projects. This program completely changed my perspective—I can now independently build full-scale applications.',
    author: 'Gopinadh, Infosys',
  },
  {
    title: 'Industry Exposure & Networking',
    quote:
      'The workshop at T-Hub was a turning point. Interacting with founders and recruiters gave me real insights into industry expectations and hiring processes.',
    author: 'Sandya (AI Startup- T-Hub)',
  },
  {
    title: 'Strong Placement Outcome',
    quote:
      'While many of my friends chose other reputed institutes, I chose this program—and I secured a job earlier with a better CTC.',
    author: 'Ganesh, Tech Mahindra',
  },
  {
    title: 'Internship-Like Practical Experience',
    quote:
      'This program feels like a real internship. The exposure and hands-on work are equivalent to what a 1–2 year experienced developer would have.',
    author: 'Nagaraju, EPAM',
  },
  {
    title: 'End-to-End Career Support',
    quote:
      'The mentors supported me until I got placed. From resume building to interview preparation and understanding IT culture, they guided me at every step.',
    author: 'Krishnaveni, LTIMindtree',
  },
];

export default function B2TrainingPage() {
  const pageRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    resume: null as File | null,
  });
  const formEndpoint = '/.netlify/functions/send-b2-training-email';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let sanitized = value;
    if (name === 'phone') {
      sanitized = value.replace(/[^\d\s+\-]/g, '');
    } else if (name === 'firstName' || name === 'lastName') {
      sanitized = value.replace(/[^a-zA-Z\s\-']/g, '');
    }
    setFormData((prev) => ({ ...prev, [name]: sanitized }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData((prev) => ({ ...prev, resume: file ?? null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('linkedin', formData.linkedin || '');
      if (formData.resume) data.append('resume', formData.resume);

      const res = await fetch(formEndpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json.error || `Submission failed (${res.status})`);
      }
      setIsSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', linkedin: '', resume: null });
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or email trainings.b2@adimatechnologies.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main ref={pageRef} className="min-h-screen bg-[#0B0C10] pt-24 pb-16 md:pt-28 md:pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Hero — one scannable block: copy left, offer + actions right (no busy image behind text) */}
        <div
          ref={heroRef}
          className="relative rounded-2xl overflow-hidden border border-[#2D6BFF]/35 mb-8 bg-[#0E1016] shadow-[0_0_48px_rgba(45,107,255,0.08)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#151a26] via-[#0B0C10] to-[#0B0C10]" />
          <div className="absolute top-0 right-0 w-[min(100%,28rem)] h-64 bg-[#2D6BFF]/[0.07] blur-3xl rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#DC2626]/[0.06] blur-3xl rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative px-5 py-8 sm:px-8 sm:py-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_minmax(280px,340px)] lg:gap-12 lg:items-start">
              <div>
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#93C5FD] mb-3">
                  B2 Training Program
                </p>
                <h1 className="font-display font-bold text-[#F7F8FB] leading-[1.12] text-2xl sm:text-3xl lg:text-[2rem] max-w-xl">
                  Attention recent graduates
                  <span className="block mt-2 text-[1.05em] sm:text-[1.08em]">
                    Kickstart your software development career
                  </span>
                </h1>
                <p className="mt-5 text-[#C8CBD2] text-sm sm:text-base leading-relaxed max-w-xl">
                  <span className="text-[#DC2626] font-semibold">Adima Technologies Pvt Ltd</span> offers a live, mentor-led{' '}
                  <span className="text-[#F7F8FB] font-medium">Java full stack + AI</span> program—build on real products,
                  not toy exercises.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md bg-[#1e293b]/90 border border-[#334155] text-[#E2E8F0] text-[11px] font-medium px-2.5 py-1">
                    6 months · 2 hrs/day
                  </span>
                  <span className="inline-flex items-center rounded-md bg-[#DC2626]/20 border border-[#DC2626]/40 text-[#FECACA] text-[11px] font-semibold px-2.5 py-1">
                    Early bird ₹30k
                  </span>
                  <span className="inline-flex items-center rounded-md bg-[#2D6BFF]/15 border border-[#2D6BFF]/35 text-[#BFDBFE] text-[11px] font-medium px-2.5 py-1">
                    25 seats
                  </span>
                </div>
              </div>

              <aside className="rounded-xl border border-amber-500/35 bg-[#12151c]/95 backdrop-blur-sm p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-200/95">Limited offer</p>
                <div className="mt-2 flex flex-wrap items-end gap-2">
                  <span className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">₹30k</span>
                  <span className="text-base text-[#6B7280] line-through pb-1">₹40k</span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#DC2626]/40 text-[#FECACA] border border-[#DC2626]/50">
                    Save ₹10,000
                  </span>
                </div>
                <p className="text-xs text-[#9CA3AF] mt-2">All inclusive · early-bird for this batch</p>

                <ul className="mt-5 space-y-3 text-sm text-[#D1D5DB]">
                  <li className="flex gap-3">
                    <Calendar className="w-5 h-5 text-[#2D6BFF] shrink-0 mt-0.5" aria-hidden />
                    <span>
                      <span className="text-[#9CA3AF] text-xs uppercase tracking-wide block">Starts</span>
                      May 10, 2026
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Users className="w-5 h-5 text-[#2D6BFF] shrink-0 mt-0.5" aria-hidden />
                    <span>
                      <span className="text-[#9CA3AF] text-xs uppercase tracking-wide block">Batch size</span>
                      Only 25 learners (high mentor focus)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <IndianRupee className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden />
                    <span>
                      <span className="text-[#9CA3AF] text-xs uppercase tracking-wide block">Fee</span>
                      ₹30,000 at offer price <span className="text-[#6B7280] line-through text-xs ml-1">₹40,000</span>
                    </span>
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={scrollToForm}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#DC2626] hover:bg-[#b91c1c] text-white font-semibold text-sm py-3.5 px-4 shadow-[0_8px_24px_rgba(220,38,38,0.3)] transition-colors"
                >
                  Apply for B2 Program
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </button>
                <a
                  href={`tel:${PHONE_B2}`}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[#2A2E3A] bg-[#0B0C10]/80 py-2.5 text-sm text-[#E5E7EB] hover:border-[#2D6BFF]/50 hover:text-[#93C5FD] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#2D6BFF]" />
                  {PHONE_B2_DISPLAY}
                </a>
                <a
                  href={`mailto:${MAIL_B2}`}
                  className="mt-2 block text-center text-xs text-[#2D6BFF] hover:underline break-all"
                >
                  {MAIL_B2}
                </a>
              </aside>
            </div>
          </div>
        </div>

        <p className="text-sm text-[#A6A9B1] mb-8 flex items-start gap-2">
          <TrendingUp className="w-4 h-4 text-[#2D6BFF] shrink-0 mt-0.5" />
          <span>
            <strong className="text-[#F7F8FB]">Ideal for:</strong> Graduates ready to build strong full-stack skills and
            start their IT career.
          </span>
        </p>

        {/* Tech stack */}
        <section className="mb-8">
          <h2 className="font-display font-bold text-lg text-[#F7F8FB] mb-1 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-[#2D6BFF]" />
            Tools & technologies covered
          </h2>
          <p className="text-xs text-[#A6A9B1] mb-4">Official brand icons — same stack you will use on real projects.</p>
          <div className="space-y-4">
            {techGroups.map(({ title, icon: Icon, items }) => (
              <div
                key={title}
                className="rounded-xl border border-[#A6A9B1]/10 bg-[#16181D]/40 px-3 py-3 sm:px-4 sm:py-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-4 h-4 text-[#DC2626]" />
                  <span className="text-xs font-semibold text-[#F7F8FB]">{title}</span>
                </div>
                <div className="flex flex-wrap gap-3 sm:gap-4 justify-start">
                  {items.map((item) => (
                    <TechChip key={`${title}-${item.label}`} {...item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section className="mb-8">
          <h2 className="font-display font-bold text-lg text-[#F7F8FB] mb-3 flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-400" />
            Program highlights
          </h2>
          <ul className="space-y-2">
            {highlights.map((h) => (
              <li key={h} className="flex gap-2 text-sm text-[#A6A9B1]">
                <Check className="w-4 h-4 text-[#2D6BFF] shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <section>
            <h2 className="font-display font-bold text-base text-[#F7F8FB] mb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#2D6BFF]" />
              Who can join
            </h2>
            <ul className="list-disc list-inside text-sm text-[#A6A9B1] space-y-1">
              {whoCanJoin.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display font-bold text-base text-[#F7F8FB] mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#DC2626]" />
              Why join us?
            </h2>
            <ul className="space-y-2">
              {whyJoin.map((w) => (
                <li key={w} className="flex gap-2 text-xs text-[#A6A9B1]">
                  <span className="text-emerald-400 shrink-0">✓</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Batch 1 */}
        <section className="mb-8 rounded-xl border border-[#2D6BFF]/25 bg-[#16181D]/60 p-4">
          <h2 className="font-display font-bold text-base text-[#F7F8FB] mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#2D6BFF]" />
            Batch 1 outcomes
          </h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm text-[#A6A9B1]">
            <li>• Total Students: 21</li>
            <li>• Placed in Top MNCs: 11</li>
            <li>• Placed in Mid-Level Companies: 4</li>
            <li>• Placed in Startups: 3</li>
          </ul>
        </section>

        {/* Testimonials marquee */}
        <section className="mb-8">
          <h2 className="font-display font-bold text-lg text-[#F7F8FB] mb-3">What our first batch says</h2>
          <p className="text-xs text-[#A6A9B1] mb-3">Scrolls slowly — full quotes from alumni.</p>
          <div className="relative overflow-hidden rounded-xl border border-[#A6A9B1]/10 py-3">
            <div className="flex gap-4 animate-marquee-slow hover:[animation-play-state:paused] w-max pr-4">
              {[...testimonials, ...testimonials].map((t, i) => (
                <article
                  key={`${t.title}-${i}`}
                  className="w-[260px] sm:w-[300px] shrink-0 rounded-lg border border-[#2D6BFF]/15 bg-[#0F1118] p-3"
                >
                  <Quote className="w-4 h-4 text-[#2D6BFF]/50 mb-1" />
                  <p className="text-xs font-semibold text-[#F7F8FB] mb-1">{t.title}</p>
                  <p className="text-[11px] leading-relaxed text-[#A6A9B1] mb-2 line-clamp-6">{t.quote}</p>
                  <p className="text-[10px] text-[#DC2626]/90">— {t.author}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section ref={formSectionRef} id="b2-application-form" className="mb-8 rounded-2xl border border-[#2D6BFF]/25 bg-[#0f131c]/70 p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="font-display font-bold text-lg text-[#F7F8FB]">Apply for B2 Program</h2>
            <span className="text-[11px] font-semibold px-2 py-1 rounded border border-[#DC2626]/40 bg-[#DC2626]/10 text-[#FECACA]">
              Only 25 seats
            </span>
          </div>

          {isSubmitted ? (
            <div className="w-full rounded-xl p-6 md:p-8 relative overflow-hidden bg-emerald-950/40 border border-emerald-500/30 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mb-4">
                <CheckCircle className="w-8 h-8" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-emerald-50 mb-2">Application submitted</h3>
              <p className="text-emerald-200/90 text-sm leading-relaxed mb-6">
                We received your B2 program application and will contact you shortly.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="text-xs font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="w-full bg-[#16181D] border border-[#A6A9B1]/10 rounded-xl p-4 md:p-5 relative overflow-hidden group"
            >
              <h3 className="text-base font-bold text-[#F7F8FB] mb-3 relative">Book your seat</h3>
              <div className="space-y-3 relative">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#A6A9B1]">First Name *</label>
                    <input
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      autoComplete="given-name"
                      maxLength={50}
                      className="w-full bg-[#0B0C10] border border-[#A6A9B1]/20 rounded-md px-2.5 py-2 text-xs text-[#F7F8FB] placeholder:text-[#A6A9B1]/60 focus:border-[#2D6BFF] focus:outline-none"
                      placeholder="First name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#A6A9B1]">Last Name *</label>
                    <input
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                      maxLength={50}
                      className="w-full bg-[#0B0C10] border border-[#A6A9B1]/20 rounded-md px-2.5 py-2 text-xs text-[#F7F8FB] placeholder:text-[#A6A9B1]/60 focus:border-[#2D6BFF] focus:outline-none"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#A6A9B1]">Email *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    maxLength={254}
                    className="w-full bg-[#0B0C10] border border-[#A6A9B1]/20 rounded-md px-2.5 py-2 text-xs text-[#F7F8FB] placeholder:text-[#A6A9B1]/60 focus:border-[#2D6BFF] focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#A6A9B1]">Phone Number *</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={20}
                    className="w-full bg-[#0B0C10] border border-[#A6A9B1]/20 rounded-md px-2.5 py-2 text-xs text-[#F7F8FB] placeholder:text-[#A6A9B1]/60 focus:border-[#2D6BFF] focus:outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#A6A9B1]">LinkedIn profile (Optional)</label>
                  <input
                    name="linkedin"
                    type="url"
                    value={formData.linkedin}
                    onChange={handleChange}
                    autoComplete="url"
                    maxLength={500}
                    className="w-full bg-[#0B0C10] border border-[#A6A9B1]/20 rounded-md px-2.5 py-2 text-xs text-[#F7F8FB] placeholder:text-[#A6A9B1]/60 focus:border-[#2D6BFF] focus:outline-none"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#A6A9B1]">Upload Resume (Optional)</label>
                  <label className="block border border-dashed border-[#A6A9B1]/20 rounded-md px-2.5 py-2 text-center text-xs text-[#A6A9B1] hover:border-[#2D6BFF]/40 cursor-pointer bg-[#0B0C10]/50">
                    <Upload className="inline w-4 h-4 mr-1 align-middle" />
                    {formData.resume ? formData.resume.name : 'Drop resume or click (PDF, DOCX)'}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {submitError && (
                  <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-2.5 py-2">
                    {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2D6BFF] hover:bg-[#2558D9] disabled:opacity-70 disabled:cursor-not-allowed text-white text-xs font-medium py-2.5 rounded-md flex items-center justify-center gap-1.5"
                >
                  {isSubmitting ? (
                    <>Sending…</>
                  ) : (
                    <>
                      <span>Apply for B2 Program</span>
                      <ArrowRight size={14} className="group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-[#DC2626]/40 bg-gradient-to-br from-[#2a0f0f]/90 via-[#0B0C10] to-[#0f1420] p-6 text-center shadow-[0_0_48px_rgba(220,38,38,0.12)]">
          <Zap className="w-9 h-9 text-amber-400 mx-auto mb-2 drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]" />
          <p className="font-display font-bold text-xl text-[#F7F8FB] mb-1">Grab the ₹30k offer before seats close</p>
          <p className="text-sm text-[#A6A9B1] mb-5 max-w-md mx-auto">
            Only 25 learners per batch — message us now to lock early-bird pricing and get the syllabus on email.
          </p>
          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-w-[220px] rounded-xl bg-[#DC2626] hover:bg-[#b91c1c] text-white font-semibold text-sm px-6 py-3 mb-5 shadow-[0_8px_24px_rgba(220,38,38,0.35)] transition-colors"
          >
            <Mail className="w-4 h-4" />
            Apply now at ₹30k
          </button>
          <p className="text-[10px] uppercase tracking-wider text-[#A6A9B1] mb-3">Or reach us directly</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
            <a href={`mailto:${MAIL_B2}`} className="inline-flex items-center gap-2 text-[#2D6BFF] hover:underline">
              <Mail className="w-4 h-4" />
              {MAIL_B2}
            </a>
            <span className="hidden sm:inline text-[#A6A9B1]/40">|</span>
            <a href={`tel:${PHONE_B2}`} className="inline-flex items-center gap-2 text-[#F7F8FB] hover:text-[#2D6BFF]">
              <Phone className="w-4 h-4" />
              {PHONE_B2_DISPLAY}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
