import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  RotateCcw,
  Sparkles,
  Droplets,
  Apple,
  Headphones,
  HelpCircle,
  Coffee,
  Heart,
  Utensils,
  Sun,
  Boxes,
  Layers,
  Palette,
  Moon,
  Bath,
  Footprints,
  Wind,
  ShieldCheck,
  Smile,
  BookOpen,
  Trophy,
  X,
  Play,
  Square
} from 'lucide-react';
import { PictoCard, ThemeConfig } from './types';
import { playTactileFeedback, speakHumanVoice, cancelSpeech, DARIJA_PICTO_SPOKEN } from '../../services/audioService';
import { useSensoryPreferences } from '../../context/SensoryPreferencesContext';

interface AacGridProps {
  themeConfig: ThemeConfig;
  lang: 'ar' | 'fr' | 'en';
  onVocalizeStateChange?: (isVocalizing: boolean) => void;
}

interface StripInstance {
  instanceId: string;
  picto: PictoCard;
}

const renderPictoIcon = (iconName: string, className = 'w-6 h-6') => {
  switch (iconName) {
    case 'droplets': return <Droplets className={className} />;
    case 'apple': return <Apple className={className} />;
    case 'headphones': return <Headphones className={className} />;
    case 'volume2': return <Volume2 className={className} />;
    case 'boxes': return <Boxes className={className} />;
    case 'layers': return <Layers className={className} />;
    case 'sparkles': return <Sparkles className={className} />;
    case 'help': return <HelpCircle className={className} />;
    case 'coffee': return <Coffee className={className} />;
    case 'heart': return <Heart className={className} />;
    case 'utensils': return <Utensils className={className} />;
    case 'sun': return <Sun className={className} />;
    case 'palette': return <Palette className={className} />;
    case 'moon': return <Moon className={className} />;
    case 'bath': return <Bath className={className} />;
    case 'footprints': return <Footprints className={className} />;
    case 'wind': return <Wind className={className} />;
    case 'shield': return <ShieldCheck className={className} />;
    case 'smile': return <Smile className={className} />;
    case 'book': return <BookOpen className={className} />;
    case 'trophy': return <Trophy className={className} />;
    default: return <Sparkles className={className} />;
  }
};

