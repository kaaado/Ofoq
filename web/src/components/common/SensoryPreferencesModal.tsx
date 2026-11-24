import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Sliders,
  Volume2,
  VolumeX,
  Gauge,
  Eye,
  RotateCcw,
  Sparkles,
  ZapOff,
  Mic,
  LayoutGrid,
  Play,
  Check,
  UserCheck,
  Heart
} from 'lucide-react';
import { ModalShell } from './ModalShell';
import { useSensoryPreferences } from '../../context/SensoryPreferencesContext';
import {
  playTactileFeedback,
  speakHumanVoice,
  cancelSpeech,
  getAvailableVoices,
  WARM_VOICE_PROFILES,
  WarmVoiceProfile,
} from '../../services/audioService';

interface SensoryPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReplayHorizon?: () => void;
}

export const SensoryPreferencesModal: React.FC<SensoryPreferencesModalProps> = ({
  isOpen,
  onClose,
  onReplayHorizon,
}) => {
  const { i18n } = useTranslation();
  const {
    preferences,
    effectiveReducedMotion,
    updatePreference,
    resetPreferences,
  } = useSensoryPreferences();

  const currentLang = (i18n.language || 'fr').split('-')[0].toLowerCase() as 'ar' | 'fr' | 'en';
  const isAr = currentLang === 'ar';
  const isEn = currentLang === 'en';

  const quietMode = preferences.quietMode;
  const reducedMotion = preferences.reducedMotion;
  const audioVolume = preferences.volume;
  const speechRate = preferences.speechRate;
  const soundEffects = preferences.soundEnabled;
  const voiceEnabled = preferences.voiceEnabled;
  const visualDensity = preferences.visualDensity;
  const selectedVoiceId = preferences.selectedVoiceURI || 'female-nour';

  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isPlayingTestVoice, setIsPlayingTestVoice] = useState<boolean>(false);
  const [activeTestVoiceId, setActiveTestVoiceId] = useState<string | null>(null);

  // Load available speech voices
  useEffect(() => {
    const voices = getAvailableVoices();
    setAvailableVoices(voices);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const handleVoicesChanged = () => {
        setAvailableVoices(getAvailableVoices());
      };
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
        cancelSpeech();
      };
    }
  }, []);

  const handleTestChime = () => {
    playTactileFeedback('chime', {
      volume: audioVolume,
      soundEnabled: soundEffects,
    });
  };

  const handleTestCelebrate = () => {
    playTactileFeedback('celebrate', {
      volume: audioVolume,
      soundEnabled: soundEffects,
    });
  };

  const handlePreviewVoice = (profile: WarmVoiceProfile) => {
    if (isPlayingTestVoice && activeTestVoiceId === profile.id) {
      cancelSpeech();
      setIsPlayingTestVoice(false);
      setActiveTestVoiceId(null);
      return;
    }

    setIsPlayingTestVoice(true);
    setActiveTestVoiceId(profile.id);

    // Save as active selected voice immediately
    updatePreference('selectedVoiceURI', profile.id);

    // Welcoming, calming, and friendly autism-informed speech preview personalized per persona
    const getFriendlyPhrase = () => {
      const nameOnlyAr = profile.nameAr.split(' ')[0];
      const nameOnlyFr = profile.nameFr.split(' ')[0];
      const nameOnlyEn = profile.nameEn.split(' ')[0];

      if (profile.id === 'female-nour') {
        if (isAr) return `أهلاً بك يا بطل، أنا نور. صوتي هادئ ودافئ لنكون معاً خطوة بخطوة بكل أمان.`;
        if (isEn) return `Welcome, little friend! I'm Nour. My voice is calm and gentle to help you feel safe and comfortable.`;
        return `Bienvenue mon petit ami, je suis Nour. Ma voix est douce et apaisante pour être toujours à tes côtés.`;
      }
      if (profile.id === 'female-maryam') {
        if (isAr) return `مرحباً يا شاطر، أنا مريم! نطقنا واضح وسهل، وسنتعلم كلمات جديدة وممتعة معاً!`;
        if (isEn) return `Hello superstar, I'm Maryam! We will discover clear and joyful words together!`;
        return `Bonjour champion, je suis Maryam ! Découvrons ensemble des mots clairs et joyeux !`;
      }
      if (profile.id === 'female-yasmina') {
        if (isAr) return `أهلاً يا صديقي، أنا ياسمينة! راني هنا معاك باش نلعبو ونعبّرو على كل ما تحب بكل راحة.`;
        if (isEn) return `Hey friend, I'm Yasmine! I'm here with you to explore, play, and express whatever you feel.`;
        return `Coucou l'ami, je suis Yasmine ! Je suis là avec toi pour partager et s'exprimer en toute liberté.`;
      }
      if (profile.id === 'male-tariq') {
        if (isAr) return `مرحباً يا بني، أنا طارق. أنا هنا لأحميك وأمنحك الأمان في كل خطوة تخطوها.`;
        if (isEn) return `Hello there, I'm Tariq. You are safe here, and I'm here to support you with calm reassurance.`;
        return `Bonjour mon grand, je suis Tariq. Tu es en sécurité ici, et je t'accompagne avec calme et bienveillance.`;
      }
      if (profile.id === 'male-karim') {
        if (isAr) return `يا هلا بصاحبي، أنا كريم! هيا نلعب ونكتشف أصواتاً رائعة ونمرح سوياً!`;
        if (isEn) return `Hey buddy, I'm Karim! Let's have fun, explore cool sounds, and play together!`;
        return `Salut mon copain, je suis Karim ! Amusons-nous ensemble à découvrir de chouettes sons !`;
      }
      if (profile.id === 'male-bilal') {
        if (isAr) return `سلام وطمأنينة يا بطل، أنا بلال. خذ نفساً عميقاً، شهيق... وزفير... نحن في أمان وسلام.`;
        if (isEn) return `Peace and calm, dear friend. I'm Bilal. Take a deep breath in... and gently let it go. You are safe.`;
        return `Paix et sérénité. Je suis Bilal. Prends une douce respiration... inspire... et expire calmement.`;
      }

      if (isAr) return `مرحباً، أنا ${nameOnlyAr}، أحدثكم بنبرة صوتية دافئة ومطمئنة في أفق.`;
      if (isEn) return `Hello, I'm ${nameOnlyEn}, speaking with a gentle and warm voice in OFOQ.`;
      return `Bonjour, je suis ${nameOnlyFr}, avec une voix douce et chaleureuse pour OFOQ.`;
    };

    const testPhrase = getFriendlyPhrase();

    speakHumanVoice({
      text: testPhrase,
      lang: currentLang,
      rate: speechRate,
      volume: audioVolume,
      voiceURI: profile.id,
      voiceProfileId: profile.id,
      voiceEnabled: voiceEnabled,
      onStart: () => {
        setIsPlayingTestVoice(true);
        setActiveTestVoiceId(profile.id);
      },
      onEnd: () => {
        setIsPlayingTestVoice(false);
        setActiveTestVoiceId(null);
      },
    });
  };

  const handleTestVoicePlayback = () => {
    const currentProfile = WARM_VOICE_PROFILES.find((p) => p.id === selectedVoiceId) || WARM_VOICE_PROFILES[0];
    handlePreviewVoice(currentProfile);
  };

  const femaleVoices = WARM_VOICE_PROFILES.filter((v) => v.gender === 'female');
  const maleVoices = WARM_VOICE_PROFILES.filter((v) => v.gender === 'male');


  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={
        isAr
          ? 'إعدادات الحواس والراحة'
          : isEn
          ? 'Sensory & Ergonomic Settings'
          : 'Préférences Sensorielles & Confort'
      }
      subtitle={
        isAr
          ? 'تخصيص التجربة البصرية والصوتية والحركية بما يناسب راحتك وحساسيتك الحسية'
          : isEn
          ? 'Tailor visual, auditory, and motion ergonomics to your sensory comfort'
          : 'Ajustez l’ergonomie visuelle, sonore et gestuelle selon votre confort'
      }
      maxWidthClass="max-w-xl"
    >
      <div className="space-y-6 text-start">
        {/* Section 1: Visual & Motion Ergonomics */}
        <div className="space-y-3.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#172B46]/70 flex items-center gap-1.5">
            <Eye size={15} className="text-[#2868C7]" />
            <span>{isAr ? 'الراحة البصرية والحركية' : isEn ? 'Visual & Motion Ergonomics' : 'Confort Visuel & Mouvement'}</span>
          </h3>

          {/* Quiet Mode Card */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F5F6F3] border border-[#172B46]/[0.08] hover:border-[#2868C7]/30 transition-all">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#2868C7] shadow-sm shrink-0 mt-0.5">
                <ZapOff size={18} />
              </div>
              <div>
                <p id="label-quiet-mode" className="text-sm font-bold text-[#172B46]">
                  {isAr ? 'الوضع الهادئ' : isEn ? 'Quiet Mode' : 'Mode Calme'}
                </p>
                <p className="text-xs text-[#5B6E85] mt-0.5 leading-relaxed">
                  {isAr
                    ? 'إلغاء الشفافية والتموجات الضوئية واستبدالها بخلفيات متباينة ثابتة'
                    : isEn
                    ? 'Disables blurs and decorative ambient glows for high-contrast solid surfaces'
                    : 'Désactive transparences et halos pour des surfaces unies nettes'}
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={quietMode}
              aria-labelledby="label-quiet-mode"
              aria-label={isAr ? 'تفعيل الوضع الهادئ' : isEn ? 'Toggle Quiet Mode' : 'Basculer le mode calme'}
              onClick={() => updatePreference('quietMode', !quietMode)}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-ring items-center ${
                quietMode ? 'bg-[#2868C7]' : 'bg-[#A9C5D8]/50'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  quietMode ? (isAr ? '-translate-x-5' : 'translate-x-5') : (isAr ? '-translate-x-0.5' : 'translate-x-0.5')
                }`}
              />
            </button>
          </div>

          {/* Reduced Motion Card */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F5F6F3] border border-[#172B46]/[0.08] hover:border-[#2868C7]/30 transition-all">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#806936] shadow-sm shrink-0 mt-0.5">
                <Sliders size={18} />
              </div>
              <div>
                <p id="label-reduced-motion" className="text-sm font-bold text-[#172B46]">
                  {isAr ? 'تقليل الحركة' : isEn ? 'Reduced Motion' : 'Réduction des Mouvements'}
                </p>
                <p className="text-xs text-[#5B6E85] mt-0.5 leading-relaxed">
                  {isAr
                    ? 'إيقاف حركات الطفو والدوران والانتقالات التفاعلية التلقائية'
                    : isEn
                    ? 'Halts floating tilt effects and non-essential layout animations'
                    : 'Arrête les effets de flottement et transitions superflues'}
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={reducedMotion}
              aria-labelledby="label-reduced-motion"
              aria-label={isAr ? 'تقليل الحركة' : isEn ? 'Toggle Reduced Motion' : 'Basculer la réduction des mouvements'}
              onClick={() => updatePreference('reducedMotion', !reducedMotion)}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-ring items-center ${
                reducedMotion ? 'bg-[#2868C7]' : 'bg-[#A9C5D8]/50'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  reducedMotion ? (isAr ? '-translate-x-5' : 'translate-x-5') : (isAr ? '-translate-x-0.5' : 'translate-x-0.5')
                }`}
              />
            </button>
          </div>

          {/* Visual Density Selector */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F5F6F3] border border-[#172B46]/[0.08] hover:border-[#2868C7]/30 transition-all">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#2868C7] shadow-sm shrink-0 mt-0.5">
                <LayoutGrid size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#172B46]">
                  {isAr ? 'كثافة العرض والمساحات' : isEn ? 'Visual Density & Spacing' : 'Densité Visuelle & Espacement'}
                </p>
                <p className="text-xs text-[#5B6E85] mt-0.5">
                  {isAr
                    ? 'التحكم في المسافات وهوامش التنفس البصري بين العناصر'
                    : isEn
                    ? 'Adjust spacing between interface cards for cognitive comfort'
                    : 'Ajuste les marges et l’espacement cognitif'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-[#172B46]/10 shrink-0">
              <button
                type="button"
                aria-pressed={visualDensity === 'comfortable'}
                onClick={() => updatePreference('visualDensity', 'comfortable')}
                className={`px-3 py-2 min-h-[44px] rounded-lg text-xs font-bold transition-all focus-ring cursor-pointer ${
                  visualDensity === 'comfortable'
                    ? 'bg-[#2868C7] text-white shadow-sm'
                    : 'text-[#5B6E85] hover:text-[#172B46]'
                }`}
              >
                {isAr ? 'مريح' : isEn ? 'Comfortable' : 'Confortable'}
              </button>
              <button
                type="button"
                aria-pressed={visualDensity === 'spacious'}
                onClick={() => updatePreference('visualDensity', 'spacious')}
                className={`px-3 py-2 min-h-[44px] rounded-lg text-xs font-bold transition-all focus-ring cursor-pointer ${
                  visualDensity === 'spacious'
                    ? 'bg-[#2868C7] text-white shadow-sm'
                    : 'text-[#5B6E85] hover:text-[#172B46]'
                }`}
              >
                {isAr ? 'واسع' : isEn ? 'Spacious' : 'Spacieux'}
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Audio & Voice Controls */}
        <div className="space-y-3.5 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#172B46]/70 flex items-center gap-1.5">
              <Volume2 size={15} className="text-[#9E4E3D]" />
              <span>{isAr ? 'إعدادات الصوت والنطق والذكاء الاصطناعي' : isEn ? 'Audio, Speech & AI Controls' : 'Audio, Voix & IA'}</span>
            </h3>

            {/* Quick Test Audio Button (>= 48px target) */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleTestChime}
                disabled={!soundEffects || audioVolume <= 0}
                className="inline-flex items-center gap-1 min-h-[40px] px-2.5 py-1.5 text-xs font-bold text-[#2868C7] bg-[#2868C7]/10 hover:bg-[#2868C7]/20 rounded-xl transition-all disabled:opacity-40 cursor-pointer focus-ring"
                title={isAr ? 'تجربة نغمة الجرس الهادئة' : 'Test calm chime'}
              >
                <Sparkles size={12} />
                <span>{isAr ? 'نغمة' : 'Chime'}</span>
              </button>
              <button
                type="button"
                onClick={handleTestCelebrate}
                disabled={!soundEffects || audioVolume <= 0}
                className="inline-flex items-center gap-1 min-h-[40px] px-2.5 py-1.5 text-xs font-bold text-[#806936] bg-[#D8BE83]/20 hover:bg-[#D8BE83]/30 rounded-xl transition-all disabled:opacity-40 cursor-pointer focus-ring"
                title={isAr ? 'تجربة نغمة التشجيع' : 'Test celebration chime'}
              >
                <Check size={12} />
                <span>{isAr ? 'تشجيع' : 'Praise'}</span>
              </button>
            </div>
          </div>

          {/* Master Volume Slider */}
          <div className="p-3.5 rounded-2xl bg-[#F5F6F3] border border-[#172B46]/[0.08] space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#172B46]">
              <span className="flex items-center gap-1.5">
                {audioVolume === 0 ? <VolumeX size={16} className="text-[#BA3C3C]" /> : <Volume2 size={16} />}
                <span>{isAr ? 'مستوى الصوت العام' : isEn ? 'Master Volume' : 'Volume Principal'}</span>
              </span>
              <span className="font-mono text-[#2868C7]">{Math.round(audioVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={audioVolume}
              onChange={(e) => updatePreference('volume', parseFloat(e.target.value))}
              className="w-full h-2.5 bg-[#A9C5D8]/40 rounded-lg appearance-none cursor-pointer accent-[#2868C7] focus-ring"
              aria-label={isAr ? 'مستوى الصوت العام' : isEn ? 'Master Volume' : 'Volume Principal'}
            />
          </div>

          {/* Speech Rate Slider & Voice Test Button */}
          <div className="p-3.5 rounded-2xl bg-[#F5F6F3] border border-[#172B46]/[0.08] space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#172B46]">
              <span className="flex items-center gap-1.5">
                <Gauge size={16} className="text-[#2868C7]" />
                <span>{isAr ? 'سرعة نطق الكلمات والتواصل المعزز' : isEn ? 'Speech & AAC Rate' : 'Vitesse Vocale & CAA'}</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[#2868C7]">{speechRate.toFixed(2)}x</span>
                <button
                  type="button"
                  onClick={handleTestVoicePlayback}
                  disabled={!voiceEnabled || audioVolume <= 0}
                  className="inline-flex items-center gap-1 px-2.5 py-1 min-h-[36px] rounded-lg text-xs font-bold text-white bg-[#2868C7] hover:bg-[#1C3556] transition-all disabled:opacity-40 cursor-pointer focus-ring"
                >
                  <Play size={12} className={isPlayingTestVoice ? 'animate-pulse text-[#D8BE83]' : ''} />
                  <span>{isPlayingTestVoice ? (isAr ? 'جاري الاختبار...' : 'Testing...') : (isAr ? 'تجربة النطق' : 'Test Voice')}</span>
                </button>
              </div>
            </div>
            <input
              type="range"
              min="0.75"
              max="1.15"
              step="0.05"
              value={speechRate}
              onChange={(e) => updatePreference('speechRate', parseFloat(e.target.value))}
              className="w-full h-2.5 bg-[#A9C5D8]/40 rounded-lg appearance-none cursor-pointer accent-[#2868C7] focus-ring"
              aria-label={isAr ? 'سرعة النطق' : isEn ? 'Speech Rate' : 'Vitesse Vocale'}
            />
            <div className="flex justify-between text-[11px] text-[#5B6E85]">
              <span>{isAr ? 'أهدأ وأبطأ (0.75x)' : 'Slower (0.75x)'}</span>
              <span>{isAr ? 'طبيعي (0.92x)' : 'Normal (0.92x)'}</span>
              <span>{isAr ? 'أسرع (1.15x)' : 'Faster (1.15x)'}</span>
            </div>
          </div>

          {/* CURATED WARM HUMAN VOICE SELECTOR (3 Female + 3 Male) */}
          <div className="p-4 sm:p-5 rounded-3xl bg-[#F5F6F3] border border-[#172B46]/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#D8BE83]/20 text-[#806936] flex items-center justify-center font-bold">
                  <UserCheck size={16} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#172B46]">
                    {isAr
                      ? 'اختيار نبرة الصوت الدافئ (3 خيارات مطمئنة)'
                      : isEn
                      ? 'Warm Human Speech Selection (3 Female • 3 Male)'
                      : 'Sélection Voix Chaleureuse (3 Femmes • 3 Hommes)'}
                  </h4>
                  <p className="text-[11px] text-[#5B6E85]">
                    {isAr
                      ? 'أصوات طبيعية رصينة ومريحة حسياً للطفل مع تمارين التنفس والتواصل'
                      : 'Selected voice applies across AAC cards, Nour companion, and clinical audio'}
                  </p>
                </div>
              </div>
            </div>

            {/* 3 Female Voices (Displayed in FR and EN where dedicated female OS/neural voices exist) */}
            {!isAr && (
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#9E4E3D] flex items-center gap-1">
                  <Heart size={12} />
                  <span>Warm & Maternal Voices (3 Female)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {femaleVoices.map((voice) => {
                    const isSelected = selectedVoiceId === voice.id;
                    const isPlayingThis = isPlayingTestVoice && activeTestVoiceId === voice.id;
                    const name = isEn ? voice.nameEn : voice.nameFr;
                    const desc = isEn ? voice.descriptionEn : voice.descriptionFr;

                    return (
                      <div
                        key={voice.id}
                        onClick={() => handlePreviewVoice(voice)}
                        className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between text-start relative group ${
                          isSelected
                            ? 'bg-white border-[#2868C7] shadow-sm'
                            : 'bg-white/70 border-[#172B46]/10 hover:border-[#2868C7]/40'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#172B46]">{name}</span>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-[#2868C7] text-white flex items-center justify-center shrink-0">
                                <Check size={12} />
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-[#5B6E85] leading-relaxed line-clamp-2">
                            {desc}
                          </p>
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#9E4E3D] bg-[#D58C7A]/15 px-2 py-0.5 rounded-full">
                            Female
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePreviewVoice(voice);
                            }}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                              isPlayingThis
                                ? 'bg-[#2868C7] text-white'
                                : 'bg-[#172B46]/5 hover:bg-[#172B46]/10 text-[#172B46]'
                            }`}
                          >
                            <Play size={10} className={isPlayingThis ? 'animate-pulse text-[#D8BE83]' : ''} />
                            <span>{isPlayingThis ? 'Playing' : 'Preview'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3 Male Voices */}
            <div className="space-y-2 pt-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#2868C7] flex items-center gap-1">
                <UserCheck size={12} />
                <span>{isAr ? 'نبرات صوتية مطمئنة ومريحة حسياً (3 خيارات)' : 'Reassuring & Calm Voices (3 Male)'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {maleVoices.map((voice) => {
                  const isSelected = selectedVoiceId === voice.id;
                  const isPlayingThis = isPlayingTestVoice && activeTestVoiceId === voice.id;
                  const name = isAr ? voice.nameAr : isEn ? voice.nameEn : voice.nameFr;
                  const desc = isAr ? voice.descriptionAr : isEn ? voice.descriptionEn : voice.descriptionFr;

                  return (
                    <div
                      key={voice.id}
                      onClick={() => handlePreviewVoice(voice)}
                      className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between text-start relative group ${
                        isSelected
                          ? 'bg-white border-[#2868C7] shadow-sm'
                          : 'bg-white/70 border-[#172B46]/10 hover:border-[#2868C7]/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#172B46]">{name}</span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-[#2868C7] text-white flex items-center justify-center shrink-0">
                              <Check size={12} />
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-[#5B6E85] leading-relaxed line-clamp-2">
                          {desc}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#2868C7] bg-[#2868C7]/15 px-2 py-0.5 rounded-full">
                          {isAr ? 'ذكر' : 'Male'}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePreviewVoice(voice);
                          }}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                            isPlayingThis
                              ? 'bg-[#2868C7] text-white'
                              : 'bg-[#172B46]/5 hover:bg-[#172B46]/10 text-[#172B46]'
                          }`}
                        >
                          <Play size={10} className={isPlayingThis ? 'animate-pulse text-[#D8BE83]' : ''} />
                          <span>{isPlayingThis ? (isAr ? 'استماع...' : 'Playing') : (isAr ? 'استماع' : 'Preview')}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>


          {/* Speech Voice Synthesis Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F5F6F3] border border-[#172B46]/[0.08] hover:border-[#2868C7]/30 transition-all">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#2868C7] shadow-sm shrink-0 mt-0.5">
                <Mic size={18} />
              </div>
              <div>
                <p id="label-voice-enabled" className="text-sm font-bold text-[#172B46]">
                  {isAr ? 'النطق الصوتي التلقائي والرفيق نور' : isEn ? 'Voice Playback & AI Companion' : 'Synthèse Vocale & Compagnon IA'}
                </p>
                <p className="text-xs text-[#5B6E85] mt-0.5">
                  {isAr
                    ? 'نطق بطاقات التواصل المعزز وصوت الرفيق الافتراضي نور وتوجيهات الأخصائي'
                    : isEn
                    ? 'Speaks pictogram cards, companion Nour phrases, and clinical guidance aloud'
                    : 'Prononce les pictogrammes CAA et la voix du compagnon Nour'}
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={voiceEnabled}
              aria-labelledby="label-voice-enabled"
              aria-label={isAr ? 'تفعيل النطق الصوتي' : isEn ? 'Toggle Voice Audio' : 'Basculer la synthèse vocale'}
              onClick={() => updatePreference('voiceEnabled', !voiceEnabled)}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-ring items-center ${
                voiceEnabled ? 'bg-[#2868C7]' : 'bg-[#A9C5D8]/50'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  voiceEnabled ? (isAr ? '-translate-x-5' : 'translate-x-5') : (isAr ? '-translate-x-0.5' : 'translate-x-0.5')
                }`}
              />
            </button>
          </div>

          {/* Sound Effects Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F5F6F3] border border-[#172B46]/[0.08] hover:border-[#2868C7]/30 transition-all">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#9E4E3D] shadow-sm shrink-0 mt-0.5">
                <Volume2 size={18} />
              </div>
              <div>
                <p id="label-sound-fx" className="text-sm font-bold text-[#172B46]">
                  {isAr ? 'المؤثرات الصوتية التفاعلية' : isEn ? 'Interactive Sound FX' : 'Effets Sonores UI'}
                </p>
                <p className="text-xs text-[#5B6E85] mt-0.5">
                  {isAr
                    ? 'أصوات خفيفة منخفضة التردد لتأكيد النقر والتفاعل بدون إزعاج'
                    : isEn
                    ? 'Calm, low-pass sensory feedback clicks for interactions'
                    : 'Retours sonores doux et apaisants aux clics'}
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={soundEffects}
              aria-labelledby="label-sound-fx"
              aria-label={isAr ? 'تفعيل المؤثرات الصوتية' : isEn ? 'Toggle Sound Effects' : 'Basculer les effets sonores'}
              onClick={() => updatePreference('soundEnabled', !soundEffects)}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-ring items-center ${
                soundEffects ? 'bg-[#2868C7]' : 'bg-[#A9C5D8]/50'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  soundEffects ? (isAr ? '-translate-x-5' : 'translate-x-5') : (isAr ? '-translate-x-0.5' : 'translate-x-0.5')
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer Actions: Replay Horizon & Reset Defaults (>= 48px hit areas) */}
        <div className="pt-4 border-t border-[#172B46]/[0.08] flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={resetPreferences}
            className="inline-flex items-center gap-2 min-h-[48px] px-3 py-2 text-xs font-semibold text-[#5B6E85] hover:text-[#BA3C3C] transition-colors rounded-xl focus-ring cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>{isAr ? 'استعادة الافتراضيات' : isEn ? 'Reset Defaults' : 'Rétablir par défaut'}</span>
          </button>

          {onReplayHorizon && (
            <div className="relative">
              <button
                type="button"
                disabled={effectiveReducedMotion}
                onClick={() => {
                  onClose();
                  onReplayHorizon();
                }}
                className={`inline-flex items-center gap-1.5 min-h-[48px] px-4 py-2.5 rounded-xl text-xs font-bold transition-all focus-ring ${
                  effectiveReducedMotion
                    ? 'opacity-50 cursor-not-allowed bg-black/5 text-[#5B6E85]'
                    : 'text-[#2868C7] hover:text-[#172B46] bg-[#2868C7]/10 hover:bg-[#2868C7]/20 cursor-pointer'
                }`}
                title={
                  effectiveReducedMotion
                    ? isAr
                      ? 'تم تعطيل الافتتاحية لأن وضع تقليل الحركة مفعّل'
                      : isEn
                      ? 'Horizon replay disabled while Reduced Motion is active'
                      : 'Horizon désactivé lorsque la réduction de mouvement est active'
                    : undefined
                }
              >
                <Sparkles size={14} className="text-[#806936]" />
                <span>{isAr ? 'عرض افتتاحية الأفق' : isEn ? 'Replay Horizon' : 'Revoir l’Horizon'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </ModalShell>
  );
};

