import React, { useState, useEffect } from 'react';
import {
  Stethoscope,
  Volume2,
  VolumeX,
  ShieldCheck,
  Check,
  Calendar,
  Heart
} from 'lucide-react';
import { ChildProfileData } from './types';
import { playTactileFeedback, speakHumanVoice, cancelSpeech } from '../../services/audioService';
import { useSensoryPreferences } from '../../context/SensoryPreferencesContext';

interface SpecialistBridgeProps {
  childProfile: ChildProfileData;
  lang: 'ar' | 'fr' | 'en';
}

export const SpecialistBridge: React.FC<SpecialistBridgeProps> = ({
  childProfile,
  lang,
}) => {
  const { preferences } = useSensoryPreferences();
  const isAr = lang === 'ar';
  const isEn = lang === 'en';

  const [isPlayingGuidance, setIsPlayingGuidance] = useState<boolean>(false);
  const [homePracticeLogged, setHomePracticeLogged] = useState<boolean>(false);

  // Safety speech cleanup on unmount
  useEffect(() => {
    return () => {
      cancelSpeech();
    };
  }, []);

  const specialistRole = isAr
    ? childProfile.specialistRoleAr
    : isEn
    ? childProfile.specialistRoleEn
    : childProfile.specialistRoleFr;

  const speechGoal = isAr
    ? childProfile.speechGoalAr
    : isEn
    ? childProfile.speechGoalEn
    : childProfile.speechGoalFr;

  const handleToggleGuidanceAudio = () => {
    if (isPlayingGuidance) {
      cancelSpeech();
      setIsPlayingGuidance(false);
      return;
    }

    setIsPlayingGuidance(true);
    playTactileFeedback('chime', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });

    const guidanceSpokenText = isAr
      ? `تَوْجِيهْ الدُّكْتُورْ ${childProfile.specialistName}: الْيَوْمْ فِي الدَّارْ، نْوَلْفُو ${childProfile.nameAr} يَرْبُطْ بَيْنَ بِطَاقَة الْمَاءْ وَحَبِّيتْ نَشْرَبْ كِي يَعْطَشْ، وَنْشَجَّعُوهْ يَوَرِّي بْيَدُّو وَيَهْدَرْ بِالْعَقْلْ وَبْلَا ضَغْطْ.`
      : isEn
      ? `Guidance from ${childProfile.specialistName}: Practice combining cards at home with ${childProfile.nameEn} taking time with zero pressure.`
      : `Consigne du ${childProfile.specialistName} : Encourageons ${childProfile.nameFr} à la maison à associer le geste et la parole pour exprimer ses besoins en douceur, sans pression.`;

    speakHumanVoice({
      text: guidanceSpokenText,
      lang,
      rate: preferences.speechRate,
      volume: preferences.volume,
      voiceURI: preferences.selectedVoiceURI,
      voiceEnabled: preferences.voiceEnabled,
      onStart: () => setIsPlayingGuidance(true),
      onEnd: () => setIsPlayingGuidance(false),
    });
  };

  const handleTogglePractice = () => {
    const nextState = !homePracticeLogged;
    setHomePracticeLogged(nextState);
    if (nextState) {
      playTactileFeedback('celebrate', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });
    } else {
      playTactileFeedback('uncheck', { volume: preferences.volume, soundEnabled: preferences.soundEnabled });
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#172B46]/10 shadow-sm space-y-5 text-start">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#2868C7]/10 text-[#2868C7] flex items-center justify-center font-bold">
            <Stethoscope size={18} />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#172B46]">
              {isAr ? 'جسر العيادة والمنزل (موافقة الولي)' : isEn ? 'Clinic-to-Home Bridge' : 'Continuité Cabinet & Domicile'}
            </h3>
            <p className="text-[11px] text-[#5B6E85]">
              <bdi dir="ltr">{childProfile.specialistName}</bdi> • {specialistRole}
            </p>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5F0] text-[#2D7A58] text-[11px] font-bold border border-[#2D7A58]/20 shrink-0">
          <ShieldCheck size={13} />
          <span>{isAr ? 'وصول مُصرّح به' : isEn ? 'Parent Authorized' : 'Accès Autorisé'}</span>
        </div>
      </div>

      {/* Specialist Goal Box */}
      <div className="p-4 rounded-2xl bg-[#F5F6F3] border border-[#172B46]/[0.08] space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#2868C7]">
          {isAr ? 'الهدف الأرطفوني الحالي' : isEn ? 'Current Speech Goal' : 'Objectif Orthophonique en cours'}
        </span>
        <p className="text-xs sm:text-sm font-semibold text-[#172B46] leading-relaxed">
          {speechGoal}
        </p>

        {/* Audio guidance button (>= 48px touch target) */}
        <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
          <button
            type="button"
            onClick={handleToggleGuidanceAudio}
            aria-pressed={isPlayingGuidance}
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[48px] rounded-xl bg-white border border-[#2868C7]/30 text-xs font-bold text-[#2868C7] hover:bg-[#2868C7]/10 transition-all cursor-pointer focus-ring"
          >
            {isPlayingGuidance ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span>
              {isPlayingGuidance
                ? isAr ? 'إيقاف التوجيه الصوتي' : isEn ? 'Stop voice guidance' : 'Arrêter le guidage'
                : isAr ? 'سماع توجيه الأخصائي' : isEn ? 'Listen to guidance' : 'Écouter la consigne'}
            </span>
          </button>

          <span className="text-[11px] text-[#5B6E85] flex items-center gap-1">
            <Calendar size={12} />
            <span>{isAr ? 'آخر جلسة: أمس' : isEn ? 'Last session: Yesterday' : 'Dernière séance : Hier'}</span>
          </span>
        </div>
      </div>

      {/* Practice Log Confirmation (>= 48px touch target) */}
      <div className="pt-1 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleTogglePractice}
          aria-pressed={homePracticeLogged}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer focus-ring ${
            homePracticeLogged
              ? 'bg-[#EBF5F0] border-2 border-[#2D7A58] text-[#2D7A58]'
              : 'bg-[#172B46] text-white hover:bg-[#1C3556]'
          }`}
        >
          {homePracticeLogged ? <Check size={16} /> : <Heart size={16} className="text-[#D8BE83]" />}
          <span>
            {homePracticeLogged
              ? isAr ? 'تم تسجيل تدريب اليوم في البيت ✓' : isEn ? 'Practice logged for today ✓' : 'Exercice du jour validé ✓'
              : isAr ? 'تأكيد إنجاز التدريب المنزلي' : isEn ? 'Confirm Home Practice' : 'Confirmer l\'exercice du jour'}
          </span>
        </button>
      </div>

      {/* Non-Diagnostic Clinical Boundary Notice */}
      <p className="text-[10px] sm:text-[11px] text-[#5B6E85] leading-relaxed border-t border-[#172B46]/[0.08] pt-3">
        {isAr
          ? 'تنبيه: أفق منظومة تقنية لدعم التواصل والتنسيق بين العائلة والأخصائي، وليست بديلاً عن التقييم الطبي أو التشخيص السريري.'
          : isEn
          ? 'Notice: OFOQ is a communicative support platform for families and specialists, not a medical diagnostic substitute.'
          : 'Note : OFOQ est une plateforme d\'accompagnement et de continuité, sans visée diagnostique médicale.'}
      </p>
    </div>
  );
};
