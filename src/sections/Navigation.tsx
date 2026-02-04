import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAppPill, setShowAppPill] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>('hero');
  const location = useLocation();
  const isHome = location.pathname === '/';

  const sectionIds = ['hero', 'products', 'about', 'founder', 'footer'];

  useEffect(() => {
    if (!isHome) {
      setActiveSection(location.pathname === '/careers' ? 'careers' : location.pathname === '/investors' ? 'investors' : null);
      return;
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      const founderSection = document.getElementById('founder');
      if (founderSection) {
        const rect = founderSection.getBoundingClientRect();
        setShowAppPill(rect.top <= window.innerHeight * 0.6);
      }

      // Highlight active section: section whose top is past 1/3 of viewport
      const viewportThird = window.innerHeight / 3;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportThird) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll, { passive: true } as any);
  }, [isHome, location.pathname]);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      return; // will use Link for non-home
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const showNavBackground = isHome ? isScrolled : true;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${showNavBackground
          ? 'bg-[#0B0C10]/90 backdrop-blur-md py-4'
          : 'bg-transparent py-6'
          }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => isHome && scrollToSection('hero')}
            className="flex items-center gap-2 group"
          >
            <img
              src="/images/logos/Adima-Technologies-favicon.png"
              alt="Adima Technologies"
              className="h-12 w-auto group-hover:scale-105 transition-transform"
            />
            <span className="font-display font-bold text-base md:text-lg tracking-tight text-[#F7F8FB] group-hover:text-[#2D6BFF] transition-colors">
              Adima
            </span>
          </Link>

          {/* Desktop Nav - Products pill: logos link to Products section */}
          <div className={`hidden md:flex items-center gap-2 lg:gap-4 bg-[#0B0C10]/40 px-4 py-2 lg:px-6 lg:py-2.5 rounded-full border border-[#F7F8FB]/20 backdrop-blur-md shadow-xl hover:bg-[#0B0C10]/60 transition-all duration-500 transform ${showAppPill ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
            }`}>
            {isHome ? (
              <>
                <button onClick={() => scrollToSection('products')} className="group opacity-100 hover:scale-110 transition-transform" title="EkPage – Our Products">
                  <img src="/images/logos/ekpage.webp" alt="EkPage" className="h-5 lg:h-6 w-auto object-contain" />
                </button>
                <div className="w-px h-5 bg-[#F7F8FB]/20" />
                <button onClick={() => scrollToSection('products')} className="group opacity-100 hover:scale-110 transition-transform" title="2True – Our Products">
                  <img src="/images/logos/2True_Logo.png" alt="2True" className="h-5 lg:h-6 w-auto object-contain" style={{ filter: 'hue-rotate(-25deg) saturate(1.2)' }} />
                </button>
                <div className="w-px h-5 bg-[#F7F8FB]/20" />
                <button onClick={() => scrollToSection('products')} className="group opacity-100 hover:scale-110 transition-transform" title="Upto6 – Our Products">
                  <img src="/images/logos/Upto6_logo.png" alt="Upto6" className="h-5 lg:h-6 w-auto object-contain" />
                </button>
                <div className="w-px h-5 bg-[#F7F8FB]/20" />
                <button onClick={() => scrollToSection('products')} className="group opacity-100 hover:scale-110 transition-transform" title="Bejdo – Our Products">
                  <img src="/images/logos/bejdo.png" alt="Bejdo" className="h-5 lg:h-6 w-auto object-contain" />
                </button>
                <div className="w-px h-5 bg-[#F7F8FB]/20" />
                <button onClick={() => scrollToSection('products')} className="group opacity-100 hover:scale-110 transition-transform" title="11thOne – Our Products">
                  <img src="/images/logos/11thone_Logo.png" alt="11thOne" className="h-5 lg:h-6 w-auto object-contain" />
                </button>
              </>
            ) : (
              <>
                <Link to="/#products" className="group opacity-100 hover:scale-110 transition-transform" title="EkPage – Our Products">
                  <img src="/images/logos/ekpage_logo.png" alt="EkPage" className="h-5 lg:h-6 w-auto object-contain" />
                </Link>
                <div className="w-px h-5 bg-[#F7F8FB]/20" />
                <Link to="/#products" className="group opacity-100 hover:scale-110 transition-transform" title="2True – Our Products">
                  <img src="/images/logos/2True_Logo.png" alt="2True" className="h-5 lg:h-6 w-auto object-contain" style={{ filter: 'hue-rotate(-25deg) saturate(1.2)' }} />
                </Link>
                <div className="w-px h-5 bg-[#F7F8FB]/20" />
                <Link to="/#products" className="group opacity-100 hover:scale-110 transition-transform" title="Upto6 – Our Products">
                  <img src="/images/logos/Upto6_logo.png" alt="Upto6" className="h-5 lg:h-6 w-auto object-contain" />
                </Link>
                <div className="w-px h-5 bg-[#F7F8FB]/20" />
                <Link to="/#products" className="group opacity-100 hover:scale-110 transition-transform" title="Bejdo – Our Products">
                  <img src="/images/logos/bejdo.png" alt="Bejdo" className="h-5 lg:h-6 w-auto object-contain" />
                </Link>
                <div className="w-px h-5 bg-[#F7F8FB]/20" />
                <Link to="/#products" className="group opacity-100 hover:scale-110 transition-transform" title="11thOne – Our Products">
                  <img src="/images/logos/11thone_Logo.png" alt="11thOne" className="h-5 lg:h-6 w-auto object-contain" />
                </Link>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center gap-1.5 lg:gap-3">
            {isHome ? (
              <>
                <button onClick={() => scrollToSection('hero')} className={`px-2 py-1.5 lg:px-3 lg:py-2 rounded-full text-xs lg:text-sm transition-all ${activeSection === 'hero' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_20px_rgba(45,107,255,0.5)]' : 'text-[#A6A9B1] hover:text-[#F7F8FB] border border-transparent'}`}>Home</button>
                <button onClick={() => scrollToSection('products')} className={`px-2 py-1.5 lg:px-3 lg:py-2 rounded-full text-xs lg:text-sm transition-all ${activeSection === 'products' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_20px_rgba(45,107,255,0.5)]' : 'text-[#A6A9B1] hover:text-[#F7F8FB] border border-transparent'}`}>Products</button>
                <button onClick={() => scrollToSection('about')} className={`px-2 py-1.5 lg:px-3 lg:py-2 rounded-full text-xs lg:text-sm transition-all ${activeSection === 'about' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_20px_rgba(45,107,255,0.5)]' : 'text-[#A6A9B1] hover:text-[#F7F8FB] border border-transparent'}`}>About Us</button>
                <button onClick={() => scrollToSection('founder')} className={`px-2 py-1.5 lg:px-3 lg:py-2 rounded-full text-xs lg:text-sm transition-all ${activeSection === 'founder' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_20px_rgba(45,107,255,0.5)]' : 'text-[#A6A9B1] hover:text-[#F7F8FB] border border-transparent'}`}>Founder</button>
                <button onClick={() => scrollToSection('footer')} className={`px-2 py-1.5 lg:px-3 lg:py-2 rounded-full text-xs lg:text-sm transition-all ${activeSection === 'footer' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_20px_rgba(45,107,255,0.5)]' : 'text-[#A6A9B1] hover:text-[#F7F8FB] border border-transparent'}`}>Contact</button>
                <Link to="/careers" className={`px-2 py-1.5 lg:px-3 lg:py-2 rounded-full text-xs lg:text-sm transition-all ${activeSection === 'careers' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_20px_rgba(45,107,255,0.5)]' : 'text-[#A6A9B1] hover:text-[#F7F8FB] border border-transparent'}`}>Careers</Link>
                <Link to="/investors" className={`px-2 py-1.5 lg:px-3 lg:py-2 rounded-full text-xs lg:text-sm transition-all ${activeSection === 'investors' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_20px_rgba(45,107,255,0.5)]' : 'text-[#A6A9B1] hover:text-[#F7F8FB] border border-transparent'}`}>Investors</Link>
              </>
            ) : (
              <>
                <Link to="/" className={`px-2 py-1.5 lg:px-3 lg:py-2 rounded-full text-xs lg:text-sm transition-all ${activeSection === 'hero' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_20px_rgba(45,107,255,0.5)]' : 'text-[#A6A9B1] hover:text-[#F7F8FB] border border-transparent'}`}>Home</Link>
                <Link to="/#products" className={`px-2 py-1.5 lg:px-3 lg:py-2 rounded-full text-xs lg:text-sm transition-all ${activeSection === 'products' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_20px_rgba(45,107,255,0.5)]' : 'text-[#A6A9B1] hover:text-[#F7F8FB] border border-transparent'}`}>Products</Link>
                <Link to="/#about" className={`px-2 py-1.5 lg:px-3 lg:py-2 rounded-full text-xs lg:text-sm transition-all ${activeSection === 'about' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_20px_rgba(45,107,255,0.5)]' : 'text-[#A6A9B1] hover:text-[#F7F8FB] border border-transparent'}`}>About Us</Link>
                <Link to="/#founder" className={`px-2 py-1.5 lg:px-3 lg:py-2 rounded-full text-xs lg:text-sm transition-all ${activeSection === 'founder' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_20px_rgba(45,107,255,0.5)]' : 'text-[#A6A9B1] hover:text-[#F7F8FB] border border-transparent'}`}>Founder</Link>
                <Link to="/#footer" className={`px-2 py-1.5 lg:px-3 lg:py-2 rounded-full text-xs lg:text-sm transition-all ${activeSection === 'footer' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_20px_rgba(45,107,255,0.5)]' : 'text-[#A6A9B1] hover:text-[#F7F8FB] border border-transparent'}`}>Contact</Link>
                <Link to="/careers" className={`px-2 py-1.5 lg:px-3 lg:py-2 rounded-full text-xs lg:text-sm transition-all ${activeSection === 'careers' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_20px_rgba(45,107,255,0.5)]' : 'text-[#A6A9B1] hover:text-[#F7F8FB] border border-transparent'}`}>Careers</Link>
                <Link to="/investors" className={`px-2 py-1.5 lg:px-3 lg:py-2 rounded-full text-xs lg:text-sm transition-all ${activeSection === 'investors' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_20px_rgba(45,107,255,0.5)]' : 'text-[#A6A9B1] hover:text-[#F7F8FB] border border-transparent'}`}>Investors</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#F7F8FB] p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[99] bg-[#0B0C10]/98 backdrop-blur-lg transition-all duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {isHome ? (
            <>
              <button onClick={() => scrollToSection('hero')} className={`px-5 py-2.5 rounded-full text-xl font-display transition-all ${activeSection === 'hero' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_24px_rgba(45,107,255,0.5)]' : 'text-[#F7F8FB] hover:text-[#2D6BFF] border border-transparent'}`}>Home</button>
              <button onClick={() => scrollToSection('products')} className={`px-5 py-2.5 rounded-full text-xl font-display transition-all ${activeSection === 'products' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_24px_rgba(45,107,255,0.5)]' : 'text-[#F7F8FB] hover:text-[#2D6BFF] border border-transparent'}`}>Products</button>
              <button onClick={() => scrollToSection('about')} className={`px-5 py-2.5 rounded-full text-xl font-display transition-all ${activeSection === 'about' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_24px_rgba(45,107,255,0.5)]' : 'text-[#F7F8FB] hover:text-[#2D6BFF] border border-transparent'}`}>About Us</button>
              <button onClick={() => scrollToSection('founder')} className={`px-5 py-2.5 rounded-full text-xl font-display transition-all ${activeSection === 'founder' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_24px_rgba(45,107,255,0.5)]' : 'text-[#F7F8FB] hover:text-[#2D6BFF] border border-transparent'}`}>Founder</button>
              <button onClick={() => scrollToSection('footer')} className={`px-5 py-2.5 rounded-full text-xl font-display transition-all ${activeSection === 'footer' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_24px_rgba(45,107,255,0.5)]' : 'text-[#F7F8FB] hover:text-[#2D6BFF] border border-transparent'}`}>Contact</button>
              <Link to="/careers" onClick={() => setIsMobileMenuOpen(false)} className={`px-5 py-2.5 rounded-full text-xl font-display transition-all ${activeSection === 'careers' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_24px_rgba(45,107,255,0.5)]' : 'text-[#F7F8FB] hover:text-[#2D6BFF] border border-transparent'}`}>Careers</Link>
              <Link to="/investors" onClick={() => setIsMobileMenuOpen(false)} className={`px-5 py-2.5 rounded-full text-xl font-display transition-all ${activeSection === 'investors' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_24px_rgba(45,107,255,0.5)]' : 'text-[#F7F8FB] hover:text-[#2D6BFF] border border-transparent'}`}>Investors</Link>
            </>
          ) : (
            <>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`px-5 py-2.5 rounded-full text-xl font-display transition-all ${activeSection === 'hero' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_24px_rgba(45,107,255,0.5)]' : 'text-[#F7F8FB] hover:text-[#2D6BFF] border border-transparent'}`}>Home</Link>
              <Link to="/#products" onClick={() => setIsMobileMenuOpen(false)} className={`px-5 py-2.5 rounded-full text-xl font-display transition-all ${activeSection === 'products' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_24px_rgba(45,107,255,0.5)]' : 'text-[#F7F8FB] hover:text-[#2D6BFF] border border-transparent'}`}>Products</Link>
              <Link to="/#about" onClick={() => setIsMobileMenuOpen(false)} className={`px-5 py-2.5 rounded-full text-xl font-display transition-all ${activeSection === 'about' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_24px_rgba(45,107,255,0.5)]' : 'text-[#F7F8FB] hover:text-[#2D6BFF] border border-transparent'}`}>About Us</Link>
              <Link to="/#founder" onClick={() => setIsMobileMenuOpen(false)} className={`px-5 py-2.5 rounded-full text-xl font-display transition-all ${activeSection === 'founder' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_24px_rgba(45,107,255,0.5)]' : 'text-[#F7F8FB] hover:text-[#2D6BFF] border border-transparent'}`}>Founder</Link>
              <Link to="/#footer" onClick={() => setIsMobileMenuOpen(false)} className={`px-5 py-2.5 rounded-full text-xl font-display transition-all ${activeSection === 'footer' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_24px_rgba(45,107,255,0.5)]' : 'text-[#F7F8FB] hover:text-[#2D6BFF] border border-transparent'}`}>Contact</Link>
              <Link to="/careers" onClick={() => setIsMobileMenuOpen(false)} className={`px-5 py-2.5 rounded-full text-xl font-display transition-all ${activeSection === 'careers' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_24px_rgba(45,107,255,0.5)]' : 'text-[#F7F8FB] hover:text-[#2D6BFF] border border-transparent'}`}>Careers</Link>
              <Link to="/investors" onClick={() => setIsMobileMenuOpen(false)} className={`px-5 py-2.5 rounded-full text-xl font-display transition-all ${activeSection === 'investors' ? 'bg-[#0B0C10] text-[#F7F8FB] border border-[#2D6BFF] shadow-[0_0_24px_rgba(45,107,255,0.5)]' : 'text-[#F7F8FB] hover:text-[#2D6BFF] border border-transparent'}`}>Investors</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
