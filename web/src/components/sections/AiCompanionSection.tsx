import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Volume2,
  ShieldCheck,
  Lock,
  Heart,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  Smile,
  Zap,
  RotateCcw
} from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

export const AiCompanionSection: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'fr';
  const isAr = currentLang === 'ar';
  const isEn = currentLang === 'en';

  // Interactive Avatar Reaction State
  const [mood, setMood] = useState<'happy' | 'encouraging' | 'calm'>('happy');
  const [speechBubbleText, setSpeechBubbleText] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const getGreeting = () => {
    if (mood === 'happy') {
      return isAr
        ? 'مرحباً يا بطل! أنا "نور"، رفيقك المساعد في التعبير واكتشاف الكلمات.'
        : isEn
        ? 'Hello explorer! I am Noor, your friendly guide for words and daily expressions.'
        : 'Bonjour champion ! Je suis Noor, ton compagnon bienveillant pour apprendre et exprimer tes besoins.';
    }
    if (mood === 'encouraging') {
      return isAr
        ? 'أحسنت محاولة النطق! كل خطوة صغيرة هي إنجاز كبير نحتفل به معاً.'
        : isEn
        ? 'Great pronunciation practice! Every small word is a wonderful victory.'
        : 'Bravo pour cet essai de prononciation ! Chaque petit mot compte et nous progressons ensemble.';
    }
    return isAr
      ? 'دعنا نأخذ نفساً هادئاً وعميقاً... البيئة هنا آمنة ومريحة دائماً.'
      : isEn
      ? 'Let\'s take a gentle, deep breath... You are safe and can learn at your own pace.'
      : 'Prenons une profonde inspiration douce... Tu es en sécurité et à ton propre rythme.';
  };

  const handleSpeak = () => {
    const text = getGreeting();
    setSpeechBubbleText(text);
    setIsSpeaking(true);

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = isAr ? 'ar-SA' : isEn ? 'en-US' : 'fr-FR';
      utterance.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      utterance.onend = () => setIsSpeaking(false);
    } else {
      setTimeout(() => setIsSpeaking(false), 2000);
    }
  };

  return (
    <section id="ai-companion" className="py-24 max-w-[1440px] mx-auto px-4 sm:px-8 scroll-mt-24 relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 end-10 w-96 h-96 bg-[#2868C7]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 start-10 w-80 h-80 bg-[#D8BE83]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <ScrollReveal>
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#2868C7]/10 text-[#2868C7] px-4 py-1.5 rounded-full border border-[#2868C7]/20 text-xs font-extrabold uppercase tracking-wider shadow-xs">
            <Sparkles size={14} className="text-[#2868C7]" />
            <span>
              {isAr
                ? 'مساعد أفق الذكي • مفهوم ثلاثي الأبعاد تحت رقابة الوالدين'
                : isEn
                ? 'OFOQ AI Companion • Conceptual 3D Supervised Avatar'
                : 'Compagnon IA d\'OFOQ • Avatar 3D Pédagogique Supervisé'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-black text-[#172B46] tracking-tight leading-tight">
            {isAr
              ? 'رفيق ودود، صبور، وخالٍ تماماً من أي طابع طبي'
              : isEn
              ? 'A gentle, patient companion designed strictly for pedagogical support'
              : 'Un compagnon bienveillant, patient et rigoureusement non-médical'}
          </h2>

          <p className="text-base sm:text-lg text-[#5B6E85] leading-relaxed">
            {isAr
              ? 'تعرّف على "نور" (نموذج توضيحي): مساعد بصري وتفاعلي لطيف يرافق الطفل في عالمه الخاص، يشجعه على نطق الكلمات، تحت رقابة أبوية مطلقة وبدون أي تشخيص طبي.'
              : isEn
              ? 'Meet "Noor" (conceptual preview): an expressive 3D guide inside the Child World encouraging speech stimulation and confidence under full parental supervision.'
              : 'Découvrez "Noor" (prototype conceptuel) : un guide 3D rassurant qui stimule l\'expression vocale et l\'autonomie sous le contrôle permanent des parents.'}
          </p>
        </div>
      </ScrollReveal>

      {/* Main Interactive Showcase Grid */}
      <div className="glass-royal-card rounded-[40px] p-6 sm:p-12 border border-[#2868C7]/30 shadow-2xl relative overflow-hidden">
        
        {/* Strict Ethical Safety Watermark */}
        <div className="flex items-center justify-between pb-6 border-b border-[#A9C5D8]/30 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#2868C7]" />
            <span className="text-xs font-bold text-[#172B46]">
              {isAr
                ? 'إطار الأمان الأخلاقي: غير طبي • بدون تشخيص • رقابة أبوية تامة'
                : isEn
                ? 'Ethical Framework: Non-clinical • No diagnosis • Parent-controlled'
                : 'Cadre Éthique : Non-médical • Sans diagnostic • Contrôle parental strict'}
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#D58C7A] bg-[#D58C7A]/10 px-3 py-1 rounded-full border border-[#D58C7A]/30">
            {isAr ? 'نموذج محاكاة تجريبي' : 'Prototype Conceptuel'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 items-center">
          
          {/* Interactive 3D Avatar Stage (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center relative py-6">
            
            {/* Glowing Celestial Halo */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.25, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-[#2868C7]/30 via-[#D8BE83]/20 to-transparent blur-2xl"
            />

            {/* The 3D Avatar Body ("Noor") */}
            <motion.div
              animate={{
                y: [-8, 8, -8],
                rotateZ: isSpeaking ? [-2, 2, -2] : 0,
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-[#2868C7] via-[#4A85DD] to-[#172B46] shadow-2xl border-4 border-white/80 flex flex-col items-center justify-center text-white cursor-pointer group"
              onClick={handleSpeak}
            >
              {/* Volumetric Specular Sphere Glow */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.7),transparent_55%)] pointer-events-none" />

              {/* Expressive Eyes */}
              <div className="flex items-center gap-6 mb-3">
                <motion.div
                  animate={{ scaleY: isSpeaking ? [1, 0.2, 1] : 1 }}
                  transition={{ duration: 0.3, repeat: isSpeaking ? Infinity : 0, repeatDelay: 1.5 }}
                  className="w-4 h-6 rounded-full bg-white shadow-xs"
                />
                <motion.div
                  animate={{ scaleY: isSpeaking ? [1, 0.2, 1] : 1 }}
                  transition={{ duration: 0.3, repeat: isSpeaking ? Infinity : 0, repeatDelay: 1.5 }}
                  className="w-4 h-6 rounded-full bg-white shadow-xs"
                />
              </div>

              {/* Cheerful Mouth */}
              <div className="w-8 h-4 rounded-b-full border-b-3 border-white/90" />

              {/* Floating Little Star Antenna */}
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-3 w-8 h-8 rounded-full bg-[#D8BE83] shadow-md flex items-center justify-center text-xs text-[#172B46] font-bold border border-white"
              >
                ⭐
              </motion.div>

              {/* Floating Badge */}
              <span className="absolute -bottom-3 text-[11px] font-extrabold bg-[#172B46] text-[#D8BE83] px-3.5 py-1 rounded-full border border-white/40 shadow-md">
                {isAr ? 'نور • رفيق أفق' : 'Noor • Compagnon'}
              </span>
            </motion.div>

            <div className="pt-8 text-center space-y-1">
              <button
                onClick={handleSpeak}
                className="bg-[#2868C7] hover:bg-[#1E54A3] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <Volume2 size={14} className={isSpeaking ? 'animate-pulse text-[#D8BE83]' : ''} />
                <span>{isAr ? 'استمع لحديث نور' : isEn ? 'Listen to Noor Speak' : 'Faire parler Noor'}</span>
              </button>
              <p className="text-[10px] text-[#5B6E85] pt-1">
                {isAr ? 'انقر على الشخصية للتحدث بصوت فوري' : 'Cliquez sur l\'avatar pour déclencher la voix'}
              </p>
            </div>
          </div>

          {/* Interactive Companion Capabilities & Reaction Console (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Dynamic Speech Bubble */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-[#2868C7]/20 shadow-sm space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#2868C7] uppercase tracking-wider flex items-center gap-1.5">
                  <MessageCircle size={14} />
                  <span>{isAr ? 'رسالة الرفيق التفاعلية:' : 'Parole du Compagnon :'}</span>
                </span>
                {isSpeaking && (
                  <span className="text-[10px] font-bold text-[#D8BE83] bg-[#172B46] px-2 py-0.5 rounded-full animate-pulse">
                    {isAr ? 'صوت نشط' : 'Audio en cours'}
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-base font-medium text-[#172B46] leading-relaxed">
                "{speechBubbleText || getGreeting()}"
              </p>
            </div>

            {/* Mood & Interaction Controller */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#172B46]/70 uppercase tracking-wider block">
                {isAr ? 'جرّب مواقف الرفيق التفاعلية:' : 'Tester les modes du compagnon :'}
              </span>
              <div className="flex gap-2.5 flex-wrap">
                <button
                  onClick={() => {
                    setMood('happy');
                    setSpeechBubbleText(null);
                  }}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                    mood === 'happy'
                      ? 'bg-[#2868C7] text-white border-[#2868C7] shadow-sm'
                      : 'bg-white text-[#172B46] border-[#A9C5D8]/40 hover:bg-[#F5F6F3]'
                  }`}
                >
                  <span>👋</span>
                  <span>{isAr ? 'ترحيب واستكشاف' : 'Accueil & Découverte'}</span>
                </button>

                <button
                  onClick={() => {
                    setMood('encouraging');
                    setSpeechBubbleText(null);
                  }}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                    mood === 'encouraging'
                      ? 'bg-[#2868C7] text-white border-[#2868C7] shadow-sm'
                      : 'bg-white text-[#172B46] border-[#A9C5D8]/40 hover:bg-[#F5F6F3]'
                  }`}
                >
                  <span>⭐</span>
                  <span>{isAr ? 'تشجيع النطق' : 'Encouragement Vocal'}</span>
                </button>

                <button
                  onClick={() => {
                    setMood('calm');
                    setSpeechBubbleText(null);
                  }}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                    mood === 'calm'
                      ? 'bg-[#2868C7] text-white border-[#2868C7] shadow-sm'
                      : 'bg-white text-[#172B46] border-[#A9C5D8]/40 hover:bg-[#F5F6F3]'
                  }`}
                >
                  <span>🌸</span>
                  <span>{isAr ? 'تهدئة حسية' : 'Apaisement Sensoriel'}</span>
                </button>
              </div>
            </div>

            {/* 3 Non-Negotiable AI Safety Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/80 p-4 rounded-2xl border border-[#A9C5D8]/30 space-y-1 text-start">
                <span className="text-[11px] font-bold text-[#172B46] flex items-center gap-1">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  {isAr ? 'مساعد غير طبي' : 'Non-Médical'}
                </span>
                <p className="text-[10px] text-[#5B6E85] leading-normal">
                  {isAr ? 'لا يقدم أي تشخيص أو علاج أو تقييم سريري.' : 'Aucun diagnostic, prescription ou évaluation clinique.'}
                </p>
              </div>

              <div className="bg-white/80 p-4 rounded-2xl border border-[#A9C5D8]/30 space-y-1 text-start">
                <span className="text-[11px] font-bold text-[#172B46] flex items-center gap-1">
                  <Lock size={13} className="text-[#2868C7]" />
                  {isAr ? 'تحت رقابة الوالدين' : 'Supervision Totale'}
                </span>
                <p className="text-[10px] text-[#5B6E85] leading-normal">
                  {isAr ? 'يمكن للأولياء تفعيل أو إلغاء الرفيق فوراً.' : 'Activation et désactivation instantanées par le parent.'}
                </p>
              </div>

              <div className="bg-white/80 p-4 rounded-2xl border border-[#A9C5D8]/30 space-y-1 text-start">
                <span className="text-[11px] font-bold text-[#172B46] flex items-center gap-1">
                  <ShieldCheck size={13} className="text-[#D58C7A]" />
                  {isAr ? 'عزل خصوصية الطفل' : 'Données Isolées'}
                </span>
                <p className="text-[10px] text-[#5B6E85] leading-normal">
                  {isAr ? 'ذاكرة الرفيق محصورة فقط داخل عالم الطفل الواحد.' : 'Mémoire isolée strictement confinée au profil de l\'enfant.'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
