/**
 * OFOQ Audio Architecture Service
 * Calm Acoustic Web Audio Synthesizer & Natural Speech Synthesis Engine
 * Designed for autism-informed sensory comfort (low-pass filtering, no sudden clicks, controllable volume/rate)
 */

export type TactileFeedbackType = 'click' | 'pop' | 'chime' | 'uncheck' | 'celebrate';

let audioCtxInstance: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtxInstance) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      audioCtxInstance = new AudioCtx();
    }
  }
  if (audioCtxInstance && audioCtxInstance.state === 'suspended') {
    audioCtxInstance.resume().catch(() => {});
  }
  return audioCtxInstance;
};

/**
 * Plays organic, low-pass filtered acoustic feedback for interactive touch events.
 * Avoids harsh high-frequency transients that trigger sensory distress.
 */
export const playTactileFeedback = (
  type: TactileFeedbackType = 'click',
  options?: { volume?: number; soundEnabled?: boolean }
) => {
  if (options?.soundEnabled === false) return;
  const userVolume = options?.volume ?? 0.85;
  if (userVolume <= 0) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Organic 1400Hz low-pass filter to eliminate digital clipping & harsh high frequencies
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(Math.min(1, Math.max(0, userVolume)), now);

    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

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
      gain.gain.linearRampToValueAtTime(0.07, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(filter);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.13);
      osc2.stop(now + 0.13);
    } else if (type === 'chime') {
      // Soothing Tibetan singing bowl / calm bell resonance (528 Hz therapeutic foundation)
      const osc = ctx.createOscillator();
      const sub = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      sub.type = 'sine';
      osc.frequency.setValueAtTime(528, now);
      sub.frequency.setValueAtTime(264, now);

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
      // Gentle acoustic pentatonic progression (calm encouragement)
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
    // Silent fail if Web Audio context is not allowed/blocked
  }
};

// ----------------------------------------------------
// CURATED WARM VOICE PROFILES (3 Male, 3 Female)
// ----------------------------------------------------
export interface WarmVoiceProfile {
  id: string;
  gender: 'female' | 'male';
  nameAr: string;
  nameFr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionFr: string;
  descriptionEn: string;
  pitch: number;          // Calm acoustic pitch tuning (0.72 - 1.25)
  rateMultiplier: number; // Gentle cadence adjustment (0.82 - 1.05)
  targetNameKeywords: string[];
  cueSound?: TactileFeedbackType; // Dedicated pre-speech acoustic signature
}

export const FEMALE_VOICE_KEYWORDS = [
  'female', 'woman', 'girl', 'féminin', 'femme', 'salma', 'hoda', 'zariyah', 
  'amina', 'denise', 'hortense', 'samantha', 'serena', 'jenny', 'aria', 
  'celine', 'julie', 'victoria', 'charlotte', 'zeina', 'leila', 'fatima'
];

export const MALE_VOICE_KEYWORDS = [
  'male', 'man', 'homme', 'garçon', 'naayf', 'tariq', 'maged', 'henri', 
  'guy', 'paul', 'thomas', 'daniel', 'oliver', 'ryan', 'george', 'antoine', 
  'shakir', 'karim', 'bilal', 'omar', 'ali', 'hassan'
];

