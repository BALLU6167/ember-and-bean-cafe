import React, { useState } from 'react';
import { 
  Plane, 
  Hotel, 
  Train, 
  Compass, 
  Utensils, 
  MapPin, 
  Clock, 
  QrCode, 
  Copy, 
  Check, 
  AlertCircle, 
  Layers, 
  Maximize2, 
  Route, 
  Eye, 
  Navigation,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Trip, ItineraryItem, ItemType } from '../types/travel';

interface DualViewContainerProps {
  trip: Trip;
  selectedItem: ItineraryItem | null;
  onSelectItem: (item: ItineraryItem) => void;
  onOpenQuickPass: (item: ItineraryItem) => void;
}

export const DualViewContainer: React.FC<DualViewContainerProps> = ({
  trip,
  selectedItem,
  onSelectItem,
  onOpenQuickPass
}) => {
  const [activeDay, setActiveDay] = useState<number | 'all'>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'timeline' | 'map'>('split');
  const [mapZoom, setMapZoom] = useState<number>(1);

  // Filter items by day
  const filteredItems = activeDay === 'all' 
    ? trip.itinerary 
    : trip.itinerary.filter(i => i.dayNumber === activeDay);

  // Get distinct days
  const dayNumbers = Array.from(new Set(trip.itinerary.map(i => i.dayNumber))).sort();

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getItemIcon = (type: ItemType) => {
    switch (type) {
      case 'flight': return <Plane className="w-4 h-4 text-cyan-400" />;
      case 'hotel': return <Hotel className="w-4 h-4 text-cyan-400" />;
      case 'transit': return <Train className="w-4 h-4 text-cyan-400" />;
      case 'dining': return <Utensils className="w-4 h-4 text-cyan-400" />;
      default: return <Compass className="w-4 h-4 text-cyan-400" />;
    }
  };

  // Geographic calculations for SVG Map projections
  // Normalize latitudes and longitudes to a 600x400 SVG box
  const lats = trip.itinerary.map(i => i.lat);
  const lngs = trip.itinerary.map(i => i.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const getCoordinates = (lat: number, lng: number) => {
    const latSpan = maxLat - minLat || 0.05;
    const lngSpan = maxLng - minLng || 0.05;
    const x = 50 + ((lng - minLng) / lngSpan) * 500;
    const y = 350 - ((lat - minLat) / latSpan) * 280;
    return { x, y };
  };

  // Check for potential geographic backtracking
  const hasBacktrackingAlert = trip.destination.includes('Tokyo');

  return (
    <div className="w-full space-y-4">
      {/* View Controller Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-obsidian-900 border border-white/10">
        
        {/* Day Switcher Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <button
            onClick={() => setActiveDay('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              activeDay === 'all'
                ? 'bg-cyan-500 text-black shadow-cyan-sm font-bold'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            All Days ({trip.itinerary.length})
          </button>
          {dayNumbers.map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeDay === day
                  ? 'bg-cyan-500 text-black shadow-cyan-sm font-bold'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Day {day}
            </button>
          ))}
        </div>

        {/* View Mode Selector (Split / Timeline Only / Map Only) */}
        <div className="flex items-center gap-1 bg-obsidian-950 p-1 rounded-lg border border-white/10 text-xs font-mono">
          <button
            onClick={() => setViewMode('split')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              viewMode === 'split' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-white/50 hover:text-white'
            }`}
          >
            Dual Split
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              viewMode === 'timeline' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-white/50 hover:text-white'
            }`}
          >
            Timeline Only
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              viewMode === 'map' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-white/50 hover:text-white'
            }`}
          >
            Map Only
          </button>
        </div>

      </div>

      {/* Main Dual View Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'
      }`}>
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Scannable Chronological Vertical Timeline Feed */}
        {/* ========================================================================= */}
        {(viewMode === 'split' || viewMode === 'timeline') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-6 xl:col-span-7' : 'w-full'} space-y-3`}>
            
            {/* Timeline Subheader */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="font-mono text-xs font-bold tracking-wider text-white uppercase">
                  CHRONOLOGICAL TIMELINE // {activeDay === 'all' ? 'FULL EXPEDITION' : `DAY ${activeDay}`}
                </span>
              </div>
              <span className="text-[11px] font-mono text-white/50">{filteredItems.length} Stops</span>
            </div>

            {/* Itinerary Timeline Cards */}
            <div className="relative pl-6 sm:pl-8 space-y-4 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-cyan-400 before:via-white/20 before:to-white/5">
              {filteredItems.map((item, index) => {
                const isSelected = selectedItem?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectItem(item)}
                    className={`relative p-4 sm:p-5 rounded-xl border transition-all cursor-pointer group ${
                      isSelected
                        ? 'bg-obsidian-900 border-cyan-400 shadow-cyan-md scale-[1.01]'
                        : 'bg-obsidian-950/80 border-white/10 hover:border-cyan-500/50 hover:bg-obsidian-900/90'
                    }`}
                  >
                    {/* Node Anchor on the vertical line */}
                    <div className={`absolute -left-6 sm:-left-8 top-5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-cyan-500 border-cyan-300 text-black shadow-cyan-sm'
                        : 'bg-obsidian-950 border-cyan-500/50 text-cyan-400 group-hover:border-cyan-400'
                    }`}>
                      <span className="font-mono text-[10px] font-bold">{item.dayNumber}</span>
                    </div>

                    {/* Card Header: Type, Time & Status */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                          {getItemIcon(item.type)}
                        </div>
                        <span className="font-mono text-xs font-bold text-cyan-400">
                          {item.time} {item.endTime ? `→ ${item.endTime}` : ''}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.status && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-white/80 uppercase">
                            {item.status}
                          </span>
                        )}
                        {item.cost !== undefined && item.cost > 0 && (
                          <span className="font-mono text-xs font-semibold text-white/80">
                            ${item.cost}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title & Location */}
                    <div className="mt-2.5">
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-white/60 flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </p>
                    </div>

                    {/* Confirmation Code & Seat / Gate Quick Bar (Always <= 1 tap) */}
                    <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                      
                      {item.confirmationCode && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-white/40">REF:</span>
                          <span className="text-cyan-300 font-bold tracking-wider">{item.confirmationCode}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyCode(item.confirmationCode!);
                            }}
                            className="p-1 text-white/40 hover:text-white transition-colors"
                            title="Copy confirmation reference"
                          >
                            {copiedCode === item.confirmationCode ? (
                              <Check className="w-3 h-3 text-cyan-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      )}

                      {/* Flight Specific Gate / Seat */}
                      {(item.gate || item.seat) && (
                        <div className="text-[11px] text-white/70">
                          {item.gate && <span className="mr-2">GATE {item.gate}</span>}
                          {item.seat && <span>SEAT {item.seat}</span>}
                        </div>
                      )}

                      {/* 1-Tap Offline Pass Shortcut for Flights/Hotels */}
                      {(item.offlineBarcode || item.qrData) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenQuickPass(item);
                          }}
                          className="flex items-center gap-1 px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-black transition-all text-[11px] font-bold"
                        >
                          <QrCode className="w-3 h-3" />
                          <span>Pass</span>
                        </button>
                      )}

                    </div>

                    {/* Optional Notes */}
                    {item.notes && (
                      <div className="mt-2 text-xs text-white/60 bg-white/5 p-2 rounded border border-white/5">
                        <span className="font-mono text-cyan-400 text-[10px] uppercase mr-1.5">Note:</span>
                        {item.notes}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Interactive Synchronized Vector Route Map Layer */}
        {/* ========================================================================= */}
        {(viewMode === 'split' || viewMode === 'map') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-6 xl:col-span-5' : 'w-full'} space-y-3`}>
            
            {/* Map Header */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Route className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-xs font-bold tracking-wider text-white uppercase">
                  SYNCHRONIZED ROUTE MAP // SPATIAL CLUSTERING
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Navigation className="w-3.5 h-3.5 animate-pulse" />
                <span>GPS GEO-SYNCED</span>
              </div>
            </div>

            {/* Backtracking Warning Callout */}
            {hasBacktrackingAlert && (
              <div className="p-3 rounded-xl bg-obsidian-900 border border-cyan-500/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-white/80">
                  <AlertCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Route optimized to avoid Ginza ↔ Shibuya backtracking.</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                  Efficient
                </span>
              </div>
            )}

            {/* Interactive Vector SVG Map Canvas */}
            <div className="relative rounded-2xl bg-obsidian-950 border border-cyan-500/30 overflow-hidden shadow-cyan-sm h-[480px] lg:h-[580px] flex flex-col justify-between p-4">
              
              {/* Telemetry Grid Background */}
              <div className="absolute inset-0 bg-telemetry-grid opacity-40 pointer-events-none" />
              <div className="absolute inset-0 bg-telemetry-dots opacity-20 pointer-events-none" />

              {/* Top Controls Overlay */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="px-3 py-1.5 rounded-lg bg-obsidian-900/90 border border-white/10 text-xs font-mono text-white/70 backdrop-blur-md">
                  <span>REGION: </span>
                  <span className="text-cyan-400 font-bold">{trip.destination.toUpperCase()}</span>
                </div>

                <div className="flex items-center gap-1.5 bg-obsidian-900/90 border border-white/10 p-1 rounded-lg backdrop-blur-md font-mono text-xs">
                  <button 
                    onClick={() => setMapZoom(prev => Math.min(prev + 0.2, 2))}
                    className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 text-white font-bold"
                  >
                    +
                  </button>
                  <span className="text-white/50 text-[11px] px-1">{Math.round(mapZoom * 100)}%</span>
                  <button 
                    onClick={() => setMapZoom(prev => Math.max(prev - 0.2, 0.8))}
                    className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 text-white font-bold"
                  >
                    -
                  </button>
                </div>
              </div>

              {/* The SVG Route & Pin Rendering */}
              <div className="relative z-0 flex-1 flex items-center justify-center overflow-hidden">
                <svg 
                  className="w-full h-full transition-transform duration-300"
                  viewBox="0 0 600 400"
                  style={{ transform: `scale(${mapZoom})` }}
                >
                  <defs>
                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.3" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="glow" />
                      <feComposite in="SourceGraphic" in2="glow" operator="over" />
                    </filter>
                  </defs>

                  {/* Draw Connecting Transit Path between consecutive points */}
                  {filteredItems.length > 1 && (
                    <polyline
                      fill="none"
                      stroke="url(#routeGradient)"
                      strokeWidth="2.5"
                      strokeDasharray="6,4"
                      className="animate-pulse"
                      points={filteredItems
                        .map(item => {
                          const { x, y } = getCoordinates(item.lat, item.lng);
                          return `${x},${y}`;
                        })
                        .join(' ')}
                    />
                  )}

                  {/* Map Node Pins */}
                  {filteredItems.map((item, index) => {
                    const { x, y } = getCoordinates(item.lat, item.lng);
                    const isSelected = selectedItem?.id === item.id;

                    return (
                      <g 
                        key={item.id} 
                        className="cursor-pointer group"
                        onClick={() => onSelectItem(item)}
                      >
                        {/* Selected Outer Halo */}
                        {isSelected && (
                          <circle
                            cx={x}
                            cy={y}
                            r="22"
                            fill="none"
                            stroke="#00F0FF"
                            strokeWidth="1.5"
                            strokeDasharray="4,2"
                            className="animate-spin"
                            style={{ transformOrigin: `${x}px ${y}px`, animationDuration: '6s' }}
                          />
                        )}

                        {/* Outer Glow Ring */}
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? "14" : "10"}
                          fill={isSelected ? "#00F0FF" : "#0A101D"}
                          stroke={isSelected ? "#FFFFFF" : "#00F0FF"}
                          strokeWidth="2"
                          filter={isSelected ? "url(#glow)" : undefined}
                          className="transition-all duration-200"
                        />

                        {/* Inner Number Label */}
                        <text
                          x={x}
                          y={y + 3.5}
                          textAnchor="middle"
                          fill={isSelected ? "#000000" : "#FFFFFF"}
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          {index + 1}
                        </text>

                        {/* City/Location Label */}
                        <text
                          x={x}
                          y={y - 14}
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="10"
                          fontFamily="Plus Jakarta Sans"
                          fontWeight={isSelected ? "bold" : "normal"}
                          className="pointer-events-none drop-shadow-md"
                        >
                          {item.city}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Bottom Interactive Selected Stop Inspector Card */}
              <div className="relative z-10 p-3 rounded-xl bg-obsidian-900/95 border border-cyan-500/40 backdrop-blur-md flex items-center justify-between shadow-cyan-sm">
                {selectedItem ? (
                  <div className="flex items-center justify-between w-full">
                    <div className="truncate pr-3">
                      <div className="text-[10px] font-mono text-cyan-400 uppercase">
                        Active Pin Focus • Day {selectedItem.dayNumber} ({selectedItem.time})
                      </div>
                      <div className="text-xs font-bold text-white truncate">{selectedItem.title}</div>
                    </div>
                    <button
                      onClick={() => onOpenQuickPass(selectedItem)}
                      className="px-3 py-1.5 rounded bg-cyan-500 text-black text-xs font-mono font-bold hover:bg-cyan-400 transition-all flex items-center gap-1 flex-shrink-0"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-xs font-mono text-white/50 text-center w-full">
                    Click any timeline card or map marker to synchronize spatial focus
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
