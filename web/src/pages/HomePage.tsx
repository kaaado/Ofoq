import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Volume2,
  Users,
  CheckCircle2,
  Layers,
  Heart,
  RotateCcw,
  Play
} from 'lucide-react';
import { ScrollReveal } from '../components/common/ScrollReveal';

// Consolidated Single-Page Sections
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

interface PictoItem {
  id: string;
  emoji: string;
  labelFr: string;
  labelAr: string;
  labelEn: string;
  category: 'needs' | 'activities' | 'feelings';
  bgColor: string;
}

const SAMPLE_PICTOS: PictoItem[] = [
  { id: 'drink', emoji: '🥤', labelFr: 'Boire de l\'eau', labelAr: 'أشرب ماء', labelEn: 'Drink water', category: 'needs', bgColor: 'bg-sky-50 border-sky-200 text-sky-900' },
  { id: 'eat', emoji: '🍎', labelFr: 'Manger', labelAr: 'أريد أن آكل', labelEn: 'Eat an apple', category: 'needs', bgColor: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
  { id: 'puzzle', emoji: '🧩', labelFr: 'Faire un puzzle', labelAr: 'ألعب بالتركيبات', labelEn: 'Play puzzle', category: 'activities', bgColor: 'bg-amber-50 border-amber-200 text-amber-900' },
  { id: 'draw', emoji: '🎨', labelFr: 'Dessiner', labelAr: 'أرسم وألوّن', labelEn: 'Draw & color', category: 'activities', bgColor: 'bg-indigo-50 border-indigo-200 text-indigo-900' },
  { id: 'rest', emoji: '🛋️', labelFr: 'Besoin d\'un temps calme', labelAr: 'أحتاج وقتاً هادئاً', labelEn: 'Calm break', category: 'feelings', bgColor: 'bg-rose-50 border-rose-200 text-rose-900' },
  { id: 'hug', emoji: '🤗', labelFr: 'Câlin avec maman', labelAr: 'عناق مع أمي', labelEn: 'Warm hug', category: 'feelings', bgColor: 'bg-orange-50 border-orange-200 text-orange-900' },
];

export const HomePage: React.FC<HomePageProps> = ({ onOpenWaitlist }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'fr';
  const isAr = currentLang === 'ar';
  const isEn = currentLang === 'en';

  // Interactive AAC Strip state
  const [selectedIds, setSelectedIds] = useState<string[]>(['drink', 'puzzle']);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const togglePicto = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      if (selectedIds.length >= 4) {
        setSelectedIds([...selectedIds.slice(1), id]);
      } else {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const handlePlayVoice = () => {
    setIsPlayingAudio(true);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 1500);
  };

  const selectedItems = SAMPLE_PICTOS.filter((p) => selectedIds.includes(p.id));

  return (
    <div className="space-y-0 pb-0 overflow-hidden bg-[#F5F6F3]">
      {/* 1. HERO SECTION: VALUE PROPOSITION & CHILD WORLD AAC PREVIEW */}
      <section id="home" className="relative pt-8 sm:pt-14 pb-24 px-4 sm:px-8 max-w-[1440px] mx-auto scroll-mt-28">
        {/* Subtle decorative background ambient glow */}
        <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[700px] h-[420px] bg-gradient-to-tr from-[#A9C5D8]/40 via-[#F5F6F3] to-[#D58C7A]/20 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Content & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-7 text-start">
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

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#172B46] tracking-tight leading-[1.3] sm:leading-[1.22]"
            >
              <span className="block mb-2 sm:mb-3">
                {t('hero.title_main')}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#172B46] via-[#D58C7A] to-[#172B46] block">
                {t('hero.title_highlight')}
              </span>
            </motion.h1>

            {/* Subtitle with dedicated breathing room */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[#172B46]/80 font-normal leading-[1.85] sm:leading-[1.95] max-w-2xl pt-2 pb-1"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenWaitlist('family')}
                className="bg-[#172B46] hover:bg-[#1f3757] hover:shadow-xl text-white font-bold text-base px-8 py-4 rounded-full shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>{t('hero.cta_family')}</span>
                <ArrowRight size={18} className="rtl-flip text-[#D8BE83]" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenWaitlist('companion')}
                className="bg-white/95 hover:bg-[#A9C5D8]/15 border-2 border-[#172B46] text-[#172B46] font-bold text-base px-7 py-3.5 rounded-full shadow-xs transition-all text-center cursor-pointer"
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

          {/* Right Column: Interactive Child World AAC Preview Card */}
          <div className="lg:col-span-5 relative flex justify-center items-center py-6 sm:py-10">
            {/* Ambient Background Radial Glow */}
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-[#A9C5D8]/40 via-[#F5F6F3] to-[#D58C7A]/25 blur-3xl -z-10 animate-pulse pointer-events-none" />

            {/* Floating Backdrop Decorative Shapes */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 3, 0, -3, 0],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-6 -end-6 sm:-end-8 w-44 sm:w-52 h-44 sm:h-52 rounded-full bg-gradient-to-br from-[#A9C5D8]/30 to-white/40 border border-white/60 shadow-lg backdrop-blur-xl -z-10 pointer-events-none"
            />

            {/* Main Interactive Child World Preview Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: [-4, 4, -4] }}
              transition={{
                opacity: { duration: 0.7, delay: 0.2 },
                scale: { duration: 0.7, delay: 0.2 },
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="relative w-full max-w-[380px] sm:max-w-[420px]"
            >
              {/* Outer Card Frame with Glassmorphism */}
              <div className="glass-card p-5 sm:p-6 rounded-[36px] border border-[#A9C5D8]/50 shadow-2xl backdrop-blur-2xl space-y-4">
                {/* Child World Header Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-[#A9C5D8]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#172B46] to-[#1f3757] text-[#D8BE83] flex items-center justify-center font-bold text-base shadow-sm">
                      ي
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-[#172B46]">
                          {isAr ? 'عالم يانيس' : 'Monde de Yanis'}
                        </h4>
                        <span className="text-[10px] bg-[#A9C5D8]/30 text-[#172B46] px-2 py-0.5 rounded-full font-bold">
                          6 {isAr ? 'سنوات' : 'ans'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#172B46]/60 font-medium">
                        {isAr ? 'حساب العائلة • ملف الطفل النشط' : 'Compte Famille • Profil Actif'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#F5F6F3] px-2.5 py-1 rounded-full border border-[#A9C5D8]/40">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-[#172B46]">CAA</span>
                  </div>
                </div>

                {/* Interactive Sentence Strip (Bande-phrase CAA) */}
                <div className="bg-white/90 p-3.5 rounded-2xl border border-[#A9C5D8]/30 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#172B46]/70 uppercase tracking-wider">
                      {isAr ? 'شريط التعبير والتواصل (CAA)' : 'Bande-phrase d\'expression'}
                    </span>
                    <button
                      onClick={() => setSelectedIds([])}
                      className="text-[10px] text-[#172B46]/50 hover:text-[#D58C7A] flex items-center gap-1 cursor-pointer"
                      title={isAr ? 'مسح الشريط' : 'Effacer'}
                    >
                      <RotateCcw size={11} />
                      <span>{isAr ? 'مسح' : 'Effacer'}</span>
                    </button>
                  </div>

                  <div className="min-h-[52px] bg-[#F5F6F3] rounded-xl p-2 flex items-center justify-between gap-2 border border-dashed border-[#A9C5D8]/40">
                    <div className="flex items-center gap-2 flex-wrap flex-1">
                      {selectedItems.length === 0 ? (
                        <p className="text-xs text-[#172B46]/40 italic px-2">
                          {isAr ? 'المس بطاقة للتعبير والحديث...' : 'Touchez une carte pour composer...'}
                        </p>
                      ) : (
                        selectedItems.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white px-2.5 py-1 rounded-lg border border-[#A9C5D8]/50 shadow-xs flex items-center gap-1.5"
                          >
                            <span className="text-sm">{item.emoji}</span>
                            <span className="text-xs font-bold text-[#172B46]">
                              {isAr ? item.labelAr : isEn ? item.labelEn : item.labelFr}
                            </span>
                          </motion.div>
                        ))
                      )}
                    </div>

                    <button
                      onClick={handlePlayVoice}
                      disabled={selectedItems.length === 0 || isPlayingAudio}
                      className={`p-2 rounded-xl transition-all shadow-sm shrink-0 flex items-center justify-center cursor-pointer ${
                        selectedItems.length === 0
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : isPlayingAudio
                          ? 'bg-[#D58C7A] text-white scale-105'
                          : 'bg-[#172B46] hover:bg-[#1f3757] text-white'
                      }`}
                      aria-label="Écouter la phrase"
                    >
                      {isPlayingAudio ? (
                        <Volume2 size={16} className="animate-bounce" />
                      ) : (
                        <Play size={16} className="fill-current" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Tactile AAC Grid (6 Cards) */}
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold text-[#172B46]/70">
                    {isAr ? 'بطاقات اليوم المقترحة من الأخصائية والأم:' : 'Pictogrammes validés (Famille & Orthophoniste) :'}
                  </p>
                  <div className="grid grid-cols-3 gap-2.5">
                    {SAMPLE_PICTOS.map((picto) => {
                      const isSelected = selectedIds.includes(picto.id);
                      return (
                        <motion.button
                          key={picto.id}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => togglePicto(picto.id)}
                          className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                            isSelected
                              ? 'bg-white border-[#172B46] shadow-md ring-2 ring-[#172B46]/20'
                              : 'bg-white/80 hover:bg-white border-[#A9C5D8]/40 shadow-xs'
                          }`}
                        >
                          <span className="text-2xl select-none">{picto.emoji}</span>
                          <span className="text-[11px] font-bold text-[#172B46] leading-tight line-clamp-1">
                            {isAr ? picto.labelAr : isEn ? picto.labelEn : picto.labelFr}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Pro-Parent Bridge Indicator */}
                <div className="pt-1 flex items-center justify-between text-[11px] text-[#172B46]/70 bg-white/70 px-3 py-2 rounded-xl border border-[#A9C5D8]/20">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Users size={13} className="text-[#172B46]" />
                    {isAr ? 'تزامن مباشر مع الأخصائي' : 'Synchronisé avec l\'orthophoniste'}
                  </span>
                  <span className="font-bold text-[#D58C7A]">
                    {isAr ? 'مستمر في البيت' : 'Continuité maison'}
                  </span>
                </div>
              </div>

              {/* Floating Reassurance Badge 1 (Top-Start) */}
              <motion.div
                initial={{ opacity: 0, x: isAr ? 20 : -20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: [-4, 4, -4] }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.4 },
                  x: { duration: 0.6, delay: 0.4 },
                  y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="absolute -top-5 -start-3 sm:-start-6 bg-white/95 backdrop-blur-xl px-4 py-2.5 rounded-2xl shadow-xl border border-[#A9C5D8]/40 flex items-center gap-3 z-30 max-w-[240px]"
              >
                <div className="w-8 h-8 rounded-xl bg-[#A9C5D8]/30 text-[#172B46] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div className="text-start">
                  <p className="text-xs font-bold text-[#172B46]">
                    {isAr ? 'د. أمل ك. • أرطوفونيا' : 'Dr. Amel K. • Orthophonie'}
                  </p>
                  <p className="text-[10px] text-[#172B46]/70 font-medium">
                    {isAr ? 'تم تحديث أهداف الجلسة' : '3 nouveaux pictos validés'}
                  </p>
                </div>
              </motion.div>

              {/* Floating Reassurance Badge 2 (Bottom-End) */}
              <motion.div
                initial={{ opacity: 0, x: isAr ? -20 : 20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: [4, -4, 4] }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.5 },
                  x: { duration: 0.6, delay: 0.5 },
                  y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="absolute -bottom-5 -end-3 sm:-end-6 bg-white/95 backdrop-blur-xl px-4 py-2.5 rounded-2xl shadow-xl border border-[#A9C5D8]/40 flex items-center gap-3 z-30 max-w-[240px]"
              >
                <div className="w-8 h-8 rounded-xl bg-[#D8BE83]/30 text-[#172B46] flex items-center justify-center shrink-0">
                  <Sparkles size={18} />
                </div>
                <div className="text-start">
                  <p className="text-xs font-bold text-[#172B46]">
                    {isAr ? 'مساعد أفق الذكي' : 'Compagnon IA d\'OFOQ'}
                  </p>
                  <p className="text-[10px] text-[#D58C7A] font-semibold">
                    {isAr ? 'بيئة آمنة • رقابة الوالدين' : 'Sécurité active • Non-médical'}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION (CONNECTED ECOSYSTEM 3 STEPS) */}
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
