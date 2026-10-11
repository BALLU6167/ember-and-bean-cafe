import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { EventsCalendarSection } from '../components/events/EventsCalendarSection';

interface EventsPageProps {
  onBackToHome: () => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen bg-[#170E0A] text-[#F5EDE0]">
      <PageHeader
        badge="Community & Vinyl Culture"
        title="Live Acoustics, Jazz & Cuppings"
        description="Experience the warmth of our Jubilee Hills roastery hall after sunset. Friday evening acoustic sessions, weekend SCA blind tastings, and barista community throwdowns."
        onBackToHome={onBackToHome}
        breadcrumbs={['Events Calendar']}
      />

      <EventsCalendarSection />
    </div>
  );
};
