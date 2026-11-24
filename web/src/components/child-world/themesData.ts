import { ThemeKey, ThemeConfig, ChildProfileData } from './types';

export const THEMES: Record<ThemeKey, ThemeConfig> = {
  space: {
    id: 'space',
    nameAr: 'كوكب الأصوات والفضاء',
    nameFr: 'Monde Céleste & Phonétique',
    nameEn: 'Cosmic Speech Explorer',
    subtitleAr: 'تحفيز مخارج الحروف وبناء الجمل في بيئة مشجعة',
    subtitleFr: 'Thème immersif • Phonation & Étoiles',
    subtitleEn: 'Immersive Theme • Speech & Stars',
    primaryColor: '#2868C7',
    gradientBg: 'from-[#172B46] via-[#1E54A3] to-[#2868C7]',
    cardGradient: 'from-[#172B46]/10 via-[#2868C7]/15 to-[#A9C5D8]/20',
    swatches: ['#172B46', '#2868C7', '#A9C5D8', '#D8BE83'],
    pictos: [
      // احتياجات / Needs
      { id: 'water', iconName: 'droplets', color: 'text-[#2868C7]', bgTint: 'bg-[#2868C7]/10', labelAr: 'حبيت نشرب ماء', labelFr: 'Boire de l\'eau', labelEn: 'Drink water', category: 'needs' },
      { id: 'apple', iconName: 'apple', color: 'text-[#9E4E3D]', bgTint: 'bg-[#D58C7A]/15', labelAr: 'حبيت تفاحة', labelFr: 'Manger une pomme', labelEn: 'Eat an apple', category: 'needs' },
      { id: 'snack', iconName: 'utensils', color: 'text-[#2D7A58]', bgTint: 'bg-[#2D7A58]/10', labelAr: 'لمجة خفيفة', labelFr: 'Goûter sain', labelEn: 'Healthy snack', category: 'needs' },
      { id: 'break', iconName: 'coffee', color: 'text-[#806936]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'نريّح شوية', labelFr: 'Temps calme', labelEn: 'Quiet break', category: 'needs' },
      { id: 'help', iconName: 'help', color: 'text-[#BA3C3C]', bgTint: 'bg-[#BA3C3C]/10', labelAr: 'عاونوني', labelFr: 'Besoin d\'aide', labelEn: 'Help me', category: 'needs' },
      { id: 'wash', iconName: 'bath', color: 'text-[#2868C7]', bgTint: 'bg-[#2868C7]/10', labelAr: 'نغسل يديّ', labelFr: 'Se laver les mains', labelEn: 'Wash hands', category: 'needs' },
      { id: 'sleep', iconName: 'moon', color: 'text-[#172B46]', bgTint: 'bg-[#172B46]/10', labelAr: 'نرقد ونرتاح', labelFr: 'Aller dormir', labelEn: 'Sleep & rest', category: 'needs' },

      // أنشطة / Activities
      { id: 'listen', iconName: 'headphones', color: 'text-[#2868C7]', bgTint: 'bg-[#2868C7]/10', labelAr: 'نسمع الصوت', labelFr: 'Écouter le son', labelEn: 'Listen to sound', category: 'activities' },
      { id: 'speak', iconName: 'volume2', color: 'text-[#2868C7]', bgTint: 'bg-[#2868C7]/15', labelAr: 'نعاود الكلمة', labelFr: 'Répéter le mot', labelEn: 'Repeat word', category: 'activities' },
      { id: 'blocks', iconName: 'boxes', color: 'text-[#806936]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'تركيب المكعبات', labelFr: 'Jeux de construction', labelEn: 'Building blocks', category: 'activities' },
      { id: 'draw', iconName: 'palette', color: 'text-[#9E4E3D]', bgTint: 'bg-[#D58C7A]/15', labelAr: 'نرسم ونلون', labelFr: 'Colorier et dessiner', labelEn: 'Draw & color', category: 'activities' },
      { id: 'story', iconName: 'book', color: 'text-[#2868C7]', bgTint: 'bg-[#2868C7]/10', labelAr: 'قصة مصورة', labelFr: 'Livre d\'histoire', labelEn: 'Picture story', category: 'activities' },
      { id: 'music', iconName: 'headphones', color: 'text-[#172B46]', bgTint: 'bg-[#172B46]/10', labelAr: 'أصوات الفضاء', labelFr: 'Mélodie cosmique', labelEn: 'Space melody', category: 'activities' },
      { id: 'outdoor', iconName: 'footprints', color: 'text-[#2D7A58]', bgTint: 'bg-[#2D7A58]/10', labelAr: 'نلعب ونتحرك', labelFr: 'Bouger et jouer', labelEn: 'Move & play', category: 'activities' },

      // مشاعر / Feelings
      { id: 'happy', iconName: 'sparkles', color: 'text-[#806936]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'فرحان بنطقي', labelFr: 'Fier de ma voix', labelEn: 'Proud of my voice', category: 'feelings' },
      { id: 'hug', iconName: 'heart', color: 'text-[#9E4E3D]', bgTint: 'bg-[#D58C7A]/15', labelAr: 'تحضينة دافية', labelFr: 'Câlin réconfortant', labelEn: 'Warm hug', category: 'feelings' },
      { id: 'smile', iconName: 'smile', color: 'text-[#806936]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'راني مرتاح', labelFr: 'Tout va bien', labelEn: 'I feel comfortable', category: 'feelings' },
      { id: 'breathe', iconName: 'wind', color: 'text-[#2868C7]', bgTint: 'bg-[#2868C7]/10', labelAr: 'تنفس هادئ', labelFr: 'Respiration douce', labelEn: 'Gentle breath', category: 'feelings' },
      { id: 'safe', iconName: 'shield', color: 'text-[#2D7A58]', bgTint: 'bg-[#2D7A58]/10', labelAr: 'راني في أمان', labelFr: 'Je suis en sécurité', labelEn: 'I feel safe', category: 'feelings' },
      { id: 'bravo', iconName: 'trophy', color: 'text-[#806936]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'أنا بطل شاطر', labelFr: 'Je suis un champion', labelEn: 'I am a champion', category: 'feelings' },
    ],
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
      // احتياجات / Needs
      { id: 'water', iconName: 'droplets', color: 'text-[#2868C7]', bgTint: 'bg-[#2868C7]/10', labelAr: 'حبيت نشرب ماء', labelFr: 'Boire de l\'eau', labelEn: 'Drink water', category: 'needs' },
      { id: 'apple', iconName: 'apple', color: 'text-[#9E4E3D]', bgTint: 'bg-[#D58C7A]/15', labelAr: 'حبيت تفاحة', labelFr: 'Manger une pomme', labelEn: 'Eat an apple', category: 'needs' },
      { id: 'snack', iconName: 'utensils', color: 'text-[#2D7A58]', bgTint: 'bg-[#2D7A58]/10', labelAr: 'لمجة خفيفة', labelFr: 'Goûter doux', labelEn: 'Healthy snack', category: 'needs' },
      { id: 'break', iconName: 'coffee', color: 'text-[#806936]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'نريّح شوية', labelFr: 'Temps calme', labelEn: 'Quiet break', category: 'needs' },
      { id: 'help', iconName: 'help', color: 'text-[#BA3C3C]', bgTint: 'bg-[#BA3C3C]/10', labelAr: 'عاونوني', labelFr: 'Besoin d\'aide', labelEn: 'Help me', category: 'needs' },
      { id: 'wash', iconName: 'bath', color: 'text-[#2D7A58]', bgTint: 'bg-[#2D7A58]/10', labelAr: 'نغسل يديّ', labelFr: 'Se laver les mains', labelEn: 'Wash hands', category: 'needs' },
      { id: 'sleep', iconName: 'moon', color: 'text-[#172B46]', bgTint: 'bg-[#172B46]/10', labelAr: 'نرقد ونرتاح', labelFr: 'Dormir au calme', labelEn: 'Sleep & rest', category: 'needs' },

      // أنشطة / Activities
      { id: 'blocks', iconName: 'boxes', color: 'text-[#806936]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'تركيب المكعبات', labelFr: 'Jeux de cubes', labelEn: 'Building blocks', category: 'activities' },
      { id: 'listen', iconName: 'headphones', color: 'text-[#2868C7]', bgTint: 'bg-[#2868C7]/10', labelAr: 'نسمع الصوت', labelFr: 'Écouter le son', labelEn: 'Listen to sound', category: 'activities' },
      { id: 'speak', iconName: 'volume2', color: 'text-[#2D7A58]', bgTint: 'bg-[#2D7A58]/15', labelAr: 'نعاود الكلمة', labelFr: 'Répéter le mot', labelEn: 'Repeat word', category: 'activities' },
      { id: 'draw', iconName: 'palette', color: 'text-[#9E4E3D]', bgTint: 'bg-[#D58C7A]/15', labelAr: 'نرسم بالألوان', labelFr: 'Dessiner les feuilles', labelEn: 'Draw & paint', category: 'activities' },
      { id: 'outdoor', iconName: 'footprints', color: 'text-[#2D7A58]', bgTint: 'bg-[#2D7A58]/10', labelAr: 'نخرج للجنينة', labelFr: 'Sortir au jardin', labelEn: 'Go to garden', category: 'activities' },
      { id: 'story', iconName: 'book', color: 'text-[#172B46]', bgTint: 'bg-[#172B46]/10', labelAr: 'قصة الطبيعة', labelFr: 'Livre nature', labelEn: 'Nature story', category: 'activities' },

      // مشاعر / Feelings
      { id: 'hug', iconName: 'heart', color: 'text-[#9E4E3D]', bgTint: 'bg-[#D58C7A]/15', labelAr: 'تحضينة دافية', labelFr: 'Câlin apaisant', labelEn: 'Warm hug', category: 'feelings' },
      { id: 'happy', iconName: 'sparkles', color: 'text-[#806936]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'فرحان بنطقي', labelFr: 'Heureux de parler', labelEn: 'Happy with speech', category: 'feelings' },
      { id: 'smile', iconName: 'smile', color: 'text-[#806936]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'راني مرتاح', labelFr: 'Sensations sereines', labelEn: 'Peaceful feeling', category: 'feelings' },
      { id: 'breathe', iconName: 'wind', color: 'text-[#2D7A58]', bgTint: 'bg-[#2D7A58]/10', labelAr: 'نتنفس بالعقل', labelFr: 'Respirer l\'air frais', labelEn: 'Fresh air breath', category: 'feelings' },
      { id: 'safe', iconName: 'shield', color: 'text-[#2D7A58]', bgTint: 'bg-[#2D7A58]/10', labelAr: 'راني في أمان', labelFr: 'Nid sécurisé', labelEn: 'Safe shelter', category: 'feelings' },
    ],
  },
  ocean: {
    id: 'ocean',
    nameAr: 'كوكب البحار والتنفس',
    nameFr: 'Océan Apaisé & Émotions',
    nameEn: 'Ocean Haven & Regulation',
    subtitleAr: 'أمواج هادئة وألوان مائية • تنظيم المشاعر والتعبير بدون إجهاد',
    subtitleFr: 'Thème immersif • Vagues & Respiration',
    subtitleEn: 'Immersive Theme • Waves & Calm',
    primaryColor: '#2868C7',
    gradientBg: 'from-[#172B46] via-[#1E54A3] to-[#2868C7]',
    cardGradient: 'from-[#172B46]/10 via-[#2868C7]/15 to-[#A9C5D8]/20',
    swatches: ['#172B46', '#2868C7', '#A9C5D8', '#D8BE83'],
    pictos: [
      // احتياجات / Needs
      { id: 'water', iconName: 'droplets', color: 'text-[#2868C7]', bgTint: 'bg-[#2868C7]/10', labelAr: 'حبيت نشرب ماء', labelFr: 'Boire un verre d\'eau', labelEn: 'Drink water', category: 'needs' },
      { id: 'apple', iconName: 'apple', color: 'text-[#9E4E3D]', bgTint: 'bg-[#D58C7A]/15', labelAr: 'حبيت تفاحة', labelFr: 'Manger une pomme', labelEn: 'Eat an apple', category: 'needs' },
      { id: 'snack', iconName: 'utensils', color: 'text-[#2868C7]', bgTint: 'bg-[#2868C7]/10', labelAr: 'لمجة خفيفة', labelFr: 'Petite collation', labelEn: 'Snack break', category: 'needs' },
      { id: 'break', iconName: 'coffee', color: 'text-[#806936]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'نريّح شوية', labelFr: 'Pause sensorielle', labelEn: 'Quiet break', category: 'needs' },
      { id: 'help', iconName: 'help', color: 'text-[#BA3C3C]', bgTint: 'bg-[#BA3C3C]/10', labelAr: 'عاونوني', labelFr: 'Besoin d\'aide', labelEn: 'Help me', category: 'needs' },
      { id: 'wash', iconName: 'bath', color: 'text-[#2868C7]', bgTint: 'bg-[#2868C7]/10', labelAr: 'نغسل يديّ', labelFr: 'Douche apaisante', labelEn: 'Wash hands', category: 'needs' },

      // أنشطة / Activities
      { id: 'listen', iconName: 'headphones', color: 'text-[#2868C7]', bgTint: 'bg-[#2868C7]/10', labelAr: 'نسمع الصوت', labelFr: 'Écouter le son', labelEn: 'Listen to sound', category: 'activities' },
      { id: 'speak', iconName: 'volume2', color: 'text-[#2868C7]', bgTint: 'bg-[#2868C7]/15', labelAr: 'نعاود الكلمة', labelFr: 'Répéter le mot', labelEn: 'Repeat word', category: 'activities' },
      { id: 'blocks', iconName: 'boxes', color: 'text-[#806936]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'تركيب المكعبات', labelFr: 'Assembler les pièces', labelEn: 'Building blocks', category: 'activities' },
      { id: 'music', iconName: 'headphones', color: 'text-[#172B46]', bgTint: 'bg-[#172B46]/10', labelAr: 'نسمع صوت الأمواج', labelFr: 'Bruit des vagues', labelEn: 'Waves melody', category: 'activities' },
      { id: 'draw', iconName: 'palette', color: 'text-[#2868C7]', bgTint: 'bg-[#2868C7]/10', labelAr: 'نرسم سمكة شابة', labelFr: 'Dessiner la mer', labelEn: 'Draw ocean', category: 'activities' },
      { id: 'walk', iconName: 'footprints', color: 'text-[#2868C7]', bgTint: 'bg-[#2868C7]/10', labelAr: 'نمشي بالعقل', labelFr: 'Marche douce', labelEn: 'Calm walk', category: 'activities' },

      // مشاعر / Feelings
      { id: 'breathe', iconName: 'wind', color: 'text-[#2868C7]', bgTint: 'bg-[#2868C7]/10', labelAr: 'نتنفس بالعقل', labelFr: 'Respirer calmement', labelEn: 'Deep breath', category: 'feelings' },
      { id: 'safe', iconName: 'shield', color: 'text-[#2D7A58]', bgTint: 'bg-[#2D7A58]/10', labelAr: 'راني في أمان', labelFr: 'Je suis en sécurité', labelEn: 'I feel safe', category: 'feelings' },
      { id: 'smile', iconName: 'smile', color: 'text-[#806936]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'راني مرتاح', labelFr: 'Océan de calme', labelEn: 'Feeling good', category: 'feelings' },
      { id: 'happy', iconName: 'sparkles', color: 'text-[#806936]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'فرحان بنطقي', labelFr: 'Heureux de parler', labelEn: 'Proud of speech', category: 'feelings' },
      { id: 'hug', iconName: 'heart', color: 'text-[#9E4E3D]', bgTint: 'bg-[#D58C7A]/15', labelAr: 'تحضينة دافية', labelFr: 'Câlin réconfortant', labelEn: 'Comfort hug', category: 'feelings' },
    ],
  },
  creative: {
    id: 'creative',
    nameAr: 'كوكب الإبداع والقصص',
    nameFr: 'Atelier Couleurs & Histoires',
    nameEn: 'Creative Studio & Stories',
    subtitleAr: 'فضاء حيوي ودافئ • التعبير المصور، الرسم، والاحتفال بالإنجازات',
    subtitleFr: 'Thème immersif • Dessin & Expression',
    subtitleEn: 'Immersive Theme • Art & Stories',
    primaryColor: '#9E4E3D',
    gradientBg: 'from-[#172B46] via-[#B86856] to-[#9E4E3D]',
    cardGradient: 'from-[#172B46]/10 via-[#9E4E3D]/20 to-[#D8BE83]/20',
    swatches: ['#172B46', '#9E4E3D', '#D8BE83', '#A9C5D8'],
    pictos: [
      // احتياجات / Needs
      { id: 'water', iconName: 'droplets', color: 'text-[#2868C7]', bgTint: 'bg-[#2868C7]/10', labelAr: 'حبيت نشرب ماء', labelFr: 'Boire de l\'eau', labelEn: 'Drink water', category: 'needs' },
      { id: 'apple', iconName: 'apple', color: 'text-[#9E4E3D]', bgTint: 'bg-[#D58C7A]/15', labelAr: 'حبيت تفاحة', labelFr: 'Manger une pomme', labelEn: 'Eat an apple', category: 'needs' },
      { id: 'snack', iconName: 'utensils', color: 'text-[#806936]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'لمجة خفيفة', labelFr: 'Goûter d\'artiste', labelEn: 'Snack time', category: 'needs' },
      { id: 'break', iconName: 'coffee', color: 'text-[#806936]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'نريّح شوية', labelFr: 'Pause créative', labelEn: 'Quiet break', category: 'needs' },
      { id: 'help', iconName: 'help', color: 'text-[#BA3C3C]', bgTint: 'bg-[#BA3C3C]/10', labelAr: 'عاونوني', labelFr: 'Besoin d\'aide', labelEn: 'Help me', category: 'needs' },
      { id: 'wash', iconName: 'bath', color: 'text-[#2868C7]', bgTint: 'bg-[#2868C7]/10', labelAr: 'نغسل يديّ', labelFr: 'Nettoyer mes mains', labelEn: 'Wash hands', category: 'needs' },

      // أنشطة / Activities
      { id: 'listen', iconName: 'headphones', color: 'text-[#2868C7]', bgTint: 'bg-[#2868C7]/10', labelAr: 'نسمع الصوت', labelFr: 'Écouter le son', labelEn: 'Listen to sound', category: 'activities' },
      { id: 'speak', iconName: 'volume2', color: 'text-[#9E4E3D]', bgTint: 'bg-[#D58C7A]/15', labelAr: 'نعاود الكلمة', labelFr: 'Répéter le mot', labelEn: 'Repeat word', category: 'activities' },
      { id: 'blocks', iconName: 'boxes', color: 'text-[#806936]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'تركيب المكعبات', labelFr: 'Assembler les blocs', labelEn: 'Building blocks', category: 'activities' },
      { id: 'story', iconName: 'book', color: 'text-[#9E4E3D]', bgTint: 'bg-[#D58C7A]/15', labelAr: 'قصة شابة', labelFr: 'Lire une histoire', labelEn: 'Story time', category: 'activities' },
      { id: 'draw', iconName: 'palette', color: 'text-[#9E4E3D]', bgTint: 'bg-[#D58C7A]/15', labelAr: 'نرسم لوحتي', labelFr: 'Peindre et créer', labelEn: 'Painting studio', category: 'activities' },
      { id: 'music', iconName: 'headphones', color: 'text-[#2868C7]', bgTint: 'bg-[#2868C7]/10', labelAr: 'غنية شابة', labelFr: 'Chanson rythmée', labelEn: 'Nice song', category: 'activities' },

      // مشاعر / Feelings
      { id: 'happy', iconName: 'sparkles', color: 'text-[#806936]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'فرحان بنطقي', labelFr: 'Fier de mes créations', labelEn: 'Proud of speech', category: 'feelings' },
      { id: 'hug', iconName: 'heart', color: 'text-[#9E4E3D]', bgTint: 'bg-[#D58C7A]/15', labelAr: 'تحضينة دافية', labelFr: 'Câlin affectueux', labelEn: 'Warm hug', category: 'feelings' },
      { id: 'bravo', iconName: 'trophy', color: 'text-[#806936]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'يعطيك الصحة يا بطل', labelFr: 'Bravo l\'artiste', labelEn: 'Great artist', category: 'feelings' },
      { id: 'smile', iconName: 'smile', color: 'text-[#806936]', bgTint: 'bg-[#D8BE83]/15', labelAr: 'فرحان بخدمتي', labelFr: 'Très satisfait', labelEn: 'Happy with work', category: 'feelings' },
      { id: 'safe', iconName: 'shield', color: 'text-[#2D7A58]', bgTint: 'bg-[#2D7A58]/10', labelAr: 'راني في أمان', labelFr: 'Atelier bienveillant', labelEn: 'Safe studio', category: 'feelings' },
    ],
  },
};

export const DEFAULT_PROFILES: Record<'yanis' | 'amina', ChildProfileData> = {
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
      { id: 'r2', iconName: 'bot', titleAr: 'بصمة الصوت مع الرفيق باني', titleFr: 'Exercice sonore avec Banny', titleEn: 'Phonation practice with Banny', completed: true },
      { id: 'r3', iconName: 'layers', titleAr: 'تسمية بطاقتين على شريط التواصل', titleFr: 'Composition de 2 pictogrammes', titleEn: 'Compose 2 AAC cards', completed: false },
      { id: 'r4', iconName: 'boxes', titleAr: 'ترتيب المكعبات والاحتفال بالنجمة', titleFr: 'Rangement ludique & étoile', titleEn: 'Toy cleanup & victory star', completed: false },
    ],
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
      { id: 'a3', iconName: 'wind', titleAr: 'تمرين التنفس البطيء مع باني', titleFr: 'Respiration synchronisée avec Banny', titleEn: 'Deep breathing with Banny', completed: true },
      { id: 'a4', iconName: 'book', titleAr: 'وقت القصة المصورة قبل القيلولة', titleFr: 'Histoire imagée avant la sieste', titleEn: 'Picture story before rest', completed: false },
    ],
  },
};

