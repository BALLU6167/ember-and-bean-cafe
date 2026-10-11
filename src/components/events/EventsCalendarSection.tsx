import React, { useState } from 'react';
import { CAFE_EVENTS } from '../../data/cafeData';
import { CafeEvent } from '../../types/cafe';
import { Calendar, Clock, Music, Check, Sparkles, Users } from 'lucide-react';

export const EventsCalendarSection: React.FC = () => {
  const [events, setEvents] = useState<CafeEvent[]>(CAFE_EVENTS);
  const [rsvpList, setRsvpList] = useState<string[]>([]);

  const handleRsvp = (id: string) => {
    if (!rsvpList.includes(id)) {
      setRsvpList([...rsvpList, id]);
      setEvents((prev) =>
        prev.map((ev) => (ev.id === id ? { ...ev, spotsLeft: Math.max(0, ev.spotsLeft - 1) } : ev))
      );
    }
  };

  return (
    <section id="events" className="py-24 bg-[#170E0A] text-[#F5EDE0] border-t border-[#C68B59]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C68B59] font-bold block mb-2">
              Culture & Gatherings
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5EDE0] tracking-tight">
              Live Acoustics & Roastery Events
            </h2>
            <p className="mt-3 text-sm text-[#F5EDE0]/70 font-light">
              Friday twilight jazz, Sunday blind cuppings, and community vinyl listening sessions in Jubilee Hills.
            </p>
          </div>
          <span className="text-xs text-[#DFB17B] font-mono bg-[#120B08] px-4 py-2 rounded-xl border border-[#C68B59]/30 self-start md:self-auto">
            ✦ All Friday Music Free with Coffee Order
          </span>
        </div>

        {/* 3 Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((ev) => {
            const hasRsvpd = rsvpList.includes(ev.id);
            return (
              <div
                key={ev.id}
                className="bg-[#1F140F] border border-[#C68B59]/35 hover:border-[#DFB17B] rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-52 w-full overflow-hidden bg-[#120B08]">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F140F] via-transparent to-transparent opacity-85" />

                  <div className="absolute top-4 left-4 bg-[#140C08]/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#DFB17B] border border-[#C68B59]/40">
                    {ev.genre}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs">
                    <span className="font-bold text-white bg-[#C85A32] px-2.5 py-0.5 rounded-full text-[10px] uppercase">
                      {ev.date}
                    </span>
                    <span className="text-[#DFB17B] font-mono font-semibold">{ev.time}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#C68B59] font-mono block mb-1">
                      Featuring: {ev.artist}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#F5EDE0] leading-snug">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-[#F5EDE0]/70 font-light mt-2 leading-relaxed">
                      {ev.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#C68B59]/20 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-[#F5EDE0]/50 block">Admission:</span>
                      <strong className="text-[#DFB17B]">{ev.entry}</strong>
                    </div>

                    <button
                      onClick={() => handleRsvp(ev.id)}
                      disabled={hasRsvpd || ev.spotsLeft === 0}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        hasRsvpd
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                          : 'bg-gradient-to-r from-[#C68B59] to-[#C85A32] text-[#1E1410] hover:scale-105'
                      }`}
                    >
                      {hasRsvpd ? '✓ RSVP Confirmed' : `RSVP (${ev.spotsLeft} spots)`}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
