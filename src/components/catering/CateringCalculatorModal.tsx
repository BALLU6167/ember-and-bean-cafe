import React, { useState } from 'react';
import { Users, X, Send, CheckCircle, Coffee, Briefcase, Sparkles, Building } from 'lucide-react';

interface CateringCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CateringCalculatorModal: React.FC<CateringCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [headcount, setHeadcount] = useState<number>(25);
  const [tier, setTier] = useState<'box' | 'barista' | 'full'>('box');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [eventDate, setEventDate] = useState('2026-10-20');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const ratePerPerson = tier === 'box' ? 240 : tier === 'barista' ? 520 : 850;
  const totalEstimate = headcount * ratePerPerson;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[99980] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative max-w-2xl w-full bg-[#1A110D] border-2 border-[#C68B59]/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#F5EDE0] my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Close Catering Calculator"
          className="absolute top-5 right-5 p-2 text-[#F5EDE0]/60 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-5 h-5 text-[#DFB17B]" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C68B59] font-bold">
                Corporate & Events Service
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5EDE0]">
              Group & Office Catering Calculator
            </h2>
            <p className="text-xs text-[#F5EDE0]/70 mb-6">
              Bring Ember & Bean specialty coffee boxes and artisanal bakes directly to your team meeting, gallery opening, or wedding.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              {/* Guest Count Slider */}
              <div className="bg-[#120B08] p-4 rounded-2xl border border-[#C68B59]/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm text-[#F5EDE0] flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#DFB17B]" /> Guest / Team Count
                  </span>
                  <span className="font-mono text-base font-bold text-[#DFB17B]">{headcount} People</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="5"
                  value={headcount}
                  onChange={(e) => setHeadcount(Number(e.target.value))}
                  className="w-full accent-[#C68B59] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#F5EDE0]/50 mt-1 font-mono">
                  <span>10 Guests (Small Box)</span>
                  <span>75 Guests</span>
                  <span>150+ Guests (Full Hall)</span>
                </div>
              </div>

              {/* Package Tiers */}
              <div>
                <label className="font-semibold text-sm text-[#F5EDE0] block mb-2">Catering Experience</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setTier('box')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      tier === 'box'
                        ? 'bg-[#C68B59] text-[#1E1410] font-bold border-[#DFB17B]'
                        : 'bg-[#120B08] border-[#C68B59]/30 text-[#F5EDE0]/80'
                    }`}
                  >
                    <span className="block font-serif text-sm font-bold">Office Coffee Box</span>
                    <span className="block text-[11px] opacity-80 mt-1">Thermal coffee carafes + fresh mini morning buns</span>
                    <span className="block font-mono text-xs font-bold mt-2">₹240 / person</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTier('barista')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      tier === 'barista'
                        ? 'bg-[#C68B59] text-[#1E1410] font-bold border-[#DFB17B]'
                        : 'bg-[#120B08] border-[#C68B59]/30 text-[#F5EDE0]/80'
                    }`}
                  >
                    <span className="block font-serif text-sm font-bold">Mobile Espresso Bar</span>
                    <span className="block text-[11px] opacity-80 mt-1">Onsite Slayer machine + 2 Baristas + full menu</span>
                    <span className="block font-mono text-xs font-bold mt-2">₹520 / person</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTier('full')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      tier === 'full'
                        ? 'bg-[#C68B59] text-[#1E1410] font-bold border-[#DFB17B]'
                        : 'bg-[#120B08] border-[#C68B59]/30 text-[#F5EDE0]/80'
                    }`}
                  >
                    <span className="block font-serif text-sm font-bold">Luxury Brunch Spread</span>
                    <span className="block text-[11px] opacity-80 mt-1">Mobile bar + sourdough tartines + pastries + dessert</span>
                    <span className="block font-mono text-xs font-bold mt-2">₹850 / person</span>
                  </button>
                </div>
              </div>

              {/* Live Cost Estimate Preview */}
              <div className="bg-[#24150E] border border-[#C68B59]/40 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-[#F5EDE0]/60 block font-mono">Estimated Proposal Total</span>
                  <span className="text-xs text-[#F5EDE0]/80">Includes biodegradable serviceware, delivery & setup</span>
                </div>
                <div className="text-right">
                  <span className="font-serif text-2xl font-bold text-[#DFB17B]">₹{totalEstimate.toLocaleString()}</span>
                  <span className="text-[10px] text-[#F5EDE0]/50 block">₹{ratePerPerson} × {headcount} guests</span>
                </div>
              </div>

              {/* Event Details Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[11px] font-semibold text-[#F5EDE0] block mb-1">Company / Host Name</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Studio Hyderabad / Private"
                    className="w-full bg-[#120B08] border border-[#C68B59]/40 rounded-xl px-3 py-2.5 text-xs text-[#F5EDE0] placeholder-[#F5EDE0]/40 focus:outline-none focus:border-[#DFB17B]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#F5EDE0] block mb-1">Contact Person Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Radhika Sharma"
                    className="w-full bg-[#120B08] border border-[#C68B59]/40 rounded-xl px-3 py-2.5 text-xs text-[#F5EDE0] placeholder-[#F5EDE0]/40 focus:outline-none focus:border-[#DFB17B]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#F5EDE0] block mb-1">Mobile / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#120B08] border border-[#C68B59]/40 rounded-xl px-3 py-2.5 text-xs text-[#F5EDE0] placeholder-[#F5EDE0]/40 focus:outline-none focus:border-[#DFB17B]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#F5EDE0] block mb-1">Date of Event</label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-[#120B08] border border-[#C68B59]/40 rounded-xl px-3 py-2.5 text-xs text-[#F5EDE0] focus:outline-none focus:border-[#DFB17B]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#C68B59] to-[#C85A32] hover:from-[#DFB17B] hover:to-[#B04C27] text-[#1E1410] font-bold rounded-2xl text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" /> Request Official Catering Quote (₹{totalEstimate.toLocaleString()})
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-[#DFB17B] mx-auto mb-4 animate-bounce" />
            <h3 className="font-serif text-3xl font-bold text-[#F5EDE0] mb-2">Quote Request Received</h3>
            <p className="text-xs text-[#F5EDE0]/70 mb-4 max-w-md mx-auto">
              Our catering director will send a detailed customized menu PDF & invoice to <strong>{contactPhone}</strong> within 3 business hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2.5 bg-[#C68B59] text-[#1E1410] font-bold rounded-xl text-xs uppercase"
            >
              Calculate Another Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