export const WARM_VOICE_PROFILES: WarmVoiceProfile[] = [
  // 3 Female Voices (Gentle, Maternal, Encouraging)
  {
    id: 'female-nour',
    gender: 'female',
    nameAr: 'نور (صوت أمومي هادئ ودافئ)',
    nameFr: 'Nour (Voix maternelle & douce)',
    nameEn: 'Nour (Warm Maternal & Gentle)',
    descriptionAr: 'نبرة صوتية مريحة حسياً، مناسبة للأطفال الصغار وبدايات النطق',
    descriptionFr: 'Timbre apaisant idéal pour les plus jeunes et la mise en confiance',
    descriptionEn: 'Soothing acoustic tone perfect for young children and early speech',
    pitch: 1.05,
    rateMultiplier: 0.90,
    targetNameKeywords: ['salma', 'zariyah', 'denise', 'samantha', 'hortense', 'female'],
    cueSound: 'chime',
  },
  {
    id: 'female-maryam',
    gender: 'female',
    nameAr: 'مريم (صوت أرطفوني مشجع ومبتسم)',
    nameFr: 'Maryam (Voix d\'éveil encourageante)',
    nameEn: 'Maryam (Encouraging Speech Coach)',
    descriptionAr: 'مخارج حروف واضحة ونبرة تفاؤلية تحفز الطفل على المحاكاة الصوتية',
    descriptionFr: 'Phonation claire et articulation soignée pour la rééducation',
    descriptionEn: 'Crisp phonetic articulation and optimistic guidance for speech repetition',
    pitch: 1.25,
    rateMultiplier: 1.04,
    targetNameKeywords: ['amina', 'hoda', 'julie', 'jenny', 'aria', 'natural', 'neural', 'female'],
    cueSound: 'pop',
  },
  {
    id: 'female-yasmina',
    gender: 'female',
    nameAr: 'ياسمينة (صوت أخت كبرى حنونة)',
    nameFr: 'Yasmine (Voix complice & bienveillante)',
    nameEn: 'Yasmine (Friendly Older Sister)',
    descriptionAr: 'نبرة تفاعلية طبيعية وقريبة من قلب الطفل للتواصل اليومي',
    descriptionFr: 'Ton naturel et chaleureux pour les routines et la communication quotidienne',
    descriptionEn: 'Warm and friendly tone for everyday routines and AAC communication',
    pitch: 1.15,
    rateMultiplier: 0.97,
    targetNameKeywords: ['zeina', 'celine', 'charlotte', 'victoria', 'serena', 'online', 'female'],
    cueSound: 'click',
  },

  // 3 Male Voices (Reassuring, Calm, Paternal)
  {
    id: 'male-tariq',
    gender: 'male',
    nameAr: 'طارق (صوت أبوي رزين ومطمئن)',
    nameFr: 'Tariq (Voix paternelle rassurante)',
    nameEn: 'Tariq (Calm & Reassuring Father)',
    descriptionAr: 'نبرة عميقة ودافئة تمنح شعوراً بالأمان والسكينة العاطفية',
    descriptionFr: 'Timbre chaud et posé offrant repère et sécurité affective',
    descriptionEn: 'Deep, warm tone creating emotional security and calmness',
    pitch: 0.72,
    rateMultiplier: 0.88,
    targetNameKeywords: ['tariq', 'naayf', 'henri', 'paul', 'guy', 'male'],
    cueSound: 'uncheck',
  },
  {
    id: 'male-karim',
    gender: 'male',
    nameAr: 'كريم (صوت أخ مشجع ومرح)',
    nameFr: 'Karim (Voix jeune & dynamique)',
    nameEn: 'Karim (Cheerful Companion Brother)',
    descriptionAr: 'نبرة حيوية ومتوازنة تشجع على اللعب الحسي واستكشاف الكلمات',
    descriptionFr: 'Élocution engageante idéale pour le jeu et la phonétique',
    descriptionEn: 'Engaging, lively articulation for sensory play and exploration',
    pitch: 0.96,
    rateMultiplier: 1.05,
    targetNameKeywords: ['maged', 'thomas', 'ryan', 'daniel', 'male'],
    cueSound: 'click',
  },
  {
    id: 'male-bilal',
    gender: 'male',
    nameAr: 'بلال (صوت أخصائي هادئ وتأملي)',
    nameFr: 'Bilal (Voix posée d\'accompagnement)',
    nameEn: 'Bilal (Reflective & Mindful Guide)',
    descriptionAr: 'إيقاع نطق هادئ جداً مخصص لتمارين التنفس والاسترخاء الحسي',
    descriptionFr: 'Cadence très douce dédiée aux exercices de respiration et de retour au calme',
    descriptionEn: 'Very gentle cadence designed for sensory breathing and calming pauses',
    pitch: 0.82,
    rateMultiplier: 0.82,
    targetNameKeywords: ['shakir', 'antoine', 'oliver', 'george', 'natural', 'male'],
    cueSound: 'chime',
  },
];


/**
 * Multi-Voice Selection & Formant Mapping Engine
 * Selects genuinely distinct OS voices for each profile based on:
 * 1. Target keyword match in exact language
 * 2. Gender classification pool filtering (female keywords vs male keywords)
 * 3. Unique rotation index per gender so each persona maps to a different physical voice
 * 4. Cross-language and host voice rotational fallback
 */
