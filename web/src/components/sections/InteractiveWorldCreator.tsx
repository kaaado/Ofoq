import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Users,
  UserPlus,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Lock,
  Volume2,
  Orbit,
  Star,
  Layers,
  Heart,
  Palette,
  Compass,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

// World Themes definition
interface WorldTheme {
  id: string;
  nameAr: string;
  nameFr: string;
  nameEn: string;
  descAr: string;
  descFr: string;
  descEn: string;
  emoji: string;
  gradient: string;
  glowColor: string;
  textColor: string;
  samplePictos: { emoji: string; labelAr: string; labelFr: string; labelEn: string }[];
}

const WORLD_THEMES: WorldTheme[] = [
  {
    id: 'cosmic',
    nameAr: 'كوكب الفضاء والأصوات',
    nameFr: 'Monde Céleste & Phonétique',
    nameEn: 'Cosmic Speech Explorer',
    descAr: 'مخصص للأطفال محبي النجوم والأصوات؛ تدريبات النطق وبناء الجمل في بيئة فضائية ملهمة.',
    descFr: 'Stimulation phonétique et articulation dans un environnement spatial immersif et apaisé.',
    descEn: 'Speech sound exploration and sentence building in an immersive, calm cosmic setting.',
    emoji: '🪐',
    gradient: 'from-[#2868C7] via-[#1E54A3] to-[#172B46]',
    glowColor: 'rgba(40, 104, 199, 0.4)',
    textColor: '#2868C7',
    samplePictos: [
      { emoji: '🚀', labelAr: 'أنطلق', labelFr: 'Décoller', labelEn: 'Launch' },
      { emoji: '⭐', labelAr: 'أسمع الصوت', labelFr: 'Écouter', labelEn: 'Listen' },
      { emoji: '🥤', labelAr: 'أشرب ماء', labelFr: 'Boire de l\'eau', labelEn: 'Drink water' },
      { emoji: '🗣️', labelAr: 'أكرر الكلمة', labelFr: 'Répéter', labelEn: 'Repeat' }
    ]
  },
  {
    id: 'nature',
    nameAr: 'كوكب الطبيعة والهدوء',
    nameFr: 'Jardin Douceur & Routines',
    nameEn: 'Nature & Peaceful Routines',
    descAr: 'بيئة بصرية خضراء مريحة حسياً مع التركيز على تنظيم محطات اليوم والروتين العائلي.',
    descFr: 'Cadre végétal apaisant axé sur la prévisibilité, la transition douce et les rituels du quotidien.',
    descEn: 'Soothing nature setting focused on daily predictability, gentle transitions, and domestic routines.',
    emoji: '🌿',
    gradient: 'from-[#2D7A58] via-[#1E5B40] to-[#172B46]',
    glowColor: 'rgba(45, 122, 88, 0.4)',
    textColor: '#2D7A58',
    samplePictos: [
      { emoji: '🍎', labelAr: 'وجبة خفيفة', labelFr: 'Goûter', labelEn: 'Snack' },
      { emoji: '🛋️', labelAr: 'استراحة هادئة', labelFr: 'Temps calme', labelEn: 'Quiet break' },
      { emoji: '🧸', labelAr: 'ألعب بلطف', labelFr: 'Jouer', labelEn: 'Play' },
      { emoji: '🌙', labelAr: 'وقت النوم', labelFr: 'Dormir', labelEn: 'Sleep' }
    ]
  },
  {
    id: 'ocean',
    nameAr: 'كوكب البحار والتنفس',
    nameFr: 'Océan Apaisé & Émotions',
    nameEn: 'Ocean Haven & Regulation',
    descAr: 'أمواج هادئة وألوان مائية لتخفيف التوتر، تنظيم المشاعر والتعبير عن الاحتياجات الأساسية.',
    descFr: 'Atmosphère aquatique douce pour favoriser la régulation émotionnelle et l\'expression des besoins.',
    descEn: 'Gentle aquatic rhythm to support emotional regulation and stress-free communication.',
    emoji: '🌊',
    gradient: 'from-[#0284C7] via-[#0369A1] to-[#172B46]',
    glowColor: 'rgba(2, 132, 199, 0.4)',
    textColor: '#0284C7',
    samplePictos: [
      { emoji: '🤗', labelAr: 'أحتاج عناقاً', labelFr: 'Besoin d\'un câlin', labelEn: 'Need a hug' },
      { emoji: '🌸', labelAr: 'أتنفس بعمق', labelFr: 'Respirer', labelEn: 'Breathe' },
      { emoji: '🎧', labelAr: 'صوت مزعج', labelFr: 'Trop de bruit', labelEn: 'Too noisy' },
      { emoji: '😊', labelAr: 'أنا مرتاح', labelFr: 'Je vais bien', labelEn: 'I feel good' }
    ]
  },
  {
    id: 'creative',
    nameAr: 'كوكب الإبداع والقصص',
    nameFr: 'Atelier Couleurs & Histoires',
    nameEn: 'Creative Studio & Stories',
    descAr: 'فضاء حيوي ودافئ للتعبير المصور، الرسم، ومشاركة الإنجازات اليومية مع الأولياء والأخصائي.',
    descFr: 'Espace chaleureux d\'expression imagée, narration visuelle et renforcement des réussites.',
    descEn: 'Warm space for visual storytelling, creative expression, and celebrating daily milestones.',
    emoji: '🎨',
    gradient: 'from-[#D58C7A] via-[#C27765] to-[#172B46]',
    glowColor: 'rgba(213, 140, 122, 0.4)',
    textColor: '#D58C7A',
    samplePictos: [
      { emoji: '🧩', labelAr: 'تركيب الصور', labelFr: 'Puzzle', labelEn: 'Puzzle' },
      { emoji: '🖌️', labelAr: 'أرسم وألوّن', labelFr: 'Dessiner', labelEn: 'Draw' },
      { emoji: '📖', labelAr: 'قصة مصورة', labelFr: 'Lire une histoire', labelEn: 'Story time' },
      { emoji: '👏', labelAr: 'أحسنت!', labelFr: 'Bravo !', labelEn: 'Great job!' }
    ]
  }
];

