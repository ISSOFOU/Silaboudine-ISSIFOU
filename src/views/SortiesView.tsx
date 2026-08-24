import React, { useState, useMemo } from 'react';
import { Search, MapPin, Users, Flame, Calendar, Sparkles } from 'lucide-react';
import { Outing } from '../types';

interface SortiesViewProps {
  outings: Outing[];
  onSelectOuting: (outing: Outing) => void;
  userName?: string;
}

export const SortiesView: React.FC<SortiesViewProps> = ({
  outings,
  onSelectOuting,
  userName = 'Dine',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState('Toutes les zones');

  const zones = [
    'Toutes les zones',
    'Près de moi',
    'Haie Vive',
    'Fidjrossè',
    'Cadjèhoun',
    'Akpakpa',
    'Porto-Novo',
    'Abomey-Calavi',
    'Ganhi',
  ];

  // Filter outings
  const filteredOutings = useMemo(() => {
    return outings.filter((out) => {
      const matchSearch =
        out.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        out.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        out.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        out.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

      const matchZone =
        selectedZone === 'Toutes les zones' ||
        selectedZone === 'Près de moi' ||
        out.neighborhood.toLowerCase() === selectedZone.toLowerCase();

      return matchSearch && matchZone;
    });
  }, [outings, searchQuery, selectedZone]);

  // Top popular outings
  const popularOutings = useMemo(() => {
    return outings.filter((o) => o.isPopular || (o.rank && o.rank <= 3)).slice(0, 3);
  }, [outings]);

  // Group remainder by date
  const regularOutings = useMemo(() => {
    return filteredOutings;
  }, [filteredOutings]);

  return (
    <div className="flex-1 px-4 py-4 space-y-5 bg-[#0b121e] text-white">
      
      {/* Top Header matching Image 2 */}
      <div>
        <div className="flex items-center gap-1.5 text-cyan-400 font-medium text-sm">
          <span>Bonjour</span>
          <span>👋</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display mt-0.5">
          Sorties Libres
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          {filteredOutings.length} sorties près de chez toi
        </p>
      </div>

      {/* Search Input matching Image 2 */}
      <div className="relative w-full">
        <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher une sortie, un lieu..."
          className="w-full bg-[#16202f] border border-slate-700/60 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 shadow-inner"
        />
      </div>

      {/* Neighborhood Pills Scroll matching Image 2 */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
        {zones.map((zone) => {
          const isActive = selectedZone === zone;
          return (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'border border-cyan-400 bg-cyan-400/10 text-cyan-400 shadow-sm'
                  : 'bg-[#182333] text-slate-300 border border-slate-700/60 hover:border-slate-600'
              }`}
            >
              {zone}
            </button>
          );
        })}
      </div>

      {/* Section: POPULAIRES 🔥 • TOP 3 À NE PAS RATER */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300">
            <span>POPULAIRES</span>
            <span className="text-orange-400">🔥</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">TOP 3 À NE PAS RATER</span>
          </div>
        </div>

        {/* Carousel / Cards matching Image 2 */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2 snap-x">
          {popularOutings.map((outing, idx) => {
            const currentParticipants = outing.participants.length + (outing.id === 'out-1' ? 56 : 14);
            return (
              <div
                key={outing.id}
                onClick={() => onSelectOuting(outing)}
                className="relative min-w-[275px] max-w-[285px] h-[175px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/60 shrink-0 cursor-pointer group shadow-lg snap-start"
              >
                <img
                  src={outing.image}
                  alt={outing.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Rank Badge top-left */}
                <div className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full bg-cyan-500 text-white font-black text-xs flex items-center justify-center shadow-md">
                  {outing.rank || idx + 1}
                </div>

                {/* Bottom Content info matching Image 2 */}
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <h3 className="font-bold text-sm leading-tight text-white drop-shadow">
                    {outing.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 truncate mt-0.5 drop-shadow">
                    {outing.location}
                  </p>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-slate-300">
                    <span>{outing.date} • {outing.time}</span>
                    <span className="flex items-center gap-1 bg-cyan-950/70 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full font-semibold">
                      <Users size={10} /> {currentParticipants}/{outing.maxParticipants}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section: List of Outings by Date matching Image 2 */}
      <div>
        <h2 className="text-sm font-bold text-white mb-2.5 flex items-center gap-1.5">
          <Calendar size={14} className="text-cyan-400" />
          <span>Sam. 22 août & Prochaines sorties</span>
        </h2>

        <div className="space-y-2.5">
          {regularOutings.map((outing) => {
            const currentParticipants = outing.participants.length + (outing.id === 'out-1' ? 56 : outing.id === 'out-2' ? 5 : 2);
            return (
              <div
                key={outing.id}
                onClick={() => onSelectOuting(outing)}
                className="p-2.5 bg-[#141e2e] hover:bg-[#18253a] border border-slate-700/60 rounded-2xl flex items-center gap-3 cursor-pointer transition shadow-md group"
              >
                {/* Thumbnail Image */}
                <img
                  src={outing.image}
                  alt={outing.title}
                  className="w-18 h-18 rounded-xl object-cover shrink-0 border border-slate-700/50 group-hover:scale-102 transition"
                />

                {/* Info */}
                <div className="flex-1 min-w-0 pr-1">
                  <h4 className="font-bold text-xs sm:text-sm text-white truncate group-hover:text-cyan-300 transition">
                    {outing.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {outing.date} • {outing.time}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    {outing.location}
                  </p>
                </div>

                {/* Participants badge */}
                <div className="shrink-0">
                  <span className="flex items-center gap-1 bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 px-2 py-1 rounded-full text-[10px] font-semibold">
                    <Users size={11} /> {currentParticipants}/{outing.maxParticipants}
                  </span>
                </div>
              </div>
            );
          })}

          {filteredOutings.length === 0 && (
            <div className="py-8 text-center bg-[#131d2b] rounded-2xl border border-slate-800 p-4">
              <p className="text-xs text-slate-400">Aucune sortie trouvée pour ces filtres.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedZone('Toutes les zones'); }}
                className="mt-2 text-xs text-cyan-400 underline font-semibold"
              >
                Réinitialiser la recherche
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
