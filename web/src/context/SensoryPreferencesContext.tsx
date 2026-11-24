import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { MotionConfig } from 'motion/react';

export type VisualDensity = 'comfortable' | 'spacious';

export interface SensoryPreferences {
  soundEnabled: boolean;
  voiceEnabled: boolean;
  volume: number;          // 0.0 - 1.0
  speechRate: number;      // 0.75 - 1.15
  selectedVoiceURI: string;
  reducedMotion: boolean;
  quietMode: boolean;
  visualDensity: VisualDensity;
}

interface StoredSensoryShape extends Omit<Partial<SensoryPreferences>, 'reducedMotion'> {
  reducedMotionOverride?: boolean | null;
}

const STORAGE_KEY = 'ofoq_sensory_preferences_v1';

const clampVolume = (v: number): number =>
  Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0.85;

const clampSpeechRate = (r: number): number =>
  Number.isFinite(r) ? Math.min(1.15, Math.max(0.75, r)) : 0.92;

const sanitizeVoiceURI = (uri: string): string =>
  typeof uri === 'string' ? uri.slice(0, 256) : '';

const getOsReducedMotion = (): boolean => {
  try {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
};

export const DEFAULT_SENSORY_PREFERENCES: SensoryPreferences = {
  soundEnabled: true,
  voiceEnabled: true,
  volume: 0.85,
  speechRate: 0.92,
  selectedVoiceURI: '',
  reducedMotion: false,
  quietMode: false,
  visualDensity: 'comfortable',
};

interface SensoryPreferencesContextValue {
  preferences: SensoryPreferences;
  effectiveReducedMotion: boolean;
  updatePreference: <K extends keyof SensoryPreferences>(
    key: K,
    value: SensoryPreferences[K]
  ) => void;
  resetPreferences: () => void;
}

const SensoryPreferencesContext = createContext<SensoryPreferencesContextValue | undefined>(
  undefined
);

interface InternalState {
  soundEnabled: boolean;
  voiceEnabled: boolean;
  volume: number;
  speechRate: number;
  selectedVoiceURI: string;
  reducedMotionOverride: boolean | null;
  quietMode: boolean;
  visualDensity: VisualDensity;
}

const loadInitialState = (): InternalState => {
  const defaults: InternalState = {
    soundEnabled: DEFAULT_SENSORY_PREFERENCES.soundEnabled,
    voiceEnabled: DEFAULT_SENSORY_PREFERENCES.voiceEnabled,
    volume: DEFAULT_SENSORY_PREFERENCES.volume,
    speechRate: DEFAULT_SENSORY_PREFERENCES.speechRate,
    selectedVoiceURI: DEFAULT_SENSORY_PREFERENCES.selectedVoiceURI,
    reducedMotionOverride: null,
    quietMode: DEFAULT_SENSORY_PREFERENCES.quietMode,
    visualDensity: DEFAULT_SENSORY_PREFERENCES.visualDensity,
  };

  if (typeof window === 'undefined') return defaults;

  try {
    const storage = window.localStorage;
    if (!storage) return defaults;
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return defaults;

    const parsed = JSON.parse(raw) as StoredSensoryShape;
    return {
      soundEnabled: typeof parsed.soundEnabled === 'boolean' ? parsed.soundEnabled : defaults.soundEnabled,
      voiceEnabled: typeof parsed.voiceEnabled === 'boolean' ? parsed.voiceEnabled : defaults.voiceEnabled,
      volume: typeof parsed.volume === 'number' ? clampVolume(parsed.volume) : defaults.volume,
      speechRate: typeof parsed.speechRate === 'number' ? clampSpeechRate(parsed.speechRate) : defaults.speechRate,
      selectedVoiceURI: typeof parsed.selectedVoiceURI === 'string' ? sanitizeVoiceURI(parsed.selectedVoiceURI) : defaults.selectedVoiceURI,
      reducedMotionOverride: typeof parsed.reducedMotionOverride === 'boolean' ? parsed.reducedMotionOverride : null,
      quietMode: typeof parsed.quietMode === 'boolean' ? parsed.quietMode : defaults.quietMode,
      visualDensity: parsed.visualDensity === 'spacious' ? 'spacious' : 'comfortable',
    };
  } catch {
    return defaults;
  }
};

export const SensoryPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<InternalState>(loadInitialState);
  const [osReducedMotion, setOsReducedMotion] = useState<boolean>(getOsReducedMotion);

  useEffect(() => {
    try {
      if (typeof window === 'undefined' || !window.matchMedia) return;
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const onChange = (e: MediaQueryListEvent) => setOsReducedMotion(e.matches);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    } catch {
      return undefined;
    }
  }, []);

  const resolvedReducedMotion =
    state.reducedMotionOverride !== null ? state.reducedMotionOverride : osReducedMotion;

  const preferences: SensoryPreferences = useMemo(
    () => ({
      soundEnabled: state.soundEnabled,
      voiceEnabled: state.voiceEnabled,
      volume: state.volume,
      speechRate: state.speechRate,
      selectedVoiceURI: state.selectedVoiceURI,
      reducedMotion: resolvedReducedMotion,
      quietMode: state.quietMode,
      visualDensity: state.visualDensity,
    }),
    [state, resolvedReducedMotion]
  );

  const effectiveReducedMotion = resolvedReducedMotion || state.quietMode;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.reducedMotion = String(effectiveReducedMotion);
      document.documentElement.dataset.quietMode = String(state.quietMode);
      document.documentElement.dataset.density = state.visualDensity;
    }
    try {
      if (typeof window !== 'undefined') {
        const storage = window.localStorage;
        if (storage) {
          const toStore: StoredSensoryShape = {
            soundEnabled: state.soundEnabled,
            voiceEnabled: state.voiceEnabled,
            volume: state.volume,
            speechRate: state.speechRate,
            selectedVoiceURI: state.selectedVoiceURI,
            reducedMotionOverride: state.reducedMotionOverride,
            quietMode: state.quietMode,
            visualDensity: state.visualDensity,
          };
          storage.setItem(STORAGE_KEY, JSON.stringify(toStore));
        }
      }
    } catch {
      // Safe fallback when storage is blocked
    }
  }, [state, effectiveReducedMotion]);

  const updatePreference = useCallback(
    <K extends keyof SensoryPreferences>(key: K, value: SensoryPreferences[K]) => {
      setState((prev) => {
        if (key === 'reducedMotion') {
          return { ...prev, reducedMotionOverride: Boolean(value) };
        }
        if (key === 'volume') {
          return { ...prev, volume: clampVolume(Number(value)) };
        }
        if (key === 'speechRate') {
          return { ...prev, speechRate: clampSpeechRate(Number(value)) };
        }
        if (key === 'selectedVoiceURI') {
          return { ...prev, selectedVoiceURI: sanitizeVoiceURI(String(value)) };
        }
        if (key === 'visualDensity') {
          return { ...prev, visualDensity: value === 'spacious' ? 'spacious' : 'comfortable' };
        }
        return { ...prev, [key]: value };
      });
    },
    []
  );

  const resetPreferences = useCallback(() => {
    setState({
      soundEnabled: DEFAULT_SENSORY_PREFERENCES.soundEnabled,
      voiceEnabled: DEFAULT_SENSORY_PREFERENCES.voiceEnabled,
      volume: DEFAULT_SENSORY_PREFERENCES.volume,
      speechRate: DEFAULT_SENSORY_PREFERENCES.speechRate,
      selectedVoiceURI: DEFAULT_SENSORY_PREFERENCES.selectedVoiceURI,
      reducedMotionOverride: null,
      quietMode: DEFAULT_SENSORY_PREFERENCES.quietMode,
      visualDensity: DEFAULT_SENSORY_PREFERENCES.visualDensity,
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      preferences,
      effectiveReducedMotion,
      updatePreference,
      resetPreferences,
    }),
    [preferences, effectiveReducedMotion, updatePreference, resetPreferences]
  );

  return (
    <SensoryPreferencesContext.Provider value={contextValue}>
      <MotionConfig reducedMotion={effectiveReducedMotion ? 'always' : 'user'}>
        {children}
      </MotionConfig>
    </SensoryPreferencesContext.Provider>
  );
};

export const useSensoryPreferences = (): SensoryPreferencesContextValue => {
  const ctx = useContext(SensoryPreferencesContext);
  if (!ctx) {
    return {
      preferences: { ...DEFAULT_SENSORY_PREFERENCES, reducedMotion: getOsReducedMotion() },
      effectiveReducedMotion: getOsReducedMotion(),
      updatePreference: () => {},
      resetPreferences: () => {},
    };
  }
  return ctx;
};
