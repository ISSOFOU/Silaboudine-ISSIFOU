import React, { useState } from 'react';
import { ArrowLeft, Share2, ShieldCheck, Star, Phone, Smartphone, AlertTriangle, Ticket, Check } from 'lucide-react';
import { EventTicket } from '../types';

interface EventDetailViewProps {
  event: EventTicket;
  onBack: () => void;
  onOpenTicketModal: (event: EventTicket) => void;
}

export const EventDetailView: React.FC<EventDetailViewProps> = ({
  event,
  onBack,
  onOpenTicketModal,
}) => {
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const percentSold = Math.round((event.ticketsSold / event.totalTickets) * 100);

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedNumber(text);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0b121e] text-white pb-6">
      
      {/* Header bar matching Image 5 */}
      <div className="px-4 py-3 bg-[#0f1726] border-b border-slate-800/80 flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={onBack}
          className="p-1 rounded-full text-slate-300 hover:text-white transition"
        >
          <ArrowLeft size={20} />
        </button>

        <h2 className="font-bold text-sm text-white">Détails de l'événement</h2>

        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: event.title, url: window.location.href }).catch(() => {});
            } else {
              handleCopy(window.location.href);
            }
          }}
          className="p-1 rounded-full text-slate-300 hover:text-white transition"
          title="Partager"
        >
          <Share2 size={18} />
        </button>
      </div>

      <div className="px-4 py-3 space-y-4">
        
        {/* Main Event Card matching Image 5 */}
        <div className="bg-[#141e2e] border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl">
          {/* Top Image + Price Badge */}
          <div className="relative h-48 w-full bg-slate-900">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            
            {/* Price Pill top-right matching Image 5 in Pink/Magenta */}
            <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold text-xs px-3.5 py-1 rounded-xl shadow-lg">
              {event.price.toLocaleString()} FCFA
            </div>
          </div>

          {/* Event Metadata */}
          <div className="p-3.5 space-y-3">
            <h1 className="text-lg sm:text-xl font-black text-white leading-tight font-display">
              {event.title}
            </h1>

            {/* Promoter row */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                {event.promoterInitials || 'T'}
              </div>
              <span className="text-xs font-semibold text-cyan-400">
                {event.promoterName}
              </span>
            </div>

            {/* Location & Time */}
            <div className="text-xs text-slate-300 space-y-0.5">
              <p>{event.location}</p>
              <p className="text-slate-400">{event.date} • {event.time}</p>
            </div>

            {/* Tickets Sold & Progress Bar matching Image 5 */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">
                  {event.ticketsSold} billets vendus sur {event.totalTickets}
                </span>
                <span className="text-rose-400 font-bold">{percentSold}%</span>
              </div>

              <div className="w-full bg-[#0d141f] h-2 rounded-full overflow-hidden border border-slate-700/40">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                  style={{ width: `${percentSold}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section: DESCRIPTION matching Image 5 */}
        <div className="bg-[#141e2e] border border-slate-700/60 rounded-2xl p-3.5 space-y-1.5">
          <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            DESCRIPTION
          </h3>
          <p className="text-xs text-slate-200 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Section: COMMENT OBTENIR TON BILLET matching Image 5 */}
        <div className="bg-[#141e2e] border border-slate-700/60 rounded-2xl p-3.5 space-y-3">
          <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            COMMENT OBTENIR TON BILLET
          </h3>

          {/* 3 Payment Tiles */}
          <div className="grid grid-cols-3 gap-2">
            {/* Tile 1: MoMo */}
            <div
              onClick={() => handleCopy(event.paymentMethods.mobileMoney)}
              className="p-2.5 bg-[#182436] rounded-xl border border-slate-700/70 flex flex-col items-center text-center cursor-pointer hover:border-yellow-400/50 transition group"
            >
              <Smartphone size={20} className="text-yellow-400 mb-1" />
              <span className="text-[10px] font-bold text-slate-200">Mobile Money</span>
              <span className="text-[9px] text-slate-400 mt-0.5">(MTN/Moov)</span>
              <span className="text-[9px] font-mono text-yellow-300/90 mt-1 truncate max-w-full">
                {event.paymentMethods.mobileMoney}
              </span>
            </div>

            {/* Tile 2: Wave */}
            <div
              onClick={() => handleCopy(event.paymentMethods.wave)}
              className="p-2.5 bg-[#182436] rounded-xl border border-slate-700/70 flex flex-col items-center text-center cursor-pointer hover:border-cyan-400/50 transition group"
            >
              <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 font-black text-[10px] flex items-center justify-center mb-1">
                W
              </div>
              <span className="text-[10px] font-bold text-slate-200">Wave</span>
              <span className="text-[9px] text-slate-400 mt-0.5">:</span>
              <span className="text-[9px] font-mono text-cyan-300 mt-1 truncate max-w-full">
                {event.paymentMethods.wave}
              </span>
            </div>

            {/* Tile 3: On-site */}
            <div className="p-2.5 bg-[#182436] rounded-xl border border-slate-700/70 flex flex-col items-center text-center">
              <span className="text-xl mb-0.5">💵</span>
              <span className="text-[10px] font-bold text-slate-200">Paiement</span>
              <span className="text-[9px] text-slate-400">possible sur place</span>
            </div>
          </div>

          {copiedNumber && (
            <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-center text-[11px] text-cyan-400">
              Numéro <strong className="font-mono">{copiedNumber}</strong> copié dans le presse-papier !
            </div>
          )}

          {/* Warning box matching Image 5 */}
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-2 text-amber-200 text-[10px] leading-tight">
            <AlertTriangle size={15} className="text-amber-400 shrink-0 mt-0.5" />
            <span>
              Paiement direct au promoteur. SocialMeet ne gère pas la transaction et ne peut pas garantir la livraison du billet.
            </span>
          </div>
        </div>

        {/* Section: AVIS matching Image 5 */}
        <div className="bg-[#141e2e] border border-slate-700/60 rounded-2xl p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              AVIS
            </h3>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  className={`cursor-pointer transition ${
                    (hoverRating || userRating || 0) >= star
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-600'
                  }`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setUserRating(star)}
                />
              ))}
              <span className="text-[11px] text-slate-400 font-semibold ml-1">
                {userRating > 0 ? `${userRating}/5` : '0/5'}
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            {userRating > 0 ? 'Merci pour votre note !' : "Aucun avis pour l'instant."}
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => onOpenTicketModal(event)}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-sky-400 hover:from-cyan-400 text-slate-950 font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition cursor-pointer"
          >
            <Ticket size={16} /> Réserver / Obtenir mon billet ({event.price.toLocaleString()} FCFA)
          </button>

          {/* Sticky WhatsApp Button matching Image 5 */}
          <a
            href={`https://wa.me/22996123456?text=Bonjour%20!%20Je%20vous%20contacte%20depuis%20SocialMeet%20concernant%20l'événement%20«%20${encodeURIComponent(event.title)}%20».`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
          >
            <Phone size={15} /> Contacter sur WhatsApp
          </a>
        </div>

      </div>

    </div>
  );
};
