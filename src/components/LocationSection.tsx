import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, ShieldCheck } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#0F766E]">
            CLINIC LOCATION & ACCESSIBILITY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#0F172A] tracking-tight">
            Find Latha Venkat Ortho Care
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Conveniently situated on M.G. Road, Warangal with accessible parking and public transit connectivity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left: Address & Details Card */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-subtle flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0F766E]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0F172A]">Latha Venkat Ortho Care</h3>
                  <p className="text-xs text-slate-500">Dr. Balaram Kundu Practice</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#0F766E] shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Address</span>
                    <p className="text-slate-600">
                      Latha Venkat Ortho & General Care,<br />
                      M.G. Road, Warangal, Telangana - 506002
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#0F766E] shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Direct Clinic Line</span>
                    <a href="tel:+917075170950" className="text-[#0F766E] hover:underline font-medium">
                      +91 7075170950
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#0F766E] shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Consultation Hours</span>
                    <p className="text-slate-600">Mon - Sat: 9:30 AM - 9:00 PM</p>
                    <p className="text-slate-600">Sunday: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3">
              <a
                href="https://maps.app.goo.gl/GjZibaRiCGzcVBgh7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#0F172A] text-white text-sm font-semibold hover:bg-[#0F766E] transition-colors shadow-md"
              >
                <Navigation className="w-4 h-4 text-teal-400" />
                <span>Get Google Maps Directions</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Right: Interactive Google Map */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200 shadow-subtle bg-slate-100 relative min-h-[400px]">
            <iframe
              title="Latha Venkat Ortho & General Care Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.4136244686445!2d79.5915!3d17.9784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a334f5933939999%3A0x8929bf5894101915!2sM.G.%20Road%2C%20Warangal%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full min-h-[420px] border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-md border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
              <span>M.G. Road, Warangal</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
