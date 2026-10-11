import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  Mail, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Check, 
  FileCheck, 
  Scan,
  AlertCircle
} from 'lucide-react';
import { ItineraryItem, ItemType } from '../types/travel';

interface IngestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExtractedItem: (item: ItineraryItem) => void;
}

export const IngestionModal: React.FC<IngestionModalProps> = ({
  isOpen,
  onClose,
  onAddExtractedItem
}) => {
  const [activeTab, setActiveTab] = useState<'ocr' | 'email'>('ocr');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<Partial<ItineraryItem> | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [emailSimulationSent, setEmailSimulationSent] = useState(false);

  if (!isOpen) return null;

  const emailAlias = 'trips.alex@aetheria.os';

  const handleSimulateOCR = (sampleType: 'flight' | 'hotel') => {
    setIsScanning(true);
    setScannedResult(null);

    setTimeout(() => {
      setIsScanning(false);
      if (sampleType === 'flight') {
        setScannedResult({
          id: `ingest-${Date.now()}`,
          tripId: 'trip-tokyo-live',
          dayNumber: 2,
          time: '19:45',
          endTime: '21:10',
          type: 'flight',
          title: 'All Nippon Airways NH 106',
          location: 'Tokyo Haneda (HND) → Osaka Itami (ITM)',
          city: 'Osaka',
          lat: 34.7855,
          lng: 135.4382,
          confirmationCode: 'NH-99410Q',
          gate: '62',
          terminal: 'T2',
          seat: '7A (Premium)',
          cost: 165,
          currency: 'USD',
          status: 'confirmed',
          notes: 'Auto-parsed from physical boarding pass scan. High confidence 99.4%',
          offlineBarcode: 'M1VANCE/ALEX       ENH99410Q HNDITMNH 106 257Y007A0012 147'
        });
      } else {
        setScannedResult({
          id: `ingest-${Date.now()}`,
          tripId: 'trip-tokyo-live',
          dayNumber: 2,
          time: '15:00',
          type: 'hotel',
          title: 'The Ritz-Carlton Kyoto Riverside',
          location: 'Kamogawa Nijo-Ohashi Hotori, Nakagyo Ward',
          city: 'Kyoto',
          lat: 35.0125,
          lng: 135.7708,
          confirmationCode: 'RC-KYO-5512',
          cost: 1200,
          currency: 'USD',
          status: 'confirmed',
          notes: 'Auto-parsed from PDF invoice. Confirmation ref verified.'
        });
      }
    }, 1800);
  };

  const handleCommit = () => {
    if (scannedResult) {
      onAddExtractedItem(scannedResult as ItineraryItem);
      onClose();
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAlias);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSimulateEmailForward = () => {
    setEmailSimulationSent(true);
    setTimeout(() => {
      onAddExtractedItem({
        id: `email-${Date.now()}`,
        tripId: 'trip-tokyo-live',
        dayNumber: 3,
        time: '11:00',
        endTime: '12:30',
        type: 'dining',
        title: 'Kikunoi Roan Kaiseki (2 Michelin Stars)',
        location: 'Shimogawara, Higashiyama Ward, Kyoto',
        city: 'Kyoto',
        lat: 35.0011,
        lng: 135.7794,
        confirmationCode: 'OPEN-TABLE-8871',
        cost: 280,
        currency: 'USD',
        status: 'confirmed',
        notes: 'Ingested via trips.alex@aetheria.os inbox parsing engine.'
      });
      setEmailSimulationSent(false);
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-obsidian-950 border border-cyan-500/50 shadow-cyan-lg overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-obsidian-900">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <UploadCloud className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Zero-Friction Ingestion Engine</h3>
              <p className="text-xs text-white/50">Eliminate manual data entry via smart OCR or inbox forwarding</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Smart OCR vs. Email Parsing */}
        <div className="flex border-b border-white/10 bg-obsidian-900/50">
          <button
            onClick={() => setActiveTab('ocr')}
            className={`flex-1 py-3 px-4 text-xs font-mono font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'ocr'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-500/10'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Scan className="w-4 h-4" />
            <span>Smart OCR Dropzone</span>
          </button>

          <button
            onClick={() => setActiveTab('email')}
            className={`flex-1 py-3 px-4 text-xs font-mono font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'email'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-500/10'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Dedicated Email Parsing Alias</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
          
          {/* TAB 1: Smart OCR Scanner */}
          {activeTab === 'ocr' && (
            <div className="space-y-4">
              
              {/* Drag and Drop Zone */}
              <div className="relative border-2 border-dashed border-cyan-500/40 rounded-xl p-6 text-center bg-obsidian-900/40 hover:border-cyan-400 transition-colors overflow-hidden group">
                
                {/* Laser Scanning Animation when processing */}
                {isScanning && (
                  <div className="absolute inset-0 bg-cyan-500/10 flex flex-col items-center justify-center z-10">
                    <div className="w-full h-1 bg-cyan-400 shadow-cyan-md animate-scanline absolute top-0" />
                    <div className="font-mono text-xs font-bold text-cyan-300 animate-pulse">
                      PARSING NEURAL OCR DATA FIELDS...
                    </div>
                  </div>
                )}

                <UploadCloud className="w-10 h-10 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-sm font-semibold text-white">Drag & drop physical ticket or PDF invoice here</div>
                <div className="text-xs text-white/50 mt-1">Supports PDF, PNG, JPEG, Apple Wallet pkpass</div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => handleSimulateOCR('flight')}
                    disabled={isScanning}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-all"
                  >
                    Sample Boarding Pass (PDF)
                  </button>
                  <button
                    onClick={() => handleSimulateOCR('hotel')}
                    disabled={isScanning}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-all"
                  >
                    Sample Hotel Confirmation
                  </button>
                </div>
              </div>

              {/* Extracted Fields Preview */}
              {scannedResult && (
                <div className="p-4 rounded-xl bg-obsidian-900 border border-cyan-400/50 shadow-cyan-sm space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span>EXTRACTION SUCCESSFUL // 99.4% CONFIDENCE</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 uppercase">
                      {scannedResult.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                    <div className="p-2 rounded bg-obsidian-950 border border-white/10">
                      <div className="text-[10px] text-white/50">ITEM</div>
                      <div className="text-white font-bold truncate">{scannedResult.title}</div>
                    </div>
                    <div className="p-2 rounded bg-obsidian-950 border border-white/10">
                      <div className="text-[10px] text-white/50">PNR / REF</div>
                      <div className="text-cyan-400 font-bold">{scannedResult.confirmationCode}</div>
                    </div>
                    <div className="p-2 rounded bg-obsidian-950 border border-white/10">
                      <div className="text-[10px] text-white/50">TIME / DAY</div>
                      <div className="text-white font-bold">{scannedResult.time} (Day {scannedResult.dayNumber})</div>
                    </div>
                    <div className="p-2 rounded bg-obsidian-950 border border-white/10">
                      <div className="text-[10px] text-white/50">GATE / SEAT</div>
                      <div className="text-white font-bold">{scannedResult.gate || 'N/A'} • {scannedResult.seat || 'N/A'}</div>
                    </div>
                  </div>

                  <button
                    onClick={handleCommit}
                    className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs transition-all shadow-cyan-sm flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Commit & Add to Timeline Without Typing</span>
                  </button>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: Email Integration */}
          {activeTab === 'email' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-obsidian-900 border border-white/10 space-y-3">
                <div className="text-xs font-semibold text-white">Your Personal Auto-Ingest Alias:</div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-obsidian-950 border border-cyan-500/40">
                  <span className="font-mono text-xs text-cyan-300">{emailAlias}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 text-xs font-mono text-white/70 hover:text-white transition-colors"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <p className="text-xs text-white/60 leading-relaxed">
                  Forward any airline, hotel, train, or restaurant confirmation email directly to your alias. 
                  Our background worker parses booking codes, dates, and gates instantly.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-900 border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Test Real-Time Simulation</div>
                  <div className="text-[11px] text-white/50">Trigger a simulated inbound reservation email</div>
                </div>
                <button
                  onClick={handleSimulateEmailForward}
                  disabled={emailSimulationSent}
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold transition-all shadow-cyan-sm flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{emailSimulationSent ? 'Receiving & Parsing...' : 'Send Test Booking'}</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