export const AacGrid: React.FC<AacGridProps> = ({
  themeConfig,
  lang,
  onVocalizeStateChange,
}) => {
  const { preferences } = useSensoryPreferences();
  const isAr = lang === 'ar';
  const isEn = lang === 'en';

  // Sibling-isolated initial strip derived from the child's active theme
  const [selectedCards, setSelectedCards] = useState<StripInstance[]>(() => {
    const defaults = themeConfig.pictos.slice(0, 2);
    return defaults.map((p, index) => ({
      instanceId: `${p.id}-${index}-${Date.now()}`,
      picto: p,
    }));
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'needs' | 'activities' | 'feelings'>('all');
  const [isVocalizing, setIsVocalizing] = useState<boolean>(false);

  // Safety: cancel any ongoing speech if unmounted
  useEffect(() => {
    return () => {
      cancelSpeech();
    };
  }, []);

  const filteredPictos =
    activeCategory === 'all'
      ? themeConfig.pictos
      : themeConfig.pictos.filter((p) => p.category === activeCategory);

  const handleCardClick = (card: PictoCard) => {
    playTactileFeedback('pop', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });
    const newInstance: StripInstance = {
      instanceId: `${card.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      picto: card,
    };

    setSelectedCards((prev) => (prev.length >= 4 ? [...prev.slice(1), newInstance] : [...prev, newInstance]));

    // Speak single card
    const spokenText = isAr
      ? DARIJA_PICTO_SPOKEN[card.id] || card.labelAr
      : isEn
      ? card.labelEn
      : card.labelFr;

    speakHumanVoice({
      text: spokenText,
      lang,
      rate: preferences.speechRate,
      volume: preferences.volume,
      voiceURI: preferences.selectedVoiceURI,
      voiceEnabled: preferences.voiceEnabled,
    });
  };

  const handleRemoveCard = (instanceId: string) => {
    playTactileFeedback('uncheck', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });
    setSelectedCards((prev) => prev.filter((item) => item.instanceId !== instanceId));
  };

  const handleClearStrip = () => {
    if (isVocalizing) {
      cancelSpeech();
      setIsVocalizing(false);
      if (onVocalizeStateChange) onVocalizeStateChange(false);
    }
    playTactileFeedback('uncheck', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });
    setSelectedCards([]);
  };

  const handleToggleVocalizeSentence = () => {
    if (isVocalizing) {
      cancelSpeech();
      setIsVocalizing(false);
      if (onVocalizeStateChange) onVocalizeStateChange(false);
      return;
    }

    if (selectedCards.length === 0) return;
    setIsVocalizing(true);
    if (onVocalizeStateChange) onVocalizeStateChange(true);
    playTactileFeedback('celebrate', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });

    let sentence = '';
    if (isAr) {
      sentence = selectedCards.map((c) => DARIJA_PICTO_SPOKEN[c.picto.id] || c.picto.labelAr).join(' ، و ');
    } else if (isEn) {
      sentence = 'I want ' + selectedCards.map((c) => c.picto.labelEn.toLowerCase()).join(' and ');
    } else {
      sentence = 'Je veux ' + selectedCards.map((c) => c.picto.labelFr.toLowerCase()).join(' et ');
    }

    speakHumanVoice({
      text: sentence,
      lang,
      rate: preferences.speechRate,
      volume: preferences.volume,
      voiceURI: preferences.selectedVoiceURI,
      voiceEnabled: preferences.voiceEnabled,
      onStart: () => {
        setIsVocalizing(true);
        if (onVocalizeStateChange) onVocalizeStateChange(true);
      },
      onEnd: () => {
        setIsVocalizing(false);
        if (onVocalizeStateChange) onVocalizeStateChange(false);
      },
    });
  };

  return (
    <div className="space-y-6 text-start">
      {/* 1. Sentence Strip Builder (شريط تركيب الجملة) */}
      <section
        aria-label={isAr ? 'شريط تركيب الجملة (AAC Strip)' : isEn ? 'Sentence Strip (AAC)' : 'Bandeau de Phrase (CAA)'}
        className="p-4 sm:p-5 rounded-3xl bg-white border-2 border-[#172B46]/10 shadow-sm space-y-3"
      >
        <div className="flex items-center justify-between text-xs font-bold text-[#172B46]/80">
          <span className="flex items-center gap-1.5">
            <Volume2 size={16} className="text-[#2868C7]" />
            <span>{isAr ? 'شريط تركيب الجملة (AAC Strip)' : isEn ? 'Sentence Strip (AAC)' : 'Bandeau de Phrase (CAA)'}</span>
          </span>
          {selectedCards.length > 0 && (
            <button
              type="button"
              onClick={handleClearStrip}
              className="inline-flex items-center gap-1 text-xs text-[#5B6E85] hover:text-[#BA3C3C] px-3 py-2 min-h-[48px] rounded-xl focus-ring cursor-pointer transition-colors"
              aria-label={isAr ? 'مسح كل البطاقات من الشريط' : 'Clear all cards from sentence strip'}
            >
              <RotateCcw size={14} />
              <span>{isAr ? 'مسح' : isEn ? 'Clear' : 'Effacer'}</span>
            </button>
          )}
        </div>

        {/* Selected cards rack */}
        <div
          role="region"
          aria-live="polite"
          aria-label={isAr ? 'البطاقات المختارة في الشريط' : 'Selected cards in strip'}
          className="min-h-[104px] p-2.5 rounded-2xl bg-[#F5F6F3] border border-dashed border-[#172B46]/20 flex flex-wrap items-center gap-3"
        >
          {selectedCards.length === 0 ? (
            <p className="text-xs text-[#5B6E85] italic p-3 text-center w-full select-none">
              {isAr
                ? 'انقر على البطاقات أدناه لتركيب جملتك هنا وسماع نطقها الفوري'
                : isEn
                ? 'Tap cards below to compose a sentence and hear it vocalized aloud'
                : 'Sélectionnez des pictogrammes ci-dessous pour composer une phrase'}
            </p>
          ) : (
            <AnimatePresence>
              {selectedCards.map((item) => {
                const card = item.picto;
                const label = isAr ? card.labelAr : isEn ? card.labelEn : card.labelFr;
                return (
                  <motion.div
                    key={item.instanceId}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative group p-2.5 bg-white rounded-2xl border-2 border-[#2868C7]/30 shadow-sm flex items-center gap-2"
                  >
                    <div className={`w-8 h-8 rounded-xl ${card.bgTint} ${card.color} flex items-center justify-center shrink-0`}>
                      {renderPictoIcon(card.iconName, 'w-4 h-4')}
                    </div>
                    <span className="text-xs font-bold text-[#172B46]">
                      {label}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCard(item.instanceId)}
                      className="min-w-[48px] min-h-[48px] -me-1.5 flex items-center justify-center text-[#5B6E85] hover:text-[#BA3C3C] rounded-full focus-ring cursor-pointer transition-colors"
                      aria-label={`${isAr ? 'حذف بطاقة' : 'Remove card'} ${label}`}
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>

        {/* Vocalize button */}
        {selectedCards.length > 0 && (
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={handleToggleVocalizeSentence}
              className={`inline-flex items-center gap-2 px-5 py-2.5 min-h-[48px] rounded-full font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer focus-ring ${
                isVocalizing
                  ? 'bg-[#BA3C3C] text-white hover:bg-[#9B2C2C]'
                  : 'bg-gradient-to-r from-[#2868C7] to-[#172B46] text-white hover:scale-[1.02]'
              }`}
              aria-label={
                isVocalizing
                  ? isAr ? 'إيقاف نطق الجملة' : 'Stop speaking sentence'
                  : isAr ? 'نطق الجملة كاملة بصوت طبيعي' : 'Speak sentence aloud'
              }
            >
              {isVocalizing ? (
                <>
                  <Square size={15} className="fill-current" />
                  <span>{isAr ? 'إيقاف النطق' : isEn ? 'Stop speaking' : 'Arrêter la voix'}</span>
                </>
              ) : (
                <>
                  <Play size={15} className="text-[#D8BE83]" />
                  <span>{isAr ? 'نطق الجملة كاملة' : isEn ? 'Speak sentence' : 'Énoncer la phrase'}</span>
                </>
              )}
            </button>
          </div>
        )}
      </section>

      {/* 2. Category Selector & Quick Phrases (>= 48px touch targets) */}
      <div className="space-y-3">
        <div
          role="toolbar"
          aria-label={isAr ? 'تصفية البطاقات حسب الفئة' : 'Filter pictograms by category'}
          className="flex flex-wrap items-center gap-2 pt-1"
        >
          {[
            { key: 'all', labelAr: 'الكل', labelFr: 'Tous', labelEn: 'All', count: themeConfig.pictos.length },
            { key: 'needs', labelAr: 'احتياجات', labelFr: 'Besoins', labelEn: 'Needs', count: themeConfig.pictos.filter((p) => p.category === 'needs').length },
            { key: 'activities', labelAr: 'أنشطة', labelFr: 'Activités', labelEn: 'Activities', count: themeConfig.pictos.filter((p) => p.category === 'activities').length },
            { key: 'feelings', labelAr: 'مشاعر', labelFr: 'Émotions', labelEn: 'Feelings', count: themeConfig.pictos.filter((p) => p.category === 'feelings').length },
          ].map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key as 'all' | 'needs' | 'activities' | 'feelings')}
              aria-pressed={activeCategory === cat.key}
              className={`inline-flex items-center gap-2 px-4 py-2.5 min-h-[48px] rounded-2xl text-xs font-bold transition-all focus-ring cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-[#172B46] text-white shadow-sm'
                  : 'bg-white border border-[#172B46]/15 text-[#5B6E85] hover:text-[#172B46] hover:bg-black/5'
              }`}
            >
              <span>{isAr ? cat.labelAr : isEn ? cat.labelEn : cat.labelFr}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  activeCategory === cat.key ? 'bg-white/20 text-white' : 'bg-[#172B46]/5 text-[#5B6E85]'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Pictogram Cards Grid (Responsive, high-clarity 3-column on desktop to balance height) */}
      <div
        role="group"
        aria-label={isAr ? 'شبكة بطاقات التواصل' : 'Pictogram communication grid'}
        className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4"
      >
        {filteredPictos.map((picto) => (
          <button
            key={picto.id}
            type="button"
            onClick={() => handleCardClick(picto)}
            className="p-4 sm:p-5 rounded-3xl bg-white border-2 border-[#172B46]/10 hover:border-[#2868C7]/60 hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-2.5 cursor-pointer focus-ring min-h-[120px] sm:min-h-[130px] group"
          >
            <div className={`w-14 h-14 rounded-2xl ${picto.bgTint} ${picto.color} flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 shadow-xs`}>
              {renderPictoIcon(picto.iconName, 'w-7 h-7')}
            </div>
            <div className="space-y-0.5">
              <span className="text-xs sm:text-sm font-bold text-[#172B46] leading-tight block">
                {isAr ? picto.labelAr : isEn ? picto.labelEn : picto.labelFr}
              </span>
              <span className="text-[10px] text-[#5B6E85] block capitalize">
                {picto.category === 'needs'
                  ? isAr ? 'احتياج' : 'Need'
                  : picto.category === 'activities'
                  ? isAr ? 'نشاط' : 'Activity'
                  : isAr ? 'شعور' : 'Feeling'}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* 4. Parent / Educator Tip Box for AAC expression (Fills column gracefully) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#F5F6F3] border border-[#172B46]/10 space-y-2 text-start">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2868C7]">
          <Sparkles size={15} />
          <span>{isAr ? 'إرشاد تواصل داعم' : isEn ? 'Supportive AAC Tip' : 'Conseil de Communication CAA'}</span>
        </div>
        <p className="text-xs text-[#5B6E85] leading-relaxed">
          {isAr
            ? 'شجع طفلك على النقر على البطاقة والتكرار الشفوي بصوته دون أي ضغط. شريط تركيب الجملة يساعد على الانتقال التدريجي من الكلمة الواحدة إلى التعبير المركب.'
            : isEn
            ? 'Encourage your child to tap cards and echo the spoken sound at their own pace without pressure. The sentence strip naturally bridges single words to compound phrases.'
            : 'Encouragez l\'enfant à cliquer et répéter avec douceur sans forcer. Le bandeau de phrase favorise la transition vers des demandes composées.'}
        </p>
      </div>

    </div>
  );
};
