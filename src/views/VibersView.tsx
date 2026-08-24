import React from 'react';
import { ArrowLeft, User, MessageCircle, UserPlus, Check, X, ShieldCheck } from 'lucide-react';
import { ViberUser } from '../types';

interface VibersViewProps {
  vibers: ViberUser[];
  onBack: () => void;
  onOpenChat: (viber: ViberUser) => void;
  onAcceptViber: (id: string) => void;
  onRefuseViber: (id: string) => void;
  onInviteViber: (id: string) => void;
  onOpenProfile: () => void;
}

export const VibersView: React.FC<VibersViewProps> = ({
  vibers,
  onBack,
  onOpenChat,
  onAcceptViber,
  onRefuseViber,
  onInviteViber,
  onOpenProfile,
}) => {
  const pendingReceived = vibers.filter((v) => v.status === 'pending_received');
  const suggestions = vibers.filter((v) => v.status === 'suggested');
  const friends = vibers.filter((v) => v.status === 'friend');

  return (
    <div className="flex-1 flex flex-col bg-[#0b121e] text-white pb-6">
      
      {/* Top Header matching Image 6 */}
      <div className="px-4 py-3 bg-[#0f1726] border-b border-slate-800/80 flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={onBack}
          className="p-1 rounded-full text-slate-300 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="font-extrabold text-base text-white tracking-tight font-display">
          Vibers
        </h1>

        <button
          onClick={onOpenProfile}
          className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
        >
          <User size={18} />
        </button>
      </div>

      <div className="px-4 py-4 space-y-6">
        
        {/* Section: Invitations reçues matching Image 6 */}
        {pendingReceived.length > 0 && (
          <div>
            <h2 className="text-sm font-extrabold text-white mb-2.5">
              Invitations reçues ({pendingReceived.length})
            </h2>

            <div className="space-y-2">
              {pendingReceived.map((viber) => (
                <div
                  key={viber.id}
                  className="p-3 bg-[#141e2e] border border-slate-700/60 rounded-2xl flex items-center justify-between shadow-md"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <img
                      src={viber.avatar}
                      alt={viber.name}
                      className="w-11 h-11 rounded-full object-cover border border-cyan-400 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-white truncate">
                        {viber.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate">
                        {viber.metAt}
                      </p>
                    </div>
                  </div>

                  {/* Accepter & Refuser buttons matching Image 6 */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onAcceptViber(viber.id)}
                      className="px-3 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition cursor-pointer shadow-sm"
                    >
                      Accepter
                    </button>
                    <button
                      onClick={() => onRefuseViber(viber.id)}
                      className="px-3 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition cursor-pointer shadow-sm"
                    >
                      Refuser
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section: Suggestions matching Image 6 */}
        {suggestions.length > 0 && (
          <div>
            <h2 className="text-sm font-extrabold text-white mb-2.5">
              Suggestions
            </h2>

            <div className="space-y-2">
              {suggestions.map((viber) => (
                <div
                  key={viber.id}
                  className="p-3 bg-[#141e2e] border border-slate-700/60 rounded-2xl flex items-center justify-between shadow-md"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <img
                      src={viber.avatar}
                      alt={viber.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-600 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-white truncate">
                        {viber.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate">
                        {viber.metAt}
                      </p>
                    </div>
                  </div>

                  {/* Inviter button matching Image 6 */}
                  <button
                    onClick={() => onInviteViber(viber.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition cursor-pointer shadow-sm shrink-0"
                  >
                    Inviter
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section: Mes Vibers matching Image 6 */}
        <div>
          <h2 className="text-sm font-extrabold text-white mb-2.5">
            Mes Vibers ({friends.length})
          </h2>

          <div className="space-y-2">
            {friends.map((viber) => (
              <div
                key={viber.id}
                className="p-3 bg-[#141e2e] border border-slate-700/60 rounded-2xl flex items-center justify-between shadow-md"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="relative shrink-0">
                    <img
                      src={viber.avatar}
                      alt={viber.name}
                      className="w-11 h-11 rounded-full object-cover border border-cyan-400"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#141e2e]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-white truncate">
                      {viber.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">
                      {viber.metAt}
                    </p>
                  </div>
                </div>

                {/* Envoyer un message button matching Image 6 */}
                <button
                  onClick={() => onOpenChat(viber)}
                  className="px-3 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm shrink-0"
                >
                  <MessageCircle size={13} className="fill-slate-950" />
                  <span>Envoyer un message</span>
                </button>
              </div>
            ))}

            {friends.length === 0 && (
              <div className="py-6 text-center bg-[#131d2b] rounded-2xl p-4 text-xs text-slate-400">
                Vous n'avez pas encore de Vibers connectés. Acceptez des invitations ou participez à des sorties !
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
