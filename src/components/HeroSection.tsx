import React from 'react';
import { Calendar, Phone, MapPin, Clock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative pt-8 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-[#F8FAFC]">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-slate-900/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Deliberate Editorial Narrative */}
          <div className="lg:col-span-7 space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/70 border border-slate-300 text-slate-800 text-xs font-semibold tracking-wide">
              <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
              <span>PRIVATE ORTHOPAEDIC & GENERAL PRACTICE • WARANGAL</span>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#0F172A] tracking-tight leading-[1.15]">
                Personalized Orthopaedic & Medical Care Built Around You.
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
                Led by <strong className="text-slate-900 font-semibold">Dr. Balaram Kundu</strong> at <strong className="text-slate-900 font-semibold">Latha Venkat Ortho & General Care</strong>. Dedicated to precision diagnosis, joint conservation, fracture management, and compassionate recovery on M.G. Road, Warangal.
              </p>
            </div>

            {/* Key Trust Factors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                <span>Zero Upfront Pre-Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                <span>Instant WhatsApp Doctor Notification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                <span>Comprehensive Joint & Trauma Evaluation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                <span>Central M.G. Road Warangal Location</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#0F172A] text-white text-base font-medium hover:bg-[#0F766E] shadow-premium transition-all duration-200 group"
              >
                <Calendar className="w-5 h-5 text-teal-400 group-hover:scale-110 transition-transform" />
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="tel:+917075170950"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full border border-slate-300 bg-white text-slate-800 text-base font-medium hover:bg-slate-50 transition-colors shadow-sm"
              >
                <Phone className="w-5 h-5 text-[#0F766E]" />
                <span>Call Clinic (+91 7075170950)</span>
              </a>
            </div>

            {/* Quick Details Card Bar */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Clinic Location</span>
                  <span>M.G. Road, Warangal</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Consultation Hours</span>
                  <span>Mon-Sat 9:30 AM - 9:00 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Direct Line</span>
                  <span>+91 7075170950</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Clinic Portrait & Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-premium border border-slate-200">
              {/* Provided Real Clinic Portrait Image */}
              <img
                src="https://images.jdmagicbox.com/comp/warangal/r8/9999px870.x870.160213090812.g4r8/catalogue/latha-venkat-ortho-and-general-care-m-g-road-warangal-clinics-9l52rkq9ws.jpg"
                alt="Latha Venkat Ortho & General Care - Dr. Balaram Kundu Clinic Exterior"
                className="w-full h-[460px] object-cover object-center filter brightness-[0.92] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              {/* Overlay Doctor Card */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="backdrop-blur-md bg-slate-900/80 p-5 rounded-xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl font-bold text-white">Dr. Balaram Kundu</h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 font-medium border border-teal-500/30">
                      Orthopaedic Care
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Latha Venkat Ortho & General Care Clinic
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    "Every treatment plan starts with listening closely to the patient and understanding their daily physical needs."
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
