import React, { useState } from 'react';
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
  Users,
  UserPlus,
  Heart,
  Orbit,
  ArrowRight,
  ArrowLeft,
  Star,
  Moon,
  Palette,
  Layers,
  Eye,
  Smile,
  Zap,
  MessageCircle,
  HelpCircle,
  ChevronRight,
  Compass
} from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';
import { Nour3DCanvas } from '../3d/Nour3DCanvas';

// ----------------------------------------------------
// THEMES & INTERFACE TYPES
// ----------------------------------------------------
type ThemeKey = 'space' | 'nature' | 'ocean' | 'creative';

interface ThemeConfig {
  id: ThemeKey;
  nameAr: string;
  nameFr: string;
  nameEn: string;
  subtitleAr: string;
  subtitleFr: string;
  subtitleEn: string;
  emoji: string;
  primaryColor: string;
  gradientBg: string;
  glowClass: string;
  pictos: {
    id: string;
    emoji: string;
    labelAr: string;
    labelFr: string;
    labelEn: string;
    category: 'needs' | 'activities' | 'feelings';
  }[];
}

const THEMES: Record<ThemeKey, ThemeConfig> = {
  space: {
    id: 'space',
    nameAr: 'كوكب الأصوات والفضاء',
    nameFr: 'Monde Céleste & Phonétique',
    nameEn: 'Cosmic Speech Explorer',
    subtitleAr: 'مستوحى من عوالم سبيستون • تحفيز مخارج الحروف وبناء الجمل',
    subtitleFr: 'Inspiré des galaxies Spacetoon • Phonation et construction de phrases',
    subtitleEn: 'Spacetoon-inspired cosmos • Speech stimulation and sentence building',
    emoji: '🪐',
    primaryColor: '#2868C7',
    gradientBg: 'from-[#172B46] via-[#1E54A3] to-[#2868C7]',
    glowClass: 'rgba(40, 104, 199, 0.4)',
    pictos: [
      { id: 'water', emoji: '🥤', labelAr: 'أريد ماء', labelFr: 'Boire de l\'eau', labelEn: 'Drink water', category: 'needs' },
      { id: 'apple', emoji: '🍎', labelAr: 'أريد تفاحة', labelFr: 'Manger une pomme', labelEn: 'Eat apple', category: 'needs' },
      { id: 'listen', emoji: '🎵', labelAr: 'أستمع للصوت', labelFr: 'Écouter le son', labelEn: 'Listen to sound', category: 'activities' },
      { id: 'speak', emoji: '🗣️', labelAr: 'أكرر الكلمة', labelFr: 'Répéter le mot', labelEn: 'Repeat word', category: 'activities' },
      { id: 'puzzle', emoji: '🧩', labelAr: 'ألعب بالتركيبات', labelFr: 'Faire un puzzle', labelEn: 'Play puzzle', category: 'activities' },
      { id: 'happy', emoji: '⭐', labelAr: 'أنا فخور بنطقي', labelFr: 'Je suis fier', labelEn: 'I feel proud', category: 'feelings' },
    ]
  },
  nature: {
    id: 'nature',
    nameAr: 'كوكب الطبيعة والهدوء',
    nameFr: 'Jardin Douceur & Routines',
    nameEn: 'Nature & Peaceful Routines',
    subtitleAr: 'بيئة نباتية مريحة حسياً • تنظيم محطات اليوم والروتين العائلي',
    subtitleFr: 'Environnement végétal apaisant • Régularité des transitions du quotidien',
    subtitleEn: 'Soothing botanical setting • Predictable transitions and daily structure',
    emoji: '🌿',
    primaryColor: '#2D7A58',
    gradientBg: 'from-[#172B46] via-[#1E5B40] to-[#2D7A58]',
    glowClass: 'rgba(45, 122, 88, 0.4)',
    pictos: [
      { id: 'snack', emoji: '🥪', labelAr: 'وجبة خفيفة', labelFr: 'Goûter', labelEn: 'Snack time', category: 'needs' },
      { id: 'rest', emoji: '🛋️', labelAr: 'استراحة هادئة', labelFr: 'Temps calme', labelEn: 'Quiet break', category: 'needs' },
      { id: 'play', emoji: '🧸', labelAr: 'ألعب بلطف', labelFr: 'Jouer doucement', labelEn: 'Play gently', category: 'activities' },
      { id: 'draw', emoji: '🎨', labelAr: 'أرسم بالألوان', labelFr: 'Dessiner', labelEn: 'Draw pictures', category: 'activities' },
      { id: 'hug', emoji: '🤗', labelAr: 'عناق دافئ', labelFr: 'Besoin d\'un câlin', labelEn: 'Need a hug', category: 'feelings' },
      { id: 'sleep', emoji: '🌙', labelAr: 'وقت النوم', labelFr: 'Dormir', labelEn: 'Bedtime', category: 'needs' },
    ]
  },
  ocean: {
    id: 'ocean',
    nameAr: 'كوكب البحار والتنفس',
    nameFr: 'Océan Apaisé & Émotions',
    nameEn: 'Ocean Haven & Regulation',
    subtitleAr: 'أمواج هادئة وألوان مائية • تنظيم المشاعر والتعبير بدون إجهاد',
    subtitleFr: 'Ambiance aquatique douce • Régulation émotionnelle et expression sans stress',
    subtitleEn: 'Gentle marine rhythm • Emotional regulation and low-stress communication',
    emoji: '🌊',
    primaryColor: '#0284C7',
    gradientBg: 'from-[#172B46] via-[#0369A1] to-[#0284C7]',
    glowClass: 'rgba(2, 132, 199, 0.4)',
    pictos: [
      { id: 'breathe', emoji: '🌸', labelAr: 'أتنفس بعمق', labelFr: 'Respirer calmement', labelEn: 'Deep breath', category: 'feelings' },
      { id: 'water', emoji: '🥤', labelAr: 'أشرب ماء', labelFr: 'Boire un verre d\'eau', labelEn: 'Glass of water', category: 'needs' },
      { id: 'music', emoji: '🎧', labelAr: 'أستمع لموسيقى هادئة', labelFr: 'Musique douce', labelEn: 'Calm music', category: 'activities' },
      { id: 'safe', emoji: '🛡️', labelAr: 'أنا في أمان', labelFr: 'Je suis en sécurité', labelEn: 'I am safe', category: 'feelings' },
      { id: 'break', emoji: '🛋️', labelAr: 'أحتاج هدنة', labelFr: 'Pause tranquille', labelEn: 'Sensory pause', category: 'needs' },
      { id: 'smile', emoji: '😊', labelAr: 'أشعر بالراحة', labelFr: 'Tout va bien', labelEn: 'Feeling good', category: 'feelings' },
    ]
  },
  creative: {
    id: 'creative',
    nameAr: 'كوكب الإبداع والقصص',
    nameFr: 'Atelier Couleurs & Histoires',
    nameEn: 'Creative Studio & Stories',
    subtitleAr: 'فضاء حيوي ودافئ • التعبير المصور، الرسم، والاحتفال بالإنجازات',
    subtitleFr: 'Espace chaleureux • Narration imagée et valorisation des progrès',
    subtitleEn: 'Vibrant expressive space • Visual stories and celebration of milestones',
    emoji: '🎨',
    primaryColor: '#D58C7A',
    gradientBg: 'from-[#172B46] via-[#C27765] to-[#D58C7A]',
    glowClass: 'rgba(213, 140, 122, 0.4)',
    pictos: [
      { id: 'story', emoji: '📖', labelAr: 'أقرأ قصة مصورة', labelFr: 'Lire une histoire', labelEn: 'Story time', category: 'activities' },
      { id: 'draw', emoji: '🖌️', labelAr: 'ألون لوحتي', labelFr: 'Peindre', labelEn: 'Painting', category: 'activities' },
      { id: 'puzzle', emoji: '🧩', labelAr: 'أركب الصور', labelFr: 'Assembler le puzzle', labelEn: 'Assemble puzzle', category: 'activities' },
      { id: 'bravo', emoji: '👏', labelAr: 'أحسنت يا بطل', labelFr: 'Bravo à moi', labelEn: 'Great effort', category: 'feelings' },
      { id: 'share', emoji: '💖', labelAr: 'أشارك مع أمي وأبي', labelFr: 'Partager avec mes parents', labelEn: 'Share with family', category: 'feelings' },
      { id: 'star', emoji: '⭐', labelAr: 'نجمة الإنجاز', labelFr: 'Étoile de réussite', labelEn: 'Achievement star', category: 'feelings' },
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
  avatarChar: string;
  speechGoalAr: string;
  speechGoalFr: string;
  speechGoalEn: string;
  specialistName: string;
  specialistRoleAr: string;
  specialistRoleFr: string;
  specialistRoleEn: string;
  routines: {
    id: string;
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
    avatarChar: '🪐',
    speechGoalAr: 'تدريب مخارج الحروف وبناء جملة من كلمتين (ماء + أريد)',
    speechGoalFr: 'Articulation des phonèmes et phrase à deux éléments (Boire + Eau)',
    speechGoalEn: 'Phonetic articulation and two-word requests (Drink + Water)',
    specialistName: 'Dr. Benali',
    specialistRoleAr: 'أخصائي تخاطب وأرطفونيا (عيادة الأمل)',
    specialistRoleFr: 'Orthophoniste diplômé (Cabinet El-Amel)',
    specialistRoleEn: 'Certified Speech Therapist (El-Amel Clinic)',
    routines: [
      { id: 'r1', titleAr: 'الاستيقاظ والروتين الصباحي', titleFr: 'Réveil et étirements doux', titleEn: 'Gentle morning routine', completed: true },
      { id: 'r2', titleAr: 'بصمة الصوت مع رفيق أفق نور', titleFr: 'Exercice sonore avec le robot Nour', titleEn: 'Phonation practice with Nour', completed: true },
      { id: 'r3', titleAr: 'تسمية بطاقتين على شريط التواصل', titleFr: 'Composition de 2 pictogrammes', titleEn: 'Compose 2 AAC cards', completed: false },
      { id: 'r4', titleAr: 'ترتيب المكعبات والاحتفال بالنجمة', titleFr: 'Rangement ludique & étoile', titleEn: 'Toy cleanup & victory star', completed: false }
    ]
  },
  amina: {
    id: 'amina',
    nameAr: 'أمينة',
    nameFr: 'Amina',
    nameEn: 'Amina',
    age: 4,
    theme: 'nature',
    avatarChar: '🌿',
    speechGoalAr: 'التعبير عن الاحتياجات الأساسية بالصور وتخفيف التوتر الحسي',
    speechGoalFr: 'Expression spontanée des besoins par pictogrammes et apaisement sensoriel',
    speechGoalEn: 'Spontaneous need expression via pictograms and sensory calming',
    specialistName: 'Dr. Mansouri',
    specialistRoleAr: 'أخصائية التربية الخاصة والمرافقة الحركية',
    specialistRoleFr: 'Psychomotricienne & Éducatrice Spécialisée',
    specialistRoleEn: 'Occupational Therapist & Special Educator',
    routines: [
      { id: 'a1', titleAr: 'فترة الهدوء الصباحي وشرب الماء', titleFr: 'Temps calme et verre d\'eau', titleEn: 'Calm morning pause & water', completed: true },
      { id: 'a2', titleAr: 'اختيار بطاقة الوجبة الخفيفة', titleFr: 'Choix du goûter par pictogramme', titleEn: 'Snack pictogram choice', completed: true },
      { id: 'a3', titleAr: 'تمرين التنفس البطيء مع نور', titleFr: 'Respiration synchronisée avec Nour', titleEn: 'Deep breathing with Nour', completed: true },
      { id: 'a4', titleAr: 'وقت القصة المصورة قبل القيلولة', titleFr: 'Histoire imagée avant la sieste', titleEn: 'Picture story before rest', completed: false }
    ]
  }
};

export const UnifiedChildWorldExperience: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'fr';
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
  // NOUR COMPANION STATE
  // ----------------------------------------------------
  const [nourMode, setNourMode] = useState<'idle' | 'greeting' | 'calm' | 'talking' | 'listening'>('idle');
  const [companionBubble, setCompanionBubble] = useState<string | null>(null);

  // Toggle routine item completion
  const handleToggleRoutine = (routineId: string) => {
    if (activeProfileId === 'custom') return;
    setProfiles((prev) => {
      const child = prev[activeProfileId];
      const updatedRoutines = child.routines.map((r) =>
        r.id === routineId ? { ...r, completed: !r.completed } : r
      );
      return {
        ...prev,
        [activeProfileId]: { ...child, routines: updatedRoutines }
      };
    });
  };

  // Add/remove card from sentence builder
  const togglePicto = (pictoId: string) => {
    if (selectedPictoIds.includes(pictoId)) {
      setSelectedPictoIds(selectedPictoIds.filter((id) => id !== pictoId));
    } else {
      if (selectedPictoIds.length >= 4) {
        setSelectedPictoIds([...selectedPictoIds.slice(1), pictoId]);
      } else {
        setSelectedPictoIds([...selectedPictoIds, pictoId]);
      }
    }
  };

  // Read sentence builder out loud using Web Speech API
  const handleVocalizeSentence = () => {
    if (selectedPictoIds.length === 0) return;
    const pictoMap = new Map(currentThemeConfig.pictos.map((p) => [p.id, p]));
    const words = selectedPictoIds
      .map((id) => pictoMap.get(id))
      .filter(Boolean)
      .map((p) => (isAr ? p!.labelAr : isEn ? p!.labelEn : p!.labelFr));

    const sentence = words.join(isAr ? ' ، ' : ', ');
    setIsVocalizing(true);
    setNourMode('talking');

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = isAr ? 'ar-SA' : isEn ? 'en-US' : 'fr-FR';
      utterance.rate = 0.85;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      utterance.onend = () => {
        setIsVocalizing(false);
        setNourMode('idle');
      };
      utterance.onerror = () => {
        setIsVocalizing(false);
        setNourMode('idle');
      };
    } else {
      setTimeout(() => {
        setIsVocalizing(false);
        setNourMode('idle');
      }, 1600);
    }
  };

  // Interact with Nour companion
  const handleNourInteraction = (intent: 'greeting' | 'encouragement' | 'calm') => {
    let text = '';
    if (intent === 'greeting') {
      setNourMode('greeting');
      text = isAr
        ? `مرحباً يا ${currentProfile.nameAr}! أنا نور، رفيقك في رحلة التعبير واكتشاف الكلمات اليوم.`
        : isEn
        ? `Hello ${currentProfile.nameEn}! I am Nour, your encouraging companion for speech and games.`
        : `Bonjour ${currentProfile.nameFr} ! Je suis Nour, ton compagnon bienveillant pour apprendre et t'exprimer.`;
    } else if (intent === 'encouragement') {
      setNourMode('talking');
      text = isAr
        ? 'أحسنت يا بطل! كل محاولة نطق وكل بطاقة تختارها هي خطوة عظيمة نفتخر بها جميعاً.'
        : isEn
        ? 'Amazing effort! Every card you choose and word you try is a milestone to celebrate.'
        : 'Bravo champion ! Chaque carte posée et chaque mot tenté est une magnifique victoire.';
    } else {
      setNourMode('calm');
      text = isAr
        ? 'دعنا نأخذ نفساً هادئاً وعميقاً معاً... عالمك هنا آمن ومريح، خذ كل وقتك.'
        : isEn
        ? 'Let\'s take a gentle, deep breath together... Your world is calm, safe, and entirely yours.'
        : 'Prenons une profonde inspiration douce ensemble... Ton monde est apaisé et bienveillant.';
    }

    setCompanionBubble(text);

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = isAr ? 'ar-SA' : isEn ? 'en-US' : 'fr-FR';
      utterance.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      utterance.onend = () => setNourMode(intent === 'calm' ? 'calm' : 'idle');
    }
  };

  // Launch Genesis Generation Sequence
  const handleLaunchGenesis = () => {
    setIsGeneratingWorld(true);
    setGenerationStep(1);

    setTimeout(() => setGenerationStep(2), 800);
    setTimeout(() => setGenerationStep(3), 1600);
    setTimeout(() => {
      // Create custom profile
      const newCustom: ChildProfileData = {
        id: 'custom',
        nameAr: wizardName,
        nameFr: wizardName,
        nameEn: wizardName,
        age: wizardAge,
        theme: wizardTheme,
        avatarChar: THEMES[wizardTheme].emoji,
        speechGoalAr: 'اكتشاف مفردات مخصصة والتواصل اللمسي السلس',
        speechGoalFr: 'Communication sensorielle sur mesure et enrichissement lexical',
        speechGoalEn: 'Tailored sensory communication and progressive vocabulary',
        specialistName: 'Dr. Dahmani',
        specialistRoleAr: 'أخصائي التربية والتخاطب المعتمد',
        specialistRoleFr: 'Orthophoniste Référent',
        specialistRoleEn: 'Consulting Specialist',
        routines: [
          { id: 'c1', titleAr: 'استكشاف العالم الرقمي الجديد', titleFr: 'Découverte du nouvel univers 3D', titleEn: 'Explore the new 3D world', completed: true },
          { id: 'c2', titleAr: 'لقاء الرفيق نور وتبادل التحية', titleFr: 'Première salutation avec Nour', titleEn: 'First greeting with Nour', completed: true },
          { id: 'c3', titleAr: 'بناء أول جملة تواصل معبرة', titleFr: 'Première phrase sur la bande CAA', titleEn: 'First phrase on AAC strip', completed: false }
        ]
      };
      setCustomProfile(newCustom);
      setActiveProfileId('custom');
      setIsGeneratingWorld(false);
      setActiveTab('world');
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
              ? 'حساب أبوي واحد يدير عوالم مستقلة تماماً لأبنائه. شاهد كيف يتحول الملف إلى عالم ثلاثي الأبعاد ينبض بالحياة، يتواصل فيه الطفل عبر لوحة ناطقة وبمرافقة الروبوت نور وتنسيق الأخصائي.'
              : isEn
              ? 'One family account orchestrating isolated child universes. Watch how a profile awakens into a living 3D world with talking AAC cards, Nour the 3D companion, and specialist synchronization.'
              : 'Un compte familial unique orchestrant des univers d\'enfants étanches. Découvrez la naissance d\'un monde 3D vivant avec bande-phrase CAA sonore, compagnon Nour et coordination clinique.'}
          </p>

          {/* Top Control Tabs: 1. Espace Famille | 2. Création de Profil | 3. Monde 3D Actif */}
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
                  setActiveProfileId('yanis');
                  setActiveTab('world');
                }}
                className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeProfileId === 'yanis'
                    ? 'bg-[#2868C7] text-white shadow-xs'
                    : 'text-[#172B46]/70 hover:text-[#172B46]'
                }`}
              >
                <span>🪐</span>
                <span>{isAr ? 'يانيس (6 سنوات)' : 'Yanis (6 ans)'}</span>
              </button>

              <button
                onClick={() => {
                  setActiveProfileId('amina');
                  setActiveTab('world');
                }}
                className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeProfileId === 'amina'
                    ? 'bg-[#2D7A58] text-white shadow-xs'
                    : 'text-[#172B46]/70 hover:text-[#172B46]'
                }`}
              >
                <span>🌿</span>
                <span>{isAr ? 'أمينة (4 سنوات)' : 'Amina (4 ans)'}</span>
              </button>

              {customProfile && (
                <button
                  onClick={() => {
                    setActiveProfileId('custom');
                    setActiveTab('world');
                  }}
                  className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    activeProfileId === 'custom'
                      ? 'bg-[#D58C7A] text-white shadow-xs'
                      : 'text-[#172B46]/70 hover:text-[#172B46]'
                  }`}
                >
                  <span>{customProfile.avatarChar}</span>
                  <span>{customProfile.nameFr}</span>
                </button>
              )}
            </div>

            <button
              onClick={() => {
                setProfiles(DEFAULT_PROFILES);
                setActiveProfileId('yanis');
                setActiveTab('world');
                setSelectedPictoIds(['water', 'puzzle']);
                setCompanionBubble(null);
              }}
              className="text-xs font-semibold text-[#5B6E85] hover:text-[#2868C7] flex items-center gap-1 transition-colors cursor-pointer"
              title="Réinitialiser la simulation"
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
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl shadow-inner">
                  👨‍👩‍👧‍👦
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
                      ? 'الولاية: 20 - سعيدة • رقم الهاتف المحمي: 0550 ** ** **'
                      : isEn
                      ? 'Wilaya: 20 - Saïda • Verified phone: 0550 ** ** **'
                      : 'Wilaya : 20 - Saïda • Numéro vérifié : 0550 ** ** **'}
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
                    <span className="text-3xl">🪐</span>
                    <div>
                      <h4 className="text-lg font-black text-[#172B46]">
                        {isAr ? 'يانيس' : 'Yanis'}
                      </h4>
                      <p className="text-xs text-gray-500 font-semibold">
                        6 {isAr ? 'سنوات' : 'ans'} • {isAr ? 'كوكب الأصوات والفضاء' : 'Monde Céleste & Phonétique'}
                      </p>
                    </div>
                  </div>
                  <span className="bg-[#2868C7]/10 text-[#2868C7] text-xs font-bold px-2.5 py-1 rounded-full">
                    {isAr ? 'تخاطب نشط' : 'Orthophonie active'}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="bg-[#F5F6F3] p-3 rounded-xl space-y-1">
                    <span className="text-gray-500 font-bold block">{isAr ? 'الهدف التواصلي الأسبوعي:' : 'Objectif hebdomadaire :'}</span>
                    <p className="text-[#172B46] font-semibold">{isAr ? profiles.yanis.speechGoalAr : profiles.yanis.speechGoalFr}</p>
                  </div>
                  <div className="flex items-center justify-between text-gray-600 font-medium pt-1">
                    <span>{isAr ? 'الأخصائي المعتمد:' : 'Spécialiste agréé :'}</span>
                    <span className="font-bold text-[#172B46]">{profiles.yanis.specialistName}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveProfileId('yanis');
                    setActiveTab('world');
                  }}
                  className="w-full py-3 rounded-2xl bg-[#2868C7] hover:bg-[#1f54a3] text-white font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isAr ? 'الدخول إلى عالم يانيس 3D' : 'Entrer dans le monde de Yanis 3D'}</span>
                  <ArrowRight size={16} className="rtl:rotate-180" />
                </button>
              </div>

              {/* Profile Card: Amina */}
              <div className="bg-white rounded-3xl p-6 border-2 border-[#2D7A58]/30 shadow-md hover:shadow-xl transition-all space-y-5 text-start relative overflow-hidden">
                <div className="absolute top-0 end-0 w-32 h-32 bg-[#2D7A58]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🌿</span>
                    <div>
                      <h4 className="text-lg font-black text-[#172B46]">
                        {isAr ? 'أمينة' : 'Amina'}
                      </h4>
                      <p className="text-xs text-gray-500 font-semibold">
                        4 {isAr ? 'سنوات' : 'ans'} • {isAr ? 'كوكب الطبيعة والهدوء' : 'Jardin Douceur & Routines'}
                      </p>
                    </div>
                  </div>
                  <span className="bg-[#2D7A58]/10 text-[#2D7A58] text-xs font-bold px-2.5 py-1 rounded-full">
                    {isAr ? 'تواصل حسي' : 'Apaisement sensoriel'}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="bg-[#F5F6F3] p-3 rounded-xl space-y-1">
                    <span className="text-gray-500 font-bold block">{isAr ? 'الهدف التواصلي الأسبوعي:' : 'Objectif hebdomadaire :'}</span>
                    <p className="text-[#172B46] font-semibold">{isAr ? profiles.amina.speechGoalAr : profiles.amina.speechGoalFr}</p>
                  </div>
                  <div className="flex items-center justify-between text-gray-600 font-medium pt-1">
                    <span>{isAr ? 'الأخصائي المعتمد:' : 'Spécialiste agréé :'}</span>
                    <span className="font-bold text-[#172B46]">{profiles.amina.specialistName}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveProfileId('amina');
                    setActiveTab('world');
                  }}
                  className="w-full py-3 rounded-2xl bg-[#2D7A58] hover:bg-[#236045] text-white font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isAr ? 'الدخول إلى عالم أمينة 3D' : 'Entrer dans le monde d\'Amina 3D'}</span>
                  <ArrowRight size={16} className="rtl:rotate-180" />
                </button>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setActiveTab('wizard')}
                className="bg-white hover:bg-gray-50 text-[#172B46] border-2 border-dashed border-[#2868C7]/50 hover:border-[#2868C7] font-bold text-sm px-6 py-3.5 rounded-2xl transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <UserPlus size={16} className="text-[#2868C7]" />
                <span>{isAr ? '+ إضافة وتخصيص عالم لطفل جديد' : '+ Configurer un nouvel univers enfant'}</span>
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
                  <div className="relative w-full h-full rounded-full bg-[#172B46] flex items-center justify-center text-5xl shadow-2xl border-2 border-white/20">
                    {THEMES[wizardTheme].emoji}
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
                    {generationStep === 1 && (isAr ? 'تهيئة الواجهة المريحة حسياً وحجم الأزرار...' : 'Configuration des filtres sensoriels et de l\'ergonomie...')}
                    {generationStep === 2 && (isAr ? 'مزامنة بطاقات التواصل البديل الموصى بها...' : 'Chargement de la bande-phrase CAA adaptée...')}
                    {generationStep === 3 && (isAr ? 'استيقاظ الروبوت المساعد نور في المشهد ثلاثي الأبعاد...' : 'Initialisation du compagnon 3D Nour...')}
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
                    {isAr ? 'تهيئة ملف وعالم ثلاثي الأبعاد للطفل' : 'Configuration du Monde 3D de l\'Enfant'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {isAr
                      ? 'حدد اسم الطفل، عمره، والبيئة البصرية المفضلة لإنشاء عالمه الخاص فورياً.'
                      : 'Définissez le prénom, l\'âge et l\'univers visuel pour donner vie à son espace 3D.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Step A: Child Identity Form */}
                  <div className="bg-[#F5F6F3] p-6 rounded-3xl space-y-5 text-start border border-[#A9C5D8]/40">
                    <h4 className="text-sm font-extrabold uppercase text-[#2868C7] tracking-wider flex items-center gap-2">
                      <UserPlus size={16} />
                      <span>{isAr ? 'أ. هوية الملف (بدون حساب للطفل)' : 'A. Profil de l\'enfant (Sans mot de passe)'}</span>
                    </h4>

                    {/* Name input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#172B46]">
                        {isAr ? 'اسم الطفل أو كنيته المحببة' : 'Prénom ou diminutif de l\'enfant'}
                      </label>
                      <input
                        type="text"
                        value={wizardName}
                        onChange={(e) => setWizardName(e.target.value)}
                        placeholder="Rayan"
                        className="w-full bg-white px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2868C7] text-sm font-bold text-[#172B46]"
                      />
                    </div>

                    {/* Age slider */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold text-[#172B46]">
                        <span>{isAr ? 'عمر الطفل' : 'Âge de l\'enfant'}</span>
                        <span className="text-[#2868C7] font-black">{wizardAge} {isAr ? 'سنوات' : 'ans'}</span>
                      </div>
                      <input
                        type="range"
                        min="3"
                        max="12"
                        value={wizardAge}
                        onChange={(e) => setWizardAge(Number(e.target.value))}
                        className="w-full accent-[#2868C7] cursor-pointer"
                      />
                    </div>

                    {/* Non-Diagnostic Protection Pill */}
                    <div className="bg-white/80 p-3 rounded-xl border border-gray-200 text-xs text-gray-500 space-y-1">
                      <span className="font-bold text-[#172B46] block flex items-center gap-1">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        {isAr ? 'ضمان الخصوصية وعدم التشخيص:' : 'Périmètre sécurisé non-médical :'}
                      </span>
                      <p className="text-[11px] leading-tight">
                        {isAr
                          ? 'أفق لا يقوم بأي تشخيص طبي أو فرز سريري، بل يوفر واجهة تفاعلية تخضع لتوجيه الأخصائي والولي.'
                          : 'OFOQ n\'émet aucun diagnostic médical. L\'espace est conçu pour soutenir la communication quotidienne.'}
                      </p>
                    </div>
                  </div>

                  {/* Step B: Universe Theme Selection */}
                  <div className="bg-[#F5F6F3] p-6 rounded-3xl space-y-4 text-start border border-[#A9C5D8]/40">
                    <h4 className="text-sm font-extrabold uppercase text-[#2868C7] tracking-wider flex items-center gap-2">
                      <Palette size={16} />
                      <span>{isAr ? 'ب. اختيار ثيم العالم الرقمي' : 'B. Sélection de l\'univers 3D'}</span>
                    </h4>

                    <div className="grid grid-cols-2 gap-3">
                      {(Object.keys(THEMES) as ThemeKey[]).map((themeKey) => {
                        const th = THEMES[themeKey];
                        const isSelected = wizardTheme === themeKey;
                        return (
                          <button
                            key={themeKey}
                            type="button"
                            onClick={() => setWizardTheme(themeKey)}
                            className={`p-3.5 rounded-2xl border text-start transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                              isSelected
                                ? 'bg-white border-[#2868C7] shadow-md ring-2 ring-[#2868C7]/20 scale-102'
                                : 'bg-white/70 hover:bg-white border-gray-200 shadow-2xs'
                            }`}
                          >
                            <span className="text-2xl">{th.emoji}</span>
                            <div>
                              <p className="text-xs font-black text-[#172B46]">
                                {isAr ? th.nameAr : isEn ? th.nameEn : th.nameFr}
                              </p>
                              <span className="text-[10px] text-gray-400 font-medium">
                                {isAr ? 'مستوحى من سبيستون' : 'Thème immersif'}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Launch Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 flex-wrap gap-4">
                  <button
                    onClick={() => setActiveTab('hub')}
                    className="text-xs font-bold text-gray-500 hover:text-[#172B46] flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft size={14} className="rtl:rotate-180" />
                    <span>{isAr ? 'العودة إلى فضاء العائلة' : 'Retour à l\'Espace Famille'}</span>
                  </button>

                  <button
                    onClick={handleLaunchGenesis}
                    className="bg-gradient-to-r from-[#2868C7] to-[#172B46] hover:from-[#1f54a3] hover:to-[#0f1e32] text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-xl transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles size={16} className="text-[#D8BE83]" />
                    <span>{isAr ? 'توليد العالم ثلاثي الأبعاد الآن 🚀' : 'Donner vie au Monde 3D 🚀'}</span>
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
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/30 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner">
                  {currentProfile.avatarChar}
                </div>
                <div className="text-start">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-black">
                      {isAr ? `عالم ${currentProfile.nameAr}` : `Monde de ${currentProfile.nameFr}`}
                    </h3>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
                      {currentProfile.age} {isAr ? 'سنوات' : 'ans'}
                    </span>
                    <span className="text-xs bg-[#D8BE83] text-[#172B46] px-2.5 py-0.5 rounded-full font-extrabold">
                      {isAr ? currentThemeConfig.nameAr : currentThemeConfig.nameFr}
                    </span>
                  </div>
                  <p className="text-xs text-[#A9C5D8] mt-0.5">
                    {isAr ? currentThemeConfig.subtitleAr : currentThemeConfig.subtitleFr}
                  </p>
                </div>
              </div>

              {/* Sibling Switcher within World View */}
              <div className="flex items-center gap-2 z-10 w-full md:w-auto justify-between md:justify-end">
                <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/20 flex items-center gap-2 text-xs">
                  <span className="text-[#A9C5D8] text-[11px] font-semibold">
                    {isAr ? 'تبديل الأخ:' : 'Changer d\'enfant :'}
                  </span>
                  <button
                    onClick={() => setActiveProfileId(activeProfileId === 'yanis' ? 'amina' : 'yanis')}
                    className="bg-white/20 hover:bg-white/30 text-white font-bold px-3 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{activeProfileId === 'yanis' ? '🌿 أمينة (4)' : '🪐 يانيس (6)'}</span>
                    <ChevronRight size={14} className="rtl:rotate-180" />
                  </button>
                </div>

                <button
                  onClick={() => setActiveTab('hub')}
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
              
              {/* LEFT COLUMN: 3D EMBEDDED COMPANION (NOUR) WITH VOICE */}
              <div className="lg:col-span-5 bg-gradient-to-b from-white to-[#F5F6F3] rounded-3xl p-5 border border-[#A9C5D8]/40 shadow-lg flex flex-col justify-between space-y-4 text-start relative overflow-hidden">
                {/* 3D Canvas Header Badge */}
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2868C7] animate-pulse" />
                    <span className="text-xs font-black text-[#172B46]">
                      {isAr ? 'الرفيق الذكي ثلاثي الأبعاد "نور"' : 'Compagnon 3D Bienveillant "Nour"'}
                    </span>
                  </div>
                  <span className="text-[10px] bg-[#D8BE83]/30 text-[#172B46] font-bold px-2 py-0.5 rounded-full">
                    Bunny-Bot 3000
                  </span>
                </div>

                {/* Embedded Three.js WebGL Canvas with GLB Model */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#172B46]/05 to-[#2868C7]/10 border border-[#A9C5D8]/30">
                  <Nour3DCanvas
                    theme={currentProfile.theme}
                    mode={nourMode}
                    isAr={isAr}
                    className="h-[300px] sm:h-[340px]"
                  />

                  {/* Floating Speech Bubble from Nour */}
                  <AnimatePresence>
                    {companionBubble && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-3 inset-x-3 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl border border-[#2868C7]/30 text-xs text-[#172B46] space-y-1.5 z-20"
                      >
                        <div className="flex items-center justify-between font-extrabold text-[11px] text-[#2868C7]">
                          <span className="flex items-center gap-1">
                            <Sparkles size={12} />
                            {isAr ? 'نور يتحدث:' : 'Nour vous parle :'}
                          </span>
                          <button
                            onClick={() => setCompanionBubble(null)}
                            className="text-gray-400 hover:text-gray-600 text-[10px]"
                          >
                            ✕
                          </button>
                        </div>
                        <p className="font-semibold leading-relaxed">{companionBubble}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Companion Action Chips */}
                <div className="space-y-2 pt-1">
                  <p className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">
                    {isAr ? 'تفاعل صوتي وتشجيعي مع نور:' : 'Interagir avec Nour :'}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleNourInteraction('greeting')}
                      className="p-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-center transition-all text-xs font-bold text-[#172B46] hover:border-[#2868C7] flex flex-col items-center gap-1 cursor-pointer shadow-2xs"
                    >
                      <Smile size={16} className="text-[#2868C7]" />
                      <span className="text-[10px] leading-tight">{isAr ? 'تحية' : 'Saluer'}</span>
                    </button>

                    <button
                      onClick={() => handleNourInteraction('encouragement')}
                      className="p-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-center transition-all text-xs font-bold text-[#172B46] hover:border-[#D8BE83] flex flex-col items-center gap-1 cursor-pointer shadow-2xs"
                    >
                      <Star size={16} className="text-[#D8BE83]" />
                      <span className="text-[10px] leading-tight">{isAr ? 'تشجيع' : 'Bravo'}</span>
                    </button>

                    <button
                      onClick={() => handleNourInteraction('calm')}
                      className="p-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-center transition-all text-xs font-bold text-[#172B46] hover:border-[#2D7A58] flex flex-col items-center gap-1 cursor-pointer shadow-2xs"
                    >
                      <Moon size={16} className="text-[#2D7A58]" />
                      <span className="text-[10px] leading-tight">{isAr ? 'تنفس هادئ' : 'Apaiser'}</span>
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
                        {isAr ? 'شريط التعبير والتواصل البديل (CAA)' : 'Bande-Phrase de Communication (CAA)'}
                      </h4>
                    </div>
                    <button
                      onClick={() => setSelectedPictoIds([])}
                      className="text-xs text-gray-400 hover:text-[#D58C7A] flex items-center gap-1 cursor-pointer"
                      title="Effacer la bande"
                    >
                      <RotateCcw size={12} />
                      <span>{isAr ? 'مسح' : 'Effacer'}</span>
                    </button>
                  </div>

                  {/* Sentence Strip Container */}
                  <div className="min-h-[64px] bg-[#F5F6F3] rounded-2xl p-2.5 flex items-center justify-between gap-2 border-2 border-dashed border-[#A9C5D8]/60">
                    <div className="flex items-center gap-2 flex-wrap flex-1">
                      {selectedPictos.length === 0 ? (
                        <p className="text-xs text-[#172B46]/40 italic px-2">
                          {isAr
                            ? 'المس بطاقة من الأسفل لتركيب جملة التعبير...'
                            : isEn
                            ? 'Tap pictogram cards below to compose a request...'
                            : 'Touchez des cartes ci-dessous pour composer une phrase...'}
                        </p>
                      ) : (
                        selectedPictos.map((picto) => (
                          <motion.div
                            key={picto.id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white px-3 py-1.5 rounded-xl border border-[#2868C7]/30 shadow-xs flex items-center gap-1.5"
                          >
                            <span className="text-base select-none">{picto.emoji}</span>
                            <span className="text-xs font-black text-[#172B46]">
                              {isAr ? picto.labelAr : isEn ? picto.labelEn : picto.labelFr}
                            </span>
                          </motion.div>
                        ))
                      )}
                    </div>

                    <button
                      onClick={handleVocalizeSentence}
                      disabled={selectedPictos.length === 0 || isVocalizing}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer ${
                        selectedPictos.length === 0
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : isVocalizing
                          ? 'bg-[#D58C7A] text-white scale-105'
                          : 'bg-[#2868C7] hover:bg-[#1f54a3] text-white'
                      }`}
                      aria-label="Vocaliser la phrase"
                    >
                      {isVocalizing ? (
                        <>
                          <Volume2 size={16} className="animate-bounce" />
                          <span>{isAr ? 'ينطق...' : 'Vocalise...'}</span>
                        </>
                      ) : (
                        <>
                          <Play size={16} className="fill-current" />
                          <span>{isAr ? 'نطق الجملة' : 'Lire à voix haute'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* 6 Tactile Pictogram Grid */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-gray-500">
                      {isAr
                        ? `بطاقات اليوم المعززة لعالم "${currentProfile.nameAr}":`
                        : `Cartes de communication pour l'univers de ${currentProfile.nameFr} :`}
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {currentThemeConfig.pictos.map((picto) => {
                        const isSelected = selectedPictoIds.includes(picto.id);
                        return (
                          <motion.button
                            key={picto.id}
                            whileTap={{ scale: 0.94 }}
                            onClick={() => togglePicto(picto.id)}
                            className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                              isSelected
                                ? 'bg-white border-[#2868C7] shadow-md ring-2 ring-[#2868C7]/20 scale-102'
                                : 'bg-[#F5F6F3]/80 hover:bg-white border-gray-200 shadow-2xs'
                            }`}
                          >
                            <span className="text-2xl select-none">{picto.emoji}</span>
                            <span className="text-[10px] font-black text-[#172B46] leading-tight line-clamp-1">
                              {isAr ? picto.labelAr : isEn ? picto.labelEn : picto.labelFr}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 2. DAILY ROUTINE & SPECIALIST BRIDGE (PRO-PARENT SYNC) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Daily Routine Checklist */}
                  <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#A9C5D8]/40 shadow-sm space-y-3">
                    <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
                      <span className="text-xs font-black text-[#172B46] flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-[#2868C7]" />
                        {isAr ? 'الروتين اليومي المصور' : 'Routine Visuelle'}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold">
                        {currentProfile.routines.filter((r) => r.completed).length} / {currentProfile.routines.length} ⭐
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {currentProfile.routines.map((routine) => (
                        <button
                          key={routine.id}
                          onClick={() => handleToggleRoutine(routine.id)}
                          className={`w-full p-2 rounded-xl text-xs font-semibold text-start flex items-center justify-between transition-all cursor-pointer ${
                            routine.completed
                              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200/60'
                              : 'bg-[#F5F6F3] text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <span className="line-clamp-1">
                            {isAr ? routine.titleAr : isEn ? routine.titleEn : routine.titleFr}
                          </span>
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                            routine.completed ? 'bg-emerald-500 text-white font-bold' : 'border border-gray-300'
                          }`}>
                            {routine.completed ? '✓' : ''}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Specialist Bridge (Pro Portal Contribution) */}
                  <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#A9C5D8]/40 shadow-sm space-y-3">
                    <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
                      <span className="text-xs font-black text-[#D58C7A] flex items-center gap-1.5">
                        <Users size={14} />
                        {isAr ? 'مساهمة الأخصائي المعتمد' : 'Portail Spécialiste'}
                      </span>
                      <span className="text-[9px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                        {isAr ? 'موافقة نشطة' : 'Consentement actif'}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div>
                        <p className="font-extrabold text-[#172B46]">{currentProfile.specialistName}</p>
                        <p className="text-[10px] text-gray-400">
                          {isAr ? currentProfile.specialistRoleAr : currentProfile.specialistRoleFr}
                        </p>
                      </div>

                      <div className="bg-[#F5F6F3] p-2 rounded-xl space-y-1 text-[11px]">
                        <span className="text-[10px] font-bold text-gray-500 block">
                          {isAr ? 'الهدف الموصى به للمنزل:' : 'Cible clinique recommandée :'}
                        </span>
                        <p className="font-semibold text-[#172B46] leading-tight">
                          {isAr ? currentProfile.speechGoalAr : currentProfile.speechGoalFr}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{isAr ? 'استمرارية حية بين الجلسة والبيت' : 'Continuité cabinet-foyer en direct'}</span>
                      </div>
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
