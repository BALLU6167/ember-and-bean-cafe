import React, { useState } from 'react';
import { Eye, X, Maximize2, MapPin } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
}

const CLINIC_PHOTOS: GalleryImage[] = [
  {
    id: 'photo-1',
    url: 'https://images.jdmagicbox.com/comp/warangal/r8/9999px870.x870.160213090812.g4r8/catalogue/latha-venkat-ortho-and-general-care-m-g-road-warangal-clinics-9l52rkq9ws.jpg',
    title: 'Main Clinic Entrance & Signage',
    category: 'Exterior',
  },
  {
    id: 'photo-2',
    url: 'https://images.jdmagicbox.com/comp/warangal/r8/9999px870.x870.160213090812.g4r8/catalogue/latha-venkat-ortho-and-general-care-m-g-road-warangal-ayurvedic-doctors-imrlqi5h95.jpg',
    title: 'Doctor Consultation Room',
    category: 'Consultation',
  },
  {
    id: 'photo-3',
    url: 'https://images.jdmagicbox.com/v2/comp/warangal/r8/9999px870.x870.160213090812.g4r8/catalogue/latha-venkat-ortho-and-general-care-m-g-road-warangal-clinics-8g59w180f1.jpg',
    title: 'Patient Waiting Lounge & Reception',
    category: 'Reception',
  },
  {
    id: 'photo-4',
    url: 'https://images.jdmagicbox.com/v2/comp/warangal/r8/9999px870.x870.160213090812.g4r8/catalogue/latha-venkat-ortho-and-general-care-m-g-road-warangal-clinics-5b203a37kn.jpg',
    title: 'Examination Chamber',
    category: 'Clinical',
  },
  {
    id: 'photo-5',
    url: 'https://images.jdmagicbox.com/v2/comp/warangal/r8/9999px870.x870.160213090812.g4r8/catalogue/latha-venkat-ortho-and-general-care-m-g-road-warangal-clinics-89s4qa0j3p.jpg',
    title: 'Orthopaedic Diagnostics & Support',
    category: 'Facilities',
  },
  {
    id: 'photo-6',
    url: 'https://content.jdmagicbox.com/comp/warangal/r8/9999px870.x870.160213090812.g4r8/catalogue/latha-venkat-ortho-and-general-care-m-g-road-warangal-ayurvedic-doctors-0eva4wgoj5.jpg?imwidth=210.33333333333334',
    title: 'Consultation Suite Detail',
    category: 'Interior',
  },
  {
    id: 'photo-7',
    url: 'https://content.jdmagicbox.com/comp/warangal/r8/9999px870.x870.160213090812.g4r8/catalogue/latha-venkat-ortho-and-general-care-m-g-road-warangal-clinics-mv6ze3e6p8.jpg?imwidth=210.33333333333334',
    title: 'Clinic Facilities Overview',
    category: 'Facilities',
  },
];

export const ClinicGallery: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<GalleryImage | null>(null);

  return (
    <section id="gallery" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#0F766E]">
            REAL CLINIC ENVIRONMENT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#0F172A] tracking-tight">
            Inside Latha Venkat Ortho Care
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Actual photographs of our consultation chambers, reception lounge, and facilities on M.G. Road, Warangal.
          </p>
        </div>

        {/* Editorial Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLINIC_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 cursor-pointer shadow-subtle hover:shadow-premium transition-all duration-300 h-72"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-0 left-0 right-0 p-5 text-white flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-300 bg-teal-950/70 px-2 py-0.5 rounded border border-teal-800/50">
                    {photo.category}
                  </span>
                  <h4 className="font-serif text-lg font-medium text-white mt-1">
                    {photo.title}
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-slate-900 transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-modal">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-950/80 text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={activePhoto.url}
              alt={activePhoto.title}
              className="w-full h-[520px] object-contain bg-slate-950"
            />

            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-t border-slate-800">
              <div>
                <span className="text-xs text-teal-400 font-semibold uppercase tracking-wider">{activePhoto.category}</span>
                <h3 className="font-serif text-xl font-bold">{activePhoto.title}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  Latha Venkat Ortho & General Care, M.G. Road, Warangal
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
