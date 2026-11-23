import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';

interface HeaderProps {
  onOpenWaitlist: () => void;
  activeSection?: string;
  onSelectSection?: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenWaitlist, activeSection = 'home', onSelectSection }) => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const currentLang = i18n.language || 'fr';
  const isAr = currentLang === 'ar';
  const isEn = currentLang === 'en';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', id: 'home', label: t('nav.home') },
    { href: '#experience', id: 'experience', label: t('nav.experience') },
    { href: '#ecosystem', id: 'ecosystem', label: t('nav.ecosystem') },
    { href: '#pillars', id: 'pillars', label: t('nav.pillars') },
    { href: '#safety', id: 'safety', label: t('nav.safety') },
    { href: '#professionals', id: 'professionals', label: t('nav.professionals') },
    { href: '#faq', id: 'faq', label: t('nav.faq') },
    { href: '#contact', id: 'contact', label: t('nav.contact') },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onSelectSection) {
      onSelectSection(id);
    }
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 110;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header className="sticky top-0 z-40 transition-all duration-300 w-full">
      {/* Top Refined Announcement Banner */}
      <div className="bg-gradient-to-r from-[#172B46] via-[#1C3556] to-[#172B46] text-[#F5F6F3] py-2 px-4 sm:px-8 text-xs font-medium border-b border-white/10 w-full relative overflow-hidden">
        {/* Subtle accent highlight line */}
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#D8BE83]/60 to-transparent" />

        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#D8BE83] shadow-xs shadow-[#D8BE83]/60 animate-pulse shrink-0" />
            <span className="text-[#A9C5D8] text-[11px] sm:text-xs font-medium truncate">
              {isAr
                ? 'أفق • منظومة رقمية متصلة لدعم التوحد والتواصل في الجزائر'
                : isEn
                ? 'OFOQ • Connected Digital Ecosystem for Autism & Speech in Algeria'
                : 'OFOQ • Écosystème connecté pour l\'autisme et la communication en Algérie'}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] text-[#D8BE83] font-semibold hidden md:inline-flex items-center gap-1.5">
              <Sparkles size={12} className="text-[#D8BE83]" />
              {isAr ? 'لكل طفل أفقه الخاص' : isEn ? 'Every child has their own horizon' : 'Chaque enfant a son propre horizon'}
            </span>
            <button
              onClick={onOpenWaitlist}
              className="text-[11px] bg-white/10 hover:bg-white/20 border border-white/20 text-[#F5F6F3] px-3 py-1 rounded-full transition-all cursor-pointer focus-ring-dark"
            >
              {isAr ? 'الوصول المبكر' : isEn ? 'Early Access' : 'Accès Anticipé'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navbar */}
      <div
        className={`transition-all duration-300 border-b w-full ${
          scrolled
            ? 'bg-white/92 backdrop-blur-xl shadow-glass-sm border-[#172B46]/10 py-2'
            : 'bg-white/80 backdrop-blur-md border-[#172B46]/05 py-3'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18">
            {/* Logo Anchor */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home', 'home')}
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0 focus-ring rounded-2xl p-1"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-xs border-2 border-[#2868C7]/20 bg-[#FDFDFD] flex items-center justify-center shrink-0 p-0.5 group-hover:scale-105 transition-transform">
                <img
                  src="/OFOQlogo.png"
                  alt="OFOQ"
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => {
                    // Fallback to /logo.png if OFOQlogo fails
                    (e.currentTarget as HTMLImageElement).src = '/logo.png';
                  }}
                />
              </div>

              <div className="flex flex-col text-start">
                <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-[#172B46] leading-none">
                  {isAr ? 'أُفُـق' : 'OFOQ'}
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#5B6E85] font-medium tracking-wide mt-1">
                  {isAr ? 'منظومة التخاطب والتوحد' : 'Écosystème Numérique'}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links (Single-Line Compact) */}
            <nav className="hidden xl:flex items-center gap-1 2xl:gap-1.5 flex-nowrap whitespace-nowrap">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.id)}
                    className={`px-2.5 2xl:px-3 py-1.5 rounded-xl text-xs 2xl:text-[13px] font-semibold transition-all relative shrink-0 focus-ring ${
                      isActive
                        ? 'text-[#172B46] bg-[#A9C5D8]/25 font-bold shadow-2xs'
                        : 'text-[#5B6E85] hover:text-[#172B46] hover:bg-black/05'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute bottom-0 inset-x-2 h-0.5 bg-[#D58C7A] rounded-full"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Side: Language Toggle & CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <LanguageSelector />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenWaitlist}
                className="bg-gradient-to-r from-[#D58C7A] to-[#C27765] hover:from-[#C27765] hover:to-[#9E4E3D] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-md shadow-[#D58C7A]/25 transition-all flex items-center gap-2 cursor-pointer border border-white/20 focus-ring"
              >
                <span>{t('nav.join_waitlist')}</span>
                <ArrowRight size={14} className="rtl-flip text-white/90" />
              </motion.button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <LanguageSelector />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#172B46] hover:bg-black/05 rounded-xl transition-colors cursor-pointer focus-ring"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-[#172B46]/10 px-6 py-6 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className={`py-2 px-3 rounded-xl text-base font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-[#A9C5D8]/20 text-[#172B46] font-bold'
                      : 'text-[#5B6E85] hover:bg-black/05'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-black/08 mt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenWaitlist();
                  }}
                  className="w-full bg-gradient-to-r from-[#D58C7A] to-[#C27765] text-white font-bold py-3 px-6 rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t('nav.join_waitlist')}</span>
                  <ArrowRight size={16} className="rtl-flip" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
