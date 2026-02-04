import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../sections/HeroSection';
import ProductsSection from '../sections/VenturesSection';
import FounderSection from '../sections/FounderSection';
import AboutSection from '../sections/AboutSection';
import ClosingSection from '../sections/ClosingSection';

export default function HomePage() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [hash]);

  return (
    <>
      <HeroSection />
      <ProductsSection />
      <AboutSection />
      <FounderSection />
      <div className="h-20 bg-[#0B0C10]" /> {/* Spacer */}
      <ClosingSection />
    </>
  );
}
