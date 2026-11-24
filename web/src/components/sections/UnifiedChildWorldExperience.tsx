import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Sparkles,
  Users,
  ShieldCheck,
  UserPlus,
  Play
} from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';
import { ChildProfileData } from '../child-world/types';
import { THEMES, DEFAULT_PROFILES } from '../child-world/themesData';
import { AacGrid } from '../child-world/AacGrid';
import { RoutineTracker } from '../child-world/RoutineTracker';
import { SpecialistBridge } from '../child-world/SpecialistBridge';
import { ChildWorldWizard } from '../child-world/ChildWorldWizard';
import { NourCompanionCard } from '../child-world/NourCompanionCard';
import { playTactileFeedback } from '../../services/audioService';
import { useSensoryPreferences } from '../../context/SensoryPreferencesContext';

export const UnifiedChildWorldExperience: React.FC = () => {
  const { i18n } = useTranslation();
  const { preferences } = useSensoryPreferences();
  const currentLang = (i18n.language || 'fr').split('-')[0].toLowerCase() as 'ar' | 'fr' | 'en';
  const isAr = currentLang === 'ar';
  const isEn = currentLang === 'en';

  const [activeTab, setActiveTab] = useState<'world' | 'hub' | 'wizard'>('world');
  const [activeProfileId, setActiveProfileId] = useState<'yanis' | 'amina' | 'custom'>('yanis');
  const [profiles, setProfiles] = useState<Record<'yanis' | 'amina', ChildProfileData>>(DEFAULT_PROFILES);
  const [customProfile, setCustomProfile] = useState<ChildProfileData | null>(null);

  const currentProfile: ChildProfileData =
    activeProfileId === 'custom' && customProfile
      ? customProfile
      : profiles[activeProfileId as 'yanis' | 'amina'] || profiles.yanis;

  const currentThemeConfig = THEMES[currentProfile.theme] || THEMES.space;

  const handleToggleRoutine = (routineId: string) => {
    if (activeProfileId === 'custom' && customProfile) {
      const updated = customProfile.routines.map((r) =>
        r.id === routineId ? { ...r, completed: !r.completed } : r
      );
      const isDone = updated.find((r) => r.id === routineId)?.completed;
      const allDone = updated.every((r) => r.completed);
      if (allDone) {
        playTactileFeedback('celebrate', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });
      } else if (isDone) {
        playTactileFeedback('chime', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });
      } else {
        playTactileFeedback('uncheck', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });
      }
      setCustomProfile({ ...customProfile, routines: updated });
      return;
    }

    setProfiles((prev) => {
      const child = prev[activeProfileId as 'yanis' | 'amina'];
      if (!child) return prev;
      const updatedRoutines = child.routines.map((r) =>
        r.id === routineId ? { ...r, completed: !r.completed } : r
      );
      const isDone = updatedRoutines.find((r) => r.id === routineId)?.completed;
      const allDone = updatedRoutines.every((r) => r.completed);
      if (allDone) {
        playTactileFeedback('celebrate', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });
      } else if (isDone) {
        playTactileFeedback('chime', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });
      } else {
        playTactileFeedback('uncheck', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });
      }
      return {
        ...prev,
        [activeProfileId]: { ...child, routines: updatedRoutines },
      };
    });
  };

  const handleProfileCreated = (newProfile: ChildProfileData) => {
    setCustomProfile(newProfile);
    setActiveProfileId('custom');
    setActiveTab('world');
  };

  const allProfilesList: ChildProfileData[] = [
    profiles.yanis,
    profiles.amina,
    ...(customProfile ? [customProfile] : []),
  ];

  return (
    <section id="experience" className="py-16 sm:py-24 bg-[#F5F6F3] scroll-mt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#A9C5D8]/50 text-[#172B46] text-xs font-bold shadow-sm">
              <Sparkles size={14} className="text-[#806936]" />
              <span>{isAr ? 'بيئة الطفل الرقمية المتصلة' : isEn ? 'Connected Child World Experience' : 'Expérience Connectée du Monde de l\'Enfant'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-[#172B46] tracking-tight">
              {isAr ? 'عالم مخصص لكل طفل • تواصل، روتين، ومرافقة' : isEn ? 'A Personalized World for Every Child' : 'Un Monde Sur-Mesure pour Chaque Enfant'}
            </h2>
            <p className="text-xs sm:text-base text-[#5B6E85] leading-relaxed">
              {isAr
                ? 'فضاء عائلي محمي يمنح كل طفل عالمه الحسي المستقل، مع ربط مباشر ومأمون بين البيت وجلسات الأخصائي.'
                : isEn
                ? 'A safe family environment providing independent sensory worlds for each child, bridged directly to clinic guidance.'
                : 'Un espace familial sécurisé avec des mondes sensoriels étanches reliés au suivi de l\'orthophoniste.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Tab & Profile Switcher Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-white rounded-3xl border border-[#172B46]/10 shadow-sm max-w-4xl mx-auto">
          {/* Main Navigation Tabs */}
          <div
            role="tablist"
            aria-label={isAr ? 'أقسام عالم الطفل' : isEn ? 'Child world sections' : 'Sections du monde de l\'enfant'}
            className="flex items-center gap-1.5 w-full sm:w-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'world'}
              onClick={() => {
                playTactileFeedback('click', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });
                setActiveTab('world');
              }}
              className={`flex-1 sm:flex-initial px-4 py-2.5 min-h-[48px] rounded-2xl text-xs font-bold transition-all cursor-pointer focus-ring flex items-center justify-center gap-2 ${
                activeTab === 'world'
                  ? 'bg-[#172B46] text-white shadow-sm'
                  : 'text-[#5B6E85] hover:text-[#172B46] hover:bg-black/5'
              }`}
            >
              <Play size={14} className="text-[#D8BE83]" />
              <span>{isAr ? 'عالم الطفل التفاعلي' : isEn ? 'Child World Interactive' : 'Monde de l\'Enfant'}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'hub'}
              onClick={() => {
                playTactileFeedback('click', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });
                setActiveTab('hub');
              }}
              className={`flex-1 sm:flex-initial px-4 py-2.5 min-h-[48px] rounded-2xl text-xs font-bold transition-all cursor-pointer focus-ring flex items-center justify-center gap-2 ${
                activeTab === 'hub'
                  ? 'bg-[#172B46] text-white shadow-sm'
                  : 'text-[#5B6E85] hover:text-[#172B46] hover:bg-black/5'
              }`}
            >
              <Users size={14} className="text-[#2868C7]" />
              <span>{isAr ? 'فضاء العائلة المحمي' : isEn ? 'Family Hub' : 'Espace Famille'}</span>
            </button>
          </div>

          {/* Child Switcher Pills (Parent controls switching, min-h-[48px]) */}
          <div
            role="group"
            aria-label={isAr ? 'التبديل بين عوالم الأطفال' : 'Switch child profile'}
            className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap"
          >
            <span className="text-[11px] font-bold text-[#5B6E85] hidden md:inline">
              {isAr ? 'الطفل النشط:' : isEn ? 'Active child:' : 'Enfant actif :'}
            </span>

            <button
              type="button"
              aria-pressed={activeProfileId === 'yanis'}
              onClick={() => {
                playTactileFeedback('click', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });
                setActiveProfileId('yanis');
                setActiveTab('world');
              }}
              className={`px-3.5 py-2 min-h-[48px] rounded-xl text-xs font-bold transition-all cursor-pointer focus-ring flex items-center ${
                activeProfileId === 'yanis'
                  ? 'bg-[#2868C7] text-white shadow-sm'
                  : 'bg-[#F5F6F3] text-[#172B46] hover:bg-black/5'
              }`}
            >
              {isAr ? 'يانيس (6 سنوات)' : isEn ? 'Yanis (6)' : 'Yanis (6 ans)'}
            </button>

            <button
              type="button"
              aria-pressed={activeProfileId === 'amina'}
              onClick={() => {
                playTactileFeedback('click', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });
                setActiveProfileId('amina');
                setActiveTab('world');
              }}
              className={`px-3.5 py-2 min-h-[48px] rounded-xl text-xs font-bold transition-all cursor-pointer focus-ring flex items-center ${
                activeProfileId === 'amina'
                  ? 'bg-[#2D7A58] text-white shadow-sm'
                  : 'bg-[#F5F6F3] text-[#172B46] hover:bg-black/5'
              }`}
            >
              {isAr ? 'أمينة (4 سنوات)' : isEn ? 'Amina (4)' : 'Amina (4 ans)'}
            </button>

            {customProfile && (
              <button
                type="button"
                aria-pressed={activeProfileId === 'custom'}
                onClick={() => {
                  playTactileFeedback('click', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });
                  setActiveProfileId('custom');
                  setActiveTab('world');
                }}
                className={`px-3.5 py-2 min-h-[48px] rounded-xl text-xs font-bold transition-all cursor-pointer focus-ring flex items-center ${
                  activeProfileId === 'custom'
                    ? 'bg-[#9E4E3D] text-white shadow-sm'
                    : 'bg-[#F5F6F3] text-[#172B46] hover:bg-black/5'
                }`}
              >
                {isAr ? customProfile.nameAr : isEn ? customProfile.nameEn : customProfile.nameFr}
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                playTactileFeedback('click', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });
                setActiveTab('wizard');
              }}
              className="p-3 min-w-[48px] min-h-[48px] rounded-xl bg-[#F5F6F3] text-[#2868C7] hover:bg-[#2868C7]/15 transition-all cursor-pointer focus-ring flex items-center justify-center"
              title={isAr ? 'إضافة طفل جديد' : isEn ? 'Add Child' : 'Ajouter un enfant'}
              aria-label={isAr ? 'إضافة طفل جديد' : isEn ? 'Add Child' : 'Ajouter un enfant'}
            >
              <UserPlus size={16} />
            </button>
          </div>
        </div>

        {/* Tab 1: Child World Interactive View */}
        {activeTab === 'world' && (
          <div className="space-y-8">
            {/* Active World Banner */}
            <div className={`p-4 sm:p-6 rounded-3xl bg-gradient-to-r ${currentThemeConfig.gradientBg} text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D8BE83] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D8BE83]">
                    {isAr ? currentThemeConfig.nameAr : isEn ? currentThemeConfig.nameEn : currentThemeConfig.nameFr}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-black">
                  {isAr ? `عالم ${currentProfile.nameAr} الحسي` : isEn ? `${currentProfile.nameEn}'s Sensory World` : `Monde Sensoriel de ${currentProfile.nameFr}`}
                </h3>
                <p className="text-xs text-[#A9C5D8]">
                  {isAr ? currentThemeConfig.subtitleAr : isEn ? currentThemeConfig.subtitleEn : currentThemeConfig.subtitleFr}
                </p>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold shrink-0">
                <ShieldCheck size={16} className="text-[#D8BE83]" />
                <span>{isAr ? 'فضاء محمي • رقابة الولي' : isEn ? 'Parent Controlled World' : 'Espace Supervisé'}</span>
              </div>
            </div>

            {/* Modular Grid Layout: Keyed on currentProfile.id to guarantee sibling profile isolation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: AAC Communication Board */}
              <div className="lg:col-span-7">
                <AacGrid
                  key={`aac-${currentProfile.id}`}
                  themeConfig={currentThemeConfig}
                  lang={currentLang}
                />
              </div>

              {/* Right Column: Nour 3D Companion, Routine Schedule & Specialist Bridge */}
              <div className="lg:col-span-5 space-y-6">
                <NourCompanionCard
                  key={`companion-${currentProfile.id}`}
                  childName={isAr ? currentProfile.nameAr : isEn ? currentProfile.nameEn : currentProfile.nameFr}
                  theme={currentProfile.theme}
                  lang={currentLang}
                />
                <RoutineTracker
                  key={`routines-${currentProfile.id}`}
                  routines={currentProfile.routines}
                  onToggleRoutine={handleToggleRoutine}
                  lang={currentLang}
                />
                <SpecialistBridge
                  key={`bridge-${currentProfile.id}`}
                  childProfile={currentProfile}
                  lang={currentLang}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Family Hub (Sibling isolation & multi-child management, fully dynamic & localized) */}
        {activeTab === 'hub' && (
          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#172B46]/10 shadow-sm space-y-6 text-start max-w-4xl mx-auto">
            <div className="space-y-2">
              <h3 className="text-xl font-heading font-bold text-[#172B46] flex items-center gap-2">
                <Users size={22} className="text-[#2868C7]" />
                <span>{isAr ? 'فضاء العائلة المحمي (إدارة الإخوة)' : isEn ? 'Protected Family Hub (Sibling Profiles)' : 'Espace Famille Sécurisé (Gestion Fratrie)'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6E85] leading-relaxed">
                {isAr
                  ? 'حساب الولي هو الحساب الوحيد في المنظومة. كل طفل يمتلك ملفاً وعالماً مستقلاً تماماً لحماية الخصوصية وتجنب التداخل.'
                  : isEn
                  ? 'The parent holds the account. Each child profile has an isolated world with independent routines, AAC boards, and specialist access.'
                  : 'Le parent détient le compte. Chaque profil d\'enfant dispose d\'un univers étanche pour garantir la confidentialité.'}
              </p>
            </div>

            {/* Sibling Profile Cards (mapped dynamically) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {allProfilesList.map((p) => {
                const childDisplayName = isAr ? p.nameAr : isEn ? p.nameEn : p.nameFr;
                const themeName = isAr ? THEMES[p.theme].nameAr : isEn ? THEMES[p.theme].nameEn : THEMES[p.theme].nameFr;
                const ageLabel = `${p.age} ${isAr ? 'سنوات' : isEn ? 'years' : 'ans'}`;
                const isSelected = activeProfileId === p.id;
                const borderColor = p.theme === 'space' ? 'border-[#2868C7]/30' : p.theme === 'nature' ? 'border-[#2D7A58]/30' : 'border-[#9E4E3D]/30';
                const tagColor = p.theme === 'space' ? 'bg-[#2868C7]/10 text-[#2868C7]' : p.theme === 'nature' ? 'bg-[#2D7A58]/10 text-[#2D7A58]' : 'bg-[#9E4E3D]/10 text-[#9E4E3D]';
                const btnBg = p.theme === 'space' ? 'bg-[#2868C7] hover:bg-[#1E54A3]' : p.theme === 'nature' ? 'bg-[#2D7A58] hover:bg-[#1E5B40]' : 'bg-[#9E4E3D] hover:bg-[#853E2F]';

                return (
                  <div key={p.id} className={`p-5 rounded-2xl bg-[#F5F6F3] border-2 ${borderColor} space-y-3`}>
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-[#172B46]">
                        {childDisplayName} ({ageLabel})
                      </h4>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${tagColor}`}>
                        {themeName}
                      </span>
                    </div>

                    <p className="text-xs text-[#5B6E85] leading-relaxed">
                      <span>{isAr ? 'الأخصائي:' : isEn ? 'Specialist:' : 'Spécialiste :'} </span>
                      <bdi dir="ltr" className="font-semibold">{p.specialistName}</bdi>
                      <span> • {p.routines.length} {isAr ? 'محطات روتين يومية' : isEn ? 'daily routine steps' : 'étapes de routine'}</span>
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        playTactileFeedback('click', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });
                        setActiveProfileId(p.id as 'yanis' | 'amina' | 'custom');
                        setActiveTab('world');
                      }}
                      className={`w-full py-3 min-h-[48px] rounded-xl ${btnBg} text-white text-xs font-bold transition-all cursor-pointer focus-ring flex items-center justify-center`}
                    >
                      {isAr
                        ? `فتح عالم ${childDisplayName}`
                        : isEn
                        ? `Open ${childDisplayName}'s World`
                        : `Ouvrir le monde de ${childDisplayName}`}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Child World Personalization Wizard */}
        {activeTab === 'wizard' && (
          <ChildWorldWizard onComplete={handleProfileCreated} lang={currentLang} />
        )}
      </div>
    </section>
  );
};
