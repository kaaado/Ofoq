import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Volume2,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { ScrollReveal } from '../components/common/ScrollReveal';

// Consolidated Single-Page Sections
import { UnifiedChildWorldExperience } from '../components/sections/UnifiedChildWorldExperience';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { AboutSection } from '../components/sections/AboutSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { SafetySection } from '../components/sections/SafetySection';
import { CompanionRecruitmentSection } from '../components/sections/CompanionRecruitmentSection';
import { FAQSection } from '../components/sections/FAQSection';
import { ContactSection } from '../components/sections/ContactSection';

interface HomePageProps {
  onOpenWaitlist: (type?: 'family' | 'companion') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenWaitlist }) => {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || 'fr').split('-')[0].toLowerCase();
  const isAr = currentLang === 'ar';
  const isEn = currentLang === 'en';

  return (
    <div className="space-y-0 pb-0 overflow-hidden bg-[#F5F6F3]">
      {/* 1. HERO SECTION: VALUE PROPOSITION & CHILD WORLD AAC PREVIEW */}
      <section id="home" className="relative pt-8 sm:pt-14 pb-20 sm:pb-24 px-4 sm:px-8 max-w-[1440px] mx-auto scroll-mt-28">
        {/* Subtle decorative background ambient glow */}
        <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[700px] h-[420px] bg-gradient-to-tr from-[#A9C5D8]/40 via-[#F5F6F3] to-[#D58C7A]/20 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Content & Actions (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6 sm:gap-7 text-start">
            {/* Value Tagline Pill */}
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/95 border border-[#A9C5D8]/50 text-[#172B46] text-xs sm:text-sm font-bold shadow-xs backdrop-blur-md max-w-full whitespace-normal sm:whitespace-nowrap leading-relaxed"
              >
                <Sparkles size={17} className="text-[#D8BE83] shrink-0" />
                <span>
                  {isAr
                    ? 'منظومة رقمية متصلة للأطفال ذوي التوحد وصعوبات النطق'
                    : isEn
                    ? 'Connected Digital Ecosystem for Autism & Speech Difficulties'
                    : 'Écosystème numérique connecté pour l\'autisme & les troubles du langage'}
                </span>
              </motion.div>
            </div>

            {/* Main Headline - Strictly 2 Rows on All Languages */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-[2.6rem] xl:text-[3.1rem] font-heading font-black text-[#172B46] tracking-tight leading-[1.25] sm:leading-[1.2] max-w-2xl"
            >
              <span className="block mb-1.5 sm:mb-2 whitespace-normal sm:whitespace-nowrap">
                {t('hero.title_main')}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#172B46] via-[#D58C7A] to-[#2868C7] block whitespace-normal sm:whitespace-nowrap">
                {t('hero.title_highlight')}
              </span>
            </motion.h1>

            {/* Subtitle with dedicated breathing room */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[#172B46]/80 font-normal leading-[1.85] sm:leading-[1.95] max-w-2xl pt-1 pb-1"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTAs - Single Row with Proper Padding */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 flex-wrap"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenWaitlist('family')}
                className="bg-gradient-to-r from-[#2868C7] to-[#172B46] hover:from-[#1E54A3] hover:to-[#172B46] hover:shadow-xl hover:shadow-[#2868C7]/25 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20 whitespace-nowrap shrink-0"
              >
                <span>{t('hero.cta_family')}</span>
                <ArrowRight size={18} className="rtl-flip text-[#D8BE83]" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenWaitlist('companion')}
                className="bg-white/95 hover:bg-[#2868C7]/10 border-2 border-[#2868C7]/40 hover:border-[#2868C7] text-[#172B46] font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-xs transition-all text-center cursor-pointer whitespace-nowrap shrink-0"
              >
                {t('hero.cta_companion')}
              </motion.button>
            </motion.div>

            {/* Reassurance Highlights */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-semibold text-[#172B46]/70">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-[#172B46]" />
                {t('hero.stat_trust')}
              </span>
              <span className="flex items-center gap-1.5">
                <Volume2 size={16} className="text-[#D58C7A]" />
                {t('hero.stat_tracking')}
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-[#172B46]" />
                {t('hero.stat_human')}
              </span>
            </div>
          </div>

          {/* Right Column: Animated Mobile Device Popup Showcase */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-6 sm:py-10 overflow-visible">
            {/* Ambient Background Radial Glow */}
            <div className="absolute w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full bg-gradient-to-tr from-[#2868C7]/20 via-[#A9C5D8]/30 to-[#D58C7A]/20 blur-3xl -z-10 animate-pulse pointer-events-none" />

            {/* Container for Animated Mobile Widget */}
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[450px] flex justify-center items-center">
              
              {/* Floating Badge 1: Top-Start (Family Hub) */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 sm:-top-5 start-0 sm:-start-4 z-20 bg-white/95 backdrop-blur-xl px-3.5 py-2 rounded-2xl shadow-xl border border-[#A9C5D8]/40 flex items-center gap-2 select-none"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <div className="text-start">
                  <p className="text-[10px] font-extrabold uppercase text-[#2868C7] leading-tight">
                    {isAr ? 'فضاء العائلة المحمي' : isEn ? 'Secure Family Hub' : 'Espace Famille Sécurisé'}
                  </p>
                  <p className="text-[9px] text-[#172B46]/70 font-semibold">
                    {isAr ? 'عوالم مستقلة لكل طفل' : isEn ? 'Isolated Child Worlds' : 'Mondes d\'enfants étanches'}
                  </p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Bottom-End (Pro Bridge) */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: [0, 6, 0], scale: 1 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-3 sm:-bottom-5 end-0 sm:-end-4 z-20 bg-white/95 backdrop-blur-xl px-3.5 py-2 rounded-2xl shadow-xl border border-[#A9C5D8]/40 flex items-center gap-2 select-none"
              >
                <div className="w-6 h-6 rounded-lg bg-[#D58C7A]/20 text-[#D58C7A] flex items-center justify-center font-bold text-xs shrink-0">
                  🩺
                </div>
                <div className="text-start">
                  <p className="text-[10px] font-extrabold uppercase text-[#D58C7A] leading-tight">
                    {isAr ? 'موافقة الولي نشطة' : isEn ? 'Parent Consent Active' : 'Accord Parental Actif'}
                  </p>
                  <p className="text-[9px] text-[#172B46]/70 font-semibold">
                    {isAr ? 'استمرارية البيت والعيادة' : isEn ? 'Home-Clinic Continuity' : 'Continuité Maison-Cabinet'}
                  </p>
                </div>
              </motion.div>

              {/* Animated Mobile Device Image with Floating Motion */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.92 }}
                animate={{ opacity: 1, y: [-8, 8, -8], scale: 1 }}
                transition={{
                  opacity: { duration: 0.8 },
                  scale: { duration: 0.8 },
                  y: { duration: 7, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="relative z-10 w-full rounded-[38px] sm:rounded-[44px] overflow-hidden shadow-2xl hover:scale-102 transition-transform duration-500 cursor-pointer"
                onClick={() => {
                  const target = document.querySelector('#experience');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <img
                  src="/mobile.png"
                  alt={isAr ? 'تطبيق أفق على الهاتف' : 'Application mobile OFOQ'}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  loading="eager"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. UNIFIED 3D CHILD WORLD EXPERIENCE & NOUR COMPANION */}
      <UnifiedChildWorldExperience />

      {/* 5. HOW IT WORKS SECTION (CONNECTED ECOSYSTEM 3 STEPS) */}
      <HowItWorksSection />

      {/* 3. ABOUT OFOQ (MISSION & CONTINUITY GAP) */}
      <AboutSection />

      {/* 4. THE 6 FUNCTIONAL PILLARS */}
      <ServicesSection onOpenWaitlist={onOpenWaitlist} />

      {/* 5. SAFETY & OPERATIONAL BOUNDARIES (LAW 18-07 & NON-DIAGNOSTIC) */}
      <SafetySection />

      {/* 6. FOR PROFESSIONALS & SPECIALIZED CENTRES */}
      <CompanionRecruitmentSection onOpenWaitlist={onOpenWaitlist} />

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <FAQSection />

      {/* 8. CALL TO ACTION BANNER (PRIORITY WAITLIST) */}
      <section className="py-20 max-w-[1440px] mx-auto px-4 sm:px-8">
        <ScrollReveal>
          <div className="bg-gradient-to-br from-[#172B46] via-[#1f3757] to-[#172B46] rounded-[40px] p-8 sm:p-16 text-white text-center space-y-7 shadow-2xl relative overflow-hidden border border-[#A9C5D8]/20">
            {/* Ambient decorative glow */}
            <div className="absolute top-0 end-0 w-80 h-80 bg-[#A9C5D8]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 start-0 w-80 h-80 bg-[#D58C7A]/10 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-3xl sm:text-5xl font-black max-w-2xl mx-auto leading-tight text-white">
              {t('waitlist.title')}
            </h2>
            <p className="text-sm sm:text-base text-[#A9C5D8] max-w-xl mx-auto leading-relaxed">
              {t('waitlist.subtitle')}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onOpenWaitlist('family')}
                className="bg-[#D58C7A] hover:bg-[#c97d6a] text-white font-extrabold text-base px-10 py-4 rounded-full shadow-xl transition-all cursor-pointer"
              >
                {t('waitlist.btn_submit')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onOpenWaitlist('companion')}
                className="bg-transparent border-2 border-[#A9C5D8] hover:bg-white/10 text-white font-extrabold text-base px-8 py-3.5 rounded-full transition-all cursor-pointer"
              >
                {t('hero.cta_companion')}
              </motion.button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 9. CONTACT SECTION */}
      <ContactSection />
    </div>
  );
};
