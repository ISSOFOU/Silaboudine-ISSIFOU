import React, { useState } from 'react';
import { Share2, Sparkles, MapPin, ArrowRight, UserCheck } from 'lucide-react';

interface WelcomeViewProps {
  onContinue: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onContinue }) => {
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);
  const [emailInput, setEmailInput] = useState('dinelemblematique@gmail.com');
  const [passwordInput, setPasswordInput] = useState('••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue();
  };

  return (
    <div className="min-h-full flex flex-col justify-between px-6 pt-10 pb-8 bg-[#0b121e] text-white relative">
      
      {/* Top Branding Section */}
      <div className="flex flex-col items-center text-center mt-2">
        {/* Connected Node Logo matching Image 1 */}
        <div className="relative mb-3 flex items-center justify-center">
          <div className="w-16 h-16 relative">
            <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-400 drop-shadow-[0_0_12px_rgba(0,210,255,0.4)]">
              {/* Connected Lines */}
              <line x1="50" y1="50" x2="25" y2="35" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <line x1="50" y1="50" x2="75" y2="35" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <line x1="50" y1="50" x2="25" y2="65" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <line x1="50" y1="50" x2="75" y2="65" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <line x1="50" y1="50" x2="50" y2="20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <line x1="50" y1="50" x2="50" y2="80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              
              {/* Central node */}
              <circle cx="50" cy="50" r="11" fill="#0b121e" stroke="currentColor" strokeWidth="4" />
              <circle cx="50" cy="50" r="4" fill="currentColor" />

              {/* Surrounding nodes */}
              <circle cx="25" cy="35" r="7" fill="#0b121e" stroke="currentColor" strokeWidth="3" />
              <circle cx="75" cy="35" r="7" fill="#0b121e" stroke="currentColor" strokeWidth="3" />
              <circle cx="25" cy="65" r="7" fill="#0b121e" stroke="currentColor" strokeWidth="3" />
              <circle cx="75" cy="65" r="7" fill="#0b121e" stroke="currentColor" strokeWidth="3" />
              <circle cx="50" cy="20" r="6" fill="#0b121e" stroke="currentColor" strokeWidth="3" />
              <circle cx="50" cy="80" r="6" fill="#0b121e" stroke="currentColor" strokeWidth="3" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-cyan-400 font-display">
          SocialMeet
        </h1>
        <p className="text-slate-200 text-sm sm:text-base mt-2 font-medium">
          Les sorties qui rapprochent.
        </p>
      </div>

      {/* Hero Image Card with Location Tag */}
      <div className="my-6 relative w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-800/80 group">
        <img
          src="https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&auto=format&fit=crop&q=80"
          alt="Amis trinquant sur un rooftop à Cotonou"
          className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Soft dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Location pill */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-semibold flex items-center gap-1.5 text-slate-100 shadow-lg">
          <MapPin size={13} className="text-rose-400 fill-rose-400" />
          <span>Cotonou, Benin</span>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="flex flex-col gap-3 w-full">
        {/* Primary Gradient CTA matching Image 1: Cyan to Magenta */}
        <button
          onClick={() => setAuthModal('register')}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#00c6ff] via-[#0072ff] to-[#ff2a70] text-white font-bold text-sm sm:text-base shadow-lg shadow-cyan-500/25 hover:opacity-95 active:scale-[0.99] transition cursor-pointer flex items-center justify-center gap-2"
        >
          Créer un compte
        </button>

        {/* Secondary Button matching Image 1: Dark card with cyan border */}
        <button
          onClick={() => setAuthModal('login')}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#0f1726] border border-cyan-400 text-cyan-400 font-bold text-sm sm:text-base hover:bg-cyan-500/10 active:scale-[0.99] transition cursor-pointer flex items-center justify-center gap-2"
        >
          J'ai déjà un compte
        </button>

        {/* Quick instant access for preview */}
        <button
          onClick={onContinue}
          className="w-full py-2 text-xs text-slate-400 hover:text-cyan-300 transition flex items-center justify-center gap-1 mt-1 cursor-pointer"
        >
          <Sparkles size={13} className="text-cyan-400" /> Découvrir sans inscription (Démo)
        </button>
      </div>

      {/* Footer Legal Terms */}
      <div className="mt-4 text-center px-4">
        <p className="text-[11px] text-slate-400 leading-relaxed">
          En continuant, vous acceptez nos <span className="underline hover:text-slate-200 cursor-pointer">Conditions d'utilisation</span> et notre <span className="underline hover:text-slate-200 cursor-pointer">Politique de confidentialité</span>.
        </p>
      </div>

      {/* Auth / Login Modal */}
      {authModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm bg-[#111a28] border border-slate-700/80 rounded-3xl p-5 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">
              {authModal === 'login' ? 'Connexion SocialMeet' : 'Rejoindre SocialMeet'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              {authModal === 'login'
                ? 'Retrouvez vos sorties et vos vibers à Cotonou.'
                : 'Créez votre profil pour participer aux meilleures sorties.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Email</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                  className="w-full bg-[#182333] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Mot de passe</label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                  className="w-full bg-[#182333] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 hover:from-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <UserCheck size={14} /> Continuer sur SocialMeet
                </button>
                <button
                  type="button"
                  onClick={() => setAuthModal(null)}
                  className="w-full py-2 text-xs text-slate-400 hover:text-slate-200"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
