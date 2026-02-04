import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket, Heart, ShoppingBag, ShoppingCart, Zap, AlertCircle, ArrowRight, Building2, ShieldCheck, Users, CheckCircle, Package, Smile, Newspaper, Users2, Bike, Mountain } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type VentureFeature = { label: string; icon: LucideIcon; iconColor?: string };

const ventures: Array<{
    id: string;
    name: string;
    tagline: string;
    subtitle?: string;
    description: string;
    features?: VentureFeature[];
    status: string;
    link: string;
    mockup: string;
    logo: string;
    color: string;
    glow: string;
    icon: LucideIcon;
    ctaText?: string;
    hideCta?: boolean;
    showStoreIcons?: boolean;
    defaultIconColor?: string;
}> = [
        {
            id: 'ekpage',
            name: 'EkPage',
            tagline: '6 Features, 6 Feeds, 1 Application.',
            subtitle: 'EkPage gives you everything you need in one app, built for everyday India.',
            description: 'A super social platform designed for India that combines 6 features and 6 feeds in one app. Connect with followers, discover categorized creators, enjoy dedicated memes, get minute-to-minute news, official government updates, and find nearby walk-in deals, all in a single application.',
            features: [
                { label: 'Connect with followers', icon: Users, iconColor: 'text-blue-400' },
                { label: 'Discover categorized creators', icon: Users2, iconColor: 'text-amber-400' },
                { label: 'Dedicated memes', icon: Smile, iconColor: 'text-amber-400' },
                { label: 'Minute-to-minute news', icon: Newspaper, iconColor: 'text-amber-400' },
                { label: 'Official government updates', icon: Building2, iconColor: 'text-slate-400' },
                { label: 'Nearby walk-in deals', icon: ShoppingBag, iconColor: 'text-fuchsia-400' },
            ],
            status: 'Live (Beta)',
            link: 'https://www.ekpage.com',
            mockup: '/images/mockups/ekpage-mockup.png',
            logo: '/images/logos/ekpage.webp',
            color: '#3B82F6', // Blue
            glow: 'shadow-[0_0_80px_-20px_rgba(59,130,246,0.5)]',
            icon: Rocket,
            hideCta: true,
            showStoreIcons: true,
        },
        {
            id: '2true',
            name: '2True',
            tagline: 'Real People, Real Verification, Real Connections.',
            description: 'A trusted matrimonial app where every profile is physically verified and approved, ensuring genuine connections. By eliminating fake profiles, it provides a safe and reliable platform for individuals seeking meaningful relationships. With 2True, finding your life partner becomes authentic, secure, and hassle-free.',
            status: 'Under Development',
            link: 'https://www.2true.in',
            mockup: '/images/mockups/2true-mockup.png',
            logo: '/images/logos/2True_Logo.png',
            color: '#EC4899', // Pink
            glow: 'shadow-[0_0_80px_-20px_rgba(236,72,153,0.5)]',
            icon: Heart,
            hideCta: true,
            defaultIconColor: 'text-pink-400',
        },
        {
            id: 'upto6',
            name: 'Upto6',
            tagline: 'Tiny Needs, Trusted Products.',
            subtitle: 'With smart recommendations and easy shopping, upto6 makes parenting simpler, helping little ones grow happy, healthy, and curious.',
            description: 'A dedicated e-commerce platform designed for children aged 0–6 years. It offers a curated selection of toys, clothes, baby care essentials, and learning products, ensuring quality and safety at every step.',
            features: [
                { label: 'Toys, clothes & baby care essentials', icon: Package, iconColor: 'text-amber-400' },
                { label: 'Learning products', icon: CheckCircle, iconColor: 'text-slate-400' },
                { label: 'Quality and safety at every step', icon: ShieldCheck, iconColor: 'text-emerald-400' },
                { label: 'Smart recommendations, easy shopping', icon: ShoppingBag, iconColor: 'text-amber-400' },
            ],
            status: 'Under Development',
            link: 'https://www.upto6.com',
            mockup: '/images/mockups/upto6-mockup.png',
            logo: '/images/logos/Upto6_logo.png',
            color: '#F59E0B', // Amber
            glow: 'shadow-[0_0_80px_-20px_rgba(245,158,11,0.5)]',
            icon: ShoppingBag,
            hideCta: true,
        },
        {
            id: 'bejdo',
            name: 'Bejdo',
            tagline: 'Buy Smart, Sell Fast.',
            subtitle: 'With simple listings and smart search, Bejdo makes second-hand shopping fast, safe, and affordable.',
            description: 'A trusted classified platform for buying and selling used goods with ease. It connects real people for real deals across categories like electronics, furniture, vehicles, and more.',
            features: [
                { label: 'Electronics, furniture, vehicles & more', icon: ShoppingCart, iconColor: 'text-emerald-400' },
                { label: 'Real people, real deals', icon: Users, iconColor: 'text-slate-400' },
                { label: 'Simple listings, smart search', icon: CheckCircle, iconColor: 'text-emerald-400' },
                { label: 'Fast, safe & affordable', icon: ShieldCheck, iconColor: 'text-emerald-400' },
            ],
            status: 'Under Development',
            link: 'https://www.bejdo.in',
            mockup: '/images/mockups/bejdo-mockup.png',
            logo: '/images/logos/bejdo.png',
            color: '#10B981', // Emerald
            glow: 'shadow-[0_0_80px_-20px_rgba(16,185,129,0.5)]',
            icon: ShoppingCart,
            hideCta: true,
        },
        {
            id: '11thone',
            name: '11thOne',
            tagline: 'Electric Power, Endless Adventure.',
            description: 'A high-performance adventure EV bike built for both on-road and off-road journeys. Engineered for thrill-seekers and daily riders alike, it combines electric power, rugged design, and smart technology for a seamless ride across every terrain.',
            features: [
                { label: 'Built for both On-Road and Off-Road journeys', icon: Bike, iconColor: 'text-violet-400' },
                { label: 'Combines Electric Power and Smart Technology', icon: Zap, iconColor: 'text-amber-400' },
                { label: 'Stylish and Rugged Design', icon: Package, iconColor: 'text-slate-400' },
                { label: 'Created for Riders Who Choose Adventure', icon: Mountain, iconColor: 'text-emerald-400' },
            ],
            status: 'Prototype Phase',
            link: 'https://www.11thone-mockup.com',
            mockup: '/images/mockups/11thone-mockup1.png',
            logo: '/images/logos/11thone_Logo.png',
            color: '#8B5CF6', // Violet
            glow: 'shadow-[0_0_80px_-20px_rgba(139,92,246,0.5)]',
            icon: Zap,
            hideCta: true,
        },
    ];

