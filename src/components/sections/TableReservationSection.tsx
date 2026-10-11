import React, { useState } from 'react';
import { Calendar, CheckCircle, Sparkles, Crown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TABLE_ZONES } from '../../data/coffeeData';
import { ReservationData } from '../../types/spatial';

export const TableReservationSection: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string>(TABLE_ZONES[0].id);
  const [formData, setFormData] = useState<ReservationData>({
    zoneId: TABLE_ZONES[0].id,
    date: '2026-10-05',
    time: '18:30',
    guests: 2,
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [confirmedBooking, setConfirmedBooking] = useState<{
    code: string;
    zoneName: string;
    date: string;
    time: string;
    guests: number;
    name: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill out your concierge information to request a private alcove.');
      return;
    }

    const bookingCode = `AURA-VAULT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const zoneObj = TABLE_ZONES.find((z) => z.id === selectedZone);

    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.55 },
        colors: ['#f5cb98', '#dfb17b', '#b3844f']
      });
    } catch (err) {}

    setConfirmedBooking({
      code: bookingCode,
      zoneName: zoneObj?.name || 'Private Glasshouse Alcove',
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
      name: formData.name
    });
  };

  return (
    <section className="min-h-screen relative py-20 px-4 sm:px-8 pointer-events-auto flex items-center">
      <div className="max-w-7xl mx-auto w-full space-y-12">
        {/* Section Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#dfb17b]/10 border border-[#dfb17b]/30 text-xs font-mono text-[#dfb17b] uppercase tracking-[0.2em]">
            <Crown className="w-3.5 h-3.5 text-[#f5cb98]" />
            <span>Private Concierge</span>
          </div>
          <h2 className="font-cinzel text-4xl sm:text-6xl font-bold text-white tracking-tight">
            Reserve Your Private Vault
          </h2>
          <p className="text-[#a39790] text-base max-w-xl mx-auto font-sans">
            Request an exclusive alcove in our botanical glasshouse, fireside velvet booth, or cupping bar for bespoke tastings.
          </p>
        </div>

        {confirmedBooking ? (
          /* Confirmation State Card */
          <div className="max-w-2xl mx-auto spatial-glass-bright rounded-3xl p-8 sm:p-12 border border-[#dfb17b] text-center space-y-6 animate-in zoom-in-95 duration-500 shadow-spatial-lg">
            <div className="w-16 h-16 rounded-full bg-[#dfb17b]/20 border border-[#dfb17b] text-[#dfb17b] flex items-center justify-center mx-auto shadow-gold-glow">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#dfb17b] uppercase tracking-widest">
                Private Vault Reservation Confirmed
              </span>
              <h3 className="font-serif text-3xl font-bold text-white">
                We Await Your Arrival, {confirmedBooking.name}
              </h3>
              <p className="text-xs text-[#a39790] font-sans">
                A formal calendar invitation and private access pass has been dispatched to your email address.
              </p>
            </div>

            <div className="bg-[#060504] p-6 rounded-2xl border border-[#dfb17b]/30 space-y-3 font-mono text-xs text-left max-w-md mx-auto">
              <div className="flex justify-between border-b border-[#dfb17b]/15 pb-2">
                <span className="text-[#a39790]">Vault Pass Reference:</span>
                <span className="text-[#dfb17b] font-bold">{confirmedBooking.code}</span>
              </div>
              <div className="flex justify-between border-b border-[#dfb17b]/15 pb-2">
                <span className="text-[#a39790]">Atmosphere Zone:</span>
                <span className="text-white">{confirmedBooking.zoneName}</span>
              </div>
              <div className="flex justify-between border-b border-[#dfb17b]/15 pb-2">
                <span className="text-[#a39790]">Date & Time:</span>
                <span className="text-white">{confirmedBooking.date} at {confirmedBooking.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a39790]">Party Size:</span>
                <span className="text-white">{confirmedBooking.guests} Honored Guests</span>
              </div>
            </div>

            <button
              onClick={() => setConfirmedBooking(null)}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#f5cb98] via-[#dfb17b] to-[#c89666] text-[#060504] font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110"
            >
              Request Additional Reservation
            </button>
          </div>
        ) : (
          /* Reservation Form Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Zone Selector Cards */}
            <div className="lg:col-span-6 space-y-4">
              <label className="block text-xs font-mono uppercase tracking-widest text-[#dfb17b] mb-2">
                1. Select Atmosphere & Seating Vault
              </label>
              {TABLE_ZONES.map((zone) => {
                const isSelected = selectedZone === zone.id;
                return (
                  <div
                    key={zone.id}
                    onClick={() => {
                      setSelectedZone(zone.id);
                      setFormData({ ...formData, zoneId: zone.id });
                    }}
                    className={`cursor-pointer spatial-glass rounded-2xl p-5 border transition-all duration-300 flex space-x-4 items-center ${
                      isSelected
                        ? 'border-[#dfb17b] bg-[#dfb17b]/20 shadow-spatial-sm'
                        : 'border-[#dfb17b]/20 opacity-70 hover:opacity-100 hover:border-[#dfb17b]/40'
                    }`}
                  >
                    <img
                      src={zone.image}
                      alt={zone.name}
                      className="w-24 h-24 rounded-xl object-cover border border-[#dfb17b]/40"
                    />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-lg font-bold text-white">{zone.name}</h4>
                        {isSelected && <Sparkles className="w-4 h-4 text-[#dfb17b]" />}
                      </div>
                      <p className="text-xs text-[#a39790] line-clamp-2 font-sans">{zone.description}</p>
                      <div className="flex items-center space-x-3 font-mono text-[10px] text-[#dfb17b] pt-1">
                        <span>{zone.capacity}</span>
                        <span>•</span>
                        <span>{zone.availableTables} Alcoves Available</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Date/Time/Guest Form */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-6 spatial-glass-bright rounded-3xl p-6 sm:p-9 border border-[#dfb17b]/40 shadow-spatial-lg space-y-5"
            >
              <label className="block text-xs font-mono uppercase tracking-widest text-[#dfb17b]">
                2. Guest Details & Timetable
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Date */}
                <div>
                  <label className="block text-[10px] font-mono text-[#a39790] uppercase mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#060504] border border-[#dfb17b]/30 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#dfb17b]"
                    required
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-[10px] font-mono text-[#a39790] uppercase mb-1">Time Slot</label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#060504] border border-[#dfb17b]/30 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#dfb17b]"
                  >
                    <option value="09:00">09:00 AM — Morning Cupping</option>
                    <option value="12:30">12:30 PM — Afternoon Roast</option>
                    <option value="16:00">04:00 PM — Pour-Over Session</option>
                    <option value="18:30">06:30 PM — Private Lounge</option>
                    <option value="20:30">08:30 PM — Night Ristretto</option>
                  </select>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-[10px] font-mono text-[#a39790] uppercase mb-1">Guests</label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
                    className="w-full bg-[#060504] border border-[#dfb17b]/30 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#dfb17b]"
                    required
                  />
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-[10px] font-mono text-[#a39790] uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Lord Alexander Wright"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#060504] border border-[#dfb17b]/30 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#dfb17b]"
                  required
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-[#a39790] uppercase mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="alexander@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#060504] border border-[#dfb17b]/30 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#dfb17b]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-[#a39790] uppercase mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#060504] border border-[#dfb17b]/30 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#dfb17b]"
                    required
                  />
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-[10px] font-mono text-[#a39790] uppercase mb-1">Concierge Requests (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Acoustic isolation, specific single-origin pairings, or dietary requirements..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#060504] border border-[#dfb17b]/30 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#dfb17b]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#f5cb98] via-[#dfb17b] to-[#c89666] text-[#060504] font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 transition-all active:scale-95 mt-2"
              >
                Confirm Private Vault Reservation
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
