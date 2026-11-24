import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Orbit,
  Sprout,
  Waves,
  Palette,
  Loader2,
  ShieldCheck
} from 'lucide-react';
import { ThemeKey, ChildProfileData } from './types';
import { playTactileFeedback } from '../../services/audioService';
import { useSensoryPreferences } from '../../context/SensoryPreferencesContext';

interface ChildWorldWizardProps {
  onComplete: (newProfile: ChildProfileData) => void;
  lang: 'ar' | 'fr' | 'en';
}

export const ChildWorldWizard: React.FC<ChildWorldWizardProps> = ({
  onComplete,
  lang,
}) => {
  const { preferences } = useSensoryPreferences();
  const isAr = lang === 'ar';
  const isEn = lang === 'en';

  const [wizardStep, setWizardStep] = useState<number>(1);
  const [childName, setChildName] = useState<string>('ريان');
  const [childAge, setChildAge] = useState<number>(5);
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>('ocean');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const themes: { key: ThemeKey; titleAr: string; titleFr: string; titleEn: string; icon: React.ReactNode; color: string }[] = [
    { key: 'space', titleAr: 'كوكب الفضاء والأصوات', titleFr: 'Monde Céleste', titleEn: 'Cosmic Speech', icon: <Orbit size={20} />, color: 'from-[#172B46] to-[#2868C7]' },
    { key: 'nature', titleAr: 'كوكب الطبيعة والهدوء', titleFr: 'Jardin Douceur', titleEn: 'Sensory Nature', icon: <Sprout size={20} />, color: 'from-[#172B46] to-[#2D7A58]' },
    { key: 'ocean', titleAr: 'كوكب البحار والتنفس', titleFr: 'Océan Apaisé', titleEn: 'Ocean Haven', icon: <Waves size={20} />, color: 'from-[#172B46] to-[#2868C7]' },
    { key: 'creative', titleAr: 'كوكب الإبداع والقصص', titleFr: 'Atelier Couleurs', titleEn: 'Creative Studio', icon: <Palette size={20} />, color: 'from-[#172B46] to-[#9E4E3D]' },
  ];

  const handleNextStep = () => {
    playTactileFeedback('click', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });
    if (wizardStep === 1) {
      setWizardStep(2);
    } else if (wizardStep === 2) {
      setIsGenerating(true);
      playTactileFeedback('celebrate', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });

      const sanitizedName = childName.trim().slice(0, 40) || (isAr ? 'ريان' : 'Rayan');

      timerRef.current = setTimeout(() => {
        setIsGenerating(false);
        const newProfile: ChildProfileData = {
          id: 'custom',
          nameAr: sanitizedName,
          nameFr: sanitizedName,
          nameEn: sanitizedName,
          age: childAge,
          theme: selectedTheme,
          speechGoalAr: 'التعبير اليومي المستقل والتفاعل الإيجابي مع المحيط',
          speechGoalFr: 'Communication autonome et apaisement sensoriel',
          speechGoalEn: 'Independent daily communication and sensory comfort',
          specialistName: 'Dr. Benali',
          specialistRoleAr: 'أخصائي المرافقة الأسرية وطيف التوحد',
          specialistRoleFr: 'Spécialiste TSA & Accompagnement',
          specialistRoleEn: 'Autism Specialist & Family Support',
          routines: [
            { id: 'c1', iconName: 'sunrise', titleAr: 'الروتين الصباحي وشرب الماء', titleFr: 'Routine du matin', titleEn: 'Morning routine', completed: true },
            { id: 'c2', iconName: 'bot', titleAr: 'تحية الصديق نور بالصوت', titleFr: 'Bonjour à Nour', titleEn: 'Say hello to Nour', completed: true },
            { id: 'c3', iconName: 'layers', titleAr: 'اختيار بطاقتين على شريط التواصل', titleFr: '2 pictogrammes choisis', titleEn: 'Pick 2 cards', completed: false },
          ],
        };
        onComplete(newProfile);
      }, 1200);
    }
  };

  const handlePrevStep = () => {
    playTactileFeedback('click', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });
    setWizardStep(1);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#172B46]/10 shadow-sm space-y-6 text-start max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#172B46]/10 pb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#172B46] flex items-center gap-2">
            <Sparkles size={18} className="text-[#806936]" />
            <span>{isAr ? 'تخصيص عالم طفل جديد' : isEn ? 'Personalize New Child World' : 'Personnaliser un Monde d\'Enfant'}</span>
          </h3>
          <p className="text-xs text-[#5B6E85] mt-1">
            {isAr ? 'عوالم مستقلة لكل طفل تحت حساب ولي الأمر الموحّد' : 'Independent child worlds under one parent account'}
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2868C7]/10 text-[#2868C7] text-xs font-bold shrink-0">
          <ShieldCheck size={14} />
          <span>{isAr ? `المرحلة ${wizardStep} من 2` : `Step ${wizardStep} of 2`}</span>
        </div>
      </div>

      {/* Step 1: Name and Age */}
      {wizardStep === 1 && (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="wizard-child-name" className="text-xs font-bold text-[#172B46]">
              {isAr ? 'اسم الطفل أو اللقب المفضل' : isEn ? 'Child\'s Name or Nickname' : 'Prénom de l\'enfant'}
            </label>
            <input
              id="wizard-child-name"
              type="text"
              maxLength={40}
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="w-full px-4 py-3 min-h-[48px] rounded-2xl bg-[#F5F6F3] border border-[#172B46]/15 text-sm font-semibold text-[#172B46] focus-ring"
              placeholder={isAr ? 'مثال: ريان، سارة، إياد...' : 'e.g., Rayan, Sara...'}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="wizard-child-age" className="text-xs font-bold text-[#172B46]">
              {isAr ? 'العمر (بالسنوات)' : isEn ? 'Age (years)' : 'Âge (années)'}
            </label>
            <div className="flex items-center gap-3">
              <input
                id="wizard-child-age"
                type="range"
                min="3"
                max="12"
                value={childAge}
                onChange={(e) => setChildAge(parseInt(e.target.value, 10))}
                className="w-full h-2.5 bg-[#A9C5D8]/40 rounded-lg appearance-none cursor-pointer accent-[#2868C7] focus-ring"
              />
              <span className="w-12 h-10 rounded-xl bg-[#F5F6F3] flex items-center justify-center font-bold text-sm text-[#2868C7] shrink-0 border border-[#172B46]/10">
                {childAge}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Theme Selection */}
      {wizardStep === 2 && !isGenerating && (
        <div className="space-y-4">
          <span className="text-xs font-bold text-[#172B46] block">
            {isAr ? 'اختر الطابع الحسي والموضوع المفضل' : isEn ? 'Select Sensory World Theme' : 'Choisissez le thème immersif'}
          </span>
          <div
            role="radiogroup"
            aria-label={isAr ? 'اختيار الطابع الحسي' : 'Select Sensory Theme'}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {themes.map((th) => (
              <button
                key={th.key}
                type="button"
                role="radio"
                aria-checked={selectedTheme === th.key}
                onClick={() => setSelectedTheme(th.key)}
                className={`p-4 rounded-2xl border-2 text-start flex items-center gap-3 transition-all cursor-pointer focus-ring min-h-[64px] ${
                  selectedTheme === th.key
                    ? 'border-[#2868C7] bg-[#2868C7]/10 shadow-sm'
                    : 'border-[#172B46]/10 bg-[#F5F6F3] hover:border-[#2868C7]/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${th.color} text-white flex items-center justify-center shrink-0`}>
                  {th.icon}
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#172B46]">
                    {isAr ? th.titleAr : isEn ? th.titleEn : th.titleFr}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Loading / Generating animation */}
      {isGenerating && (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
          <Loader2 size={36} className="text-[#2868C7] animate-spin" />
          <p className="text-sm font-bold text-[#172B46]">
            {isAr
              ? `جاري بناء عالم ${childName} الحسي...`
              : `Building ${childName}'s Sensory World...`}
          </p>
        </div>
      )}

      {/* Footer Navigation */}
      {!isGenerating && (
        <div className="pt-4 border-t border-[#172B46]/10 flex items-center justify-between gap-3">
          {wizardStep === 2 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-4 py-2.5 min-h-[48px] rounded-2xl border border-[#172B46]/15 text-xs font-bold text-[#5B6E85] hover:text-[#172B46] transition-all cursor-pointer focus-ring flex items-center gap-1.5"
            >
              <ArrowLeft size={16} className="rtl-flip" />
              <span>{isAr ? 'السابق' : isEn ? 'Back' : 'Retour'}</span>
            </button>
          ) : <div />}

          <button
            type="button"
            onClick={handleNextStep}
            className="px-6 py-3 min-h-[48px] rounded-full bg-gradient-to-r from-[#2868C7] to-[#172B46] text-white text-xs sm:text-sm font-bold shadow-md hover:scale-[1.02] transition-all cursor-pointer focus-ring flex items-center gap-2"
          >
            <span>
              {wizardStep === 1
                ? isAr ? 'التالي: اختيار الطابع الحسي' : isEn ? 'Next: Theme' : 'Suivant : Thème'
                : isAr ? 'إطلاق عالم الطفل' : isEn ? 'Launch World' : 'Lancer le Monde'}
            </span>
            <ArrowRight size={16} className="rtl-flip text-[#D8BE83]" />
          </button>
        </div>
      )}
    </div>
  );
};
