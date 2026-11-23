import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Volume2, ShieldCheck, Star, Moon, Orbit, Lock, CheckCircle2, Heart } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

interface PlanetProfile {
  id: string;
  childNameAr: string;
  childNameFr: string;
  childNameEn: string;
  age: number;
  planetNameAr: string;
  planetNameFr: string;
  planetNameEn: string;
  planetSubtitleAr: string;
  planetSubtitleFr: string;
  planetSubtitleEn: string;
  planetType: 'sounds' | 'wonders' | 'calm';
  primaryColor: string;
  gradientClass: string;
  glowClass: string;
  featuresAr: string[];
  featuresFr: string[];
  featuresEn: string[];
  pictos: {
    id: string;
    emoji: string;
    labelAr: string;
    labelFr: string;
    labelEn: string;
  }[];
}

const DEMO_WORLDS: PlanetProfile[] = [
  {
    id: 'child-yanis',
    childNameAr: 'يانيس',
    childNameFr: 'Yanis',
    childNameEn: 'Yanis',
    age: 6,
    planetNameAr: 'كوكب الأصوات والتخاطب',
    planetNameFr: 'Planète des Sons & du Verbe',
    planetNameEn: 'Planet of Sounds & Speech',
    planetSubtitleAr: 'مستوحى من عوالم سبيستون • تعزيز النطق والتواصل التفاعلي',
    planetSubtitleFr: 'Inspiré des planètes Spacetoon • Stimulation vocale et communication active',
    planetSubtitleEn: 'Spacetoon-inspired universe • Speech stimulation and active vocalization',
    planetType: 'sounds',
    primaryColor: '#2868C7',
    gradientClass: 'from-[#2868C7] via-[#1E54A3] to-[#172B46]',
    glowClass: 'planet-glow-royal',
    featuresAr: [
      'لوحة تواصل بديل (AAC) فورية ناطقة',
      'تدريبات مخارج الحروف مع رفيق أفق الصوتي',
      'نجوم المهام اليومية بالتنسيق مع الأخصائي'
    ],
    featuresFr: [
      'Bande-phrase CAA avec synthèse vocale instantanée',
      'Exercices de phonation avec le compagnon audio OFOQ',
      'Étoiles d\'objectifs coordonnées avec l\'orthophoniste'
    ],
    featuresEn: [
      'Instant voice-synthesized AAC sentence strip',
      'Phonetic exploration with OFOQ audio companion',
      'Therapy goal stars aligned with the specialist'
    ],
    pictos: [
      { id: 'water', emoji: '🥤', labelAr: 'أريد ماء', labelFr: 'Boire de l\'eau', labelEn: 'Drink water' },
      { id: 'listen', emoji: '🎵', labelAr: 'أستمع للأصوات', labelFr: 'Écouter un son', labelEn: 'Listen to sound' },
      { id: 'speak', emoji: '🗣️', labelAr: 'أحاول الحديث', labelFr: 'Je répète le mot', labelEn: 'Practice word' },
      { id: 'star', emoji: '⭐', labelAr: 'أكملت الهدف!', labelFr: 'Objectif réussi !', labelEn: 'Goal achieved!' }
    ]
  },
  {
    id: 'child-amina',
    childNameAr: 'أمينة',
    childNameFr: 'Amina',
    childNameEn: 'Amina',
    age: 4,
    planetNameAr: 'كوكب الهدوء والسكينة',
    planetNameFr: 'Planète Douceur & Émotions',
    planetNameEn: 'Planet of Calm & Harmony',
    planetSubtitleAr: 'ملاذ حسي مريح • تنظيم المشاعر والروتين اليومي',
    planetSubtitleFr: 'Refuge sensoriel apaisé • Régulation émotionnelle et prévisibilité',
    planetSubtitleEn: 'Sensory-safe haven • Emotional calm and predictable routines',
    planetType: 'calm',
    primaryColor: '#D8BE83',
    gradientClass: 'from-[#D8BE83] via-[#C9A860] to-[#172B46]',
    glowClass: 'planet-glow-gold',
    featuresAr: [
      'تصميم مهدئ حسي وخالٍ من المؤثرات المزعجة',
      'بطاقات التعبير عن المشاعر والاحتياجات الأساسية',
      'مؤقت بصري لطيف للاسترخاء والانتقال بين الأنشطة'
    ],
    featuresFr: [
      'Ambiance visuelle apaisante sans surcharge sensorielle',
      'Pictos d\'expression émotionnelle et besoins fondamentaux',
      'Minuteur visuel doux pour faciliter les transitions'
    ],
    featuresEn: [
      'Sensory-friendly styling free from overstimulation',
      'Emotional expression and primary need pictograms',
      'Gentle visual timer for anxiety-free transitions'
    ],
    pictos: [
      { id: 'calm', emoji: '🛋️', labelAr: 'أحتاج وقتاً هادئاً', labelFr: 'Temps calme', labelEn: 'Quiet break' },
      { id: 'hug', emoji: '🤗', labelAr: 'عناق دافئ', labelFr: 'Besoin d\'un câlin', labelEn: 'Warm hug' },
      { id: 'breathe', emoji: '🌸', labelAr: 'تنفس عميق', labelFr: 'Je respire', labelEn: 'Deep breath' },
      { id: 'happy', emoji: '😊', labelAr: 'أشعر بالراحة', labelFr: 'Je me sens bien', labelEn: 'I feel good' }
    ]
  }
];

