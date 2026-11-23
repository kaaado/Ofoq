import React, { useState, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Volume2,
  ShieldCheck,
  Lock,
  CheckCircle2,
  RotateCcw,
  Play,
  Square,
  Users,
  UserPlus,
  Heart,
  Orbit,
  Sprout,
  Waves,
  Palette,
  ArrowRight,
  ArrowLeft,
  Star,
  Moon,
  Smile,
  MessageCircle,
  ChevronRight,
  Utensils,
  Droplets,
  Apple,
  Headphones,
  Puzzle,
  Mic,
  BookOpen,
  Music,
  Wind,
  Loader2,
  Bot,
  Sunrise,
  Layers,
  Boxes,
  Sun,
  Trophy,
  Coffee,
  HelpCircle,
  Footprints,
  Bath,
  Hand,
  ThumbsUp,
  Award,
  Stethoscope,
  Calendar,
  CheckCheck,
  Check
} from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

// Dynamic code-splitting: Lazy load Three.js 3D Canvas
const Nour3DCanvas = lazy(() => import('../3d/Nour3DCanvas').then(m => ({ default: m.Nour3DCanvas })));

// ----------------------------------------------------
// CALM ACOUSTIC WEB AUDIO SYNTHESIZER (ORGANIC WOODEN MARIMBA & TIBETAN CHIME)
// ----------------------------------------------------
const playTactileFeedback = (type: 'pop' | 'chime' | 'uncheck' | 'celebrate' | 'click' = 'click') => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Organic low-pass filter to remove any harsh digital edge or synthetic click
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.connect(ctx.destination);

    if (type === 'click' || type === 'pop') {
      // Warm acoustic wooden marimba drop
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(440, now);
      osc1.frequency.exponentialRampToValueAtTime(580, now + 0.06);
      osc2.frequency.setValueAtTime(880, now);
      osc2.frequency.exponentialRampToValueAtTime(1160, now + 0.06);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.07, now + 0.012); // gentle organic attack
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12); // smooth acoustic decay

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(filter);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.13);
      osc2.stop(now + 0.13);
    } else if (type === 'chime') {
      // Soothing Tibetan singing bowl / calm bell resonance
      const osc = ctx.createOscillator();
      const sub = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      sub.type = 'sine';
      osc.frequency.setValueAtTime(528, now); // 528Hz calming tone
      sub.frequency.setValueAtTime(264, now); // warm lower octave foundation

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

      osc.connect(gain);
      sub.connect(gain);
      gain.connect(filter);

      osc.start(now);
      sub.start(now);
      osc.stop(now + 0.6);
      sub.stop(now + 0.6);
    } else if (type === 'uncheck') {
      // Soft downward raindrop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.09);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

      osc.connect(gain);
      gain.connect(filter);
      osc.start(now);
      osc.stop(now + 0.11);
    } else if (type === 'celebrate') {
      // Gentle acoustic wind chimes progression (pentatonic warmth)
      [440, 528, 660, 880].forEach((freq, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(freq, now + i * 0.07);

        g.gain.setValueAtTime(0.001, now + i * 0.07);
        g.gain.linearRampToValueAtTime(0.06, now + i * 0.07 + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 0.45);

        o.connect(g);
        g.connect(filter);
        o.start(now + i * 0.07);
        o.stop(now + i * 0.07 + 0.5);
      });
    }
  } catch {
    // Autoplay restrictions or silent mode fallback
  }
};

// ----------------------------------------------------
// NATURAL HUMAN SPEECH SYNTHESIS ENGINE (NOT ROBOTIC AI)
// ----------------------------------------------------
// Pre-cache speech synthesis voices when available in browser
let cachedVoices: SpeechSynthesisVoice[] = [];
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

const speakHumanVoice = ({
  text,
  lang,
  onStart,
  onEnd,
  rate = 0.92,
  pitch = 1.0
}: {
  text: string;
  lang: 'ar' | 'fr' | 'en';
  onStart?: () => void;
  onEnd?: () => void;
  rate?: number;
  pitch?: number;
}) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onStart) onStart();
    setTimeout(() => {
      if (onEnd) onEnd();
    }, 1800);
    return;
  }

  try {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = 1.0;

    // Detect and select warm, natural, human neural voices
    const allVoices = (cachedVoices && cachedVoices.length > 0) ? cachedVoices : window.speechSynthesis.getVoices();
    let selectedVoice: SpeechSynthesisVoice | null = null;

    if (lang === 'ar') {
      const arVoices = allVoices.filter(v => v.lang.toLowerCase().startsWith('ar'));
      selectedVoice =
        arVoices.find(v => {
          const name = v.name.toLowerCase();
          return name.includes('natural') || name.includes('neural') || name.includes('online');
        }) ||
        arVoices.find(v => {
          const name = v.name.toLowerCase();
          return name.includes('naayf') || name.includes('salma') || name.includes('tariq') || name.includes('amina') || name.includes('zariyah') || name.includes('hoda');
        }) ||
        arVoices.find(v => {
          const name = v.name.toLowerCase();
          return name.includes('google') || name.includes('apple') || name.includes('maged');
        }) ||
        arVoices[0] ||
        null;

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
      } else {
        utterance.lang = 'ar-SA';
      }
    } else if (lang === 'fr') {
      const frVoices = allVoices.filter(v => v.lang.toLowerCase().startsWith('fr'));
      selectedVoice =
        frVoices.find(v => {
          const name = v.name.toLowerCase();
          return name.includes('natural') || name.includes('online') || name.includes('denise') || name.includes('henri') || name.includes('neural') || name.includes('paul');
        }) ||
        frVoices.find(v => {
          const name = v.name.toLowerCase();
          return name.includes('google') || name.includes('thomas') || name.includes('julie') || name.includes('hortense');
        }) ||
        frVoices[0] ||
        null;

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
      } else {
        utterance.lang = 'fr-FR';
      }
    } else {
      const enVoices = allVoices.filter(v => v.lang.toLowerCase().startsWith('en'));
      selectedVoice =
        enVoices.find(v => {
          const name = v.name.toLowerCase();
          return name.includes('natural') || name.includes('online') || name.includes('jenny') || name.includes('guy') || name.includes('aria') || name.includes('neural');
        }) ||
        enVoices.find(v => {
          const name = v.name.toLowerCase();
          return name.includes('google') || name.includes('samantha') || name.includes('serena');
        }) ||
        enVoices[0] ||
        null;

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
      } else {
        utterance.lang = 'en-US';
      }
    }

    if (onStart) {
      utterance.onstart = onStart;
    }
    utterance.onend = () => {
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis playback error:', err);
    if (onEnd) onEnd();
  }
};

// Authentic Algerian Darija Spoken Pictogram Map with accurate phonetic vocalization (Tashkeel)
const DARIJA_PICTO_SPOKEN: Record<string, string> = {
  water: 'حَبِّيتْ نَشْرَبْ مَاءْ',
  apple: 'حَبِّيتْ نَاكُلْ تُفَّاحَة',
  listen: 'نِسْمَعْ مْلِيحْ لِلصَّوْتْ',
  speak: 'نْعَاوَدْ الْكَلِمَة بِالْعَقْلْ',
  puzzle: 'نِلْعَبْ بِالتَّرْكِيبَاتْ وَالْأَلْعَابْ',
  happy: 'فَرْحَانْ بْزَافْ بْنُطْقِي',
  help: 'عَاوْنُونِي رَبِّي يَحْفَظْكُمْ',
  break: 'حَبِّيتْ نْرَيَّحْ شْوِيَّة',
  hug: 'تَحْضِينَة حْنِينَة وَدَافْيَة',
  snack: 'حَبِّيتْ لُمْجَة خَفِيفَة',
  rest: 'نْرَيَّحْ وَنِرْتَاحْ شْوِيَّة',
  play: 'نِلْعَبْ بِالْعَقْلْ وَبِالشْوِيَّة',
  draw: 'نِرْسُمْ بِالْأَلْوَانْ الشَّابَّة',
  sleep: 'وِقْتْ الرُّقَادْ وَالرَّاحَة',
  wash: 'نِغْسِلْ يَدَيَّ بِالْمَاءْ وَالصَّابُونْ',
  outdoor: 'نُخْرُجْ لِلْجْنِينَة نِلْعَبْ',
  breathe: 'نِتْنَفَّسْ بِالْعَقْلْ وَبِالرَّاحَة',
  music: 'نِسْمَعْ مُوسِيقَى هَادْيَة',
  safe: 'رَانِي فِي أَمَانْ وَرَاحَة',
  smile: 'رَانِي مِرْتَاحْ وَفَرْحَانْ',
  walk: 'نِمْشِي بِالْعَقْلْ',
  story: 'قِصَّة مُصَوَّرَة شَابَّة',
  bravo: 'يَعْطِيكْ الصِّحَّة يَا بَطَلْ',
  share: 'نْشَارِكْ مَعَ مَامَا وَبَابَا',
  star: 'نَجْمَة الشَّاطِرْ'
};

