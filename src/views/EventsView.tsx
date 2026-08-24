import React, { useState, useMemo } from 'react';
import { Search, ShieldCheck, Ticket, Calendar, Sparkles } from 'lucide-react';
import { EventTicket } from '../types';

interface EventsViewProps {
  events: EventTicket[];
  onSelectEvent: (event: EventTicket) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ events, onSelectEvent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Cotonou');

  const filterOptions = [
    'Cotonou',
    'Proximité',
    'Promoteurs vérifiés',
    'Cette semaine',
    'Festivals',
    'Concerts',
  ];

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchSearch =
        ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.promoterName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchFilter =
        selectedFilter === 'Cotonou' ||
        (selectedFilter === 'Promoteurs vérifiés' && ev.isVerifiedPromoter) ||
        (selectedFilter === 'Festivals' && ev.category === 'Festival') ||
        (selectedFilter === 'Concerts' && ev.category === 'Concert') ||
        selectedFilter === 'Proximité' ||
        selectedFilter === 'Cette semaine';

      return matchSearch && matchFilter;
    });
  }, [events, searchQuery, selectedFilter]);

  return (
    <div className="flex-1 px-4 py-4 space-y-4 bg-[#0b121e] text-white">
      
      {/* Header matching Image 3 */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display">
          Événements
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Trouvez vos prochaines sorties payantes
        </p>
      </div>

      {/* Search Input matching Image 3 */}
      <div className="relative w-full">
        <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un événement, un promoteur..."
          className="w-full bg-[#16202f] border border-slate-700/60 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 shadow-inner"
        />
      </div>

      {/* Filter pills scroll matching Image 3 */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
        {filterOptions.map((f) => {
          const isActive = selectedFilter === f;
          return (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'border border-cyan-400 bg-cyan-400/10 text-cyan-400 shadow-sm'
                  : 'bg-[#182333] text-slate-300 border border-slate-700/60 hover:border-slate-600'
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Events List Cards matching Image 3 */}
      <div className="space-y-4">
        {filteredEvents.map((ev) => {
          const percentSold = Math.round((ev.ticketsSold / ev.totalTickets) * 100);

          return (
            <div
              key={ev.id}
              onClick={() => onSelectEvent(ev)}
              className="bg-[#141e2e] hover:bg-[#172336] border border-slate-700/70 rounded-2xl overflow-hidden cursor-pointer transition shadow-lg group"
            >
              {/* Event Image & Price Badge */}
              <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Price Pill top-right matching Image 3 & 5 */}
                <div className="absolute top-2.5 right-2.5 bg-white text-slate-950 font-extrabold text-xs px-3 py-1 rounded-xl shadow-lg">
                  {ev.price.toLocaleString()} FCFA
                </div>
              </div>

              {/* Card Details */}
              <div className="p-3.5 space-y-2.5">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition">
                    {ev.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    {ev.date} • {ev.time}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {ev.location}
                  </p>
                </div>

                {/* Badges & Progress Bar Row */}
                <div className="flex items-center justify-between text-xs pt-0.5">
                  {/* Verified badge */}
                  {ev.isVerifiedPromoter ? (
                    <span className="flex items-center gap-1 bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-md text-[10px] font-semibold">
                      <ShieldCheck size={11} /> Promoteur vérifié
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400">Organisé par {ev.promoterName}</span>
                  )}

                  {/* Tickets sold label */}
                  <span className="text-[11px] text-rose-400 font-semibold">
                    {ev.ticketsSold}/{ev.totalTickets} billets vendus
                  </span>
                </div>

                {/* Progress bar matching Image 3 with pink/magenta fill */}
                <div className="w-full bg-[#0d141f] h-2 rounded-full overflow-hidden border border-slate-700/40">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-500"
                    style={{ width: `${percentSold}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {filteredEvents.length === 0 && (
          <div className="py-8 text-center bg-[#131d2b] rounded-2xl border border-slate-800 p-4">
            <p className="text-xs text-slate-400">Aucun événement ne correspond à vos filtres.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedFilter('Cotonou'); }}
              className="mt-2 text-xs text-cyan-400 underline font-semibold"
            >
              Voir tous les événements
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
