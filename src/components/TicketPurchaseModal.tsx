import React, { useState } from 'react';
import { X, CheckCircle, Copy, QrCode, Phone, Smartphone, AlertCircle } from 'lucide-react';
import { EventTicket } from '../types';
import confetti from 'canvas-confetti';

interface TicketPurchaseModalProps {
  event: EventTicket;
  onClose: () => void;
  onTicketPurchased?: () => void;
}

export const TicketPurchaseModal: React.FC<TicketPurchaseModalProps> = ({ event, onClose, onTicketPurchased }) => {
  const [selectedMethod, setSelectedMethod] = useState<'momo' | 'wave' | 'onsite'>('momo');
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [copied, setCopied] = useState(false);

  const totalPrice = event.price * quantity;

  const handleCopyNumber = (num: string) => {
    navigator.clipboard?.writeText(num);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmReservation = () => {
    setStep('success');
    if (onTicketPurchased) onTicketPurchased();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-sm bg-[#111a28] border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 bg-[#162234] border-b border-slate-700/60 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-sm">Obtenir mon billet</h3>
            <p className="text-[11px] text-cyan-400 truncate max-w-[200px]">{event.title}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-700 text-slate-300">
            <X size={18} />
          </button>
        </div>

        {step === 'details' ? (
          <div className="p-4 overflow-y-auto no-scrollbar space-y-4 text-xs">
            {/* Summary card */}
            <div className="bg-[#182333] p-3 rounded-2xl border border-slate-700/60 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-[11px]">Tarif unitaire</p>
                <p className="text-white font-bold text-base">{event.price.toLocaleString()} FCFA</p>
              </div>
              <div className="flex items-center gap-2 bg-[#0e1622] px-2.5 py-1.5 rounded-xl border border-slate-700">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 rounded-md bg-slate-700 text-white font-bold flex items-center justify-center hover:bg-slate-600"
                >
                  -
                </button>
                <span className="font-bold text-white text-sm px-1">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 rounded-md bg-cyan-500 text-slate-950 font-bold flex items-center justify-center hover:bg-cyan-400"
                >
                  +
                </button>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="text-slate-300 font-semibold mb-2 block">
                Moyen de paiement direct
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSelectedMethod('momo')}
                  className={`p-2.5 rounded-2xl border flex flex-col items-center gap-1 transition ${
                    selectedMethod === 'momo'
                      ? 'border-yellow-400 bg-yellow-500/10 text-yellow-300'
                      : 'border-slate-700 bg-[#16202e] text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <Smartphone size={18} className="text-yellow-400" />
                  <span className="text-[10px] font-bold">MTN / Moov</span>
                </button>

                <button
                  onClick={() => setSelectedMethod('wave')}
                  className={`p-2.5 rounded-2xl border flex flex-col items-center gap-1 transition ${
                    selectedMethod === 'wave'
                      ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300'
                      : 'border-slate-700 bg-[#16202e] text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 font-black text-[10px] flex items-center justify-center">W</span>
                  <span className="text-[10px] font-bold">Wave</span>
                </button>

                <button
                  onClick={() => setSelectedMethod('onsite')}
                  className={`p-2.5 rounded-2xl border flex flex-col items-center gap-1 transition ${
                    selectedMethod === 'onsite'
                      ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300'
                      : 'border-slate-700 bg-[#16202e] text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <span className="text-sm">💵</span>
                  <span className="text-[10px] font-bold">Sur place</span>
                </button>
              </div>
            </div>

            {/* Payment Details Box */}
            <div className="bg-[#131d2b] p-3.5 rounded-2xl border border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between text-slate-300">
                <span>Numéro du Promoteur :</span>
                <button
                  onClick={() => handleCopyNumber(selectedMethod === 'wave' ? event.paymentMethods.wave : event.paymentMethods.mobileMoney)}
                  className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-lg border border-cyan-500/20"
                >
                  <Copy size={11} /> {copied ? 'Copié !' : 'Copier'}
                </button>
              </div>
              <div className="font-mono text-base font-bold text-white bg-[#0a1018] p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                <span>
                  {selectedMethod === 'wave'
                    ? event.paymentMethods.wave
                    : event.paymentMethods.mobileMoney}
                </span>
                <span className="text-[10px] text-slate-400 font-sans font-normal">
                  ({event.promoterName})
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Envoyez <strong className="text-white">{totalPrice.toLocaleString()} FCFA</strong> par{' '}
                {selectedMethod === 'wave' ? 'Wave' : 'MoMo / Moov'} avec la référence « {event.title.slice(0, 15)} ».
              </p>
            </div>

            {/* Caution / Disclaimer Notice */}
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-2.5">
              <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-amber-200/90 leading-tight">
                Paiement direct au promoteur. SocialMeet ne gère pas la transaction et ne prend aucune commission sur cette vente.
              </p>
            </div>

            {/* Total & Action */}
            <div className="pt-2">
              <button
                onClick={handleConfirmReservation}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-sky-400 hover:from-cyan-400 hover:to-sky-300 text-slate-950 font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
              >
                Confirmer & Générer mon e-Billet ({totalPrice.toLocaleString()} FCFA)
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Digital Ticket with QR Code */
          <div className="p-5 flex flex-col items-center text-center space-y-3 bg-[#0d1522]">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              <CheckCircle size={28} />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Billet Réservé !</h4>
              <p className="text-xs text-slate-300 mt-0.5">{event.title}</p>
            </div>

            {/* E-Ticket Display */}
            <div className="w-full bg-[#162234] border border-cyan-500/40 rounded-2xl p-4 flex flex-col items-center shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[9px] font-extrabold px-2 py-0.5 rounded-bl-lg">
                PASS {quantity > 1 ? `x${quantity}` : 'OFFICIEL'}
              </div>
              
              <div className="bg-white p-3 rounded-xl shadow-md my-2">
                <QrCode size={110} className="text-slate-950" />
              </div>

              <span className="font-mono text-xs text-cyan-300 font-semibold tracking-wider">
                SM-{Math.floor(100000 + Math.random() * 900000)}
              </span>

              <div className="w-full border-t border-dashed border-slate-600 my-2.5" />

              <div className="w-full flex justify-between text-[11px] text-slate-300 text-left">
                <div>
                  <span className="text-slate-400 block text-[9px]">Lieu</span>
                  <span className="font-medium text-white">{event.location.split(',')[0]}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[9px]">Date & Heure</span>
                  <span className="font-medium text-white">{event.date} • {event.time}</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Contact Promoter button */}
            <a
              href={`https://wa.me/22996123456?text=Bonjour%20${encodeURIComponent(event.promoterName)}!%20Je%20viens%20de%20r%C3%A9server%20mon%20billet%20pour%20${encodeURIComponent(event.title)}%20sur%20SocialMeet.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-md shadow-emerald-500/20"
            >
              <Phone size={14} /> Confirmer sur WhatsApp
            </a>

            <button
              onClick={onClose}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl text-xs transition"
            >
              Fermer
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
