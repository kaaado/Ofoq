import React from 'react';
import { CompanionRecruitmentSection } from '../components/sections/CompanionRecruitmentSection';

interface BecomeCompanionPageProps {
  onOpenWaitlist?: (type?: 'family' | 'companion') => void;
}

export const BecomeCompanionPage: React.FC<BecomeCompanionPageProps> = ({ onOpenWaitlist = () => {} }) => {
  return (
    <div className="pt-20">
      <CompanionRecruitmentSection onOpenWaitlist={onOpenWaitlist} />
    </div>
  );
};