// ----------------------------------------------------
// LUCIDE ICON RENDERERS FOR THE 3D SIMULATION
// ----------------------------------------------------
const renderPictoIcon = (iconName: string, className = "w-5 h-5") => {
  switch (iconName) {
    case 'droplets': return <Droplets className={className} />;
    case 'apple': return <Apple className={className} />;
    case 'headphones': return <Headphones className={className} />;
    case 'volume2': return <Volume2 className={className} />;
    case 'puzzle': return <Puzzle className={className} />;
    case 'sparkles': return <Sparkles className={className} />;
    case 'help': return <HelpCircle className={className} />;
    case 'coffee': return <Coffee className={className} />;
    case 'heart': return <Heart className={className} />;
    case 'utensils': return <Utensils className={className} />;
    case 'sun': return <Sun className={className} />;
    case 'boxes': return <Boxes className={className} />;
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

const renderThemeIcon = (themeKey: ThemeKey, className = "w-5 h-5") => {
  switch (themeKey) {
    case 'space': return <Orbit className={className} />;
    case 'nature': return <Sprout className={className} />;
    case 'ocean': return <Waves className={className} />;
    case 'creative': return <Palette className={className} />;
    default: return <Orbit className={className} />;
  }
};

const renderRoutineIcon = (iconName: string, className = "w-3.5 h-3.5") => {
  switch (iconName) {
    case 'sunrise': return <Sunrise className={className} />;
    case 'bot': return <Bot className={className} />;
    case 'layers': return <Layers className={className} />;
    case 'boxes': return <Boxes className={className} />;
    case 'sun': return <Sun className={className} />;
    case 'utensils': return <Utensils className={className} />;
    case 'wind': return <Wind className={className} />;
    case 'book': return <BookOpen className={className} />;
    default: return <CheckCircle2 className={className} />;
  }
};

// ----------------------------------------------------
// THEMES & INTERFACE TYPES
// ----------------------------------------------------
type ThemeKey = 'space' | 'nature' | 'ocean' | 'creative';

export interface PictoCard {
  id: string;
  iconName: string;
  color: string;
  bgTint: string;
  labelAr: string;
  labelFr: string;
  labelEn: string;
  category: 'needs' | 'activities' | 'feelings';
}

interface ThemeConfig {
  id: ThemeKey;
  nameAr: string;
  nameFr: string;
  nameEn: string;
  subtitleAr: string;
  subtitleFr: string;
  subtitleEn: string;
  primaryColor: string;
  gradientBg: string;
  cardGradient: string;
  swatches: string[];
  pictos: PictoCard[];
}

const THEMES: Record<ThemeKey, ThemeConfig> = {
  space: {
    id: 'space',
    nameAr: 'كوكب الأصوات والفضاء',
    nameFr: 'Monde Céleste & Phonétique',
    nameEn: 'Cosmic Speech Explorer',
    subtitleAr: 'مستوحى من عوالم سبيستون • تحفيز مخارج الحروف وبناء الجمل',
    subtitleFr: 'Thème immersif • Phonation & Étoiles',
    subtitleEn: 'Immersive Theme • Speech & Stars',
    primaryColor: '#2868C7',
    gradientBg: 'from-[#172B46] via-[#1E54A3] to-[#2868C7]',
    cardGradient: 'from-[#172B46]/10 via-[#2868C7]/15 to-[#A9C5D8]/20',
    swatches: ['#172B46', '#2868C7', '#A9C5D8', '#D8BE83'],
    pictos: [
      { id: 'water', iconName: 'droplets', color: 'text-[#2868C7]', bgTint: 'bg-[#2868C7]/10', labelAr: 'حبيت نشرب ماء', labelFr: 'Boire de l\'eau', labelEn: 'Drink water', category: 'needs' },
      { id: 'apple', iconName: 'apple', color: 'text-[#D58C7A]', bgTint: 'bg-[#D58C7A]/10', labelAr: 'حبيت تفاحة', labelFr: 'Manger une pomme', labelEn: 'Eat apple', category: 'needs' },
      { id: 'listen', iconName: 'headphones', color: 'text-[#7C3AED]', bgTint: 'bg-[#7C3AED]/10', labelAr: 'نسمع الصوت', labelFr: 'Écouter le son', labelEn: 'Listen to sound', category: 'activities' },
      { id: 'speak', iconName: 'volume2', color: 'text-[#2563EB]', bgTint: 'bg-[#2563EB]/10', labelAr: 'نعاود الكلمة', labelFr: 'Répéter le mot', labelEn: 'Repeat word', category: 'activities' },
      { id: 'puzzle', iconName: 'puzzle', color: 'text-[#F59E0B]', bgTint: 'bg-[#F59E0B]/10', labelAr: 'نلعب بالتركيبات', labelFr: 'Faire un puzzle', labelEn: 'Play puzzle', category: 'activities' },
      { id: 'happy', iconName: 'sparkles', color: 'text-[#D8BE83]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'فرحان بنطقي', labelFr: 'Je suis fier', labelEn: 'I feel proud', category: 'feelings' },
      { id: 'help', iconName: 'help', color: 'text-[#DC2626]', bgTint: 'bg-[#DC2626]/10', labelAr: 'عاونوني', labelFr: 'Besoin d\'aide', labelEn: 'Need help', category: 'needs' },
      { id: 'break', iconName: 'coffee', color: 'text-[#D97706]', bgTint: 'bg-[#D97706]/10', labelAr: 'نريّح شوية', labelFr: 'Temps calme', labelEn: 'Quiet break', category: 'needs' },
      { id: 'hug', iconName: 'heart', color: 'text-[#E11D48]', bgTint: 'bg-[#E11D48]/10', labelAr: 'تحضينة دافية', labelFr: 'Besoin d\'un câlin', labelEn: 'Need a hug', category: 'feelings' },
    ]
  },
  nature: {
    id: 'nature',
    nameAr: 'كوكب الطبيعة والهدوء',
    nameFr: 'Jardin Douceur & Routines',
    nameEn: 'Nature & Peaceful Routines',
    subtitleAr: 'بيئة نباتية مريحة حسياً • تنظيم محطات اليوم والروتين العائلي',
    subtitleFr: 'Thème immersif • Régulation & Douceur',
    subtitleEn: 'Immersive Theme • Sensory Peace',
    primaryColor: '#2D7A58',
    gradientBg: 'from-[#172B46] via-[#1E5B40] to-[#2D7A58]',
    cardGradient: 'from-[#172B46]/10 via-[#2D7A58]/15 to-[#D58C7A]/15',
    swatches: ['#172B46', '#2D7A58', '#A9C5D8', '#D58C7A'],
    pictos: [
      { id: 'snack', iconName: 'utensils', color: 'text-[#2D7A58]', bgTint: 'bg-[#2D7A58]/10', labelAr: 'لمجة خفيفة', labelFr: 'Goûter', labelEn: 'Snack time', category: 'needs' },
      { id: 'rest', iconName: 'sun', color: 'text-[#D8BE83]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'نريّح شوية', labelFr: 'Temps calme', labelEn: 'Quiet break', category: 'needs' },
      { id: 'play', iconName: 'boxes', color: 'text-[#0D9488]', bgTint: 'bg-[#0D9488]/10', labelAr: 'نلعب بالعقل', labelFr: 'Jouer doucement', labelEn: 'Play gently', category: 'activities' },
      { id: 'draw', iconName: 'palette', color: 'text-[#D58C7A]', bgTint: 'bg-[#D58C7A]/10', labelAr: 'نرسم بالألوان', labelFr: 'Dessiner', labelEn: 'Draw pictures', category: 'activities' },
      { id: 'hug', iconName: 'heart', color: 'text-[#E11D48]', bgTint: 'bg-[#E11D48]/10', labelAr: 'تحضينة دافية', labelFr: 'Besoin d\'un câlin', labelEn: 'Need a hug', category: 'feelings' },
      { id: 'sleep', iconName: 'moon', color: 'text-[#4F46E5]', bgTint: 'bg-[#4F46E5]/10', labelAr: 'نرقد ونرتاح', labelFr: 'Dormir', labelEn: 'Bedtime', category: 'needs' },
      { id: 'water', iconName: 'droplets', color: 'text-[#0284C7]', bgTint: 'bg-[#0284C7]/10', labelAr: 'نشرب ماء', labelFr: 'Boire de l\'eau', labelEn: 'Drink water', category: 'needs' },
      { id: 'wash', iconName: 'bath', color: 'text-[#059669]', bgTint: 'bg-[#059669]/10', labelAr: 'نغسل يديّ', labelFr: 'Se laver les mains', labelEn: 'Wash hands', category: 'activities' },
      { id: 'outdoor', iconName: 'footprints', color: 'text-[#16A34A]', bgTint: 'bg-[#16A34A]/10', labelAr: 'نخرج للجنينة', labelFr: 'Aller au jardin', labelEn: 'Go to garden', category: 'activities' },
    ]
  },
  ocean: {
    id: 'ocean',
    nameAr: 'كوكب البحار والتنفس',
    nameFr: 'Océan Apaisé & Émotions',
    nameEn: 'Ocean Haven & Regulation',
    subtitleAr: 'أمواج هادئة وألوان مائية • تنظيم المشاعر والتعبير بدون إجهاد',
    subtitleFr: 'Thème immersif • Vagues & Respiration',
    subtitleEn: 'Immersive Theme • Waves & Calm',
    primaryColor: '#0284C7',
    gradientBg: 'from-[#172B46] via-[#0369A1] to-[#0284C7]',
    cardGradient: 'from-[#172B46]/10 via-[#0284C7]/15 to-[#A9C5D8]/20',
    swatches: ['#172B46', '#0284C7', '#A9C5D8', '#D8BE83'],
    pictos: [
      { id: 'breathe', iconName: 'wind', color: 'text-[#0284C7]', bgTint: 'bg-[#0284C7]/10', labelAr: 'نتنفس بالعقل', labelFr: 'Respirer calmement', labelEn: 'Deep breath', category: 'feelings' },
      { id: 'water', iconName: 'droplets', color: 'text-[#0369A1]', bgTint: 'bg-[#0369A1]/10', labelAr: 'نشرب ماء', labelFr: 'Boire un verre d\'eau', labelEn: 'Glass of water', category: 'needs' },
      { id: 'music', iconName: 'headphones', color: 'text-[#4F46E5]', bgTint: 'bg-[#4F46E5]/10', labelAr: 'نسمع موسيقى هادية', labelFr: 'Musique douce', labelEn: 'Calm music', category: 'activities' },
      { id: 'safe', iconName: 'shield', color: 'text-[#059669]', bgTint: 'bg-[#059669]/10', labelAr: 'راني في أمان', labelFr: 'Je suis en sécurité', labelEn: 'I am safe', category: 'feelings' },
      { id: 'break', iconName: 'coffee', color: 'text-[#D97706]', bgTint: 'bg-[#D97706]/10', labelAr: 'وقفة راحة', labelFr: 'Pause sensorielle', labelEn: 'Sensory pause', category: 'needs' },
      { id: 'smile', iconName: 'smile', color: 'text-[#D8BE83]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'راني مرتاح', labelFr: 'Tout va bien', labelEn: 'Feeling good', category: 'feelings' },
      { id: 'help', iconName: 'help', color: 'text-[#DC2626]', bgTint: 'bg-[#DC2626]/10', labelAr: 'عاونوني', labelFr: 'Besoin d\'aide', labelEn: 'Need help', category: 'needs' },
      { id: 'hug', iconName: 'heart', color: 'text-[#E11D48]', bgTint: 'bg-[#E11D48]/10', labelAr: 'تحضينة دافية', labelFr: 'Câlin réconfortant', labelEn: 'Comfort hug', category: 'feelings' },
      { id: 'walk', iconName: 'footprints', color: 'text-[#0284C7]', bgTint: 'bg-[#0284C7]/10', labelAr: 'نمشي بالعقل', labelFr: 'Marche douce', labelEn: 'Calm walk', category: 'activities' },
    ]
  },
  creative: {
    id: 'creative',
    nameAr: 'كوكب الإبداع والقصص',
    nameFr: 'Atelier Couleurs & Histoires',
    nameEn: 'Creative Studio & Stories',
    subtitleAr: 'فضاء حيوي ودافئ • التعبير المصور، الرسم، والاحتفال بالإنجازات',
    subtitleFr: 'Thème immersif • Dessin & Expression',
    subtitleEn: 'Immersive Theme • Art & Stories',
    primaryColor: '#D58C7A',
    gradientBg: 'from-[#172B46] via-[#C27765] to-[#D58C7A]',
    cardGradient: 'from-[#172B46]/10 via-[#D58C7A]/20 to-[#D8BE83]/20',
    swatches: ['#172B46', '#D58C7A', '#D8BE83', '#A9C5D8'],
    pictos: [
      { id: 'story', iconName: 'book', color: 'text-[#D58C7A]', bgTint: 'bg-[#D58C7A]/10', labelAr: 'قصة شابة', labelFr: 'Lire une histoire', labelEn: 'Story time', category: 'activities' },
      { id: 'draw', iconName: 'palette', color: 'text-[#C27765]', bgTint: 'bg-[#C27765]/10', labelAr: 'نرسم لوحتي', labelFr: 'Peindre', labelEn: 'Painting', category: 'activities' },
      { id: 'puzzle', iconName: 'puzzle', color: 'text-[#D8BE83]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'نركب الصور', labelFr: 'Assembler le puzzle', labelEn: 'Assemble puzzle', category: 'activities' },
      { id: 'bravo', iconName: 'trophy', color: 'text-[#F59E0B]', bgTint: 'bg-[#F59E0B]/10', labelAr: 'يعطيك الصحة يا بطل', labelFr: 'Bravo à moi', labelEn: 'Great effort', category: 'feelings' },
      { id: 'share', iconName: 'heart', color: 'text-[#E11D48]', bgTint: 'bg-[#E11D48]/10', labelAr: 'نشارك مع ماما وبابا', labelFr: 'Partager avec mes parents', labelEn: 'Share with family', category: 'feelings' },
      { id: 'star', iconName: 'sparkles', color: 'text-[#EAB308]', bgTint: 'bg-[#EAB308]/10', labelAr: 'نجمة الشاطر', labelFr: 'Étoile de réussite', labelEn: 'Achievement star', category: 'feelings' },
      { id: 'music', iconName: 'headphones', color: 'text-[#8B5CF6]', bgTint: 'bg-[#8B5CF6]/10', labelAr: 'غنية شابة', labelFr: 'Jolie chanson', labelEn: 'Nice song', category: 'activities' },
      { id: 'help', iconName: 'help', color: 'text-[#DC2626]', bgTint: 'bg-[#DC2626]/10', labelAr: 'عاونوني في الرسم', labelFr: 'M\'aider à dessiner', labelEn: 'Help me draw', category: 'needs' },
      { id: 'smile', iconName: 'smile', color: 'text-[#F59E0B]', bgTint: 'bg-[#F59E0B]/10', labelAr: 'فرحان بخدمتي', labelFr: 'Fier du résultat', labelEn: 'Proud of result', category: 'feelings' },
    ]
  }
};

interface ChildProfileData {
  id: 'yanis' | 'amina' | 'custom';
  nameAr: string;
  nameFr: string;
  nameEn: string;
  age: number;
  theme: ThemeKey;
  speechGoalAr: string;
  speechGoalFr: string;
  speechGoalEn: string;
  specialistName: string;
  specialistRoleAr: string;
  specialistRoleFr: string;
  specialistRoleEn: string;
  routines: {
    id: string;
    iconName: string;
    titleAr: string;
    titleFr: string;
    titleEn: string;
    completed: boolean;
  }[];
}

const DEFAULT_PROFILES: Record<'yanis' | 'amina', ChildProfileData> = {
  yanis: {
    id: 'yanis',
    nameAr: 'يانيس',
    nameFr: 'Yanis',
    nameEn: 'Yanis',
    age: 6,
    theme: 'space',
    speechGoalAr: 'تدريب مخارج الحروف وبناء جملة من كلمتين (ماء + أريد)',
    speechGoalFr: 'Articulation des phonèmes et phrase à deux éléments (Boire + Eau)',
    speechGoalEn: 'Phonetic articulation and two-word requests (Drink + Water)',
    specialistName: 'Dr. Benali',
    specialistRoleAr: 'أخصائي تخاطب وأرطفونيا (عيادة الأمل)',
    specialistRoleFr: 'Orthophoniste diplômé (Cabinet El-Amel)',
    specialistRoleEn: 'Certified Speech Therapist (El-Amel Clinic)',
    routines: [
      { id: 'r1', iconName: 'sunrise', titleAr: 'الاستيقاظ والروتين الصباحي', titleFr: 'Réveil et étirements doux', titleEn: 'Gentle morning routine', completed: true },
      { id: 'r2', iconName: 'bot', titleAr: 'بصمة الصوت مع الرفيق باني', titleFr: 'Exercice sonore avec le robot Bunny', titleEn: 'Phonation practice with Bunny', completed: true },
      { id: 'r3', iconName: 'layers', titleAr: 'تسمية بطاقتين على شريط التواصل', titleFr: 'Composition de 2 pictogrammes', titleEn: 'Compose 2 AAC cards', completed: false },
      { id: 'r4', iconName: 'boxes', titleAr: 'ترتيب المكعبات والاحتفال بالنجمة', titleFr: 'Rangement ludique & étoile', titleEn: 'Toy cleanup & victory star', completed: false }
    ]
  },
  amina: {
    id: 'amina',
    nameAr: 'أمينة',
    nameFr: 'Amina',
    nameEn: 'Amina',
    age: 4,
    theme: 'nature',
    speechGoalAr: 'التعبير عن الاحتياجات الأساسية بالصور وتخفيف التوتر الحسي',
    speechGoalFr: 'Expression spontanée des besoins par pictogrammes et apaisement sensoriel',
    speechGoalEn: 'Spontaneous need expression via pictograms and sensory calming',
    specialistName: 'Dr. Mansouri',
    specialistRoleAr: 'أخصائية التربية الخاصة والمرافقة الحركية',
    specialistRoleFr: 'Psychomotricienne & Éducatrice Spécialisée',
    specialistRoleEn: 'Occupational Therapist & Special Educator',
    routines: [
      { id: 'a1', iconName: 'sun', titleAr: 'فترة الهدوء الصباحي وشرب الماء', titleFr: 'Temps calme et verre d\'eau', titleEn: 'Calm morning pause & water', completed: true },
      { id: 'a2', iconName: 'utensils', titleAr: 'اختيار بطاقة الوجبة الخفيفة', titleFr: 'Choix du goûter par pictogramme', titleEn: 'Snack pictogram choice', completed: true },
      { id: 'a3', iconName: 'wind', titleAr: 'تمرين التنفس البطيء مع باني', titleFr: 'Respiration synchronisée avec Bunny', titleEn: 'Deep breathing with Bunny', completed: true },
      { id: 'a4', iconName: 'book', titleAr: 'وقت القصة المصورة قبل القيلولة', titleFr: 'Histoire imagée avant la sieste', titleEn: 'Picture story before rest', completed: false }
    ]
  }
};

export const UnifiedChildWorldExperience: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language || 'fr').split('-')[0].toLowerCase();
  const isAr = currentLang === 'ar';
  const isEn = currentLang === 'en';

  // Navigation within the Unified Experience
  const [activeTab, setActiveTab] = useState<'hub' | 'wizard' | 'world'>('world');

  // Active Child Profile (Yanis by default, can switch to Amina or Custom)
  const [activeProfileId, setActiveProfileId] = useState<'yanis' | 'amina' | 'custom'>('yanis');
  const [profiles, setProfiles] = useState<Record<'yanis' | 'amina', ChildProfileData>>(DEFAULT_PROFILES);

  // Wizard state for custom child profile creation
  const [wizardName, setWizardName] = useState<string>('Rayan');
  const [wizardAge, setWizardAge] = useState<number>(5);
  const [wizardTheme, setWizardTheme] = useState<ThemeKey>('ocean');
  const [isGeneratingWorld, setIsGeneratingWorld] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<number>(1);

  // Custom profile state once created
  const [customProfile, setCustomProfile] = useState<ChildProfileData | null>(null);

  // Current active profile object
  const currentProfile: ChildProfileData =
    activeProfileId === 'custom' && customProfile
      ? customProfile
      : profiles[activeProfileId as 'yanis' | 'amina'] || profiles.yanis;

  const currentThemeConfig = THEMES[currentProfile.theme] || THEMES.space;

  // ----------------------------------------------------
  // AAC BOARD STATE
  // ----------------------------------------------------
  const [selectedPictoIds, setSelectedPictoIds] = useState<string[]>(['water', 'puzzle']);
  const [isVocalizing, setIsVocalizing] = useState<boolean>(false);

  // ----------------------------------------------------
  // BUNNY COMPANION STATE
  // ----------------------------------------------------
  const [nourMode, setNourMode] = useState<'idle' | 'greeting' | 'calm' | 'talking' | 'listening'>('idle');
  const [companionBubble, setCompanionBubble] = useState<string | null>(null);

  // Pro-Parent Collaboration & Practice State
  const [homePracticeLogged, setHomePracticeLogged] = useState<boolean>(false);
  const [isPlayingGuidance, setIsPlayingGuidance] = useState<boolean>(false);

  // Play spoken clinical guidance from Dr. Benali with calm, human voice
  const handlePlaySpecialistGuidance = () => {
    if (isPlayingGuidance) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingGuidance(false);
      return;
    }

    setIsPlayingGuidance(true);
    playTactileFeedback('chime');

    const guidanceSpokenText = isAr
      ? `تَوْجِيهْ الدُّكْتُورْ بْنْ عَلِي: الْيَوْمْ فِي الدَّارْ، نْوَلْفُو ${currentProfile.nameAr} يَرْبُطْ بَيْنَ بِطَاقَة الْمَاءْ وَحَبِّيتْ نَشْرَبْ كِي يَعْطَشْ، وَنْشَجَّعُوهْ يَوَرِّي بْيَدُّو وَيَهْدَرْ بِالْعَقْلْ وَبْلَا ضَغْطْ.`
      : isEn
      ? `Guidance from Dr. Benali: Practice combining water and want cards at home when thirsty, taking time with zero pressure.`
      : `Consigne du Dr. Benali : Encourageons ${currentProfile.nameFr} à la maison à associer le geste et la parole pour exprimer ses besoins en douceur, sans pression.`;

    speakHumanVoice({
      text: guidanceSpokenText,
      lang: isAr ? 'ar' : isEn ? 'en' : 'fr',
      rate: 0.92,
      pitch: 1.0,
      onStart: () => setIsPlayingGuidance(true),
      onEnd: () => setIsPlayingGuidance(false)
    });
  };

  const handleToggleHomePractice = () => {
    const nextState = !homePracticeLogged;
    setHomePracticeLogged(nextState);
    if (nextState) {
      playTactileFeedback('celebrate');
    } else {
      playTactileFeedback('uncheck');
    }
  };

  // Toggle routine item completion with tactile sound & celebration
  const handleToggleRoutine = (routineId: string) => {
    if (activeProfileId === 'custom') {
      if (!customProfile) return;
      const updated = customProfile.routines.map((r) =>
        r.id === routineId ? { ...r, completed: !r.completed } : r
      );
      const isDone = updated.find((r) => r.id === routineId)?.completed;
      const allDone = updated.every((r) => r.completed);
      if (allDone) {
        playTactileFeedback('celebrate');
      } else if (isDone) {
        playTactileFeedback('chime');
      } else {
        playTactileFeedback('uncheck');
      }
      setCustomProfile({ ...customProfile, routines: updated });
      return;
    }
    setProfiles((prev) => {
      const child = prev[activeProfileId];
      const updatedRoutines = child.routines.map((r) =>
        r.id === routineId ? { ...r, completed: !r.completed } : r
      );
      const isDone = updatedRoutines.find((r) => r.id === routineId)?.completed;
      const allDone = updatedRoutines.every((r) => r.completed);
      if (allDone) {
        playTactileFeedback('celebrate');
      } else if (isDone) {
        playTactileFeedback('chime');
      } else {
        playTactileFeedback('uncheck');
      }
      return {
        ...prev,
        [activeProfileId]: { ...child, routines: updatedRoutines }
      };
    });
  };

  // Add/remove card from sentence builder with tactile sound
  const togglePicto = (pictoId: string) => {
    if (selectedPictoIds.includes(pictoId)) {
      playTactileFeedback('uncheck');
      setSelectedPictoIds(selectedPictoIds.filter((id) => id !== pictoId));
    } else {
      playTactileFeedback('pop');
      if (selectedPictoIds.length >= 4) {
        setSelectedPictoIds([...selectedPictoIds.slice(1), pictoId]);
      } else {
        setSelectedPictoIds([...selectedPictoIds, pictoId]);
      }
    }
  };

  // Stop vocalizing speech synthesis immediately
  const handleStopVocalizing = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsVocalizing(false);
    setNourMode('idle');
    playTactileFeedback('uncheck');
  };

  // Read sentence builder out loud using natural, calm human voice (with authentic Darija in Arabic mode)
  const handleVocalizeSentence = () => {
    if (selectedPictoIds.length === 0) return;
    playTactileFeedback('chime');

    let spokenSentence = '';
    if (isAr) {
      // Authentic Algerian Darija natural pronunciation with phonetic tashkeel
      const darijaWords = selectedPictoIds
        .map((id) => DARIJA_PICTO_SPOKEN[id] || (currentThemeConfig.pictos.find((p) => p.id === id)?.labelAr || ''))
        .filter(Boolean);
      spokenSentence = darijaWords.join(' ، وَ ');
    } else if (isEn) {
      const enWords = selectedPictoIds
        .map((id) => currentThemeConfig.pictos.find((p) => p.id === id)?.labelEn)
        .filter(Boolean);
      spokenSentence = enWords.join(', and ');
    } else {
      const frWords = selectedPictoIds
        .map((id) => currentThemeConfig.pictos.find((p) => p.id === id)?.labelFr)
        .filter(Boolean);
      spokenSentence = frWords.join(', et ');
    }

    setIsVocalizing(true);
    setNourMode('talking');

    speakHumanVoice({
      text: spokenSentence,
      lang: isAr ? 'ar' : isEn ? 'en' : 'fr',
      rate: 0.92, // deliberate, gentle, calm pace for speech therapy
      pitch: 1.0,
      onEnd: () => {
        setIsVocalizing(false);
        setNourMode('idle');
      }
    });
  };

  // Interact with Bunny companion (warm human voice in Darija, French & English)
  const handleNourInteraction = (intent: 'greeting' | 'encouragement' | 'calm') => {
    let spokenText = '';
    let bubbleText = '';
    const childName = isAr ? currentProfile.nameAr : isEn ? currentProfile.nameEn : currentProfile.nameFr;

    if (intent === 'greeting') {
      setNourMode('greeting');
      if (isAr) {
        spokenText = `يَا أَهْلًا بِيكْ يَا ${childName}! وَاشْ رَاكْ يَا الشَّاطِرْ؟ أَنَا بَانِي صْحِيبَكْ، رَانِي فَرْحَانْ بْزَافْ اللِّي رَاكْ مْعَايَا الْيَوْمْ فِي هَاذْ الْعَالَمْ الزِّينْ. هَيَّا نِلْعَبُو وَنِتْعَلَّمُو الْهَدْرَة مَعَ بَعْضْ!`;
        bubbleText = `يا أهلاً بيك يا ${childName}! واش راك يا الشاطر؟ أنا باني صحيبك، راني فرحان بزاف اللي راك معايا اليوم. هيا نلعبو ونتعلمو الهدرة مع بعض!`;
      } else if (isEn) {
        spokenText = `Hello my friend ${childName}! I'm Bunny, your gentle friend. I'm so happy to be here with you today! Let's play and discover new words together.`;
        bubbleText = `Hello ${childName}! I am Bunny, your encouraging friend for speech, play and growing together.`;
      } else {
        spokenText = `Bonjour mon petit ${childName} ! C'est Bunny, ton compagnon bienveillant. Je suis tellement heureux d'être avec toi aujourd'hui ! Viens, on va s'amuser et explorer les mots ensemble.`;
        bubbleText = `Bonjour ${childName} ! Je suis Bunny, ton compagnon bienveillant pour t'exprimer et explorer en toute confiance.`;
      }
    } else if (intent === 'encouragement') {
      setNourMode('talking');
      if (isAr) {
        spokenText = `يَعْطِيكْ الصِّحَّة يَا بَطَلْ! رَاكْ فُورْ بْزَافْ وَخِدْمَتْكَ هَايْلَة. كُلّْ كَلِمَة تْقُولْهَا وَكُلّْ بِطَاقَة تْخَيَّرْهَا رَانَا فَرْحَانِينْ بِيكْ وَبْنُطْقَكْ، كَمِّلْ هَاكْذَا يَا الشَّاطِرْ رَاكْ فَرْحَتْنَا!`;
        bubbleText = `يعطيك الصحة يا بطل! راك فور بزاف وخدمتك هايلة. كل كلمة تقولها وكل بطاقة تخيرها رانا فرحانين بيك وبنطقك، كمل هكذا يا الشاطر!`;
      } else if (isEn) {
        spokenText = `You are doing amazing, little champion! Every single word you try and card you share makes us all so proud. Keep shining!`;
        bubbleText = `Amazing effort! Every card you choose and word you try is a wonderful milestone to celebrate together.`;
      } else {
        spokenText = `Bravo champion ! Tu fais des progrès formidables. Chaque mot prononcé et chaque carte choisie est une vraie victoire, je suis très fier de toi !`;
        bubbleText = `Bravo champion ! Chaque carte posée et chaque mot tenté est une magnifique victoire dont nous sommes fiers.`;
      }
    } else {
      setNourMode('calm');
      if (isAr) {
        spokenText = `هَيَّا نِتْنَفَّسُو مَعَ بَعْضْ بِالشْوِيَّة وَبِالرَّاحَة... تْنَفَّسْ بِالْعَقْلْ... شَهِيقْ هَادِي... وَخَرَّجْ النَّفَسْ... زَفِيرْ لَطِيفْ... رَاكْ فِي أَمَانْ وَعَالَمَكْ رَاهْ مُرْتَاحْ وَمَحْمِي.`;
        bubbleText = `هيا نتنفسو مع بعض بالشوية وبالراحة... تنفس بالعقل شهيق هادي... وخرج النفس زفير لطيف... راك في أمان وعالمك راه مرتاح ومحمي.`;
      } else if (isEn) {
        spokenText = `Let's take a slow, gentle breath together... Breathe in calmly... and breathe out softly... You are completely safe and comfortable here.`;
        bubbleText = `Let's take a gentle, deep breath together... Your world is calm, safe, and entirely yours.`;
      } else {
        spokenText = `Respirons tout doucement ensemble... Une douce inspiration paisible... et souffle calmement... Tu es en totale sécurité, détends-toi.`;
        bubbleText = `Prenons une profonde inspiration douce ensemble... Ton monde est apaisé, sécurisant et bienveillant.`;
      }
    }

    setCompanionBubble(bubbleText);

    speakHumanVoice({
      text: spokenText,
      lang: isAr ? 'ar' : isEn ? 'en' : 'fr',
      rate: intent === 'calm' ? 0.84 : 0.92,
      pitch: 1.0,
      onEnd: () => setNourMode(intent === 'calm' ? 'calm' : 'idle')
    });
  };

  // Launch Genesis Generation Sequence
  const handleLaunchGenesis = () => {
    if (wizardName.trim().length < 3) return;
    playTactileFeedback('chime');
    setIsGeneratingWorld(true);
    setGenerationStep(1);

    setTimeout(() => setGenerationStep(2), 800);
    setTimeout(() => setGenerationStep(3), 1600);
    setTimeout(() => {
      // Create custom profile
      const newCustom: ChildProfileData = {
        id: 'custom',
        nameAr: wizardName.trim(),
        nameFr: wizardName.trim(),
        nameEn: wizardName.trim(),
        age: wizardAge,
        theme: wizardTheme,
        speechGoalAr: 'اكتشاف مفردات مخصصة والتواصل اللمسي السلس',
        speechGoalFr: 'Communication sensorielle sur mesure et enrichissement lexical',
        speechGoalEn: 'Tailored sensory communication and progressive vocabulary',
        specialistName: 'Dr. Dahmani',
        specialistRoleAr: 'أخصائي التربية والتخاطب المعتمد',
        specialistRoleFr: 'Orthophoniste Référent',
        specialistRoleEn: 'Consulting Specialist',
        routines: [
          { id: 'c1', iconName: 'sunrise', titleAr: 'استكشاف العالم الرقمي الجديد', titleFr: 'Découverte du nouvel univers 3D', titleEn: 'Explore the new 3D world', completed: true },
          { id: 'c2', iconName: 'bot', titleAr: 'لقاء الرفيق باني وتبادل التحية', titleFr: 'Première salutation avec Bunny', titleEn: 'First greeting with Bunny', completed: true },
          { id: 'c3', iconName: 'layers', titleAr: 'بناء أول جملة تواصل معبرة', titleFr: 'Première phrase sur la bande CAA', titleEn: 'First phrase on AAC strip', completed: false }
        ]
      };
      setCustomProfile(newCustom);
      setActiveProfileId('custom');
      setIsGeneratingWorld(false);
      setActiveTab('world');
      playTactileFeedback('celebrate');
    }, 2400);
  };

  // Selected Picto Objects
  const selectedPictos = selectedPictoIds
    .map((id) => currentThemeConfig.pictos.find((p) => p.id === id))
    .filter((p): p is typeof currentThemeConfig.pictos[0] => p !== undefined);

  return (
    <section id="experience" className="py-20 max-w-[1440px] mx-auto px-4 sm:px-8 scroll-mt-24 relative overflow-hidden">
      {/* Target anchor IDs for backward compatibility */}
      <div id="creator" className="absolute -top-28 pointer-events-none" />
      <div id="child-world" className="absolute -top-28 pointer-events-none" />
      <div id="ai-companion" className="absolute -top-28 pointer-events-none" />

      {/* Decorative ambient background */}
      <div className="absolute top-1/4 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-r from-[#2868C7]/12 via-[#D8BE83]/10 to-[#D58C7A]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ---------------------------------------------------- */}
      {/* 1. SECTION HEADER: THE SINGLE CONSOLIDATED EXPERIENCE */}
      {/* ---------------------------------------------------- */}
      <ScrollReveal>
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#2868C7]/10 text-[#2868C7] px-4 py-1.5 rounded-full border border-[#2868C7]/20 text-xs font-extrabold uppercase tracking-wider shadow-xs">
            <Sparkles size={14} className="text-[#2868C7]" />
            <span>
              {isAr
                ? 'تجربة تفاعلية موحدة • المنظومة الكاملة للطفل والعائلة'
                : isEn
                ? 'Unified 3D Experience • Complete Child & Family Journey'
                : 'Expérience 3D Unifiée • Le Voyage Complet de la Famille'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-black text-[#172B46] tracking-tight leading-tight">
            {isAr
              ? 'عالم رقمي ثلاثي الأبعاد مصمم على مقاس كل طفل'
              : isEn
              ? 'A living 3D universe tailored to each child'
              : 'Un univers 3D vivant et sur mesure pour chaque enfant'}
          </h2>

          <p className="text-base sm:text-lg text-[#5B6E85] leading-relaxed">
            {isAr
              ? 'حساب أبوي واحد يدير عوالم مستقلة تماماً لأبنائه. شاهد كيف يتحول الملف إلى عالم ثلاثي الأبعاد ينبض بالحياة، يتواصل فيه الطفل عبر لوحة ناطقة وبمرافقة الرفيق باني وتنسيق الأخصائي.'
              : isEn
              ? 'One family account orchestrating isolated child universes. Watch how a profile awakens into a living 3D world with talking AAC cards, Bunny the 3D companion, and specialist synchronization.'
              : 'Un compte familial unique orchestrant des univers d\'enfants étanches. Découvrez la naissance d\'un monde 3D vivant avec bande-phrase CAA sonore, compagnon Bunny et coordination clinique.'}
          </p>

          {/* Top Control Tabs */}
          <div className="pt-4 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => setActiveTab('hub')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all border flex items-center gap-2 cursor-pointer ${
                activeTab === 'hub'
                  ? 'bg-[#172B46] text-white border-[#172B46] shadow-md scale-105'
                  : 'bg-white/80 text-[#172B46] border-[#A9C5D8]/50 hover:bg-white'
              }`}
            >
              <Users size={14} className="text-[#D8BE83]" />
              <span>{isAr ? '1. فضاء العائلة' : isEn ? '1. Family Hub' : '1. Espace Famille'}</span>
            </button>

            <button
              onClick={() => setActiveTab('wizard')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all border flex items-center gap-2 cursor-pointer ${
                activeTab === 'wizard'
                  ? 'bg-[#2868C7] text-white border-[#2868C7] shadow-md scale-105'
                  : 'bg-white/80 text-[#172B46] border-[#A9C5D8]/50 hover:bg-white'
              }`}
            >
              <UserPlus size={14} className="text-[#A9C5D8]" />
              <span>{isAr ? '2. تهيئة ملف وعالم جديد' : isEn ? '2. Setup Profile & World' : '2. Configurer un Profil'}</span>
            </button>

            <button
              onClick={() => setActiveTab('world')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all border flex items-center gap-2 cursor-pointer ${
                activeTab === 'world'
                  ? 'bg-gradient-to-r from-[#2868C7] to-[#172B46] text-white border-[#2868C7] shadow-md scale-105'
                  : 'bg-white/80 text-[#172B46] border-[#A9C5D8]/50 hover:bg-white'
              }`}
            >
              <Orbit size={14} className="text-[#D8BE83] animate-spin" style={{ animationDuration: '8s' }} />
              <span>
                {isAr
                  ? `3. العالم ثلاثي الأبعاد (${currentProfile.nameAr})`
                  : isEn
                  ? `3. Live 3D World (${currentProfile.nameEn})`
                  : `3. Monde 3D Actif (${currentProfile.nameFr})`}
              </span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* ---------------------------------------------------- */}
      {/* 2. MAIN INTERACTIVE CONTAINER */}
      {/* ---------------------------------------------------- */}
      <div className="bg-white/85 backdrop-blur-xl rounded-[36px] sm:rounded-[44px] p-4 sm:p-8 lg:p-10 border border-[#A9C5D8]/40 shadow-2xl relative overflow-hidden transition-all">
        
        {/* Top Sandbox Notice Bar */}
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#A9C5D8]/30 flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-[#172B46]">
              {isAr
                ? 'نموذج محاكاة تفاعلي حي • بيانات تجريبية معزولة تماماً'
                : isEn
                ? 'Live Interactive Simulation • Local Isolated State'
                : 'Simulation Interactive en Direct • Données Fictives Sécurisées'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Sibling Switcher Chip */}
            <div className="flex items-center gap-1 bg-[#F5F6F3] p-1 rounded-full border border-[#A9C5D8]/40 text-xs">
              <button
                onClick={() => {
                  playTactileFeedback('chime');
                  setActiveProfileId('yanis');
                  setActiveTab('world');
                }}
                className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeProfileId === 'yanis'
                    ? 'bg-[#2868C7] text-white shadow-xs'
                    : 'text-[#172B46]/70 hover:text-[#172B46]'
                }`}
              >
                <Orbit size={13} />
                <span>{isAr ? 'يانيس (6 سنوات)' : 'Yanis (6 ans)'}</span>
              </button>

              <button
                onClick={() => {
                  playTactileFeedback('chime');
                  setActiveProfileId('amina');
                  setActiveTab('world');
                }}
                className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeProfileId === 'amina'
                    ? 'bg-[#2D7A58] text-white shadow-xs'
                    : 'text-[#172B46]/70 hover:text-[#172B46]'
                }`}
              >
                <Sprout size={13} />
                <span>{isAr ? 'أمينة (4 سنوات)' : 'Amina (4 ans)'}</span>
              </button>

              {customProfile && (
                <button
                  onClick={() => {
                    playTactileFeedback('chime');
                    setActiveProfileId('custom');
                    setActiveTab('world');
                  }}
                  className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeProfileId === 'custom'
                      ? 'bg-[#D58C7A] text-white shadow-xs'
                      : 'text-[#172B46]/70 hover:text-[#172B46]'
                  }`}
                >
                  <Sparkles size={13} />
                  <span>{isAr ? customProfile.nameAr : customProfile.nameFr}</span>
                </button>
              )}
            </div>

            <button
              onClick={() => {
                playTactileFeedback('uncheck');
                setProfiles(DEFAULT_PROFILES);
                setActiveProfileId('yanis');
                setActiveTab('world');
                setSelectedPictoIds(['water', 'puzzle']);
                setCompanionBubble(null);
              }}
              className="text-xs font-semibold text-[#5B6E85] hover:text-[#2868C7] flex items-center gap-1 transition-colors cursor-pointer"
              title="Réinitialiser"
            >
              <RotateCcw size={13} />
              <span className="hidden sm:inline">{isAr ? 'إعادة ضبط' : isEn ? 'Reset' : 'Réinitialiser'}</span>
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* VIEW 1: FAMILY HUB (PARENT ACCOUNT & SIBLINGS) */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'hub' && (
          <motion.div
            key="tab-hub"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Account Card Header */}
            <div className="bg-gradient-to-r from-[#172B46] to-[#1E3A5F] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#D8BE83] shadow-inner">
                  <Users size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-black">
                      {isAr ? 'حساب العائلة • منصوري' : isEn ? 'Mansouri Family Account' : 'Compte Famille Mansouri'}
                    </h3>
                    <span className="text-xs bg-[#2868C7] px-2.5 py-0.5 rounded-full font-bold">
                      {isAr ? 'ولي أمر رئيسي' : isEn ? 'Primary Guardian' : 'Parent Responsable'}
                    </span>
                  </div>
                  <p className="text-sm text-[#A9C5D8] mt-1">
                    {isAr
                      ? 'الجزائر • رقم الهاتف المحمي: 0550 ** ** **'
                      : isEn
                      ? 'Algeria • Verified phone: 0550 ** ** **'
                      : 'Algérie • Numéro vérifié : 0550 ** ** **'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl border border-white/15 text-xs text-emerald-300 font-bold">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>
                  {isAr ? 'حماية البيانات (القانون 18-07)' : isEn ? 'Law 18-07 Protected' : 'Protection Loi 18-07 active'}
                </span>
              </div>
            </div>

            {/* Sibling Isolation Explainer Banner */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3 text-amber-900 text-xs sm:text-sm">
              <Lock size={18} className="text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold mb-0.5">
                  {isAr
                    ? 'مبدأ الفصل التام بين عوالم الإخوة (Isolation by Design):'
                    : isEn
                    ? 'Strict Sibling Workspace Isolation (Isolation by Design):'
                    : 'Cloisonnement Strict des Profils Fratrie (Isolation by Design) :'}
                </p>
                <p className="text-amber-800 leading-relaxed">
                  {isAr
                    ? 'يانيس وأمينة مسجلان تحت حساب أبوي واحد، لكن لكل طفل عالماً مستقلاً بنظام تواصل وبطاقات وروتين مخصص تماماً لحالته الحركية واللغوية دون أي تداخل.'
                    : isEn
                    ? 'Yanis and Amina share one parent account, but each has an entirely isolated digital world with personalized vocabulary, sensory pacing, and routine goals.'
                    : 'Yanis et Amina partagent un seul compte parent, mais chacun dispose d\'un univers dédié, étanche, avec son propre vocabulaire, sa régulation sensorielle et ses objectifs.'}
                </p>
              </div>
            </div>

            {/* Sibling Profile Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Card: Yanis */}
              <div className="bg-white rounded-3xl p-6 border-2 border-[#2868C7]/30 shadow-md hover:shadow-xl transition-all space-y-5 text-start relative overflow-hidden">
                <div className="absolute top-0 end-0 w-32 h-32 bg-[#2868C7]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#2868C7]/15 border border-[#2868C7]/30 flex items-center justify-center text-[#2868C7] shadow-xs">
                      <Orbit size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-[#172B46]">
                        {isAr ? 'يانيس' : 'Yanis'}
                      </h4>
                      <p className="text-xs text-gray-500 font-semibold">
                        6 {isAr ? 'سنوات' : 'ans'} • {isAr ? 'كوكب الأصوات والفضاء' : isEn ? 'Cosmic Speech Explorer' : 'Monde Céleste & Phonétique'}
                      </p>
                    </div>
                  </div>
                  <span className="bg-[#2868C7]/10 text-[#2868C7] text-xs font-bold px-2.5 py-1 rounded-full">
                    {isAr ? 'تخاطب نشط' : isEn ? 'Active Speech' : 'Orthophonie active'}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="bg-[#F5F6F3] p-3 rounded-xl space-y-1">
                    <span className="text-gray-500 font-bold block">{isAr ? 'الهدف التواصلي الأسبوعي:' : isEn ? 'Weekly Target:' : 'Objectif hebdomadaire :'}</span>
                    <p className="text-[#172B46] font-semibold">{isAr ? profiles.yanis.speechGoalAr : isEn ? profiles.yanis.speechGoalEn : profiles.yanis.speechGoalFr}</p>
                  </div>
                  <div className="flex items-center justify-between text-gray-600 font-medium pt-1">
                    <span>{isAr ? 'الأخصائي المعتمد:' : isEn ? 'Approved Specialist:' : 'Spécialiste agréé :'}</span>
                    <span className="font-bold text-[#172B46]">{profiles.yanis.specialistName}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playTactileFeedback('chime');
                    setActiveProfileId('yanis');
                    setActiveTab('world');
                  }}
                  className="w-full py-3 rounded-2xl bg-[#2868C7] hover:bg-[#1f54a3] text-white font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>{isAr ? 'الدخول إلى عالم يانيس 3D' : isEn ? 'Enter Yanis\' 3D World' : 'Entrer dans le monde de Yanis 3D'}</span>
                  <ArrowRight size={16} className="rtl:rotate-180" />
                </button>
              </div>

              {/* Profile Card: Amina */}
              <div className="bg-white rounded-3xl p-6 border-2 border-[#2D7A58]/30 shadow-md hover:shadow-xl transition-all space-y-5 text-start relative overflow-hidden">
                <div className="absolute top-0 end-0 w-32 h-32 bg-[#2D7A58]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#2D7A58]/15 border border-[#2D7A58]/30 flex items-center justify-center text-[#2D7A58] shadow-xs">
                      <Sprout size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-[#172B46]">
                        {isAr ? 'أمينة' : 'Amina'}
                      </h4>
                      <p className="text-xs text-gray-500 font-semibold">
                        4 {isAr ? 'سنوات' : 'ans'} • {isAr ? 'كوكب الطبيعة والهدوء' : isEn ? 'Nature & Routines' : 'Jardin Douceur & Routines'}
                      </p>
                    </div>
                  </div>
                  <span className="bg-[#2D7A58]/10 text-[#2D7A58] text-xs font-bold px-2.5 py-1 rounded-full">
                    {isAr ? 'تواصل حسي' : isEn ? 'Sensory Calm' : 'Apaisement sensoriel'}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="bg-[#F5F6F3] p-3 rounded-xl space-y-1">
                    <span className="text-gray-500 font-bold block">{isAr ? 'الهدف التواصلي الأسبوعي:' : isEn ? 'Weekly Target:' : 'Objectif hebdomadaire :'}</span>
                    <p className="text-[#172B46] font-semibold">{isAr ? profiles.amina.speechGoalAr : isEn ? profiles.amina.speechGoalEn : profiles.amina.speechGoalFr}</p>
                  </div>
                  <div className="flex items-center justify-between text-gray-600 font-medium pt-1">
                    <span>{isAr ? 'الأخصائي المعتمد:' : isEn ? 'Approved Specialist:' : 'Spécialiste agréé :'}</span>
                    <span className="font-bold text-[#172B46]">{profiles.amina.specialistName}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playTactileFeedback('chime');
                    setActiveProfileId('amina');
                    setActiveTab('world');
                  }}
                  className="w-full py-3 rounded-2xl bg-[#2D7A58] hover:bg-[#236045] text-white font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>{isAr ? 'الدخول إلى عالم أمينة 3D' : isEn ? 'Enter Amina\'s 3D World' : 'Entrer dans le monde d\'Amina 3D'}</span>
                  <ArrowRight size={16} className="rtl:rotate-180" />
                </button>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => {
                  playTactileFeedback('click');
                  setActiveTab('wizard');
                }}
                className="bg-white hover:bg-gray-50 text-[#172B46] border-2 border-dashed border-[#2868C7]/50 hover:border-[#2868C7] font-bold text-sm px-6 py-3.5 rounded-2xl transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-98"
              >
                <UserPlus size={16} className="text-[#2868C7]" />
                <span>{isAr ? '+ إضافة وتخصيص عالم لطفل جديد' : isEn ? '+ Configure New Child World' : '+ Configurer un nouvel univers enfant'}</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 2: PROFILE SETUP & 3D GENESIS WIZARD */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'wizard' && (
          <motion.div
            key="tab-wizard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {isGeneratingWorld ? (
              /* Real-time Genesis Animation State */
              <div className="py-16 text-center space-y-6 max-w-md mx-auto">
                <div className="relative w-32 h-32 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2868C7] via-[#D8BE83] to-[#D58C7A] animate-spin blur-md opacity-80" />
                  <div className="relative w-full h-full rounded-full bg-[#172B46] flex items-center justify-center shadow-2xl border-2 border-white/20 text-white">
                    {renderThemeIcon(wizardTheme, 'w-14 h-14 text-white drop-shadow-md')}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-[#172B46]">
                    {isAr
                      ? `جاري توليد عالم "${wizardName}"...`
                      : isEn
                      ? `Generating ${wizardName}'s 3D Universe...`
                      : `Génération du monde 3D de ${wizardName}...`}
                  </h3>
                  <p className="text-sm text-[#5B6E85]">
                    {generationStep === 1 && (isAr ? 'تهيئة الواجهة المريحة حسياً وحجم الأزرار...' : isEn ? 'Configuring sensory filters and responsive layout...' : 'Configuration des filtres sensoriels et de l\'ergonomie...')}
                    {generationStep === 2 && (isAr ? 'مزامنة بطاقات التواصل البديل الموصى بها...' : isEn ? 'Loading adapted AAC sentence strip...' : 'Chargement de la bande-phrase CAA adaptée...')}
                    {generationStep === 3 && (isAr ? 'استيقاظ الرفيق باني في المشهد ثلاثي الأبعاد...' : isEn ? 'Initializing 3D companion Bunny...' : 'Initialisation du compagnon 3D Bunny...')}
                  </p>
                </div>

                {/* Progress Dots */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  <span className={`w-3 h-3 rounded-full transition-all ${generationStep >= 1 ? 'bg-[#2868C7] scale-110' : 'bg-gray-200'}`} />
                  <span className={`w-3 h-3 rounded-full transition-all ${generationStep >= 2 ? 'bg-[#D8BE83] scale-110' : 'bg-gray-200'}`} />
                  <span className={`w-3 h-3 rounded-full transition-all ${generationStep >= 3 ? 'bg-[#D58C7A] scale-110' : 'bg-gray-200'}`} />
                </div>
              </div>
            ) : (
              /* Wizard Step-by-Step Configuration */
              <div className="space-y-8">
                <div className="text-start space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-[#172B46]">
                    {isAr ? 'تهيئة ملف وعالم ثلاثي الأبعاد للطفل' : isEn ? 'Child 3D World Configuration' : 'Configuration du Monde 3D de l\'Enfant'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {isAr
                      ? 'حدد اسم الطفل، عمره، والبيئة البصرية المفضلة لإنشاء عالمه الخاص فورياً.'
                      : isEn
                      ? 'Define child name, age, and preferred universe to generate their 3D workspace in real-time.'
                      : 'Définissez le prénom, l\'âge et l\'univers visuel pour donner vie à son espace 3D.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                  {/* Step A: Child Identity Form */}
                  <div className="bg-[#F5F6F3] p-6 rounded-3xl space-y-5 text-start border border-[#A9C5D8]/40 h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      <h4 className="text-sm font-extrabold uppercase text-[#2868C7] tracking-wider flex items-center gap-2">
                        <UserPlus size={16} />
                        <span>{isAr ? 'أ. هوية ملف الطفل' : isEn ? 'A. Child Profile Details' : 'A. Profil de l\'enfant'}</span>
                      </h4>

                      {/* Name input (min length 3, max length 200) */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-[#172B46]">
                          <label>{isAr ? 'اسم الطفل أو كنيته المحببة' : isEn ? 'Child Name or Nickname' : 'Prénom ou diminutif de l\'enfant'}</label>
                          <span className="text-[10px] text-gray-400 font-semibold">{wizardName.length}/200</span>
                        </div>
                        <input
                          type="text"
                          minLength={3}
                          maxLength={200}
                          required
                          value={wizardName}
                          onChange={(e) => setWizardName(e.target.value)}
                          placeholder="Rayan"
                          className="w-full bg-white px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2868C7] text-sm font-bold text-[#172B46]"
                        />
                        {wizardName.trim().length > 0 && wizardName.trim().length < 3 && (
                          <p className="text-[10px] text-amber-600 font-semibold">
                            {isAr ? 'يجب أن يتكون الاسم من 3 أحرف على الأقل.' : isEn ? 'Name must be at least 3 characters.' : 'Le prénom doit comporter au moins 3 caractères.'}
                          </p>
                        )}
                      </div>

                      {/* Age direct number input */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-[#172B46]">
                          <span>{isAr ? 'عمر الطفل' : isEn ? 'Child Age' : 'Âge de l\'enfant'}</span>
                          <span className="text-[#2868C7] font-black">{wizardAge} {isAr ? 'سنوات' : 'ans'}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={wizardAge}
                            onChange={(e) => {
                              const val = Math.max(0, Math.min(100, Number(e.target.value) || 0));
                              setWizardAge(val);
                            }}
                            className="w-20 bg-white px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2868C7] text-sm font-bold text-[#172B46] text-center"
                          />
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={wizardAge}
                            onChange={(e) => setWizardAge(Number(e.target.value))}
                            className="flex-1 accent-[#2868C7] cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Non-Diagnostic Protection Pill */}
                    <div className="bg-white/90 p-3.5 rounded-2xl border border-gray-200 text-xs text-gray-500 space-y-1 mt-4">
                      <span className="font-bold text-[#172B46] flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        {isAr ? 'ضمان الخصوصية وعدم التشخيص:' : isEn ? 'Privacy & Non-Diagnostic Guarantee:' : 'Périmètre sécurisé non-médical :'}
                      </span>
                      <p className="text-[11px] leading-tight">
                        {isAr
                          ? 'أفق لا يقوم بأي تشخيص طبي أو فرز سريري، بل يوفر واجهة تفاعلية تخضع لتوجيه الأخصائي والولي.'
                          : isEn
                          ? 'OFOQ provides no clinical diagnosis. The interface is purely pedagogical and communication-focused.'
                          : 'OFOQ n\'émet aucun diagnostic médical. L\'espace est conçu pour soutenir la communication quotidienne.'}
                      </p>
                    </div>
                  </div>

                  {/* Step B: Universe Theme Selection with Premium Linear Glassmorphism */}
                  <div className="bg-[#F5F6F3] p-6 rounded-3xl space-y-4 text-start border border-[#A9C5D8]/40 h-full flex flex-col justify-between">
                    <h4 className="text-sm font-extrabold uppercase text-[#2868C7] tracking-wider flex items-center gap-2">
                      <Palette size={16} />
                      <span>{isAr ? 'ب. اختيار ثيم العالم الرقمي' : isEn ? 'B. 3D Universe Selection' : 'B. Sélection de l\'univers 3D'}</span>
                    </h4>

                    <div className="grid grid-cols-2 gap-3.5">
                      {(Object.keys(THEMES) as ThemeKey[]).map((themeKey) => {
                        const th = THEMES[themeKey];
                        const isSelected = wizardTheme === themeKey;
                        return (
                          <button
                            key={themeKey}
                            type="button"
                            onClick={() => {
                              playTactileFeedback('click');
                              setWizardTheme(themeKey);
                            }}
                            className={`p-3.5 rounded-2xl border text-start transition-all cursor-pointer flex flex-col justify-between gap-3 relative overflow-hidden backdrop-blur-md bg-gradient-to-br ${th.cardGradient} ${
                              isSelected
                                ? 'border-[#2868C7] shadow-lg ring-2 ring-[#2868C7]/30 scale-102 bg-white'
                                : 'border-gray-200/80 hover:border-gray-300 shadow-2xs hover:bg-white/80'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="w-9 h-9 rounded-xl bg-white/80 border border-white/60 flex items-center justify-center text-[#172B46] shadow-2xs">
                                {renderThemeIcon(themeKey, 'w-5 h-5 text-[#2868C7]')}
                              </div>
                              {/* Palette Swatches */}
                              <div className="flex items-center gap-1">
                                {th.swatches.map((color, idx) => (
                                  <span
                                    key={idx}
                                    className="w-2.5 h-2.5 rounded-full border border-black/10 shadow-2xs"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-black text-[#172B46] leading-tight">
                                {isAr ? th.nameAr : isEn ? th.nameEn : th.nameFr}
                              </p>
                              <span className="text-[10px] text-gray-500 font-semibold block mt-0.5">
                                {isAr ? th.subtitleAr : isEn ? th.subtitleEn : th.subtitleFr}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="text-[11px] text-gray-500 italic pt-1">
                      {isAr
                        ? 'توليد ديناميكي بدرجات لونية متوازنة ومريحة حسياً للطفل.'
                        : isEn
                        ? 'Generative themes adapted to sensory comfort and predictable interactions.'
                        : 'Thèmes immersifs adaptés au confort sensoriel et à la prévisibilité visuelle.'}
                    </div>
                  </div>
                </div>

                {/* Launch Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 flex-wrap gap-4">
                  <button
                    onClick={() => {
                      playTactileFeedback('click');
                      setActiveTab('hub');
                    }}
                    className="text-xs font-bold text-gray-500 hover:text-[#172B46] flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft size={14} className="rtl:rotate-180" />
                    <span>{isAr ? 'العودة إلى فضاء العائلة' : isEn ? 'Back to Family Hub' : 'Retour à l\'Espace Famille'}</span>
                  </button>

                  <button
                    onClick={handleLaunchGenesis}
                    disabled={wizardName.trim().length < 3}
                    className={`font-extrabold text-sm px-8 py-3.5 rounded-full shadow-xl transition-all flex items-center gap-2 cursor-pointer ${
                      wizardName.trim().length >= 3
                        ? 'bg-gradient-to-r from-[#2868C7] to-[#172B46] hover:from-[#1f54a3] hover:to-[#0f1e32] text-white hover:scale-102 active:scale-98'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Sparkles size={16} className="text-[#D8BE83]" />
                    <span>{isAr ? 'توليد العالم ثلاثي الأبعاد الآن' : isEn ? 'Generate 3D World Now' : 'Donner vie au Monde 3D'}</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 3: THE MASTER ACTIVE 3D CHILD WORLD */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'world' && (
          <motion.div
            key={`tab-world-${activeProfileId}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            {/* World Header Bar */}
            <div className={`p-4 sm:p-5 rounded-3xl bg-gradient-to-r ${currentThemeConfig.gradientBg} text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden`}>
              <div className="flex items-center gap-3.5 z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/30 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
                  {renderThemeIcon(currentProfile.theme, 'w-6 h-6 text-white drop-shadow-xs')}
                </div>
                <div className="text-start">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-black">
                      {isAr ? `عالم ${currentProfile.nameAr}` : isEn ? `${currentProfile.nameEn}'s World` : `Monde de ${currentProfile.nameFr}`}
                    </h3>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
                      {currentProfile.age} {isAr ? 'سنوات' : 'ans'}
                    </span>
                    <span className="text-xs bg-[#D8BE83] text-[#172B46] px-2.5 py-0.5 rounded-full font-extrabold">
                      {isAr ? currentThemeConfig.nameAr : isEn ? currentThemeConfig.nameEn : currentThemeConfig.nameFr}
                    </span>
                  </div>
                  <p className="text-xs text-[#A9C5D8] mt-0.5">
                    {isAr ? currentThemeConfig.subtitleAr : isEn ? currentThemeConfig.subtitleEn : currentThemeConfig.subtitleFr}
                  </p>
                </div>
              </div>

              {/* Sibling Switcher within World View */}
              <div className="flex items-center gap-2 z-10 w-full md:w-auto justify-between md:justify-end">
                <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/20 flex items-center gap-2 text-xs">
                  <span className="text-[#A9C5D8] text-[11px] font-semibold">
                    {isAr ? 'تبديل الأخ:' : isEn ? 'Switch child:' : 'Changer d\'enfant :'}
                  </span>
                  <button
                    onClick={() => {
                      playTactileFeedback('chime');
                      setActiveProfileId(activeProfileId === 'yanis' ? 'amina' : 'yanis');
                    }}
                    className="bg-white/20 hover:bg-white/30 text-white font-bold px-3 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    {activeProfileId === 'yanis' ? (
                      <>
                        <Sprout size={14} className="text-[#A9C5D8]" />
                        <span>{isAr ? 'أمينة (4 سنوات)' : 'Amina (4 ans)'}</span>
                      </>
                    ) : (
                      <>
                        <Orbit size={14} className="text-[#D8BE83]" />
                        <span>{isAr ? 'يانيس (6 سنوات)' : 'Yanis (6 ans)'}</span>
                      </>
                    )}
                    <ChevronRight size={14} className="rtl:rotate-180" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    playTactileFeedback('click');
                    setActiveTab('hub');
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl border border-white/20 transition-all cursor-pointer"
                  title="Retour Espace Famille"
                >
                  <Users size={16} />
                </button>
              </div>
            </div>

            {/* Sibling Isolation Notice Banner */}
            <div className="bg-[#172B46]/05 border border-[#172B46]/10 px-4 py-2.5 rounded-2xl flex items-center justify-between text-xs text-[#172B46] flex-wrap gap-2">
              <span className="flex items-center gap-2 font-bold">
                <Lock size={14} className="text-[#2868C7]" />
                {isAr
                  ? 'مساحة مستقلة ومحمية: بيانات ونطق الطفل لا تختلط مع ملف إخوته'
                  : isEn
                  ? 'Isolated workspace: routines and pictograms do not mix between siblings.'
                  : 'Espace autonome et étanche : les routines et pictogrammes ne se mélangent pas entre frères et sœurs.'}
              </span>
              <span className="text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
                {isAr ? 'عزل كامل' : 'Isolation 100%'}
              </span>
            </div>

            {/* ---------------------------------------------------- */}
            {/* SPLIT 3D SCENE: COMPANION (LEFT) & AAC/ROUTINES (RIGHT) */}
            {/* ---------------------------------------------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* LEFT COLUMN: 3D EMBEDDED COMPANION (BUNNY) WITH VOICE */}
              <div className="lg:col-span-5 bg-gradient-to-b from-white to-[#F5F6F3] rounded-3xl p-5 border border-[#A9C5D8]/40 shadow-lg flex flex-col justify-between space-y-4 text-start relative overflow-hidden">
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2868C7] animate-pulse" />
                    <span className="text-xs font-black text-[#172B46]">
                      {isAr ? 'الرفيق الذكي ثلاثي الأبعاد "باني"' : isEn ? 'Interactive 3D Companion "Bunny"' : 'Compagnon 3D Bienveillant "Bunny"'}
                    </span>
                  </div>
                  <span className="text-[10px] bg-[#2868C7]/10 text-[#2868C7] font-bold px-2 py-0.5 rounded-full">
                    {isAr ? 'تفاعلي ناطق' : isEn ? 'Voice Interactive' : 'Interactif & Vocal'}
                  </span>
                </div>

                {/* Speech Bubble Placed Cleanly ABOVE the 3D Canvas */}
                <AnimatePresence>
                  {companionBubble ? (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="relative bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl border border-[#2868C7]/30 text-xs text-[#172B46] space-y-1 z-20"
                    >
                      <div className="flex items-center justify-between font-extrabold text-[11px] text-[#2868C7]">
                        <span className="flex items-center gap-1.5">
                          <Sparkles size={13} className="text-[#D8BE83]" />
                          {isAr ? 'باني يتحدث إليك:' : isEn ? 'Bunny says:' : 'Bunny vous parle :'}
                        </span>
                        <button
                          onClick={() => {
                            playTactileFeedback('uncheck');
                            setCompanionBubble(null);
                          }}
                          className="text-gray-400 hover:text-gray-600 p-0.5 text-xs cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="font-semibold leading-relaxed text-[#172B46]">
                        {companionBubble}
                      </p>
                      {/* Downward pointer to Bunny */}
                      <div className="absolute -bottom-1.5 start-6 w-3 h-3 bg-white border-b border-r border-[#2868C7]/30 transform rotate-45" />
                    </motion.div>
                  ) : (
                    <div className="bg-[#2868C7]/06 border border-[#2868C7]/15 p-2.5 rounded-2xl flex items-center justify-between text-xs text-[#172B46] font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Smile size={14} className="text-[#2868C7]" />
                        {isAr ? 'انقر على باني أو اختر عبارة للتفاعل' : isEn ? 'Click Bunny or pick a reaction to chat' : 'Cliquez sur Bunny ou choisissez une réaction'}
                      </span>
                      <span className="text-[10px] font-bold text-[#2868C7] bg-white px-2 py-0.5 rounded-full shadow-2xs">
                        {isAr ? 'نشط' : 'Actif'}
                      </span>
                    </div>
                  )}
                </AnimatePresence>

                {/* Embedded Three.js WebGL Canvas with Bunny GLB Model (Lazy Loaded) */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#172B46]/05 to-[#2868C7]/10 border border-[#A9C5D8]/30">
                  <Suspense
                    fallback={
                      <div className="h-[320px] sm:h-[360px] flex flex-col items-center justify-center p-6 bg-white/60 backdrop-blur-xs space-y-3">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#172B46] to-[#2868C7] flex items-center justify-center shadow-lg animate-pulse">
                          <Bot size={34} className="text-[#D8BE83]" />
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-[#172B46]">
                          <Loader2 size={16} className="animate-spin text-[#2868C7]" />
                          <span>{isAr ? 'جاري تجهيز الرفيق باني...' : isEn ? 'Loading Bunny Companion...' : 'Chargement de Bunny...'}</span>
                        </div>
                      </div>
                    }
                  >
                    <Nour3DCanvas
                      theme={currentProfile.theme}
                      mode={nourMode}
                      isAr={isAr}
                      onClickCompanion={() => {
                        playTactileFeedback('click');
                        handleNourInteraction('greeting');
                      }}
                      className="h-[320px] sm:h-[360px]"
                    />
                  </Suspense>
                </div>

                {/* Companion Action Chips with Lucide Icons */}
                <div className="space-y-2 pt-1">
                  <p className="text-[10px] font-bold uppercase text-gray-500 tracking-wider flex items-center gap-1.5">
                    <MessageCircle size={12} className="text-[#2868C7]" />
                    <span>
                      {isAr ? 'تفاعل صوتي وتشجيعي مع باني:' : isEn ? 'Interact with Bunny:' : 'Interagir avec Bunny :'}
                    </span>
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        playTactileFeedback('click');
                        handleNourInteraction('greeting');
                      }}
                      className="p-2.5 rounded-2xl bg-white hover:bg-[#2868C7]/05 border border-gray-200 text-center transition-all text-xs font-bold text-[#172B46] hover:border-[#2868C7] flex flex-col items-center gap-1 cursor-pointer shadow-2xs active:scale-95"
                    >
                      <Hand size={18} className="text-[#2868C7]" />
                      <span className="text-[10px] leading-tight font-black">{isAr ? 'تحية' : isEn ? 'Greet' : 'Saluer'}</span>
                    </button>

                    <button
                      onClick={() => {
                        playTactileFeedback('chime');
                        handleNourInteraction('encouragement');
                      }}
                      className="p-2.5 rounded-2xl bg-white hover:bg-[#D8BE83]/10 border border-gray-200 text-center transition-all text-xs font-bold text-[#172B46] hover:border-[#D8BE83] flex flex-col items-center gap-1 cursor-pointer shadow-2xs active:scale-95"
                    >
                      <ThumbsUp size={18} className="text-[#D8BE83]" />
                      <span className="text-[10px] leading-tight font-black">{isAr ? 'تشجيع' : isEn ? 'Praise' : 'Bravo'}</span>
                    </button>

                    <button
                      onClick={() => {
                        playTactileFeedback('pop');
                        handleNourInteraction('calm');
                      }}
                      className="p-2.5 rounded-2xl bg-white hover:bg-[#2D7A58]/05 border border-gray-200 text-center transition-all text-xs font-bold text-[#172B46] hover:border-[#2D7A58] flex flex-col items-center gap-1 cursor-pointer shadow-2xs active:scale-95"
                    >
                      <Wind size={18} className="text-[#2D7A58]" />
                      <span className="text-[10px] leading-tight font-black">{isAr ? 'تنفس هادئ' : isEn ? 'Calm' : 'Apaiser'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: INTERACTIVE AAC COMMUNICATION BOARD & PRO COLLABORATION */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6 text-start">
                
                {/* 1. INTERACTIVE AAC SENTENCE BUILDER */}
                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#A9C5D8]/40 shadow-lg space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <h4 className="text-xs sm:text-sm font-black text-[#172B46] uppercase tracking-wider">
                        {isAr ? 'شريط التعبير والتواصل البديل (CAA)' : isEn ? 'AAC Communication Strip' : 'Bande-Phrase de Communication (CAA)'}
                      </h4>
                    </div>
                    <button
                      onClick={() => {
                        playTactileFeedback('uncheck');
                        setSelectedPictoIds([]);
                      }}
                      className="text-xs text-gray-400 hover:text-[#D58C7A] flex items-center gap-1 cursor-pointer"
                      title="Effacer"
                    >
                      <RotateCcw size={12} />
                      <span>{isAr ? 'مسح' : isEn ? 'Clear' : 'Effacer'}</span>
                    </button>
                  </div>

                  {/* Sentence Strip Container */}
                  <div className="min-h-[64px] bg-[#F5F6F3] rounded-2xl p-2.5 flex items-center justify-between gap-2 border-2 border-dashed border-[#A9C5D8]/60">
                    <div className="flex items-center gap-2 flex-wrap flex-1">
                      <AnimatePresence>
                        {selectedPictos.length === 0 ? (
                          <motion.p
                            key="empty-hint"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-[#172B46]/40 italic px-2"
                          >
                            {isAr
                              ? 'المس بطاقة من الأسفل لتركيب جملة التعبير...'
                              : isEn
                              ? 'Tap pictogram cards below to compose a request...'
                              : 'Touchez des cartes ci-dessous pour composer une phrase...'}
                          </motion.p>
                        ) : (
                          selectedPictos.map((picto) => (
                            <motion.div
                              key={picto.id}
                              layout
                              initial={{ scale: 0.7, opacity: 0, y: 6 }}
                              animate={{ scale: 1, opacity: 1, y: 0 }}
                              exit={{ scale: 0.7, opacity: 0 }}
                              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                              className="bg-white px-2.5 py-1.5 rounded-xl border border-[#2868C7]/30 shadow-xs flex items-center gap-2 group"
                            >
                              <span className={`w-6 h-6 rounded-lg ${picto.bgTint} ${picto.color} flex items-center justify-center shrink-0`}>
                                {renderPictoIcon(picto.iconName, 'w-3.5 h-3.5')}
                              </span>
                              <span className="text-xs font-black text-[#172B46]">
                                {isAr ? picto.labelAr : isEn ? picto.labelEn : picto.labelFr}
                              </span>
                            </motion.div>
                          ))
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Vocalize / Stop Action Buttons */}
                    <div className="flex items-center gap-2">
                      {isVocalizing ? (
                        <button
                          onClick={handleStopVocalizing}
                          className="px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer bg-[#D58C7A] hover:bg-[#c47a68] text-white active:scale-95 animate-pulse"
                          aria-label="Arrêter la voix"
                          title={isAr ? 'إيقاف نطق الجملة' : isEn ? 'Stop Speaking' : 'Arrêter la lecture'}
                        >
                          <Square size={14} className="fill-current text-white" />
                          <span>{isAr ? 'إيقاف الصوت' : isEn ? 'Stop' : 'Arrêter'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleVocalizeSentence}
                          disabled={selectedPictos.length === 0}
                          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer ${
                            selectedPictos.length === 0
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-[#2868C7] hover:bg-[#1f54a3] text-white active:scale-95'
                          }`}
                          aria-label="Vocaliser la phrase"
                        >
                          <Play size={16} className="fill-current" />
                          <span>{isAr ? 'نطق الجملة' : isEn ? 'Speak Out Loud' : 'Lire à voix haute'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 9 Tactile Pictogram Grid */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold text-gray-500">
                        {isAr
                          ? `بطاقات اليوم المعززة لعالم "${currentProfile.nameAr}":`
                          : isEn
                          ? `Communication cards for ${currentProfile.nameEn}'s universe:`
                          : `Cartes de communication pour l'univers de ${currentProfile.nameFr} :`}
                      </p>
                      <span className="text-[10px] text-gray-400 font-bold">
                        {selectedPictoIds.length} {isAr ? 'محددة' : isEn ? 'selected' : 'sélectionnées'}
                      </span>
                    </div>
                    {/* 2-Row Tactile Daily Pictogram Cards (Zero Truncation & Interactive Bounce) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2.5 sm:gap-3">
                      {currentThemeConfig.pictos.slice(0, 6).map((picto) => {
                        const isSelected = selectedPictoIds.includes(picto.id);
                        return (
                          <motion.button
                            key={picto.id}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.94 }}
                            animate={
                              isSelected
                                ? { scale: [1, 1.08, 0.98, 1.02], y: [0, -3, 0] }
                                : { scale: 1, y: 0 }
                            }
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            onClick={() => togglePicto(picto.id)}
                            className={`relative p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 select-none ${
                              isSelected
                                ? 'bg-white border-[#2868C7] shadow-md ring-2 ring-[#2868C7]/30 scale-102'
                                : 'bg-[#F5F6F3]/80 hover:bg-white border-gray-200/80 shadow-2xs hover:border-[#2868C7]/40'
                            }`}
                          >
                            {isSelected && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1.5 -start-1.5 w-5 h-5 rounded-full bg-[#2868C7] text-white flex items-center justify-center text-[10px] shadow-sm font-bold z-10"
                              >
                                <Check size={12} className="stroke-[3]" />
                              </motion.span>
                            )}
                            <div className={`w-11 h-11 rounded-2xl ${picto.bgTint} ${picto.color} flex items-center justify-center transition-transform group-hover:scale-110 shadow-2xs`}>
                              {renderPictoIcon(picto.iconName, 'w-5 h-5')}
                            </div>
                            <span className="text-xs font-black text-[#172B46] text-center leading-snug px-1">
                              {isAr ? picto.labelAr : isEn ? picto.labelEn : picto.labelFr}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 2. DAILY ROUTINE & SPECIALIST BRIDGE (PRO-PARENT SYNC) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                  {/* Daily Routine Checklist */}
                  <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#A9C5D8]/40 shadow-sm space-y-3 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-1.5 border-b border-gray-100 mb-2">
                        <span className="text-xs font-black text-[#172B46] flex items-center gap-1.5">
                          <CheckCircle2 size={14} className="text-[#2868C7]" />
                          {isAr ? 'الروتين اليومي المصور' : isEn ? 'Visual Routine' : 'Routine Visuelle'}
                        </span>
                        <span className="text-[10px] text-gray-500 font-extrabold flex items-center gap-1 bg-[#F5F6F3] px-2 py-0.5 rounded-full border border-gray-200">
                          <span>{currentProfile.routines.filter((r) => r.completed).length} / {currentProfile.routines.length}</span>
                          <Star size={11} className="text-[#D8BE83] fill-[#D8BE83]" />
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {currentProfile.routines.map((routine) => (
                          <motion.button
                            key={routine.id}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleToggleRoutine(routine.id)}
                            className={`w-full p-2.5 rounded-xl text-xs font-semibold text-start flex items-center justify-between transition-all cursor-pointer ${
                              routine.completed
                                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200/80 shadow-xs'
                                : 'bg-[#F5F6F3] text-gray-700 hover:bg-gray-100 border border-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className={`p-1 rounded-lg ${routine.completed ? 'bg-emerald-500/15 text-emerald-700' : 'bg-white text-gray-500'} shadow-2xs`}>
                                {renderRoutineIcon(routine.iconName, 'w-3.5 h-3.5')}
                              </span>
                              <span className="line-clamp-1 font-bold">
                                {isAr ? routine.titleAr : isEn ? routine.titleEn : routine.titleFr}
                              </span>
                            </div>
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                              routine.completed ? 'bg-emerald-500 text-white font-bold shadow-xs scale-105' : 'border-2 border-gray-300 hover:border-[#2868C7]'
                            }`}>
                              {routine.completed && <Check size={12} className="stroke-[3]" />}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Specialist Bridge (Pro Portal Contribution) */}
                  <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#A9C5D8]/40 shadow-sm space-y-3 h-full flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
                        <span className="text-xs font-black text-[#D58C7A] flex items-center gap-1.5">
                          <Stethoscope size={14} className="text-[#D58C7A]" />
                          {isAr ? 'مساهمة الأخصائي المعتمد' : isEn ? 'Specialist Portal' : 'Portail Spécialiste'}
                        </span>
                        <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200/60">
                          <CheckCircle2 size={10} className="text-emerald-500" />
                          <span>{isAr ? 'موافقة نشطة' : isEn ? 'Consent Active' : 'Consentement actif'}</span>
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#172B46]/10 flex items-center justify-center text-[#172B46] font-bold text-xs shrink-0">
                              <Award size={16} className="text-[#2868C7]" />
                            </div>
                            <div>
                              <p className="font-extrabold text-[#172B46]">{currentProfile.specialistName}</p>
                              <p className="text-[10px] text-gray-500">
                                {isAr ? currentProfile.specialistRoleAr : isEn ? currentProfile.specialistRoleEn : currentProfile.specialistRoleFr}
                              </p>
                            </div>
                          </div>
                          <span className="text-[9px] bg-[#F5F6F3] text-[#172B46] font-bold px-2 py-1 rounded-lg border border-gray-200/70 shrink-0">
                            {isAr ? 'تخاطب وظيفي • مستوى 1' : isEn ? 'Functional Speech • L1' : 'Orthophonie • Niv. 1'}
                          </span>
                        </div>

                        {/* Prescribed Target Card */}
                        <div className="bg-[#F5F6F3] p-3 rounded-2xl space-y-1.5 border border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase text-[#2868C7] tracking-wider block">
                              {isAr ? 'الهدف الموصى به للمنزل:' : isEn ? 'Prescribed Home Target:' : 'Cible préconisée à domicile :'}
                            </span>
                            <span className="text-[9px] text-gray-400 font-semibold flex items-center gap-1">
                              <Calendar size={10} />
                              {isAr ? 'عيادة الأمل • الأربعاء 14:00' : isEn ? 'Clinic • Wed 2:00 PM' : 'Cabinet • Mercredi 14h'}
                            </span>
                          </div>
                          <p className="text-[#172B46] font-bold text-xs leading-relaxed">
                            {isAr ? currentProfile.speechGoalAr : isEn ? currentProfile.speechGoalEn : currentProfile.speechGoalFr}
                          </p>
                        </div>

                        {/* Interactive Audio Guidance & Home Practice Collaboration */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                          <button
                            type="button"
                            onClick={handlePlaySpecialistGuidance}
                            className={`p-2 rounded-xl text-[10px] font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                              isPlayingGuidance
                                ? 'bg-[#D58C7A] text-white border-[#D58C7A] shadow-xs animate-pulse'
                                : 'bg-white hover:bg-[#F5F6F3] text-[#172B46] border-gray-200/80 shadow-2xs'
                            }`}
                          >
                            <Volume2 size={12} className={isPlayingGuidance ? 'animate-bounce text-white' : 'text-[#D58C7A]'} />
                            <span>
                              {isPlayingGuidance
                                ? (isAr ? 'جاري نطق التوجيه...' : isEn ? 'Playing audio...' : 'Écoute en cours...')
                                : (isAr ? 'استمع لتوجيه الأخصائي' : isEn ? 'Listen to Guidance' : 'Consigne de l\'orthophoniste')}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={handleToggleHomePractice}
                            className={`p-2 rounded-xl text-[10px] font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                              homePracticeLogged
                                ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                                : 'bg-white hover:bg-emerald-50 text-emerald-800 border-emerald-200/80 shadow-2xs'
                            }`}
                          >
                            {homePracticeLogged ? (
                              <>
                                <CheckCheck size={12} className="stroke-[2.5]" />
                                <span>{isAr ? 'تم إنجاز تدريب اليوم ✓' : isEn ? 'Home Practice Done ✓' : 'Séance validée ✓'}</span>
                              </>
                            ) : (
                              <>
                                <Star size={11} className="text-[#D8BE83] fill-[#D8BE83]" />
                                <span>{isAr ? 'تأكيد تدريب اليوم بالبيت' : isEn ? 'Log Home Practice' : 'Valider séance du jour'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-emerald-800 font-bold pt-2 border-t border-gray-100">
                      <span className="flex items-center gap-1.5">
                        <Sparkles size={11} className="text-emerald-600 shrink-0" />
                        <span>{isAr ? 'استمرارية حية بين الجلسة والبيت' : isEn ? 'Live session-to-home continuity' : 'Continuité cabinet-domicile active'}</span>
                      </span>
                      <span className="text-[9px] bg-emerald-100/70 text-emerald-900 px-2 py-0.5 rounded-full font-black">
                        {isAr ? 'مزامنة فورية' : isEn ? 'Real-time sync' : 'Sync temps réel'}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </motion.div>
        )}

      </div>
    </section>
  );
};