export const selectVoiceForProfile = (
  profile: WarmVoiceProfile,
  lang: 'ar' | 'fr' | 'en',
  allVoices: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | null => {
  if (!allVoices || allVoices.length === 0) return null;

  // 1. Language voices
  const langVoices = allVoices.filter((v) => v.lang.toLowerCase().startsWith(lang));
  const candidatePool = langVoices.length > 0 ? langVoices : allVoices;

  // 2. Keyword check on candidate pool
  for (const kw of profile.targetNameKeywords) {
    const matched = candidatePool.find((v) => v.name.toLowerCase().includes(kw));
    if (matched) return matched;
  }

  // 3. Gender-classified pool selection
  const genderKeywords = profile.gender === 'female' ? FEMALE_VOICE_KEYWORDS : MALE_VOICE_KEYWORDS;
  const genderedPool = candidatePool.filter((v) => {
    const nameLower = v.name.toLowerCase();
    return genderKeywords.some((kw) => nameLower.includes(kw));
  });

  const sameGenderProfiles = WARM_VOICE_PROFILES.filter((p) => p.gender === profile.gender);
  const genderProfileIndex = Math.max(0, sameGenderProfiles.findIndex((p) => p.id === profile.id));

  // If gendered pool exists, rotate specifically through it
  if (genderedPool.length > 0) {
    return genderedPool[genderProfileIndex % genderedPool.length];
  }

  // 4. If no gendered voices detected, partition the candidate pool so profiles don't collide
  const allProfileIndex = Math.max(0, WARM_VOICE_PROFILES.findIndex((p) => p.id === profile.id));
  if (candidatePool.length > 1) {
    return candidatePool[allProfileIndex % candidatePool.length];
  }

  // 5. Fallback: rotation across all installed OS voices
  if (allVoices.length > 0) {
    return allVoices[allProfileIndex % allVoices.length];
  }

  return null;
};

let cachedVoices: SpeechSynthesisVoice[] = [];
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  if (cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices();
  }
  return cachedVoices;
};

let fallbackTimeoutId: ReturnType<typeof setTimeout> | null = null;

export const cancelSpeech = () => {
  if (fallbackTimeoutId) {
    clearTimeout(fallbackTimeoutId);
    fallbackTimeoutId = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // browser audio context or synth safely ignored
    }
  }
};

export interface SpeakOptions {
  text: string;
  lang: 'ar' | 'fr' | 'en';
  onStart?: () => void;
  onEnd?: () => void;
  rate?: number;
  pitch?: number;
  volume?: number;
  voiceURI?: string;
  voiceProfileId?: string;
  voiceEnabled?: boolean;
}

