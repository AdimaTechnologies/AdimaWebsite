import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Upload, ArrowRight, CheckCircle, MapPin, Users } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

gsap.registerPlugin(ScrollTrigger);

const OPEN_POSITIONS: {
  id: string;
  title: string;
  experience: string;
  location: string;
  vacancies: number;
  intro: string;
  responsibilities: string[];
  requirements: string[];
  closing: string;
}[] = [
  {
    id: 'coo-all-products',
    title: 'Chief Operating Officer (COO)',
    experience: '4+ Years',
    location: 'Hyderabad / Remote',
    vacancies: 1,
    intro: 'We are seeking a dynamic, results-driven COO to lead and oversee operations across all products of Adima Technologies Pvt Ltd. You will have a proven track record in managing tech teams, product portfolios, marketing strategies, and operational finances, ensuring seamless execution, scalability, and growth. Experience in social media or digital platform management is a plus.',
    responsibilities: [
      'Take full ownership of operations across all products: timely execution, delivery, and handover of projects',
      'Lead technical teams, product development, and platform operations for multiple business units',
      'Oversee marketing strategies, campaigns, and user acquisition efforts across all products',
      'Monitor and manage operational budgets, project financials, and resource allocation',
      'Collaborate with finance and fundraising teams to ensure adequate funding for all initiatives',
      'Drive operational efficiency, process improvements, and scalability across the organization',
      'Work closely with the CEO and leadership team on strategic planning, product expansion, and organizational growth',
      'Implement best practices for product launches, team management, and cross-functional coordination',
    ],
    requirements: [
      'Proven experience as COO or senior operational leader, ideally in multi-product or tech-focused companies',
      'Strong knowledge of product management, tech operations, and marketing',
      'Experience in operational budgeting, project financials, and fundraising coordination',
      'Excellent leadership, communication, and organizational skills',
      'Experience in social media or digital platform management is a plus',
    ],
    closing: 'We look for a leader who can scale operations, align teams, and drive growth across all our products.',
  },
  {
    id: 'cfo',
    title: 'Chief Financial Officer (CFO)',
    experience: '4+ Years',
    location: 'Hyderabad / Remote',
    vacancies: 1,
    intro: 'We are seeking a strategic CFO to manage the financial health of Adima Technologies Pvt Ltd, overseeing all products and business units. You will be responsible for budgeting, forecasting, financial reporting, and fundraising across the company, while providing insights to drive business growth and support strategic decision-making.',
    responsibilities: [
      'Manage financial operations across all products: budgets, forecasts, and consolidated reporting',
      'Develop and execute fundraising strategies, investor relations, and capital allocation plans',
      'Monitor cash flow, P&L statements, and key financial metrics across the organization',
      'Ensure compliance with financial regulations and reporting standards',
      'Collaborate with COOs, product heads, and leadership to optimize operational efficiency and profitability',
      'Provide financial guidance for strategic planning, product expansion, and scaling initiatives',
      'Evaluate investment opportunities and advise on resource allocation for maximum ROI',
    ],
    requirements: [
      'Proven experience as CFO or senior finance leader, preferably in multi-product companies or growth-stage startups',
      'Expertise in fundraising, budgeting, financial planning, and performance management',
      'Strong analytical skills and ability to translate financial data into actionable business insights',
      'Excellent leadership, communication, and negotiation skills',
    ],
    closing: 'We need a finance leader who can steward our resources and support strategic growth.',
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    experience: '0–2 years',
    location: 'Hyderabad / Remote',
    vacancies: 16,
    intro: 'We are looking for a motivated Frontend Developer to join our tech team. The ideal candidate will be responsible for building responsive, interactive, and visually appealing web applications using modern frontend technologies. This role is perfect for someone with a strong foundation in web development who is eager to learn and grow in a dynamic startup environment.',
    responsibilities: [
      'Develop responsive and user-friendly web interfaces using HTML5, CSS3, JavaScript (ES6+), React.js, and Redux/Context API',
      'Integrate frontend applications with REST APIs',
      'Ensure cross-browser compatibility and responsive design across devices',
      'Collaborate with designers and backend developers to implement UI/UX requirements',
      'Write clean, maintainable code following best practices and version control standards (Git, GitHub)',
      'Work with CSS frameworks like Tailwind CSS or Bootstrap to speed up development',
      'Support the team in testing, debugging, and optimizing frontend performance',
      'Learn and adopt new frontend technologies, including TypeScript basics, to improve development efficiency',
    ],
    requirements: [
      '0–2 years of experience in frontend web development or internships/projects demonstrating relevant skills',
      'Strong knowledge of HTML5, CSS3, JavaScript (ES6+), React.js, and state management (Redux/Context API)',
      'Familiarity with REST APIs and integrating backend services',
      'Understanding of responsive design principles and cross-browser compatibility',
      'Experience with Git, GitHub for version control',
      'Knowledge of CSS frameworks like Tailwind CSS or Bootstrap',
      'Basic knowledge of TypeScript is a plus',
      'Good problem-solving skills, attention to detail, and ability to work collaboratively in a team',
    ],
    closing: 'If you love building interfaces users enjoy, we’d like to hear from you.',
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    experience: '0–2 years',
    location: 'Hyderabad / Remote',
    vacancies: 4,
    intro: 'We are looking for a motivated Backend Developer to join our tech team and assist in building scalable, secure, and high-performance backend services. The ideal candidate will have foundational experience in backend technologies and databases, and be eager to learn and grow in a fast-paced startup environment.',
    responsibilities: [
      'Develop and maintain backend services using Node.js, Java, or Python',
      'Work with frameworks such as Express.js, Spring Boot, or Flask to build robust APIs',
      'Design and implement REST APIs for integration with frontend and mobile applications',
      'Work with relational and non-relational databases (MySQL, PostgreSQL, MongoDB)',
      'Implement JWT-based authentication and maintain secure access controls',
      'Use Git for version control and collaborate with team members',
      'Test APIs using Postman and ensure proper functionality',
      'Assist in containerizing applications with basic Docker knowledge',
      'Collaborate with frontend developers and other stakeholders to deliver end-to-end solutions',
    ],
    requirements: [
      '0–2 years of experience in backend development or relevant internships/projects',
      'Proficiency in Node.js, Java, or Python and related backend frameworks (Express.js, Spring Boot, Flask)',
      'Experience working with REST APIs, databases (MySQL, PostgreSQL, MongoDB), and authentication methods (JWT)',
      'Basic knowledge of Docker and containerization',
      'Familiarity with Git and version control best practices',
      'Experience using Postman or similar API testing tools',
      'Strong problem-solving skills, attention to detail, and eagerness to learn in a collaborative environment',
    ],
    closing: 'Join us to build the APIs and services that power our products.',
  },
  {
    id: 'flutter-developer',
    title: 'Flutter Developer',
    experience: '0–2 years',
    location: 'Hyderabad / Remote',
    vacancies: 8,
    intro: 'We are looking for a motivated Flutter Developer to join our team and contribute to building high-quality cross-platform mobile applications for Android and iOS. The ideal candidate will have foundational experience in Flutter and Dart, and be eager to learn, grow, and work on real-world projects.',
    responsibilities: [
      'Develop and maintain mobile applications using Flutter and Dart',
      'Implement state management using Provider, Riverpod, or BLoC (basic)',
      'Integrate REST APIs and work with JSON data',
      'Utilize Firebase services including authentication, database, storage, and cloud functions',
      'Assist in Android and iOS builds and deployment basics',
      'Manage local data storage using SQLite or Hive',
      'Collaborate with frontend, backend, and design teams to deliver high-quality apps',
      'Use Git for version control and maintain clean, maintainable code',
    ],
    requirements: [
      '0–2 years of experience in Flutter development or relevant internships/projects',
      'Proficiency in Dart and building cross-platform mobile apps',
      'Basic knowledge of state management patterns (Provider, Riverpod, or BLoC)',
      'Familiarity with REST APIs, JSON, and Firebase services',
      'Understanding of Android & iOS build processes',
      'Experience with local databases (SQLite or Hive) is a plus',
      'Knowledge of Git and version control best practices',
      'Strong problem-solving skills, attention to detail, and eagerness to learn in a fast-paced environment',
    ],
    closing: 'Help us ship great mobile experiences on Android and iOS.',
  },
  {
    id: 'manual-tester',
    title: 'Manual / QA Engineer',
    experience: '0–2 years',
    location: 'Hyderabad / Remote',
    vacancies: 4,
    intro: 'We are looking for a detail-oriented Manual / QA Engineer to ensure the quality and reliability of our software products. The ideal candidate will execute test cases, identify bugs, and work closely with the development team to ensure smooth, error-free releases.',
    responsibilities: [
      'Review requirements and create detailed test plans and test cases',
      'Execute manual test cases for web and mobile applications',
      'Identify, document, and report defects in clear and concise detail',
      'Collaborate with developers and other team members to ensure issues are resolved',
      'Perform regression, functional, and usability testing',
      'Ensure products meet quality standards before release',
      'Participate in daily stand-ups and provide feedback on product quality',
    ],
    requirements: [
      '0–2 years of experience in manual testing or relevant internships/projects',
      'Strong understanding of software development lifecycle (SDLC) and testing methodologies',
      'Ability to write clear and detailed bug reports and test cases',
      'Familiarity with web and mobile application testing',
      'Basic knowledge of SQL for database verification is a plus',
      'Good analytical, problem-solving, and communication skills',
      'Ability to work independently and collaboratively in a fast-paced environment',
    ],
    closing: 'Quality is core to what we build—your role is essential in delivering reliable products.',
  },
  {
    id: 'video-photo-editor',
    title: 'Video & Photo Editor',
    experience: '2+ years',
    location: 'Hyderabad / Remote',
    vacancies: 1,
    intro: 'We are looking for a creative and detail-oriented Video & Photo Editor to produce engaging video and graphic content for our social media campaigns, marketing initiatives, and product promotions. The ideal candidate will have experience in editing videos and designing visuals that align with brand identity and drive audience engagement.',
    responsibilities: [
      'Edit and assemble raw footage into polished videos for social media, marketing campaigns, product promotions, and internal communications',
      'Add graphics, motion effects, music, and voiceovers to enhance video storytelling',
      'Optimize videos for different platforms including YouTube, Instagram, Facebook, LinkedIn, and websites',
      'Design posters, banners, infographics, and other visual content for social media campaigns and promotions',
      'Enhance images, create layouts, and maintain brand consistency across all designs',
      'Collaborate with marketing and creative teams to produce high-quality visuals that engage audiences',
      'Manage multiple projects simultaneously, meeting deadlines without compromising quality',
      'Stay updated with the latest video, graphic, and social media trends, tools, and techniques',
    ],
    requirements: [
      'Proven experience as Video Editor, Photo Editor, or similar role',
      'Proficient in video editing software (Adobe Premiere Pro, After Effects, Final Cut Pro, or DaVinci Resolve)',
      'Skilled in graphic design and photo editing tools (Adobe Photoshop, Illustrator, Canva, or similar)',
      'Strong sense of visual storytelling, composition, and design principles',
      'Experience creating content for social media campaigns is highly desirable',
      'Attention to detail, creativity, and ability to work independently or collaboratively',
      'Knowledge of motion graphics, animation, and sound design is a plus',
    ],
    closing: 'Bring our brand to life through compelling video and visual content.',
  },
];

