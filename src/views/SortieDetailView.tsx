import React, { useState } from 'react';
import { ArrowLeft, Share2, MapPin, Clock, CreditCard, Check, X, Send, Phone, Users, BookOpen } from 'lucide-react';
import { Outing, UserProfile } from '../types';
import confetti from 'canvas-confetti';

interface SortieDetailViewProps {
  outing: Outing;
  currentUser: UserProfile;
  onBack: () => void;
  onOpenMap: (location: string, neighborhood: string) => void;
  onUpdateOuting: (updatedOuting: Outing) => void;
}

export const SortieDetailView: React.FC<SortieDetailViewProps> = ({
  outing,
  currentUser,
  onBack,
  onOpenMap,
  onUpdateOuting,
}) => {
  const [commentText, setCommentText] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);

  // Check if current user is already joined
  const isJoined = outing.participants.some((p) => p.id === currentUser.id);
  const totalCount = outing.participants.length + (outing.id === 'out-1' ? 56 : outing.id === 'out-2' ? 5 : 2);
  const maxAllowed = outing.maxParticipants;
  const progressRatio = Math.min(100, Math.round((totalCount / maxAllowed) * 100));

  // Toggle Join
  const handleToggleJoin = () => {
    let updatedParticipants = [...outing.participants];
    if (isJoined) {
      updatedParticipants = updatedParticipants.filter((p) => p.id !== currentUser.id);
    } else {
      updatedParticipants.push({
        id: currentUser.id,
        name: currentUser.name,
        initials: currentUser.initials,
        avatar: currentUser.avatar,
        email: currentUser.email,
      });
      try {
        confetti({ particleCount: 45, spread: 60, origin: { y: 0.7 } });
      } catch {
        // Safe fallback
      }
    }

    onUpdateOuting({
      ...outing,
      participants: updatedParticipants,
    });
  };

  // Accept pending request
  const handleAcceptRequest = (reqId: string, reqName: string, reqInitials: string) => {
    const newParticipants = [
      ...outing.participants,
      {
        id: reqId,
        name: reqName,
        initials: reqInitials,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
      },
    ];
    const newPending = outing.pendingRequests.filter((r) => r.id !== reqId);

    onUpdateOuting({
      ...outing,
      participants: newParticipants,
      pendingRequests: newPending,
    });
  };

  // Reject pending request
  const handleRejectRequest = (reqId: string) => {
    const newPending = outing.pendingRequests.filter((r) => r.id !== reqId);
    onUpdateOuting({
      ...outing,
      pendingRequests: newPending,
    });
  };

  // Add Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      authorName: currentUser.name,
      authorInitials: currentUser.initials,
      authorAvatar: currentUser.avatar,
      text: commentText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onUpdateOuting({
      ...outing,
      comments: [...outing.comments, newComment],
    });
    setCommentText('');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: outing.title,
        text: `Rejoins-moi pour la sortie « ${outing.title} » sur SocialMeet !`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0b121e] text-white pb-6">
      
      {/* Top Hero Image with Floating Buttons matching Image 4 */}
      <div className="relative h-56 w-full bg-slate-900">
        <img
          src={outing.image}
          alt={outing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b121e] via-transparent to-black/50" />

        {/* Back button top-left */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Share button top-right */}
        <button
          onClick={handleShare}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition cursor-pointer"
          title="Partager"
        >
          <Share2 size={18} />
        </button>

        {copiedShare && (
          <div className="absolute top-14 right-4 bg-cyan-500 text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg">
            Lien copié !
          </div>
        )}
      </div>

      {/* Main Content Info */}
      <div className="px-4 space-y-4 -mt-2">
        
        {/* Title */}
        <h1 className="text-2xl font-black text-white tracking-tight font-display">
          {outing.title}
        </h1>

        {/* Host section matching Image 4 */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500 text-slate-950 font-bold text-base flex items-center justify-center shrink-0">
            {outing.hostInitials || 'D'}
          </div>
          <div>
            <h4 className="text-xs font-bold text-white leading-tight">Hôte</h4>
            <p className="text-[11px] text-slate-400">
              Organisé par <span className="text-slate-300">{outing.hostEmail}</span>
            </p>
          </div>
        </div>

        {/* Metadata List matching Image 4 */}
        <div className="space-y-2.5 text-xs text-slate-300 pt-1">
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-slate-400 shrink-0" />
            <span className="text-white">{outing.location}</span>
            <button
              onClick={() => onOpenMap(outing.location, outing.neighborhood)}
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold text-[11px] ml-1 cursor-pointer"
            >
              <BookOpen size={12} /> Voir sur la carte
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={15} className="text-slate-400 shrink-0" />
            <span>{outing.date} • {outing.time}</span>
          </div>

          <div className="flex items-center gap-2">
            <CreditCard size={15} className="text-slate-400 shrink-0" />
            <span>{outing.paymentLabel}</span>
          </div>
        </div>

        <div className="w-full h-px bg-slate-800 my-1" />

        {/* Qui vient Section matching Image 4 */}
        <div>
          <h3 className="text-xs font-bold text-white mb-2">Qui vient</h3>
          
          <div className="flex items-center justify-between gap-3">
            {/* Avatars Stack matching Image 4 */}
            <div className="flex items-center -space-x-2 overflow-hidden py-1">
              <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 text-xs font-bold flex items-center justify-center border-2 border-[#0b121e] shadow">
                D
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-600 text-white text-xs font-bold flex items-center justify-center border-2 border-[#0b121e] shadow">
                F
              </div>
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                alt="user"
                className="w-8 h-8 rounded-full object-cover border-2 border-[#0b121e] shadow"
              />
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                alt="user"
                className="w-8 h-8 rounded-full object-cover border-2 border-[#0b121e] shadow"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="user"
                className="w-8 h-8 rounded-full object-cover border-2 border-[#0b121e] shadow"
              />
              <img
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80"
                alt="user"
                className="w-8 h-8 rounded-full object-cover border-2 border-[#0b121e] shadow"
              />
            </div>

            {/* Participants Progress Bar matching Image 4 */}
            <div className="w-36 text-right">
              <span className="text-[11px] text-slate-300 block mb-1">
                {outing.participants.length || 2} participants sur {outing.maxParticipants}
              </span>
              <div className="w-full bg-[#182436] h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-400 rounded-full"
                  style={{ width: `${Math.max(20, progressRatio)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Demandes en attente (1) matching Image 4 */}
        {outing.pendingRequests && outing.pendingRequests.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-white mb-2">
              Demandes en attente ({outing.pendingRequests.length})
            </h3>
            <div className="space-y-2">
              {outing.pendingRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-2.5 bg-[#141e2e] border border-slate-700/60 rounded-2xl flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold text-xs flex items-center justify-center">
                      {req.initials}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white">{req.name}</span>
                      <span className="text-[10px] text-slate-400 block">{req.requestedAt}</span>
                    </div>
                  </div>

                  {/* Accept / Reject buttons matching Image 4 */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRejectRequest(req.id)}
                      className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 flex items-center justify-center transition"
                      title="Refuser"
                    >
                      <X size={15} />
                    </button>
                    <button
                      onClick={() => handleAcceptRequest(req.id, req.name, req.initials)}
                      className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center hover:bg-emerald-400 transition"
                      title="Accepter"
                    >
                      <Check size={15} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action CTA Buttons matching Image 4 */}
        <div className="flex gap-2.5 pt-1">
          {/* Join button */}
          <button
            onClick={handleToggleJoin}
            className={`flex-1 py-3 px-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-lg ${
              isJoined
                ? 'bg-slate-800 text-cyan-400 border border-cyan-400/40'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
            }`}
          >
            {isJoined ? '✓ Sortie rejointe' : 'Rejoindre la sortie'}
          </button>

          {/* WhatsApp button matching Image 4 */}
          <a
            href={`https://wa.me/22996123456?text=Salut%20!%20Je%20viens%20de%20voir%20la%20sortie%20«%20${encodeURIComponent(outing.title)}%20»%20sur%20SocialMeet.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
          >
            <Phone size={14} className="fill-slate-950" />
            <span>Contacter sur WhatsApp</span>
          </a>
        </div>

        {/* Commentaires Section matching Image 4 */}
        <div className="pt-2">
          <h3 className="text-xs font-bold text-white mb-2.5">
            Commentaires ({outing.comments.length})
          </h3>

          <div className="space-y-2 mb-3">
            {outing.comments.map((cm) => (
              <div key={cm.id} className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-slate-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {cm.authorInitials}
                </div>
                <div className="bg-[#1b2536] border border-slate-700/50 rounded-2xl rounded-tl-none px-3 py-2 text-xs text-slate-200 flex-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                    <span className="font-semibold text-white">{cm.authorName}</span>
                    <span>{cm.time}</span>
                  </div>
                  <p>{cm.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Comment Input matching Image 4 */}
          <form onSubmit={handleAddComment} className="relative">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="w-full bg-[#16202f] border border-slate-700/60 rounded-full pl-4 pr-10 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-cyan-400 hover:text-cyan-300 disabled:opacity-30 transition"
            >
              <Send size={15} />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
