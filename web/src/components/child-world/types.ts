export type ThemeKey = 'space' | 'nature' | 'ocean' | 'creative';

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

export interface ThemeConfig {
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

export interface RoutineItem {
  id: string;
  iconName: string;
  titleAr: string;
  titleFr: string;
  titleEn: string;
  completed: boolean;
}

export interface ChildProfileData {
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
  routines: RoutineItem[];
}
