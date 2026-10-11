import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Clock, CreditCard, Car, Users, CalendarX } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How do I book an appointment with Dr. Balaram Kundu?',
    answer: 'You can book an appointment directly through our website by selecting your preferred date and time slot. No pre-payment is required. Once submitted, your appointment request is forwarded to Dr. Balaram Kundu and our WhatsApp notification system generates an automated confirmation.',
  },
  {
    question: 'Where is Latha Venkat Ortho & General Care located in Warangal?',
    answer: 'The clinic is centrally located on M.G. Road, Warangal, Telangana. You can easily find us on Google Maps using our official location link.',
  },
  {
    question: 'What documents or items should I bring for my first consultation?',
    answer: 'Please bring any previous X-rays, MRI scans, medical prescription records, previous discharge summaries, and a valid photo ID.',
  },
  {
    question: 'What are the clinic opening hours?',
    answer: 'Our clinic operates Monday through Saturday from 9:30 AM to 9:00 PM, and on Sundays from 10:00 AM to 2:00 PM.',
  },
  {
    question: 'How long does a typical orthopaedic consultation take?',
    answer: 'Initial consultations typically last 20 to 30 minutes. This includes physical mobility testing, X-ray review, and detailed discussion of non-surgical or conservative management options.',
  },
  {
    question: 'How do I reschedule or cancel an appointment?',
    answer: 'You can call our direct clinic desk at +91 7075170950 or reply to your WhatsApp appointment message.',
  },
  {
    question: 'Is parking available near the clinic on M.G. Road?',
    answer: 'Yes, convenient two-wheeler and four-wheeler patient parking is available directly adjacent to the clinic premises on M.G. Road.',
  },
];

export const PatientInfoFAQ: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid layout: Left Patient Info, Right FAQ Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left: Before Your Visit Checklist */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#0F766E]">
                PATIENT PREPARATION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#0F172A]">
                Before Your Visit
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Essential guidelines to ensure a smooth consultation with Dr. Balaram Kundu.
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <FileText className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">What to Bring</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Previous X-rays, MRI/CT scans, current prescription medicines, and relevant medical history reports.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">Arrival Time</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Please arrive 10 minutes prior to your scheduled time slot to facilitate brief registration at reception.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <Car className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">Parking & Access</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Dedicated patient parking space on M.G. Road. Ground floor easy wheelchair accessibility.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <Users className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">Accompanying Family</h4>
                  <p className="text-slate-600 leading-relaxed">
                    One family member or caregiver is welcome to accompany elderly patients during consultation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Accessible FAQ Accordion */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#0F766E]">
                COMMON QUESTIONS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#0F172A]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-subtle"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif text-lg font-medium text-[#0F172A] hover:text-[#0F766E] transition-colors"
                  >
                    <span>{faq.question}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-5 h-5 text-[#0F766E] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {openFaq === idx && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
