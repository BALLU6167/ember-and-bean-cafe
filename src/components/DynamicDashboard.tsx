import React, { useState, useEffect } from 'react';
import { 
  Plane, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  QrCode, 
  PhoneCall, 
  ShieldAlert, 
  Luggage, 
  Receipt, 
  Share2, 
  Download, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  PlusCircle,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Trip, ItineraryItem, PackingItem, ExpenseItem } from '../types/travel';

interface DynamicDashboardProps {
  trip: Trip;
  onOpenQuickPass: (item?: ItineraryItem) => void;
  onTogglePackingItem: (itemId: string) => void;
  onSelectItineraryItem: (item: ItineraryItem) => void;
}

export const DynamicDashboard: React.FC<DynamicDashboardProps> = ({
  trip,
  onOpenQuickPass,
  onTogglePackingItem,
  onSelectItineraryItem
}) => {
  // Live countdown timer for active / pre-trip
  const [countdown, setCountdown] = useState<number>(trip.flightCountdownSeconds || 7200);
  const [activeEmergency, setActiveEmergency] = useState(false);

  useEffect(() => {
    setCountdown(trip.flightCountdownSeconds || 7200);
  }, [trip]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSeconds: number) => {
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds };
  };

  const timeUnits = formatCountdown(countdown);

  // Find next upcoming event for In-Trip
  const nextEvent = trip.itinerary[0];

  // Packing list stats for Pre-Trip
  const totalPacking = trip.packingList.length;
  const packedCount = trip.packingList.filter(p => p.packed).length;
  const packingProgress = totalPacking > 0 ? Math.round((packedCount / totalPacking) * 100) : 100;

  // Expense split calculations for Post-Trip
  const totalSpend = trip.expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const numTravelers = trip.travelers.length || 1;
  const perPersonShare = Math.round(totalSpend / numTravelers);

  return (
    <div className="w-full mb-8">
      {/* ========================================================================= */}
      {/* 1. IN-TRIP ACTIVE MODE: Pinned Next Immediate Event & Emergency Telemetry */}
      {/* ========================================================================= */}
      {trip.status === 'in-trip' && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-obsidian-900 to-[#050811] border border-cyan-500/40 p-5 sm:p-6 shadow-cyan-md">
          {/* Subtle Cyber Grid Background */}
          <div className="absolute inset-0 bg-telemetry-grid opacity-30 pointer-events-none" />
          
          {/* Top Live Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="font-mono text-xs font-bold tracking-widest text-cyan-400 uppercase">
                ACTIVE IN-TRANSIT TELEMETRY // NEXT IMMEDIATE ACTION
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveEmergency(!activeEmergency)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/20 text-xs font-mono text-white transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                <span>Emergency Speed-Dial</span>
              </button>
            </div>
          </div>

          {/* Emergency Speed Dial Drawer (Expands on click) */}
          {activeEmergency && (
            <div className="relative z-10 my-4 p-4 rounded-xl bg-obsidian-950/90 border border-cyan-500/50 animate-fade-in">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                  <ShieldAlert className="w-4 h-4 text-cyan-400" />
                  <span>LOCAL EMERGENCY & CONSULAR DISPATCH ({trip.country.toUpperCase()})</span>
                </div>
                <button onClick={() => setActiveEmergency(false)} className="text-white/40 hover:text-white text-xs font-mono">Dismiss</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {trip.emergencyContacts.map((contact, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-obsidian-900 border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">{contact.label}</div>
                      <div className="text-[11px] text-white/50">{contact.detail}</div>
                    </div>
                    <a 
                      href={`tel:${contact.value}`}
                      className="mt-2 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold hover:bg-cyan-500 hover:text-black transition-all"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>{contact.value}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Pinned Event Card */}
          {nextEvent && (
            <div className="relative z-10 mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Event Details Left Column */}
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 border border-cyan-400/40 font-mono text-[11px] text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Plane className="w-3 h-3" />
                    DEPARTING IN {timeUnits.hours}H {timeUnits.minutes}M {timeUnits.seconds}S
                  </span>
                  <span className="text-xs font-mono text-white/60">
                    GATE {nextEvent.gate || 'TBD'} • SEAT {nextEvent.seat || '12K'}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {nextEvent.title}
                  </h2>
                  <p className="text-sm text-white/70 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>{nextEvent.location}</span>
                  </p>
                </div>

                {nextEvent.urgentAlert && (
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center gap-2 text-xs font-mono text-cyan-300">
                    <AlertTriangle className="w-4 h-4 text-cyan-400 flex-shrink-0 animate-pulse" />
                    <span>{nextEvent.urgentAlert}</span>
                  </div>
                )}
              </div>

              {/* Instant 1-Tap Boarding Pass Callout Right Column */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <button
                  onClick={() => onOpenQuickPass(nextEvent)}
                  className="group relative p-4 rounded-xl bg-obsidian-950 border border-cyan-500/50 hover:border-cyan-400 transition-all text-left flex items-center justify-between shadow-cyan-sm hover:shadow-cyan-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-cyan-500 text-black flex items-center justify-center font-mono font-bold group-hover:scale-105 transition-transform">
                      <QrCode className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-cyan-400 tracking-wider">OFFLINE BARCODE</div>
                      <div className="text-sm font-bold text-white">Tap to Reveal Pass</div>
                      <div className="text-[10px] text-white/50 font-mono">PNR: {nextEvent.confirmationCode}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. PRE-TRIP MODE: Live Countdown Clock & Smart Packing Checklist */}
      {/* ========================================================================= */}
      {trip.status === 'pre-trip' && (
        <div className="rounded-2xl bg-obsidian-900 border border-cyan-500/30 p-5 sm:p-6 shadow-cyan-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Countdown Clock Display */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-xs font-bold tracking-widest text-cyan-400 uppercase">
                  EXPEDITION COUNTDOWN // DEPARTURE IMMINENT
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {trip.title}
              </h2>

              {/* Ticking Digital Clocks */}
              <div className="grid grid-cols-4 gap-2.5 max-w-md">
                {[
                  { label: 'DAYS', val: String(timeUnits.days).padStart(2, '0') },
                  { label: 'HOURS', val: String(timeUnits.hours).padStart(2, '0') },
                  { label: 'MINS', val: String(timeUnits.minutes).padStart(2, '0') },
                  { label: 'SECS', val: String(timeUnits.seconds).padStart(2, '0') }
                ].map((unit, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-obsidian-950 border border-white/10 text-center">
                    <div className="font-mono text-2xl sm:text-3xl font-extrabold text-cyan-400 tracking-wider">
                      {unit.val}
                    </div>
                    <div className="text-[10px] font-mono text-white/50 mt-0.5">{unit.label}</div>
                  </div>
                ))}
              </div>

              {/* Missing Booking Alert */}
              <div className="p-3 rounded-xl bg-white/5 border border-cyan-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <AlertTriangle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Missing Day 3 Mountain Transfer in Zermatt detected.</span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400 underline cursor-pointer hover:text-cyan-300">
                  Auto-Resolve
                </span>
              </div>
            </div>

            {/* Smart Interactive Packing Checklist */}
            <div className="lg:col-span-6 p-4 rounded-xl bg-obsidian-950 border border-white/10">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Luggage className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold tracking-wider text-white">SMART PACKING LIST</span>
                </div>
                <span className="font-mono text-xs text-cyan-400">
                  {packedCount}/{totalPacking} ({packingProgress}%)
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden my-3">
                <div 
                  className="bg-cyan-400 h-full rounded-full transition-all duration-500 shadow-cyan-sm"
                  style={{ width: `${packingProgress}%` }}
                />
              </div>

              {/* Checklist Items */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {trip.packingList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onTogglePackingItem(item.id)}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                      item.packed
                        ? 'bg-white/5 border-white/5 text-white/40 line-through'
                        : 'bg-obsidian-900 border-white/10 text-white hover:border-cyan-400/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                        item.packed ? 'bg-cyan-500 border-cyan-400 text-black' : 'border-white/30'
                      }`}>
                        {item.packed && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span>{item.item}</span>
                    </div>
                    {item.critical && !item.packed && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 uppercase">
                        Critical
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. POST-TRIP MODE: Memory Book & Real-Time Group Expense Split Engine */}
      {/* ========================================================================= */}
      {trip.status === 'post-trip' && (
        <div className="rounded-2xl bg-obsidian-900 border border-cyan-500/30 p-5 sm:p-6 shadow-cyan-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="font-mono text-xs font-bold tracking-widest text-cyan-400 uppercase">
                EXPEDITION ARCHIVE // MEMORY LOG & RECONCILIATION
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                {trip.title}
              </h2>
            </div>

            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => alert(`Exporting ${trip.title} formatted expense ledger as CSV / PDF.`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-all"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Export Ledger</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
            
            {/* Left: Memory Book Highlights */}
            <div className="lg:col-span-6 space-y-3">
              <div className="text-xs font-mono text-white/50 tracking-wider">CURATED MOMENTS & ARCHIVED LOGS</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-obsidian-950 border border-white/10">
                  <div className="text-xs font-semibold text-white">Private Yacht to Capri</div>
                  <div className="text-[11px] text-white/50 mt-1">Faraglioni Rocks & Green Cave navigation</div>
                  <div className="mt-2 font-mono text-[10px] text-cyan-400">Day 2 • 10:00 AM</div>
                </div>
                <div className="p-3.5 rounded-xl bg-obsidian-950 border border-white/10">
                  <div className="text-xs font-semibold text-white">Villa Cimbrone Concert</div>
                  <div className="text-[11px] text-white/50 mt-1">Cliffside orchestral chamber performance</div>
                  <div className="mt-2 font-mono text-[10px] text-cyan-400">Day 3 • 18:30 PM</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-white">3 High-Resolution Itinerary Logs & Tickets Saved Locally</span>
                </div>
                <span className="text-xs font-mono text-cyan-400 font-bold">100% Cached</span>
              </div>
            </div>

            {/* Right: Group Split-Expense Tracking Engine */}
            <div className="lg:col-span-6 p-4 rounded-xl bg-obsidian-950 border border-white/10">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold tracking-wider text-white">GROUP EXPENSE SPLIT</span>
                </div>
                <div className="font-mono text-xs text-cyan-400 font-bold">
                  Total: ${totalSpend.toLocaleString()} USD
                </div>
              </div>

              <div className="my-3 text-xs text-white/70 flex justify-between">
                <span>Split between {numTravelers} travelers:</span>
                <span className="font-mono text-cyan-300 font-semibold">${perPersonShare.toLocaleString()} / person</span>
              </div>

              {/* Debt Settlement Matrix */}
              <div className="space-y-2">
                {trip.expenses.map((exp) => (
                  <div key={exp.id} className="p-2.5 rounded-lg bg-obsidian-900 border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-white font-medium">{exp.description}</div>
                      <div className="text-[10px] text-white/50 font-mono">Paid by {exp.paidBy}</div>
                    </div>
                    <div className="text-right font-mono font-bold text-cyan-400">
                      ${exp.amount}
                    </div>
                  </div>
                ))}
              </div>

              {/* Automated Settlement Summary */}
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-white/60">Settlement Status:</span>
                <span className="text-cyan-300">Simplified 3 transfers to settle</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
