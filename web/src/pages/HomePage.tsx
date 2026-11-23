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
                className="bg-gradient-to-r from-[#2868C7] to-[#172B46] hover:from-[#1E54A3] hover:to-[#172B46] hover:shadow-xl hover:shadow-[#2868C7]/25 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-white/20"
              >
                <span>{t('hero.cta_family')}</span>
                <ArrowRight size={18} className="rtl-flip text-[#D8BE83]" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenWaitlist('companion')}
                className="bg-white/95 hover:bg-[#2868C7]/10 border-2 border-[#2868C7]/40 hover:border-[#2868C7] text-[#172B46] font-bold text-base px-7 py-3.5 rounded-full shadow-xs transition-all text-center cursor-pointer"
              >
                {t('hero.cta_companion')}
              </motion.button>
              <a
                href="#experience"
                className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-[#2868C7] hover:text-[#172B46] px-4 py-2 rounded-full hover:bg-white/60 transition-all cursor-pointer"
              >
                <Sparkles size={14} className="text-[#D8BE83]" />
                <span>{isAr ? 'العالم التفاعلي 3D ↓' : isEn ? 'Live 3D Demo ↓' : 'Expérience 3D ↓'}</span>
              </a>
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

          {/* Right Column: Mobile App Showcase (Three Mobile Widgets / Flower arrangement) */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-6 sm:py-10 overflow-visible">
            {/* Ambient Background Radial Glow */}
            <div className="absolute w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full bg-gradient-to-tr from-[#2868C7]/20 via-[#A9C5D8]/30 to-[#D58C7A]/20 blur-3xl -z-10 animate-pulse pointer-events-none" />

            {/* Stage Container for Three Mobile Widgets */}
            <div className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[560px] flex justify-center items-center">

              {/* LEFT WIDGET (Tilted Flower Petal: Family Hub) */}
              <motion.div
                initial={{ opacity: 0, x: isAr ? 30 : -30, rotate: isAr ? 8 : -8 }}
                animate={{
                  opacity: 1,
                  x: isAr ? [20, 24, 20] : [-20, -24, -20],
                  y: [-6, 6, -6],
                  rotate: isAr ? [10, 12, 10] : [-10, -12, -10],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className={`absolute top-4 ${
                  isAr ? 'end-4 sm:end-8' : 'start-4 sm:start-8'
                } -translate-x-12 rtl:translate-x-12 z-10 hidden md:block w-[210px] sm:w-[225px] select-none pointer-events-none hover:pointer-events-auto transition-all`}
              >
                {/* Phone Frame */}
                <div className="bg-[#172B46] p-2.5 rounded-[34px] shadow-2xl border border-white/20 ring-1 ring-black/10">
                  {/* Dynamic Island / Pill */}
                  <div className="w-16 h-3.5 bg-black/80 rounded-full mx-auto mb-2 flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2868C7]" />
                  </div>
                  {/* Screen Content */}
                  <div className="bg-white rounded-[26px] p-3 space-y-2.5 text-start text-[#172B46] border border-gray-100">
                    <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
                      <span className="text-[10px] font-extrabold uppercase text-[#2868C7]">
                        {isAr ? 'فضاء العائلة' : isEn ? 'Family Hub' : 'Espace Famille'}
                      </span>
                      <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {isAr ? 'محمي' : 'Sécurisé'}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-gray-500">
                        {isAr ? 'الملفات المستقلة:' : isEn ? 'Child Profiles:' : 'Profils Enfants :'}
                      </p>
                      <div className="bg-[#F5F6F3] p-1.5 rounded-xl flex items-center justify-between text-[11px] font-bold">
                        <span className="flex items-center gap-1.5">
                          <span>🪐</span>
                          <span>{isAr ? 'يانيس (6 سنوات)' : isEn ? 'Yanis (6 yrs)' : 'Yanis (6 ans)'}</span>
                        </span>
                        <span className="text-[9px] text-[#2868C7] font-semibold">{isAr ? 'نشط' : 'Actif'}</span>
                      </div>
                      <div className="bg-[#F5F6F3] p-1.5 rounded-xl flex items-center justify-between text-[11px] font-bold text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <span>🌸</span>
                          <span>{isAr ? 'أمينة (4 سنوات)' : isEn ? 'Amina (4 yrs)' : 'Amina (4 ans)'}</span>
                        </span>
                        <span className="text-[9px] text-gray-400 font-semibold">{isAr ? 'مستقل' : 'Isolé'}</span>
                      </div>
                    </div>

                    {/* Routine Preview */}
                    <div className="bg-amber-50/80 border border-amber-200/60 p-2 rounded-xl space-y-1">
                      <span className="text-[9px] font-bold text-amber-900 block">
                        {isAr ? 'روتين الصباح المكتمل ⭐' : isEn ? 'Morning Routine ⭐' : 'Routine du Matin ⭐'}
                      </span>
                      <div className="w-full bg-amber-200/60 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full w-4/5 rounded-full" />
                      </div>
                    </div>

                    <div className="text-[9px] text-center font-bold text-gray-400 pt-0.5">
                      🔒 {isAr ? 'قفل الوالدين برمز سري' : isEn ? 'Parental PIN Active' : 'Code PIN Parental Actif'}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT WIDGET (Tilted Flower Petal: Specialist Portal) */}
              <motion.div
                initial={{ opacity: 0, x: isAr ? -30 : 30, rotate: isAr ? -8 : 8 }}
                animate={{
                  opacity: 1,
                  x: isAr ? [-20, -24, -20] : [20, 24, 20],
                  y: [6, -6, 6],
                  rotate: isAr ? [-10, -12, -10] : [10, 12, 10],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
                className={`absolute top-4 ${
                  isAr ? 'start-4 sm:start-8' : 'end-4 sm:end-8'
                } translate-x-12 rtl:-translate-x-12 z-10 hidden md:block w-[210px] sm:w-[225px] select-none pointer-events-none hover:pointer-events-auto transition-all`}
              >
                {/* Phone Frame */}
                <div className="bg-[#172B46] p-2.5 rounded-[34px] shadow-2xl border border-white/20 ring-1 ring-black/10">
                  {/* Dynamic Island / Pill */}
                  <div className="w-16 h-3.5 bg-black/80 rounded-full mx-auto mb-2 flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D58C7A]" />
                  </div>
                  {/* Screen Content */}
                  <div className="bg-white rounded-[26px] p-3 space-y-2.5 text-start text-[#172B46] border border-gray-100">
                    <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
                      <span className="text-[10px] font-extrabold uppercase text-[#D58C7A]">
                        {isAr ? 'فضاء الأخصائي' : isEn ? 'Pro Portal' : 'Espace Spécialiste'}
                      </span>
                      <span className="text-[9px] bg-blue-50 text-blue-700 font-bold px-1.5 py-0.5 rounded-full">
                        {isAr ? 'معتمد' : 'Agréé'}
                      </span>
                    </div>

                    <div className="space-y-1 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-6 h-6 rounded-lg bg-[#2868C7]/15 text-[#2868C7] flex items-center justify-center font-bold text-[10px]">
                          🩺
                        </span>
                        <div>
                          <p className="font-extrabold text-[#172B46] text-[10px]">
                            {isAr ? 'أخصائي التخاطب' : isEn ? 'Speech Specialist' : 'Dr. Orthophoniste'}
                          </p>
                          <p className="text-[9px] text-gray-400">
                            {isAr ? 'موافقة الولي نشطة' : isEn ? 'Parent consent active' : 'Accord parental actif'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Assigned Cards */}
                    <div className="bg-[#F5F6F3] p-2 rounded-xl space-y-1">
                      <span className="text-[9px] font-bold text-[#172B46] block">
                        {isAr ? 'الأهداف المعينة للمنزل:' : isEn ? 'Assigned Home Targets:' : 'Objectifs attribués :'}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] bg-white px-1.5 py-0.5 rounded-md border text-[#172B46] font-bold">🥤</span>
                        <span className="text-[10px] bg-white px-1.5 py-0.5 rounded-md border text-[#172B46] font-bold">🧩</span>
                        <span className="text-[10px] bg-white px-1.5 py-0.5 rounded-md border text-[#172B46] font-bold">🎨</span>
                        <span className="text-[9px] text-[#2868C7] font-bold ms-auto">+3</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200/60 p-1.5 rounded-xl text-[9px] text-emerald-800 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span>{isAr ? 'تزامن مباشر مع العائلة' : isEn ? 'Live Home Sync' : 'Synchronisé en direct'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CENTER WIDGET (Primary Straight Mobile: Child World & Interactive AAC) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: [-4, 4, -4] }}
                transition={{
                  opacity: { duration: 0.7, delay: 0.2 },
                  scale: { duration: 0.7, delay: 0.2 },
                  y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="relative z-20 w-[300px] sm:w-[335px]"
              >
                {/* Outer Mobile Phone Frame */}
                <div className="bg-[#172B46] p-2.5 sm:p-3 rounded-[40px] sm:rounded-[44px] shadow-2xl border-2 border-[#2868C7]/40 ring-1 ring-white/30 backdrop-blur-2xl">
                  {/* Dynamic Island Notch */}
                  <div className="w-20 sm:w-24 h-4 bg-black/90 rounded-full mx-auto mb-2.5 flex items-center justify-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2868C7]/70" />
                    <span className="w-6 h-1 rounded-full bg-white/20" />
                  </div>

                  {/* Inner Screen */}
                  <div className="bg-[#F5F6F3] p-3.5 sm:p-4 rounded-[32px] sm:rounded-[36px] border border-white/60 space-y-3 shadow-inner">
                    {/* Child World Header Bar */}
                    <div className="flex items-center justify-between pb-2.5 border-b border-[#A9C5D8]/20">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#172B46] to-[#2868C7] text-[#D8BE83] flex items-center justify-center font-bold text-sm shadow-xs">
                          {isAr ? 'ي' : 'Y'}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs sm:text-sm font-extrabold text-[#172B46]">
                              {isAr ? 'عالم يانيس' : 'Monde de Yanis'}
                            </h4>
                            <span className="text-[9px] bg-[#A9C5D8]/30 text-[#172B46] px-1.5 py-0.5 rounded-full font-bold">
                              6 {isAr ? 'سنوات' : 'ans'}
                            </span>
                          </div>
                          <p className="text-[10px] text-[#172B46]/60 font-medium">
                            {isAr
                              ? 'عالم الطفل • حساب العائلة'
                              : isEn
                              ? 'Child World • Family Account'
                              : 'Monde Enfant • Compte Famille'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-[#A9C5D8]/40 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-black text-[#172B46]">
                          {isAr ? 'تواصل بديل' : isEn ? 'AAC' : 'CAA'}
                        </span>
                      </div>
                    </div>

                    {/* Interactive Sentence Strip */}
                    <div className="bg-white p-3 rounded-2xl border border-[#A9C5D8]/30 shadow-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-[#172B46]/80 uppercase tracking-wider">
                          {isAr ? 'شريط التعبير والتواصل' : isEn ? 'Sentence Builder' : 'Bande-phrase d\'expression'}
                        </span>
                        <button
                          onClick={() => setSelectedIds([])}
                          className="text-[9px] text-[#172B46]/50 hover:text-[#D58C7A] flex items-center gap-0.5 cursor-pointer"
                          title={isAr ? 'مسح الشريط' : 'Effacer'}
                        >
                          <RotateCcw size={10} />
                          <span>{isAr ? 'مسح' : 'Effacer'}</span>
                        </button>
                      </div>

                      <div className="min-h-[46px] bg-[#F5F6F3] rounded-xl p-1.5 flex items-center justify-between gap-1.5 border border-dashed border-[#A9C5D8]/50">
                        <div className="flex items-center gap-1.5 flex-wrap flex-1">
                          {selectedItems.length === 0 ? (
                            <p className="text-[11px] text-[#172B46]/40 italic px-1">
                              {isAr ? 'المس بطاقة للتعبير...' : isEn ? 'Tap a card to speak...' : 'Touchez une carte pour composer...'}
                            </p>
                          ) : (
                            selectedItems.map((item) => (
                              <motion.div
                                key={item.id}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-white px-2 py-0.5 rounded-md border border-[#A9C5D8]/50 shadow-2xs flex items-center gap-1"
                              >
                                <span className="text-xs">{item.emoji}</span>
                                <span className="text-[10px] font-bold text-[#172B46]">
                                  {isAr ? item.labelAr : isEn ? item.labelEn : item.labelFr}
                                </span>
                              </motion.div>
                            ))
                          )}
                        </div>

                        <button
                          onClick={handlePlayVoice}
                          disabled={selectedItems.length === 0 || isPlayingAudio}
                          className={`p-1.5 rounded-lg transition-all shadow-xs shrink-0 flex items-center justify-center cursor-pointer ${
                            selectedItems.length === 0
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : isPlayingAudio
                              ? 'bg-[#D58C7A] text-white scale-105'
                              : 'bg-[#172B46] hover:bg-[#1f3757] text-white'
                          }`}
                          aria-label="Écouter la phrase"
                        >
                          {isPlayingAudio ? (
                            <Volume2 size={14} className="animate-bounce" />
                          ) : (
                            <Play size={14} className="fill-current" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Tactile AAC Grid (6 Cards) */}
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-[#172B46]/70">
                        {isAr
                          ? 'بطاقات اليوم المقترحة (العائلة والأخصائي):'
                          : isEn
                          ? 'Validated Pictograms (Family & Clinic):'
                          : 'Pictogrammes validés (Famille & Orthophoniste) :'}
                      </p>
                      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                        {SAMPLE_PICTOS.map((picto) => {
                          const isSelected = selectedIds.includes(picto.id);
                          return (
                            <motion.button
                              key={picto.id}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => togglePicto(picto.id)}
                              className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                                isSelected
                                  ? 'bg-white border-[#2868C7] shadow-sm ring-2 ring-[#2868C7]/20'
                                  : 'bg-white/85 hover:bg-white border-[#A9C5D8]/40 shadow-2xs'
                              }`}
                            >
                              <span className="text-xl select-none">{picto.emoji}</span>
                              <span className="text-[10px] font-bold text-[#172B46] leading-tight line-clamp-1">
                                {isAr ? picto.labelAr : isEn ? picto.labelEn : picto.labelFr}
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Pro-Parent Bridge Indicator */}
                    <div className="pt-0.5 flex items-center justify-between text-[10px] text-[#172B46]/70 bg-white/70 px-2.5 py-1.5 rounded-lg border border-[#A9C5D8]/20">
                      <span className="flex items-center gap-1 font-medium">
                        <Users size={11} className="text-[#172B46]" />
                        {isAr ? 'تزامن مباشر مع الأخصائي' : isEn ? 'Synced with Specialist' : 'Synchronisé avec l\'orthophoniste'}
                      </span>
                      <span className="font-bold text-[#D58C7A]">
                        {isAr ? 'استمرارية في البيت' : isEn ? 'Home continuity' : 'Continuité maison'}
                      </span>
                    </div>
                  </div>
                </div>
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
