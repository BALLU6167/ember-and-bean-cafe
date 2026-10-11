import React, { useState } from 'react';
import { 
  X, 
  Plane, 
  Hotel, 
  Copy, 
  Check, 
  QrCode, 
  ShieldCheck, 
  WifiOff, 
  Download, 
  Smartphone,
  Share2
} from 'lucide-react';
import { ItineraryItem } from '../types/travel';

interface QuickPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ItineraryItem | null;
}

export const QuickPassModal: React.FC<QuickPassModalProps> = ({
  isOpen,
  onClose,
  item
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !item) return null;

  const handleCopy = () => {
    if (item.confirmationCode) {
      navigator.clipboard.writeText(item.confirmationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Generate simulated barcode bars
  const barcodeBars = [
    3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 3, 2, 1, 4, 2, 3, 1, 4
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-obsidian-950 border border-cyan-400/60 shadow-cyan-lg overflow-hidden">
        
        {/* Top Resilience Guarantee Bar */}
        <div className="bg-cyan-500 text-black px-4 py-2 flex items-center justify-between font-mono text-xs font-bold">
          <div className="flex items-center gap-1.5">
            <WifiOff className="w-3.5 h-3.5" />
            <span>OFFLINE CACHED PASS // ZERO-LATENCY ACCESS</span>
          </div>
          <button 
            onClick={onClose} 
            className="text-black/70 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Boarding Pass Body (Aerospace Boarding Pass Aesthetic) */}
        <div className="p-6 space-y-6">
          
          {/* Header section with Airline/Vendor & PNR */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-cyan-400" />
                <span className="font-mono text-xs text-white/50 tracking-widest uppercase">BOARDING DOCUMENT</span>
              </div>
              <h2 className="text-xl font-extrabold text-white mt-1 tracking-tight">{item.title}</h2>
              <p className="text-xs text-white/70">{item.location}</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-white/40 block">BOOKING REF (PNR)</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-obsidian-900 border border-cyan-400/40 text-cyan-300 font-mono text-sm font-bold hover:border-cyan-400 transition-all mt-0.5"
                title="Click to copy confirmation code"
              >
                <span>{item.confirmationCode || 'CONFIRMED'}</span>
                {copied ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5 text-white/60" />}
              </button>
            </div>
          </div>

          {/* Critical Flight Grid (Gate, Terminal, Seat, Time) */}
          <div className="grid grid-cols-4 gap-3 p-4 rounded-xl bg-obsidian-900 border border-white/10 text-center font-mono">
            <div>
              <div className="text-[10px] text-white/40">GATE</div>
              <div className="text-xl font-extrabold text-cyan-400 mt-0.5">{item.gate || 'B48'}</div>
            </div>
            <div>
              <div className="text-[10px] text-white/40">TERM</div>
              <div className="text-xl font-extrabold text-white mt-0.5">{item.terminal || 'T1'}</div>
            </div>
            <div>
              <div className="text-[10px] text-white/40">SEAT</div>
              <div className="text-xl font-extrabold text-cyan-400 mt-0.5">{item.seat || '12K'}</div>
            </div>
            <div>
              <div className="text-[10px] text-white/40">BOARD</div>
              <div className="text-xl font-extrabold text-white mt-0.5">{item.time}</div>
            </div>
          </div>

          {/* High-Contrast Scannable Barcode & QR Code Section */}
          <div className="p-4 rounded-xl bg-white text-black text-center space-y-3">
            
            {/* High Contrast Barcode Representation */}
            <div className="flex items-center justify-center gap-1 h-14 overflow-hidden px-2">
              {barcodeBars.map((width, idx) => (
                <div 
                  key={idx} 
                  className="bg-black h-full"
                  style={{ width: `${width * 2}px` }}
                />
              ))}
            </div>
            
            <div className="font-mono text-[10px] text-neutral-800 tracking-widest font-bold">
              {item.offlineBarcode || `P//${item.confirmationCode}//006//VANCE/ALEX`}
            </div>

            {/* Scannable Aztec / QR Code Center */}
            <div className="pt-2 border-t border-neutral-200 flex items-center justify-center gap-4">
              <div className="p-2 border border-black rounded bg-white">
                <QrCode className="w-16 h-16 text-black" />
              </div>
              <div className="text-left text-xs font-mono text-neutral-800">
                <div className="font-bold">SCANNER READY</div>
                <div className="text-[11px] text-neutral-600">Alex Vance (Lead)</div>
                <div className="text-[10px] text-neutral-500">IATA Standard Compliant</div>
              </div>
            </div>

          </div>

          {/* Bottom Verification Note */}
          <div className="flex items-center justify-between text-xs font-mono text-white/60">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Available offline without cellular data</span>
            </div>
            <button
              onClick={() => alert("Boarding pass exported to local offline wallet.")}
              className="hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save Image</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
