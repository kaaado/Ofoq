import { useState, useEffect } from 'react';

export const OFOQ_SECTION_IDS = [
  'home',
  'experience',
  'ecosystem',
  'about',
  'pillars',
  'safety',
  'professionals',
  'faq',
  'contact',
] as const;

export function useActiveSection(initial = 'home'): [string, (id: string) => void] {
  const [activeSection, setActiveSection] = useState<string>(initial);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    let rafId: number | null = null;

    const updateActive = () => {
      rafId = null;
      const scrollY = window.scrollY + 140;
      let current = OFOQ_SECTION_IDS[0] as string;

      for (let i = 0; i < OFOQ_SECTION_IDS.length; i++) {
        const id = OFOQ_SECTION_IDS[i];
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (scrollY >= top) {
          current = id;
        }
      }

      setActiveSection((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateActive);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateActive();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return [activeSection, setActiveSection];
}