export const ChildWorldsShowcase: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'fr';
  const isAr = currentLang === 'ar';
  const isEn = currentLang === 'en';

  const [activeProfileId, setActiveProfileId] = useState<string>('child-yanis');
  const [activePicto, setActivePicto] = useState<string | null>(null);

  const activeProfile = DEMO_WORLDS.find((p) => p.id === activeProfileId) || DEMO_WORLDS[0];

  const handlePictoClick = (picto: typeof activeProfile.pictos[0]) => {
    setActivePicto(picto.id);
    if ('speechSynthesis' in window) {
      const textToSpeak = isAr ? picto.labelAr : isEn ? picto.labelEn : picto.labelFr;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = isAr ? 'ar-SA' : isEn ? 'en-US' : 'fr-FR';
      utterance.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setActivePicto(null), 1400);
  };

  return (
    <section id="child-world" className="py-24 max-w-[1440px] mx-auto px-4 sm:px-8 scroll-mt-24 relative overflow-hidden">
      {/* Cosmic Spacetoon-Inspired Backdrop Atmosphere */}
      <div className="absolute top-1/4 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#2868C7]/15 via-[#A9C5D8]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 end-10 w-96 h-96 bg-[#D8BE83]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <ScrollReveal>
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#2868C7]/10 text-[#2868C7] px-4 py-1.5 rounded-full border border-[#2868C7]/20 text-xs font-extrabold uppercase tracking-wider shadow-xs">
            <Orbit size={14} className="animate-spin text-[#2868C7]" style={{ animationDuration: '12s' }} />
            <span>
              {isAr
                ? 'عوالم الأطفال • مستوحاة من كواكب سبيستون'
                : isEn
                ? 'Child Worlds • Spacetoon-Inspired Metaphor'
                : 'Mondes Enfants • Métaphore Spacetoon 3D'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-black text-[#172B46] tracking-tight leading-tight">
            {isAr
              ? 'لكل طفل كوكبه الخاص المستقل داخل حساب العائلة'
              : isEn
              ? 'Every child receives their own custom planet inside the family account'
              : 'À chaque enfant sa planète dédiée au cœur du compte familial'}
          </h2>

          <p className="text-base sm:text-lg text-[#5B6E85] leading-relaxed">
            {isAr
              ? 'الولي ينشئ الحساب، والمنظومة تنشئ لكل طفل عالماً ثلاثي الأبعاد مخصصاً ومستقلاً تماماً: بطاقات تواصل بديل (AAC)، روتين يومي هادئ، ودخول مباشر بدون كلمات مرور أو إجهاد رقمي.'
              : isEn
              ? 'Parents manage one account; every child discovers a personalized 3D universe: voice-synthesized AAC boards, visual routines, and safe single-tap entry without passwords.'
              : 'Le parent administre le compte unique ; l\'enfant entre en un clic dans son univers 3D sécurisé : pictogrammes parlants, repères sensoriels apaisés et zéro mot de passe.'}
          </p>

          {/* Profile Switcher Tabs (Illustrating Multi-Child Family Isolation) */}
          <div className="pt-4 flex items-center justify-center gap-3 flex-wrap">
            <span className="text-xs font-bold text-[#172B46]/60 me-1">
              {isAr ? 'بدّل بين عوالم الإخوة:' : isEn ? 'Switch Sibling Worlds:' : 'Changer de profil enfant :'}
            </span>
            {DEMO_WORLDS.map((profile) => {
              const isActive = profile.id === activeProfileId;
              return (
                <button
                  key={profile.id}
                  onClick={() => setActiveProfileId(profile.id)}
                  className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    isActive
                      ? 'bg-[#172B46] text-white shadow-lg border-[#172B46] scale-105'
                      : 'bg-white/80 hover:bg-white text-[#172B46] border-[#A9C5D8]/40 hover:border-[#2868C7]/50'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: profile.primaryColor }} />
                  <span>
                    {isAr ? profile.childNameAr : isEn ? profile.childNameEn : profile.childNameFr} ({profile.age} {isAr ? 'سنوات' : 'ans'})
                  </span>
                  <span className="text-[10px] opacity-75 font-normal">
                    {profile.planetType === 'sounds' ? '🪐' : '🌸'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Main 3D Planet Showcase Window */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProfile.id}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.4 }}
          className="glass-royal-card rounded-[40px] p-6 sm:p-12 border border-[#2868C7]/30 shadow-2xl relative overflow-hidden"
        >
          {/* Top Bar: Family Anchor & Child Sovereignty */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-[#A9C5D8]/30">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeProfile.gradientClass} text-white flex items-center justify-center font-black text-2xl shadow-lg border border-white/40 shrink-0`}
              >
                {activeProfile.childNameFr.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl sm:text-2xl font-black text-[#172B46]">
                    {isAr ? activeProfile.planetNameAr : isEn ? activeProfile.planetNameEn : activeProfile.planetNameFr}
                  </h3>
                  <span className="text-[11px] font-extrabold px-3 py-0.5 rounded-full bg-[#2868C7]/15 text-[#2868C7] border border-[#2868C7]/30">
                    {isAr ? 'عالم مستقل' : isEn ? 'Isolated Workspace' : 'Monde Cloisonné'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5B6E85] font-medium mt-0.5">
                  {isAr ? activeProfile.planetSubtitleAr : isEn ? activeProfile.planetSubtitleEn : activeProfile.planetSubtitleFr}
                </p>
              </div>
            </div>

            {/* Parental Safety Lock Indicator */}
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#A9C5D8]/40 shadow-xs">
              <Lock size={15} className="text-[#D58C7A]" />
              <div className="text-start">
                <p className="text-[11px] font-bold text-[#172B46]">
                  {isAr ? 'قفل الوالدين نشط' : isEn ? 'Parental Lock Active' : 'Verrouillage Parental'}
                </p>
                <p className="text-[10px] text-[#5B6E85]">
                  {isAr ? 'خروج برمز سري للأولياء' : isEn ? 'Protected Exit with PIN' : 'Sortie sécurisée par code'}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive World Grid: 3D Planet Stage (Left) & AAC Activity Deck (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 items-center">
            
            {/* 3D Celestial Planet Stage (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center relative py-6">
              
              {/* Outer Orbit Dashed Ring */}
              <div className="w-72 h-72 sm:w-80 sm:h-80 orbit-ring relative flex items-center justify-center">
                {/* Orbiting Moon: Therapy Goal */}
                <motion.div
                  className="absolute -top-3 w-8 h-8 rounded-full bg-[#D8BE83] shadow-md flex items-center justify-center text-[10px] font-bold text-[#172B46]"
                  title={isAr ? 'هدف الأخصائي المعتمد' : 'Objectif Orthophonie'}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                >
                  <Star size={14} className="fill-[#172B46]" />
                </motion.div>
                {/* Orbiting Moon: Daily Routine */}
                <div
                  className="absolute -bottom-3 w-7 h-7 rounded-full bg-[#D58C7A] shadow-md flex items-center justify-center text-[10px] font-bold text-white"
                  title={isAr ? 'روتين البيت' : 'Routine du soir'}
                >
                  <Moon size={13} className="fill-white" />
                </div>
              </div>

              {/* The 3D Planet Sphere (Spacetoon Wonder) */}
              <motion.div
                animate={{
                  y: [-6, 6, -6],
                  rotateZ: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className={`absolute w-52 h-52 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr ${activeProfile.gradientClass} ${activeProfile.glowClass} flex flex-col items-center justify-center text-white p-6 shadow-2xl border-2 border-white/50 cursor-pointer group`}
              >
                {/* Planet Surface Texture Glow */}
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.45),transparent_60%)] pointer-events-none" />
                
                <span className="text-4xl sm:text-5xl mb-2 drop-shadow-md">
                  {activeProfile.planetType === 'sounds' ? '🪐' : '🌸'}
                </span>
                <span className="text-sm font-extrabold tracking-wide drop-shadow-md">
                  {isAr ? activeProfile.childNameAr : isEn ? activeProfile.childNameEn : activeProfile.childNameFr}
                </span>
                <span className="text-[10px] uppercase font-bold text-[#D8BE83] tracking-widest mt-0.5">
                  {isAr ? 'أفق 3D' : 'OFOQ 3D'}
                </span>
              </motion.div>

              <div className="pt-40 sm:pt-44 text-center space-y-1">
                <p className="text-xs font-bold text-[#172B46]">
                  {isAr ? 'كوكب تفاعلي بدون تشتيت بصري' : isEn ? 'Calm 3D Interactive World' : 'Monde 3D Sensoriellement Apaisé'}
                </p>
                <p className="text-[11px] text-[#5B6E85]">
                  {isAr ? 'ألوان هادئة، أصوات لطيفة، وواجهة مصممة للأطفال' : isEn ? 'Gentle colors, friendly vocal feedback' : 'Couleurs douces et retours vocaux rassurants'}
                </p>
              </div>
            </div>

            {/* AAC Communication Deck & Features (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#2868C7] bg-[#2868C7]/10 px-3 py-1 rounded-full border border-[#2868C7]/30">
                  {isAr ? 'لوحة التعبير والتواصل (AAC)' : isEn ? 'Tactile Communication Cards (AAC)' : 'Bande-Phrase & Pictogrammes CAA'}
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-[#172B46]">
                  {isAr
                    ? 'المس بطاقة لسماع النطق الفوري باللغة العربية والفرنسية'
                    : isEn
                    ? 'Tap any card to trigger instant vocal synthesis'
                    : 'Touchez une carte pour déclencher la synthèse vocale'}
                </h4>
                <p className="text-xs sm:text-sm text-[#5B6E85]">
                  {isAr
                    ? 'تم تصميم البطاقات وفق معايير PECS للتواصل البصري، وتدعم العربية الفصحى، الفرنسية، والدارجة الجزائرية للمألوفات.'
                    : isEn
                    ? 'Cards follow PECS communication standards with vocalization in Modern Standard Arabic, French, and Algerian Derja.'
                    : 'Les pictogrammes respectent les principes PECS et s\'adaptent au dialecte algérien, au français et à l\'arabe.'}
                </p>
              </div>

              {/* Interactive Tactile AAC Card Deck */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activeProfile.pictos.map((picto) => {
                  const isPlaying = activePicto === picto.id;
                  return (
                    <motion.button
                      key={picto.id}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePictoClick(picto)}
                      className={`p-4 rounded-3xl border text-center transition-all flex flex-col items-center justify-between gap-3 shadow-sm cursor-pointer relative overflow-hidden ${
                        isPlaying
                          ? 'bg-[#2868C7] text-white border-[#2868C7] shadow-lg shadow-[#2868C7]/30'
                          : 'bg-white/90 hover:bg-white text-[#172B46] border-[#A9C5D8]/40 hover:border-[#2868C7]/40'
                      }`}
                    >
                      {isPlaying && (
                        <motion.div
                          layoutId="audioPulse"
                          className="absolute inset-0 bg-[#2868C7]/20 animate-pulse pointer-events-none"
                        />
                      )}
                      <span className="text-3xl sm:text-4xl">{picto.emoji}</span>
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold block leading-tight">
                          {isAr ? picto.labelAr : isEn ? picto.labelEn : picto.labelFr}
                        </span>
                        <div className="flex items-center justify-center gap-1 opacity-70">
                          <Volume2 size={12} className={isPlaying ? 'text-[#D8BE83]' : 'text-[#2868C7]'} />
                          <span className="text-[10px] font-semibold">{isAr ? 'استمع' : 'Audio'}</span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Ecosystem Benefits inside Child World */}
              <div className="bg-white/70 backdrop-blur-md rounded-3xl p-5 border border-[#A9C5D8]/30 space-y-3">
                <span className="text-xs font-bold text-[#172B46]/70 uppercase tracking-wider block">
                  {isAr ? 'مميزات هذا العالم الرقمي:' : isEn ? 'World Safeguards & Tools:' : 'Fonctionnalités intégrées au monde :'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(isAr ? activeProfile.featuresAr : isEn ? activeProfile.featuresEn : activeProfile.featuresFr).map(
                    (feature, index) => (
                      <div key={index} className="flex items-start gap-2 text-start">
                        <CheckCircle2 size={16} className="text-[#2868C7] shrink-0 mt-0.5" />
                        <span className="text-xs text-[#172B46]/80 font-medium leading-relaxed">{feature}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
