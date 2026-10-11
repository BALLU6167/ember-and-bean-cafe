import React, { useState } from 'react';
import { TASTING_FLIGHTS } from '../../data/atelierData';
import { TastingFlight } from '../../types/atelier';
import { X, Check, Calendar, Clock, Users, Sparkles, CheckCircle2 } from 'lucide-react';

interface TastingFlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFlightId?: string;
}

export const TastingFlightModal: React.FC<TastingFlightModalProps> = ({
  isOpen,
  onClose,
  selectedFlightId,
}) => {
  const [selectedFlight, setSelectedFlight] = useState<TastingFlight>(() => {
    return TASTING_FLIGHTS.find((f) => f.id === selectedFlightId) || TASTING_FLIGHTS[0];
  });
  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>('2026-10-12');
  const [timeSlot, setTimeSlot] = useState<string>('15:00');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [resCode, setResCode] = useState<string>('');

  if (!isOpen) return null;

  const timeSlots = ['11:00', '13:00', '15:00', '17:00', '19:30', '21:00'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `KŌHĪ-${Math.floor(1000 + Math.random() * 9000)}`;
    setResCode(code);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0C0A09] border border-[#C6A15B]/30 rounded-3xl p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#171412] text-[#E8E3D9]/60 hover:text-[#F5F2EB] hover:bg-white/10 transition-colors"
          aria-label="Close reservation modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="text-left mb-8 border-b border-[#C6A15B]/15 pb-6">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#C6A15B] font-bold block mb-1">
                PRIVATE RESERVATION & SENSORY RITUAL
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F2EB]">
                Book Tasting Flight
              </h2>
              <p className="text-xs text-[#E8E3D9]/60 mt-1 font-light">
                Tableside omakase service conducted by our Head Coffee Sommeliers.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Flight Tier Selection */}
              <div>
                <label className="text-[11px] uppercase tracking-wider font-mono text-[#C6A15B] block mb-3">
                  Select Sensory Flight Tier
                </label>
                <div className="space-y-3">
                  {TASTING_FLIGHTS.map((flight) => {
                    const isSelected = selectedFlight.id === flight.id;
                    return (
                      <div
                        key={flight.id}
                        onClick={() => setSelectedFlight(flight)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          isSelected
                            ? 'bg-[#1C1611] border-[#C6A15B] shadow-lg'
                            : 'bg-[#14100D] border-[#C6A15B]/20 hover:border-[#C6A15B]/50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif font-bold text-base text-[#F5F2EB]">{flight.name}</h4>
                            <span className="text-[10px] font-mono text-[#C6A15B] px-2 py-0.5 rounded bg-[#C6A15B]/10">
                              {flight.coursesCount} Courses
                            </span>
                          </div>
                          <p className="text-xs text-[#E8E3D9]/60 mt-1 font-light line-clamp-1">{flight.subtitle}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-mono text-base font-bold text-[#F5F2EB]">₹{flight.priceInr}</span>
                          <span className="text-[10px] text-[#E8E3D9]/50 block">per guest</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-mono text-[#C6A15B] block mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#14100D] border border-[#C6A15B]/30 rounded-xl px-4 py-2.5 text-xs text-[#F5F2EB] focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider font-mono text-[#C6A15B] block mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-[#14100D] border border-[#C6A15B]/30 rounded-xl px-4 py-2.5 text-xs text-[#F5F2EB] focus:outline-none focus:border-[#C6A15B]"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num} className="bg-[#14100D]">
                        {num} {num === 1 ? 'Guest' : 'Guests'} (Private Booth)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="text-[11px] uppercase tracking-wider font-mono text-[#C6A15B] block mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Experience Time Slot
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                        timeSlot === slot
                          ? 'bg-[#C6A15B] text-[#060504] font-bold shadow-md'
                          : 'bg-[#14100D] border border-[#C6A15B]/20 text-[#E8E3D9]/70 hover:border-[#C6A15B]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#14100D] border border-[#C68B59]/30 rounded-xl px-4 py-2.5 text-xs text-[#F5F2EB] placeholder-[#E8E3D9]/40 focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#14100D] border border-[#C68B59]/30 rounded-xl px-4 py-2.5 text-xs text-[#F5EDE0] placeholder-[#E8E3D9]/40 focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number (+91)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#14100D] border border-[#C68B59]/30 rounded-xl px-4 py-2.5 text-xs text-[#F5EDE0] placeholder-[#E8E3D9]/40 focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Dietary Preferences / Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#14100D] border border-[#C68B59]/30 rounded-xl px-4 py-2.5 text-xs text-[#F5EDE0] placeholder-[#E8E3D9]/40 focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#C6A15B]/15 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#E8E3D9]/50 block">Total Experience Fee</span>
                  <span className="text-xl font-mono font-bold text-[#C6A15B]">
                    ₹{(selectedFlight.priceInr * guests).toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#C6A15B] to-[#E58A2B] hover:from-[#DFB17B] hover:to-[#C6A15B] text-[#060504] font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 shadow-xl cursor-pointer"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#C6A15B]/15 border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C6A15B] block mb-1">
                RESERVATION CONFIRMED
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#F5F2EB]">
                We look forward to welcoming you.
              </h3>
              <p className="text-xs text-[#E8E3D9]/60 mt-2 max-w-md mx-auto">
                A confirmation concierge receipt has been sent to <span className="text-[#F5F2EB]">{email}</span>.
              </p>
            </div>

            {/* Pass Card */}
            <div className="bg-[#14100D] border border-[#C6A15B]/30 rounded-2xl p-6 max-w-md mx-auto text-left space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#E8E3D9]/50">PASS CODE</span>
                <span className="text-[#C6A15B] font-bold">{resCode}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#E8E3D9]/50">EXPERIENCE</span>
                <span className="text-[#F5F2EB]">{selectedFlight.name}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#E8E3D9]/50">GUESTS</span>
                <span className="text-[#F5F2EB]">{guests} Persons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#E8E3D9]/50">DATE & TIME</span>
                <span className="text-[#F5F2EB]">{date} · {timeSlot}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-xl bg-[#C6A15B] text-[#060504] font-bold text-xs uppercase tracking-wider hover:bg-[#DFB17B] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
