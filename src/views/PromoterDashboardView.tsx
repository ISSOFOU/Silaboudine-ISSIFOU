import React, { useState } from 'react';
import { ArrowLeft, Settings, TrendingUp, Smile, Star, QrCode, Tag, Users, Wallet, Plus } from 'lucide-react';
import { EventTicket } from '../types';

interface PromoterDashboardViewProps {
  events: EventTicket[];
  onBack: () => void;
  onOpenPayouts: () => void;
  onOpenQRScanner: (eventName: string) => void;
  onOpenCreateEvent: () => void;
}

export const PromoterDashboardView: React.FC<PromoterDashboardViewProps> = ({
  events,
  onBack,
  onOpenPayouts,
  onOpenQRScanner,
  onOpenCreateEvent,
}) => {
  const [selectedEventGuests, setSelectedEventGuests] = useState<string | null>(null);
  const [editingTarifsEvent, setEditingTarifsEvent] = useState<EventTicket | null>(null);

  const activeEvents = [
    {
      id: 'p-ev-1',
      title: 'Festival Culture Vodun',
      date: '29 août',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80',
      sold: 120,
      total: 300,
    },
    {
      id: 'p-ev-2',
      title: 'Afterwork Jazz Session',
      date: '21 août',
      image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300&auto=format&fit=crop&q=80',
      sold: 45,
      total: 60,
    },
    {
      id: 'p-ev-3',
      title: 'Soirée Salsa',
      date: '22 août',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&auto=format&fit=crop&q=80',
      sold: 78,
      total: 100,
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#0b121e] text-white pb-6">
      
      {/* Header matching Image 8 */}
      <div className="px-4 py-3 bg-[#0f1726] border-b border-slate-800/80 flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-xs font-semibold transition"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <h1 className="font-extrabold text-sm text-white font-display">Tableau de bord</h1>

        <button className="p-1 rounded-full text-slate-300 hover:text-white">
          <Settings size={18} />
        </button>
      </div>

      <div className="px-4 py-4 space-y-4">
        
        {/* Top 2 KPI Metric Cards matching Image 8 */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: Revenu Total */}
          <div className="bg-[#141e2e] border border-slate-700/60 rounded-2xl p-3.5 flex flex-col justify-between shadow-md relative overflow-hidden">
            <div>
              <p className="text-slate-400 text-xs font-medium">Revenu total</p>
              <p className="text-base sm:text-lg font-extrabold text-white mt-1 leading-tight">
                1 450 000 <span className="text-xs font-bold text-slate-300">FCFA</span>
              </p>
            </div>

            {/* Sparkline curve matching Image 8 */}
            <div className="mt-2 h-9 w-full">
              <svg viewBox="0 0 100 35" className="w-full h-full text-cyan-400 overflow-visible">
                <path
                  d="M0,28 Q25,26 40,20 T70,18 T100,6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="6" r="3.5" fill="#00d2ff" />
              </svg>
            </div>
          </div>

          {/* Card 2: Satisfaction moyenne */}
          <div className="bg-[#141e2e] border border-slate-700/60 rounded-2xl p-3.5 flex flex-col justify-between shadow-md">
            <div>
              <p className="text-slate-400 text-xs font-medium">Satisfaction moyenne</p>
              <p className="text-base sm:text-lg font-extrabold text-white mt-1">
                4.8 <span className="text-xs font-normal text-slate-400">/ 5</span>
              </p>
            </div>

            {/* Smiley & Stars row matching Image 8 */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-cyan-400 text-xl leading-none">😊</span>
              <div className="flex items-center text-cyan-400">
                <Star size={13} className="fill-cyan-400" />
                <Star size={13} className="fill-cyan-400" />
                <Star size={13} className="fill-cyan-400" />
                <Star size={13} className="fill-cyan-400" />
                <Star size={13} className="fill-cyan-400 text-slate-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Banner: Solde disponible & Demander virement matching Image 8 */}
        <div className="bg-[#132238] border border-cyan-500/30 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div>
            <span className="text-xs text-slate-300 block">Solde disponible :</span>
            <span className="text-lg sm:text-xl font-black text-white tracking-tight">
              850 000 FCFA
            </span>
          </div>

          <button
            onClick={onOpenPayouts}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-cyan-500/40 text-xs font-bold transition cursor-pointer shadow"
          >
            Demander virement
          </button>
        </div>

        {/* Section: Événements actifs matching Image 8 */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-white">Événements actifs</h2>
            <button
              onClick={onOpenCreateEvent}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <Plus size={14} /> Nouveau
            </button>
          </div>

          <div className="space-y-2.5">
            {activeEvents.map((ev) => (
              <div
                key={ev.id}
                className="p-3 bg-[#141e2e] border border-slate-700/60 rounded-2xl flex items-center gap-3 shadow-md"
              >
                {/* Event Thumbnail */}
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-700/50"
                />

                {/* Details & Actions */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-white truncate">
                    {ev.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {ev.date} • <span className="text-cyan-400 font-medium">{ev.sold}/{ev.total} vendus</span>
                  </p>

                  {/* 3 Buttons matching Image 8: [Tarifs] [Scanner QR] [Invités] */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <button
                      onClick={() => setEditingTarifsEvent(events[0] || null)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-[10px] font-semibold border border-slate-700 transition"
                    >
                      Tarifs
                    </button>

                    <button
                      onClick={() => onOpenQRScanner(ev.title)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-cyan-300 hover:text-white text-[10px] font-semibold border border-slate-700 flex items-center gap-1 transition"
                    >
                      <QrCode size={11} /> Scanner QR
                    </button>

                    <button
                      onClick={() => setSelectedEventGuests(ev.title)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-[10px] font-semibold border border-slate-700 transition"
                    >
                      Invités
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guests Modal */}
        {selectedEventGuests && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="w-full max-w-sm bg-[#111a28] border border-slate-700 rounded-3xl p-4 shadow-2xl">
              <h3 className="font-bold text-sm text-white mb-1">Liste des Invités</h3>
              <p className="text-xs text-cyan-400 mb-3">{selectedEventGuests}</p>
              
              <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar">
                {[
                  { name: 'Dine L\'Emblematique', tier: 'VIP', phone: '+229 96 12 34 56', status: 'Confirmé' },
                  { name: 'Farid T.', tier: 'Standard', phone: '+229 97 00 11 22', status: 'Confirmé' },
                  { name: 'Amina K.', tier: 'Standard', phone: '+229 95 44 33 22', status: 'Confirmé' },
                  { name: 'Leo B.', tier: 'Standard', phone: '+229 61 22 33 44', status: 'Sur place' },
                ].map((g, i) => (
                  <div key={i} className="p-2.5 bg-[#182333] rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white">{g.name}</p>
                      <p className="text-[10px] text-slate-400">{g.phone} • Pass {g.tier}</p>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {g.status}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedEventGuests(null)}
                className="w-full mt-3 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold"
              >
                Fermer
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
