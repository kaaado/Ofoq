import React from 'react';
import { useSensoryPreferences } from '../../context/SensoryPreferencesContext';

interface SkeletonProps {
  className?: string;
  label?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = 'h-4 w-full', label }) => {
  const { effectiveReducedMotion } = useSensoryPreferences();
  return (
    <div
      role={label ? 'status' : undefined}
      aria-label={label}
      aria-busy={label ? true : undefined}
      aria-hidden={label ? undefined : true}
      className={`rounded-xl bg-ofoq-cloud/25 border border-ofoq-cloud/20 ${
        effectiveReducedMotion ? '' : 'animate-pulse'
      } ${className}`}
    />
  );
};

export const SkeletonCard: React.FC<{ label?: string }> = ({ label }) => (
  <div
    role={label ? 'status' : undefined}
    aria-label={label}
    aria-busy={label ? true : undefined}
    aria-hidden={label ? undefined : true}
    className="glass-surface-2 rounded-3xl p-6 space-y-4 border border-ofoq-cloud/30"
  >
    <div className="flex items-center gap-3">
      <Skeleton className="w-12 h-12 rounded-2xl shrink-0" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
    <Skeleton className="h-24 w-full rounded-2xl" />
    <div className="flex gap-2">
      <Skeleton className="h-10 flex-1 rounded-xl" />
      <Skeleton className="h-10 flex-1 rounded-xl" />
    </div>
  </div>
);
