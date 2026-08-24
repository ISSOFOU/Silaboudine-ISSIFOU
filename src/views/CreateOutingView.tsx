import React, { useState } from 'react';
import { ArrowLeft, GlassWater, Utensils, Theater, TreePine, Trees, Gamepad2, BookOpen, Sparkles, Check } from 'lucide-react';
import { Outing, UserProfile, PaymentType } from '../types';
import confetti from 'canvas-confetti';

interface CreateOutingViewProps {
  currentUser: UserProfile;
  onBack: () => void;
  onCreateOuting: (newOuting: Outing) => void;
}

export const CreateOutingView: React.FC<CreateOutingViewProps> = ({
  currentUser,
  onBack,
  onCreateOuting,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'drink' | 'food' | 'culture' | 'outdoor' | 'walk' | 'games' | 'workshops'>('drink');
  const [neighborhood, setNeighborhood] = useState('Haie Vive');
  const [customLocation, setCustomLocation] = useState('');
  const [date, setDate] = useState('Sam. 26 sept.');
  const [time, setTime] = useState('18h30');
  const [maxParticipants, setMaxParticipants] = useState(10);
  const [isUnlimited, setIsUnlimited] = useState(false);
  const [paymentType, setPaymentType] = useState<PaymentType>('gratuit');

  const quickTags = ['Soirée jeux', 'Apéro visio', 'Randonnée urbaine'];

  const categories = [
    { id: 'drink' as const, label: 'Boire un verre', icon: GlassWater },
    { id: 'food' as const, label: 'Manger', icon: Utensils },
    { id: 'culture' as const, label: 'Culture', icon: Theater },
    { id: 'outdoor' as const, label: 'Plein air', icon: Trees },
    { id: 'walk' as const, label: 'Chaonate', icon: TreePine },
    { id: 'games' as const, label: 'Jeux', icon: Gamepad2 },
    { id: 'workshops' as const, label: 'Ateliers', icon: BookOpen },
  ];

  const neighborhoods = ['Haie Vive', 'Fidjrossè', 'Ganhi', 'Cadjèhoun', 'Akpakpa', 'Porto-Novo', 'Calavi'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Pick dynamic high quality image based on category
    const categoryImages: Record<string, string> = {
      drink: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=80',
      food: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
      culture: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
      outdoor: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      walk: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop&q=80',
      games: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&auto=format&fit=crop&q=80',
      workshops: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
    };

    const selectedCategoryObj = categories.find((c) => c.id === category);

    const newOuting: Outing = {
      id: 'out-' + Date.now(),
      title: title.trim(),
      category,
      categoryLabel: selectedCategoryObj?.label || 'Sortie',
      location: customLocation ? `${customLocation}, ${neighborhood}` : `${neighborhood}, Cotonou`,
      neighborhood,
      date,
      time,
      paymentType,
      paymentLabel: paymentType === 'gratuit' ? 'Gratuit' : 'Chacun paie sa conso',
      image: categoryImages[category] || categoryImages.drink,
      hostName: currentUser.name,
      hostEmail: currentUser.email,
      hostAvatar: currentUser.avatar,
      hostInitials: currentUser.initials,
      maxParticipants: isUnlimited ? 999 : maxParticipants,
      isUnlimited,
      participants: [
        {
          id: currentUser.id,
          name: currentUser.name,
          initials: currentUser.initials,
          avatar: currentUser.avatar,
          email: currentUser.email,
          isHost: true,
        },
      ],
      pendingRequests: [],
      comments: [
        {
          id: 'cm-init',
          authorName: currentUser.name,
          authorInitials: currentUser.initials,
          text: 'Bienvenue sur la sortie ! Hâte de vous y retrouver.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    };

    try {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    } catch {}

    onCreateOuting(newOuting);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0b121e] text-white pb-8">
      
      {/* Header matching Image 9 */}
      <div className="px-4 py-3 bg-[#0f1726] border-b border-slate-800/80 flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={onBack}
          className="p-1 rounded-full text-slate-300 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="font-extrabold text-sm text-white font-display">Nouvelle sortie</h1>

        <div className="w-6" />
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-4 space-y-5">
        
        {/* Section 1: Titre de la sortie matching Image 9 */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-200 block">
            Titre de la sortie
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex. « Apéro entre amis... »"
            required
            className="w-full bg-[#16202f] border border-slate-700/80 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />

          {/* Quick suggestions pills */}
          <div className="flex gap-2 pt-1 flex-wrap">
            {quickTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setTitle(tag)}
                className="px-3 py-1 rounded-full bg-[#182333] hover:bg-[#1e2d42] border border-slate-700 text-[11px] text-slate-300 transition cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Catégorie / Activité matching Image 9 */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-200 block">
            Catégorie / Activité
          </label>

          <div className="grid grid-cols-5 gap-2 text-center">
            {categories.slice(0, 5).map((cat) => {
              const Icon = cat.icon;
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-2xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm'
                      : 'bg-[#141e2e] border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center">
                    <Icon size={16} className={isSelected ? 'text-cyan-400' : 'text-slate-300'} />
                  </div>
                  <span className="text-[10px] font-semibold leading-tight">{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-2 text-center pt-1 max-w-[200px]">
            {categories.slice(5).map((cat) => {
              const Icon = cat.icon;
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-2xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm'
                      : 'bg-[#141e2e] border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center">
                    <Icon size={16} className={isSelected ? 'text-cyan-400' : 'text-slate-300'} />
                  </div>
                  <span className="text-[10px] font-semibold leading-tight">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Lieu / Quartier matching Image 9 */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-200 block">
            Lieu / Quartier
          </label>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
            {neighborhoods.map((n) => {
              const isSelected = neighborhood === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setNeighborhood(n)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    isSelected
                      ? 'border border-cyan-400 bg-cyan-400/15 text-cyan-300'
                      : 'bg-[#16202f] text-slate-300 border border-slate-700/70 hover:border-slate-600'
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>

          <input
            type="text"
            value={customLocation}
            onChange={(e) => setCustomLocation(e.target.value)}
            placeholder="Préciser l'adresse ou le bar (optionnel)"
            className="w-full bg-[#16202f] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Section 4: Date et Heure matching Image 9 */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-200 block">
            Date et Heure
          </label>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-[#16202f] border border-slate-700/80 rounded-2xl px-3.5 py-2.5 text-xs text-white text-center font-medium focus:outline-none focus:border-cyan-400"
            />
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-[#16202f] border border-slate-700/80 rounded-2xl px-3.5 py-2.5 text-xs text-white text-center font-medium focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Section 5: Nombre de participants max matching Image 9 */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-200 block">
            Nombre de participants max
          </label>

          <div className="flex items-center justify-between gap-3">
            {/* Stepper matching Image 9 */}
            <div className="flex items-center bg-[#16202f] border border-slate-700/80 rounded-2xl p-1 px-2 flex-1 justify-between">
              <button
                type="button"
                onClick={() => setMaxParticipants(Math.max(2, maxParticipants - 1))}
                className="w-8 h-8 rounded-xl bg-slate-800 text-slate-200 font-bold flex items-center justify-center hover:bg-slate-700"
              >
                -
              </button>
              <span className="text-xs font-bold text-white px-2">
                {isUnlimited ? 'Illimité' : `${maxParticipants} personnes`}
              </span>
              <button
                type="button"
                onClick={() => setMaxParticipants(maxParticipants + 1)}
                className="w-8 h-8 rounded-xl bg-slate-800 text-slate-200 font-bold flex items-center justify-center hover:bg-slate-700"
              >
                +
              </button>
            </div>

            {/* Toggle Illimité matching Image 9 */}
            <div className="flex items-center gap-2 bg-[#16202f] border border-slate-700/80 rounded-2xl px-3 py-2">
              <span className="text-xs font-medium text-slate-300">Illimité ?</span>
              <button
                type="button"
                onClick={() => setIsUnlimited(!isUnlimited)}
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                  isUnlimited ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-0.5 ${
                    isUnlimited ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section 6: Modalité de paiement matching Image 9 */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-200 block">
            Modalité de paiement
          </label>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPaymentType('gratuit')}
              className={`py-2.5 px-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                paymentType === 'gratuit'
                  ? 'bg-slate-800 border border-cyan-400 text-cyan-300'
                  : 'bg-[#16202f] border border-slate-700 text-slate-400'
              }`}
            >
              <Sparkles size={13} className="text-cyan-400" />
              <span>Gratuit</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentType('chacun_sa_conso')}
              className={`py-2.5 px-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                paymentType === 'chacun_sa_conso'
                  ? 'bg-slate-800 border border-cyan-400 text-cyan-300'
                  : 'bg-[#16202f] border border-slate-700 text-slate-400'
              }`}
            >
              <span>Chacun paie sa consommation</span>
            </button>
          </div>
        </div>

        {/* Big CTA Button matching Image 9 */}
        <div className="pt-3">
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-sky-400 hover:from-cyan-400 text-slate-950 font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition cursor-pointer"
          >
            Publier la sortie
          </button>
        </div>

      </form>

    </div>
  );
};
