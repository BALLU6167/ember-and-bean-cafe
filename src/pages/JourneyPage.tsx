import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { CoffeeJourneySection } from '../components/journey/CoffeeJourneySection';

interface JourneyPageProps {
  onBackToHome: () => void;
}

export const JourneyPage: React.FC<JourneyPageProps> = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen bg-[#170E0A] text-[#F5EDE0]">
      <PageHeader
        badge="Terroir & Soil Transparency"
        title="The Single-Origin Bean Journey"
        description="From the mist-veiled canopies of Araku Valley to the ancient estates of Chikmagalur and our 12kg Jubilee Hills roastery. Trace every cup to its soil."
        onBackToHome={onBackToHome}
        breadcrumbs={['Bean Journey']}
      />

      <CoffeeJourneySection />
    </div>
  );
};
