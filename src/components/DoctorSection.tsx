import React from 'react';
import { Award, GraduationCap, HeartHandshake, Stethoscope, Check, Shield } from 'lucide-react';

export const DoctorSection: React.FC = () => {
  return (
    <section id="doctor" className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#0F766E]">
            THE PERSON BEHIND THE BRAND
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#0F172A] tracking-tight">
            Meet Dr. Balaram Kundu
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Dedicated to providing precise orthopaedic care and comprehensive general medical consultations at Latha Venkat Ortho & General Care, M.G. Road, Warangal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Doctor Photography & Badges */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-subtle">
              <img
                src="https://images.jdmagicbox.com/comp/warangal/r8/9999px870.x870.160213090812.g4r8/catalogue/latha-venkat-ortho-and-general-care-m-g-road-warangal-ayurvedic-doctors-imrlqi5h95.jpg"
                alt="Dr. Balaram Kundu Consultation Practice"
                className="w-full h-[480px] object-cover object-top"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200/80 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center shrink-0">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-slate-900 text-base">Dr. Balaram Kundu</h4>
                    <p className="text-xs text-slate-600">Orthopaedic Specialist & General Care</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Credentials Box */}
            <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 space-y-4">
              <h4 className="font-serif text-lg font-semibold text-[#0F172A]">Clinical Foundations</h4>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <GraduationCap className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                  <span>Comprehensive Orthopaedic & Trauma Training</span>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                  <span>Specialized Focus on Joint Pain Relief & Fracture Recovery</span>
                </li>
                <li className="flex items-start gap-3">
                  <HeartHandshake className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                  <span>Languages Spoken: English, Hindi, Telugu</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Doctor Philosophy & Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#0F172A] font-normal leading-snug">
                "An approach built around patient mobility, anatomical safety, and clear communication."
              </h3>
              
              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                <p>
                  At Latha Venkat Ortho & General Care, Dr. Balaram Kundu provides individualized patient care focusing on restoring active joint function, diagnosing acute trauma, managing chronic arthritis, and addressing general health concerns.
                </p>
                <p>
                  Rather than rushing into invasive surgical interventions, our clinic prioritizes conservative orthopaedic management, structured rehabilitation guidance, and joint preservation techniques tailored specifically to each patient's routine.
                </p>
              </div>
            </div>

            {/* Core Practice Values */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h4 className="font-serif text-xl font-semibold text-[#0F172A]">Core Clinical Philosophy</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                    <Shield className="w-4 h-4 text-[#0F766E]" />
                    <span>Empathetic Consultations</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Clear, transparent explanations of X-rays, diagnostic findings, and treatment options without jargon.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                    <Check className="w-4 h-4 text-[#0F766E]" />
                    <span>Evidence-Based Care</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Proven orthopaedic therapies, non-surgical joint management, and structured recovery guidelines.
                  </p>
                </div>
              </div>
            </div>

            {/* Location Note */}
            <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200/60 flex items-center justify-between text-xs text-teal-900">
              <div>
                <span className="font-semibold block">Practice Location</span>
                <span>Latha Venkat Ortho & General Care, M.G. Road, Warangal</span>
              </div>
              <a
                href="tel:+917075170950"
                className="px-3.5 py-1.5 rounded-full bg-[#0F766E] text-white font-medium hover:bg-teal-800 transition-colors shrink-0"
              >
                Call Clinic
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
