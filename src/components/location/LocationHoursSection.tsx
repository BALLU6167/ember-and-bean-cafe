import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  MessageSquare, 
  Car, 
  Train, 
  Send, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const LocationHoursSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 4000);
  };

  return (
    <section id="location" className="py-24 bg-transparent text-[#FAF6F0] border-t border-[#D49B6A]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#D49B6A] font-bold block mb-2">
            {t.locationBadge}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF6F0] tracking-tight">
            {t.locationTitle}
          </h2>
          <p className="mt-3 text-sm text-[#DDD3C4]/75 font-light">
            {t.locationDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Hours, Location, Transit & WhatsApp Click */}
          <div className="lg:col-span-6 space-y-6">
            {/* Live Hours Card */}
            <div className="bg-[#160F0B] border border-[#D49B6A]/30 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#D49B6A]/15 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D49B6A]/10 border border-[#D49B6A]/30 flex items-center justify-center text-[#D49B6A]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#FAF6F0]">Opening Hours</h3>
                    <span className="text-xs text-emerald-400 font-medium">● Open Now · Closes at 11:00 PM</span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#D49B6A] bg-[#120D0A] px-2.5 py-1 rounded border border-[#D49B6A]/30">
                  7 Days a Week
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#DDD3C4]/70">Monday – Thursday:</span>
                  <strong className="text-[#FAF6F0] font-mono">07:00 AM – 11:00 PM</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#DDD3C4]/70">Friday (Live Jazz Twilight):</span>
                  <strong className="text-[#D49B6A] font-mono">07:00 AM – 11:30 PM</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#DDD3C4]/70">Saturday (Brunch & Roasting):</span>
                  <strong className="text-[#FAF6F0] font-mono">07:00 AM – 11:30 PM</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#DDD3C4]/70">Sunday (Public Cupping at 11 AM):</span>
                  <strong className="text-[#FAF6F0] font-mono">07:00 AM – 11:00 PM</strong>
                </div>
              </div>
            </div>

            {/* Address & Direct WhatsApp / Phone Contact */}
            <div className="bg-[#160F0B] border border-[#D49B6A]/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D49B6A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-base text-[#FAF6F0]">Ember & Bean Roastery Flagship</h4>
                  <p className="text-[#DDD3C4]/75 mt-1">Plot 42, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#D49B6A]/15">
                <a
                  href="https://wa.me/919876543210?text=Hello%20Ember%20%26%20Bean%2C%20I%20would%20like%20to%20inquire%20about..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#120D0A] hover:bg-emerald-950/40 border border-emerald-600/40 rounded-xl flex items-center gap-2.5 text-emerald-400 font-semibold transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Concierge</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
                </a>

                <a
                  href="tel:+914048923000"
                  className="p-3 bg-[#120D0A] hover:bg-[#20150F] border border-[#D49B6A]/30 rounded-xl flex items-center gap-2.5 text-[#D49B6A] font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>+91 (40) 4892-3000</span>
                </a>
              </div>

              {/* Transit & Parking Badges */}
              <div className="pt-3 border-t border-[#D49B6A]/15 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-[#DDD3C4]/80">
                  <Car className="w-4 h-4 text-[#D49B6A]" />
                  <span>Complimentary Valet Parking Available</span>
                </div>
                <div className="flex items-center gap-2 text-[#DDD3C4]/80">
                  <Train className="w-4 h-4 text-[#D49B6A]" />
                  <span>350m from Road No. 5 Metro Station</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Map Simulation & Contact Form */}
          <div className="lg:col-span-6 space-y-6">
            {/* Stylized Map View */}
            <div className="relative aspect-[16/9] w-full bg-[#120D0A] border-2 border-[#D49B6A]/30 rounded-3xl overflow-hidden shadow-xl">
              <iframe
                title="Ember & Bean Jubilee Hills Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15227.189332152345!2d78.401314!3d17.432658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9747970876cf%3A0x88981f335b1d9bf5!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-[1.1] opacity-75"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#1A130E]/90 backdrop-blur-md p-3 rounded-2xl border border-[#D49B6A]/30 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#FAF6F0] block">Road No. 36, Jubilee Hills</span>
                  <span className="text-[10px] text-[#DDD3C4]/60">Opposite Peddamma Temple Metro Link</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Ember+%26+Bean+Artisanal+Roastery+Road+36+Jubilee+Hills+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#D49B6A] text-[#120D0A] font-bold rounded-lg text-[11px] flex items-center gap-1 hover:bg-[#E2AA79] transition-colors"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Inquiries Contact Form */}
            <div className="bg-[#160F0B] border border-[#D49B6A]/30 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="font-serif font-bold text-xl text-[#FAF6F0] mb-1">Direct Roastery Query</h3>
              <p className="text-xs text-[#DDD3C4]/70 mb-4">
                Have a private event inquiry, custom wholesale beans question, or feedback?
              </p>

              {!submitted ? (
                <form onSubmit={handleContactSubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full bg-[#120D0A] border border-[#D49B6A]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#FAF6F0] placeholder-[#DDD3C4]/40 focus:outline-none focus:border-[#D49B6A]"
                    />
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="Your Email Address"
                      className="w-full bg-[#120D0A] border border-[#D49B6A]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#FAF6F0] placeholder-[#DDD3C4]/40 focus:outline-none focus:border-[#D49B6A]"
                    />
                  </div>

                  <textarea
                    rows={3}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="How can our hospitality team assist you today?"
                    className="w-full bg-[#120D0A] border border-[#D49B6A]/30 rounded-xl p-3 text-xs text-[#FAF6F0] placeholder-[#DDD3C4]/40 focus:outline-none focus:border-[#D49B6A]"
                  />

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-[#D49B6A] to-[#B86F43] hover:from-[#E2AA79] hover:to-[#C67B4E] text-[#120D0A] font-bold rounded-xl text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.01] transition-transform"
                  >
                    <Send className="w-3.5 h-3.5" /> Dispatch Message
                  </button>
                </form>
              ) : (
                <div className="text-center py-6">
                  <CheckCircle className="w-12 h-12 text-[#D49B6A] mx-auto mb-2 animate-bounce" />
                  <h4 className="font-serif font-bold text-lg text-[#FAF6F0]">Message Dispatched</h4>
                  <p className="text-xs text-[#DDD3C4]/70">Our team will respond to your email shortly.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
