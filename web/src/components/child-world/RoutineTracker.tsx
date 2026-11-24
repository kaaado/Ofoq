import React from 'react';
import {
  CheckCircle2,
  Trophy,
  Sunrise,
  Bot,
  Layers,
  Boxes,
  Sun,
  Utensils,
  Wind,
  BookOpen
} from 'lucide-react';
import { RoutineItem } from './types';

interface RoutineTrackerProps {
  routines: RoutineItem[];
  onToggleRoutine: (routineId: string) => void;
  lang: 'ar' | 'fr' | 'en';
}

const renderRoutineIcon = (iconName: string, className = 'w-4 h-4') => {
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

export const RoutineTracker: React.FC<RoutineTrackerProps> = ({
  routines,
  onToggleRoutine,
  lang,
}) => {
  const isAr = lang === 'ar';
  const isEn = lang === 'en';

  const completedCount = routines.filter((r) => r.completed).length;
  const progressPercent = Math.round((completedCount / routines.length) * 100) || 0;

  const handleToggle = (routine: RoutineItem) => {
    onToggleRoutine(routine.id);
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#172B46]/10 shadow-sm space-y-5 text-start">
      {/* Header & Progress Bar */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#2868C7]/10 text-[#2868C7] flex items-center justify-center font-bold">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#172B46]">
                {isAr ? 'روتين اليوم والمحطات البصرية' : isEn ? 'Daily Visual Schedule' : 'Routines & Repères Visuels'}
              </h3>
              <p className="text-[11px] text-[#5B6E85]">
                {isAr ? 'محطات واضحة لتنظيم اليوم بدون توتر' : isEn ? 'Predictable daily rhythm without stress' : 'Étapes prévisibles et apaisantes'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D8BE83]/15 text-[#806936] text-xs font-bold shrink-0">
            <Trophy size={14} className="text-[#806936]" />
            <span>{progressPercent}%</span>
          </div>
        </div>

        {/* Progress track with semantic WAI-ARIA role */}
        <div
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={isAr ? 'نسبة إنجاز الروتين اليومي' : isEn ? 'Daily routine completion percentage' : 'Progression de la routine journalière'}
          className="w-full h-2.5 bg-[#F5F6F3] rounded-full overflow-hidden border border-[#172B46]/[0.08]"
        >
          <div
            className="h-full bg-gradient-to-r from-[#2868C7] to-[#2D7A58] transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Routine Checkboxes */}
      <div
        role="group"
        aria-label={isAr ? 'قائمة محطات الروتين اليومي' : isEn ? 'Daily routine checklist' : 'Liste des routines journalières'}
        className="space-y-2.5"
      >
        {routines.map((routine) => {
          const title = isAr ? routine.titleAr : isEn ? routine.titleEn : routine.titleFr;
          return (
            <button
              key={routine.id}
              type="button"
              role="checkbox"
              aria-checked={routine.completed}
              onClick={() => handleToggle(routine)}
              className={`w-full flex items-center justify-between p-3.5 min-h-[52px] rounded-2xl border transition-all text-start cursor-pointer focus-ring ${
                routine.completed
                  ? 'bg-[#EBF5F0] border-[#2D7A58]/30 text-[#172B46]'
                  : 'bg-[#F5F6F3] border-[#172B46]/[0.08] hover:border-[#2868C7]/30 text-[#172B46]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    routine.completed
                      ? 'bg-[#2D7A58] text-white'
                      : 'bg-white border border-[#172B46]/10 text-[#5B6E85]'
                  }`}
                >
                  {renderRoutineIcon(routine.iconName, 'w-4 h-4')}
                </div>
                <span
                  className={`text-xs sm:text-sm font-semibold ${
                    routine.completed ? 'line-through text-[#2D7A58]' : 'text-[#172B46]'
                  }`}
                >
                  {title}
                </span>
              </div>

              {/* Status checkbox indicator */}
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                  routine.completed
                    ? 'bg-[#2D7A58] border-[#2D7A58] text-white'
                    : 'border-[#172B46]/30 bg-white'
                }`}
              >
                {routine.completed && <CheckCircle2 size={13} />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