const ROLE_OPTIONS = OPEN_POSITIONS.map((p) => ({ value: p.id, label: p.title }));

export default function CareersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
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
    role: '',
  });

  const formEndpoint = '/.netlify/functions/send-careers-email';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        accordionRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );
      gsap.fromTo(
        contentRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );
      gsap.fromTo(
        formRef.current,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      data.append('role', ROLE_OPTIONS.find((r) => r.value === formData.role)?.label || formData.role);
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
      setFormData({ firstName: '', lastName: '', email: '', phone: '', linkedin: '', resume: null, role: '' });
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again or email hr@adimatechnologies.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="careers" className="relative py-20 md:py-24 bg-[#0B0C10] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2D6BFF]/30 to-transparent" />

      {/* Central heading */}
      <div className="container mx-auto px-6 relative z-10 text-center mb-10">
        <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#F7F8FB] mb-3 leading-tight">
          We&apos;re Hiring!
        </h2>
        <p className="text-[#A6A9B1] text-base md:text-lg max-w-2xl mx-auto">
          We&apos;re growing fast and looking for passionate people to join us! Check out our openings & apply if you&apos;re a great fit.
        </p>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
        {/* Left: Open positions accordion */}
        <div ref={accordionRef} className="lg:w-3/5 w-full order-1 lg:order-1">
          <span className="inline-block py-1 px-3 rounded-full bg-[#2D6BFF]/10 text-[#2D6BFF] text-xs font-mono tracking-wider border border-[#2D6BFF]/20 mb-4">
            CAREERS
          </span>
          <h3 className="font-display font-bold text-xl md:text-2xl text-[#F7F8FB] mb-4 leading-tight">
            Join us in building the next generation of meaningful social connections.
          </h3>
          <Accordion type="single" defaultValue="coo-all-products" collapsible className="w-full">
            {OPEN_POSITIONS.map((position) => (
              <AccordionItem
                key={position.id}
                value={position.id}
                className="border border-[#A6A9B1]/10 rounded-lg mb-2 overflow-hidden bg-[#16181D]/50 data-[state=open]:bg-[#16181D]"
              >
                <AccordionTrigger className="px-4 py-3 text-left hover:no-underline hover:bg-[#F7F8FB]/5 [&[data-state=open]>svg]:rotate-180 group">
                  <div className="flex flex-col items-start gap-1 w-full pr-2">
                    <div className="flex flex-wrap items-center gap-2 w-full">
                      <span className="text-[#F7F8FB] font-semibold text-sm">{position.title}</span>
                      <span className="text-[#2D6BFF] font-mono text-xs">({position.experience})</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#A6A9B1]">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#2D6BFF]/80" />
                        {position.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#2D6BFF]/80" />
                        {position.vacancies} {position.vacancies === 1 ? 'vacancy' : 'vacancies'}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0 text-[#A6A9B1]">
                  <p className="text-sm mb-3">{position.intro}</p>
                  <p className="text-xs font-semibold text-[#F7F8FB]/90 mb-2">Key Responsibilities:</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs mb-3">
                    {position.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ol>
                  <p className="text-xs font-semibold text-[#F7F8FB]/90 mb-2">Requirements:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs mb-3">
                    {position.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                  <p className="text-sm italic">{position.closing}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Right: Apply form */}
        <div ref={contentRef} className="lg:w-2/5 w-full space-y-6 order-2 lg:order-2">

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full bg-[#16181D] border border-[#A6A9B1]/10 rounded-xl p-4 md:p-5 relative overflow-hidden group"
          >
            <h3 className="text-base font-bold text-[#F7F8FB] mb-3 relative">Apply now</h3>
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
                  className="w-full bg-[#0B0C10] border border-[#A6A9B1]/20 rounded-md px-2.5 py-2 text-xs text-[#F7F8FB] placeholder:text-[#A6A9B1]/60 focus:border-[#2D6BFF] focus:outline-none"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#A6A9B1]">Upload Resume *</label>
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
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#A6A9B1]">Applied Role *</label>
                <select
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-[#0B0C10] border border-[#A6A9B1]/20 rounded-md px-2.5 py-2 text-xs text-[#F7F8FB] focus:border-[#2D6BFF] focus:outline-none"
                >
                  <option value="">Select role</option>
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
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
                ) : isSubmitted ? (
                  <>
                    <CheckCircle size={14} />
                    Thank you! We&apos;ll be in touch.
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
