import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Cookie } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'privacy' | 'terms' | 'cookies';
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'cookies'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99990] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative max-w-3xl w-full bg-[#1A110D] border-2 border-[#C68B59]/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#F5EDE0] my-8 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Close Legal Document"
          className="absolute top-5 right-5 p-2 text-[#F5EDE0]/60 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Tab switchers */}
        <div className="flex gap-2 border-b border-[#C68B59]/25 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
              activeTab === 'privacy' ? 'bg-[#C68B59] text-[#1E1410]' : 'text-[#F5EDE0]/70 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
              activeTab === 'terms' ? 'bg-[#C68B59] text-[#1E1410]' : 'text-[#F5EDE0]/70 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" /> Terms of Service
          </button>
          <button
            onClick={() => setActiveTab('cookies')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
              activeTab === 'cookies' ? 'bg-[#C68B59] text-[#1E1410]' : 'text-[#F5EDE0]/70 hover:text-white'
            }`}
          >
            <Cookie className="w-4 h-4" /> Cookie Notice
          </button>
        </div>

        {/* Legal Text Content */}
        <div className="space-y-4 text-xs sm:text-sm text-[#F5EDE0]/80 leading-relaxed font-light">
          {activeTab === 'privacy' && (
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#F5EDE0] mb-2">Privacy & Guest Data Policy</h3>
              <p className="text-[11px] text-[#DFB17B] font-mono mb-4">Last updated: October 2026 · Ember & Bean Roastery Pvt. Ltd.</p>
              <p>At Ember & Bean, we treat your personal data with the same uncompromising integrity we apply to our single-origin bean sourcing. We collect only what is strictly necessary to fulfill table reservations, bean bag deliveries, and loyalty reward tracking.</p>
              <h4 className="font-serif font-bold text-base text-[#F5EDE0] mt-4 mb-1">1. Information We Collect</h4>
              <p>When placing an online takeaway order or reserving a table zone, we collect your name, phone number, email address, and order dietary notes. We never sell or license your data to third-party advertising brokers.</p>
              <h4 className="font-serif font-bold text-base text-[#F5EDE0] mt-4 mb-1">2. Payment Security</h4>
              <p>All online payments and UPI authorizations are encrypted with 256-bit bank-grade SSL standards via certified payment gateways. No credit card or CVV details are ever stored on our servers.</p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#F5EDE0] mb-2">Terms of Service</h3>
              <p className="text-[11px] text-[#DFB17B] font-mono mb-4">Governing orders, table reservations & workspace usage.</p>
              <p>By reserving a seat, enjoying our coffee bar, or ordering roasted beans online, you agree to these operational standards.</p>
              <h4 className="font-serif font-bold text-base text-[#F5EDE0] mt-4 mb-1">1. Table Reservations & Punctuality</h4>
              <p>Table reservations in our Sunlit Window Alcove, Listening Corner, or Oak Table are held for a grace period of 15 minutes past the scheduled reservation time before being opened to walk-in guests.</p>
              <h4 className="font-serif font-bold text-base text-[#F5EDE0] mt-4 mb-1">2. Workspace Etiquette</h4>
              <p>Our dedicated Focus & Power Bar is equipped with universal outlets and high-speed Wi-Fi. We kindly request that video calls be taken with headphones to preserve the peaceful ambience of fellow guests.</p>
            </div>
          )}

          {activeTab === 'cookies' && (
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#F5EDE0] mb-2">Cookie & Local Storage Preferences</h3>
              <p className="text-[11px] text-[#DFB17B] font-mono mb-4">Transparent browser settings.</p>
              <p>We use essential local storage cookies solely to preserve your active coffee bag items, selected accessibility preferences (high contrast & font scaling), and mood theme choices across your visit.</p>
              <div className="bg-[#120B08] p-4 rounded-xl border border-[#C68B59]/30 mt-4">
                <span className="font-bold text-[#DFB17B] block mb-1">Zero Third-Party Ad Trackers</span>
                <p className="text-xs text-[#F5EDE0]/70">We do not employ cross-site tracking pixels or invasive advertising networks.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
