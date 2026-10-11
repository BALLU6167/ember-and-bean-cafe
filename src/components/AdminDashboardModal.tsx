import React, { useState, useEffect } from 'react';
import { X, RefreshCw, CheckCircle2, Clock, XCircle, AlertTriangle, Phone, Calendar, Send, Shield } from 'lucide-react';
import { fetchAppointments, simulateDoctorAction } from '../services/api';
import { Appointment } from '../types/appointment';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAppointments();
      setAppointments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSimulateAction = async (appointmentId: string, action: 'CONFIRM' | 'POSTPONE' | 'CANCEL') => {
    setActionMessage(null);
    const res = await simulateDoctorAction(appointmentId, action);
    if (res.success) {
      setActionMessage(`Action [${action}] applied successfully for ${appointmentId}.`);
      loadData();
    } else {
      setActionMessage(`Error: ${res.error || 'Failed to update action.'}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            CONFIRMED
          </span>
        );
      case 'POSTPONEMENT_REQUESTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            POSTPONE REQUESTED
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            CANCELLED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-300 animate-pulse">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
            PENDING DOCTOR ACTION
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white max-w-5xl w-full rounded-3xl shadow-modal border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-8 py-5 bg-[#0F172A] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold">Doctor & Clinic Admin Portal</h3>
              <p className="text-xs text-slate-400">Dr. Balaram Kundu • WhatsApp Webhook & SQLite Database Monitor</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Banner Info */}
        <div className="px-8 py-3 bg-teal-50 border-b border-teal-100 text-xs text-teal-900 flex items-center justify-between">
          <span>Configured WhatsApp Destination: <strong>+91 7075170950</strong></span>
          <span className="font-mono">SQLite DB Path: ./clinic.db</span>
        </div>

        {/* Notifications */}
        {actionMessage && (
          <div className="mx-8 mt-4 p-3 rounded-xl bg-slate-900 text-teal-300 text-xs font-mono flex items-center justify-between">
            <span>{actionMessage}</span>
            <button onClick={() => setActionMessage(null)} className="text-slate-400 hover:text-white">✕</button>
          </div>
        )}

        {/* Main Content Table */}
        <div className="p-8 overflow-y-auto flex-1">
          {appointments.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="font-serif text-lg font-semibold text-slate-800">No Appointments Recorded Yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Submit an appointment from the main website booking modal to test the full SQLite and WhatsApp workflow.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Appointment ID</th>
                    <th className="py-3 px-4">Patient Name</th>
                    <th className="py-3 px-4">Patient Phone</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Care Area</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Simulate WhatsApp Doctor Button</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.map((appt) => (
                    <tr key={appt.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-slate-900">{appt.id}</td>
                      <td className="py-4 px-4 font-semibold text-slate-800">{appt.patientName}</td>
                      <td className="py-4 px-4 text-slate-600">
                        <a href={`tel:${appt.patientPhone}`} className="hover:underline flex items-center gap-1">
                          <Phone className="w-3 h-3 text-[#0F766E]" />
                          <span>{appt.patientPhone}</span>
                        </a>
                      </td>
                      <td className="py-4 px-4 text-slate-700">
                        {appt.appointmentDate} <br />
                        <span className="text-slate-400">{appt.appointmentTime}</span>
                      </td>
                      <td className="py-4 px-4 text-slate-700">{appt.treatmentName}</td>
                      <td className="py-4 px-4">{getStatusBadge(appt.status)}</td>
                      <td className="py-4 px-4 text-right space-x-1.5">
                        <button
                          onClick={() => handleSimulateAction(appt.id, 'CONFIRM')}
                          disabled={appt.status === 'CONFIRMED'}
                          className="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors disabled:opacity-40"
                          title="Doctor clicks CONFIRM in WhatsApp"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleSimulateAction(appt.id, 'POSTPONE')}
                          className="px-2.5 py-1 rounded-md bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors"
                          title="Doctor clicks POSTPONE in WhatsApp"
                        >
                          Postpone
                        </button>
                        <button
                          onClick={() => handleSimulateAction(appt.id, 'CANCEL')}
                          className="px-2.5 py-1 rounded-md bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors"
                          title="Doctor clicks CANCEL in WhatsApp"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="px-8 py-4 bg-[#F8FAFC] border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Official Meta WhatsApp Cloud API Webhook Handler Configured</span>
          <span>Zero Pre-Payment Active</span>
        </div>

      </div>
    </div>
  );
};
