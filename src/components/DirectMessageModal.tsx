import React, { useState } from 'react';
import { X, Send, Phone, Video, ShieldCheck, CheckCheck } from 'lucide-react';
import { ViberUser, ChatMessage } from '../types';

interface DirectMessageModalProps {
  viber: ViberUser | null;
  onClose: () => void;
}

export const DirectMessageModal: React.FC<DirectMessageModalProps> = ({ viber, onClose }) => {
  if (!viber) return null;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      senderId: viber.id,
      text: `Salut ! Enchanté(e) de t'avoir croisé(e) à ${viber.metAt.replace('Rencontré(e) à ', '').replace('Rencontré à ', '').replace('Rencontrée à ', '')} 👋`,
      timestamp: '12:30',
      isMe: false,
    },
    {
      id: 'm2',
      senderId: 'me',
      text: 'Salut ! Oui super ambiance, tu penses aller au prochain événement ce weekend ?',
      timestamp: '12:34',
      isMe: true,
    }
  ]);

  const [inputVal, setInputVal] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputVal.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');

    // Simulate friendly reply after 1s
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          senderId: viber.id,
          text: 'Carrément ! On se retrouve là-bas, je prends ma place sur SocialMeet 🚀',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: false,
        }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md h-[550px] bg-[#111a28] border border-slate-700/80 rounded-3xl flex flex-col overflow-hidden shadow-2xl">
        
        {/* Top Header */}
        <div className="px-4 py-3 bg-[#162234] border-b border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={viber.avatar}
                alt={viber.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#162234]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-sm">{viber.name}</span>
                <ShieldCheck size={14} className="text-cyan-400" />
              </div>
              <span className="text-[11px] text-slate-400 block truncate max-w-[180px]">
                En ligne • {viber.metAt}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <a
              href={`https://wa.me/22996123456?text=Salut%20${encodeURIComponent(viber.name)}!%20On%20s'est%20connect%C3%A9%20sur%20SocialMeet`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-slate-700 text-emerald-400 transition"
              title="Ouvrir sur WhatsApp"
            >
              <Phone size={17} />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-700 text-slate-300 transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar bg-[#0d1522]">
          <div className="text-center my-2">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider bg-slate-800/80 px-2.5 py-0.5 rounded-full">
              Connexion SocialMeet • Cotonou
            </span>
          </div>

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                  m.isMe
                    ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-br-none shadow-md'
                    : 'bg-[#1e2a3c] text-slate-100 rounded-bl-none border border-slate-700/50'
                }`}
              >
                {m.text}
              </div>
              <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-slate-400">
                <span>{m.timestamp}</span>
                {m.isMe && <CheckCheck size={12} className="text-cyan-400" />}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Input Field */}
        <form onSubmit={handleSend} className="p-3 bg-[#162234] border-t border-slate-700/60 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Écrire un message..."
            className="flex-1 bg-[#0f1724] border border-slate-700 rounded-full px-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="w-9 h-9 rounded-full bg-cyan-500 text-white flex items-center justify-center disabled:opacity-40 hover:bg-cyan-400 transition"
          >
            <Send size={15} />
          </button>
        </form>

      </div>
    </div>
  );
};
