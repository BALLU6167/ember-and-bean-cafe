import React, { useState } from 'react';
import { Calendar, Clock, Users, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Award, Coffee } from 'lucide-react';
import { AtelierPage } from '../types/atelier';
import { TASTING_FLIGHTS } from '../data/atelierData';

interface ReservePageProps {
  onNavigate: (page: AtelierPage) => void;
  onOpenFlightModal: () => void;
}

export const ReservePage: React.FC<ReservePageProps> = ({
  onNavigate,
  onOpenFlightModal,
}) => {
  const [selectedFlightId, setSelectedFlightId] = useState<string>(TASTING_FLIGHTS[0].id);
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-12');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('15:00');
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [bookingCode, setBookingCode] = useState<string>('');

  const selectedFlight = TASTING_FLIGHTS.find((f) => f.id === selectedFlightId) || TASTING_FLIGHTS[0];

  const timeSlots = [
    { time: '11:00', label: 'Morning First Extraction (Aromatic Peak)' },
    { time: '13:30', label: 'Midday Terroir Comparative' },
    { time: '16:00', label: 'Golden Hour Omakase Ritual' },
    { time: '18:30', label: 'Twilight Anaerobic Maceration Flight' },
  ];

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `KŌHĪ-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingCode(code);
    setIsBooked(true);
  };

  return (
    <div className="min-h-screen bg-[#060504] text-[#F5F2EB] pt-28 pb-32 selection:bg-[#C6A15B] selection:text-[#060504]">
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C6A15B]/30 bg-[#0C0A09]/80 backdrop-blur-md mb-8">
            <Sparkles className="w-3.5 h-3.5 text-[#E58A2B]" />
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#C6A15B] uppercase font-bold">
              PRIVATE SALON SEATING // STRICTLY LIMITED ALLOCATIONS
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#F5F2EB] leading-[1.05] mb-8">
            Reserve Your Tasting Flight.
          </h1>

          <p className="text-lg sm:text-xl text-[#E8E3D9]/75 font-light leading-relaxed">
            Seating at the Atelier Brew Bar is limited to six guests per session to ensure uninterrupted dialogue with the Head Coffee Sommelier.
          </p>
        </div>
      </section>

      {/* Main Reservation Spread */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        {isBooked ? (
          <div className="bg-[#0C0A09] border border-[#C6A15B]/40 rounded-3xl p-10 sm:p-16 max-w-2xl mx-auto text-center space-y-8 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] flex items-center justify-center mx-auto text-[#C6A15B]">
              <CheckCircle2 className="w-8 h-8 text-[#E58A2B]" />
            </div>

            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C6A15B] block mb-2">
                RESERVATION CONFIRMED // ALLOCATION LOCKED
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F2EB]">
                Welcome to Atelier Kōhī.
              </h2>
            </div>

            <div className="bg-[#060504] border border-[#C6A15B]/25 rounded-2xl p-6 text-left space-y-3 font-mono text-xs">
              <div className="flex justify-between pb-2 border-b border-[#C6A15B]/15">
                <span className="text-[#E8E3D9]/60">Reservation Pass</span>
                <span className="text-[#C6A15B] font-bold text-sm">{bookingCode}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#C6A15B]/15">
                <span className="text-[#E8E3D9]/60">Guest Name</span>
                <span className="text-[#F5F2EB]">{guestName || 'Distinguished Guest'}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#C6A15B]/15">
                <span className="text-[#E8E3D9]/60">Flight Experience</span>
                <span className="text-[#E58A2B]">{selectedFlight.name}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#C6A15B]/15">
                <span className="text-[#E8E3D9]/60">Date & Time</span>
                <span className="text-[#F5F2EB]">{selectedDate} @ {selectedTimeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#E8E3D9]/60">Party Size</span>
                <span className="text-[#F5F2EB]">{guestsCount} Guests (Private Bar)</span>
              </div>
            </div>

            <p className="text-xs text-[#E8E3D9]/70 font-light leading-relaxed">
              A bespoke calendar invitation and preparation dossier have been dispatched to {guestEmail || 'your email'}. We request arrival 5 minutes prior to allow aromatic acclimation.
            </p>

            <button
              onClick={() => setIsBooked(false)}
              className="px-8 py-3.5 rounded-xl bg-[#060504] border border-[#C6A15B]/40 text-xs font-mono uppercase tracking-wider text-[#C6A15B] hover:text-[#F5F2EB] transition-colors cursor-pointer"
            >
              Modify or Make Another Booking
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirmReservation} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Flight Tier Selection & Date */}
            <div className="lg:col-span-7 space-y-8">
              {/* Flight Selector */}
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#C6A15B] block mb-3">
                  STEP 01 // SELECT FLIGHT TIER
                </span>
                <div className="space-y-4">
                  {TASTING_FLIGHTS.map((flight) => {
                    const isSelected = flight.id === selectedFlight.id;
                    return (
                      <div
                        key={flight.id}
                        onClick={() => setSelectedFlightId(flight.id)}
                        className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0C0A09] border-[#C6A15B] ring-1 ring-[#C6A15B]/30'
                            : 'bg-[#060504] border-[#C6A15B]/20 hover:border-[#C6A15B]/50'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F5F2EB]">
                            {flight.name}
                          </h3>
                          <span className="font-serif text-lg font-bold text-[#C6A15B]">
                            ₹{flight.priceInr}
                          </span>
                        </div>
                        <p className="text-xs text-[#E8E3D9]/70 font-light mb-3">
                          {flight.description}
                        </p>
                        <div className="flex items-center gap-4 text-[10px] font-mono text-[#E58A2B]">
                          <span>{flight.coursesCount} Courses</span>
                          <span>·</span>
                          <span>{flight.durationMinutes} Minutes</span>
                          <span>·</span>
                          <span>{flight.servings}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#C6A15B] block mb-3">
                  STEP 02 // SALON SESSION TIME
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot.time;
                    return (
                      <button
                        type="button"
                        key={slot.time}
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#C6A15B]/15 border-[#C6A15B] text-[#F5F2EB]'
                            : 'bg-[#0C0A09] border-[#C6A15B]/20 text-[#E8E3D9]/60 hover:border-[#C6A15B]/40'
                        }`}
                      >
                        <span className="font-serif text-xl font-bold block mb-1">{slot.time}</span>
                        <span className="text-[10px] font-mono uppercase tracking-wider block">{slot.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Guest Details & Confirmation Card */}
            <div className="lg:col-span-5 bg-[#0C0A09] border border-[#C6A15B]/30 rounded-3xl p-8 sm:p-10 space-y-6 h-fit shadow-2xl">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C6A15B] block">
                STEP 03 // GUEST ITINERARY
              </span>

              {/* Party Size */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#E8E3D9]/70 uppercase tracking-wider block">
                  Party Size (Max 6 Guests)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setGuestsCount(num)}
                      className={`flex-1 py-2.5 rounded-lg border text-xs font-mono font-bold transition-all cursor-pointer ${
                        guestsCount === num
                          ? 'bg-[#C6A15B] text-[#060504] border-[#C6A15B]'
                          : 'bg-[#060504] text-[#E8E3D9]/60 border-[#C6A15B]/20 hover:text-[#F5F2EB]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#E8E3D9]/70 uppercase tracking-wider block">
                  Reservation Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-[#060504] border border-[#C6A15B]/30 rounded-xl px-4 py-3 text-xs font-mono text-[#F5F2EB] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              {/* Guest Details */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-mono text-[#E8E3D9]/70 uppercase tracking-wider block mb-1">
                    Primary Guest Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Elena Vance"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#060504] border border-[#C6A15B]/30 rounded-xl px-4 py-3 text-xs text-[#F5F2EB] focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#E8E3D9]/70 uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@atelierkohi.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-[#060504] border border-[#C6A15B]/30 rounded-xl px-4 py-3 text-xs text-[#F5F2EB] focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#E8E3D9]/70 uppercase tracking-wider block mb-1">
                    Telephone (Direct)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-[#060504] border border-[#C6A15B]/30 rounded-xl px-4 py-3 text-xs text-[#F5F2EB] focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
              </div>

              {/* Total Calculation */}
              <div className="pt-4 border-t border-[#C6A15B]/20 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#E8E3D9]/60 block">Total Experience</span>
                  <span className="text-xs text-[#E8E3D9]/80">{guestsCount} × ₹{selectedFlight.priceInr}</span>
                </div>
                <span className="font-serif text-2xl font-bold text-[#C6A15B]">
                  ₹{(guestsCount * selectedFlight.priceInr).toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C6A15B] to-[#E58A2B] text-[#060504] font-bold text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-xl cursor-pointer"
              >
                Confirm Flight Allocation
              </button>

              <p className="text-[10px] font-mono text-[#E8E3D9]/50 text-center uppercase tracking-wider">
                Complimentary cancellation up to 24 hours prior.
              </p>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
