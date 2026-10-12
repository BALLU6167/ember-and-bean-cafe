import React, { useRef, useState, useEffect } from 'react';
import { AtelierScrollyCanvas } from '../components/scrollytelling/AtelierScrollyCanvas';
import { AtelierScrollyOverlay } from '../components/scrollytelling/AtelierScrollyOverlay';
import { TASTING_FLIGHTS, ORIGIN_ESTATES, EXTRACTION_SPECS } from '../data/atelierData';
import { AtelierPage } from '../types/atelier';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Award, 
  Compass, 
  ShieldCheck, 
  Flame, 
  ExternalLink, 
  Instagram,
  X,
  CheckCircle,
  Calendar,
  Clock,
  Users,
  MessageSquare
} from 'lucide-react';

interface AtelierHomePageProps {
  onNavigate: (page: AtelierPage) => void;
  onOpenReservation: () => void;
  onOpenMenu: () => void;
}

export const AtelierHomePage: React.FC<AtelierHomePageProps> = ({
  onNavigate,
  onOpenReservation,
  onOpenMenu,
}) => {
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Reservation Modal State
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedFlightName, setSelectedFlightName] = useState(TASTING_FLIGHTS[0]?.name || 'Imperial Geisha Omakase');
  const [guestCount, setGuestCount] = useState(2);
  const [resDate, setResDate] = useState('2026-10-20');
  const [resTime, setResTime] = useState('11:00 AM');
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const handleOpenReservation = (flightName?: string) => {
    if (flightName) {
      setSelectedFlightName(flightName);
    }
    setIsReservationOpen(true);
    setIsBookingConfirmed(false);
  };

  const handleInternalNav = (sectionKey: string) => {
    if (sectionKey === 'home') {
      onNavigate('home');
      return;
    }
    const el = document.getElementById(sectionKey);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionKey === 'philosophy') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionKey === 'the-roast') {
      const roastEl = document.getElementById('extraction-engine');
      if (roastEl) roastEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate(sectionKey as AtelierPage);
    }
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingConfirmed(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollTrackRef.current) return;
      const rect = scrollTrackRef.current.getBoundingClientRect();
      const totalScrollable = scrollTrackRef.current.clientHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const currentScroll = -rect.top;
      const p = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setScrollProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#060504] text-[#F5F2EB] selection:bg-[#C6A15B] selection:text-[#060504]">
      {/* ========================================================
          1. STICKY 500VH SCROLLYTELLING CANVAS SECTION
          ======================================================== */}
      <section ref={scrollTrackRef} className="relative h-[480vh] w-full">
        {/* Sticky Viewport Container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Hardware-Accelerated 192-Frame Canvas Sequence */}
          <AtelierScrollyCanvas progress={scrollProgress} />

          {/* 5-Stage Editorial Overlay */}
          <AtelierScrollyOverlay
            progress={scrollProgress}
            onOpenReservation={() => handleOpenReservation()}
            onOpenMenu={onOpenMenu}
            onOpenEngine={() => handleInternalNav('extraction-engine')}
            onOpenOrigins={() => handleInternalNav('origins')}
          />
        </div>
      </section>

      {/* ========================================================
          2. THE MASTER ARCHITECTURAL EXTRACTION ENGINE
          ======================================================== */}
      <section id="extraction-engine" className="relative z-10 py-32 bg-[#060504] border-t border-[#C6A15B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
            <div className="max-w-2xl">
              <span className="text-[11px] uppercase tracking-[0.3em] font-mono text-[#C6A15B] font-bold block mb-3">
                MATERIAL INTEGRITY · ENGINEERED DOWN TO THE MICRON
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#F5F2EB] tracking-tight leading-tight">
                The Anatomy of the Atelier Brewer.
              </h2>
            </div>
            <button
              onClick={() => handleInternalNav('extraction-engine')}
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#C6A15B] hover:text-[#E58A2B] flex items-center gap-2 transition-colors cursor-pointer group"
            >
              <span>Full Engineering Dossier</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* 4 Extraction Specs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXTRACTION_SPECS.map((spec, idx) => (
              <div
                key={idx}
                className="bg-[#0C0A09]/90 border border-[#C6A15B]/20 hover:border-[#C6A15B]/60 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group shadow-2xl"
              >
                <div>
                  <span className="font-mono text-[10px] text-[#C6A15B] tracking-widest uppercase block mb-3">
                    PART 0{idx + 1}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#F5F2EB] group-hover:text-[#C6A15B] transition-colors mb-2">
                    {spec.component}
                  </h3>
                  <div className="space-y-1.5 text-xs text-[#E8E3D9]/60 font-light mb-4">
                    <p><span className="text-[#C6A15B] font-mono">Material:</span> {spec.material}</p>
                    <p><span className="text-[#C6A15B] font-mono">Tolerance:</span> {spec.tolerance}</p>
                  </div>
                  <p className="text-xs text-[#E8E3D9]/70 font-light leading-relaxed border-t border-[#C6A15B]/15 pt-4">
                    {spec.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. TASTING FLIGHTS SHOWCASE
          ======================================================== */}
      <section id="tasting-flights" className="relative z-10 py-32 bg-[#0C0A09] border-t border-[#C6A15B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[11px] uppercase tracking-[0.3em] font-mono text-[#C6A15B] font-bold block mb-3">
              HAUTE GASTRONOMY · OMAKASE SERVICE
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#F5F2EB] tracking-tight">
              Bespoke Tasting Flights
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#E8E3D9]/60 font-light leading-relaxed">
              Experience the nuances of micro-lot terroirs extracted through three sequential temperature stages. Available strictly by reservation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TASTING_FLIGHTS.map((flight) => (
              <div
                key={flight.id}
                className="bg-[#060504] border border-[#C6A15B]/30 hover:border-[#E58A2B] rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group shadow-2xl relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className="px-3 py-1 rounded-full bg-[#C6A15B]/10 border border-[#C6A15B]/30 text-[10px] font-mono text-[#C6A15B] uppercase tracking-wider">
                      {flight.coursesCount} Courses · {flight.durationMinutes} Mins
                    </span>
                    <span className="font-mono text-xl font-bold text-[#F5F2EB]">
                      ₹{flight.priceInr}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-[#F5F2EB] group-hover:text-[#C6A15B] transition-colors">
                    {flight.name}
                  </h3>
                  <span className="text-xs font-mono text-[#E58A2B] block mt-1">
                    {flight.subtitle}
                  </span>

                  <p className="text-xs text-[#E8E3D9]/70 font-light leading-relaxed mt-4">
                    {flight.description}
                  </p>

                  {/* Tasting Notes */}
                  <div className="mt-6 pt-4 border-t border-[#C6A15B]/15">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#C6A15B] block mb-2">
                      Sensory Spectrum
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {flight.tastingNotes.map((note, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-[#14100D] border border-[#C6A15B]/20 text-[11px] text-[#E8E3D9]/80"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#C6A15B]/20">
                  <button
                    onClick={() => handleOpenReservation(flight.name)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C6A15B] to-[#E58A2B] hover:from-[#DFB17B] hover:to-[#C6A15B] text-[#060504] font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg hover:scale-102"
                  >
                    Reserve Flight
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. SINGLE-ESTATE VOLCANIC TERROIR PREVIEW
          ======================================================== */}
      <section id="origins" className="relative z-10 py-32 bg-[#060504] border-t border-[#C6A15B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
            <div>
              <span className="text-[11px] uppercase tracking-[0.3em] font-mono text-[#C6A15B] font-bold block mb-3">
                DIRECT TRADE · VOLCANIC ELEVATION
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#F5F2EB] tracking-tight leading-tight">
                Single-Estate Allocations.
              </h2>
            </div>
            <button
              onClick={() => handleInternalNav('origins')}
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#C6A15B] hover:text-[#E58A2B] flex items-center gap-2 transition-colors cursor-pointer group"
            >
              <span>Explore All Terroirs</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ORIGIN_ESTATES.map((estate) => (
              <div
                key={estate.id}
                className="bg-[#0C0A09] border border-[#C6A15B]/25 hover:border-[#C6A15B]/60 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group shadow-2xl"
              >
                <div className="relative h-64 overflow-hidden bg-[#060504]">
                  <img
                    src={estate.image}
                    alt={estate.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09] via-transparent to-transparent opacity-90" />
                  <span className="absolute bottom-4 left-4 font-mono text-xs text-[#C6A15B] bg-[#060504]/80 px-3 py-1 rounded-full border border-[#C6A15B]/30 backdrop-blur-md">
                    {estate.altitudeMeters}m Elevation
                  </span>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#C6A15B] uppercase tracking-widest block mb-1">
                      {estate.region}, {estate.country}
                    </span>
                    <h3 className="font-serif font-bold text-2xl text-[#F5F2EB] group-hover:text-[#C6A15B] transition-colors">
                      {estate.name}
                    </h3>
                    <p className="text-xs text-[#E8E3D9]/70 font-light mt-3 leading-relaxed">
                      {estate.curatorNotes}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#C6A15B]/15 flex flex-wrap gap-1.5">
                    {estate.sensoryNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#14100D] border border-[#C6A15B]/20 text-[10px] text-[#E8E3D9]/70 font-mono"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. LUXURY ATELIER FOOTER
          ======================================================== */}
      <footer className="relative z-10 bg-[#040302] border-t border-[#C6A15B]/30 pt-20 pb-12 text-[#E8E3D9]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#C6A15B]/15">
            {/* Col 1: Brand & Instagram */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0C0A09] border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] font-serif font-bold text-sm">
                  珈
                </div>
                <span className="font-serif font-bold text-xl tracking-[0.2em] text-[#F5F2EB] uppercase">
                  ATELIER KŌHĪ
                </span>
              </div>
              <p className="text-xs font-light leading-relaxed max-w-sm text-[#E8E3D9]/60">
                An architectural sanctuary for slow extraction, micro-lot direct trade, and precision thermodynamics in Jubilee Hills, Hyderabad.
              </p>

              {/* Instagram link pointing directly to requested account */}
              <div className="pt-2">
                <a
                  href="https://www.instagram.com/zen_v_cafe_01/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0C0A09] border border-[#C6A15B]/40 text-[#C6A15B] text-xs font-mono uppercase tracking-widest hover:border-[#E58A2B] hover:text-[#F5F2EB] transition-all"
                >
                  <Instagram className="w-4 h-4 text-[#C6A15B]" />
                  <span>@zen_v_cafe_01</span>
                </a>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="space-y-3 text-xs">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C6A15B] block font-bold">
                EXPLORE ATELIER
              </span>
              <ul className="space-y-2.5 font-light">
                <li>
                  <button onClick={() => handleInternalNav('philosophy')} className="hover:text-[#F5F2EB] transition-colors cursor-pointer text-left">
                    Philosophy & Wabi-Sabi
                  </button>
                </li>
                <li>
                  <button onClick={() => handleInternalNav('the-roast')} className="hover:text-[#F5F2EB] transition-colors cursor-pointer text-left">
                    Thermodynamic Roastery
                  </button>
                </li>
                <li>
                  <button onClick={() => handleInternalNav('extraction-engine')} className="hover:text-[#F5F2EB] transition-colors cursor-pointer text-left">
                    Extraction Engine Specs
                  </button>
                </li>
                <li>
                  <button onClick={() => handleInternalNav('origins')} className="hover:text-[#F5F2EB] transition-colors cursor-pointer text-left">
                    Single-Estate Origins
                  </button>
                </li>
                <li>
                  <button onClick={onOpenMenu} className="hover:text-[#F5F2EB] transition-colors cursor-pointer text-left">
                    Seasonal Gastronomy Menu
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Experiences */}
            <div className="space-y-3 text-xs">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C6A15B] block font-bold">
                EXPERIENCES
              </span>
              <ul className="space-y-2.5 font-light">
                <li>
                  <button onClick={() => handleOpenReservation('Bespoke Tasting Flight')} className="hover:text-[#F5F2EB] transition-colors cursor-pointer text-left">
                    Book Tasting Flight
                  </button>
                </li>
                <li>
                  <button onClick={() => handleOpenReservation('Private Omakase Table')} className="hover:text-[#F5F2EB] transition-colors cursor-pointer text-left">
                    Private Omakase Table
                  </button>
                </li>
                <li>
                  <button onClick={() => handleOpenReservation('Micro-Lot Sensory Cupping')} className="hover:text-[#F5F2EB] transition-colors cursor-pointer text-left">
                    Micro-Lot Sensory Cupping
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Location & Hours */}
            <div className="space-y-3 text-xs font-light">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C6A15B] block font-bold">
                ATELIER ROASTERY
              </span>
              <p>Plot 42, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033</p>
              <p>Daily: 07:00 – 23:00</p>
              <p className="text-[#C6A15B]">Complimentary Private Valet</p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#E8E3D9]/40">
            <p>© {new Date().getFullYear()} ATELIER KŌHĪ. All rights reserved.</p>
            <p>Architectural Pour-Over System · Engineered Down To The Micron</p>
          </div>
        </div>
      </footer>

      {/* Interactive Tasting Flight & Table Reservation Modal */}
      {isReservationOpen && (
        <div className="fixed inset-0 z-[99990] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative max-w-xl w-full bg-[#0C0A09] border-2 border-[#C6A15B]/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#F5F2EB] my-8">
            <button
              onClick={() => setIsReservationOpen(false)}
              aria-label="Close Reservation Modal"
              className="absolute top-5 right-5 p-2 text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isBookingConfirmed ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#C6A15B]" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C6A15B]">
                    Atelier Kōhī Private Reservation
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F2EB] mb-1">
                  Reserve Tasting Table
                </h3>
                <p className="text-xs text-[#E8E3D9]/70 mb-6 font-light">
                  Seating is allocated for 75 minutes of uninterrupted pour-over ceremony and paired gastronomy.
                </p>

                <form onSubmit={handleReservationSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-wider text-[#C6A15B] block mb-1">
                      Experience Selection
                    </label>
                    <select
                      value={selectedFlightName}
                      onChange={(e) => setSelectedFlightName(e.target.value)}
                      className="w-full bg-[#14100D] border border-[#C6A15B]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#F5F2EB] focus:outline-none focus:border-[#C6A15B]"
                    >
                      {TASTING_FLIGHTS.map((f) => (
                        <option key={f.id} value={f.name}>
                          {f.name} (₹{f.priceInr})
                        </option>
                      ))}
                      <option value="Private Omakase Table">Private Omakase Table (Full Service)</option>
                      <option value="Micro-Lot Sensory Cupping">Micro-Lot Sensory Cupping (Head Roaster)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-mono text-[11px] uppercase tracking-wider text-[#C6A15B] block mb-1">
                        Guests
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full bg-[#14100D] border border-[#C6A15B]/40 rounded-xl px-3 py-2.5 text-xs text-[#F5F2EB] focus:outline-none focus:border-[#C6A15B]"
                      >
                        {[1, 2, 3, 4, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-mono text-[11px] uppercase tracking-wider text-[#C6A15B] block mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={resDate}
                        onChange={(e) => setResDate(e.target.value)}
                        className="w-full bg-[#14100D] border border-[#C6A15B]/40 rounded-xl px-3 py-2 text-xs text-[#F5F2EB] focus:outline-none focus:border-[#C6A15B]"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[11px] uppercase tracking-wider text-[#C6A15B] block mb-1">
                        Seating Time
                      </label>
                      <select
                        value={resTime}
                        onChange={(e) => setResTime(e.target.value)}
                        className="w-full bg-[#14100D] border border-[#C6A15B]/40 rounded-xl px-3 py-2.5 text-xs text-[#F5F2EB] focus:outline-none focus:border-[#C6A15B]"
                      >
                        {['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM'].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="font-mono text-[11px] uppercase tracking-wider text-[#C6A15B] block mb-1">
                        Primary Guest Name
                      </label>
                      <input
                        type="text"
                        required
                        value={resName}
                        onChange={(e) => setResName(e.target.value)}
                        placeholder="e.g. Vikram Sharma"
                        className="w-full bg-[#14100D] border border-[#C6A15B]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#F5F2EB] placeholder-white/30 focus:outline-none focus:border-[#C6A15B]"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[11px] uppercase tracking-wider text-[#C6A15B] block mb-1">
                        WhatsApp Contact
                      </label>
                      <input
                        type="tel"
                        required
                        value={resPhone}
                        onChange={(e) => setResPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#14100D] border border-[#C6A15B]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#F5F2EB] placeholder-white/30 focus:outline-none focus:border-[#C6A15B]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 bg-gradient-to-r from-[#C6A15B] to-[#E58A2B] hover:from-[#DFB17B] hover:to-[#C6A15B] text-[#060504] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl cursor-pointer"
                    >
                      Confirm Reservation Table
                    </button>

                    <a
                      href={`https://wa.me/919876543210?text=${encodeURIComponent(
                        `Hello Atelier Kōhī, I would like to reserve: ${selectedFlightName} for ${guestCount} guests on ${resDate} at ${resTime}. Name: ${resName || 'Guest'}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3.5 bg-[#14100D] border border-emerald-600/40 text-emerald-400 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 hover:bg-emerald-950/30 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Direct</span>
                    </a>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <CheckCircle className="w-14 h-14 text-[#C6A15B] mx-auto mb-3 animate-bounce" />
                <h4 className="font-serif text-2xl font-bold text-[#F5F2EB] mb-1">Reservation Confirmed</h4>
                <p className="text-xs text-[#E8E3D9]/70 mb-4 max-w-sm mx-auto">
                  Your tasting experience for <strong>{selectedFlightName}</strong> has been booked for {guestCount} guests on {resDate} at {resTime}. Booking Code: <strong className="font-mono text-[#C6A15B]">#EB-ATELIER-2026</strong>.
                </p>
                <div className="flex justify-center gap-3">
                  <a
                    href={`https://wa.me/919876543210?text=${encodeURIComponent(
                      `Hello Atelier Kōhī, confirming my booking #EB-ATELIER-2026 for ${selectedFlightName} on ${resDate} at ${resTime}. Name: ${resName}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Send to WhatsApp Concierge</span>
                  </a>
                  <button
                    onClick={() => setIsReservationOpen(false)}
                    className="px-5 py-2.5 bg-[#14100D] border border-[#C6A15B]/40 text-[#C6A15B] font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
