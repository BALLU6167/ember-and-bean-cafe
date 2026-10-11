import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, MapPin, ExternalLink } from 'lucide-react';
import { createAppointment } from '../services/api';
import { Appointment, BookingFormData } from '../types/appointment';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const TREATMENTS = [
  'General Orthopaedic Consultation',
  'Joint Pain Evaluation (Knee / Hip / Shoulder)',
  'Fracture / Acute Trauma Care',
  'Spine & Back Pain Relief',
  'Arthritis & Rheumatology Review',
  'General Medical Consultation',
];

const TIME_SLOTS = [
  '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM'
];

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, preselectedService }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);

  // Form state
  const [formData, setFormData] = useState<BookingFormData>({
    patientName: '',
    patientPhone: '',
    appointmentDate: new Date().toISOString().split('T')[0],
    appointmentTime: '10:00 AM',
    treatmentName: preselectedService || TREATMENTS[0],
    notes: '',
  });

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, treatmentName: preselectedService }));
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const handleNext = () => {
    setError(null);
    if (step === 1 && !formData.treatmentName) {
      setError('Please select a consultation care area.');
      return;
    }
    if (step === 2 && !formData.appointmentDate) {
      setError('Please select an appointment date.');
      return;
    }
    if (step === 3 && !formData.appointmentTime) {
      setError('Please select a time slot.');
      return;
    }
    if (step === 4) {
      if (!formData.patientName.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (!formData.patientPhone.trim() || formData.patientPhone.trim().length < 10) {
        setError('Please enter a valid 10-digit mobile number.');
        return;
      }
      submitBooking();
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setError(null);
    if (step > 1 && step < 5) {
      setStep(step - 1);
    }
  };

  const submitBooking = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await createAppointment(formData);
      if (res.success && res.appointment) {
        setCreatedAppointment(res.appointment);
        setStep(5);
      } else {
        setError('Failed to book appointment. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  const generateIcsCalendarFile = () => {
    if (!createdAppointment) return;
    const title = `Appointment: Dr. Balaram Kundu - Latha Venkat Ortho`;
    const details = `Doctor: Dr. Balaram Kundu\\nClinic: Latha Venkat Ortho & General Care, M.G. Road Warangal\\nPhone: +91 7075170950\\nAppt ID: ${createdAppointment.id}`;
    const location = `Latha Venkat Ortho & General Care, M.G. Road, Warangal`;

    const icsContent = 
      `BEGIN:VCALENDAR\n` +
      `VERSION:2.0\n` +
      `PRODID:-//Latha Venkat Ortho Care//NONSGML v1.0//EN\n` +
      `BEGIN:VEVENT\n` +
      `SUMMARY:${title}\n` +
      `DESCRIPTION:${details}\n` +
      `LOCATION:${location}\n` +
      `STATUS:CONFIRMED\n` +
      `END:VEVENT\n` +
      `END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Appointment-${createdAppointment.id}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white max-w-xl w-full rounded-3xl shadow-modal border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-slate-200/80 flex items-center justify-between bg-[#F8FAFC]">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0F766E]">
              ZERO PRE-PAYMENT BOOKING
            </span>
            <h3 className="font-serif text-xl font-bold text-[#0F172A]">
              Book Appointment with Dr. Balaram Kundu
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200/60 text-slate-500 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        {step < 5 && (
          <div className="px-6 sm:px-8 py-3 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 font-medium">
            <span>Step {step} of 4</span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`w-6 h-1.5 rounded-full transition-all ${
                    s === step ? 'bg-[#0F766E] w-8' : s < step ? 'bg-slate-700' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: Reason for visit */}
          {step === 1 && (
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-900">
                01 — Select Reason for Visit / Care Area:
              </label>
              <div className="space-y-2.5">
                {TREATMENTS.map((treatment) => (
                  <button
                    key={treatment}
                    type="button"
                    onClick={() => setFormData({ ...formData, treatmentName: treatment })}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                      formData.treatmentName === treatment
                        ? 'bg-teal-50/80 border-[#0F766E] text-[#0F766E] shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{treatment}</span>
                      {formData.treatmentName === treatment && (
                        <CheckCircle2 className="w-4 h-4 text-[#0F766E]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Date Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-900">
                02 — Select Preferred Appointment Date:
              </label>
              <div className="relative">
                <Calendar className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.appointmentDate}
                  onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E] text-slate-800 text-sm font-medium"
                />
              </div>
              <p className="text-xs text-slate-500">
                Clinic Operating Days: Monday to Saturday (9:30 AM - 9:00 PM), Sunday (10:00 AM - 2:00 PM).
              </p>
            </div>
          )}

          {/* STEP 3: Time Slot */}
          {step === 3 && (
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-900">
                03 — Select Consultation Time Slot:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setFormData({ ...formData, appointmentTime: slot })}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                      formData.appointmentTime === slot
                        ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Patient Details */}
          {step === 4 && (
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-900">
                04 — Enter Patient Details:
              </label>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Patient Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Reddy"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E] text-slate-800 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Mobile / WhatsApp Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      placeholder="e.g. +91 9876543210"
                      value={formData.patientPhone}
                      onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E] text-slate-800 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Specific Symptoms / Notes (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Describe joint pain duration or specific questions..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F766E] text-slate-800 text-sm"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-800 space-y-1">
                <span className="font-semibold block">Zero Pre-Payment Guarantee</span>
                <p>No fee is collected on this website. Consultation is registered directly with Dr. Balaram Kundu.</p>
              </div>
            </div>
          )}

          {/* STEP 5: Confirmation Screen */}
          {step === 5 && createdAppointment && (
            <div className="text-center space-y-6 py-2">
              <div className="w-16 h-16 rounded-full bg-teal-100 text-[#0F766E] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#0F766E] uppercase tracking-widest">
                  APPOINTMENT CONFIRMATION REQUEST GENERATED
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#0F172A]">
                  Your Visit is Registered
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Notification sent to <strong className="text-slate-900">Dr. Balaram Kundu</strong> (+91 7075170950). You will receive an automated WhatsApp response.
                </p>
              </div>

              {/* Appointment Summary Card */}
              <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-200 text-left space-y-3 text-xs text-slate-700">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-medium text-slate-500">Appointment ID:</span>
                  <span className="font-mono font-bold text-slate-900">{createdAppointment.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">Doctor:</span>
                  <span className="font-semibold text-slate-900">Dr. Balaram Kundu</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">Care Area:</span>
                  <span className="font-semibold text-slate-900">{createdAppointment.treatmentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">Scheduled Date & Time:</span>
                  <span className="font-semibold text-slate-900">{createdAppointment.appointmentDate} at {createdAppointment.appointmentTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">Clinic Address:</span>
                  <span className="font-semibold text-slate-900">M.G. Road, Warangal</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <button
                  onClick={generateIcsCalendarFile}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-300 text-slate-800 text-xs font-semibold hover:bg-slate-100 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-[#0F766E]" />
                  <span>Add to Calendar</span>
                </button>

                <a
                  href="tel:+917075170950"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-300 text-slate-800 text-xs font-semibold hover:bg-slate-100 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#0F766E]" />
                  <span>Call Clinic</span>
                </a>

                <a
                  href="https://maps.app.goo.gl/GjZibaRiCGzcVBgh7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0F172A] text-white text-xs font-semibold hover:bg-[#0F766E] transition-colors"
                >
                  <MapPin className="w-4 h-4 text-teal-400" />
                  <span>Directions</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        {step < 5 && (
          <div className="px-6 sm:px-8 py-4 border-t border-slate-200/80 bg-[#F8FAFC] flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <span className="text-xs text-slate-500">Zero Pre-Payment</span>
            )}

            <button
              onClick={handleNext}
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F172A] text-white text-xs font-semibold hover:bg-[#0F766E] transition-colors disabled:opacity-50"
            >
              {loading ? (
                <span>Saving...</span>
              ) : step === 4 ? (
                <span>Confirm & Submit Booking</span>
              ) : (
                <>
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
