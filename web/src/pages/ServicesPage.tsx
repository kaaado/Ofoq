import React from 'react';
import { ServicesSection } from '../components/sections/ServicesSection';

interface ServicesPageProps {
  onOpenWaitlist?: (type?: 'family' | 'companion') => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenWaitlist = () => {} }) => {
  return (
    <div className="pt-20">
      <ServicesSection onOpenWaitlist={onOpenWaitlist} />
    </div>
  );
};
