import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { AboutStorySection } from '../components/story/AboutStorySection';
import { SustainabilityTrackerSection } from '../components/sustainability/SustainabilityTrackerSection';
import { useLanguage } from '../context/LanguageContext';

interface StoryPageProps {
  onBackToHome: () => void;
  onOpenGallery: () => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({ onBackToHome, onOpenGallery }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-transparent text-[#FAF6F0]">
      <PageHeader
        badge={t.storyBadge}
        title={t.storyTitle}
        description={t.storySubtitle}
        onBackToHome={onBackToHome}
        breadcrumbs={[t.navStory]}
      />

      <AboutStorySection onOpenGallery={onOpenGallery} />
      <SustainabilityTrackerSection />
    </div>
  );
};
