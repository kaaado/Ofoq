import React, { useState, useEffect, Suspense, lazy } from 'react';
import {
  Bot,
  Sparkles,
  Volume2,
  Heart,
  Smile,
  ShieldCheck,
} from 'lucide-react';
import { ThemeKey } from './types';
import { playTactileFeedback, speakHumanVoice, cancelSpeech } from '../../services/audioService';
import { useSensoryPreferences } from '../../context/SensoryPreferencesContext';

const Nour3DCanvas = lazy(() =>
  import('../3d/Nour3DCanvas').then((m) => ({ default: m.Nour3DCanvas }))
);

interface NourCompanionCardProps {
  childName: string;
  theme?: ThemeKey;
  lang: 'ar' | 'fr' | 'en';
}

export const NourCompanionCard: React.FC<NourCompanionCardProps> = ({
  childName,
  theme = 'space',
  lang,
}) => {
  const { preferences, effectiveReducedMotion } = useSensoryPreferences();
  const isAr = lang === 'ar';
  const isEn = lang === 'en';

  const [activeMood, setActiveMood] = useState<'idle' | 'greeting' | 'calm' | 'talking'>('idle');
  const [speechBubble, setSpeechBubble] = useState<string>(() =>
    isAr
      ? `مرحباً يا ${childName}! أنا نور، رفيقك في الكلام والمرح.`
      : isEn
      ? `Hello ${childName}! I'm Nour, your friendly speech buddy.`
      : `Bonjour ${childName} ! Je suis Nour, ton compagnon d'éveil.`
  );

  // Sync speech bubble when childName or language changes
  useEffect(() => {
    setSpeechBubble(
      isAr
        ? `مرحباً يا ${childName}! أنا نور، رفيقك في الكلام والمرح.`
        : isEn
        ? `Hello ${childName}! I'm Nour, your friendly speech buddy.`
        : `Bonjour ${childName} ! Je suis Nour, ton compagnon d'éveil.`
    );
  }, [childName, lang, isAr, isEn]);

  // Safety speech cleanup on unmount
  useEffect(() => {
    return () => {
      cancelSpeech();
    };
  }, []);

  const handleTriggerMood = (mood: 'greeting' | 'calm' | 'talking') => {
    setActiveMood(mood);
    playTactileFeedback('chime', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });

    let message = '';
    if (mood === 'greeting') {
      message = isAr
        ? `صباح الخير يا بطل ${childName}! جاهز للعب اليوم؟`
        : isEn
        ? `Good day ${childName}! Ready to practice together?`
        : `Bonjour ${childName} ! Prêt pour une belle journée de découvertes ?`;
    } else if (mood === 'calm') {
      message = isAr
        ? `خذ نفساً عميقاً يا ${childName}... شهيق وزفير، بهدوء.`
        : isEn
        ? `Take a calm deep breath, in and out, gently.`
        : `Respire doucement ${childName}... inspire et expire calmement.`;
    } else {
      message = isAr
        ? `أنت رائع يا ${childName}! كل كلمة تنطقها خطوة إلى الأمام.`
        : isEn
        ? `You are doing great ${childName}! Every word is progress.`
        : `Bravo ${childName} ! Chaque nouveau mot est une victoire.`;
    }

    setSpeechBubble(message);

    speakHumanVoice({
      text: message,
      lang,
      rate: preferences.speechRate,
      volume: preferences.volume,
      voiceURI: preferences.selectedVoiceURI,
      voiceEnabled: preferences.voiceEnabled,
      onStart: () => setActiveMood('talking'),
      onEnd: () => setActiveMood('idle'),
    });
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#172B46]/10 shadow-sm space-y-4 text-start">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#2868C7]/15 text-[#2868C7] flex items-center justify-center font-bold">
            <Bot size={18} />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#172B46]">
              {isAr ? 'الرفيق الافتراضي نور (3D)' : isEn ? 'Virtual Companion Nour' : 'Compagnon Virtuel Nour'}
            </h3>
            <p className="text-[11px] text-[#5B6E85]">
              {isAr ? 'تحفيز المحاكاة الصوتية والتواصل الهادئ' : 'Gentle phonation & emotional calming'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8BE83]/15 text-[#806936] text-[11px] font-bold shrink-0">
          <Sparkles size={13} />
          <span>{isAr ? 'تفاعل آمن' : 'Safe AI'}</span>
        </div>
      </div>

      {/* 3D Canvas Box or Static Fallback */}
      <div className="relative w-full h-56 sm:h-64 rounded-2xl bg-gradient-to-b from-[#172B46] to-[#1C3556] overflow-hidden flex items-center justify-center border border-white/10 shadow-inner">
        {effectiveReducedMotion ? (
          <div className="flex flex-col items-center justify-center text-center p-4 space-y-2">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-[#D8BE83]">
              <Bot size={32} />
            </div>
            <p className="text-xs font-bold text-white">
              {isAr ? 'الرفيق نور (وضع تقليل الحركة)' : 'Companion Nour (Calm Mode)'}
            </p>
          </div>
        ) : (
          <Suspense
            fallback={
              <div className="flex items-center justify-center text-[#A9C5D8] text-xs">
                <span>{isAr ? 'جاري استدعاء نور...' : 'Loading Nour...'}</span>
              </div>
            }
          >
            <Nour3DCanvas
              mode={activeMood}
              theme={theme}
              isAr={isAr}
              lang={lang}
              onClickCompanion={() => handleTriggerMood('greeting')}
            />
          </Suspense>
        )}

        {/* Speech Bubble Overlay */}
        {speechBubble && (
          <div
            aria-live="polite"
            className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-[#172B46]/10 shadow-md text-xs font-semibold text-[#172B46] leading-relaxed select-none"
          >
            {speechBubble}
          </div>
        )}
      </div>

      {/* Quick Interaction Buttons (>= 48px hit boxes) */}
      <div
        role="group"
        aria-label={isAr ? 'أزرار التفاعل مع الرفيق نور' : 'Interaction buttons with companion Nour'}
        className="grid grid-cols-3 gap-2"
      >
        <button
          type="button"
          onClick={() => handleTriggerMood('greeting')}
          aria-pressed={activeMood === 'greeting'}
          className="p-2.5 min-h-[48px] rounded-xl bg-[#F5F6F3] border border-[#172B46]/10 hover:border-[#2868C7]/30 text-xs font-bold text-[#172B46] flex items-center justify-center gap-1.5 transition-all cursor-pointer focus-ring"
        >
          <Smile size={14} className="text-[#2868C7]" />
          <span>{isAr ? 'تحية' : isEn ? 'Greet' : 'Saluer'}</span>
        </button>

        <button
          type="button"
          onClick={() => handleTriggerMood('calm')}
          aria-pressed={activeMood === 'calm'}
          className="p-2.5 min-h-[48px] rounded-xl bg-[#F5F6F3] border border-[#172B46]/10 hover:border-[#2D7A58]/30 text-xs font-bold text-[#172B46] flex items-center justify-center gap-1.5 transition-all cursor-pointer focus-ring"
        >
          <Heart size={14} className="text-[#9E4E3D]" />
          <span>{isAr ? 'تهدئة' : isEn ? 'Calm' : 'Apaiser'}</span>
        </button>

        <button
          type="button"
          onClick={() => handleTriggerMood('talking')}
          aria-pressed={activeMood === 'talking'}
          className="p-2.5 min-h-[48px] rounded-xl bg-[#F5F6F3] border border-[#172B46]/10 hover:border-[#806936]/30 text-xs font-bold text-[#172B46] flex items-center justify-center gap-1.5 transition-all cursor-pointer focus-ring"
        >
          <Volume2 size={14} className="text-[#806936]" />
          <span>{isAr ? 'تشجيع' : isEn ? 'Praise' : 'Encourager'}</span>
        </button>
      </div>

      {/* Non-Diagnostic Disclaimer */}
      <p className="text-[10px] text-[#5B6E85] leading-relaxed border-t border-[#172B46]/[0.08] pt-2">
        {isAr
          ? 'نور رفيق تفاعلي تحفيزي لتشجيع النطق والهدوء، وليس معالجاً أو مشخّصاً طبياً.'
          : isEn
          ? 'Nour is an interactive companion for motivation and calming, not a clinical diagnostic system.'
          : 'Nour est un compagnon interactif de stimulation vocale et d\'apaisement, sans portée diagnostique.'}
      </p>
    </div>
  );
};
