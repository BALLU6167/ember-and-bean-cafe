import React, { useState } from 'react';
import { CalendarCheck, MapPin, Stethoscope, HeartPulse, ArrowRight } from 'lucide-react';

interface SignatureJourneyProps {
  onOpenBooking: () => void;
}

export const SignatureJourney: React.FC<SignatureJourneyProps> = ({ onOpenBooking }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'BOOK',
      subtitle: 'Seamless Slot Selection',
      desc: 'Select your preferred date and time on our website without any upfront payment. Instant confirmation request generated.',
      icon: <CalendarCheck className="w-6 h-6 text-teal-400" />,
      bgGradient: 'from-slate-900 to-slate-800',
    },
    {
      num: '02',
      title: 'ARRIVE',
      subtitle: 'M.G. Road Warangal Clinic',
      desc: 'Arrive at Latha Venkat Ortho & General Care 10 minutes prior to your slot. Convenient reception & patient seating.',
      icon: <MapPin className="w-6 h-6 text-teal-400" />,
      bgGradient: 'from-slate-900 via-teal-950 to-slate-900',
    },
    {
      num: '03',
      title: 'CONSULT',
      subtitle: 'Dr. Balaram Kundu Evaluation',
      desc: 'Comprehensive clinical evaluation, movement test, X-ray review, and dedicated time to address all joint or general health concerns.',
      icon: <Stethoscope className="w-6 h-6 text-teal-400" />,
      bgGradient: 'from-slate-900 via-slate-800 to-slate-900',
    },
    {
      num: '04',
      title: 'FOLLOW UP',
      subtitle: 'Personalized Recovery',
      desc: 'Clear non-surgical care plan, exercise recommendations, prescription guidance, and WhatsApp follow-up assistance.',
      icon: <HeartPulse className="w-6 h-6 text-teal-400" />,
      bgGradient: 'from-teal-950 to-slate-900',
    },
  ];

  return (
    <section id="journey" className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-400">
            SIGNATURE PATIENT EXPERIENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
            Your Visit, Made Simple
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Designed for clarity, zero friction, and maximum clinical comfort at every step of your consultation.
          </p>
        </div>

        {/* 4 Step Interactive Timeline Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Step Selector Column */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-2xl cursor-pointer border transition-all duration-300 ${
                  activeStep === idx
                    ? 'bg-slate-800/90 border-teal-500/50 shadow-lg scale-[1.02]'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-2xl font-bold text-teal-400">{step.num}</span>
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-white">{step.title}</h4>
                      <p className="text-xs text-slate-400">{step.subtitle}</p>
                    </div>
                  </div>
                  <div className={`p-2 rounded-xl ${activeStep === idx ? 'bg-teal-500/20' : 'bg-slate-800'}`}>
                    {step.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Step Display Card Column */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 border border-slate-800 p-8 sm:p-12 rounded-3xl space-y-8 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                <span className="text-xs font-mono tracking-widest text-teal-400 uppercase">
                  PHASE {steps[activeStep].num} OF 04
                </span>
                <span className="text-xs text-slate-400">Zero Upfront Pre-Payment</span>
              </div>

              <div className="space-y-4">
                <div className="inline-flex p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20">
                  {steps[activeStep].icon}
                </div>
                <h3 className="font-serif text-3xl font-normal text-white">
                  {steps[activeStep].subtitle}
                </h3>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  {steps[activeStep].desc}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  Clinic Location: M.G. Road, Warangal
                </span>
                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-500 text-slate-950 font-semibold hover:bg-teal-400 transition-colors shadow-lg"
                >
                  <span>Start Step 01 — Book Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
