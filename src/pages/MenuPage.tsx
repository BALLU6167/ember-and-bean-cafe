import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { InteractiveMenuSection } from '../components/menu/InteractiveMenuSection';
import { useLanguage } from '../context/LanguageContext';

interface MenuPageProps {
  onBackToHome: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onBackToHome }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-transparent text-[#FAF6F0]">
      <PageHeader
        badge={t.menuBadge}
        title={t.menuTitle}
        description={t.menuSubtitle}
        onBackToHome={onBackToHome}
        breadcrumbs={[t.navMenu]}
      />

      <InteractiveMenuSection />
    </div>
  );
};
