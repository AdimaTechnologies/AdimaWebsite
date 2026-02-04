import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './sections/Navigation';
import HomePage from './pages/HomePage';
import InvestorsPage from './pages/InvestorsPage';
import CareersPage from './pages/CareersPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import { recordVisitAndShowCount, VISITOR_COUNTER_ELEMENT_ID } from './sections/ClosingSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Fire visitor API once at app load (single request, faster than waiting for footer mount)
  useEffect(() => {
    recordVisitAndShowCount(VISITOR_COUNTER_ELEMENT_ID);
  }, []);

  return (
    <div className="relative bg-[#0B0C10]">
      <div className="grain-overlay" />
      <Navigation />
      <main className="relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/investors" element={<InvestorsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
