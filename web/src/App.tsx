import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WaitlistModal } from './components/common/WaitlistModal';
import { PrivacyModal } from './components/common/PrivacyModal';
import { LegalModal } from './components/common/LegalModal';
import { ToastProvider } from './components/common/Toast';

// Main Single-Page Home
import { HomePage } from './pages/HomePage';

export function App() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistDefaultType, setWaitlistDefaultType] = useState<'family' | 'companion'>('family');
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleOpenWaitlist = (type: 'family' | 'companion' = 'family') => {
    setWaitlistDefaultType(type);
    setWaitlistOpen(true);
  };

  // Scroll spy with scroll position calculation for 100% reliable tracking
  useEffect(() => {
    const sectionIds = ['home', 'how-it-works', 'about', 'services', 'safety', 'companions', 'faq', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 130; // Header height + topbar + breathing buffer

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#F5F6F3] text-[#172B46] selection:bg-[#A9C5D8]/40 selection:text-[#172B46]">
          <Header
            activeSection={activeSection}
            onOpenWaitlist={() => handleOpenWaitlist('family')}
            onSelectSection={(id) => setActiveSection(id)}
          />

          <main className="flex-grow">
            <Routes>
              {/* Primary Single-Page Route */}
              <Route path="/" element={<HomePage onOpenWaitlist={handleOpenWaitlist} />} />

              {/* Backward-compatible redirects for legacy URLs directly to single-page anchors */}
              <Route path="/about" element={<Navigate to="/#about" replace />} />
              <Route path="/services" element={<Navigate to="/#services" replace />} />
              <Route path="/devenir-accompagnant" element={<Navigate to="/#companions" replace />} />
              <Route path="/contact" element={<Navigate to="/#contact" replace />} />
              <Route path="/faq" element={<Navigate to="/#faq" replace />} />
              <Route path="/privacy" element={<Navigate to="/#privacy" replace />} />
              <Route path="/mentions-legales" element={<Navigate to="/#legal" replace />} />
              
              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer
            onOpenPrivacy={() => setPrivacyOpen(true)}
            onOpenLegal={() => setLegalOpen(true)}
          />

          <WaitlistModal
            isOpen={waitlistOpen}
            onClose={() => setWaitlistOpen(false)}
            defaultType={waitlistDefaultType}
          />

          <PrivacyModal
            isOpen={privacyOpen}
            onClose={() => setPrivacyOpen(false)}
          />

          <LegalModal
            isOpen={legalOpen}
            onClose={() => setLegalOpen(false)}
          />
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