export default function ProductsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // Header Reveal
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

            // Feature Rows Animation
            ventures.forEach((_, index) => {
                const row = document.getElementById(`venture-row-${index}`);
                if (!row) return;

                const image = row.querySelector('.venture-image');
                const content = row.querySelector('.venture-content');

                gsap.fromTo(image,
                    { y: 80, opacity: 0, scale: 0.95 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        scrollTrigger: {
                            trigger: row,
                            start: 'top 80%',
                            end: 'top 20%',
                            scrub: 1
                        }
                    }
                );

                gsap.fromTo(content,
                    { x: index % 2 === 0 ? 30 : -30, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        scrollTrigger: {
                            trigger: row,
                            start: 'top 75%'
                        }
                    }
                );
            });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="products" className="relative py-32 bg-[#0B0C10] overflow-hidden">
            {/* Ambient background glows */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#2D6BFF]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[#2D6BFF]/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Header */}
            <div className="container mx-auto px-6 mb-32 text-center relative z-10" ref={headerRef}>
                <span className="inline-block py-1 px-3 rounded-full bg-[#2D6BFF]/10 text-[#2D6BFF] text-sm font-mono tracking-wider mb-6 border border-[#2D6BFF]/20">
                    OUR PRODUCTS
                </span>
                <h2 className="font-display font-bold text-5xl md:text-7xl text-[#F7F8FB] mb-6 tracking-tight">
                    Building What's Next
                </h2>
                <p className="text-xl text-[#A6A9B1] max-w-2xl mx-auto leading-relaxed">
                    From social connection to sustainable mobility, we are crafting the platforms that will define India's digital future.
                </p>
            </div>

            {/* Ventures Loop */}
            <div className="container mx-auto px-6 space-y-36 relative z-10">
                {ventures.map((venture, index) => (
                    <div
                        key={venture.id}
                        id={`venture-row-${index}`}
                        className={`flex flex-col md:flex-row items-center gap-6 lg:gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                    >
                        {/* Visual Side - Larger Area */}
                        <div className="w-full md:w-7/12 venture-image relative group perspective-[1000px]">
                            {/* Decorative Animated Shapes */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] pointer-events-none">
                                <div
                                    className="absolute top-0 right-0 w-64 h-64 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"
                                    style={{ backgroundColor: venture.color, animationDuration: '4s' }}
                                />
                                <div
                                    className="absolute bottom-10 left-10 w-48 h-48 rounded-full mix-blend-screen filter blur-3xl opacity-20"
                                    style={{ backgroundColor: venture.color }}
                                />
                                {/* Geometric Shape Accent */}
                                <div
                                    className="absolute top-1/4 -left-12 w-24 h-24 border-2 border-dashed rounded-full opacity-20 group-hover:scale-125 transition-transform duration-1000"
                                    style={{ borderColor: venture.color }}
                                />
                            </div>

                            {/* Glow backing */}
                            <div
                                className={`absolute inset-0 rounded-[2.5rem] opacity-20 transform transition-all duration-700 group-hover:opacity-40 blur-3xl ${venture.glow}`}
                                style={{ backgroundColor: venture.color }}
                            />

                            {/* Floating Container - No Box - Larger Mockup */}
                            <div className="relative aspect-[16/10] flex items-center justify-center p-4 transition-colors duration-500">
                                <img
                                    src={venture.mockup}
                                    alt={`${venture.name} Mockup`}
                                    className="w-full h-full object-contain drop-shadow-2xl transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-700 ease-out will-change-transform"
                                />
                            </div>
                        </div>

                        {/* Content Side - Product info (no box, sits next to image) */}
                        <div className="w-full md:w-5/12 venture-content relative flex flex-col">
                            {/* Logo + app name beside it (no icon) */}
                            <div className="flex items-center gap-3 mb-6">
                                {venture.logo && (
                                    <img
                                        src={venture.logo}
                                        alt=""
                                        className="h-14 w-14 shrink-0 object-contain rounded-[10px]"
                                    />
                                )}
                                <span className="font-display font-bold text-2xl text-white">{venture.name}</span>
                            </div>

                            {/* Main heading */}
                            <h4 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                                {venture.tagline}
                            </h4>

                            {/* Subtitle (EkPage-style one-liner) */}
                            {venture.subtitle && (
                                <p className="text-base text-white/90 leading-relaxed mb-6">
                                    {venture.subtitle}
                                </p>
                            )}

                            {/* Features list with icons – same pointer layout for every product */}
                            {(() => {
                                const points: VentureFeature[] =
                                    venture.features && venture.features.length > 0
                                        ? venture.features
                                        :                                 venture.description
                                            .split(/(?<=[.,])\s+/)
                                            .slice(0, 4)
                                            .map((label) => ({ label: label.trim(), icon: venture.icon }));
                                const defaultColor = venture.defaultIconColor;
                                return (
                                    <ul className="space-y-3 mb-8">
                                        {points.map((f, i) => (
                                            <li key={i} className="flex items-center gap-3 text-white/90 text-base">
                                                <span className={`shrink-0 ${f.iconColor ?? defaultColor ?? 'text-white/70'}`}>
                                                    <f.icon size={20} />
                                                </span>
                                                <span>{f.label}</span>
                                            </li>
                                        ))}
                                    </ul>
                                );
                            })()}

                            {/* CTA row: primary button (when not hidden) + status pill; EkPage: Beta Live On + store icons */}
                            <div className="flex flex-wrap items-center gap-4 mt-auto">
                                {!venture.hideCta && (
                                    <a
                                        href={venture.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all hover:opacity-90 hover:scale-[1.02] shadow-lg"
                                        style={{ backgroundColor: venture.color }}
                                    >
                                        {venture.ctaText ?? 'Visit Website'}
                                        <ArrowRight size={18} className="shrink-0" />
                                    </a>
                                )}
                                <div
                                    className={`inline-flex items-center rounded-full text-sm font-medium border transition-colors duration-200 ${venture.status === 'Live (Beta)' ? 'px-4 py-2.5 gap-2.5 text-emerald-500 bg-[#0d1110] border-emerald-500/25 hover:border-emerald-500/40' : 'px-4 py-2 gap-2 text-amber-500/90 bg-black/20 border-amber-500/25'}`}
                                >
                                    {venture.status === 'Live (Beta)' ? (
                                        <>
                                            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                                            <span className="font-medium text-[#d1fae5]">Beta Live On</span>
                                            {venture.showStoreIcons && (
                                                <span className="inline-flex items-center gap-2 ml-0.5 pl-3 border-l border-white/10">
                                                    <a href="https://apps.apple.com/in/app/ek-page/id6751228775" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/5 transition-colors" aria-label="App Store">
                                                        <img src="/images/app-store-png-logo-33102.png" alt="App Store" className="h-5 w-auto object-contain" />
                                                    </a>
                                                    <a href="https://play.google.com/store/apps/details?id=com.ekpage" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/5 transition-colors" aria-label="Play Store">
                                                        <img src="/images/play-store-logo-33868.png" alt="Play Store" className="h-5 w-auto object-contain" />
                                                    </a>
                                                </span>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <AlertCircle size={14} />
                                            Work in Progress
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
