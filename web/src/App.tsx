import { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ToastProvider } from './components/common/Toast';
import { SensoryPreferencesProvider } from './context/SensoryPreferencesContext';
import { HomePage } from './pages/HomePage';
import { HorizonEntrance } from './components/common/HorizonEntrance';

// Code-split modals so initial entry bundle stays minimal
const WaitlistModal = lazy(() =>
  import('./components/common/WaitlistModal').then((m) => ({ default: m.WaitlistModal }))
);
const PrivacyModal = lazy(() =>
  import('./components/common/PrivacyModal').then((m) => ({ default: m.PrivacyModal }))
);
const LegalModal = lazy(() =>
  import('./components/common/LegalModal').then((m) => ({ default: m.LegalModal }))
);
const SensoryPreferencesModal = lazy(() =>
  import('./components/common/SensoryPreferencesModal').then((m) => ({ default: m.SensoryPreferencesModal }))
);

function AppContent() {
  const { i18n } = useTranslation();
  const lang = (i18n.language || 'fr').split('-')[0].toLowerCase();
  const isAr = lang === 'ar';
  const isEn = lang === 'en';

  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistDefaultType, setWaitlistDefaultType] = useState<'family' | 'companion'>('family');
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const [sensoryModalOpen, setSensoryModalOpen] = useState(false);
  const [forceHorizonEntrance, setForceHorizonEntrance] = useState(false);

  const handleOpenWaitlist = useCallback((type: 'family' | 'companion' = 'family') => {
    setWaitlistDefaultType(type);
    setWaitlistOpen(true);
  }, []);

  const handleCloseWaitlist = useCallback(() => setWaitlistOpen(false), []);
  const handleOpenPrivacy = useCallback(() => setPrivacyOpen(true), []);
  const handleClosePrivacy = useCallback(() => setPrivacyOpen(false), []);
  const handleOpenLegal = useCallback(() => setLegalOpen(true), []);
  const handleCloseLegal = useCallback(() => setLegalOpen(false), []);
  const handleOpenSensory = useCallback(() => setSensoryModalOpen(true), []);
  const handleCloseSensory = useCallback(() => setSensoryModalOpen(false), []);
  const handleReplayHorizon = useCallback(() => setForceHorizonEntrance(true), []);
  const handleCompleteHorizon = useCallback(() => setForceHorizonEntrance(false), []);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('waitlist') === 'true' || params.get('modal') === 'waitlist') {
        const type = params.get('type') === 'companion' ? 'companion' : 'family';
        handleOpenWaitlist(type);
      }
    } catch {
      // ignore invalid query params
    }
  }, [handleOpenWaitlist]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-ofoq-porcelain text-ofoq-midnight selection:bg-ofoq-cloud/40 selection:text-ofoq-midnight">
        <a href="#main-content" className="skip-to-content">
          {isAr ? 'تخطي إلى المحتوى الرئيسي' : isEn ? 'Skip to main content' : 'Aller au contenu principal'}
        </a>

        <Header
          onOpenWaitlist={() => handleOpenWaitlist('family')}
          onOpenSensoryModal={handleOpenSensory}
        />

        <main id="main-content" className="flex-grow" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<HomePage onOpenWaitlist={handleOpenWaitlist} />} />

            {/* Backward-compatible redirects to single-page anchors */}
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            <Route path="/services" element={<Navigate to="/#pillars" replace />} />
            <Route path="/devenir-accompagnant" element={<Navigate to="/#professionals" replace />} />
            <Route path="/contact" element={<Navigate to="/#contact" replace />} />
            <Route path="/faq" element={<Navigate to="/#faq" replace />} />
            <Route path="/privacy" element={<Navigate to="/#privacy" replace />} />
            <Route path="/mentions-legales" element={<Navigate to="/#legal" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer onOpenPrivacy={handleOpenPrivacy} onOpenLegal={handleOpenLegal} />

        <Suspense fallback={null}>
          <HorizonEntrance
            forceShow={forceHorizonEntrance}
            onComplete={handleCompleteHorizon}
          />
          {sensoryModalOpen && (
            <SensoryPreferencesModal
              isOpen={sensoryModalOpen}
              onClose={handleCloseSensory}
              onReplayHorizon={handleReplayHorizon}
            />
          )}
          {waitlistOpen && (
            <WaitlistModal
              isOpen={waitlistOpen}
              onClose={handleCloseWaitlist}
              defaultType={waitlistDefaultType}
            />
          )}
          {privacyOpen && (
            <PrivacyModal isOpen={privacyOpen} onClose={handleClosePrivacy} />
          )}
          {legalOpen && (
            <LegalModal isOpen={legalOpen} onClose={handleCloseLegal} />
          )}
        </Suspense>
      </div>
    </Router>
  );
}

export function App() {
  return (
    <SensoryPreferencesProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </SensoryPreferencesProvider>
  );
}

export default App;
