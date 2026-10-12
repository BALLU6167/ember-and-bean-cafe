import React, { useState, useEffect } from 'react';
import { Phone, Calendar, MapPin, Menu, X, Shield, Clock } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement / Credentials Bar */}
      <div className="bg-[#0F172A] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-teal-400 font-medium">
              <Shield className="w-3.5 h-3.5" />
              Latha Venkat Ortho & General Care
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-300">Dr. Balaram Kundu | Orthopaedic Specialist</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Mon - Sat: 9:30 AM - 9:00 PM | Sun: 10:00 AM - 2:00 PM
            </span>
            <button
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-white underline text-[11px] transition-colors"
              title="Doctor / Clinic Management Dashboard"
            >
              Doctor Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-subtle border-b border-slate-200/80 py-3.5'
            : 'bg-[#F8FAFC] py-5 border-b border-slate-200/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a href="#doctor" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-serif text-lg font-bold shadow-md group-hover:bg-[#0F766E] transition-colors">
              LK
            </div>
            <div>
              <span className="block font-serif text-lg font-semibold text-[#0F172A] leading-tight tracking-tight">
                Latha Venkat Ortho
              </span>
              <span className="block text-xs font-medium text-slate-500 tracking-wide uppercase">
                & General Care • Dr. Balaram Kundu
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#doctor" className="hover:text-[#0F172A] transition-colors">The Doctor</a>
            <a href="#care" className="hover:text-[#0F172A] transition-colors">Areas of Care</a>
            <a href="#journey" className="hover:text-[#0F172A] transition-colors">Patient Journey</a>
            <a href="#gallery" className="hover:text-[#0F172A] transition-colors">Clinic Gallery</a>
            <a href="#reviews" className="hover:text-[#0F172A] transition-colors">Google Reviews</a>
            <a href="#location" className="hover:text-[#0F172A] transition-colors">Location</a>
            <a href="#faq" className="hover:text-[#0F172A] transition-colors">FAQ</a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+917075170950"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-100 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#0F766E]" />
              <span>+91 7075170950</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0F172A] text-white text-sm font-medium hover:bg-[#0F766E] shadow-sm transition-all duration-200"
            >
              <Calendar className="w-4 h-4 text-teal-400" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="sm:hidden px-3.5 py-1.5 rounded-full bg-[#0F172A] text-white text-xs font-medium"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
            <a
              href="#doctor"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-800 py-1"
            >
              The Doctor (Dr. Balaram Kundu)
            </a>
            <a
              href="#care"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-800 py-1"
            >
              Areas of Care
            </a>
            <a
              href="#journey"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-800 py-1"
            >
              Your Visit Journey
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-800 py-1"
            >
              Inside the Clinic
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-800 py-1"
            >
              Google Patient Reviews
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-800 py-1"
            >
              Location & Directions
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-800 py-1"
            >
              FAQ
            </a>
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <a
                href="tel:+917075170950"
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-300 text-slate-800 font-medium"
              >
                <Phone className="w-4 h-4 text-[#0F766E]" />
                <span>Call Clinic (+91 7075170950)</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-xl bg-[#0F172A] text-white font-medium shadow-md"
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Sticky Bottom Mobile Action Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-4 py-3 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href="tel:+917075170950"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-slate-300 text-slate-800 text-xs font-semibold"
        >
          <Phone className="w-3.5 h-3.5 text-[#0F766E]" />
          <span>Call</span>
        </a>
        <a
          href="https://maps.app.goo.gl/GjZibaRiCGzcVBgh7"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-slate-300 text-slate-800 text-xs font-semibold"
        >
          <MapPin className="w-3.5 h-3.5 text-[#0F766E]" />
          <span>Directions</span>
        </a>
        <button
          onClick={onOpenBooking}
          className="flex-1.5 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-[#0F172A] text-white text-xs font-semibold shadow-md"
        >
          <Calendar className="w-3.5 h-3.5 text-teal-400" />
          <span>Book Now</span>
        </button>
      </div>
    </>
  );
};
