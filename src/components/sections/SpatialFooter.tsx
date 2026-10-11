import React, { useState } from 'react';
import { Coffee, MapPin, Phone, Mail, Clock, Send, Sparkles, Heart } from 'lucide-react';

export const SpatialFooter: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="relative z-10 pt-20 pb-12 px-4 sm:px-8 border-t border-[#d4a373]/20 bg-[#090807]/90 pointer-events-auto">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d4a373] to-[#c89666] p-0.5">
                <div className="w-full h-full bg-[#090807] rounded-[10px] flex items-center justify-center">
                  <Coffee className="w-4 h-4 text-[#d4a373]" />
                </div>
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-white">AURA</span>
            </div>
            <p className="text-xs text-[#9a8c98] leading-relaxed">
              A next-generation spatial craft roastery experience. Artisanal single-origin microlots presented through interactive 3D UI design.
            </p>
            <div className="font-mono text-[10px] text-[#d4a373] uppercase tracking-widest flex items-center space-x-2">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>Spatial Design System v2.5</span>
            </div>
          </div>

          {/* Col 2: Hours & Location */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">Hours & Location</h4>
            <div className="space-y-2 text-[#9a8c98]">
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-[#d4a373] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white">Mon – Sat: 7:30 AM – 10:00 PM</span>
                  <span className="block text-white">Sunday: 8:30 AM – 8:00 PM</span>
                </div>
              </div>
              <div className="flex items-start space-x-2 pt-1">
                <MapPin className="w-4 h-4 text-[#d4a373] shrink-0 mt-0.5" />
                <span>482 Spatial Botanical Avenue, Craft District</span>
              </div>
            </div>
          </div>

          {/* Col 3: Contact */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">Contact & Inquiries</h4>
            <div className="space-y-2 text-[#9a8c98]">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#d4a373]" />
                <span>+1 (800) 555-AURA</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#d4a373]" />
                <span>concierge@auraroastery.com</span>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">Spatial Journal</h4>
            <p className="text-xs text-[#9a8c98]">
              Subscribe for private microlot drop invitations and seasonal release previews.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#d4a373]/15 border border-[#d4a373]/40 text-xs font-mono text-[#d4a373]">
                ✓ Welcome to the Spatial Journal.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-[#090807] border border-[#d4a373]/30 rounded-xl px-3 py-2 text-xs text-white placeholder-[#9a8c98] focus:outline-none focus:border-[#d4a373]"
                  required
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-gradient-to-r from-[#d4a373] to-[#c89666] text-[#090807] hover:brightness-110"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits & Accessibility Note */}
        <div className="pt-8 border-t border-[#d4a373]/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#9a8c98] gap-4">
          <div>
            © {new Date().getFullYear()} AURA Spatial Craft Roastery. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-white transition-colors cursor-pointer">Accessibility & Reduced Motion Compliant</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy & Spatial Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