export const speakHumanVoice = ({
  text,
  lang,
  onStart,
  onEnd,
  rate = 0.92,
  pitch = 1.0,
  volume = 0.85,
  voiceURI,
  voiceProfileId,
  voiceEnabled = true,
}: SpeakOptions) => {
  if (!voiceEnabled || volume <= 0) {
    if (onStart) onStart();
    fallbackTimeoutId = setTimeout(() => {
      fallbackTimeoutId = null;
      if (onEnd) onEnd();
    }, 400);
    return;
  }

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onStart) onStart();
    fallbackTimeoutId = setTimeout(() => {
      fallbackTimeoutId = null;
      if (onEnd) onEnd();
    }, 1200);
    return;
  }

  try {
    window.speechSynthesis.cancel();

    // Look up selected warm voice profile if provided or if voiceURI is a profile ID
    const effectiveProfileId = voiceProfileId || (voiceURI?.startsWith('female-') || voiceURI?.startsWith('male-') ? voiceURI : null);
    const warmProfile = effectiveProfileId
      ? WARM_VOICE_PROFILES.find((p) => p.id === effectiveProfileId)
      : null;

    // Apply gentle pitch and rate adjustments for warm human cadence
    const basePitch = warmProfile ? warmProfile.pitch * pitch : pitch;
    const baseRate = warmProfile ? warmProfile.rateMultiplier * rate : rate;

    const safeRate = Number.isFinite(baseRate) ? Math.min(1.15, Math.max(0.70, baseRate)) : 0.92;
    const safePitch = Number.isFinite(basePitch) ? Math.min(1.4, Math.max(0.65, basePitch)) : 1.0;
    const safeVolume = Number.isFinite(volume) ? Math.min(1, Math.max(0, volume)) : 0.85;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = safeRate;
    utterance.pitch = safePitch;
    utterance.volume = safeVolume;

    // If profile has a dedicated cue sound, play tactile acoustic feedback
    if (warmProfile?.cueSound) {
      playTactileFeedback(warmProfile.cueSound, { volume: Math.min(0.4, safeVolume), soundEnabled: true });
    }

    const allVoices = getAvailableVoices();
    let selectedVoice: SpeechSynthesisVoice | null = null;

    // Direct voiceURI match
    if (voiceURI && !voiceURI.startsWith('female-') && !voiceURI.startsWith('male-')) {
      selectedVoice = allVoices.find((v) => v.voiceURI === voiceURI) || null;
    }

    // Match by warm profile target multi-voice formant allocation
    if (!selectedVoice && warmProfile) {
      selectedVoice = selectVoiceForProfile(warmProfile, lang, allVoices);
    }


    if (!selectedVoice) {
      if (lang === 'ar') {
        const arVoices = allVoices.filter((v) => v.lang.toLowerCase().startsWith('ar'));
        selectedVoice =
          arVoices.find((v) => {
            const name = v.name.toLowerCase();
            return name.includes('natural') || name.includes('neural') || name.includes('online');
          }) ||
          arVoices.find((v) => {
            const name = v.name.toLowerCase();
            return (
              name.includes('naayf') ||
              name.includes('salma') ||
              name.includes('tariq') ||
              name.includes('amina') ||
              name.includes('zariyah') ||
              name.includes('hoda')
            );
          }) ||
          arVoices.find((v) => {
            const name = v.name.toLowerCase();
            return name.includes('google') || name.includes('apple') || name.includes('maged');
          }) ||
          arVoices[0] ||
          null;
      } else if (lang === 'fr') {
        const frVoices = allVoices.filter((v) => v.lang.toLowerCase().startsWith('fr'));
        selectedVoice =
          frVoices.find((v) => {
            const name = v.name.toLowerCase();
            return (
              name.includes('natural') ||
              name.includes('online') ||
              name.includes('denise') ||
              name.includes('henri') ||
              name.includes('neural') ||
              name.includes('paul')
            );
          }) ||
          frVoices.find((v) => {
            const name = v.name.toLowerCase();
            return (
              name.includes('google') ||
              name.includes('thomas') ||
              name.includes('julie') ||
              name.includes('hortense')
            );
          }) ||
          frVoices[0] ||
          null;
      } else {
        const enVoices = allVoices.filter((v) => v.lang.toLowerCase().startsWith('en'));
        selectedVoice =
          enVoices.find((v) => {
            const name = v.name.toLowerCase();
            return (
              name.includes('natural') ||
              name.includes('online') ||
              name.includes('jenny') ||
              name.includes('guy') ||
              name.includes('aria') ||
              name.includes('neural')
            );
          }) ||
          enVoices.find((v) => {
            const name = v.name.toLowerCase();
            return (
              name.includes('google') ||
              name.includes('samantha') ||
              name.includes('serena')
            );
          }) ||
          enVoices[0] ||
          null;
      }
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else {
      utterance.lang = lang === 'ar' ? 'ar-SA' : lang === 'fr' ? 'fr-FR' : 'en-US';
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

/**
 * Authentic Algerian Darija Spoken Pictogram Map with accurate phonetic vocalization (Tashkeel diacritics)
 */
export const DARIJA_PICTO_SPOKEN: Record<string, string> = {
  water: 'حَبِّيتْ نَشْرَبْ مَاءْ',
  apple: 'حَبِّيتْ نَاكُلْ تُفَّاحَة',
  listen: 'نِسْمَعْ مْلِيحْ لِلصَّوْتْ',
  speak: 'نْعَاوَدْ الْكَلِمَة بِالْعَقْلْ',
  blocks: 'نِلْعَبْ بِالتَّرْكِيبَاتْ وَالْمُكَعَّبَاتْ',
  puzzle: 'نِلْعَبْ بِالتَّرْكِيبَاتْ وَالْمُكَعَّبَاتْ',
  happy: 'فَرْحَانْ بْزَافْ بْنُطْقِي',
  help: 'عَاوْنُونِي رَبِّي يَحْفَظْكُمْ',
  break: 'حَبِّيتْ نْرَيَّحْ شْوِيَّة',
  hug: 'تَحْضِينَة حْنِينَة وَدَافْيَة',
  snack: 'حَبِّيتْ لُمْجَة خَفِيفَة وَبَنِينَة',
  rest: 'نْرَيَّحْ وَنِرْتَاحْ شْوِيَّة',
  play: 'نِلْعَبْ بِالْعَقْلْ وَبِالشْوِيَّة',
  draw: 'نِرْسُمْ بِالْأَلْوَانْ الشَّابَّة',
  sleep: 'حَبِّيتْ نُرْقُدْ وَنِرْتَاحْ',
  wash: 'نِغْسِلْ يَدَيَّ بِالْمَاءْ وَالصَّابُونْ',
  outdoor: 'نُخْرُجْ نِلْعَبْ وَنِتْحَرَّكْ',
  breathe: 'نِتْنَفَّسْ بِالْعَقْلْ، شَهِيقْ وَزَفِيرْ',
  music: 'نِسْمَعْ مُوسِيقَى هَادْيَة وَشَابَّة',
  safe: 'رَانِي فِي أَمَانْ وَرَاحَة كَبِيرَة',
  smile: 'رَانِي مِرْتَاحْ وَفَرْحَانْ',
  walk: 'نِمْشِي بِالْعَقْلْ',
  story: 'قِصَّة مُصَوَّرَة شَابَّة مَعَ مَامَا',
  bravo: 'أَنَا بَطَلْ شَاطِرْ، يَعْطِينِي الصِّحَّة',
  share: 'نْشَارِكْ مَعَ مَامَا وَبَابَا',
  star: 'نَجْمَة الشَّاطِرْ الْكَبِيرَة',
};

