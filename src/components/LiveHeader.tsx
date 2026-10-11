import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  WifiOff, 
  QrCode, 
  UploadCloud, 
  Bell, 
  Compass, 
  ChevronDown, 
  Plane, 
  CheckCircle2, 
  AlertCircle,
  Radio,
  Clock
} from 'lucide-react';
import { Trip } from '../types/travel';

interface LiveHeaderProps {
  trips: Trip[];
  activeTrip: Trip;
  onSelectTrip: (tripId: string) => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  onOpenQuickPass: () => void;
  onOpenIngestion: () => void;
  onOpenNotifications: () => void;
  unreadAlertCount: number;
}

export const LiveHeader: React.FC<LiveHeaderProps> = ({
  trips,
  activeTrip,
  onSelectTrip,
  isOffline,
  onToggleOffline,
  onOpenQuickPass,
  onOpenIngestion,
  onOpenNotifications,
  unreadAlertCount,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [localTime, setLocalTime] = useState<string>('');

  // Destination live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as 24-hr military/aero format
      setLocalTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#050811]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity & Trip Selector */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <div className="relative w-9 h-9 rounded-lg bg-obsidian-900 border border-cyan-500/50 flex items-center justify-center shadow-cyan-sm transition-all group-hover:border-cyan-400">
              <Compass className="w-5 h-5 text-cyan-400 animate-pulse-glow" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 shadow-cyan-sm animate-ping-slow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs font-bold tracking-widest text-cyan-400">AETHERIA</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-white/70 border border-white/10">OS v2.4</span>
              </div>
              <div className="text-sm font-semibold text-white tracking-tight flex items-center gap-1">
                <span className="truncate max-w-[140px] sm:max-w-[200px]">{activeTrip.destination}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-cyan-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </div>

          {/* Trip Archetype Dropdown Switcher */}
          {dropdownOpen && (
            <div className="absolute top-16 left-4 sm:left-6 w-80 rounded-xl bg-obsidian-900 border border-cyan-500/30 shadow-cyan-md p-2 z-50 animate-fade-in">
              <div className="px-3 py-2 text-[10px] font-mono tracking-wider text-cyan-400/80 uppercase border-b border-white/10 flex justify-between items-center">
                <span>Select Travel Archetype</span>
                <span className="text-white/40">3 Active</span>
              </div>
              <div className="mt-1 space-y-1">
                {trips.map((t) => {
                  const isSelected = t.id === activeTrip.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        onSelectTrip(t.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'bg-cyan-500/15 border border-cyan-400 text-white font-medium' 
                          : 'hover:bg-white/5 text-white/70 border border-transparent'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-cyan-400' : 'bg-white/30'}`} />
                          <span className="font-semibold text-white">{t.destination}</span>
                        </div>
                        <div className="text-[10px] text-white/50 truncate pl-3">{t.title}</div>
                      </div>
                      <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded ${
                        t.status === 'in-trip' ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/30' :
                        t.status === 'pre-trip' ? 'bg-white/10 text-white/80 border border-white/20' :
                        'bg-white/5 text-white/50 border border-white/10'
                      }`}>
                        {t.status.replace('-', ' ')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Center: Live Telemetry Status Clock */}
        <div className="hidden md:flex items-center gap-4 font-mono text-xs text-white/70">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-white/50">DEST TIME:</span>
            <span className="text-cyan-300 font-medium tracking-wider">{localTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-white/60">
            <span>PAX:</span>
            <span className="text-white font-medium">{activeTrip.travelers.length} Confirmed</span>
          </div>
        </div>

        {/* Right: Actions (1-Tap Boarding Pass, Ingest, Offline Resilient Status, Alerts) */}
        <div className="flex items-center gap-2.5">
          
          {/* CRITICAL FEATURE: 1-Tap Offline Boarding Pass & Confirmation Code Access */}
          <button
            onClick={onOpenQuickPass}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-all shadow-cyan-sm hover:shadow-cyan-md active:scale-95"
            title="Immediate 1-tap offline boarding pass & confirmation codes"
          >
            <QrCode className="w-3.5 h-3.5 text-black" />
            <span className="hidden sm:inline">1-Tap Pass</span>
            <span className="sm:hidden">Pass</span>
          </button>

          {/* Zero Friction Ingest: Email & OCR Dropzone Trigger */}
          <button
            onClick={onOpenIngestion}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian-900 hover:bg-obsidian-850 border border-cyan-500/40 text-cyan-300 text-xs font-medium transition-all hover:border-cyan-400"
          >
            <UploadCloud className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Ingest</span>
          </button>

          {/* Offline-First Resilience Indicator & Toggle */}
          <button
            onClick={onToggleOffline}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all ${
              isOffline
                ? 'bg-white/10 border-white/30 text-white shadow-sm'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:border-cyan-400'
            }`}
            title="Toggle simulated offline mode to verify zero-latency local caching"
          >
            {isOffline ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-white/70" />
                <span className="hidden lg:inline text-[11px]">OFFLINE (LOCAL CACHE)</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="hidden lg:inline text-[11px]">LOCAL-FIRST SYNCED</span>
              </>
            )}
          </button>

          {/* High-Utility Notification Drawer Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg bg-obsidian-900 border border-white/10 hover:border-cyan-400 text-white/80 hover:text-white transition-all"
            title="High-utility travel alerts"
          >
            <Bell className="w-4 h-4 text-white" />
            {unreadAlertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 text-black font-mono font-bold text-[10px] flex items-center justify-center shadow-cyan-sm">
                {unreadAlertCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
