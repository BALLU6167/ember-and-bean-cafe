export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'POSTPONEMENT_REQUESTED' | 'CANCELLED';

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  appointmentDate: string;
  appointmentTime: string;
  treatmentName: string;
  doctorName: string;
  fees: number;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
  doctorAction?: 'CONFIRM' | 'POSTPONE' | 'CANCEL';
  doctorActionAt?: string;
  confirmationSentAt?: string;
  notes?: string;
}

export interface BookingFormData {
  patientName: string;
  patientPhone: string;
  appointmentDate: string;
  appointmentTime: string;
  treatmentName: string;
  notes?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  patientConcerns: string[];
  duration: string;
  iconName: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  avatarBg: string;
}
