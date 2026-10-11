import React, { useState } from 'react';
import { TABLE_ZONES } from '../../data/cafeData';
import { TableZone } from '../../types/cafe';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  CheckCircle, 
  Sparkles, 
  Send,
  Phone,
  Mail,
  User
} from 'lucide-react';

export const ReservationSection: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<TableZone>(TABLE_ZONES[0]);
  const [date, setDate] = useState<string>('2026-10-12');
  const [time, setTime] = useState<string>('11:30 AM');
  const [guests, setGuests] = useState<number>(2);
  const [occasion, setOccasion] = useState<string>('Casual Ritual');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [specialNote, setSpecialNote] = useState<string>('');
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  const timeSlots = [
    '08:00 AM', '09:30 AM', '11:00 AM', '12:30 PM',
    '02:00 PM', '03:30 PM', '05:00 PM', '07:00 PM', '08:30 PM'
  ];

  const occasions = [
    'Casual Ritual',
    'Weekend Brunch Gathering',
    'Birthday Celebration',
    'Quiet Focus / Reading',
    'Coffee Cupping / Date',
    'Creative Team Brainstorm'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `EB-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setIsConfirmed(true);
  };

  const handleReset = () => {
    setIsConfirmed(false);
    setName('');
    setPhone('');
    setEmail('');
    setSpecialNote('');
  };

  return (
    <section id="reservations" className="py-24 bg-[#140C08] text-[#F5EDE0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C68B59] font-bold block mb-2">
            Spatial Floor Plan Booking
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5EDE0] tracking-tight">
            Reserve Your Table & Space
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#F5EDE0]/70 font-light">
            Choose your preferred acoustic zone on our interactive floor plan before reserving your table.
          </p>
        </div>

        {!isConfirmed ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 6 Cols: Interactive Architectural Floor Plan */}
            <div className="lg:col-span-6 bg-[#1A110D] border border-[#C68B59]/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#DFB17B] block">
                    Interactive Feature I
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#F5EDE0]">Roastery Floor Plan</h3>
                </div>
                <span className="text-xs text-[#F5EDE0]/60">Click any zone to select</span>
              </div>

              {/* Visual Floor Plan Canvas/Grid */}
              <div className="relative w-full aspect-[4/3] bg-[#100906] border-2 border-[#C68B59]/30 rounded-2xl p-4 overflow-hidden shadow-inner">
                {/* Background Blueprint Grid Lines */}
                <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#C68B59_1px,transparent_1px),linear-gradient(to_bottom,#C68B59_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Central Espresso Bar Counter */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-16 bg-[#2C1E18] border border-[#DFB17B]/40 rounded-xl flex flex-col items-center justify-center text-center shadow-lg pointer-events-none z-10">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#DFB17B]">ESPRESSO BAR</span>
                  <span className="text-[8px] text-[#F5EDE0]/60">Slayer 3-Group + V60</span>
                </div>

                {/* 5 Interactive Clickable Zones */}
                {TABLE_ZONES.map((zone) => {
                  const isSelected = selectedZone.id === zone.id;
                  return (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => setSelectedZone(zone)}
                      style={{
                        left: `${zone.coords.x}%`,
                        top: `${zone.coords.y}%`,
                        width: `${zone.coords.width}%`,
                        height: `${zone.coords.height}%`,
                      }}
                      className={`absolute rounded-xl border-2 transition-all p-2 flex flex-col justify-between text-left cursor-pointer z-20 ${
                        isSelected
                          ? 'bg-[#C68B59]/40 border-[#DFB17B] shadow-[0_0_20px_rgba(223,177,123,0.5)] scale-105'
                          : 'bg-[#1E1410]/70 border-[#C68B59]/40 hover:border-[#DFB17B]/70 hover:bg-[#251914]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold line-clamp-1 ${isSelected ? 'text-[#DFB17B]' : 'text-[#F5EDE0]'}`}>
                          {zone.name.split(' ')[0]} {zone.name.split(' ')[1] || ''}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <span className="text-[9px] text-[#F5EDE0]/70 font-mono">
                        {zone.availableSeats} seats left
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Zone Details Breakdown */}
              <div className="mt-6 bg-[#120B08] border border-[#C68B59]/30 rounded-2xl p-4 text-xs">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-serif font-bold text-base text-[#DFB17B]">{selectedZone.name}</h4>
                  <span className="text-emerald-400 font-mono text-[11px] font-bold">
                    ● {selectedZone.availableSeats} Seats Open
                  </span>
                </div>
                <p className="text-[#F5EDE0]/70 text-xs mb-3">{selectedZone.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedZone.features.map((f, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#1A110D] border border-[#C68B59]/30 text-[10px] text-[#F5EDE0]/80">
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Reservation Form */}
            <div className="lg:col-span-6 bg-[#1A110D] border border-[#C68B59]/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <h3 className="font-serif text-2xl font-bold text-[#F5EDE0] mb-1">Table Details</h3>
              <p className="text-xs text-[#F5EDE0]/70 mb-6">
                Booking for <strong className="text-[#DFB17B]">{selectedZone.name}</strong>
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-[#F5EDE0] block mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C68B59]" /> Reservation Date
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#120B08] border border-[#C68B59]/40 rounded-xl px-3.5 py-3 text-xs text-[#F5EDE0] focus:outline-none focus:border-[#DFB17B]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#F5EDE0] block mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C68B59]" /> Time Slot
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#120B08] border border-[#C68B59]/40 rounded-xl px-3.5 py-3 text-xs text-[#F5EDE0] focus:outline-none focus:border-[#DFB17B]"
                    >
                      {timeSlots.map((ts) => (
                        <option key={ts} value={ts}>{ts}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Number of Guests & Occasion */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-[#F5EDE0] block mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C68B59]" /> Party Size
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-[#120B08] border border-[#C68B59]/40 rounded-xl px-3.5 py-3 text-xs text-[#F5EDE0] focus:outline-none focus:border-[#DFB17B]"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-[#F5EDE0] block mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C68B59]" /> Occasion
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full bg-[#120B08] border border-[#C68B59]/40 rounded-xl px-3.5 py-3 text-xs text-[#F5EDE0] focus:outline-none focus:border-[#DFB17B]"
                    >
                      {occasions.map((occ) => (
                        <option key={occ} value={occ}>{occ}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Guest Contact Details */}
                <div className="pt-2 border-t border-[#C68B59]/20 space-y-3">
                  <div>
                    <label className="font-semibold text-[#F5EDE0] block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikramaditya Rao"
                      className="w-full bg-[#120B08] border border-[#C68B59]/40 rounded-xl px-3.5 py-3 text-xs text-[#F5EDE0] placeholder-[#F5EDE0]/40 focus:outline-none focus:border-[#DFB17B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-[#F5EDE0] block mb-1">Mobile / WhatsApp</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#120B08] border border-[#C68B59]/40 rounded-xl px-3.5 py-3 text-xs text-[#F5EDE0] placeholder-[#F5EDE0]/40 focus:outline-none focus:border-[#DFB17B]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#F5EDE0] block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="hello@example.com"
                        className="w-full bg-[#120B08] border border-[#C68B59]/40 rounded-xl px-3.5 py-3 text-xs text-[#F5EDE0] placeholder-[#F5EDE0]/40 focus:outline-none focus:border-[#DFB17B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-[#F5EDE0] block mb-1">Special Table Requests (Optional)</label>
                    <textarea
                      rows={2}
                      value={specialNote}
                      onChange={(e) => setSpecialNote(e.target.value)}
                      placeholder="Dietary allergies, quiet corner preference, baby chair..."
                      className="w-full bg-[#120B08] border border-[#C68B59]/40 rounded-xl p-3 text-xs text-[#F5EDE0] placeholder-[#F5EDE0]/40 focus:outline-none focus:border-[#DFB17B]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#C68B59] to-[#C85A32] hover:from-[#DFB17B] hover:to-[#B04C27] text-[#1E1410] font-bold rounded-2xl text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" /> Confirm Reservation in {selectedZone.name}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* CONFIRMATION CARD */
          <div className="max-w-xl mx-auto bg-[#1A110D] border-2 border-[#DFB17B] rounded-3xl p-8 text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <CheckCircle className="w-16 h-16 text-[#DFB17B] mx-auto mb-4 animate-bounce" />
            <span className="text-xs uppercase tracking-widest text-[#C68B59] font-bold block mb-1">
              Table Confirmed
            </span>
            <h3 className="font-serif text-3xl font-bold text-[#F5EDE0] mb-2">We Look Forward to Savoring With You</h3>
            <p className="text-xs text-[#F5EDE0]/70 mb-6">
              A confirmation WhatsApp & calendar invite has been sent to <strong>{phone}</strong>.
            </p>

            <div className="bg-[#120B08] border border-[#C68B59]/40 rounded-2xl p-5 text-xs text-left space-y-2 mb-6">
              <div className="flex justify-between border-b border-[#C68B59]/20 pb-2">
                <span className="text-[#F5EDE0]/60">Booking Reference:</span>
                <strong className="font-mono text-sm text-[#DFB17B]">{bookingRef}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5EDE0]/60">Guest Name:</span>
                <strong className="text-[#F5EDE0]">{name} ({guests} Guests)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5EDE0]/60">Date & Slot:</span>
                <strong className="text-[#F5EDE0]">{date} at {time}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5EDE0]/60">Reserved Zone:</span>
                <strong className="text-[#DFB17B]">{selectedZone.name}</strong>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-3 bg-[#C68B59] text-[#1E1410] font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-[#DFB17B] transition-colors"
            >
              Make Another Booking
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
