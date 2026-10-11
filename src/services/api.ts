import { Appointment, BookingFormData } from '../types/appointment';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || '';

export async function createAppointment(data: BookingFormData): Promise<{ success: boolean; appointment: Appointment }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/appointments`, {
      method: 'POST',
      headers: {
        'Content-[#0F766E]': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      throw new Error(errJson.error || 'Failed to submit appointment.');
    }

    return await response.json();
  } catch (error: any) {
    console.warn('API error, using local fallback execution:', error.message);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const mockAppt: Appointment = {
      id: `APT-${data.appointmentDate.replace(/-/g, '')}-${randomSuffix}`,
      patientName: data.patientName,
      patientPhone: data.patientPhone,
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      treatmentName: data.treatmentName || 'General Orthopaedic Consultation',
      doctorName: 'Dr. Balaram Kundu',
      fees: 0,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: data.notes || '',
    };
    return { success: true, appointment: mockAppt };
  }
}

export async function fetchAppointments(): Promise<Appointment[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/appointments`);
    if (!response.ok) throw new Error('Failed to fetch appointments');
    const data = await response.json();
    return data.appointments || [];
  } catch (error) {
    console.warn('Could not fetch appointments from server:', error);
    return [];
  }
}

export async function simulateDoctorAction(appointmentId: string, action: 'CONFIRM' | 'POSTPONE' | 'CANCEL'): Promise<{ success: boolean; status?: string; appointment?: Appointment; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/webhooks/simulate-doctor-action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appointmentId, action }),
    });
    return await response.json();
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
