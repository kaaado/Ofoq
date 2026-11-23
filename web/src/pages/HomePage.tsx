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

          {/* Right Column: Animated Freestanding Mobile Device Showcase */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-6 sm:py-12 overflow-visible">
            {/* Ambient Navy & Royal Blue Atmospheric Glow */}
            <div className="absolute w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full bg-gradient-to-tr from-[#172B46]/20 via-[#2868C7]/25 to-[#A9C5D8]/30 blur-3xl -z-10 pointer-events-none" />
            <div className="absolute w-[220px] sm:w-[350px] h-[220px] sm:h-[350px] rounded-full bg-[#D58C7A]/15 blur-2xl -z-10 pointer-events-none translate-y-12" />

            {/* Container for Freestanding Mobile Widget */}
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] flex justify-center items-center">
              
              {/* Floating Badge 1: Top-Start (Family Hub & Sibling Worlds) */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 sm:-top-6 start-0 sm:-start-6 z-20 glass-surface-2 px-4 py-2.5 rounded-2xl shadow-float-soft border border-white/80 flex items-center gap-2.5 select-none hover:scale-105 transition-transform"
              >
                <div className="w-7 h-7 rounded-xl bg-[#2868C7]/15 text-[#2868C7] flex items-center justify-center font-bold text-xs shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div className="text-start">
                  <p className="text-[10px] sm:text-[11px] font-black uppercase text-[#2868C7] leading-tight tracking-wider">
                    {isAr ? 'فضاء العائلة المحمي' : isEn ? 'Protected Family Hub' : 'Espace Famille Sécurisé'}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-[#172B46]/75 font-semibold mt-0.5">
                    {isAr ? 'عوالم مستقلة لكل طفل' : isEn ? 'Independent Child Worlds' : 'Mondes d\'enfants étanches'}
                  </p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Bottom-End (Clinical Continuity & Parent Consent) */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: [0, 6, 0], scale: 1 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 sm:-bottom-6 end-0 sm:-end-6 z-20 glass-surface-2 px-4 py-2.5 rounded-2xl shadow-float-soft border border-white/80 flex items-center gap-2.5 select-none hover:scale-105 transition-transform"
              >
                <div className="w-7 h-7 rounded-xl bg-[#D58C7A]/20 text-[#D58C7A] flex items-center justify-center font-bold text-xs shrink-0">
                  <Heart size={15} />
                </div>
                <div className="text-start">
                  <p className="text-[10px] sm:text-[11px] font-black uppercase text-[#D58C7A] leading-tight tracking-wider">
                    {isAr ? 'موافقة الولي الصريحة' : isEn ? 'Parent-Authorized Access' : 'Accord Parental Explicite'}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-[#172B46]/75 font-semibold mt-0.5">
                    {isAr ? 'استمرارية البيت والعيادة' : isEn ? 'Clinic-to-Home Continuity' : 'Continuité Maison-Cabinet'}
                  </p>
                </div>
              </motion.div>

              {/* Freestanding Floating Mobile Device (Unboxed - Native Alpha Transparency) */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                animate={{ opacity: 1, y: [-8, 8, -8], scale: 1 }}
                transition={{
                  opacity: { duration: 0.8 },
                  scale: { duration: 0.8 },
                  y: { duration: 7, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="relative z-10 w-full flex justify-center items-center cursor-pointer group"
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
                  className="w-full h-auto object-contain filter drop-shadow-[0_24px_36px_rgba(23,43,70,0.24)] drop-shadow-[0_6px_16px_rgba(40,104,199,0.18)] group-hover:scale-102 transition-transform duration-500"
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

      {/* 8. CALL TO ACTION BANNER (PRIORITY WAITLIST & DUAL PATHWAYS) */}
      <section className="py-20 sm:py-24 max-w-[1440px] mx-auto px-4 sm:px-8">
        <ScrollReveal>
          <div className="bg-gradient-to-br from-[#172B46] via-[#1C3556] to-[#0F1E32] rounded-[36px] sm:rounded-[44px] p-8 sm:p-14 lg:p-16 text-white text-center space-y-10 shadow-2xl relative overflow-hidden border border-white/15">
            {/* Ambient decorative glowing orbs */}
            <div className="absolute top-0 end-0 w-96 h-96 bg-[#2868C7]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 start-0 w-96 h-96 bg-[#D58C7A]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Header Content */}
            <div className="space-y-4 max-w-3xl mx-auto relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#D8BE83] text-xs font-bold shadow-xs">
                <Sparkles size={14} className="text-[#D8BE83]" />
                <span>{isAr ? 'الوصول المبكر ذو الأولوية' : isEn ? 'Priority Early Access' : 'Accès Anticipé Prioritaire'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black max-w-2xl mx-auto leading-tight text-white tracking-tight">
                {t('waitlist.title')}
              </h2>
              <p className="text-sm sm:text-base text-[#A9C5D8] max-w-2xl mx-auto leading-relaxed">
                {t('waitlist.subtitle')}
              </p>
            </div>

            {/* Dual Pathway Conversion Cards (Parallel Architecture) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-start relative z-10 items-stretch">
              {/* Path 1: Families */}
              <div className="glass-surface-navy rounded-3xl p-6 sm:p-8 border border-white/15 hover:border-[#D58C7A]/50 transition-all shadow-lg flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#D58C7A]/20 text-[#D58C7A] flex items-center justify-center border border-[#D58C7A]/30 shadow-xs group-hover:scale-105 transition-transform">
                    <Heart size={24} />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white">
                    {t('waitlist.path_family_title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {t('waitlist.path_family_desc')}
                  </p>
                </div>
                <div className="pt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onOpenWaitlist('family')}
                    className="w-full bg-gradient-to-r from-[#D58C7A] to-[#C27765] hover:from-[#C27765] hover:to-[#9E4E3D] text-white font-bold text-sm py-3.5 px-6 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer focus-ring border border-white/20"
                  >
                    <span>{t('waitlist.path_family_btn')}</span>
                    <ArrowRight size={16} className="rtl-flip text-white/90" />
                  </motion.button>
                </div>
              </div>

              {/* Path 2: Specialists & Clinics */}
              <div className="glass-surface-navy rounded-3xl p-6 sm:p-8 border border-white/15 hover:border-[#2868C7]/50 transition-all shadow-lg flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#2868C7]/20 text-[#2868C7] flex items-center justify-center border border-[#2868C7]/30 shadow-xs group-hover:scale-105 transition-transform">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white">
                    {t('waitlist.path_pro_title')}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {t('waitlist.path_pro_desc')}
                  </p>
                </div>
                <div className="pt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onOpenWaitlist('companion')}
                    className="w-full bg-gradient-to-r from-[#2868C7] to-[#1E54A3] hover:from-[#1E54A3] hover:to-[#153C78] text-white font-bold text-sm py-3.5 px-6 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer focus-ring border border-white/20"
                  >
                    <span>{t('waitlist.path_pro_btn')}</span>
                    <ArrowRight size={16} className="rtl-flip text-[#D8BE83]" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Bottom Reassurance Line */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-[#A9C5D8] relative z-10">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#D8BE83]" />
                {isAr ? 'حماية البيانات وفق القانون 18-07' : isEn ? 'Data Protection Law 18-07' : 'Protection des données Loi 18-07'}
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#D8BE83]" />
                {isAr ? 'تدرج وطني عبر كافة الـ 58 ولاية' : isEn ? 'National 58 Wilayas Progressive Rollout' : 'Déploiement national 58 wilayas'}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 9. CONTACT SECTION */}
      <ContactSection />
    </div>
  );
};