export const InteractiveWorldCreator: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'fr';
  const isAr = currentLang === 'ar';
  const isEn = currentLang === 'en';

  // Wizard state: 1 = Parent Dashboard, 2 = Create Profile Form, 3 = Choose Theme, 4 = Creation Animation, 5 = Explore World, 6 = Sibling Switcher
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State (Fictional Demo Data)
  const [childName, setChildName] = useState<string>('Rayan');
  const [childAge, setChildAge] = useState<number>(5);
  const [selectedThemeId, setSelectedThemeId] = useState<string>('cosmic');
  const [activePictoId, setActivePictoId] = useState<string | null>(null);

  // Sibling Switcher Demo State (Yanis vs Rayan)
  const [activeSibling, setActiveSibling] = useState<'rayan' | 'amina'>('rayan');

  const selectedTheme = WORLD_THEMES.find((t) => t.id === selectedThemeId) || WORLD_THEMES[0];

  // Advance to creation animation then to exploration
  const handleLaunchCreation = () => {
    setCurrentStep(4);
    setTimeout(() => {
      setCurrentStep(5);
    }, 2200);
  };

  const handlePictoSpeech = (picto: typeof selectedTheme.samplePictos[0]) => {
    setActivePictoId(picto.labelFr);
    if ('speechSynthesis' in window) {
      const text = isAr ? picto.labelAr : isEn ? picto.labelEn : picto.labelFr;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = isAr ? 'ar-SA' : isEn ? 'en-US' : 'fr-FR';
      utterance.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setActivePictoId(null), 1200);
  };

  return (
    <section id="creator" className="py-24 max-w-[1440px] mx-auto px-4 sm:px-8 scroll-mt-24 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-[#2868C7]/10 via-[#D8BE83]/10 to-[#D58C7A]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <ScrollReveal>
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-[#2868C7]/10 text-[#2868C7] px-4 py-1.5 rounded-full border border-[#2868C7]/20 text-xs font-extrabold uppercase tracking-wider shadow-xs">
            <Sparkles size={14} className="text-[#2868C7]" />
            <span>
              {isAr
                ? 'تجربة تفاعلية مباشرة • نموذج إنشاء العالم الرقمي'
                : isEn
                ? 'Interactive Experience • Live Prototype Simulation'
                : 'Expérience Interactive • Simulation de Création'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-black text-[#172B46] tracking-tight leading-tight">
            {isAr
              ? 'كيف ينشئ الولي عالماً مخصصاً لطفله في ثوانٍ؟'
              : isEn
              ? 'How a parent creates a custom child world in seconds'
              : 'Comment le parent donne vie au monde de son enfant'}
          </h2>

          <p className="text-base sm:text-lg text-[#5B6E85] leading-relaxed">
            {isAr
              ? 'جرّب بنفسك: حساب أبوي واحد، ملف لكل طفل، وعالم ثلاثي الأبعاد مستقل ينبض بالحياة بدون الحاجة لحساب أو كلمة مرور للطفل.'
              : isEn
              ? 'Try the interactive prototype: one parent account, independent child profiles, and a 3D tailored universe with zero child login burdens.'
              : 'Essayez le simulateur : un compte parent unique, des profils indépendants et un monde 3D sur mesure sans mot de passe pour l\'enfant.'}
          </p>

          {/* Stepper Progress Indicator */}
          <div className="pt-4 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            {[
              { step: 1, labelAr: '1. حساب العائلة', labelFr: '1. Compte Famille', labelEn: '1. Family Hub' },
              { step: 2, labelAr: '2. إنشاء الملف', labelFr: '2. Profil Enfant', labelEn: '2. Profile Setup' },
              { step: 3, labelAr: '3. اختيار العالم', labelFr: '3. Choix du Monde', labelEn: '3. Theme Selection' },
              { step: 5, labelAr: '4. استكشاف العالم', labelFr: '4. Monde Enfant', labelEn: '4. Explore World' },
              { step: 6, labelAr: '5. عزل الإخوة', labelFr: '5. Cloisonnement', labelEn: '5. Sibling Switch' }
            ].map((s) => {
              const isCurrent = currentStep === s.step || (s.step === 5 && currentStep === 4);
              const isPast = currentStep > s.step;
              return (
                <button
                  key={s.step}
                  onClick={() => s.step !== 4 && setCurrentStep(s.step)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                    isCurrent
                      ? 'bg-[#2868C7] text-white border-[#2868C7] shadow-md shadow-[#2868C7]/20 scale-105'
                      : isPast
                      ? 'bg-white text-[#172B46] border-[#2868C7]/40'
                      : 'bg-white/60 text-[#172B46]/50 border-gray-200'
                  }`}
                >
                  {isPast && <CheckCircle2 size={12} className="text-[#2868C7]" />}
                  <span>{isAr ? s.labelAr : isEn ? s.labelEn : s.labelFr}</span>
                </button>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Main Interactive Stage Container */}
      <div className="glass-royal-card rounded-[40px] p-6 sm:p-12 border border-[#2868C7]/30 shadow-2xl min-h-[580px] flex flex-col justify-between relative overflow-hidden">
        
        {/* Top Sandbox Notice Banner */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#A9C5D8]/30 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-[#172B46]">
              {isAr ? 'نموذج محاكاة تفاعلي (بيانات تجريبية محلية)' : isEn ? 'Interactive Prototype (Local Demo State)' : 'Simulateur Interactif (Données locales fictives)'}
            </span>
          </div>
          <button
            onClick={() => {
              setCurrentStep(1);
              setChildName('Rayan');
              setSelectedThemeId('cosmic');
            }}
            className="text-xs font-semibold text-[#5B6E85] hover:text-[#2868C7] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>{isAr ? 'إعادة تشغيل المحاكاة' : isEn ? 'Reset Demo' : 'Réinitialiser la démo'}</span>
          </button>
        </div>

        {/* Dynamic Wizard Steps */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">

            {/* STEP 1: PARENT FAMILY HUB */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: isAr ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isAr ? -30 : 30 }}
                transition={{ duration: 0.35 }}
                className="space-y-8"
              >
                <div className="max-w-2xl mx-auto text-center space-y-2">
                  <div className="w-14 h-14 rounded-2xl bg-[#172B46] text-[#D8BE83] flex items-center justify-center mx-auto shadow-md">
                    <Users size={28} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#172B46]">
                    {isAr ? 'حساب العائلة الموحد (الولي)' : isEn ? 'Unified Family Hub (Parent Account)' : 'Compte Famille Unifié (Espace Parent)'}
                  </h3>
                  <p className="text-sm text-[#5B6E85]">
                    {isAr
                      ? 'الولي هو المالك الوحيد للحساب وله الصلاحية الحصرية لإضافة أطفاله، ربط الأخصائيين، ومتابعة التقدم اليومي.'
                      : isEn
                      ? 'The parent is the sole account owner with sovereign rights to add children, invite therapists, and oversee progress.'
                      : 'Le parent est le seul titulaire du compte. Il gère souverainement les profils de ses enfants et les accès professionnels.'}
                  </p>
                </div>

                {/* Simulated Family Profiles Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                  <div className="bg-white/90 p-5 rounded-3xl border border-[#A9C5D8]/40 shadow-xs flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2868C7] to-[#172B46] text-white flex items-center justify-center font-bold text-lg">
                      Y
                    </div>
                    <div className="text-start">
                      <h4 className="text-sm font-bold text-[#172B46]">Yanis (6 ans)</h4>
                      <span className="text-[11px] text-[#2868C7] font-semibold block">🪐 Monde Céleste</span>
                      <span className="text-[10px] text-emerald-600 font-medium">✓ Profil Actif</span>
                    </div>
                  </div>

                  <div className="bg-white/90 p-5 rounded-3xl border border-[#A9C5D8]/40 shadow-xs flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0284C7] to-[#172B46] text-white flex items-center justify-center font-bold text-lg">
                      A
                    </div>
                    <div className="text-start">
                      <h4 className="text-sm font-bold text-[#172B46]">Amina (4 ans)</h4>
                      <span className="text-[11px] text-[#0284C7] font-semibold block">🌊 Monde Océan</span>
                      <span className="text-[10px] text-emerald-600 font-medium">✓ Profil Actif</span>
                    </div>
                  </div>

                  {/* Add Profile Action Trigger */}
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="p-5 rounded-3xl border-2 border-dashed border-[#2868C7] hover:border-[#1E54A3] bg-[#2868C7]/5 hover:bg-[#2868C7]/10 transition-all flex flex-col items-center justify-center gap-1.5 text-[#2868C7] cursor-pointer group"
                  >
                    <UserPlus size={22} className="group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold">{isAr ? '+ إنشاء ملف طفل جديد' : isEn ? '+ Create Child Profile' : '+ Créer un profil enfant'}</span>
                  </button>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="bg-[#2868C7] hover:bg-[#1E54A3] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-[#2868C7]/25 transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>{isAr ? 'المتابعة: إضافة طفل جديد' : isEn ? 'Next: Add New Child Profile' : 'Suivant : Ajouter un profil enfant'}</span>
                    <ArrowRight size={16} className="rtl-flip" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: PROFILE CONFIGURATION WIZARD */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: isAr ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isAr ? -30 : 30 }}
                transition={{ duration: 0.35 }}
                className="max-w-xl mx-auto space-y-6 w-full"
              >
                <div className="text-center space-y-1">
                  <span className="text-xs font-bold text-[#2868C7] uppercase tracking-wider">
                    {isAr ? 'الخطوة 2 من 5' : isEn ? 'Step 2 of 5' : 'Étape 2 sur 5'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#172B46]">
                    {isAr ? 'إعداد ملف الطفل (نموذج توضيحي)' : isEn ? 'Child Profile Setup (Demo)' : 'Configuration du Profil Enfant'}
                  </h3>
                  <p className="text-xs text-[#5B6E85]">
                    {isAr ? 'حدد الاسم المستعار والاهتمامات لتخصيص بيئة التعلم.' : isEn ? 'Configure pseudonym and preferences to shape their world.' : 'Définissez le prénom et le rythme d\'apprentissage.'}
                  </p>
                </div>

                <div className="bg-white/90 p-6 sm:p-8 rounded-3xl border border-[#A9C5D8]/40 shadow-xs space-y-5">
                  <div className="space-y-1.5 text-start">
                    <label className="text-xs font-bold text-[#172B46]">{isAr ? 'اسم الطفل أو اللقب المستعار' : isEn ? 'Child Nickname' : 'Prénom ou pseudonyme de l\'enfant'}</label>
                    <input
                      type="text"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="Ex: Rayan"
                      className="w-full bg-[#F5F6F3] border border-[#A9C5D8]/50 focus:border-[#2868C7] rounded-xl px-4 py-2.5 text-sm text-[#172B46] outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5 text-start">
                    <label className="text-xs font-bold text-[#172B46]">{isAr ? 'الفئة العمرية التقريبية' : isEn ? 'Age Group' : 'Âge'}</label>
                    <div className="flex gap-2">
                      {[4, 5, 6, 7, 8].map((age) => (
                        <button
                          key={age}
                          type="button"
                          onClick={() => setChildAge(age)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            childAge === age
                              ? 'bg-[#2868C7] text-white border-[#2868C7]'
                              : 'bg-[#F5F6F3] text-[#172B46] border-[#A9C5D8]/40 hover:bg-white'
                          }`}
                        >
                          {age} {isAr ? 'سنوات' : 'ans'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-[#A9C5D8]/15 rounded-2xl border border-[#A9C5D8]/30 flex items-center gap-2.5 text-xs text-[#172B46]">
                    <ShieldCheck size={18} className="text-[#2868C7] shrink-0" />
                    <span>{isAr ? 'لن يُطلب من الطفل أي كلمة مرور؛ دخوله محمي برمز الأب.' : isEn ? 'Children never enter credentials; entry is protected by parent lock.' : 'L\'enfant n\'a aucun mot de passe ; son entrée est gérée par le parent.'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-bold text-[#5B6E85] hover:text-[#172B46] flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft size={14} className="rtl-flip" />
                    <span>{isAr ? 'رجوع' : 'Retour'}</span>
                  </button>

                  <button
                    onClick={() => setCurrentStep(3)}
                    className="bg-[#2868C7] hover:bg-[#1E54A3] text-white font-bold text-sm px-7 py-3 rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>{isAr ? 'اختيار العالم المخصص' : isEn ? 'Choose World Theme' : 'Choisir l\'univers'}</span>
                    <ArrowRight size={16} className="rtl-flip" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: THEME SELECTION */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: isAr ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isAr ? -30 : 30 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div className="text-center space-y-1 max-w-xl mx-auto">
                  <span className="text-xs font-bold text-[#2868C7] uppercase tracking-wider">
                    {isAr ? 'الخطوة 3 من 5' : isEn ? 'Step 3 of 5' : 'Étape 3 sur 5'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#172B46]">
                    {isAr ? `اختر كوكب العالم الخاص بـ ${childName}` : isEn ? `Select ${childName}'s World Theme` : `Sélectionnez l'univers de ${childName}`}
                  </h3>
                  <p className="text-xs text-[#5B6E85]">
                    {isAr ? 'كل كوكب يحدد الطابع البصري، نغمات النطق، وأولويات التواصل البديل.' : isEn ? 'Each theme customizes the visual sensory tone and AAC focus.' : 'Chaque monde adapte les couleurs, les sons et les pictogrammes.'}
                  </p>
                </div>

                {/* Theme Selection Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                  {WORLD_THEMES.map((theme) => {
                    const isSelected = selectedThemeId === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setSelectedThemeId(theme.id)}
                        className={`p-5 rounded-3xl border text-start transition-all flex flex-col justify-between gap-4 cursor-pointer relative overflow-hidden ${
                          isSelected
                            ? 'bg-white border-[#2868C7] shadow-xl shadow-[#2868C7]/20 scale-103 ring-2 ring-[#2868C7]'
                            : 'bg-white/80 hover:bg-white border-[#A9C5D8]/40 hover:border-[#2868C7]/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-4xl">{theme.emoji}</span>
                          {isSelected && <CheckCircle2 size={18} className="text-[#2868C7]" />}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-[#172B46]">
                            {isAr ? theme.nameAr : isEn ? theme.nameEn : theme.nameFr}
                          </h4>
                          <p className="text-[11px] text-[#5B6E85] leading-relaxed line-clamp-3">
                            {isAr ? theme.descAr : isEn ? theme.descEn : theme.descFr}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-[#A9C5D8]/20 flex items-center gap-1.5 text-[10px] font-bold" style={{ color: theme.textColor }}>
                          <Orbit size={12} />
                          <span>{isAr ? 'طابع ثلاثي الأبعاد' : 'Environnement 3D'}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between max-w-xl mx-auto pt-2">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-bold text-[#5B6E85] hover:text-[#172B46] flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft size={14} className="rtl-flip" />
                    <span>{isAr ? 'رجوع' : 'Retour'}</span>
                  </button>

                  <button
                    onClick={handleLaunchCreation}
                    className="bg-gradient-to-r from-[#2868C7] to-[#172B46] hover:from-[#1E54A3] hover:to-[#172B46] text-white font-black text-sm px-8 py-3.5 rounded-full shadow-xl shadow-[#2868C7]/25 transition-all flex items-center gap-2.5 cursor-pointer"
                  >
                    <Sparkles size={16} className="text-[#D8BE83]" />
                    <span>{isAr ? 'تكوين العالم الرقمي الآن' : isEn ? 'Generate Child World Now' : 'Générer le monde 3D'}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: REAL-TIME WORLD BIRTH ANIMATION */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12 space-y-6"
              >
                <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: selectedTheme.glowColor }}
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.7, 0.2, 0.7],
                    }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="w-28 h-28 rounded-full flex items-center justify-center text-5xl shadow-2xl border-2 border-white"
                    style={{ background: `linear-gradient(135deg, ${selectedTheme.textColor}, #172B46)` }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  >
                    {selectedTheme.emoji}
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-[#172B46]">
                    {isAr ? `جاري تكوين عالم ${childName} الخاص...` : isEn ? `Instantiating ${childName}'s Personalized World...` : `Création du monde de ${childName}...`}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5B6E85] max-w-md mx-auto">
                    {isAr
                      ? 'تهيئة بطاقات التواصل البديل، عزل البيانات عن الإخوة، وتفعيل قفل الوالدين.'
                      : isEn
                      ? 'Assembling AAC cards, isolating sibling workspace, and applying parental sovereignty.'
                      : 'Configuration des pictogrammes vocaux, isolation des données et verrouillage parental.'}
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 5: ENTER & EXPLORE THE PERSONALIZED CHILD WORLD */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* World Identity Bar */}
                <div className="bg-white/90 p-5 rounded-3xl border border-[#A9C5D8]/40 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-md border border-white text-white" style={{ background: `linear-gradient(135deg, ${selectedTheme.textColor}, #172B46)` }}>
                      {selectedTheme.emoji}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-black text-[#172B46]">{childName} ({childAge} {isAr ? 'سنوات' : 'ans'})</h4>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#2868C7]/15 text-[#2868C7]">
                          {isAr ? selectedTheme.nameAr : isEn ? selectedTheme.nameEn : selectedTheme.nameFr}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#5B6E85]">
                        {isAr ? 'حساب العائلة • عالم مستقل تماماً' : 'Compte Famille • Espace d\'expression cloisonné'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-[#F5F6F3] px-3.5 py-1.5 rounded-xl border border-[#A9C5D8]/40 text-xs font-bold text-[#172B46]">
                    <Lock size={14} className="text-[#D58C7A]" />
                    <span>{isAr ? 'الطفل محمي بقفل الوالدين' : 'Mode Enfant Verrouillé'}</span>
                  </div>
                </div>

                {/* Themed AAC Cards Deck with Vocalization */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#172B46]/70">
                      {isAr ? 'لوحة التواصل الصوتي الفوري (AAC):' : isEn ? 'Live Voice-Synthesized AAC Board:' : 'Bande-phrase et pictogrammes vocaux :'}
                    </span>
                    <span className="text-[11px] text-[#5B6E85] flex items-center gap-1">
                      <Volume2 size={12} className="text-[#2868C7]" />
                      <span>{isAr ? 'انقر على البطاقة لسماع النطق' : 'Touchez pour entendre la voix'}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {selectedTheme.samplePictos.map((picto, idx) => {
                      const isSpeaking = activePictoId === picto.labelFr;
                      return (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => handlePictoSpeech(picto)}
                          className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-2 shadow-xs cursor-pointer ${
                            isSpeaking
                              ? 'bg-[#2868C7] text-white border-[#2868C7] shadow-lg shadow-[#2868C7]/30 scale-103'
                              : 'bg-white hover:bg-[#F5F6F3] text-[#172B46] border-[#A9C5D8]/40'
                          }`}
                        >
                          <span className="text-3xl">{picto.emoji}</span>
                          <span className="text-xs font-bold block">{isAr ? picto.labelAr : isEn ? picto.labelEn : picto.labelFr}</span>
                          <span className="text-[10px] opacity-70 flex items-center gap-1">
                            <Volume2 size={10} />
                            <span>{isSpeaking ? (isAr ? 'جاري النطق...' : 'En écoute...') : (isAr ? 'نطق فوري' : 'Vocaliser')}</span>
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Collaborative Pro & Parent Bridge Demonstration */}
                <div className="bg-[#2868C7]/5 rounded-3xl p-4 border border-[#2868C7]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 text-start">
                    <div className="w-8 h-8 rounded-xl bg-[#2868C7]/20 text-[#2868C7] flex items-center justify-center shrink-0">
                      <Star size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-[#172B46]">
                        {isAr ? 'تنسيق الأخصائي المعتمد (نموذج توضيحي)' : 'Objectif Orthophonie Actif'}
                      </p>
                      <p className="text-[11px] text-[#5B6E85]">
                        {isAr ? 'تمت إضافة 2 بطاقات جديدة بعد جلسة أمس' : '2 nouveaux pictos attribués pour la maison'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentStep(6)}
                    className="bg-[#172B46] hover:bg-[#1E54A3] text-white font-bold px-6 py-2 rounded-full transition-colors cursor-pointer shrink-0"
                  >
                    {isAr ? 'الخطوة 5: شاهد عزل الإخوة' : isEn ? 'Next: Test Sibling Isolation' : 'Voir le cloisonnement frère/sœur'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 6: SIBLING PROFILE ISOLATION DEMONSTRATION */}
            {currentStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: isAr ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isAr ? -30 : 30 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div className="text-center space-y-1 max-w-xl mx-auto">
                  <span className="text-xs font-bold text-[#2868C7] uppercase tracking-wider">
                    {isAr ? 'الخطوة 5 من 5: الخصوصية والعزل' : isEn ? 'Step 5 of 5: Sibling Data Isolation' : 'Étape 5 sur 5 : Cloisonnement strict'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#172B46]">
                    {isAr ? 'التبديل بين عوالم الإخوة بنقرة واحدة' : isEn ? 'Zero Data Leakage Between Sibling Worlds' : 'Bascule instantanée entre enfants'}
                  </h3>
                  <p className="text-xs text-[#5B6E85]">
                    {isAr
                      ? 'لاحظ كيف يحتفظ كل طفل ببيئته، بطاقاته، وتاريخ أخصائيه دون أي تداخل في البيانات.'
                      : isEn
                      ? 'Notice how each child retains distinct AAC cards, themes, and specialist links.'
                      : 'Chaque enfant conserve son univers, son vocabulaire et son spécialiste sans fuite de données.'}
                  </p>
                </div>

                {/* Sibling Switcher Buttons */}
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setActiveSibling('rayan')}
                    className={`px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer border ${
                      activeSibling === 'rayan'
                        ? 'bg-[#2868C7] text-white border-[#2868C7] shadow-lg shadow-[#2868C7]/20 scale-103'
                        : 'bg-white text-[#172B46] border-[#A9C5D8]/40 hover:bg-[#F5F6F3]'
                    }`}
                  >
                    <span>🪐</span>
                    <span>Rayan (5 ans) • {isAr ? 'كوكب الفضاء' : 'Monde Céleste'}</span>
                  </button>

                  <button
                    onClick={() => setActiveSibling('amina')}
                    className={`px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer border ${
                      activeSibling === 'amina'
                        ? 'bg-[#0284C7] text-white border-[#0284C7] shadow-lg shadow-[#0284C7]/20 scale-103'
                        : 'bg-white text-[#172B46] border-[#A9C5D8]/40 hover:bg-[#F5F6F3]'
                    }`}
                  >
                    <span>🌊</span>
                    <span>Amina (4 ans) • {isAr ? 'كوكب البحار' : 'Monde Océan'}</span>
                  </button>
                </div>

                {/* Displaying Active Isolated World Summary */}
                <div className="bg-white/90 p-6 sm:p-8 rounded-3xl border border-[#A9C5D8]/40 shadow-xs max-w-2xl mx-auto space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#A9C5D8]/20">
                    <span className="text-xs font-bold text-[#172B46]">
                      {activeSibling === 'rayan' ? '🪐 Profil Rayan' : '🌊 Profil Amina'}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {isAr ? 'بيانات معزولة 100%' : 'Isolation 100%'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-start text-xs">
                    <div className="p-3 bg-[#F5F6F3] rounded-2xl space-y-1">
                      <span className="text-[10px] text-[#5B6E85] font-bold uppercase">{isAr ? 'الأخصائي المرتبط' : 'Spécialiste Associé'}</span>
                      <p className="font-bold text-[#172B46]">{activeSibling === 'rayan' ? 'Orthophoniste Cabinet 1' : 'Éducatrice Spécialisée 2'}</p>
                    </div>
                    <div className="p-3 bg-[#F5F6F3] rounded-2xl space-y-1">
                      <span className="text-[10px] text-[#5B6E85] font-bold uppercase">{isAr ? 'عدد البطاقات النشطة' : 'Pictos Actifs'}</span>
                      <p className="font-bold text-[#172B46]">{activeSibling === 'rayan' ? '24 pictogrammes' : '18 pictogrammes'}</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#5B6E85] text-center pt-2 italic">
                    {isAr
                      ? 'أخصائي ريان لا يستطيع تقنياً رؤية أي ملف أو نشاط يخص أخته أمينة.'
                      : 'Le spécialiste de Rayan ne peut en aucun cas accéder aux données d\'Amina.'}
                  </p>
                </div>

                <div className="text-center pt-3">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="bg-[#172B46] hover:bg-[#2868C7] text-white font-bold text-xs sm:text-sm px-8 py-3 rounded-full transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    <RotateCcw size={14} />
                    <span>{isAr ? 'إعادة التجربة من البداية' : isEn ? 'Start Demonstration Over' : 'Recommencer la démonstration'}</span>
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
