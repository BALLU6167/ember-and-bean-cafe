import React from 'react';
import { Phone, MapPin, Clock, Calendar, ShieldCheck, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAdmin }) => {
  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-serif text-lg font-bold">
                LK
              </div>
              <div>
                <span className="block font-serif text-xl font-bold text-white">
                  Latha Venkat Ortho
                </span>
                <span className="block text-xs font-medium text-slate-400">
                  & General Care • Dr. Balaram Kundu
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Dedicated private medical care combining advanced joint preservation, trauma management, and individual health consultations on M.G. Road, Warangal.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-teal-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Private Clinic • Warangal</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-base font-semibold text-white">Navigation</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#doctor" className="hover:text-white transition-colors">About Dr. Balaram Kundu</a></li>
              <li><a href="#care" className="hover:text-white transition-colors">Areas of Care</a></li>
              <li><a href="#journey" className="hover:text-white transition-colors">Patient Visit Journey</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Inside the Clinic</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Google Reviews</a></li>
              <li><a href="#location" className="hover:text-white transition-colors">Location & Directions</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-serif text-base font-semibold text-white">Clinic Details</h4>
            
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Latha Venkat Ortho & General Care, M.G. Road, Warangal, Telangana - 506002</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="tel:+917075170950" className="text-white hover:text-teal-400 font-medium transition-colors">
                  +91 7075170950
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-200">Monday - Saturday: 9:30 AM - 9:00 PM</span>
                  <span className="block text-slate-400">Sunday: 10:00 AM - 2:00 PM</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-500 text-slate-950 text-xs font-semibold hover:bg-teal-400 transition-colors shadow-md"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </button>
              
              <a
                href="https://maps.app.goo.gl/GjZibaRiCGzcVBgh7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Latha Venkat Ortho & General Care. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={onOpenAdmin} className="hover:text-slate-300 underline">
              Doctor Management Portal
            </button>
            <span>•</span>
            <span>Zero Pre-Payment System</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
