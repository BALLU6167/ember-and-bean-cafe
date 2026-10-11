import React, { useState } from 'react';
import { Activity, Bone, Heart, Zap, UserCheck, Stethoscope, ChevronRight, X, Calendar, CheckCircle2 } from 'lucide-react';
import { ServiceItem } from '../types/appointment';

const SERVICES: ServiceItem[] = [
  {
    id: 'joint-care',
    title: 'Joint Health & Pain Relief',
    shortDesc: 'Specialized evaluation and non-surgical management for knee, hip, shoulder, and ankle joint pain.',
    fullDesc: 'Comprehensive joint evaluation utilizing clinical assessment, mobility testing, and imaging analysis. Dr. Balaram Kundu focuses on joint preservation, lubricating therapies, anti-inflammatory protocols, and customized exercises to delay or prevent major surgery.',
    patientConcerns: ['Knee stiffness when walking', 'Shoulder pain during movement', 'Chronic hip aching', 'Swollen joints'],
    duration: '20 - 30 Minutes',
    iconName: 'Activity',
  },
  {
    id: 'trauma-fracture',
    title: 'Fracture & Acute Trauma Care',
    shortDesc: 'Prompt evaluation, immobilization, casting, and closed reduction for bone fractures and severe sprains.',
    fullDesc: 'Immediate physical evaluation for bone injuries, ligament sprains, and joint dislocations. Providing precise casting, splinting, and structured alignment verification to ensure anatomically correct bone healing.',
    patientConcerns: ['Sudden injury after fall', 'Inability to bear weight', 'Severe localized swelling', 'Suspected bone fracture'],
    duration: '30 - 45 Minutes',
    iconName: 'Bone',
  },
  {
    id: 'spine-back',
    title: 'Spine & Cervical Care',
    shortDesc: 'Targeted relief for lower back pain, neck stiffness, sciatica, and lumbar disc strain.',
    fullDesc: 'Non-surgical spine protocols designed to relieve nerve compression, reduce disc inflammation, and correct postural strain. Patients receive ergonomic advice and core strengthening exercises.',
    patientConcerns: ['Lower back pain radiating to legs', 'Neck stiffness', 'Numbness in hands or feet', 'Difficulty sitting long hours'],
    duration: '20 - 30 Minutes',
    iconName: 'Zap',
  },
  {
    id: 'arthritis-management',
    title: 'Arthritis & Mobility Care',
    shortDesc: 'Structured protocols for Osteoarthritis, Rheumatoid stiffness, and age-related cartilage wear.',
    fullDesc: 'Managing progressive joint wear through targeted medication, dietary alignment, joint protection strategies, and routine monitoring to maintain daily independence.',
    patientConcerns: ['Morning joint stiffness', 'Grinding sensation in knees', 'Reduced joint flexibility'],
    duration: '25 - 30 Minutes',
    iconName: 'Heart',
  },
  {
    id: 'general-consultation',
    title: 'General Medical Care',
    shortDesc: 'Holistic health consultations for hypertension, diabetes monitoring, fever, and acute illnesses.',
    fullDesc: 'Complete general practitioner services addressing seasonal infections, metabolic wellness, routine blood pressure/blood sugar reviews, and general physical check-ups at the clinic.',
    patientConcerns: ['Persistent fever or weakness', 'Blood pressure screening', 'Routine general health check-up'],
    duration: '15 - 25 Minutes',
    iconName: 'Stethoscope',
  },
  {
    id: 'rehab-recovery',
    title: 'Rehabilitation & Recovery',
    shortDesc: 'Guided post-injury physical rehabilitation programs to restore strength, agility, and flex.',
    fullDesc: 'Step-by-step physical recovery protocols following fracture healing or joint sprains. Helps patients rebuild muscle strength, joint proprioception, and safe movement patterns.',
    patientConcerns: ['Post-cast muscle weakness', 'Stiffness following injury recovery', 'Rebuilding walking confidence'],
    duration: '20 - 30 Minutes',
    iconName: 'UserCheck',
  },
];

interface ServicesSectionProps {
  onOpenBookingWithService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBookingWithService }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Activity': return <Activity className="w-6 h-6 text-[#0F766E]" />;
      case 'Bone': return <Bone className="w-6 h-6 text-[#0F766E]" />;
      case 'Zap': return <Zap className="w-6 h-6 text-[#0F766E]" />;
      case 'Heart': return <Heart className="w-6 h-6 text-[#0F766E]" />;
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-[#0F766E]" />;
      default: return <UserCheck className="w-6 h-6 text-[#0F766E]" />;
    }
  };

  return (
    <section id="care" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#0F766E]">
            SPECIALIZED MEDICAL SPECTRUM
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#0F172A] tracking-tight">
            Areas of Care & Clinical Services
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Organized around patient symptoms and precise anatomical care. Select an area below to explore consultation details.
          </p>
        </div>

        {/* Services Grid (Restrained Editorial Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-subtle hover:shadow-premium hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                  {getServiceIcon(service.iconName)}
                </div>
                
                <h3 className="font-serif text-2xl font-medium text-[#0F172A] group-hover:text-[#0F766E] transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(service)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-[#0F766E] transition-colors"
                >
                  <span>Learn Details</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#0F766E]" />
                </button>

                <button
                  onClick={() => onOpenBookingWithService(service.title)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-medium hover:bg-[#0F766E] transition-colors"
                >
                  <span>Book Care</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Progressive Disclosure Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white max-w-2xl w-full rounded-2xl shadow-modal border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                    {getServiceIcon(selectedService.iconName)}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#0F172A]">{selectedService.title}</h3>
                    <span className="text-xs font-medium text-slate-500">Dr. Balaram Kundu • Latha Venkat Ortho Care</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-slate-700 text-sm leading-relaxed border-t border-b border-slate-100 py-4">
                <p>{selectedService.fullDesc}</p>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Common Patient Symptoms Addressed:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    {selectedService.patientConcerns.map((concern, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E]" />
                        <span>{concern}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">Typical Consultation: {selectedService.duration}</span>
                <button
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    onOpenBookingWithService(title);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F172A] text-white text-sm font-medium hover:bg-[#0F766E] transition-colors"
                >
                  <Calendar className="w-4 h-4 text-teal-400" />
                  <span>Book Consultation For This Area</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
