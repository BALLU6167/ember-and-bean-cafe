import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { ReservationSection } from '../components/reservation/ReservationSection';

interface ReservationsPageProps {
  onBackToHome: () => void;
}

export const ReservationsPage: React.FC<ReservationsPageProps> = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen bg-[#140C08] text-[#F5EDE0]">
      <PageHeader
        badge="Spatial Floor Plan Booking"
        title="Reserve Your Table & Seat Zone"
        description="Select your preferred spot on our architectural floor plan: whether by the sunlit floor-to-ceiling glass, the dedicated remote power bar, or the quiet vinyl listening corner."
        onBackToHome={onBackToHome}
        breadcrumbs={['Table Reservation']}
      />

      <ReservationSection />
    </div>
  );
};
